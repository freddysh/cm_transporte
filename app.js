var express=require("express");
var bodyParser=require("body-parser");
var mysql=require("mysql");
var session=require("express-session");
var net = require('net');

// rutas
var route_login=require("./routes/login");
var route_usuario=require("./routes/route_usuario");
var route_linea=require("./routes/route_linea");
var route_ubicacion=require("./routes/route_ubicacion");
var route_ruta=require("./routes/route_ruta");
var route_carro=require("./routes/route_carro");
var route_reportes=require("./routes/route_reportes");
var route_configuracion=require("./routes/route_configuracion");
// modelos
var Usuario=require("./models/modelo_usuario").usuario;
var Linea=require("./models/modelo_linea").linea;
var Carro=require("./models/modelo_carro").carro;
var Ubicacion=require("./models/modelo_ubicacion").ubicacion;
var Ruta = require('./models/modelo_ruta').ruta;
var Configuracion=require('./models/modelo_configuracion').configuracion;
require('v8-profiler')

var port=process.env.PORT || 8081;


var app=express();

var server =require('http').Server(app);
var io=require('socket.io').listen(server);

//tcp socket server

var clients = [];//Arduinos conectados


var tcpServer = net.createServer(function (err,socket) {
   
});

tcpServer.on('connection',function(socket){
    //console.log("se ha conectado alguien:"+socket.remoteAddress+":"+socket.remotePort); 
    socket.write('connected to the tcp server\r\n');
    //console.log('num of connections on port 1337: ' + tcpServer.connections);
    
    //tcpGuests.push(socket);
    
    socket.on('data',function(data){

        //console.log('received on tcp socket:'+socket.remotePort+'-'+data);
        

        //console.log(data);
       var  data1=data.toString();
        socket.write('mensaje recibido con exito:'+data1);
        console.log(data1);
        
        if(data1.length<=12)// Recibir el identificador del arduino( placa del carro)
        {
        	socket.username=data1;
          clients.push(socket.username);
          //console.log("CLIENTES DESDE TCP:"+clients);
          io.sockets.emit('Clientes',clients);

        }
        else//recibir datos de arduino: lat,lon,velocidad,fecha ,hora
        {  	var  y = data1.split(",");
             //var obj = {};

             if(BuscarCliente(y[3],clients))
             {
		         Carro.getCarroPlaca(y[3],function(err,doc)
			    { // averiguar a que linea pertenece la placa
			    	 							
	                  if(typeof doc !== 'undefined' && doc.length > 0) //verificar si exite la linea
						{
							Configuracion.getConfiguracion(function(error,conf)
							{
								Ruta.getRuta(doc[0].idlinea,function(err,res)
								{
									//console.log(user);
								   	if(typeof res !== 'undefined' && res.length > 0)
								   	{
								     // console.log(doc[0].nombre);
								      Ruta.getLatLon(res[0].idruta,function(err,ruta)
								      {

								        if(typeof ruta !== 'undefined' && ruta.length > 0)
								        {
											var falta={};
											/*obj['idlinea'] =doc[0].idlinea;
											obj['lat'] = y[0];
											obj['lon'] = y[1];
											obj['velocidad'] = y[2];
											obj['placa'] = y[3];
											obj['fecha'] =convertirFecha(y[4]);
											obj['hora'] =convertirHora(y[5]);
											*/

							
											//console.log(conf[0].seguridad);
											// verificar si cumple con la regla de seguridad puerta cerrada a una velocidad determinada, 1 puerta abierta
											if(y[2]>=conf[0].seguridad && y[6]==1)
												falta['seguridad']=y[2];
											else falta['seguridad']='';

											//Distancia(y[0],y[1],doc[0].idlinea);
								
								        	var resp="0";
								            var a=0;
								            var Distancia=[];
								            while(resp=="0" && a<ruta.length)
								            {//console.log("Distancia:"+getKilometros(y[0],y[1],ruta[a].lat,ruta[a].lon));
								              if(getKilometros(y[0],y[1],ruta[a].lat,ruta[a].lon)<=conf[0].ruta)
											   {
											     resp="1";
											     falta['ruta']='';
											     //solo se puede monitorear la velocidad si esta dentro de la ruta asignada
											     //console.log(ruta[a].velocidad);
											    	if(y[2]>ruta[a].velocidad)
											    	{
														falta['velocidad']=y[2];
														falta['max_vel']=ruta[a].velocidad;
													}
													else
													{
														falta['velocidad']='';
														falta['max_vel']='';
													}	

											   }
											   else
											   {	
											   	  resp="0";
											   	  Distancia.push(getKilometros(y[0],y[1],ruta[a].lat,ruta[a].lon));
											   }
											   a++;
								            }
								            if(resp=="0")
								            {
								            	falta['ruta']=Math.min.apply(null, Distancia);
								            	falta['velocidad']='';
								            	falta['max_vel']='';
								            }
								            
										       // console.log("FALTA 1"+falta['velocidad']);
											    //console.log("falta 2"+falta['seguridad']);
											    //console.log("falta 3"+falta['ruta']);

											//datos a guardar en bd
											   	  var  ubicacion={
												    	lat:y[0],
												    	lon:y[1],
												    	velocidad:y[2],
												    	fecha:convertirFecha(y[4]),
												    	hora:convertirHora(y[5]),
												    	puerta:y[6],
												    	placa:y[3],
												    	falta_v:falta['velocidad'],
												    	max_vel:falta['max_vel'],
												    	falta_s:falta['seguridad'],
												    	falta_r:falta['ruta']

												    } 
												    
										    if(falta['velocidad']!='' || falta['seguridad']!='' || falta['ruta']!='')
											{
												
												//console.log("con infraccion");
												
											   	 //enviar datos de alerta ala web 
											   	Ubicacion.insertUbicacion(ubicacion,function(err,documento){
													if(!err)
													{
														ubicacion['idlinea'] =doc[0].idlinea;
																//obj['Infraccion1']=falta['Infraccion1'];
																//obj['Infraccion2']=falta['Infraccion2'];
																//obj['Infraccion3']=falta['Infraccion3'];	
                                                                //console.log(ubicacion);
																if (y.length<=7) // son datos del arduino no del sd
																{
																	io.sockets.emit('lectura',ubicacion);
															 		 io.sockets.emit('informes',ubicacion);

															 		 ubicacion=falta=data1=y=resp=a=null;
															 		 delete ubicacion;
															 		 delete falta;
															 		 delete data1;
															 		 delete y;
															 		 delete resp;
															 		 delete a;
																}
															
													}
													else
													{
														 	
														//console.log("error"+ err);
													}


											
												});

											}
											else
											{
												//console.log(ubicacion);
												if (y.length<=7)
												{
													ubicacion['idlinea'] =doc[0].idlinea;
													io.sockets.emit('lectura',ubicacion);
													ubicacion=falta=data1=y=resp=a=null;
											 		 delete ubicacion;
											 		 delete falta;
											 		 delete data1;
											 		 delete y;
											 		 delete resp;
											 		 delete a;
												}
					                            	
											}
								                                   
								        }
								        else console.log("no hay 1");
								        
								      });
								   		
								      
								   	}						

								   						    
								});

							});

						}
			    });
		    }
					 	
					

        }

	
        
        //send data to guest socket.io chat server
        
    });
    socket.on('error',function(err){
        console.log(err);     
        clients.splice(clients.indexOf(socket.username), 1);
        io.sockets.emit('Clientes',clients);
        var objeto = {};
	    objeto['placa']=socket.username;
	    io.sockets.emit('lectura',objeto);

    });

    socket.on('end',function(){
         console.log('fin de conexion:'+socket.username);
         
         clients.splice(clients.indexOf(socket.username), 1);
         io.sockets.emit('Clientes',clients);
         
    });

    socket.setTimeout(60000);
	socket.on('timeout', () => {
	  console.log('socket timeout');
	  var objeto = {};
	  objeto['placa']=socket.username;
	  io.sockets.emit('lectura',objeto);
	  socket.end();
	});
    
});



tcpServer.listen(3000,function(){
	console.log("servidor TCP funcionando en port 3000");
});


//var serialport=require("serialport").SerialPort;

//var myPort=new serialport("COM3",{

  //baudrate: 19200,
  //parser: serialport.parsers.readline("\r\n")
//});

//myPort.on('open',onOpen);
//myPort.on('data',onData);

var conexion=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'dbtransporte'
});



conexion.connect(function(err,res){
	if(err) console.log("No se puede conectar a bd"+err);
	else
	console.log("Conectado a bd");

});


app.use(bodyParser.json({limit: '50mb'}));// para peticiones aplicaciones json
app.use(bodyParser.urlencoded({extended: true,limit:'50mb', parameterLimit:50000}));

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}));


// conexion base de datos




//carpeta estatica
app.use("/public",express.static('public'));



//carpeta por defecto de las vistas
app.set("view engine","jade");

// Iniciar sesion
app.post("/sessions",function(req,res){

	var data = {
			
			usuario : req.body.usuario,
			contrasena : req.body.password,
			
		};
   Usuario.sesion(data,function(err,user){
   	
      if(typeof user !== 'undefined' && user.length > 0)
      {
      	var us=JSON.parse(JSON.stringify(user))
        //console.log(us[0].idUsuario);
        req.session.user_id=us[0].idUsuario;
        res.send("1");
         
      }
      else
      {
        
        //console.log(user.length);
         res.send("0");
      }
      
    
   });
});



// ruta pagina inicial (login)
app.get("/",function(req,res){
 
 res.render("login"); 
});


// verificar si se ha iniciado sesion
app.use("/pages",route_login);

//ruta de las paginas de usuarios
app.use("/pages",route_usuario);
app.use("/pages",route_linea);
app.use("/pages",route_ubicacion);
app.use("/pages",route_ruta);
app.use("/pages",route_carro);
app.use("/pages",route_reportes);
app.use("/pages",route_configuracion);

io.on('connection', function (socket) {
	console.log('alguien se ha conectado: '+socket.id);
    console.log("CONEXION IO:"+clients);
	io.sockets.emit("Clientes",clients);
	  	
	
});
io.sockets.on('disconnect', function() {
// handle disconnect
	io.sockets.disconnect();
	io.sockets.close();

});

server.listen(port,function(){
	console.log("servidor HTTP funcionando puerto 8081");
});


   
function convertirFecha(fecha){

   
      return fecha[4]+fecha[5]+"-"+fecha[2]+fecha[3]+"-"+fecha[0]+fecha[1];
   
  
}

function convertirHora(hora){

	
    return hora[0]+hora[1]+":"+hora[2]+hora[3]+":"+hora[4]+hora[5];

	
}

function escapeSpecialChars(jsonString) {

            return jsonString.replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/\t/g, "\\t")
                .replace(/\f/g, "\\f");

        }


function buscar(data){
		var index=-1;		
		var n=CLIENTES.length;
		for(var i=0;i<n;i++){
			if(CLIENTES[i].id===data.id){
				index=i;
				break;
			}
		}
		try{
			return index;		
		}	
		finally
		{
            index=n=i=null;
		}		
			
}




getKilometros = function(lat1,lon1,lat2,lon2)
 {
 rad = function(x) {return x*Math.PI/180;}
var R = 6378.137; //Radio de la tierra en km
 var dLat = rad( lat2 - lat1 );
 var dLong = rad( lon2 - lon1 );
 var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
 var d = R * c;
 try
 {
 	return (d.toFixed(3)*1000); //Retorna tres decimales EN METROS
 }
 finally
 {
 	R=dLat=dLong=a=c=d=undefined;
	 delete R;
	 delete dlat;
	 delete dlong;
	 delete a;
	 delete c;
	 delete d;
 }


 }

 BuscarCliente=function(placa,ClientesArray)
 {
 	var ban=false;
 	var i=0;
 	var id=placa.toString().trim();
 	while(ban==false && i<ClientesArray.length)
 	{
 		var client=ClientesArray[i].toString().trim();
 		if(id==client)
 		{  //console.log("iguales");
 			ban=true;
 		
 		  //console.log(ban);
 	    }
 	    
 		i++;

 	}

    try
    {
    	return ban;
    }
    finally
    {
    	ban=i=id=client=undefined;
	 delete ban;
	 delete i;
	 delete id;
	 delete client;
    }
 	
 }


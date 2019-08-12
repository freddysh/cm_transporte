var net=require('net');
var sta=require('./estadisticas.js');
var Ruta = require('./models/modelo_ruta').ruta;
var i=0; // primer carro
var j=10; // ultimo carro




  
function connect(){
  if(i<j)
  {
   ConectInicio();
   conectFinal();
  }

}

setInterval(function(){ if(i<10) connect()},30000); //7 minutos

process.on('SIGINT',function(){
  console.log('\n######## sumary:')
  sta.sumarize();
  process.exit();

});

function ConectInicio()
  {
    process.stdout.write('#');
  var time=Date.now();
  var conn=net.createConnection(60000);
  var latencyTime=Date.now();

  conn.on('connect',function(){
    sta.collect('connect',Date.now()-time);
   console.log('conected');
    conn.write('CARRO'+i);
  
  });
  var Rutas=[];
  var n;
    Ruta.getLatLon(72,function(err,ruta){
      if(typeof ruta !== 'undefined' && ruta.length > 0)
      {
          
            for(var a in ruta)
            {
              //console.log(ruta[a].color);
              var datos={
                  lon:ruta[a].lon,
                  lat:ruta[a].lat
                }
                Rutas.push(datos);
                //
     
            }
      
    console.log(Rutas.length-1);
    var y=0;
    var m=i;
    n=Rutas.length-1; 
     //console.log(y);
     //console.log(n);
     sta.collect('data',Date.now()-latencyTime);
     setInterval(function(){
      if(y<n)
      {
         conn.write(Rutas[y].lat+','+Rutas[y].lon+',0.83,CARRO'+m+',121017,14290500,1');
         y=y+2;
      }
      else
      {

        conn.write(Rutas[n].lat+','+Rutas[n].lon+',0.83,CARRO'+m+',121017,14290500,1');
        n=n-2;
        
        if(n==0)
          n=Rutas.length-1;
      }
      //conn.write('-13.529431959118323,-71.9347973330078,0.83,CARRO2,121017,14290500,1');

      //console.log('y='+y+',n='+n);
      
    },10000);
     
     }
      else console.log('error');
        
     });
   
  conn.on('close',function(){
   console.log('closed');
   conn.end();
  });
  i++;

  }
  function conectFinal()
  {
    process.stdout.write('#');
  var time=Date.now();
  var conn=net.createConnection(60000);
  var latencyTime=Date.now();

  conn.on('connect',function(){
    sta.collect('connect',Date.now()-time);
   console.log('conected');
    conn.write('CARRO'+j);
  
  });
  var Rutas=[];
  var n;
    Ruta.getLatLon(72,function(err,ruta){
      if(typeof ruta !== 'undefined' && ruta.length > 0)
      {
          
            for(var a in ruta)
            {
              //console.log(ruta[a].color);
              var datos={
                  lon:ruta[a].lon,
                  lat:ruta[a].lat
                }
                Rutas.push(datos);
                //
     
            }
      
    console.log(Rutas.length-1);
    var y=0;
    var m=j;
    n=Rutas.length-1; 
     //console.log(y);
     //console.log(n);
     sta.collect('data',Date.now()-latencyTime);
     setInterval(function(){
      if(y<n)
      {
         conn.write(Rutas[n].lat+','+Rutas[n].lon+',0.83,CARRO'+m+',121017,14290500,1');
         n=n-2;
      }
      else
      {

        conn.write(Rutas[y].lat+','+Rutas[y].lon+',0.83,CARRO'+m+',121017,14290500,1');
        y=y+2;
        
        if(y==Rutas.length-1)
          y=0;
      }
      //conn.write('-13.529431959118323,-71.9347973330078,0.83,CARRO2,121017,14290500,1');

      //console.log('y='+y+',n='+n);
      
    },10000);
     
     }
      else console.log('error');
        
     });
   
  conn.on('close',function(){
   console.log('closed');
   conn.end();
  });
  j--;
    
  }
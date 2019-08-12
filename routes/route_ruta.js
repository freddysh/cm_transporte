var express=require("express");
var router=express.Router();
//obtenemos el modelo UserModel con toda la funcionalidad
var Ruta = require('../models/modelo_ruta').ruta;
var Configuracion = require('../models/modelo_configuracion').configuracion;








router.route("/new_mapa")
.get(function(req,res){
  Configuracion.getVelocidades(function(error,result){
     res.render("./modal/NuevaRuta",{velocidades:JSON.parse(JSON.stringify(result))});
  });

  
  
})
.post(function(req,res){

 
   var data = [];
     
     data=JSON.parse(JSON.stringify(req.body));  
     console.log(req.body);

     var ruta=data.ruta;
     var rutas={
      idlinea:data.idlinea
     }
     var velocidad=data.idvelocidad;
       //console.log(rutas);
  
  Ruta.insertRuta(rutas,function(err,documento){
    
      //si el usuario se ha insertado correctamente mostramos su info
      if(documento && documento.insertId)
      {
        Ruta.getRuta(data.idlinea,function(err,doc){
          if(typeof doc !== 'undefined' && doc.length > 0)
          {
              var idruta1=doc[0].idruta;

               for(var a in ruta)
               {
                  var latlon={
                    lat:ruta[a].lat,
                    lon:ruta[a].lng,
                    idruta:idruta1,
                    idvelocidad:velocidad[a]
                    
                  }
                  console.log(latlon);
                 
                  Ruta.insertLatLon(latlon,function(err,documento){
              
                  //si el usuario se ha insertado correctamente mostramos su info
                  if(documento && documento.insertId)
                  {

                    
                   ban="1";
                   
                  }
                  else
                  {
                    ban="0";
                    
                  }

                  });
              }

        }
        else
        {
          res.send('0');
        }

        });
           
          
         
            res.send('1');
          
      }
      else
      {
        res.send('0');
      }

    
  });
});





// recupera un usuario(get: recupera el usuario,put: actualiza datos de ususario, delete:elimina datos de usuario)
router.route("/new_mapa/:id")
.get(function(req,res){
   Ruta.getRuta(req.params.id,function(err,doc){
    //console.log(user);
   	if(typeof doc !== 'undefined' && doc.length > 0)
   	{
     // console.log(doc[0].nombre);
      Ruta.getLatLon(doc[0].idruta,function(err,ruta){

        if(typeof ruta !== 'undefined' && ruta.length > 0)
        {
            var Rutas=[];
            for(var a in ruta)
            {
              //console.log(ruta[a].color);
              var datos={
                  long:ruta[a].lon,
                  lat:ruta[a].lat,
                  idvelocidad:ruta[a].color
                }
                Rutas.push(datos);
     
            }
             res.send(Rutas);          
    
        }
        else
        {
          res.send("no existe");
        }
      });
   		
      
   	}
   	else
    		res.send("no existe");
    


   });
   

})
.delete(function(req,res){
   Ruta.deleteRuta(req.params.id,function(err,data){
   	  if(data && data.msg === "deleted" || data.msg === "notExist")
			{
				res.send("1");
			}
			else
			{
				res.send("0");
			}

   });
});



module.exports=router;
 

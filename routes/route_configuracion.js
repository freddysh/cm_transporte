var express=require("express");
var router=express.Router();
//obtenemos el modelo UserModel con toda la funcionalidad
var Configuracion = require('../models/modelo_configuracion').configuracion;




//recupera todos las lineas de la bd
router.route("/configuracion")
.get(function(req,res){
  Configuracion.getConfiguracion(function(error,conf){
       if(error)
        {console.log("error");}
        else
        {
          Configuracion.getVelocidades(function(err,vel){
            console.log(conf.length);
            if(conf.length==0)
            {
              var datos=[];
              var configu={
               seguridad:0,
               ruta:0
             }
             datos.push(configu);
               console.log(datos);
               res.render("pages/configuracion",{ configuracion: datos,velocidad:JSON.parse(JSON.stringify(vel))});
            }
            else
            {
              console.log(JSON.parse(JSON.stringify(conf)));
              res.render("pages/configuracion",{ configuracion: JSON.parse(JSON.stringify(conf)),velocidad:JSON.parse(JSON.stringify(vel))});
            }

          });
        }
       
      // console.log(JSON.parse(JSON.stringify(doc)));
       
  });
});


//recupera todos las velocidades de una configuracion
router.route("/velocidades")
.get(function(req,res){
	Configuracion.getVelocidad(function(error,doc){
       if(error){console.log("error");}
       
       //console.log(JSON.parse(JSON.stringify(doc)));
       res.send(JSON.parse(JSON.stringify(doc)));
	});
});



// nueva Configuracion
router.route("/new_Configuracion/:seguridad/:ruta")
.post(function(req,res){

   var Conf= {

       seguridad:req.params.seguridad, 
      ruta:req.params.ruta
   };
  
  Configuracion.insertConfiguracion(Conf,function(err,documento){
    
      //si el usuario se ha insertado correctamente mostramos su info
      if(documento && documento.insertId || documento.msg)
      {
        res.send('1');

        console.log(documento);
      }
      else
      {
        res.send('0');
      }

    
  });
});


// nueva Velocidad
router.route("/new_velocidad")
.get(function(req,res){

  res.render("./modal/nuevaVelocidad");
  
})
.post(function(req,res){

   var Vel= {
       zona:req.body.zona, 
      velocidad:req.body.velocidad,
      color:req.body.color
   };
  
  Configuracion.insertVelocidad(Vel,function(err,documento){
    
      //si el usuario se ha insertado correctamente mostramos su info
      if(documento && documento.insertId)
      {
        res.send('1');

        console.log(documento);
      }
      else
      {
        res.send('0');
      }

    
  });
});


// recupera un velocidad(get: recupera velocidad,put: actualiza datos de velocidad, delete:elimina datos de velocidad)
router.route("/velocidad/:id")
.get(function(req,res){
   Configuracion.getVelocidad(req.params.id,function(err,user){
    if(!err)
    {
      
      var us=JSON.parse(JSON.stringify(user))
      res.render("./modal/modificarVelocidad",{ velocidad: us})
    }
    else
      console.log("no existe");


   });
   

})
.put(function(req,res){
  Configuracion.getVelocidad(req.params.id,function(err,user){
    if(err){
      res.send("0");
    }
    else
      {
        var Vel= {
          idvelocidad:req.params.id,
          zona:req.body.zona, 
      velocidad:req.body.velocidad,
            color:req.body.color
       };
       
            
        Configuracion.updateVelocidad(Vel,function(error,documento){
          if(error)
            res.send("0");
          else
            res.send("1");
              
        });
      }


   });
})
.delete(function(req,res){
   Configuracion.deleteVelocidad(req.params.id,function(err,data){
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
var express=require("express");
var router=express.Router();
//obtenemos el modelo UserModel con toda la funcionalidad
var Carro = require('../models/modelo_carro').carro;
var Linea=require("../models/modelo_linea").linea;
var Ubicacion=require("../models/modelo_ubicacion").ubicacion;



router.get("/reportes",function(req,res){
  Linea.getLineas(function(err,doc){
    //console.log(doc);
    //console.log("doc");
    if(!err)
      res.render("pages/reportes",{lineas:JSON.parse(JSON.stringify( doc))})

  });
 
});

router.get("/historial",function(req,res){
  Linea.getLineas(function(err,doc){
    //console.log(doc);
    //console.log("doc");
    if(!err)
      res.render("pages/historial",{lineas:JSON.parse(JSON.stringify( doc))})

  });
 
});


//recupera todos los carros de una linea
router.route("/carrosLinea/:id")
.get(function(req,res){
	Carro.getCarrosLinea(req.params.id,function(error,doc){
       if(error){console.log("error");}
       
       //console.log(JSON.parse(JSON.stringify(doc)));
       res.send(JSON.parse(JSON.stringify(doc)));
	});
});

router.route("/HistorialCarro/:id/:fecha")
.get(function(req,res){
  console.log(req.params.id);
  console.log(req.params.fecha);
  Ubicacion.getUbicacionCarro(req.params.id,req.params.fecha,function(error,doc){
       if(error){console.log("error");}
       
       //console.log(JSON.parse(JSON.stringify(doc)));
       res.send(JSON.parse(JSON.stringify(doc)));
  });
});

router.route("/HistorialLinea/:id/:fecha1/:fecha2")
.get(function(req,res){
  //console.log(req.params.id);
  //console.log(req.params.fecha);
  Ubicacion.getHistorialLinea(req.params.id,req.params.fecha1,req.params.fecha2,function(error,doc){
       if(error){console.log("error");}
       
       //console.log(JSON.parse(JSON.stringify(doc)));
       res.send(JSON.parse(JSON.stringify(doc)));
  });
});




module.exports=router;
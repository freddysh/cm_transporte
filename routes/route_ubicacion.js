var express=require("express");
var Linea=require("../models/modelo_linea").linea;
var Carro=require("../models/modelo_carro").carro;
var Ubicacion=require("../models/modelo_ubicacion").ubicacion;
var Configuracion = require('../models/modelo_configuracion').configuracion;
var router=express.Router();




router.get("/TiempoReal",function(req,res){
  Linea.getLineas(function(err,doc){
  	//console.log(doc);
  	if(!err)
    {
      Configuracion.getVelocidades(function(err,vel){
        res.render("pages/TiempoReal",{lineas:JSON.parse(JSON.stringify( doc)),velocidad:JSON.parse(JSON.stringify( vel))})
      });
  		
    }

  });
 
});

router.get("/TiempoReal/:linea",function(req,res){
  Linea.getLineas(function(err,doc){
    //console.log(doc);
    if(!err)
    {
      Configuracion.getVelocidades(function(err,vel){
        res.render("pages/TiempoReal",{lineas:JSON.parse(JSON.stringify( doc)),velocidad:JSON.parse(JSON.stringify( vel)),linea:req.params.linea})
      });
      
    }

  });
 
});

router.route("/Informes/:fecha")
.get(function(req,res){
   Ubicacion.getHistorial(req.params.fecha,function(err,doc){
    if(!err)
    {
      
      res.send(doc);
    }
    else
      console.log("no existe");


   });
   

});



router.route("/carrosH/:id")
.get(function(req,res){
   Ubicacion.getHistorialCarro(req.params.id,function(err,doc){
   	if(!err)
   	{
   		
   		//res.render("pages/Historial",{ historial: JSON.parse(JSON.stringify(doc)) })
   	}
   	else
   		console.log("no existe");


   });
   

});

function convertirFecha(fecha){

  
  var cadena;
   
      cadena=fecha[4]+fecha[5]+"-"+fecha[2]+fecha[3]+"-"+fecha[0]+fecha[1];
   
  return cadena;
   //console.log(cadena);
}

function convertirHora(hora){

	var hora
    hora=hora[0]+hora[1]+":"+hora[2]+hora[3]+":"+hora[4]+hora[5];

	return hora;
}

  

module.exports=router;
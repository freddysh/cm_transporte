var express=require("express");
var Ruta=require("../models/models_ruta").ruta;
var router=express.Router();





router.route("/new_mapa")
.get(function(req,res){

	res.render("./modal/NuevaRuta");
	
})
.post(function(req,res){

 
   var data = [];
     
     data=JSON.parse(JSON.stringify(req.body));  
     console.log(req.body);

     var ruta=data.ruta;
     var rutas=new Ruta;
       
      rutas.nombre=data.nombre; 
      for(var a in ruta) {
		   
		  // console.log(ruta[a].lat);
		   rutas.ruta.push({
		   	lat:ruta[a].lat,
		   	long:ruta[a].lng,
		   })
		    
		}
      //console.log(rutas);

    

	rutas.save(function(err,documento){
		if(err){
			 	
			 	res.send('0');
			 	console.log(err);
			}else{
			 	
			 	res.send('1');

			 	console.log(documento);
			}


		
	});
});

router.route("/new_mapa/:nombre")
.get(function(req,res){
   Ruta.findOne({"nombre":req.params.nombre},function(err,user){
   	if(user!=null)
   	{
   		var Rutas=[];
   		Rutas=user;
   		//Rutas=JSON.parse(JSON.stringify(user));
   		//console.log(user.ruta);
   		//console.log(user.ruta);
   		res.send(user.ruta);
   		//res.render("./modal/NuevaRuta",{datosruta:user.ruta});
   	}
   	else{

   		res.send("no existe");
   	}


   });
})
.delete(function(req,res){
   Ruta.findOneAndRemove({"nombre": req.params.nombre},function(err){
   	  if(!err)
   	  	res.send('1');
   	  else
   	  	res.send('0');

   });
});




module.exports=router;
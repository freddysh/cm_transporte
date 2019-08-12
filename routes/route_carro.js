var express=require("express");
var router=express.Router();
//obtenemos el modelo UserModel con toda la funcionalidad
var Carro = require('../models/modelo_carro').carro;
var Linea=require("../models/modelo_linea").linea;



//recupera todos las lineas de la bd
router.route("/carros")
.get(function(req,res){
  Linea.getLineas(function(error,doc){
       if(error){console.log("error");}
       
      // console.log(JSON.parse(JSON.stringify(doc)));
       res.render("pages/carros",{ lineas: JSON.parse(JSON.stringify(doc)) });
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




// nuevo usuario
router.route("/new_carro/:id")
.get(function(req,res){

	 Linea.getLineas(function(err,doc){
      res.render("./modal/nuevoCarro",{linea:req.params.id});
  });
	
});

router.route("/new_carro")
.post(function(req,res){

   var carro= {
   	   placa:req.body.placa, 
      idlinea:req.body.idlinea,
     chofer:req.body.chofer,
     dni:req.body.dni
   };

   Carro.getCarroPlaca(req.body.placa,function(err,doc){

     if(typeof doc !== 'undefined' && doc.length > 0)
     {
          res.send('2');

     }
     else
     {
          Carro.insertCarro(carro,function(err,documento){
          
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
     }
      

   });
  
  	
});


// recupera un usuario(get: recupera el usuario,put: actualiza datos de ususario, delete:elimina datos de usuario)
router.route("/carros/:id")
.get(function(req,res){
   Carro.getCarro(req.params.id,function(err,user){
   	if(!err)
   	{

   		 Linea.getLineas(function(err,doc){

          var us=JSON.parse(JSON.stringify(user))
          res.render("./modal/modificarCarro",{ carro: us,lineas:JSON.parse(JSON.stringify( doc))})
       });
   		
   	}
   	else
   		console.log("no existe");


   });
   

})
.put(function(req,res){
  Carro.getCarro(req.params.id,function(err,user){
   	if(err){
   		res.send("0");
   	}
   	else
   		{
   			var carro= {
   				idcarro:req.params.id,
		   	   placa:req.body.placa, 
		      idlinea:req.body.idlinea,
		     chofer:req.body.chofer,
		     dni:req.body.dni
		   };

       	   
          Carro.updateCarro(carro,function(error,documento){
   				if(error)
   					res.send("0");
   				else
          {
            
   					res.send("1");
          }
   				    
   			});
   		}


   });
})
.delete(function(req,res){
   //console.log(req.params.id);
   Carro.deleteCarro(req.params.id,function(err,data){
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
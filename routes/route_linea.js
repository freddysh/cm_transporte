var express=require("express");
var router=express.Router();
//obtenemos el modelo UserModel con toda la funcionalidad
var Linea = require('../models/modelo_linea').linea;




//recupera todos los usuarios de la bd
router.route("/lineas")
.get(function(req,res){
	Linea.getLineas(function(error,doc){
       if(error){console.log("error");}
       
      // console.log(JSON.parse(JSON.stringify(doc)));
       res.render("pages/lineas",{ lineas: JSON.parse(JSON.stringify(doc)) })
	});
});



// nuevo usuario
router.route("/new_linea")
.get(function(req,res){

	res.render("./modal/nuevaLinea");
	
})
.post(function(req,res){

   var linea= {
   	   nombre:req.body.nombre, 
      ruta:req.body.ruta,
     direccion:req.body.direccion,
     responsable:req.body.responsable,
      telefono:req.body.telefono,
     email:req.body.email,
     chofer:req.body.chofer
   };

   Linea.getLineaN(req.body.nombre,function(err,doc){

     if(typeof doc !== 'undefined' && doc.length > 0)
     {
          res.send('2');

     }
     else
     {
          Linea.insertLinea(linea,function(err,documento){
          
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
router.route("/lineas/:id")
.get(function(req,res){
   Linea.getLinea(req.params.id,function(err,user){
   	if(!err)
   	{
   		
   		var us=JSON.parse(JSON.stringify(user))
   		res.render("./modal/modificarLinea",{ linea: us})
   	}
   	else
   		console.log("no existe");


   });
   

})
.put(function(req,res){
  Linea.getLinea(req.params.id,function(err,user){
   	if(err){
   		res.send("0");
   	}
   	else
   		{
   			var linea= {
           idlinea:req.params.id,
           nombre:req.body.nombre, 
          ruta:req.body.ruta,
         direccion:req.body.direccion,
         responsable:req.body.responsable,
          telefono:req.body.telefono,
         email:req.body.email,
         chofer:req.body.chofer
       };

       	   
           console.log(linea);  
   			Linea.updateLinea(linea,function(error,documento){
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
   console.log(req.params.id);
   Linea.deleteLinea(req.params.id,function(err,data){
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
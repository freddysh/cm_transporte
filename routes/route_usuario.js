var express=require("express");
var router=express.Router();
//obtenemos el modelo UserModel con toda la funcionalidad
var Usuario = require('../models/modelo_usuario').usuario;





//pagina despues de iniciar sesion
router.get("/index",function(req,res){
 console.log(req.session.user_id);
 res.render("pages/index"); 
});


//recupera todos los usuarios de la bd
router.route("/usuarios")
.get(function(req,res){
	Usuario.getUsuarios(function(error,doc){
       if(error){console.log("error");}
       
      // console.log(JSON.parse(JSON.stringify(doc)));
       res.render("pages/usuarios",{ usuarios: JSON.parse(JSON.stringify(doc)) })
	});
});



// nuevo usuario
router.route("/new_usuario")
.get(function(req,res){

	res.render("./modal/nuevoUsuario");
	
})
.post(function(req,res){

   var User= {
   	   nombre:req.body.nombre, 
      usuario:req.body.usuario,
	  contrasena:req.body.password
   };
  
	Usuario.insertUsuario(User,function(err,documento){
		
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


// recupera un usuario(get: recupera el usuario,put: actualiza datos de ususario, delete:elimina datos de usuario)
router.route("/usuarios/:id")
.get(function(req,res){
   Usuario.getUsuario(req.params.id,function(err,user){
   	if(!err)
   	{
   		
   		var us=JSON.parse(JSON.stringify(user))
   		res.render("./modal/modificarUsuario",{ usuario: us})
   	}
   	else
   		console.log("no existe");


   });
   

})
.put(function(req,res){
  Usuario.getUsuario(req.params.id,function(err,user){
   	if(err){
   		res.send("0");
   	}
   	else
   		{
   			var User= {
   				idUsuario:req.params.id,
		   	    nombre:req.body.nombre, 
		        usuario:req.body.usuario,
			    contrasena:req.body.password
		   };
		   
            
   			Usuario.updateUsuario(User,function(error,documento){
   				if(error)
   					res.send("0");
   				else
   					res.send("1");
   				    
   			});
   		}


   });
})
.delete(function(req,res){
   Usuario.deleteUsuario(req.params.id,function(err,data){
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





// rutas de todas las paginas
router.get("/blank.jade",function(req,res){
  res.render("pages/blank");
});
router.get("/buttons.jade",function(req,res){
  res.render("pages/buttons");
});
router.get("/charts.jade",function(req,res){
  res.render("pages/charts");
});
router.get("/compose.jade",function(req,res){
  res.render("pages/compose");
});
router.get("/controls.jade",function(req,res){
  res.render("pages/controls");
});
router.get("/general.jade",function(req,res){
  res.render("pages/general");
});
router.get("/inbox.jade",function(req,res){
  res.render("pages/inbox");
});
router.get("/modals.jade",function(req,res){
  res.render("pages/modals");
});
router.get("/orders.jade",function(req,res){
  res.render("pages/orders");
});
router.get("/panels.jade",function(req,res){
  res.render("pages/panels");
});
router.get("/products.jade",function(req,res){
  res.render("pages/products");
});
router.get("/sent.jade",function(req,res){
  res.render("pages/sent");
});
router.get("/table_data.jade",function(req,res){
  res.render("pages/table_data");
});
router.get("/table_sortable.jade",function(req,res){
  res.render("pages/table_sortable");
});
router.get("/table_static.jade",function(req,res){
  res.render("pages/table_static");
});
router.get("/tabs.jade",function(req,res){
  res.render("pages/tabs");
});
router.get("/texteditor.jade",function(req,res){
  res.render("pages/texteditor");
});
router.get("/validation.jade",function(req,res){
  
  res.render("pages/validation");
});





module.exports=router;
 

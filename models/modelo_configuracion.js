var mysql = require('mysql'),
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
connection = mysql.createConnection(
	{ 
	host:'localhost',
	user:'root',
	password:'',
	database:'dbtransporte'
	}
);
 
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var userModel = {};
 
//obtenemos configuracion
userModel.getConfiguracion = function(callback)
{
	if (connection) 
	{
		var sql='SELECT * FROM tconfiguracion';
		connection.query(sql, function(error, rows) {
			if(error)
			{
				throw error;
			}
			else
			{
				sql=undefined;
				delete sql;
				callback(error, rows);
			}
		});
	}
}
 
 
 

//obtenemos las velocidades de la configuracion
userModel.getVelocidades = function(callback)
{
	if (connection) 
	{
		connection.query('SELECT * FROM tvelocidad', function(error, rows) {
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, rows);
			}
		});
	}
}


userModel.getVelocidad = function(id, callback)
{
//obtenemos una velocidad
	//console.log(userData); return;
	if(connection)
	{
		var sql = 'SELECT *from tvelocidad where idvelocidad = ' + connection.escape(id);
		//console.log(sql);
 
		connection.query(sql, function(error, result) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				sql=undefined;
				delete sql;
				        
				callback(null,result);
			}
		});
	}
}
 
//añadir velocidad
userModel.insertVelocidad = function(userData,callback)
{
	if (connection) 
	{
		connection.query('INSERT INTO tvelocidad SET ?', userData, function(error, result) 
	    {
			if(error)
			{
				throw error;
			}
			else
			{
				//devolvemos la última id insertada
				callback(null,{"insertId" : result.insertId});
			}
		});
		
	}
}
//añadir una nueva Conficguracion
userModel.insertConfiguracion = function(userData,callback)
{
	if (connection) 
	{
		var sqlExists = 'SELECT * FROM tconfiguracion ';
		//console.log(sqlExists);
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id del usuario a eliminar
			console.log(row.length);
			if(row.length>0)
			{console.log("modifica");
				var sql = 'UPDATE tconfiguracion SET seguridad = ' + connection.escape(userData.seguridad) + ',' +  
				'ruta = ' + connection.escape(userData.ruta) + 
				' WHERE idconfiguracion = ' + row[0].idconfiguracion;
				//console.log(sql);
		 
				connection.query(sql, function(error, result) 
				{
					if(error)
					{
						throw error;
					}
					else
					{
						sql=undefined;
						sqlExists=undefined;
				        delete sql;
				        delete sqlExists;
						callback(null,{"msg":"success"});
					}
				});
				
			}
			else
			{console.log("inserta");
               connection.query('INSERT INTO tconfiguracion SET ?', userData, function(error, result) 
				{
					console.log("entra");
					if(error)
					{
						throw error;
					}
					else
					{
						sqlExists=undefined;
				      
				        delete sqlExists;
						//devolvemos la última id insertada
						callback(null,{"insertId" : result.insertId});
					}
				});

			}
		});
	}
}
 
//actualizar configuracion
userModel.updateConfiguracion = function(userData, callback)
{
	//console.log(userData); return;
	if(connection)
	{
		
	}
}

//actualizar velocidad
userModel.updateVelocidad = function(userData, callback)
{
	//console.log(userData); return;
	if(connection)
	{
		var sql = 'UPDATE tvelocidad SET zona = ' + connection.escape(userData.zona) + ',' +  
		'velocidad = ' + connection.escape(userData.velocidad) +',' + 
		'color='+ connection.escape(userData.color) + 
		' WHERE idvelocidad = ' + userData.idvelocidad;
		//console.log(sql);
 
		connection.query(sql, function(error, result) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				sql=undefined;
				delete sql;
				callback(null,{"msg":"success"});
			}
		});
	}
}



 
//eliminar Configuracion
userModel.deleteConfiguracion = function(idconfiguracion, callback)
{
	if(connection)
	{
		var sqlExists = 'SELECT * FROM tconfiguracion WHERE idconfiguracion = ' + connection.escape(idconfiguracion);
		//console.log(sqlExists);
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id del usuario a eliminar
			if(row)
			{
				var sql = 'DELETE FROM tconfiguracion WHERE idconfiguracion = ' + connection.escape(idconfiguracion);

				connection.query(sql, function(error, result) 
				{
					if(error)
					{
						throw error;
						
					}
					else
					{
						var sql = 'DELETE FROM tvelocidad WHERE idconfiguracion = ' + connection.escape(idconfiguracion);
						connection.query(sql, function(erro, resultado) 
						{
							if(erro)
							{
								throw error;
								
							}
							else
							{
								sql=undefined;
								sqlExists=undefined;
						        delete sql;
						        delete sqlExists;
								callback(null,{"msg":"deleted"});

							}
						});

					}
				});
			}
			else
			{
				sqlExists=undefined;
				delete sqlExists;
				callback(null,{"msg":"notExist"});
			}
		});
	}
}
 

 // eliminar velocidad 

 userModel.deleteVelocidad = function(idvelocidad, callback)
{
	if(connection)
	{
		var sqlExists = 'SELECT * FROM tvelocidad WHERE idvelocidad = ' + connection.escape(idvelocidad);
		//console.log(sqlExists);
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id del usuario a eliminar
			if(row)
			{
				var sql = 'DELETE FROM tvelocidad WHERE idvelocidad = ' + connection.escape(idvelocidad);

				connection.query(sql, function(error, result) 
				{
					if(error)
					{
						throw error;
						
					}
					else
					{
						sql=null;
						sqlExists=null;
				        delete sql;
				        delete sqlExists;
						callback(null,{"msg":"deleted"});

					}
				});
			}
			else
			{
				sqlExists=null;
				delete sqlExists;
				callback(null,{"msg":"notExist"});
			}
		});
	}
}
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports.configuracion = userModel;
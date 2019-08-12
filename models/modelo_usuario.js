//llamamos al paquete mysql que hemos instalado
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
 
//obtenemos todos los usuarios
userModel.getUsuarios = function(callback)
{
	if (connection) 
	{
		connection.query('SELECT * FROM tusuario ORDER BY idUsuario', function(error, rows) {
			if(error)
			{
				throw error;
			}
			else
			{
				callback(error, rows);
			}
		});
	}
}
 
//obtenemos un usuario por su id
userModel.getUsuario = function(id,callback)
{
	if (connection) 
	{
		var sql = 'SELECT * FROM tusuario WHERE idUsuario = ' + connection.escape(id);
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, row);
			}
		});
	}
}

//iniciar sesion
userModel.sesion = function(data,callback)
{
	if (connection) 
	{
		var sql = 'SELECT * FROM tusuario WHERE usuario = ' + connection.escape(data.usuario) + ' and ' +  
					'contrasena='+connection.escape(data.contrasena)
		//console.log(sql);			
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, row);
			}
		});
	}
}
 
//añadir un nuevo usuario
userModel.insertUsuario = function(userData,callback)
{
	if (connection) 
	{
		console.log(userData);
		connection.query('INSERT INTO tusuario SET ?', userData, function(error, result) 
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
 
//actualizar un usuario
userModel.updateUsuario = function(userData, callback)
{
	//console.log(userData); return;
	if(connection)
	{
		var sql = 'UPDATE tusuario SET nombre = ' + connection.escape(userData.nombre) + ',' +  
		'usuario = ' + connection.escape(userData.usuario) +',' + 
		'contrasena = ' + connection.escape(userData.contrasena) +
		' WHERE idUsuario = ' + userData.idUsuario;
		console.log(sql);
 
		connection.query(sql, function(error, result) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null,{"msg":"success"});
			}
		});
	}
}
 
//eliminar un usuario pasando la id a eliminar
userModel.deleteUsuario = function(id, callback)
{
	if(connection)
	{
		var sqlExists = 'SELECT * FROM tusuario WHERE idUsuario = ' + connection.escape(id);
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id del usuario a eliminar
			if(row)
			{
				var sql = 'DELETE FROM tusuario WHERE idUsuario = ' + connection.escape(id);
				connection.query(sql, function(error, result) 
				{
					if(error)
					{
						throw error;
					}
					else
					{
						callback(null,{"msg":"deleted"});
					}
				});
			}
			else
			{
				callback(null,{"msg":"notExist"});
			}
		});
	}
}
 
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports.usuario = userModel;
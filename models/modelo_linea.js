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
userModel.getLineas = function(callback)
{
	if (connection) 
	{
		connection.query('SELECT tlinea.idlinea,tlinea.nombre,tlinea.ruta,tlinea.direccion,tlinea.responsable,tlinea.email,tlinea.telefono,count(tcarro.idlinea) AS NUM FROM tlinea left join tcarro on tlinea.idlinea=tcarro.idlinea  GROUP BY idlinea ', function(error, rows) {
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
userModel.getLinea = function(id,callback)
{
	if (connection) 
	{
		var sql = 'SELECT * FROM tlinea WHERE idlinea = ' + connection.escape(id);
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

//obtenemos un usuario por su nombre
userModel.getLineaN = function(nombre,callback)
{
	if (connection) 
	{
		var sql = 'SELECT * FROM tlinea WHERE nombre = ' + connection.escape(nombre);
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

 
//añadir un nueva linea
userModel.insertLinea = function(userData,callback)
{
	if (connection) 
	{
		connection.query('INSERT INTO tlinea SET ?', userData, function(error, result) 
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
userModel.updateLinea = function(userData, callback)
{
	//console.log(userData); return;
	if(connection)
	{
		var sql = 'UPDATE tlinea SET nombre = ' + connection.escape(userData.nombre) + ',' +  
		'ruta = ' + connection.escape(userData.ruta) +',' + 
		'direccion = ' + connection.escape(userData.direccion) +',' + 
		'responsable = ' + connection.escape(userData.responsable) +',' + 
		'email = ' + connection.escape(userData.email) +',' + 
		'telefono = ' + connection.escape(userData.telefono) +',' + 
		'chofer = ' + connection.escape(userData.chofer) +',' + 
		'DNI = ' + connection.escape(userData.DNI) +
		' WHERE idlinea = ' + userData.idlinea;
		//console.log(sql);
 
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
userModel.deleteLinea = function(idlinea, callback)
{
	if(connection)
	{
		var sqlExists = 'SELECT * FROM tlinea WHERE idlinea = ' + connection.escape(idlinea);
		console.log(sqlExists);
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id del usuario a eliminar
			if(row)
			{
				var sql = 'DELETE FROM tlinea WHERE idlinea = ' + connection.escape(idlinea);

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
module.exports.linea = userModel;
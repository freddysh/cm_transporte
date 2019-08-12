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
userModel.getCarros = function(callback)
{
	if (connection) 
	{
		connection.query('SELECT * FROM tcarro ORDER BY idcarro', function(error, rows) {
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
 
 
 //obtenemos todos los carros con el nombre de linea
userModel.getCarrosNombreLinea = function(callback)
{
	if (connection) 
	{
		connection.query('select tlinea.nombre,tcarro.idcarro,tcarro.idlinea,tcarro.placa,tcarro.chofer,tcarro.dni  from tlinea INNER join tcarro where tlinea.idlinea=tcarro.idlinea', function(error, rows) {
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
//obtenemos un carro por su id
userModel.getCarro = function(id,callback)
{
	if (connection) 
	{
		var sql = 'select tlinea.nombre,tcarro.idcarro,tcarro.idlinea,tcarro.placa,tcarro.chofer,tcarro.dni  from tlinea INNER join tcarro where tlinea.idlinea=tcarro.idlinea and tcarro.idcarro=' + connection.escape(id);
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				sql=undefined;
				delete sql;
				callback(null, row);
				
			}
		});
	}
}

//obtenemos carros de una linea
userModel.getCarrosLinea = function(id,callback)
{
	if (connection) 
	{
		var sql = 'select tlinea.nombre,tcarro.idcarro,tcarro.idlinea,tcarro.placa,tcarro.chofer,tcarro.dni  from tlinea INNER join tcarro where tlinea.idlinea=tcarro.idlinea and tcarro.idcarro and tlinea.idlinea=' + connection.escape(id);
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				sql=undefined;
				delete sql;
				callback(null, row);
				
			}
		});
	}
}
//obtenemos un usuario por su nombre
userModel.getCarroPlaca = function(placa,callback)
{
	if (connection) 
	{
		var sql = 'SELECT * FROM tcarro WHERE placa = ' + connection.escape(placa);
		connection.query(sql, function(error, row) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				sql=undefined;
				delete sql;
				callback(null, row);

			}
		});
	}
}

 
//añadir un nuevo carro
userModel.insertCarro = function(userData,callback)
{
	if (connection) 
	{
		connection.query('INSERT INTO tcarro SET ?', userData, function(error, result) 
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
 
//actualizar un carro
userModel.updateCarro = function(userData, callback)
{
	//console.log(userData); return;
	if(connection)
	{
		var sql = 'UPDATE tcarro SET placa = ' + connection.escape(userData.placa) + ',' +  
		'idlinea = ' + connection.escape(userData.idlinea) +',' + 
		'chofer = ' + connection.escape(userData.chofer) +',' + 
		'dni = ' + connection.escape(userData.dni) +
		' WHERE idcarro = ' + userData.idcarro;
		//console.log(sql);
 
		connection.query(sql, function(error, result) 
		{
			if(error)
			{
				throw error;
			}
			else
			{
				sql=null;
				delete sql;
				callback(null,{"msg":"success"});
			}
		});
	}
}



 
//eliminar un usuario pasando la id a eliminar
userModel.deleteCarro = function(idcarro, callback)
{
	if(connection)
	{
		var sqlExists = 'SELECT * FROM tcarro WHERE idcarro = ' + connection.escape(idcarro);
		console.log(sqlExists);
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id del usuario a eliminar
			if(row)
			{
				var sql = 'DELETE FROM tcarro WHERE idcarro = ' + connection.escape(idcarro);

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
module.exports.carro = userModel;
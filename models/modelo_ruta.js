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
var rutaModel = {};
 

 
//obtenemos un mapa por el id
rutaModel.getRuta = function(id,callback)
{
	if (connection) 
	{
		var sql = 'SELECT * FROM truta WHERE idlinea = ' + connection.escape(id);
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


//obtenemos lat lon de una ruta
rutaModel.getLatLon = function(idruta,callback)
{
	if (connection) 
	{
		var sql = 'select tlatlon.idlatlong,tlatlon.lat,tlatlon.lon,tlatlon.idruta,tvelocidad.color,tvelocidad.velocidad from tlatlon INNER join tvelocidad where tlatlon.idvelocidad=tvelocidad.idvelocidad and idruta = ' + connection.escape(idruta)+ ' order by tlatlon.idlatlong';
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


 
//añadir un nuevo mapa
rutaModel.insertRuta = function(userData,callback)
{
	if (connection) 
	{
		connection.query('INSERT INTO truta SET ?', userData, function(error, result) 
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


//añadir un nuevo mapa lat lon
rutaModel.insertLatLon = function(userData,callback)
{
	connection.query('INSERT INTO tlatlon SET ?', userData, function(error, result) 
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
	

 

//eliminar uruta
rutaModel.deleteRuta = function(id, callback)
{
	if(connection)
	{
		var sqlExists = 'SELECT * FROM truta WHERE idlinea = ' + connection.escape(id);
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id del usuario a eliminar
			if(row)
			{
				var sql = 'DELETE FROM truta WHERE idlinea = ' + connection.escape(id);
				console.log(sql);
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
module.exports.ruta = rutaModel;
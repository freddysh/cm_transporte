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
 
//obtenemos el historial de infracciones de todas las lineas
userModel.getHistorial = function(fecha,callback)
{
	if (connection) 
	{
		var sql = 'SELECT tubicacion.idubicacion,tlinea.idlinea,tlinea.Nombre,tubicacion.falta_v,tubicacion.falta_s,tubicacion.falta_r,tubicacion.placa,tubicacion.hora from tubicacion inner join tcarro  inner join tlinea where  tcarro.placa=tubicacion.placa and tcarro.idlinea=tlinea.idlinea and tubicacion.fecha="'+fecha +'" order by idubicacion desc';
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

//obtenemos el historial de infracciones por cada linea
userModel.getHistorialLinea = function(idlinea,fecha1,fecha2,callback)
{
	if (connection) 
	{
		var sql = 'select tlinea.nombre,tubicacion.placa,tubicacion.fecha,tubicacion.hora,tubicacion.lat,tubicacion.lon,tubicacion.falta_v,tubicacion.max_vel,tubicacion.falta_r,tconfiguracion.ruta,tubicacion.falta_s,tconfiguracion.seguridad from tubicacion inner join tlinea inner join tcarro inner join tconfiguracion where tubicacion.placa=tcarro.placa and tcarro.idlinea=tlinea.idlinea and tlinea.idlinea = ' + connection.escape(idlinea)+' and tubicacion.fecha BETWEEN '+connection.escape(fecha1)+' and '+connection.escape(fecha2);
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
//obtenemos un usuario por su id
userModel.getUbicacion = function(id,callback)
{
	if (connection) 
	{
		var sql = 'SELECT * FROM tubicacion WHERE idubicacion = ' + connection.escape(id);
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

//obtenemos la ubicacion idcarro
userModel.getUbicacionCarro = function(idcarro,fecha,callback)
{
	if (connection) 
	{
		var sql = 'SELECT tubicacion.lat,tubicacion.lon,tubicacion.velocidad,tubicacion.fecha,tubicacion.hora,tubicacion.puerta,tubicacion.falta_v,tubicacion.falta_s,tubicacion.falta_r,tcarro.idcarro,tubicacion.placa FROM tubicacion inner join tcarro WHERE tcarro.placa=tubicacion.placa and tcarro.idcarro = ' + connection.escape(idcarro)+' and tubicacion.fecha= '+connection.escape(fecha);
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
userModel.insertUbicacion = function(userData,callback)
{
	if (connection) 
	{
		connection.query('INSERT INTO tubicacion SET ?', userData, function(error, result) 
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
 
 
 
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports.ubicacion = userModel;
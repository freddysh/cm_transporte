$(document).ready(function() {
	
	if ($('.template__table_data .datatable').length) {
		var table = $('.datatable').DataTable(
			{
				ordering: true
			}
		);
	}


});



function Login(){
  $.ajax({
				type: 'post',
				data: $(frmlogin).serialize(),
				url: '/sessions',
				success: function(data){
					if(data=="1")
					{
						//alert("existe");
		      	        
			            var url = "pages/index";
				  		location.href=url;

					}
					else
					{
						//alert("no existe");
						$('#mensaje').html('<p class="alert alert-danger">Usuario o Contraseña incorrecta.</p>'); 

					}
										}
			});

}

/* USUARIOS*/

function NuevoUsuario(){
		$.ajax({
				type: 'get',
				data: 'codUsuario=0',
				url: 'new_usuario',
				success: function(data){
						$('#DatosUsuario').html(data);
						$('#myModalUsuario').modal({
								show:true,
								backdrop:'static',
						});
				}
			});
		
}

function EditarUsuario(codigo){
	
		$.ajax({
				type: 'get',
				data: 'codUsuario='+codigo,
				url: 'usuarios/'+codigo,
				success: function(data){
					    
						$('#DatosUsuario').html(data);
						$('#myModalUsuario').modal({
								show:true,
								backdrop:'static',

						});
				}
			});
		
}

function GuardarUsuario()
{
	if(window.confirm('Esta seguro de guardar los datos?')){
	$.ajax({
	      url: 'new_usuario',//action del formulario, ej:
	      //http://localhost/mi_proyecto/mi_controlador/mi_funcion
	      type: 'POST',//el método post o get del formulario
	      data: $(formNuevoUsuario).serialize(),//obtenemos todos los datos del formulario
	      
	      success:function(data){
	      //hacemos algo cuando finalice todo correctamente
	      
		      if(data=='1')
		      {
		      	//alert("guardado");
		      	 alert("Guardado Correctamente!!");
			             var url = document.URL;
				  		location.href=url;
		      	

		      }else{
		      		$('#mensaje').html('<p class="alert alert-alert">No se puede Guardar el Usuario.</p>'); 
		      }
	      
	      }
	   });
    }
    
}

function ModificarUsuario(codigo)
{

	if(confirm('estas seguro de Modificar?..'))
   {
	   
					$.ajax({
					      url:'usuarios/'+codigo,//action del formulario, ej:
					      //http://localhost/mi_proyecto/mi_controlador/mi_funcion
					      type: 'PUT',//el método post o get del formulario
					      data: $(formNuevoUsuario).serialize(),//obtenemos todos los datos del formulario
					      error: function(){
					      	$('#mensaje').html('<p class="alert alert-danger">no se puede Modificar!!!!.</p>');
					      //si hay un error mostramos un mensaje
					      },
					      success:function(data){
					      //hacemos algo cuando finalice todo correctamente
					      if(data=="0")
					      {
					      	// alert(data);
					      	 $('#mensaje').html('<p class="alert alert-danger">No se puede Modificar!!!. Falta ingresar algun dato.</p>');
					      	

					      }else{
					      	    alert("Usuario modificado Correctamente");
					            var url = document.URL;
						        location.href=url;
					      }
					      
					      }
					   });
		
	    
	}  
}


function EliminarUsuario(codigo){
		
   if(confirm('estas seguro de Eliminar?..'))
   {
		
		$.ajax({
				type: 'DELETE',
				data: 'codigo='+codigo,
				url: 'usuarios/'+codigo,
				success: function(data){
					// alert(data);
					if(data="1")
					{
						alert("eliminado correctamente");
						var url = document.URL;
			           location.href=url;
					}
					else
					{
						alert("no se puede eliminar");
					}

						
						// $('#contenidoPrecio').html(data);
				}
			});

	}
			
		
}

/* LINEAS*/

function NuevaLinea(){
		$.ajax({
				type: 'get',
				data: 'cod=0',
				url: 'new_linea',
				success: function(data){
						$('#DatosLinea').html(data);
						$('#myModalLinea').modal({
								show:true,
								backdrop:'static',
						});
				}
			});
		
}

function EditarLinea(codigo){
	
		$.ajax({
				type: 'get',
				data: 'cod='+codigo,
				url: 'lineas/'+codigo,
				success: function(data){
						$('#DatosLinea').html(data);
						$('#myModalLinea').modal({
								show:true,
								backdrop:'static',

						});
				}
			});
		
}

function GuardarLinea()
{
	if(window.confirm('Esta seguro de guardar los datos?')){
	$.ajax({
	      url: 'new_linea',//action del formulario, ej:
	      //http://localhost/mi_proyecto/mi_controlador/mi_funcion
	      type: 'POST',//el método post o get del formulario
	      data: $(formNuevaLinea).serialize(),//obtenemos todos los datos del formulario
	      
	      success:function(data){
	      //hacemos algo cuando finalice todo correctamente
	      
		      if(data=='1')
		      {
		      	//alert("guardado");
		      	 alert("Guardado Correctamente!!");
			             var url = document.URL;
				  		location.href=url;
		      	

		      }else{
		      	if(data=='0')
		      		$('#mensaje').html('<p class="alert alert-alert">No se puede Guardar Line.</p>'); 
		      	else
		      		$('#mensaje').html('<p class="alert alert-alert">Linea ya existe, No se puede guardar otro con el mismo nombre .</p>'); 
		      }
	      
	      }
	   });
    }
    
}

function ModificarLinea(codigo)
{
	
	if(confirm('estas seguro de Modificar?..'))
   {
	   
					$.ajax({
					      url:'lineas/'+codigo,//action del formulario, ej:
					      //http://localhost/mi_proyecto/mi_controlador/mi_funcion
					      type: 'PUT',//el método post o get del formulario
					      data: $(formNuevaLinea).serialize(),//obtenemos todos los datos del formulario
					      error: function(){
					      	$('#mensaje').html('<p class="alert alert-danger">no se puede Modificar!!!!.</p>');
					      //si hay un error mostramos un mensaje
					      },
					      success:function(data){
					      //hacemos algo cuando finalice todo correctamente
					      if(data=="0")
					      {
					      	// alert(data);
					      	 $('#mensaje').html('<p class="alert alert-danger">No se puede Modificar!!!. Falta ingresar algun dato.</p>');
					      	

					      }else{

					      	    alert("Linea modificado Correctamente");
					            var url = document.URL;
						        location.href=url;
					      }
					      
					      }
					   });
		
	    
	}  
}


function EliminarLinea(codigo){
		
   if(confirm('estas seguro de Eliminar?..'))
   {
		
		$.ajax({
				type: 'DELETE',
				data: 'codigo='+codigo,
				url: 'lineas/'+codigo,
				success: function(data){
					// alert(data);
					if(data="1")
					{
						alert("eliminado correctamente");
						var url = document.URL;
			           location.href=url;
					}
					else
					{
						alert("no se puede eliminar");
					}

						
						// $('#contenidoPrecio').html(data);
				}
			});

	}
			
		
}

// funciones del mapa

// ---------------CARROS ----------------------



function NuevoCarro(){
	var porNombre=document.getElementById("lineas");
	
	if(porNombre.selectedIndex>0)
	{
	  var linea=porNombre.options[porNombre.selectedIndex].value;
	  //alert(nombre_linea);
	
		$.ajax({
				type: 'get',
				data: 'cod=0',
				url: 'new_carro/'+linea,
				success: function(data){
						$('#DatosCarro').html(data);
						$('#myModalCarro').modal({
								show:true,
								backdrop:'static',
						});
				}
			});
	}
	else alert("Seleccinar Una Linea");
		
}

function EditarCarro(codigo){
	
		$.ajax({
				type: 'get',
				data: 'cod='+codigo,
				url: 'carros/'+codigo,
				success: function(data){
						$('#DatosCarro').html(data);
						$('#myModalCarro').modal({
								show:true,
								backdrop:'static',

						});
				}
			});
		
}

function GuardarCarro(id)
{
	if(window.confirm('Esta seguro de guardar los datos?')){
	$.ajax({
	      url: 'new_carro',//action del formulario, ej:
	      //http://localhost/mi_proyecto/mi_controlador/mi_funcion
	      type: 'POST',//el método post o get del formulario
	      data: $(formNuevoCarro).serialize(),//obtenemos todos los datos del formulario
	      
	      success:function(data){
	      //hacemos algo cuando finalice todo correctamente
	      
		      if(data=='1')
		      {
		      	//alert("guardado");
		      	 alert("Guardado Correctamente!!");
			            // var url = document.URL;
				  		//location.href=url;
				  		$('#myModalCarro').modal('hide');
				  		 validarCarro(document.getElementById("lineas"));

		      	

		      }else{
		      	if(data=='0')
		      		$('#mensaje').html('<p class="alert alert-alert">No se puede Guardar Vehiculo.</p>'); 
		      	else
		      		$('#mensaje').html('<p class="alert alert-alert">Linea ya existe, No se puede guardar otro con la misma placa .</p>'); 
		      }
	      
	      }
	   });
    }
    
}

function ModificarCarro(codigo)
{
	
	if(confirm('estas seguro de Modificar?..'))
   {
	   
					$.ajax({
					      url:'carros/'+codigo,//action del formulario, ej:
					      //http://localhost/mi_proyecto/mi_controlador/mi_funcion
					      type: 'PUT',//el método post o get del formulario
					      data: $(formNuevoCarro).serialize(),//obtenemos todos los datos del formulario
					      error: function(){
					      	$('#mensaje').html('<p class="alert alert-danger">no se puede Modificar!!!!.</p>');
					      //si hay un error mostramos un mensaje
					      },
					      success:function(data){
					      //hacemos algo cuando finalice todo correctamente
					      if(data=="0")
					      {
					      	// alert(data);
					      	 $('#mensaje').html('<p class="alert alert-danger">No se puede Modificar!!!. Falta ingresar algun dato.</p>');
					      	

					      }else{

					      	    alert("Vehiculo modificado Correctamente");
					            $('#myModalCarro').modal('hide');
				  		        validarCarro(document.getElementById("lineas"));
					      }
					      
					      }
					   });
		
	    
	}  
}


function EliminarCarro(codigo){
		
   if(confirm('estas seguro de Eliminar?..'))
   {
		
		$.ajax({
				type: 'DELETE',
				data: 'codigo='+codigo,
				url: 'carros/'+codigo,
				success: function(data){
					// alert(data);
					if(data="1")
					{
						alert("eliminado correctamente");
						//$('#myModalCarro').modal('hide');
				  		 validarCarro(document.getElementById("lineas"));
					}
					else
					{
						alert("no se puede eliminar");
					}

						
						// $('#contenidoPrecio').html(data);
				}
			});

	}
			
		
}





//----------------------------------------------


// socket io

var nombre_linea;
function  conectarse(){

	
   //alert(nombre_linea);
	     SOCKET = io.connect("localhost:8081");

		SOCKET.on("connect",function(){
			document.getElementById("idEstado").innerHTML="CONECTADO...";

						
		});

		SOCKET.on("disconnect",function(){
			document.getElementById("idEstado").innerHTML="DESCONECTADO...";
			eliminarMarcadores();
		});

		

	    SOCKET.on("lectura",function(data){//{id,lat,lon}
			
		   //alert(JSON.stringify(data));
		   //alert(nombre_linea);
		   //alert(data.placa);

		    var index=buscar(data);
		   if(Object.keys(data).length==1)
		   	{ //alert("index"+index);
		    	removerPosicion(index);
		   }
		   else
		   {		    
				    if(nombre_linea==data.idlinea)
				    {    
				    	
				    	//alert("length:"+Object.keys(data).length);
				    	if(data.falta_v!='' || data.falta_s!='' || data.falta_r!='')
				    	{
				    		//alert("falta");
				    		if(index===-1){//ES NUEVO
							nuevoPosicionFalta(data);
											
						    }
							else{//REGISTRADO
								actualizarPosicionFalta(index,data);
								
							}

				    	}
				    	else
				    	{
				    		//alert(" sin falta");
				    		if(index===-1){//ES NUEVO
							nuevoPosicion(data);
											
						    }
							else{//REGISTRADO
								actualizarPosicion(index,data);
								
							}

				    	}
						
					 }
				}
	
		   });
		   	
		
	
	    }
	    
	

	function iniciarMapa(id){
		var mapProp = {
		    center:new google.maps.LatLng(﻿-13.518333, -71.978056),
		    //center:new google.maps.LatLng(﻿-13.6338900, -72.8813900),
		    zoom:13,
		    mapTypeId:google.maps.MapTypeId.ROADMAP
		  };
		 MAP=new google.maps.Map(document.getElementById(id),mapProp);
}


function ControlRuta(data) {
	//alert(data);
  //alert(data.lat);
  //alert(data.lon);
  //alert(ruta);

  var Linea_Ruta = new google.maps.Polyline({
    path:ruta
  });

 var myPosition = new google.maps.LatLng(data.lat,data.lon);
  console.log(data.lat);
  console.log(data.lon);


				/*if (google.maps.geometry.poly.isLocationOnEdge(myPosition, Linea_Ruta,0.01)) {
                     console.log("Fuera de Ruta!");

			     }
			     else
			     	console.log("dentro");*/
}

//google.maps.event.addDomListener(window, 'load', initialize);


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function buscar(data){
		var index=-1;		
		var n=MARCADORES.length;
		for(var i=0;i<n;i++){
			if(MARCADORES[i].getId()==data.placa || MARCADORES[i].getId()+"\r\n"===data.placa){
				console.log(i);
				index=i;
				break;
			}
		}			
		return index;			
	}	
	function nuevoPosicion(data){
              console.log(data.lat);

		var marca=new cMarker(MAP,data.placa,data.lat,data.lon,data.velocidad);
		marca.dibujar();
		MARCADORES.push(marca);//agregamos al ARRAY
		
	}
	function actualizarPosicion(index,data){
		var marca=MARCADORES[index];
		marca.remover();	
		marca.update(data.lat,data.lon);
		marca.dibujar();
	}
	function nuevoPosicionFalta(data){
              //console.log(data.lat);
              //console.log(data.placa)

		var marca=new cMarker(MAP,data.placa,data.lat,data.lon,data.velocidad);
		marca.dibujarFalta();
		MARCADORES.push(marca);//agregamos al ARRAY
		
	}
	function actualizarPosicionFalta(index,data){
		var marca=MARCADORES[index];
		marca.remover();	
		marca.update(data.lat,data.lon);
		marca.dibujarFalta();
	}
	function removerPosicion(index){
		var marca=MARCADORES[index];
		marca.remover();
		MARCADORES.splice(index, 1);//eliminamos del ARRAY	
	}
	function eliminarMarcadores(){
		var n=MARCADORES.length;
		for(var i=0;i<n;i++){
			MARCADORES[i].remover();
		}
		MARCADORES=[];
	}
	function HistorialFalta(data){
              //console.log(data.lat);
              //console.log(data.placa)

		var marca=new cMarkarFalta(MAP,data.placa,data.lat,data.lon,data.velocidad,data.hora,data.falta1,data.falta2,data.falta3);
		marca.dibujarFalta();
		MARCADORES.push(marca);//agregamos al ARRAY
		
	}



////////////////////////////////////////////////////////////////////////////////////////////////////////7



function resizeMap() {
   if(typeof MAP =="undefined") return;
   setTimeout( function(){resizingMap();} , 400);
}

function resizingMap() {
   if(typeof MAP =="undefined") return;
   var center = map.getCenter();
   google.maps.event.trigger(MAP, "resize");
   MAP.setCenter(center); 
}
$("#myModalRuta").on("shown.bs.modal", function () {
     alert("hols");
    google.maps.event.trigger(MAP, "resize");
});



var infoWindow = null;
var marker=null;
var ruta=[];
var Client=[];
var nombre=null;
var lineas=[];

var SOCKET=null;
var MAP=null; 

var MARCADORES=[];
var color=[];
var velocidad=[];



function NuevoMapa(Nombre){

    nombre=Nombre;
    ruta=[];
    ruta1=[];	//var nuevoData=[];
//	var datos=[];
	color=[];
	velocidad=[];
$.ajax({
	type: 'get',
	data: 'cod=0',
	url: 'new_mapa',

	success: function(data){
	$('#DatosLinea').html(data);

	iniciarMapa("map");
	  infoWindow = new google.maps.InfoWindow();

 	    marker = new google.maps.Marker({
    	position: new google.maps.LatLng(-13.518333, -71.978056),
    	//position:new google.maps.LatLng(﻿-13.6338900, -72.8813900),
        draggable: true,
        map: MAP
	    });

							    

		$('#myModalRuta').on('shown.bs.modal', function () {
		google.maps.event.trigger(MAP, 'resize');
		MAP.setCenter(new google.maps.LatLng(﻿-13.518333, -71.978056));
		});

		$('#myModalRuta').modal({
		show:true,
		backdrop:'static',
		});

		$.ajax({
            type: 'get',
			url: 'new_mapa/'+nombre,
			
			success:function(data){

				//alert(data);
				if(data=="no existe")
				{
					 $("#btnElimiar").attr({'style': 'display:none;'});
					  
							
 						lineas[0] = new google.maps.Polyline({
						        //path: ruta1,
								strokeWeight: 4,
							    strokeOpacity: 0.6,
							    clickable: false,
							    geodesic: true
											    
								});

								lineas[0].setMap(MAP);
				  	
                            var i=0; // array de colores
                            var j=0; // array de lineas
                     
                    
                       google.maps.event.addListener(marker, 'click', function(){
						var markerLatLng = marker.getPosition();
					    
						    
						    var idx=document.getElementById("velocidades").selectedIndex;
						    

						    if(idx>0)
                    		{
                    			infoWindow.setContent([markerLatLng.lat(),', ',markerLatLng.lng()].join(''));
					   			 infoWindow.open(MAP, marker);
                    			color[i]=document.getElementById("velocidades").options[idx].style.color;
                    			
                    			velocidad.push(document.getElementById("velocidades").options[idx].value); // arreglo de velocidades para almacenar la ruta
						   	 	ruta.push(new google.maps.LatLng(markerLatLng.lat(),markerLatLng.lng()));// Array para almacenar en la bd
						    	var path=lineas[j].getPath();
							    if(i==0)
							    {
							    	
									path.push(new google.maps.LatLng(markerLatLng.lat(),markerLatLng.lng()));
	                                //ruta1.push(new google.maps.LatLng(markerLatLng.lat(),markerLatLng.lng()));
							    }
							    else
							    {

							    	if(color[i]!=color[i-1])
							    	{
							    		//alert(lineas[j].getStrokeColor());
							    		j++;
	                                     //ruta1=[];
	                                     lineas[j] = new google.maps.Polyline({
								        //path: ruta1,
										strokeWeight: 4,
									    strokeOpacity: 0.6,
									    clickable: false,
									    geodesic: true
													    
										});
	                                     var path=lineas[j].getPath();
										lineas[j].setMap(MAP);

										

							    	}
							    	path.push(new google.maps.LatLng(markerLatLng.lat(),markerLatLng.lng()));
							    	//ruta1.push(new google.maps.LatLng(markerLatLng.lat(),markerLatLng.lng()));

							    }
                             //console.log(color.length);
                             
								//var path=lineas[i].getPath();
								//path.push(new google.maps.LatLng(markerLatLng.lat(),markerLatLng.lng()));
								lineas[j].setOptions({strokeColor: color[i]});

							
						     	i++;
						    }
		                   else
		                   {
		                   	alert("Seleccinar Zona!!!!");
		                   }

						 });
                   


				}
				else
				{
					//alert(JSON.stringify(data));
					//datos=JSON.stringify(data);
					//alert(ruta);
					 
					  $("#btnGuardar").attr({'style': 'display:none;margin-bottom: 0;margin-left: 5px;'});
					  $("#btnLimpiar").attr({'style': 'display:none;margin-bottom: 0;margin-left: 5px;'});


					  RecuperarMapa(nombre);

						



				}



			}


        });

    }
  });
}

function AgregarLinea(event){
	var path=lineas.getPath();
	path.push(event.latLng);
	var markerLatLng = marker.getPosition();
	 infoWindow.setContent([markerLatLng.lat(),', ',markerLatLng.lng()].join(''));
	 infoWindow.open(MAP, marker);

								    
	  ruta.push(new google.maps.LatLng(markerLatLng.lat(),markerLatLng.lng()))
}
    
function RecuperarMapa(linea){
	lineas=[];
    velocidad=[];
	$.ajax({
            type: 'get',
			url: 'new_mapa/'+linea,
			
			success:function(data){
				lineas[0] = new google.maps.Polyline({
								         strokeWeight: 4,
								         strokeOpacity: 0.6,
								         clickable: false,
								         geodesic: true
										    
										    
								    });
					   lineas[0].setMap(MAP);
					  var j=0;
					//console.log(data.length);
					  
					for (var i =0; i < data.length ; i++)
					{
						var path=lineas[j].getPath();
						var lat=JSON.stringify(data[i].lat);
						var long=JSON.stringify(data[i].long);
						
						//alert(JSON.stringify(data[i].lat));
						//alert(JSON.stringify(data[i].long));
						//alert(JSON.stringify(data[i].idvelocidad));
						velocidad.push(data[i].idvelocidad);
						if(i==0)
						{
							//console.log("i=0");
	                        path.push(new google.maps.LatLng(lat,long));
						}
						else
						{
							//alert(velocidad[i]+"="+velocidad[i-1]);
							if(velocidad[i]!=velocidad[i-1])
							{
									
							    		j++;
	                                     //ruta1=[];
	                                     lineas[j] = new google.maps.Polyline({
								        //path: ruta1,
										strokeWeight: 4,
									    strokeOpacity: 0.6,
									    clickable: false,
									    geodesic: true
													    
										});
	                                     var path=lineas[j].getPath();
										lineas[j].setMap(MAP);
							}
							path.push(new google.maps.LatLng(lat,long));

						}
						
						lineas[j].setOptions({strokeColor:data[i].idvelocidad});

						//alert(nuevoData);
					}

						
			}
		});
		
}


function BorrarLinea(codigo){
	
	
		
}

function GuardarMapa()
{
	if(window.confirm('Esta seguro de guardar los datos?')){


		var rutanueva=JSON.parse(JSON.stringify(ruta));
		var velocidades=JSON.parse(JSON.stringify(velocidad));
		var nom='{"idruta":"'+nombre+'"}';

		//var object =$.param(rutanueva) + '&' + $.param(nom);

		alert(rutanueva);
		alert(velocidad);
		
	$.ajax({
	      url: 'new_mapa',//action del formulario, ej:
	      //http://localhost/mi_proyecto/mi_controlador/mi_funcion
	      type: 'POST',//el método post o get del formulario
	      data:{ruta:rutanueva,idlinea:nombre,idvelocidad:velocidades},
	      //data:rutanueva,
	      //contentType: "application/json",//obtenemos todos los datos del formulario
	      
	      success:function(data){
	      //hacemos algo cuando finalice todo correctamente
	        
		      if(data=='1')
		      {
		      	
		      	 alert("Guardado Correctamente!!");
			             var url = document.URL;
				  		location.href=url;
		      	

		      }else{
		      		$('#mensaje').html('<p class="alert alert-alert">No se puede Guardar el Usuario.</p>'); 
		      }
	      
	      }
	   });
    }
    
}



function EliminarMapa(){
		
   if(confirm('estas seguro de Eliminar?..'))
   {
		
		$.ajax({
				type: 'DELETE',
				
				url: 'new_mapa/'+nombre,
				success: function(data){
					// alert(data);
					if(data="1")
					{
						alert("eliminado correctamente");
						 $('#myModalRuta').modal('hide');
						//$("#btnElimiar").attr({'hidden': true});
						//$("#btnGuardar").attr({'hidden': false});
					}
					else
					{
						alert("no se puede eliminar");
					}

						
						// $('#contenidoPrecio').html(data);
				}
			});

	}
			
		
}

function validarMapa(element)
{
      var idx=element.selectedIndex;
      var id=element.options[idx].value;
	iniciarMapa("idGoogleMap");
   RecuperarMapa(id);
   nombre_linea=id; //id de linea para tiempo real
   eliminarMarcadores();
  // 
   

}



var activado="Desactivado";
var coloractivado="label label-danger";

function getVehiculos(id,data1)
{
		
			$.ajax({
            type: 'get',
			url: 'carrosLinea/'+id,
			
			success:function(data){
				VaciarTabla();
				$('#example').DataTable().destroy();
				
				for (var i =0; i < data.length ; i++) {
						var nombre=data[i].nombre;
						var idcarro=data[i].idcarro;
						var idlinea=data[i].idlinea;
						var placa=data[i].placa;
						var chofer=data[i].chofer;
						var dni=data[i].dni;
						//alert("placa:"+placa);
						Conectado(placa,data1)	

						
						$("#example").find('tbody').append('<tr id="filas" role="row">'+
												'<td>'+nombre+'</td>'+
                                                '<td>'+placa+'</td>'+
                                                '<td>'+chofer+'</td>'+
                                                '<td>'+dni+'</td>'+
                                                '<td><spam class="'+coloractivado+'">'+activado+'</spam></td>'+
                                                '<td>'+
                                                    '<button class="btn btn-warning" onClick="EditarCarro('+idcarro+')">'+
                                                        '<i class="fa fa-pencil fa-fw"></i></button>'+

                                                    '<button class="btn btn-danger" onClick="EliminarCarro('+idcarro+')">'+
                                                       	'<i class="fa fa-remove fa-fw"></i></button>'+
												'</td>'+	
											'</tr>');
						activado="Desactivado";

					}
                 $('#example').DataTable().draw();
				
			}
	
		});
					

	

}

function getVelhiculosInicio(id)
{
   $.ajax({
            type: 'get',
			url: 'carrosLinea/'+id,
			
			success:function(data){
				VaciarTabla();
				$('#example').DataTable().destroy();
				
				for (var i =0; i < data.length ; i++) {
						var nombre=data[i].nombre;
						var idcarro=data[i].idcarro;
						var idlinea=data[i].idlinea;
						var placa=data[i].placa;
						var chofer=data[i].chofer;
						var dni=data[i].dni;
						//Conectado(placa,data1)	

						
						$("#example").find('tbody').append('<tr id="filas" role="row">'+
												'<td>'+nombre+'</td>'+
                                                '<td>'+placa+'</td>'+
                                                '<td>'+chofer+'</td>'+
                                                '<td>'+dni+'</td>'+
                                                '<td><spam class="'+coloractivado+'">'+activado+'</spam></td>'+
                                                '<td>'+
                                                    '<button class="btn btn-warning" onClick="EditarCarro('+idcarro+')">'+
                                                        '<i class="fa fa-pencil fa-fw"></i></button>'+

                                                    '<button class="btn btn-danger" onClick="EliminarCarro('+idcarro+')">'+
                                                       	'<i class="fa fa-remove fa-fw"></i></button>'+
												'</td>'+	
											'</tr>');
						activado="Desactivado";

					}
                 $('#example').DataTable().draw();
				
			}
	
		});
}


function  Conectado(placa,y)
{
	var i=0;
	while(activado=="Desactivado" && i<y.length)
	{
		//alert(placa+"="+y[i]);
	  	if(placa+"\r\n"===y[i] || placa==y[i])
		{
		 activado="Activado";
		 coloractivado="label label-success";

		}else
		{ activado="Desactivado";
		 coloractivado="label label-danger";

		}
		//alert(placa+":"+activado)
		i++;
	}
	//alert(y.length);
  

						
}



var ban=false;

function validarCarro(element)
{
   var idlinea=element.selectedIndex;
   var id=element.options[idlinea].value;
   VaciarTabla();
   if(ban)
   {
   	SOCKET.disconnect();
   	//alert("desconectado");
   }
   //	
   SOCKET = io.connect("localhost:8081");
	//
	
	SOCKET.on("Clientes",function(data){
		  //alert(data);
		if(data.length>0)
		{  	
		 getVehiculos(id,data);

		}
		else getVelhiculosInicio(id);

     				
	});
	SOCKET.on("connect",function(){
			ban=true;
									
		});

		SOCKET.on("disconnect",function(){
			ban=false;
				
		});
	

}


var conectado=false;
function  ConectadosLinea(){

	   	SOCKET = io.connect("localhost:8081");
	   	if(conectado)
	   	{
	   		SOCKET.disconnect();
	   	}

		SOCKET.on("connect",function(){
			conectado=true;					
		});

		SOCKET.on("disconnect",function(){
			conectado=false;

		});
        
		
		SOCKET.on("Clientes",function(data){
			 //alert(data);
			   conectados=[];
		       if(data.length>0)
				{
				   var num=document.getElementById("tableLineas");  	
				   //alert(num.rows.length);
				   for(var i=1;i<num.rows.length;i++)
				   {
				   	  var id=num.rows[i].cells[6].innerHTML;
				   	  
				   	   //alert(id);
				   	   NumeroConectados(id,data);
					   	
				   }
				   

				}
				 

		});
		

	    
		
	
}
function NumeroConectados(id,data)
{  var count=0;
	$.ajax({
					  	type:'get',
					  	url:'carrosLinea/'+id,
					  	success(data1){
					  		//alert(JSON.stringify(data1));
					  		//alert(data[0]);
					  		//alert(id);
					  		for(var j=0;j<data1.length;j++)
					  		{
					  			//alert(data1[j].placa);
					  			for(var y=0;y<data.length;y++)
					  			{   
					  				//console.log(data1[j].placa+"-"+data[y]);
					  				if(data1[j].placa+"\r\n"===data[y])
					  				{
					  					
					  					//alert(id);
					  					count++;
					  					//conectados[i]=count;
					  					//alert(id+'-'+conectados[i]);
					  					document.getElementById(id).innerHTML=count;
					  					//num.rows[i].cells[7].innerHTML=count;
					  				} //console.log("nuevo");

					  			}
					  			
					  		}// 
					  		
					  	}

					  });

}

function VaciarTabla()
{
	$("#example").DataTable().clear();
}

// PANTALLA PRINCIPAL

function Informes()
{   
	var fecha= new Date();
	var dia=fecha.getDate();
	var mes=fecha.getMonth()+1;
	var anio=fecha.getFullYear();
	var fechaActual=String(anio+"-"+mes+"-"+dia);
	//alert(fechaActual);
	
	SOCKET = io.connect("localhost:8081");

		SOCKET.on("connect",function(){
			//mostrar todas las infracicones de la fecha actual
			document.getElementById("idEstado").innerHTML="CONECTADO...";
            InformesTiempoReal(fechaActual);
						
		});

		SOCKET.on("disconnect",function(){
			document.getElementById("idEstado").innerHTML="DESCONECTADO...";
			
		});

		SOCKET.on("informes",function(data){
			
			InformesTiempoReal(fechaActual);
			
		});
}

function InformesTiempoReal(fecha)
{
	$.ajax({
            type: 'get',
			url: 'Informes/'+fecha,
			
			success:function(data){
				VaciarTabla();
				$('#example').DataTable().destroy();
				var Numruta=0;
				var Numvelocidad=0;
				var Numseguridad=0;
				
				for (var i =0; i < data.length ; i++) {
						
						var linea=data[i].Nombre;
						var placa="'"+data[i].placa+"'";
						var velocidad=data[i].falta_v;
						var seguridad=data[i].falta_s;
						var ruta=data[i].falta_r;
						var hora=data[i].hora;
						var fecha1="'"+fecha+"'";
						//Conectado(placa,data1)
						if(velocidad!='' && velocidad!=null)Numvelocidad++;
						if(ruta!='')Numruta++;
						if(seguridad!='')Numseguridad++;	

						
						$("#example").find('tbody').append('<tr id="filas" role="row">'+
												'<td>'+linea+'</td>'+
                                                '<td>'+placa+'</td>'+
                                                '<td>'+velocidad+'</td>'+
                                                '<td>'+seguridad+'</td>'+
                                                '<td>'+ruta+'</td>'+
                                                '<td>'+hora+'</td>'+
                                                '<td>'+
                                                    '<button class="btn btn-warning" onClick="ReporteInfraccionCarro('+data[i].idlinea+')">Verificar</button>'+

                                                    
												'</td>'+	
											'</tr>');
						
					}
                 $('#example').DataTable().draw();
                 $('#Total').text(Numruta+Numvelocidad+Numseguridad);
                 $('#Ruta').text(Numruta);$('#Velocidad').text(Numvelocidad);$('#Seguridad').text(Numseguridad);

				
			  }
	
		    });
}

function CarrosLinea(linea)
{
	$("#carros").empty();
	var idx=linea.selectedIndex;
    var id=linea.options[idx].value;
    //alert(id);
    $.ajax({
    	type: 'get',
		url: 'carrosLinea/'+id,
		success: function(data){
			//alert(data);
			 $('#carros').append('<option value="0">Seleccionar Carro</option>');
             for (var i = 0; i < data.length; i++)
              {
              	var placa=data[i].placa;
              	var idcarro=data[i].idcarro;
              	//console.log(data[i].placa);
              	//console.log(data[i].idcarro);
              	$('#carros').append('<option value="'+idcarro+'">'+placa+'</option>');
           	  }
          }
     });      	  
}
function ReporteInfraccionCarro(linea)
{
    

    
    
    
    
    
}

function ReporteCarro()
{
	var carro=document.getElementById("carros");
	var idxcarro=carro.selectedIndex;
    var idcarro=carro.options[idxcarro].value;
    var linea=document.getElementById("lineas").selectedIndex;
    var idlinea=document.getElementById("lineas").value;
    var fecha=document.getElementById("fecha").value;

   //alert(idcarro);
    alert(idlinea);
    if(linea>0 && fecha!="" && idxcarro>0)
    {
    	//alert("entro");
	    $.ajax({
	    	type:'get',
	    	url:'HistorialCarro/'+idcarro+'/'+fecha,
	    	success: function(data){
                   //alert(data);
                   iniciarMapa("idGoogleMap");
					RecuperarMapa(idlinea);
					//alert(data.length);
					for(var i=0;i<data.length;i++)
					{
						HistorialFalta(data[i]);
						

					}
					
				}

	    });
	}
}

function ReporteLinea()
{
	
    var linea=document.getElementById("lineas").selectedIndex;
    var idlinea=document.getElementById("lineas").value;
    var fecha1=document.getElementById("fecha1").value;
    var fecha2=document.getElementById("fecha2").value;

   //alert(idcarro);
    //alert(idlinea);
    if(linea>0 && fecha1!="" && fecha2!="")
    {
    	//alert("entro");
	    $.ajax({
	    	type:'get',
	    	url:'HistorialLinea/'+idlinea+'/'+fecha1+'/'+fecha2,
	    	success: function(data){
                   //alert(data);
                    //VaciarTabla();
				   //$('#example').DataTable().destroy();
					for(var i=0;i<data.length;i++)
					{
						var nombre=data[i].nombre;
						var placa=data[i].placa;
						var fecha=data[i].fecha.toString().substring(0,10);
						var hora=data[i].hora;
						var lat=data[i].lat;
						var lon=data[i].lon;
						var velocidad=data[i].falta_v;
						var velocidadP=data[i].max_vel;
						var distancia=data[i].falta_r;
						var distanciaP=data[i].ruta;
						var puerta=data[i].falta_s;
						var puertaP=data[i].seguridad;
						//alert(data[i].fecha);
						//Conectado(placa,data1)
						var infraccion=[];
						                       		
						
						if(velocidad!='')
							 infraccion.push('Exceso de Velocidad');
						if(distancia!='')
							 infraccion.push('Fuera de Ruta');
						if(puerta!='')
							 infraccion.push('Puerta Abierta');
						var falta=infraccion.toString();
						//alert(falta);
							var nro=i+1;
						
						$("#example").find('tbody').append('<tr id="filas" role="row">'+
												'<td>'+nro+'</td>'+
												'<td>'+nombre+'</td>'+
                                                '<td>'+placa+'</td>'+
                                                '<td>'+fecha+'</td>'+
                                                '<td>'+hora+'</td>'+
                                                '<td>'+lat+'</td>'+
                                                '<td>'+lon+'</td>'+
                                                '<td>'+velocidad+'</td>'+
                                                '<td>'+velocidadP+'</td>'+
                                                '<td>'+distancia+'</td>'+
                                                '<td>'+distanciaP+'</td>'+
                                                '<td>'+puerta+'</td>'+
                                                '<td>'+puertaP+'</td>'+
                                                '<td>'+falta+'</td>'+
                                                	
											'</tr>');
						

					}
					// $('#example').DataTable().draw();
					
				}

	    });
	}
	else
		alert("Seleccionar todos los campos");
}

// FUNCIONES VELOCIDAD

function NuevaVelocidad(){
		$.ajax({
				type: 'get',
				url: 'new_velocidad',
				success: function(data){
						$('#DatosVelocidad').html(data);
						$('#myModalVelocidad').modal({
								show:true,
								backdrop:'static',
						});
				}
			});
		
}

function EditarVelocidad(codigo){
	
		$.ajax({
				type: 'get',
				url: 'velocidad/'+codigo,
				success: function(data){
					    
						$('#DatosVelocidad').html(data);
						$('#myModalVelocidad').modal({
								show:true,
								backdrop:'static',

						});
				}
			});
		
}

function GuardarVelocidad()
{
	if(window.confirm('Esta seguro de guardar los datos?')){
	$.ajax({
	      url: 'new_velocidad',//action del formulario, ej:
	      //http://localhost/mi_proyecto/mi_controlador/mi_funcion
	      type: 'POST',//el método post o get del formulario
	      data: $(formNuevaVelocidad).serialize(),//obtenemos todos los datos del formulario
	      
	      success:function(data){
	      //hacemos algo cuando finalice todo correctamente
	      
		      if(data=='1')
		      {
		      	//alert("guardado");
		      	 alert("Guardado Correctamente!!");
			             var url = document.URL;
				  		location.href=url;
		      	

		      }else{
		      		$('#mensaje').html('<p class="alert alert-alert">No se puede Guardar .</p>'); 
		      }
	      
	      }
	   });
    }
    
}

function ModificarVelocidad(codigo)
{

	if(confirm('estas seguro de Modificar?..'))
   {
	   
					$.ajax({
					      url:'velocidad/'+codigo,//action del formulario, ej:
					      //http://localhost/mi_proyecto/mi_controlador/mi_funcion
					      type: 'PUT',//el método post o get del formulario
					      data: $(formNuevaVelocidad).serialize(),//obtenemos todos los datos del formulario
					      error: function(){
					      	$('#mensaje').html('<p class="alert alert-danger">no se puede Modificar!!!!.</p>');
					      //si hay un error mostramos un mensaje
					      },
					      success:function(data){
					      //hacemos algo cuando finalice todo correctamente
					      if(data=="0")
					      {
					      	// alert(data);
					      	 $('#mensaje').html('<p class="alert alert-danger">No se puede Modificar!!!. Falta ingresar algun dato.</p>');
					      	

					      }else{
					      	    alert("Velocidad modificado Correctamente");
					            var url = document.URL;
						        location.href=url;
					      }
					      
					      }
					   });
		
	    
	}  
}


function EliminarVelocidad(codigo){
		
   if(confirm('estas seguro de Eliminar?..'))
   {
		
		$.ajax({
				type: 'DELETE',
				url: 'velocidad/'+codigo,
				success: function(data){
					// alert(data);
					if(data="1")
					{
						alert("eliminado correctamente");
						var url = document.URL;
			           location.href=url;
					}
					else
					{
						alert("no se puede eliminar");
					}

						
						// $('#contenidoPrecio').html(data);
				}
			});

	}
			
		
}

// conficguracion

function GuardarConfiguracion()
{
	var seguridad=document.getElementById("seguridad").value;
	var ruta=document.getElementById("ruta").value;
	if(window.confirm('Esta seguro de guardar Configuracion?')){
	$.ajax({
	      url: 'new_Configuracion/'+seguridad+'/'+ruta,//action del formulario, ej:
	      //http://localhost/mi_proyecto/mi_controlador/mi_funcion
	      type: 'POST',//el método post o get del formulario
	      
	      
	      success:function(data){
	      //hacemos algo cuando finalice todo correctamente
	      
		      if(data=='1')
		      {
		      	//alert("guardado");
		      	 alert("Guardado Correctamente!!");
			             var url = document.URL;
				  		location.href=url;
		      	

		      }else{
		      		alert("No se puede Guardar!!");
		      }
	      
	      }
	   });
    }
    
}

$(document).ready(function (){
      $("#btnExportar").on("click",function(){
       
      
     
      });
    });

function validarColor(objeto)
{
	//var idx=objeto.selectedIndex;
    //color=objeto.options[idx].style.color;
   
}

function imprimir()
{
	 var dataSource = shield.DataSource.create({
                data: "#example",
                schema: {
                    type: "table",
                    fields: {
                        Nro: { type: Number },
                        LINEA: { type: String },
                        BUS: { type: String },
                        FECHA: { type: String },
                        HORA: { type: String },
                        LAT: { type: String },
                        LON: { type: String },
                        VEL: { type: String },
                        'VEL.PER': { type: String },
                        'DIST.RUTA': { type: String },
                        'DIST.PER': { type: String },
                        'VEL.PUERTA': { type: String },
                        'VEL.PUERTA.PER': { type: String },
                        INFRACCION: { type: String }
                    }
                }
            });

            // when parsing is done, export the data to PDF
            dataSource.read().then(function (data) {
                var pdf = new shield.exp.PDFDocument({
                    author: "Cesar",
                    created: new Date()
                });

                pdf.addPage("a4", "landscape");

                pdf.table(
                    50,
                    50,
                    data,
                    [
                        { field: "Nro", title: "Nro", width: 20 },
                        { field: "LINEA", title: "Linea", width: 50 },
                        { field: "BUS", title: "Bus", width: 50 },
                        { field: "FECHA", title: "Fecha", width: 50 },
                        { field: "HORA", title: "Hora", width: 50 },
                        { field: "LAT", title: "Lat", width: 50 },
                        { field: "LON", title: "Lon", width: 50 },
                        { field: "VEL", title: "Vel", width: 50 },
                        { field: "VEL.PER", title: "Vel.Per", width: 50 },
                        { field: "DIST.RUTA", title: "Dist.Ruta", width: 50 },
                        { field: "DIST.PER", title: "Dist.Per", width: 50 },
                        { field: "VEL.PUERTA", title: "Vel.Puerta", width: 50 },
                        { field: "VEL.PUERTA.PER", title: "Vel.Puerta.Per", width: 50 },
                        { field: "INFRACCION", title: "Infraccion", width: 50 }
                        
                    ],
                    {
                        margins: {
                            top: 50,
                            left: 50
                        }
                    }
                );

                pdf.saveAs({
                    fileName: "Historial"
                });
            });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////

/*var map;
var ruta = [];
 
$(function(){
function clear () { ruta = []; localStorage.ruta = JSON.stringify(ruta); };
 
$('#compactar').on('click', function () {
ruta1 = ruta[0]; ruta2 = ruta[ruta.length - 1];
ruta = [ruta1, ruta2];
//geolocalizar();
} );
$('#limpiar').on('click', function () {
clear();
geolocalizar();
} );
 
function muestra (origen, fin) {
// muestra ruta entre marcas anteriores y actuales
map.drawRoute({
origin: origen,  // origen en coordenadas anteriores
destination: fin, // destino en coordenadas del click o toque actual
travelMode: 'driving',
strokeColor: '#3B9313',
strokeOpacity: 0.6,
strokeWeight: 5
});
map.addMarker({ lat: fin[0], lng: fin[1]});  // pone marcador en mapa
map.setCenter( fin[0], fin[1]);
};
 
function enlazarMarcador(e){
var lat2 = e.latLng.lat(); var lng2 = e.latLng.lng();  // guarda coords para marca siguiente
if (ruta.length > 0)
{ muestra(ruta[ruta.length - 1], [lat2, lng2]) }
else {
map.addMarker({ lat: lat2, lng: lng2});  // pone marcador en mapa
}
ruta.push([lat2, lng2]);
// console.log(ruta);
localStorage.ruta = JSON.stringify(ruta);
};
 
function geolocalizar(){
GMaps.geolocate({
success: function(position){
var lt, ln;
if (ruta.length == 0) {
lt = position.coords.latitude;  // guarda coords en lat y lng
ln = position.coords.longitude;
}
else
{ lt = ruta[0][0]; ln = ruta[0][1];    }
map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
el: '#map',
lat: lt,
lng: ln,
//setZoom: 8,
click: enlazarMarcador,
tap: enlazarMarcador
});
if (ruta.length > 0) {
map.addMarker({ lat: ruta[0][0], lng: ruta[0][1]});  // marcador en [lat, lng]
}
if (ruta.length > 1) {
for (i=1; i<ruta.length; i++) { muestra(ruta[i-1], ruta[i]); }
}
map.fitZoom();
},
error: function(error) { smoke.alert('Error en la Geolocalización: '+error.message); },
not_supported: function(){ smoke.alert("Su navegador no soporta geolocalización"); },
});
};
 
try { ruta = JSON.parse(localStorage.ruta);  // console.log( ruta.length );
}   catch (e) { console.log("Parsing error:" + e); }
geolocalizar();
});*/
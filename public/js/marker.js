function cMarker(map,id,lat,lon,vel){
  this.map=map;
  this.lat=lat;
  this.lon=lon;
  this.marker=null;
  this.id=id;	
  this.vel=vel; 
  ///////////////////////////////////////////
  this.dibujar=function(){ 
	this.marker=new google.maps.Marker({
  		position:new google.maps.LatLng(this.lat,this.lon),
		map:this.map,
		title:this.id+' ; velocidad:'+this.vel+'Km/h',
		icon: '../public/img/bus.png'
  	});
	this.marker.setMap(this.map);
  }//////////////////////////////////////////
  this.dibujarFalta=function(){ 
  this.marker=new google.maps.Marker({
      position:new google.maps.LatLng(this.lat,this.lon),
    map:this.map,
    title:this.id+' ; velocidad:'+this.vel+'Km/h',
    icon: '../public/img/bus-falta.png'
    });
  this.marker.setMap(this.map);
  }//////////////////////////////////////////
  this.remover=function(){
	if(this.marker!=null)
		this.marker.setMap(null);
  }//////////////////////////////////////////
  this.desplazarY=function(){
    this.lat+=0.01;

  }//////////////////////////////////////////
  this.desplazarX=function(){
    this.lon+=0.01;

  }//////////////////////////////////////////	
  this.getId=function(){
    return this.id;
  }//////////////////////////////////////////	
  this.update=function(lat,lon){
    this.lat=lat;
    this.lon=lon;	
  }//////////////////////////////////////////						
}

function cMarkarFalta(map,id,lat,lon,vel,hora,falta1,falta2,falta3){
  this.map=map;
  this.lat=lat;
  this.lon=lon;
  this.marker=null;
  this.id=id; 
  this.vel=vel; 
  this.hora=hora;
  this.falta1=falta1;
  this.falta2=falta2;
  this.falta3=falta3;
  this.mensaje=[];

  ///////////////////////////////////////////
  this.dibujarFalta=function(){ 
    if(this.falta1!="")
      this.mensaje.push(this.falta1);
    if(this.falta2!="")
      this.mensaje.push(this.falta2);
    if(this.falta3!="")
      this.mensaje.push(this.falta3);

  this.marker=new google.maps.Marker({
      position:new google.maps.LatLng(this.lat,this.lon),
    map:this.map,
    title:'INFRACCIONES:'+this.falta1+','+this.falta2+','+this.falta3+'---HORA'+this.hora,
    icon: '../public/img/bus-falta.png'
    });
  this.marker.setMap(this.map);
  }//////////////////////////////////////////
  this.remover=function(){
  if(this.marker!=null)
    this.marker.setMap(null);
  }//////////////////////////////////////////
  this.desplazarY=function(){
    this.lat+=0.01;

  }//////////////////////////////////////////
  this.desplazarX=function(){
    this.lon+=0.01;

  }////////////////////////////////////////// 
  this.getId=function(){
    return this.id;
  }////////////////////////////////////////// 
  this.update=function(lat,lon){
    this.lat=lat;
    this.lon=lon; 
  }

}

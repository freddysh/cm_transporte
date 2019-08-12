var net=require('net');
var sta=require('./estadisticas.js');
var i=0;
function connect(){
  process.stdout.write('#');
  var time=Date.now();
  var conn=net.createConnection(60000);

  conn.on('connect',function(){
    sta.collect('connect',Date.now()-time);
   console.log('conected');
   var latencyTime=Date.now();
   conn.write('CARRO'+i);
    var j=i;
   
     
     sta.collect('data',Date.now()-latencyTime);
     setInterval(function(){conn.write('-13.518999,-71.978056,0.83,CARRO'+j+',251017,14290500,1');},20000);
      
   
  });
  conn.on('close',function(){
   console.log('closed');
   conn.end();
  });
  i++;
}

setInterval(function(){ if(i<1) connect()},5);

process.on('SIGINT',function(){
  console.log('\n######## sumary:')
  sta.sumarize();
  process.exit();

});


var collected=[];
exports.collect= function(measure,time){
   if(!collected[measure]) collected[measure]=[];
   	collected[measure].push(time);
};

exports.sumarize=function(){
	Object.keys(collected).forEach(function(key){
		var samples=collected[key];
		var average=0, sum=0;
		samples.forEach(function(sample){
			sum+=sample;
		});

		if(samples.length>0) average=sum/samples.length;
		console.log(key+' average: '+ average + ' ms');
	});
}
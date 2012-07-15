/*
 * THE APP TESTING
 */

$(function() {
	
	
	
	A('sam').get({
		url: 'gateway.php', 
		dataType:'json' 
	 }).view(function(){
	 	
		});
	
	
	
	A('sam').run({
		'hey' : 'hi'
	})
	.data(function(data){

		//for( var i in data)
		//console.log(i + '::' + data[i]);
		
	}, 'a');
	/*.data*/
	
	
	
	
	
	
});



















//alert( A('hmmm').run().name );
	
	//A('hey').run().data();
	/*
	A('hi').model(function(){
		alert('yahooooo');
	}).run();
	*/
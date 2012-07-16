/*
 * THE APP TESTING
 */

$(function() {
	
	
	
	A('sam').get({
		url: 'gateway.php', 
		dataType:'json' 
	 }).template( '#container', '#con_temp' );
	
	/*
	
	A('sam').run({
		hey : 'hi'
	});

	*/
	$('#btn').on('click', function(){
		A('sam').run({hey:'run'});
	})
	


	
	
	
	
});



















//alert( A('hmmm').run().name );
	
	//A('hey').run().data();
	/*
	A('hi').model(function(){
		alert('yahooooo');
	}).run();
	*/
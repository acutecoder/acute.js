/*
 * THE APP TESTING
 */

$(function() {
	
	
	
	A('sam').get({
		url: 'gateway.php', 
		dataType:'json' 
	 }).template( '#container', '#con_temp' ).render();
	
	/*
	
	A('sam').run({
		hey : 'hi'
	});

	*/
	$('#btn').on('click', function(){
		A('sam').run({hey:'run'});
	})
	


	$('#ub1').on('click', function() {
		
		uri.hash_bang('something/yeah');
		uri.get_hash();
		//uri.bang('bang', 'hi');
	});
	
	
	var b = 'somethingelse/another';

	
	
	$('#ub2').on('click', function() {
		
		//uri.bang('bang', 'well');
	});
	
	$('#ub3').on('click', function() {
		
		//uri.bang('bang', 'bye');
	});
	
	
});



















//alert( A('hmmm').run().name );
	
	//A('hey').run().data();
	/*
	A('hi').model(function(){
		alert('yahooooo');
	}).run();
	*/
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
	


	$('#ub1').on('click', function() {
		
		location.hash = '#!' + 'hi=something/somethingelse=yeah';
		uri.get_hash();
		//uri.bang('bang', 'hi');
	});
	
	
	var b = 'something=somethingelse/and=another';
	
	console.log( a.objectify(b) );
	
	
	
	
	$('#ub2').on('click', function() {
		
		uri.bang('bang', 'well');
	});
	
	$('#ub3').on('click', function() {
		
		uri.bang('bang', 'bye');
	});
	
	
});



















//alert( A('hmmm').run().name );
	
	//A('hey').run().data();
	/*
	A('hi').model(function(){
		alert('yahooooo');
	}).run();
	*/
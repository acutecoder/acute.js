/*
 * THE APP TESTING
 */

$(function() {
	
	
	A('sam').get({
		url: 'gateway.php', 
		dataType:'json' 
	});
	
	
	
	A('sam').run({
		'hey' : 'hi'
	}).data(function(a){
		console.log(a);
		for( var i in a ) {
			console.log( a + ' :: ' + a[i] );
		}
		
	});
	

	//ACUTE.url = 'gateway.php';
	
	///alert( ACUTE.default_url );

	
});



















//alert( A('hmmm').run().name );
	
	//A('hey').run().data();
	/*
	A('hi').model(function(){
		alert('yahooooo');
	}).run();
	*/
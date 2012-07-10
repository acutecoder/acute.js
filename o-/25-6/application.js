

/*
 * Ok so what I want is for there to be two main ways to construct the MVC for each application page
 * 
 * After that I will look at how I can put it together so modules can be added for a whole application
 * 
 * this will allow for an application set up to be generated
 * 
 * It could mean that it is worked into the php frame work with a function called:
 * 
 * use x/y/z
 * 
 * the php could read the js file and include then the page could use?
 * 
 * this is a thought at this point
 * 
 */


//	method one - simple application

//create view
/*
	$view( 'name' );	// adds or gets view refference
	
	$view( 'name', function( a ){
		
	} );	//	adds function to view
	
	$view( 'name' ).template();		//	adds template to view
	
	$view( 'name' ).fn( a ); 	//		call view
	
	
	$model( 'name' );	//	adds or gets model reference

	$control( 'name' ).addMv( 'model', 'view' );

	$control( 'name' ).addMv( function(){
		
	}, function(){
		
	});	//	I guess this would need to auto generate a name - but bad idea as you would not be able to reference elsewhere
	
	
	
	
	$( '#id' ).swap( 'click', function(){
		// First Method
	},
	function(){
		//	Second Method
	}, 
	function(){
		//	Third Method
	} );
*/
////////////////////////////////////////////////////////////////////////////


//	testing

( function( $ ){
	
	$( '#btn' ).swap( 'click', function(){
		//console.log( 'clicked 1' );
		autoNamer('something');
	}, function(){
		console.log( 'clicked 2' );
	} );
	
	
	/*$view( 'display_contents', function( a, b ){
		$( '#container' ).html( a );
	} ).fn( 'b' );
	
	$view( 'display_contents', function(){
		$( '#container' ).appendTo( 'new' );
	} );*//*
	
	//.getName();
	//$view.fn( 'a', 'b' );

	
	
	var a = function () {
		console.log( 'hey ');
	}
	
	
	gateway.ajax({
		'test' : 'Sam'
	}, function(){
		$( '#aaa' ).html( arguments[0] );
	}, 'html' )
	
	*/
	
	//console.log( 'hey' );
/*	
	$view( 'av', function( a ){
		$( '#aaa' ).html( a );
	});
	
	
	$ajax({
		'test' : 'Sam'
	}, $view( 'av' ).fn, 'html' );
	

*/

	$exe( 'hey' ).model( 'hi', 'moo' );






})( jQuery );










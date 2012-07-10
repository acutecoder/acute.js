/*
 * 
 * TODO :: BELOW
 * 
 */



var debug = true;


var $vVars = {
	
	view_list : {},
	
	current_view_name: ''
}



var app_view = function( args ) {
	
	var that = app_view;
	
	var view_list = $vVars.view_list;
	
	var args_len = args.length;
	var name = args[0];
	var check = that.check_view( name );

	if( check )
	{
		$vVars.current_view_name = name;
		
		if( args_len > 1 )
		{
			var i = 0;
			while( ++i < args_len )
			{	
				
				//for( var j in view_list ){
					//if( j == name ){
						
						if( is_function( view_list[name] ) )
						{
							if( String( view_list[name] ) !== String( args[i] ) )
							{
								var tempArr = [view_list[name]];
								view_list[name] = tempArr;
								view_list[name][view_list[name].length] = args[i];
							}
							else console.log( 'same' );
						}
						else if( is_array( view_list[j] ) )
						{
							console.log( 'array' );
						}
						console.log( is_array( view_list[name] ) );
						console.log( view_list[name].length );
					//}
				//}			
			}
		}
	}
	else{
		if( args_len > 0 ){
			if( args_len == 1 )	view_list[name] = 'empty';
			else if( args_len > 1 )	{
				if( args_len == 2 )	{
					view_list[name] = args[1];
				}else{
					var ar = argsToArray( args );
					ar.splice( 0, 1 );
					view_list[name] = args;
				} 
			}
			$vVars.current_view_name = name;
		}
	}
}



app_view.call_view = function()	{
	
	var view_list = $vVars.view_list;
	var name = $vVars.current_view_name;
	
	console.log( name );
	
	if( is_function( view_list[name] ) )
	{
		view_list[name].apply( this, arguments );
	}
	else if( is_array( view_list[name] ) )
	{
		for( var i in view_list[name] )
		{
			view_list[name]
		}
	}
	
	

}

function newFun( a, b )
{
	console.log( a );
	console.log( b );
	console.log( c );
}



app_view.check_view = function ( name ) {
	for( var i in $vVars.view_list )	if( i == name )	return true;
	return false;
}

app_view.check_fn = function ( name, fn ) {
	for( var i in $vVars.view_list )
	{
		if( i == name )
		{
			//if( view_list[i]  )
			//if( view_list[i] == fn )	return true;
		}
	}
	return false;
}





//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/////////////												VIEW API


var $view = function ()
{
	if( arguments.length )
	{
		//for( var i in arguments )	console.log( i + ' :: ' + arguments[i] );
		if( typeof arguments[0] === 'string' )	app_view( arguments );
		return $view;
	}
	else	
	{
		debug == true ? console.log( 'no arguments added to view' ) : false;
		$vVars.current_view_name = undefined;
		return false;
	}
}




$view.getName = function(){
	console.log(  $vVars.current_view_name );
}



$view.fn = function(){
	app_view.call_view.apply( this, arguments );
}






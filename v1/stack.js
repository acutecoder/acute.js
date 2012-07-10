
var $stack = function ( type, name ) 
{
	for( var i in $v.stack ) 
	{
		for( var j in $v.stack[i][j] ) 
		{
			if( $v.stack[i][j] !== type ) continue;
			
			var tempArr = $v.current_stack.split( $v.stack_key );
			var stack_len = tempArr.length;
			
			if( j !== stack_len )	continue;
			
			if( stack_len !== 0 ) $v.current_stack += $v.stack_key;
			
			$v.current_stack += name;
		}
	}
	
	if( is_string( type ) && type != '' )
	{
		if( is_string( name ) && name != '' )	$v.current[type] = name;
	}
}

$stack.add = function ( jso ) {
	for( var i in $v.stack) {
		if( $v.stack[i] == jso ) return;
	}
	
	for( var i in jso ) {
		if( is_string( i ) ) {
			if( is_function( jso[i] ) ) continue;
		}
		alert( 'invalid stack structure' );
		return;
	}
	
	$v.stack[$v.stack.length] = jso;
	return;
}



$stack.reset = function () {
	$v.current_stack = '';
}


$stack.check = function( type ){
	
	var tempArr = $v.current_stack.split( '|%|' );
    var stack_len = tempArr.length;

  /*   for( var i in $v.stack )
    {
        if( $v.stack[i][stack_len] == type )
        {
        	
        	
        	
        }
    }
   */
}



var $rtn = function ( what ){
	var i = $v.stack.length;
	while( --i > -1 ){
		if( $v.stack[i][what] ) return $v.stack[i][what]; 
	}
}

var $app = function( type, args ) {
	
	if ( type !== undefined )
	{
		$v.type = type;
		var args_len = args.length;
		
		
		if( args_len > 0 )
		{
			var that = $app, name = args[0], last_i; 
			
				
			if( $v.list[type] === undefined ) $v.list[type] = [];	//	Creates an array of a type is not defined
			if( $v.list[type][name] === undefined )	$v.list[type][name] = {};	//	creates obj of type\name
			
			$v.list[type][name]['set'] = true;	//	sets it to true
			
			if( args_len == 2 )	//	if len is 2 then we have a name and a function
			{
				if( $v.list[type][name]['fn'] === undefined ) // there is not function of that type and name
				{
					$v.list[type][name]['fn'] = [];					//TODO
					last_i = 0;
				}	
				else	last_i = $v.list[type][name]['fn'].length;
				
				$v.list[type][name]['fn'][last_i] = args[i];
			}
			$stack( type, name );
		}
	}
}


$app._call = function()	{
	
	if ( $v.type !== undefined )
	{
		var name = $v.current[$v.type];
		for( var i in $v.list[$v.type][name]['fn'] )	$v.list[$v.type][name]['fn'][i].apply( this, arguments );
	}
}

$app.onOff = function( status ){
	
	if ( $v.type !== undefined )
	{
		status = status !== undefined ? status : false;
		var name = $v.current[$v.type];
		if( $v.list[$v.type][name] !== undefined )	$v.list[$v.type][name]['set'] = status;
	}
}


$app.run = function( str, data ){
	for( var i in $v.list ) {
		if( $v.list[i][str] !== undefined && is_function( $v.list[i][str] ) ) {
			data === undefined ? $v.list[i][str]() : $v.list[i][str]( data );
		}
	}
}           


//$app.

var $vrfy = function (){
	if( arguments.length == 2 ) {
		if( arguments[1].length <= 2 && arguments[1].length >= 0 ) is_string( arguments[1][0] ) ? $app( arguments[0], arguments[1] ) : false;
		return $rtn( arguments[0] );
	}
	else return false;
}






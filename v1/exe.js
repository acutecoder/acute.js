var $exe = function () {
	return $vrfy( 'exe', arguments );
}



$exe.model = function (){
	
	
	var type = 'model';
	
	var args = arguments_to_a( arguments );
	var args_len = args.length;
	
	if( args_len )
	{
		var add_name = false;
		
		if( is_string( args[0] ) )
		{
			if( $v.list[type][args[0]] !== undefined )
			{
				if( i == 0 ) add_name = true;
				
			}
		}
		else add_name = true;
		
		
		if( add_name ) args.unshift( auto_name( type ) );
		
		
		//$vrfy( type, args );
		
		//random.apply( this, args );
	}
	else	trace( 'an exe can only accept one model' );
	

}

function random( a, b, c ){
	trace( a );
	trace( b );
	trace( c );
}

$exe.view = function (){
	
}


$exe.fn = function(){
	$v.type = 'exe';
	$app._call.apply( this, arguments );
}

$exe.on = function (){
	$app.onOff( true );
}

$exe.off = function (){
	$app.onOff( false );
}

var main_stack = { 
	'exe' : $exe, 
	'model': $model, 
	'view': $view
};


$stack.add( main_stack );
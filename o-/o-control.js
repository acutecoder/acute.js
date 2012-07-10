







var $routine = function ()
{
	if( arguments.length )
	{
		if( typeof arguments[0] === 'string' )	$app( 'routine', arguments );
		return $routine;
	}
	else	
	{
		debug == true ? console.log( 'no arguments added to view' ) : false;
		$v.current['model'] = undefined;
		return false;
	}
}



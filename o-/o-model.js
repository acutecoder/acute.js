

/////////////////////////////////////////////////////////////////////////////////////////
//			MODEL API




var $model = function (){
	return $vrfy( 'model', arguments );
}


$model.fn = function(){
	$v.type = 'model';
	$app._call.apply( this, arguments );
}

$model.on = function (){
	$app.onOff( true );
}

$model.off = function (){
	$app.onOff( false );
}





//	Tasks	::

//	Add thread
//	Edit Thread
//	delete thread

//	Add message
//	Edit message
//	Delete message


	var threads = [{
		thread_id		:	1,
		thread_name		: 'hey there',
		user_name		: 'Sam',
		thread_msg		: 'hello world!'
	}, {
		thread_id		:	2,
		thread_name		: 'thread no two',
		user_name		: 'Sam',
		thread_msg		: 'hi there'
	}];
	
	
	var messages = [{
		thread_id		:	1,
		thread_name		: 'hey there',
		user_name		: 'Sam',
		thread_msg		: 'hello world!'
	}, {
		thread_id		:	1,
		thread_name		: 'hi msgs 2',
		user_name		: 'Sam',
		thread_msg		: 'hello there!'
	}]








//////////////////////////////////////////////////////////////////////////////
/*****************************************************************************
*	My First Attempt at Javascript MVC
*****************************************************************************/
//////////////////////////////////////////////////////////////////////////////

		
////////////////////////////////////////////////////////////////////////////////////////////
/*******************************************************************************************
* ROUTER
*******************************************************************************************/
////////////////////////////////////////////////////////////////////////////////////////////
	
	var counter = 0;
	
	
	var event_bus 	= [];
	var event_swap 	= [];
	
	
	var $event_hub = function (){		
		
	};
	
	$event_hub.query_model = function ( data, index, value )
	{
		for( var i in data )
		{
			if( data[i][index] == value )
			{
				return data[i];
			}
		}		
	};

////////////////////////////////////////////////////////////////////////////////////////////
/*******************************************************************************************
* Event Registry
*******************************************************************************************/
////////////////////////////////////////////////////////////////////////////////////////////
	
	
			
/////////////////////////////////////////////////////////////////////////	Add Event To Event Bus
		$event_hub.add_event = function ( obj, type, fn, set, swap  )
		{
			
			var id = obj.attr( 'id' ) !== undefined ? obj.attr( 'id' ) : obj.attr( 'class' );
			var status = set !== undefined ? set : true;
			swap = swap !== undefined ? swap : -1;
			
			var event_status = this.event_status( id, type, fn );
			
			if( event_status !== 'identical' )
			{
				if( event_status == 'none' )	obj.bind( type, this.handle_event );
						//obj.bind( type, $.proxy( $.controller.event_registry.handle_event ) );
						
				event_bus[event_bus.length] = {
					'id'	:	id,
					'type'	: 	type,
					'fn'	: 	fn,
					'set'	: 	status,
					'swap'	: 	swap
				};
			}
			else
			{
				var index = this.get_event_index( id, type, fn );
				if( index > -1 ) event_bus[index]['set'] = true;
			}

			
		}	/*	Add Event	*/
		
////////////////////////////////////////////////////////////////////////	Check Event Status
		//	Returns the following:
		//
		//		'none'		:: 	If no Event is assigned at all to Element
		//		'assigned'	:: 	If Events are assigned but functions are not the same;
		//		'identical'	::  If Event is assigned and Identical
		$event_hub.event_status = function ( id, type, fn )
		{
			var i = -1;
			var status = 'none';
			
			while( ++i < event_bus.length )
			{
				if( event_bus[i]['id'] == id )
				{
					status = status === 'none' ? 'assigned' : status;
					
					if( event_bus[i]['type'] == type )
					{
						if( event_bus[i]['fn'] == fn )	status = 'identical';
					}
				}
			}
			return status;
		}	/*	Event Status of Element	*/
		
//////////////////////////////////////////////////////////////////////////	Gets Event Index on Event Bus
		$event_hub.get_event_index = function ( id, type, fn )
		{
			var i = -1;
			while( ++i < event_bus.length )
			{
				if( event_bus[i]['id'] == id )
				{
					if( event_bus[i]['type'] == type )
					{
						if( event_bus[i]['fn'] == fn )	return i;
					}
				}
			}
			return -1;
		}	/*	Get Event Index	*/
		
		
/////////////////////////////////////////////////////////////////////////	Handle Events and Fire function
		$event_hub.handle_event = function ()
		{
			var id = $( this ).attr( 'id' ) !== undefined ?  $( this ).attr( 'id' ) :  $( this ).attr( 'class' ) ;
			var i = -1;
			var len = event_bus.length;
			while( ++i < len )
			{
				if( event_bus[i]['id'] == id )
				{
					if( event_bus[i]['type'] == event.type )
					{
						if( event_bus[i]['set'] )
						{
							event_bus[i]['fn']();	//	call assigned function
						//	$.proxy(  );

							if( event_bus[i]['swap'] > -1 )		//	if swap index then swap is assigned
							{
								var swap_index = event_bus[i]['swap'];
								var complete = false;
								
								for( var j = ( i + 1 ); j < len; j++ )
								{
									if( event_bus[j]['swap'] == swap_index )
									{
										event_bus[j]['set'] = true;
										complete = true;
									}
								}
								
								if( complete === false )
								{
									for( var k = 0; k < i; k++ )
									{
										if( event_bus[k]['swap'] == swap_index )
										{
											event_bus[k]['set'] = true;
											complete = true;
										}
									}
								}
								
								if( complete )	event_bus[i]['set'] = false;
								break;
							}
						}	
					}
				}
			}
		}	/* Handle Event	*/


/////////////////////////////////////////////////////////////	add swap
		$event_hub.add_swap = function ( obj, args )
		{
			var type, fn, set_status, swap_index, start_i, start_boo = true ;
			/////////////////////////////////////
			type = args[0];
			
			if( ( typeof args[1] === "number") && Math.floor( args[1] ) === args[1] )
			{
				swap_index = args[1]
				start_i = 1;
			}
			else
			{
				swap_index = this.check_swaps( obj.attr( 'id' ) );
				start_i = 0;
			}	
			
			while( ++start_i < args.length )
			{
				fn = args[start_i];
				set_status = start_boo;
				if( start_boo === true )  start_boo = false;
				this.then( 'add', obj, type, fn, set_status, swap_index );
			}
			

		}
		
		$event_hub.check_swaps = function ( id )
		{
			var topIndex = -1;
			var i = -1;
			while( ++i < event_bus.length )
			{
				if( event_bus[i]['id'] == id )
				{
					if( event_bus[i]['swap'] > topIndex )	topIndex = event_bus[i]['swap'];
				}
			}
			return ++topIndex;
		}
		
		
//////////////////////////////////////////////////////////////////		Handle Requests	->
		$event_hub.handle_requests = function ( what, obj, args )		//	Sort into variables
		{
			var type, func, set, swap;
			
			if( args.length == ( 2 || 3 ) )
			{
				if ( args.length >= 2 )
				{
					type = args[0];
					func = args[1];
				}
				
				if ( args.length >= 3 )	set		= args[2];
				if ( args.length >= 4 ) swap	= args[3]; 
			}
			this.then( what, obj, type, func, set, swap );

		}		
		
//////////////////////////////////////////////////////////////		Then	->
		$event_hub.then = function ( what, obj, type, func, set, swap )
		{
			switch( what )
			{
				case	'add'		: 	this.add_event( obj, type, func, set, swap );
										break;
										
				case	'remove'	: 	this.element_util( 'delete', obj, type, func );
										break;
										
				case	'set'		: 	this.element_util( 'set', obj, type, func );
										break;
										
				case	'unset'		: 	this.element_util( 'unset', obj, type, func );
										break;
			}
		}
			
///////////////////////////////////////////////////////////////		check for matches depending on supplied variables
		$event_hub.element_util = function ( what, obj, type, fn )
		{
			var id = obj.attr( 'id' );
			
			var i = -1;
			while( ++i < event_bus.length )
			{
				if( event_bus[i]['id'] == id )	//	If id's match
				{
					if( event_bus[i]['type'] )	//	If type Defined
					{
						if( event_bus[i]['type'] == type )	//	If types match
						{
							if( event_bus[i]['fn'] )	//	If	fn defined
							{
								if( String( event_bus[i]['fn'] ) == String( fn ) )	this.do_what( i, what );	//	if fn matches ;
							}
							else	this.do_what( i, what );	//	do to all of that type for element
						}
					}
					else	this.do_what( i, what );	//	do to all of events for element
				}
			}
		}	/*	Unset Events based on id -> type -> fn	*/
		
		
		/////////////////////////////////////////////////////////////////////////	do_what
		//		'what' can be:
		//
		//			'delete'
		//			'set'
		//			'unset'
		//
		$event_hub.do_what = function ( index, what )
		{
			if( what == 'delete' )		event_bus.splice( index, 1 );
			else if( what == 'set' )	event_bus[index]['set'] = true;
			else if( what == 'unset' )	event_bus[index]['set'] = false;

		}
	
	
	
	

	
	

/*
 
	var thread_names = document.getElementsByClassName( 'thread_names' );
	
	var i = -1;
	var len = thread_names.length;
	

var listener;
	if( len > 0 )
	{
		while( ++i < len )
		{
			if( listener === undefined )
			{
				listener = typeof thread_names[i].addEventListener != undefined ? true : false;
			}
			if( listener )
			{
				thread_names[i].addEventListener( 'click', event_bus.thread_select, false);
			}
			else if( !listener )
			{
				thread_names[i].attachEvent( 'onclick', event_bus.thread_select, false);
			}
		}
	}
	*/
	
	
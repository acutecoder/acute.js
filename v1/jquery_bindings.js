/**
 * @author user
 */
	
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////	
/////////////////////////////////////////////////////////////////////////////////////////////////	
/////////////////////////////////////////////////////////////////////////////////////////////////
	//		jQuery binding of controller and Event bus,
	
	$.extend({
		addOn		: function ( name, fn ){	( function ( $ ){   $.fn[name] = fn;	})( jQuery ); },
		//router 		: new router(),
		modelQuery	: function ( data, index, value ) { this.controller.query_model( data, index, value ); }
	});
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////
	//		the addition of the event requested

	;( function ( $ ){
		
		//	registers an event using jQuery bind and adds event to event bus and
		
		$.fn.addEvent = function ()
		{
			///	this is used in the same way as jQuery Bind	::  	$( id/class ).addEvent( 'event', function );
			var _this = $( this );
			$event_hub.handle_requests( 'add', _this, arguments );
			return _this;
		}
		
		$.fn.removeEvent = function ()
		{
			///	this is used in the same way as jQuery unBind	::  	$( id/class ).removeEvent( 'event', function );
			var _this = $( this );
			$event_hub.handle_requests( 'remove', _this, arguments );
			return _this;
		}
				
		
		$.fn.set = function ()
		{
			///	this is used as follows	::  $( id/class ).set( 'event', function );
			var _this = $( this );
			$event_hub.handle_requests( 'set', _this, arguments );
			return _this;
		}
		
		$.fn.unset = function ()
		{
			///	this is used as follows	::  $( id/class ).unset( 'event', function );
			var _this = $( this );
			$event_hub.handle_requests( 'unset', _this, arguments );
			return _this;
		}
		
		$.fn.swap = function ()
		{
			var _this = $( this );
			$event_hub.add_swap( _this, arguments );
			return _this;
		}
		
		$.fn.removeSwap = function ()
		{
			
		}
		

	})( jQuery );
	



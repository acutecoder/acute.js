////////////////////////////////////////////////////////////////////////
/***********************************************************************
*	Gateway JS
***********************************************************************/
////////////////////////////////////////////////////////////////////////

	var $ajax = function ( json, call_back, call_type, data_type ){
		
		var data_type = data_type ? data_type : 'json';
		
		var call_type = call_type ? call_type : 'get';
		
		call_type = call_type.toUpperCase();
		
		$.ajax({
			type	: 'GET',
			data	: json,
			dataType: this.data_type
		}).done( function( data ){
			if( call_back !== undefined )	{
				if( is_string( call_back) )  		$app.run( call_back );
				else if( is_function( call_back) )  call_back( data );
			}	
		});
	}
	
	
////////////////////////////////////////////////////////////////////////////////////////////////////
	$.ajaxSetup({	url: 'gateway.php'	});		////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////	
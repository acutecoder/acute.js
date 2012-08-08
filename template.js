var template_engine = function ( x, y, z ) {

	if( z !== undefined ) {

		container_name = x;
		template_name = y;
		data = z;

		var return_html 	= '';	
		var display_holder = $( container_name );		// Get Display holder - jQuery	
	
		var return_obj = (function ( template, data ) {

			var reg;
			var original_template;
			original_template 	= $( template ).html();		// Get template - jQuery
			                                    
			var template_html 	= original_template;	// temporary template html
		    
		    /////////////////////////////////	Function to swap values with key
		    var swap = function( key, val ) {
		    	reg = RegExp( '{{' + key + '}}' );
				return template_html.replace( reg, val );	// Change Current Template Construction
		    }

		    if( data ) {

		    	////	Initialise Variables
			    var i 				= -1;
			    var len 			= data.length;
			    
			    if( len ) { 	//	 If array
			   
			    	while( ++i < len ) {	//	Loop through array
					
			    		for( var j in data[i] )	{ //	Loop through Json
			    		
			    			template_html = swap( j, data[i][j] );		// Swap Key and Value and updating instance of template
			    		}
			    		return_html += template_html;		// Append to return HTML
			    		template_html = original_template;	//	Revert temporary template to original
					}
			    }
			    else {
			    
			    	//	Loop Through Json
			    	//	swap Key and Value updating instance of template	
			    	for( var j in data )	template_html = swap( j, data[j] );

		    		return_html += template_html;	// Append to return HTML
			    }
		    }
		    else	return_html = template_html;
		    
		    return (function( display_holder, return_html ) {

		    	var display_holder = display_holder;
		    	var return_html = return_html;

		    	this.render = function() {

		    		display_holder.html( return_html );
					return display_holder;

		    	}// use jQuery to change HTML

			})();

		})( template_name, data );

		return return_obj;
	}
	else {
		$( x ).html(y);
		return;
	}
}
;( function ( $ )
{
	$.fn.template = function ( template, data )
	{
		var return_html 	= '';	
		var display_holder = $( this );		// Get Display holder - jQuery	
		
		this.init = function ( template, data )
		{
			var reg;
			var original_template;
			original_template 	= $( template ).html();		// Get template - jQuery							
			                                              
			var template_html 	= original_template;	// temporary template html

		    
		    /////////////////////////////////	Function to swap values with key
		    this.swap = function( key, val )
		    {
		    	reg = RegExp( '{{' + key + '}}' );
				return template_html.replace( reg, val );	// Change Current Template Construction
		    }
		   
		    if( data )
		    {
		    	////	Initialise Variables
			    
			    var i 				= -1;
			    var len 			= data.length;
			    
			    if( len )	//	 If array
			    { 
			    	while( ++i < len )	//	Loop through array
					{
			    		for( var j in data[i] )	//	Loop through Json
			    		{
			    			template_html = this.swap( j, data[i][j] );		// Swap Key and Value and updating instance of template
			    		}
			    		return_html += template_html;		// Append to return HTML
			    		template_html = original_template;	//	Revert temporary template to original
					}
			    }
			    else
			    {
			    	//	Loop Through Json
			    	//	swap Key and Value updating instance of template	
			    	for( var j in data )	template_html = this.swap( j, data[j] );

		    		return_html += template_html;	// Append to return HTML
			    }
		    }
		    else	return_html = template_html;
		    
		    return this.render();
		}
		
		this.render = function () {		
			display_holder.html( return_html );
			return display_holder;
		}// use jQuery to change HTML
		
		if( template )	return this.init( template, data );
	}
	
})( jQuery );



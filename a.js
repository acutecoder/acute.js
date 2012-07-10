/*
 * A - API
 */
var A = ( function( name ) {

	var build = function() {	//	LIST OF ARGUMENTS
		
		var return_obj = function() {
			this.name = name;
		};

		for( var i in arguments ) {
			
			if( methods[arguments[i]] !== undefined) {
				
				return_obj.prototype[arguments[i]] = methods[arguments[i]]
			}
		}
		return new return_obj();
	},
	
	methods = {

		run : function() {
			ACUTE.$tack.run( name )
			return build('data');
		},
		
		model: function(f) {
			ACUTE.$tack.handle( name, 'model', f );
			return build(
				'data',
				'view',
				'run'
			);
		},
		
		view: function() {
			ACUTE.$tack.handle( name, 'view', f );
			return build(
				'data',
				'model',
				'run'
			);
		},
		
		data: function() {
			alert('data');
		},
		
		get: function( json ) {
			
			ACUTE.$tack.handle( name, 'get' );
			
			return build(
				'data',
				'model',
				'run'
			);
		},
		
		post: function() {
			
		}

	};
	
	ACUTE.$tack.handle( name, 'x' );	
	
	return build(
		'run',
		'model',
		'view',
		'get',
		'post'
	);
});

/*
 * A - API
 */
var A = ( function( name ) {

	var build = function() {	//	LIST OF ARGUMENTS
		
		var return_obj = function() {	//	This construct
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

		run : function( data ) {
			ACUTE.run( name, data )
			return build('data');
		},
		
		model: function( fn ) {
			ACUTE.init( name, 'model', fn );
			return build(
				'data',
				'view',
				'run'
			);
		},
		
		view: function( fn ) {
			ACUTE.init( name, 'view', fn );
			return build(
				'data',
				'model',
				'run'
			);
		},
		
		data: function() {
			alert('data');
		},
		
		get: function( obj ) {
			
			ACUTE.init( name, 'get', obj );
			
			return build(
				'data',
				'model',
				'run'
			);
		},
		
		post: function() {
			
		}

	};
	
	ACUTE.init( name, 'x' );	
	
	return build(
		'run',
		'model',
		'view',
		'get',
		'post'
	);
});

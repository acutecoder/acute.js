//	THIS FILE IS BEING USED TO DEVELOP NEW FEATURES BEFORE BEING ADDED IN


//	Creating :: 



var uri = {
	
	active: true,
	his_active: true,
	
	hash: '#!',
	separator: '/',
	operator: '=',
	
	history: {
		cur_state:{},
		stack:[]
	},
	
	arrival: (function() {
		
		if(this.active) {
			
			var hash_obj = this.get_hash();
			
			console.log( hash_obj );
			
			/*for( var i in hash_obj ) {
				
				console.log( hash_obj[i] );
			}
				*/
		}
		
	}),
	
	bang: (function(container, display) {
		
		//	TODO Consider allowing hasbang for single values.
		
		if(this.active) {
			
			if( container !== undefined && display !== undefined ) {
				
				track_history(container, display);
				
				var hb_str = '', new_bang = true, separator, operator = this.operator;
				
				for(var i in this.history.cur_state) {
					
					if(!new_bang && separator !== separator) {
						separator = this.separtator;
					}
					else if(new_bang) {
						separator = '';
						new_bang = false;
					}
					
					hb_str += separator + i + operator + this.history.cur_state[i];
				}
			}
		}
	}),
	
	track_history: (function(container, display) {
		if(this.his_active) {
				//	this stores current state
			this.history.cur_state[container] = display;
			
				//	this adds to list of history -- this may not be useful at present.
		/*	var new_i = this.history.stack.length;
			this.history.stack[new_i] = {};
			this.history.stack[new_i][container] = display;	*/
		}
	}),
	
	hash_bang: (function( str ) {
		if( str !== '')	location.hash = this.hash + str;
	}),
	
	
	get_hash: (function() {
		var cur_hash = location.hash;
		var uri = cur_hash.split(this.hash);
		uri = uri[1];

		//var hash_obj = a.squish(  )
		return a.objectify(uri, this.separator, this.operator);
		
	})
	
}

uri.arrival();

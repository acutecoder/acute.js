/*
 * ACUTE ENGINE
 */

//	TODO 	ADD TEMPLATING and RENDER FUNCTIONS

//	TODO	ADD MORE ADVANCED TEMPLATING - SUCH AS FOR, WHILE, IF... etc.
//	TODO	ADD FUNCTIONALITY FOR ALL FUNCTION TYPES

//	TODO	HASH URI ENGINE

//	ACUTE['hub']['name']['data'] = {};
//	ACUTE['hub']['name']['seq'][0-10]['function_type'] = function () {		};
//	ACUTE['hub']['name']['render'][0-10]
//	ACUTE['hub']['name']['template']

var ACUTE =  {
	
		url: undefined,

		hub : {},	//	data model which holds all the elements
		
		index: 0,
		
		current: '',
		
		data_flag: true,
		
		///////////////////////////////////////////
		
		init : function( name, what, attr ) {	//	Initalises the seq
			
			if( what === 'x' ) {	//	x -- means that it is defining the name
				
				this.current = name;
				
				if( this.hub[name] === undefined ) {
					//log('created');
					this.hub[name] = {};
					this.hub[name]['data'] = {};
					this.hub[name]['seq'] = Array();	//	create new array seq
				}
				else {
						//alert( this.hub[name].length );
					if( this.hub[name].length > 0 ) log('exists');
				}
			}
			else {	//	if it is not the seq name and initalisation

				var last_i = this.hub[name]['seq'].length;
				this.hub[name]['seq'][last_i] = {};
				
					//	if get or post
				if( what === 'get' || what === 'post' ) {
					
						//	adds attr to nameded seq and type of fn
					this.hub[name]['seq'][last_i][what] = attr;
					this.hub[name]['seq'][last_i][what]['type'] = what.toUpperCase();
					
					var obj = this.hub[name]['seq'][last_i][what];
					
				}
				else if( what === 'template' ) {

					this.hub[name]['seq'][last_i][what] = attr;
				}
				else {	//	if normal function
					
					if( attr !== undefined ) {	//	 if attr/function

							//	add function to seq
						this.hub[name]['seq'][last_i][what] = attr;
					}
					else{
						
						this.hub[name]['seq'][last_i][what] = {};
					} 
				}
			}
		},
		
		
		///////////////////////////////////////////////////////////////
		run: function( name, data ) {		//	execute the seq
			
			this.current = name;
			var len = this.hub[name]['seq'].length;
			
			if( this.hub[name] !== undefined  &&  this.is_number( len ) ) {
				
				this.exe( 0, data );
			}
		},
		
		/////////////////////////////////////////////////////////////////////////////////
		//////////////////////	exe excutes the individual functions of the sequence and then passes the next index
		//////////////////////	to itself to execute the next function
		exe: function( i, data ) {
					
			var current_obj =  this.hub[this.current]['seq'][i];
			var next_i = i + 1;

			if( next_i <=  this.hub[this.current]['seq'].length ) {
			
				for( var j in current_obj ) {	// checking index
					
					if( j === 'get' || j === 'post' ) {
						
						this.ajax( next_i, current_obj[j], data );
					}
					else if( j === 'template' ) {
						
						//uri.
						if( this.hub[this.current].render === undefined ) this.hub[this.current].render = [];
						this.hub[this.current].render[this.hub[this.current]
						.render.length] = this.this.template( current_obj[j].container_id, current_obj[j].template_id, data );
					}   
					else {
						var passing = current_obj[j]( data );
						this.exe( next_i, passing );
						
						//	run other functions
						//	and loop back round
					}
				}
			}
			else {
				this.data_flag = true;
			}
		},


		template: function( x, y, z ) {

			if( z !== undefined ) {

				var container 	= x;
				var template 	= y;
				var data  		= z;

				var return_html = '';
				var $container = $( container );

				var org_template = $( template ).html();
				var templ_html = org_template;

				var swap = function( temp, key, val ) {
					var reg = RegExp( '{{' + key + '}}' );
					return temp.replace( reg, val );
				}

				var i = -1;
				var len = data.length;

				if( len > 0 ) {

					while( ++i < len ) {

						for( var j in data[i] ) templ_html = swap( templ_html, j, data[i][j] );

						return_html += templ_html;
						templ_html = org_template; //**	not convinced this works
					}
				}
				else {
					for( var j in data ) templ_html = swap( templ_html, j, data[j] );
					return_html += templ_html;
				}
			}
			else {

				return_html = templ_html;
			};

			return function() {
				$container.html( return_html );
			};
		},

		render: function( settings ) {
			
		},
		
		
		////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////	returns current selected objects data
		return_data: function( what_data ) {	//	pass array get a json or single
												//	depending on no of results
			var cnt = 0, return_data = {};

			for( var i in what_data ) {
				return_data[what_data[i]] = this.hub[this.current]['data'][what_data[i]];
				cnt++;
			}
			//alert( cnt );
			if( cnt === 0 ) {
				
				for( var j in this.hub[this.current]['data'] ) console.log(this.hub[this.current]['data'][i]);
				return_data = this.hub[this.current]['data'];
			}
			else if( cnt === 1 ) {
				for( var b in return_data ) return_data = return_data[b];
			}
			return return_data;
		},
		
		
		////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////	BUILD
		////////////////////////////////////////////////////////////	RETURN OBJECT
		////////////////////////////////////////////////////////////
		build: function() {	//	LIST OF ARGUMENTS
			
			var return_obj = function() {};	//	This construct
				
			for( var i in arguments ) {
				
				if( this.methods[arguments[i]] !== undefined) {
					
					return_obj.prototype[arguments[i]] = this.methods[arguments[i]]
				}
			}
			//if( this.hub[this.current]['data'] !== undefined )  return_obj['data'] = this.hub[this.current]['data'];
			return new return_obj();
		},
		
		reset_index: function() {
			
		},
		
		clear: function() {
			
		},


				//////////////////////////////////////////	return METHODS 	API
		methods : {
	
			render : function( settings ) {
				
				ACUTE.render( ACUTE.current, settings );
				return ACUTE.build(
					'data'
				)
			},

			run : function( data ) {
				ACUTE.run( ACUTE.current, data )
				return ACUTE.build(
					'data',
					'render'
				);
			},
			
			model: function( fn ) {
				ACUTE.init( ACUTE.current, 'model', fn );
				return ACUTE.build(
					'data',
					'view',
					'run'
				);
			},
			
			view: function( fn ) {
				ACUTE.init( ACUTE.current, 'view', fn );
				return ACUTE.build(
					'data',
					'model',
					'run'
				);
			},
			
			get: function( obj ) {
				
				ACUTE.init( ACUTE.current, 'get', obj );
				return ACUTE.build(
					'data',
					'model',
					'view',
					'run',
					'template'
				);
			},
			
			post: function() {
				
				ACUTE.init( ACUTE.current, 'post', obj );
				return ACUTE.build(
					'data',
					'model',
					'view',
					'run'
				);
			},
			
			template: function( container_id, template_id ) {
				
				if( container_id && template_id ) {
					template_details = {
						container_id : container_id,
						template_id : template_id
					}

					ACUTE.init( ACUTE.current, 'template', template_details );

					return  ACUTE.build (
						'data'//,
						//'render'
					);
				}
			},
			
			data: function() {
				
				console.log('there');
				
				var args = arguments;
				var that = this;
				
				if( ACUTE.data_flag ) {
					var fn = [], data_names =[], return_obj = {}, 
					fn_cnt = 0, dn_cnt = 0;
					
					for( var i in arguments ) {
						
						if( typeof arguments[i] == 'string' ) {
							data_names[dn_cnt++] = arguments[i];
						}
						else if( typeof arguments[i] == 'function' ) {
							fn[fn_cnt++] = arguments[i];
						}
					}
					
					var data = ACUTE.return_data( data_names );
					
					for( var j in fn ) {
						fn[j]( data );
					}
				}
				else {
					setTimeout( function() {
						that.data.apply( that, args );
					}, 100 );
				}
			}
		},
		
		///////////////////////////	TOOLS
		
		
		is_array: function(input){
		    return typeof(input) == 'object' && ( input instanceof Array );
		},
		
		is_string: function( input ){
			return typeof input == 'string';
		},
		
		is_function: function( input ){
			return typeof input == 'function';
		},
		
		is_number: function(n) {
		  return !isNaN(parseFloat(n)) && isFinite(n);
		},
		  
		are_arguments: function( input ){
			if( typeof input == 'string' )	return false;
			else if( input.length > 0 && !typeof input == 'string' && !( input instanceof Array ) )	return true;
		},

		
		/*
		get: function( name, what ) {
			
			if( what !== undefined ) {
				
				if( this.hub[name] ) {
					
					if( what === 'x' ) 	return this.hub[name]
					else 				return this.hub[name][what];
					
				}
				else return undefined;
				
			}
			else return this.hub[name];
			
		},*/
		
		
		
		
		////////////////////////////////////////////////	HANDLES AJAX GET AND POST METHODS
		ajax: function( call_back_i, obj, args ) {
			
			this.data_flag = false;	//	FLAG SETS THE EXECUTION TO WAIT
									//	ON A TIMER, WHICH CHECKS EVERY 100ms
									//	UNTIL DATA HAS RETURNED AND
									//	BEEN PROCESSED
			var that = this;
			var ajax_params = obj;
			
			ajax_params['timeout'] = 5000;
			ajax_params['success'] = function( data ) {	//	AJAX SUCCESS FUNCTION
				
				console.log(data);
				
				for(var i in data) {
					
					that.hub[that.current]['data'][i] = data[i];
				}
				
				if( call_back_i < that.hub[that.current]['seq'].length ) {
					that.exe( call_back_i, data );
				}
				else {
					that.data_flag = true;
				}
			}
			/////////////////	END SUCESS FUNCTION
			
			ajax_params['error'] = function() {	//	AJAX ERROR FUNCTION
				that.data_flag = true;
			}
			/////////////////	END ERROR FUNCTION
			
			if( args !== undefined ) {

				ajax_params['data'] = this.construct_query(args, ajax_params['data']);
				//console.log(ajax_params.data);
			}
			
			/////	RUN AJAX
			$.ajax( ajax_params );
	
		},
		
		construct_query : function(new_data, old_str) {

		    var query_obj = new_data;
		    
		    var return_string = '', add_string = '';
		    
		    if( old_str !== undefined ) {
		        
		        var str = old_str, prev_obj = {};
                
                str = str.split('&');
                var temp_split = [];
                
                for(var i = 0; i <str.length; i++) {

                    temp_split = str[i].split('=');
                    if(temp_split[1] !== undefined) {
                        prev_obj[temp_split[0]] = temp_split[1];
                    }
                }
                
                query_obj = a.squish(prev_obj, query_obj);
                
                /*var new_obj = prev_obj;
                for(var j in query_obj) {
                    new_obj[j] = query_obj[j];
                }
                query_obj = new_obj;*/ // this could be removed once tested

		    }
		    
		    var new_string = true;

		    for(var i in query_obj) {

		        var  add_char = '&';
		        if( new_string ) {
		            add_char = '';
		            new_string = false;
		        }        
		    
		        return_string += add_char + i + '=' + query_obj[i];
		    }
		    return return_string;
		}
	
};

/*
 * A - API
 */
var A = ( function( name ) {

	ACUTE.init.call( ACUTE, name, 'x' );	
	
	return ACUTE.build.call( ACUTE,
		'run',
		'model',
		'view',
		'get',
		'post'
	);
});


var a = {
	squish: (function( old_obj, new_obj ) {
		var return_obj = old_obj;
        for(var j in new_obj) {
            return_obj[j] = new_obj[j];
        }
        return return_obj;
	}),
	
	objectify: (function( str, sep1, sep2 ) {
		
		if( str !== undefined ) {
			var arr = str, return_obj = {}, temp_split = [];
			arr = arr.split(sep1);
			
			var no = [];
			
	        if( sep2 !== undefined ) {
	        	
		        for(var i = 0; i <arr.length; i++) {
		
		            temp_split = arr[i].split(sep2);
		            if(temp_split[1] !== undefined) {
		                return_obj[temp_split[0]] = temp_split[1];
		            }
		            else {
		            	no[no.length] = temp_split;
		            }
		        }
		        if( no.length !== 0 ) return_obj['no_keys'] = no;
				return return_obj;
			}
			else {
				return arr;
			}
		}
	})
}

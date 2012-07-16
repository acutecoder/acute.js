/*
 * ACUTE ENGINE
 */

//	TODO 	ADD TEMPLATING and RENDER FUNCTIONS

//	TODO	ADD MORE ADVANCED TEMPLATING - SUCH AS FOR, WHILE, IF... etc.
//	TODO	ADD FUNCTIONALITY FOR ALL FUNCTION TYPES

//	TODO	HASH URI ENGINE

//	ACUTE['hub']['name']['data'] = {};
//	ACUTE['hub']['name']['seq'][0-10]['function_type'] = function () {		};

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
					if( this.hub[name].length > 0 ) {
						log('exists');
					}	
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
						
						//console.log( current_obj[j] );
						
						this.ajax( next_i, current_obj[j], data );
					}
					else if( j === 'template' ) {
						
						template_engine( current_obj[j].container_id, current_obj[j].template_id, data ) ;
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
		
		//////////////////////////////////////////	return methods
		methods : {
	
			run : function( data ) {
				ACUTE.run( ACUTE.current, data )
				return ACUTE.build(
					'data'
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
			
			this.data_flag = false;
			
			var that = this;
			var ajax_params = obj;
			
			ajax_params['timeout'] = 5000;
			ajax_params['success'] = function( data ) {	//	AJAX SUCCESS FUNCTION
	
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
			
			ajax_params['error'] = function() {	//	AJAX ERROR FUNCTION
				that.data_flag = true;
			}
			
			if( args !== undefined ) {
				
				var arg_str='', addition = "", first = true;
				
				for( var e in args ) {

					addition = e + '=' + args[e];
					if( first ) first = false;
					else		addition = '&' + addition;

					arg_str += addition;
				}
				
				ajax_params['data'] = arg_str;
			}
			
			/////	RUN AJAX
			$.ajax( ajax_params );
	
		},
	
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


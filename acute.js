/*
 * ACUTE ENGINE
 */
var ACUTE =  {
	
		url: undefined,

		hub : {},
		
		index: 0,
		
		///////////////////////////////////////////
		
		init : function( name, what, attr ) {	//	Initalises the seq
			
			
			if( what === 'x' ) {	//	x -- means that it is defining the name
				
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
				
					//	if get or post
				if( what === 'get' || what === 'post' ) {
					
						//	adds attr to nameded seq and type of fn
					
					this.hub[name]['seq'][last_i] = {};
					this.hub[name]['seq'][last_i][what] = attr;
					
					var obj = this.hub[name]['seq'][last_i][what];
					
				}
				else {	//	if normal function
					
					if( attr !== undefined ) {	//	 if attr/function
						
							//	add function to seq
						this.hub[name]['seq'][last_i][what] = attr;
					}

				}
			}

		},
		
		
		///////////////////////////////////////////////////////////////
		run: function( name, data ) {		//	execute the seq
			
			var len = this.hub[name]['seq'].length;

			if( this.hub[name] !== undefined  &&  is_number( len ) ) this.exe( name, 0 );
			
		},
		
		exe: function( name, i, data ) {
					
			var current_obj =  this.hub[name]['seq'][i];
			
			for( var j in current_obj ) {	// checking index
				
				if( j === 'get' || j === 'post' ) {

					log( current_obj[j] );
					ajax
				}
				else {
					
				}
				
			}

				
			/*var data;
			if( this.current == 'x' ) {
			}
			if( this.current == 'model' ) {
				
			}
			if( this.current == 'view' ) {
			}
			*/
		},
		
		ajax: function( call_back_i, obj, args ) {
				//json, call_type, data_type
				
				var that = this;
				
				
				if( obj !== undefined ) {
					
				}
				
				
				var json = json ? json : '';
				var data_type = data_type ? data_type : 'json';
				var call_type = call_type ? call_type : 'get';
				
				call_type = call_type.toUpperCase();
				
				$.ajax({
					type	: call_type,
					data	: json,
					dataType: data_type
				}).done( function( data ){
					
					if( call_back !== undefined )	{
						that.exe();
					}	
				})
		},
			

		clear: function() {
			
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
		
		
		
		
		
		///ajax : function ( json, call_back, call_type, data_type ) {
				/*var data_type = data_type ? data_type : 'json';
				
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
				});*/
		
		

		
		
	
};

////////////////////////////////////////////	$tatus
		/*$tatus : {
			
			current : '',
			key : '|%|',
			
			position : function() {
				if( this.current.length > 0 ) {
					var arr = this.current.split( this.key );
					return arr.length;
				}
				else return 0;
			},
			
			add : function( element, what ) {
				
				if( what === 'x' ) {		//	element is executable
					this.current = element;
				} 
				else if( what === 'm' ) {	//	element is model
					this.verify( element, 1 );
				}
				else if( what === 'v' ) {	//	element is view
					this.verify( element, 2 );
				}
				
				else this.current = element;
			},
			
			verify: function( element, pos ) {
				if( this.current.length > 0 ) {
					if( this.position === pos ) {
						this.current += this.key + element;
					}
				}
			},
			
			clear: function() {
				this.current = '';
			}
			
		},*/

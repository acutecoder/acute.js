/*
 * ACUTE ENGINE
 */

var ACUTE =  {

		that :  this,

		////////////////////////////////////////////	$tack
		$tack : {

			sequence : {},
			
			current : '',
			
			handle : function( name, what, f ) {
				
				this.current = what;
				
				if( what === 'x' ) {
					this.sequence[name] = {};
				}
				else {
					if( what === 'get' || what === 'post' ) {
						this.ajax();
					}
					else {
						if( f !== undefined ) {
							this.sequence[name][what] = f;
						}
						else {
							this.sequence[name][what] = "";
						}
					}
					
				}
				
				for( var i in this.sequence )	trace( i + '::' + this.sequence + '::' + f );
				
			},
			
			
			
			run: function( name ) {
				
				if( this.sequence[name] !== undefined ) {
					
					if( this.current !== undefined ) {
						
						var data;
						
						
						
						if( this.current == 'x' ) {
							
						}
						
						if( this.current == 'model' ) {
							
						}
						
						if( this.current == 'view' ) {
							
						}
					}
				}
				
			},
			
			get: function( name, what ) {
				
				if( what !== undefined ) {
					
					if( this.sequence[name] ) {
						
						if( what === 'x' ) 	return this.sequence[name]
						else 				return this.sequence[name][what];
						
					}
					else return undefined;
					
				}
				else return this.sequence[name];
				
			},
			ajax: function() {
				alert('hey!!!');
			},
			
		},
		
		
		
		
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
		
		
		data_$tore : {
			
			
			
		}

		
		
	
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

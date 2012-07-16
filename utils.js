/**
 * @author user
 */
function is_array(input){
    return typeof(input) == 'object' && ( input instanceof Array );
}

function is_string( input ){
	return typeof input == 'string';
}

function is_function( input ){
	return typeof input == 'function';
}

function is_number(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
  
function are_arguments( input ){
	if( typeof input == 'string' )	return false;
	else if( input.length > 0 && !typeof input == 'string' && !( input instanceof Array ) )	return true;
}


function arguments_to_a( input ){
	var output = [], i = -1, len = input.length;
	while( ++i < len )	output[i] = input[i];
	return output;
}

function get_from( get, from, unique )
{
	unique  = unique !== undefined ? unique : true;
	if( unique ) {
		return from[get] = from[get] ? from[get] : false;
	}	else	{
		var return_arr = [];
		
		for( var j in from ) {
			if( j == get ) {
				return_arr[return_arr.length] = from[j];
			}
		}
		if( return_arr.length == 0 ) return undefined;
		else if( return_arr.length == 1 ) return return_arr[1];
		else if( return_arr.length > 1 ) return return_arr;
	}
}


function echo( s ) {
	log( s );
}

function trace( s ) {
	log( s );
}

function log( s ){
	if( console )	console.log( s );
}


function auto_name ( type ) {
	var name;
	var count = 1;
	for( var i in $v.list[type] ) {
		name = type + count;
		if( $v.list[type][i] == name ) {	
			count++;
		}
	}
	return name;	
}



if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

if (typeof Object.make !== 'function') {
    Object.make = function (o) {
        return new o();
    };
}

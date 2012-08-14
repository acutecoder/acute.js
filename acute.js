var acute_global = 'a';

var ACUTE = (function() {

	// Private Variables

	var key = 0,
		b =  'hi',

		data = {},

	// Private Methods

	create = function( o ) {
		function F() {}
        F.prototype = o;
        return new F();
	};

	

	//	Public

	return {

		model : {

			//	Public Variables
			
			be: 'hmm',



			//	Public  Methods

			create: function( at ) {
				var ret = create( this );
				for( var i in at ) ret[i] = at[i];
				ret['$$$'] = key++;
				data[ret['$$$']] = {};
				ret.init();
				return ret;
			},

			init: function() {
				alert( this.$$$ );
			},

			get: function() {

			},

			set: function() {

			},

			each: function() {
				
			}



		},

		view : function() {

		},

		collection : function() {

		},

		router : function() {

		}
	};
})();

(function(){
	var __ACUTE__ = function() {};
	__ACUTE__.prototype = ACUTE;
    window[acute_global] = new __ACUTE__();
})();

var A = function( name ) {
	//a
};
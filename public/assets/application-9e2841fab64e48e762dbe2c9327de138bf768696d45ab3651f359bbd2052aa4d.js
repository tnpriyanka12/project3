/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts
Released under the MIT license
 */


(function() {
  var context = this;

  (function() {
    (function() {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form',
        formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };

    }).call(this);
  }).call(context);

  var Rails = context.Rails;

  (function() {
    (function() {
      var expando, m;

      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function(element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function(element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function(element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }
        return element[expando][key] = value;
      };

      Rails.$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };

    }).call(this);
    (function() {
      var $, csrfParam, csrfToken;

      $ = Rails.$;

      csrfToken = Rails.csrfToken = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function(xhr) {
        var token;
        token = csrfToken();
        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function() {
        var param, token;
        token = csrfToken();
        param = csrfParam();
        if ((token != null) && (param != null)) {
          return $('form input[name="' + param + '"]').forEach(function(input) {
            return input.value = token;
          });
        }
      };

    }).call(this);
    (function() {
      var CustomEvent, fire, matches;

      matches = Rails.matches;

      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
      }

      fire = Rails.fire = function(obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function(e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function(element, selector, eventType, handler) {
        return element.addEventListener(eventType, function(e) {
          var target;
          target = e.target;
          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };

    }).call(this);
    (function() {
      var AcceptHeaders, CSRFProtection, createXHR, fire, prepareOptions, processResponse;

      CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function(options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function() {
          var response;
          response = processResponse(xhr.response, xhr.getResponseHeader('Content-Type'));
          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }
          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });
        if (!(typeof options.beforeSend === "function" ? options.beforeSend(xhr, options) : void 0)) {
          return false;
        }
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        }
      };

      prepareOptions = function(options) {
        options.url = options.url || location.href;
        options.type = options.type.toUpperCase();
        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }
        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }
        options.accept = AcceptHeaders[options.dataType];
        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }
        return options;
      };

      createXHR = function(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);
        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        CSRFProtection(xhr);
        xhr.withCredentials = !!options.withCredentials;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };
        return xhr;
      };

      processResponse = function(response, type) {
        var parser, script;
        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (error) {}
          } else if (type.match(/\b(?:java|ecma)script\b/)) {
            script = document.createElement('script');
            script.text = response;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');
            try {
              response = parser.parseFromString(response, type);
            } catch (error) {}
          }
        }
        return response;
      };

      Rails.href = function(element) {
        return element.href;
      };

      Rails.isCrossDomain = function(url) {
        var e, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');
        try {
          urlAnchor.href = url;
          return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
        } catch (error) {
          e = error;
          return true;
        }
      };

    }).call(this);
    (function() {
      var matches, toArray;

      matches = Rails.matches;

      toArray = function(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function(element, additionalParam) {
        var inputs, params;
        inputs = [element];
        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }
        params = [];
        inputs.forEach(function(input) {
          if (!input.name || input.disabled) {
            return;
          }
          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function(option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });
        if (additionalParam) {
          params.push(additionalParam);
        }
        return params.map(function(param) {
          if (param.name != null) {
            return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function(form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function(el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };

    }).call(this);
    (function() {
      var allowAction, fire, stopEverything;

      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function(e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      allowAction = function(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');
        if (!message) {
          return true;
        }
        answer = false;
        if (fire(element, 'confirm')) {
          try {
            answer = confirm(message);
          } catch (error) {}
          callback = fire(element, 'confirm:complete', [answer]);
        }
        return answer && callback;
      };

    }).call(this);
    (function() {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, matches, setData, stopEverything;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

      Rails.handleDisabledElement = function(e) {
        var element;
        element = this;
        if (element.disabled) {
          return stopEverything(e);
        }
      };

      Rails.enableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }
        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }
        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }
        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }
          setData(element, 'ujs:enable-with', null);
        }
        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

    }).call(this);
    (function() {
      var stopEverything;

      stopEverything = Rails.stopEverything;

      Rails.handleMethod = function(e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');
        if (!method) {
          return;
        }
        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";
        if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };

    }).call(this);
    (function() {
      var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
        slice = [].slice;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

      isRemote = function(element) {
        var value;
        value = element.getAttribute('data-remote');
        return (value != null) && value !== 'false';
      };

      Rails.handleRemote = function(e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;
        if (!isRemote(element)) {
          return true;
        }
        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }
        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';
        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }
          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);
            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }
          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }
        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return false;
            }
          },
          success: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: (withCredentials != null) && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function(e) {
        var button, form;
        button = this;
        form = button.form;
        if (!form) {
          return;
        }
        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }
        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.handleMetaClick = function(e) {
        var data, link, metaClick, method;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        if (metaClick && method === 'GET' && !data) {
          return e.stopImmediatePropagation();
        }
      };

    }).call(this);
    (function() {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMetaClick, handleMethod, handleRemote, refreshCSRFTokens;

      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMetaClick = Rails.handleMetaClick, handleMethod = Rails.handleMethod;

      if ((typeof jQuery !== "undefined" && jQuery !== null) && (jQuery.ajax != null) && !jQuery.rails) {
        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function() {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }
        window.addEventListener('pageshow', function() {
          $(Rails.formEnableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', handleMetaClick);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
          return setTimeout((function() {
            return disableElement(e);
          }), 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = Rails;
  } else if (typeof define === "function" && define.amd) {
    define(Rails);
  }
}).call(this);
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.dat=t():e.dat=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var i=n(1),r=o(i);e.exports=r["default"]},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(2),r=o(i),a=n(6),l=o(a),s=n(3),u=o(s),d=n(7),c=o(d),f=n(8),_=o(f),p=n(10),h=o(p),m=n(11),b=o(m),g=n(12),v=o(g),y=n(13),w=o(y),x=n(14),E=o(x),C=n(15),A=o(C),S=n(16),k=o(S),O=n(9),T=o(O),R=n(17),L=o(R);t["default"]={color:{Color:r["default"],math:l["default"],interpret:u["default"]},controllers:{Controller:c["default"],BooleanController:_["default"],OptionController:h["default"],StringController:b["default"],NumberController:v["default"],NumberControllerBox:w["default"],NumberControllerSlider:E["default"],FunctionController:A["default"],ColorController:k["default"]},dom:{dom:T["default"]},gui:{GUI:L["default"]},GUI:L["default"]}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t,n){Object.defineProperty(e,t,{get:function(){return"RGB"===this.__state.space?this.__state[t]:(h.recalculateRGB(this,t,n),this.__state[t])},set:function(e){"RGB"!==this.__state.space&&(h.recalculateRGB(this,t,n),this.__state.space="RGB"),this.__state[t]=e}})}function a(e,t){Object.defineProperty(e,t,{get:function(){return"HSV"===this.__state.space?this.__state[t]:(h.recalculateHSV(this),this.__state[t])},set:function(e){"HSV"!==this.__state.space&&(h.recalculateHSV(this),this.__state.space="HSV"),this.__state[t]=e}})}t.__esModule=!0;var l=n(3),s=o(l),u=n(6),d=o(u),c=n(4),f=o(c),_=n(5),p=o(_),h=function(){function e(){if(i(this,e),this.__state=s["default"].apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return e.prototype.toString=function(){return(0,f["default"])(this)},e.prototype.toHexString=function(){return(0,f["default"])(this,!0)},e.prototype.toOriginal=function(){return this.__state.conversion.write(this)},e}();h.recalculateRGB=function(e,t,n){if("HEX"===e.__state.space)e.__state[t]=d["default"].component_from_hex(e.__state.hex,n);else{if("HSV"!==e.__state.space)throw new Error("Corrupted color state");p["default"].extend(e.__state,d["default"].hsv_to_rgb(e.__state.h,e.__state.s,e.__state.v))}},h.recalculateHSV=function(e){var t=d["default"].rgb_to_hsv(e.r,e.g,e.b);p["default"].extend(e.__state,{s:t.s,v:t.v}),p["default"].isNaN(t.h)?p["default"].isUndefined(e.__state.h)&&(e.__state.h=0):e.__state.h=t.h},h.COMPONENTS=["r","g","b","h","s","v","hex","a"],r(h.prototype,"r",2),r(h.prototype,"g",1),r(h.prototype,"b",0),a(h.prototype,"h"),a(h.prototype,"s"),a(h.prototype,"v"),Object.defineProperty(h.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}}),Object.defineProperty(h.prototype,"hex",{get:function(){return"HEX"!==!this.__state.space&&(this.__state.hex=d["default"].rgb_to_hex(this.r,this.g,this.b)),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}}),t["default"]=h},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(4),r=o(i),a=n(5),l=o(a),s=[{litmus:l["default"].isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return null!==t&&{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:r["default"]},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return null!==t&&{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:r["default"]},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);return null!==t&&{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:r["default"]},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);return null!==t&&{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:r["default"]}}},{litmus:l["default"].isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:l["default"].isArray,conversions:{RGB_ARRAY:{read:function(e){return 3===e.length&&{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return 4===e.length&&{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:l["default"].isObject,conversions:{RGBA_OBJ:{read:function(e){return!!(l["default"].isNumber(e.r)&&l["default"].isNumber(e.g)&&l["default"].isNumber(e.b)&&l["default"].isNumber(e.a))&&{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return!!(l["default"].isNumber(e.r)&&l["default"].isNumber(e.g)&&l["default"].isNumber(e.b))&&{space:"RGB",r:e.r,g:e.g,b:e.b}},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return!!(l["default"].isNumber(e.h)&&l["default"].isNumber(e.s)&&l["default"].isNumber(e.v)&&l["default"].isNumber(e.a))&&{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return!!(l["default"].isNumber(e.h)&&l["default"].isNumber(e.s)&&l["default"].isNumber(e.v))&&{space:"HSV",h:e.h,s:e.s,v:e.v}},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],u=void 0,d=void 0,c=function(){d=!1;var e=arguments.length>1?l["default"].toArray(arguments):arguments[0];return l["default"].each(s,function(t){if(t.litmus(e))return l["default"].each(t.conversions,function(t,n){if(u=t.read(e),d===!1&&u!==!1)return d=u,u.conversionName=n,u.conversion=t,l["default"].BREAK}),l["default"].BREAK}),d};t["default"]=c},function(e,t){"use strict";t.__esModule=!0,t["default"]=function(e,t){var n=e.__state.conversionName.toString(),o=Math.round(e.r),i=Math.round(e.g),r=Math.round(e.b),a=e.a,l=Math.round(e.h),s=e.s.toFixed(1),u=e.v.toFixed(1);if(t||"THREE_CHAR_HEX"===n||"SIX_CHAR_HEX"===n){for(var d=e.hex.toString(16);d.length<6;)d="0"+d;return"#"+d}return"CSS_RGB"===n?"rgb("+o+","+i+","+r+")":"CSS_RGBA"===n?"rgba("+o+","+i+","+r+","+a+")":"HEX"===n?"0x"+e.hex.toString(16):"RGB_ARRAY"===n?"["+o+","+i+","+r+"]":"RGBA_ARRAY"===n?"["+o+","+i+","+r+","+a+"]":"RGB_OBJ"===n?"{r:"+o+",g:"+i+",b:"+r+"}":"RGBA_OBJ"===n?"{r:"+o+",g:"+i+",b:"+r+",a:"+a+"}":"HSV_OBJ"===n?"{h:"+l+",s:"+s+",v:"+u+"}":"HSVA_OBJ"===n?"{h:"+l+",s:"+s+",v:"+u+",a:"+a+"}":"unknown format"}},function(e,t){"use strict";t.__esModule=!0;var n=Array.prototype.forEach,o=Array.prototype.slice,i={BREAK:{},extend:function(e){return this.each(o.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach(function(n){this.isUndefined(t[n])||(e[n]=t[n])}.bind(this))},this),e},defaults:function(e){return this.each(o.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach(function(n){this.isUndefined(e[n])&&(e[n]=t[n])}.bind(this))},this),e},compose:function(){var e=o.call(arguments);return function(){for(var t=o.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,o){if(e)if(n&&e.forEach&&e.forEach===n)e.forEach(t,o);else if(e.length===e.length+0){var i=void 0,r=void 0;for(i=0,r=e.length;i<r;i++)if(i in e&&t.call(o,e[i],i)===this.BREAK)return}else for(var a in e)if(t.call(o,e[a],a)===this.BREAK)return},defer:function(e){setTimeout(e,0)},debounce:function(e,t){var n=void 0;return function(){function o(){n=null}var i=this,r=arguments,a=!n;clearTimeout(n),n=setTimeout(o,t),a&&e.apply(i,r)}},toArray:function(e){return e.toArray?e.toArray():o.call(e)},isUndefined:function(e){return void 0===e},isNull:function(e){return null===e},isNaN:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e){return isNaN(e)}),isArray:Array.isArray||function(e){return e.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)}};t["default"]=i},function(e,t){"use strict";t.__esModule=!0;var n=void 0,o={hsv_to_rgb:function(e,t,n){var o=Math.floor(e/60)%6,i=e/60-Math.floor(e/60),r=n*(1-t),a=n*(1-i*t),l=n*(1-(1-i)*t),s=[[n,l,r],[a,n,r],[r,n,l],[r,a,n],[l,r,n],[n,r,a]][o];return{r:255*s[0],g:255*s[1],b:255*s[2]}},rgb_to_hsv:function(e,t,n){var o=Math.min(e,t,n),i=Math.max(e,t,n),r=i-o,a=void 0,l=void 0;return 0===i?{h:NaN,s:0,v:0}:(l=r/i,a=e===i?(t-n)/r:t===i?2+(n-e)/r:4+(e-t)/r,a/=6,a<0&&(a+=1),{h:360*a,s:l,v:i/255})},rgb_to_hex:function(e,t,n){var o=this.hex_with_component(0,2,e);return o=this.hex_with_component(o,1,t),o=this.hex_with_component(o,0,n)},component_from_hex:function(e,t){return e>>8*t&255},hex_with_component:function(e,t,o){return o<<(n=8*t)|e&~(255<<n)}};t["default"]=o},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var o=function(){function e(t,o){n(this,e),this.initialValue=t[o],this.domElement=document.createElement("div"),this.object=t,this.property=o,this.__onChange=void 0,this.__onFinishChange=void 0}return e.prototype.onChange=function(e){return this.__onChange=e,this},e.prototype.onFinishChange=function(e){return this.__onFinishChange=e,this},e.prototype.setValue=function(e){return this.object[this.property]=e,this.__onChange&&this.__onChange.call(this,e),this.updateDisplay(),this},e.prototype.getValue=function(){return this.object[this.property]},e.prototype.updateDisplay=function(){return this},e.prototype.isModified=function(){return this.initialValue!==this.getValue()},e}();t["default"]=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var l=n(7),s=o(l),u=n(9),d=o(u),c=function(e){function t(n,o){function a(){s.setValue(!s.__prev)}i(this,t);var l=r(this,e.call(this,n,o)),s=l;return l.__prev=l.getValue(),l.__checkbox=document.createElement("input"),l.__checkbox.setAttribute("type","checkbox"),d["default"].bind(l.__checkbox,"change",a,!1),l.domElement.appendChild(l.__checkbox),l.updateDisplay(),l}return a(t,e),t.prototype.setValue=function(t){var n=e.prototype.setValue.call(this,t);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),n},t.prototype.updateDisplay=function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0):this.__checkbox.checked=!1,e.prototype.updateDisplay.call(this)},t}(s["default"]);t["default"]=c},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e){if("0"===e||a["default"].isUndefined(e))return 0;var t=e.match(u);return a["default"].isNull(t)?0:parseFloat(t[1])}t.__esModule=!0;var r=n(5),a=o(r),l={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},s={};a["default"].each(l,function(e,t){a["default"].each(e,function(e){s[e]=t})});var u=/(\d+(\.\d+)?)px/,d={makeSelectable:function(e,t){void 0!==e&&void 0!==e.style&&(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var o=n,i=t;a["default"].isUndefined(i)&&(i=!0),a["default"].isUndefined(o)&&(o=!0),e.style.position="absolute",i&&(e.style.left=0,e.style.right=0),o&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,o){var i=n||{},r=s[t];if(!r)throw new Error("Event type "+t+" not supported.");var l=document.createEvent(r);switch(r){case"MouseEvents":var u=i.x||i.clientX||0,d=i.y||i.clientY||0;l.initMouseEvent(t,i.bubbles||!1,i.cancelable||!0,window,i.clickCount||1,0,0,u,d,!1,!1,!1,!1,0,null);break;case"KeyboardEvents":var c=l.initKeyboardEvent||l.initKeyEvent;a["default"].defaults(i,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),c(t,i.bubbles||!1,i.cancelable,window,i.ctrlKey,i.altKey,i.shiftKey,i.metaKey,i.keyCode,i.charCode);break;default:l.initEvent(t,i.bubbles||!1,i.cancelable||!0)}a["default"].defaults(l,o),e.dispatchEvent(l)},bind:function(e,t,n,o){var i=o||!1;return e.addEventListener?e.addEventListener(t,n,i):e.attachEvent&&e.attachEvent("on"+t,n),d},unbind:function(e,t,n,o){var i=o||!1;return e.removeEventListener?e.removeEventListener(t,n,i):e.detachEvent&&e.detachEvent("on"+t,n),d},addClass:function(e,t){if(void 0===e.className)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return d},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),o=n.indexOf(t);o!==-1&&(n.splice(o,1),e.className=n.join(" "))}else e.className=void 0;return d},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return i(t["border-left-width"])+i(t["border-right-width"])+i(t["padding-left"])+i(t["padding-right"])+i(t.width)},getHeight:function(e){var t=getComputedStyle(e);return i(t["border-top-width"])+i(t["border-bottom-width"])+i(t["padding-top"])+i(t["padding-bottom"])+i(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}};t["default"]=d},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var l=n(7),s=o(l),u=n(9),d=o(u),c=n(5),f=o(c),_=function(e){function t(n,o,a){i(this,t);var l=r(this,e.call(this,n,o)),s=a,u=l;return l.__select=document.createElement("select"),f["default"].isArray(s)&&!function(){var e={};f["default"].each(s,function(t){e[t]=t}),s=e}(),f["default"].each(s,function(e,t){var n=document.createElement("option");n.innerHTML=t,n.setAttribute("value",e),u.__select.appendChild(n)}),l.updateDisplay(),d["default"].bind(l.__select,"change",function(){var e=this.options[this.selectedIndex].value;u.setValue(e)}),l.domElement.appendChild(l.__select),l}return a(t,e),t.prototype.setValue=function(t){var n=e.prototype.setValue.call(this,t);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),n},t.prototype.updateDisplay=function(){return d["default"].isActive(this.__select)?this:(this.__select.value=this.getValue(),e.prototype.updateDisplay.call(this))},t}(s["default"]);t["default"]=_},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var l=n(7),s=o(l),u=n(9),d=o(u),c=function(e){function t(n,o){function a(){u.setValue(u.__input.value)}function l(){u.__onFinishChange&&u.__onFinishChange.call(u,u.getValue())}i(this,t);var s=r(this,e.call(this,n,o)),u=s;return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),d["default"].bind(s.__input,"keyup",a),d["default"].bind(s.__input,"change",a),d["default"].bind(s.__input,"blur",l),d["default"].bind(s.__input,"keydown",function(e){13===e.keyCode&&this.blur()}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return a(t,e),t.prototype.updateDisplay=function(){return d["default"].isActive(this.__input)||(this.__input.value=this.getValue()),e.prototype.updateDisplay.call(this)},t}(s["default"]);t["default"]=c},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e){var t=e.toString();return t.indexOf(".")>-1?t.length-t.indexOf(".")-1:0}t.__esModule=!0;var s=n(7),u=o(s),d=n(5),c=o(d),f=function(e){function t(n,o,a){i(this,t);var s=r(this,e.call(this,n,o)),u=a||{};return s.__min=u.min,s.__max=u.max,s.__step=u.step,c["default"].isUndefined(s.__step)?0===s.initialValue?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=l(s.__impliedStep),s}return a(t,e),t.prototype.setValue=function(t){var n=t;return void 0!==this.__min&&n<this.__min?n=this.__min:void 0!==this.__max&&n>this.__max&&(n=this.__max),void 0!==this.__step&&n%this.__step!==0&&(n=Math.round(n/this.__step)*this.__step),e.prototype.setValue.call(this,n)},t.prototype.min=function(e){return this.__min=e,this},t.prototype.max=function(e){return this.__max=e,this},t.prototype.step=function(e){return this.__step=e,this.__impliedStep=e,this.__precision=l(e),this},t}(u["default"]);t["default"]=f},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t){var n=Math.pow(10,t);return Math.round(e*n)/n}t.__esModule=!0;var s=n(12),u=o(s),d=n(9),c=o(d),f=n(5),_=o(f),p=function(e){function t(n,o,a){function l(){var e=parseFloat(m.__input.value);_["default"].isNaN(e)||m.setValue(e)}function s(){m.__onFinishChange&&m.__onFinishChange.call(m,m.getValue())}function u(){s()}function d(e){var t=b-e.clientY;m.setValue(m.getValue()+t*m.__impliedStep),b=e.clientY}function f(){c["default"].unbind(window,"mousemove",d),c["default"].unbind(window,"mouseup",f),s()}function p(e){c["default"].bind(window,"mousemove",d),c["default"].bind(window,"mouseup",f),b=e.clientY}i(this,t);var h=r(this,e.call(this,n,o,a));h.__truncationSuspended=!1;var m=h,b=void 0;return h.__input=document.createElement("input"),h.__input.setAttribute("type","text"),c["default"].bind(h.__input,"change",l),c["default"].bind(h.__input,"blur",u),c["default"].bind(h.__input,"mousedown",p),c["default"].bind(h.__input,"keydown",function(e){13===e.keyCode&&(m.__truncationSuspended=!0,this.blur(),m.__truncationSuspended=!1,s())}),h.updateDisplay(),h.domElement.appendChild(h.__input),h}return a(t,e),t.prototype.updateDisplay=function(){return this.__input.value=this.__truncationSuspended?this.getValue():l(this.getValue(),this.__precision),e.prototype.updateDisplay.call(this)},t}(u["default"]);t["default"]=p},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t,n,o,i){return o+(i-o)*((e-t)/(n-t))}t.__esModule=!0;var s=n(12),u=o(s),d=n(9),c=o(d),f=function(e){function t(n,o,a,s,u){function d(e){document.activeElement.blur(),c["default"].bind(window,"mousemove",f),c["default"].bind(window,"mouseup",_),f(e)}function f(e){e.preventDefault();var t=h.__background.getBoundingClientRect();return h.setValue(l(e.clientX,t.left,t.right,h.__min,h.__max)),!1}function _(){c["default"].unbind(window,"mousemove",f),c["default"].unbind(window,"mouseup",_),h.__onFinishChange&&h.__onFinishChange.call(h,h.getValue())}i(this,t);var p=r(this,e.call(this,n,o,{min:a,max:s,step:u})),h=p;return p.__background=document.createElement("div"),p.__foreground=document.createElement("div"),c["default"].bind(p.__background,"mousedown",d),c["default"].addClass(p.__background,"slider"),c["default"].addClass(p.__foreground,"slider-fg"),p.updateDisplay(),p.__background.appendChild(p.__foreground),p.domElement.appendChild(p.__background),p}return a(t,e),t.prototype.updateDisplay=function(){var t=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=100*t+"%",e.prototype.updateDisplay.call(this)},t}(u["default"]);t["default"]=f},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var l=n(7),s=o(l),u=n(9),d=o(u),c=function(e){function t(n,o,a){i(this,t);var l=r(this,e.call(this,n,o)),s=l;return l.__button=document.createElement("div"),l.__button.innerHTML=void 0===a?"Fire":a,d["default"].bind(l.__button,"click",function(e){return e.preventDefault(),s.fire(),!1}),d["default"].addClass(l.__button,"button"),l.domElement.appendChild(l.__button),l}return a(t,e),t.prototype.fire=function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())},t}(s["default"]);t["default"]=c},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t,n,o){e.style.background="",g["default"].each(y,function(i){e.style.cssText+="background: "+i+"linear-gradient("+t+", "+n+" 0%, "+o+" 100%); "})}function s(e){e.style.background="",e.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",e.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",e.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",e.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",e.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}t.__esModule=!0;var u=n(7),d=o(u),c=n(9),f=o(c),_=n(2),p=o(_),h=n(3),m=o(h),b=n(5),g=o(b),v=function(e){function t(n,o){function a(e){h(e),f["default"].bind(window,"mousemove",h),f["default"].bind(window,"mouseup",u)}function u(){f["default"].unbind(window,"mousemove",h),f["default"].unbind(window,"mouseup",u),_()}function d(){var e=(0,m["default"])(this.value);e!==!1?(y.__color.__state=e,y.setValue(y.__color.toOriginal())):this.value=y.__color.toString()}function c(){f["default"].unbind(window,"mousemove",b),f["default"].unbind(window,"mouseup",c),_()}function _(){y.__onFinishChange&&y.__onFinishChange.call(y,y.__color.toOriginal())}function h(e){e.preventDefault();var t=y.__saturation_field.getBoundingClientRect(),n=(e.clientX-t.left)/(t.right-t.left),o=1-(e.clientY-t.top)/(t.bottom-t.top);return o>1?o=1:o<0&&(o=0),n>1?n=1:n<0&&(n=0),y.__color.v=o,y.__color.s=n,y.setValue(y.__color.toOriginal()),!1}function b(e){e.preventDefault();var t=y.__hue_field.getBoundingClientRect(),n=1-(e.clientY-t.top)/(t.bottom-t.top);return n>1?n=1:n<0&&(n=0),y.__color.h=360*n,y.setValue(y.__color.toOriginal()),!1}i(this,t);var v=r(this,e.call(this,n,o));v.__color=new p["default"](v.getValue()),v.__temp=new p["default"](0);var y=v;v.domElement=document.createElement("div"),f["default"].makeSelectable(v.domElement,!1),v.__selector=document.createElement("div"),v.__selector.className="selector",v.__saturation_field=document.createElement("div"),v.__saturation_field.className="saturation-field",v.__field_knob=document.createElement("div"),v.__field_knob.className="field-knob",v.__field_knob_border="2px solid ",v.__hue_knob=document.createElement("div"),v.__hue_knob.className="hue-knob",v.__hue_field=document.createElement("div"),v.__hue_field.className="hue-field",v.__input=document.createElement("input"),v.__input.type="text",v.__input_textShadow="0 1px 1px ",f["default"].bind(v.__input,"keydown",function(e){13===e.keyCode&&d.call(this)}),f["default"].bind(v.__input,"blur",d),f["default"].bind(v.__selector,"mousedown",function(){f["default"].addClass(this,"drag").bind(window,"mouseup",function(){f["default"].removeClass(y.__selector,"drag")})});var w=document.createElement("div");return g["default"].extend(v.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),g["default"].extend(v.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:v.__field_knob_border+(v.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),g["default"].extend(v.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),g["default"].extend(v.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),g["default"].extend(w.style,{width:"100%",height:"100%",background:"none"}),l(w,"top","rgba(0,0,0,0)","#000"),g["default"].extend(v.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),s(v.__hue_field),g["default"].extend(v.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:v.__input_textShadow+"rgba(0,0,0,0.7)"}),f["default"].bind(v.__saturation_field,"mousedown",a),f["default"].bind(v.__field_knob,"mousedown",a),f["default"].bind(v.__hue_field,"mousedown",function(e){b(e),f["default"].bind(window,"mousemove",b),f["default"].bind(window,"mouseup",c)}),v.__saturation_field.appendChild(w),v.__selector.appendChild(v.__field_knob),v.__selector.appendChild(v.__saturation_field),v.__selector.appendChild(v.__hue_field),v.__hue_field.appendChild(v.__hue_knob),v.domElement.appendChild(v.__input),v.domElement.appendChild(v.__selector),v.updateDisplay(),v}return a(t,e),t.prototype.updateDisplay=function(){var e=(0,m["default"])(this.getValue());if(e!==!1){var t=!1;g["default"].each(p["default"].COMPONENTS,function(n){if(!g["default"].isUndefined(e[n])&&!g["default"].isUndefined(this.__color.__state[n])&&e[n]!==this.__color.__state[n])return t=!0,{}},this),t&&g["default"].extend(this.__color.__state,e)}g["default"].extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var n=this.__color.v<.5||this.__color.s>.5?255:0,o=255-n;g["default"].extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+n+","+n+","+n+")"}),this.__hue_knob.style.marginTop=100*(1-this.__color.h/360)+"px",this.__temp.s=1,this.__temp.v=1,l(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),g["default"].extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+n+","+n+","+n+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})},t}(d["default"]),y=["-moz-","-o-","-webkit-","-ms-",""];t["default"]=v},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){var o=document.createElement("li");return t&&o.appendChild(t),n?e.__ul.insertBefore(o,n):e.__ul.appendChild(o),e.onResize(),o}function r(e,t){var n=e.__preset_select[e.__preset_select.selectedIndex];t?n.innerHTML=n.value+"*":n.innerHTML=n.value}function a(e,t,n){if(n.__li=t,n.__gui=e,U["default"].extend(n,{options:function(t){if(arguments.length>1){var o=n.__li.nextElementSibling;return n.remove(),s(e,n.object,n.property,{before:o,factoryArgs:[U["default"].toArray(arguments)]})}if(U["default"].isArray(t)||U["default"].isObject(t)){var i=n.__li.nextElementSibling;return n.remove(),s(e,n.object,n.property,{before:i,factoryArgs:[t]})}},name:function(e){return n.__li.firstElementChild.firstElementChild.innerHTML=e,n},listen:function(){return n.__gui.listen(n),n},remove:function(){
return n.__gui.remove(n),n}}),n instanceof B["default"])!function(){var e=new N["default"](n.object,n.property,{min:n.__min,max:n.__max,step:n.__step});U["default"].each(["updateDisplay","onChange","onFinishChange","step"],function(t){var o=n[t],i=e[t];n[t]=e[t]=function(){var t=Array.prototype.slice.call(arguments);return i.apply(e,t),o.apply(n,t)}}),z["default"].addClass(t,"has-slider"),n.domElement.insertBefore(e.domElement,n.domElement.firstElementChild)}();else if(n instanceof N["default"]){var o=function(t){if(U["default"].isNumber(n.__min)&&U["default"].isNumber(n.__max)){var o=n.__li.firstElementChild.firstElementChild.innerHTML,i=n.__gui.__listening.indexOf(n)>-1;n.remove();var r=s(e,n.object,n.property,{before:n.__li.nextElementSibling,factoryArgs:[n.__min,n.__max,n.__step]});return r.name(o),i&&r.listen(),r}return t};n.min=U["default"].compose(o,n.min),n.max=U["default"].compose(o,n.max)}else n instanceof O["default"]?(z["default"].bind(t,"click",function(){z["default"].fakeEvent(n.__checkbox,"click")}),z["default"].bind(n.__checkbox,"click",function(e){e.stopPropagation()})):n instanceof R["default"]?(z["default"].bind(t,"click",function(){z["default"].fakeEvent(n.__button,"click")}),z["default"].bind(t,"mouseover",function(){z["default"].addClass(n.__button,"hover")}),z["default"].bind(t,"mouseout",function(){z["default"].removeClass(n.__button,"hover")})):n instanceof j["default"]&&(z["default"].addClass(t,"color"),n.updateDisplay=U["default"].compose(function(e){return t.style.borderLeftColor=n.__color.toString(),e},n.updateDisplay),n.updateDisplay());n.setValue=U["default"].compose(function(t){return e.getRoot().__preset_select&&n.isModified()&&r(e.getRoot(),!0),t},n.setValue)}function l(e,t){var n=e.getRoot(),o=n.__rememberedObjects.indexOf(t.object);if(o!==-1){var i=n.__rememberedObjectIndecesToControllers[o];if(void 0===i&&(i={},n.__rememberedObjectIndecesToControllers[o]=i),i[t.property]=t,n.load&&n.load.remembered){var r=n.load.remembered,a=void 0;if(r[e.preset])a=r[e.preset];else{if(!r[Q])return;a=r[Q]}if(a[o]&&void 0!==a[o][t.property]){var l=a[o][t.property];t.initialValue=l,t.setValue(l)}}}}function s(e,t,n,o){if(void 0===t[n])throw new Error('Object "'+t+'" has no property "'+n+'"');var r=void 0;if(o.color)r=new j["default"](t,n);else{var s=[t,n].concat(o.factoryArgs);r=C["default"].apply(e,s)}o.before instanceof S["default"]&&(o.before=o.before.__li),l(e,r),z["default"].addClass(r.domElement,"c");var u=document.createElement("span");z["default"].addClass(u,"property-name"),u.innerHTML=r.property;var d=document.createElement("div");d.appendChild(u),d.appendChild(r.domElement);var c=i(e,d,o.before);return z["default"].addClass(c,oe.CLASS_CONTROLLER_ROW),r instanceof j["default"]?z["default"].addClass(c,"color"):z["default"].addClass(c,g(r.getValue())),a(e,c,r),e.__controllers.push(r),r}function u(e,t){return document.location.href+"."+t}function d(e,t,n){var o=document.createElement("option");o.innerHTML=t,o.value=t,e.__preset_select.appendChild(o),n&&(e.__preset_select.selectedIndex=e.__preset_select.length-1)}function c(e,t){t.style.display=e.useLocalStorage?"block":"none"}function f(e){var t=e.__save_row=document.createElement("li");z["default"].addClass(e.domElement,"has-save"),e.__ul.insertBefore(t,e.__ul.firstChild),z["default"].addClass(t,"save-row");var n=document.createElement("span");n.innerHTML="&nbsp;",z["default"].addClass(n,"button gears");var o=document.createElement("span");o.innerHTML="Save",z["default"].addClass(o,"button"),z["default"].addClass(o,"save");var i=document.createElement("span");i.innerHTML="New",z["default"].addClass(i,"button"),z["default"].addClass(i,"save-as");var r=document.createElement("span");r.innerHTML="Revert",z["default"].addClass(r,"button"),z["default"].addClass(r,"revert");var a=e.__preset_select=document.createElement("select");e.load&&e.load.remembered?U["default"].each(e.load.remembered,function(t,n){d(e,n,n===e.preset)}):d(e,Q,!1),z["default"].bind(a,"change",function(){for(var t=0;t<e.__preset_select.length;t++)e.__preset_select[t].innerHTML=e.__preset_select[t].value;e.preset=this.value}),t.appendChild(a),t.appendChild(n),t.appendChild(o),t.appendChild(i),t.appendChild(r),q&&!function(){var t=document.getElementById("dg-local-explain"),n=document.getElementById("dg-local-storage"),o=document.getElementById("dg-save-locally");o.style.display="block","true"===localStorage.getItem(u(e,"isLocal"))&&n.setAttribute("checked","checked"),c(e,t),z["default"].bind(n,"change",function(){e.useLocalStorage=!e.useLocalStorage,c(e,t)})}();var l=document.getElementById("dg-new-constructor");z["default"].bind(l,"keydown",function(e){!e.metaKey||67!==e.which&&67!==e.keyCode||Z.hide()}),z["default"].bind(n,"click",function(){l.innerHTML=JSON.stringify(e.getSaveObject(),void 0,2),Z.show(),l.focus(),l.select()}),z["default"].bind(o,"click",function(){e.save()}),z["default"].bind(i,"click",function(){var t=prompt("Enter a new preset name.");t&&e.saveAs(t)}),z["default"].bind(r,"click",function(){e.revert()})}function _(e){function t(t){return t.preventDefault(),e.width+=i-t.clientX,e.onResize(),i=t.clientX,!1}function n(){z["default"].removeClass(e.__closeButton,oe.CLASS_DRAG),z["default"].unbind(window,"mousemove",t),z["default"].unbind(window,"mouseup",n)}function o(o){return o.preventDefault(),i=o.clientX,z["default"].addClass(e.__closeButton,oe.CLASS_DRAG),z["default"].bind(window,"mousemove",t),z["default"].bind(window,"mouseup",n),!1}var i=void 0;e.__resize_handle=document.createElement("div"),U["default"].extend(e.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"}),z["default"].bind(e.__resize_handle,"mousedown",o),z["default"].bind(e.__closeButton,"mousedown",o),e.domElement.insertBefore(e.__resize_handle,e.domElement.firstElementChild)}function p(e,t){e.domElement.style.width=t+"px",e.__save_row&&e.autoPlace&&(e.__save_row.style.width=t+"px"),e.__closeButton&&(e.__closeButton.style.width=t+"px")}function h(e,t){var n={};return U["default"].each(e.__rememberedObjects,function(o,i){var r={},a=e.__rememberedObjectIndecesToControllers[i];U["default"].each(a,function(e,n){r[n]=t?e.initialValue:e.getValue()}),n[i]=r}),n}function m(e){for(var t=0;t<e.__preset_select.length;t++)e.__preset_select[t].value===e.preset&&(e.__preset_select.selectedIndex=t)}function b(e){0!==e.length&&D["default"].call(window,function(){b(e)}),U["default"].each(e,function(e){e.updateDisplay()})}var g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},v=n(18),y=o(v),w=n(19),x=o(w),E=n(20),C=o(E),A=n(7),S=o(A),k=n(8),O=o(k),T=n(15),R=o(T),L=n(13),N=o(L),M=n(14),B=o(M),H=n(16),j=o(H),P=n(21),D=o(P),V=n(22),F=o(V),I=n(9),z=o(I),G=n(5),U=o(G),X=n(23),K=o(X);y["default"].inject(K["default"]);var Y="dg",J=72,W=20,Q="Default",q=function(){try{return"localStorage"in window&&null!==window.localStorage}catch(e){return!1}}(),Z=void 0,$=!0,ee=void 0,te=!1,ne=[],oe=function ie(e){function t(){var e=n.getRoot();e.width+=1,U["default"].defer(function(){e.width-=1})}var n=this,o=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),z["default"].addClass(this.domElement,Y),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],o=U["default"].defaults(o,{autoPlace:!0,width:ie.DEFAULT_WIDTH}),o=U["default"].defaults(o,{resizable:o.autoPlace,hideable:o.autoPlace}),U["default"].isUndefined(o.load)?o.load={preset:Q}:o.preset&&(o.load.preset=o.preset),U["default"].isUndefined(o.parent)&&o.hideable&&ne.push(this),o.resizable=U["default"].isUndefined(o.parent)&&o.resizable,o.autoPlace&&U["default"].isUndefined(o.scrollable)&&(o.scrollable=!0);var r=q&&"true"===localStorage.getItem(u(this,"isLocal")),a=void 0;if(Object.defineProperties(this,{parent:{get:function(){return o.parent}},scrollable:{get:function(){return o.scrollable}},autoPlace:{get:function(){return o.autoPlace}},preset:{get:function(){return n.parent?n.getRoot().preset:o.load.preset},set:function(e){n.parent?n.getRoot().preset=e:o.load.preset=e,m(this),n.revert()}},width:{get:function(){return o.width},set:function(e){o.width=e,p(n,e)}},name:{get:function(){return o.name},set:function(e){o.name=e,titleRowName&&(titleRowName.innerHTML=o.name)}},closed:{get:function(){return o.closed},set:function(e){o.closed=e,o.closed?z["default"].addClass(n.__ul,ie.CLASS_CLOSED):z["default"].removeClass(n.__ul,ie.CLASS_CLOSED),this.onResize(),n.__closeButton&&(n.__closeButton.innerHTML=e?ie.TEXT_OPEN:ie.TEXT_CLOSED)}},load:{get:function(){return o.load}},useLocalStorage:{get:function(){return r},set:function(e){q&&(r=e,e?z["default"].bind(window,"unload",a):z["default"].unbind(window,"unload",a),localStorage.setItem(u(n,"isLocal"),e))}}}),U["default"].isUndefined(o.parent)){if(o.closed=!1,z["default"].addClass(this.domElement,ie.CLASS_MAIN),z["default"].makeSelectable(this.domElement,!1),q&&r){n.useLocalStorage=!0;var l=localStorage.getItem(u(this,"gui"));l&&(o.load=JSON.parse(l))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=ie.TEXT_CLOSED,z["default"].addClass(this.__closeButton,ie.CLASS_CLOSE_BUTTON),this.domElement.appendChild(this.__closeButton),z["default"].bind(this.__closeButton,"click",function(){n.closed=!n.closed})}else{void 0===o.closed&&(o.closed=!0);var s=document.createTextNode(o.name);z["default"].addClass(s,"controller-name");var d=i(n,s),c=function(e){return e.preventDefault(),n.closed=!n.closed,!1};z["default"].addClass(this.__ul,ie.CLASS_CLOSED),z["default"].addClass(d,"title"),z["default"].bind(d,"click",c),o.closed||(this.closed=!1)}o.autoPlace&&(U["default"].isUndefined(o.parent)&&($&&(ee=document.createElement("div"),z["default"].addClass(ee,Y),z["default"].addClass(ee,ie.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(ee),$=!1),ee.appendChild(this.domElement),z["default"].addClass(this.domElement,ie.CLASS_AUTO_PLACE)),this.parent||p(n,o.width)),this.__resizeHandler=function(){n.onResizeDebounced()},z["default"].bind(window,"resize",this.__resizeHandler),z["default"].bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),z["default"].bind(this.__ul,"transitionend",this.__resizeHandler),z["default"].bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),o.resizable&&_(this),a=function(){q&&"true"===localStorage.getItem(u(n,"isLocal"))&&localStorage.setItem(u(n,"gui"),JSON.stringify(n.getSaveObject()))},this.saveToLocalStorageIfPossible=a,o.parent||t()};oe.toggleHide=function(){te=!te,U["default"].each(ne,function(e){e.domElement.style.display=te?"none":""})},oe.CLASS_AUTO_PLACE="a",oe.CLASS_AUTO_PLACE_CONTAINER="ac",oe.CLASS_MAIN="main",oe.CLASS_CONTROLLER_ROW="cr",oe.CLASS_TOO_TALL="taller-than-window",oe.CLASS_CLOSED="closed",oe.CLASS_CLOSE_BUTTON="close-button",oe.CLASS_DRAG="drag",oe.DEFAULT_WIDTH=245,oe.TEXT_CLOSED="Close Controls",oe.TEXT_OPEN="Open Controls",oe._keydownHandler=function(e){"text"===document.activeElement.type||e.which!==J&&e.keyCode!==J||oe.toggleHide()},z["default"].bind(window,"keydown",oe._keydownHandler,!1),U["default"].extend(oe.prototype,{add:function(e,t){return s(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return s(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;U["default"].defer(function(){t.onResize()})},destroy:function(){this.autoPlace&&ee.removeChild(this.domElement),z["default"].unbind(window,"keydown",oe._keydownHandler,!1),z["default"].unbind(window,"resize",this.__resizeHandler),this.saveToLocalStorageIfPossible&&z["default"].unbind(window,"unload",this.saveToLocalStorageIfPossible)},addFolder:function(e){if(void 0!==this.__folders[e])throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new oe(t);this.__folders[e]=n;var o=i(this,n.domElement);return z["default"].addClass(o,"folder"),n},open:function(){this.closed=!1},close:function(){this.closed=!0},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=z["default"].getOffset(e.__ul).top,n=0;U["default"].each(e.__ul.childNodes,function(t){e.autoPlace&&t===e.__save_row||(n+=z["default"].getHeight(t))}),window.innerHeight-t-W<n?(z["default"].addClass(e.domElement,oe.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-W+"px"):(z["default"].removeClass(e.domElement,oe.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&U["default"].defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:U["default"].debounce(function(){this.onResize()},200),remember:function(){if(U["default"].isUndefined(Z)&&(Z=new F["default"],Z.domElement.innerHTML=x["default"]),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;U["default"].each(Array.prototype.slice.call(arguments),function(t){0===e.__rememberedObjects.length&&f(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&p(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=h(this)),e.folders={},U["default"].each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=h(this),r(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[Q]=h(this,!0)),this.load.remembered[e]=h(this),this.preset=e,d(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){U["default"].each(this.__controllers,function(t){this.getRoot().load.remembered?l(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),U["default"].each(this.__folders,function(e){e.revert(e)}),e||r(this.getRoot(),!1)},listen:function(e){var t=0===this.__listening.length;this.__listening.push(e),t&&b(this.__listening)},updateDisplay:function(){U["default"].each(this.__controllers,function(e){e.updateDisplay()}),U["default"].each(this.__folders,function(e){e.updateDisplay()})}}),e.exports=oe},function(e,t){"use strict";e.exports={load:function(e,t){var n=t||document,o=n.createElement("link");o.type="text/css",o.rel="stylesheet",o.href=e,n.getElementsByTagName("head")[0].appendChild(o)},inject:function(e,t){var n=t||document,o=document.createElement("style");o.type="text/css",o.innerHTML=e;var i=n.getElementsByTagName("head")[0];try{i.appendChild(o)}catch(r){}}}},function(e,t){e.exports="<div id=dg-save class=\"dg dialogue\"> Here's the new load parameter for your <code>GUI</code>'s constructor: <textarea id=dg-new-constructor></textarea> <div id=dg-save-locally> <input id=dg-local-storage type=checkbox /> Automatically save values to <code>localStorage</code> on exit. <div id=dg-local-explain>The values saved to <code>localStorage</code> will override those passed to <code>dat.GUI</code>'s constructor. This makes it easier to work incrementally, but <code>localStorage</code> is fragile, and your friends may not see the same values you do. </div> </div> </div>"},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(10),r=o(i),a=n(13),l=o(a),s=n(14),u=o(s),d=n(11),c=o(d),f=n(15),_=o(f),p=n(8),h=o(p),m=n(5),b=o(m),g=function(e,t){var n=e[t];return b["default"].isArray(arguments[2])||b["default"].isObject(arguments[2])?new r["default"](e,t,arguments[2]):b["default"].isNumber(n)?b["default"].isNumber(arguments[2])&&b["default"].isNumber(arguments[3])?b["default"].isNumber(arguments[4])?new u["default"](e,t,arguments[2],arguments[3],arguments[4]):new u["default"](e,t,arguments[2],arguments[3]):b["default"].isNumber(arguments[4])?new l["default"](e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new l["default"](e,t,{min:arguments[2],max:arguments[3]}):b["default"].isString(n)?new c["default"](e,t):b["default"].isFunction(n)?new _["default"](e,t,""):b["default"].isBoolean(n)?new h["default"](e,t):null};t["default"]=g},function(e,t){"use strict";function n(e){setTimeout(e,1e3/60)}t.__esModule=!0,t["default"]=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||n},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var r=n(9),a=o(r),l=n(5),s=o(l),u=function(){function e(){i(this,e),this.backgroundElement=document.createElement("div"),s["default"].extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),a["default"].makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),s["default"].extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var t=this;a["default"].bind(this.backgroundElement,"click",function(){t.hide()})}return e.prototype.show=function(){var e=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),s["default"].defer(function(){e.backgroundElement.style.opacity=1,e.domElement.style.opacity=1,e.domElement.style.webkitTransform="scale(1)"})},e.prototype.hide=function t(){var e=this,t=function n(){e.domElement.style.display="none",e.backgroundElement.style.display="none",a["default"].unbind(e.domElement,"webkitTransitionEnd",n),a["default"].unbind(e.domElement,"transitionend",n),a["default"].unbind(e.domElement,"oTransitionEnd",n)};a["default"].bind(this.domElement,"webkitTransitionEnd",t),a["default"].bind(this.domElement,"transitionend",t),a["default"].bind(this.domElement,"oTransitionEnd",t),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"},e.prototype.layout=function(){this.domElement.style.left=window.innerWidth/2-a["default"].getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-a["default"].getHeight(this.domElement)/2+"px"},e}();t["default"]=u},function(e,t,n){t=e.exports=n(24)(),t.push([e.id,".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1!important}.dg.main .close-button.drag,.dg.main:hover .close-button{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;transition:opacity .1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save>ul{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height .1s ease-out;transition:height .1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid transparent}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.boolean,.dg .cr.boolean *,.dg .cr.function,.dg .cr.function *,.dg .cr.function .property-name{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco,monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px Lucida Grande,sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid hsla(0,0%,100%,.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.boolean:hover,.dg .cr.function:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(o[r]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}}])});

  const overlayConfig = {
    glasses: {
      xscaleFactor: 1,
      yscaleFactor: 1,
      xOffset: 0,
      yOffset: 0
    },
    cat_face: {
      xscaleFactor: 1.5,
      yscaleFactor: 1.9,
      xOffset: -40,
      yOffset: -90
    },
    mustache: {
      xscaleFactor: 1,
      yscaleFactor: 1,
      xOffset: 0,
      yOffset: 50
    },
    mustache2: {
      xscaleFactor: 1.5,
      yscaleFactor: 2,
      xOffset: -50,
      yOffset: -90
    },
    reddog: {
      xscaleFactor: 1.5,
      yscaleFactor: 2,
      xOffset: -50,
      yOffset: -90
    },
    mona: {
      xscaleFactor: 2,
      yscaleFactor: 2,
      xOffset: 0,
      yOffset: -100
    },
    unicorn: {
      xscaleFactor: 1.5,
      yscaleFactor: 1.5,
      xOffset: 100,
      yOffset: -240
    }
  };
  const CANVAS_REFRESH_RATE = 16;


  $(document).ready(function() {
    // Elements for taking the snapshot i.e, copying the image into canvas
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var testcanvas = document.getElementById('testcanvas');
    var testctx = testcanvas.getContext('2d');
    var video = document.getElementById('video');


    $('#testcanvas').hide();
    $('.stickerbtn').hide();
    $('#addText').hide();
    $('#addFreeDraw').hide();



  if( $('body.snaps.new').length ){

    //Camera draining my battery.. set a timer for it!
    function setTimeOutForCamera(){
      timerCamera = setInterval(function () {
        video.pause();
        curr_stream.getVideoTracks()[0].stop();
        clearInterval(timerDrawOnCanvas);
      }, 50000);
    }


    var faceOverlay     = false;
    var filterEffects   = true;
    var textEffects     = false;
    var freeDrawEffects = false;
    var endGIF          = false;


      overlayEffects = new Image();

      $('.addOverlay').on('click', function() {
        overlayEffects.src = $(this).attr('src');
        const overlayName = $(this).data('name');
        overlayEffects.config = overlayConfig[ overlayName ];
        faceOverlay = true;
        console.log('this is ', this,overlayEffects.src )
      });





      // ======== sticker tab - unicar ========
      $('.sticker').on('click', function() {
        $('#testcanvas').show();
        $('#canvas').hide();
        var canvas_fabric =  new fabric.Canvas('testcanvas', {
          width: 640,
          height: 480,
        });
        data_url = document.getElementById('canvas').toDataURL();
        canvas_fabric.setBackgroundImage(data_url, canvas_fabric.renderAll.bind(canvas_fabric));


        fabric.Image.fromURL($(this).attr('src'), function(oImg) {
          // scale image down, and flip it, before adding it onto canvas
          oImg.scale(0.2);
          canvas_fabric.add(oImg);
          document.getElementById('download').addEventListener('click', function() {
              this.href = canvas_fabric.toDataURL();
              this.download = 'test.png';
          }, false);


          // Saving an image to database
          document.getElementById('save').addEventListener('click', function() {
          var imageData = canvas_fabric.toDataURL('image/png');
            // console.log(imageData);
            $.ajax({
              url: '/snaps',
              method: 'post',
              dataType: 'json',
              data: {
                snap: imageData
              }
            })
            .done(function (data) {
              console.log('Successfull AJAX Request', data);
              // Once successful request is done, redirect user to the Profile page
            })
            .fail(function () {
              console.log('Failed AJAX Request!');
            });
            window.location.href = "http://localhost:3000/snaps/";

          });


        });

      });//sticker.onclick

      $('#addText').on('click', function(){
        $('#testcanvas').show();
        $('#canvas').hide();
        var canvas_fabric =  new fabric.Canvas('testcanvas', {
          width: 640,
          height: 480,
        });
        data_url = document.getElementById('canvas').toDataURL();
        canvas_fabric.setBackgroundImage(data_url, canvas_fabric.renderAll.bind(canvas_fabric));

        function update(jscolor) {
            // 'jscolor' instance can be used as a string
            document.getElementByClass('upper-canvas').style.backgroundColor = '#' + jscolor
        }

        var fontColor = $('#font-color').val() || 'red'
        var fontSize = parseInt( $('#font-size').val() ) || 20;

         var text = new fabric.IText('Enter your text here', {
           width: 300,
           top: 240,
           left: 80,
           fontSize: fontSize,
           textAlign: 'center',
           fixedWidth: 150,
           fill: fontColor,
           fontFamily: 'Avenir'
         });

         canvas_fabric.add(text);
         document.getElementById('download').addEventListener('click', function() {
             this.href = canvas_fabric.toDataURL();
             this.download = 'test.png';
         }, false);

         // Saving an image to database
         document.getElementById('save').addEventListener('click', function() {
         var imageData = canvas_fabric.toDataURL('image/png');
           // console.log(imageData);
           $.ajax({
             url: '/snaps',
             method: 'post',
             dataType: 'json',
             data: {
               snap: imageData
             }
           })
           .done(function (data) {
             console.log('Successfull AJAX Request', data);
             // Once successful request is done, redirect user to the Profile page
           })
           .fail(function () {
             console.log('Failed AJAX Request!');
           });
           window.location.href = "http://localhost:3000/snaps/";

         });


       });


       // activate the brush (drawing mode is true)
           $('#addFreeDraw').on('click', function() {
             $('#testcanvas').show();
             $('#canvas').hide();

             var canvas_fabric =  new fabric.Canvas('testcanvas', {
               width: 640,
               height: 480,
             });
             data_url = document.getElementById('canvas').toDataURL();
             canvas_fabric.setBackgroundImage(data_url, canvas_fabric.renderAll.bind(canvas_fabric));

             canvas_fabric.isDrawingMode = true;
             // Use Pencil Brush for drawing
             canvas_fabric.freeDrawingBrush = new fabric['PencilBrush'](canvas_fabric);
             canvas_fabric.freeDrawingBrush.width = 10;
             canvas_fabric.freeDrawingBrush.color = '#005E7A';



             document.getElementById('download').addEventListener('click', function() {
                 this.href = canvas_fabric.toDataURL();
                 // debugger;
                 this.download = 'test.png';
             }, false);

             // Saving an image to database
             document.getElementById('save').addEventListener('click', function() {
             var imageData = canvas_fabric.toDataURL('image/png');
               // console.log(imageData);
               $.ajax({
                 url: '/snaps',
                 method: 'post',
                 dataType: 'json',
                 data: {
                   snap: imageData
                 }
               })
               .done(function (data) {
                 console.log('Successfull AJAX Request', data);
                 // Once successful request is done, redirect user to the Profile page
               })
               .fail(function () {
                 console.log('Failed AJAX Request!');
               });
               window.location.href = "http://localhost:3000/snaps/";

             });


   });

        //temporary - to be removed
        //Camera draining my battery.. set a timer for it!
        setTimeOutForCamera();
        // Grab Camera/Video element, create settings, etc.
        getCamElements();
        // Draw Camera/Video element on Canvas
        drawWebCamOnCanvas();
        //Free Draw On canvas
        freeDrawOnCanvas();
        //CreateGIFs
        createGIFs();


               $('#filter-val-sepia').on('click', function() {
                 // set font color and size
                  var filter_val = parseInt( $('#filter-val-sepia').val() );
                  ctx.filter = "sepia("+ filter_val +"%)";

               });
               $('#filter-val-bw').on('click', function() {
                 // set font color and size
                  var filter_val_bw = $('#filter-val-bw').val();
                  ctx.filter = "grayscale("+ filter_val_bw +"%)";

               });
               $('#filter-val-mix').on('click', function() {
                 // set font color and size
                  var filter_val_mix = $('#filter-val-mix').val();
                  ctx.filter = "saturate("+ filter_val_mix +"%)";

               });
               // $('#addFreeDraw').on('click', function() {
               //  freeDrawEffects = !freeDrawEffects;
               // });



      function getCamElements(){
        // Grab Camera/Video element, create settings, etc.
        var video = document.getElementById('video');
        //Not showing the actual webcam window
        $('#video').hide();


        // Get access to the webcam!
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('nav ready!');
            // { video & audio => true } since we only want video+audio
            //Stream object is the stream from users webcam -> so attach this as src of video tag
            //createObjectURL is used to create a new obj which is same type as stream
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                curr_stream = stream;
                video.src = window.URL.createObjectURL(stream);
                // video.play();
             },
             function(err) {
              console.log("Unable to get video stream!")
             });
        }

      }//getCamElements



      function freeDrawOnCanvas(){
        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
          canvas.addEventListener('mousemove', function(e) {
              last_mouse.x = mouse.x;
              last_mouse.y = mouse.y;

              mouse.x = e.pageX - this.offsetLeft;
              mouse.y = e.pageY - this.offsetTop;
          }, false);

          /* Drawing on Paint App */
          ctx.lineWidth = 4;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          ctx.strokeStyle = 'black';

          canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
          }, false);

          canvas.addEventListener('mouseup', function() {
              canvas.removeEventListener('mousemove', onPaint, false);
          }, false);

          var onPaint = function() {
              ctx.beginPath();
              ctx.moveTo(last_mouse.x, last_mouse.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.closePath();
              ctx.stroke();
          };
      }

      let timerToGetGifFrames;

      function createGIFs() {

        var encoder = new GIFEncoder();

        $('#endGif').on('click', function() {

         clearInterval(timerToGetGifFrames);
         encoder.finish();
         var binary_gif = encoder.stream().getData() //notice this is different from the as3gif package!
         var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
         encoder.finish();
         encoder.download("download.gif");

         $('<img>', {src: data_url}).appendTo('#gifPreview');


         // Saving an image to database
         document.getElementById('save').addEventListener('click', function() {
         var imageData = canvas.toDataURL('image/png');
           // console.log(imageData);
           $.ajax({
             url: '/snaps',
             method: 'post',
             dataType: 'json',
             data: {
               snap: imageData
             }
           })
           .done(function (data) {
             console.log('Successfull AJAX Request', data);
             // Once successful request is done, redirect user to the Profile page
           })
           .fail(function () {
             console.log('Failed AJAX Request!');
           });
           window.location.href = "http://localhost:3000/snaps/";

         });

         // $('').on('click', function () {
         //   window.location.href = "http://localhost:3000/snaps/";
         // });

        });


        $('#addGif').on('click', function() {
          // console.log('addGifs');
          encoder.setRepeat(0); //0  -> loop forever
          encoder.setDelay(100); //go to next frame every n millisecond
          encoder.start();
          timerToGetGifFrames = setInterval( function () {
            encoder.addFrame(ctx);
          }, 100);

        })//$(addGifs)
      }//createGIFs

      function drawWebCamOnCanvas(){

       // timerDrawOnCanvas = setInterval( function () {
       const animate = function () {
           //Draw the webcam on canvas every 200ms -> now we have a live canvas on which we can draw
           ctx.drawImage(video, 0, 0, 640, 480);
           //Add the filters - all functionality for filters here

           // if(textEffects){
           // ctx.font = "10px Comic Sans MS";
           // ctx.fillText($("#addText").val(),100,100);
           // }

           if(faceOverlay){
             addOverlays();
           }


           // console.log('after trigger photo take!');
           timerDrawOnCanvas = requestAnimationFrame(animate);
         };
         // , CANVAS_REFRESH_RATE);
         // });

         animate();

      }//drawWebCamOnCanvas()




      function addOverlays() {


          var comp = ccv.detect_objects({
            "canvas" : (ccv.pre(canvas)),
            "cascade" : cascade,
            "interval" : 5,
            "min_neighbors" : 1
          });


            // Draw filters on everyone!
            for (var i = 0; i < comp.length; i++) {
              // Make custom changes to each specific overlay, if required
              const width = comp[i].width * overlayEffects.config.xscaleFactor;
              const height = comp[i].height * overlayEffects.config.yscaleFactor;
              const x = comp[i].x + overlayEffects.config.xOffset;
              const y = comp[i].y + overlayEffects.config.yOffset;

              ctx.drawImage(overlayEffects, x, y, width, height);
            // }
            }
          // });

    }




    document.getElementById('takesnapshot').addEventListener('click', function() {
      // clearInterval(timerDrawOnCanvas);
      cancelAnimationFrame(timerDrawOnCanvas);
      data_url = document.getElementById('canvas').toDataURL();
      $('.stickerbtn').show();
      $('#addText').show();
      $('#addFreeDraw').show();
      $('.overlaybutton').hide();
      $('#addFilter').hide();

      $('#testcanvas', {src: data_url}).appendTo('#gifPreview');

    });

  // Downloading an image to a computer
  // ID of the canvas and a sample filename.

    document.getElementById('download').addEventListener('click', function() {
        // e.preventDefault();
        this.href = document.getElementById('canvas').toDataURL();

        // debugger;
        // ($('#testcanvas').is(':visible'))
        // this.href = document.getElementById('testcanvas').toDataURL();

        this.download = 'test.png';
    }, false);


    // Saving an image to database
    document.getElementById('save').addEventListener('click', function() {
    var imageData = document.getElementById('canvas').toDataURL('image/png');
      // console.log(imageData);
      $.ajax({
        url: '/snaps',
        method: 'post',
        dataType: 'json',
        data: {
          snap: imageData
        }
      })
      .done(function (data) {
        console.log('Successfull AJAX Request', data);
        // Once successful request is done, redirect user to the Profile page
      })
      .fail(function () {
        console.log('Failed AJAX Request!');
      });
      window.location.href = "http://localhost:3000/snaps/";

    });







    document.onkeypress = function(e) {
        if (e.keyCode == 32) {

          setTimeout(function(){
          document.getElementById('download').href = document.getElementById('canvas').toDataURL();

          document.getElementById('download').click();
          alert('Your image is downloaded!')
          }, 3000);
        }
      };



  } // controller class match

});//doc ready
;
function encode64(input) {
	var output = "", i = 0, l = input.length,
	key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	while (i < l) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) enc3 = enc4 = 64;
		else if (isNaN(chr3)) enc4 = 64;
		output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
	}
	return output;
}


GIFEncoder = function() {

	for (var i = 0, chr = {}; i < 256; i++)
		chr[i] = String.fromCharCode(i);

	function ByteArray() {
		this.bin = [];
	}

	ByteArray.prototype.getData = function() {
		for (var v = '', l = this.bin.length, i = 0; i < l; i++)
			v += chr[this.bin[i]];
		return v;
	};

	ByteArray.prototype.writeByte = function(val) {
		this.bin.push(val);
	};

	ByteArray.prototype.writeUTFBytes = function(string) {
		for (var l = string.length, i = 0; i < l; i++)
			this.writeByte(string.charCodeAt(i));
	};

	ByteArray.prototype.writeBytes = function(array, offset, length) {
		for (var l = length || array.length, i = offset || 0; i < l; i++)
			this.writeByte(array[i]);
	};

	var exports = {};
	var width; // image size
	var height;
	var transparent = null; // transparent color if given
	var transIndex; // transparent index in color table
	var repeat = -1; // no repeat
	var delay = 0; // frame delay (hundredths)
	var started = false; // ready to output frames
	var out;
	var image; // current frame
	var pixels; // BGR byte array from frame
	var indexedPixels; // converted frame indexed to palette
	var colorDepth; // number of bit planes
	var colorTab; // RGB palette
	var usedEntry = []; // active palette entries
	var palSize = 7; // color table size (bits-1)
	var dispose = -1; // disposal code (-1 = use default)
	var closeStream = false; // close stream when finished
	var firstFrame = true;
	var sizeSet = false; // if false, get size from first frame
	var sample = 10; // default sample interval for quantizer
	var comment = "Generated by jsgif (https://github.com/antimatter15/jsgif/)"; // default comment for generated gif

	/**
	 * Sets the delay time between each frame, or changes it for subsequent frames
	 * (applies to last frame added)
	 * int delay time in milliseconds
	 * @param ms
	 */

	var setDelay = exports.setDelay = function setDelay(ms) {
		delay = Math.round(ms / 10);
	};

	/**
	 * Sets the GIF frame disposal code for the last added frame and any
	 *
	 * subsequent frames. Default is 0 if no transparent color has been set,
	 * otherwise 2.
	 * @param code
	 * int disposal code.
	 */

	var setDispose = exports.setDispose = function setDispose(code) {
		if (code >= 0) dispose = code;
	};

	/**
	 * Sets the number of times the set of GIF frames should be played. Default is
	 * 1; 0 means play indefinitely. Must be invoked before the first image is
	 * added.
	 *
	 * @param iter
	 * int number of iterations.
	 * @return
	 */

	var setRepeat = exports.setRepeat = function setRepeat(iter) {
		if (iter >= 0) repeat = iter;
	};

	/**
	 * Sets the transparent color for the last added frame and any subsequent
	 * frames. Since all colors are subject to modification in the quantization
	 * process, the color in the final palette for each frame closest to the given
	 * color becomes the transparent color for that frame. May be set to null to
	 * indicate no transparent color.
	 * @param
	 * Color to be treated as transparent on display.
	 */

	var setTransparent = exports.setTransparent = function setTransparent(c) {
		transparent = c;
	};


	/**
	 * Sets the comment for the block comment
	 * @param
	 * string to be insterted as comment
	 */

	var setComment = exports.setComment = function setComment(c) {
		comment = c;
	};



	/**
	 * The addFrame method takes an incoming BitmapData object to create each frames
	 * @param
	 * BitmapData object to be treated as a GIF's frame
	 */

	var addFrame = exports.addFrame = function addFrame(im, is_imageData) {

		if ((im === null) || !started || out === null) {
			throw new Error("Please call start method before calling addFrame");
		}

		var ok = true;

		try {
			if (!is_imageData) {
				image = im.getImageData(0, 0, im.canvas.width, im.canvas.height).data;
				if (!sizeSet) setSize(im.canvas.width, im.canvas.height);
			} else {
				if(im instanceof ImageData) {
					image = im.data;
					if(!sizeset || width!=im.width || height!=im.height) {
						setSize(im.width,im.height);
					} else {

					}
				} else if(im instanceof Uint8ClampedArray) {
					if(im.length==(width*height*4)) {
						image=im;
					} else {
						console.log("Please set the correct size: ImageData length mismatch");
						ok=false;
					}
				} else {
					console.log("Please provide correct input");
					ok=false;
				}
			}
			getImagePixels(); // convert to correct format if necessary
			analyzePixels(); // build color table & map pixels

			if (firstFrame) {
				writeLSD(); // logical screen descriptior
				writePalette(); // global color table
				if (repeat >= 0) {
					// use NS app extension to indicate reps
					writeNetscapeExt();
				}
			}

			writeGraphicCtrlExt(); // write graphic control extension
			if (comment !== '') {
				writeCommentExt(); // write comment extension
			}
			writeImageDesc(); // image descriptor
			if (!firstFrame) writePalette(); // local color table
			writePixels(); // encode and write pixel data
			firstFrame = false;
		} catch (e) {
			ok = false;
		}

		return ok;
	};

	/**
	* @description: Downloads the encoded gif with the given name
	* No need of any conversion from the stream data (out) to base64
	* Solves the issue of large file sizes when there are more frames
	* and does not involve in creation of any temporary data in the process
	* so no wastage of memory, and speeds up the process of downloading
	* to just calling this function.
	* @parameter {String} filename filename used for downloading the gif
	*/

	var download = exports.download = function download(filename) {
		if(out===null || closeStream==false) {
			console.log("Please call start method and add frames and call finish method before calling download");
		} else {
			filename= filename !== undefined ? ( filename.endsWith(".gif")? filename: filename+".gif" ): "download.gif";
			var templink = document.createElement("a");
			templink.download=filename;
			templink.href= URL.createObjectURL(new Blob([new Uint8Array(out.bin)], {type : "image/gif" } ));
			templink.click();
		}
	}

	/**
	 * Adds final trailer to the GIF stream, if you don't call the finish method
	 * the GIF stream will not be valid.
	 */

	var finish = exports.finish = function finish() {

		if (!started) return false;

		var ok = true;
		started = false;

		try {
			out.writeByte(0x3b); // gif trailer
			closeStream=true;
		} catch (e) {
			ok = false;
		}

		return ok;
	};

	/**
	 * Resets some members so that a new stream can be started.
	 * This method is actually called by the start method
	 */

	var reset = function reset() {

		// reset for subsequent use
		transIndex = 0;
		image = null;
		pixels = null;
		indexedPixels = null;
		colorTab = null;
		closeStream = false;
		firstFrame = true;
	};

	/**
	 * * Sets frame rate in frames per second. Equivalent to
	 * <code>setDelay(1000/fps)</code>.
	 * @param fps
	 * float frame rate (frames per second)
	 */

	var setFrameRate = exports.setFrameRate = function setFrameRate(fps) {
		if (fps != 0xf) delay = Math.round(100 / fps);
	};

	/**
	 * Sets quality of color quantization (conversion of images to the maximum 256
	 * colors allowed by the GIF specification). Lower values (minimum = 1)
	 * produce better colors, but slow processing significantly. 10 is the
	 * default, and produces good color mapping at reasonable speeds. Values
	 * greater than 20 do not yield significant improvements in speed.
	 * @param quality
	 * int greater than 0.
	 * @return
	 */

	var setQuality = exports.setQuality = function setQuality(quality) {
		if (quality < 1) quality = 1;
		sample = quality;
	};

	/**
	 * Sets the GIF frame size. The default size is the size of the first frame
	 * added if this method is not invoked.
	 * @param w
	 * int frame width.
	 * @param h
	 * int frame width.
	 */

	var setSize = exports.setSize = function setSize(w, h) {

		if (started && !firstFrame) return;
		width = w;
		height = h;
		if (width < 1) width = 320;
		if (height < 1) height = 240;
		sizeSet = true;
	};

	/**
	 * Initiates GIF file creation on the given stream.
	 * @param os
	 * OutputStream on which GIF images are written.
	 * @return false if initial write failed.
	 */

	var start = exports.start = function start() {

		reset();
		var ok = true;
		closeStream = false;
		out = new ByteArray();
		try {
			out.writeUTFBytes("GIF89a"); // header
		} catch (e) {
			ok = false;
		}

		return started = ok;
	};

	var cont = exports.cont = function cont() {

		reset();
		var ok = true;
		closeStream = false;
		out = new ByteArray();

		return started = ok;
	};

	/**
	 * Analyzes image colors and creates color map.
	 */

	var analyzePixels = function analyzePixels() {

		var len = pixels.length;
		var nPix = len / 3;
		indexedPixels = [];
		var nq = new NeuQuant(pixels, len, sample);

		// initialize quantizer
		colorTab = nq.process(); // create reduced palette

		// map image pixels to new palette
		var k = 0;
		for (var j = 0; j < nPix; j++) {
			var index = nq.map(pixels[k++] & 0xff, pixels[k++] & 0xff, pixels[k++] & 0xff);
			usedEntry[index] = true;
			indexedPixels[j] = index;
		}

		pixels = null;
		colorDepth = 8;
		palSize = 7;

		// get closest match to transparent color if specified
		if (transparent !== null) {
			transIndex = findClosest(transparent);
		}
	};

	/**
	 * Returns index of palette color closest to c
	 */

	var findClosest = function findClosest(c) {

		if (colorTab === null) return -1;
		var r = (c & 0xFF0000) >> 16;
		var g = (c & 0x00FF00) >> 8;
		var b = (c & 0x0000FF);
		var minpos = 0;
		var dmin = 256 * 256 * 256;
		var len = colorTab.length;

		for (var i = 0; i < len;) {
			var dr = r - (colorTab[i++] & 0xff);
			var dg = g - (colorTab[i++] & 0xff);
			var db = b - (colorTab[i] & 0xff);
			var d = dr * dr + dg * dg + db * db;
			var index = i / 3;
			if (usedEntry[index] && (d < dmin)) {
				dmin = d;
				minpos = index;
			}
			i++;
		}
		return minpos;
	};

	/**
	 * Extracts image pixels into byte array "pixels
	 */

	var getImagePixels = function getImagePixels() {
		var w = width;
		var h = height;
		pixels = [];
		var data = image;
		var count = 0;

		for (var i = 0; i < h; i++) {

			for (var j = 0; j < w; j++) {

				var b = (i * w * 4) + j * 4;
				pixels[count++] = data[b];
				pixels[count++] = data[b + 1];
				pixels[count++] = data[b + 2];

			}

		}
	};

	/**
	 * Writes Graphic Control Extension
	 */

	var writeGraphicCtrlExt = function writeGraphicCtrlExt() {
		out.writeByte(0x21); // extension introducer
		out.writeByte(0xf9); // GCE label
		out.writeByte(4); // data block size
		var transp;
		var disp;
		if (transparent === null) {
			transp = 0;
			disp = 0; // dispose = no action
		} else {
			transp = 1;
			disp = 2; // force clear if using transparent color
		}
		if (dispose >= 0) {
			disp = dispose & 7; // user override
		}
		disp <<= 2;
		// packed fields
		out.writeByte(0 | // 1:3 reserved
			disp | // 4:6 disposal
			0 | // 7 user input - 0 = none
			transp); // 8 transparency flag

		WriteShort(delay); // delay x 1/100 sec
		out.writeByte(transIndex); // transparent color index
		out.writeByte(0); // block terminator
	};

	/**
	 * Writes Comment Extention
	 */

	var writeCommentExt = function writeCommentExt() {
		out.writeByte(0x21); // extension introducer
		out.writeByte(0xfe); // comment label
		out.writeByte(comment.length); // Block Size (s)
		out.writeUTFBytes(comment);
		out.writeByte(0); // block terminator
	};


	/**
	 * Writes Image Descriptor
	 */

	var writeImageDesc = function writeImageDesc() {

		out.writeByte(0x2c); // image separator
		WriteShort(0); // image position x,y = 0,0
		WriteShort(0);
		WriteShort(width); // image size
		WriteShort(height);

		// packed fields
		if (firstFrame) {
			// no LCT - GCT is used for first (or only) frame
			out.writeByte(0);
		} else {
			// specify normal LCT
			out.writeByte(0x80 | // 1 local color table 1=yes
				0 | // 2 interlace - 0=no
				0 | // 3 sorted - 0=no
				0 | // 4-5 reserved
				palSize); // 6-8 size of color table
		}
	};

	/**
	 * Writes Logical Screen Descriptor
	 */

	var writeLSD = function writeLSD() {

		// logical screen size
		WriteShort(width);
		WriteShort(height);
		// packed fields
		out.writeByte((0x80 | // 1 : global color table flag = 1 (gct used)
			0x70 | // 2-4 : color resolution = 7
			0x00 | // 5 : gct sort flag = 0
			palSize)); // 6-8 : gct size

		out.writeByte(0); // background color index
		out.writeByte(0); // pixel aspect ratio - assume 1:1
	};

	/**
	 * Writes Netscape application extension to define repeat count.
	 */

	var writeNetscapeExt = function writeNetscapeExt() {
		out.writeByte(0x21); // extension introducer
		out.writeByte(0xff); // app extension label
		out.writeByte(11); // block size
		out.writeUTFBytes("NETSCAPE" + "2.0"); // app id + auth code
		out.writeByte(3); // sub-block size
		out.writeByte(1); // loop sub-block id
		WriteShort(repeat); // loop count (extra iterations, 0=repeat forever)
		out.writeByte(0); // block terminator
	};

	/**
	 * Writes color table
	 */

	var writePalette = function writePalette() {
		out.writeBytes(colorTab);
		var n = (3 * 256) - colorTab.length;
		for (var i = 0; i < n; i++) out.writeByte(0);
	};

	var WriteShort = function WriteShort(pValue) {
		out.writeByte(pValue & 0xFF);
		out.writeByte((pValue >> 8) & 0xFF);
	};

	/**
	 * Encodes and writes pixel data
	 */

	var writePixels = function writePixels() {
		var myencoder = new LZWEncoder(width, height, indexedPixels, colorDepth);
		myencoder.encode(out);
	};

	/**
	 * Retrieves the GIF stream
	 */

	var stream = exports.stream = function stream() {
		return out;
	};

	var setProperties = exports.setProperties = function setProperties(has_start, is_first) {
		started = has_start;
		firstFrame = is_first;
	};

	return exports;

};
/**
 * This class handles LZW encoding
 * Adapted from Jef Poskanzer's Java port by way of J. M. G. Elliott.
 * @author Kevin Weiner (original Java version - kweiner@fmsware.com)
 * @author Thibault Imbert (AS3 version - bytearray.org)
 * @author Kevin Kwok (JavaScript version - https://github.com/antimatter15/jsgif)
 * @version 0.1 AS3 implementation
 */


LZWEncoder = function() {

	var exports = {};
	var EOF = -1;
	var imgW;
	var imgH;
	var pixAry;
	var initCodeSize;
	var remaining;
	var curPixel;

	// GIFCOMPR.C - GIF Image compression routines
	// Lempel-Ziv compression based on 'compress'. GIF modifications by
	// David Rowley (mgardi@watdcsu.waterloo.edu)
	// General DEFINEs

	var BITS = 12;
	var HSIZE = 5003; // 80% occupancy

	// GIF Image compression - modified 'compress'
	// Based on: compress.c - File compression ala IEEE Computer, June 1984.
	// By Authors: Spencer W. Thomas (decvax!harpo!utah-cs!utah-gr!thomas)
	// Jim McKie (decvax!mcvax!jim)
	// Steve Davies (decvax!vax135!petsd!peora!srd)
	// Ken Turkowski (decvax!decwrl!turtlevax!ken)
	// James A. Woods (decvax!ihnp4!ames!jaw)
	// Joe Orost (decvax!vax135!petsd!joe)

	var n_bits; // number of bits/code
	var maxbits = BITS; // user settable max # bits/code
	var maxcode; // maximum code, given n_bits
	var maxmaxcode = 1 << BITS; // should NEVER generate this code
	var htab = [];
	var codetab = [];
	var hsize = HSIZE; // for dynamic table sizing
	var free_ent = 0; // first unused entry

	// block compression parameters -- after all codes are used up,
	// and compression rate changes, start over.

	var clear_flg = false;

	// Algorithm: use open addressing double hashing (no chaining) on the
	// prefix code / next character combination. We do a variant of Knuth's
	// algorithm D (vol. 3, sec. 6.4) along with G. Knott's relatively-prime
	// secondary probe. Here, the modular division first probe is gives way
	// to a faster exclusive-or manipulation. Also do block compression with
	// an adaptive reset, whereby the code table is cleared when the compression
	// ratio decreases, but after the table fills. The variable-length output
	// codes are re-sized at this point, and a special CLEAR code is generated
	// for the decompressor. Late addition: construct the table according to
	// file size for noticeable speed improvement on small files. Please direct
	// questions about this implementation to ames!jaw.

	var g_init_bits;
	var ClearCode;
	var EOFCode;

	// output
	// Output the given code.
	// Inputs:
	// code: A n_bits-bit integer. If == -1, then EOF. This assumes
	// that n_bits =< wordsize - 1.
	// Outputs:
	// Outputs code to the file.
	// Assumptions:
	// Chars are 8 bits long.
	// Algorithm:
	// Maintain a BITS character long buffer (so that 8 codes will
	// fit in it exactly). Use the VAX insv instruction to insert each
	// code in turn. When the buffer fills up empty it and start over.

	var cur_accum = 0;
	var cur_bits = 0;
	var masks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F, 0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF, 0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF];

	// Number of characters so far in this 'packet'
	var a_count;

	// Define the storage for the packet accumulator
	var accum = [];

	var LZWEncoder = exports.LZWEncoder = function LZWEncoder(width, height, pixels, color_depth) {
		imgW = width;
		imgH = height;
		pixAry = pixels;
		initCodeSize = Math.max(2, color_depth);
	};

	// Add a character to the end of the current packet, and if it is 254
	// characters, flush the packet to disk.
	var char_out = function char_out(c, outs) {
		accum[a_count++] = c;
		if (a_count >= 254) flush_char(outs);
	};

	// Clear out the hash table
	// table clear for block compress

	var cl_block = function cl_block(outs) {
		cl_hash(hsize);
		free_ent = ClearCode + 2;
		clear_flg = true;
		output(ClearCode, outs);
	};

	// reset code table
	var cl_hash = function cl_hash(hsize) {
		for (var i = 0; i < hsize; ++i) htab[i] = -1;
	};

	var compress = exports.compress = function compress(init_bits, outs) {

		var fcode;
		var i; /* = 0 */
		var c;
		var ent;
		var disp;
		var hsize_reg;
		var hshift;

		// Set up the globals: g_init_bits - initial number of bits
		g_init_bits = init_bits;

		// Set up the necessary values
		clear_flg = false;
		n_bits = g_init_bits;
		maxcode = MAXCODE(n_bits);

		ClearCode = 1 << (init_bits - 1);
		EOFCode = ClearCode + 1;
		free_ent = ClearCode + 2;

		a_count = 0; // clear packet

		ent = nextPixel();

		hshift = 0;
		for (fcode = hsize; fcode < 65536; fcode *= 2)
			++hshift;
		hshift = 8 - hshift; // set hash code range bound

		hsize_reg = hsize;
		cl_hash(hsize_reg); // clear hash table

		output(ClearCode, outs);

		outer_loop: while ((c = nextPixel()) != EOF) {
			fcode = (c << maxbits) + ent;
			i = (c << hshift) ^ ent; // xor hashing

			if (htab[i] == fcode) {
				ent = codetab[i];
				continue;
			}

			else if (htab[i] >= 0) { // non-empty slot

				disp = hsize_reg - i; // secondary hash (after G. Knott)
				if (i === 0) disp = 1;

				do {
					if ((i -= disp) < 0)
						i += hsize_reg;

					if (htab[i] == fcode) {
						ent = codetab[i];
						continue outer_loop;
					}
				} while (htab[i] >= 0);
			}

			output(ent, outs);
			ent = c;
			if (free_ent < maxmaxcode) {
				codetab[i] = free_ent++; // code -> hashtable
				htab[i] = fcode;
			}
			else cl_block(outs);
		}

		// Put out the final code.
		output(ent, outs);
		output(EOFCode, outs);
	};

	// ----------------------------------------------------------------------------
	var encode = exports.encode = function encode(os) {
		os.writeByte(initCodeSize); // write "initial code size" byte
		remaining = imgW * imgH; // reset navigation variables
		curPixel = 0;
		compress(initCodeSize + 1, os); // compress and write the pixel data
		os.writeByte(0); // write block terminator
	};

	// Flush the packet to disk, and reset the accumulator
	var flush_char = function flush_char(outs) {
		if (a_count > 0) {
			outs.writeByte(a_count);
			outs.writeBytes(accum, 0, a_count);
			a_count = 0;
		}
	};

	var MAXCODE = function MAXCODE(n_bits) {
		return (1 << n_bits) - 1;
	};

	// ----------------------------------------------------------------------------
	// Return the next pixel from the image
	// ----------------------------------------------------------------------------

	var nextPixel = function nextPixel() {
		if (remaining === 0) return EOF;
		--remaining;
		var pix = pixAry[curPixel++];
		return pix & 0xff;
	};

	var output = function output(code, outs) {

		cur_accum &= masks[cur_bits];

		if (cur_bits > 0) cur_accum |= (code << cur_bits);
		else cur_accum = code;

		cur_bits += n_bits;

		while (cur_bits >= 8) {
			char_out((cur_accum & 0xff), outs);
			cur_accum >>= 8;
			cur_bits -= 8;
		}

		// If the next entry is going to be too big for the code size,
		// then increase it, if possible.

		if (free_ent > maxcode || clear_flg) {

			if (clear_flg) {

				maxcode = MAXCODE(n_bits = g_init_bits);
				clear_flg = false;

			} else {

				++n_bits;
				if (n_bits == maxbits) maxcode = maxmaxcode;
				else maxcode = MAXCODE(n_bits);
			}
		}

		if (code == EOFCode) {

			// At EOF, write the rest of the buffer.
			while (cur_bits > 0) {
				char_out((cur_accum & 0xff), outs);
				cur_accum >>= 8;
				cur_bits -= 8;
			}

			flush_char(outs);
		}
	};

	LZWEncoder.apply(this, arguments);
	return exports;
};
/*
 * NeuQuant Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994. See
 * "Kohonen neural networks for optimal colour quantization" in "Network:
 * Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
 * the algorithm.
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal in
 * this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons who
 * receive copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 */

/*
 * This class handles Neural-Net quantization algorithm
 * @author Kevin Weiner (original Java version - kweiner@fmsware.com)
 * @author Thibault Imbert (AS3 version - bytearray.org)
 * @author Kevin Kwok (JavaScript version - https://github.com/antimatter15/jsgif)
 * @version 0.1 AS3 implementation
 */


NeuQuant = function() {

	var exports = {};
	var netsize = 256; /* number of colours used */

	/* four primes near 500 - assume no image has a length so large */
	/* that it is divisible by all four primes */

	var prime1 = 499;
	var prime2 = 491;
	var prime3 = 487;
	var prime4 = 503;
	var minpicturebytes = (3 * prime4); /* minimum size for input image */

	/*
	 * Program Skeleton ---------------- [select samplefac in range 1..30] [read
	 * image from input file] pic = (unsigned char*) malloc(3*width*height);
	 * initnet(pic,3*width*height,samplefac); learn(); unbiasnet(); [write output
	 * image header, using writecolourmap(f)] inxbuild(); write output image using
	 * inxsearch(b,g,r)
	 */

	/*
	 * Network Definitions -------------------
	 */

	var maxnetpos = (netsize - 1);
	var netbiasshift = 4; /* bias for colour values */
	var ncycles = 100; /* no. of learning cycles */

	/* defs for freq and bias */
	var intbiasshift = 16; /* bias for fractions */
	var intbias = (1 << intbiasshift);
	var gammashift = 10; /* gamma = 1024 */
	var gamma = (1 << gammashift);
	var betashift = 10;
	var beta = (intbias >> betashift); /* beta = 1/1024 */
	var betagamma = (intbias << (gammashift - betashift));

	/* defs for decreasing radius factor */
	var initrad = (netsize >> 3); /* for 256 cols, radius starts */
	var radiusbiasshift = 6; /* at 32.0 biased by 6 bits */
	var radiusbias = (1 << radiusbiasshift);
	var initradius = (initrad * radiusbias); /* and decreases by a */
	var radiusdec = 30; /* factor of 1/30 each cycle */

	/* defs for decreasing alpha factor */
	var alphabiasshift = 10; /* alpha starts at 1.0 */
	var initalpha = (1 << alphabiasshift);
	var alphadec; /* biased by 10 bits */

	/* radbias and alpharadbias used for radpower calculation */
	var radbiasshift = 8;
	var radbias = (1 << radbiasshift);
	var alpharadbshift = (alphabiasshift + radbiasshift);
	var alpharadbias = (1 << alpharadbshift);

	/*
	 * Types and Global Variables --------------------------
	 */

	var thepicture; /* the input image itself */
	var lengthcount; /* lengthcount = H*W*3 */
	var samplefac; /* sampling factor 1..30 */

	// typedef int pixel[4]; /* BGRc */
	var network; /* the network itself - [netsize][4] */
	var netindex = [];

	/* for network lookup - really 256 */
	var bias = [];

	/* bias and freq arrays for learning */
	var freq = [];
	var radpower = [];

	var NeuQuant = exports.NeuQuant = function NeuQuant(thepic, len, sample) {

		var i;
		var p;

		thepicture = thepic;
		lengthcount = len;
		samplefac = sample;

		network = new Array(netsize);

		for (i = 0; i < netsize; i++) {

			network[i] = new Array(4);
			p = network[i];
			p[0] = p[1] = p[2] = (i << (netbiasshift + 8)) / netsize;
			freq[i] = intbias / netsize; /* 1/netsize */
			bias[i] = 0;
		}
	};

	var colorMap = function colorMap() {

		var map = [];
		var index = new Array(netsize);

		for (var i = 0; i < netsize; i++)
			index[network[i][3]] = i;

		var k = 0;
		for (var l = 0; l < netsize; l++) {
			var j = index[l];
			map[k++] = (network[j][0]);
			map[k++] = (network[j][1]);
			map[k++] = (network[j][2]);
		}

		return map;
	};

	/*
	 * Insertion sort of network and building of netindex[0..255] (to do after
	 * unbias)
	 * -------------------------------------------------------------------------------
	 */

	var inxbuild = function inxbuild() {

		var i;
		var j;
		var smallpos;
		var smallval;
		var p;
		var q;
		var previouscol;
		var startpos;

		previouscol = 0;
		startpos = 0;
		for (i = 0; i < netsize; i++) {

			p = network[i];
			smallpos = i;
			smallval = p[1]; /* index on g */

			/* find smallest in i..netsize-1 */
			for (j = i + 1; j < netsize; j++) {

				q = network[j];
				if (q[1] < smallval) { /* index on g */
					smallpos = j;
					smallval = q[1]; /* index on g */
				}
			}
			q = network[smallpos];

			/* swap p (i) and q (smallpos) entries */
			if (i != smallpos) {
				j = q[0];
				q[0] = p[0];
				p[0] = j;
				j = q[1];
				q[1] = p[1];
				p[1] = j;
				j = q[2];
				q[2] = p[2];
				p[2] = j;
				j = q[3];
				q[3] = p[3];
				p[3] = j;
			}

			/* smallval entry is now in position i */

			if (smallval != previouscol) {

				netindex[previouscol] = (startpos + i) >> 1;

				for (j = previouscol + 1; j < smallval; j++) netindex[j] = i;

				previouscol = smallval;
				startpos = i;
			}
		}

		netindex[previouscol] = (startpos + maxnetpos) >> 1;
		for (j = previouscol + 1; j < 256; j++) netindex[j] = maxnetpos; /* really 256 */
	};

	/*
	 * Main Learning Loop ------------------
	 */

	var learn = function learn() {

		var i;
		var j;
		var b;
		var g;
		var r;
		var radius;
		var rad;
		var alpha;
		var step;
		var delta;
		var samplepixels;
		var p;
		var pix;
		var lim;

		if (lengthcount < minpicturebytes) samplefac = 1;

		alphadec = 30 + ((samplefac - 1) / 3);
		p = thepicture;
		pix = 0;
		lim = lengthcount;
		samplepixels = lengthcount / (3 * samplefac);
		delta = (samplepixels / ncycles) | 0;
		alpha = initalpha;
		radius = initradius;

		rad = radius >> radiusbiasshift;
		if (rad <= 1) rad = 0;

		for (i = 0; i < rad; i++) radpower[i] = alpha * (((rad * rad - i * i) * radbias) / (rad * rad));

		if (lengthcount < minpicturebytes) step = 3;

		else if ((lengthcount % prime1) !== 0) step = 3 * prime1;

		else {

			if ((lengthcount % prime2) !== 0) step = 3 * prime2;
			else {
				if ((lengthcount % prime3) !== 0) step = 3 * prime3;
				else step = 3 * prime4;
			}
		}

		i = 0;
		while (i < samplepixels) {

			b = (p[pix + 0] & 0xff) << netbiasshift;
			g = (p[pix + 1] & 0xff) << netbiasshift;
			r = (p[pix + 2] & 0xff) << netbiasshift;
			j = contest(b, g, r);

			altersingle(alpha, j, b, g, r);
			if (rad !== 0) alterneigh(rad, j, b, g, r); /* alter neighbours */

			pix += step;
			if (pix >= lim) pix -= lengthcount;

			i++;

			if (delta === 0) delta = 1;

			if (i % delta === 0) {
				alpha -= alpha / alphadec;
				radius -= radius / radiusdec;
				rad = radius >> radiusbiasshift;

				if (rad <= 1) rad = 0;

				for (j = 0; j < rad; j++) radpower[j] = alpha * (((rad * rad - j * j) * radbias) / (rad * rad));
			}
		}
	};

	/*
	 ** Search for BGR values 0..255 (after net is unbiased) and return colour
	 * index
	 * ----------------------------------------------------------------------------
	 */

	var map = exports.map = function map(b, g, r) {

		var i;
		var j;
		var dist;
		var a;
		var bestd;
		var p;
		var best;

		bestd = 1000; /* biggest possible dist is 256*3 */
		best = -1;
		i = netindex[g]; /* index on g */
		j = i - 1; /* start at netindex[g] and work outwards */

		while ((i < netsize) || (j >= 0)) {

			if (i < netsize) {
				p = network[i];
				dist = p[1] - g; /* inx key */

				if (dist >= bestd) i = netsize; /* stop iter */

				else {

					i++;
					if (dist < 0) dist = -dist;
					a = p[0] - b;
					if (a < 0) a = -a;
					dist += a;

					if (dist < bestd) {
						a = p[2] - r;
						if (a < 0) a = -a;
						dist += a;

						if (dist < bestd) {
							bestd = dist;
							best = p[3];
						}
					}
				}
			}

			if (j >= 0) {

				p = network[j];
				dist = g - p[1]; /* inx key - reverse dif */

				if (dist >= bestd) j = -1; /* stop iter */

				else {

					j--;
					if (dist < 0) dist = -dist;
					a = p[0] - b;
					if (a < 0) a = -a;
					dist += a;

					if (dist < bestd) {
						a = p[2] - r;
						if (a < 0) a = -a;
						dist += a;
						if (dist < bestd) {
							bestd = dist;
							best = p[3];
						}
					}
				}
			}
		}

		return (best);
	};

	var process = exports.process = function process() {
		learn();
		unbiasnet();
		inxbuild();
		return colorMap();
	};

	/*
	 * Unbias network to give byte values 0..255 and record position i to prepare
	 * for sort
	 * -----------------------------------------------------------------------------------
	 */

	var unbiasnet = function unbiasnet() {

		var i;
		var j;

		for (i = 0; i < netsize; i++) {
			network[i][0] >>= netbiasshift;
			network[i][1] >>= netbiasshift;
			network[i][2] >>= netbiasshift;
			network[i][3] = i; /* record colour no */
		}
	};

	/*
	 * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in
	 * radpower[|i-j|]
	 * ---------------------------------------------------------------------------------
	 */

	var alterneigh = function alterneigh(rad, i, b, g, r) {

		var j;
		var k;
		var lo;
		var hi;
		var a;
		var m;
		var p;

		lo = i - rad;
		if (lo < -1) lo = -1;

		hi = i + rad;
		if (hi > netsize) hi = netsize;

		j = i + 1;
		k = i - 1;
		m = 1;

		while ((j < hi) || (k > lo)) {
			a = radpower[m++];

			if (j < hi) {
				p = network[j++];

				try {
					p[0] -= (a * (p[0] - b)) / alpharadbias;
					p[1] -= (a * (p[1] - g)) / alpharadbias;
					p[2] -= (a * (p[2] - r)) / alpharadbias;
				} catch (e) {} // prevents 1.3 miscompilation
			}

			if (k > lo) {
				p = network[k--];

				try {
					p[0] -= (a * (p[0] - b)) / alpharadbias;
					p[1] -= (a * (p[1] - g)) / alpharadbias;
					p[2] -= (a * (p[2] - r)) / alpharadbias;
				} catch (e) {}
			}
		}
	};

	/*
	 * Move neuron i towards biased (b,g,r) by factor alpha
	 * ----------------------------------------------------
	 */

	var altersingle = function altersingle(alpha, i, b, g, r) {

		/* alter hit neuron */
		var n = network[i];
		n[0] -= (alpha * (n[0] - b)) / initalpha;
		n[1] -= (alpha * (n[1] - g)) / initalpha;
		n[2] -= (alpha * (n[2] - r)) / initalpha;
	};

	/*
	 * Search for biased BGR values ----------------------------
	 */

	var contest = function contest(b, g, r) {

		/* finds closest neuron (min dist) and updates freq */
		/* finds best neuron (min dist-bias) and returns position */
		/* for frequently chosen neurons, freq[i] is high and bias[i] is negative */
		/* bias[i] = gamma*((1/netsize)-freq[i]) */

		var i;
		var dist;
		var a;
		var biasdist;
		var betafreq;
		var bestpos;
		var bestbiaspos;
		var bestd;
		var bestbiasd;
		var n;

		bestd = ~ (1 << 31);
		bestbiasd = bestd;
		bestpos = -1;
		bestbiaspos = bestpos;

		for (i = 0; i < netsize; i++) {
			n = network[i];
			dist = n[0] - b;
			if (dist < 0) dist = -dist;
			a = n[1] - g;
			if (a < 0) a = -a;
			dist += a;
			a = n[2] - r;
			if (a < 0) a = -a;
			dist += a;

			if (dist < bestd) {
				bestd = dist;
				bestpos = i;
			}

			biasdist = dist - ((bias[i]) >> (intbiasshift - netbiasshift));

			if (biasdist < bestbiasd) {
				bestbiasd = biasdist;
				bestbiaspos = i;
			}

			betafreq = (freq[i] >> betashift);
			freq[i] -= betafreq;
			bias[i] += (betafreq << gammashift);
		}

		freq[bestpos] += beta;
		bias[bestpos] -= betagamma;
		return (bestbiaspos);
	};

	NeuQuant.apply(this, arguments);
	return exports;
};
(function() {
  var context = this;

  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        WebSocket: window.WebSocket,
        logger: window.console,
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages, ref;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return (ref = this.logger).log.apply(ref, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(context);

  var ActionCable = context.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            return false;
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new ActionCable.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
if (parallable === undefined) {
	var parallable = function (file, funct) {
		parallable.core[funct.toString()] = funct().core;
		return function () {
			var i;
			var async, worker_num, params;
			if (arguments.length > 1) {
				async = arguments[arguments.length - 2];
				worker_num = arguments[arguments.length - 1];
				params = new Array(arguments.length - 2);
				for (i = 0; i < arguments.length - 2; i++)
					params[i] = arguments[i];
			} else {
				async = arguments[0].async;
				worker_num = arguments[0].worker;
				params = arguments[0];
				delete params["async"];
				delete params["worker"];
				params = [params];
			}
			var scope = { "shared" : {} };
			var ctrl = funct.apply(scope, params);
			if (async) {
				return function (complete, error) {
					var executed = 0;
					var outputs = new Array(worker_num);
					var inputs = ctrl.pre.apply(scope, [worker_num]);
					/* sanitize scope shared because for Chrome/WebKit, worker only support JSONable data */
					for (i in scope.shared)
						/* delete function, if any */
						if (typeof scope.shared[i] == "function")
							delete scope.shared[i];
						/* delete DOM object, if any */
						else if (scope.shared[i].tagName !== undefined)
							delete scope.shared[i];
					for (i = 0; i < worker_num; i++) {
						var worker = new Worker(file);
						worker.onmessage = (function (i) {
							return function (event) {
								outputs[i] = (typeof event.data == "string") ? JSON.parse(event.data) : event.data;
								executed++;
								if (executed == worker_num)
									complete(ctrl.post.apply(scope, [outputs]));
							}
						})(i);
						var msg = { "input" : inputs[i],
									"name" : funct.toString(),
									"shared" : scope.shared,
									"id" : i,
									"worker" : params.worker_num };
						try {
							worker.postMessage(msg);
						} catch (e) {
							worker.postMessage(JSON.stringify(msg));
						}
					}
				}
			} else {
				return ctrl.post.apply(scope, [[ctrl.core.apply(scope, [ctrl.pre.apply(scope, [1])[0], 0, 1])]]);
			}
		}
	};
	parallable.core = {};
}

function get_named_arguments(params, names) {
	if (params.length > 1) {
		var new_params = {};
		for (var i = 0; i < names.length; i++)
			new_params[names[i]] = params[i];
		return new_params;
	} else if (params.length == 1) {
		return params[0];
	} else {
		return {};
	}
}

var ccv = {
	pre : function (image) {
		if (image.tagName.toLowerCase() == "img") {
			var canvas = document.createElement("canvas");
			document.body.appendChild(image);
			canvas.width = image.offsetWidth;
			canvas.style.width = image.offsetWidth.toString() + "px";
			canvas.height = image.offsetHeight;
			canvas.style.height = image.offsetHeight.toString() + "px";
			document.body.removeChild(image);
			var ctx = canvas.getContext("2d");
			ctx.drawImage(image, 0, 0);
			return canvas;
		}
		return image;
	},

	grayscale : function (canvas) {
		var ctx = canvas.getContext("2d");
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		var pix1, pix2, pix = canvas.width * canvas.height * 4;
		while (pix > 0)
			data[pix -= 4] = data[pix1 = pix + 1] = data[pix2 = pix + 2] = (data[pix] * 0.3 + data[pix1] * 0.59 + data[pix2] * 0.11);
		ctx.putImageData(imageData, 0, 0);
		return canvas;
	},

	array_group : function (seq, gfunc) {
		var i, j;
		var node = new Array(seq.length);
		for (i = 0; i < seq.length; i++)
			node[i] = {"parent" : -1,
					   "element" : seq[i],
					   "rank" : 0};
		for (i = 0; i < seq.length; i++) {
			if (!node[i].element)
				continue;
			var root = i;
			while (node[root].parent != -1)
				root = node[root].parent;
			for (j = 0; j < seq.length; j++) {
				if( i != j && node[j].element && gfunc(node[i].element, node[j].element)) {
					var root2 = j;

					while (node[root2].parent != -1)
						root2 = node[root2].parent;

					if(root2 != root) {
						if(node[root].rank > node[root2].rank)
							node[root2].parent = root;
						else {
							node[root].parent = root2;
							if (node[root].rank == node[root2].rank)
							node[root2].rank++;
							root = root2;
						}

						/* compress path from node2 to the root: */
						var temp, node2 = j;
						while (node[node2].parent != -1) {
							temp = node2;
							node2 = node[node2].parent;
							node[temp].parent = root;
						}

						/* compress path from node to the root: */
						node2 = i;
						while (node[node2].parent != -1) {
							temp = node2;
							node2 = node[node2].parent;
							node[temp].parent = root;
						}
					}
				}
			}
		}
		var idx = new Array(seq.length);
		var class_idx = 0;
		for(i = 0; i < seq.length; i++) {
			j = -1;
			var node1 = i;
			if(node[node1].element) {
				while (node[node1].parent != -1)
					node1 = node[node1].parent;
				if(node[node1].rank >= 0)
					node[node1].rank = ~class_idx++;
				j = ~node[node1].rank;
			}
			idx[i] = j;
		}
		return {"index" : idx, "cat" : class_idx};
	},

	detect_objects : parallable("ccv.js", function (canvas, cascade, interval, min_neighbors) {
		if (this.shared !== undefined) {
			var params = get_named_arguments(arguments, ["canvas", "cascade", "interval", "min_neighbors"]);
			this.shared.canvas = params.canvas;
			this.shared.interval = params.interval;
			this.shared.min_neighbors = params.min_neighbors;
			this.shared.cascade = params.cascade;
			this.shared.scale = Math.pow(2, 1 / (params.interval + 1));
			this.shared.next = params.interval + 1;
			this.shared.scale_upto = Math.floor(Math.log(Math.min(params.canvas.width / params.cascade.width, params.canvas.height / params.cascade.height)) / Math.log(this.shared.scale));
			var i;
			for (i = 0; i < this.shared.cascade.stage_classifier.length; i++)
				this.shared.cascade.stage_classifier[i].orig_feature = this.shared.cascade.stage_classifier[i].feature;
		}
		function pre(worker_num) {
			var canvas = this.shared.canvas;
			var interval = this.shared.interval;
			var scale = this.shared.scale;
			var next = this.shared.next;
			var scale_upto = this.shared.scale_upto;
			var pyr = new Array((scale_upto + next * 2) * 4);
			var ret = new Array((scale_upto + next * 2) * 4);
			pyr[0] = canvas;
			ret[0] = { "width" : pyr[0].width,
					   "height" : pyr[0].height,
					   "data" : pyr[0].getContext("2d").getImageData(0, 0, pyr[0].width, pyr[0].height).data };
			var i;
			for (i = 1; i <= interval; i++) {
				pyr[i * 4] = document.createElement("canvas");
				pyr[i * 4].width = Math.floor(pyr[0].width / Math.pow(scale, i));
				pyr[i * 4].height = Math.floor(pyr[0].height / Math.pow(scale, i));
				pyr[i * 4].getContext("2d").drawImage(pyr[0], 0, 0, pyr[0].width, pyr[0].height, 0, 0, pyr[i * 4].width, pyr[i * 4].height);
				ret[i * 4] = { "width" : pyr[i * 4].width,
							   "height" : pyr[i * 4].height,
							   "data" : pyr[i * 4].getContext("2d").getImageData(0, 0, pyr[i * 4].width, pyr[i * 4].height).data };
			}
			for (i = next; i < scale_upto + next * 2; i++) {
				pyr[i * 4] = document.createElement("canvas");
				pyr[i * 4].width = Math.floor(pyr[i * 4 - next * 4].width / 2);
				pyr[i * 4].height = Math.floor(pyr[i * 4 - next * 4].height / 2);
				pyr[i * 4].getContext("2d").drawImage(pyr[i * 4 - next * 4], 0, 0, pyr[i * 4 - next * 4].width, pyr[i * 4 - next * 4].height, 0, 0, pyr[i * 4].width, pyr[i * 4].height);
				ret[i * 4] = { "width" : pyr[i * 4].width,
							   "height" : pyr[i * 4].height,
							   "data" : pyr[i * 4].getContext("2d").getImageData(0, 0, pyr[i * 4].width, pyr[i * 4].height).data };
			}
			for (i = next * 2; i < scale_upto + next * 2; i++) {
				pyr[i * 4 + 1] = document.createElement("canvas");
				pyr[i * 4 + 1].width = Math.floor(pyr[i * 4 - next * 4].width / 2);
				pyr[i * 4 + 1].height = Math.floor(pyr[i * 4 - next * 4].height / 2);
				pyr[i * 4 + 1].getContext("2d").drawImage(pyr[i * 4 - next * 4], 1, 0, pyr[i * 4 - next * 4].width - 1, pyr[i * 4 - next * 4].height, 0, 0, pyr[i * 4 + 1].width - 2, pyr[i * 4 + 1].height);
				ret[i * 4 + 1] = { "width" : pyr[i * 4 + 1].width,
								   "height" : pyr[i * 4 + 1].height,
								   "data" : pyr[i * 4 + 1].getContext("2d").getImageData(0, 0, pyr[i * 4 + 1].width, pyr[i * 4 + 1].height).data };
				pyr[i * 4 + 2] = document.createElement("canvas");
				pyr[i * 4 + 2].width = Math.floor(pyr[i * 4 - next * 4].width / 2);
				pyr[i * 4 + 2].height = Math.floor(pyr[i * 4 - next * 4].height / 2);
				pyr[i * 4 + 2].getContext("2d").drawImage(pyr[i * 4 - next * 4], 0, 1, pyr[i * 4 - next * 4].width, pyr[i * 4 - next * 4].height - 1, 0, 0, pyr[i * 4 + 2].width, pyr[i * 4 + 2].height - 2);
				ret[i * 4 + 2] = { "width" : pyr[i * 4 + 2].width,
								   "height" : pyr[i * 4 + 2].height,
								   "data" : pyr[i * 4 + 2].getContext("2d").getImageData(0, 0, pyr[i * 4 + 2].width, pyr[i * 4 + 2].height).data };
				pyr[i * 4 + 3] = document.createElement("canvas");
				pyr[i * 4 + 3].width = Math.floor(pyr[i * 4 - next * 4].width / 2);
				pyr[i * 4 + 3].height = Math.floor(pyr[i * 4 - next * 4].height / 2);
				pyr[i * 4 + 3].getContext("2d").drawImage(pyr[i * 4 - next * 4], 1, 1, pyr[i * 4 - next * 4].width - 1, pyr[i * 4 - next * 4].height - 1, 0, 0, pyr[i * 4 + 3].width - 2, pyr[i * 4 + 3].height - 2);
				ret[i * 4 + 3] = { "width" : pyr[i * 4 + 3].width,
								   "height" : pyr[i * 4 + 3].height,
								   "data" : pyr[i * 4 + 3].getContext("2d").getImageData(0, 0, pyr[i * 4 + 3].width, pyr[i * 4 + 3].height).data };
			}
			return [ret];
		};

		function core(pyr, id, worker_num) {
			var cascade = this.shared.cascade;
			var interval = this.shared.interval;
			var scale = this.shared.scale;
			var next = this.shared.next;
			var scale_upto = this.shared.scale_upto;
			var i, j, k, x, y, q;
			var scale_x = 1, scale_y = 1;
			var dx = [0, 1, 0, 1];
			var dy = [0, 0, 1, 1];
			var seq = [];
			for (i = 0; i < scale_upto; i++) {
				var qw = pyr[i * 4 + next * 8].width - Math.floor(cascade.width / 4);
				var qh = pyr[i * 4 + next * 8].height - Math.floor(cascade.height / 4);
				var step = [pyr[i * 4].width * 4, pyr[i * 4 + next * 4].width * 4, pyr[i * 4 + next * 8].width * 4];
				var paddings = [pyr[i * 4].width * 16 - qw * 16,
								pyr[i * 4 + next * 4].width * 8 - qw * 8,
								pyr[i * 4 + next * 8].width * 4 - qw * 4];
				for (j = 0; j < cascade.stage_classifier.length; j++) {
					var orig_feature = cascade.stage_classifier[j].orig_feature;
					var feature = cascade.stage_classifier[j].feature = new Array(cascade.stage_classifier[j].count);
					for (k = 0; k < cascade.stage_classifier[j].count; k++) {
						feature[k] = {"size" : orig_feature[k].size,
									  "px" : new Array(orig_feature[k].size),
									  "pz" : new Array(orig_feature[k].size),
									  "nx" : new Array(orig_feature[k].size),
									  "nz" : new Array(orig_feature[k].size)};
						for (q = 0; q < orig_feature[k].size; q++) {
							feature[k].px[q] = orig_feature[k].px[q] * 4 + orig_feature[k].py[q] * step[orig_feature[k].pz[q]];
							feature[k].pz[q] = orig_feature[k].pz[q];
							feature[k].nx[q] = orig_feature[k].nx[q] * 4 + orig_feature[k].ny[q] * step[orig_feature[k].nz[q]];
							feature[k].nz[q] = orig_feature[k].nz[q];
						}
					}
				}
				for (q = 0; q < 4; q++) {
					var u8 = [pyr[i * 4].data, pyr[i * 4 + next * 4].data, pyr[i * 4 + next * 8 + q].data];
					var u8o = [dx[q] * 8 + dy[q] * pyr[i * 4].width * 8, dx[q] * 4 + dy[q] * pyr[i * 4 + next * 4].width * 4, 0];
					for (y = 0; y < qh; y++) {
						for (x = 0; x < qw; x++) {
							var sum = 0;
							var flag = true;
							for (j = 0; j < cascade.stage_classifier.length; j++) {
								sum = 0;
								var alpha = cascade.stage_classifier[j].alpha;
								var feature = cascade.stage_classifier[j].feature;
								for (k = 0; k < cascade.stage_classifier[j].count; k++) {
									var feature_k = feature[k];
									var p, pmin = u8[feature_k.pz[0]][u8o[feature_k.pz[0]] + feature_k.px[0]];
									var n, nmax = u8[feature_k.nz[0]][u8o[feature_k.nz[0]] + feature_k.nx[0]];
									if (pmin <= nmax) {
										sum += alpha[k * 2];
									} else {
										var f, shortcut = true;
										for (f = 0; f < feature_k.size; f++) {
											if (feature_k.pz[f] >= 0) {
												p = u8[feature_k.pz[f]][u8o[feature_k.pz[f]] + feature_k.px[f]];
												if (p < pmin) {
													if (p <= nmax) {
														shortcut = false;
														break;
													}
													pmin = p;
												}
											}
											if (feature_k.nz[f] >= 0) {
												n = u8[feature_k.nz[f]][u8o[feature_k.nz[f]] + feature_k.nx[f]];
												if (n > nmax) {
													if (pmin <= n) {
														shortcut = false;
														break;
													}
													nmax = n;
												}
											}
										}
										sum += (shortcut) ? alpha[k * 2 + 1] : alpha[k * 2];
									}
								}
								if (sum < cascade.stage_classifier[j].threshold) {
									flag = false;
									break;
								}
							}
							if (flag) {
								seq.push({"x" : (x * 4 + dx[q] * 2) * scale_x,
										  "y" : (y * 4 + dy[q] * 2) * scale_y,
										  "width" : cascade.width * scale_x,
										  "height" : cascade.height * scale_y,
										  "neighbor" : 1,
										  "confidence" : sum});
							}
							u8o[0] += 16;
							u8o[1] += 8;
							u8o[2] += 4;
						}
						u8o[0] += paddings[0];
						u8o[1] += paddings[1];
						u8o[2] += paddings[2];
					}
				}
				scale_x *= scale;
				scale_y *= scale;
			}
			return seq;
		};

		function post(seq) {
			var min_neighbors = this.shared.min_neighbors;
			var cascade = this.shared.cascade;
			var interval = this.shared.interval;
			var scale = this.shared.scale;
			var next = this.shared.next;
			var scale_upto = this.shared.scale_upto;
			var i, j;
			for (i = 0; i < cascade.stage_classifier.length; i++)
				cascade.stage_classifier[i].feature = cascade.stage_classifier[i].orig_feature;
			seq = seq[0];
			if (!(min_neighbors > 0))
				return seq;
			else {
				var result = ccv.array_group(seq, function (r1, r2) {
					var distance = Math.floor(r1.width * 0.25 + 0.5);

					return r2.x <= r1.x + distance &&
						   r2.x >= r1.x - distance &&
						   r2.y <= r1.y + distance &&
						   r2.y >= r1.y - distance &&
						   r2.width <= Math.floor(r1.width * 1.5 + 0.5) &&
						   Math.floor(r2.width * 1.5 + 0.5) >= r1.width;
				});
				var ncomp = result.cat;
				var idx_seq = result.index;
				var comps = new Array(ncomp + 1);
				for (i = 0; i < comps.length; i++)
					comps[i] = {"neighbors" : 0,
								"x" : 0,
								"y" : 0,
								"width" : 0,
								"height" : 0,
								"confidence" : 0};

				// count number of neighbors
				for(i = 0; i < seq.length; i++)
				{
					var r1 = seq[i];
					var idx = idx_seq[i];

					if (comps[idx].neighbors == 0)
						comps[idx].confidence = r1.confidence;

					++comps[idx].neighbors;

					comps[idx].x += r1.x;
					comps[idx].y += r1.y;
					comps[idx].width += r1.width;
					comps[idx].height += r1.height;
					comps[idx].confidence = Math.max(comps[idx].confidence, r1.confidence);
				}

				var seq2 = [];
				// calculate average bounding box
				for(i = 0; i < ncomp; i++)
				{
					var n = comps[i].neighbors;
					if (n >= min_neighbors)
						seq2.push({"x" : (comps[i].x * 2 + n) / (2 * n),
								   "y" : (comps[i].y * 2 + n) / (2 * n),
								   "width" : (comps[i].width * 2 + n) / (2 * n),
								   "height" : (comps[i].height * 2 + n) / (2 * n),
								   "neighbors" : comps[i].neighbors,
								   "confidence" : comps[i].confidence});
				}

				var result_seq = [];
				// filter out small face rectangles inside large face rectangles
				for(i = 0; i < seq2.length; i++)
				{
					var r1 = seq2[i];
					var flag = true;
					for(j = 0; j < seq2.length; j++)
					{
						var r2 = seq2[j];
						var distance = Math.floor(r2.width * 0.25 + 0.5);

						if(i != j &&
						   r1.x >= r2.x - distance &&
						   r1.y >= r2.y - distance &&
						   r1.x + r1.width <= r2.x + r2.width + distance &&
						   r1.y + r1.height <= r2.y + r2.height + distance &&
						   (r2.neighbors > Math.max(3, r1.neighbors) || r1.neighbors < 3))
						{
							flag = false;
							break;
						}
					}

					if(flag)
						result_seq.push(r1);
				}
				return result_seq;
			}
		};
		return { "pre" : pre, "core" : core, "post" : post };
	})
}

onmessage = function (event) {
	var data = (typeof event.data == "string") ? JSON.parse(event.data) : event.data;
	var scope = { "shared" : data.shared };
	var result = parallable.core[data.name].apply(scope, [data.input, data.id, data.worker]);
	try {
    postMessage(result);
	} catch (e) {
		postMessage(JSON.stringify(result));
	}
}
;
(function() {


}).call(this);
function resizeCanvasIfNeeded(t){var e=t.targetCanvas,i=e.width,r=e.height,n=t.destinationWidth,s=t.destinationHeight;i===n&&r===s||(e.width=n,e.height=s)}function copyGLTo2DDrawImage(t,e){var i=t.canvas,r=e.targetCanvas,n=r.getContext("2d");n.translate(0,r.height),n.scale(1,-1);var s=i.height-r.height;n.drawImage(i,0,s,r.width,r.height,0,0,r.width,r.height)}function copyGLTo2DPutImageData(t,e){var i=e.targetCanvas.getContext("2d"),r=e.destinationWidth,n=e.destinationHeight,s=r*n*4,o=new Uint8Array(this.imageBuffer,0,s),a=new Uint8ClampedArray(this.imageBuffer,0,s);t.readPixels(0,0,r,n,t.RGBA,t.UNSIGNED_BYTE,o);var h=new ImageData(a,r,n);i.putImageData(h,0,0)}var fabric=fabric||{version:"2.2.0"};"undefined"!=typeof exports&&(exports.fabric=fabric),"undefined"!=typeof document&&"undefined"!=typeof window?(fabric.document=document,fabric.window=window):(fabric.document=require("jsdom").jsdom(decodeURIComponent("%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3C%2Fhead%3E%3Cbody%3E%3C%2Fbody%3E%3C%2Fhtml%3E"),{features:{FetchExternalResources:["img"]}}),fabric.jsdomImplForWrapper=require("jsdom/lib/jsdom/living/generated/utils").implForWrapper,fabric.nodeCanvas=require("jsdom/lib/jsdom/utils").Canvas,fabric.window=fabric.document.defaultView,DOMParser=require("xmldom").DOMParser),fabric.isTouchSupported="ontouchstart"in fabric.window,fabric.isLikelyNode="undefined"!=typeof Buffer&&"undefined"==typeof window,fabric.SHARED_ATTRIBUTES=["display","transform","fill","fill-opacity","fill-rule","opacity","stroke","stroke-dasharray","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","id","paint-order","instantiated_by_use"],fabric.DPI=96,fabric.reNum="(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:e[-+]?\\d+)?)",fabric.fontPaths={},fabric.iMatrix=[1,0,0,1,0,0],fabric.canvasModule="canvas",fabric.perfLimitSizeTotal=2097152,fabric.maxCacheSideLimit=4096,fabric.minCacheSideLimit=256,fabric.charWidthsCache={},fabric.textureSize=2048,fabric.enableGLFiltering=!0,fabric.devicePixelRatio=fabric.window.devicePixelRatio||fabric.window.webkitDevicePixelRatio||fabric.window.mozDevicePixelRatio||1,fabric.browserShadowBlurConstant=1,fabric.initFilterBackend=function(){return fabric.enableGLFiltering&&fabric.isWebglSupported&&fabric.isWebglSupported(fabric.textureSize)?(console.log("max texture size: "+fabric.maxTextureSize),new fabric.WebglFilterBackend({tileSize:fabric.textureSize})):fabric.Canvas2dFilterBackend?new fabric.Canvas2dFilterBackend:void 0},"undefined"!=typeof document&&"undefined"!=typeof window&&(window.fabric=fabric),function(){function t(t,e){if(this.__eventListeners[t]){var i=this.__eventListeners[t];e?i[i.indexOf(e)]=!1:fabric.util.array.fill(i,!1)}}function e(t,e){if(this.__eventListeners||(this.__eventListeners={}),1===arguments.length)for(var i in t)this.on(i,t[i]);else this.__eventListeners[t]||(this.__eventListeners[t]=[]),this.__eventListeners[t].push(e);return this}function i(e,i){if(this.__eventListeners){if(0===arguments.length)for(e in this.__eventListeners)t.call(this,e);else if(1===arguments.length&&"object"==typeof arguments[0])for(var r in e)t.call(this,r,e[r]);else t.call(this,e,i);return this}}function r(t,e){if(this.__eventListeners){var i=this.__eventListeners[t];if(i){for(var r=0,n=i.length;r<n;r++)i[r]&&i[r].call(this,e||{});return this.__eventListeners[t]=i.filter(function(t){return!1!==t}),this}}}fabric.Observable={observe:e,stopObserving:i,fire:r,on:e,off:i,trigger:r}}(),fabric.Collection={_objects:[],add:function(){if(this._objects.push.apply(this._objects,arguments),this._onObjectAdded)for(var t=0,e=arguments.length;t<e;t++)this._onObjectAdded(arguments[t]);return this.renderOnAddRemove&&this.requestRenderAll(),this},insertAt:function(t,e,i){var r=this.getObjects();return i?r[e]=t:r.splice(e,0,t),this._onObjectAdded&&this._onObjectAdded(t),this.renderOnAddRemove&&this.requestRenderAll(),this},remove:function(){for(var t,e=this.getObjects(),i=!1,r=0,n=arguments.length;r<n;r++)-1!==(t=e.indexOf(arguments[r]))&&(i=!0,e.splice(t,1),this._onObjectRemoved&&this._onObjectRemoved(arguments[r]));return this.renderOnAddRemove&&i&&this.requestRenderAll(),this},forEachObject:function(t,e){for(var i=this.getObjects(),r=0,n=i.length;r<n;r++)t.call(e,i[r],r,i);return this},getObjects:function(t){return void 0===t?this._objects:this._objects.filter(function(e){return e.type===t})},item:function(t){return this.getObjects()[t]},isEmpty:function(){return 0===this.getObjects().length},size:function(){return this.getObjects().length},contains:function(t){return this.getObjects().indexOf(t)>-1},complexity:function(){return this.getObjects().reduce(function(t,e){return t+=e.complexity?e.complexity():0},0)}},fabric.CommonMethods={_setOptions:function(t){for(var e in t)this.set(e,t[e])},_initGradient:function(t,e){!t||!t.colorStops||t instanceof fabric.Gradient||this.set(e,new fabric.Gradient(t))},_initPattern:function(t,e,i){!t||!t.source||t instanceof fabric.Pattern?i&&i():this.set(e,new fabric.Pattern(t,i))},_initClipping:function(t){if(t.clipTo&&"string"==typeof t.clipTo){var e=fabric.util.getFunctionBody(t.clipTo);void 0!==e&&(this.clipTo=new Function("ctx",e))}},_setObject:function(t){for(var e in t)this._set(e,t[e])},set:function(t,e){return"object"==typeof t?this._setObject(t):"function"==typeof e&&"clipTo"!==t?this._set(t,e(this.get(t))):this._set(t,e),this},_set:function(t,e){this[t]=e},toggle:function(t){var e=this.get(t);return"boolean"==typeof e&&this.set(t,!e),this},get:function(t){return this[t]}},function(t){var e=Math.sqrt,i=Math.atan2,r=Math.pow,n=Math.abs,s=Math.PI/180,o=Math.PI/2;fabric.util={cos:function(t){if(0===t)return 1;t<0&&(t=-t);switch(t/o){case 1:case 3:return 0;case 2:return-1}return Math.cos(t)},sin:function(t){if(0===t)return 0;var e=1;switch(t<0&&(e=-1),t/o){case 1:return e;case 2:return 0;case 3:return-e}return Math.sin(t)},removeFromArray:function(t,e){var i=t.indexOf(e);return-1!==i&&t.splice(i,1),t},getRandomInt:function(t,e){return Math.floor(Math.random()*(e-t+1))+t},degreesToRadians:function(t){return t*s},radiansToDegrees:function(t){return t/s},rotatePoint:function(t,e,i){t.subtractEquals(e);var r=fabric.util.rotateVector(t,i);return new fabric.Point(r.x,r.y).addEquals(e)},rotateVector:function(t,e){var i=fabric.util.sin(e),r=fabric.util.cos(e);return{x:t.x*r-t.y*i,y:t.x*i+t.y*r}},transformPoint:function(t,e,i){return i?new fabric.Point(e[0]*t.x+e[2]*t.y,e[1]*t.x+e[3]*t.y):new fabric.Point(e[0]*t.x+e[2]*t.y+e[4],e[1]*t.x+e[3]*t.y+e[5])},makeBoundingBoxFromPoints:function(t){var e=[t[0].x,t[1].x,t[2].x,t[3].x],i=fabric.util.array.min(e),r=fabric.util.array.max(e)-i,n=[t[0].y,t[1].y,t[2].y,t[3].y],s=fabric.util.array.min(n);return{left:i,top:s,width:r,height:fabric.util.array.max(n)-s}},invertTransform:function(t){var e=1/(t[0]*t[3]-t[1]*t[2]),i=[e*t[3],-e*t[1],-e*t[2],e*t[0]],r=fabric.util.transformPoint({x:t[4],y:t[5]},i,!0);return i[4]=-r.x,i[5]=-r.y,i},toFixed:function(t,e){return parseFloat(Number(t).toFixed(e))},parseUnit:function(t,e){var i=/\D{0,2}$/.exec(t),r=parseFloat(t);switch(e||(e=fabric.Text.DEFAULT_SVG_FONT_SIZE),i[0]){case"mm":return r*fabric.DPI/25.4;case"cm":return r*fabric.DPI/2.54;case"in":return r*fabric.DPI;case"pt":return r*fabric.DPI/72;case"pc":return r*fabric.DPI/72*12;case"em":return r*e;default:return r}},falseFunction:function(){return!1},getKlass:function(t,e){return t=fabric.util.string.camelize(t.charAt(0).toUpperCase()+t.slice(1)),fabric.util.resolveNamespace(e)[t]},getSvgAttributes:function(t){var e=["instantiated_by_use","style","id","class"];switch(t){case"linearGradient":e=e.concat(["x1","y1","x2","y2","gradientUnits","gradientTransform"]);break;case"radialGradient":e=e.concat(["gradientUnits","gradientTransform","cx","cy","r","fx","fy","fr"]);break;case"stop":e=e.concat(["offset","stop-color","stop-opacity"])}return e},resolveNamespace:function(e){if(!e)return fabric;var i,r=e.split("."),n=r.length,s=t||fabric.window;for(i=0;i<n;++i)s=s[r[i]];return s},loadImage:function(t,e,i,r){if(t){var n=fabric.util.createImage(),s=function(){e&&e.call(i,n),n=n.onload=n.onerror=null};n.onload=s,n.onerror=function(){fabric.log("Error loading "+n.src),e&&e.call(i,null,!0),n=n.onload=n.onerror=null},0!==t.indexOf("data")&&r&&(n.crossOrigin=r),"data:image/svg"===t.substring(0,14)&&(n.onload=null,fabric.util.loadImageInDom(n,s)),n.src=t}else e&&e.call(i,t)},loadImageInDom:function(t,e){var i=fabric.document.createElement("div");i.style.width=i.style.height="1px",i.style.left=i.style.top="-100%",i.style.position="absolute",i.appendChild(t),fabric.document.querySelector("body").appendChild(i),t.onload=function(){e(),i.parentNode.removeChild(i),i=null}},enlivenObjects:function(t,e,i,r){function n(){++o===a&&e&&e(s)}var s=[],o=0,a=(t=t||[]).length;a?t.forEach(function(t,e){if(t&&t.type){fabric.util.getKlass(t.type,i).fromObject(t,function(i,o){o||(s[e]=i),r&&r(t,i,o),n()})}else n()}):e&&e(s)},enlivenPatterns:function(t,e){function i(){++n===s&&e&&e(r)}var r=[],n=0,s=(t=t||[]).length;s?t.forEach(function(t,e){t&&t.source?new fabric.Pattern(t,function(t){r[e]=t,i()}):(r[e]=t,i())}):e&&e(r)},groupSVGElements:function(t,e,i){var r;return 1===t.length?t[0]:(e&&(e.width&&e.height?e.centerPoint={x:e.width/2,y:e.height/2}:(delete e.width,delete e.height)),r=new fabric.Group(t,e),void 0!==i&&(r.sourcePath=i),r)},populateWithProperties:function(t,e,i){if(i&&"[object Array]"===Object.prototype.toString.call(i))for(var r=0,n=i.length;r<n;r++)i[r]in t&&(e[i[r]]=t[i[r]])},drawDashedLine:function(t,r,n,s,o,a){var h=s-r,c=o-n,l=e(h*h+c*c),u=i(c,h),f=a.length,d=0,g=!0;for(t.save(),t.translate(r,n),t.moveTo(0,0),t.rotate(u),r=0;l>r;)(r+=a[d++%f])>l&&(r=l),t[g?"lineTo":"moveTo"](r,0),g=!g;t.restore()},createCanvasElement:function(){return fabric.document.createElement("canvas")},createImage:function(){return fabric.document.createElement("img")},clipContext:function(t,e){e.save(),e.beginPath(),t.clipTo(e),e.clip()},multiplyTransformMatrices:function(t,e,i){return[t[0]*e[0]+t[2]*e[1],t[1]*e[0]+t[3]*e[1],t[0]*e[2]+t[2]*e[3],t[1]*e[2]+t[3]*e[3],i?0:t[0]*e[4]+t[2]*e[5]+t[4],i?0:t[1]*e[4]+t[3]*e[5]+t[5]]},qrDecompose:function(t){var n=i(t[1],t[0]),o=r(t[0],2)+r(t[1],2),a=e(o),h=(t[0]*t[3]-t[2]*t[1])/a,c=i(t[0]*t[2]+t[1]*t[3],o);return{angle:n/s,scaleX:a,scaleY:h,skewX:c/s,skewY:0,translateX:t[4],translateY:t[5]}},customTransformMatrix:function(t,e,i){var r=[1,0,n(Math.tan(i*s)),1],o=[n(t),0,0,n(e)];return fabric.util.multiplyTransformMatrices(o,r,!0)},resetObjectTransform:function(t){t.scaleX=1,t.scaleY=1,t.skewX=0,t.skewY=0,t.flipX=!1,t.flipY=!1,t.rotate(0)},getFunctionBody:function(t){return(String(t).match(/function[^{]*\{([\s\S]*)\}/)||{})[1]},isTransparent:function(t,e,i,r){r>0&&(e>r?e-=r:e=0,i>r?i-=r:i=0);var n,s,o=!0,a=t.getImageData(e,i,2*r||1,2*r||1),h=a.data.length;for(n=3;n<h&&(s=a.data[n],!1!==(o=s<=0));n+=4);return a=null,o},parsePreserveAspectRatioAttribute:function(t){var e,i="meet",r="Mid",n="Mid",s=t.split(" ");return s&&s.length&&("meet"!==(i=s.pop())&&"slice"!==i?(e=i,i="meet"):s.length&&(e=s.pop())),r="none"!==e?e.slice(1,4):"none",n="none"!==e?e.slice(5,8):"none",{meetOrSlice:i,alignX:r,alignY:n}},clearFabricFontCache:function(t){t?fabric.charWidthsCache[t]&&delete fabric.charWidthsCache[t]:fabric.charWidthsCache={}},limitDimsByArea:function(t,e){var i=Math.sqrt(e*t),r=Math.floor(e/i);return{x:Math.floor(i),y:r}},capValue:function(t,e,i){return Math.max(t,Math.min(e,i))},findScaleToFit:function(t,e){return Math.min(e.width/t.width,e.height/t.height)},findScaleToCover:function(t,e){return Math.max(e.width/t.width,e.height/t.height)}}}("undefined"!=typeof exports?exports:this),function(){function t(t,i,s,a,h,c,l){var u=o.call(arguments);if(r[u])return r[u];var f=Math.PI,d=l*f/180,g=fabric.util.sin(d),p=fabric.util.cos(d),v=0,m=0,b=-p*t*.5-g*i*.5,_=-p*i*.5+g*t*.5,y=(s=Math.abs(s))*s,x=(a=Math.abs(a))*a,C=_*_,S=b*b,w=y*x-y*C-x*S,T=0;if(w<0){var O=Math.sqrt(1-w/(y*x));s*=O,a*=O}else T=(h===c?-1:1)*Math.sqrt(w/(y*C+x*S));var k=T*s*_/a,D=-T*a*b/s,E=p*k-g*D+.5*t,j=g*k+p*D+.5*i,A=e(1,0,(b-k)/s,(_-D)/a),P=e((b-k)/s,(_-D)/a,(-b-k)/s,(-_-D)/a);0===c&&P>0?P-=2*f:1===c&&P<0&&(P+=2*f);for(var M=Math.ceil(Math.abs(P/f*2)),F=[],I=P/M,L=8/3*Math.sin(I/4)*Math.sin(I/4)/Math.sin(I/2),R=A+I,B=0;B<M;B++)F[B]=function(t,e,i,r,s,a,h,c,l,u,f){var d=o.call(arguments);if(n[d])return n[d];var g=fabric.util.cos(t),p=fabric.util.sin(t),v=fabric.util.cos(e),m=fabric.util.sin(e),b=i*s*v-r*a*m+h,_=r*s*v+i*a*m+c,y=u+l*(-i*s*p-r*a*g),x=f+l*(-r*s*p+i*a*g),C=b+l*(i*s*m+r*a*v),S=_+l*(r*s*m-i*a*v);return n[d]=[y,x,C,S,b,_],n[d]}(A,R,p,g,s,a,E,j,L,v,m),v=F[B][4],m=F[B][5],A=R,R+=I;return r[u]=F,F}function e(t,e,i,r){var n=Math.atan2(e,t),s=Math.atan2(r,i);return s>=n?s-n:2*Math.PI-(n-s)}function i(t,e,i,r,n,a,h,c){var l=o.call(arguments);if(s[l])return s[l];var u,f,d,g,p,v,m,b,_=Math.sqrt,y=Math.min,x=Math.max,C=Math.abs,S=[],w=[[],[]];f=6*t-12*i+6*n,u=-3*t+9*i-9*n+3*h,d=3*i-3*t;for(var T=0;T<2;++T)if(T>0&&(f=6*e-12*r+6*a,u=-3*e+9*r-9*a+3*c,d=3*r-3*e),C(u)<1e-12){if(C(f)<1e-12)continue;0<(g=-d/f)&&g<1&&S.push(g)}else(m=f*f-4*d*u)<0||(0<(p=(-f+(b=_(m)))/(2*u))&&p<1&&S.push(p),0<(v=(-f-b)/(2*u))&&v<1&&S.push(v));for(var O,k,D,E=S.length,j=E;E--;)O=(D=1-(g=S[E]))*D*D*t+3*D*D*g*i+3*D*g*g*n+g*g*g*h,w[0][E]=O,k=D*D*D*e+3*D*D*g*r+3*D*g*g*a+g*g*g*c,w[1][E]=k;w[0][j]=t,w[1][j]=e,w[0][j+1]=h,w[1][j+1]=c;var A=[{x:y.apply(null,w[0]),y:y.apply(null,w[1])},{x:x.apply(null,w[0]),y:x.apply(null,w[1])}];return s[l]=A,A}var r={},n={},s={},o=Array.prototype.join;fabric.util.drawArc=function(e,i,r,n){for(var s=n[0],o=n[1],a=n[2],h=n[3],c=n[4],l=[[],[],[],[]],u=t(n[5]-i,n[6]-r,s,o,h,c,a),f=0,d=u.length;f<d;f++)l[f][0]=u[f][0]+i,l[f][1]=u[f][1]+r,l[f][2]=u[f][2]+i,l[f][3]=u[f][3]+r,l[f][4]=u[f][4]+i,l[f][5]=u[f][5]+r,e.bezierCurveTo.apply(e,l[f])},fabric.util.getBoundsOfArc=function(e,r,n,s,o,a,h,c,l){for(var u,f=0,d=0,g=[],p=t(c-e,l-r,n,s,a,h,o),v=0,m=p.length;v<m;v++)u=i(f,d,p[v][0],p[v][1],p[v][2],p[v][3],p[v][4],p[v][5]),g.push({x:u[0].x+e,y:u[0].y+r}),g.push({x:u[1].x+e,y:u[1].y+r}),f=p[v][4],d=p[v][5];return g},fabric.util.getBoundsOfCurve=i}(),function(){function t(t,e,i){if(t&&0!==t.length){var r=t.length-1,n=e?t[r][e]:t[r];if(e)for(;r--;)i(t[r][e],n)&&(n=t[r][e]);else for(;r--;)i(t[r],n)&&(n=t[r]);return n}}var e=Array.prototype.slice;fabric.util.array={fill:function(t,e){for(var i=t.length;i--;)t[i]=e;return t},invoke:function(t,i){for(var r=e.call(arguments,2),n=[],s=0,o=t.length;s<o;s++)n[s]=r.length?t[s][i].apply(t[s],r):t[s][i].call(t[s]);return n},min:function(e,i){return t(e,i,function(t,e){return t<e})},max:function(e,i){return t(e,i,function(t,e){return t>=e})}}}(),function(){function t(e,i,r){if(r)if(!fabric.isLikelyNode&&i instanceof Element)e=i;else if(i instanceof Array){e=[];for(var n=0,s=i.length;n<s;n++)e[n]=t({},i[n],r)}else if(i&&"object"==typeof i)for(var o in i)i.hasOwnProperty(o)&&(e[o]=t({},i[o],r));else e=i;else for(var o in i)e[o]=i[o];return e}fabric.util.object={extend:t,clone:function(e,i){return t({},e,i)}},fabric.util.object.extend(fabric.util,fabric.Observable)}(),function(){fabric.util.string={camelize:function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},capitalize:function(t,e){return t.charAt(0).toUpperCase()+(e?t.slice(1):t.slice(1).toLowerCase())},escapeXml:function(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},graphemeSplit:function(t){var e,i=0,r=[];for(i=0,e;i<t.length;i++)!1!==(e=function(t,e){var i=t.charCodeAt(e);if(isNaN(i))return"";if(i<55296||i>57343)return t.charAt(e);if(55296<=i&&i<=56319){if(t.length<=e+1)throw"High surrogate without following low surrogate";var r=t.charCodeAt(e+1);if(56320>r||r>57343)throw"High surrogate without following low surrogate";return t.charAt(e)+t.charAt(e+1)}if(0===e)throw"Low surrogate without preceding high surrogate";var n=t.charCodeAt(e-1);if(55296>n||n>56319)throw"Low surrogate without preceding high surrogate";return!1}(t,i))&&r.push(e);return r}}}(),function(){function t(){}function e(t){for(var e=null,r=this;r.constructor.superclass;){var n=r.constructor.superclass.prototype[t];if(r[t]!==n){e=n;break}r=r.constructor.superclass.prototype}return e?arguments.length>1?e.apply(this,i.call(arguments,1)):e.call(this):console.log("tried to callSuper "+t+", method not found in prototype chain",this)}var i=Array.prototype.slice,r=function(){},n=function(){for(var t in{toString:1})if("toString"===t)return!1;return!0}(),s=function(t,e,i){for(var r in e)r in t.prototype&&"function"==typeof t.prototype[r]&&(e[r]+"").indexOf("callSuper")>-1?t.prototype[r]=function(t){return function(){var r=this.constructor.superclass;this.constructor.superclass=i;var n=e[t].apply(this,arguments);if(this.constructor.superclass=r,"initialize"!==t)return n}}(r):t.prototype[r]=e[r],n&&(e.toString!==Object.prototype.toString&&(t.prototype.toString=e.toString),e.valueOf!==Object.prototype.valueOf&&(t.prototype.valueOf=e.valueOf))};fabric.util.createClass=function(){function n(){this.initialize.apply(this,arguments)}var o=null,a=i.call(arguments,0);"function"==typeof a[0]&&(o=a.shift()),n.superclass=o,n.subclasses=[],o&&(t.prototype=o.prototype,n.prototype=new t,o.subclasses.push(n));for(var h=0,c=a.length;h<c;h++)s(n,a[h],o);return n.prototype.initialize||(n.prototype.initialize=r),n.prototype.constructor=n,n.prototype.callSuper=e,n}}(),function(){function t(t){var e,i,r=Array.prototype.slice.call(arguments,1),n=r.length;for(i=0;i<n;i++)if(e=typeof t[r[i]],!/^(?:function|object|unknown)$/.test(e))return!1;return!0}function e(t,e){return{handler:e,wrappedHandler:function(t,e){return function(i){e.call(r(t),i||fabric.window.event)}}(t,e)}}function i(t,e,i){var r="touchend"===t.type?"changedTouches":"touches";return t[r]&&t[r][0]?t[r][0][e]-(t[r][0][e]-t[r][0][i])||t[i]:t[i]}var r,n,s="unknown",o=function(){var t=0;return function(e){return e.__uniqueID||(e.__uniqueID="uniqueID__"+t++)}}();!function(){var t={};r=function(e){return t[e]},n=function(e,i){t[e]=i}}();var a,h,c=t(fabric.document.documentElement,"addEventListener","removeEventListener")&&t(fabric.window,"addEventListener","removeEventListener"),l=t(fabric.document.documentElement,"attachEvent","detachEvent")&&t(fabric.window,"attachEvent","detachEvent"),u={},f={};c?(a=function(t,e,i,r){t&&t.addEventListener(e,i,!l&&r)},h=function(t,e,i,r){t&&t.removeEventListener(e,i,!l&&r)}):l?(a=function(t,i,r){if(t){var s=o(t);n(s,t),u[s]||(u[s]={}),u[s][i]||(u[s][i]=[]);var a=e(s,r);u[s][i].push(a),t.attachEvent("on"+i,a.wrappedHandler)}},h=function(t,e,i){if(t){var r,n=o(t);if(u[n]&&u[n][e])for(var s=0,a=u[n][e].length;s<a;s++)(r=u[n][e][s])&&r.handler===i&&(t.detachEvent("on"+e,r.wrappedHandler),u[n][e][s]=null)}}):(a=function(t,e,i){if(t){var r=o(t);if(f[r]||(f[r]={}),!f[r][e]){f[r][e]=[];var n=t["on"+e];n&&f[r][e].push(n),t["on"+e]=function(t,e){return function(i){if(f[t]&&f[t][e])for(var r=f[t][e],n=0,s=r.length;n<s;n++)r[n].call(this,i||fabric.window.event)}}(r,e)}f[r][e].push(i)}},h=function(t,e,i){if(t){var r=o(t);if(f[r]&&f[r][e])for(var n=f[r][e],s=0,a=n.length;s<a;s++)n[s]===i&&n.splice(s,1)}}),fabric.util.addListener=a,fabric.util.removeListener=h;var d=function(t){return t.clientX},g=function(t){return t.clientY};fabric.isTouchSupported&&(d=function(t){return i(t,"pageX","clientX")},g=function(t){return i(t,"pageY","clientY")}),fabric.util.getPointer=function(t){t||(t=fabric.window.event);var e=t.target||(typeof t.srcElement!==s?t.srcElement:null),i=fabric.util.getScrollLeftTop(e);return{x:d(t)+i.left,y:g(t)+i.top}}}(),function(){var t=fabric.document.createElement("div"),e="string"==typeof t.style.opacity,i="string"==typeof t.style.filter,r=/alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/,n=function(t){return t};e?n=function(t,e){return t.style.opacity=e,t}:i&&(n=function(t,e){var i=t.style;return t.currentStyle&&!t.currentStyle.hasLayout&&(i.zoom=1),r.test(i.filter)?(e=e>=.9999?"":"alpha(opacity="+100*e+")",i.filter=i.filter.replace(r,e)):i.filter+=" alpha(opacity="+100*e+")",t}),fabric.util.setStyle=function(t,e){var i=t.style;if(!i)return t;if("string"==typeof e)return t.style.cssText+=";"+e,e.indexOf("opacity")>-1?n(t,e.match(/opacity:\s*(\d?\.?\d*)/)[1]):t;for(var r in e)"opacity"===r?n(t,e[r]):i["float"===r||"cssFloat"===r?void 0===i.styleFloat?"cssFloat":"styleFloat":r]=e[r];return t}}(),function(){function t(t,e){var i=fabric.document.createElement(t);for(var r in e)"class"===r?i.className=e[r]:"for"===r?i.htmlFor=e[r]:i.setAttribute(r,e[r]);return i}function e(t){for(var e=0,i=0,r=fabric.document.documentElement,n=fabric.document.body||{scrollLeft:0,scrollTop:0};t&&(t.parentNode||t.host)&&((t=t.parentNode||t.host)===fabric.document?(e=n.scrollLeft||r.scrollLeft||0,i=n.scrollTop||r.scrollTop||0):(e+=t.scrollLeft||0,i+=t.scrollTop||0),1!==t.nodeType||"fixed"!==t.style.position););return{left:e,top:i}}var i,r=Array.prototype.slice,n=function(t){return r.call(t,0)};try{i=n(fabric.document.childNodes)instanceof Array}catch(t){}i||(n=function(t){for(var e=new Array(t.length),i=t.length;i--;)e[i]=t[i];return e});var s;s=fabric.document.defaultView&&fabric.document.defaultView.getComputedStyle?function(t,e){var i=fabric.document.defaultView.getComputedStyle(t,null);return i?i[e]:void 0}:function(t,e){var i=t.style[e];return!i&&t.currentStyle&&(i=t.currentStyle[e]),i},function(){var t=fabric.document.documentElement.style,e="userSelect"in t?"userSelect":"MozUserSelect"in t?"MozUserSelect":"WebkitUserSelect"in t?"WebkitUserSelect":"KhtmlUserSelect"in t?"KhtmlUserSelect":"";fabric.util.makeElementUnselectable=function(t){return void 0!==t.onselectstart&&(t.onselectstart=fabric.util.falseFunction),e?t.style[e]="none":"string"==typeof t.unselectable&&(t.unselectable="on"),t},fabric.util.makeElementSelectable=function(t){return void 0!==t.onselectstart&&(t.onselectstart=null),e?t.style[e]="":"string"==typeof t.unselectable&&(t.unselectable=""),t}}(),function(){fabric.util.getScript=function(t,e){var i=fabric.document.getElementsByTagName("head")[0],r=fabric.document.createElement("script"),n=!0;r.onload=r.onreadystatechange=function(t){if(n){if("string"==typeof this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState)return;n=!1,e(t||fabric.window.event),r=r.onload=r.onreadystatechange=null}},r.src=t,i.appendChild(r)}}(),fabric.util.getById=function(t){return"string"==typeof t?fabric.document.getElementById(t):t},fabric.util.toArray=n,fabric.util.makeElement=t,fabric.util.addClass=function(t,e){t&&-1===(" "+t.className+" ").indexOf(" "+e+" ")&&(t.className+=(t.className?" ":"")+e)},fabric.util.wrapElement=function(e,i,r){return"string"==typeof i&&(i=t(i,r)),e.parentNode&&e.parentNode.replaceChild(i,e),i.appendChild(e),i},fabric.util.getScrollLeftTop=e,fabric.util.getElementOffset=function(t){var i,r,n=t&&t.ownerDocument,o={left:0,top:0},a={left:0,top:0},h={borderLeftWidth:"left",borderTopWidth:"top",paddingLeft:"left",paddingTop:"top"};if(!n)return a;for(var c in h)a[h[c]]+=parseInt(s(t,c),10)||0;return i=n.documentElement,void 0!==t.getBoundingClientRect&&(o=t.getBoundingClientRect()),r=e(t),{left:o.left+r.left-(i.clientLeft||0)+a.left,top:o.top+r.top-(i.clientTop||0)+a.top}},fabric.util.getElementStyle=s,fabric.util.getNodeCanvas=function(t){var e=fabric.jsdomImplForWrapper(t);return e._canvas||e._image}}(),function(){function t(){}var e=function(){for(var t=[function(){return new ActiveXObject("Microsoft.XMLHTTP")},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml2.XMLHTTP.3.0")},function(){return new XMLHttpRequest}],e=t.length;e--;)try{if(t[e]())return t[e]}catch(t){}}();fabric.util.request=function(i,r){r||(r={});var n=r.method?r.method.toUpperCase():"GET",s=r.onComplete||function(){},o=e(),a=r.body||r.parameters;return o.onreadystatechange=function(){4===o.readyState&&(s(o),o.onreadystatechange=t)},"GET"===n&&(a=null,"string"==typeof r.parameters&&(i=function(t,e){return t+(/\?/.test(t)?"&":"?")+e}(i,r.parameters))),o.open(n,i,!0),"POST"!==n&&"PUT"!==n||o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.send(a),o}}(),fabric.log=function(){},fabric.warn=function(){},"undefined"!=typeof console&&["log","warn"].forEach(function(t){void 0!==console[t]&&"function"==typeof console[t].apply&&(fabric[t]=function(){return console[t].apply(console,arguments)})}),function(){function t(){return!1}function e(){return i.apply(fabric.window,arguments)}var i=fabric.window.requestAnimationFrame||fabric.window.webkitRequestAnimationFrame||fabric.window.mozRequestAnimationFrame||fabric.window.oRequestAnimationFrame||fabric.window.msRequestAnimationFrame||function(t){return fabric.window.setTimeout(t,1e3/60)},r=fabric.window.cancelAnimationFrame||fabric.window.clearTimeout;fabric.util.animate=function(i){e(function(r){i||(i={});var n,s=r||+new Date,o=i.duration||500,a=s+o,h=i.onChange||t,c=i.abort||t,l=i.onComplete||t,u=i.easing||function(t,e,i,r){return-i*Math.cos(t/r*(Math.PI/2))+i+e},f="startValue"in i?i.startValue:0,d="endValue"in i?i.endValue:100,g=i.byValue||d-f;i.onStart&&i.onStart(),function t(r){if(c())l(d,1,1);else{var p=(n=r||+new Date)>a?o:n-s,v=p/o,m=u(p,f,g,o),b=Math.abs((m-f)/g);h(m,b,v),n>a?i.onComplete&&i.onComplete():e(t)}}(s)})},fabric.util.requestAnimFrame=e,fabric.util.cancelAnimFrame=function(){return r.apply(fabric.window,arguments)}}(),function(){fabric.util.animateColor=function(t,e,i,r){var n=new fabric.Color(t).getSource(),s=new fabric.Color(e).getSource();r=r||{},fabric.util.animate(fabric.util.object.extend(r,{duration:i||500,startValue:n,endValue:s,byValue:s,easing:function(t,e,i,n){return function(t,e,i){var r="rgba("+parseInt(t[0]+i*(e[0]-t[0]),10)+","+parseInt(t[1]+i*(e[1]-t[1]),10)+","+parseInt(t[2]+i*(e[2]-t[2]),10);return r+=","+(t&&e?parseFloat(t[3]+i*(e[3]-t[3])):1),r+=")"}(e,i,r.colorEasing?r.colorEasing(t,n):1-Math.cos(t/n*(Math.PI/2)))}}))}}(),function(){function t(t,e,i,r){return t<Math.abs(e)?(t=e,r=i/4):r=0===e&&0===t?i/(2*Math.PI)*Math.asin(1):i/(2*Math.PI)*Math.asin(e/t),{a:t,c:e,p:i,s:r}}function e(t,e,i){return t.a*Math.pow(2,10*(e-=1))*Math.sin((e*i-t.s)*(2*Math.PI)/t.p)}function i(t,e,i,n){return i-r(n-t,0,i,n)+e}function r(t,e,i,r){return(t/=r)<1/2.75?i*(7.5625*t*t)+e:t<2/2.75?i*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?i*(7.5625*(t-=2.25/2.75)*t+.9375)+e:i*(7.5625*(t-=2.625/2.75)*t+.984375)+e}fabric.util.ease={easeInQuad:function(t,e,i,r){return i*(t/=r)*t+e},easeOutQuad:function(t,e,i,r){return-i*(t/=r)*(t-2)+e},easeInOutQuad:function(t,e,i,r){return(t/=r/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,i,r){return i*(t/=r)*t*t+e},easeOutCubic:function(t,e,i,r){return i*((t=t/r-1)*t*t+1)+e},easeInOutCubic:function(t,e,i,r){return(t/=r/2)<1?i/2*t*t*t+e:i/2*((t-=2)*t*t+2)+e},easeInQuart:function(t,e,i,r){return i*(t/=r)*t*t*t+e},easeOutQuart:function(t,e,i,r){return-i*((t=t/r-1)*t*t*t-1)+e},easeInOutQuart:function(t,e,i,r){return(t/=r/2)<1?i/2*t*t*t*t+e:-i/2*((t-=2)*t*t*t-2)+e},easeInQuint:function(t,e,i,r){return i*(t/=r)*t*t*t*t+e},easeOutQuint:function(t,e,i,r){return i*((t=t/r-1)*t*t*t*t+1)+e},easeInOutQuint:function(t,e,i,r){return(t/=r/2)<1?i/2*t*t*t*t*t+e:i/2*((t-=2)*t*t*t*t+2)+e},easeInSine:function(t,e,i,r){return-i*Math.cos(t/r*(Math.PI/2))+i+e},easeOutSine:function(t,e,i,r){return i*Math.sin(t/r*(Math.PI/2))+e},easeInOutSine:function(t,e,i,r){return-i/2*(Math.cos(Math.PI*t/r)-1)+e},easeInExpo:function(t,e,i,r){return 0===t?e:i*Math.pow(2,10*(t/r-1))+e},easeOutExpo:function(t,e,i,r){return t===r?e+i:i*(1-Math.pow(2,-10*t/r))+e},easeInOutExpo:function(t,e,i,r){return 0===t?e:t===r?e+i:(t/=r/2)<1?i/2*Math.pow(2,10*(t-1))+e:i/2*(2-Math.pow(2,-10*--t))+e},easeInCirc:function(t,e,i,r){return-i*(Math.sqrt(1-(t/=r)*t)-1)+e},easeOutCirc:function(t,e,i,r){return i*Math.sqrt(1-(t=t/r-1)*t)+e},easeInOutCirc:function(t,e,i,r){return(t/=r/2)<1?-i/2*(Math.sqrt(1-t*t)-1)+e:i/2*(Math.sqrt(1-(t-=2)*t)+1)+e},easeInElastic:function(i,r,n,s){var o=0;return 0===i?r:1==(i/=s)?r+n:(o||(o=.3*s),-e(t(n,n,o,1.70158),i,s)+r)},easeOutElastic:function(e,i,r,n){var s=0,o=r;if(0===e)return i;if(1==(e/=n))return i+r;s||(s=.3*n);var a=t(o,r,s,1.70158);return a.a*Math.pow(2,-10*e)*Math.sin((e*n-a.s)*(2*Math.PI)/a.p)+a.c+i},easeInOutElastic:function(i,r,n,s){var o=0,a=n;if(0===i)return r;if(2==(i/=s/2))return r+n;o||(o=s*(.3*1.5));var h=t(a,n,o,1.70158);return i<1?-.5*e(h,i,s)+r:h.a*Math.pow(2,-10*(i-=1))*Math.sin((i*s-h.s)*(2*Math.PI)/h.p)*.5+h.c+r},easeInBack:function(t,e,i,r,n){return void 0===n&&(n=1.70158),i*(t/=r)*t*((n+1)*t-n)+e},easeOutBack:function(t,e,i,r,n){return void 0===n&&(n=1.70158),i*((t=t/r-1)*t*((n+1)*t+n)+1)+e},easeInOutBack:function(t,e,i,r,n){return void 0===n&&(n=1.70158),(t/=r/2)<1?i/2*(t*t*((1+(n*=1.525))*t-n))+e:i/2*((t-=2)*t*((1+(n*=1.525))*t+n)+2)+e},easeInBounce:i,easeOutBounce:r,easeInOutBounce:function(t,e,n,s){return t<s/2?.5*i(2*t,0,n,s)+e:.5*r(2*t-s,0,n,s)+.5*n+e}}}(),function(t){"use strict";function e(t){return t in p?p[t]:t}function i(t,e,i,r){var n,s="[object Array]"===Object.prototype.toString.call(e);if("fill"!==t&&"stroke"!==t||"none"!==e)if("strokeDashArray"===t)e="none"===e?null:e.replace(/,/g," ").split(/\s+/).map(function(t){return parseFloat(t)});else if("transformMatrix"===t)e=i&&i.transformMatrix?g(i.transformMatrix,c.parseTransformAttribute(e)):c.parseTransformAttribute(e);else if("visible"===t)e="none"!==e&&"hidden"!==e,i&&!1===i.visible&&(e=!1);else if("opacity"===t)e=parseFloat(e),i&&void 0!==i.opacity&&(e*=i.opacity);else if("textAnchor"===t)e="start"===e?"left":"end"===e?"right":"center";else if("paintFirst"===t){var o=e.indexOf("fill"),a=e.indexOf("stroke"),e="fill";o>-1&&a>-1&&a<o?e="stroke":-1===o&&a>-1&&(e="stroke")}else n=s?e.map(d):d(e,r);else e="";return!s&&isNaN(n)?e:n}function r(t){return new RegExp("^("+t.join("|")+")\\b","i")}function n(t,e){var i,r,n,s,o=[];for(n=0,s=e.length;n<s;n++)i=e[n],r=t.getElementsByTagName(i),o=o.concat(Array.prototype.slice.call(r));return o}function s(t,e){var i={};for(var r in c.cssRules[e])if(function(t,e){var i,r=!0;(i=o(t,e.pop()))&&e.length&&(r=function(t,e){var i,r=!0;for(;t.parentNode&&1===t.parentNode.nodeType&&e.length;)r&&(i=e.pop()),t=t.parentNode,r=o(t,i);return 0===e.length}(t,e));return i&&r&&0===e.length}(t,r.split(" ")))for(var n in c.cssRules[e][r])i[n]=c.cssRules[e][r][n];return i}function o(t,e){var i,r,n=t.nodeName,s=t.getAttribute("class"),o=t.getAttribute("id");if(i=new RegExp("^"+n,"i"),e=e.replace(i,""),o&&e.length&&(i=new RegExp("#"+o+"(?![a-zA-Z\\-]+)","i"),e=e.replace(i,"")),s&&e.length)for(r=(s=s.split(" ")).length;r--;)i=new RegExp("\\."+s[r]+"(?![a-zA-Z\\-]+)","i"),e=e.replace(i,"");return 0===e.length}function a(t,e){var i;if(t.getElementById&&(i=t.getElementById(e)),i)return i;var r,n,s,o=t.getElementsByTagName("*");for(n=0,s=o.length;n<s;n++)if(r=o[n],e===r.getAttribute("id"))return r}function h(t){var e,i,r,n,s=t.getAttribute("viewBox"),o=1,a=1,h=0,l=0,u=t.getAttribute("width"),f=t.getAttribute("height"),g=t.getAttribute("x")||0,p=t.getAttribute("y")||0,v=t.getAttribute("preserveAspectRatio")||"",b=!s||!c.svgViewBoxElementsRegEx.test(t.nodeName)||!(s=s.match(m)),_=!u||!f||"100%"===u||"100%"===f,y=b&&_,x={},C="";if(x.width=0,x.height=0,x.toBeParsed=y,y)return x;if(b)return x.width=d(u),x.height=d(f),x;if(h=-parseFloat(s[1]),l=-parseFloat(s[2]),e=parseFloat(s[3]),i=parseFloat(s[4]),_?(x.width=e,x.height=i):(x.width=d(u),x.height=d(f),o=x.width/e,a=x.height/i),"none"!==(v=c.util.parsePreserveAspectRatioAttribute(v)).alignX&&(a=o=o>a?a:o),1===o&&1===a&&0===h&&0===l&&0===g&&0===p)return x;if((g||p)&&(C=" translate("+d(g)+" "+d(p)+") "),r=C+" matrix("+o+" 0 0 "+a+" "+h*o+" "+l*a+") ","svg"===t.nodeName){for(n=t.ownerDocument.createElement("g");t.firstChild;)n.appendChild(t.firstChild);t.appendChild(n)}else r=(n=t).getAttribute("transform")+r;return n.setAttribute("transform",r),x}var c=t.fabric||(t.fabric={}),l=c.util.object.extend,u=c.util.object.clone,f=c.util.toFixed,d=c.util.parseUnit,g=c.util.multiplyTransformMatrices,p={cx:"left",x:"left",r:"radius",cy:"top",y:"top",display:"visible",visibility:"visible",transform:"transformMatrix","fill-opacity":"fillOpacity","fill-rule":"fillRule","font-family":"fontFamily","font-size":"fontSize","font-style":"fontStyle","font-weight":"fontWeight","paint-order":"paintFirst","stroke-dasharray":"strokeDashArray","stroke-linecap":"strokeLineCap","stroke-linejoin":"strokeLineJoin","stroke-miterlimit":"strokeMiterLimit","stroke-opacity":"strokeOpacity","stroke-width":"strokeWidth","text-decoration":"textDecoration","text-anchor":"textAnchor",opacity:"opacity"},v={stroke:"strokeOpacity",fill:"fillOpacity"};c.svgValidTagNamesRegEx=r(["path","circle","polygon","polyline","ellipse","rect","line","image","text","linearGradient","radialGradient","stop"]),c.svgViewBoxElementsRegEx=r(["symbol","image","marker","pattern","view","svg"]),c.svgInvalidAncestorsRegEx=r(["pattern","defs","symbol","metadata","clipPath","mask","desc"]),c.svgValidParentsRegEx=r(["symbol","g","a","svg"]),c.cssRules={},c.gradientDefs={},c.parseTransformAttribute=function(){function t(t,e,i){t[i]=Math.tan(c.util.degreesToRadians(e[0]))}var e=[1,0,0,1,0,0],i=c.reNum,r="(?:\\s+,?\\s*|,\\s*)",n="(?:"+("(?:(matrix)\\s*\\(\\s*("+i+")"+r+"("+i+")"+r+"("+i+")"+r+"("+i+")"+r+"("+i+")"+r+"("+i+")\\s*\\))")+"|"+("(?:(translate)\\s*\\(\\s*("+i+")(?:"+r+"("+i+"))?\\s*\\))")+"|"+("(?:(scale)\\s*\\(\\s*("+i+")(?:"+r+"("+i+"))?\\s*\\))")+"|"+("(?:(rotate)\\s*\\(\\s*("+i+")(?:"+r+"("+i+")"+r+"("+i+"))?\\s*\\))")+"|"+("(?:(skewX)\\s*\\(\\s*("+i+")\\s*\\))")+"|"+("(?:(skewY)\\s*\\(\\s*("+i+")\\s*\\))")+")",s="^\\s*(?:"+("(?:"+n+"(?:"+r+"*"+n+")*)")+"?)\\s*$",o=new RegExp(s),a=new RegExp(n,"g");return function(i){var r=e.concat(),s=[];if(!i||i&&!o.test(i))return r;i.replace(a,function(i){var o=new RegExp(n).exec(i).filter(function(t){return!!t}),a=o[1],h=o.slice(2).map(parseFloat);switch(a){case"translate":!function(t,e){t[4]=e[0],2===e.length&&(t[5]=e[1])}(r,h);break;case"rotate":h[0]=c.util.degreesToRadians(h[0]),function(t,e){var i=c.util.cos(e[0]),r=c.util.sin(e[0]),n=0,s=0;3===e.length&&(n=e[1],s=e[2]),t[0]=i,t[1]=r,t[2]=-r,t[3]=i,t[4]=n-(i*n-r*s),t[5]=s-(r*n+i*s)}(r,h);break;case"scale":!function(t,e){var i=e[0],r=2===e.length?e[1]:e[0];t[0]=i,t[3]=r}(r,h);break;case"skewX":t(r,h,2);break;case"skewY":t(r,h,1);break;case"matrix":r=h}s.push(r.concat()),r=e.concat()});for(var h=s[0];s.length>1;)s.shift(),h=c.util.multiplyTransformMatrices(h,s[0]);return h}}();var m=new RegExp("^\\s*("+c.reNum+"+)\\s*,?\\s*("+c.reNum+"+)\\s*,?\\s*("+c.reNum+"+)\\s*,?\\s*("+c.reNum+"+)\\s*$");c.parseSVGDocument=function(t,e,i,r){if(t){!function(t){for(var e=n(t,["use","svg:use"]),i=0;e.length&&i<e.length;){var r,s,o,c,l=e[i],u=l.getAttribute("xlink:href").substr(1),f=l.getAttribute("x")||0,d=l.getAttribute("y")||0,g=a(t,u).cloneNode(!0),p=(g.getAttribute("transform")||"")+" translate("+f+", "+d+")",v=e.length;if(h(g),/^svg$/i.test(g.nodeName)){var m=g.ownerDocument.createElement("g");for(s=0,c=(o=g.attributes).length;s<c;s++)r=o.item(s),m.setAttribute(r.nodeName,r.nodeValue);for(;g.firstChild;)m.appendChild(g.firstChild);g=m}for(s=0,c=(o=l.attributes).length;s<c;s++)"x"!==(r=o.item(s)).nodeName&&"y"!==r.nodeName&&"xlink:href"!==r.nodeName&&("transform"===r.nodeName?p=r.nodeValue+" "+p:g.setAttribute(r.nodeName,r.nodeValue));g.setAttribute("transform",p),g.setAttribute("instantiated_by_use","1"),g.removeAttribute("id"),l.parentNode.replaceChild(g,l),e.length===v&&i++}}(t);var s,o,l=c.Object.__uid++,f=h(t),d=c.util.toArray(t.getElementsByTagName("*"));if(f.crossOrigin=r&&r.crossOrigin,f.svgUid=l,0===d.length&&c.isLikelyNode){var g=[];for(s=0,o=(d=t.selectNodes('//*[name(.)!="svg"]')).length;s<o;s++)g[s]=d[s];d=g}var p=d.filter(function(t){return h(t),c.svgValidTagNamesRegEx.test(t.nodeName.replace("svg:",""))&&!function(t,e){for(;t&&(t=t.parentNode);)if(t.nodeName&&e.test(t.nodeName.replace("svg:",""))&&!t.getAttribute("instantiated_by_use"))return!0;return!1}(t,c.svgInvalidAncestorsRegEx)});!p||p&&!p.length?e&&e([],{}):(c.gradientDefs[l]=c.getGradientDefs(t),c.cssRules[l]=c.getCSSRules(t),c.parseElements(p,function(t,i){e&&e(t,f,i,d)},u(f),i,r))}};var b=new RegExp("(normal|italic)?\\s*(normal|small-caps)?\\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*("+c.reNum+"(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|"+c.reNum+"))?\\s+(.*)");l(c,{parseFontDeclaration:function(t,e){var i=t.match(b);if(i){var r=i[1],n=i[3],s=i[4],o=i[5],a=i[6];r&&(e.fontStyle=r),n&&(e.fontWeight=isNaN(parseFloat(n))?n:parseFloat(n)),s&&(e.fontSize=d(s)),a&&(e.fontFamily=a),o&&(e.lineHeight="normal"===o?1:o)}},getGradientDefs:function(t){var e,i,r,s=n(t,["linearGradient","radialGradient","svg:linearGradient","svg:radialGradient"]),o=0,a={},h={};for(o=s.length;o--;)r=(e=s[o]).getAttribute("xlink:href"),i=e.getAttribute("id"),r&&(h[i]=r.substr(1)),a[i]=e;for(i in h){var c=a[h[i]].cloneNode(!0);for(e=a[i];c.firstChild;)e.appendChild(c.firstChild)}return a},parseAttributes:function(t,r,n){if(t){var o,a,h={};void 0===n&&(n=t.getAttribute("svgUid")),t.parentNode&&c.svgValidParentsRegEx.test(t.parentNode.nodeName)&&(h=c.parseAttributes(t.parentNode,r,n)),a=h&&h.fontSize||t.getAttribute("font-size")||c.Text.DEFAULT_SVG_FONT_SIZE;var u=r.reduce(function(e,i){return(o=t.getAttribute(i))&&(e[i]=o),e},{});u=l(u,l(s(t,n),c.parseStyleAttribute(t)));var d,g,p={};for(var m in u)g=i(d=e(m),u[m],h,a),p[d]=g;p&&p.font&&c.parseFontDeclaration(p.font,p);var b=l(h,p);return c.svgValidParentsRegEx.test(t.nodeName)?b:function(t){for(var e in v)if(void 0!==t[v[e]]&&""!==t[e]){if(void 0===t[e]){if(!c.Object.prototype[e])continue;t[e]=c.Object.prototype[e]}if(0!==t[e].indexOf("url(")){var i=new c.Color(t[e]);t[e]=i.setAlpha(f(i.getAlpha()*t[v[e]],2)).toRgba()}}return t}(b)}},parseElements:function(t,e,i,r,n){new c.ElementsParser(t,e,i,r,n).parse()},parseStyleAttribute:function(t){var e={},i=t.getAttribute("style");return i?("string"==typeof i?function(t,e){var i,r;t.replace(/;\s*$/,"").split(";").forEach(function(t){var n=t.split(":");i=n[0].trim().toLowerCase(),r=n[1].trim(),e[i]=r})}(i,e):function(t,e){var i,r;for(var n in t)void 0!==t[n]&&(i=n.toLowerCase(),r=t[n],e[i]=r)}(i,e),e):e},parsePointsAttribute:function(t){if(!t)return null;var e,i,r=[];for(e=0,i=(t=(t=t.replace(/,/g," ").trim()).split(/\s+/)).length;e<i;e+=2)r.push({x:parseFloat(t[e]),y:parseFloat(t[e+1])});return r},getCSSRules:function(t){var e,i,r=t.getElementsByTagName("style"),n={};for(e=0,i=r.length;e<i;e++){var s=r[e].textContent||r[e].text;""!==(s=s.replace(/\/\*[\s\S]*?\*\//g,"")).trim()&&s.match(/[^{]*\{[\s\S]*?\}/g).map(function(t){return t.trim()}).forEach(function(t){var r=t.match(/([\s\S]*?)\s*\{([^}]*)\}/),s={},o=r[2].trim().replace(/;$/,"").split(/\s*;\s*/);for(e=0,i=o.length;e<i;e++){var a=o[e].split(/\s*:\s*/),h=a[0],l=a[1];s[h]=l}(t=r[1]).split(",").forEach(function(t){""!==(t=t.replace(/^svg/i,"").trim())&&(n[t]?c.util.object.extend(n[t],s):n[t]=c.util.object.clone(s))})})}return n},loadSVGFromURL:function(t,e,i,r){t=t.replace(/^\n\s*/,"").trim(),new c.util.request(t,{method:"get",onComplete:function(t){var n=t.responseXML;n&&!n.documentElement&&c.window.ActiveXObject&&t.responseText&&((n=new ActiveXObject("Microsoft.XMLDOM")).async="false",n.loadXML(t.responseText.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i,""))),n&&n.documentElement||e&&e(null),c.parseSVGDocument(n.documentElement,function(t,i,r,n){e&&e(t,i,r,n)},i,r)}})},loadSVGFromString:function(t,e,i,r){t=t.trim();var n;if("undefined"!=typeof DOMParser){var s=new DOMParser;s&&s.parseFromString&&(n=s.parseFromString(t,"text/xml"))}else c.window.ActiveXObject&&((n=new ActiveXObject("Microsoft.XMLDOM")).async="false",n.loadXML(t.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i,"")));c.parseSVGDocument(n.documentElement,function(t,i,r,n){e(t,i,r,n)},i,r)}})}("undefined"!=typeof exports?exports:this),fabric.ElementsParser=function(t,e,i,r,n){this.elements=t,this.callback=e,this.options=i,this.reviver=r,this.svgUid=i&&i.svgUid||0,this.parsingOptions=n},fabric.ElementsParser.prototype.parse=function(){this.instances=new Array(this.elements.length),this.numElements=this.elements.length,this.createObjects()},fabric.ElementsParser.prototype.createObjects=function(){for(var t=0,e=this.elements.length;t<e;t++)this.elements[t].setAttribute("svgUid",this.svgUid),function(t,e){setTimeout(function(){t.createObject(t.elements[e],e)},0)}(this,t)},fabric.ElementsParser.prototype.createObject=function(t,e){var i=fabric[fabric.util.string.capitalize(t.tagName.replace("svg:",""))];if(i&&i.fromElement)try{this._createObject(i,t,e)}catch(t){fabric.log(t)}else this.checkIfDone()},fabric.ElementsParser.prototype._createObject=function(t,e,i){t.fromElement(e,this.createCallback(i,e),this.options)},fabric.ElementsParser.prototype.createCallback=function(t,e){var i=this;return function(r){var n;i.resolveGradient(r,"fill"),i.resolveGradient(r,"stroke"),r instanceof fabric.Image&&(n=r.parsePreserveAspectRatioAttribute(e)),r._removeTransformMatrix(n),i.reviver&&i.reviver(e,r),i.instances[t]=r,i.checkIfDone()}},fabric.ElementsParser.prototype.resolveGradient=function(t,e){var i=t.get(e);if(/^url\(/.test(i)){var r=i.slice(5,i.length-1);fabric.gradientDefs[this.svgUid][r]&&t.set(e,fabric.Gradient.fromElement(fabric.gradientDefs[this.svgUid][r],t))}},fabric.ElementsParser.prototype.checkIfDone=function(){0==--this.numElements&&(this.instances=this.instances.filter(function(t){return null!=t}),this.callback(this.instances,this.elements))},function(t){"use strict";function e(t,e){this.x=t,this.y=e}var i=t.fabric||(t.fabric={});i.Point?i.warn("fabric.Point is already defined"):(i.Point=e,e.prototype={type:"point",constructor:e,add:function(t){return new e(this.x+t.x,this.y+t.y)},addEquals:function(t){return this.x+=t.x,this.y+=t.y,this},scalarAdd:function(t){return new e(this.x+t,this.y+t)},scalarAddEquals:function(t){return this.x+=t,this.y+=t,this},subtract:function(t){return new e(this.x-t.x,this.y-t.y)},subtractEquals:function(t){return this.x-=t.x,this.y-=t.y,this},scalarSubtract:function(t){return new e(this.x-t,this.y-t)},scalarSubtractEquals:function(t){return this.x-=t,this.y-=t,this},multiply:function(t){return new e(this.x*t,this.y*t)},multiplyEquals:function(t){return this.x*=t,this.y*=t,this},divide:function(t){return new e(this.x/t,this.y/t)},divideEquals:function(t){return this.x/=t,this.y/=t,this},eq:function(t){return this.x===t.x&&this.y===t.y},lt:function(t){return this.x<t.x&&this.y<t.y},lte:function(t){return this.x<=t.x&&this.y<=t.y},gt:function(t){return this.x>t.x&&this.y>t.y},gte:function(t){return this.x>=t.x&&this.y>=t.y},lerp:function(t,i){return void 0===i&&(i=.5),i=Math.max(Math.min(1,i),0),new e(this.x+(t.x-this.x)*i,this.y+(t.y-this.y)*i)},distanceFrom:function(t){var e=this.x-t.x,i=this.y-t.y;return Math.sqrt(e*e+i*i)},midPointFrom:function(t){return this.lerp(t)},min:function(t){return new e(Math.min(this.x,t.x),Math.min(this.y,t.y))},max:function(t){return new e(Math.max(this.x,t.x),Math.max(this.y,t.y))},toString:function(){return this.x+","+this.y},setXY:function(t,e){return this.x=t,this.y=e,this},setX:function(t){return this.x=t,this},setY:function(t){return this.y=t,this},setFromPoint:function(t){return this.x=t.x,this.y=t.y,this},swap:function(t){var e=this.x,i=this.y;this.x=t.x,this.y=t.y,t.x=e,t.y=i},clone:function(){return new e(this.x,this.y)}})}("undefined"!=typeof exports?exports:this),function(t){"use strict";function e(t){this.status=t,this.points=[]}var i=t.fabric||(t.fabric={});i.Intersection?i.warn("fabric.Intersection is already defined"):(i.Intersection=e,i.Intersection.prototype={constructor:e,appendPoint:function(t){return this.points.push(t),this},appendPoints:function(t){return this.points=this.points.concat(t),this}},i.Intersection.intersectLineLine=function(t,r,n,s){var o,a=(s.x-n.x)*(t.y-n.y)-(s.y-n.y)*(t.x-n.x),h=(r.x-t.x)*(t.y-n.y)-(r.y-t.y)*(t.x-n.x),c=(s.y-n.y)*(r.x-t.x)-(s.x-n.x)*(r.y-t.y);if(0!==c){var l=a/c,u=h/c;0<=l&&l<=1&&0<=u&&u<=1?(o=new e("Intersection")).appendPoint(new i.Point(t.x+l*(r.x-t.x),t.y+l*(r.y-t.y))):o=new e}else o=new e(0===a||0===h?"Coincident":"Parallel");return o},i.Intersection.intersectLinePolygon=function(t,i,r){var n,s,o,a,h=new e,c=r.length;for(a=0;a<c;a++)n=r[a],s=r[(a+1)%c],o=e.intersectLineLine(t,i,n,s),h.appendPoints(o.points);return h.points.length>0&&(h.status="Intersection"),h},i.Intersection.intersectPolygonPolygon=function(t,i){var r,n=new e,s=t.length;for(r=0;r<s;r++){var o=t[r],a=t[(r+1)%s],h=e.intersectLinePolygon(o,a,i);n.appendPoints(h.points)}return n.points.length>0&&(n.status="Intersection"),n},i.Intersection.intersectPolygonRectangle=function(t,r,n){var s=r.min(n),o=r.max(n),a=new i.Point(o.x,s.y),h=new i.Point(s.x,o.y),c=e.intersectLinePolygon(s,a,t),l=e.intersectLinePolygon(a,o,t),u=e.intersectLinePolygon(o,h,t),f=e.intersectLinePolygon(h,s,t),d=new e;return d.appendPoints(c.points),d.appendPoints(l.points),d.appendPoints(u.points),d.appendPoints(f.points),d.points.length>0&&(d.status="Intersection"),d})}("undefined"!=typeof exports?exports:this),function(t){"use strict";function e(t){t?this._tryParsingColor(t):this.setSource([0,0,0,1])}function i(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+6*(e-t)*i:i<.5?e:i<2/3?t+(e-t)*(2/3-i)*6:t}var r=t.fabric||(t.fabric={});r.Color?r.warn("fabric.Color is already defined."):(r.Color=e,r.Color.prototype={_tryParsingColor:function(t){var i;t in e.colorNameMap&&(t=e.colorNameMap[t]),"transparent"===t&&(i=[255,255,255,0]),i||(i=e.sourceFromHex(t)),i||(i=e.sourceFromRgb(t)),i||(i=e.sourceFromHsl(t)),i||(i=[0,0,0,1]),i&&this.setSource(i)},_rgbToHsl:function(t,e,i){t/=255,e/=255,i/=255;var n,s,o,a=r.util.array.max([t,e,i]),h=r.util.array.min([t,e,i]);if(o=(a+h)/2,a===h)n=s=0;else{var c=a-h;switch(s=o>.5?c/(2-a-h):c/(a+h),a){case t:n=(e-i)/c+(e<i?6:0);break;case e:n=(i-t)/c+2;break;case i:n=(t-e)/c+4}n/=6}return[Math.round(360*n),Math.round(100*s),Math.round(100*o)]},getSource:function(){return this._source},setSource:function(t){this._source=t},toRgb:function(){var t=this.getSource();return"rgb("+t[0]+","+t[1]+","+t[2]+")"},toRgba:function(){var t=this.getSource();return"rgba("+t[0]+","+t[1]+","+t[2]+","+t[3]+")"},toHsl:function(){var t=this.getSource(),e=this._rgbToHsl(t[0],t[1],t[2]);return"hsl("+e[0]+","+e[1]+"%,"+e[2]+"%)"},toHsla:function(){var t=this.getSource(),e=this._rgbToHsl(t[0],t[1],t[2]);return"hsla("+e[0]+","+e[1]+"%,"+e[2]+"%,"+t[3]+")"},toHex:function(){var t,e,i,r=this.getSource();return t=r[0].toString(16),t=1===t.length?"0"+t:t,e=r[1].toString(16),e=1===e.length?"0"+e:e,i=r[2].toString(16),i=1===i.length?"0"+i:i,t.toUpperCase()+e.toUpperCase()+i.toUpperCase()},toHexa:function(){var t,e=this.getSource();return t=Math.round(255*e[3]),t=t.toString(16),t=1===t.length?"0"+t:t,this.toHex()+t.toUpperCase()},getAlpha:function(){return this.getSource()[3]},setAlpha:function(t){var e=this.getSource();return e[3]=t,this.setSource(e),this},toGrayscale:function(){var t=this.getSource(),e=parseInt((.3*t[0]+.59*t[1]+.11*t[2]).toFixed(0),10),i=t[3];return this.setSource([e,e,e,i]),this},toBlackWhite:function(t){var e=this.getSource(),i=(.3*e[0]+.59*e[1]+.11*e[2]).toFixed(0),r=e[3];return t=t||127,i=Number(i)<Number(t)?0:255,this.setSource([i,i,i,r]),this},overlayWith:function(t){t instanceof e||(t=new e(t));var i,r=[],n=this.getAlpha(),s=this.getSource(),o=t.getSource();for(i=0;i<3;i++)r.push(Math.round(.5*s[i]+.5*o[i]));return r[3]=n,this.setSource(r),this}},r.Color.reRGBa=/^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*((?:\d*\.?\d+)?)\s*)?\)$/,r.Color.reHSLa=/^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/,r.Color.reHex=/^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i,r.Color.colorNameMap={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aqua:"#00FFFF",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blue:"#0000FF",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgrey:"#A9A9A9",darkgreen:"#006400",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",fuchsia:"#FF00FF",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",gray:"#808080",grey:"#808080",green:"#008000",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgray:"#D3D3D3",lightgrey:"#D3D3D3",lightgreen:"#90EE90",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",lime:"#00FF00",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",maroon:"#800000",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",navy:"#000080",oldlace:"#FDF5E6",olive:"#808000",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",purple:"#800080",rebeccapurple:"#663399",red:"#FF0000",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",silver:"#C0C0C0",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",teal:"#008080",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",white:"#FFFFFF",whitesmoke:"#F5F5F5",yellow:"#FFFF00",yellowgreen:"#9ACD32"},r.Color.fromRgb=function(t){return e.fromSource(e.sourceFromRgb(t))},r.Color.sourceFromRgb=function(t){var i=t.match(e.reRGBa);if(i){var r=parseInt(i[1],10)/(/%$/.test(i[1])?100:1)*(/%$/.test(i[1])?255:1),n=parseInt(i[2],10)/(/%$/.test(i[2])?100:1)*(/%$/.test(i[2])?255:1),s=parseInt(i[3],10)/(/%$/.test(i[3])?100:1)*(/%$/.test(i[3])?255:1);return[parseInt(r,10),parseInt(n,10),parseInt(s,10),i[4]?parseFloat(i[4]):1]}},r.Color.fromRgba=e.fromRgb,r.Color.fromHsl=function(t){return e.fromSource(e.sourceFromHsl(t))},r.Color.sourceFromHsl=function(t){var r=t.match(e.reHSLa);if(r){var n,s,o,a=(parseFloat(r[1])%360+360)%360/360,h=parseFloat(r[2])/(/%$/.test(r[2])?100:1),c=parseFloat(r[3])/(/%$/.test(r[3])?100:1);if(0===h)n=s=o=c;else{var l=c<=.5?c*(h+1):c+h-c*h,u=2*c-l;n=i(u,l,a+1/3),s=i(u,l,a),o=i(u,l,a-1/3)}return[Math.round(255*n),Math.round(255*s),Math.round(255*o),r[4]?parseFloat(r[4]):1]}},r.Color.fromHsla=e.fromHsl,r.Color.fromHex=function(t){return e.fromSource(e.sourceFromHex(t))},r.Color.sourceFromHex=function(t){if(t.match(e.reHex)){var i=t.slice(t.indexOf("#")+1),r=3===i.length||4===i.length,n=8===i.length||4===i.length,s=r?i.charAt(0)+i.charAt(0):i.substring(0,2),o=r?i.charAt(1)+i.charAt(1):i.substring(2,4),a=r?i.charAt(2)+i.charAt(2):i.substring(4,6),h=n?r?i.charAt(3)+i.charAt(3):i.substring(6,8):"FF";return[parseInt(s,16),parseInt(o,16),parseInt(a,16),parseFloat((parseInt(h,16)/255).toFixed(2))]}},r.Color.fromSource=function(t){var i=new e;return i.setSource(t),i})}("undefined"!=typeof exports?exports:this),function(){function t(t){var e,i,r,n,s=t.getAttribute("style"),o=t.getAttribute("offset")||0;if(o=parseFloat(o)/(/%$/.test(o)?100:1),o=o<0?0:o>1?1:o,s){var a=s.split(/\s*;\s*/);for(""===a[a.length-1]&&a.pop(),n=a.length;n--;){var h=a[n].split(/\s*:\s*/),c=h[0].trim(),l=h[1].trim();"stop-color"===c?e=l:"stop-opacity"===c&&(r=l)}}return e||(e=t.getAttribute("stop-color")||"rgb(0,0,0)"),r||(r=t.getAttribute("stop-opacity")),e=new fabric.Color(e),i=e.getAlpha(),r=isNaN(parseFloat(r))?1:parseFloat(r),r*=i,{offset:o,color:e.toRgb(),opacity:r}}function e(t,e,i){var r,n=0,s=1,o="";for(var a in e)"Infinity"===e[a]?e[a]=1:"-Infinity"===e[a]&&(e[a]=0),r=parseFloat(e[a],10),s="string"==typeof e[a]&&/^(\d+\.\d+)%|(\d+)%$/.test(e[a])?.01:1,"x1"===a||"x2"===a||"r2"===a?(s*="objectBoundingBox"===i?t.width:1,n="objectBoundingBox"===i?t.left||0:0):"y1"!==a&&"y2"!==a||(s*="objectBoundingBox"===i?t.height:1,n="objectBoundingBox"===i?t.top||0:0),e[a]=r*s+n;if("ellipse"===t.type&&null!==e.r2&&"objectBoundingBox"===i&&t.rx!==t.ry){var h=t.ry/t.rx;o=" scale(1, "+h+")",e.y1&&(e.y1/=h),e.y2&&(e.y2/=h)}return o}var i=fabric.util.object.clone;fabric.Gradient=fabric.util.createClass({offsetX:0,offsetY:0,initialize:function(t){t||(t={});var e={};this.id=fabric.Object.__uid++,this.type=t.type||"linear",e={x1:t.coords.x1||0,y1:t.coords.y1||0,x2:t.coords.x2||0,y2:t.coords.y2||0},"radial"===this.type&&(e.r1=t.coords.r1||0,e.r2=t.coords.r2||0),this.coords=e,this.colorStops=t.colorStops.slice(),t.gradientTransform&&(this.gradientTransform=t.gradientTransform),this.offsetX=t.offsetX||this.offsetX,this.offsetY=t.offsetY||this.offsetY},addColorStop:function(t){for(var e in t){var i=new fabric.Color(t[e]);this.colorStops.push({offset:parseFloat(e),color:i.toRgb(),opacity:i.getAlpha()})}return this},toObject:function(t){var e={type:this.type,coords:this.coords,colorStops:this.colorStops,offsetX:this.offsetX,offsetY:this.offsetY,gradientTransform:this.gradientTransform?this.gradientTransform.concat():this.gradientTransform};return fabric.util.populateWithProperties(this,e,t),e},toSVG:function(t){var e,r,n,s,o=i(this.coords,!0),a=i(this.colorStops,!0),h=o.r1>o.r2,c=t.width/2,l=t.height/2;a.sort(function(t,e){return t.offset-e.offset}),"path"===t.type&&(c-=t.pathOffset.x,l-=t.pathOffset.y);for(var u in o)"x1"===u||"x2"===u?o[u]+=this.offsetX-c:"y1"!==u&&"y2"!==u||(o[u]+=this.offsetY-l);if(s='id="SVGID_'+this.id+'" gradientUnits="userSpaceOnUse"',this.gradientTransform&&(s+=' gradientTransform="matrix('+this.gradientTransform.join(" ")+')" '),"linear"===this.type?n=["<linearGradient ",s,' x1="',o.x1,'" y1="',o.y1,'" x2="',o.x2,'" y2="',o.y2,'">\n']:"radial"===this.type&&(n=["<radialGradient ",s,' cx="',h?o.x1:o.x2,'" cy="',h?o.y1:o.y2,'" r="',h?o.r1:o.r2,'" fx="',h?o.x2:o.x1,'" fy="',h?o.y2:o.y1,'">\n']),"radial"===this.type){if(h)for((a=a.concat()).reverse(),e=0,r=a.length;e<r;e++)a[e].offset=1-a[e].offset;var f=Math.min(o.r1,o.r2);if(f>0){var d=f/Math.max(o.r1,o.r2);for(e=0,r=a.length;e<r;e++)a[e].offset+=d*(1-a[e].offset)}}for(e=0,r=a.length;e<r;e++){var g=a[e];n.push("<stop ",'offset="',100*g.offset+"%",'" style="stop-color:',g.color,null!==g.opacity?";stop-opacity: "+g.opacity:";",'"/>\n')}return n.push("linear"===this.type?"</linearGradient>\n":"</radialGradient>\n"),n.join("")},toLive:function(t){var e,i,r,n=fabric.util.object.clone(this.coords);if(this.type){for("linear"===this.type?e=t.createLinearGradient(n.x1,n.y1,n.x2,n.y2):"radial"===this.type&&(e=t.createRadialGradient(n.x1,n.y1,n.r1,n.x2,n.y2,n.r2)),i=0,r=this.colorStops.length;i<r;i++){var s=this.colorStops[i].color,o=this.colorStops[i].opacity,a=this.colorStops[i].offset;void 0!==o&&(s=new fabric.Color(s).setAlpha(o).toRgba()),e.addColorStop(a,s)}return e}}}),fabric.util.object.extend(fabric.Gradient,{fromElement:function(i,r){var n,s,o,a,h=i.getElementsByTagName("stop"),c=i.getAttribute("gradientUnits")||"objectBoundingBox",l=i.getAttribute("gradientTransform"),u=[];for("linear"===(n="linearGradient"===i.nodeName||"LINEARGRADIENT"===i.nodeName?"linear":"radial")?s=function(t){return{x1:t.getAttribute("x1")||0,y1:t.getAttribute("y1")||0,x2:t.getAttribute("x2")||"100%",y2:t.getAttribute("y2")||0}}(i):"radial"===n&&(s=function(t){return{x1:t.getAttribute("fx")||t.getAttribute("cx")||"50%",y1:t.getAttribute("fy")||t.getAttribute("cy")||"50%",r1:0,x2:t.getAttribute("cx")||"50%",y2:t.getAttribute("cy")||"50%",r2:t.getAttribute("r")||"50%"}}(i)),a=h.length;a--;)u.push(t(h[a]));o=e(r,s,c);var f=new fabric.Gradient({type:n,coords:s,colorStops:u,offsetX:-r.left,offsetY:-r.top});return(l||""!==o)&&(f.gradientTransform=fabric.parseTransformAttribute((l||"")+o)),f},forObject:function(t,i){return i||(i={}),e(t,i.coords,"userSpaceOnUse"),new fabric.Gradient(i)}})}(),function(){"use strict";var t=fabric.util.toFixed;fabric.Pattern=fabric.util.createClass({repeat:"repeat",offsetX:0,offsetY:0,crossOrigin:"",patternTransform:null,initialize:function(t,e){if(t||(t={}),this.id=fabric.Object.__uid++,this.setOptions(t),!t.source||t.source&&"string"!=typeof t.source)e&&e(this);else if(void 0!==fabric.util.getFunctionBody(t.source))this.source=new Function(fabric.util.getFunctionBody(t.source)),e&&e(this);else{var i=this;this.source=fabric.util.createImage(),fabric.util.loadImage(t.source,function(t){i.source=t,e&&e(i)},null,this.crossOrigin)}},toObject:function(e){var i,r,n=fabric.Object.NUM_FRACTION_DIGITS;return"function"==typeof this.source?i=String(this.source):"string"==typeof this.source.src?i=this.source.src:"object"==typeof this.source&&this.source.toDataURL&&(i=this.source.toDataURL()),r={type:"pattern",source:i,repeat:this.repeat,crossOrigin:this.crossOrigin,offsetX:t(this.offsetX,n),offsetY:t(this.offsetY,n),patternTransform:this.patternTransform?this.patternTransform.concat():null},fabric.util.populateWithProperties(this,r,e),r},toSVG:function(t){var e="function"==typeof this.source?this.source():this.source,i=e.width/t.width,r=e.height/t.height,n=this.offsetX/t.width,s=this.offsetY/t.height,o="";return"repeat-x"!==this.repeat&&"no-repeat"!==this.repeat||(r=1),"repeat-y"!==this.repeat&&"no-repeat"!==this.repeat||(i=1),e.src?o=e.src:e.toDataURL&&(o=e.toDataURL()),'<pattern id="SVGID_'+this.id+'" x="'+n+'" y="'+s+'" width="'+i+'" height="'+r+'">\n<image x="0" y="0" width="'+e.width+'" height="'+e.height+'" xlink:href="'+o+'"></image>\n</pattern>\n'},setOptions:function(t){for(var e in t)this[e]=t[e]},toLive:function(t){var e="function"==typeof this.source?this.source():this.source;if(!e)return"";if(void 0!==e.src){if(!e.complete)return"";if(0===e.naturalWidth||0===e.naturalHeight)return""}return t.createPattern(e,this.repeat)}})}(),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.toFixed;e.Shadow?e.warn("fabric.Shadow is already defined."):(e.Shadow=e.util.createClass({color:"rgb(0,0,0)",blur:0,offsetX:0,offsetY:0,affectStroke:!1,includeDefaultValues:!0,initialize:function(t){"string"==typeof t&&(t=this._parseShadow(t));for(var i in t)this[i]=t[i];this.id=e.Object.__uid++},_parseShadow:function(t){var i=t.trim(),r=e.Shadow.reOffsetsAndBlur.exec(i)||[];return{color:(i.replace(e.Shadow.reOffsetsAndBlur,"")||"rgb(0,0,0)").trim(),offsetX:parseInt(r[1],10)||0,offsetY:parseInt(r[2],10)||0,blur:parseInt(r[3],10)||0}},toString:function(){return[this.offsetX,this.offsetY,this.blur,this.color].join("px ")},toSVG:function(t){var r=40,n=40,s=e.Object.NUM_FRACTION_DIGITS,o=e.util.rotateVector({x:this.offsetX,y:this.offsetY},e.util.degreesToRadians(-t.angle));return t.width&&t.height&&(r=100*i((Math.abs(o.x)+this.blur)/t.width,s)+20,n=100*i((Math.abs(o.y)+this.blur)/t.height,s)+20),t.flipX&&(o.x*=-1),t.flipY&&(o.y*=-1),'<filter id="SVGID_'+this.id+'" y="-'+n+'%" height="'+(100+2*n)+'%" x="-'+r+'%" width="'+(100+2*r)+'%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="'+i(this.blur?this.blur/2:0,s)+'"></feGaussianBlur>\n\t<feOffset dx="'+i(o.x,s)+'" dy="'+i(o.y,s)+'" result="oBlur" ></feOffset>\n\t<feFlood flood-color="'+this.color+'"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'},toObject:function(){if(this.includeDefaultValues)return{color:this.color,blur:this.blur,offsetX:this.offsetX,offsetY:this.offsetY,affectStroke:this.affectStroke};var t={},i=e.Shadow.prototype;return["color","blur","offsetX","offsetY","affectStroke"].forEach(function(e){this[e]!==i[e]&&(t[e]=this[e])},this),t}}),e.Shadow.reOffsetsAndBlur=/(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/)}("undefined"!=typeof exports?exports:this),function(){"use strict";if(fabric.StaticCanvas)fabric.warn("fabric.StaticCanvas is already defined.");else{var t=fabric.util.object.extend,e=fabric.util.getElementOffset,i=fabric.util.removeFromArray,r=fabric.util.toFixed,n=fabric.util.transformPoint,s=fabric.util.invertTransform,o=new Error("Could not initialize `canvas` element");fabric.StaticCanvas=fabric.util.createClass(fabric.CommonMethods,{initialize:function(t,e){e||(e={}),this.renderAndResetBound=this.renderAndReset.bind(this),this.requestRenderAllBound=this.requestRenderAll.bind(this),this._initStatic(t,e)},backgroundColor:"",backgroundImage:null,overlayColor:"",overlayImage:null,includeDefaultValues:!0,stateful:!1,renderOnAddRemove:!0,clipTo:null,controlsAboveOverlay:!1,allowTouchScrolling:!1,imageSmoothingEnabled:!0,viewportTransform:fabric.iMatrix.concat(),backgroundVpt:!0,overlayVpt:!0,onBeforeScaleRotate:function(){},enableRetinaScaling:!0,vptCoords:{},skipOffscreen:!0,_initStatic:function(t,e){var i=this.requestRenderAllBound;this._objects=[],this._createLowerCanvas(t),this._initOptions(e),this._setImageSmoothing(),this.interactive||this._initRetinaScaling(),e.overlayImage&&this.setOverlayImage(e.overlayImage,i),e.backgroundImage&&this.setBackgroundImage(e.backgroundImage,i),e.backgroundColor&&this.setBackgroundColor(e.backgroundColor,i),e.overlayColor&&this.setOverlayColor(e.overlayColor,i),this.calcOffset()},_isRetinaScaling:function(){return 1!==fabric.devicePixelRatio&&this.enableRetinaScaling},getRetinaScaling:function(){return this._isRetinaScaling()?fabric.devicePixelRatio:1},_initRetinaScaling:function(){this._isRetinaScaling()&&(this.lowerCanvasEl.setAttribute("width",this.width*fabric.devicePixelRatio),this.lowerCanvasEl.setAttribute("height",this.height*fabric.devicePixelRatio),this.contextContainer.scale(fabric.devicePixelRatio,fabric.devicePixelRatio))},calcOffset:function(){return this._offset=e(this.lowerCanvasEl),this},setOverlayImage:function(t,e,i){return this.__setBgOverlayImage("overlayImage",t,e,i)},setBackgroundImage:function(t,e,i){return this.__setBgOverlayImage("backgroundImage",t,e,i)},setOverlayColor:function(t,e){return this.__setBgOverlayColor("overlayColor",t,e)},setBackgroundColor:function(t,e){return this.__setBgOverlayColor("backgroundColor",t,e)},_setImageSmoothing:function(){var t=this.getContext();t.imageSmoothingEnabled=t.imageSmoothingEnabled||t.webkitImageSmoothingEnabled||t.mozImageSmoothingEnabled||t.msImageSmoothingEnabled||t.oImageSmoothingEnabled,t.imageSmoothingEnabled=this.imageSmoothingEnabled},__setBgOverlayImage:function(t,e,i,r){return"string"==typeof e?fabric.util.loadImage(e,function(e){e&&(this[t]=new fabric.Image(e,r)),i&&i(e)},this,r&&r.crossOrigin):(r&&e.setOptions(r),this[t]=e,i&&i(e)),this},__setBgOverlayColor:function(t,e,i){return this[t]=e,this._initGradient(e,t),this._initPattern(e,t,i),this},_createCanvasElement:function(){var t=fabric.util.createCanvasElement();if(!t)throw o;if(t.style||(t.style={}),void 0===t.getContext)throw o;return t},_initOptions:function(t){this._setOptions(t),this.width=this.width||parseInt(this.lowerCanvasEl.width,10)||0,this.height=this.height||parseInt(this.lowerCanvasEl.height,10)||0,this.lowerCanvasEl.style&&(this.lowerCanvasEl.width=this.width,this.lowerCanvasEl.height=this.height,this.lowerCanvasEl.style.width=this.width+"px",this.lowerCanvasEl.style.height=this.height+"px",this.viewportTransform=this.viewportTransform.slice())},_createLowerCanvas:function(t){t&&t.getContext?this.lowerCanvasEl=t:this.lowerCanvasEl=fabric.util.getById(t)||this._createCanvasElement(),fabric.util.addClass(this.lowerCanvasEl,"lower-canvas"),this.interactive&&this._applyCanvasStyle(this.lowerCanvasEl),this.contextContainer=this.lowerCanvasEl.getContext("2d")},getWidth:function(){return this.width},getHeight:function(){return this.height},setWidth:function(t,e){return this.setDimensions({width:t},e)},setHeight:function(t,e){return this.setDimensions({height:t},e)},setDimensions:function(t,e){var i;e=e||{};for(var r in t)i=t[r],e.cssOnly||(this._setBackstoreDimension(r,t[r]),i+="px"),e.backstoreOnly||this._setCssDimension(r,i);return this._isCurrentlyDrawing&&this.freeDrawingBrush&&this.freeDrawingBrush._setBrushStyles(),this._initRetinaScaling(),this._setImageSmoothing(),this.calcOffset(),e.cssOnly||this.requestRenderAll(),this},_setBackstoreDimension:function(t,e){return this.lowerCanvasEl[t]=e,this.upperCanvasEl&&(this.upperCanvasEl[t]=e),this.cacheCanvasEl&&(this.cacheCanvasEl[t]=e),this[t]=e,this},_setCssDimension:function(t,e){return this.lowerCanvasEl.style[t]=e,this.upperCanvasEl&&(this.upperCanvasEl.style[t]=e),this.wrapperEl&&(this.wrapperEl.style[t]=e),this},getZoom:function(){return this.viewportTransform[0]},setViewportTransform:function(t){var e,i,r,n=this._activeObject;for(this.viewportTransform=t,i=0,r=this._objects.length;i<r;i++)(e=this._objects[i]).group||e.setCoords(!1,!0);return n&&"activeSelection"===n.type&&n.setCoords(!1,!0),this.calcViewportBoundaries(),this.renderOnAddRemove&&this.requestRenderAll(),this},zoomToPoint:function(t,e){var i=t,r=this.viewportTransform.slice(0);t=n(t,s(this.viewportTransform)),r[0]=e,r[3]=e;var o=n(t,r);return r[4]+=i.x-o.x,r[5]+=i.y-o.y,this.setViewportTransform(r)},setZoom:function(t){return this.zoomToPoint(new fabric.Point(0,0),t),this},absolutePan:function(t){var e=this.viewportTransform.slice(0);return e[4]=-t.x,e[5]=-t.y,this.setViewportTransform(e)},relativePan:function(t){return this.absolutePan(new fabric.Point(-t.x-this.viewportTransform[4],-t.y-this.viewportTransform[5]))},getElement:function(){return this.lowerCanvasEl},_onObjectAdded:function(t){this.stateful&&t.setupState(),t._set("canvas",this),t.setCoords(),this.fire("object:added",{target:t}),t.fire("added")},_onObjectRemoved:function(t){this.fire("object:removed",{target:t}),t.fire("removed"),delete t.canvas},clearContext:function(t){return t.clearRect(0,0,this.width,this.height),this},getContext:function(){return this.contextContainer},clear:function(){return this._objects.length=0,this.backgroundImage=null,this.overlayImage=null,this.backgroundColor="",this.overlayColor="",this._hasITextHandlers&&(this.off("mouse:up",this._mouseUpITextHandler),this._iTextInstances=null,this._hasITextHandlers=!1),this.clearContext(this.contextContainer),this.fire("canvas:cleared"),this.renderOnAddRemove&&this.requestRenderAll(),this},renderAll:function(){var t=this.contextContainer;return this.renderCanvas(t,this._objects),this},renderAndReset:function(){this.isRendering=0,this.renderAll()},requestRenderAll:function(){return this.isRendering||(this.isRendering=fabric.util.requestAnimFrame(this.renderAndResetBound)),this},calcViewportBoundaries:function(){var t={},e=this.width,i=this.height,r=s(this.viewportTransform);return t.tl=n({x:0,y:0},r),t.br=n({x:e,y:i},r),t.tr=new fabric.Point(t.br.x,t.tl.y),t.bl=new fabric.Point(t.tl.x,t.br.y),this.vptCoords=t,t},renderCanvas:function(t,e){var i=this.viewportTransform;this.isRendering&&(fabric.util.cancelAnimFrame(this.isRendering),this.isRendering=0),this.calcViewportBoundaries(),this.clearContext(t),this.fire("before:render"),this.clipTo&&fabric.util.clipContext(this,t),this._renderBackground(t),t.save(),t.transform(i[0],i[1],i[2],i[3],i[4],i[5]),this._renderObjects(t,e),t.restore(),!this.controlsAboveOverlay&&this.interactive&&this.drawControls(t),this.clipTo&&t.restore(),this._renderOverlay(t),this.controlsAboveOverlay&&this.interactive&&this.drawControls(t),this.fire("after:render")},_renderObjects:function(t,e){var i,r;for(i=0,r=e.length;i<r;++i)e[i]&&e[i].render(t)},_renderBackgroundOrOverlay:function(t,e){var i,r=this[e+"Color"];r&&(t.fillStyle=r.toLive?r.toLive(t,this):r,t.fillRect(r.offsetX||0,r.offsetY||0,this.width,this.height)),(r=this[e+"Image"])&&(this[e+"Vpt"]&&(i=this.viewportTransform,t.save(),t.transform(i[0],i[1],i[2],i[3],i[4],i[5])),r.render(t),this[e+"Vpt"]&&t.restore())},_renderBackground:function(t){this._renderBackgroundOrOverlay(t,"background")},_renderOverlay:function(t){this._renderBackgroundOrOverlay(t,"overlay")},getCenter:function(){return{top:this.height/2,left:this.width/2}},centerObjectH:function(t){return this._centerObject(t,new fabric.Point(this.getCenter().left,t.getCenterPoint().y))},centerObjectV:function(t){return this._centerObject(t,new fabric.Point(t.getCenterPoint().x,this.getCenter().top))},centerObject:function(t){var e=this.getCenter();return this._centerObject(t,new fabric.Point(e.left,e.top))},viewportCenterObject:function(t){var e=this.getVpCenter();return this._centerObject(t,e)},viewportCenterObjectH:function(t){var e=this.getVpCenter();return this._centerObject(t,new fabric.Point(e.x,t.getCenterPoint().y)),this},viewportCenterObjectV:function(t){var e=this.getVpCenter();return this._centerObject(t,new fabric.Point(t.getCenterPoint().x,e.y))},getVpCenter:function(){var t=this.getCenter(),e=s(this.viewportTransform);return n({x:t.left,y:t.top},e)},_centerObject:function(t,e){return t.setPositionByOrigin(e,"center","center"),t.setCoords(),this.renderOnAddRemove&&this.requestRenderAll(),this},toDatalessJSON:function(t){return this.toDatalessObject(t)},toObject:function(t){return this._toObjectMethod("toObject",t)},toDatalessObject:function(t){return this._toObjectMethod("toDatalessObject",t)},_toObjectMethod:function(e,i){var r={version:fabric.version,objects:this._toObjects(e,i)};return t(r,this.__serializeBgOverlay(e,i)),fabric.util.populateWithProperties(this,r,i),r},_toObjects:function(t,e){return this.getObjects().filter(function(t){return!t.excludeFromExport}).map(function(i){return this._toObject(i,t,e)},this)},_toObject:function(t,e,i){var r;this.includeDefaultValues||(r=t.includeDefaultValues,t.includeDefaultValues=!1);var n=t[e](i);return this.includeDefaultValues||(t.includeDefaultValues=r),n},__serializeBgOverlay:function(t,e){var i={},r=this.backgroundImage,n=this.overlayImage;return this.backgroundColor&&(i.background=this.backgroundColor.toObject?this.backgroundColor.toObject(e):this.backgroundColor),this.overlayColor&&(i.overlay=this.overlayColor.toObject?this.overlayColor.toObject(e):this.overlayColor),r&&!r.excludeFromExport&&(i.backgroundImage=this._toObject(r,t,e)),n&&!n.excludeFromExport&&(i.overlayImage=this._toObject(n,t,e)),i},svgViewportTransformation:!0,toSVG:function(t,e){t||(t={});var i=[];return this._setSVGPreamble(i,t),this._setSVGHeader(i,t),this._setSVGBgOverlayColor(i,"backgroundColor"),this._setSVGBgOverlayImage(i,"backgroundImage",e),this._setSVGObjects(i,e),this._setSVGBgOverlayColor(i,"overlayColor"),this._setSVGBgOverlayImage(i,"overlayImage",e),i.push("</svg>"),i.join("")},_setSVGPreamble:function(t,e){e.suppressPreamble||t.push('<?xml version="1.0" encoding="',e.encoding||"UTF-8",'" standalone="no" ?>\n','<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ','"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n')},_setSVGHeader:function(t,e){var i,n=e.width||this.width,s=e.height||this.height,o='viewBox="0 0 '+this.width+" "+this.height+'" ',a=fabric.Object.NUM_FRACTION_DIGITS;e.viewBox?o='viewBox="'+e.viewBox.x+" "+e.viewBox.y+" "+e.viewBox.width+" "+e.viewBox.height+'" ':this.svgViewportTransformation&&(i=this.viewportTransform,o='viewBox="'+r(-i[4]/i[0],a)+" "+r(-i[5]/i[3],a)+" "+r(this.width/i[0],a)+" "+r(this.height/i[3],a)+'" '),t.push("<svg ",'xmlns="http://www.w3.org/2000/svg" ','xmlns:xlink="http://www.w3.org/1999/xlink" ','version="1.1" ','width="',n,'" ','height="',s,'" ',o,'xml:space="preserve">\n',"<desc>Created with Fabric.js ",fabric.version,"</desc>\n","<defs>\n",this.createSVGFontFacesMarkup(),this.createSVGRefElementsMarkup(),"</defs>\n")},createSVGRefElementsMarkup:function(){var t=this;return["backgroundColor","overlayColor"].map(function(e){var i=t[e];if(i&&i.toLive)return i.toSVG(t,!1)}).join("")},createSVGFontFacesMarkup:function(){var t,e,i,r,n,s,o,a,h="",c={},l=fabric.fontPaths,u=this.getObjects();for(o=0,a=u.length;o<a;o++)if(t=u[o],e=t.fontFamily,-1!==t.type.indexOf("text")&&!c[e]&&l[e]&&(c[e]=!0,t.styles)){i=t.styles;for(n in i){r=i[n];for(s in r)!c[e=r[s].fontFamily]&&l[e]&&(c[e]=!0)}}for(var f in c)h+=["\t\t@font-face {\n","\t\t\tfont-family: '",f,"';\n","\t\t\tsrc: url('",l[f],"');\n","\t\t}\n"].join("");return h&&(h=['\t<style type="text/css">',"<![CDATA[\n",h,"]]>","</style>\n"].join("")),h},_setSVGObjects:function(t,e){var i,r,n,s=this.getObjects();for(r=0,n=s.length;r<n;r++)(i=s[r]).excludeFromExport||this._setSVGObject(t,i,e)},_setSVGObject:function(t,e,i){t.push(e.toSVG(i))},_setSVGBgOverlayImage:function(t,e,i){this[e]&&this[e].toSVG&&t.push(this[e].toSVG(i))},_setSVGBgOverlayColor:function(t,e){var i=this[e];if(i)if(i.toLive){var r=i.repeat;t.push('<rect transform="translate(',this.width/2,",",this.height/2,')"',' x="',i.offsetX-this.width/2,'" y="',i.offsetY-this.height/2,'" ','width="',"repeat-y"===r||"no-repeat"===r?i.source.width:this.width,'" height="',"repeat-x"===r||"no-repeat"===r?i.source.height:this.height,'" fill="url(#SVGID_'+i.id+')"',"></rect>\n")}else t.push('<rect x="0" y="0" ','width="',this.width,'" height="',this.height,'" fill="',this[e],'"',"></rect>\n")},sendToBack:function(t){if(!t)return this;var e,r,n,s=this._activeObject;if(t===s&&"activeSelection"===t.type)for(e=(n=s._objects).length;e--;)r=n[e],i(this._objects,r),this._objects.unshift(r);else i(this._objects,t),this._objects.unshift(t);return this.renderOnAddRemove&&this.requestRenderAll(),this},bringToFront:function(t){if(!t)return this;var e,r,n,s=this._activeObject;if(t===s&&"activeSelection"===t.type)for(n=s._objects,e=0;e<n.length;e++)r=n[e],i(this._objects,r),this._objects.push(r);else i(this._objects,t),this._objects.push(t);return this.renderOnAddRemove&&this.requestRenderAll(),this},sendBackwards:function(t,e){if(!t)return this;var r,n,s,o,a,h=this._activeObject,c=0;if(t===h&&"activeSelection"===t.type)for(a=h._objects,r=0;r<a.length;r++)n=a[r],(s=this._objects.indexOf(n))>0+c&&(o=s-1,i(this._objects,n),this._objects.splice(o,0,n)),c++;else 0!==(s=this._objects.indexOf(t))&&(o=this._findNewLowerIndex(t,s,e),i(this._objects,t),this._objects.splice(o,0,t));return this.renderOnAddRemove&&this.requestRenderAll(),this},_findNewLowerIndex:function(t,e,i){var r,n;if(i)for(r=e,n=e-1;n>=0;--n){if(t.intersectsWithObject(this._objects[n])||t.isContainedWithinObject(this._objects[n])||this._objects[n].isContainedWithinObject(t)){r=n;break}}else r=e-1;return r},bringForward:function(t,e){if(!t)return this;var r,n,s,o,a,h=this._activeObject,c=0;if(t===h&&"activeSelection"===t.type)for(r=(a=h._objects).length;r--;)n=a[r],(s=this._objects.indexOf(n))<this._objects.length-1-c&&(o=s+1,i(this._objects,n),this._objects.splice(o,0,n)),c++;else(s=this._objects.indexOf(t))!==this._objects.length-1&&(o=this._findNewUpperIndex(t,s,e),i(this._objects,t),this._objects.splice(o,0,t));return this.renderOnAddRemove&&this.requestRenderAll(),this},_findNewUpperIndex:function(t,e,i){var r,n,s;if(i)for(r=e,n=e+1,s=this._objects.length;n<s;++n){if(t.intersectsWithObject(this._objects[n])||t.isContainedWithinObject(this._objects[n])||this._objects[n].isContainedWithinObject(t)){r=n;break}}else r=e+1;return r},moveTo:function(t,e){return i(this._objects,t),this._objects.splice(e,0,t),this.renderOnAddRemove&&this.requestRenderAll()},dispose:function(){return this.forEachObject(function(t){t.dispose&&t.dispose()}),this._objects=[],this.backgroundImage=null,this.overlayImage=null,this._iTextInstances=null,this.lowerCanvasEl=null,this.cacheCanvasEl=null,this},toString:function(){return"#<fabric.Canvas ("+this.complexity()+"): { objects: "+this.getObjects().length+" }>"}}),t(fabric.StaticCanvas.prototype,fabric.Observable),t(fabric.StaticCanvas.prototype,fabric.Collection),t(fabric.StaticCanvas.prototype,fabric.DataURLExporter),t(fabric.StaticCanvas,{EMPTY_JSON:'{"objects": [], "background": "white"}',supports:function(t){var e=fabric.util.createCanvasElement();if(!e||!e.getContext)return null;var i=e.getContext("2d");if(!i)return null;switch(t){case"getImageData":return void 0!==i.getImageData;case"setLineDash":return void 0!==i.setLineDash;case"toDataURL":return void 0!==e.toDataURL;case"toDataURLWithQuality":try{return e.toDataURL("image/jpeg",0),!0}catch(t){}return!1;default:return null}}}),fabric.StaticCanvas.prototype.toJSON=fabric.StaticCanvas.prototype.toObject,fabric.isLikelyNode&&(fabric.StaticCanvas.prototype.createPNGStream=function(){var t=fabric.util.getNodeCanvas(this.lowerCanvasEl);return t&&t.createPNGStream()},fabric.StaticCanvas.prototype.createJPEGStream=function(t){var e=fabric.util.getNodeCanvas(this.lowerCanvasEl);return e&&e.createJPEGStream(t)})}}(),fabric.BaseBrush=fabric.util.createClass({color:"rgb(0, 0, 0)",width:1,shadow:null,strokeLineCap:"round",strokeLineJoin:"round",strokeMiterLimit:10,strokeDashArray:null,setShadow:function(t){return this.shadow=new fabric.Shadow(t),this},_setBrushStyles:function(){var t=this.canvas.contextTop;t.strokeStyle=this.color,t.lineWidth=this.width,t.lineCap=this.strokeLineCap,t.miterLimit=this.strokeMiterLimit,t.lineJoin=this.strokeLineJoin,this.strokeDashArray&&fabric.StaticCanvas.supports("setLineDash")&&t.setLineDash(this.strokeDashArray)},_saveAndTransform:function(t){var e=this.canvas.viewportTransform;t.save(),t.transform(e[0],e[1],e[2],e[3],e[4],e[5])},_setShadow:function(){if(this.shadow){var t=this.canvas.contextTop,e=this.canvas.getZoom();t.shadowColor=this.shadow.color,t.shadowBlur=this.shadow.blur*e,t.shadowOffsetX=this.shadow.offsetX*e,t.shadowOffsetY=this.shadow.offsetY*e}},_resetShadow:function(){var t=this.canvas.contextTop;t.shadowColor="",t.shadowBlur=t.shadowOffsetX=t.shadowOffsetY=0}}),fabric.PencilBrush=fabric.util.createClass(fabric.BaseBrush,{initialize:function(t){this.canvas=t,this._points=[]},_drawSegment:function(t,e,i){var r=e.midPointFrom(i);return t.quadraticCurveTo(e.x,e.y,r.x,r.y),r},onMouseDown:function(t){this._prepareForDrawing(t),this._captureDrawingPath(t),this._render()},onMouseMove:function(t){if(this._captureDrawingPath(t)&&this._points.length>1){var e=this._points,i=e.length,r=this.canvas.contextTop;this._saveAndTransform(r),this.oldEnd&&(r.beginPath(),r.moveTo(this.oldEnd.x,this.oldEnd.y)),this.oldEnd=this._drawSegment(r,e[i-2],e[i-1],!0),r.stroke(),r.restore()}},onMouseUp:function(){this.oldEnd=void 0,this._finalizeAndAddPath()},_prepareForDrawing:function(t){var e=new fabric.Point(t.x,t.y);this._reset(),this._addPoint(e),this.canvas.contextTop.moveTo(e.x,e.y)},_addPoint:function(t){return!(this._points.length>1&&t.eq(this._points[this._points.length-1]))&&(this._points.push(t),!0)},_reset:function(){this._points.length=0,this._setBrushStyles(),this._setShadow()},_captureDrawingPath:function(t){var e=new fabric.Point(t.x,t.y);return this._addPoint(e)},_render:function(){var t,e,i=this.canvas.contextTop,r=this._points[0],n=this._points[1];if(this._saveAndTransform(i),i.beginPath(),2===this._points.length&&r.x===n.x&&r.y===n.y){var s=this.width/1e3;r=new fabric.Point(r.x,r.y),n=new fabric.Point(n.x,n.y),r.x-=s,n.x+=s}for(i.moveTo(r.x,r.y),t=1,e=this._points.length;t<e;t++)this._drawSegment(i,r,n),r=this._points[t],n=this._points[t+1];i.lineTo(r.x,r.y),i.stroke(),i.restore()},convertPointsToSVGPath:function(t){var e,i=[],r=this.width/1e3,n=new fabric.Point(t[0].x,t[0].y),s=new fabric.Point(t[1].x,t[1].y),o=t.length,a=1,h=1,c=o>2;for(c&&(a=t[2].x<s.x?-1:t[2].x===s.x?0:1,h=t[2].y<s.y?-1:t[2].y===s.y?0:1),i.push("M ",n.x-a*r," ",n.y-h*r," "),e=1;e<o;e++){if(!n.eq(s)){var l=n.midPointFrom(s);i.push("Q ",n.x," ",n.y," ",l.x," ",l.y," ")}n=t[e],e+1<t.length&&(s=t[e+1])}return c&&(a=n.x>t[e-2].x?1:n.x===t[e-2].x?0:-1,h=n.y>t[e-2].y?1:n.y===t[e-2].y?0:-1),i.push("L ",n.x+a*r," ",n.y+h*r),i},createPath:function(t){var e=new fabric.Path(t,{fill:null,stroke:this.color,strokeWidth:this.width,strokeLineCap:this.strokeLineCap,strokeMiterLimit:this.strokeMiterLimit,strokeLineJoin:this.strokeLineJoin,strokeDashArray:this.strokeDashArray}),i=new fabric.Point(e.left+e.width/2,e.top+e.height/2);return i=e.translateToGivenOrigin(i,"center","center",e.originX,e.originY),e.top=i.y,e.left=i.x,this.shadow&&(this.shadow.affectStroke=!0,e.setShadow(this.shadow)),e},_finalizeAndAddPath:function(){this.canvas.contextTop.closePath();var t=this.convertPointsToSVGPath(this._points).join("");if("M 0 0 Q 0 0 0 0 L 0 0"!==t){var e=this.createPath(t);this.canvas.clearContext(this.canvas.contextTop),this.canvas.add(e),this.canvas.renderAll(),e.setCoords(),this._resetShadow(),this.canvas.fire("path:created",{path:e})}else this.canvas.requestRenderAll()}}),fabric.CircleBrush=fabric.util.createClass(fabric.BaseBrush,{width:10,initialize:function(t){this.canvas=t,this.points=[]},drawDot:function(t){var e=this.addPoint(t),i=this.canvas.contextTop;this._saveAndTransform(i),i.fillStyle=e.fill,i.beginPath(),i.arc(e.x,e.y,e.radius,0,2*Math.PI,!1),i.closePath(),i.fill(),i.restore()},onMouseDown:function(t){this.points.length=0,this.canvas.clearContext(this.canvas.contextTop),this._setShadow(),this.drawDot(t)},_render:function(){var t,e,i,r=this.canvas.contextTop,n=this.points;for(this._saveAndTransform(r),t=0,e=n.length;t<e;t++)i=n[t],r.fillStyle=i.fill,r.beginPath(),r.arc(i.x,i.y,i.radius,0,2*Math.PI,!1),r.closePath(),r.fill();r.restore()},onMouseMove:function(t){this.drawDot(t)},onMouseUp:function(){var t,e,i=this.canvas.renderOnAddRemove;this.canvas.renderOnAddRemove=!1;var r=[];for(t=0,e=this.points.length;t<e;t++){var n=this.points[t],s=new fabric.Circle({radius:n.radius,left:n.x,top:n.y,originX:"center",originY:"center",fill:n.fill});this.shadow&&s.setShadow(this.shadow),r.push(s)}var o=new fabric.Group(r,{originX:"center",originY:"center"});o.canvas=this.canvas,this.canvas.add(o),this.canvas.fire("path:created",{path:o}),this.canvas.clearContext(this.canvas.contextTop),this._resetShadow(),this.canvas.renderOnAddRemove=i,this.canvas.requestRenderAll()},addPoint:function(t){var e=new fabric.Point(t.x,t.y),i=fabric.util.getRandomInt(Math.max(0,this.width-20),this.width+20)/2,r=new fabric.Color(this.color).setAlpha(fabric.util.getRandomInt(0,100)/100).toRgba();return e.radius=i,e.fill=r,this.points.push(e),e}}),fabric.SprayBrush=fabric.util.createClass(fabric.BaseBrush,{width:10,density:20,dotWidth:1,dotWidthVariance:1,randomOpacity:!1,optimizeOverlapping:!0,initialize:function(t){this.canvas=t,this.sprayChunks=[]},onMouseDown:function(t){this.sprayChunks.length=0,this.canvas.clearContext(this.canvas.contextTop),this._setShadow(),this.addSprayChunk(t),this.render(this.sprayChunkPoints)},onMouseMove:function(t){this.addSprayChunk(t),this.render(this.sprayChunkPoints)},onMouseUp:function(){var t=this.canvas.renderOnAddRemove;this.canvas.renderOnAddRemove=!1;for(var e=[],i=0,r=this.sprayChunks.length;i<r;i++)for(var n=this.sprayChunks[i],s=0,o=n.length;s<o;s++){var a=new fabric.Rect({width:n[s].width,height:n[s].width,left:n[s].x+1,top:n[s].y+1,originX:"center",originY:"center",fill:this.color});e.push(a)}this.optimizeOverlapping&&(e=this._getOptimizedRects(e));var h=new fabric.Group(e,{originX:"center",originY:"center"});this.shadow&&h.setShadow(this.shadow),this.canvas.add(h),this.canvas.fire("path:created",{path:h}),this.canvas.clearContext(this.canvas.contextTop),this._resetShadow(),this.canvas.renderOnAddRemove=t,this.canvas.requestRenderAll()},_getOptimizedRects:function(t){var e,i,r,n={};for(i=0,r=t.length;i<r;i++)n[e=t[i].left+""+t[i].top]||(n[e]=t[i]);var s=[];for(e in n)s.push(n[e]);return s},render:function(t){var e,i,r=this.canvas.contextTop;for(r.fillStyle=this.color,this._saveAndTransform(r),e=0,i=t.length;e<i;e++){var n=t[e];void 0!==n.opacity&&(r.globalAlpha=n.opacity),r.fillRect(n.x,n.y,n.width,n.width)}r.restore()},_render:function(){var t,e,i=this.canvas.contextTop;for(i.fillStyle=this.color,this._saveAndTransform(i),t=0,e=this.sprayChunks.length;t<e;t++)this.render(this.sprayChunks[t]);i.restore()},addSprayChunk:function(t){this.sprayChunkPoints=[];var e,i,r,n,s=this.width/2;for(n=0;n<this.density;n++){e=fabric.util.getRandomInt(t.x-s,t.x+s),i=fabric.util.getRandomInt(t.y-s,t.y+s),r=this.dotWidthVariance?fabric.util.getRandomInt(Math.max(1,this.dotWidth-this.dotWidthVariance),this.dotWidth+this.dotWidthVariance):this.dotWidth;var o=new fabric.Point(e,i);o.width=r,this.randomOpacity&&(o.opacity=fabric.util.getRandomInt(0,100)/100),this.sprayChunkPoints.push(o)}this.sprayChunks.push(this.sprayChunkPoints)}}),fabric.PatternBrush=fabric.util.createClass(fabric.PencilBrush,{getPatternSrc:function(){var t=fabric.document.createElement("canvas"),e=t.getContext("2d");return t.width=t.height=25,e.fillStyle=this.color,e.beginPath(),e.arc(10,10,10,0,2*Math.PI,!1),e.closePath(),e.fill(),t},getPatternSrcFunction:function(){return String(this.getPatternSrc).replace("this.color",'"'+this.color+'"')},getPattern:function(){return this.canvas.contextTop.createPattern(this.source||this.getPatternSrc(),"repeat")},_setBrushStyles:function(){this.callSuper("_setBrushStyles"),this.canvas.contextTop.strokeStyle=this.getPattern()},createPath:function(t){var e=this.callSuper("createPath",t),i=e._getLeftTopCoords().scalarAdd(e.strokeWidth/2);return e.stroke=new fabric.Pattern({source:this.source||this.getPatternSrcFunction(),offsetX:-i.x,offsetY:-i.y}),e}}),function(){var t=fabric.util.getPointer,e=fabric.util.degreesToRadians,i=fabric.util.radiansToDegrees,r=Math.atan2,n=Math.abs,s=fabric.StaticCanvas.supports("setLineDash");fabric.Canvas=fabric.util.createClass(fabric.StaticCanvas,{initialize:function(t,e){e||(e={}),this.renderAndResetBound=this.renderAndReset.bind(this),this._initStatic(t,e),this._initInteractive(),this._createCacheCanvas()},uniScaleTransform:!1,uniScaleKey:"shiftKey",centeredScaling:!1,centeredRotation:!1,centeredKey:"altKey",altActionKey:"shiftKey",interactive:!0,selection:!0,selectionKey:"shiftKey",altSelectionKey:null,selectionColor:"rgba(100, 100, 255, 0.3)",selectionDashArray:[],selectionBorderColor:"rgba(255, 255, 255, 0.3)",selectionLineWidth:1,selectionFullyContained:!1,hoverCursor:"move",moveCursor:"move",defaultCursor:"default",freeDrawingCursor:"crosshair",rotationCursor:"crosshair",notAllowedCursor:"not-allowed",containerClass:"canvas-container",perPixelTargetFind:!1,targetFindTolerance:0,skipTargetFind:!1,isDrawingMode:!1,preserveObjectStacking:!1,snapAngle:0,snapThreshold:null,stopContextMenu:!1,fireRightClick:!1,fireMiddleClick:!1,_initInteractive:function(){this._currentTransform=null,this._groupSelector=null,this._initWrapperElement(),this._createUpperCanvas(),this._initEventListeners(),this._initRetinaScaling(),this.freeDrawingBrush=fabric.PencilBrush&&new fabric.PencilBrush(this),this.calcOffset()},_chooseObjectsToRender:function(){var t,e,i,r=this.getActiveObjects();if(r.length>0&&!this.preserveObjectStacking){e=[],i=[];for(var n=0,s=this._objects.length;n<s;n++)t=this._objects[n],-1===r.indexOf(t)?e.push(t):i.push(t);r.length>1&&(this._activeObject._objects=i),e.push.apply(e,i)}else e=this._objects;return e},renderAll:function(){!this.contextTopDirty||this._groupSelector||this.isDrawingMode||(this.clearContext(this.contextTop),this.contextTopDirty=!1),this.isDrawingMode&&this._isCurrentlyDrawing&&this.freeDrawingBrush&&this.freeDrawingBrush._render();var t=this.contextContainer;return this.renderCanvas(t,this._chooseObjectsToRender()),this},renderTop:function(){var t=this.contextTop;return this.clearContext(t),this.selection&&this._groupSelector&&this._drawSelection(t),this.fire("after:render"),this.contextTopDirty=!0,this},_resetCurrentTransform:function(){var t=this._currentTransform;t.target.set({scaleX:t.original.scaleX,scaleY:t.original.scaleY,skewX:t.original.skewX,skewY:t.original.skewY,left:t.original.left,top:t.original.top}),this._shouldCenterTransform(t.target)?"rotate"===t.action?this._setOriginToCenter(t.target):("center"!==t.originX&&("right"===t.originX?t.mouseXSign=-1:t.mouseXSign=1),"center"!==t.originY&&("bottom"===t.originY?t.mouseYSign=-1:t.mouseYSign=1),t.originX="center",t.originY="center"):(t.originX=t.original.originX,t.originY=t.original.originY)},containsPoint:function(t,e,i){var r,n=i||this.getPointer(t,!0);return r=e.group&&e.group===this._activeObject&&"activeSelection"===e.group.type?this._normalizePointer(e.group,n):{x:n.x,y:n.y},e.containsPoint(r)||e._findTargetCorner(n)},_normalizePointer:function(t,e){var i=t.calcTransformMatrix(),r=fabric.util.invertTransform(i),n=this.restorePointerVpt(e);return fabric.util.transformPoint(n,r)},isTargetTransparent:function(t,e,i){var r=this.contextCache,n=t.selectionBackgroundColor,s=this.viewportTransform;t.selectionBackgroundColor="",this.clearContext(r),r.save(),r.transform(s[0],s[1],s[2],s[3],s[4],s[5]),t.render(r),r.restore(),t===this._activeObject&&t._renderControls(r,{hasBorders:!1,transparentCorners:!1},{hasBorders:!1}),t.selectionBackgroundColor=n;return fabric.util.isTransparent(r,e,i,this.targetFindTolerance)},_isSelectionKeyPressed:function(t){return"[object Array]"===Object.prototype.toString.call(this.selectionKey)?!!this.selectionKey.find(function(e){return!0===t[e]}):t[this.selectionKey]},_shouldClearSelection:function(t,e){var i=this.getActiveObjects(),r=this._activeObject;return!e||e&&r&&i.length>1&&-1===i.indexOf(e)&&r!==e&&!this._isSelectionKeyPressed(t)||e&&!e.evented||e&&!e.selectable&&r&&r!==e},_shouldCenterTransform:function(t){if(t){var e,i=this._currentTransform;return"scale"===i.action||"scaleX"===i.action||"scaleY"===i.action?e=this.centeredScaling||t.centeredScaling:"rotate"===i.action&&(e=this.centeredRotation||t.centeredRotation),e?!i.altKey:i.altKey}},_getOriginFromCorner:function(t,e){var i={x:t.originX,y:t.originY};return"ml"===e||"tl"===e||"bl"===e?i.x="right":"mr"!==e&&"tr"!==e&&"br"!==e||(i.x="left"),"tl"===e||"mt"===e||"tr"===e?i.y="bottom":"bl"!==e&&"mb"!==e&&"br"!==e||(i.y="top"),i},_getActionFromCorner:function(t,e,i){if(!e)return"drag";switch(e){case"mtr":return"rotate";case"ml":case"mr":return i[this.altActionKey]?"skewY":"scaleX";case"mt":case"mb":return i[this.altActionKey]?"skewX":"scaleY";default:return"scale"}},_setupCurrentTransform:function(t,i){if(i){var r=this.getPointer(t),n=i._findTargetCorner(this.getPointer(t,!0)),s=this._getActionFromCorner(i,n,t),o=this._getOriginFromCorner(i,n);this._currentTransform={target:i,action:s,corner:n,scaleX:i.scaleX,scaleY:i.scaleY,skewX:i.skewX,skewY:i.skewY,offsetX:r.x-i.left,offsetY:r.y-i.top,originX:o.x,originY:o.y,ex:r.x,ey:r.y,lastX:r.x,lastY:r.y,left:i.left,top:i.top,theta:e(i.angle),width:i.width*i.scaleX,mouseXSign:1,mouseYSign:1,shiftKey:t.shiftKey,altKey:t[this.centeredKey]},this._currentTransform.original={left:i.left,top:i.top,scaleX:i.scaleX,scaleY:i.scaleY,skewX:i.skewX,skewY:i.skewY,originX:o.x,originY:o.y},this._resetCurrentTransform()}},_translateObject:function(t,e){var i=this._currentTransform,r=i.target,n=t-i.offsetX,s=e-i.offsetY,o=!r.get("lockMovementX")&&r.left!==n,a=!r.get("lockMovementY")&&r.top!==s;return o&&r.set("left",n),a&&r.set("top",s),o||a},_changeSkewTransformOrigin:function(t,e,i){var r="originX",n={0:"center"},s=e.target.skewX,o="left",a="right",h="mt"===e.corner||"ml"===e.corner?1:-1,c=1;t=t>0?1:-1,"y"===i&&(s=e.target.skewY,o="top",a="bottom",r="originY"),n[-1]=o,n[1]=a,e.target.flipX&&(c*=-1),e.target.flipY&&(c*=-1),0===s?(e.skewSign=-h*t*c,e[r]=n[-t]):(s=s>0?1:-1,e.skewSign=s,e[r]=n[s*h*c])},_skewObject:function(t,e,i){var r=this._currentTransform,n=r.target,s=!1,o=n.get("lockSkewingX"),a=n.get("lockSkewingY");if(o&&"x"===i||a&&"y"===i)return!1;var h,c,l=n.getCenterPoint(),u=n.toLocalPoint(new fabric.Point(t,e),"center","center")[i],f=n.toLocalPoint(new fabric.Point(r.lastX,r.lastY),"center","center")[i],d=n._getTransformedDimensions();return this._changeSkewTransformOrigin(u-f,r,i),h=n.toLocalPoint(new fabric.Point(t,e),r.originX,r.originY)[i],c=n.translateToOriginPoint(l,r.originX,r.originY),s=this._setObjectSkew(h,r,i,d),r.lastX=t,r.lastY=e,n.setPositionByOrigin(c,r.originX,r.originY),s},_setObjectSkew:function(t,e,i,r){var n,s,o,a,h,c,l,u,f,d=e.target,g=!1,p=e.skewSign;return"x"===i?(a="y",h="Y",c="X",u=0,f=d.skewY):(a="x",h="X",c="Y",u=d.skewX,f=0),o=d._getTransformedDimensions(u,f),(l=2*Math.abs(t)-o[i])<=2?n=0:(n=p*Math.atan(l/d["scale"+c]/(o[a]/d["scale"+h])),n=fabric.util.radiansToDegrees(n)),g=d["skew"+c]!==n,d.set("skew"+c,n),0!==d["skew"+h]&&(s=d._getTransformedDimensions(),n=r[a]/s[a]*d["scale"+h],d.set("scale"+h,n)),g},_scaleObject:function(t,e,i){var r=this._currentTransform,n=r.target,s=n.get("lockScalingX"),o=n.get("lockScalingY"),a=n.get("lockScalingFlip");if(s&&o)return!1;var h=n.translateToOriginPoint(n.getCenterPoint(),r.originX,r.originY),c=n.toLocalPoint(new fabric.Point(t,e),r.originX,r.originY),l=n._getTransformedDimensions(),u=!1;return this._setLocalMouse(c,r),u=this._setObjectScale(c,r,s,o,i,a,l),n.setPositionByOrigin(h,r.originX,r.originY),u},_setObjectScale:function(t,e,i,r,n,s,o){var a,h,c,l,u=e.target,f=!1,d=!1,g=!1;return c=t.x*u.scaleX/o.x,l=t.y*u.scaleY/o.y,a=u.scaleX!==c,h=u.scaleY!==l,s&&c<=0&&c<u.scaleX&&(f=!0,t.x=0),s&&l<=0&&l<u.scaleY&&(d=!0,t.y=0),"equally"!==n||i||r?n?"x"!==n||u.get("lockUniScaling")?"y"!==n||u.get("lockUniScaling")||d||r||u.set("scaleY",l)&&(g=g||h):f||i||u.set("scaleX",c)&&(g=g||a):(f||i||u.set("scaleX",c)&&(g=g||a),d||r||u.set("scaleY",l)&&(g=g||h)):g=this._scaleObjectEqually(t,u,e,o),e.newScaleX=c,e.newScaleY=l,f||d||this._flipObject(e,n),g},_scaleObjectEqually:function(t,e,i,r){var n,s=t.y+t.x,o=r.y*i.original.scaleY/e.scaleY+r.x*i.original.scaleX/e.scaleX,a=t.x<0?-1:1,h=t.y<0?-1:1;return i.newScaleX=a*Math.abs(i.original.scaleX*s/o),i.newScaleY=h*Math.abs(i.original.scaleY*s/o),n=i.newScaleX!==e.scaleX||i.newScaleY!==e.scaleY,e.set("scaleX",i.newScaleX),e.set("scaleY",i.newScaleY),n},_flipObject:function(t,e){t.newScaleX<0&&"y"!==e&&("left"===t.originX?t.originX="right":"right"===t.originX&&(t.originX="left")),t.newScaleY<0&&"x"!==e&&("top"===t.originY?t.originY="bottom":"bottom"===t.originY&&(t.originY="top"))},_setLocalMouse:function(t,e){var i=e.target,r=this.getZoom(),s=i.padding/r;"right"===e.originX?t.x*=-1:"center"===e.originX&&(t.x*=2*e.mouseXSign,t.x<0&&(e.mouseXSign=-e.mouseXSign)),"bottom"===e.originY?t.y*=-1:"center"===e.originY&&(t.y*=2*e.mouseYSign,t.y<0&&(e.mouseYSign=-e.mouseYSign)),n(t.x)>s?t.x<0?t.x+=s:t.x-=s:t.x=0,n(t.y)>s?t.y<0?t.y+=s:t.y-=s:t.y=0},_rotateObject:function(t,e){var n=this._currentTransform;if(n.target.get("lockRotation"))return!1;var s=r(n.ey-n.top,n.ex-n.left),o=r(e-n.top,t-n.left),a=i(o-s+n.theta),h=!0;if(n.target.snapAngle>0){var c=n.target.snapAngle,l=n.target.snapThreshold||c,u=Math.ceil(a/c)*c,f=Math.floor(a/c)*c;Math.abs(a-f)<l?a=f:Math.abs(a-u)<l&&(a=u)}return a<0&&(a=360+a),a%=360,n.target.angle===a?h=!1:n.target.angle=a,h},setCursor:function(t){this.upperCanvasEl.style.cursor=t},_resetObjectTransform:function(t){t.scaleX=1,t.scaleY=1,t.skewX=0,t.skewY=0,t.rotate(0)},_drawSelection:function(t){var e=this._groupSelector,i=e.left,r=e.top,o=n(i),a=n(r);if(this.selectionColor&&(t.fillStyle=this.selectionColor,t.fillRect(e.ex-(i>0?0:-i),e.ey-(r>0?0:-r),o,a)),this.selectionLineWidth&&this.selectionBorderColor)if(t.lineWidth=this.selectionLineWidth,t.strokeStyle=this.selectionBorderColor,this.selectionDashArray.length>1&&!s){var h=e.ex+.5-(i>0?0:o),c=e.ey+.5-(r>0?0:a);t.beginPath(),fabric.util.drawDashedLine(t,h,c,h+o,c,this.selectionDashArray),fabric.util.drawDashedLine(t,h,c+a-1,h+o,c+a-1,this.selectionDashArray),fabric.util.drawDashedLine(t,h,c,h,c+a,this.selectionDashArray),fabric.util.drawDashedLine(t,h+o-1,c,h+o-1,c+a,this.selectionDashArray),t.closePath(),t.stroke()}else fabric.Object.prototype._setLineDash.call(this,t,this.selectionDashArray),t.strokeRect(e.ex+.5-(i>0?0:o),e.ey+.5-(r>0?0:a),o,a)},findTarget:function(t,e){if(!this.skipTargetFind){var i,r,n=this.getPointer(t,!0),s=this._activeObject,o=this.getActiveObjects();if(this.targets=[],o.length>1&&!e&&s===this._searchPossibleTargets([s],n))return s;if(1===o.length&&s._findTargetCorner(n))return s;if(1===o.length&&s===this._searchPossibleTargets([s],n)){if(!this.preserveObjectStacking)return s;i=s,r=this.targets,this.targets=[]}var a=this._searchPossibleTargets(this._objects,n);return t[this.altSelectionKey]&&a&&i&&a!==i&&(a=i,this.targets=r),a}},_checkTarget:function(t,e){if(e&&e.visible&&e.evented&&this.containsPoint(null,e,t)){if(!this.perPixelTargetFind&&!e.perPixelTargetFind||e.isEditing)return!0;if(!this.isTargetTransparent(e,t.x,t.y))return!0}},_searchPossibleTargets:function(t,e){for(var i,r,n,s=t.length;s--;)if(this._checkTarget(e,t[s])){(i=t[s]).subTargetCheck&&i instanceof fabric.Group&&(r=this._normalizePointer(i,e),(n=this._searchPossibleTargets(i._objects,r))&&this.targets.push(n));break}return i},restorePointerVpt:function(t){return fabric.util.transformPoint(t,fabric.util.invertTransform(this.viewportTransform))},getPointer:function(e,i,r){r||(r=this.upperCanvasEl);var n,s=t(e),o=r.getBoundingClientRect(),a=o.width||0,h=o.height||0;return a&&h||("top"in o&&"bottom"in o&&(h=Math.abs(o.top-o.bottom)),"right"in o&&"left"in o&&(a=Math.abs(o.right-o.left))),this.calcOffset(),s.x=s.x-this._offset.left,s.y=s.y-this._offset.top,i||(s=this.restorePointerVpt(s)),n=0===a||0===h?{width:1,height:1}:{width:r.width/a,height:r.height/h},{x:s.x*n.width,y:s.y*n.height}},_createUpperCanvas:function(){var t=this.lowerCanvasEl.className.replace(/\s*lower-canvas\s*/,"");this.upperCanvasEl?this.upperCanvasEl.className="":this.upperCanvasEl=this._createCanvasElement(),fabric.util.addClass(this.upperCanvasEl,"upper-canvas "+t),this.wrapperEl.appendChild(this.upperCanvasEl),this._copyCanvasStyle(this.lowerCanvasEl,this.upperCanvasEl),this._applyCanvasStyle(this.upperCanvasEl),this.contextTop=this.upperCanvasEl.getContext("2d")},_createCacheCanvas:function(){this.cacheCanvasEl=this._createCanvasElement(),this.cacheCanvasEl.setAttribute("width",this.width),this.cacheCanvasEl.setAttribute("height",this.height),this.contextCache=this.cacheCanvasEl.getContext("2d")},_initWrapperElement:function(){this.wrapperEl=fabric.util.wrapElement(this.lowerCanvasEl,"div",{class:this.containerClass}),fabric.util.setStyle(this.wrapperEl,{width:this.width+"px",height:this.height+"px",position:"relative"}),fabric.util.makeElementUnselectable(this.wrapperEl)},_applyCanvasStyle:function(t){var e=this.width||t.width,i=this.height||t.height;fabric.util.setStyle(t,{position:"absolute",width:e+"px",height:i+"px",left:0,top:0,"touch-action":"none"}),t.width=e,t.height=i,fabric.util.makeElementUnselectable(t)},_copyCanvasStyle:function(t,e){e.style.cssText=t.style.cssText},getSelectionContext:function(){return this.contextTop},getSelectionElement:function(){return this.upperCanvasEl},getActiveObject:function(){return this._activeObject},getActiveObjects:function(){var t=this._activeObject;return t?"activeSelection"===t.type&&t._objects?t._objects.slice(0):[t]:[]},_onObjectRemoved:function(t){t===this._activeObject&&(this.fire("before:selection:cleared",{target:t}),this._discardActiveObject(),this.fire("selection:cleared",{target:t}),t.fire("deselected")),this._hoveredTarget===t&&(this._hoveredTarget=null),this.callSuper("_onObjectRemoved",t)},_fireSelectionEvents:function(t,e){var i=!1,r=this.getActiveObjects(),n=[],s=[],o={e:e};t.forEach(function(t){-1===r.indexOf(t)&&(i=!0,t.fire("deselected",o),s.push(t))}),r.forEach(function(e){-1===t.indexOf(e)&&(i=!0,e.fire("selected",o),n.push(e))}),t.length>0&&r.length>0?(o.selected=n,o.deselected=s,o.updated=n[0]||s[0],o.target=this._activeObject,i&&this.fire("selection:updated",o)):r.length>0?(1===r.length&&(o.target=n[0],this.fire("object:selected",o)),o.selected=n,o.target=this._activeObject,this.fire("selection:created",o)):t.length>0&&(o.deselected=s,this.fire("selection:cleared",o))},setActiveObject:function(t,e){var i=this.getActiveObjects();return this._setActiveObject(t,e),this._fireSelectionEvents(i,e),this},_setActiveObject:function(t,e){return this._activeObject!==t&&(!!this._discardActiveObject(e,t)&&(!t.onSelect({e:e})&&(this._activeObject=t,!0)))},_discardActiveObject:function(t,e){var i=this._activeObject;if(i){if(i.onDeselect({e:t,object:e}))return!1;this._activeObject=null}return!0},discardActiveObject:function(t){var e=this.getActiveObjects();return e.length&&this.fire("before:selection:cleared",{target:e[0],e:t}),this._discardActiveObject(t),this._fireSelectionEvents(e,t),this},dispose:function(){var t=this.wrapperEl;return this.removeListeners(),t.removeChild(this.upperCanvasEl),t.removeChild(this.lowerCanvasEl),delete this.upperCanvasEl,t.parentNode&&t.parentNode.replaceChild(this.lowerCanvasEl,this.wrapperEl),delete this.wrapperEl,fabric.StaticCanvas.prototype.dispose.call(this),this},clear:function(){return this.discardActiveObject(),this.clearContext(this.contextTop),this.callSuper("clear")},drawControls:function(t){var e=this._activeObject;e&&e._renderControls(t)},_toObject:function(t,e,i){var r=this._realizeGroupTransformOnObject(t),n=this.callSuper("_toObject",t,e,i);return this._unwindGroupTransformOnObject(t,r),n},_realizeGroupTransformOnObject:function(t){if(t.group&&"activeSelection"===t.group.type&&this._activeObject===t.group){var e={};return["angle","flipX","flipY","left","scaleX","scaleY","skewX","skewY","top"].forEach(function(i){e[i]=t[i]}),this._activeObject.realizeTransform(t),e}return null},_unwindGroupTransformOnObject:function(t,e){e&&t.set(e)},_setSVGObject:function(t,e,i){var r=this._realizeGroupTransformOnObject(e);this.callSuper("_setSVGObject",t,e,i),this._unwindGroupTransformOnObject(e,r)}});for(var o in fabric.StaticCanvas)"prototype"!==o&&(fabric.Canvas[o]=fabric.StaticCanvas[o]);fabric.isTouchSupported&&(fabric.Canvas.prototype._setCursorFromEvent=function(){})}(),function(){function t(t,e){return"which"in t?t.which===e:t.button===e-1}var e={mt:0,tr:1,mr:2,br:3,mb:4,bl:5,ml:6,tl:7},i=fabric.util.addListener,r=fabric.util.removeListener;fabric.util.object.extend(fabric.Canvas.prototype,{cursorMap:["n-resize","ne-resize","e-resize","se-resize","s-resize","sw-resize","w-resize","nw-resize"],_initEventListeners:function(){this.removeListeners(),this._bindEvents(),i(fabric.window,"resize",this._onResize),i(this.upperCanvasEl,"mousedown",this._onMouseDown),i(this.upperCanvasEl,"dblclick",this._onDoubleClick),i(this.upperCanvasEl,"mousemove",this._onMouseMove),i(this.upperCanvasEl,"mouseout",this._onMouseOut),i(this.upperCanvasEl,"mouseenter",this._onMouseEnter),i(this.upperCanvasEl,"wheel",this._onMouseWheel),i(this.upperCanvasEl,"contextmenu",this._onContextMenu),i(this.upperCanvasEl,"dragover",this._onDragOver),i(this.upperCanvasEl,"dragenter",this._onDragEnter),i(this.upperCanvasEl,"dragleave",this._onDragLeave),i(this.upperCanvasEl,"drop",this._onDrop),i(this.upperCanvasEl,"touchstart",this._onMouseDown,{passive:!1}),i(this.upperCanvasEl,"touchmove",this._onMouseMove,{passive:!1}),"undefined"!=typeof eventjs&&"add"in eventjs&&(eventjs.add(this.upperCanvasEl,"gesture",this._onGesture),eventjs.add(this.upperCanvasEl,"drag",this._onDrag),eventjs.add(this.upperCanvasEl,"orientation",this._onOrientationChange),eventjs.add(this.upperCanvasEl,"shake",this._onShake),eventjs.add(this.upperCanvasEl,"longpress",this._onLongPress))},_bindEvents:function(){this.eventsBound||(this._onMouseDown=this._onMouseDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),this._onMouseUp=this._onMouseUp.bind(this),this._onResize=this._onResize.bind(this),this._onGesture=this._onGesture.bind(this),this._onDrag=this._onDrag.bind(this),this._onShake=this._onShake.bind(this),this._onLongPress=this._onLongPress.bind(this),this._onOrientationChange=this._onOrientationChange.bind(this),this._onMouseWheel=this._onMouseWheel.bind(this),this._onMouseOut=this._onMouseOut.bind(this),this._onMouseEnter=this._onMouseEnter.bind(this),this._onContextMenu=this._onContextMenu.bind(this),this._onDoubleClick=this._onDoubleClick.bind(this),this._onDragOver=this._onDragOver.bind(this),this._onDragEnter=this._simpleEventHandler.bind(this,"dragenter"),this._onDragLeave=this._simpleEventHandler.bind(this,"dragleave"),this._onDrop=this._simpleEventHandler.bind(this,"drop"),this.eventsBound=!0)},removeListeners:function(){r(fabric.window,"resize",this._onResize),r(this.upperCanvasEl,"mousedown",this._onMouseDown),r(this.upperCanvasEl,"mousemove",this._onMouseMove),r(this.upperCanvasEl,"mouseout",this._onMouseOut),r(this.upperCanvasEl,"mouseenter",this._onMouseEnter),r(this.upperCanvasEl,"wheel",this._onMouseWheel),r(this.upperCanvasEl,"contextmenu",this._onContextMenu),r(this.upperCanvasEl,"doubleclick",this._onDoubleClick),r(this.upperCanvasEl,"touchstart",this._onMouseDown),r(this.upperCanvasEl,"touchmove",this._onMouseMove),r(this.upperCanvasEl,"dragover",this._onDragOver),r(this.upperCanvasEl,"dragenter",this._onDragEnter),r(this.upperCanvasEl,"dragleave",this._onDragLeave),r(this.upperCanvasEl,"drop",this._onDrop),"undefined"!=typeof eventjs&&"remove"in eventjs&&(eventjs.remove(this.upperCanvasEl,"gesture",this._onGesture),eventjs.remove(this.upperCanvasEl,"drag",this._onDrag),eventjs.remove(this.upperCanvasEl,"orientation",this._onOrientationChange),eventjs.remove(this.upperCanvasEl,"shake",this._onShake),eventjs.remove(this.upperCanvasEl,"longpress",this._onLongPress))},_onGesture:function(t,e){this.__onTransformGesture&&this.__onTransformGesture(t,e)},_onDrag:function(t,e){this.__onDrag&&this.__onDrag(t,e)},_onMouseWheel:function(t){this.__onMouseWheel(t)},_onMouseOut:function(t){var e=this._hoveredTarget;this.fire("mouse:out",{target:e,e:t}),this._hoveredTarget=null,e&&e.fire("mouseout",{e:t}),this._iTextInstances&&this._iTextInstances.forEach(function(t){t.isEditing&&t.hiddenTextarea.focus()})},_onMouseEnter:function(t){this.findTarget(t)||(this.fire("mouse:over",{target:null,e:t}),this._hoveredTarget=null)},_onOrientationChange:function(t,e){this.__onOrientationChange&&this.__onOrientationChange(t,e)},_onShake:function(t,e){this.__onShake&&this.__onShake(t,e)},_onLongPress:function(t,e){this.__onLongPress&&this.__onLongPress(t,e)},_onDragOver:function(t){t.preventDefault();var e=this._simpleEventHandler("dragover",t);this._fireEnterLeaveEvents(e,t)},_onContextMenu:function(t){return this.stopContextMenu&&(t.stopPropagation(),t.preventDefault()),!1},_onDoubleClick:function(t){this._handleEvent(t,"dblclick")},_onMouseDown:function(t){this.__onMouseDown(t),i(fabric.document,"touchend",this._onMouseUp,{passive:!1}),i(fabric.document,"touchmove",this._onMouseMove,{passive:!1}),r(this.upperCanvasEl,"mousemove",this._onMouseMove),r(this.upperCanvasEl,"touchmove",this._onMouseMove),"touchstart"===t.type?r(this.upperCanvasEl,"mousedown",this._onMouseDown):(i(fabric.document,"mouseup",this._onMouseUp),i(fabric.document,"mousemove",this._onMouseMove))},_onMouseUp:function(t){if(this.__onMouseUp(t),r(fabric.document,"mouseup",this._onMouseUp),r(fabric.document,"touchend",this._onMouseUp),r(fabric.document,"mousemove",this._onMouseMove),r(fabric.document,"touchmove",this._onMouseMove),i(this.upperCanvasEl,"mousemove",this._onMouseMove),i(this.upperCanvasEl,"touchmove",this._onMouseMove,{passive:!1}),"touchend"===t.type){var e=this;setTimeout(function(){i(e.upperCanvasEl,"mousedown",e._onMouseDown)},400)}},_onMouseMove:function(t){!this.allowTouchScrolling&&t.preventDefault&&t.preventDefault(),this.__onMouseMove(t)},_onResize:function(){this.calcOffset()},_shouldRender:function(t,e){var i=this._activeObject;return(!i||!i.isEditing||t!==i)&&!!(t&&(t.isMoving||t!==i)||!t&&i||!t&&!i&&!this._groupSelector||e&&this._previousPointer&&this.selection&&(e.x!==this._previousPointer.x||e.y!==this._previousPointer.y))},__onMouseUp:function(e){var i,r=!0,n=this._currentTransform,s=this._groupSelector,o=!s||0===s.left&&0===s.top;if(t(e,3))this.fireRightClick&&this._handleEvent(e,"up",i,3,o);else if(t(e,2))this.fireMiddleClick&&this._handleEvent(e,"up",i,2,o);else if(this.isDrawingMode&&this._isCurrentlyDrawing)this._onMouseUpInDrawingMode(e);else{n&&(this._finalizeCurrentTransform(e),r=!n.actionPerformed),i=r?this.findTarget(e,!0):n.target;var a=this._shouldRender(i,this.getPointer(e));i||!o?this._maybeGroupObjects(e):(this._groupSelector=null,this._currentTransform=null),i&&(i.isMoving=!1),this._setCursorFromEvent(e,i),this._handleEvent(e,"up",i||null,1,o),i&&(i.__corner=0),a&&this.requestRenderAll()}},_simpleEventHandler:function(t,e){var i=this.findTarget(e),r=this.targets,n={e:e,target:i,subTargets:r};if(this.fire(t,n),i&&i.fire(t,n),!r)return i;for(var s=0;s<r.length;s++)r[s].fire(t,n);return i},_handleEvent:function(t,e,i,r,n){var s=void 0===i?this.findTarget(t):i,o=this.targets||[],a={e:t,target:s,subTargets:o,button:r||1,isClick:n||!1};this.fire("mouse:"+e,a),s&&s.fire("mouse"+e,a);for(var h=0;h<o.length;h++)o[h].fire("mouse"+e,a)},_finalizeCurrentTransform:function(t){var e=this._currentTransform,i=e.target;i._scaling&&(i._scaling=!1),i.setCoords(),this._restoreOriginXY(i),(e.actionPerformed||this.stateful&&i.hasStateChanged())&&(this.fire("object:modified",{target:i,e:t}),i.fire("modified",{e:t}))},_restoreOriginXY:function(t){if(this._previousOriginX&&this._previousOriginY){var e=t.translateToOriginPoint(t.getCenterPoint(),this._previousOriginX,this._previousOriginY);t.originX=this._previousOriginX,t.originY=this._previousOriginY,t.left=e.x,t.top=e.y,this._previousOriginX=null,this._previousOriginY=null}},_onMouseDownInDrawingMode:function(t){this._isCurrentlyDrawing=!0,this.getActiveObject()&&this.discardActiveObject(t).requestRenderAll(),this.clipTo&&fabric.util.clipContext(this,this.contextTop);var e=this.getPointer(t);this.freeDrawingBrush.onMouseDown(e),this._handleEvent(t,"down")},_onMouseMoveInDrawingMode:function(t){if(this._isCurrentlyDrawing){var e=this.getPointer(t);this.freeDrawingBrush.onMouseMove(e)}this.setCursor(this.freeDrawingCursor),this._handleEvent(t,"move")},_onMouseUpInDrawingMode:function(t){this._isCurrentlyDrawing=!1,this.clipTo&&this.contextTop.restore(),this.freeDrawingBrush.onMouseUp(),this._handleEvent(t,"up")},__onMouseDown:function(e){var i=this.findTarget(e)||null;if(t(e,3))this.fireRightClick&&this._handleEvent(e,"down",i,3);else if(t(e,2))this.fireMiddleClick&&this._handleEvent(e,"down",i,2);else if(this.isDrawingMode)this._onMouseDownInDrawingMode(e);else if(!this._currentTransform){var r=this.getPointer(e,!0);this._previousPointer=r;var n=this._shouldRender(i,r),s=this._shouldGroup(e,i);this._shouldClearSelection(e,i)?this.discardActiveObject(e):s&&(this._handleGrouping(e,i),i=this._activeObject),!this.selection||i&&(i.selectable||i.isEditing||i===this._activeObject)||(this._groupSelector={ex:r.x,ey:r.y,top:0,left:0}),i&&(i.selectable&&this.setActiveObject(i,e),i!==this._activeObject||!i.__corner&&s||(this._beforeTransform(e,i),this._setupCurrentTransform(e,i))),this._handleEvent(e,"down",i),n&&this.requestRenderAll()}},_beforeTransform:function(t,e){this.stateful&&e.saveState(),e._findTargetCorner(this.getPointer(t,!0))&&this.onBeforeScaleRotate(e)},_setOriginToCenter:function(t){this._previousOriginX=this._currentTransform.target.originX,this._previousOriginY=this._currentTransform.target.originY;var e=t.getCenterPoint();t.originX="center",t.originY="center",t.left=e.x,t.top=e.y,this._currentTransform.left=t.left,this._currentTransform.top=t.top},_setCenterToOrigin:function(t){var e=t.translateToOriginPoint(t.getCenterPoint(),this._previousOriginX,this._previousOriginY);t.originX=this._previousOriginX,t.originY=this._previousOriginY,t.left=e.x,t.top=e.y,this._previousOriginX=null,this._previousOriginY=null},__onMouseMove:function(t){var e,i;if(this.isDrawingMode)this._onMouseMoveInDrawingMode(t);else if(!(void 0!==t.touches&&t.touches.length>1)){var r=this._groupSelector;r?(i=this.getPointer(t,!0),r.left=i.x-r.ex,r.top=i.y-r.ey,this.renderTop()):this._currentTransform?this._transformObject(t):(e=this.findTarget(t)||null,this._setCursorFromEvent(t,e),this._fireOverOutEvents(e,t)),this._handleEvent(t,"move",this._currentTransform?null:e)}},_fireOverOutEvents:function(t,e){this.fireSynteticInOutEvents(t,e,{targetName:"_hoveredTarget",canvasEvtOut:"mouse:out",evtOut:"mouseout",canvasEvtIn:"mouse:over",evtIn:"mouseover"})},_fireEnterLeaveEvents:function(t,e){this.fireSynteticInOutEvents(t,e,{targetName:"_draggedoverTarget",evtOut:"dragleave",evtIn:"dragenter"})},fireSynteticInOutEvents:function(t,e,i){var r,n,s,o=this[i.targetName],a=o!==t,h=i.canvasEvtIn,c=i.canvasEvtOut;a&&(r={e:e,target:t,previousTarget:o},n={e:e,target:o,nextTarget:t},this[i.targetName]=t),s=t&&a,o&&a&&(c&&this.fire(c,n),o.fire(i.evtOut,n)),s&&(h&&this.fire(h,r),t.fire(i.evtIn,r))},__onMouseWheel:function(t){this._handleEvent(t,"wheel")},_transformObject:function(t){var e=this.getPointer(t),i=this._currentTransform;i.reset=!1,i.target.isMoving=!0,i.shiftKey=t.shiftKey,i.altKey=t[this.centeredKey],this._beforeScaleTransform(t,i),this._performTransformAction(t,i,e),i.actionPerformed&&this.requestRenderAll()},_performTransformAction:function(t,e,i){var r=i.x,n=i.y,s=e.target,o=e.action,a=!1;"rotate"===o?(a=this._rotateObject(r,n))&&this._fire("rotating",s,t):"scale"===o?(a=this._onScale(t,e,r,n))&&this._fire("scaling",s,t):"scaleX"===o?(a=this._scaleObject(r,n,"x"))&&this._fire("scaling",s,t):"scaleY"===o?(a=this._scaleObject(r,n,"y"))&&this._fire("scaling",s,t):"skewX"===o?(a=this._skewObject(r,n,"x"))&&this._fire("skewing",s,t):"skewY"===o?(a=this._skewObject(r,n,"y"))&&this._fire("skewing",s,t):(a=this._translateObject(r,n))&&(this._fire("moving",s,t),this.setCursor(s.moveCursor||this.moveCursor)),e.actionPerformed=e.actionPerformed||a},_fire:function(t,e,i){this.fire("object:"+t,{target:e,e:i}),e.fire(t,{e:i})},_beforeScaleTransform:function(t,e){if("scale"===e.action||"scaleX"===e.action||"scaleY"===e.action){var i=this._shouldCenterTransform(e.target);(i&&("center"!==e.originX||"center"!==e.originY)||!i&&"center"===e.originX&&"center"===e.originY)&&(this._resetCurrentTransform(),e.reset=!0)}},_onScale:function(t,e,i,r){return this._isUniscalePossible(t,e.target)?(e.currentAction="scale",this._scaleObject(i,r)):(e.reset||"scale"!==e.currentAction||this._resetCurrentTransform(),e.currentAction="scaleEqually",this._scaleObject(i,r,"equally"))},_isUniscalePossible:function(t,e){return(t[this.uniScaleKey]||this.uniScaleTransform)&&!e.get("lockUniScaling")},_setCursorFromEvent:function(t,e){if(!e)return this.setCursor(this.defaultCursor),!1;var i=e.hoverCursor||this.hoverCursor,r=this._activeObject&&"activeSelection"===this._activeObject.type?this._activeObject:null,n=(!r||!r.contains(e))&&e._findTargetCorner(this.getPointer(t,!0));n?this.setCursor(this.getCornerCursor(n,e,t)):this.setCursor(i)},getCornerCursor:function(t,i,r){return this.actionIsDisabled(t,i,r)?this.notAllowedCursor:t in e?this._getRotatedCornerCursor(t,i,r):"mtr"===t&&i.hasRotatingPoint?this.rotationCursor:this.defaultCursor},actionIsDisabled:function(t,e,i){return"mt"===t||"mb"===t?i[this.altActionKey]?e.lockSkewingX:e.lockScalingY:"ml"===t||"mr"===t?i[this.altActionKey]?e.lockSkewingY:e.lockScalingX:"mtr"===t?e.lockRotation:this._isUniscalePossible(i,e)?e.lockScalingX&&e.lockScalingY:e.lockScalingX||e.lockScalingY},_getRotatedCornerCursor:function(t,i,r){var n=Math.round(i.angle%360/45);return n<0&&(n+=8),n+=e[t],r[this.altActionKey]&&e[t]%2==0&&(n+=2),n%=8,this.cursorMap[n]}})}(),function(){var t=Math.min,e=Math.max;fabric.util.object.extend(fabric.Canvas.prototype,{_shouldGroup:function(t,e){var i=this._activeObject;return i&&this._isSelectionKeyPressed(t)&&e&&e.selectable&&this.selection&&(i!==e||"activeSelection"===i.type)},_handleGrouping:function(t,e){var i=this._activeObject;i.__corner||(e!==i||(e=this.findTarget(t,!0)))&&(i&&"activeSelection"===i.type?this._updateActiveSelection(e,t):this._createActiveSelection(e,t))},_updateActiveSelection:function(t,e){var i=this._activeObject,r=i._objects.slice(0);i.contains(t)?(i.removeWithUpdate(t),this._hoveredTarget=t,1===i.size()&&this._setActiveObject(i.item(0),e)):(i.addWithUpdate(t),this._hoveredTarget=i),this._fireSelectionEvents(r,e)},_createActiveSelection:function(t,e){var i=this.getActiveObjects(),r=this._createGroup(t);this._hoveredTarget=r,this._setActiveObject(r,e),this._fireSelectionEvents(i,e)},_createGroup:function(t){var e=this.getObjects(),i=e.indexOf(this._activeObject)<e.indexOf(t)?[this._activeObject,t]:[t,this._activeObject];return this._activeObject.isEditing&&this._activeObject.exitEditing(),new fabric.ActiveSelection(i,{canvas:this})},_groupSelectedObjects:function(t){var e,i=this._collectObjects();1===i.length?this.setActiveObject(i[0],t):i.length>1&&(e=new fabric.ActiveSelection(i.reverse(),{canvas:this}),this.setActiveObject(e,t))},_collectObjects:function(){for(var i,r=[],n=this._groupSelector.ex,s=this._groupSelector.ey,o=n+this._groupSelector.left,a=s+this._groupSelector.top,h=new fabric.Point(t(n,o),t(s,a)),c=new fabric.Point(e(n,o),e(s,a)),l=!this.selectionFullyContained,u=n===o&&s===a,f=this._objects.length;f--&&!((i=this._objects[f])&&i.selectable&&i.visible&&(l&&i.intersectsWithRect(h,c)||i.isContainedWithinRect(h,c)||l&&i.containsPoint(h)||l&&i.containsPoint(c))&&(r.push(i),u)););return r},_maybeGroupObjects:function(t){this.selection&&this._groupSelector&&this._groupSelectedObjects(t),this.setCursor(this.defaultCursor),this._groupSelector=null,this._currentTransform=null}})}(),function(){var t=fabric.StaticCanvas.supports("toDataURLWithQuality");fabric.util.object.extend(fabric.StaticCanvas.prototype,{toDataURL:function(t){t||(t={});var e=t.format||"png",i=t.quality||1,r=(t.multiplier||1)*(t.enableRetinaScaling?1:1/this.getRetinaScaling()),n={left:t.left||0,top:t.top||0,width:t.width||0,height:t.height||0};return this.__toDataURLWithMultiplier(e,i,n,r)},__toDataURLWithMultiplier:function(t,e,i,r){var n=this.width,s=this.height,o=(i.width||this.width)*r,a=(i.height||this.height)*r,h=this.getZoom()*r,c=this.viewportTransform,l=[h,0,0,h,(c[4]-i.left)*r,(c[5]-i.top)*r],u=this.interactive,f=this.skipOffscreen,d=n!==o||s!==a;this.viewportTransform=l,this.skipOffscreen=!1,this.interactive=!1,d&&this.setDimensions({width:o,height:a},{backstoreOnly:!0}),this.renderAll();var g=this.__toDataURL(t,e,i);return this.interactive=u,this.skipOffscreen=f,this.viewportTransform=c,d&&this.setDimensions({width:n,height:s},{backstoreOnly:!0}),this.renderAll(),g},__toDataURL:function(e,i){var r=this.contextContainer.canvas;"jpg"===e&&(e="jpeg");return t?r.toDataURL("image/"+e,i):r.toDataURL("image/"+e)}})}(),fabric.util.object.extend(fabric.StaticCanvas.prototype,{loadFromDatalessJSON:function(t,e,i){return this.loadFromJSON(t,e,i)},loadFromJSON:function(t,e,i){if(t){var r="string"==typeof t?JSON.parse(t):fabric.util.object.clone(t),n=this,s=this.renderOnAddRemove;return this.renderOnAddRemove=!1,this._enlivenObjects(r.objects,function(t){n.clear(),n._setBgOverlay(r,function(){t.forEach(function(t,e){n.insertAt(t,e)}),n.renderOnAddRemove=s,delete r.objects,delete r.backgroundImage,delete r.overlayImage,delete r.background,delete r.overlay,n._setOptions(r),n.renderAll(),e&&e()})},i),this}},_setBgOverlay:function(t,e){var i={backgroundColor:!1,overlayColor:!1,backgroundImage:!1,overlayImage:!1};if(t.backgroundImage||t.overlayImage||t.background||t.overlay){var r=function(){i.backgroundImage&&i.overlayImage&&i.backgroundColor&&i.overlayColor&&e&&e()};this.__setBgOverlay("backgroundImage",t.backgroundImage,i,r),this.__setBgOverlay("overlayImage",t.overlayImage,i,r),this.__setBgOverlay("backgroundColor",t.background,i,r),this.__setBgOverlay("overlayColor",t.overlay,i,r)}else e&&e()},__setBgOverlay:function(t,e,i,r){var n=this;if(!e)return i[t]=!0,void(r&&r());"backgroundImage"===t||"overlayImage"===t?fabric.util.enlivenObjects([e],function(e){n[t]=e[0],i[t]=!0,r&&r()}):this["set"+fabric.util.string.capitalize(t,!0)](e,function(){i[t]=!0,r&&r()})},_enlivenObjects:function(t,e,i){t&&0!==t.length?fabric.util.enlivenObjects(t,function(t){e&&e(t)},null,i):e&&e([])},_toDataURL:function(t,e){this.clone(function(i){e(i.toDataURL(t))})},_toDataURLWithMultiplier:function(t,e,i){this.clone(function(r){i(r.toDataURLWithMultiplier(t,e))})},clone:function(t,e){var i=JSON.stringify(this.toJSON(e));this.cloneWithoutData(function(e){e.loadFromJSON(i,function(){t&&t(e)})})},cloneWithoutData:function(t){var e=fabric.document.createElement("canvas");e.width=this.width,e.height=this.height;var i=new fabric.Canvas(e);i.clipTo=this.clipTo,this.backgroundImage?(i.setBackgroundImage(this.backgroundImage.src,function(){i.renderAll(),t&&t(i)}),i.backgroundImageOpacity=this.backgroundImageOpacity,i.backgroundImageStretch=this.backgroundImageStretch):t&&t(i)}}),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.util.object.clone,n=e.util.toFixed,s=e.util.string.capitalize,o=e.util.degreesToRadians,a=e.StaticCanvas.supports("setLineDash"),h=!e.isLikelyNode;e.Object||(e.Object=e.util.createClass(e.CommonMethods,{type:"object",originX:"left",originY:"top",top:0,left:0,width:0,height:0,scaleX:1,scaleY:1,flipX:!1,flipY:!1,opacity:1,angle:0,skewX:0,skewY:0,cornerSize:13,transparentCorners:!0,hoverCursor:null,moveCursor:null,padding:0,borderColor:"rgba(102,153,255,0.75)",borderDashArray:null,cornerColor:"rgba(102,153,255,0.5)",cornerStrokeColor:null,cornerStyle:"rect",cornerDashArray:null,centeredScaling:!1,centeredRotation:!0,fill:"rgb(0,0,0)",fillRule:"nonzero",globalCompositeOperation:"source-over",backgroundColor:"",selectionBackgroundColor:"",stroke:null,strokeWidth:1,strokeDashArray:null,strokeLineCap:"butt",strokeLineJoin:"miter",strokeMiterLimit:10,shadow:null,borderOpacityWhenMoving:.4,borderScaleFactor:1,transformMatrix:null,minScaleLimit:0,selectable:!0,evented:!0,visible:!0,hasControls:!0,hasBorders:!0,hasRotatingPoint:!0,rotatingPointOffset:40,perPixelTargetFind:!1,includeDefaultValues:!0,clipTo:null,lockMovementX:!1,lockMovementY:!1,lockRotation:!1,lockScalingX:!1,lockScalingY:!1,lockUniScaling:!1,lockSkewingX:!1,lockSkewingY:!1,lockScalingFlip:!1,excludeFromExport:!1,objectCaching:h,statefullCache:!1,noScaleCache:!0,dirty:!0,__corner:0,paintFirst:"fill",stateProperties:"top left width height scaleX scaleY flipX flipY originX originY transformMatrix stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit angle opacity fill globalCompositeOperation shadow clipTo visible backgroundColor skewX skewY fillRule paintFirst".split(" "),cacheProperties:"fill stroke strokeWidth strokeDashArray width height paintFirst strokeLineCap strokeLineJoin strokeMiterLimit backgroundColor".split(" "),initialize:function(t){t&&this.setOptions(t)},_createCacheCanvas:function(){this._cacheProperties={},this._cacheCanvas=e.document.createElement("canvas"),this._cacheContext=this._cacheCanvas.getContext("2d"),this._updateCacheCanvas()},_limitCacheSize:function(t){var i=e.perfLimitSizeTotal,r=t.width,n=t.height,s=e.maxCacheSideLimit,o=e.minCacheSideLimit;if(r<=s&&n<=s&&r*n<=i)return r<o&&(t.width=o),n<o&&(t.height=o),t;var a=r/n,h=e.util.limitDimsByArea(a,i),c=e.util.capValue,l=c(o,h.x,s),u=c(o,h.y,s);return r>l&&(t.zoomX/=r/l,t.width=l,t.capped=!0),n>u&&(t.zoomY/=n/u,t.height=u,t.capped=!0),t},_getCacheCanvasDimensions:function(){var t=this.canvas&&this.canvas.getZoom()||1,i=this.getObjectScaling(),r=this.canvas&&this.canvas._isRetinaScaling()?e.devicePixelRatio:1,n=this._getNonTransformedDimensions(),s=i.scaleX*t*r,o=i.scaleY*t*r;return{width:n.x*s+2,height:n.y*o+2,zoomX:s,zoomY:o,x:n.x,y:n.y}},_updateCacheCanvas:function(){if(this.noScaleCache&&this.canvas&&this.canvas._currentTransform){var t=this.canvas._currentTransform.target,i=this.canvas._currentTransform.action;if(this===t&&i.slice&&"scale"===i.slice(0,5))return!1}var r,n,s=this._cacheCanvas,o=this._limitCacheSize(this._getCacheCanvasDimensions()),a=e.minCacheSideLimit,h=o.width,c=o.height,l=o.zoomX,u=o.zoomY,f=h!==this.cacheWidth||c!==this.cacheHeight,d=this.zoomX!==l||this.zoomY!==u,g=f||d,p=0,v=0,m=!1;if(f){var b=this._cacheCanvas.width,_=this._cacheCanvas.height,y=h>b||c>_;m=y||(h<.9*b||c<.9*_)&&b>a&&_>a,y&&!o.capped&&(h>a||c>a)&&(p=.1*h,v=.1*c)}return!!g&&(m?(s.width=Math.ceil(h+p),s.height=Math.ceil(c+v)):(this._cacheContext.setTransform(1,0,0,1,0,0),this._cacheContext.clearRect(0,0,s.width,s.height)),r=o.x*l/2,n=o.y*u/2,this.cacheTranslationX=Math.round(s.width/2-r)+r,this.cacheTranslationY=Math.round(s.height/2-n)+n,this.cacheWidth=h,this.cacheHeight=c,this._cacheContext.translate(this.cacheTranslationX,this.cacheTranslationY),this._cacheContext.scale(l,u),this.zoomX=l,this.zoomY=u,!0)},setOptions:function(t){this._setOptions(t),this._initGradient(t.fill,"fill"),this._initGradient(t.stroke,"stroke"),this._initClipping(t),this._initPattern(t.fill,"fill"),this._initPattern(t.stroke,"stroke")},transform:function(t){var e;e=this.group&&!this.group._transformDone?this.calcTransformMatrix():this.calcOwnMatrix(),t.transform(e[0],e[1],e[2],e[3],e[4],e[5])},toObject:function(t){var i=e.Object.NUM_FRACTION_DIGITS,r={type:this.type,version:e.version,originX:this.originX,originY:this.originY,left:n(this.left,i),top:n(this.top,i),width:n(this.width,i),height:n(this.height,i),fill:this.fill&&this.fill.toObject?this.fill.toObject():this.fill,stroke:this.stroke&&this.stroke.toObject?this.stroke.toObject():this.stroke,strokeWidth:n(this.strokeWidth,i),strokeDashArray:this.strokeDashArray?this.strokeDashArray.concat():this.strokeDashArray,strokeLineCap:this.strokeLineCap,strokeLineJoin:this.strokeLineJoin,strokeMiterLimit:n(this.strokeMiterLimit,i),scaleX:n(this.scaleX,i),scaleY:n(this.scaleY,i),angle:n(this.angle,i),flipX:this.flipX,flipY:this.flipY,opacity:n(this.opacity,i),shadow:this.shadow&&this.shadow.toObject?this.shadow.toObject():this.shadow,visible:this.visible,clipTo:this.clipTo&&String(this.clipTo),backgroundColor:this.backgroundColor,fillRule:this.fillRule,paintFirst:this.paintFirst,globalCompositeOperation:this.globalCompositeOperation,transformMatrix:this.transformMatrix?this.transformMatrix.concat():null,skewX:n(this.skewX,i),skewY:n(this.skewY,i)};return e.util.populateWithProperties(this,r,t),this.includeDefaultValues||(r=this._removeDefaultValues(r)),r},toDatalessObject:function(t){return this.toObject(t)},_removeDefaultValues:function(t){var i=e.util.getKlass(t.type).prototype;return i.stateProperties.forEach(function(e){t[e]===i[e]&&delete t[e];"[object Array]"===Object.prototype.toString.call(t[e])&&"[object Array]"===Object.prototype.toString.call(i[e])&&0===t[e].length&&0===i[e].length&&delete t[e]}),t},toString:function(){return"#<fabric."+s(this.type)+">"},getObjectScaling:function(){var t=this.scaleX,e=this.scaleY;if(this.group){var i=this.group.getObjectScaling();t*=i.scaleX,e*=i.scaleY}return{scaleX:t,scaleY:e}},getObjectOpacity:function(){var t=this.opacity;return this.group&&(t*=this.group.getObjectOpacity()),t},_set:function(t,i){var r="scaleX"===t||"scaleY"===t,n=this[t]!==i,s=!1;return r&&(i=this._constrainScale(i)),"scaleX"===t&&i<0?(this.flipX=!this.flipX,i*=-1):"scaleY"===t&&i<0?(this.flipY=!this.flipY,i*=-1):"shadow"!==t||!i||i instanceof e.Shadow?"dirty"===t&&this.group&&this.group.set("dirty",i):i=new e.Shadow(i),this[t]=i,n&&(s=this.group&&this.group.isOnACache(),this.cacheProperties.indexOf(t)>-1?(this.dirty=!0,s&&this.group.set("dirty",!0)):s&&this.stateProperties.indexOf(t)>-1&&this.group.set("dirty",!0)),this},setOnGroup:function(){},getViewportTransform:function(){return this.canvas&&this.canvas.viewportTransform?this.canvas.viewportTransform:e.iMatrix.concat()},isNotVisible:function(){return 0===this.opacity||0===this.width&&0===this.height||!this.visible},render:function(t){this.isNotVisible()||this.canvas&&this.canvas.skipOffscreen&&!this.group&&!this.isOnScreen()||(t.save(),this._setupCompositeOperation(t),this.drawSelectionBackground(t),this.transform(t),this._setOpacity(t),this._setShadow(t,this),this.transformMatrix&&t.transform.apply(t,this.transformMatrix),this.clipTo&&e.util.clipContext(this,t),this.shouldCache()?(this._cacheCanvas||this._createCacheCanvas(),this.isCacheDirty()&&(this.statefullCache&&this.saveState({propertySet:"cacheProperties"}),this.drawObject(this._cacheContext),this.dirty=!1),this.drawCacheOnCanvas(t)):(this._removeCacheCanvas(),this.dirty=!1,this.drawObject(t),this.objectCaching&&this.statefullCache&&this.saveState({propertySet:"cacheProperties"})),this.clipTo&&t.restore(),t.restore())},_removeCacheCanvas:function(){this._cacheCanvas=null,this.cacheWidth=0,this.cacheHeight=0},needsItsOwnCache:function(){return"stroke"===this.paintFirst&&"object"==typeof this.shadow},shouldCache:function(){return this.ownCaching=this.objectCaching&&(!this.group||this.needsItsOwnCache()||!this.group.isOnACache()),this.ownCaching},willDrawShadow:function(){return!!this.shadow&&(0!==this.shadow.offsetX||0!==this.shadow.offsetY)},drawObject:function(t){this._renderBackground(t),this._setStrokeStyles(t,this),this._setFillStyles(t,this),this._render(t)},drawCacheOnCanvas:function(t){t.scale(1/this.zoomX,1/this.zoomY),t.drawImage(this._cacheCanvas,-this.cacheTranslationX,-this.cacheTranslationY)},isCacheDirty:function(t){if(this.isNotVisible())return!1;if(this._cacheCanvas&&!t&&this._updateCacheCanvas())return!0;if(this.dirty||this.statefullCache&&this.hasStateChanged("cacheProperties")){if(this._cacheCanvas&&!t){var e=this.cacheWidth/this.zoomX,i=this.cacheHeight/this.zoomY;this._cacheContext.clearRect(-e/2,-i/2,e,i)}return!0}return!1},_renderBackground:function(t){if(this.backgroundColor){var e=this._getNonTransformedDimensions();t.fillStyle=this.backgroundColor,t.fillRect(-e.x/2,-e.y/2,e.x,e.y),this._removeShadow(t)}},_setOpacity:function(t){this.group&&!this.group._transformDone?t.globalAlpha=this.getObjectOpacity():t.globalAlpha*=this.opacity},_setStrokeStyles:function(t,e){e.stroke&&(t.lineWidth=e.strokeWidth,t.lineCap=e.strokeLineCap,t.lineJoin=e.strokeLineJoin,t.miterLimit=e.strokeMiterLimit,t.strokeStyle=e.stroke.toLive?e.stroke.toLive(t,this):e.stroke)},_setFillStyles:function(t,e){e.fill&&(t.fillStyle=e.fill.toLive?e.fill.toLive(t,this):e.fill)},_setLineDash:function(t,e,i){e&&(1&e.length&&e.push.apply(e,e),a?t.setLineDash(e):i&&i(t))},_renderControls:function(t,i){var r,n,s,a=this.getViewportTransform(),h=this.calcTransformMatrix();n=void 0!==(i=i||{}).hasBorders?i.hasBorders:this.hasBorders,s=void 0!==i.hasControls?i.hasControls:this.hasControls,h=e.util.multiplyTransformMatrices(a,h),r=e.util.qrDecompose(h),t.save(),t.translate(r.translateX,r.translateY),t.lineWidth=1*this.borderScaleFactor,this.group||(t.globalAlpha=this.isMoving?this.borderOpacityWhenMoving:1),i.forActiveSelection?(t.rotate(o(r.angle)),n&&this.drawBordersInGroup(t,r,i)):(t.rotate(o(this.angle)),n&&this.drawBorders(t,i)),s&&this.drawControls(t,i),t.restore()},_setShadow:function(t){if(this.shadow){var i=this.canvas&&this.canvas.viewportTransform[0]||1,r=this.canvas&&this.canvas.viewportTransform[3]||1,n=this.getObjectScaling();this.canvas&&this.canvas._isRetinaScaling()&&(i*=e.devicePixelRatio,r*=e.devicePixelRatio),t.shadowColor=this.shadow.color,t.shadowBlur=this.shadow.blur*e.browserShadowBlurConstant*(i+r)*(n.scaleX+n.scaleY)/4,t.shadowOffsetX=this.shadow.offsetX*i*n.scaleX,t.shadowOffsetY=this.shadow.offsetY*r*n.scaleY}},_removeShadow:function(t){this.shadow&&(t.shadowColor="",t.shadowBlur=t.shadowOffsetX=t.shadowOffsetY=0)},_applyPatternGradientTransform:function(t,e){if(!e||!e.toLive)return{offsetX:0,offsetY:0};var i=e.gradientTransform||e.patternTransform,r=-this.width/2+e.offsetX||0,n=-this.height/2+e.offsetY||0;return t.translate(r,n),i&&t.transform(i[0],i[1],i[2],i[3],i[4],i[5]),{offsetX:r,offsetY:n}},_renderPaintInOrder:function(t){"stroke"===this.paintFirst?(this._renderStroke(t),this._renderFill(t)):(this._renderFill(t),this._renderStroke(t))},_renderFill:function(t){this.fill&&(t.save(),this._applyPatternGradientTransform(t,this.fill),"evenodd"===this.fillRule?t.fill("evenodd"):t.fill(),t.restore())},_renderStroke:function(t){this.stroke&&0!==this.strokeWidth&&(this.shadow&&!this.shadow.affectStroke&&this._removeShadow(t),t.save(),this._setLineDash(t,this.strokeDashArray,this._renderDashedStroke),this._applyPatternGradientTransform(t,this.stroke),t.stroke(),t.restore())},_findCenterFromElement:function(){return{x:this.left+this.width/2,y:this.top+this.height/2}},_assignTransformMatrixProps:function(){if(this.transformMatrix){var t=e.util.qrDecompose(this.transformMatrix);this.flipX=!1,this.flipY=!1,this.set("scaleX",t.scaleX),this.set("scaleY",t.scaleY),this.angle=t.angle,this.skewX=t.skewX,this.skewY=0}},_removeTransformMatrix:function(t){var i=this._findCenterFromElement();this.transformMatrix&&(this._assignTransformMatrixProps(),i=e.util.transformPoint(i,this.transformMatrix)),this.transformMatrix=null,t&&(this.scaleX*=t.scaleX,this.scaleY*=t.scaleY,this.cropX=t.cropX,this.cropY=t.cropY,i.x+=t.offsetLeft,i.y+=t.offsetTop,this.width=t.width,this.height=t.height),this.setPositionByOrigin(i,"center","center")},clone:function(t,i){var r=this.toObject(i);this.constructor.fromObject?this.constructor.fromObject(r,t):e.Object._fromObject("Object",r,t)},cloneAsImage:function(t,i){var r=this.toDataURL(i);return e.util.loadImage(r,function(i){t&&t(new e.Image(i))}),this},toDataURL:function(t){t||(t={});var i=e.util.createCanvasElement(),r=this.getBoundingRect();i.width=r.width,i.height=r.height,e.util.wrapElement(i,"div");var n=new e.StaticCanvas(i,{enableRetinaScaling:t.enableRetinaScaling,renderOnAddRemove:!1,skipOffscreen:!1});"jpg"===t.format&&(t.format="jpeg"),"jpeg"===t.format&&(n.backgroundColor="#fff");var s={left:this.left,top:this.top};this.setPositionByOrigin(new e.Point(n.width/2,n.height/2),"center","center");var o=this.canvas;n.add(this);var a=n.toDataURL(t);return this.set(s).setCoords(),this.canvas=o,n._objects=[],n.dispose(),n=null,a},isType:function(t){return this.type===t},complexity:function(){return 1},toJSON:function(t){return this.toObject(t)},setGradient:function(t,i){i||(i={});var r={colorStops:[]};return r.type=i.type||(i.r1||i.r2?"radial":"linear"),r.coords={x1:i.x1,y1:i.y1,x2:i.x2,y2:i.y2},(i.r1||i.r2)&&(r.coords.r1=i.r1,r.coords.r2=i.r2),r.gradientTransform=i.gradientTransform,e.Gradient.prototype.addColorStop.call(r,i.colorStops),this.set(t,e.Gradient.forObject(this,r))},setPatternFill:function(t){return this.set("fill",new e.Pattern(t))},setShadow:function(t){return this.set("shadow",t?new e.Shadow(t):null)},setColor:function(t){return this.set("fill",t),this},rotate:function(t){var e=("center"!==this.originX||"center"!==this.originY)&&this.centeredRotation;return e&&this._setOriginToCenter(),this.set("angle",t),e&&this._resetOrigin(),this},centerH:function(){return this.canvas&&this.canvas.centerObjectH(this),this},viewportCenterH:function(){return this.canvas&&this.canvas.viewportCenterObjectH(this),this},centerV:function(){return this.canvas&&this.canvas.centerObjectV(this),this},viewportCenterV:function(){return this.canvas&&this.canvas.viewportCenterObjectV(this),this},center:function(){return this.canvas&&this.canvas.centerObject(this),this},viewportCenter:function(){return this.canvas&&this.canvas.viewportCenterObject(this),this},getLocalPointer:function(t,i){i=i||this.canvas.getPointer(t);var r=new e.Point(i.x,i.y),n=this._getLeftTopCoords();return this.angle&&(r=e.util.rotatePoint(r,n,o(-this.angle))),{x:r.x-n.x,y:r.y-n.y}},_setupCompositeOperation:function(t){this.globalCompositeOperation&&(t.globalCompositeOperation=this.globalCompositeOperation)}}),e.util.createAccessors&&e.util.createAccessors(e.Object),i(e.Object.prototype,e.Observable),e.Object.NUM_FRACTION_DIGITS=2,e.Object._fromObject=function(t,i,n,s){var o=e[t];i=r(i,!0),e.util.enlivenPatterns([i.fill,i.stroke],function(t){void 0!==t[0]&&(i.fill=t[0]),void 0!==t[1]&&(i.stroke=t[1]);var e=s?new o(i[s],i):new o(i);n&&n(e)})},e.Object.__uid=0)}("undefined"!=typeof exports?exports:this),function(){var t=fabric.util.degreesToRadians,e={left:-.5,center:0,right:.5},i={top:-.5,center:0,bottom:.5};fabric.util.object.extend(fabric.Object.prototype,{translateToGivenOrigin:function(t,r,n,s,o){var a,h,c,l=t.x,u=t.y;return"string"==typeof r?r=e[r]:r-=.5,"string"==typeof s?s=e[s]:s-=.5,a=s-r,"string"==typeof n?n=i[n]:n-=.5,"string"==typeof o?o=i[o]:o-=.5,h=o-n,(a||h)&&(c=this._getTransformedDimensions(),l=t.x+a*c.x,u=t.y+h*c.y),new fabric.Point(l,u)},translateToCenterPoint:function(e,i,r){var n=this.translateToGivenOrigin(e,i,r,"center","center");return this.angle?fabric.util.rotatePoint(n,e,t(this.angle)):n},translateToOriginPoint:function(e,i,r){var n=this.translateToGivenOrigin(e,"center","center",i,r);return this.angle?fabric.util.rotatePoint(n,e,t(this.angle)):n},getCenterPoint:function(){var t=new fabric.Point(this.left,this.top);return this.translateToCenterPoint(t,this.originX,this.originY)},getPointByOrigin:function(t,e){var i=this.getCenterPoint();return this.translateToOriginPoint(i,t,e)},toLocalPoint:function(e,i,r){var n,s,o=this.getCenterPoint();return n=void 0!==i&&void 0!==r?this.translateToGivenOrigin(o,"center","center",i,r):new fabric.Point(this.left,this.top),s=new fabric.Point(e.x,e.y),this.angle&&(s=fabric.util.rotatePoint(s,o,-t(this.angle))),s.subtractEquals(n)},setPositionByOrigin:function(t,e,i){var r=this.translateToCenterPoint(t,e,i),n=this.translateToOriginPoint(r,this.originX,this.originY);this.set("left",n.x),this.set("top",n.y)},adjustPosition:function(i){var r,n,s=t(this.angle),o=this.getScaledWidth(),a=fabric.util.cos(s)*o,h=fabric.util.sin(s)*o;r="string"==typeof this.originX?e[this.originX]:this.originX-.5,n="string"==typeof i?e[i]:i-.5,this.left+=a*(n-r),this.top+=h*(n-r),this.setCoords(),this.originX=i},_setOriginToCenter:function(){this._originalOriginX=this.originX,this._originalOriginY=this.originY;var t=this.getCenterPoint();this.originX="center",this.originY="center",this.left=t.x,this.top=t.y},_resetOrigin:function(){var t=this.translateToOriginPoint(this.getCenterPoint(),this._originalOriginX,this._originalOriginY);this.originX=this._originalOriginX,this.originY=this._originalOriginY,this.left=t.x,this.top=t.y,this._originalOriginX=null,this._originalOriginY=null},_getLeftTopCoords:function(){return this.translateToOriginPoint(this.getCenterPoint(),"left","top")},onDeselect:function(){}})}(),function(){var t=fabric.util.degreesToRadians,e=fabric.util.multiplyTransformMatrices,i=fabric.util.transformPoint;fabric.util.object.extend(fabric.Object.prototype,{oCoords:null,aCoords:null,ownMatrixCache:null,matrixCache:null,getCoords:function(t,e){this.oCoords||this.setCoords();var i=t?this.aCoords:this.oCoords;return function(t){return[new fabric.Point(t.tl.x,t.tl.y),new fabric.Point(t.tr.x,t.tr.y),new fabric.Point(t.br.x,t.br.y),new fabric.Point(t.bl.x,t.bl.y)]}(e?this.calcCoords(t):i)},intersectsWithRect:function(t,e,i,r){var n=this.getCoords(i,r);return"Intersection"===fabric.Intersection.intersectPolygonRectangle(n,t,e).status},intersectsWithObject:function(t,e,i){return"Intersection"===fabric.Intersection.intersectPolygonPolygon(this.getCoords(e,i),t.getCoords(e,i)).status||t.isContainedWithinObject(this,e,i)||this.isContainedWithinObject(t,e,i)},isContainedWithinObject:function(t,e,i){for(var r=this.getCoords(e,i),n=0,s=t._getImageLines(i?t.calcCoords(e):e?t.aCoords:t.oCoords);n<4;n++)if(!t.containsPoint(r[n],s))return!1;return!0},isContainedWithinRect:function(t,e,i,r){var n=this.getBoundingRect(i,r);return n.left>=t.x&&n.left+n.width<=e.x&&n.top>=t.y&&n.top+n.height<=e.y},containsPoint:function(t,e,i,r){var e=e||this._getImageLines(r?this.calcCoords(i):i?this.aCoords:this.oCoords),n=this._findCrossPoints(t,e);return 0!==n&&n%2==1},isOnScreen:function(t){if(!this.canvas)return!1;for(var e,i=this.canvas.vptCoords.tl,r=this.canvas.vptCoords.br,n=this.getCoords(!0,t),s=0;s<4;s++)if((e=n[s]).x<=r.x&&e.x>=i.x&&e.y<=r.y&&e.y>=i.y)return!0;if(this.intersectsWithRect(i,r,!0,t))return!0;var o={x:(i.x+r.x)/2,y:(i.y+r.y)/2};return!!this.containsPoint(o,null,!0,t)},_getImageLines:function(t){return{topline:{o:t.tl,d:t.tr},rightline:{o:t.tr,d:t.br},bottomline:{o:t.br,d:t.bl},leftline:{o:t.bl,d:t.tl}}},_findCrossPoints:function(t,e){var i,r,n,s,o=0;for(var a in e)if(!((s=e[a]).o.y<t.y&&s.d.y<t.y||s.o.y>=t.y&&s.d.y>=t.y||(s.o.x===s.d.x&&s.o.x>=t.x?n=s.o.x:(i=0,r=(s.d.y-s.o.y)/(s.d.x-s.o.x),n=-(t.y-i*t.x-(s.o.y-r*s.o.x))/(i-r)),n>=t.x&&(o+=1),2!==o)))break;return o},getBoundingRect:function(t,e){var i=this.getCoords(t,e);return fabric.util.makeBoundingBoxFromPoints(i)},getScaledWidth:function(){return this._getTransformedDimensions().x},getScaledHeight:function(){return this._getTransformedDimensions().y},_constrainScale:function(t){return Math.abs(t)<this.minScaleLimit?t<0?-this.minScaleLimit:this.minScaleLimit:0===t?1e-4:t},scale:function(t){return this._set("scaleX",t),this._set("scaleY",t),this.setCoords()},scaleToWidth:function(t,e){var i=this.getBoundingRect(e).width/this.getScaledWidth();return this.scale(t/this.width/i)},scaleToHeight:function(t,e){var i=this.getBoundingRect(e).height/this.getScaledHeight();return this.scale(t/this.height/i)},calcCoords:function(r){var n=this._calcRotateMatrix(),s=this._calcTranslateMatrix(),o=e(s,n),a=this.getViewportTransform(),h=r?o:e(a,o),c=this._getTransformedDimensions(),l=c.x/2,u=c.y/2,f=i({x:-l,y:-u},h),d=i({x:l,y:-u},h),g=i({x:-l,y:u},h),p=i({x:l,y:u},h);if(!r){var v=this.padding,m=t(this.angle),b=fabric.util.cos(m),_=fabric.util.sin(m),y=b*v,x=_*v,C=y+x,S=y-x;v&&(f.x-=S,f.y-=C,d.x+=C,d.y-=S,g.x-=C,g.y+=S,p.x+=S,p.y+=C);var w=new fabric.Point((f.x+g.x)/2,(f.y+g.y)/2),T=new fabric.Point((d.x+f.x)/2,(d.y+f.y)/2),O=new fabric.Point((p.x+d.x)/2,(p.y+d.y)/2),k=new fabric.Point((p.x+g.x)/2,(p.y+g.y)/2),D=new fabric.Point(T.x+_*this.rotatingPointOffset,T.y-b*this.rotatingPointOffset)}var E={tl:f,tr:d,br:p,bl:g};return r||(E.ml=w,E.mt=T,E.mr=O,E.mb=k,E.mtr=D),E},setCoords:function(t,e){return this.oCoords=this.calcCoords(t),e||(this.aCoords=this.calcCoords(!0)),t||this._setCornerCoords&&this._setCornerCoords(),this},_calcRotateMatrix:function(){if(this.angle){var e=t(this.angle),i=fabric.util.cos(e),r=fabric.util.sin(e);return[i,r,-r,i,0,0]}return fabric.iMatrix.concat()},_calcTranslateMatrix:function(){var t=this.getCenterPoint();return[1,0,0,1,t.x,t.y]},transformMatrixKey:function(t){var e="";return!t&&this.group&&(e=this.group.transformMatrixKey(t)+"_"),e+this.top+"_"+this.left+"_"+this.scaleX+"_"+this.scaleY+"_"+this.skewX+"_"+this.skewY+"_"+this.angle+"_"+this.originX+"_"+this.originY+"_"+this.width+"_"+this.height+"_"+this.strokeWidth+this.flipX+this.flipY},calcTransformMatrix:function(t){if(t)return this.calcOwnMatrix();var i=this.transformMatrixKey(),r=this.matrixCache||(this.matrixCache={});if(r.key===i)return r.value;var n=this.calcOwnMatrix();return this.group&&(n=e(this.group.calcTransformMatrix(),n)),r.key=i,r.value=n,n},calcOwnMatrix:function(){var t=this.transformMatrixKey(!0),i=this.ownMatrixCache||(this.ownMatrixCache={});if(i.key===t)return i.value;var r,n=this._calcTranslateMatrix(),s=this._calcDimensionsTransformMatrix(this.skewX,this.skewY,!0);return this.angle&&(r=this._calcRotateMatrix(),n=e(n,r)),n=e(n,s),i.key=t,i.value=n,n},_calcDimensionsTransformMatrix:function(i,r,n){var s,o=[this.scaleX*(n&&this.flipX?-1:1),0,0,this.scaleY*(n&&this.flipY?-1:1),0,0];return i&&(s=[1,0,Math.tan(t(i)),1],o=e(o,s,!0)),r&&(s=[1,Math.tan(t(r)),0,1],o=e(o,s,!0)),o},_getNonTransformedDimensions:function(){var t=this.strokeWidth;return{x:this.width+t,y:this.height+t}},_getTransformedDimensions:function(t,e){void 0===t&&(t=this.skewX),void 0===e&&(e=this.skewY);var i=this._getNonTransformedDimensions();if(0===t&&0===e)return{x:i.x*this.scaleX,y:i.y*this.scaleY};var r,n,s=i.x/2,o=i.y/2,a=[{x:-s,y:-o},{x:s,y:-o},{x:-s,y:o},{x:s,y:o}],h=this._calcDimensionsTransformMatrix(t,e,!1);for(r=0;r<a.length;r++)a[r]=fabric.util.transformPoint(a[r],h);return n=fabric.util.makeBoundingBoxFromPoints(a),{x:n.width,y:n.height}},_calculateCurrentDimensions:function(){var t=this.getViewportTransform(),e=this._getTransformedDimensions();return fabric.util.transformPoint(e,t,!0).scalarAdd(2*this.padding)}})}(),fabric.util.object.extend(fabric.Object.prototype,{sendToBack:function(){return this.group?fabric.StaticCanvas.prototype.sendToBack.call(this.group,this):this.canvas.sendToBack(this),this},bringToFront:function(){return this.group?fabric.StaticCanvas.prototype.bringToFront.call(this.group,this):this.canvas.bringToFront(this),this},sendBackwards:function(t){return this.group?fabric.StaticCanvas.prototype.sendBackwards.call(this.group,this,t):this.canvas.sendBackwards(this,t),this},bringForward:function(t){return this.group?fabric.StaticCanvas.prototype.bringForward.call(this.group,this,t):this.canvas.bringForward(this,t),this},moveTo:function(t){return this.group&&"activeSelection"!==this.group.type?fabric.StaticCanvas.prototype.moveTo.call(this.group,this,t):this.canvas.moveTo(this,t),this}}),function(){function t(t,e){if(e){if(e.toLive)return t+": url(#SVGID_"+e.id+"); ";var i=new fabric.Color(e),r=t+": "+i.toRgb()+"; ",n=i.getAlpha();return 1!==n&&(r+=t+"-opacity: "+n.toString()+"; "),r}return t+": none; "}var e=fabric.util.toFixed;fabric.util.object.extend(fabric.Object.prototype,{getSvgStyles:function(e){var i=this.fillRule,r=this.strokeWidth?this.strokeWidth:"0",n=this.strokeDashArray?this.strokeDashArray.join(" "):"none",s=this.strokeLineCap?this.strokeLineCap:"butt",o=this.strokeLineJoin?this.strokeLineJoin:"miter",a=this.strokeMiterLimit?this.strokeMiterLimit:"4",h=void 0!==this.opacity?this.opacity:"1",c=this.visible?"":" visibility: hidden;",l=e?"":this.getSvgFilter(),u=t("fill",this.fill);return[t("stroke",this.stroke),"stroke-width: ",r,"; ","stroke-dasharray: ",n,"; ","stroke-linecap: ",s,"; ","stroke-linejoin: ",o,"; ","stroke-miterlimit: ",a,"; ",u,"fill-rule: ",i,"; ","opacity: ",h,";",l,c].join("")},getSvgSpanStyles:function(e,i){var r=e.strokeWidth?"stroke-width: "+e.strokeWidth+"; ":"",n=e.fontFamily?"font-family: "+e.fontFamily.replace(/"/g,"'")+"; ":"",s=e.fontSize?"font-size: "+e.fontSize+"px; ":"",o=e.fontStyle?"font-style: "+e.fontStyle+"; ":"",a=e.fontWeight?"font-weight: "+e.fontWeight+"; ":"",h=e.fill?t("fill",e.fill):"",c=e.stroke?t("stroke",e.stroke):"",l=this.getSvgTextDecoration(e),u=e.deltaY?"baseline-shift: "+-e.deltaY+"; ":"";return l&&(l="text-decoration: "+l+"; "),[c,r,n,s,o,a,l,h,u,i?"white-space: pre; ":""].join("")},getSvgTextDecoration:function(t){return"overline"in t||"underline"in t||"linethrough"in t?(t.overline?"overline ":"")+(t.underline?"underline ":"")+(t.linethrough?"line-through ":""):""},getSvgFilter:function(){return this.shadow?"filter: url(#SVGID_"+this.shadow.id+");":""},getSvgId:function(){return this.id?'id="'+this.id+'" ':""},getSvgTransform:function(){var t=this.angle,i=this.skewX%360,r=this.skewY%360,n=this.getCenterPoint(),s=fabric.Object.NUM_FRACTION_DIGITS,o="translate("+e(n.x,s)+" "+e(n.y,s)+")",a=0!==t?" rotate("+e(t,s)+")":"",h=1===this.scaleX&&1===this.scaleY?"":" scale("+e(this.scaleX,s)+" "+e(this.scaleY,s)+")",c=0!==i?" skewX("+e(i,s)+")":"",l=0!==r?" skewY("+e(r,s)+")":"";return[o,a,h,this.flipX?" matrix(-1 0 0 1 0 0) ":"",this.flipY?" matrix(1 0 0 -1 0 0)":"",c,l].join("")},getSvgTransformMatrix:function(){return this.transformMatrix?" matrix("+this.transformMatrix.join(" ")+") ":""},_setSVGBg:function(t){if(this.backgroundColor){var i=fabric.Object.NUM_FRACTION_DIGITS;t.push("\t\t<rect ",this._getFillAttributes(this.backgroundColor),' x="',e(-this.width/2,i),'" y="',e(-this.height/2,i),'" width="',e(this.width,i),'" height="',e(this.height,i),'"></rect>\n')}},_createBaseSVGMarkup:function(){var t=[];return this.fill&&this.fill.toLive&&t.push(this.fill.toSVG(this,!1)),this.stroke&&this.stroke.toLive&&t.push(this.stroke.toSVG(this,!1)),this.shadow&&t.push(this.shadow.toSVG(this)),t},addPaintOrder:function(){return"fill"!==this.paintFirst?' paint-order="'+this.paintFirst+'" ':""}})}(),function(){function t(t,e,r){var n={};r.forEach(function(e){n[e]=t[e]}),i(t[e],n,!0)}function e(t,i,r){if(t===i)return!0;if(Array.isArray(t)){if(t.length!==i.length)return!1;for(var n=0,s=t.length;n<s;n++)if(!e(t[n],i[n]))return!1;return!0}if(t&&"object"==typeof t){var o,a=Object.keys(t);if(!r&&a.length!==Object.keys(i).length)return!1;for(var n=0,s=a.length;n<s;n++)if(o=a[n],!e(t[o],i[o]))return!1;return!0}}var i=fabric.util.object.extend;fabric.util.object.extend(fabric.Object.prototype,{hasStateChanged:function(t){var i="_"+(t=t||"stateProperties");return Object.keys(this[i]).length<this[t].length||!e(this[i],this,!0)},saveState:function(e){var i=e&&e.propertySet||"stateProperties",r="_"+i;return this[r]?(t(this,r,this[i]),e&&e.stateProperties&&t(this,r,e.stateProperties),this):this.setupState(e)},setupState:function(t){var e=(t=t||{}).propertySet||"stateProperties";return t.propertySet=e,this["_"+e]={},this.saveState(t),this}})}(),function(){var t=fabric.util.degreesToRadians;fabric.util.object.extend(fabric.Object.prototype,{_controlsVisibility:null,_findTargetCorner:function(t){if(!this.hasControls||this.group||!this.canvas||this.canvas._activeObject!==this)return!1;var e,i,r=t.x,n=t.y;this.__corner=0;for(var s in this.oCoords)if(this.isControlVisible(s)&&("mtr"!==s||this.hasRotatingPoint)&&(!this.get("lockUniScaling")||"mt"!==s&&"mr"!==s&&"mb"!==s&&"ml"!==s)&&(i=this._getImageLines(this.oCoords[s].corner),0!==(e=this._findCrossPoints({x:r,y:n},i))&&e%2==1))return this.__corner=s,s;return!1},_setCornerCoords:function(){var e,i,r=this.oCoords,n=t(45-this.angle),s=.707106*this.cornerSize,o=s*fabric.util.cos(n),a=s*fabric.util.sin(n);for(var h in r)e=r[h].x,i=r[h].y,r[h].corner={tl:{x:e-a,y:i-o},tr:{x:e+o,y:i-a},bl:{x:e-o,y:i+a},br:{x:e+a,y:i+o}}},drawSelectionBackground:function(e){if(!this.selectionBackgroundColor||this.canvas&&!this.canvas.interactive||this.canvas&&this.canvas._activeObject!==this)return this;e.save();var i=this.getCenterPoint(),r=this._calculateCurrentDimensions(),n=this.canvas.viewportTransform;return e.translate(i.x,i.y),e.scale(1/n[0],1/n[3]),e.rotate(t(this.angle)),e.fillStyle=this.selectionBackgroundColor,e.fillRect(-r.x/2,-r.y/2,r.x,r.y),e.restore(),this},drawBorders:function(t,e){e=e||{};var i=this._calculateCurrentDimensions(),r=1/this.borderScaleFactor,n=i.x+r,s=i.y+r,o=void 0!==e.hasRotatingPoint?e.hasRotatingPoint:this.hasRotatingPoint,a=void 0!==e.hasControls?e.hasControls:this.hasControls,h=void 0!==e.rotatingPointOffset?e.rotatingPointOffset:this.rotatingPointOffset;if(t.save(),t.strokeStyle=e.borderColor||this.borderColor,this._setLineDash(t,e.borderDashArray||this.borderDashArray,null),t.strokeRect(-n/2,-s/2,n,s),o&&this.isControlVisible("mtr")&&a){var c=-s/2;t.beginPath(),t.moveTo(0,c),t.lineTo(0,c-h),t.stroke()}return t.restore(),this},drawBordersInGroup:function(t,e,i){i=i||{};var r=this._getNonTransformedDimensions(),n=fabric.util.customTransformMatrix(e.scaleX,e.scaleY,e.skewX),s=fabric.util.transformPoint(r,n),o=1/this.borderScaleFactor,a=s.x+o,h=s.y+o;return t.save(),this._setLineDash(t,i.borderDashArray||this.borderDashArray,null),t.strokeStyle=i.borderColor||this.borderColor,t.strokeRect(-a/2,-h/2,a,h),t.restore(),this},drawControls:function(t,e){e=e||{};var i=this._calculateCurrentDimensions(),r=i.x,n=i.y,s=e.cornerSize||this.cornerSize,o=-(r+s)/2,a=-(n+s)/2,h=void 0!==e.transparentCorners?e.transparentCorners:this.transparentCorners,c=void 0!==e.hasRotatingPoint?e.hasRotatingPoint:this.hasRotatingPoint,l=h?"stroke":"fill";return t.save(),t.strokeStyle=t.fillStyle=e.cornerColor||this.cornerColor,this.transparentCorners||(t.strokeStyle=e.cornerStrokeColor||this.cornerStrokeColor),this._setLineDash(t,e.cornerDashArray||this.cornerDashArray,null),this._drawControl("tl",t,l,o,a,e),this._drawControl("tr",t,l,o+r,a,e),this._drawControl("bl",t,l,o,a+n,e),this._drawControl("br",t,l,o+r,a+n,e),this.get("lockUniScaling")||(this._drawControl("mt",t,l,o+r/2,a,e),this._drawControl("mb",t,l,o+r/2,a+n,e),this._drawControl("mr",t,l,o+r,a+n/2,e),this._drawControl("ml",t,l,o,a+n/2,e)),c&&this._drawControl("mtr",t,l,o+r/2,a-this.rotatingPointOffset,e),t.restore(),this},_drawControl:function(t,e,i,r,n,s){if(s=s||{},this.isControlVisible(t)){var o=this.cornerSize,a=!this.transparentCorners&&this.cornerStrokeColor;switch(s.cornerStyle||this.cornerStyle){case"circle":e.beginPath(),e.arc(r+o/2,n+o/2,o/2,0,2*Math.PI,!1),e[i](),a&&e.stroke();break;default:this.transparentCorners||e.clearRect(r,n,o,o),e[i+"Rect"](r,n,o,o),a&&e.strokeRect(r,n,o,o)}}},isControlVisible:function(t){return this._getControlsVisibility()[t]},setControlVisible:function(t,e){return this._getControlsVisibility()[t]=e,this},setControlsVisibility:function(t){t||(t={});for(var e in t)this.setControlVisible(e,t[e]);return this},_getControlsVisibility:function(){return this._controlsVisibility||(this._controlsVisibility={tl:!0,tr:!0,br:!0,bl:!0,ml:!0,mt:!0,mr:!0,mb:!0,mtr:!0}),this._controlsVisibility},onDeselect:function(){},onSelect:function(){}})}(),fabric.util.object.extend(fabric.StaticCanvas.prototype,{FX_DURATION:500,fxCenterObjectH:function(t,e){var i=function(){},r=(e=e||{}).onComplete||i,n=e.onChange||i,s=this;return fabric.util.animate({startValue:t.left,endValue:this.getCenter().left,duration:this.FX_DURATION,onChange:function(e){t.set("left",e),s.requestRenderAll(),n()},onComplete:function(){t.setCoords(),r()}}),this},fxCenterObjectV:function(t,e){var i=function(){},r=(e=e||{}).onComplete||i,n=e.onChange||i,s=this;return fabric.util.animate({startValue:t.top,endValue:this.getCenter().top,duration:this.FX_DURATION,onChange:function(e){t.set("top",e),s.requestRenderAll(),n()},onComplete:function(){t.setCoords(),r()}}),this},fxRemove:function(t,e){var i=function(){},r=(e=e||{}).onComplete||i,n=e.onChange||i,s=this;return fabric.util.animate({startValue:t.opacity,endValue:0,duration:this.FX_DURATION,onChange:function(e){t.set("opacity",e),s.requestRenderAll(),n()},onComplete:function(){s.remove(t),r()}}),this}}),fabric.util.object.extend(fabric.Object.prototype,{animate:function(){if(arguments[0]&&"object"==typeof arguments[0]){var t,e,i=[];for(t in arguments[0])i.push(t);for(var r=0,n=i.length;r<n;r++)t=i[r],e=r!==n-1,this._animate(t,arguments[0][t],arguments[1],e)}else this._animate.apply(this,arguments);return this},_animate:function(t,e,i,r){var n,s=this;e=e.toString(),i=i?fabric.util.object.clone(i):{},~t.indexOf(".")&&(n=t.split("."));var o=n?this.get(n[0])[n[1]]:this.get(t);"from"in i||(i.from=o),e=~e.indexOf("=")?o+parseFloat(e.replace("=","")):parseFloat(e),fabric.util.animate({startValue:i.from,endValue:e,byValue:i.by,easing:i.easing,duration:i.duration,abort:i.abort&&function(){return i.abort.call(s)},onChange:function(e,o,a){n?s[n[0]][n[1]]=e:s.set(t,e),r||i.onChange&&i.onChange(e,o,a)},onComplete:function(t,e,n){r||(s.setCoords(),i.onComplete&&i.onComplete(t,e,n))}})}}),function(t){"use strict";function e(t,e){var i=t.origin,r=t.axis1,n=t.axis2,s=t.dimension,o=e.nearest,a=e.center,h=e.farthest;return function(){switch(this.get(i)){case o:return Math.min(this.get(r),this.get(n));case a:return Math.min(this.get(r),this.get(n))+.5*this.get(s);case h:return Math.max(this.get(r),this.get(n))}}}var i=t.fabric||(t.fabric={}),r=i.util.object.extend,n=i.util.object.clone,s={x1:1,x2:1,y1:1,y2:1},o=i.StaticCanvas.supports("setLineDash");i.Line?i.warn("fabric.Line is already defined"):(i.Line=i.util.createClass(i.Object,{type:"line",x1:0,y1:0,x2:0,y2:0,cacheProperties:i.Object.prototype.cacheProperties.concat("x1","x2","y1","y2"),initialize:function(t,e){t||(t=[0,0,0,0]),this.callSuper("initialize",e),this.set("x1",t[0]),this.set("y1",t[1]),this.set("x2",t[2]),this.set("y2",t[3]),this._setWidthHeight(e)},_setWidthHeight:function(t){t||(t={}),this.width=Math.abs(this.x2-this.x1),this.height=Math.abs(this.y2-this.y1),this.left="left"in t?t.left:this._getLeftToOriginX(),this.top="top"in t?t.top:this._getTopToOriginY()},_set:function(t,e){return this.callSuper("_set",t,e),void 0!==s[t]&&this._setWidthHeight(),this},_getLeftToOriginX:e({origin:"originX",axis1:"x1",axis2:"x2",dimension:"width"},{nearest:"left",center:"center",farthest:"right"}),_getTopToOriginY:e({origin:"originY",axis1:"y1",axis2:"y2",dimension:"height"},{nearest:"top",center:"center",farthest:"bottom"}),_render:function(t){if(t.beginPath(),!this.strokeDashArray||this.strokeDashArray&&o){var e=this.calcLinePoints();t.moveTo(e.x1,e.y1),t.lineTo(e.x2,e.y2)}t.lineWidth=this.strokeWidth;var i=t.strokeStyle;t.strokeStyle=this.stroke||t.fillStyle,this.stroke&&this._renderStroke(t),t.strokeStyle=i},_renderDashedStroke:function(t){var e=this.calcLinePoints();t.beginPath(),i.util.drawDashedLine(t,e.x1,e.y1,e.x2,e.y2,this.strokeDashArray),t.closePath()},_findCenterFromElement:function(){return{x:(this.x1+this.x2)/2,y:(this.y1+this.y2)/2}},toObject:function(t){return r(this.callSuper("toObject",t),this.calcLinePoints())},_getNonTransformedDimensions:function(){var t=this.callSuper("_getNonTransformedDimensions");return"butt"===this.strokeLineCap&&(0===this.width&&(t.y-=this.strokeWidth),0===this.height&&(t.x-=this.strokeWidth)),t},calcLinePoints:function(){var t=this.x1<=this.x2?-1:1,e=this.y1<=this.y2?-1:1,i=t*this.width*.5,r=e*this.height*.5;return{x1:i,x2:t*this.width*-.5,y1:r,y2:e*this.height*-.5}},toSVG:function(t){var e=this._createBaseSVGMarkup(),i=this.calcLinePoints();return e.push("<line ",this.getSvgId(),'x1="',i.x1,'" y1="',i.y1,'" x2="',i.x2,'" y2="',i.y2,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'"/>\n'),t?t(e.join("")):e.join("")}}),i.Line.ATTRIBUTE_NAMES=i.SHARED_ATTRIBUTES.concat("x1 y1 x2 y2".split(" ")),i.Line.fromElement=function(t,e,n){n=n||{};var s=i.parseAttributes(t,i.Line.ATTRIBUTE_NAMES),o=[s.x1||0,s.y1||0,s.x2||0,s.y2||0];e(new i.Line(o,r(s,n)))},i.Line.fromObject=function(t,e){var r=n(t,!0);r.points=[t.x1,t.y1,t.x2,t.y2],i.Object._fromObject("Line",r,function(t){delete t.points,e&&e(t)},"points")})}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=Math.PI;e.Circle?e.warn("fabric.Circle is already defined."):(e.Circle=e.util.createClass(e.Object,{type:"circle",radius:0,startAngle:0,endAngle:2*i,cacheProperties:e.Object.prototype.cacheProperties.concat("radius"),_set:function(t,e){return this.callSuper("_set",t,e),"radius"===t&&this.setRadius(e),this},toObject:function(t){return this.callSuper("toObject",["radius","startAngle","endAngle"].concat(t))},toSVG:function(t){var r=this._createBaseSVGMarkup(),n=(this.endAngle-this.startAngle)%(2*i);if(0===n)r.push("<circle ",this.getSvgId(),'cx="0" cy="0" ','r="',this.radius,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform()," ",this.getSvgTransformMatrix(),'"',this.addPaintOrder(),"/>\n");else{var s=e.util.cos(this.startAngle)*this.radius,o=e.util.sin(this.startAngle)*this.radius,a=e.util.cos(this.endAngle)*this.radius,h=e.util.sin(this.endAngle)*this.radius,c=n>i?"1":"0";r.push('<path d="M '+s+" "+o," A "+this.radius+" "+this.radius," 0 ",+c+" 1"," "+a+" "+h,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform()," ",this.getSvgTransformMatrix(),'"',this.addPaintOrder(),'"/>\n')}return t?t(r.join("")):r.join("")},_render:function(t){t.beginPath(),t.arc(0,0,this.radius,this.startAngle,this.endAngle,!1),this._renderPaintInOrder(t)},getRadiusX:function(){return this.get("radius")*this.get("scaleX")},getRadiusY:function(){return this.get("radius")*this.get("scaleY")},setRadius:function(t){return this.radius=t,this.set("width",2*t).set("height",2*t)}}),e.Circle.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat("cx cy r".split(" ")),e.Circle.fromElement=function(t,i){var r=e.parseAttributes(t,e.Circle.ATTRIBUTE_NAMES);if(!function(t){return"radius"in t&&t.radius>=0}(r))throw new Error("value of `r` attribute is required and can not be negative");r.left=(r.left||0)-r.radius,r.top=(r.top||0)-r.radius,i(new e.Circle(r))},e.Circle.fromObject=function(t,i){return e.Object._fromObject("Circle",t,i)})}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={});e.Triangle?e.warn("fabric.Triangle is already defined"):(e.Triangle=e.util.createClass(e.Object,{type:"triangle",width:100,height:100,_render:function(t){var e=this.width/2,i=this.height/2;t.beginPath(),t.moveTo(-e,i),t.lineTo(0,-i),t.lineTo(e,i),t.closePath(),this._renderPaintInOrder(t)},_renderDashedStroke:function(t){var i=this.width/2,r=this.height/2;t.beginPath(),e.util.drawDashedLine(t,-i,r,0,-r,this.strokeDashArray),e.util.drawDashedLine(t,0,-r,i,r,this.strokeDashArray),e.util.drawDashedLine(t,i,r,-i,r,this.strokeDashArray),t.closePath()},toSVG:function(t){var e=this._createBaseSVGMarkup(),i=this.width/2,r=this.height/2,n=[-i+" "+r,"0 "+-r,i+" "+r].join(",");return e.push("<polygon ",this.getSvgId(),'points="',n,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"',this.addPaintOrder(),"/>"),t?t(e.join("")):e.join("")}}),e.Triangle.fromObject=function(t,i){return e.Object._fromObject("Triangle",t,i)})}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=2*Math.PI;e.Ellipse?e.warn("fabric.Ellipse is already defined."):(e.Ellipse=e.util.createClass(e.Object,{type:"ellipse",rx:0,ry:0,cacheProperties:e.Object.prototype.cacheProperties.concat("rx","ry"),initialize:function(t){this.callSuper("initialize",t),this.set("rx",t&&t.rx||0),this.set("ry",t&&t.ry||0)},_set:function(t,e){switch(this.callSuper("_set",t,e),t){case"rx":this.rx=e,this.set("width",2*e);break;case"ry":this.ry=e,this.set("height",2*e)}return this},getRx:function(){return this.get("rx")*this.get("scaleX")},getRy:function(){return this.get("ry")*this.get("scaleY")},toObject:function(t){return this.callSuper("toObject",["rx","ry"].concat(t))},toSVG:function(t){var e=this._createBaseSVGMarkup();return e.push("<ellipse ",this.getSvgId(),'cx="0" cy="0" ','rx="',this.rx,'" ry="',this.ry,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'"',this.addPaintOrder(),"/>\n"),t?t(e.join("")):e.join("")},_render:function(t){t.beginPath(),t.save(),t.transform(1,0,0,this.ry/this.rx,0,0),t.arc(0,0,this.rx,0,i,!1),t.restore(),this._renderPaintInOrder(t)}}),e.Ellipse.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat("cx cy rx ry".split(" ")),e.Ellipse.fromElement=function(t,i){var r=e.parseAttributes(t,e.Ellipse.ATTRIBUTE_NAMES);r.left=(r.left||0)-r.rx,r.top=(r.top||0)-r.ry,i(new e.Ellipse(r))},e.Ellipse.fromObject=function(t,i){return e.Object._fromObject("Ellipse",t,i)})}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend;e.Rect?e.warn("fabric.Rect is already defined"):(e.Rect=e.util.createClass(e.Object,{stateProperties:e.Object.prototype.stateProperties.concat("rx","ry"),type:"rect",rx:0,ry:0,cacheProperties:e.Object.prototype.cacheProperties.concat("rx","ry"),initialize:function(t){this.callSuper("initialize",t),this._initRxRy()},_initRxRy:function(){this.rx&&!this.ry?this.ry=this.rx:this.ry&&!this.rx&&(this.rx=this.ry)},_render:function(t){if(1!==this.width||1!==this.height){var e=this.rx?Math.min(this.rx,this.width/2):0,i=this.ry?Math.min(this.ry,this.height/2):0,r=this.width,n=this.height,s=-this.width/2,o=-this.height/2,a=0!==e||0!==i,h=.4477152502;t.beginPath(),t.moveTo(s+e,o),t.lineTo(s+r-e,o),a&&t.bezierCurveTo(s+r-h*e,o,s+r,o+h*i,s+r,o+i),t.lineTo(s+r,o+n-i),a&&t.bezierCurveTo(s+r,o+n-h*i,s+r-h*e,o+n,s+r-e,o+n),t.lineTo(s+e,o+n),a&&t.bezierCurveTo(s+h*e,o+n,s,o+n-h*i,s,o+n-i),t.lineTo(s,o+i),a&&t.bezierCurveTo(s,o+h*i,s+h*e,o,s+e,o),t.closePath(),this._renderPaintInOrder(t)}else t.fillRect(-.5,-.5,1,1)},_renderDashedStroke:function(t){var i=-this.width/2,r=-this.height/2,n=this.width,s=this.height;t.beginPath(),e.util.drawDashedLine(t,i,r,i+n,r,this.strokeDashArray),e.util.drawDashedLine(t,i+n,r,i+n,r+s,this.strokeDashArray),e.util.drawDashedLine(t,i+n,r+s,i,r+s,this.strokeDashArray),e.util.drawDashedLine(t,i,r+s,i,r,this.strokeDashArray),t.closePath()},toObject:function(t){return this.callSuper("toObject",["rx","ry"].concat(t))},toSVG:function(t){var e=this._createBaseSVGMarkup(),i=-this.width/2,r=-this.height/2;return e.push("<rect ",this.getSvgId(),'x="',i,'" y="',r,'" rx="',this.get("rx"),'" ry="',this.get("ry"),'" width="',this.width,'" height="',this.height,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'"',this.addPaintOrder(),"/>\n"),t?t(e.join("")):e.join("")}}),e.Rect.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat("x y rx ry width height".split(" ")),e.Rect.fromElement=function(t,r,n){if(!t)return r(null);n=n||{};var s=e.parseAttributes(t,e.Rect.ATTRIBUTE_NAMES);s.left=s.left||0,s.top=s.top||0;var o=new e.Rect(i(n?e.util.object.clone(n):{},s));o.visible=o.visible&&o.width>0&&o.height>0,r(o)},e.Rect.fromObject=function(t,i){return e.Object._fromObject("Rect",t,i)})}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.util.array.min,n=e.util.array.max,s=e.util.toFixed;e.Polyline?e.warn("fabric.Polyline is already defined"):(e.Polyline=e.util.createClass(e.Object,{type:"polyline",points:null,cacheProperties:e.Object.prototype.cacheProperties.concat("points"),initialize:function(t,e){e=e||{},this.points=t||[],this.callSuper("initialize",e);var i=this._calcDimensions();void 0===e.left&&(this.left=i.left),void 0===e.top&&(this.top=i.top),this.width=i.width,this.height=i.height,this.pathOffset={x:i.left+this.width/2,y:i.top+this.height/2}},_calcDimensions:function(){var t=this.points,e=r(t,"x")||0,i=r(t,"y")||0;return{left:e,top:i,width:(n(t,"x")||0)-e,height:(n(t,"y")||0)-i}},toObject:function(t){return i(this.callSuper("toObject",t),{points:this.points.concat()})},toSVG:function(t){for(var i=[],r=this.pathOffset.x,n=this.pathOffset.y,o=this._createBaseSVGMarkup(),a=e.Object.NUM_FRACTION_DIGITS,h=0,c=this.points.length;h<c;h++)i.push(s(this.points[h].x-r,a),",",s(this.points[h].y-n,a)," ");return o.push("<",this.type," ",this.getSvgId(),'points="',i.join(""),'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform()," ",this.getSvgTransformMatrix(),'"',this.addPaintOrder(),"/>\n"),t?t(o.join("")):o.join("")},commonRender:function(t){var e,i=this.points.length,r=this.pathOffset.x,n=this.pathOffset.y;if(!i||isNaN(this.points[i-1].y))return!1;t.beginPath(),t.moveTo(this.points[0].x-r,this.points[0].y-n);for(var s=0;s<i;s++)e=this.points[s],t.lineTo(e.x-r,e.y-n);return!0},_render:function(t){this.commonRender(t)&&this._renderPaintInOrder(t)},_renderDashedStroke:function(t){var i,r;t.beginPath();for(var n=0,s=this.points.length;n<s;n++)i=this.points[n],r=this.points[n+1]||i,e.util.drawDashedLine(t,i.x,i.y,r.x,r.y,this.strokeDashArray)},complexity:function(){return this.get("points").length}}),e.Polyline.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat(),e.Polyline.fromElement=function(t,i,r){if(!t)return i(null);r||(r={});var n=e.parsePointsAttribute(t.getAttribute("points")),s=e.parseAttributes(t,e.Polyline.ATTRIBUTE_NAMES);i(new e.Polyline(n,e.util.object.extend(s,r)))},e.Polyline.fromObject=function(t,i){return e.Object._fromObject("Polyline",t,i,"points")})}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend;e.Polygon?e.warn("fabric.Polygon is already defined"):(e.Polygon=e.util.createClass(e.Polyline,{type:"polygon",_render:function(t){this.commonRender(t)&&(t.closePath(),this._renderPaintInOrder(t))},_renderDashedStroke:function(t){this.callSuper("_renderDashedStroke",t),t.closePath()}}),e.Polygon.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat(),e.Polygon.fromElement=function(t,r,n){if(!t)return r(null);n||(n={});var s=e.parsePointsAttribute(t.getAttribute("points")),o=e.parseAttributes(t,e.Polygon.ATTRIBUTE_NAMES);r(new e.Polygon(s,i(o,n)))},e.Polygon.fromObject=function(t,i){return e.Object._fromObject("Polygon",t,i,"points")})}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.array.min,r=e.util.array.max,n=e.util.object.extend,s=Object.prototype.toString,o=e.util.drawArc,a={m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7},h={m:"l",M:"L"};e.Path?e.warn("fabric.Path is already defined"):(e.Path=e.util.createClass(e.Object,{type:"path",path:null,cacheProperties:e.Object.prototype.cacheProperties.concat("path","fillRule"),stateProperties:e.Object.prototype.stateProperties.concat("path"),initialize:function(t,e){e=e||{},this.callSuper("initialize",e),t||(t=[]);var i="[object Array]"===s.call(t);this.path=i?t:t.match&&t.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi),this.path&&(i||(this.path=this._parsePath()),this._setPositionDimensions(e))},_setPositionDimensions:function(t){var e=this._parseDimensions();this.width=e.width,this.height=e.height,void 0===t.left&&(this.left=e.left),void 0===t.top&&(this.top=e.top),this.pathOffset=this.pathOffset||{x:e.left+this.width/2,y:e.top+this.height/2}},_renderPathCommands:function(t){var e,i,r,n=null,s=0,a=0,h=0,c=0,l=0,u=0,f=-this.pathOffset.x,d=-this.pathOffset.y;t.beginPath();for(var g=0,p=this.path.length;g<p;++g){switch((e=this.path[g])[0]){case"l":h+=e[1],c+=e[2],t.lineTo(h+f,c+d);break;case"L":h=e[1],c=e[2],t.lineTo(h+f,c+d);break;case"h":h+=e[1],t.lineTo(h+f,c+d);break;case"H":h=e[1],t.lineTo(h+f,c+d);break;case"v":c+=e[1],t.lineTo(h+f,c+d);break;case"V":c=e[1],t.lineTo(h+f,c+d);break;case"m":s=h+=e[1],a=c+=e[2],t.moveTo(h+f,c+d);break;case"M":s=h=e[1],a=c=e[2],t.moveTo(h+f,c+d);break;case"c":i=h+e[5],r=c+e[6],l=h+e[3],u=c+e[4],t.bezierCurveTo(h+e[1]+f,c+e[2]+d,l+f,u+d,i+f,r+d),h=i,c=r;break;case"C":h=e[5],c=e[6],l=e[3],u=e[4],t.bezierCurveTo(e[1]+f,e[2]+d,l+f,u+d,h+f,c+d);break;case"s":i=h+e[3],r=c+e[4],null===n[0].match(/[CcSs]/)?(l=h,u=c):(l=2*h-l,u=2*c-u),t.bezierCurveTo(l+f,u+d,h+e[1]+f,c+e[2]+d,i+f,r+d),l=h+e[1],u=c+e[2],h=i,c=r;break;case"S":i=e[3],r=e[4],null===n[0].match(/[CcSs]/)?(l=h,u=c):(l=2*h-l,u=2*c-u),t.bezierCurveTo(l+f,u+d,e[1]+f,e[2]+d,i+f,r+d),h=i,c=r,l=e[1],u=e[2];break;case"q":i=h+e[3],r=c+e[4],l=h+e[1],u=c+e[2],t.quadraticCurveTo(l+f,u+d,i+f,r+d),h=i,c=r;break;case"Q":i=e[3],r=e[4],t.quadraticCurveTo(e[1]+f,e[2]+d,i+f,r+d),h=i,c=r,l=e[1],u=e[2];break;case"t":i=h+e[1],r=c+e[2],null===n[0].match(/[QqTt]/)?(l=h,u=c):(l=2*h-l,u=2*c-u),t.quadraticCurveTo(l+f,u+d,i+f,r+d),h=i,c=r;break;case"T":i=e[1],r=e[2],null===n[0].match(/[QqTt]/)?(l=h,u=c):(l=2*h-l,u=2*c-u),t.quadraticCurveTo(l+f,u+d,i+f,r+d),h=i,c=r;break;case"a":o(t,h+f,c+d,[e[1],e[2],e[3],e[4],e[5],e[6]+h+f,e[7]+c+d]),h+=e[6],c+=e[7];break;case"A":o(t,h+f,c+d,[e[1],e[2],e[3],e[4],e[5],e[6]+f,e[7]+d]),h=e[6],c=e[7];break;case"z":case"Z":h=s,c=a,t.closePath()}n=e}},_render:function(t){this._renderPathCommands(t),this._renderPaintInOrder(t)},toString:function(){return"#<fabric.Path ("+this.complexity()+'): { "top": '+this.top+', "left": '+this.left+" }>"},toObject:function(t){return n(this.callSuper("toObject",t),{path:this.path.map(function(t){return t.slice()}),top:this.top,left:this.left})},toDatalessObject:function(t){var e=this.toObject(["sourcePath"].concat(t));return e.sourcePath&&delete e.path,e},toSVG:function(t){for(var e=[],i=this._createBaseSVGMarkup(),r="",n=0,s=this.path.length;n<s;n++)e.push(this.path[n].join(" "));var o=e.join(" ");return r=" translate("+-this.pathOffset.x+", "+-this.pathOffset.y+") ",i.push("<path ",this.getSvgId(),'d="',o,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),r,this.getSvgTransformMatrix(),'" stroke-linecap="round" ',this.addPaintOrder(),"/>\n"),t?t(i.join("")):i.join("")},complexity:function(){return this.path.length},_parsePath:function(){for(var t,e,i,r,n,s=[],o=[],c=/([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi,l=0,u=this.path.length;l<u;l++){for(r=(t=this.path[l]).slice(1).trim(),o.length=0;i=c.exec(r);)o.push(i[0]);n=[t.charAt(0)];for(var f=0,d=o.length;f<d;f++)e=parseFloat(o[f]),isNaN(e)||n.push(e);var g=n[0],p=a[g.toLowerCase()],v=h[g]||g;if(n.length-1>p)for(var m=1,b=n.length;m<b;m+=p)s.push([g].concat(n.slice(m,m+p))),g=v;else s.push(n)}return s},_parseDimensions:function(){for(var t,n,s,o,a=[],h=[],c=null,l=0,u=0,f=0,d=0,g=0,p=0,v=0,m=this.path.length;v<m;++v){switch((t=this.path[v])[0]){case"l":f+=t[1],d+=t[2],o=[];break;case"L":f=t[1],d=t[2],o=[];break;case"h":f+=t[1],o=[];break;case"H":f=t[1],o=[];break;case"v":d+=t[1],o=[];break;case"V":d=t[1],o=[];break;case"m":l=f+=t[1],u=d+=t[2],o=[];break;case"M":l=f=t[1],u=d=t[2],o=[];break;case"c":n=f+t[5],s=d+t[6],g=f+t[3],p=d+t[4],o=e.util.getBoundsOfCurve(f,d,f+t[1],d+t[2],g,p,n,s),f=n,d=s;break;case"C":g=t[3],p=t[4],o=e.util.getBoundsOfCurve(f,d,t[1],t[2],g,p,t[5],t[6]),f=t[5],d=t[6];break;case"s":n=f+t[3],s=d+t[4],null===c[0].match(/[CcSs]/)?(g=f,p=d):(g=2*f-g,p=2*d-p),o=e.util.getBoundsOfCurve(f,d,g,p,f+t[1],d+t[2],n,s),g=f+t[1],p=d+t[2],f=n,d=s;break;case"S":n=t[3],s=t[4],null===c[0].match(/[CcSs]/)?(g=f,p=d):(g=2*f-g,p=2*d-p),o=e.util.getBoundsOfCurve(f,d,g,p,t[1],t[2],n,s),f=n,d=s,g=t[1],p=t[2];break;case"q":n=f+t[3],s=d+t[4],g=f+t[1],p=d+t[2],o=e.util.getBoundsOfCurve(f,d,g,p,g,p,n,s),f=n,d=s;break;case"Q":g=t[1],p=t[2],o=e.util.getBoundsOfCurve(f,d,g,p,g,p,t[3],t[4]),f=t[3],d=t[4];break;case"t":n=f+t[1],s=d+t[2],null===c[0].match(/[QqTt]/)?(g=f,p=d):(g=2*f-g,p=2*d-p),o=e.util.getBoundsOfCurve(f,d,g,p,g,p,n,s),f=n,d=s;break;case"T":n=t[1],s=t[2],null===c[0].match(/[QqTt]/)?(g=f,p=d):(g=2*f-g,p=2*d-p),o=e.util.getBoundsOfCurve(f,d,g,p,g,p,n,s),f=n,d=s;break;case"a":o=e.util.getBoundsOfArc(f,d,t[1],t[2],t[3],t[4],t[5],t[6]+f,t[7]+d),f+=t[6],d+=t[7];break;case"A":o=e.util.getBoundsOfArc(f,d,t[1],t[2],t[3],t[4],t[5],t[6],t[7]),f=t[6],d=t[7];break;case"z":case"Z":f=l,d=u}c=t,o.forEach(function(t){a.push(t.x),h.push(t.y)}),a.push(f),h.push(d)}var b=i(a)||0,_=i(h)||0;return{left:b,top:_,width:(r(a)||0)-b,height:(r(h)||0)-_}}}),e.Path.fromObject=function(t,i){if("string"==typeof t.sourcePath){var r=t.sourcePath;e.loadSVGFromURL(r,function(e){var r=e[0];r.setOptions(t),i&&i(r)})}else e.Object._fromObject("Path",t,i,"path")},e.Path.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat(["d"]),e.Path.fromElement=function(t,i,r){var s=e.parseAttributes(t,e.Path.ATTRIBUTE_NAMES);i(new e.Path(s.d,n(s,r)))})}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.util.array.min,n=e.util.array.max;e.Group||(e.Group=e.util.createClass(e.Object,e.Collection,{type:"group",strokeWidth:0,subTargetCheck:!1,cacheProperties:[],useSetOnGroup:!1,initialize:function(t,e,i){e=e||{},this._objects=[],i&&this.callSuper("initialize",e),this._objects=t||[];for(var r=this._objects.length;r--;)this._objects[r].group=this;if(e.originX&&(this.originX=e.originX),e.originY&&(this.originY=e.originY),i)this._updateObjectsACoords();else{var n=e&&e.centerPoint;n||this._calcBounds(),this._updateObjectsCoords(n),delete e.centerPoint,this.callSuper("initialize",e)}this.setCoords()},_updateObjectsACoords:function(){for(var t=this._objects.length;t--;)this._objects[t].setCoords(!0,!0)},_updateObjectsCoords:function(t){for(var t=t||this.getCenterPoint(),e=this._objects.length;e--;)this._updateObjectCoords(this._objects[e],t)},_updateObjectCoords:function(t,e){var i=t.left,r=t.top;t.set({left:i-e.x,top:r-e.y}),t.group=this,t.setCoords(!0,!0)},toString:function(){return"#<fabric.Group: ("+this.complexity()+")>"},addWithUpdate:function(t){return this._restoreObjectsState(),e.util.resetObjectTransform(this),t&&(this._objects.push(t),t.group=this,t._set("canvas",this.canvas)),this._calcBounds(),this._updateObjectsCoords(),this.setCoords(),this.dirty=!0,this},removeWithUpdate:function(t){return this._restoreObjectsState(),e.util.resetObjectTransform(this),this.remove(t),this._calcBounds(),this._updateObjectsCoords(),this.setCoords(),this.dirty=!0,this},_onObjectAdded:function(t){this.dirty=!0,t.group=this,t._set("canvas",this.canvas)},_onObjectRemoved:function(t){this.dirty=!0,delete t.group},_set:function(t,e){var i=this._objects.length;if(this.useSetOnGroup)for(;i--;)this._objects[i].setOnGroup(t,e);if("canvas"===t)for(i=this._objects.length;i--;)this._objects[i]._set(t,e);this.callSuper("_set",t,e)},toObject:function(t){var e=this.getObjects().map(function(e){var i=e.includeDefaultValues;e.includeDefaultValues=e.group.includeDefaultValues;var r=e.toObject(t);return e.includeDefaultValues=i,r});return i(this.callSuper("toObject",t),{objects:e})},toDatalessObject:function(t){var e,r=this.sourcePath;return e=r||this.getObjects().map(function(e){var i=e.includeDefaultValues;e.includeDefaultValues=e.group.includeDefaultValues;var r=e.toDatalessObject(t);return e.includeDefaultValues=i,r}),i(this.callSuper("toDatalessObject",t),{objects:e})},render:function(t){this._transformDone=!0,this.callSuper("render",t),this._transformDone=!1},shouldCache:function(){var t=this.objectCaching&&(!this.group||this.needsItsOwnCache()||!this.group.isOnACache());if(this.ownCaching=t,t)for(var e=0,i=this._objects.length;e<i;e++)if(this._objects[e].willDrawShadow())return this.ownCaching=!1,!1;return t},willDrawShadow:function(){if(this.shadow)return this.callSuper("willDrawShadow");for(var t=0,e=this._objects.length;t<e;t++)if(this._objects[t].willDrawShadow())return!0;return!1},isOnACache:function(){return this.ownCaching||this.group&&this.group.isOnACache()},drawObject:function(t){for(var e=0,i=this._objects.length;e<i;e++)this._objects[e].render(t)},isCacheDirty:function(){if(this.callSuper("isCacheDirty"))return!0;if(!this.statefullCache)return!1;for(var t=0,e=this._objects.length;t<e;t++)if(this._objects[t].isCacheDirty(!0)){if(this._cacheCanvas){var i=this.cacheWidth/this.zoomX,r=this.cacheHeight/this.zoomY;this._cacheContext.clearRect(-i/2,-r/2,i,r)}return!0}return!1},_restoreObjectsState:function(){return this._objects.forEach(this._restoreObjectState,this),this},realizeTransform:function(t){var i=t.calcTransformMatrix(),r=e.util.qrDecompose(i),n=new e.Point(r.translateX,r.translateY);return t.flipX=!1,t.flipY=!1,t.set("scaleX",r.scaleX),t.set("scaleY",r.scaleY),t.skewX=r.skewX,t.skewY=r.skewY,t.angle=r.angle,t.setPositionByOrigin(n,"center","center"),t},_restoreObjectState:function(t){return this.realizeTransform(t),t.setCoords(),delete t.group,this},destroy:function(){return this._objects.forEach(function(t){t.set("dirty",!0)}),this._restoreObjectsState()},toActiveSelection:function(){if(this.canvas){var t=this._objects,i=this.canvas;this._objects=[];var r=this.toObject();delete r.objects;var n=new e.ActiveSelection([]);return n.set(r),n.type="activeSelection",i.remove(this),t.forEach(function(t){t.group=n,t.dirty=!0,i.add(t)}),n.canvas=i,n._objects=t,i._activeObject=n,n.setCoords(),n}},ungroupOnCanvas:function(){return this._restoreObjectsState()},setObjectsCoords:function(){return this.forEachObject(function(t){t.setCoords(!0,!0)}),this},_calcBounds:function(t){for(var e,i,r,n=[],s=[],o=["tr","br","bl","tl"],a=0,h=this._objects.length,c=o.length;a<h;++a)for((e=this._objects[a]).setCoords(!0),r=0;r<c;r++)i=o[r],n.push(e.oCoords[i].x),s.push(e.oCoords[i].y);this.set(this._getBounds(n,s,t))},_getBounds:function(t,i,s){var o=new e.Point(r(t),r(i)),a=new e.Point(n(t),n(i)),h={width:a.x-o.x||0,height:a.y-o.y||0};return s||(h.left=o.x||0,h.top=o.y||0,"center"===this.originX&&(h.left+=h.width/2),"right"===this.originX&&(h.left+=h.width),"center"===this.originY&&(h.top+=h.height/2),"bottom"===this.originY&&(h.top+=h.height)),h},toSVG:function(t){var e=this._createBaseSVGMarkup();e.push("<g ",this.getSvgId(),'transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'" style="',this.getSvgFilter(),'">\n');for(var i=0,r=this._objects.length;i<r;i++)e.push("\t",this._objects[i].toSVG(t));return e.push("</g>\n"),t?t(e.join("")):e.join("")}}),e.Group.fromObject=function(t,i){e.util.enlivenObjects(t.objects,function(r){var n=e.util.object.clone(t,!0);delete n.objects,i&&i(new e.Group(r,n,!0))})})}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={});e.ActiveSelection||(e.ActiveSelection=e.util.createClass(e.Group,{type:"activeSelection",initialize:function(t,i){i=i||{},this._objects=t||[];for(var r=this._objects.length;r--;)this._objects[r].group=this;i.originX&&(this.originX=i.originX),i.originY&&(this.originY=i.originY),this._calcBounds(),this._updateObjectsCoords(),e.Object.prototype.initialize.call(this,i),this.setCoords()},toGroup:function(){var t=this._objects;this._objects=[];var i=this.toObject(),r=new e.Group([]);if(delete i.objects,r.set(i),r.type="group",t.forEach(function(t){t.group=r,t.canvas.remove(t)}),r._objects=t,!this.canvas)return r;var n=this.canvas;return n.add(r),n._activeObject=r,r.setCoords(),r},onDeselect:function(){return this.destroy(),!1},toString:function(){return"#<fabric.ActiveSelection: ("+this.complexity()+")>"},_set:function(t,i){var r=this._objects.length;if("canvas"===t)for(;r--;)this._objects[r].set(t,i);if(this.useSetOnGroup)for(;r--;)this._objects[r].setOnGroup(t,i);e.Object.prototype._set.call(this,t,i)},shouldCache:function(){return!1},willDrawShadow:function(){if(this.shadow)return this.callSuper("willDrawShadow");for(var t=0,e=this._objects.length;t<e;t++)if(this._objects[t].willDrawShadow())return!0;return!1},isOnACache:function(){return!1},_renderControls:function(t,e,i){t.save(),t.globalAlpha=this.isMoving?this.borderOpacityWhenMoving:1,this.callSuper("_renderControls",t,e),void 0===(i=i||{}).hasControls&&(i.hasControls=!1),void 0===i.hasRotatingPoint&&(i.hasRotatingPoint=!1),i.forActiveSelection=!0;for(var r=0,n=this._objects.length;r<n;r++)this._objects[r]._renderControls(t,i);t.restore()}}),e.ActiveSelection.fromObject=function(t,i){e.util.enlivenObjects(t.objects,function(r){delete t.objects,i&&i(new e.ActiveSelection(r,t,!0))})})}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=fabric.util.object.extend;t.fabric||(t.fabric={}),t.fabric.Image?fabric.warn("fabric.Image is already defined."):(fabric.Image=fabric.util.createClass(fabric.Object,{type:"image",crossOrigin:"",strokeWidth:0,_lastScaleX:1,_lastScaleY:1,_filterScalingX:1,_filterScalingY:1,minimumScaleTrigger:.5,stateProperties:fabric.Object.prototype.stateProperties.concat("cropX","cropY"),objectCaching:!1,cacheKey:"",cropX:0,cropY:0,initialize:function(t,e){e||(e={}),this.filters=[],this.cacheKey="texture"+fabric.Object.__uid++,this.callSuper("initialize",e),this._initElement(t,e)},getElement:function(){return this._element},setElement:function(t,e){var i=fabric.filterBackend;return i&&i.evictCachesForKey&&(i.evictCachesForKey(this.cacheKey),i.evictCachesForKey(this.cacheKey+"_filtered")),this._element=t,this._originalElement=t,this._initConfig(e),this.resizeFilter&&this.applyResizeFilters(),0!==this.filters.length&&this.applyFilters(),this},dispose:function(){var t=fabric.filterBackend;t&&t.evictCachesForKey&&(t.evictCachesForKey(this.cacheKey),t.evictCachesForKey(this.cacheKey+"_filtered")),this._originalElement=void 0,this._element=void 0,this._filteredEl=void 0},setCrossOrigin:function(t){return this.crossOrigin=t,this._element.crossOrigin=t,this},getOriginalSize:function(){var t=this.getElement();return{width:t.width,height:t.height}},_stroke:function(t){if(this.stroke&&0!==this.strokeWidth){var e=this.width/2,i=this.height/2;t.beginPath(),t.moveTo(-e,-i),t.lineTo(e,-i),t.lineTo(e,i),t.lineTo(-e,i),t.lineTo(-e,-i),t.closePath()}},_renderDashedStroke:function(t){var e=-this.width/2,i=-this.height/2,r=this.width,n=this.height;t.save(),this._setStrokeStyles(t,this),t.beginPath(),fabric.util.drawDashedLine(t,e,i,e+r,i,this.strokeDashArray),fabric.util.drawDashedLine(t,e+r,i,e+r,i+n,this.strokeDashArray),fabric.util.drawDashedLine(t,e+r,i+n,e,i+n,this.strokeDashArray),fabric.util.drawDashedLine(t,e,i+n,e,i,this.strokeDashArray),t.closePath(),t.restore()},toObject:function(t){var i=[];this.filters.forEach(function(t){t&&i.push(t.toObject())});var r=e(this.callSuper("toObject",["crossOrigin","cropX","cropY"].concat(t)),{src:this.getSrc(),filters:i});return this.resizeFilter&&(r.resizeFilter=this.resizeFilter.toObject()),r},hasCrop:function(){return this.cropX||this.cropY||this.width<this._element.width||this.height<this._element.height},toSVG:function(t){var e=this._createBaseSVGMarkup(),i=-this.width/2,r=-this.height/2,n="";if(this.hasCrop()){var s=fabric.Object.__uid++;e.push('<clipPath id="imageCrop_'+s+'">\n','\t<rect x="'+i+'" y="'+r+'" width="'+this.width+'" height="'+this.height+'" />\n',"</clipPath>\n"),n=' clip-path="url(#imageCrop_'+s+')" '}e.push('<g transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'">\n');var o=["\t<image ",this.getSvgId(),'xlink:href="',this.getSvgSrc(!0),'" x="',i-this.cropX,'" y="',r-this.cropY,'" style="',this.getSvgStyles(),'" width="',this._element.width||this._element.naturalWidth,'" height="',this._element.height||this._element.height,'"',n,"></image>\n"];if("fill"===this.paintFirst&&Array.prototype.push.apply(e,o),this.stroke||this.strokeDashArray){var a=this.fill;this.fill=null,e.push("\t<rect ",'x="',i,'" y="',r,'" width="',this.width,'" height="',this.height,'" style="',this.getSvgStyles(),'"/>\n'),this.fill=a}return"fill"!==this.paintFirst&&Array.prototype.push.apply(e,o),e.push("</g>\n"),t?t(e.join("")):e.join("")},getSrc:function(t){var e=t?this._element:this._originalElement;return e?e.toDataURL?e.toDataURL():e.src:this.src||""},setSrc:function(t,e,i){return fabric.util.loadImage(t,function(t){this.setElement(t,i),e(this)},this,i&&i.crossOrigin),this},toString:function(){return'#<fabric.Image: { src: "'+this.getSrc()+'" }>'},applyResizeFilters:function(){var t=this.resizeFilter,e=this.canvas?this.canvas.getRetinaScaling():1,i=this.minimumScaleTrigger,r=this.scaleX*e,n=this.scaleY*e,s=this._filteredEl||this._originalElement;if(!t||r>i&&n>i)return this._element=s,this._filterScalingX=1,void(this._filterScalingY=1);fabric.filterBackend||(fabric.filterBackend=fabric.initFilterBackend());var o=fabric.util.createCanvasElement(),a=this._filteredEl?this.cacheKey:this.cacheKey+"_filtered",h=s.width,c=s.height;o.width=h,o.height=c,this._element=o,t.scaleX=r,t.scaleY=n,fabric.filterBackend.applyFilters([t],s,h,c,this._element,a),this._filterScalingX=o.width/this._originalElement.width,this._filterScalingY=o.height/this._originalElement.height},applyFilters:function(t){if(t=t||this.filters||[],0===(t=t.filter(function(t){return t})).length)return this._element=this._originalElement,this._filteredEl=null,this._filterScalingX=1,this._filterScalingY=1,this;var e=this._originalElement,i=e.naturalWidth||e.width,r=e.naturalHeight||e.height;if(this._element===this._originalElement){var n=fabric.util.createCanvasElement();n.width=i,n.height=r,this._element=n,this._filteredEl=n}else this._element.getContext("2d").clearRect(0,0,i,r);return fabric.filterBackend||(fabric.filterBackend=fabric.initFilterBackend()),fabric.filterBackend.applyFilters(t,this._originalElement,i,r,this._element,this.cacheKey),this._originalElement.width===this._element.width&&this._originalElement.height===this._element.height||(this._filterScalingX=this._element.width/this._originalElement.width,this._filterScalingY=this._element.height/this._originalElement.height),this},_render:function(t){!1===this.isMoving&&this.resizeFilter&&this._needsResize()&&(this._lastScaleX=this.scaleX,this._lastScaleY=this.scaleY,this.applyResizeFilters()),this._stroke(t),this._renderPaintInOrder(t)},_renderFill:function(t){var e=this.width,i=this.height,r=e*this._filterScalingX,n=i*this._filterScalingY,s=-e/2,o=-i/2,a=this._element;a&&t.drawImage(a,this.cropX*this._filterScalingX,this.cropY*this._filterScalingY,r,n,s,o,e,i)},_needsResize:function(){return this.scaleX!==this._lastScaleX||this.scaleY!==this._lastScaleY},_resetWidthHeight:function(){var t=this.getElement();this.set("width",t.width),this.set("height",t.height)},_initElement:function(t,e){this.setElement(fabric.util.getById(t),e),fabric.util.addClass(this.getElement(),fabric.Image.CSS_CANVAS)},_initConfig:function(t){t||(t={}),this.setOptions(t),this._setWidthHeight(t),this._element&&this.crossOrigin&&(this._element.crossOrigin=this.crossOrigin)},_initFilters:function(t,e){t&&t.length?fabric.util.enlivenObjects(t,function(t){e&&e(t)},"fabric.Image.filters"):e&&e()},_setWidthHeight:function(t){this.width="width"in t?t.width:this.getElement()?this.getElement().width||0:0,this.height="height"in t?t.height:this.getElement()?this.getElement().height||0:0},parsePreserveAspectRatioAttribute:function(){var t,e=fabric.util.parsePreserveAspectRatioAttribute(this.preserveAspectRatio||""),i=this._element.width,r=this._element.height,n=1,s=1,o=0,a=0,h=0,c=0,l=this.width,u=this.height,f={width:l,height:u};return!e||"none"===e.alignX&&"none"===e.alignY?(n=l/i,s=u/r):("meet"===e.meetOrSlice&&(t=(l-i*(n=s=fabric.util.findScaleToFit(this._element,f)))/2,"Min"===e.alignX&&(o=-t),"Max"===e.alignX&&(o=t),t=(u-r*s)/2,"Min"===e.alignY&&(a=-t),"Max"===e.alignY&&(a=t)),"slice"===e.meetOrSlice&&(t=i-l/(n=s=fabric.util.findScaleToCover(this._element,f)),"Mid"===e.alignX&&(h=t/2),"Max"===e.alignX&&(h=t),t=r-u/s,"Mid"===e.alignY&&(c=t/2),"Max"===e.alignY&&(c=t),i=l/n,r=u/s)),{width:i,height:r,scaleX:n,scaleY:s,offsetLeft:o,offsetTop:a,cropX:h,cropY:c}}}),fabric.Image.CSS_CANVAS="canvas-img",fabric.Image.prototype.getSvgSrc=fabric.Image.prototype.getSrc,fabric.Image.fromObject=function(t,e){var i=fabric.util.object.clone(t);fabric.util.loadImage(i.src,function(t,r){r?e&&e(null,r):fabric.Image.prototype._initFilters.call(i,i.filters,function(r){i.filters=r||[],fabric.Image.prototype._initFilters.call(i,[i.resizeFilter],function(r){i.resizeFilter=r[0];var n=new fabric.Image(t,i);e(n)})})},null,i.crossOrigin)},fabric.Image.fromURL=function(t,e,i){fabric.util.loadImage(t,function(t){e&&e(new fabric.Image(t,i))},null,i&&i.crossOrigin)},fabric.Image.ATTRIBUTE_NAMES=fabric.SHARED_ATTRIBUTES.concat("x y width height preserveAspectRatio xlink:href crossOrigin".split(" ")),fabric.Image.fromElement=function(t,i,r){var n=fabric.parseAttributes(t,fabric.Image.ATTRIBUTE_NAMES);fabric.Image.fromURL(n["xlink:href"],i,e(r?fabric.util.object.clone(r):{},n))})}("undefined"!=typeof exports?exports:this),fabric.util.object.extend(fabric.Object.prototype,{_getAngleValueForStraighten:function(){var t=this.angle%360;return t>0?90*Math.round((t-1)/90):90*Math.round(t/90)},straighten:function(){return this.rotate(this._getAngleValueForStraighten()),this},fxStraighten:function(t){var e=function(){},i=(t=t||{}).onComplete||e,r=t.onChange||e,n=this;return fabric.util.animate({startValue:this.get("angle"),endValue:this._getAngleValueForStraighten(),duration:this.FX_DURATION,onChange:function(t){n.rotate(t),r()},onComplete:function(){n.setCoords(),i()}}),this}}),fabric.util.object.extend(fabric.StaticCanvas.prototype,{straightenObject:function(t){return t.straighten(),this.requestRenderAll(),this},fxStraightenObject:function(t){return t.fxStraighten({onChange:this.requestRenderAllBound}),this}}),function(){"use strict";function t(t,e){var i="precision "+e+" float;\nvoid main(){}",r=t.createShader(t.FRAGMENT_SHADER);return t.shaderSource(r,i),t.compileShader(r),!!t.getShaderParameter(r,t.COMPILE_STATUS)}function e(t){t&&t.tileSize&&(this.tileSize=t.tileSize),this.setupGLContext(this.tileSize,this.tileSize),this.captureGPUInfo()}fabric.isWebglSupported=function(e){if(fabric.isLikelyNode)return!1;e=e||fabric.WebglFilterBackend.prototype.tileSize;var i=document.createElement("canvas"),r=i.getContext("webgl")||i.getContext("experimental-webgl"),n=!1;if(r){fabric.maxTextureSize=r.getParameter(r.MAX_TEXTURE_SIZE),n=fabric.maxTextureSize>=e;for(var s=["highp","mediump","lowp"],o=0;o<3;o++)if(t(r,s[o])){fabric.webGlPrecision=s[o];break}}return this.isSupported=n,n},fabric.WebglFilterBackend=e,e.prototype={tileSize:2048,resources:{},setupGLContext:function(t,e){this.dispose(),this.createWebGLCanvas(t,e),this.aPosition=new Float32Array([0,0,0,1,1,0,1,1]),this.chooseFastestCopyGLTo2DMethod(t,e)},chooseFastestCopyGLTo2DMethod:function(t,e){var i,r=void 0!==window.performance;try{new ImageData(1,1),i=!0}catch(t){i=!1}var n="undefined"!=typeof ArrayBuffer,s="undefined"!=typeof Uint8ClampedArray;if(r&&i&&n&&s){var o,a,h=fabric.util.createCanvasElement(),c=new ArrayBuffer(t*e*4),l={imageBuffer:c,destinationWidth:t,destinationHeight:e,targetCanvas:h};h.width=t,h.height=e,o=window.performance.now(),copyGLTo2DDrawImage.call(l,this.gl,l),a=window.performance.now()-o,o=window.performance.now(),copyGLTo2DPutImageData.call(l,this.gl,l),a>window.performance.now()-o?(this.imageBuffer=c,this.copyGLTo2D=copyGLTo2DPutImageData):this.copyGLTo2D=copyGLTo2DDrawImage}},createWebGLCanvas:function(t,e){var i=fabric.util.createCanvasElement();i.width=t,i.height=e;var r={premultipliedAlpha:!1},n=i.getContext("webgl",r);n||(n=i.getContext("experimental-webgl",r)),n&&(n.clearColor(0,0,0,0),this.canvas=i,this.gl=n)},applyFilters:function(t,e,i,r,n,s){var o,a=this.gl;s&&(o=this.getCachedTexture(s,e));var h={originalWidth:e.width||e.originalWidth,originalHeight:e.height||e.originalHeight,sourceWidth:i,sourceHeight:r,destinationWidth:i,destinationHeight:r,context:a,sourceTexture:this.createTexture(a,i,r,!o&&e),targetTexture:this.createTexture(a,i,r),originalTexture:o||this.createTexture(a,i,r,!o&&e),passes:t.length,webgl:!0,aPosition:this.aPosition,programCache:this.programCache,pass:0,filterBackend:this,targetCanvas:n},c=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,c),t.forEach(function(t){t&&t.applyTo(h)}),resizeCanvasIfNeeded(h),this.copyGLTo2D(a,h),a.bindTexture(a.TEXTURE_2D,null),a.deleteTexture(h.sourceTexture),a.deleteTexture(h.targetTexture),a.deleteFramebuffer(c),n.getContext("2d").setTransform(1,0,0,1,0,0),h},applyFiltersDebug:function(t,e,i,r,n,s){var o=this.gl,a=this.applyFilters(t,e,i,r,n,s),h=o.getError();if(h!==o.NO_ERROR){var c=this.glErrorToString(o,h),l=new Error("WebGL Error "+c);throw l.glErrorCode=h,l}return a},glErrorToString:function(t,e){if(!t)return"Context undefined for error code: "+e;if("number"!=typeof e)return"Error code is not a number";switch(e){case t.NO_ERROR:return"NO_ERROR";case t.INVALID_ENUM:return"INVALID_ENUM";case t.INVALID_VALUE:return"INVALID_VALUE";case t.INVALID_OPERATION:return"INVALID_OPERATION";case t.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case t.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case t.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return"UNKNOWN_ERROR"}},dispose:function(){this.canvas&&(this.canvas=null,this.gl=null),this.clearWebGLCaches()},clearWebGLCaches:function(){this.programCache={},this.textureCache={}},createTexture:function(t,e,i,r){var n=t.createTexture();return t.bindTexture(t.TEXTURE_2D,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),r?t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r):t.texImage2D(t.TEXTURE_2D,0,t.RGBA,e,i,0,t.RGBA,t.UNSIGNED_BYTE,null),n},getCachedTexture:function(t,e){if(this.textureCache[t])return this.textureCache[t];var i=this.createTexture(this.gl,e.width,e.height,e);return this.textureCache[t]=i,i},evictCachesForKey:function(t){this.textureCache[t]&&(this.gl.deleteTexture(this.textureCache[t]),delete this.textureCache[t])},copyGLTo2D:copyGLTo2DDrawImage,captureGPUInfo:function(){if(this.gpuInfo)return this.gpuInfo;var t=this.gl,e=t.getExtension("WEBGL_debug_renderer_info"),i={renderer:"",vendor:""};if(e){var r=t.getParameter(e.UNMASKED_RENDERER_WEBGL),n=t.getParameter(e.UNMASKED_VENDOR_WEBGL);r&&(i.renderer=r.toLowerCase()),n&&(i.vendor=n.toLowerCase())}return this.gpuInfo=i,i}}}(),function(){"use strict";function t(){}var e=function(){};fabric.Canvas2dFilterBackend=t,t.prototype={evictCachesForKey:e,dispose:e,clearWebGLCaches:e,resources:{},applyFilters:function(t,e,i,r,n){var s=n.getContext("2d");s.drawImage(e,0,0,i,r);var o={sourceWidth:i,sourceHeight:r,imageData:s.getImageData(0,0,i,r),originalEl:e,originalImageData:s.getImageData(0,0,i,r),canvasEl:n,ctx:s,filterBackend:this};return t.forEach(function(t){t.applyTo(o)}),o.imageData.width===i&&o.imageData.height===r||(n.width=o.imageData.width,n.height=o.imageData.height),s.putImageData(o.imageData,0,0),o}}}(),fabric.Image.filters=fabric.Image.filters||{},fabric.Image.filters.BaseFilter=fabric.util.createClass({type:"BaseFilter",vertexSource:"attribute vec2 aPosition;\nvarying vec2 vTexCoord;\nvoid main() {\nvTexCoord = aPosition;\ngl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);\n}",fragmentSource:"precision highp float;\nvarying vec2 vTexCoord;\nuniform sampler2D uTexture;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\n}",initialize:function(t){t&&this.setOptions(t)},setOptions:function(t){for(var e in t)this[e]=t[e]},createProgram:function(t,e,i){e=e||this.fragmentSource,i=i||this.vertexSource,"highp"!==fabric.webGlPrecision&&(e=e.replace(/precision highp float/g,"precision "+fabric.webGlPrecision+" float"));var r=t.createShader(t.VERTEX_SHADER);if(t.shaderSource(r,i),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS))throw new Error("Vertex shader compile error for "+this.type+": "+t.getShaderInfoLog(r));var n=t.createShader(t.FRAGMENT_SHADER);if(t.shaderSource(n,e),t.compileShader(n),!t.getShaderParameter(n,t.COMPILE_STATUS))throw new Error("Fragment shader compile error for "+this.type+": "+t.getShaderInfoLog(n));var s=t.createProgram();if(t.attachShader(s,r),t.attachShader(s,n),t.linkProgram(s),!t.getProgramParameter(s,t.LINK_STATUS))throw new Error('Shader link error for "${this.type}" '+t.getProgramInfoLog(s));var o=this.getAttributeLocations(t,s),a=this.getUniformLocations(t,s)||{};return a.uStepW=t.getUniformLocation(s,"uStepW"),a.uStepH=t.getUniformLocation(s,"uStepH"),{program:s,attributeLocations:o,uniformLocations:a}},getAttributeLocations:function(t,e){return{aPosition:t.getAttribLocation(e,"aPosition")}},getUniformLocations:function(){return{}},sendAttributeData:function(t,e,i){var r=e.aPostion,n=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,n),t.enableVertexAttribArray(r),t.vertexAttribPointer(r,2,t.FLOAT,!1,0,0),t.bufferData(t.ARRAY_BUFFER,i,t.STATIC_DRAW)},_setupFrameBuffer:function(t){var e,i,r=t.context;t.passes>1?(e=t.destinationWidth,i=t.destinationHeight,t.sourceWidth===e&&t.sourceHeight===i||(r.deleteTexture(t.targetTexture),t.targetTexture=t.filterBackend.createTexture(r,e,i)),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t.targetTexture,0)):(r.bindFramebuffer(r.FRAMEBUFFER,null),r.finish())},_swapTextures:function(t){t.passes--,t.pass++;var e=t.targetTexture;t.targetTexture=t.sourceTexture,t.sourceTexture=e},isNeutralState:function(){return!1},applyTo:function(t){if(t.webgl){if(t.passes>1&&this.isNeutralState(t))return;this._setupFrameBuffer(t),this.applyToWebGL(t),this._swapTextures(t)}else this.isNeutralState()||this.applyTo2d(t)},retrieveShader:function(t){return t.programCache.hasOwnProperty(this.type)||(t.programCache[this.type]=this.createProgram(t.context)),t.programCache[this.type]},applyToWebGL:function(t){var e=t.context,i=this.retrieveShader(t);0===t.pass&&t.originalTexture?e.bindTexture(e.TEXTURE_2D,t.originalTexture):e.bindTexture(e.TEXTURE_2D,t.sourceTexture),e.useProgram(i.program),this.sendAttributeData(e,i.attributeLocations,t.aPosition),e.uniform1f(i.uniformLocations.uStepW,1/t.sourceWidth),e.uniform1f(i.uniformLocations.uStepH,1/t.sourceHeight),this.sendUniformData(e,i.uniformLocations),e.viewport(0,0,t.destinationWidth,t.destinationHeight),e.drawArrays(e.TRIANGLE_STRIP,0,4)},bindAdditionalTexture:function(t,e,i){t.activeTexture(i),t.bindTexture(t.TEXTURE_2D,e),t.activeTexture(t.TEXTURE0)},unbindAdditionalTexture:function(t,e){t.activeTexture(e),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE0)},getMainParameter:function(){return this[this.mainParameter]},setMainParameter:function(t){this[this.mainParameter]=t},sendUniformData:function(){},createHelpLayer:function(t){if(!t.helpLayer){var e=document.createElement("canvas");e.width=t.sourceWidth,e.height=t.sourceHeight,t.helpLayer=e}},toObject:function(){var t={type:this.type},e=this.mainParameter;return e&&(t[e]=this[e]),t},toJSON:function(){return this.toObject()}}),fabric.Image.filters.BaseFilter.fromObject=function(t,e){var i=new fabric.Image.filters[t.type](t);return e&&e(i),i},function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.ColorMatrix=r(i.BaseFilter,{type:"ColorMatrix",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nvarying vec2 vTexCoord;\nuniform mat4 uColorMatrix;\nuniform vec4 uConstants;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor *= uColorMatrix;\ncolor += uConstants;\ngl_FragColor = color;\n}",matrix:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],mainParameter:"matrix",colorsOnly:!0,initialize:function(t){this.callSuper("initialize",t),this.matrix=this.matrix.slice(0)},isNeutralState:function(){for(var t=i.ColorMatrix,e=20;e--;)if(this.matrix[e]!==t.prototype.matrix[e])return!1;return!0},applyTo2d:function(t){var e,i,r,n,s,o=t.imageData.data,a=o.length,h=this.matrix,c=this.colorsOnly;for(s=0;s<a;s+=4)e=o[s],i=o[s+1],r=o[s+2],c?(o[s]=e*h[0]+i*h[1]+r*h[2]+255*h[4],o[s+1]=e*h[5]+i*h[6]+r*h[7]+255*h[9],o[s+2]=e*h[10]+i*h[11]+r*h[12]+255*h[14]):(n=o[s+3],o[s]=e*h[0]+i*h[1]+r*h[2]+n*h[3]+255*h[4],o[s+1]=e*h[5]+i*h[6]+r*h[7]+n*h[8]+255*h[9],o[s+2]=e*h[10]+i*h[11]+r*h[12]+n*h[13]+255*h[14],o[s+3]=e*h[15]+i*h[16]+r*h[17]+n*h[18]+255*h[19])},getUniformLocations:function(t,e){return{uColorMatrix:t.getUniformLocation(e,"uColorMatrix"),uConstants:t.getUniformLocation(e,"uConstants")}},sendUniformData:function(t,e){var i=this.matrix,r=[i[0],i[1],i[2],i[3],i[5],i[6],i[7],i[8],i[10],i[11],i[12],i[13],i[15],i[16],i[17],i[18]],n=[i[4],i[9],i[14],i[19]];t.uniformMatrix4fv(e.uColorMatrix,!1,r),t.uniform4fv(e.uConstants,n)}}),e.Image.filters.ColorMatrix.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Brightness=r(i.BaseFilter,{type:"Brightness",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uBrightness;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb += uBrightness;\ngl_FragColor = color;\n}",brightness:0,mainParameter:"brightness",applyTo2d:function(t){if(0!==this.brightness){var e,i=t.imageData.data,r=i.length,n=Math.round(255*this.brightness);for(e=0;e<r;e+=4)i[e]=i[e]+n,i[e+1]=i[e+1]+n,i[e+2]=i[e+2]+n}},getUniformLocations:function(t,e){return{uBrightness:t.getUniformLocation(e,"uBrightness")}},sendUniformData:function(t,e){t.uniform1f(e.uBrightness,this.brightness)}}),e.Image.filters.Brightness.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.Image.filters,n=e.util.createClass;r.Convolute=n(r.BaseFilter,{type:"Convolute",opaque:!1,matrix:[0,0,0,0,1,0,0,0,0],fragmentSource:{Convolute_3_1:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[9];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 3.0; h+=1.0) {\nfor (float w = 0.0; w < 3.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 1), uStepH * (h - 1));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 3.0 + w)];\n}\n}\ngl_FragColor = color;\n}",Convolute_3_0:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[9];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 3.0; h+=1.0) {\nfor (float w = 0.0; w < 3.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 1.0), uStepH * (h - 1.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 3.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",Convolute_5_1:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[25];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 5.0; h+=1.0) {\nfor (float w = 0.0; w < 5.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 5.0 + w)];\n}\n}\ngl_FragColor = color;\n}",Convolute_5_0:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[25];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 5.0; h+=1.0) {\nfor (float w = 0.0; w < 5.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 5.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",Convolute_7_1:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[49];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 7.0; h+=1.0) {\nfor (float w = 0.0; w < 7.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 7.0 + w)];\n}\n}\ngl_FragColor = color;\n}",Convolute_7_0:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[49];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 7.0; h+=1.0) {\nfor (float w = 0.0; w < 7.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 7.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",Convolute_9_1:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[81];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 9.0; h+=1.0) {\nfor (float w = 0.0; w < 9.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 9.0 + w)];\n}\n}\ngl_FragColor = color;\n}",Convolute_9_0:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[81];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 9.0; h+=1.0) {\nfor (float w = 0.0; w < 9.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 9.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}"},retrieveShader:function(t){var e=Math.sqrt(this.matrix.length),i=this.type+"_"+e+"_"+(this.opaque?1:0),r=this.fragmentSource[i];return t.programCache.hasOwnProperty(i)||(t.programCache[i]=this.createProgram(t.context,r)),t.programCache[i]},applyTo2d:function(t){var e,i,r,n,s,o,a,h,c,l,u,f,d,g=t.imageData,p=g.data,v=this.matrix,m=Math.round(Math.sqrt(v.length)),b=Math.floor(m/2),_=g.width,y=g.height,x=t.ctx.createImageData(_,y),C=x.data,S=this.opaque?1:0;for(u=0;u<y;u++)for(l=0;l<_;l++){for(s=4*(u*_+l),e=0,i=0,r=0,n=0,d=0;d<m;d++)for(f=0;f<m;f++)o=l+f-b,(a=u+d-b)<0||a>y||o<0||o>_||(h=4*(a*_+o),c=v[d*m+f],e+=p[h]*c,i+=p[h+1]*c,r+=p[h+2]*c,S||(n+=p[h+3]*c));C[s]=e,C[s+1]=i,C[s+2]=r,C[s+3]=S?p[s+3]:n}t.imageData=x},getUniformLocations:function(t,e){return{uMatrix:t.getUniformLocation(e,"uMatrix"),uOpaque:t.getUniformLocation(e,"uOpaque"),uHalfSize:t.getUniformLocation(e,"uHalfSize"),uSize:t.getUniformLocation(e,"uSize")}},sendUniformData:function(t,e){t.uniform1fv(e.uMatrix,this.matrix)},toObject:function(){return i(this.callSuper("toObject"),{opaque:this.opaque,matrix:this.matrix})}}),e.Image.filters.Convolute.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Grayscale=r(i.BaseFilter,{type:"Grayscale",fragmentSource:{average:"precision highp float;\nuniform sampler2D uTexture;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat average = (color.r + color.b + color.g) / 3.0;\ngl_FragColor = vec4(average, average, average, color.a);\n}",lightness:"precision highp float;\nuniform sampler2D uTexture;\nuniform int uMode;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 col = texture2D(uTexture, vTexCoord);\nfloat average = (max(max(col.r, col.g),col.b) + min(min(col.r, col.g),col.b)) / 2.0;\ngl_FragColor = vec4(average, average, average, col.a);\n}",luminosity:"precision highp float;\nuniform sampler2D uTexture;\nuniform int uMode;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 col = texture2D(uTexture, vTexCoord);\nfloat average = 0.21 * col.r + 0.72 * col.g + 0.07 * col.b;\ngl_FragColor = vec4(average, average, average, col.a);\n}"},mode:"average",mainParameter:"mode",applyTo2d:function(t){var e,i,r=t.imageData.data,n=r.length,s=this.mode;for(e=0;e<n;e+=4)"average"===s?i=(r[e]+r[e+1]+r[e+2])/3:"lightness"===s?i=(Math.min(r[e],r[e+1],r[e+2])+Math.max(r[e],r[e+1],r[e+2]))/2:"luminosity"===s&&(i=.21*r[e]+.72*r[e+1]+.07*r[e+2]),r[e]=i,r[e+1]=i,r[e+2]=i},retrieveShader:function(t){var e=this.type+"_"+this.mode;if(!t.programCache.hasOwnProperty(e)){var i=this.fragmentSource[this.mode];t.programCache[e]=this.createProgram(t.context,i)}return t.programCache[e]},getUniformLocations:function(t,e){return{uMode:t.getUniformLocation(e,"uMode")}},sendUniformData:function(t,e){t.uniform1i(e.uMode,1)}}),e.Image.filters.Grayscale.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Invert=r(i.BaseFilter,{type:"Invert",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform int uInvert;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nif (uInvert == 1) {\ngl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,color.a);\n} else {\ngl_FragColor = color;\n}\n}",invert:!0,mainParameter:"invert",applyTo2d:function(t){if(this.invert){var e,i=t.imageData.data,r=i.length;for(e=0;e<r;e+=4)i[e]=255-i[e],i[e+1]=255-i[e+1],i[e+2]=255-i[e+2]}},getUniformLocations:function(t,e){return{uInvert:t.getUniformLocation(e,"uInvert")}},sendUniformData:function(t,e){t.uniform1i(e.uInvert,this.invert)}}),e.Image.filters.Invert.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.Image.filters,n=e.util.createClass;r.Noise=n(r.BaseFilter,{type:"Noise",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uStepH;\nuniform float uNoise;\nuniform float uSeed;\nvarying vec2 vTexCoord;\nfloat rand(vec2 co, float seed, float vScale) {\nreturn fract(sin(dot(co.xy * vScale ,vec2(12.9898 , 78.233))) * 43758.5453 * (seed + 0.01) / 2.0);\n}\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb += (0.5 - rand(vTexCoord, uSeed, 0.1 / uStepH)) * uNoise;\ngl_FragColor = color;\n}",mainParameter:"noise",noise:0,applyTo2d:function(t){if(0!==this.noise){var e,i,r=t.imageData.data,n=r.length,s=this.noise;for(e=0,n=r.length;e<n;e+=4)i=(.5-Math.random())*s,r[e]+=i,r[e+1]+=i,r[e+2]+=i}},getUniformLocations:function(t,e){return{uNoise:t.getUniformLocation(e,"uNoise"),uSeed:t.getUniformLocation(e,"uSeed")}},sendUniformData:function(t,e){t.uniform1f(e.uNoise,this.noise/255),t.uniform1f(e.uSeed,Math.random())},toObject:function(){return i(this.callSuper("toObject"),{noise:this.noise})}}),e.Image.filters.Noise.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Pixelate=r(i.BaseFilter,{type:"Pixelate",blocksize:4,mainParameter:"blocksize",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uBlocksize;\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nfloat blockW = uBlocksize * uStepW;\nfloat blockH = uBlocksize * uStepW;\nint posX = int(vTexCoord.x / blockW);\nint posY = int(vTexCoord.y / blockH);\nfloat fposX = float(posX);\nfloat fposY = float(posY);\nvec2 squareCoords = vec2(fposX * blockW, fposY * blockH);\nvec4 color = texture2D(uTexture, squareCoords);\ngl_FragColor = color;\n}",applyTo2d:function(t){if(1!==this.blocksize){var e,i,r,n,s,o,a,h,c,l,u,f=t.imageData,d=f.data,g=f.height,p=f.width;for(i=0;i<g;i+=this.blocksize)for(r=0;r<p;r+=this.blocksize)for(n=d[e=4*i*p+4*r],s=d[e+1],o=d[e+2],a=d[e+3],l=Math.min(i+this.blocksize,g),u=Math.min(r+this.blocksize,p),h=i;h<l;h++)for(c=r;c<u;c++)d[e=4*h*p+4*c]=n,d[e+1]=s,d[e+2]=o,d[e+3]=a}},isNeutralState:function(){return 1===this.blocksize},getUniformLocations:function(t,e){return{uBlocksize:t.getUniformLocation(e,"uBlocksize"),uStepW:t.getUniformLocation(e,"uStepW"),uStepH:t.getUniformLocation(e,"uStepH")}},sendUniformData:function(t,e){t.uniform1f(e.uBlocksize,this.blocksize)}}),e.Image.filters.Pixelate.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.Image.filters,n=e.util.createClass;r.RemoveColor=n(r.BaseFilter,{type:"RemoveColor",color:"#FFFFFF",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uLow;\nuniform vec4 uHigh;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\nif(all(greaterThan(gl_FragColor.rgb,uLow.rgb)) && all(greaterThan(uHigh.rgb,gl_FragColor.rgb))) {\ngl_FragColor.a = 0.0;\n}\n}",distance:.02,useAlpha:!1,applyTo2d:function(t){var i,r,n,s,o=t.imageData.data,a=255*this.distance,h=new e.Color(this.color).getSource(),c=[h[0]-a,h[1]-a,h[2]-a],l=[h[0]+a,h[1]+a,h[2]+a];for(i=0;i<o.length;i+=4)r=o[i],n=o[i+1],s=o[i+2],r>c[0]&&n>c[1]&&s>c[2]&&r<l[0]&&n<l[1]&&s<l[2]&&(o[i+3]=0)},getUniformLocations:function(t,e){return{uLow:t.getUniformLocation(e,"uLow"),uHigh:t.getUniformLocation(e,"uHigh")}},sendUniformData:function(t,i){var r=new e.Color(this.color).getSource(),n=parseFloat(this.distance),s=[0+r[0]/255-n,0+r[1]/255-n,0+r[2]/255-n,1],o=[r[0]/255+n,r[1]/255+n,r[2]/255+n,1];t.uniform4fv(i.uLow,s),t.uniform4fv(i.uHigh,o)},toObject:function(){return i(this.callSuper("toObject"),{color:this.color,distance:this.distance})}}),e.Image.filters.RemoveColor.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass,n={Brownie:[.5997,.34553,-.27082,0,.186,-.0377,.86095,.15059,0,-.1449,.24113,-.07441,.44972,0,-.02965,0,0,0,1,0],Vintage:[.62793,.32021,-.03965,0,.03784,.02578,.64411,.03259,0,.02926,.0466,-.08512,.52416,0,.02023,0,0,0,1,0],Kodachrome:[1.12855,-.39673,-.03992,0,.24991,-.16404,1.08352,-.05498,0,.09698,-.16786,-.56034,1.60148,0,.13972,0,0,0,1,0],Technicolor:[1.91252,-.85453,-.09155,0,.04624,-.30878,1.76589,-.10601,0,-.27589,-.2311,-.75018,1.84759,0,.12137,0,0,0,1,0],Polaroid:[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0],Sepia:[.393,.769,.189,0,0,.349,.686,.168,0,0,.272,.534,.131,0,0,0,0,0,1,0],BlackWhite:[1.5,1.5,1.5,0,-1,1.5,1.5,1.5,0,-1,1.5,1.5,1.5,0,-1,0,0,0,1,0]};for(var s in n)i[s]=r(i.ColorMatrix,{type:s,matrix:n[s],mainParameter:!1,colorsOnly:!0}),e.Image.filters[s].fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric,i=e.Image.filters,r=e.util.createClass;i.BlendColor=r(i.BaseFilter,{type:"BlendColor",color:"#F95C63",mode:"multiply",alpha:1,fragmentSource:{multiply:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb *= uColor.rgb;\ngl_FragColor = color;\n}",screen:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb = 1.0 - (1.0 - color.rgb) * (1.0 - uColor.rgb);\ngl_FragColor = color;\n}",add:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb += uColor.rgb;\n}",diff:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb = abs(gl_FragColor.rgb - uColor.rgb);\n}",subtract:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb -= uColor.rgb;\n}",lighten:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb = max(gl_FragColor.rgb, uColor.rgb);\n}",darken:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb = min(gl_FragColor.rgb, uColor.rgb);\n}",exclusion:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb += uColor.rgb - 2.0 * (uColor.rgb * gl_FragColor.rgb);\n}",overlay:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\nif (uColor.r < 0.5) {\ngl_FragColor.r *= 2.0 * uColor.r;\n} else {\ngl_FragColor.r = 1.0 - 2.0 * (1.0 - gl_FragColor.r) * (1.0 - uColor.r);\n}\nif (uColor.g < 0.5) {\ngl_FragColor.g *= 2.0 * uColor.g;\n} else {\ngl_FragColor.g = 1.0 - 2.0 * (1.0 - gl_FragColor.g) * (1.0 - uColor.g);\n}\nif (uColor.b < 0.5) {\ngl_FragColor.b *= 2.0 * uColor.b;\n} else {\ngl_FragColor.b = 1.0 - 2.0 * (1.0 - gl_FragColor.b) * (1.0 - uColor.b);\n}\n}",tint:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb *= (1.0 - uColor.a);\ngl_FragColor.rgb += uColor.rgb;\n}"},retrieveShader:function(t){var e=this.type+"_"+this.mode,i=this.fragmentSource[this.mode];return t.programCache.hasOwnProperty(e)||(t.programCache[e]=this.createProgram(t.context,i)),t.programCache[e]},applyTo2d:function(t){var i,r,n,s,o,a,h,c=t.imageData.data,l=c.length,u=1-this.alpha;i=(h=new e.Color(this.color).getSource())[0]*this.alpha,r=h[1]*this.alpha,n=h[2]*this.alpha;for(var f=0;f<l;f+=4)switch(s=c[f],o=c[f+1],a=c[f+2],this.mode){case"multiply":c[f]=s*i/255,c[f+1]=o*r/255,c[f+2]=a*n/255;break;case"screen":c[f]=255-(255-s)*(255-i)/255,c[f+1]=255-(255-o)*(255-r)/255,c[f+2]=255-(255-a)*(255-n)/255;break;case"add":c[f]=s+i,c[f+1]=o+r,c[f+2]=a+n;break;case"diff":case"difference":c[f]=Math.abs(s-i),c[f+1]=Math.abs(o-r),c[f+2]=Math.abs(a-n);break;case"subtract":c[f]=s-i,c[f+1]=o-r,c[f+2]=a-n;break;case"darken":c[f]=Math.min(s,i),c[f+1]=Math.min(o,r),c[f+2]=Math.min(a,n);break;case"lighten":c[f]=Math.max(s,i),c[f+1]=Math.max(o,r),c[f+2]=Math.max(a,n);break;case"overlay":c[f]=i<128?2*s*i/255:255-2*(255-s)*(255-i)/255,c[f+1]=r<128?2*o*r/255:255-2*(255-o)*(255-r)/255,c[f+2]=n<128?2*a*n/255:255-2*(255-a)*(255-n)/255;break;case"exclusion":c[f]=i+s-2*i*s/255,c[f+1]=r+o-2*r*o/255,c[f+2]=n+a-2*n*a/255;break;case"tint":c[f]=i+s*u,c[f+1]=r+o*u,c[f+2]=n+a*u}},getUniformLocations:function(t,e){return{uColor:t.getUniformLocation(e,"uColor")}},sendUniformData:function(t,i){var r=new e.Color(this.color).getSource();r[0]=this.alpha*r[0]/255,r[1]=this.alpha*r[1]/255,r[2]=this.alpha*r[2]/255,r[3]=this.alpha,t.uniform4fv(i.uColor,r)},toObject:function(){return{type:this.type,color:this.color,mode:this.mode,alpha:this.alpha}}}),e.Image.filters.BlendColor.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric,i=e.Image.filters,r=e.util.createClass;i.BlendImage=r(i.BaseFilter,{type:"BlendImage",image:null,mode:"multiply",alpha:1,vertexSource:"attribute vec2 aPosition;\nvarying vec2 vTexCoord;\nvarying vec2 vTexCoord2;\nuniform mat3 uTransformMatrix;\nvoid main() {\nvTexCoord = aPosition;\nvTexCoord2 = (uTransformMatrix * vec3(aPosition, 1.0)).xy;\ngl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);\n}",fragmentSource:{multiply:"precision highp float;\nuniform sampler2D uTexture;\nuniform sampler2D uImage;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvarying vec2 vTexCoord2;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nvec4 color2 = texture2D(uImage, vTexCoord2);\ncolor.rgba *= color2.rgba;\ngl_FragColor = color;\n}",mask:"precision highp float;\nuniform sampler2D uTexture;\nuniform sampler2D uImage;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvarying vec2 vTexCoord2;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nvec4 color2 = texture2D(uImage, vTexCoord2);\ncolor.a = color2.a;\ngl_FragColor = color;\n}"},retrieveShader:function(t){var e=this.type+"_"+this.mode,i=this.fragmentSource[this.mode];return t.programCache.hasOwnProperty(e)||(t.programCache[e]=this.createProgram(t.context,i)),t.programCache[e]},applyToWebGL:function(t){var e=t.context,i=this.createTexture(t.filterBackend,this.image);this.bindAdditionalTexture(e,i,e.TEXTURE1),this.callSuper("applyToWebGL",t),this.unbindAdditionalTexture(e,e.TEXTURE1)},createTexture:function(t,e){return t.getCachedTexture(e.cacheKey,e._element)},calculateMatrix:function(){var t=this.image,e=t._element.width,i=t._element.height;return[1/t.scaleX,0,0,0,1/t.scaleY,0,-t.left/e,-t.top/i,1]},applyTo2d:function(t){var e,i,r,n,s,o,a,h,c,l,u,f=t.imageData,d=t.filterBackend.resources,g=f.data,p=g.length,v=t.imageData.width,m=t.imageData.height,b=this.image;d.blendImage||(d.blendImage=document.createElement("canvas")),(c=d.blendImage).width===v&&c.height===m||(c.width=v,c.height=m),(l=c.getContext("2d")).setTransform(b.scaleX,0,0,b.scaleY,b.left,b.top),l.drawImage(b._element,0,0,v,m),u=l.getImageData(0,0,v,m).data;for(var _=0;_<p;_+=4)switch(s=g[_],o=g[_+1],a=g[_+2],h=g[_+3],e=u[_],i=u[_+1],r=u[_+2],n=u[_+3],this.mode){case"multiply":g[_]=s*e/255,g[_+1]=o*i/255,g[_+2]=a*r/255,g[_+3]=h*n/255;break;case"mask":g[_+3]=n}},getUniformLocations:function(t,e){return{uTransformMatrix:t.getUniformLocation(e,"uTransformMatrix"),uImage:t.getUniformLocation(e,"uImage")}},sendUniformData:function(t,e){var i=this.calculateMatrix();t.uniform1i(e.uImage,1),t.uniformMatrix3fv(e.uTransformMatrix,!1,i)},toObject:function(){return{type:this.type,image:this.image&&this.image.toObject(),mode:this.mode,alpha:this.alpha}}}),e.Image.filters.BlendImage.fromObject=function(t,i){e.Image.fromObject(t.image,function(r){var n=e.util.object.clone(t);n.image=r,i(new e.Image.filters.BlendImage(n))})}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=Math.pow,r=Math.floor,n=Math.sqrt,s=Math.abs,o=Math.round,a=Math.sin,h=Math.ceil,c=e.Image.filters,l=e.util.createClass;c.Resize=l(c.BaseFilter,{type:"Resize",resizeType:"hermite",scaleX:0,scaleY:0,lanczosLobes:3,getUniformLocations:function(t,e){return{uDelta:t.getUniformLocation(e,"uDelta"),uTaps:t.getUniformLocation(e,"uTaps")}},sendUniformData:function(t,e){t.uniform2fv(e.uDelta,this.horizontal?[1/this.width,0]:[0,1/this.height]),t.uniform1fv(e.uTaps,this.taps)},retrieveShader:function(t){var e=this.getFilterWindow(),i=this.type+"_"+e;if(!t.programCache.hasOwnProperty(i)){var r=this.generateShader(e);t.programCache[i]=this.createProgram(t.context,r)}return t.programCache[i]},getFilterWindow:function(){var t=this.tempScale;return Math.ceil(this.lanczosLobes/t)},getTaps:function(){for(var t=this.lanczosCreate(this.lanczosLobes),e=this.tempScale,i=this.getFilterWindow(),r=new Array(i),n=1;n<=i;n++)r[n-1]=t(n*e);return r},generateShader:function(t){for(var e=new Array(t),i=this.fragmentSourceTOP,r=1;r<=t;r++)e[r-1]=r+".0 * uDelta";return i+="uniform float uTaps["+t+"];\n",i+="void main() {\n",i+="  vec4 color = texture2D(uTexture, vTexCoord);\n",i+="  float sum = 1.0;\n",e.forEach(function(t,e){i+="  color += texture2D(uTexture, vTexCoord + "+t+") * uTaps["+e+"];\n",i+="  color += texture2D(uTexture, vTexCoord - "+t+") * uTaps["+e+"];\n",i+="  sum += 2.0 * uTaps["+e+"];\n"}),i+="  gl_FragColor = color / sum;\n",i+="}"},fragmentSourceTOP:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec2 uDelta;\nvarying vec2 vTexCoord;\n",applyTo:function(t){if(t.webgl){if(t.passes>1&&this.isNeutralState(t))return;t.passes++,this.width=t.sourceWidth,this.horizontal=!0,this.dW=Math.round(this.width*this.scaleX),this.dH=t.sourceHeight,this.tempScale=this.dW/this.width,this.taps=this.getTaps(),t.destinationWidth=this.dW,this._setupFrameBuffer(t),this.applyToWebGL(t),this._swapTextures(t),t.sourceWidth=t.destinationWidth,this.height=t.sourceHeight,this.horizontal=!1,this.dH=Math.round(this.height*this.scaleY),this.tempScale=this.dH/this.height,this.taps=this.getTaps(),t.destinationHeight=this.dH,this._setupFrameBuffer(t),this.applyToWebGL(t),this._swapTextures(t),t.sourceHeight=t.destinationHeight}else this.isNeutralState(t)||this.applyTo2d(t)},isNeutralState:function(t){var e=t.scaleX||this.scaleX,i=t.scaleY||this.scaleY;return 1===e&&1===i},lanczosCreate:function(t){return function(e){if(e>=t||e<=-t)return 0;if(e<1.1920929e-7&&e>-1.1920929e-7)return 1;var i=(e*=Math.PI)/t;return a(e)/e*a(i)/i}},applyTo2d:function(t){var e=t.imageData,i=this.scaleX,r=this.scaleY;this.rcpScaleX=1/i,this.rcpScaleY=1/r;var n,s=e.width,a=e.height,h=o(s*i),c=o(a*r);"sliceHack"===this.resizeType?n=this.sliceByTwo(t,s,a,h,c):"hermite"===this.resizeType?n=this.hermiteFastResize(t,s,a,h,c):"bilinear"===this.resizeType?n=this.bilinearFiltering(t,s,a,h,c):"lanczos"===this.resizeType&&(n=this.lanczosResize(t,s,a,h,c)),t.imageData=n},sliceByTwo:function(t,i,n,s,o){var a,h,c=t.imageData,l=!1,u=!1,f=.5*i,d=.5*n,g=e.filterBackend.resources,p=0,v=0,m=i,b=0;for(g.sliceByTwo||(g.sliceByTwo=document.createElement("canvas")),((a=g.sliceByTwo).width<1.5*i||a.height<n)&&(a.width=1.5*i,a.height=n),(h=a.getContext("2d")).clearRect(0,0,1.5*i,n),h.putImageData(c,0,0),s=r(s),o=r(o);!l||!u;)i=f,n=d,s<r(.5*f)?f=r(.5*f):(f=s,l=!0),o<r(.5*d)?d=r(.5*d):(d=o,u=!0),h.drawImage(a,p,v,i,n,m,b,f,d),p=m,v=b,b+=d;return h.getImageData(p,v,s,o)},lanczosResize:function(t,e,o,a,c){function l(t){var h,w,T,O,k,D,E,j,A,P,M;for(C.x=(t+.5)*p,S.x=r(C.x),h=0;h<c;h++){for(C.y=(h+.5)*v,S.y=r(C.y),k=0,D=0,E=0,j=0,A=0,w=S.x-_;w<=S.x+_;w++)if(!(w<0||w>=e)){P=r(1e3*s(w-C.x)),x[P]||(x[P]={});for(var F=S.y-y;F<=S.y+y;F++)F<0||F>=o||(M=r(1e3*s(F-C.y)),x[P][M]||(x[P][M]=g(n(i(P*m,2)+i(M*b,2))/1e3)),(T=x[P][M])>0&&(k+=T,D+=T*u[O=4*(F*e+w)],E+=T*u[O+1],j+=T*u[O+2],A+=T*u[O+3]))}d[O=4*(h*a+t)]=D/k,d[O+1]=E/k,d[O+2]=j/k,d[O+3]=A/k}return++t<a?l(t):f}var u=t.imageData.data,f=t.ctx.createImageData(a,c),d=f.data,g=this.lanczosCreate(this.lanczosLobes),p=this.rcpScaleX,v=this.rcpScaleY,m=2/this.rcpScaleX,b=2/this.rcpScaleY,_=h(p*this.lanczosLobes/2),y=h(v*this.lanczosLobes/2),x={},C={},S={};return l(0)},bilinearFiltering:function(t,e,i,n,s){var o,a,h,c,l,u,f,d,g,p=0,v=this.rcpScaleX,m=this.rcpScaleY,b=4*(e-1),_=t.imageData.data,y=t.ctx.createImageData(n,s),x=y.data;for(h=0;h<s;h++)for(c=0;c<n;c++)for(l=v*c-(o=r(v*c)),u=m*h-(a=r(m*h)),g=4*(a*e+o),f=0;f<4;f++)d=_[g+f]*(1-l)*(1-u)+_[g+4+f]*l*(1-u)+_[g+b+f]*u*(1-l)+_[g+b+4+f]*l*u,x[p++]=d;return y},hermiteFastResize:function(t,e,i,o,a){for(var c=this.rcpScaleX,l=this.rcpScaleY,u=h(c/2),f=h(l/2),d=t.imageData.data,g=t.ctx.createImageData(o,a),p=g.data,v=0;v<a;v++)for(var m=0;m<o;m++){for(var b=4*(m+v*o),_=0,y=0,x=0,C=0,S=0,w=0,T=0,O=(v+.5)*l,k=r(v*l);k<(v+1)*l;k++)for(var D=s(O-(k+.5))/f,E=(m+.5)*c,j=D*D,A=r(m*c);A<(m+1)*c;A++){var P=s(E-(A+.5))/u,M=n(j+P*P);M>1&&M<-1||(_=2*M*M*M-3*M*M+1)>0&&(T+=_*d[(P=4*(A+k*e))+3],x+=_,d[P+3]<255&&(_=_*d[P+3]/250),C+=_*d[P],S+=_*d[P+1],w+=_*d[P+2],y+=_)}p[b]=C/y,p[b+1]=S/y,p[b+2]=w/y,p[b+3]=T/x}return g},toObject:function(){return{type:this.type,scaleX:this.scaleX,scaleY:this.scaleY,resizeType:this.resizeType,lanczosLobes:this.lanczosLobes}}}),e.Image.filters.Resize.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Contrast=r(i.BaseFilter,{type:"Contrast",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uContrast;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat contrastF = 1.015 * (uContrast + 1.0) / (1.0 * (1.015 - uContrast));\ncolor.rgb = contrastF * (color.rgb - 0.5) + 0.5;\ngl_FragColor = color;\n}",contrast:0,mainParameter:"contrast",applyTo2d:function(t){if(0!==this.contrast){var e,i=t.imageData.data,r=i.length,n=Math.floor(255*this.contrast),s=259*(n+255)/(255*(259-n));for(e=0;e<r;e+=4)i[e]=s*(i[e]-128)+128,i[e+1]=s*(i[e+1]-128)+128,i[e+2]=s*(i[e+2]-128)+128}},getUniformLocations:function(t,e){return{uContrast:t.getUniformLocation(e,"uContrast")}},sendUniformData:function(t,e){t.uniform1f(e.uContrast,this.contrast)}}),e.Image.filters.Contrast.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Saturation=r(i.BaseFilter,{type:"Saturation",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform float uSaturation;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat rgMax = max(color.r, color.g);\nfloat rgbMax = max(rgMax, color.b);\ncolor.r += rgbMax != color.r ? (rgbMax - color.r) * uSaturation : 0.00;\ncolor.g += rgbMax != color.g ? (rgbMax - color.g) * uSaturation : 0.00;\ncolor.b += rgbMax != color.b ? (rgbMax - color.b) * uSaturation : 0.00;\ngl_FragColor = color;\n}",saturation:0,mainParameter:"saturation",applyTo2d:function(t){if(0!==this.saturation){var e,i,r=t.imageData.data,n=r.length,s=-this.saturation;for(e=0;e<n;e+=4)i=Math.max(r[e],r[e+1],r[e+2]),r[e]+=i!==r[e]?(i-r[e])*s:0,r[e+1]+=i!==r[e+1]?(i-r[e+1])*s:0,r[e+2]+=i!==r[e+2]?(i-r[e+2])*s:0}},getUniformLocations:function(t,e){return{uSaturation:t.getUniformLocation(e,"uSaturation")}},sendUniformData:function(t,e){t.uniform1f(e.uSaturation,-this.saturation)}}),e.Image.filters.Saturation.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Blur=r(i.BaseFilter,{type:"Blur",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec2 uDelta;\nvarying vec2 vTexCoord;\nconst float nSamples = 15.0;\nvec3 v3offset = vec3(12.9898, 78.233, 151.7182);\nfloat random(vec3 scale) {\nreturn fract(sin(dot(gl_FragCoord.xyz, scale)) * 43758.5453);\n}\nvoid main() {\nvec4 color = vec4(0.0);\nfloat total = 0.0;\nfloat offset = random(v3offset);\nfor (float t = -nSamples; t <= nSamples; t++) {\nfloat percent = (t + offset - 0.5) / nSamples;\nfloat weight = 1.0 - abs(percent);\ncolor += texture2D(uTexture, vTexCoord + uDelta * percent) * weight;\ntotal += weight;\n}\ngl_FragColor = color / total;\n}",blur:0,mainParameter:"blur",applyTo:function(t){t.webgl?(this.aspectRatio=t.sourceWidth/t.sourceHeight,t.passes++,this._setupFrameBuffer(t),this.horizontal=!0,this.applyToWebGL(t),this._swapTextures(t),this._setupFrameBuffer(t),this.horizontal=!1,this.applyToWebGL(t),this._swapTextures(t)):this.applyTo2d(t)},applyTo2d:function(t){t.imageData=this.simpleBlur(t)},simpleBlur:function(t){var e,i,r=t.filterBackend.resources,n=t.imageData.width,s=t.imageData.height;r.blurLayer1||(r.blurLayer1=document.createElement("canvas"),r.blurLayer2=document.createElement("canvas")),e=r.blurLayer1,i=r.blurLayer2,e.width===n&&e.height===s||(i.width=e.width=n,i.height=e.height=s);var o,a,h,c,l=e.getContext("2d"),u=i.getContext("2d"),f=.06*this.blur*.5;for(l.putImageData(t.imageData,0,0),u.clearRect(0,0,n,s),c=-15;c<=15;c++)h=f*(a=c/15)*n+(o=(Math.random()-.5)/4),u.globalAlpha=1-Math.abs(a),u.drawImage(e,h,o),l.drawImage(i,0,0),u.globalAlpha=1,u.clearRect(0,0,i.width,i.height);for(c=-15;c<=15;c++)h=f*(a=c/15)*s+(o=(Math.random()-.5)/4),u.globalAlpha=1-Math.abs(a),u.drawImage(e,o,h),l.drawImage(i,0,0),u.globalAlpha=1,u.clearRect(0,0,i.width,i.height);t.ctx.drawImage(e,0,0);var d=t.ctx.getImageData(0,0,e.width,e.height);return l.globalAlpha=1,l.clearRect(0,0,e.width,e.height),d},getUniformLocations:function(t,e){return{delta:t.getUniformLocation(e,"uDelta")}},sendUniformData:function(t,e){var i=this.chooseRightDelta();t.uniform2fv(e.delta,i)},chooseRightDelta:function(){var t,e=1,i=[0,0];return this.horizontal?this.aspectRatio>1&&(e=1/this.aspectRatio):this.aspectRatio<1&&(e=this.aspectRatio),t=e*this.blur*.12,this.horizontal?i[0]=t:i[1]=t,i}}),i.Blur.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Gamma=r(i.BaseFilter,{type:"Gamma",fragmentSource:"precision highp float;\nuniform sampler2D uTexture;\nuniform vec3 uGamma;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nvec3 correction = (1.0 / uGamma);\ncolor.r = pow(color.r, correction.r);\ncolor.g = pow(color.g, correction.g);\ncolor.b = pow(color.b, correction.b);\ngl_FragColor = color;\ngl_FragColor.rgb *= color.a;\n}",gamma:[1,1,1],mainParameter:"gamma",applyTo2d:function(t){var e,i=t.imageData.data,r=this.gamma,n=i.length,s=1/r[0],o=1/r[1],a=1/r[2];for(this.rVals||(this.rVals=new Uint8Array(256),this.gVals=new Uint8Array(256),this.bVals=new Uint8Array(256)),e=0,n=256;e<n;e++)this.rVals[e]=255*Math.pow(e/255,s),this.gVals[e]=255*Math.pow(e/255,o),this.bVals[e]=255*Math.pow(e/255,a);for(e=0,n=i.length;e<n;e+=4)i[e]=this.rVals[i[e]],i[e+1]=this.gVals[i[e+1]],i[e+2]=this.bVals[i[e+2]]},getUniformLocations:function(t,e){return{uGamma:t.getUniformLocation(e,"uGamma")}},sendUniformData:function(t,e){t.uniform3fv(e.uGamma,this.gamma)}}),e.Image.filters.Gamma.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.Composed=r(i.BaseFilter,{type:"Composed",subFilters:[],initialize:function(t){this.callSuper("initialize",t),this.subFilters=this.subFilters.slice(0)},applyTo:function(t){t.passes+=this.subFilters.length-1,this.subFilters.forEach(function(e){e.applyTo(t)})},toObject:function(){return e.util.object.extend(this.callSuper("toObject"),{subFilters:this.subFilters.map(function(t){return t.toObject()})})}}),e.Image.filters.Composed.fromObject=function(t,i){var r=(t.subFilters||[]).map(function(t){return new e.Image.filters[t.type](t)}),n=new e.Image.filters.Composed({subFilters:r});return i&&i(n),n}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.Image.filters,r=e.util.createClass;i.HueRotation=r(i.ColorMatrix,{type:"HueRotation",rotation:0,mainParameter:"rotation",calculateMatrix:function(){var t=this.rotation*Math.PI,i=e.util.cos(t),r=e.util.sin(t),n=Math.sqrt(1/3)*r,s=1-i;this.matrix=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],this.matrix[0]=i+s/3,this.matrix[1]=1/3*s-n,this.matrix[2]=1/3*s+n,this.matrix[5]=1/3*s+n,this.matrix[6]=i+1/3*s,this.matrix[7]=1/3*s-n,this.matrix[10]=1/3*s-n,this.matrix[11]=1/3*s+n,this.matrix[12]=i+1/3*s},applyTo:function(t){this.calculateMatrix(),e.Image.filters.BaseFilter.prototype.applyTo.call(this,t)}}),e.Image.filters.HueRotation.fromObject=e.Image.filters.BaseFilter.fromObject}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.clone;e.Text?e.warn("fabric.Text is already defined"):(e.Text=e.util.createClass(e.Object,{_dimensionAffectingProps:["fontSize","fontWeight","fontFamily","fontStyle","lineHeight","text","charSpacing","textAlign","styles"],_reNewline:/\r?\n/,_reSpacesAndTabs:/[ \t\r]/g,_reSpaceAndTab:/[ \t\r]/,_reWords:/\S+/g,type:"text",fontSize:40,fontWeight:"normal",fontFamily:"Times New Roman",underline:!1,overline:!1,linethrough:!1,textAlign:"left",fontStyle:"normal",lineHeight:1.16,superscript:{size:.6,baseline:-.35},subscript:{size:.6,baseline:.11},textBackgroundColor:"",stateProperties:e.Object.prototype.stateProperties.concat("fontFamily","fontWeight","fontSize","text","underline","overline","linethrough","textAlign","fontStyle","lineHeight","textBackgroundColor","charSpacing","styles"),cacheProperties:e.Object.prototype.cacheProperties.concat("fontFamily","fontWeight","fontSize","text","underline","overline","linethrough","textAlign","fontStyle","lineHeight","textBackgroundColor","charSpacing","styles"),stroke:null,shadow:null,_fontSizeFraction:.222,offsets:{underline:.1,linethrough:-.315,overline:-.88},_fontSizeMult:1.13,charSpacing:0,styles:null,_measuringContext:null,deltaY:0,_styleProperties:["stroke","strokeWidth","fill","fontFamily","fontSize","fontWeight","fontStyle","underline","overline","linethrough","deltaY","textBackgroundColor"],__charBounds:[],CACHE_FONT_SIZE:400,MIN_TEXT_WIDTH:2,initialize:function(t,e){this.styles=e?e.styles||{}:{},this.text=t,this.__skipDimension=!0,this.callSuper("initialize",e),this.__skipDimension=!1,this.initDimensions(),this.setCoords(),this.setupState({propertySet:"_dimensionAffectingProps"})},getMeasuringContext:function(){return e._measuringContext||(e._measuringContext=this.canvas&&this.canvas.contextCache||e.util.createCanvasElement().getContext("2d")),e._measuringContext},_splitText:function(){var t=this._splitTextIntoLines(this.text);return this.textLines=t.lines,this._textLines=t.graphemeLines,this._unwrappedTextLines=t._unwrappedLines,this._text=t.graphemeText,t},initDimensions:function(){this.__skipDimension||(this._splitText(),this._clearCache(),this.width=this.calcTextWidth()||this.cursorWidth||this.MIN_TEXT_WIDTH,-1!==this.textAlign.indexOf("justify")&&this.enlargeSpaces(),this.height=this.calcTextHeight(),this.saveState({propertySet:"_dimensionAffectingProps"}))},enlargeSpaces:function(){for(var t,e,i,r,n,s,o,a=0,h=this._textLines.length;a<h;a++)if(("justify"===this.textAlign||a!==h-1&&!this.isEndOfWrapping(a))&&(r=0,n=this._textLines[a],(e=this.getLineWidth(a))<this.width&&(o=this.textLines[a].match(this._reSpacesAndTabs)))){i=o.length,t=(this.width-e)/i;for(var c=0,l=n.length;c<=l;c++)s=this.__charBounds[a][c],this._reSpaceAndTab.test(n[c])?(s.width+=t,s.kernedWidth+=t,s.left+=r,r+=t):s.left+=r}},isEndOfWrapping:function(t){return t===this._textLines.length-1},toString:function(){return"#<fabric.Text ("+this.complexity()+'): { "text": "'+this.text+'", "fontFamily": "'+this.fontFamily+'" }>'},_getCacheCanvasDimensions:function(){var t=this.callSuper("_getCacheCanvasDimensions"),e=this.fontSize;return t.width+=e*t.zoomX,t.height+=e*t.zoomY,t},_render:function(t){this._setTextStyles(t),this._renderTextLinesBackground(t),this._renderTextDecoration(t,"underline"),this._renderText(t),this._renderTextDecoration(t,"overline"),this._renderTextDecoration(t,"linethrough")},_renderText:function(t){"stroke"===this.paintFirst?(this._renderTextStroke(t),this._renderTextFill(t)):(this._renderTextFill(t),this._renderTextStroke(t))},_setTextStyles:function(t,e,i){t.textBaseline="alphabetic",t.font=this._getFontDeclaration(e,i)},calcTextWidth:function(){for(var t=this.getLineWidth(0),e=1,i=this._textLines.length;e<i;e++){var r=this.getLineWidth(e);r>t&&(t=r)}return t},_renderTextLine:function(t,e,i,r,n,s){this._renderChars(t,e,i,r,n,s)},_renderTextLinesBackground:function(t){if(this.textBackgroundColor||this.styleHas("textBackgroundColor")){for(var e,i,r,n,s,o,a=0,h=t.fillStyle,c=this._getLeftOffset(),l=this._getTopOffset(),u=0,f=0,d=0,g=this._textLines.length;d<g;d++)if(e=this.getHeightOfLine(d),this.textBackgroundColor||this.styleHas("textBackgroundColor",d)){r=this._textLines[d],i=this._getLineLeftOffset(d),f=0,u=0,n=this.getValueOfPropertyAt(d,0,"textBackgroundColor");for(var p=0,v=r.length;p<v;p++)s=this.__charBounds[d][p],(o=this.getValueOfPropertyAt(d,p,"textBackgroundColor"))!==n?(t.fillStyle=n,n&&t.fillRect(c+i+u,l+a,f,e/this.lineHeight),u=s.left,f=s.width,n=o):f+=s.kernedWidth;o&&(t.fillStyle=o,t.fillRect(c+i+u,l+a,f,e/this.lineHeight)),a+=e}else a+=e;t.fillStyle=h,this._removeShadow(t)}},getFontCache:function(t){var i=t.fontFamily.toLowerCase();e.charWidthsCache[i]||(e.charWidthsCache[i]={});var r=e.charWidthsCache[i],n=t.fontStyle.toLowerCase()+"_"+(t.fontWeight+"").toLowerCase();return r[n]||(r[n]={}),r[n]},_applyCharStyles:function(t,e,i,r,n){this._setFillStyles(e,n),this._setStrokeStyles(e,n),e.font=this._getFontDeclaration(n)},_measureChar:function(t,e,i,r){var n,s,o,a,h=this.getFontCache(e),c=i+t,l=this._getFontDeclaration(e)===this._getFontDeclaration(r),u=e.fontSize/this.CACHE_FONT_SIZE;if(i&&h[i]&&(o=h[i]),h[t]&&(a=n=h[t]),l&&h[c]&&(a=(s=h[c])-o),!n||!o||!s){var f=this.getMeasuringContext();this._setTextStyles(f,e,!0)}return n||(a=n=f.measureText(t).width,h[t]=n),!o&&l&&i&&(o=f.measureText(i).width,h[i]=o),l&&!s&&(s=f.measureText(c).width,h[c]=s,a=s-o),{width:n*u,kernedWidth:a*u}},getHeightOfChar:function(t,e){return this.getValueOfPropertyAt(t,e,"fontSize")},measureLine:function(t){var e=this._measureLine(t);return 0!==this.charSpacing&&(e.width-=this._getWidthOfCharSpacing()),e.width<0&&(e.width=0),e},_measureLine:function(t){var e,i,r,n,s=0,o=this._textLines[t],a=new Array(o.length);for(this.__charBounds[t]=a,e=0;e<o.length;e++)i=o[e],n=this._getGraphemeBox(i,t,e,r),a[e]=n,s+=n.kernedWidth,r=i;return a[e]={left:n?n.left+n.width:0,width:0,kernedWidth:0,height:this.fontSize},{width:s,numOfSpaces:0}},_getGraphemeBox:function(t,e,i,r,n){var s=this.getCompleteStyleDeclaration(e,i),o=r?this.getCompleteStyleDeclaration(e,i-1):{},a=this._measureChar(t,s,r,o),h=a.kernedWidth,c=a.width;0!==this.charSpacing&&(c+=this._getWidthOfCharSpacing(),h+=this._getWidthOfCharSpacing());var l={width:c,left:0,height:s.fontSize,kernedWidth:h,deltaY:s.deltaY};if(i>0&&!n){var u=this.__charBounds[e][i-1];l.left=u.left+u.width+a.kernedWidth-a.width}return l},getHeightOfLine:function(t){if(this.__lineHeights[t])return this.__lineHeights[t];for(var e=0,i=0,r=this._textLines[t].length;i<r;i++)e=Math.max(this.getHeightOfChar(t,i),e);return this.__lineHeights[t]=e*this.lineHeight*this._fontSizeMult},calcTextHeight:function(){for(var t,e=0,i=0,r=this._textLines.length;i<r;i++)t=this.getHeightOfLine(i),e+=i===r-1?t/this.lineHeight:t;return e},_getLeftOffset:function(){return-this.width/2},_getTopOffset:function(){return-this.height/2},_renderTextCommon:function(t,e){t.save();for(var i=0,r=this._getLeftOffset(),n=this._getTopOffset(),s=this._applyPatternGradientTransform(t,"fillText"===e?this.fill:this.stroke),o=0,a=this._textLines.length;o<a;o++){var h=this.getHeightOfLine(o),c=h/this.lineHeight,l=this._getLineLeftOffset(o);this._renderTextLine(e,t,this._textLines[o],r+l-s.offsetX,n+i+c-s.offsetY,o),i+=h}t.restore()},_renderTextFill:function(t){(this.fill||this.styleHas("fill"))&&this._renderTextCommon(t,"fillText")},_renderTextStroke:function(t){(this.stroke&&0!==this.strokeWidth||!this.isEmptyStyles())&&(this.shadow&&!this.shadow.affectStroke&&this._removeShadow(t),t.save(),this._setLineDash(t,this.strokeDashArray),t.beginPath(),this._renderTextCommon(t,"strokeText"),t.closePath(),t.restore())},_renderChars:function(t,e,i,r,n,s){var o,a,h,c,l=this.getHeightOfLine(s),u=-1!==this.textAlign.indexOf("justify"),f="",d=0,g=!u&&0===this.charSpacing&&this.isEmptyStyles(s);if(e.save(),n-=l*this._fontSizeFraction/this.lineHeight,g)return this._renderChar(t,e,s,0,this.textLines[s],r,n,l),void e.restore();for(var p=0,v=i.length-1;p<=v;p++)c=p===v||this.charSpacing,f+=i[p],h=this.__charBounds[s][p],0===d?(r+=h.kernedWidth-h.width,d+=h.width):d+=h.kernedWidth,u&&!c&&this._reSpaceAndTab.test(i[p])&&(c=!0),c||(o=o||this.getCompleteStyleDeclaration(s,p),a=this.getCompleteStyleDeclaration(s,p+1),c=this._hasStyleChanged(o,a)),c&&(this._renderChar(t,e,s,p,f,r,n,l),f="",o=a,r+=d,d=0);e.restore()},_renderChar:function(t,e,i,r,n,s,o){var a=this._getStyleDeclaration(i,r),h=this.getCompleteStyleDeclaration(i,r),c="fillText"===t&&h.fill,l="strokeText"===t&&h.stroke&&h.strokeWidth;(l||c)&&(a&&e.save(),this._applyCharStyles(t,e,i,r,h),a&&a.textBackgroundColor&&this._removeShadow(e),a&&a.deltaY&&(o+=a.deltaY),c&&e.fillText(n,s,o),l&&e.strokeText(n,s,o),a&&e.restore())},setSuperscript:function(t,e){return this._setScript(t,e,this.superscript)},setSubscript:function(t,e){return this._setScript(t,e,this.subscript)},_setScript:function(t,e,i){var r=this.get2DCursorLocation(t,!0),n=this.getValueOfPropertyAt(r.lineIndex,r.charIndex,"fontSize"),s=this.getValueOfPropertyAt(r.lineIndex,r.charIndex,"deltaY"),o={fontSize:n*i.size,deltaY:s+n*i.baseline};return this.setSelectionStyles(o,t,e),this},_hasStyleChanged:function(t,e){return t.fill!==e.fill||t.stroke!==e.stroke||t.strokeWidth!==e.strokeWidth||t.fontSize!==e.fontSize||t.fontFamily!==e.fontFamily||t.fontWeight!==e.fontWeight||t.fontStyle!==e.fontStyle||t.deltaY!==e.deltaY},_hasStyleChangedForSvg:function(t,e){return this._hasStyleChanged(t,e)||t.overline!==e.overline||t.underline!==e.underline||t.linethrough!==e.linethrough},_getLineLeftOffset:function(t){var e=this.getLineWidth(t);return"center"===this.textAlign?(this.width-e)/2:"right"===this.textAlign?this.width-e:"justify-center"===this.textAlign&&this.isEndOfWrapping(t)?(this.width-e)/2:"justify-right"===this.textAlign&&this.isEndOfWrapping(t)?this.width-e:0},_clearCache:function(){this.__lineWidths=[],this.__lineHeights=[],this.__charBounds=[]},_shouldClearDimensionCache:function(){var t=this._forceClearCache;return t||(t=this.hasStateChanged("_dimensionAffectingProps")),t&&(this.dirty=!0,this._forceClearCache=!1),t},getLineWidth:function(t){if(this.__lineWidths[t])return this.__lineWidths[t];var e;return e=""===this._textLines[t]?0:this.measureLine(t).width,this.__lineWidths[t]=e,e},_getWidthOfCharSpacing:function(){return 0!==this.charSpacing?this.fontSize*this.charSpacing/1e3:0},getValueOfPropertyAt:function(t,e,i){var r=this._getStyleDeclaration(t,e);return r&&void 0!==r[i]?r[i]:this[i]},_renderTextDecoration:function(t,e){if(this[e]||this.styleHas(e)){for(var i,r,n,s,o,a,h,c,l,u,f,d,g,p,v,m,b=this._getLeftOffset(),_=this._getTopOffset(),y=0,x=this._textLines.length;y<x;y++)if(i=this.getHeightOfLine(y),this[e]||this.styleHas(e,y)){h=this._textLines[y],p=i/this.lineHeight,s=this._getLineLeftOffset(y),u=0,f=0,c=this.getValueOfPropertyAt(y,0,e),m=this.getValueOfPropertyAt(y,0,"fill"),l=_+p*(1-this._fontSizeFraction),r=this.getHeightOfChar(y,0),o=this.getValueOfPropertyAt(y,0,"deltaY");for(var C=0,S=h.length;C<S;C++)d=this.__charBounds[y][C],g=this.getValueOfPropertyAt(y,C,e),v=this.getValueOfPropertyAt(y,C,"fill"),n=this.getHeightOfChar(y,C),a=this.getValueOfPropertyAt(y,C,"deltaY"),(g!==c||v!==m||n!==r||a!==o)&&f>0?(t.fillStyle=m,c&&m&&t.fillRect(b+s+u,l+this.offsets[e]*r+o,f,this.fontSize/15),u=d.left,f=d.width,c=g,m=v,r=n,o=a):f+=d.kernedWidth;t.fillStyle=v,g&&v&&t.fillRect(b+s+u,l+this.offsets[e]*r+o,f,this.fontSize/15),_+=i}else _+=i;this._removeShadow(t)}},_getFontDeclaration:function(t,i){var r=t||this;return[e.isLikelyNode?r.fontWeight:r.fontStyle,e.isLikelyNode?r.fontStyle:r.fontWeight,i?this.CACHE_FONT_SIZE+"px":r.fontSize+"px",e.isLikelyNode?'"'+r.fontFamily+'"':r.fontFamily].join(" ")},render:function(t){this.visible&&(this.canvas&&this.canvas.skipOffscreen&&!this.group&&!this.isOnScreen()||(this._shouldClearDimensionCache()&&this.initDimensions(),this.callSuper("render",t)))},_splitTextIntoLines:function(t){for(var i=t.split(this._reNewline),r=new Array(i.length),n=["\n"],s=[],o=0;o<i.length;o++)r[o]=e.util.string.graphemeSplit(i[o]),s=s.concat(r[o],n);return s.pop(),{_unwrappedLines:r,lines:i,graphemeText:s,graphemeLines:r}},toObject:function(t){var e=["text","fontSize","fontWeight","fontFamily","fontStyle","lineHeight","underline","overline","linethrough","textAlign","textBackgroundColor","charSpacing"].concat(t),r=this.callSuper("toObject",e);return r.styles=i(this.styles,!0),r},set:function(t,e){this.callSuper("set",t,e);var i=!1;if("object"==typeof t)for(var r in t)i=i||-1!==this._dimensionAffectingProps.indexOf(r);else i=-1!==this._dimensionAffectingProps.indexOf(t);return i&&(this.initDimensions(),this.setCoords()),this},complexity:function(){return 1}}),e.Text.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat("x y dx dy font-family font-style font-weight font-size text-decoration text-anchor".split(" ")),e.Text.DEFAULT_SVG_FONT_SIZE=16,e.Text.fromElement=function(t,r,n){if(!t)return r(null);var s=e.parseAttributes(t,e.Text.ATTRIBUTE_NAMES),o=s.textAnchor||"left";if(n=e.util.object.extend(n?i(n):{},s),n.top=n.top||0,n.left=n.left||0,s.textDecoration){var a=s.textDecoration;-1!==a.indexOf("underline")&&(n.underline=!0),-1!==a.indexOf("overline")&&(n.overline=!0),-1!==a.indexOf("line-through")&&(n.linethrough=!0),delete n.textDecoration}"dx"in s&&(n.left+=s.dx),"dy"in s&&(n.top+=s.dy),"fontSize"in n||(n.fontSize=e.Text.DEFAULT_SVG_FONT_SIZE);var h="";"textContent"in t?h=t.textContent:"firstChild"in t&&null!==t.firstChild&&"data"in t.firstChild&&null!==t.firstChild.data&&(h=t.firstChild.data),h=h.replace(/^\s+|\s+$|\n+/g,"").replace(/\s+/g," ");var c=new e.Text(h,n),l=c.getScaledHeight()/c.height,u=((c.height+c.strokeWidth)*c.lineHeight-c.height)*l,f=c.getScaledHeight()+u,d=0;"center"===o&&(d=c.getScaledWidth()/2),"right"===o&&(d=c.getScaledWidth()),c.set({left:c.left-d,top:c.top-(f-c.fontSize*(.18+c._fontSizeFraction))/c.lineHeight}),r(c)},e.Text.fromObject=function(t,i){return e.Object._fromObject("Text",t,i,"text")},e.util.createAccessors&&e.util.createAccessors(e.Text))}("undefined"!=typeof exports?exports:this),fabric.util.object.extend(fabric.Text.prototype,{isEmptyStyles:function(t){if(!this.styles)return!0;if(void 0!==t&&!this.styles[t])return!0;var e=void 0===t?this.styles:{line:this.styles[t]};for(var i in e)for(var r in e[i])for(var n in e[i][r])return!1;return!0},styleHas:function(t,e){if(!this.styles||!t||""===t)return!1;if(void 0!==e&&!this.styles[e])return!1;var i=void 0===e?this.styles:{line:this.styles[e]};for(var r in i)for(var n in i[r])if(void 0!==i[r][n][t])return!0;return!1},cleanStyle:function(t){if(!this.styles||!t||""===t)return!1;var e,i,r=this.styles,n=0,s=!0,o=0;for(var a in r){e=0;for(var h in r[a]){var c;n++,(c=r[a][h]).hasOwnProperty(t)?(i?c[t]!==i&&(s=!1):i=c[t],c[t]===this[t]&&delete c[t]):s=!1,0!==Object.keys(c).length?e++:delete r[a][h]}0===e&&delete r[a]}for(var l=0;l<this._textLines.length;l++)o+=this._textLines[l].length;s&&n===o&&(this[t]=i,this.removeStyle(t))},removeStyle:function(t){if(this.styles&&t&&""!==t){var e,i,r,n=this.styles;for(i in n){e=n[i];for(r in e)delete e[r][t],0===Object.keys(e[r]).length&&delete e[r];0===Object.keys(e).length&&delete n[i]}}},_extendStyles:function(t,e){var i=this.get2DCursorLocation(t);this._getLineStyle(i.lineIndex)||this._setLineStyle(i.lineIndex,{}),this._getStyleDeclaration(i.lineIndex,i.charIndex)||this._setStyleDeclaration(i.lineIndex,i.charIndex,{}),fabric.util.object.extend(this._getStyleDeclaration(i.lineIndex,i.charIndex),e)},get2DCursorLocation:function(t,e){void 0===t&&(t=this.selectionStart);for(var i=e?this._unwrappedTextLines:this._textLines,r=i.length,n=0;n<r;n++){if(t<=i[n].length)return{lineIndex:n,charIndex:t};t-=i[n].length+1}return{lineIndex:n-1,charIndex:i[n-1].length<t?i[n-1].length:t}},getSelectionStyles:function(t,e,i){void 0===t&&(t=this.selectionStart||0),void 0===e&&(e=this.selectionEnd||t);for(var r=[],n=t;n<e;n++)r.push(this.getStyleAtPosition(n,i));return r},getStyleAtPosition:function(t,e){var i=this.get2DCursorLocation(t);return(e?this.getCompleteStyleDeclaration(i.lineIndex,i.charIndex):this._getStyleDeclaration(i.lineIndex,i.charIndex))||{}},setSelectionStyles:function(t,e,i){void 0===e&&(e=this.selectionStart||0),void 0===i&&(i=this.selectionEnd||e);for(var r=e;r<i;r++)this._extendStyles(r,t);return this._forceClearCache=!0,this},_getStyleDeclaration:function(t,e){var i=this.styles&&this.styles[t];return i?i[e]:null},getCompleteStyleDeclaration:function(t,e){for(var i,r=this._getStyleDeclaration(t,e)||{},n={},s=0;s<this._styleProperties.length;s++)n[i=this._styleProperties[s]]=void 0===r[i]?this[i]:r[i];return n},_setStyleDeclaration:function(t,e,i){this.styles[t][e]=i},_deleteStyleDeclaration:function(t,e){delete this.styles[t][e]},_getLineStyle:function(t){return this.styles[t]},_setLineStyle:function(t,e){this.styles[t]=e},_deleteLineStyle:function(t){delete this.styles[t]}}),function(){function t(t){t.textDecoration&&(t.textDecoration.indexOf("underline")>-1&&(t.underline=!0),t.textDecoration.indexOf("line-through")>-1&&(t.linethrough=!0),t.textDecoration.indexOf("overline")>-1&&(t.overline=!0),delete t.textDecoration)}fabric.IText=fabric.util.createClass(fabric.Text,fabric.Observable,{type:"i-text",selectionStart:0,selectionEnd:0,selectionColor:"rgba(17,119,255,0.3)",isEditing:!1,editable:!0,editingBorderColor:"rgba(102,153,255,0.25)",cursorWidth:2,cursorColor:"#333",cursorDelay:1e3,cursorDuration:600,caching:!0,_reSpace:/\s|\n/,_currentCursorOpacity:0,_selectionDirection:null,_abortCursorAnimation:!1,__widthOfSpace:[],inCompositionMode:!1,initialize:function(t,e){this.callSuper("initialize",t,e),this.initBehavior()},setSelectionStart:function(t){t=Math.max(t,0),this._updateAndFire("selectionStart",t)},setSelectionEnd:function(t){t=Math.min(t,this.text.length),this._updateAndFire("selectionEnd",t)},_updateAndFire:function(t,e){this[t]!==e&&(this._fireSelectionChanged(),this[t]=e),this._updateTextarea()},_fireSelectionChanged:function(){this.fire("selection:changed"),this.canvas&&this.canvas.fire("text:selection:changed",{target:this})},initDimensions:function(){this.isEditing&&this.initDelayedCursor(),this.clearContextTop(),this.callSuper("initDimensions")},render:function(t){this.clearContextTop(),this.callSuper("render",t),this.cursorOffsetCache={},this.renderCursorOrSelection()},_render:function(t){this.callSuper("_render",t)},clearContextTop:function(t){if(this.isEditing&&this.canvas&&this.canvas.contextTop){var e=this.canvas.contextTop,i=this.canvas.viewportTransform;e.save(),e.transform(i[0],i[1],i[2],i[3],i[4],i[5]),this.transform(e),this.transformMatrix&&e.transform.apply(e,this.transformMatrix),this._clearTextArea(e),t||e.restore()}},renderCursorOrSelection:function(){if(this.isEditing&&this.canvas){var t,e=this._getCursorBoundaries();this.canvas&&this.canvas.contextTop?(t=this.canvas.contextTop,this.clearContextTop(!0)):(t=this.canvas.contextContainer).save(),this.selectionStart===this.selectionEnd?this.renderCursor(e,t):this.renderSelection(e,t),t.restore()}},_clearTextArea:function(t){var e=this.width+4,i=this.height+4;t.clearRect(-e/2,-i/2,e,i)},_getCursorBoundaries:function(t){void 0===t&&(t=this.selectionStart);var e=this._getLeftOffset(),i=this._getTopOffset(),r=this._getCursorBoundariesOffsets(t);return{left:e,top:i,leftOffset:r.left,topOffset:r.top}},_getCursorBoundariesOffsets:function(t){if(this.cursorOffsetCache&&"top"in this.cursorOffsetCache)return this.cursorOffsetCache;for(var e,i,r=0,n=0,s=this.get2DCursorLocation(t),o=0;o<s.lineIndex;o++)r+=this.getHeightOfLine(o);e=this._getLineLeftOffset(s.lineIndex);var a=this.__charBounds[s.lineIndex][s.charIndex];return a&&(n=a.left),0!==this.charSpacing&&0===this._textLines[0].length&&(n-=this._getWidthOfCharSpacing()),i={top:r,left:e+(n>0?n:0)},this.cursorOffsetCache=i,this.cursorOffsetCache},renderCursor:function(t,e){var i=this.get2DCursorLocation(),r=i.lineIndex,n=i.charIndex>0?i.charIndex-1:0,s=this.getValueOfPropertyAt(r,n,"fontSize"),o=this.scaleX*this.canvas.getZoom(),a=this.cursorWidth/o,h=t.topOffset,c=this.getValueOfPropertyAt(r,n,"deltaY");h+=(1-this._fontSizeFraction)*this.getHeightOfLine(r)/this.lineHeight-s*(1-this._fontSizeFraction),this.inCompositionMode&&this.renderSelection(t,e),e.fillStyle=this.getValueOfPropertyAt(r,n,"fill"),e.globalAlpha=this.__isMousedown?1:this._currentCursorOpacity,e.fillRect(t.left+t.leftOffset-a/2,h+t.top+c,a,s)},renderSelection:function(t,e){for(var i=this.inCompositionMode?this.hiddenTextarea.selectionStart:this.selectionStart,r=this.inCompositionMode?this.hiddenTextarea.selectionEnd:this.selectionEnd,n=-1!==this.textAlign.indexOf("justify"),s=this.get2DCursorLocation(i),o=this.get2DCursorLocation(r),a=s.lineIndex,h=o.lineIndex,c=s.charIndex<0?0:s.charIndex,l=o.charIndex<0?0:o.charIndex,u=a;u<=h;u++){var f=this._getLineLeftOffset(u)||0,d=this.getHeightOfLine(u),g=0,p=0,v=0;u===a&&(p=this.__charBounds[a][c].left),u>=a&&u<h?v=n&&!this.isEndOfWrapping(u)?this.width:this.getLineWidth(u)||5:u===h&&(v=0===l?this.__charBounds[h][l].left:this.__charBounds[h][l-1].left+this.__charBounds[h][l-1].width),g=d,(this.lineHeight<1||u===h&&this.lineHeight>1)&&(d/=this.lineHeight),this.inCompositionMode?(e.fillStyle=this.compositionColor||"black",e.fillRect(t.left+f+p,t.top+t.topOffset+d,v-p,1)):(e.fillStyle=this.selectionColor,e.fillRect(t.left+f+p,t.top+t.topOffset,v-p,d)),t.topOffset+=g}},getCurrentCharFontSize:function(){var t=this._getCurrentCharIndex();return this.getValueOfPropertyAt(t.l,t.c,"fontSize")},getCurrentCharColor:function(){var t=this._getCurrentCharIndex();return this.getValueOfPropertyAt(t.l,t.c,"fill")},_getCurrentCharIndex:function(){var t=this.get2DCursorLocation(this.selectionStart,!0),e=t.charIndex>0?t.charIndex-1:0;return{l:t.lineIndex,c:e}}}),fabric.IText.fromObject=function(e,i){if(t(e),e.styles)for(var r in e.styles)for(var n in e.styles[r])t(e.styles[r][n]);fabric.Object._fromObject("IText",e,i,"text")}}(),function(){var t=fabric.util.object.clone;fabric.util.object.extend(fabric.IText.prototype,{initBehavior:function(){this.initAddedHandler(),this.initRemovedHandler(),this.initCursorSelectionHandlers(),this.initDoubleClickSimulation(),this.mouseMoveHandler=this.mouseMoveHandler.bind(this)},onDeselect:function(t){this.isEditing&&this.exitEditing(),this.selected=!1,fabric.Object.prototype.onDeselect.call(this,t)},initAddedHandler:function(){var t=this;this.on("added",function(){var e=t.canvas;e&&(e._hasITextHandlers||(e._hasITextHandlers=!0,t._initCanvasHandlers(e)),e._iTextInstances=e._iTextInstances||[],e._iTextInstances.push(t))})},initRemovedHandler:function(){var t=this;this.on("removed",function(){var e=t.canvas;e&&(e._iTextInstances=e._iTextInstances||[],fabric.util.removeFromArray(e._iTextInstances,t),0===e._iTextInstances.length&&(e._hasITextHandlers=!1,t._removeCanvasHandlers(e)))})},_initCanvasHandlers:function(t){t._mouseUpITextHandler=function(){t._iTextInstances&&t._iTextInstances.forEach(function(t){t.__isMousedown=!1})}.bind(this),t.on("mouse:up",t._mouseUpITextHandler)},_removeCanvasHandlers:function(t){t.off("mouse:up",t._mouseUpITextHandler)},_tick:function(){this._currentTickState=this._animateCursor(this,1,this.cursorDuration,"_onTickComplete")},_animateCursor:function(t,e,i,r){var n;return n={isAborted:!1,abort:function(){this.isAborted=!0}},t.animate("_currentCursorOpacity",e,{duration:i,onComplete:function(){n.isAborted||t[r]()},onChange:function(){t.canvas&&t.selectionStart===t.selectionEnd&&t.renderCursorOrSelection()},abort:function(){return n.isAborted}}),n},_onTickComplete:function(){var t=this;this._cursorTimeout1&&clearTimeout(this._cursorTimeout1),this._cursorTimeout1=setTimeout(function(){t._currentTickCompleteState=t._animateCursor(t,0,this.cursorDuration/2,"_tick")},100)},initDelayedCursor:function(t){var e=this,i=t?0:this.cursorDelay;this.abortCursorAnimation(),this._currentCursorOpacity=1,this._cursorTimeout2=setTimeout(function(){e._tick()},i)},abortCursorAnimation:function(){var t=this._currentTickState||this._currentTickCompleteState,e=this.canvas;this._currentTickState&&this._currentTickState.abort(),this._currentTickCompleteState&&this._currentTickCompleteState.abort(),clearTimeout(this._cursorTimeout1),clearTimeout(this._cursorTimeout2),this._currentCursorOpacity=0,t&&e&&e.clearContext(e.contextTop||e.contextContainer)},selectAll:function(){return this.selectionStart=0,this.selectionEnd=this._text.length,this._fireSelectionChanged(),this._updateTextarea(),this},getSelectedText:function(){return this._text.slice(this.selectionStart,this.selectionEnd).join("")},findWordBoundaryLeft:function(t){var e=0,i=t-1;if(this._reSpace.test(this._text[i]))for(;this._reSpace.test(this._text[i]);)e++,i--;for(;/\S/.test(this._text[i])&&i>-1;)e++,i--;return t-e},findWordBoundaryRight:function(t){var e=0,i=t;if(this._reSpace.test(this._text[i]))for(;this._reSpace.test(this._text[i]);)e++,i++;for(;/\S/.test(this._text[i])&&i<this.text.length;)e++,i++;return t+e},findLineBoundaryLeft:function(t){for(var e=0,i=t-1;!/\n/.test(this._text[i])&&i>-1;)e++,i--;return t-e},findLineBoundaryRight:function(t){for(var e=0,i=t;!/\n/.test(this._text[i])&&i<this.text.length;)e++,i++;return t+e},searchWordBoundary:function(t,e){for(var i=this._reSpace.test(this.text.charAt(t))?t-1:t,r=this.text.charAt(i),n=/[ \n\.,;!\?\-]/;!n.test(r)&&i>0&&i<this.text.length;)i+=e,r=this.text.charAt(i);return n.test(r)&&"\n"!==r&&(i+=1===e?0:1),i},selectWord:function(t){t=t||this.selectionStart;var e=this.searchWordBoundary(t,-1),i=this.searchWordBoundary(t,1);this.selectionStart=e,this.selectionEnd=i,this._fireSelectionChanged(),this._updateTextarea(),this.renderCursorOrSelection()},selectLine:function(t){t=t||this.selectionStart;var e=this.findLineBoundaryLeft(t),i=this.findLineBoundaryRight(t);return this.selectionStart=e,this.selectionEnd=i,this._fireSelectionChanged(),this._updateTextarea(),this},enterEditing:function(t){if(!this.isEditing&&this.editable)return this.canvas&&(this.canvas.calcOffset(),this.exitEditingOnOthers(this.canvas)),this.isEditing=!0,this.initHiddenTextarea(t),this.hiddenTextarea.focus(),this.hiddenTextarea.value=this.text,this._updateTextarea(),this._saveEditingProps(),this._setEditingProps(),this._textBeforeEdit=this.text,this._tick(),this.fire("editing:entered"),this._fireSelectionChanged(),this.canvas?(this.canvas.fire("text:editing:entered",{target:this}),this.initMouseMoveHandler(),this.canvas.requestRenderAll(),this):this},exitEditingOnOthers:function(t){t._iTextInstances&&t._iTextInstances.forEach(function(t){t.selected=!1,t.isEditing&&t.exitEditing()})},initMouseMoveHandler:function(){this.canvas.on("mouse:move",this.mouseMoveHandler)},mouseMoveHandler:function(t){if(this.__isMousedown&&this.isEditing){var e=this.getSelectionStartFromPointer(t.e),i=this.selectionStart,r=this.selectionEnd;(e===this.__selectionStartOnMouseDown&&i!==r||i!==e&&r!==e)&&(e>this.__selectionStartOnMouseDown?(this.selectionStart=this.__selectionStartOnMouseDown,this.selectionEnd=e):(this.selectionStart=e,this.selectionEnd=this.__selectionStartOnMouseDown),this.selectionStart===i&&this.selectionEnd===r||(this.restartCursorIfNeeded(),this._fireSelectionChanged(),this._updateTextarea(),this.renderCursorOrSelection()))}},_setEditingProps:function(){this.hoverCursor="text",this.canvas&&(this.canvas.defaultCursor=this.canvas.moveCursor="text"),this.borderColor=this.editingBorderColor,this.hasControls=this.selectable=!1,this.lockMovementX=this.lockMovementY=!0},fromStringToGraphemeSelection:function(t,e,i){var r=i.slice(0,t),n=fabric.util.string.graphemeSplit(r).length;if(t===e)return{selectionStart:n,selectionEnd:n};var s=i.slice(t,e);return{selectionStart:n,selectionEnd:n+fabric.util.string.graphemeSplit(s).length}},fromGraphemeToStringSelection:function(t,e,i){var r=i.slice(0,t).join("").length;if(t===e)return{selectionStart:r,selectionEnd:r};return{selectionStart:r,selectionEnd:r+i.slice(t,e).join("").length}},_updateTextarea:function(){if(this.cursorOffsetCache={},this.hiddenTextarea){if(!this.inCompositionMode){var t=this.fromGraphemeToStringSelection(this.selectionStart,this.selectionEnd,this._text);this.hiddenTextarea.selectionStart=t.selectionStart,this.hiddenTextarea.selectionEnd=t.selectionEnd}this.updateTextareaPosition()}},updateFromTextArea:function(){if(this.hiddenTextarea){this.cursorOffsetCache={},this.text=this.hiddenTextarea.value,this._shouldClearDimensionCache()&&(this.initDimensions(),this.setCoords());var t=this.fromStringToGraphemeSelection(this.hiddenTextarea.selectionStart,this.hiddenTextarea.selectionEnd,this.hiddenTextarea.value);this.selectionEnd=this.selectionStart=t.selectionEnd,this.inCompositionMode||(this.selectionStart=t.selectionStart),this.updateTextareaPosition()}},updateTextareaPosition:function(){if(this.selectionStart===this.selectionEnd){var t=this._calcTextareaPosition();this.hiddenTextarea.style.left=t.left,this.hiddenTextarea.style.top=t.top}},_calcTextareaPosition:function(){if(!this.canvas)return{x:1,y:1};var t=this.inCompositionMode?this.compositionStart:this.selectionStart,e=this._getCursorBoundaries(t),i=this.get2DCursorLocation(t),r=i.lineIndex,n=i.charIndex,s=this.getValueOfPropertyAt(r,n,"fontSize")*this.lineHeight,o=e.leftOffset,a=this.calcTransformMatrix(),h={x:e.left+o,y:e.top+e.topOffset+s},c=this.canvas.upperCanvasEl,l=c.width-s,u=c.height-s;return h=fabric.util.transformPoint(h,a),(h=fabric.util.transformPoint(h,this.canvas.viewportTransform)).x<0&&(h.x=0),h.x>l&&(h.x=l),h.y<0&&(h.y=0),h.y>u&&(h.y=u),h.x+=this.canvas._offset.left,h.y+=this.canvas._offset.top,{left:h.x+"px",top:h.y+"px",fontSize:s+"px",charHeight:s}},_saveEditingProps:function(){this._savedProps={hasControls:this.hasControls,borderColor:this.borderColor,lockMovementX:this.lockMovementX,lockMovementY:this.lockMovementY,hoverCursor:this.hoverCursor,defaultCursor:this.canvas&&this.canvas.defaultCursor,moveCursor:this.canvas&&this.canvas.moveCursor}},_restoreEditingProps:function(){this._savedProps&&(this.hoverCursor=this._savedProps.hoverCursor,this.hasControls=this._savedProps.hasControls,this.borderColor=this._savedProps.borderColor,this.lockMovementX=this._savedProps.lockMovementX,this.lockMovementY=this._savedProps.lockMovementY,this.canvas&&(this.canvas.defaultCursor=this._savedProps.defaultCursor,this.canvas.moveCursor=this._savedProps.moveCursor))},exitEditing:function(){var t=this._textBeforeEdit!==this.text;return this.selected=!1,this.isEditing=!1,this.selectable=!0,this.selectionEnd=this.selectionStart,this.hiddenTextarea&&(this.hiddenTextarea.blur&&this.hiddenTextarea.blur(),this.canvas&&this.hiddenTextarea.parentNode.removeChild(this.hiddenTextarea),this.hiddenTextarea=null),this.abortCursorAnimation(),this._restoreEditingProps(),this._currentCursorOpacity=0,this._shouldClearDimensionCache()&&(this.initDimensions(),this.setCoords()),this.fire("editing:exited"),t&&this.fire("modified"),this.canvas&&(this.canvas.off("mouse:move",this.mouseMoveHandler),this.canvas.fire("text:editing:exited",{target:this}),t&&this.canvas.fire("object:modified",{target:this})),this},_removeExtraneousStyles:function(){for(var t in this.styles)this._textLines[t]||delete this.styles[t]},removeStyleFromTo:function(t,e){var i,r,n=this.get2DCursorLocation(t,!0),s=this.get2DCursorLocation(e,!0),o=n.lineIndex,a=n.charIndex,h=s.lineIndex,c=s.charIndex;if(o!==h){if(this.styles[o])for(i=a;i<this._unwrappedTextLines[o].length;i++)delete this.styles[o][i];if(this.styles[h])for(i=c;i<this._unwrappedTextLines[h].length;i++)(r=this.styles[h][i])&&(this.styles[o]||(this.styles[o]={}),this.styles[o][a+i-c]=r);for(i=o+1;i<=h;i++)delete this.styles[i];this.shiftLineStyles(h,o-h)}else if(this.styles[o]){r=this.styles[o];var l,u,f=c-a;for(i=a;i<c;i++)delete r[i];for(u in this.styles[o])(l=parseInt(u,10))>=c&&(r[l-f]=r[u],delete r[u])}},shiftLineStyles:function(e,i){var r=t(this.styles);for(var n in this.styles){var s=parseInt(n,10);s>e&&(this.styles[s+i]=r[s],r[s-i]||delete this.styles[s])}},restartCursorIfNeeded:function(){this._currentTickState&&!this._currentTickState.isAborted&&this._currentTickCompleteState&&!this._currentTickCompleteState.isAborted||this.initDelayedCursor()},insertNewlineStyleObject:function(e,i,r,n){var s,o={},a=!1;r||(r=1),this.shiftLineStyles(e,r),this.styles[e]&&(s=this.styles[e][0===i?i:i-1]);for(var h in this.styles[e]){var c=parseInt(h,10);c>=i&&(a=!0,o[c-i]=this.styles[e][h],delete this.styles[e][h])}for(a?this.styles[e+r]=o:delete this.styles[e+r];r>1;)r--,n&&n[r]?this.styles[e+r]={0:t(n[r])}:s?this.styles[e+r]={0:t(s)}:delete this.styles[e+r];this._forceClearCache=!0},insertCharStyleObject:function(e,i,r,n){this.styles||(this.styles={});var s=this.styles[e],o=s?t(s):{};r||(r=1);for(var a in o){var h=parseInt(a,10);h>=i&&(s[h+r]=o[h],o[h-r]||delete s[h])}if(this._forceClearCache=!0,n)for(;r--;)Object.keys(n[r]).length&&(this.styles[e]||(this.styles[e]={}),this.styles[e][i+r]=t(n[r]));else if(s)for(var c=s[i?i-1:1];c&&r--;)this.styles[e][i+r]=t(c)},insertNewStyleBlock:function(t,e,i){for(var r=this.get2DCursorLocation(e,!0),n=[0],s=0,o=0;o<t.length;o++)"\n"===t[o]?n[++s]=0:n[s]++;n[0]>0&&(this.insertCharStyleObject(r.lineIndex,r.charIndex,n[0],i),i=i&&i.slice(n[0]+1)),s&&this.insertNewlineStyleObject(r.lineIndex,r.charIndex+n[0],s);for(o=1;o<s;o++)n[o]>0?this.insertCharStyleObject(r.lineIndex+o,0,n[o],i):i&&(this.styles[r.lineIndex+o][0]=i[0]),i=i&&i.slice(n[o]+1);n[o]>0&&this.insertCharStyleObject(r.lineIndex+o,0,n[o],i)},setSelectionStartEndWithShift:function(t,e,i){i<=t?(e===t?this._selectionDirection="left":"right"===this._selectionDirection&&(this._selectionDirection="left",this.selectionEnd=t),this.selectionStart=i):i>t&&i<e?"right"===this._selectionDirection?this.selectionEnd=i:this.selectionStart=i:(e===t?this._selectionDirection="right":"left"===this._selectionDirection&&(this._selectionDirection="right",this.selectionStart=e),this.selectionEnd=i)},setSelectionInBoundaries:function(){var t=this.text.length;this.selectionStart>t?this.selectionStart=t:this.selectionStart<0&&(this.selectionStart=0),this.selectionEnd>t?this.selectionEnd=t:this.selectionEnd<0&&(this.selectionEnd=0)}})}(),fabric.util.object.extend(fabric.IText.prototype,{initDoubleClickSimulation:function(){this.__lastClickTime=+new Date,this.__lastLastClickTime=+new Date,this.__lastPointer={},this.on("mousedown",this.onMouseDown.bind(this))},onMouseDown:function(t){if(this.canvas){this.__newClickTime=+new Date;var e=this.canvas.getPointer(t.e);this.isTripleClick(e)&&(this.fire("tripleclick",t),this._stopEvent(t.e)),this.__lastLastClickTime=this.__lastClickTime,this.__lastClickTime=this.__newClickTime,this.__lastPointer=e,this.__lastIsEditing=this.isEditing,this.__lastSelected=this.selected}},isTripleClick:function(t){return this.__newClickTime-this.__lastClickTime<500&&this.__lastClickTime-this.__lastLastClickTime<500&&this.__lastPointer.x===t.x&&this.__lastPointer.y===t.y},_stopEvent:function(t){t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation()},initCursorSelectionHandlers:function(){this.initMousedownHandler(),this.initMouseupHandler(),this.initClicks()},initClicks:function(){this.on("mousedblclick",function(t){this.selectWord(this.getSelectionStartFromPointer(t.e))}),this.on("tripleclick",function(t){this.selectLine(this.getSelectionStartFromPointer(t.e))})},_mouseDownHandler:function(t){if(this.canvas&&this.editable&&(!t.e.button||1===t.e.button)){var e=this.canvas.getPointer(t.e);this.__mousedownX=e.x,this.__mousedownY=e.y,this.__isMousedown=!0,this.selected&&this.setCursorByClick(t.e),this.isEditing&&(this.__selectionStartOnMouseDown=this.selectionStart,this.selectionStart===this.selectionEnd&&this.abortCursorAnimation(),this.renderCursorOrSelection())}},initMousedownHandler:function(){this.on("mousedown",this._mouseDownHandler)},_isObjectMoved:function(t){var e=this.canvas.getPointer(t);return this.__mousedownX!==e.x||this.__mousedownY!==e.y},initMouseupHandler:function(){this.on("mouseup",this.mouseUpHandler)},mouseUpHandler:function(t){this.__isMousedown=!1,!this.editable||this._isObjectMoved(t.e)||t.e.button&&1!==t.e.button||(this.__lastSelected&&!this.__corner&&(this.enterEditing(t.e),this.selectionStart===this.selectionEnd?this.initDelayedCursor(!0):this.renderCursorOrSelection()),this.selected=!0)},setCursorByClick:function(t){var e=this.getSelectionStartFromPointer(t),i=this.selectionStart,r=this.selectionEnd;t.shiftKey?this.setSelectionStartEndWithShift(i,r,e):(this.selectionStart=e,this.selectionEnd=e),this.isEditing&&(this._fireSelectionChanged(),this._updateTextarea())},getSelectionStartFromPointer:function(t){for(var e,i=this.getLocalPointer(t),r=0,n=0,s=0,o=0,a=0,h=0,c=this._textLines.length;h<c&&s<=i.y;h++)s+=this.getHeightOfLine(h)*this.scaleY,a=h,h>0&&(o+=this._textLines[h-1].length+1);n=this._getLineLeftOffset(a)*this.scaleX;for(var l=0,u=(e=this._textLines[a]).length;l<u&&(r=n,(n+=this.__charBounds[a][l].kernedWidth*this.scaleX)<=i.x);l++)o++;return this._getNewSelectionStartFromOffset(i,r,n,o,u)},_getNewSelectionStartFromOffset:function(t,e,i,r,n){var s=t.x-e,o=i-t.x,a=r+(o>s||o<0?0:1);return this.flipX&&(a=n-a),a>this._text.length&&(a=this._text.length),a}}),fabric.util.object.extend(fabric.IText.prototype,{initHiddenTextarea:function(){this.hiddenTextarea=fabric.document.createElement("textarea"),this.hiddenTextarea.setAttribute("autocapitalize","off"),this.hiddenTextarea.setAttribute("autocorrect","off"),this.hiddenTextarea.setAttribute("autocomplete","off"),this.hiddenTextarea.setAttribute("spellcheck","false"),this.hiddenTextarea.setAttribute("data-fabric-hiddentextarea",""),this.hiddenTextarea.setAttribute("wrap","off");var t=this._calcTextareaPosition();this.hiddenTextarea.style.cssText="position: absolute; top: "+t.top+"; left: "+t.left+"; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px; line-height: 1px; paddingｰtop: "+t.fontSize+";",fabric.document.body.appendChild(this.hiddenTextarea),fabric.util.addListener(this.hiddenTextarea,"keydown",this.onKeyDown.bind(this)),fabric.util.addListener(this.hiddenTextarea,"keyup",this.onKeyUp.bind(this)),fabric.util.addListener(this.hiddenTextarea,"input",this.onInput.bind(this)),fabric.util.addListener(this.hiddenTextarea,"copy",this.copy.bind(this)),fabric.util.addListener(this.hiddenTextarea,"cut",this.copy.bind(this)),fabric.util.addListener(this.hiddenTextarea,"paste",this.paste.bind(this)),fabric.util.addListener(this.hiddenTextarea,"compositionstart",this.onCompositionStart.bind(this)),fabric.util.addListener(this.hiddenTextarea,"compositionupdate",this.onCompositionUpdate.bind(this)),fabric.util.addListener(this.hiddenTextarea,"compositionend",this.onCompositionEnd.bind(this)),!this._clickHandlerInitialized&&this.canvas&&(fabric.util.addListener(this.canvas.upperCanvasEl,"click",this.onClick.bind(this)),this._clickHandlerInitialized=!0)},keysMap:{9:"exitEditing",27:"exitEditing",33:"moveCursorUp",34:"moveCursorDown",35:"moveCursorRight",36:"moveCursorLeft",37:"moveCursorLeft",38:"moveCursorUp",39:"moveCursorRight",40:"moveCursorDown"},ctrlKeysMapUp:{67:"copy",88:"cut"},ctrlKeysMapDown:{65:"selectAll"},onClick:function(){this.hiddenTextarea&&this.hiddenTextarea.focus()},onKeyDown:function(t){if(this.isEditing&&!this.inCompositionMode){if(t.keyCode in this.keysMap)this[this.keysMap[t.keyCode]](t);else{if(!(t.keyCode in this.ctrlKeysMapDown&&(t.ctrlKey||t.metaKey)))return;this[this.ctrlKeysMapDown[t.keyCode]](t)}t.stopImmediatePropagation(),t.preventDefault(),t.keyCode>=33&&t.keyCode<=40?(this.clearContextTop(),this.renderCursorOrSelection()):this.canvas&&this.canvas.requestRenderAll()}},onKeyUp:function(t){!this.isEditing||this._copyDone||this.inCompositionMode?this._copyDone=!1:t.keyCode in this.ctrlKeysMapUp&&(t.ctrlKey||t.metaKey)&&(this[this.ctrlKeysMapUp[t.keyCode]](t),t.stopImmediatePropagation(),t.preventDefault(),this.canvas&&this.canvas.requestRenderAll())},onInput:function(t){var e=this.fromPaste;if(this.fromPaste=!1,t&&t.stopPropagation(),this.isEditing){var i,r,n=this._splitTextIntoLines(this.hiddenTextarea.value).graphemeText,s=this._text.length,o=n.length,a=o-s;if(""===this.hiddenTextarea.value)return this.styles={},this.updateFromTextArea(),this.fire("changed"),void(this.canvas&&(this.canvas.fire("text:changed",{target:this}),this.canvas.requestRenderAll()));var h=this.fromStringToGraphemeSelection(this.hiddenTextarea.selectionStart,this.hiddenTextarea.selectionEnd,this.hiddenTextarea.value),c=this.selectionStart>h.selectionStart;this.selectionStart!==this.selectionEnd?(i=this._text.slice(this.selectionStart,this.selectionEnd),a+=this.selectionEnd-this.selectionStart):o<s&&(i=c?this._text.slice(this.selectionEnd+a,this.selectionEnd):this._text.slice(this.selectionStart,this.selectionStart-a)),r=n.slice(h.selectionEnd-a,h.selectionEnd),i&&i.length&&(this.selectionStart!==this.selectionEnd?this.removeStyleFromTo(this.selectionStart,this.selectionEnd):c?this.removeStyleFromTo(this.selectionEnd-i.length,this.selectionEnd):this.removeStyleFromTo(this.selectionEnd,this.selectionEnd+i.length)),r.length&&(e&&r.join("")===fabric.copiedText?this.insertNewStyleBlock(r,this.selectionStart,fabric.copiedTextStyle):this.insertNewStyleBlock(r,this.selectionStart)),this.updateFromTextArea(),this.fire("changed"),this.canvas&&(this.canvas.fire("text:changed",{target:this}),this.canvas.requestRenderAll())}},onCompositionStart:function(){this.inCompositionMode=!0},onCompositionEnd:function(){this.inCompositionMode=!1},onCompositionUpdate:function(t){this.compositionStart=t.target.selectionStart,this.compositionEnd=t.target.selectionEnd,this.updateTextareaPosition()},copy:function(){this.selectionStart!==this.selectionEnd&&(fabric.copiedText=this.getSelectedText(),fabric.copiedTextStyle=this.getSelectionStyles(this.selectionStart,this.selectionEnd,!0),this._copyDone=!0)},paste:function(){this.fromPaste=!0},_getClipboardData:function(t){return t&&t.clipboardData||fabric.window.clipboardData},_getWidthBeforeCursor:function(t,e){var i,r=this._getLineLeftOffset(t);return e>0&&(r+=(i=this.__charBounds[t][e-1]).left+i.width),r},getDownCursorOffset:function(t,e){var i=this._getSelectionForOffset(t,e),r=this.get2DCursorLocation(i),n=r.lineIndex;if(n===this._textLines.length-1||t.metaKey||34===t.keyCode)return this._text.length-i;var s=r.charIndex,o=this._getWidthBeforeCursor(n,s),a=this._getIndexOnLine(n+1,o);return this._textLines[n].slice(s).length+a+2},_getSelectionForOffset:function(t,e){return t.shiftKey&&this.selectionStart!==this.selectionEnd&&e?this.selectionEnd:this.selectionStart},getUpCursorOffset:function(t,e){var i=this._getSelectionForOffset(t,e),r=this.get2DCursorLocation(i),n=r.lineIndex;if(0===n||t.metaKey||33===t.keyCode)return-i;var s=r.charIndex,o=this._getWidthBeforeCursor(n,s),a=this._getIndexOnLine(n-1,o),h=this._textLines[n].slice(0,s);return-this._textLines[n-1].length+a-h.length},_getIndexOnLine:function(t,e){for(var i,r,n=this._textLines[t],s=this._getLineLeftOffset(t),o=0,a=0,h=n.length;a<h;a++)if(i=this.__charBounds[t][a].width,(s+=i)>e){r=!0;var c=s-i,l=s,u=Math.abs(c-e);o=Math.abs(l-e)<u?a:a-1;break}return r||(o=n.length-1),o},moveCursorDown:function(t){this.selectionStart>=this._text.length&&this.selectionEnd>=this._text.length||this._moveCursorUpOrDown("Down",t)},moveCursorUp:function(t){0===this.selectionStart&&0===this.selectionEnd||this._moveCursorUpOrDown("Up",t)},_moveCursorUpOrDown:function(t,e){var i=this["get"+t+"CursorOffset"](e,"right"===this._selectionDirection);e.shiftKey?this.moveCursorWithShift(i):this.moveCursorWithoutShift(i),0!==i&&(this.setSelectionInBoundaries(),this.abortCursorAnimation(),this._currentCursorOpacity=1,this.initDelayedCursor(),this._fireSelectionChanged(),this._updateTextarea())},moveCursorWithShift:function(t){var e="left"===this._selectionDirection?this.selectionStart+t:this.selectionEnd+t;return this.setSelectionStartEndWithShift(this.selectionStart,this.selectionEnd,e),0!==t},moveCursorWithoutShift:function(t){return t<0?(this.selectionStart+=t,this.selectionEnd=this.selectionStart):(this.selectionEnd+=t,this.selectionStart=this.selectionEnd),0!==t},moveCursorLeft:function(t){0===this.selectionStart&&0===this.selectionEnd||this._moveCursorLeftOrRight("Left",t)},_move:function(t,e,i){var r;if(t.altKey)r=this["findWordBoundary"+i](this[e]);else{if(!t.metaKey&&35!==t.keyCode&&36!==t.keyCode)return this[e]+="Left"===i?-1:1,!0;r=this["findLineBoundary"+i](this[e])}if(void 0!==typeof r&&this[e]!==r)return this[e]=r,!0},_moveLeft:function(t,e){return this._move(t,e,"Left")},_moveRight:function(t,e){return this._move(t,e,"Right")},moveCursorLeftWithoutShift:function(t){var e=!0;return this._selectionDirection="left",this.selectionEnd===this.selectionStart&&0!==this.selectionStart&&(e=this._moveLeft(t,"selectionStart")),this.selectionEnd=this.selectionStart,e},moveCursorLeftWithShift:function(t){return"right"===this._selectionDirection&&this.selectionStart!==this.selectionEnd?this._moveLeft(t,"selectionEnd"):0!==this.selectionStart?(this._selectionDirection="left",this._moveLeft(t,"selectionStart")):void 0},moveCursorRight:function(t){this.selectionStart>=this._text.length&&this.selectionEnd>=this._text.length||this._moveCursorLeftOrRight("Right",t)},_moveCursorLeftOrRight:function(t,e){var i="moveCursor"+t+"With";this._currentCursorOpacity=1,e.shiftKey?i+="Shift":i+="outShift",this[i](e)&&(this.abortCursorAnimation(),this.initDelayedCursor(),this._fireSelectionChanged(),this._updateTextarea())},moveCursorRightWithShift:function(t){return"left"===this._selectionDirection&&this.selectionStart!==this.selectionEnd?this._moveRight(t,"selectionStart"):this.selectionEnd!==this._text.length?(this._selectionDirection="right",this._moveRight(t,"selectionEnd")):void 0},moveCursorRightWithoutShift:function(t){var e=!0;return this._selectionDirection="right",this.selectionStart===this.selectionEnd?(e=this._moveRight(t,"selectionStart"),this.selectionEnd=this.selectionStart):this.selectionStart=this.selectionEnd,e},removeChars:function(t,e){void 0===e&&(e=t+1),this.removeStyleFromTo(t,e),this._text.splice(t,e-t),this.text=this._text.join(""),this.set("dirty",!0),this._shouldClearDimensionCache()&&(this.initDimensions(),this.setCoords()),this._removeExtraneousStyles()},insertChars:function(t,e,i,r){void 0===r&&(r=i),r>i&&this.removeStyleFromTo(i,r);var n=fabric.util.string.graphemeSplit(t);this.insertNewStyleBlock(n,i,e),this._text=[].concat(this._text.slice(0,i),n,this._text.slice(r)),this.text=this._text.join(""),this.set("dirty",!0),this._shouldClearDimensionCache()&&(this.initDimensions(),this.setCoords()),this._removeExtraneousStyles()}}),function(){var t=fabric.util.toFixed;fabric.util.object.extend(fabric.Text.prototype,{toSVG:function(t){var e=this._createBaseSVGMarkup(),i=this._getSVGLeftTopOffsets(),r=this._getSVGTextAndBg(i.textTop,i.textLeft);return this._wrapSVGTextAndBg(e,r),t?t(e.join("")):e.join("")},_getSVGLeftTopOffsets:function(){return{textLeft:-this.width/2,textTop:-this.height/2,lineTop:this.getHeightOfLine(0)}},_wrapSVGTextAndBg:function(t,e){var i=this.getSvgFilter(),r=""===i?"":' style="'+i+'"',n=this.getSvgTextDecoration(this);t.push("\t<g ",this.getSvgId(),'transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'"',r,">\n",e.textBgRects.join(""),'\t\t<text xml:space="preserve" ',this.fontFamily?'font-family="'+this.fontFamily.replace(/"/g,"'")+'" ':"",this.fontSize?'font-size="'+this.fontSize+'" ':"",this.fontStyle?'font-style="'+this.fontStyle+'" ':"",this.fontWeight?'font-weight="'+this.fontWeight+'" ':"",n?'text-decoration="'+n+'" ':"",'style="',this.getSvgStyles(!0),'"',this.addPaintOrder()," >",e.textSpans.join(""),"</text>\n","\t</g>\n")},_getSVGTextAndBg:function(t,e){var i,r=[],n=[],s=t;this._setSVGBg(n);for(var o=0,a=this._textLines.length;o<a;o++)i=this._getLineLeftOffset(o),(this.textBackgroundColor||this.styleHas("textBackgroundColor",o))&&this._setSVGTextLineBg(n,o,e+i,s),this._setSVGTextLineText(r,o,e+i,s),s+=this.getHeightOfLine(o);return{textSpans:r,textBgRects:n}},_createTextCharSpan:function(e,i,r,n){var s=this.getSvgSpanStyles(i,e!==e.trim()),o=s?'style="'+s+'"':"",a=i.deltaY,h="",c=fabric.Object.NUM_FRACTION_DIGITS;return a&&(h=' dy="'+t(a,c)+'" '),['<tspan x="',t(r,c),'" y="',t(n,c),'" ',h,o,">",fabric.util.string.escapeXml(e),"</tspan>"].join("")},_setSVGTextLineText:function(t,e,i,r){var n,s,o,a,h,c=this.getHeightOfLine(e),l=-1!==this.textAlign.indexOf("justify"),u="",f=0,d=this._textLines[e];r+=c*(1-this._fontSizeFraction)/this.lineHeight;for(var g=0,p=d.length-1;g<=p;g++)h=g===p||this.charSpacing,u+=d[g],o=this.__charBounds[e][g],0===f?(i+=o.kernedWidth-o.width,f+=o.width):f+=o.kernedWidth,l&&!h&&this._reSpaceAndTab.test(d[g])&&(h=!0),h||(n=n||this.getCompleteStyleDeclaration(e,g),s=this.getCompleteStyleDeclaration(e,g+1),h=this._hasStyleChangedForSvg(n,s)),h&&(a=this._getStyleDeclaration(e,g)||{},t.push(this._createTextCharSpan(u,a,i,r)),u="",n=s,i+=f,f=0)},_pushTextBgRect:function(e,i,r,n,s,o){var a=fabric.Object.NUM_FRACTION_DIGITS;e.push("\t\t<rect ",this._getFillAttributes(i),' x="',t(r,a),'" y="',t(n,a),'" width="',t(s,a),'" height="',t(o,a),'"></rect>\n')},_setSVGTextLineBg:function(t,e,i,r){for(var n,s,o=this._textLines[e],a=this.getHeightOfLine(e)/this.lineHeight,h=0,c=0,l=this.getValueOfPropertyAt(e,0,"textBackgroundColor"),u=0,f=o.length;u<f;u++)n=this.__charBounds[e][u],(s=this.getValueOfPropertyAt(e,u,"textBackgroundColor"))!==l?(l&&this._pushTextBgRect(t,l,i+c,r,h,a),c=n.left,h=n.width,l=s):h+=n.kernedWidth;s&&this._pushTextBgRect(t,s,i+c,r,h,a)},_getFillAttributes:function(t){var e=t&&"string"==typeof t?new fabric.Color(t):"";return e&&e.getSource()&&1!==e.getAlpha()?'opacity="'+e.getAlpha()+'" fill="'+e.setAlpha(1).toRgb()+'"':'fill="'+t+'"'},_getSVGLineTopOffset:function(t){for(var e=0,i=0,r=0;r<t;r++)e+=this.getHeightOfLine(r);return i=this.getHeightOfLine(r),{lineTop:e,offset:(this._fontSizeMult-this._fontSizeFraction)*i/(this.lineHeight*this._fontSizeMult)}},getSvgStyles:function(t){return fabric.Object.prototype.getSvgStyles.call(this,t)+" white-space: pre;"}})}(),function(t){"use strict";var e=t.fabric||(t.fabric={});e.Textbox=e.util.createClass(e.IText,e.Observable,{type:"textbox",minWidth:20,dynamicMinWidth:2,__cachedLines:null,lockScalingFlip:!0,noScaleCache:!1,_dimensionAffectingProps:e.Text.prototype._dimensionAffectingProps.concat("width"),initDimensions:function(){this.__skipDimension||(this.isEditing&&this.initDelayedCursor(),this.clearContextTop(),this._clearCache(),this.dynamicMinWidth=0,this._styleMap=this._generateStyleMap(this._splitText()),this.dynamicMinWidth>this.width&&this._set("width",this.dynamicMinWidth),-1!==this.textAlign.indexOf("justify")&&this.enlargeSpaces(),this.height=this.calcTextHeight(),this.saveState({propertySet:"_dimensionAffectingProps"}))},_generateStyleMap:function(t){for(var e=0,i=0,r=0,n={},s=0;s<t.graphemeLines.length;s++)"\n"===t.graphemeText[r]&&s>0?(i=0,r++,e++):this._reSpaceAndTab.test(t.graphemeText[r])&&s>0&&(i++,r++),n[s]={line:e,offset:i},r+=t.graphemeLines[s].length,i+=t.graphemeLines[s].length;return n},styleHas:function(t,i){if(this._styleMap&&!this.isWrapping){var r=this._styleMap[i];r&&(i=r.line)}return e.Text.prototype.styleHas.call(this,t,i)},isEmptyStyles:function(t){var e,i,r=0,n=!1,s=this._styleMap[t],o=this._styleMap[t+1];s&&(t=s.line,r=s.offset),o&&(n=o.line===t,e=o.offset),i=void 0===t?this.styles:{line:this.styles[t]};for(var a in i)for(var h in i[a])if(h>=r&&(!n||h<e))for(var c in i[a][h])return!1;return!0},_getStyleDeclaration:function(t,e){if(this._styleMap&&!this.isWrapping){var i=this._styleMap[t];if(!i)return null;t=i.line,e=i.offset+e}return this.callSuper("_getStyleDeclaration",t,e)},_setStyleDeclaration:function(t,e,i){var r=this._styleMap[t];t=r.line,e=r.offset+e,this.styles[t][e]=i},_deleteStyleDeclaration:function(t,e){var i=this._styleMap[t];t=i.line,e=i.offset+e,delete this.styles[t][e]},_getLineStyle:function(t){var e=this._styleMap[t];return this.styles[e.line]},_setLineStyle:function(t,e){var i=this._styleMap[t];this.styles[i.line]=e},_deleteLineStyle:function(t){var e=this._styleMap[t];delete this.styles[e.line]},_wrapText:function(t,e){var i,r=[];for(this.isWrapping=!0,i=0;i<t.length;i++)r=r.concat(this._wrapLine(t[i],i,e));return this.isWrapping=!1,r},_measureWord:function(t,e,i){var r,n=0;i=i||0;for(var s=0,o=t.length;s<o;s++){n+=this._getGraphemeBox(t[s],e,s+i,r,!0).kernedWidth,r=t[s]}return n},_wrapLine:function(t,i,r){for(var n=0,s=[],o=[],a=t.split(this._reSpaceAndTab),h="",c=0,l=0,u=0,f=0,d=!0,g=this._getWidthOfCharSpacing(),p=0;p<a.length;p++)h=e.util.string.graphemeSplit(a[p]),l=this._measureWord(h,i,c),c+=h.length,(n+=u+l-g)>=r&&!d&&(s.push(o),o=[],n=l,d=!0),d||o.push(" "),o=o.concat(h),u=this._measureWord([" "],i,c),c++,d=!1,l>f&&(f=l);return p&&s.push(o),f>this.dynamicMinWidth&&(this.dynamicMinWidth=f-g),s},isEndOfWrapping:function(t){return!this._styleMap[t+1]||this._styleMap[t+1].line!==this._styleMap[t].line},_splitTextIntoLines:function(t){for(var i=e.Text.prototype._splitTextIntoLines.call(this,t),r=this._wrapText(i.lines,this.width),n=new Array(r.length),s=0;s<r.length;s++)n[s]=r[s].join("");return i.lines=n,i.graphemeLines=r,i},getMinWidth:function(){return Math.max(this.minWidth,this.dynamicMinWidth)},toObject:function(t){return this.callSuper("toObject",["minWidth"].concat(t))}}),e.Textbox.fromObject=function(t,i){return e.Object._fromObject("Textbox",t,i,"text")}}("undefined"!=typeof exports?exports:this),function(){var t=fabric.Canvas.prototype._setObjectScale;fabric.Canvas.prototype._setObjectScale=function(e,i,r,n,s,o,a){var h=i.target;if(!("x"===s&&h instanceof fabric.Textbox))return t.call(fabric.Canvas.prototype,e,i,r,n,s,o,a);var c=h._getTransformedDimensions().x,l=h.width*(e.x/c);return l>=h.getMinWidth()?(h.set("width",l),!0):void 0},fabric.util.object.extend(fabric.Textbox.prototype,{_removeExtraneousStyles:function(){for(var t in this._styleMap)this._textLines[t]||delete this.styles[this._styleMap[t].line]}})}(),"function"==typeof define&&define.amd&&define([],function(){return fabric});
//
//
//
//
//    // Including the Login Button into your page is easy. Visit the documentation for the login button and set the button up the way you want. Then click Get Code and it will show you the code you need to display the button on your page.
//    // The onlogin attribute on the button to set up a JavaScript callback that checks the login status to see if the person logged in successfully:
//
//
//    FB.getLoginStatus(function(response) {
//        statusChangeCallback(response);
//    });
//
//    {
//        status: 'connected',
//        authResponse: {
//            accessToken: '...',
//            expiresIn:'...',
//            signedRequest:'...',
//            userID:'...'
//        }
//    }
//
// // This is the callback. It calls FB.getLoginStatus() to get the most recent login state. (statusChangeCallback() is a function that's part of the example that processes the response.)
//
// function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });
// }
;
!function(o){"use strict";o('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=o(this.hash);if((t=t.length?t:o("[name="+this.hash.slice(1)+"]")).length)return o("html, body").animate({scrollTop:t.offset().top-70},1e3,"easeInOutExpo"),!1}}),o(document).scroll(function(){o(this).scrollTop()>100?o(".scroll-to-top").fadeIn():o(".scroll-to-top").fadeOut()}),o(".js-scroll-trigger").click(function(){o(".navbar-collapse").collapse("hide")}),o("body").scrollspy({target:"#mainNav",offset:80});var t=function(){o("#mainNav").offset().top>100?o("#mainNav").addClass("navbar-shrink"):o("#mainNav").removeClass("navbar-shrink")};t(),o(window).scroll(t),o(".portfolio-item").magnificPopup({type:"inline",preloader:!1,focus:"#username",modal:!0}),o(document).on("click",".portfolio-modal-dismiss",function(t){t.preventDefault(),o.magnificPopup.close()}),o(function(){o("body").on("input propertychange",".floating-label-form-group",function(t){o(this).toggleClass("floating-label-form-group-with-value",!!o(t.target).val())}).on("focus",".floating-label-form-group",function(){o(this).addClass("floating-label-form-group-with-focus")}).on("blur",".floating-label-form-group",function(){o(this).removeClass("floating-label-form-group-with-focus")})})}(jQuery);
!function(a){function e(a){return new RegExp("^"+a+"$")}function t(a,e){for(var t=Array.prototype.slice.call(arguments).splice(2),i=a.split("."),n=i.pop(),o=0;o<i.length;o++)e=e[i[o]];return e[n].apply(this,t)}var i=[],n={options:{prependExistingHelpBlock:!1,sniffHtml:!0,preventSubmit:!0,submitError:!1,submitSuccess:!1,semanticallyStrict:!1,autoAdd:{helpBlocks:!0},filter:function(){return!0}},methods:{init:function(e){var t=a.extend(!0,{},n);t.options=a.extend(!0,t.options,e);var l=this,s=a.unique(l.map(function(){return a(this).parents("form")[0]}).toArray());return a(s).bind("submit",function(e){var i=a(this),n=0,o=i.find("input,textarea,select").not("[type=submit],[type=image]").filter(t.options.filter);o.trigger("submit.validation").trigger("validationLostFocus.validation"),o.each(function(e,t){var i=a(t).parents(".control-group").first();i.hasClass("warning")&&(i.removeClass("warning").addClass("error"),n++)}),o.trigger("validationLostFocus.validation"),n?(t.options.preventSubmit&&e.preventDefault(),i.addClass("error"),a.isFunction(t.options.submitError)&&t.options.submitError(i,e,o.jqBootstrapValidation("collectErrors",!0))):(i.removeClass("error"),a.isFunction(t.options.submitSuccess)&&t.options.submitSuccess(i,e))}),this.each(function(){var e=a(this),n=e.parents(".control-group").first(),l=n.find(".help-block").first(),s=e.parents("form").first(),d=[];if(!l.length&&t.options.autoAdd&&t.options.autoAdd.helpBlocks&&(l=a('<div class="help-block" />'),n.find(".controls").append(l),i.push(l[0])),t.options.sniffHtml){var c="";if(void 0!==e.attr("pattern")&&(c="Not in the expected format\x3c!-- data-validation-pattern-message to override --\x3e",e.data("validationPatternMessage")&&(c=e.data("validationPatternMessage")),e.data("validationPatternMessage",c),e.data("validationPatternRegex",e.attr("pattern"))),void 0!==e.attr("max")||void 0!==e.attr("aria-valuemax")){var v=void 0!==e.attr("max")?e.attr("max"):e.attr("aria-valuemax");c="Too high: Maximum of '"+v+"'\x3c!-- data-validation-max-message to override --\x3e",e.data("validationMaxMessage")&&(c=e.data("validationMaxMessage")),e.data("validationMaxMessage",c),e.data("validationMaxMax",v)}if(void 0!==e.attr("min")||void 0!==e.attr("aria-valuemin")){var u=void 0!==e.attr("min")?e.attr("min"):e.attr("aria-valuemin");c="Too low: Minimum of '"+u+"'\x3c!-- data-validation-min-message to override --\x3e",e.data("validationMinMessage")&&(c=e.data("validationMinMessage")),e.data("validationMinMessage",c),e.data("validationMinMin",u)}void 0!==e.attr("maxlength")&&(c="Too long: Maximum of '"+e.attr("maxlength")+"' characters\x3c!-- data-validation-maxlength-message to override --\x3e",e.data("validationMaxlengthMessage")&&(c=e.data("validationMaxlengthMessage")),e.data("validationMaxlengthMessage",c),e.data("validationMaxlengthMaxlength",e.attr("maxlength"))),void 0!==e.attr("minlength")&&(c="Too short: Minimum of '"+e.attr("minlength")+"' characters\x3c!-- data-validation-minlength-message to override --\x3e",e.data("validationMinlengthMessage")&&(c=e.data("validationMinlengthMessage")),e.data("validationMinlengthMessage",c),e.data("validationMinlengthMinlength",e.attr("minlength"))),void 0===e.attr("required")&&void 0===e.attr("aria-required")||(c=t.builtInValidators.required.message,e.data("validationRequiredMessage")&&(c=e.data("validationRequiredMessage")),e.data("validationRequiredMessage",c)),void 0!==e.attr("type")&&"number"===e.attr("type").toLowerCase()&&(c=t.builtInValidators.number.message,e.data("validationNumberMessage")&&(c=e.data("validationNumberMessage")),e.data("validationNumberMessage",c)),void 0!==e.attr("type")&&"email"===e.attr("type").toLowerCase()&&(c="Not a valid email address\x3c!-- data-validator-validemail-message to override --\x3e",e.data("validationValidemailMessage")?c=e.data("validationValidemailMessage"):e.data("validationEmailMessage")&&(c=e.data("validationEmailMessage")),e.data("validationValidemailMessage",c)),void 0!==e.attr("minchecked")&&(c="Not enough options checked; Minimum of '"+e.attr("minchecked")+"' required\x3c!-- data-validation-minchecked-message to override --\x3e",e.data("validationMincheckedMessage")&&(c=e.data("validationMincheckedMessage")),e.data("validationMincheckedMessage",c),e.data("validationMincheckedMinchecked",e.attr("minchecked"))),void 0!==e.attr("maxchecked")&&(c="Too many options checked; Maximum of '"+e.attr("maxchecked")+"' required\x3c!-- data-validation-maxchecked-message to override --\x3e",e.data("validationMaxcheckedMessage")&&(c=e.data("validationMaxcheckedMessage")),e.data("validationMaxcheckedMessage",c),e.data("validationMaxcheckedMaxchecked",e.attr("maxchecked")))}void 0!==e.data("validation")&&(d=e.data("validation").split(",")),a.each(e.data(),function(a,e){var t=a.replace(/([A-Z])/g,",$1").split(",");"validation"===t[0]&&t[1]&&d.push(t[1])});var m=d,g=[];do{a.each(d,function(a,e){d[a]=o(e)}),d=a.unique(d),g=[],a.each(m,function(i,n){if(void 0!==e.data("validation"+n+"Shortcut"))a.each(e.data("validation"+n+"Shortcut").split(","),function(a,e){g.push(e)});else if(t.builtInValidators[n.toLowerCase()]){var r=t.builtInValidators[n.toLowerCase()];"shortcut"===r.type.toLowerCase()&&a.each(r.shortcut.split(","),function(a,e){e=o(e),g.push(e),d.push(e)})}}),m=g}while(m.length>0);var h={};a.each(d,function(i,n){var r=e.data("validation"+n+"Message"),l=void 0!==r,s=!1;if(r=r||"'"+n+"' validation failed \x3c!-- Add attribute 'data-validation-"+n.toLowerCase()+"-message' to input to change this message --\x3e",a.each(t.validatorTypes,function(t,i){void 0===h[t]&&(h[t]=[]),s||void 0===e.data("validation"+n+o(i.name))||(h[t].push(a.extend(!0,{name:o(i.name),message:r},i.init(e,n))),s=!0)}),!s&&t.builtInValidators[n.toLowerCase()]){var d=a.extend(!0,{},t.builtInValidators[n.toLowerCase()]);l&&(d.message=r);var c=d.type.toLowerCase();"shortcut"===c?s=!0:a.each(t.validatorTypes,function(t,i){void 0===h[t]&&(h[t]=[]),s||c!==t.toLowerCase()||(e.data("validation"+n+o(i.name),d[i.name.toLowerCase()]),h[c].push(a.extend(d,i.init(e,n))),s=!0)})}s||a.error("Cannot find validation info for '"+n+"'")}),l.data("original-contents",l.data("original-contents")?l.data("original-contents"):l.html()),l.data("original-role",l.data("original-role")?l.data("original-role"):l.attr("role")),n.data("original-classes",n.data("original-clases")?n.data("original-classes"):n.attr("class")),e.data("original-aria-invalid",e.data("original-aria-invalid")?e.data("original-aria-invalid"):e.attr("aria-invalid")),e.bind("validation.validation",function(i,n){var o=r(e),l=[];return a.each(h,function(i,r){(o||o.length||n&&n.includeEmpty||t.validatorTypes[i].blockSubmit&&n&&n.submitting)&&a.each(r,function(a,n){t.validatorTypes[i].validate(e,o,n)&&l.push(n.message)})}),l}),e.bind("getValidators.validation",function(){return h}),e.bind("submit.validation",function(){return e.triggerHandler("change.validation",{submitting:!0})}),e.bind(["keyup","focus","blur","click","keydown","keypress","change"].join(".validation ")+".validation",function(i,o){var d=r(e),c=[];n.find("input,textarea,select").each(function(t,i){var n=c.length;if(a.each(a(i).triggerHandler("validation.validation",o),function(a,e){c.push(e)}),c.length>n)a(i).attr("aria-invalid","true");else{var r=e.data("original-aria-invalid");a(i).attr("aria-invalid",void 0!==r&&r)}}),s.find("input,select,textarea").not(e).not('[name="'+e.attr("name")+'"]').trigger("validationLostFocus.validation"),(c=a.unique(c.sort())).length?(n.removeClass("success error").addClass("warning"),t.options.semanticallyStrict&&1===c.length?l.html(c[0]+(t.options.prependExistingHelpBlock?l.data("original-contents"):"")):l.html('<ul role="alert"><li>'+c.join("</li><li>")+"</li></ul>"+(t.options.prependExistingHelpBlock?l.data("original-contents"):""))):(n.removeClass("warning error success"),d.length>0&&n.addClass("success"),l.html(l.data("original-contents"))),"blur"===i.type&&n.removeClass("success")}),e.bind("validationLostFocus.validation",function(){n.removeClass("success")})})},destroy:function(){return this.each(function(){var e=a(this),t=e.parents(".control-group").first(),n=t.find(".help-block").first();e.unbind(".validation"),n.html(n.data("original-contents")),t.attr("class",t.data("original-classes")),e.attr("aria-invalid",e.data("original-aria-invalid")),n.attr("role",e.data("original-role")),i.indexOf(n[0])>-1&&n.remove()})},collectErrors:function(e){var t={};return this.each(function(e,i){var n=a(i),o=n.attr("name"),r=n.triggerHandler("validation.validation",{includeEmpty:!0});t[o]=a.extend(!0,r,t[o])}),a.each(t,function(a,e){0===e.length&&delete t[a]}),t},hasErrors:function(){var e=[];return this.each(function(t,i){e=e.concat(a(i).triggerHandler("getValidators.validation")?a(i).triggerHandler("validation.validation",{submitting:!0}):[])}),e.length>0},override:function(e){n=a.extend(!0,n,e)}},validatorTypes:{callback:{name:"callback",init:function(a,e){return{validatorName:e,callback:a.data("validation"+e+"Callback"),lastValue:a.val(),lastValid:!0,lastFinished:!0}},validate:function(a,e,i){if(i.lastValue===e&&i.lastFinished)return!i.lastValid;if(!0===i.lastFinished){i.lastValue=e,i.lastValid=!0,i.lastFinished=!1;var n=i,o=a;t(i.callback,window,a,e,function(a){n.lastValue===a.value&&(n.lastValid=a.valid,a.message&&(n.message=a.message),n.lastFinished=!0,o.data("validation"+n.validatorName+"Message",n.message),setTimeout(function(){o.trigger("change.validation")},1))})}return!1}},ajax:{name:"ajax",init:function(a,e){return{validatorName:e,url:a.data("validation"+e+"Ajax"),lastValue:a.val(),lastValid:!0,lastFinished:!0}},validate:function(e,t,i){return""+i.lastValue==""+t&&!0===i.lastFinished?!1===i.lastValid:(!0===i.lastFinished&&(i.lastValue=t,i.lastValid=!0,i.lastFinished=!1,a.ajax({url:i.url,data:"value="+t+"&field="+e.attr("name"),dataType:"json",success:function(a){""+i.lastValue==""+a.value&&(i.lastValid=!!a.valid,a.message&&(i.message=a.message),i.lastFinished=!0,e.data("validation"+i.validatorName+"Message",i.message),setTimeout(function(){e.trigger("change.validation")},1))},failure:function(){i.lastValid=!0,i.message="ajax call failed",i.lastFinished=!0,e.data("validation"+i.validatorName+"Message",i.message),setTimeout(function(){e.trigger("change.validation")},1)}})),!1)}},regex:{name:"regex",init:function(a,t){return{regex:e(a.data("validation"+t+"Regex"))}},validate:function(a,e,t){return!t.regex.test(e)&&!t.negative||t.regex.test(e)&&t.negative}},required:{name:"required",init:function(a,e){return{}},validate:function(a,e,t){return!(0!==e.length||t.negative)||!!(e.length>0&&t.negative)},blockSubmit:!0},match:{name:"match",init:function(a,e){var t=a.parents("form").first().find('[name="'+a.data("validation"+e+"Match")+'"]').first();return t.bind("validation.validation",function(){a.trigger("change.validation",{submitting:!0})}),{element:t}},validate:function(a,e,t){return e!==t.element.val()&&!t.negative||e===t.element.val()&&t.negative},blockSubmit:!0},max:{name:"max",init:function(a,e){return{max:a.data("validation"+e+"Max")}},validate:function(a,e,t){return parseFloat(e,10)>parseFloat(t.max,10)&&!t.negative||parseFloat(e,10)<=parseFloat(t.max,10)&&t.negative}},min:{name:"min",init:function(a,e){return{min:a.data("validation"+e+"Min")}},validate:function(a,e,t){return parseFloat(e)<parseFloat(t.min)&&!t.negative||parseFloat(e)>=parseFloat(t.min)&&t.negative}},maxlength:{name:"maxlength",init:function(a,e){return{maxlength:a.data("validation"+e+"Maxlength")}},validate:function(a,e,t){return e.length>t.maxlength&&!t.negative||e.length<=t.maxlength&&t.negative}},minlength:{name:"minlength",init:function(a,e){return{minlength:a.data("validation"+e+"Minlength")}},validate:function(a,e,t){return e.length<t.minlength&&!t.negative||e.length>=t.minlength&&t.negative}},maxchecked:{name:"maxchecked",init:function(a,e){var t=a.parents("form").first().find('[name="'+a.attr("name")+'"]');return t.bind("click.validation",function(){a.trigger("change.validation",{includeEmpty:!0})}),{maxchecked:a.data("validation"+e+"Maxchecked"),elements:t}},validate:function(a,e,t){return t.elements.filter(":checked").length>t.maxchecked&&!t.negative||t.elements.filter(":checked").length<=t.maxchecked&&t.negative},blockSubmit:!0},minchecked:{name:"minchecked",init:function(a,e){var t=a.parents("form").first().find('[name="'+a.attr("name")+'"]');return t.bind("click.validation",function(){a.trigger("change.validation",{includeEmpty:!0})}),{minchecked:a.data("validation"+e+"Minchecked"),elements:t}},validate:function(a,e,t){return t.elements.filter(":checked").length<t.minchecked&&!t.negative||t.elements.filter(":checked").length>=t.minchecked&&t.negative},blockSubmit:!0}},builtInValidators:{email:{name:"Email",type:"shortcut",shortcut:"validemail"},validemail:{name:"Validemail",type:"regex",regex:"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}",message:"Not a valid email address\x3c!-- data-validator-validemail-message to override --\x3e"},passwordagain:{name:"Passwordagain",type:"match",match:"password",message:"Does not match the given password\x3c!-- data-validator-paswordagain-message to override --\x3e"},positive:{name:"Positive",type:"shortcut",shortcut:"number,positivenumber"},negative:{name:"Negative",type:"shortcut",shortcut:"number,negativenumber"},number:{name:"Number",type:"regex",regex:"([+-]?\\d+(\\.\\d*)?([eE][+-]?[0-9]+)?)?",message:"Must be a number\x3c!-- data-validator-number-message to override --\x3e"},integer:{name:"Integer",type:"regex",regex:"[+-]?\\d+",message:"No decimal places allowed\x3c!-- data-validator-integer-message to override --\x3e"},positivenumber:{name:"Positivenumber",type:"min",min:0,message:"Must be a positive number\x3c!-- data-validator-positivenumber-message to override --\x3e"},negativenumber:{name:"Negativenumber",type:"max",max:0,message:"Must be a negative number\x3c!-- data-validator-negativenumber-message to override --\x3e"},required:{name:"Required",type:"required",message:"This is required\x3c!-- data-validator-required-message to override --\x3e"},checkone:{name:"Checkone",type:"minchecked",minchecked:1,message:"Check at least one option\x3c!-- data-validation-checkone-message to override --\x3e"}}},o=function(a){return a.toLowerCase().replace(/(^|\s)([a-z])/g,function(a,e,t){return e+t.toUpperCase()})},r=function(e){var t=e.val(),i=e.attr("type");return"checkbox"===i&&(t=e.is(":checked")?t:""),"radio"===i&&(t=a('input[name="'+e.attr("name")+'"]:checked').length>0?t:""),t};a.fn.jqBootstrapValidation=function(e){return n.methods[e]?n.methods[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?(a.error("Method "+e+" does not exist on jQuery.jqBootstrapValidation"),null):n.methods.init.apply(this,arguments)},a.jqBootstrapValidation=function(e){a(":input").not("[type=image],[type=submit]").jqBootstrapValidation.apply(this,arguments)}}(jQuery);
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],function($){return factory($)})}else if(typeof module==="object"&&typeof module.exports==="object"){exports=factory(require("jquery"))}else{factory(jQuery)}})(function($){$.easing.jswing=$.easing.swing;var pow=Math.pow,sqrt=Math.sqrt,sin=Math.sin,cos=Math.cos,PI=Math.PI,c1=1.70158,c2=c1*1.525,c3=c1+1,c4=2*PI/3,c5=2*PI/4.5;function bounceOut(x){var n1=7.5625,d1=2.75;if(x<1/d1){return n1*x*x}else if(x<2/d1){return n1*(x-=1.5/d1)*x+.75}else if(x<2.5/d1){return n1*(x-=2.25/d1)*x+.9375}else{return n1*(x-=2.625/d1)*x+.984375}}$.extend($.easing,{def:"easeOutQuad",swing:function(x){return $.easing[$.easing.def](x)},easeInQuad:function(x){return x*x},easeOutQuad:function(x){return 1-(1-x)*(1-x)},easeInOutQuad:function(x){return x<.5?2*x*x:1-pow(-2*x+2,2)/2},easeInCubic:function(x){return x*x*x},easeOutCubic:function(x){return 1-pow(1-x,3)},easeInOutCubic:function(x){return x<.5?4*x*x*x:1-pow(-2*x+2,3)/2},easeInQuart:function(x){return x*x*x*x},easeOutQuart:function(x){return 1-pow(1-x,4)},easeInOutQuart:function(x){return x<.5?8*x*x*x*x:1-pow(-2*x+2,4)/2},easeInQuint:function(x){return x*x*x*x*x},easeOutQuint:function(x){return 1-pow(1-x,5)},easeInOutQuint:function(x){return x<.5?16*x*x*x*x*x:1-pow(-2*x+2,5)/2},easeInSine:function(x){return 1-cos(x*PI/2)},easeOutSine:function(x){return sin(x*PI/2)},easeInOutSine:function(x){return-(cos(PI*x)-1)/2},easeInExpo:function(x){return x===0?0:pow(2,10*x-10)},easeOutExpo:function(x){return x===1?1:1-pow(2,-10*x)},easeInOutExpo:function(x){return x===0?0:x===1?1:x<.5?pow(2,20*x-10)/2:(2-pow(2,-20*x+10))/2},easeInCirc:function(x){return 1-sqrt(1-pow(x,2))},easeOutCirc:function(x){return sqrt(1-pow(x-1,2))},easeInOutCirc:function(x){return x<.5?(1-sqrt(1-pow(2*x,2)))/2:(sqrt(1-pow(-2*x+2,2))+1)/2},easeInElastic:function(x){return x===0?0:x===1?1:-pow(2,10*x-10)*sin((x*10-10.75)*c4)},easeOutElastic:function(x){return x===0?0:x===1?1:pow(2,-10*x)*sin((x*10-.75)*c4)+1},easeInOutElastic:function(x){return x===0?0:x===1?1:x<.5?-(pow(2,20*x-10)*sin((20*x-11.125)*c5))/2:pow(2,-20*x+10)*sin((20*x-11.125)*c5)/2+1},easeInBack:function(x){return c3*x*x*x-c1*x*x},easeOutBack:function(x){return 1+c3*pow(x-1,3)+c1*pow(x-1,2)},easeInOutBack:function(x){return x<.5?pow(2*x,2)*((c2+1)*2*x-c2)/2:(pow(2*x-2,2)*((c2+1)*(x*2-2)+c2)+2)/2},easeInBounce:function(x){return 1-bounceOut(1-x)},easeOutBounce:bounceOut,easeInOutBounce:function(x){return x<.5?(1-bounceOut(1-2*x))/2:(1+bounceOut(2*x-1))/2}})});
/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isLowIE=b.isIE8=document.all&&!document.addEventListener,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",c.mainEl&&c.mainEl.length?b.ev=c.mainEl.eq(0):b.ev=d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.fixedContentPos?b.wrap.css({overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}):b.wrap.css({top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b.st.autoFocusLast&&b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),f?b.currTemplate[d]=a(f):b.currTemplate[d]=!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||!(2===c.which||c.ctrlKey||c.metaKey||c.altKey||c.shiftKey)){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(c,d){if(void 0===d||d===!1)return!0;if(e=c.split("_"),e.length>1){var f=b.find(p+"-"+e[0]);if(f.length>0){var g=e[1];"replaceWith"===g?f[0]!==d[0]&&f.replaceWith(d):"img"===g?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(p+"-"+c).html(d)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery";return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s);e.click(function(){b.prev()}),f.click(function(){b.next()}),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),A()});
/**
 * jscolor - JavaScript Color Picker
 *
 * @link    http://jscolor.com
 * @license For open source use: GPLv3
 *          For commercial use: JSColor Commercial License
 * @author  Jan Odvarko
 *
 * See usage examples at http://jscolor.com/examples/
 */
"use strict";window.jscolor||(window.jscolor=function(){var e={register:function(){e.attachDOMReadyEvent(e.init),e.attachEvent(document,"mousedown",e.onDocumentMouseDown),e.attachEvent(document,"touchstart",e.onDocumentTouchStart),e.attachEvent(window,"resize",e.onWindowResize)},init:function(){e.jscolor.lookupClass&&e.jscolor.installByClassName(e.jscolor.lookupClass)},tryInstallOnElements:function(t,n){var r=new RegExp("(^|\\s)("+n+")(\\s*(\\{[^}]*\\})|\\s|$)","i");for(var i=0;i<t.length;i+=1){if(t[i].type!==undefined&&t[i].type.toLowerCase()=="color"&&e.isColorAttrSupported)continue;var s;if(!t[i].jscolor&&t[i].className&&(s=t[i].className.match(r))){var o=t[i],u=null,a=e.getDataAttr(o,"jscolor");a!==null?u=a:s[4]&&(u=s[4]);var f={};if(u)try{f=(new Function("return ("+u+")"))()}catch(l){e.warn("Error parsing jscolor options: "+l+":\n"+u)}o.jscolor=new e.jscolor(o,f)}}},isColorAttrSupported:function(){var e=document.createElement("input");if(e.setAttribute){e.setAttribute("type","color");if(e.type.toLowerCase()=="color")return!0}return!1}(),isCanvasSupported:function(){var e=document.createElement("canvas");return!!e.getContext&&!!e.getContext("2d")}(),fetchElement:function(e){return typeof e=="string"?document.getElementById(e):e},isElementType:function(e,t){return e.nodeName.toLowerCase()===t.toLowerCase()},getDataAttr:function(e,t){var n="data-"+t,r=e.getAttribute(n);return r!==null?r:null},attachEvent:function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)},detachEvent:function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n)},_attachedGroupEvents:{},attachGroupEvent:function(t,n,r,i){e._attachedGroupEvents.hasOwnProperty(t)||(e._attachedGroupEvents[t]=[]),e._attachedGroupEvents[t].push([n,r,i]),e.attachEvent(n,r,i)},detachGroupEvents:function(t){if(e._attachedGroupEvents.hasOwnProperty(t)){for(var n=0;n<e._attachedGroupEvents[t].length;n+=1){var r=e._attachedGroupEvents[t][n];e.detachEvent(r[0],r[1],r[2])}delete e._attachedGroupEvents[t]}},attachDOMReadyEvent:function(e){var t=!1,n=function(){t||(t=!0,e())};if(document.readyState==="complete"){setTimeout(n,1);return}if(document.addEventListener)document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1);else if(document.attachEvent){document.attachEvent("onreadystatechange",function(){document.readyState==="complete"&&(document.detachEvent("onreadystatechange",arguments.callee),n())}),window.attachEvent("onload",n);if(document.documentElement.doScroll&&window==window.top){var r=function(){if(!document.body)return;try{document.documentElement.doScroll("left"),n()}catch(e){setTimeout(r,1)}};r()}}},warn:function(e){window.console&&window.console.warn&&window.console.warn(e)},preventDefault:function(e){e.preventDefault&&e.preventDefault(),e.returnValue=!1},captureTarget:function(t){t.setCapture&&(e._capturedTarget=t,e._capturedTarget.setCapture())},releaseTarget:function(){e._capturedTarget&&(e._capturedTarget.releaseCapture(),e._capturedTarget=null)},fireEvent:function(e,t){if(!e)return;if(document.createEvent){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}else if(document.createEventObject){var n=document.createEventObject();e.fireEvent("on"+t,n)}else e["on"+t]&&e["on"+t]()},classNameToList:function(e){return e.replace(/^\s+|\s+$/g,"").split(/\s+/)},hasClass:function(e,t){return t?-1!=(" "+e.className.replace(/\s+/g," ")+" ").indexOf(" "+t+" "):!1},setClass:function(t,n){var r=e.classNameToList(n);for(var i=0;i<r.length;i+=1)e.hasClass(t,r[i])||(t.className+=(t.className?" ":"")+r[i])},unsetClass:function(t,n){var r=e.classNameToList(n);for(var i=0;i<r.length;i+=1){var s=new RegExp("^\\s*"+r[i]+"\\s*|"+"\\s*"+r[i]+"\\s*$|"+"\\s+"+r[i]+"(\\s+)","g");t.className=t.className.replace(s,"$1")}},getStyle:function(e){return window.getComputedStyle?window.getComputedStyle(e):e.currentStyle},setStyle:function(){var e=document.createElement("div"),t=function(t){for(var n=0;n<t.length;n+=1)if(t[n]in e.style)return t[n]},n={borderRadius:t(["borderRadius","MozBorderRadius","webkitBorderRadius"]),boxShadow:t(["boxShadow","MozBoxShadow","webkitBoxShadow"])};return function(e,t,r){switch(t.toLowerCase()){case"opacity":var i=Math.round(parseFloat(r)*100);e.style.opacity=r,e.style.filter="alpha(opacity="+i+")";break;default:e.style[n[t]]=r}}}(),setBorderRadius:function(t,n){e.setStyle(t,"borderRadius",n||"0")},setBoxShadow:function(t,n){e.setStyle(t,"boxShadow",n||"none")},getElementPos:function(t,n){var r=0,i=0,s=t.getBoundingClientRect();r=s.left,i=s.top;if(!n){var o=e.getViewPos();r+=o[0],i+=o[1]}return[r,i]},getElementSize:function(e){return[e.offsetWidth,e.offsetHeight]},getAbsPointerPos:function(e){e||(e=window.event);var t=0,n=0;return typeof e.changedTouches!="undefined"&&e.changedTouches.length?(t=e.changedTouches[0].clientX,n=e.changedTouches[0].clientY):typeof e.clientX=="number"&&(t=e.clientX,n=e.clientY),{x:t,y:n}},getRelPointerPos:function(e){e||(e=window.event);var t=e.target||e.srcElement,n=t.getBoundingClientRect(),r=0,i=0,s=0,o=0;return typeof e.changedTouches!="undefined"&&e.changedTouches.length?(s=e.changedTouches[0].clientX,o=e.changedTouches[0].clientY):typeof e.clientX=="number"&&(s=e.clientX,o=e.clientY),r=s-n.left,i=o-n.top,{x:r,y:i}},getViewPos:function(){var e=document.documentElement;return[(window.pageXOffset||e.scrollLeft)-(e.clientLeft||0),(window.pageYOffset||e.scrollTop)-(e.clientTop||0)]},getViewSize:function(){var e=document.documentElement;return[window.innerWidth||e.clientWidth,window.innerHeight||e.clientHeight]},redrawPosition:function(){if(e.picker&&e.picker.owner){var t=e.picker.owner,n,r;t.fixed?(n=e.getElementPos(t.targetElement,!0),r=[0,0]):(n=e.getElementPos(t.targetElement),r=e.getViewPos());var i=e.getElementSize(t.targetElement),s=e.getViewSize(),o=e.getPickerOuterDims(t),u,a,f;switch(t.position.toLowerCase()){case"left":u=1,a=0,f=-1;break;case"right":u=1,a=0,f=1;break;case"top":u=0,a=1,f=-1;break;default:u=0,a=1,f=1}var l=(i[a]+o[a])/2;if(!t.smartPosition)var c=[n[u],n[a]+i[a]-l+l*f];else var c=[-r[u]+n[u]+o[u]>s[u]?-r[u]+n[u]+i[u]/2>s[u]/2&&n[u]+i[u]-o[u]>=0?n[u]+i[u]-o[u]:n[u]:n[u],-r[a]+n[a]+i[a]+o[a]-l+l*f>s[a]?-r[a]+n[a]+i[a]/2>s[a]/2&&n[a]+i[a]-l-l*f>=0?n[a]+i[a]-l-l*f:n[a]+i[a]-l+l*f:n[a]+i[a]-l+l*f>=0?n[a]+i[a]-l+l*f:n[a]+i[a]-l-l*f];var h=c[u],p=c[a],d=t.fixed?"fixed":"absolute",v=(c[0]+o[0]>n[0]||c[0]<n[0]+i[0])&&c[1]+o[1]<n[1]+i[1];e._drawPosition(t,h,p,d,v)}},_drawPosition:function(t,n,r,i,s){var o=s?0:t.shadowBlur;e.picker.wrap.style.position=i,e.picker.wrap.style.left=n+"px",e.picker.wrap.style.top=r+"px",e.setBoxShadow(e.picker.boxS,t.shadow?new e.BoxShadow(0,o,t.shadowBlur,0,t.shadowColor):null)},getPickerDims:function(t){var n=!!e.getSliderComponent(t),r=[2*t.insetWidth+2*t.padding+t.width+(n?2*t.insetWidth+e.getPadToSliderPadding(t)+t.sliderSize:0),2*t.insetWidth+2*t.padding+t.height+(t.closable?2*t.insetWidth+t.padding+t.buttonHeight:0)];return r},getPickerOuterDims:function(t){var n=e.getPickerDims(t);return[n[0]+2*t.borderWidth,n[1]+2*t.borderWidth]},getPadToSliderPadding:function(e){return Math.max(e.padding,1.5*(2*e.pointerBorderWidth+e.pointerThickness))},getPadYComponent:function(e){switch(e.mode.charAt(1).toLowerCase()){case"v":return"v"}return"s"},getSliderComponent:function(e){if(e.mode.length>2)switch(e.mode.charAt(2).toLowerCase()){case"s":return"s";case"v":return"v"}return null},onDocumentMouseDown:function(t){t||(t=window.event);var n=t.target||t.srcElement;n._jscLinkedInstance?n._jscLinkedInstance.showOnClick&&n._jscLinkedInstance.show():n._jscControlName?e.onControlPointerStart(t,n,n._jscControlName,"mouse"):e.picker&&e.picker.owner&&e.picker.owner.hide()},onDocumentTouchStart:function(t){t||(t=window.event);var n=t.target||t.srcElement;n._jscLinkedInstance?n._jscLinkedInstance.showOnClick&&n._jscLinkedInstance.show():n._jscControlName?e.onControlPointerStart(t,n,n._jscControlName,"touch"):e.picker&&e.picker.owner&&e.picker.owner.hide()},onWindowResize:function(t){e.redrawPosition()},onParentScroll:function(t){e.picker&&e.picker.owner&&e.picker.owner.hide()},_pointerMoveEvent:{mouse:"mousemove",touch:"touchmove"},_pointerEndEvent:{mouse:"mouseup",touch:"touchend"},_pointerOrigin:null,_capturedTarget:null,onControlPointerStart:function(t,n,r,i){var s=n._jscInstance;e.preventDefault(t),e.captureTarget(n);var o=function(s,o){e.attachGroupEvent("drag",s,e._pointerMoveEvent[i],e.onDocumentPointerMove(t,n,r,i,o)),e.attachGroupEvent("drag",s,e._pointerEndEvent[i],e.onDocumentPointerEnd(t,n,r,i))};o(document,[0,0]);if(window.parent&&window.frameElement){var u=window.frameElement.getBoundingClientRect(),a=[-u.left,-u.top];o(window.parent.window.document,a)}var f=e.getAbsPointerPos(t),l=e.getRelPointerPos(t);e._pointerOrigin={x:f.x-l.x,y:f.y-l.y};switch(r){case"pad":switch(e.getSliderComponent(s)){case"s":s.hsv[1]===0&&s.fromHSV(null,100,null);break;case"v":s.hsv[2]===0&&s.fromHSV(null,null,100)}e.setPad(s,t,0,0);break;case"sld":e.setSld(s,t,0)}e.dispatchFineChange(s)},onDocumentPointerMove:function(t,n,r,i,s){return function(t){var i=n._jscInstance;switch(r){case"pad":t||(t=window.event),e.setPad(i,t,s[0],s[1]),e.dispatchFineChange(i);break;case"sld":t||(t=window.event),e.setSld(i,t,s[1]),e.dispatchFineChange(i)}}},onDocumentPointerEnd:function(t,n,r,i){return function(t){var r=n._jscInstance;e.detachGroupEvents("drag"),e.releaseTarget(),e.dispatchChange(r)}},dispatchChange:function(t){t.valueElement&&e.isElementType(t.valueElement,"input")&&e.fireEvent(t.valueElement,"change")},dispatchFineChange:function(e){if(e.onFineChange){var t;typeof e.onFineChange=="string"?t=new Function(e.onFineChange):t=e.onFineChange,t.call(e)}},setPad:function(t,n,r,i){var s=e.getAbsPointerPos(n),o=r+s.x-e._pointerOrigin.x-t.padding-t.insetWidth,u=i+s.y-e._pointerOrigin.y-t.padding-t.insetWidth,a=o*(360/(t.width-1)),f=100-u*(100/(t.height-1));switch(e.getPadYComponent(t)){case"s":t.fromHSV(a,f,null,e.leaveSld);break;case"v":t.fromHSV(a,null,f,e.leaveSld)}},setSld:function(t,n,r){var i=e.getAbsPointerPos(n),s=r+i.y-e._pointerOrigin.y-t.padding-t.insetWidth,o=100-s*(100/(t.height-1));switch(e.getSliderComponent(t)){case"s":t.fromHSV(null,o,null,e.leavePad);break;case"v":t.fromHSV(null,null,o,e.leavePad)}},_vmlNS:"jsc_vml_",_vmlCSS:"jsc_vml_css_",_vmlReady:!1,initVML:function(){if(!e._vmlReady){var t=document;t.namespaces[e._vmlNS]||t.namespaces.add(e._vmlNS,"urn:schemas-microsoft-com:vml");if(!t.styleSheets[e._vmlCSS]){var n=["shape","shapetype","group","background","path","formulas","handles","fill","stroke","shadow","textbox","textpath","imagedata","line","polyline","curve","rect","roundrect","oval","arc","image"],r=t.createStyleSheet();r.owningElement.id=e._vmlCSS;for(var i=0;i<n.length;i+=1)r.addRule(e._vmlNS+"\\:"+n[i],"behavior:url(#default#VML);")}e._vmlReady=!0}},createPalette:function(){var t={elm:null,draw:null};if(e.isCanvasSupported){var n=document.createElement("canvas"),r=n.getContext("2d"),i=function(e,t,i){n.width=e,n.height=t,r.clearRect(0,0,n.width,n.height);var s=r.createLinearGradient(0,0,n.width,0);s.addColorStop(0,"#F00"),s.addColorStop(1/6,"#FF0"),s.addColorStop(2/6,"#0F0"),s.addColorStop(.5,"#0FF"),s.addColorStop(4/6,"#00F"),s.addColorStop(5/6,"#F0F"),s.addColorStop(1,"#F00"),r.fillStyle=s,r.fillRect(0,0,n.width,n.height);var o=r.createLinearGradient(0,0,0,n.height);switch(i.toLowerCase()){case"s":o.addColorStop(0,"rgba(255,255,255,0)"),o.addColorStop(1,"rgba(255,255,255,1)");break;case"v":o.addColorStop(0,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(0,0,0,1)")}r.fillStyle=o,r.fillRect(0,0,n.width,n.height)};t.elm=n,t.draw=i}else{e.initVML();var s=document.createElement("div");s.style.position="relative",s.style.overflow="hidden";var o=document.createElement(e._vmlNS+":fill");o.type="gradient",o.method="linear",o.angle="90",o.colors="16.67% #F0F, 33.33% #00F, 50% #0FF, 66.67% #0F0, 83.33% #FF0";var u=document.createElement(e._vmlNS+":rect");u.style.position="absolute",u.style.left="-1px",u.style.top="-1px",u.stroked=!1,u.appendChild(o),s.appendChild(u);var a=document.createElement(e._vmlNS+":fill");a.type="gradient",a.method="linear",a.angle="180",a.opacity="0";var f=document.createElement(e._vmlNS+":rect");f.style.position="absolute",f.style.left="-1px",f.style.top="-1px",f.stroked=!1,f.appendChild(a),s.appendChild(f);var i=function(e,t,n){s.style.width=e+"px",s.style.height=t+"px",u.style.width=f.style.width=e+1+"px",u.style.height=f.style.height=t+1+"px",o.color="#F00",o.color2="#F00";switch(n.toLowerCase()){case"s":a.color=a.color2="#FFF";break;case"v":a.color=a.color2="#000"}};t.elm=s,t.draw=i}return t},createSliderGradient:function(){var t={elm:null,draw:null};if(e.isCanvasSupported){var n=document.createElement("canvas"),r=n.getContext("2d"),i=function(e,t,i,s){n.width=e,n.height=t,r.clearRect(0,0,n.width,n.height);var o=r.createLinearGradient(0,0,0,n.height);o.addColorStop(0,i),o.addColorStop(1,s),r.fillStyle=o,r.fillRect(0,0,n.width,n.height)};t.elm=n,t.draw=i}else{e.initVML();var s=document.createElement("div");s.style.position="relative",s.style.overflow="hidden";var o=document.createElement(e._vmlNS+":fill");o.type="gradient",o.method="linear",o.angle="180";var u=document.createElement(e._vmlNS+":rect");u.style.position="absolute",u.style.left="-1px",u.style.top="-1px",u.stroked=!1,u.appendChild(o),s.appendChild(u);var i=function(e,t,n,r){s.style.width=e+"px",s.style.height=t+"px",u.style.width=e+1+"px",u.style.height=t+1+"px",o.color=n,o.color2=r};t.elm=s,t.draw=i}return t},leaveValue:1,leaveStyle:2,leavePad:4,leaveSld:8,BoxShadow:function(){var e=function(e,t,n,r,i,s){this.hShadow=e,this.vShadow=t,this.blur=n,this.spread=r,this.color=i,this.inset=!!s};return e.prototype.toString=function(){var e=[Math.round(this.hShadow)+"px",Math.round(this.vShadow)+"px",Math.round(this.blur)+"px",Math.round(this.spread)+"px",this.color];return this.inset&&e.push("inset"),e.join(" ")},e}(),jscolor:function(t,n){function i(e,t,n){e/=255,t/=255,n/=255;var r=Math.min(Math.min(e,t),n),i=Math.max(Math.max(e,t),n),s=i-r;if(s===0)return[null,0,100*i];var o=e===r?3+(n-t)/s:t===r?5+(e-n)/s:1+(t-e)/s;return[60*(o===6?0:o),100*(s/i),100*i]}function s(e,t,n){var r=255*(n/100);if(e===null)return[r,r,r];e/=60,t/=100;var i=Math.floor(e),s=i%2?e-i:1-(e-i),o=r*(1-t),u=r*(1-t*s);switch(i){case 6:case 0:return[r,u,o];case 1:return[u,r,o];case 2:return[o,r,u];case 3:return[o,u,r];case 4:return[u,o,r];case 5:return[r,o,u]}}function o(){e.unsetClass(d.targetElement,d.activeClass),e.picker.wrap.parentNode.removeChild(e.picker.wrap),delete e.picker.owner}function u(){function l(){var e=d.insetColor.split(/\s+/),n=e.length<2?e[0]:e[1]+" "+e[0]+" "+e[0]+" "+e[1];t.btn.style.borderColor=n}d._processParentElementsInDOM(),e.picker||(e.picker={owner:null,wrap:document.createElement("div"),box:document.createElement("div"),boxS:document.createElement("div"),boxB:document.createElement("div"),pad:document.createElement("div"),padB:document.createElement("div"),padM:document.createElement("div"),padPal:e.createPalette(),cross:document.createElement("div"),crossBY:document.createElement("div"),crossBX:document.createElement("div"),crossLY:document.createElement("div"),crossLX:document.createElement("div"),sld:document.createElement("div"),sldB:document.createElement("div"),sldM:document.createElement("div"),sldGrad:e.createSliderGradient(),sldPtrS:document.createElement("div"),sldPtrIB:document.createElement("div"),sldPtrMB:document.createElement("div"),sldPtrOB:document.createElement("div"),btn:document.createElement("div"),btnT:document.createElement("span")},e.picker.pad.appendChild(e.picker.padPal.elm),e.picker.padB.appendChild(e.picker.pad),e.picker.cross.appendChild(e.picker.crossBY),e.picker.cross.appendChild(e.picker.crossBX),e.picker.cross.appendChild(e.picker.crossLY),e.picker.cross.appendChild(e.picker.crossLX),e.picker.padB.appendChild(e.picker.cross),e.picker.box.appendChild(e.picker.padB),e.picker.box.appendChild(e.picker.padM),e.picker.sld.appendChild(e.picker.sldGrad.elm),e.picker.sldB.appendChild(e.picker.sld),e.picker.sldB.appendChild(e.picker.sldPtrOB),e.picker.sldPtrOB.appendChild(e.picker.sldPtrMB),e.picker.sldPtrMB.appendChild(e.picker.sldPtrIB),e.picker.sldPtrIB.appendChild(e.picker.sldPtrS),e.picker.box.appendChild(e.picker.sldB),e.picker.box.appendChild(e.picker.sldM),e.picker.btn.appendChild(e.picker.btnT),e.picker.box.appendChild(e.picker.btn),e.picker.boxB.appendChild(e.picker.box),e.picker.wrap.appendChild(e.picker.boxS),e.picker.wrap.appendChild(e.picker.boxB));var t=e.picker,n=!!e.getSliderComponent(d),r=e.getPickerDims(d),i=2*d.pointerBorderWidth+d.pointerThickness+2*d.crossSize,s=e.getPadToSliderPadding(d),o=Math.min(d.borderRadius,Math.round(d.padding*Math.PI)),u="crosshair";t.wrap.style.clear="both",t.wrap.style.width=r[0]+2*d.borderWidth+"px",t.wrap.style.height=r[1]+2*d.borderWidth+"px",t.wrap.style.zIndex=d.zIndex,t.box.style.width=r[0]+"px",t.box.style.height=r[1]+"px",t.boxS.style.position="absolute",t.boxS.style.left="0",t.boxS.style.top="0",t.boxS.style.width="100%",t.boxS.style.height="100%",e.setBorderRadius(t.boxS,o+"px"),t.boxB.style.position="relative",t.boxB.style.border=d.borderWidth+"px solid",t.boxB.style.borderColor=d.borderColor,t.boxB.style.background=d.backgroundColor,e.setBorderRadius(t.boxB,o+"px"),t.padM.style.background=t.sldM.style.background="#FFF",e.setStyle(t.padM,"opacity","0"),e.setStyle(t.sldM,"opacity","0"),t.pad.style.position="relative",t.pad.style.width=d.width+"px",t.pad.style.height=d.height+"px",t.padPal.draw(d.width,d.height,e.getPadYComponent(d)),t.padB.style.position="absolute",t.padB.style.left=d.padding+"px",t.padB.style.top=d.padding+"px",t.padB.style.border=d.insetWidth+"px solid",t.padB.style.borderColor=d.insetColor,t.padM._jscInstance=d,t.padM._jscControlName="pad",t.padM.style.position="absolute",t.padM.style.left="0",t.padM.style.top="0",t.padM.style.width=d.padding+2*d.insetWidth+d.width+s/2+"px",t.padM.style.height=r[1]+"px",t.padM.style.cursor=u,t.cross.style.position="absolute",t.cross.style.left=t.cross.style.top="0",t.cross.style.width=t.cross.style.height=i+"px",t.crossBY.style.position=t.crossBX.style.position="absolute",t.crossBY.style.background=t.crossBX.style.background=d.pointerBorderColor,t.crossBY.style.width=t.crossBX.style.height=2*d.pointerBorderWidth+d.pointerThickness+"px",t.crossBY.style.height=t.crossBX.style.width=i+"px",t.crossBY.style.left=t.crossBX.style.top=Math.floor(i/2)-Math.floor(d.pointerThickness/2)-d.pointerBorderWidth+"px",t.crossBY.style.top=t.crossBX.style.left="0",t.crossLY.style.position=t.crossLX.style.position="absolute",t.crossLY.style.background=t.crossLX.style.background=d.pointerColor,t.crossLY.style.height=t.crossLX.style.width=i-2*d.pointerBorderWidth+"px",t.crossLY.style.width=t.crossLX.style.height=d.pointerThickness+"px",t.crossLY.style.left=t.crossLX.style.top=Math.floor(i/2)-Math.floor(d.pointerThickness/2)+"px",t.crossLY.style.top=t.crossLX.style.left=d.pointerBorderWidth+"px",t.sld.style.overflow="hidden",t.sld.style.width=d.sliderSize+"px",t.sld.style.height=d.height+"px",t.sldGrad.draw(d.sliderSize,d.height,"#000","#000"),t.sldB.style.display=n?"block":"none",t.sldB.style.position="absolute",t.sldB.style.right=d.padding+"px",t.sldB.style.top=d.padding+"px",t.sldB.style.border=d.insetWidth+"px solid",t.sldB.style.borderColor=d.insetColor,t.sldM._jscInstance=d,t.sldM._jscControlName="sld",t.sldM.style.display=n?"block":"none",t.sldM.style.position="absolute",t.sldM.style.right="0",t.sldM.style.top="0",t.sldM.style.width=d.sliderSize+s/2+d.padding+2*d.insetWidth+"px",t.sldM.style.height=r[1]+"px",t.sldM.style.cursor="default",t.sldPtrIB.style.border=t.sldPtrOB.style.border=d.pointerBorderWidth+"px solid "+d.pointerBorderColor,t.sldPtrOB.style.position="absolute",t.sldPtrOB.style.left=-(2*d.pointerBorderWidth+d.pointerThickness)+"px",t.sldPtrOB.style.top="0",t.sldPtrMB.style.border=d.pointerThickness+"px solid "+d.pointerColor,t.sldPtrS.style.width=d.sliderSize+"px",t.sldPtrS.style.height=m+"px",t.btn.style.display=d.closable?"block":"none",t.btn.style.position="absolute",t.btn.style.left=d.padding+"px",t.btn.style.bottom=d.padding+"px",t.btn.style.padding="0 15px",t.btn.style.height=d.buttonHeight+"px",t.btn.style.border=d.insetWidth+"px solid",l(),t.btn.style.color=d.buttonColor,t.btn.style.font="12px sans-serif",t.btn.style.textAlign="center";try{t.btn.style.cursor="pointer"}catch(c){t.btn.style.cursor="hand"}t.btn.onmousedown=function(){d.hide()},t.btnT.style.lineHeight=d.buttonHeight+"px",t.btnT.innerHTML="",t.btnT.appendChild(document.createTextNode(d.closeText)),a(),f(),e.picker.owner&&e.picker.owner!==d&&e.unsetClass(e.picker.owner.targetElement,d.activeClass),e.picker.owner=d,e.isElementType(v,"body")?e.redrawPosition():e._drawPosition(d,0,0,"relative",!1),t.wrap.parentNode!=v&&v.appendChild(t.wrap),e.setClass(d.targetElement,d.activeClass)}function a(){switch(e.getPadYComponent(d)){case"s":var t=1;break;case"v":var t=2}var n=Math.round(d.hsv[0]/360*(d.width-1)),r=Math.round((1-d.hsv[t]/100)*(d.height-1)),i=2*d.pointerBorderWidth+d.pointerThickness+2*d.crossSize,o=-Math.floor(i/2);e.picker.cross.style.left=n+o+"px",e.picker.cross.style.top=r+o+"px";switch(e.getSliderComponent(d)){case"s":var u=s(d.hsv[0],100,d.hsv[2]),a=s(d.hsv[0],0,d.hsv[2]),f="rgb("+Math.round(u[0])+","+Math.round(u[1])+","+Math.round(u[2])+")",l="rgb("+Math.round(a[0])+","+Math.round(a[1])+","+Math.round(a[2])+")";e.picker.sldGrad.draw(d.sliderSize,d.height,f,l);break;case"v":var c=s(d.hsv[0],d.hsv[1],100),f="rgb("+Math.round(c[0])+","+Math.round(c[1])+","+Math.round(c[2])+")",l="#000";e.picker.sldGrad.draw(d.sliderSize,d.height,f,l)}}function f(){var t=e.getSliderComponent(d);if(t){switch(t){case"s":var n=1;break;case"v":var n=2}var r=Math.round((1-d.hsv[n]/100)*(d.height-1));e.picker.sldPtrOB.style.top=r-(2*d.pointerBorderWidth+d.pointerThickness)-Math.floor(m/2)+"px"}}function l(){return e.picker&&e.picker.owner===d}function c(){d.importColor()}this.value=null,this.valueElement=t,this.styleElement=t,this.required=!0,this.refine=!0,this.hash=!1,this.uppercase=!0,this.onFineChange=null,this.activeClass="jscolor-active",this.minS=0,this.maxS=100,this.minV=0,this.maxV=100,this.hsv=[0,0,100],this.rgb=[255,255,255],this.width=181,this.height=101,this.showOnClick=!0,this.mode="HSV",this.position="bottom",this.smartPosition=!0,this.sliderSize=16,this.crossSize=8,this.closable=!1,this.closeText="Close",this.buttonColor="#000000",this.buttonHeight=18,this.padding=12,this.backgroundColor="#FFFFFF",this.borderWidth=1,this.borderColor="#BBBBBB",this.borderRadius=8,this.insetWidth=1,this.insetColor="#BBBBBB",this.shadow=!0,this.shadowBlur=15,this.shadowColor="rgba(0,0,0,0.2)",this.pointerColor="#4C4C4C",this.pointerBorderColor="#FFFFFF",this.pointerBorderWidth=1,this.pointerThickness=2,this.zIndex=1e3,this.container=null;for(var r in n)n.hasOwnProperty(r)&&(this[r]=n[r]);this.hide=function(){l()&&o()},this.show=function(){u()},this.redraw=function(){l()&&u()},this.importColor=function(){this.valueElement?e.isElementType(this.valueElement,"input")?this.refine?!this.required&&/^\s*$/.test(this.valueElement.value)?(this.valueElement.value="",this.styleElement&&(this.styleElement.style.backgroundImage=this.styleElement._jscOrigStyle.backgroundImage,this.styleElement.style.backgroundColor=this.styleElement._jscOrigStyle.backgroundColor,this.styleElement.style.color=this.styleElement._jscOrigStyle.color),this.exportColor(e.leaveValue|e.leaveStyle)):this.fromString(this.valueElement.value)||this.exportColor():this.fromString(this.valueElement.value,e.leaveValue)||(this.styleElement&&(this.styleElement.style.backgroundImage=this.styleElement._jscOrigStyle.backgroundImage,this.styleElement.style.backgroundColor=this.styleElement._jscOrigStyle.backgroundColor,this.styleElement.style.color=this.styleElement._jscOrigStyle.color),this.exportColor(e.leaveValue|e.leaveStyle)):this.exportColor():this.exportColor()},this.exportColor=function(t){if(!(t&e.leaveValue)&&this.valueElement){var n=this.toString();this.uppercase&&(n=n.toUpperCase()),this.hash&&(n="#"+n),e.isElementType(this.valueElement,"input")?this.valueElement.value=n:this.valueElement.innerHTML=n}t&e.leaveStyle||this.styleElement&&(this.styleElement.style.backgroundImage="none",this.styleElement.style.backgroundColor="#"+this.toString(),this.styleElement.style.color=this.isLight()?"#000":"#FFF"),!(t&e.leavePad)&&l()&&a(),!(t&e.leaveSld)&&l()&&f()},this.fromHSV=function(e,t,n,r){if(e!==null){if(isNaN(e))return!1;e=Math.max(0,Math.min(360,e))}if(t!==null){if(isNaN(t))return!1;t=Math.max(0,Math.min(100,this.maxS,t),this.minS)}if(n!==null){if(isNaN(n))return!1;n=Math.max(0,Math.min(100,this.maxV,n),this.minV)}this.rgb=s(e===null?this.hsv[0]:this.hsv[0]=e,t===null?this.hsv[1]:this.hsv[1]=t,n===null?this.hsv[2]:this.hsv[2]=n),this.exportColor(r)},this.fromRGB=function(e,t,n,r){if(e!==null){if(isNaN(e))return!1;e=Math.max(0,Math.min(255,e))}if(t!==null){if(isNaN(t))return!1;t=Math.max(0,Math.min(255,t))}if(n!==null){if(isNaN(n))return!1;n=Math.max(0,Math.min(255,n))}var o=i(e===null?this.rgb[0]:e,t===null?this.rgb[1]:t,n===null?this.rgb[2]:n);o[0]!==null&&(this.hsv[0]=Math.max(0,Math.min(360,o[0]))),o[2]!==0&&(this.hsv[1]=o[1]===null?null:Math.max(0,this.minS,Math.min(100,this.maxS,o[1]))),this.hsv[2]=o[2]===null?null:Math.max(0,this.minV,Math.min(100,this.maxV,o[2]));var u=s(this.hsv[0],this.hsv[1],this.hsv[2]);this.rgb[0]=u[0],this.rgb[1]=u[1],this.rgb[2]=u[2],this.exportColor(r)},this.fromString=function(e,t){var n;if(n=e.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i))return n[1].length===6?this.fromRGB(parseInt(n[1].substr(0,2),16),parseInt(n[1].substr(2,2),16),parseInt(n[1].substr(4,2),16),t):this.fromRGB(parseInt(n[1].charAt(0)+n[1].charAt(0),16),parseInt(n[1].charAt(1)+n[1].charAt(1),16),parseInt(n[1].charAt(2)+n[1].charAt(2),16),t),!0;if(n=e.match(/^\W*rgba?\(([^)]*)\)\W*$/i)){var r=n[1].split(","),i=/^\s*(\d*)(\.\d+)?\s*$/,s,o,u;if(r.length>=3&&(s=r[0].match(i))&&(o=r[1].match(i))&&(u=r[2].match(i))){var a=parseFloat((s[1]||"0")+(s[2]||"")),f=parseFloat((o[1]||"0")+(o[2]||"")),l=parseFloat((u[1]||"0")+(u[2]||""));return this.fromRGB(a,f,l,t),!0}}return!1},this.toString=function(){return(256|Math.round(this.rgb[0])).toString(16).substr(1)+(256|Math.round(this.rgb[1])).toString(16).substr(1)+(256|Math.round(this.rgb[2])).toString(16).substr(1)},this.toHEXString=function(){return"#"+this.toString().toUpperCase()},this.toRGBString=function(){return"rgb("+Math.round(this.rgb[0])+","+Math.round(this.rgb[1])+","+Math.round(this.rgb[2])+")"},this.isLight=function(){return.213*this.rgb[0]+.715*this.rgb[1]+.072*this.rgb[2]>127.5},this._processParentElementsInDOM=function(){if(this._linkedElementsProcessed)return;this._linkedElementsProcessed=!0;var t=this.targetElement;do{var n=e.getStyle(t);n&&n.position.toLowerCase()==="fixed"&&(this.fixed=!0),t!==this.targetElement&&(t._jscEventsAttached||(e.attachEvent(t,"scroll",e.onParentScroll),t._jscEventsAttached=!0))}while((t=t.parentNode)&&!e.isElementType(t,"body"))};if(typeof t=="string"){var h=t,p=document.getElementById(h);p?this.targetElement=p:e.warn("Could not find target element with ID '"+h+"'")}else t?this.targetElement=t:e.warn("Invalid target element: '"+t+"'");if(this.targetElement._jscLinkedInstance){e.warn("Cannot link jscolor twice to the same element. Skipping.");return}this.targetElement._jscLinkedInstance=this,this.valueElement=e.fetchElement(this.valueElement),this.styleElement=e.fetchElement(this.styleElement);var d=this,v=this.container?e.fetchElement(this.container):document.getElementsByTagName("body")[0],m=3;if(e.isElementType(this.targetElement,"button"))if(this.targetElement.onclick){var g=this.targetElement.onclick;this.targetElement.onclick=function(e){return g.call(this,e),!1}}else this.targetElement.onclick=function(){return!1};if(this.valueElement&&e.isElementType(this.valueElement,"input")){var y=function(){d.fromString(d.valueElement.value,e.leaveValue),e.dispatchFineChange(d)};e.attachEvent(this.valueElement,"keyup",y),e.attachEvent(this.valueElement,"input",y),e.attachEvent(this.valueElement,"blur",c),this.valueElement.setAttribute("autocomplete","off")}this.styleElement&&(this.styleElement._jscOrigStyle={backgroundImage:this.styleElement.style.backgroundImage,backgroundColor:this.styleElement.style.backgroundColor,color:this.styleElement.style.color}),this.value?this.fromString(this.value)||this.exportColor():this.importColor()}};return e.jscolor.lookupClass="jscolor",e.jscolor.installByClassName=function(t){var n=document.getElementsByTagName("input"),r=document.getElementsByTagName("button");e.tryInstallOnElements(n,t),e.tryInstallOnElements(r,t)},e.register(),e.jscolor}());
/* 
=========================================================================
   JSManipulate v1.0 (2011-08-01)

Javascript image filter & effect library

Developed by Joel Besada (http://www.joelb.me)
Demo page: http://www.joelb.me/jsmanipulate

MIT LICENSED (http://www.opensource.org/licenses/mit-license.php)
Copyright (c) 2011, Joel Besada
=========================================================================
*/

function FilterUtils(){this.HSVtoRGB=function(a,b,f){var d,g,c,e=Math.floor(a*6),h=a*6-e,a=f*(1-b),k=f*(1-h*b),b=f*(1-(1-h)*b);switch(e%6){case 0:d=f;g=b;c=a;break;case 1:d=k;g=f;c=a;break;case 2:d=a;g=f;c=b;break;case 3:d=a;g=k;c=f;break;case 4:d=b;g=a;c=f;break;case 5:d=f,g=a,c=k}return[d*255,g*255,c*255]};this.RGBtoHSV=function(a,b,f){a/=255;b/=255;f/=255;var d=Math.max(a,b,f),g=Math.min(a,b,f),c,e=d-g;if(d===g)c=0;else{switch(d){case a:c=(b-f)/e+(b<f?6:0);break;case b:c=(f-a)/e+2;break;case f:c=
(a-b)/e+4}c/=6}return[c,d===0?0:e/d,d]};this.getPixel=function(a,b,f,d,g){var c=(f*d+b)*4;if(b<0||b>=d||f<0||f>=g)return[a[(this.clampPixel(f,0,g-1)*d+this.clampPixel(b,0,d-1))*4],a[(this.clampPixel(f,0,g-1)*d+this.clampPixel(b,0,d-1))*4+1],a[(this.clampPixel(f,0,g-1)*d+this.clampPixel(b,0,d-1))*4+2],a[(this.clampPixel(f,0,g-1)*d+this.clampPixel(b,0,d-1))*4+3]];return[a[c],a[c+1],a[c+2],a[c+3]]};var h=!1,e;this.gaussianRandom=function(){if(h)return h=!1,e;else{var a,b,f;do a=2*Math.random()-1,b=2*
Math.random()-1,f=a*a+b*b;while(f>=1||f===0);f=Math.sqrt(-2*Math.log(f)/f);e=b*f;h=!0;return a*f}};this.clampPixel=function(a,b,f){return a<b?b:a>f?f:a};this.triangle=function(a){a=this.mod(a,1);return 2*(a<0.5?a:1-a)};this.mod=function(a,b){var f=parseInt(a/b,10);a-=f*b;if(a<0)return a+b;return a};this.mixColors=function(a,b,f){var d=this.linearInterpolate(a,b[0],f[0]),g=this.linearInterpolate(a,b[1],f[1]),c=this.linearInterpolate(a,b[2],f[2]),a=this.linearInterpolate(a,b[3],f[3]);return[d,g,c,a]};
this.linearInterpolate=function(a,b,f){return b+a*(f-b)};this.bilinearInterpolate=function(a,b,f,d,g,c){var e=f[0],h=f[1],k=f[2],i=d[0],o=d[1],p=d[2],s=g[0],n=g[1],m=g[2],q=g[3],t=c[0],r=c[1],g=c[2],u=c[3],c=1-a,v=1-b,f=c*f[3]+a*d[3],f=v*f+b*(c*q+a*u),e=v*(c*e+a*i)+b*(c*s+a*t),h=v*(c*h+a*o)+b*(c*n+a*r);return[e,h,v*(c*k+a*p)+b*(c*m+a*g),f]};this.tableFilter=function(a,b,f,d){for(var g=0;g<d;g++)for(var c=0;c<f;c++)for(var e=(g*f+c)*4,h=0;h<3;h++)a[e+h]=b[a[e+h]]};this.convolveFilter=function(a,b,
f,d){var g=[],c,e;c=e=Math.sqrt(b.length);c=parseInt(c/2,10);for(var h=parseInt(e/2,10),k=0;k<d;k++)for(var i=0;i<f;i++){for(var o=(k*f+i)*4,p=0,s=0,n=0,m=-c;m<=c;m++)for(var q=k+m,q=0<=q&&q<d?q*f:k*f,t=e*(m+c)+h,r=-h;r<=h;r++){var u=b[t+r];if(u!==0){var v=i+r;0<=v&&v<f||(v=i);v=(q+v)*4;p+=u*a[v];s+=u*a[v+1];n+=u*a[v+2]}}g[o]=parseInt(p+0.5,10);g[o+1]=parseInt(s+0.5,10);g[o+2]=parseInt(n+0.5,10);g[o+3]=a[o+3]}for(b=0;b<g.length;b++)a[b]=g[b]};this.transformFilter=function(a,b,f,d){for(var g=[],c=
[],e=0;e<a.length;e++)c[e]=a[e];for(e=0;e<d;e++)for(var h=0;h<f;h++){var k=(e*f+h)*4;b.apply(this,[h,e,g]);var i=Math.floor(g[0]),o=Math.floor(g[1]),p=g[0]-i,s=g[1]-o,n,m,q;i>=0&&i<f-1&&o>=0&&o<d-1?(i=(f*o+i)*4,n=[a[i],a[i+1],a[i+2],a[i+3]],m=[a[i+4],a[i+5],a[i+6],a[i+7]],q=[a[i+f*4],a[i+f*4+1],a[i+f*4+2],a[i+f*4+3]],i=[a[i+(f+1)*4],a[i+(f+1)*4+1],a[i+(f+1)*4+2],a[i+(f+1)*4+3]]):(n=this.getPixel(a,i,o,f,d),m=this.getPixel(a,i+1,o,f,d),q=this.getPixel(a,i,o+1,f,d),i=this.getPixel(a,i+1,o+1,f,d));p=
this.bilinearInterpolate(p,s,n,m,q,i);c[k]=p[0];c[k+1]=p[1];c[k+2]=p[2];c[k+3]=p[3]}for(b=0;b<c.length;b++)a[b]=c[b]}}
function BlurFilter(){this.name="Blur";this.isDirAnimatable=!1;this.defaultValues={amount:3};this.valueRanges={amount:{min:0,max:10}};this.filter=function(h,e){var a=h.width,b=a<<2,f=h.height,d=h.data,g;g=e.amount;g<0&&(g=0);g=g>=2.5?0.98711*g-0.9633:g>=0.5?3.97156-4.14554*Math.sqrt(1-0.26891*g):2*g*(3.97156-4.14554*Math.sqrt(0.865545));var c=g*g,j=c*g,l=1.57825+2.44413*g+1.4281*c+0.422205*j;g=(2.44413*g+2.85619*c+1.26661*j)/l;for(var c=-(1.4281*c+1.26661*j)/l,j=0.422205*j/l,l=1-(g+c+j),k=0,i,o,p,
s,n,m,k=0;k<3;k++)for(var q=0;q<f;q++){i=q*b+k;o=q*b+(a-1<<2)+k;for(m=n=s=p=d[i];i<=o;i+=4)p=l*d[i]+g*s+c*n+j*m,d[i]=p,m=n,n=s,s=p;i=q*b+(a-1<<2)+k;o=q*b+k;for(m=n=s=p=d[i];i>=o;i-=4)p=l*d[i]+g*s+c*n+j*m,d[i]=p,m=n,n=s,s=p}for(k=0;k<3;k++)for(q=0;q<a;q++){i=(q<<2)+k;o=(f-1)*b+(q<<2)+k;for(m=n=s=p=d[i];i<=o;i+=b)p=l*d[i]+g*s+c*n+j*m,d[i]=p,m=n,n=s,s=p;i=(f-1)*b+(q<<2)+k;o=(q<<2)+k;for(m=n=s=p=d[i];i>=o;i-=b)p=l*d[i]+g*s+c*n+j*m,d[i]=p,m=n,n=s,s=p}}}
function BrightnessFilter(){this.name="Brightness";this.isDirAnimatable=!0;this.defaultValues={amount:0};this.valueRanges={amount:{min:-1,max:1}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;for(var g=a.amount===void 0?this.defaultValues.amount:a.amount,c=0;c<f;c++)for(var j=0;j<b;j++){var l=(c*b+j)*4,k=h.RGBtoHSV(d[l],d[l+1],d[l+2]);k[2]+=g;k[2]<0?k[2]=0:k[2]>1&&(k[2]=1);for(var k=h.HSVtoRGB(k[0],k[1],k[2]),i=0;i<3;i++)d[l+i]=
k[i]}}}function BumpFilter(){this.name="Bump";this.isDirAnimatable=!0;this.defaultValues={};this.valueRanges={};var h=new FilterUtils;this.filter=function(e){h.convolveFilter(e.data,[-1,-1,0,-1,1,1,0,1,1],e.width,e.height)}}
function CircleSmearFilter(){this.name="Circle Smear";this.isDirAnimatable=!1;this.defaultValues={size:4,density:0.5,mix:0.5};this.valueRanges={size:{min:1,max:10},density:{min:0,max:1},mix:{min:0,max:1}};var h=new FilterUtils;this.filter=function(e,a){for(var b=e.width,f=e.height,d=e.data,g=[],c=0;c<d.length;c++)g[c]=d[c];if(a===void 0)a=this.defaultValues;var j=a.size===void 0?this.defaultValues.size:a.size;j<1&&(j=1);j=parseInt(j,10);c=a.mix===void 0?this.defaultValues.mix:a.mix;j+=1;for(var l=
j*j,k=parseInt(2*(a.density===void 0?this.defaultValues.density:a.density)/30*b*f/2,10),i=0;i<k;i++)for(var o=(Math.random()*Math.pow(2,32)&2147483647)%b,p=(Math.random()*Math.pow(2,32)&2147483647)%f,s=[d[(p*b+o)*4],d[(p*b+o)*4+1],d[(p*b+o)*4+2],d[(p*b+o)*4+3]],n=o-j;n<o+j+1;n++)for(var m=p-j;m<p+j+1;m++){var q=(n-o)*(n-o)+(m-p)*(m-p);if(n>=0&&n<b&&m>=0&&m<f&&q<=l)for(var q=h.mixColors(c,[g[(m*b+n)*4],g[(m*b+n)*4+1],g[(m*b+n)*4+2],g[(m*b+n)*4+3]],s),t=0;t<3;t++)g[(m*b+n)*4+t]=q[t]}for(b=0;b<g.length;b++)d[b]=
g[b]}}
function ContrastFilter(){this.name="Contrast";this.isDirAnimatable=!0;this.defaultValues={amount:1};this.valueRanges={amount:{min:0,max:2}};if(FilterUtils){var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;var g=a.amount===void 0?this.defaultValues.amount:a.amount;g<0&&(g=0);for(var c=[],j=0;j<256;j++)c[j]=parseInt(255*((j/255-0.5)*g+0.5),10);h.tableFilter(d,c,b,f)}}else console&&console.error("Unable to find filterutils.js, please include this file! (Required by "+this.name+
" filter)")}
function CrossSmearFilter(){this.name="Cross Smear";this.isDirAnimatable=!1;this.defaultValues={distance:8,density:0.5,mix:0.5};this.valueRanges={distance:{min:0,max:30},density:{min:0,max:1},mix:{min:0,max:1}};var h=new FilterUtils;this.filter=function(e,a){for(var b=e.width,f=e.height,d=e.data,g=[],c=0;c<d.length;c++)g[c]=d[c];if(a===void 0)a=this.defaultValues;c=a.distance===void 0?this.defaultValues.distance:a.distance;c<0&&(c=0);for(var c=parseInt(c,10),j=a.mix===void 0?this.defaultValues.mix:a.mix,
l=parseInt(2*(a.density===void 0?this.defaultValues.density:a.density)*b*f/(c+1),10),k=0;k<l;k++){for(var i=(Math.random()*Math.pow(2,32)&2147483647)%b,o=(Math.random()*Math.pow(2,32)&2147483647)%f,p=Math.random()*Math.pow(2,32)%c+1,s=[d[(o*b+i)*4],d[(o*b+i)*4+1],d[(o*b+i)*4+2],d[(o*b+i)*4+3]],n,m,q=i-p;q<i+p+1;q++)if(q>=0&&q<b){n=[g[(o*b+q)*4],g[(o*b+q)*4+1],g[(o*b+q)*4+2],g[(o*b+q)*4+3]];n=h.mixColors(j,n,s);for(m=0;m<3;m++)g[(o*b+q)*4+m]=n[m]}for(q=o-p;q<o+p+1;q++)if(q>=0&&q<f){n=[g[(q*b+i)*4],
g[(q*b+i)*4+1],g[(q*b+i)*4+2],g[(q*b+i)*4+3]];n=h.mixColors(j,n,s);for(m=0;m<3;m++)g[(q*b+i)*4+m]=n[m]}}for(b=0;b<g.length;b++)d[b]=g[b]}}
function DiffusionFilter(){this.name="Diffusion";this.isDirAnimatable=!1;this.defaultValues={scale:4};this.valueRanges={scale:{min:1,max:100}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;for(var g=a.scale===void 0?this.defaultValues.scale:a.scale,c=[],j=[],l=0;l<256;l++){var k=Math.PI*2*l/256;c[l]=g*Math.sin(k);j[l]=g*Math.cos(k)}transInverse=function(a,b,g){var d=parseInt(Math.random()*255,10),f=Math.random();g[0]=a+f*c[d];
g[1]=b+f*j[d]};h.transformFilter(d,transInverse,b,f)}}
function DitherFilter(){this.name="Dither";this.isDirAnimatable=!1;this.defaultValues={levels:3,color:!0};this.valueRanges={levels:{min:2,max:30},color:{min:!1,max:!0}};new FilterUtils;this.filter=function(h,e){var a=h.width,b=h.height,f=h.data,d=[],g,c;for(c=0;c<f.length;c++)d[c]=0;if(e===void 0)e=this.defaultValues;var j=e.levels===void 0?this.defaultValues.levels:e.levels,l=e.color===void 0?this.defaultValues.color:e.color;j<=1&&(j=1);var k=[0,0,0,0,0,7,3,5,1],i=0,o=[];for(g=0;g<j;g++)o[g]=parseInt(255*
g/(j-1),10);var p=[];for(g=0;g<256;g++)p[g]=parseInt(j*g/256,10);for(j=0;j<b;j++){var s=(j&1)==1,n;s?(i=(j*a+a-1)*4,n=-1):(i=j*a*4,n=1);for(var m=0;m<a;m++){var q=f[i],t=f[i+1],r=f[i+2];l||(q=t=r=parseInt((q+t+r)/3,10));var u=o[p[q]],v=o[p[t]];g=o[p[r]];d[i]=u;d[i+1]=v;d[i+2]=g;d[i+3]=f[i+3];var u=q-u,v=t-v,y=r-g;for(g=-1;g<=1;g++)if(q=g+j,0<=q&&q<b)for(c=-1;c<=1;c++)if(q=c+m,0<=q&&q<a){var w;w=s?k[(g+1)*3-c+1]:k[(g+1)*3+c+1];if(w!==0){var x=s?i-c*4:i+c*4,q=f[x],t=f[x+1],r=f[x+2];w/=16;q+=u*w;t+=
v*w;r+=y*w;f[x]=q;f[x+1]=t;f[x+2]=r}}i+=n*4}}for(c=0;c<d.length;c++)f[c]=d[c]}}
function EdgeFilter(){this.name="Edge Detection";this.isDirAnimatable=!0;this.defaultValues={};this.valueRanges={};var h=[-1,-2,-1,0,0,0,1,2,1],e=[-1,0,1,-2,0,2,-1,0,1];this.filter=function(a){for(var b=a.width,f=a.height,a=a.data,d=[],g=0;g<f;g++)for(var c=0;c<b;c++){var j=(g*b+c)*4,l=0,k=bh=gh=0;bv=gv=0;for(var i=-1;i<=1;i++)for(var o=g+i,o=o>=0&&o<f?o*b*4:g*b*4,p=3*(i+1)+1,s=-1;s<=1;s++){var n=c+s;n>=0&&n<b||(n=c);n*=4;var m=a[o+n],q=a[o+n+1],n=a[o+n+2],t=h[p+s],r=e[p+s];l+=parseInt(t*m,10);bh+=
parseInt(t*q,10);gh+=parseInt(t*n,10);k+=parseInt(r*m,10);gv+=parseInt(r*q,10);bv+=parseInt(r*n,10)}m=parseInt(Math.sqrt(l*l+k*k)/1.8,10);q=parseInt(Math.sqrt(gh*gh+gv*gv)/1.8,10);n=parseInt(Math.sqrt(bh*bh+bv*bv)/1.8,10);d[j]=m;d[j+1]=q;d[j+2]=n;d[j+3]=a[j+3]}for(b=0;b<d.length;b++)a[b]=d[b]}}
function EmbossFilter(){this.name="Emboss";this.isDirAnimatable=!1;this.defaultValues={height:1,angle:135,elevation:30};this.valueRanges={height:{min:1,max:10},angle:{min:0,max:360},elevation:{min:0,max:180}};this.filter=function(h,e){var a=h.width,b=h.height,f=h.data;if(e===void 0)e=this.defaultValues;for(var d=e.height===void 0?this.defaultValues.height:e.height,g=e.angle===void 0?this.defaultValues.angle:e.angle,c=e.elevation===void 0?this.defaultValues.elevation:e.elevation,g=g/180*Math.PI,c=
c/180*Math.PI,j=3*d,d=[],l=0;l<f.length;l+=4)d[l/4]=(f[l]+f[l+1]+f[l+2])/3;var k,i,o,p,l=parseInt(Math.cos(g)*Math.cos(c)*255.9,10),g=parseInt(Math.sin(g)*Math.cos(c)*255.9,10),c=parseInt(Math.sin(c)*255.9,10);o=parseInt(1530/j,10);j=o*o;o*=c;for(var s=0,n=0;n<b;n++,s+=a)for(var m=s,q=m+a,t=q+a,r=0;r<a;r++,m++,q++,t++){var u=(n*a+r)*4;n!==0&&n<b-2&&r!==0&&r<a-2?(k=d[m-1]+d[q-1]+d[t-1]-d[m+1]-d[q+1]-d[t+1],i=d[t-1]+d[t]+d[t+1]-d[m-1]-d[m]-d[m+1],k=k===0&&i===0?c:(p=k*l+i*g+o)<0?0:parseInt(p/Math.sqrt(k*
k+i*i+j),10)):k=c;f[u]=f[u+1]=f[u+2]=k}}}function ExposureFilter(){this.name="Exposure";this.isDirAnimatable=!0;this.defaultValues={exposure:1};this.valueRanges={exposure:{min:0,max:5}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;for(var g=a.exposure===void 0?this.defaultValues.exposure:a.exposure,c=[],j=0;j<256;j++)c[j]=parseInt(255*(1-Math.exp(-(j/255)*g)),10);h.tableFilter(d,c,b,f)}}
function GainFilter(){this.name="Gain/Bias";this.isDirAnimatable=!0;this.defaultValues={gain:0.5,bias:0.5};this.valueRanges={gain:{min:0,max:1},bias:{min:0,max:1}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;for(var g=a.gain===void 0?this.defaultValues.gain:a.gain,c=a.bias===void 0?this.defaultValues.bias:a.bias,j=[],l=0;l<256;l++){var k=l/255,i=(1/g-2)*(1-2*k),k=k<0.5?k/(i+1):(i-k)/(i-1);k/=(1/c-2)*(1-k)+1;j[l]=parseInt(255*
k,10)}h.tableFilter(d,j,b,f)}}
function GammaFilter(){this.name="Gamma";this.isDirAnimatable=!0;this.defaultValues={amount:1};this.valueRanges={amount:{min:0,max:2}};this.filter=function(h,e){var a=h.width,b=h.height,f=h.data;if(e===void 0)e=this.defaultValues;var d=e.amount===void 0?this.defaultValues.amount:e.amount;d<0&&(d=0);if(FilterUtils){for(var g=new FilterUtils,c=[],j=0;j<256;j++)c[j]=255*Math.pow(j/255,1/d)+0.5;g.tableFilter(f,c,a,b)}else console&&console.error("Unable to find filterutils.js, please include this file! (Required by "+this.name+
" filter)")}}function GrayscaleFilter(){this.name="Grayscale";this.isDirAnimatable=!0;this.defaultValues={};this.valueRanges={};this.filter=function(h){for(var e=h.width,a=h.height,h=h.data,b=0;b<a;b++)for(var f=0;f<e;f++){var d=(b*e+f)*4;h[d]=h[d+1]=h[d+2]=h[d]*0.3+h[d+1]*0.59+h[d+2]*0.11}}}
function HueFilter(){this.name="Hue";this.isDirAnimatable=!0;this.defaultValues={amount:0};this.valueRanges={amount:{min:-1,max:1}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;for(var g=a.amount===void 0?this.defaultValues.amount:a.amount,c=0;c<f;c++)for(var j=0;j<b;j++){var l=(c*b+j)*4,k=h.RGBtoHSV(d[l],d[l+1],d[l+2]);for(k[0]+=g;k[0]<0;)k[0]+=360;for(var k=h.HSVtoRGB(k[0],k[1],k[2]),i=0;i<3;i++)d[l+i]=k[i]}}}
function InvertFilter(){this.name="Invert";this.isDirAnimatable=!0;this.defaultValues={};this.valueRanges={};this.filter=function(h){for(var e=h.width,a=h.height,h=h.data,b=0;b<a;b++)for(var f=0;f<e;f++)for(var d=(b*e+f)*4,g=0;g<3;g++)h[d+g]=255-h[d+g]}}
function KaleidoscopeFilter(){this.name="Kaleidoscope";this.isDirAnimatable=!1;this.defaultValues={angle:0,rotation:0,sides:3,centerX:0.5,centerY:0.5};this.valueRanges={angle:{min:0,max:360},rotation:{min:0,max:360},sides:{min:1,max:30},centerX:{min:0,max:1},centerY:{min:0,max:1}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;var g=a.angle===void 0?this.defaultValues.angle:a.angle,c=a.rotation===void 0?this.defaultValues.rotation:
a.rotation,j=a.sides===void 0?this.defaultValues.sides:a.sides,l=b*(a.centerX===void 0?this.defaultValues.centerX:a.centerX),k=f*(a.centerY===void 0?this.defaultValues.centerY:a.centerY),g=g/180*Math.PI,c=c/180*Math.PI;h.transformFilter(d,function(a,b,d){a-=l;var f=b-k,b=Math.sqrt(a*a+f*f),a=Math.atan2(f,a)-g-c,a=h.triangle(a/Math.PI*j*0.5);a+=g;d[0]=l+b*Math.cos(a);d[1]=k+b*Math.sin(a)},b,f)}}
function LensDistortionFilter(){this.name="Lens Distortion";this.isDirAnimatable=!1;this.defaultValues={refraction:1.5,radius:50,centerX:0.5,centerY:0.5};this.valueRanges={refraction:{min:1,max:10},radius:{min:1,max:200},centerX:{min:0,max:1},centerY:{min:0,max:1}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;var g=a.refraction===void 0?this.defaultValues.refraction:a.refraction,c=a.radius===void 0?this.defaultValues.radius:a.radius,
j=c*c,l=b*(a.centerX===void 0?this.defaultValues.centerX:a.centerX),k=f*(a.centerY===void 0?this.defaultValues.centerY:a.centerY);h.transformFilter(d,function(a,b,c){var d=a-l,f=b-k,e=d*d,h=f*f;if(h>=j-j*e/j)c[0]=a,c[1]=b;else{var t=1/g,r=Math.sqrt((1-e/j-h/j)*j),u=r*r,d=Math.acos(d/Math.sqrt(e+u)),e=Math.PI/2-d,e=Math.asin(Math.sin(e)*t),e=Math.PI/2-d-e;c[0]=a-Math.tan(e)*r;a=Math.acos(f/Math.sqrt(h+u));e=Math.PI/2-a;e=Math.asin(Math.sin(e)*t);e=Math.PI/2-a-e;c[1]=b-Math.tan(e)*r}},b,f)}}
function LineSmearFilter(){this.name="Line Smear";this.isDirAnimatable=!1;this.defaultValues={distance:8,density:0.5,angle:0,mix:0.5};this.valueRanges={distance:{min:1,max:30},density:{min:0,max:1},angle:{min:0,max:360},mix:{min:0,max:1}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data,g=[],c;for(c=0;c<d.length;c++)g[c]=d[c];if(a===void 0)a=this.defaultValues;var j=a.distance===void 0?this.defaultValues.distance:a.distance;j<1&&(j=1);for(var j=parseInt(j,10),l=a.density===
void 0?this.defaultValues.density:a.density,k=a.angle===void 0?this.defaultValues.angle:a.angle,i=a.mix===void 0?this.defaultValues.mix:a.mix,k=k/180*Math.PI,o=Math.sin(k),k=Math.cos(k),l=parseInt(2*l*b*f/2,10),p=0;p<l;p++){var s=(Math.random()*Math.pow(2,32)&2147483647)%b,n=(Math.random()*Math.pow(2,32)&2147483647)%f,m=(Math.random()*Math.pow(2,32)&2147483647)%j+1,q=[d[(n*b+s)*4],d[(n*b+s)*4+1],d[(n*b+s)*4+2],d[(n*b+s)*4+3]],t=parseInt(m*k,10),m=parseInt(m*o,10),r=s-t,u=n-m;s+=t;n+=m;var v,y,w,x;
w=s<r?-1:1;x=n<u?-1:1;var t=s-r,m=n-u,t=Math.abs(t),m=Math.abs(m),z;if(r<b&&r>=0&&u<f&&u>=0){c=[g[(u*b+r)*4],g[(u*b+r)*4+1],g[(u*b+r)*4+2],g[(u*b+r)*4+3]];z=h.mixColors(i,c,q);for(c=0;c<3;c++)g[(u*b+r)*4+c]=z[c]}if(Math.abs(t)>Math.abs(m)){v=2*m-t;y=2*m;for(t=2*(m-t);r!=s;)if(v<=0?v+=y:(v+=t,u+=x),r+=w,r<b&&r>=0&&u<f&&u>=0){c=[g[(u*b+r)*4],g[(u*b+r)*4+1],g[(u*b+r)*4+2],g[(u*b+r)*4+3]];z=h.mixColors(i,c,q);for(c=0;c<3;c++)g[(u*b+r)*4+c]=z[c]}}else{v=2*t-m;y=2*t;for(t=2*(t-m);u!=n;)if(v<=0?v+=y:(v+=
t,r+=w),u+=x,r<b&&r>=0&&u<f&&u>=0){c=[g[(u*b+r)*4],g[(u*b+r)*4+1],g[(u*b+r)*4+2],g[(u*b+r)*4+3]];z=h.mixColors(i,c,q);for(c=0;c<3;c++)g[(u*b+r)*4+c]=z[c]}}}for(c=0;c<g.length;c++)d[c]=g[c]}}
function MaximumFilter(){this.name="Maximum";this.isDirAnimatable=!0;this.defaultValues={};this.valueRanges={};this.filter=function(h){for(var e=h.width,a=h.height,h=h.data,b=[],f=0;f<a;f++)for(var d=0;d<e;d++){for(var g=(f*e+d)*4,c=0,j=0,l=0,k=-1;k<=1;k++){var i=f+k;if(i>=0&&i<a)for(var o=-1;o<=1;o++){var p=d+o;p>=0&&p<e&&(p=(i*e+p)*4,c=Math.max(c,h[p]),j=Math.max(j,h[p+1]),l=Math.max(l,h[p+2]))}}b[g]=c;b[g+1]=j;b[g+2]=l;b[g+3]=h[g+3]}for(e=0;e<b.length;e++)h[e]=b[e]}}
function MedianFilter(){this.name="Median";this.isDirAnimatable=!1;this.defaultValues={};this.valueRanges={};this.filter=function(h){for(var e=h.width,a=h.height,h=h.data,b=[],f=0;f<a;f++)for(var d=0;d<e;d++){for(var g=(f*e+d)*4,c=[],j=[],l=[],k=-1;k<=1;k++){var i=f+k;if(i>=0&&i<a)for(var o=-1;o<=1;o++){var p=d+o;p>=0&&p<e&&(p=(i*e+p)*4,c.push(h[p]),j.push(h[p+1]),l.push(h[p+2]))}}k=function(a,c){return a-c};c.sort(k);j.sort(k);l.sort(k);b[g]=c[4];b[g+1]=j[4];b[g+2]=l[4];b[g+3]=h[g+3]}for(e=0;e<b.length;e++)h[e]=
b[e]}}function MinimumFilter(){this.name="Minimum";this.isDirAnimatable=!0;this.defaultValues={};this.valueRanges={};this.filter=function(h){for(var e=h.width,a=h.height,h=h.data,b=[],f=0;f<a;f++)for(var d=0;d<e;d++){for(var g=(f*e+d)*4,c=255,j=255,l=255,k=-1;k<=1;k++){var i=f+k;if(i>=0&&i<a)for(var o=-1;o<=1;o++){var p=d+o;p>=0&&p<e&&(p=(i*e+p)*4,c=Math.min(c,h[p]),j=Math.min(j,h[p+1]),l=Math.min(l,h[p+2]))}}b[g]=c;b[g+1]=j;b[g+2]=l;b[g+3]=h[g+3]}for(e=0;e<b.length;e++)h[e]=b[e]}}
function NoiseFilter(){this.name="Noise";this.isDirAnimatable=!0;this.defaultValues={amount:25,density:1,monochrome:!0};this.valueRanges={amount:{min:0,max:100},density:{min:0,max:1},monochrome:{min:!1,max:!0}};this.filter=function(h,e){var a=h.width,b=h.height,f=h.data;if(e===void 0)e=this.defaultValues;for(var d=e.amount===void 0?this.defaultValues.amount:e.amount,g=e.density===void 0?this.defaultValues.density:e.density,c=e.monochrome===void 0?this.defaultValues.monochrome:e.monochrome,j=0;j<b;j++)for(var l=
0;l<a;l++){var k=(j*a+l)*4;if(Math.random()<=g){var i;if(c)i=parseInt((2*Math.random()-1)*d,10),f[k]+=i,f[k+1]+=i,f[k+2]+=i;else for(var o=0;o<3;o++)i=parseInt((2*Math.random()-1)*d,10),f[k+o]+=i}}}}
function OilFilter(){this.name="Oil Painting";this.isDirAnimatable=!1;this.defaultValues={range:3};this.valueRanges={range:{min:0,max:5}};this.filter=function(h,e){var a=h.width,b=h.height,f=h.data,d=[];if(e===void 0)e=this.defaultValues;for(var g=e.range===void 0?this.defaultValues.range:e.range,g=parseInt(g,10),c=[],j=[],l=[],k=[],i=[],o=[],p=0;p<b;p++)for(var s=0;s<a;s++){for(var n=(p*a+s)*4,m=0;m<256;m++)c[m]=j[m]=l[m]=k[m]=i[m]=o[m]=0;for(m=-g;m<=g;m++){var q=p+m;if(0<=q&&q<b){q*=a;for(var t=
-g;t<=g;t++){var r=s+t;if(0<=r&&r<a){var u=f[(q+r)*4],v=f[(q+r)*4+1],r=f[(q+r)*4+2],y=u*256/256,w=v*256/256,x=r*256/256;k[y]+=u;i[w]+=v;o[x]+=r;c[y]++;j[w]++;l[x]++}}}}t=q=m=0;for(u=1;u<256;u++)c[u]>c[m]&&(m=u),j[u]>j[q]&&(q=u),l[u]>l[t]&&(t=u);m=k[m]/c[m];q=i[q]/j[q];t=o[t]/l[t];d[n]=m;d[n+1]=q;d[n+2]=t;d[n+3]=f[n+3]}for(a=0;a<d.length;a++)f[a]=d[a]}}
function OpacityFilter(){this.name="Opacity";this.isDirAnimatable=!0;this.defaultValues={amount:1};this.valueRanges={amount:{min:0,max:1}};this.filter=function(h,e){var a=h.width,b=h.height,f=h.data;if(e===void 0)e=this.defaultValues;for(var d=e.amount===void 0?this.defaultValues.amount:e.amount,g=0;g<b;g++)for(var c=0;c<a;c++)f[(g*a+c)*4+3]=255*d}}
function PinchFilter(){this.name="Pinch/Whirl";this.isDirAnimatable=!1;this.defaultValues={amount:0.5,radius:100,angle:0,centerX:0.5,centerY:0.5};this.valueRanges={amount:{min:-1,max:1},radius:{min:1,max:200},angle:{min:0,max:360},centerX:{min:0,max:1},centerY:{min:0,max:1}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;var g=a.amount===void 0?this.defaultValues.amount:a.amount,c=a.angle===void 0?this.defaultValues.angle:a.angle,
j=a.centerX===void 0?this.defaultValues.centerX:a.centerX,l=a.centerY===void 0?this.defaultValues.centerY:a.centerY,k=a.radius===void 0?this.defaultValues.radius:a.radius,i=k*k,c=c/180*Math.PI,o=b*j,p=f*l;h.transformFilter(d,function(a,b,d){var e=a-o,f=b-p,h=e*e+f*f;h>i||h===0?(d[0]=a,d[1]=b):(a=Math.sqrt(h/i),b=Math.pow(Math.sin(Math.PI*0.5*a),-g),e*=b,f*=b,a=1-a,b=c*a*a,a=Math.sin(b),b=Math.cos(b),d[0]=o+b*e-a*f,d[1]=p+a*e+b*f)},b,f)}}
function PixelationFilter(){this.name="Pixelation";this.isDirAnimatable=!1;this.defaultValues={size:5};this.valueRanges={size:{min:1,max:50}};this.filter=function(h,e){var a=h.width,b=h.height,f=h.data;if(e===void 0)e=this.defaultValues;for(var d=e.size===void 0?this.defaultValues.size:e.size,d=parseInt(d,10),g,c,j,l=0;l<b;l+=d)for(var k=0;k<a;k+=d){var i=Math.min(d,a-k),o=Math.min(d,b-l),p=i*o,s=0,n=0,m=0;for(g=l;g<l+o;g++)for(c=k;c<k+i;c++)j=(g*a+c)*4,s+=f[j],n+=f[j+1],m+=f[j+2];for(g=l;g<l+o;g++)for(c=
k;c<k+i;c++)j=(g*a+c)*4,f[j]=s/p,f[j+1]=n/p,f[j+2]=m/p}}}
function PosterizeFilter(){this.name="Posterize";this.isDirAnimatable=!1;this.defaultValues={levels:6};this.valueRanges={levels:{min:2,max:30}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;var g=a.levels===void 0?this.defaultValues.levels:parseInt(a.levels,10);if(!(g<=1)){for(var c=[],j=0;j<256;j++)c[j]=parseInt(255*parseInt(j*g/256,10)/(g-1),10);h.tableFilter(d,c,b,f)}}}
function RGBAdjustFilter(){this.name="RGBAdjust";this.isDirAnimatable=!0;this.defaultValues={red:1,green:1,blue:1};this.valueRanges={red:{min:0,max:2},green:{min:0,max:2},blue:{min:0,max:2}};this.filter=function(h,e){var a=h.width,b=h.height,f=h.data;if(e===void 0)e=this.defaultValues;var d=e.red===void 0?this.defaultValues.red:e.red,g=e.green===void 0?this.defaultValues.green:e.green,c=e.blue===void 0?this.defaultValues.blue:e.blue;d<0&&(d=0);g<0&&(g=0);c<0&&(c=0);for(var j=0;j<b;j++)for(var l=0;l<
a;l++){var k=(j*a+l)*4;f[k]*=d;f[k+1]*=g;f[k+2]*=c}}}
function SaturationFilter(){this.name="Saturation";this.isDirAnimatable=!0;this.defaultValues={amount:1};this.valueRanges={amount:{min:0,max:2}};this.filter=function(h,e){var a=h.width,b=h.height,f=h.data;if(e===void 0)e=this.defaultValues;for(var d=e.amount===void 0?this.defaultValues.amount:e.amount,g=(1-d)*0.3+d,c=(1-d)*0.3,j=(1-d)*0.3,l=(1-d)*0.59,k=(1-d)*0.59+d,i=(1-d)*0.59,o=(1-d)*0.11,p=(1-d)*0.11,d=(1-d)*0.11+d,s=0;s<b;s++)for(var n=0;n<a;n++){var m=(s*a+n)*4,q=f[m],t=f[m+1],r=f[m+2];f[m]=
g*q+l*t+o*r;f[m+1]=c*q+k*t+p*r;f[m+2]=j*q+i*t+d*r}}}
function SawtoothRippleFilter(){this.name="Sawtooth Ripples";this.isDirAnimatable=!1;this.defaultValues={xAmplitude:5,yAmplitude:5,xWavelength:16,yWavelength:16};this.valueRanges={xAmplitude:{min:0,max:30},yAmplitude:{min:0,max:30},xWavelength:{min:1,max:50},yWavelength:{min:1,max:50}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;var g=a.xAmplitude===void 0?this.defaultValues.xAmplitude:a.xAmplitude,c=a.yAmplitude===void 0?this.defaultValues.yAmplitude:
a.yAmplitude,j=a.xWavelength===void 0?this.defaultValues.xWavelength:a.xWavelength,l=a.yWavelength===void 0?this.defaultValues.yWavelength:a.yWavelength;h.transformFilter(d,function(a,b,d){var e=a/l,f=h.mod(b/j,1),e=h.mod(e,1);d[0]=a+g*f;d[1]=b+c*e},b,f)}}
function SepiaFilter(){this.name="Sepia";this.isDirAnimatable=!0;this.defaultValues={amount:10};this.valueRanges={amount:{min:0,max:30}};new FilterUtils;this.filter=function(h,e){var a=h.width,b=h.height,f=h.data;if(e===void 0)e=this.defaultValues;var d=e.amount===void 0?this.defaultValues.amount:e.amount;d*=2.55;for(var g=0;g<b;g++)for(var c=0;c<a;c++){var j=(g*a+c)*4,l,k,i;l=k=i=f[j]*0.3+f[j+1]*0.59+f[j+2]*0.11;l+=40;k+=20;i-=d;f[j]=l;f[j+1]=k;f[j+2]=i}}}
function SharpenFilter(){this.name="Sharpen";this.isDirAnimatable=!0;this.defaultValues={};this.valueRanges={};var h=new FilterUtils;this.filter=function(e){h.convolveFilter(e.data,[0,-0.2,0,-0.2,1.8,-0.2,0,-0.2,0],e.width,e.height)}}
function SineRippleFilter(){this.name="Sine Ripples";this.isDirAnimatable=!1;this.defaultValues={xAmplitude:5,yAmplitude:5,xWavelength:16,yWavelength:16};this.valueRanges={xAmplitude:{min:0,max:30},yAmplitude:{min:0,max:30},xWavelength:{min:1,max:50},yWavelength:{min:1,max:50}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;var g=a.xAmplitude===void 0?this.defaultValues.xAmplitude:a.xAmplitude,c=a.yAmplitude===void 0?this.defaultValues.yAmplitude:
a.yAmplitude,j=a.xWavelength===void 0?this.defaultValues.xWavelength:a.xWavelength,l=a.yWavelength===void 0?this.defaultValues.yWavelength:a.yWavelength;h.transformFilter(d,function(a,b,d){var e=Math.sin(a/l);d[0]=a+g*Math.sin(b/j);d[1]=b+c*e},b,f)}}
function SolarizeFilter(){this.name="Solarize";this.isDirAnimatable=!0;this.defaultValues={};this.valueRanges={};var h=new FilterUtils;this.filter=function(e){for(var a=e.width,b=e.height,e=e.data,f=[],d=0;d<256;d++)f[d]=parseInt(255*(d/255>0.5?2*(d/255-0.5):2*(0.5-d/255)),10);h.tableFilter(e,f,a,b)}}
function SparkleFilter(){this.name="Sparkle";this.isDirAnimatable=!1;this.defaultValues={rays:50,size:25,amount:50,randomness:25,centerX:0.5,centerY:0.5};this.valueRanges={rays:{min:1,max:100},size:{min:1,max:200},amount:{min:0,max:100},randomness:{min:0,max:50},centerX:{min:0,max:1},centerY:{min:0,max:1}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;for(var g=a.rays===void 0?this.defaultValues.rays:a.rays,g=parseInt(g,10),c=
a.size===void 0?this.defaultValues.size:a.size,j=a.amount===void 0?this.defaultValues.amount:a.amount,l=a.randomness===void 0?this.defaultValues.randomness:a.randomness,k=(a.centerX===void 0?this.defaultValues.centerX:a.centerX)*b,i=(a.centerY===void 0?this.defaultValues.centerY:a.centerY)*f,o=[],p=0;p<g;p++)o[p]=c+l/100*c*h.gaussianRandom();for(l=0;l<f;l++)for(p=0;p<b;p++){var s=(l*b+p)*4,n=p-k,m=l-i,q=n*n+m*m,n=(Math.atan2(m,n)+Math.PI)/(Math.PI*2)*g,m=parseInt(n,10);n-=m;c!==0&&(m=h.linearInterpolate(n,
o[m%g],o[(m+1)%g]),q=m*m/(q+1.0E-4),q=Math.pow(q,(100-j)/50),n-=0.5,n=1-n*n,n*=q);n=h.clampPixel(n,0,1);q=h.mixColors(n,[d[s],d[s+1],d[s+2],d[s+3]],[255,255,255,255]);for(n=0;n<3;n++)d[s+n]=q[n]}}}
function SquareSmearFilter(){this.name="Square Smear";this.isDirAnimatable=!1;this.defaultValues={size:4,density:0.5,mix:0.5};this.valueRanges={size:{min:1,max:10},density:{min:0,max:1},mix:{min:0,max:1}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data,g=[],c;for(c=0;c<d.length;c++)g[c]=d[c];if(a===void 0)a=this.defaultValues;c=a.size===void 0?this.defaultValues.size:a.size;c<1&&(c=1);c=parseInt(c,10);for(var j=a.mix===void 0?this.defaultValues.mix:a.mix,l=c+1,k=
parseInt(2*(a.density===void 0?this.defaultValues.density:a.density)/30*b*f/2,10),i=0;i<k;i++)for(var o=(Math.random()*Math.pow(2,32)&2147483647)%b,p=(Math.random()*Math.pow(2,32)&2147483647)%f,s=[d[(p*b+o)*4],d[(p*b+o)*4+1],d[(p*b+o)*4+2],d[(p*b+o)*4+3]],n=o-l;n<o+l+1;n++)for(var m=p-l;m<p+l+1;m++)if(n>=0&&n<b&&m>=0&&m<f){var q=h.mixColors(j,[g[(m*b+n)*4],g[(m*b+n)*4+1],g[(m*b+n)*4+2],g[(m*b+n)*4+3]],s);for(c=0;c<3;c++)g[(m*b+n)*4+c]=q[c]}for(c=0;c<g.length;c++)d[c]=g[c]}}
function ThresholdFilter(){this.name="Black & White";this.isDirAnimatable=!0;this.defaultValues={threshold:127};this.valueRanges={threshold:{min:0,max:255}};this.filter=function(h,e){var a=h.width,b=h.height,f=h.data;if(e===void 0)e=this.defaultValues;for(var d=e.threshold===void 0?this.defaultValues.threshold:e.threshold,g=0;g<b;g++)for(var c=0;c<a;c++){var j=(g*a+c)*4,l=0;(f[j]+f[j+1]+f[j+2])/3>d&&(l=255);f[j]=f[j+1]=f[j+2]=l}}}
function TriangleRippleFilter(){this.name="Triangle Ripples";this.isDirAnimatable=!1;this.defaultValues={xAmplitude:5,yAmplitude:5,xWavelength:16,yWavelength:16};this.valueRanges={xAmplitude:{min:0,max:30},yAmplitude:{min:0,max:30},xWavelength:{min:1,max:50},yWavelength:{min:1,max:50}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;var g=a.xAmplitude===void 0?this.defaultValues.xAmplitude:a.xAmplitude,c=a.yAmplitude===void 0?this.defaultValues.yAmplitude:
a.yAmplitude,j=a.xWavelength===void 0?this.defaultValues.xWavelength:a.xWavelength,l=a.yWavelength===void 0?this.defaultValues.yWavelength:a.yWavelength;h.transformFilter(d,function(a,b,d){var e=a/l,f=h.triangle(b/j,1),e=h.triangle(e,1);d[0]=a+g*f;d[1]=b+c*e},b,f)}}
function TwirlFilter(){this.name="Twirl";this.isDirAnimatable=!1;this.defaultValues={radius:100,angle:180,centerX:0.5,centerY:0.5};this.valueRanges={radius:{min:1,max:200},angle:{min:0,max:360},centerX:{min:0,max:1},centerY:{min:0,max:1}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;var g=a.angle===void 0?this.defaultValues.angle:a.angle,c=a.centerX===void 0?this.defaultValues.centerX:a.centerX,j=a.centerY===void 0?this.defaultValues.centerY:
a.centerY,l=a.radius===void 0?this.defaultValues.radius:a.radius,k=l*l,g=g/180*Math.PI,i=b*c,o=f*j;h.transformFilter(d,function(a,b,c){var d=a-i,e=b-o,f=d*d+e*e;f>k?(c[0]=a,c[1]=b):(f=Math.sqrt(f),a=Math.atan2(e,d)+g*(l-f)/l,c[0]=i+f*Math.cos(a),c[1]=o+f*Math.sin(a))},b,f)}}
function VignetteFilter(){this.name="Vignette";this.isDirAnimatable=!1;this.defaultValues={amount:0.3};this.valueRanges={amount:{min:0,max:1}};this.filter=function(h,e){var a=h.width,b=h.height,f=h.data,d=[];if(e===void 0)e=this.defaultValues;var d=e.amount===void 0?this.defaultValues.amount:e.amount,g=document.createElement("canvas");g.width=a;g.height=b;var g=g.getContext("2d"),c;c=Math.sqrt(Math.pow(a/2,2)+Math.pow(b/2,2));g.putImageData(h,0,0);g.globalCompositeOperation="source-over";c=g.createRadialGradient(a/
2,b/2,0,a/2,b/2,c);c.addColorStop(0,"rgba(0,0,0,0)");c.addColorStop(0.5,"rgba(0,0,0,0)");c.addColorStop(1,"rgba(0,0,0,"+d+")");g.fillStyle=c;g.fillRect(0,0,a,b);d=g.getImageData(0,0,a,b).data;for(a=0;a<d.length;a++)f[a]=d[a]}}
function WaterRippleFilter(){this.name="Water Ripples";this.isDirAnimatable=!1;this.defaultValues={phase:0,radius:50,wavelength:16,amplitude:10,centerX:0.5,centerY:0.5};this.valueRanges={phase:{min:0,max:100},radius:{min:1,max:200},wavelength:{min:1,max:100},amplitude:{min:1,max:100},centerX:{min:0,max:1},centerY:{min:0,max:1}};var h=new FilterUtils;this.filter=function(e,a){var b=e.width,f=e.height,d=e.data;if(a===void 0)a=this.defaultValues;var g=a.wavelength===void 0?this.defaultValues.wavelength:
a.wavelength,c=a.amplitude===void 0?this.defaultValues.amplitude:a.amplitude,j=a.phase===void 0?this.defaultValues.phase:a.phase,l=a.radius===void 0?this.defaultValues.radius:a.radius,k=l*l,i=b*(a.centerX===void 0?this.defaultValues.centerX:a.centerX),o=f*(a.centerY===void 0?this.defaultValues.centerY:a.centerY);h.transformFilter(d,function(a,b,d){var e=a-i,f=b-o,h=e*e+f*f;if(h>k)d[0]=a,d[1]=b;else{var h=Math.sqrt(h),r=c*Math.sin(h/g*Math.PI*2-j);r*=(l-h)/l;h!==0&&(r*=g/h);d[0]=a+e*r;d[1]=b+f*r}},
b,f)}}
var JSManipulate={blur:new BlurFilter,brightness:new BrightnessFilter,bump:new BumpFilter,circlesmear:new CircleSmearFilter,contrast:new ContrastFilter,crosssmear:new CrossSmearFilter,diffusion:new DiffusionFilter,dither:new DitherFilter,edge:new EdgeFilter,emboss:new EmbossFilter,exposure:new ExposureFilter,gain:new GainFilter,gamma:new GammaFilter,grayscale:new GrayscaleFilter,hue:new HueFilter,invert:new InvertFilter,kaleidoscope:new KaleidoscopeFilter,lensdistortion:new LensDistortionFilter,linesmear:new LineSmearFilter,
maximum:new MaximumFilter,median:new MedianFilter,minimum:new MinimumFilter,noise:new NoiseFilter,oil:new OilFilter,opacity:new OpacityFilter,pinch:new PinchFilter,pixelate:new PixelationFilter,posterize:new PosterizeFilter,rgbadjust:new RGBAdjustFilter,saturation:new SaturationFilter,sawtoothripple:new SawtoothRippleFilter,sepia:new SepiaFilter,sharpen:new SharpenFilter,sineripple:new SineRippleFilter,solarize:new SolarizeFilter,sparkle:new SparkleFilter,squaresmear:new SquareSmearFilter,threshold:new ThresholdFilter,
triangleripple:new TriangleRippleFilter,twirl:new TwirlFilter,vignette:new VignetteFilter,waterripple:new WaterRippleFilter};
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//







;
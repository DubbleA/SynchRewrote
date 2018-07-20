(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function genNum(){
var randomMobile = require('random-mobile');
var ranNum = [];

    const num = (document.getElementById('numberToGen').value);

    for (let i = 0; i < num; i++) {
        let randnum = randomMobile();
        ranNum.push(randnum);
    }
    return ranNum.join('\n');
}
window.genNum = genNum
},{"random-mobile":10}],2:[function(require,module,exports){
module.exports = clamp

function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

},{}],3:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function (obj) {

  return obj == null;
};

},{}],5:[function(require,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],6:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}

},{}],7:[function(require,module,exports){
'use strict';

module.exports = 9007199254740991;

},{}],8:[function(require,module,exports){
'use strict';

var randomNatural = require('random-natural');

module.exports = function () {
  return randomNatural({ min: 2, max: 9, inspected: true }).toString()
    + randomNatural({ min: 0, max: 8, inspected: true }).toString()
    + randomNatural({ min: 0, max: 9, inspected: true }).toString();
};

},{"random-natural":11}],9:[function(require,module,exports){
'use strict';

var clamp        = require('clamp');
var toInteger    = require('to-integer');
var MAX_SAFE_INT = require('max-safe-int');
var MIN_SAFE_INT = -MAX_SAFE_INT;

function fixme(val, min, max, isMin) {

  if (typeof val !== 'number') {
    val = toInteger(val);
  }

  if (isNaN(val) || !isFinite(val)) {
    return isMin ? min : max;
  }

  return clamp(val, min, max);
}

module.exports = function (options) {

  if (options) {
    // for speed up
    if (!options.inspected) {
      options.min = fixme(options.min, MIN_SAFE_INT, MAX_SAFE_INT, true);
      options.max = fixme(options.max, MIN_SAFE_INT, MAX_SAFE_INT, false);
    }
  } else {
    options = {
      min: MIN_SAFE_INT,
      max: MAX_SAFE_INT
    };
  }

  var min = options.min;
  var max = options.max;

  // swap to variables
  // ref: http://stackoverflow.com/a/16201688
  if (min > max) {
    min = min ^ max;
    max = min ^ max;
    min = min ^ max;
  }

  return Math.round(Math.random() * (max - min)) + min;
};

module.exports.fixme = fixme;

},{"clamp":2,"max-safe-int":7,"to-integer":12}],10:[function(require,module,exports){
'use strict';

var randomNatural  = require('random-natural');
var randomAreaCode = require('random-areacode');

module.exports = function (options) {

  var areaCode = randomAreaCode();
  var exchange = randomNatural({ min: 2, max: 9, inspected: true }).toString()
    + randomNatural({ min: 0, max: 9, inspected: true }).toString()
    + randomNatural({ min: 0, max: 9, inspected: true }).toString();

  var subscriber = randomNatural({
    min: 1000,
    max: 9999,
    inspected: true
  }).toString();

  return options && options.formatted
    ? areaCode + ' ' + exchange + '-' + subscriber
    : areaCode + exchange + subscriber;
};

},{"random-areacode":8,"random-natural":11}],11:[function(require,module,exports){
'use strict';

var randomInt    = require('random-integral');
var MAX_SAFE_INT = require('max-safe-int');

module.exports = function (options) {

  if (options) {
    if (!options.inspected) {
      options.min = randomInt.fixme(options.min, 0, MAX_SAFE_INT, true);
      options.max = randomInt.fixme(options.max, 0, MAX_SAFE_INT, false);
    }
  } else {
    options = {
      min: 0,
      max: MAX_SAFE_INT
    };
  }

  options.inspected = true;

  return randomInt(options);
};

module.exports.fixme = randomInt.fixme;

},{"max-safe-int":7,"random-integral":9}],12:[function(require,module,exports){
'use strict';

var isNil      = require('is-nil');
var isSymbol   = require('is-symbol');
var isObject   = require('is-object');
var isFunction = require('is-function');

var NAN = 0 / 0;

module.exports = function (value) {

  if (isNil(value)) {
    return 0;
  }

  var type = typeof value;

  if (type === 'number') {
    return value;
  } else if (type === 'boolean') {
    return value ? 1 : 0;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  if (isObject(value)) {

    var raw = isFunction(value.valueOf) ? value.valueOf() : value;

    value = isObject(raw) ? (raw + '') : raw;
  }


  type = typeof value;
  if (type !== 'string') {
    return type === 'number' ? value : parseInt(value, 10);
  }


  // trim
  value = value.replace(/^\s+|\s+$/g, '');


  if (/^0b[01]+$/i.test(value)) {
    return parseInt(value.slice(2), 2);
  } else if (/^0o[0-7]+$/i.test(value)) {
    return parseInt(value.slice(2), 8);
  } else if (/^0x[0-9a-f]+$/i.test(value)) {
    return parseInt(value.slice(2), 16);
  }

  if(/^0b/i.test(value)||/^0o/i.test(value)||/^[\+\-]?0x/i.test(value)){
    return NAN;
  }

  return parseInt(value, 10);
};

},{"is-function":3,"is-nil":4,"is-object":5,"is-symbol":6}]},{},[1]);

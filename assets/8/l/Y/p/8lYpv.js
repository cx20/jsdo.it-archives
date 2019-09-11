(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":23}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":24}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/map"), __esModule: true };
},{"core-js/library/fn/map":25}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/number/parse-float"), __esModule: true };
},{"core-js/library/fn/number/parse-float":26}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":27}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":28}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":29}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-names"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-names":30}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":31}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":32}],11:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":33}],12:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":34}],13:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/reflect/own-keys"), __esModule: true };
},{"core-js/library/fn/reflect/own-keys":35}],14:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":36}],15:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":37}],16:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],17:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":6}],18:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getPrototypeOf = require("../core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = require("../core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};
},{"../core-js/object/get-own-property-descriptor":7,"../core-js/object/get-prototype-of":9}],19:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"../core-js/object/create":5,"../core-js/object/set-prototype-of":11,"../helpers/typeof":21}],20:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":21}],21:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":14,"../core-js/symbol/iterator":15}],22:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":141}],23:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":120,"../modules/es6.string.iterator":134,"../modules/web.dom.iterable":139}],24:[function(require,module,exports){
var core  = require('../../modules/_core')
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};
},{"../../modules/_core":52}],25:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.map');
require('../modules/es7.map.to-json');
module.exports = require('../modules/_core').Map;
},{"../modules/_core":52,"../modules/es6.map":122,"../modules/es6.object.to-string":131,"../modules/es6.string.iterator":134,"../modules/es7.map.to-json":136,"../modules/web.dom.iterable":139}],26:[function(require,module,exports){
require('../../modules/es6.number.parse-float');
module.exports = parseFloat;
},{"../../modules/es6.number.parse-float":123}],27:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":52,"../../modules/es6.object.create":124}],28:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":52,"../../modules/es6.object.define-property":125}],29:[function(require,module,exports){
require('../../modules/es6.object.get-own-property-descriptor');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};
},{"../../modules/_core":52,"../../modules/es6.object.get-own-property-descriptor":126}],30:[function(require,module,exports){
require('../../modules/es6.object.get-own-property-names');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyNames(it){
  return $Object.getOwnPropertyNames(it);
};
},{"../../modules/_core":52,"../../modules/es6.object.get-own-property-names":127}],31:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":52,"../../modules/es6.object.get-prototype-of":128}],32:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;
},{"../../modules/_core":52,"../../modules/es6.object.keys":129}],33:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":52,"../../modules/es6.object.set-prototype-of":130}],34:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/_core').Promise;
},{"../modules/_core":52,"../modules/es6.object.to-string":131,"../modules/es6.promise":132,"../modules/es6.string.iterator":134,"../modules/web.dom.iterable":139}],35:[function(require,module,exports){
require('../../modules/es6.reflect.own-keys');
module.exports = require('../../modules/_core').Reflect.ownKeys;
},{"../../modules/_core":52,"../../modules/es6.reflect.own-keys":133}],36:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":52,"../../modules/es6.object.to-string":131,"../../modules/es6.symbol":135,"../../modules/es7.symbol.async-iterator":137,"../../modules/es7.symbol.observable":138}],37:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":117,"../../modules/es6.string.iterator":134,"../../modules/web.dom.iterable":139}],38:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],39:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],40:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],41:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":71}],42:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":61}],43:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":109,"./_to-iobject":111,"./_to-length":112}],44:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = require('./_ctx')
  , IObject  = require('./_iobject')
  , toObject = require('./_to-object')
  , toLength = require('./_to-length')
  , asc      = require('./_array-species-create');
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./_array-species-create":46,"./_ctx":53,"./_iobject":68,"./_to-length":112,"./_to-object":113}],45:[function(require,module,exports){
var isObject = require('./_is-object')
  , isArray  = require('./_is-array')
  , SPECIES  = require('./_wks')('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};
},{"./_is-array":70,"./_is-object":71,"./_wks":118}],46:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};
},{"./_array-species-constructor":45}],47:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":48,"./_wks":118}],48:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],49:[function(require,module,exports){
'use strict';
var dP          = require('./_object-dp').f
  , create      = require('./_object-create')
  , redefineAll = require('./_redefine-all')
  , ctx         = require('./_ctx')
  , anInstance  = require('./_an-instance')
  , defined     = require('./_defined')
  , forOf       = require('./_for-of')
  , $iterDefine = require('./_iter-define')
  , step        = require('./_iter-step')
  , setSpecies  = require('./_set-species')
  , DESCRIPTORS = require('./_descriptors')
  , fastKey     = require('./_meta').fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./_an-instance":40,"./_ctx":53,"./_defined":54,"./_descriptors":55,"./_for-of":61,"./_iter-define":74,"./_iter-step":76,"./_meta":80,"./_object-create":82,"./_object-dp":83,"./_redefine-all":97,"./_set-species":100}],50:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof')
  , from    = require('./_array-from-iterable');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};
},{"./_array-from-iterable":42,"./_classof":47}],51:[function(require,module,exports){
'use strict';
var global         = require('./_global')
  , $export        = require('./_export')
  , meta           = require('./_meta')
  , fails          = require('./_fails')
  , hide           = require('./_hide')
  , redefineAll    = require('./_redefine-all')
  , forOf          = require('./_for-of')
  , anInstance     = require('./_an-instance')
  , isObject       = require('./_is-object')
  , setToStringTag = require('./_set-to-string-tag')
  , dP             = require('./_object-dp').f
  , each           = require('./_array-methods')(0)
  , DESCRIPTORS    = require('./_descriptors');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function(target, iterable){
      anInstance(target, C, NAME, '_c');
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        anInstance(this, C, KEY);
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)dP(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./_an-instance":40,"./_array-methods":44,"./_descriptors":55,"./_export":59,"./_fails":60,"./_for-of":61,"./_global":62,"./_hide":64,"./_is-object":71,"./_meta":80,"./_object-dp":83,"./_redefine-all":97,"./_set-to-string-tag":101}],52:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],53:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":38}],54:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],55:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":60}],56:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":62,"./_is-object":71}],57:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],58:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":88,"./_object-keys":91,"./_object-pie":92}],59:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":52,"./_ctx":53,"./_global":62,"./_hide":64}],60:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],61:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":41,"./_ctx":53,"./_is-array-iter":69,"./_iter-call":72,"./_to-length":112,"./core.get-iterator-method":119}],62:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],63:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],64:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":55,"./_object-dp":83,"./_property-desc":96}],65:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":62}],66:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":55,"./_dom-create":56,"./_fails":60}],67:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],68:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":48}],69:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":77,"./_wks":118}],70:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":48}],71:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],72:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":41}],73:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":64,"./_object-create":82,"./_property-desc":96,"./_set-to-string-tag":101,"./_wks":118}],74:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":59,"./_has":63,"./_hide":64,"./_iter-create":73,"./_iterators":77,"./_library":79,"./_object-gpo":89,"./_redefine":98,"./_set-to-string-tag":101,"./_wks":118}],75:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":118}],76:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],77:[function(require,module,exports){
module.exports = {};
},{}],78:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":91,"./_to-iobject":111}],79:[function(require,module,exports){
module.exports = true;
},{}],80:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":60,"./_has":63,"./_is-object":71,"./_object-dp":83,"./_uid":115}],81:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":48,"./_global":62,"./_task":108}],82:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":41,"./_dom-create":56,"./_enum-bug-keys":57,"./_html":65,"./_object-dps":84,"./_shared-key":102}],83:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":41,"./_descriptors":55,"./_ie8-dom-define":66,"./_to-primitive":114}],84:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":41,"./_descriptors":55,"./_object-dp":83,"./_object-keys":91}],85:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":55,"./_has":63,"./_ie8-dom-define":66,"./_object-pie":92,"./_property-desc":96,"./_to-iobject":111,"./_to-primitive":114}],86:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":87,"./_to-iobject":111}],87:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":57,"./_object-keys-internal":90}],88:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],89:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":63,"./_shared-key":102,"./_to-object":113}],90:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":43,"./_has":63,"./_shared-key":102,"./_to-iobject":111}],91:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":57,"./_object-keys-internal":90}],92:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],93:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":52,"./_export":59,"./_fails":60}],94:[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN     = require('./_object-gopn')
  , gOPS     = require('./_object-gops')
  , anObject = require('./_an-object')
  , Reflect  = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./_an-object":41,"./_global":62,"./_object-gopn":87,"./_object-gops":88}],95:[function(require,module,exports){
var $parseFloat = require('./_global').parseFloat
  , $trim       = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;
},{"./_global":62,"./_string-trim":106,"./_string-ws":107}],96:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],97:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":64}],98:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":64}],99:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":41,"./_ctx":53,"./_is-object":71,"./_object-gopd":85}],100:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , core        = require('./_core')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_core":52,"./_descriptors":55,"./_global":62,"./_object-dp":83,"./_wks":118}],101:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":63,"./_object-dp":83,"./_wks":118}],102:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":103,"./_uid":115}],103:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":62}],104:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":38,"./_an-object":41,"./_wks":118}],105:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":54,"./_to-integer":110}],106:[function(require,module,exports){
var $export = require('./_export')
  , defined = require('./_defined')
  , fails   = require('./_fails')
  , spaces  = require('./_string-ws')
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"./_defined":54,"./_export":59,"./_fails":60,"./_string-ws":107}],107:[function(require,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
},{}],108:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":48,"./_ctx":53,"./_dom-create":56,"./_global":62,"./_html":65,"./_invoke":67}],109:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":110}],110:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],111:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":54,"./_iobject":68}],112:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":110}],113:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":54}],114:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":71}],115:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],116:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":52,"./_global":62,"./_library":79,"./_object-dp":83,"./_wks-ext":117}],117:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":118}],118:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":62,"./_shared":103,"./_uid":115}],119:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":47,"./_core":52,"./_iterators":77,"./_wks":118}],120:[function(require,module,exports){
var anObject = require('./_an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./_an-object":41,"./_core":52,"./core.get-iterator-method":119}],121:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":39,"./_iter-define":74,"./_iter-step":76,"./_iterators":77,"./_to-iobject":111}],122:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.1 Map Objects
module.exports = require('./_collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./_collection":51,"./_collection-strong":49}],123:[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});
},{"./_export":59,"./_parse-float":95}],124:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":59,"./_object-create":82}],125:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":55,"./_export":59,"./_object-dp":83}],126:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":85,"./_object-sap":93,"./_to-iobject":111}],127:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function(){
  return require('./_object-gopn-ext').f;
});
},{"./_object-gopn-ext":86,"./_object-sap":93}],128:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":89,"./_object-sap":93,"./_to-object":113}],129:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":91,"./_object-sap":93,"./_to-object":113}],130:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":59,"./_set-proto":99}],131:[function(require,module,exports){

},{}],132:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":38,"./_an-instance":40,"./_classof":47,"./_core":52,"./_ctx":53,"./_export":59,"./_for-of":61,"./_global":62,"./_is-object":71,"./_iter-detect":75,"./_library":79,"./_microtask":81,"./_redefine-all":97,"./_set-species":100,"./_set-to-string-tag":101,"./_species-constructor":104,"./_task":108,"./_wks":118}],133:[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', {ownKeys: require('./_own-keys')});
},{"./_export":59,"./_own-keys":94}],134:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":74,"./_string-at":105}],135:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":41,"./_descriptors":55,"./_enum-keys":58,"./_export":59,"./_fails":60,"./_global":62,"./_has":63,"./_hide":64,"./_is-array":70,"./_keyof":78,"./_library":79,"./_meta":80,"./_object-create":82,"./_object-dp":83,"./_object-gopd":85,"./_object-gopn":87,"./_object-gopn-ext":86,"./_object-gops":88,"./_object-keys":91,"./_object-pie":92,"./_property-desc":96,"./_redefine":98,"./_set-to-string-tag":101,"./_shared":103,"./_to-iobject":111,"./_to-primitive":114,"./_uid":115,"./_wks":118,"./_wks-define":116,"./_wks-ext":117}],136:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Map', {toJSON: require('./_collection-to-json')('Map')});
},{"./_collection-to-json":50,"./_export":59}],137:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":116}],138:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":116}],139:[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":62,"./_hide":64,"./_iterators":77,"./_wks":118,"./es6.array.iterator":121}],140:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],141:[function(require,module,exports){
(function (global){
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./runtime":142}],142:[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value instanceof AwaitArgument) {
          return Promise.resolve(value.arg).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = arg;

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":140}],143:[function(require,module,exports){
(function (process,global){
'use strict';

var _parseFloat = require("babel-runtime/core-js/number/parse-float");

var _parseFloat2 = _interopRequireDefault(_parseFloat);

var _getOwnPropertyNames = require("babel-runtime/core-js/object/get-own-property-names");

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _ownKeys = require("babel-runtime/core-js/reflect/own-keys");

var _ownKeys2 = _interopRequireDefault(_ownKeys);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [_regexGLConfigs].map(_regenerator2.default.mark);

function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime = createCommonjsModule(function (module) {
    /**
     * Copyright (c) 2014, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
     * additional grant of patent rights can be found in the PATENTS file in
     * the same directory.
     */

    !function (global) {
        "use strict";

        var hasOwn = Object.prototype.hasOwnProperty;
        var undefined; // More compressible than void 0.
        var $Symbol = typeof _symbol2.default === "function" ? _symbol2.default : {};
        var iteratorSymbol = $Symbol.iterator || "@@iterator";
        var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

        var inModule = (typeof module === "undefined" ? "undefined" : (0, _typeof3.default)(module)) === "object";
        var runtime = global.regeneratorRuntime;
        if (runtime) {
            if (inModule) {
                // If regeneratorRuntime is defined globally and we're in a module,
                // make the exports object identical to regeneratorRuntime.
                module.exports = runtime;
            }
            // Don't bother evaluating the rest of this file if the runtime was
            // already defined globally.
            return;
        }

        // Define the runtime globally (as expected by generated code) as either
        // module.exports (if we're in a module) or a new, empty object.
        runtime = global.regeneratorRuntime = inModule ? module.exports : {};

        function wrap(innerFn, outerFn, self, tryLocsList) {
            // If outerFn provided, then outerFn.prototype instanceof Generator.
            var generator = (0, _create2.default)((outerFn || Generator).prototype);
            var context = new Context(tryLocsList || []);

            // The ._invoke method unifies the implementations of the .next,
            // .throw, and .return methods.
            generator._invoke = makeInvokeMethod(innerFn, self, context);

            return generator;
        }
        runtime.wrap = wrap;

        // Try/catch helper to minimize deoptimizations. Returns a completion
        // record like context.tryEntries[i].completion. This interface could
        // have been (and was previously) designed to take a closure to be
        // invoked without arguments, but in all the cases we care about we
        // already have an existing method we want to call, so there's no need
        // to create a new function object. We can even get away with assuming
        // the method takes exactly one argument, since that happens to be true
        // in every case, so we don't have to touch the arguments object. The
        // only additional allocation required is the completion record, which
        // has a stable shape and so hopefully should be cheap to allocate.
        function tryCatch(fn, obj, arg) {
            try {
                return { type: "normal", arg: fn.call(obj, arg) };
            } catch (err) {
                return { type: "throw", arg: err };
            }
        }

        var GenStateSuspendedStart = "suspendedStart";
        var GenStateSuspendedYield = "suspendedYield";
        var GenStateExecuting = "executing";
        var GenStateCompleted = "completed";

        // Returning this object from the innerFn has the same effect as
        // breaking out of the dispatch switch statement.
        var ContinueSentinel = {};

        // Dummy constructor functions that we use as the .constructor and
        // .constructor.prototype properties for functions that return Generator
        // objects. For full spec compliance, you may wish to configure your
        // minifier not to mangle the names of these two functions.
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}

        var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
        GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
        GeneratorFunctionPrototype.constructor = GeneratorFunction;
        GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

        // Helper for defining the .next, .throw, and .return methods of the
        // Iterator interface in terms of a single ._invoke method.
        function defineIteratorMethods(prototype) {
            ["next", "throw", "return"].forEach(function (method) {
                prototype[method] = function (arg) {
                    return this._invoke(method, arg);
                };
            });
        }

        runtime.isGeneratorFunction = function (genFun) {
            var ctor = typeof genFun === "function" && genFun.constructor;
            return ctor ? ctor === GeneratorFunction ||
            // For the native GeneratorFunction constructor, the best we can
            // do is to check its .name property.
            (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
        };

        runtime.mark = function (genFun) {
            if (_setPrototypeOf2.default) {
                (0, _setPrototypeOf2.default)(genFun, GeneratorFunctionPrototype);
            } else {
                genFun.__proto__ = GeneratorFunctionPrototype;
                if (!(toStringTagSymbol in genFun)) {
                    genFun[toStringTagSymbol] = "GeneratorFunction";
                }
            }
            genFun.prototype = (0, _create2.default)(Gp);
            return genFun;
        };

        // Within the body of any async function, `await x` is transformed to
        // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
        // `value instanceof AwaitArgument` to determine if the yielded value is
        // meant to be awaited. Some may consider the name of this method too
        // cutesy, but they are curmudgeons.
        runtime.awrap = function (arg) {
            return new AwaitArgument(arg);
        };

        function AwaitArgument(arg) {
            this.arg = arg;
        }

        function AsyncIterator(generator) {
            function invoke(method, arg, resolve, reject) {
                var record = tryCatch(generator[method], generator, arg);
                if (record.type === "throw") {
                    reject(record.arg);
                } else {
                    var result = record.arg;
                    var value = result.value;
                    if (value instanceof AwaitArgument) {
                        return _promise2.default.resolve(value.arg).then(function (value) {
                            invoke("next", value, resolve, reject);
                        }, function (err) {
                            invoke("throw", err, resolve, reject);
                        });
                    }

                    return _promise2.default.resolve(value).then(function (unwrapped) {
                        // When a yielded Promise is resolved, its final value becomes
                        // the .value of the Promise<{value,done}> result for the
                        // current iteration. If the Promise is rejected, however, the
                        // result for this iteration will be rejected with the same
                        // reason. Note that rejections of yielded Promises are not
                        // thrown back into the generator function, as is the case
                        // when an awaited Promise is rejected. This difference in
                        // behavior between yield and await is important, because it
                        // allows the consumer to decide what to do with the yielded
                        // rejection (swallow it and continue, manually .throw it back
                        // into the generator, abandon iteration, whatever). With
                        // await, by contrast, there is no opportunity to examine the
                        // rejection reason outside the generator function, so the
                        // only option is to throw it from the await expression, and
                        // let the generator function handle the exception.
                        result.value = unwrapped;
                        resolve(result);
                    }, reject);
                }
            }

            if ((typeof process === "undefined" ? "undefined" : (0, _typeof3.default)(process)) === "object" && process.domain) {
                invoke = process.domain.bind(invoke);
            }

            var previousPromise;

            function enqueue(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new _promise2.default(function (resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }

                return previousPromise =
                // If enqueue has been called before, then we want to wait until
                // all previous Promises have been resolved before calling invoke,
                // so that results are always delivered in the correct order. If
                // enqueue has not been called before, then it is important to
                // call invoke immediately, without waiting on a callback to fire,
                // so that the async generator function has the opportunity to do
                // any necessary setup in a predictable way. This predictability
                // is why the Promise constructor synchronously invokes its
                // executor callback, and why async functions synchronously
                // execute code before the first await. Since we implement simple
                // async functions in terms of async generators, it is especially
                // important to get this right, even though it requires care.
                previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
                // Avoid propagating failures to Promises returned by later
                // invocations of the iterator.
                callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }

            // Define the unified helper method that is used to implement .next,
            // .throw, and .return (see defineIteratorMethods).
            this._invoke = enqueue;
        }

        defineIteratorMethods(AsyncIterator.prototype);

        // Note that simple async functions are implemented on top of
        // AsyncIterator objects; they just return a Promise for the value of
        // the final result produced by the iterator.
        runtime.async = function (innerFn, outerFn, self, tryLocsList) {
            var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

            return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
            : iter.next().then(function (result) {
                return result.done ? result.value : iter.next();
            });
        };

        function makeInvokeMethod(innerFn, self, context) {
            var state = GenStateSuspendedStart;

            return function invoke(method, arg) {
                if (state === GenStateExecuting) {
                    throw new Error("Generator is already running");
                }

                if (state === GenStateCompleted) {
                    if (method === "throw") {
                        throw arg;
                    }

                    // Be forgiving, per 25.3.3.3.3 of the spec:
                    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                    return doneResult();
                }

                while (true) {
                    var delegate = context.delegate;
                    if (delegate) {
                        if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
                            // A return or throw (when the delegate iterator has no throw
                            // method) always terminates the yield* loop.
                            context.delegate = null;

                            // If the delegate iterator has a return method, give it a
                            // chance to clean up.
                            var returnMethod = delegate.iterator["return"];
                            if (returnMethod) {
                                var record = tryCatch(returnMethod, delegate.iterator, arg);
                                if (record.type === "throw") {
                                    // If the return method threw an exception, let that
                                    // exception prevail over the original return or throw.
                                    method = "throw";
                                    arg = record.arg;
                                    continue;
                                }
                            }

                            if (method === "return") {
                                // Continue with the outer return, now that the delegate
                                // iterator has been terminated.
                                continue;
                            }
                        }

                        var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

                        if (record.type === "throw") {
                            context.delegate = null;

                            // Like returning generator.throw(uncaught), but without the
                            // overhead of an extra function call.
                            method = "throw";
                            arg = record.arg;
                            continue;
                        }

                        // Delegate generator ran and handled its own exceptions so
                        // regardless of what the method was, we continue as if it is
                        // "next" with an undefined arg.
                        method = "next";
                        arg = undefined;

                        var info = record.arg;
                        if (info.done) {
                            context[delegate.resultName] = info.value;
                            context.next = delegate.nextLoc;
                        } else {
                            state = GenStateSuspendedYield;
                            return info;
                        }

                        context.delegate = null;
                    }

                    if (method === "next") {
                        // Setting context._sent for legacy support of Babel's
                        // function.sent implementation.
                        context.sent = context._sent = arg;
                    } else if (method === "throw") {
                        if (state === GenStateSuspendedStart) {
                            state = GenStateCompleted;
                            throw arg;
                        }

                        if (context.dispatchException(arg)) {
                            // If the dispatched exception was caught by a catch block,
                            // then let that catch block handle the exception normally.
                            method = "next";
                            arg = undefined;
                        }
                    } else if (method === "return") {
                        context.abrupt("return", arg);
                    }

                    state = GenStateExecuting;

                    var record = tryCatch(innerFn, self, context);
                    if (record.type === "normal") {
                        // If an exception is thrown from innerFn, we leave state ===
                        // GenStateExecuting and loop back for another invocation.
                        state = context.done ? GenStateCompleted : GenStateSuspendedYield;

                        var info = {
                            value: record.arg,
                            done: context.done
                        };

                        if (record.arg === ContinueSentinel) {
                            if (context.delegate && method === "next") {
                                // Deliberately forget the last sent value so that we don't
                                // accidentally pass it on to the delegate.
                                arg = undefined;
                            }
                        } else {
                            return info;
                        }
                    } else if (record.type === "throw") {
                        state = GenStateCompleted;
                        // Dispatch the exception by looping back around to the
                        // context.dispatchException(arg) call above.
                        method = "throw";
                        arg = record.arg;
                    }
                }
            };
        }

        // Define Generator.prototype.{next,throw,return} in terms of the
        // unified ._invoke helper method.
        defineIteratorMethods(Gp);

        Gp[iteratorSymbol] = function () {
            return this;
        };

        Gp[toStringTagSymbol] = "Generator";

        Gp.toString = function () {
            return "[object Generator]";
        };

        function pushTryEntry(locs) {
            var entry = { tryLoc: locs[0] };

            if (1 in locs) {
                entry.catchLoc = locs[1];
            }

            if (2 in locs) {
                entry.finallyLoc = locs[2];
                entry.afterLoc = locs[3];
            }

            this.tryEntries.push(entry);
        }

        function resetTryEntry(entry) {
            var record = entry.completion || {};
            record.type = "normal";
            delete record.arg;
            entry.completion = record;
        }

        function Context(tryLocsList) {
            // The root entry object (effectively a try statement without a catch
            // or a finally block) gives us a place to store values thrown from
            // locations where there is no enclosing try statement.
            this.tryEntries = [{ tryLoc: "root" }];
            tryLocsList.forEach(pushTryEntry, this);
            this.reset(true);
        }

        runtime.keys = function (object) {
            var keys = [];
            for (var key in object) {
                keys.push(key);
            }
            keys.reverse();

            // Rather than returning an object with a next method, we keep
            // things simple and return the next function itself.
            return function next() {
                while (keys.length) {
                    var key = keys.pop();
                    if (key in object) {
                        next.value = key;
                        next.done = false;
                        return next;
                    }
                }

                // To avoid creating an additional object, we just hang the .value
                // and .done properties off the next function object itself. This
                // also ensures that the minifier will not anonymize the function.
                next.done = true;
                return next;
            };
        };

        function values(iterable) {
            if (iterable) {
                var iteratorMethod = iterable[iteratorSymbol];
                if (iteratorMethod) {
                    return iteratorMethod.call(iterable);
                }

                if (typeof iterable.next === "function") {
                    return iterable;
                }

                if (!isNaN(iterable.length)) {
                    var i = -1,
                        next = function next() {
                        while (++i < iterable.length) {
                            if (hasOwn.call(iterable, i)) {
                                next.value = iterable[i];
                                next.done = false;
                                return next;
                            }
                        }

                        next.value = undefined;
                        next.done = true;

                        return next;
                    };

                    return next.next = next;
                }
            }

            // Return an iterator with no values.
            return { next: doneResult };
        }
        runtime.values = values;

        function doneResult() {
            return { value: undefined, done: true };
        }

        Context.prototype = {
            constructor: Context,

            reset: function reset(skipTempReset) {
                this.prev = 0;
                this.next = 0;
                // Resetting context._sent for legacy support of Babel's
                // function.sent implementation.
                this.sent = this._sent = undefined;
                this.done = false;
                this.delegate = null;

                this.tryEntries.forEach(resetTryEntry);

                if (!skipTempReset) {
                    for (var name in this) {
                        // Not sure about the optimal order of these conditions:
                        if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                            this[name] = undefined;
                        }
                    }
                }
            },

            stop: function stop() {
                this.done = true;

                var rootEntry = this.tryEntries[0];
                var rootRecord = rootEntry.completion;
                if (rootRecord.type === "throw") {
                    throw rootRecord.arg;
                }

                return this.rval;
            },

            dispatchException: function dispatchException(exception) {
                if (this.done) {
                    throw exception;
                }

                var context = this;
                function handle(loc, caught) {
                    record.type = "throw";
                    record.arg = exception;
                    context.next = loc;
                    return !!caught;
                }

                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    var record = entry.completion;

                    if (entry.tryLoc === "root") {
                        // Exception thrown outside of any try block that could handle
                        // it, so set the completion value of the entire function to
                        // throw the exception.
                        return handle("end");
                    }

                    if (entry.tryLoc <= this.prev) {
                        var hasCatch = hasOwn.call(entry, "catchLoc");
                        var hasFinally = hasOwn.call(entry, "finallyLoc");

                        if (hasCatch && hasFinally) {
                            if (this.prev < entry.catchLoc) {
                                return handle(entry.catchLoc, true);
                            } else if (this.prev < entry.finallyLoc) {
                                return handle(entry.finallyLoc);
                            }
                        } else if (hasCatch) {
                            if (this.prev < entry.catchLoc) {
                                return handle(entry.catchLoc, true);
                            }
                        } else if (hasFinally) {
                            if (this.prev < entry.finallyLoc) {
                                return handle(entry.finallyLoc);
                            }
                        } else {
                            throw new Error("try statement without catch or finally");
                        }
                    }
                }
            },

            abrupt: function abrupt(type, arg) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                        var finallyEntry = entry;
                        break;
                    }
                }

                if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
                    // Ignore the finally entry if control is not jumping to a
                    // location outside the try/catch block.
                    finallyEntry = null;
                }

                var record = finallyEntry ? finallyEntry.completion : {};
                record.type = type;
                record.arg = arg;

                if (finallyEntry) {
                    this.next = finallyEntry.finallyLoc;
                } else {
                    this.complete(record);
                }

                return ContinueSentinel;
            },

            complete: function complete(record, afterLoc) {
                if (record.type === "throw") {
                    throw record.arg;
                }

                if (record.type === "break" || record.type === "continue") {
                    this.next = record.arg;
                } else if (record.type === "return") {
                    this.rval = record.arg;
                    this.next = "end";
                } else if (record.type === "normal" && afterLoc) {
                    this.next = afterLoc;
                }
            },

            finish: function finish(finallyLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    if (entry.finallyLoc === finallyLoc) {
                        this.complete(entry.completion, entry.afterLoc);
                        resetTryEntry(entry);
                        return ContinueSentinel;
                    }
                }
            },

            "catch": function _catch(tryLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i];
                    if (entry.tryLoc === tryLoc) {
                        var record = entry.completion;
                        if (record.type === "throw") {
                            var thrown = record.arg;
                            resetTryEntry(entry);
                        }
                        return thrown;
                    }
                }

                // The context.catch method must only be called with a location
                // argument that corresponds to a known catch block.
                throw new Error("illegal catch attempt");
            },

            delegateYield: function delegateYield(iterable, resultName, nextLoc) {
                this.delegate = {
                    iterator: values(iterable),
                    resultName: resultName,
                    nextLoc: nextLoc
                };

                return ContinueSentinel;
            }
        };
    }(
    // Among the various tricks for obtaining a reference to the global
    // object, this seems to be the most reliable technique that does not
    // use indirect eval (which violates Content Security Policy).
    (typeof global === "undefined" ? "undefined" : (0, _typeof3.default)(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : (0, _typeof3.default)(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : (0, _typeof3.default)(self)) === "object" ? self : this);
});

var index = createCommonjsModule(function (module, exports) {
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = _promise2.default))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator.throw(value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : new P(function (resolve) {
                    resolve(result.value);
                }).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments)).next());
        });
    }

    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = __awaiter;
    }

    exports.__awaiter = __awaiter;
});

window.__awaiter = index;

var DefaultMacro = {
    "GRIMOIRE": null,
    "WEBGL_VERSION": "1"
};

/**
 * Manage macros which would be appended head of all shaders grimoire.js would load.
 */

var MacroRegistory = function () {
    function MacroRegistory() {
        (0, _classCallCheck3.default)(this, MacroRegistory);

        /**
         * Macro string which generated by registored macro.
         * @type {string}
         */
        this.macroString = "";
        /**
         * The map of macro.
         */
        this._macro = {};
        /**
         * Handlers functions for changing macro.
         */
        this._observers = [];
        for (var key in DefaultMacro) {
            this.setValue(key, DefaultMacro[key]);
        }
    }
    /**
     * Set the value of macros.
     * @param {string}    key [description]
     * @param {string =   null}        val [description]
     */


    (0, _createClass3.default)(MacroRegistory, [{
        key: "setValue",
        value: function setValue(key) {
            var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (this._macro[key] !== val) {
                this._macro[key] = val;
                this.macroString = this._getMacroString();
                this._notifyMacroChanged();
            }
        }
        /**
         * Get the value of macro.
         * @param  {string} key [description]
         * @return {string}     [description]
         */

    }, {
        key: "getValue",
        value: function getValue(key) {
            return this._macro[key];
        }
    }, {
        key: "addObserver",
        value: function addObserver(handler) {
            this._observers.push(handler);
        }
    }, {
        key: "removeObserver",
        value: function removeObserver(handler) {
            for (var i = 0; i < this._observers.length; i++) {
                if (this._observers[i] === handler) {
                    this._observers.splice(i, 1);
                }
            }
        }
    }, {
        key: "_getMacroString",
        value: function _getMacroString() {
            var result = "";
            for (var key in this._macro) {
                result += this._genSingleMacroString(key, this._macro[key]);
            }
            return result;
        }
    }, {
        key: "_notifyMacroChanged",
        value: function _notifyMacroChanged() {
            for (var i = 0; i < this._observers.length; i++) {
                this._observers[i]();
            }
        }
        /**
         * Generate macro string for single macro
         * @param  {string} key [description]
         * @param  {string} val [description]
         * @return {string}     [description]
         */

    }, {
        key: "_genSingleMacroString",
        value: function _genSingleMacroString(key, val) {
            if (val === void 0) {
                throw new Error("Macro value of " + key + " can't be undefined");
            }
            if (val === null) {
                return "#define " + key + "\n";
            } else {
                return "#define " + key + " " + val + "\n";
            }
        }
    }]);
    return MacroRegistory;
}();

var Pass = function () {
    function Pass(program, attributes, beforeDraw) {
        (0, _classCallCheck3.default)(this, Pass);

        this.program = program;
        this.attributes = attributes;
        this.beforeDraw = beforeDraw;
    }

    (0, _createClass3.default)(Pass, [{
        key: "draw",
        value: function draw(arg) {
            this.program.use();
            for (var i = 0; i < this.beforeDraw.length; i++) {
                this.beforeDraw[i](this, arg);
            }
            arg.geometry.draw(arg.targetBuffer, this.attributes, this.program, arg.drawCount, arg.drawOffset);
        }
    }]);
    return Pass;
}();

var SORTPass = function (_Pass) {
    (0, _inherits3.default)(SORTPass, _Pass);

    function SORTPass(program, attributes, beforeDraw, programInfo) {
        (0, _classCallCheck3.default)(this, SORTPass);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SORTPass.__proto__ || (0, _getPrototypeOf2.default)(SORTPass)).call(this, program, attributes, beforeDraw));

        _this.programInfo = programInfo;
        return _this;
    }

    return SORTPass;
}(Pass);

var UniformProxy = function () {
    function UniformProxy(program) {
        (0, _classCallCheck3.default)(this, UniformProxy);

        this.program = program;
        this._currentTextureRegister = 0;
        this._gl = program.gl;
    }

    (0, _createClass3.default)(UniformProxy, [{
        key: "uniformBool",
        value: function uniformBool(variableName, val) {
            var _this2 = this;

            this._pass(variableName, function (l) {
                return _this2._gl.uniform1i(l, val ? 1 : 0);
            });
        }
    }, {
        key: "uniformMatrix",
        value: function uniformMatrix(variableName, mat) {
            var _this3 = this;

            this._pass(variableName, function (l) {
                return _this3._gl.uniformMatrix4fv(l, false, mat.rawElements);
            });
        }
    }, {
        key: "uniformFloat",
        value: function uniformFloat(variableName, val) {
            var _this4 = this;

            this._pass(variableName, function (l) {
                return _this4._gl.uniform1f(l, val);
            });
        }
    }, {
        key: "uniformFloatArray",
        value: function uniformFloatArray(variableName, val) {
            var _this5 = this;

            this._pass(variableName, function (l) {
                return _this5._gl.uniform1fv(l, val);
            });
        }
    }, {
        key: "uniformInt",
        value: function uniformInt(variableName, val) {
            var _this6 = this;

            this._pass(variableName, function (l) {
                return _this6._gl.uniform1i(l, val);
            });
        }
    }, {
        key: "uniformVector2",
        value: function uniformVector2(variableName, val) {
            var _this7 = this;

            this._pass(variableName, function (l) {
                return _this7._gl.uniform2f(l, val.X, val.Y);
            });
        }
    }, {
        key: "uniformVector2Array",
        value: function uniformVector2Array(variableName, val) {
            var _this8 = this;

            this._pass(variableName, function (l) {
                return _this8._gl.uniform2fv(l, val);
            });
        }
    }, {
        key: "uniformVector3",
        value: function uniformVector3(variableName, val) {
            var _this9 = this;

            this._pass(variableName, function (l) {
                return _this9._gl.uniform3f(l, val.X, val.Y, val.Z);
            });
        }
    }, {
        key: "uniformVector3Array",
        value: function uniformVector3Array(variableName, val) {
            var _this10 = this;

            this._pass(variableName, function (l) {
                return _this10._gl.uniform3fv(l, val);
            });
        }
    }, {
        key: "uniformColor3",
        value: function uniformColor3(variableName, val) {
            var _this11 = this;

            this._pass(variableName, function (l) {
                return _this11._gl.uniform3f(l, val.R, val.G, val.B);
            });
        }
    }, {
        key: "uniformVector4",
        value: function uniformVector4(variableName, val) {
            var _this12 = this;

            this._pass(variableName, function (l) {
                return _this12._gl.uniform4f(l, val.X, val.Y, val.Z, val.W);
            });
        }
    }, {
        key: "uniformVector4Array",
        value: function uniformVector4Array(variableName, val) {
            var _this13 = this;

            this._pass(variableName, function (l) {
                return _this13._gl.uniform4fv(l, val);
            });
        }
    }, {
        key: "uniformColor4",
        value: function uniformColor4(variableName, val) {
            var _this14 = this;

            this._pass(variableName, function (l) {
                return _this14._gl.uniform4f(l, val.R, val.G, val.B, val.A);
            });
        }
    }, {
        key: "uniformTexture2D",
        value: function uniformTexture2D(variableName, val) {
            if (val.valid) {
                val.register(this._currentTextureRegister);
                this.uniformInt(variableName, this._currentTextureRegister);
                this._currentTextureRegister++;
            } else {
                console.warn("The texture assigned to '" + variableName + "' is not valid.");
            }
        }
    }, {
        key: "onUse",
        value: function onUse() {
            this._currentTextureRegister = 0;
        }
    }, {
        key: "_pass",
        value: function _pass(variableName, act) {
            var location = this.program.findUniformLocation(variableName);
            if (location) {
                act(location);
            }
        }
    }]);
    return UniformProxy;
}();

/**
 * Most based object for any Grimoire.js related classes.
 * @type {[type]}
 */


var IDObject = function () {
    function IDObject() {
        (0, _classCallCheck3.default)(this, IDObject);

        this.id = IDObject.getUniqueRandom(10);
    }
    /**
     * Generate random string
     * @param  {number} length length of random string
     * @return {string}        generated string
     */


    (0, _createClass3.default)(IDObject, [{
        key: "toString",

        /**
         * Obtain stringfied object.
         * If this method was not overridden, this method return class name.
         * @return {string} stringfied object
         */
        value: function toString() {
            return this.getTypeName();
        }
        /**
         * Obtain class name
         * @return {string} Class name of the instance.
         */

    }, {
        key: "getTypeName",
        value: function getTypeName() {
            var funcNameRegex = /function (.{1,})\(/;
            var result = funcNameRegex.exec(this.constructor.toString());
            return result && result.length > 1 ? result[1] : "";
        }
    }], [{
        key: "getUniqueRandom",
        value: function getUniqueRandom(length) {
            return Math.random().toString(36).slice(-length);
        }
    }]);
    return IDObject;
}();

var ResourceBase = function (_IDObject) {
    (0, _inherits3.default)(ResourceBase, _IDObject);

    function ResourceBase(gl) {
        (0, _classCallCheck3.default)(this, ResourceBase);

        var _this15 = (0, _possibleConstructorReturn3.default)(this, (ResourceBase.__proto__ || (0, _getPrototypeOf2.default)(ResourceBase)).call(this));

        _this15.gl = gl;
        _this15.destroyed = false;
        _this15.valid = false;
        return _this15;
    }

    (0, _createClass3.default)(ResourceBase, [{
        key: "destroy",
        value: function destroy() {
            this.destroyed = true;
        }
    }, {
        key: "valid",
        get: function get() {
            return this._valid;
        },
        set: function set(val) {
            var _this16 = this;

            if (this._valid === val) {
                return;
            }
            this._valid = val;
            if (this._valid) {
                this._validResolve(this);
            } else {
                this.validPromise = new _promise2.default(function (resolve) {
                    _this16._validResolve = resolve;
                });
            }
        }
    }]);
    return ResourceBase;
}(IDObject);

var Program = function (_ResourceBase) {
    (0, _inherits3.default)(Program, _ResourceBase);

    function Program(gl) {
        (0, _classCallCheck3.default)(this, Program);

        var _this17 = (0, _possibleConstructorReturn3.default)(this, (Program.__proto__ || (0, _getPrototypeOf2.default)(Program)).call(this, gl));

        _this17._uniformLocations = {};
        _this17._attributeLocations = {};
        _this17.uniforms = new UniformProxy(_this17);
        _this17.program = gl.createProgram();
        return _this17;
    }

    (0, _createClass3.default)(Program, [{
        key: "update",
        value: function update(shaders) {
            var _this18 = this;

            if (this.valid) {
                // detach all attached shaders previously
                var preciousShaders = this.gl.getAttachedShaders(this.program);
                preciousShaders.forEach(function (s) {
                    return _this18.gl.detachShader(_this18.program, s);
                });
            }
            shaders.forEach(function (shader) {
                _this18.gl.attachShader(_this18.program, shader.shader);
            });
            this.gl.linkProgram(this.program);
            if (!this.gl.getProgramParameter(this.program, WebGLRenderingContext.LINK_STATUS)) {
                var errorLog = this.gl.getProgramInfoLog(this.program);
                throw new Error("LINK FAILED\n" + errorLog);
            }
            this.valid = true;
        }
    }, {
        key: "use",
        value: function use() {
            this.gl.useProgram(this.program);
            this.uniforms.onUse();
        }
    }, {
        key: "destroy",
        value: function destroy() {
            (0, _get3.default)(Program.prototype.__proto__ || (0, _getPrototypeOf2.default)(Program.prototype), "destroy", this).call(this);
            this.gl.deleteProgram(this.program);
        }
    }, {
        key: "findAttributeLocation",
        value: function findAttributeLocation(variableName) {
            if (typeof this._attributeLocations[variableName] === "undefined") {
                this._attributeLocations[variableName] = this.gl.getAttribLocation(this.program, variableName);
                this.gl.enableVertexAttribArray(this._attributeLocations[variableName]);
                return this._attributeLocations[variableName];
            } else {
                return this._attributeLocations[variableName];
            }
        }
    }, {
        key: "findUniformLocation",
        value: function findUniformLocation(variableName) {
            if (typeof this._uniformLocations[variableName] === "undefined") {
                return this._uniformLocations[variableName] = this.gl.getUniformLocation(this.program, variableName);
            } else {
                return this._uniformLocations[variableName];
            }
        }
    }]);
    return Program;
}(ResourceBase);

var Shader = function (_ResourceBase2) {
    (0, _inherits3.default)(Shader, _ResourceBase2);

    function Shader(gl, type, sourceCode) {
        (0, _classCallCheck3.default)(this, Shader);

        var _this19 = (0, _possibleConstructorReturn3.default)(this, (Shader.__proto__ || (0, _getPrototypeOf2.default)(Shader)).call(this, gl));

        _this19.type = type;
        _this19.sourceCode = sourceCode;
        _this19.shader = gl.createShader(type);
        if (sourceCode) {
            _this19.update(sourceCode);
        }
        return _this19;
    }

    (0, _createClass3.default)(Shader, [{
        key: "update",
        value: function update(source) {
            this.gl.shaderSource(this.shader, source);
            this.gl.compileShader(this.shader);
            if (!this.gl.getShaderParameter(this.shader, WebGLRenderingContext.COMPILE_STATUS)) {
                throw new Error("Compiling shader failed.\nSourceCode:\n" + source + "\n\nErrorCode:" + this.gl.getShaderInfoLog(this.shader));
            }
            this.sourceCode = source;
            this.valid = true;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            (0, _get3.default)(Shader.prototype.__proto__ || (0, _getPrototypeOf2.default)(Shader.prototype), "destroy", this).call(this);
            this.gl.deleteShader(this.shader);
        }
    }]);
    return Shader;
}(ResourceBase);

var GLSLUtil = function () {
    function GLSLUtil() {
        (0, _classCallCheck3.default)(this, GLSLUtil);
    }

    (0, _createClass3.default)(GLSLUtil, null, [{
        key: "isPrimitive",
        value: function isPrimitive(type) {
            return GLSLUtil._primitives.indexOf(type) >= 0;
        }
    }]);
    return GLSLUtil;
}();

GLSLUtil._primitives = ["float", "bool", "int", "vec2", "vec3", "vec4", "ivec2", "ivec3", "ivec4", "bvec2", "bvec3", "bvec4", "mat2", "mat3", "mat4", "sampler1D", "sampler2D", "sampler3D", "samplerCube", "sampler1DShadow", "sampler2DShadow"];

var VectorBase = function () {
    function VectorBase() {
        (0, _classCallCheck3.default)(this, VectorBase);

        this._magnitudeSquaredCache = -1;
        this._magnitudeCache = -1;
    }

    (0, _createClass3.default)(VectorBase, [{
        key: "magnitude",
        get: function get() {
            if (this._magnitudeCache < 0) {
                this._magnitudeCache = Math.sqrt(this.sqrMagnitude);
            }
            return this._magnitudeCache;
        }
    }, {
        key: "ElementCount",
        get: function get() {
            return 0;
        }
    }, {
        key: "sqrMagnitude",
        get: function get() {
            if (this._magnitudeSquaredCache < 0) {
                var sum = 0;
                var r = this.rawElements;
                for (var i = 0; i < this.ElementCount; i++) {
                    sum += r[i] * r[i];
                }
                this._magnitudeSquaredCache = sum;
            }
            return this._magnitudeSquaredCache;
        }
    }], [{
        key: "__elementEquals",
        value: function __elementEquals(v1, v2) {
            if (v1.ElementCount !== v2.ElementCount) {
                return false;
            }
            for (var i = 0; i < v1.ElementCount; i++) {
                if (v1.rawElements[i] !== v2.rawElements[i]) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: "__nearlyElementEquals",
        value: function __nearlyElementEquals(v1, v2) {
            if (v1.ElementCount !== v2.ElementCount) {
                return false;
            }
            var error = 0.01;
            for (var i = 0; i < v1.ElementCount; i++) {
                if (Math.abs(v1.rawElements[i] - v2.rawElements[i]) > error) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: "__fromGenerationFunction",
        value: function __fromGenerationFunction(v1, v2, gen) {
            var f = new Float32Array(v1.ElementCount);
            for (var i = 0; i < f.length; i++) {
                f[i] = gen(i, v1, v2);
            }
            return f;
        }
    }, {
        key: "__parse",
        value: function __parse(str) {
            var checkRegex = /(-?)([\d,E\+\-\.]+)?(n)?\(([-\d,E\+\.\s]+)\)/g;
            var matches = checkRegex.exec(str);
            if (matches) {
                if (!matches[4]) {
                    throw new Error("The specified string '" + str + "' is not containing braced vector.");
                }
                return {
                    needNormalize: matches[3] === "n",
                    needNegate: matches[1] === "-",
                    coefficient: parseFloat(matches[2]),
                    elements: VectorBase._parseRawVector(matches[4])
                };
            } else {
                // Assume this is simplified format.
                return {
                    needNormalize: false,
                    needNegate: false,
                    elements: VectorBase._parseRawVector(str),
                    coefficient: undefined
                };
            }
        }
    }, {
        key: "_parseRawVector",
        value: function _parseRawVector(str) {
            var splitted = str.split(",");
            var result = new Array(splitted.length);
            for (var i = 0; i < splitted.length; i++) {
                result[i] = parseFloat(splitted[i]);
                if (isNaN(result[i])) {
                    throw new Error("Unexpected vector string " + str);
                }
            }
            return result;
        }
    }]);
    return VectorBase;
}();

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * @class Common utilities
 * @name glMatrix
 */


var glMatrix$2 = {};

// Configuration Constants
glMatrix$2.EPSILON = 0.000001;
glMatrix$2.ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
glMatrix$2.RANDOM = Math.random;
glMatrix$2.ENABLE_SIMD = false;

// Capability detection
var global$1 = new Function('return this')();
glMatrix$2.SIMD_AVAILABLE = glMatrix$2.ARRAY_TYPE === global$1.Float32Array && 'SIMD' in global$1;
glMatrix$2.USE_SIMD = glMatrix$2.ENABLE_SIMD && glMatrix$2.SIMD_AVAILABLE;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix$2.setMatrixArrayType = function (type) {
    glMatrix$2.ARRAY_TYPE = type;
};

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} a Angle in Degrees
*/
glMatrix$2.toRadian = function (a) {
    return a * degree;
};

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less 
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 * 
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
glMatrix$2.equals = function (a, b) {
    return Math.abs(a - b) <= glMatrix$2.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
};

var common = glMatrix$2;

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix$3 = common;

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix$4 = common;

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix$5 = common;

/**
 * @class 3x3 Matrix
 * @name mat3
 */
var mat3$1 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3$1.create = function () {
    var out = new glMatrix$5.ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3$1.fromMat4 = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3$1.clone = function (a) {
    var out = new glMatrix$5.ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3$1.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
mat3$1.fromValues = function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new glMatrix$5.ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
mat3$1.set = function (out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3$1.identity = function (out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3$1.transpose = function (out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1],
            a02 = a[2],
            a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }

    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3$1.invert = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,


    // Calculate the determinant
    det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3$1.adjoint = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8];

    out[0] = a11 * a22 - a12 * a21;
    out[1] = a02 * a21 - a01 * a22;
    out[2] = a01 * a12 - a02 * a11;
    out[3] = a12 * a20 - a10 * a22;
    out[4] = a00 * a22 - a02 * a20;
    out[5] = a02 * a10 - a00 * a12;
    out[6] = a10 * a21 - a11 * a20;
    out[7] = a01 * a20 - a00 * a21;
    out[8] = a00 * a11 - a01 * a10;
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3$1.determinant = function (a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3$1.multiply = function (out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        b00 = b[0],
        b01 = b[1],
        b02 = b[2],
        b10 = b[3],
        b11 = b[4],
        b12 = b[5],
        b20 = b[6],
        b21 = b[7],
        b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3$1.mul = mat3$1.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3$1.translate = function (out, a, v) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        x = v[0],
        y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3$1.rotate = function (out, a, rad) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3$1.scale = function (out, a, v) {
    var x = v[0],
        y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
mat3$1.fromTranslation = function (out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3$1.fromRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0;

    out[3] = -s;
    out[4] = c;
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
mat3$1.fromScaling = function (out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;

    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3$1.fromMat2d = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3$1.fromQuat = function (out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3$1.normalFromMat4 = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,


    // Calculate the determinant
    det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3$1.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3$1.frob = function (a) {
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2));
};

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3$1.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3$1.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
};

/**
 * Alias for {@link mat3.subtract}
 * @function
 */
mat3$1.sub = mat3$1.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
mat3$1.multiplyScalar = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
};

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
mat3$1.multiplyScalarAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3$1.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3$1.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7],
        a8 = a[8];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = a[6],
        b7 = b[7],
        b8 = b[8];
    return Math.abs(a0 - b0) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix$5.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
};

var mat3_1 = mat3$1;

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix$6 = common;

/**
 * @class 4x4 Matrix
 * @name mat4
 */
var mat4$1 = {
    scalar: {},
    SIMD: {}
};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4$1.create = function () {
    var out = new glMatrix$6.ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4$1.clone = function (a) {
    var out = new glMatrix$6.ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4$1.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
mat4$1.fromValues = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new glMatrix$6.ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
mat4$1.set = function (out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4$1.identity = function (out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4$1.scalar.transpose = function (out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a12 = a[6],
            a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

/**
 * Transpose the values of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4$1.SIMD.transpose = function (out, a) {
    var a0, a1, a2, a3, tmp01, tmp23, out0, out1, out2, out3;

    a0 = SIMD.Float32x4.load(a, 0);
    a1 = SIMD.Float32x4.load(a, 4);
    a2 = SIMD.Float32x4.load(a, 8);
    a3 = SIMD.Float32x4.load(a, 12);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    out0 = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out1 = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 0, out0);
    SIMD.Float32x4.store(out, 4, out1);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    out2 = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out3 = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 8, out2);
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Transpse a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4$1.transpose = glMatrix$6.USE_SIMD ? mat4$1.SIMD.transpose : mat4$1.scalar.transpose;

/**
 * Inverts a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4$1.scalar.invert = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,


    // Calculate the determinant
    det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Inverts a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4$1.SIMD.invert = function (out, a) {
    var row0,
        row1,
        row2,
        row3,
        tmp1,
        minor0,
        minor1,
        minor2,
        minor3,
        det,
        a0 = SIMD.Float32x4.load(a, 0),
        a1 = SIMD.Float32x4.load(a, 4),
        a2 = SIMD.Float32x4.load(a, 8),
        a3 = SIMD.Float32x4.load(a, 12);

    // Compute matrix adjugate
    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
    row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
    row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

    tmp1 = SIMD.Float32x4.mul(row2, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.mul(row1, tmp1);
    minor1 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
    minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
    minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row1, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
    minor3 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
    minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    row2 = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
    minor2 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
    minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row0, row1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
    minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

    // Compute matrix determinant
    det = SIMD.Float32x4.mul(row0, minor0);
    det = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 2, 3, 0, 1), det);
    det = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 1, 0, 3, 2), det);
    tmp1 = SIMD.Float32x4.reciprocalApproximation(det);
    det = SIMD.Float32x4.sub(SIMD.Float32x4.add(tmp1, tmp1), SIMD.Float32x4.mul(det, SIMD.Float32x4.mul(tmp1, tmp1)));
    det = SIMD.Float32x4.swizzle(det, 0, 0, 0, 0);
    if (!det) {
        return null;
    }

    // Compute matrix inverse
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.mul(det, minor0));
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.mul(det, minor1));
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.mul(det, minor2));
    SIMD.Float32x4.store(out, 12, SIMD.Float32x4.mul(det, minor3));
    return out;
};

/**
 * Inverts a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4$1.invert = glMatrix$6.USE_SIMD ? mat4$1.SIMD.invert : mat4$1.scalar.invert;

/**
 * Calculates the adjugate of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4$1.scalar.adjoint = function (out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4$1.SIMD.adjoint = function (out, a) {
    var a0, a1, a2, a3;
    var row0, row1, row2, row3;
    var tmp1;
    var minor0, minor1, minor2, minor3;

    a0 = SIMD.Float32x4.load(a, 0);
    a1 = SIMD.Float32x4.load(a, 4);
    a2 = SIMD.Float32x4.load(a, 8);
    a3 = SIMD.Float32x4.load(a, 12);

    // Transpose the source matrix.  Sort of.  Not a true transpose operation
    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
    row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);

    tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
    row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

    tmp1 = SIMD.Float32x4.mul(row2, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.mul(row1, tmp1);
    minor1 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
    minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
    minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row1, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
    minor3 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
    minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    row2 = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
    minor2 = SIMD.Float32x4.mul(row0, tmp1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
    minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

    tmp1 = SIMD.Float32x4.mul(row0, row1);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row3);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
    minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
    minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

    tmp1 = SIMD.Float32x4.mul(row0, row2);
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
    minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
    minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
    tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
    minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
    minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

    SIMD.Float32x4.store(out, 0, minor0);
    SIMD.Float32x4.store(out, 4, minor1);
    SIMD.Float32x4.store(out, 8, minor2);
    SIMD.Float32x4.store(out, 12, minor3);
    return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4$1.adjoint = glMatrix$6.USE_SIMD ? mat4$1.SIMD.adjoint : mat4$1.scalar.adjoint;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4$1.determinant = function (a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's explicitly using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand, must be a Float32Array
 * @param {mat4} b the second operand, must be a Float32Array
 * @returns {mat4} out
 */
mat4$1.SIMD.multiply = function (out, a, b) {
    var a0 = SIMD.Float32x4.load(a, 0);
    var a1 = SIMD.Float32x4.load(a, 4);
    var a2 = SIMD.Float32x4.load(a, 8);
    var a3 = SIMD.Float32x4.load(a, 12);

    var b0 = SIMD.Float32x4.load(b, 0);
    var out0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 0, out0);

    var b1 = SIMD.Float32x4.load(b, 4);
    var out1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 4, out1);

    var b2 = SIMD.Float32x4.load(b, 8);
    var out2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 8, out2);

    var b3 = SIMD.Float32x4.load(b, 12);
    var out3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Multiplies two mat4's explicitly not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4$1.scalar.multiply = function (out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    // Cache only the current line of the second matrix
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];b1 = b[5];b2 = b[6];b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];b1 = b[9];b2 = b[10];b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];b1 = b[13];b2 = b[14];b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
};

/**
 * Multiplies two mat4's using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4$1.multiply = glMatrix$6.USE_SIMD ? mat4$1.SIMD.multiply : mat4$1.scalar.multiply;

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4$1.mul = mat4$1.multiply;

/**
 * Translate a mat4 by the given vector not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4$1.scalar.translate = function (out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2],
        a00,
        a01,
        a02,
        a03,
        a10,
        a11,
        a12,
        a13,
        a20,
        a21,
        a22,
        a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
        a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
        a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

        out[0] = a00;out[1] = a01;out[2] = a02;out[3] = a03;
        out[4] = a10;out[5] = a11;out[6] = a12;out[7] = a13;
        out[8] = a20;out[9] = a21;out[10] = a22;out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4$1.SIMD.translate = function (out, a, v) {
    var a0 = SIMD.Float32x4.load(a, 0),
        a1 = SIMD.Float32x4.load(a, 4),
        a2 = SIMD.Float32x4.load(a, 8),
        a3 = SIMD.Float32x4.load(a, 12),
        vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

    if (a !== out) {
        out[0] = a[0];out[1] = a[1];out[2] = a[2];out[3] = a[3];
        out[4] = a[4];out[5] = a[5];out[6] = a[6];out[7] = a[7];
        out[8] = a[8];out[9] = a[9];out[10] = a[10];out[11] = a[11];
    }

    a0 = SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0));
    a1 = SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1));
    a2 = SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2));

    var t0 = SIMD.Float32x4.add(a0, SIMD.Float32x4.add(a1, SIMD.Float32x4.add(a2, a3)));
    SIMD.Float32x4.store(out, 12, t0);

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4$1.translate = glMatrix$6.USE_SIMD ? mat4$1.SIMD.translate : mat4$1.scalar.translate;

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4$1.scalar.scale = function (out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4$1.SIMD.scale = function (out, a, v) {
    var a0, a1, a2;
    var vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

    a0 = SIMD.Float32x4.load(a, 0);
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0)));

    a1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1)));

    a2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2)));

    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 */
mat4$1.scale = glMatrix$6.USE_SIMD ? mat4$1.SIMD.scale : mat4$1.scalar.scale;

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4$1.rotate = function (out, a, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s,
        c,
        t,
        a00,
        a01,
        a02,
        a03,
        a10,
        a11,
        a12,
        a13,
        a20,
        a21,
        a22,
        a23,
        b00,
        b01,
        b02,
        b10,
        b11,
        b12,
        b20,
        b21,
        b22;

    if (Math.abs(len) < glMatrix$6.EPSILON) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
    a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
    a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4$1.scalar.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4$1.SIMD.rotateX = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_1 = SIMD.Float32x4.load(a, 4);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_2, c), SIMD.Float32x4.mul(a_1, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD if availabe and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4$1.rotateX = glMatrix$6.USE_SIMD ? mat4$1.SIMD.rotateX : mat4$1.scalar.rotateX;

/**
 * Rotates a matrix by the given angle around the Y axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4$1.scalar.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4$1.SIMD.rotateY = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, s), SIMD.Float32x4.mul(a_2, c)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4$1.rotateY = glMatrix$6.USE_SIMD ? mat4$1.SIMD.rotateY : mat4$1.scalar.rotateY;

/**
 * Rotates a matrix by the given angle around the Z axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4$1.scalar.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4$1.SIMD.rotateZ = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(out, 0, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_1, s)));
    SIMD.Float32x4.store(out, 4, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_0, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4$1.rotateZ = glMatrix$6.USE_SIMD ? mat4$1.SIMD.rotateZ : mat4$1.scalar.rotateZ;

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4$1.fromTranslation = function (out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
mat4$1.fromScaling = function (out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4$1.fromRotation = function (out, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s,
        c,
        t;

    if (Math.abs(len) < glMatrix$6.EPSILON) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4$1.fromXRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4$1.fromYRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4$1.fromZRotation = function (out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4$1.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
mat4$1.getTranslation = function (out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];

    return out;
};

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
mat4$1.getRotation = function (out, mat) {
    // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
    var trace = mat[0] + mat[5] + mat[10];
    var S = 0;

    if (trace > 0) {
        S = Math.sqrt(trace + 1.0) * 2;
        out[3] = 0.25 * S;
        out[0] = (mat[6] - mat[9]) / S;
        out[1] = (mat[8] - mat[2]) / S;
        out[2] = (mat[1] - mat[4]) / S;
    } else if (mat[0] > mat[5] & mat[0] > mat[10]) {
        S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
        out[3] = (mat[6] - mat[9]) / S;
        out[0] = 0.25 * S;
        out[1] = (mat[1] + mat[4]) / S;
        out[2] = (mat[8] + mat[2]) / S;
    } else if (mat[5] > mat[10]) {
        S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
        out[3] = (mat[8] - mat[2]) / S;
        out[0] = (mat[1] + mat[4]) / S;
        out[1] = 0.25 * S;
        out[2] = (mat[6] + mat[9]) / S;
    } else {
        S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
        out[3] = (mat[1] - mat[4]) / S;
        out[0] = (mat[8] + mat[2]) / S;
        out[1] = (mat[6] + mat[9]) / S;
        out[2] = 0.25 * S;
    }

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
mat4$1.fromRotationTranslationScale = function (out, q, v, s) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
mat4$1.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2],
        ox = o[0],
        oy = o[1],
        oz = o[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
    out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
    out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
    out[15] = 1;

    return out;
};

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
mat4$1.fromQuat = function (out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4$1.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4$1.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4$1.perspectiveFromFieldOfView = function (out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI / 180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = far * near / (near - far);
    out[15] = 0.0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4$1.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4$1.lookAt = function (out, eye, center, up) {
    var x0,
        x1,
        x2,
        y0,
        y1,
        y2,
        z0,
        z1,
        z2,
        len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < glMatrix$6.EPSILON && Math.abs(eyey - centery) < glMatrix$6.EPSILON && Math.abs(eyez - centerz) < glMatrix$6.EPSILON) {
        return mat4$1.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4$1.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4$1.frob = function (a) {
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2));
};

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4$1.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4$1.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
};

/**
 * Alias for {@link mat4.subtract}
 * @function
 */
mat4$1.sub = mat4$1.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
mat4$1.multiplyScalar = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
};

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
mat4$1.multiplyScalarAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    out[9] = a[9] + b[9] * scale;
    out[10] = a[10] + b[10] * scale;
    out[11] = a[11] + b[11] * scale;
    out[12] = a[12] + b[12] * scale;
    out[13] = a[13] + b[13] * scale;
    out[14] = a[14] + b[14] * scale;
    out[15] = a[15] + b[15] * scale;
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4$1.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4$1.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7],
        a8 = a[8],
        a9 = a[9],
        a10 = a[10],
        a11 = a[11],
        a12 = a[12],
        a13 = a[13],
        a14 = a[14],
        a15 = a[15];

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7],
        b8 = b[8],
        b9 = b[9],
        b10 = b[10],
        b11 = b[11],
        b12 = b[12],
        b13 = b[13],
        b14 = b[14],
        b15 = b[15];

    return Math.abs(a0 - b0) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix$6.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
};

var mat4_1 = mat4$1;

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix$8 = common;

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */
var vec3$2 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3$2.create = function () {
    var out = new glMatrix$8.ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3$2.clone = function (a) {
    var out = new glMatrix$8.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3$2.fromValues = function (x, y, z) {
    var out = new glMatrix$8.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3$2.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3$2.set = function (out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3$2.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3$2.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3$2.sub = vec3$2.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3$2.multiply = function (out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3$2.mul = vec3$2.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3$2.divide = function (out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3$2.div = vec3$2.divide;

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
vec3$2.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
};

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
vec3$2.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
};

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3$2.min = function (out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3$2.max = function (out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
vec3$2.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3$2.scale = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3$2.scaleAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3$2.distance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x * x + y * y + z * z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3$2.dist = vec3$2.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3$2.squaredDistance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x * x + y * y + z * z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3$2.sqrDist = vec3$2.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3$2.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3$2.len = vec3$2.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3$2.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x * x + y * y + z * z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3$2.sqrLen = vec3$2.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3$2.negate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3$2.inverse = function (out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3$2.normalize = function (out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x * x + y * y + z * z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3$2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3$2.cross = function (out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        bx = b[0],
        by = b[1],
        bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3$2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3$2.hermite = function (out, a, b, c, d, t) {
    var factorTimes2 = t * t,
        factor1 = factorTimes2 * (2 * t - 3) + 1,
        factor2 = factorTimes2 * (t - 2) + t,
        factor3 = factorTimes2 * (t - 1),
        factor4 = factorTimes2 * (3 - 2 * t);

    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

    return out;
};

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3$2.bezier = function (out, a, b, c, d, t) {
    var inverseFactor = 1 - t,
        inverseFactorTimesTwo = inverseFactor * inverseFactor,
        factorTimes2 = t * t,
        factor1 = inverseFactorTimesTwo * inverseFactor,
        factor2 = 3 * t * inverseFactorTimesTwo,
        factor3 = 3 * factorTimes2 * inverseFactor,
        factor4 = factorTimes2 * t;

    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3$2.random = function (out, scale) {
    scale = scale || 1.0;

    var r = glMatrix$8.RANDOM() * 2.0 * Math.PI;
    var z = glMatrix$8.RANDOM() * 2.0 - 1.0;
    var zScale = Math.sqrt(1.0 - z * z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3$2.transformMat4 = function (out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3$2.transformMat3 = function (out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3$2.transformQuat = function (out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0],
        y = a[1],
        z = a[2],
        qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],


    // calculate quat * vec
    ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3$2.rotateX = function (out, a, b, c) {
    var p = [],
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0];
    r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
    r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3$2.rotateY = function (out, a, b, c) {
    var p = [],
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3$2.rotateZ = function (out, a, b, c) {
    var p = [],
        r = [];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
    r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
    r[2] = p[2];

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3$2.forEach = function () {
    var vec = vec3$2.create();

    return function (a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
            stride = 3;
        }

        if (!offset) {
            offset = 0;
        }

        if (count) {
            l = Math.min(count * stride + offset, a.length);
        } else {
            l = a.length;
        }

        for (i = offset; i < l; i += stride) {
            vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];
            fn(vec, vec, arg);
            a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];
        }

        return a;
    };
}();

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
vec3$2.angle = function (a, b) {

    var tempA = vec3$2.fromValues(a[0], a[1], a[2]);
    var tempB = vec3$2.fromValues(b[0], b[1], b[2]);

    vec3$2.normalize(tempA, tempA);
    vec3$2.normalize(tempB, tempB);

    var cosine = vec3$2.dot(tempA, tempB);

    if (cosine > 1.0) {
        return 0;
    } else {
        return Math.acos(cosine);
    }
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3$2.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3$2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3$2.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2];
    return Math.abs(a0 - b0) <= glMatrix$8.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix$8.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix$8.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
};

var vec3_1 = vec3$2;

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix$9 = common;

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */
var vec4$2 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4$2.create = function () {
    var out = new glMatrix$9.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4$2.clone = function (a) {
    var out = new glMatrix$9.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4$2.fromValues = function (x, y, z, w) {
    var out = new glMatrix$9.ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4$2.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4$2.set = function (out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4$2.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4$2.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4$2.sub = vec4$2.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4$2.multiply = function (out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4$2.mul = vec4$2.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4$2.divide = function (out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4$2.div = vec4$2.divide;

/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */
vec4$2.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
};

/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */
vec4$2.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
};

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4$2.min = function (out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4$2.max = function (out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */
vec4$2.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4$2.scale = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4$2.scaleAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4$2.distance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4$2.dist = vec4$2.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4$2.squaredDistance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x * x + y * y + z * z + w * w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4$2.sqrDist = vec4$2.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4$2.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4$2.len = vec4$2.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4$2.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x * x + y * y + z * z + w * w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4$2.sqrLen = vec4$2.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4$2.negate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
vec4$2.inverse = function (out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    out[3] = 1.0 / a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4$2.normalize = function (out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x * x + y * y + z * z + w * w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = x * len;
        out[1] = y * len;
        out[2] = z * len;
        out[3] = w * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4$2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4$2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4$2.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = glMatrix$9.RANDOM();
    out[1] = glMatrix$9.RANDOM();
    out[2] = glMatrix$9.RANDOM();
    out[3] = glMatrix$9.RANDOM();
    vec4$2.normalize(out, out);
    vec4$2.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4$2.transformMat4 = function (out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4$2.transformQuat = function (out, a, q) {
    var x = a[0],
        y = a[1],
        z = a[2],
        qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],


    // calculate quat * vec
    ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4$2.forEach = function () {
    var vec = vec4$2.create();

    return function (a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
            stride = 4;
        }

        if (!offset) {
            offset = 0;
        }

        if (count) {
            l = Math.min(count * stride + offset, a.length);
        } else {
            l = a.length;
        }

        for (i = offset; i < l; i += stride) {
            vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];vec[3] = a[i + 3];
            fn(vec, vec, arg);
            a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];a[i + 3] = vec[3];
        }

        return a;
    };
}();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4$2.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec4$2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec4$2.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    return Math.abs(a0 - b0) <= glMatrix$9.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix$9.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix$9.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix$9.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
};

var vec4_1 = vec4$2;

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix$7 = common;
var mat3$2 = mat3_1;
var vec3$1 = vec3_1;
var vec4$1 = vec4_1;

/**
 * @class Quaternion
 * @name quat
 */
var quat$1 = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat$1.create = function () {
    var out = new glMatrix$7.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat$1.rotationTo = function () {
    var tmpvec3 = vec3$1.create();
    var xUnitVec3 = vec3$1.fromValues(1, 0, 0);
    var yUnitVec3 = vec3$1.fromValues(0, 1, 0);

    return function (out, a, b) {
        var dot = vec3$1.dot(a, b);
        if (dot < -0.999999) {
            vec3$1.cross(tmpvec3, xUnitVec3, a);
            if (vec3$1.length(tmpvec3) < 0.000001) vec3$1.cross(tmpvec3, yUnitVec3, a);
            vec3$1.normalize(tmpvec3, tmpvec3);
            quat$1.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3$1.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat$1.normalize(out, out);
        }
    };
}();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat$1.setAxes = function () {
    var matr = mat3$2.create();

    return function (out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat$1.normalize(out, quat$1.fromMat3(out, matr));
    };
}();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat$1.clone = vec4$1.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat$1.fromValues = vec4$1.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat$1.copy = vec4$1.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat$1.set = vec4$1.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat$1.identity = function (out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat$1.setAxisAngle = function (out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
quat$1.getAxisAngle = function (out_axis, q) {
    var rad = Math.acos(q[3]) * 2.0;
    var s = Math.sin(rad / 2.0);
    if (s != 0.0) {
        out_axis[0] = q[0] / s;
        out_axis[1] = q[1] / s;
        out_axis[2] = q[2] / s;
    } else {
        // If s is zero, return any axis (no rotation - axis does not matter)
        out_axis[0] = 1;
        out_axis[1] = 0;
        out_axis[2] = 0;
    }
    return rad;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat$1.add = vec4$1.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat$1.multiply = function (out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat$1.mul = quat$1.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat$1.scale = vec4$1.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat$1.rotateX = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bx = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat$1.rotateY = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        by = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat$1.rotateZ = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bz = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat$1.calculateW = function (out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat$1.dot = vec4$1.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat$1.lerp = vec4$1.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat$1.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3],
        bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];

    var omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if (cosom < 0.0) {
        cosom = -cosom;
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
    }
    // calculate coefficients
    if (1.0 - cosom > 0.000001) {
        // standard case (slerp)
        omega = Math.acos(cosom);
        sinom = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
};

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
quat$1.sqlerp = function () {
    var temp1 = quat$1.create();
    var temp2 = quat$1.create();

    return function (out, a, b, c, d, t) {
        quat$1.slerp(temp1, a, d, t);
        quat$1.slerp(temp2, b, c, t);
        quat$1.slerp(out, temp1, temp2, 2 * t * (1 - t));

        return out;
    };
}();

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat$1.invert = function (out, a) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
        invDot = dot ? 1.0 / dot : 0;

    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat$1.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat$1.length = vec4$1.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat$1.len = quat$1.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat$1.squaredLength = vec4$1.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat$1.sqrLen = quat$1.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat$1.normalize = vec4$1.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat$1.fromMat3 = function (out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if (fTrace > 0.0) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0); // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot; // 1/(4w)
        out[0] = (m[5] - m[7]) * fRoot;
        out[1] = (m[6] - m[2]) * fRoot;
        out[2] = (m[1] - m[3]) * fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if (m[4] > m[0]) i = 1;
        if (m[8] > m[i * 3 + i]) i = 2;
        var j = (i + 1) % 3;
        var k = (i + 2) % 3;

        fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
        out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
        out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat$1.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat$1.exactEquals = vec4$1.exactEquals;

/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat$1.equals = vec4$1.equals;

var quat_1 = quat$1;

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix$10 = common;

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
var vec2$1 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2$1.create = function () {
    var out = new glMatrix$10.ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2$1.clone = function (a) {
    var out = new glMatrix$10.ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2$1.fromValues = function (x, y) {
    var out = new glMatrix$10.ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2$1.copy = function (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2$1.set = function (out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2$1.add = function (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2$1.subtract = function (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2$1.sub = vec2$1.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2$1.multiply = function (out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2$1.mul = vec2$1.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2$1.divide = function (out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2$1.div = vec2$1.divide;

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
vec2$1.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
};

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
vec2$1.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
};

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2$1.min = function (out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2$1.max = function (out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
vec2$1.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2$1.scale = function (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2$1.scaleAndAdd = function (out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2$1.distance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x * x + y * y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2$1.dist = vec2$1.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2$1.squaredDistance = function (a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x * x + y * y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2$1.sqrDist = vec2$1.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2$1.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x * x + y * y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2$1.len = vec2$1.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2$1.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x * x + y * y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2$1.sqrLen = vec2$1.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2$1.negate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
vec2$1.inverse = function (out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2$1.normalize = function (out, a) {
    var x = a[0],
        y = a[1];
    var len = x * x + y * y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2$1.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2$1.cross = function (out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2$1.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2$1.random = function (out, scale) {
    scale = scale || 1.0;
    var r = glMatrix$10.RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2$1.transformMat2 = function (out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2$1.transformMat2d = function (out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2$1.transformMat3 = function (out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2$1.transformMat4 = function (out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2$1.forEach = function () {
    var vec = vec2$1.create();

    return function (a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
            stride = 2;
        }

        if (!offset) {
            offset = 0;
        }

        if (count) {
            l = Math.min(count * stride + offset, a.length);
        } else {
            l = a.length;
        }

        for (i = offset; i < l; i += stride) {
            vec[0] = a[i];vec[1] = a[i + 1];
            fn(vec, vec, arg);
            a[i] = vec[0];a[i + 1] = vec[1];
        }

        return a;
    };
}();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2$1.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2$1.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2$1.equals = function (a, b) {
    var a0 = a[0],
        a1 = a[1];
    var b0 = b[0],
        b1 = b[1];
    return Math.abs(a0 - b0) <= glMatrix$10.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix$10.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
};

var vec2_1 = vec2$1;

var mat4 = mat4_1;
var quat = quat_1;
var vec2 = vec2_1;
var vec3 = vec3_1;
var vec4 = vec4_1;

var Vector3 = function (_VectorBase) {
    (0, _inherits3.default)(Vector3, _VectorBase);

    function Vector3(x, y, z) {
        (0, _classCallCheck3.default)(this, Vector3);

        var _this20 = (0, _possibleConstructorReturn3.default)(this, (Vector3.__proto__ || (0, _getPrototypeOf2.default)(Vector3)).call(this));

        if (typeof y === "undefined") {
            _this20.rawElements = x;
            return (0, _possibleConstructorReturn3.default)(_this20);
        }
        _this20.rawElements = [x, y, z];
        return _this20;
    }

    (0, _createClass3.default)(Vector3, [{
        key: "toMathematicaString",
        value: function toMathematicaString() {
            return "{" + this.X + "," + this.Y + "," + this.Z + "}";
        }
    }, {
        key: "normalizeThis",
        value: function normalizeThis() {
            return Vector3.normalize(this);
        }
    }, {
        key: "dotWith",
        value: function dotWith(v) {
            return Vector3.dot(this, v);
        }
    }, {
        key: "addWith",
        value: function addWith(v) {
            return Vector3.add(this, v);
        }
    }, {
        key: "subtractWith",
        value: function subtractWith(v) {
            return Vector3.subtract(this, v);
        }
    }, {
        key: "multiplyWith",
        value: function multiplyWith(s) {
            return Vector3.multiply(s, this);
        }
    }, {
        key: "negateThis",
        value: function negateThis() {
            return Vector3.negate(this);
        }
    }, {
        key: "equalWith",
        value: function equalWith(v) {
            return Vector3.equals(this, v);
        }
    }, {
        key: "nearlyEqualWith",
        value: function nearlyEqualWith(v) {
            return Vector3.nearlyEquals(this, v);
        }
    }, {
        key: "crossWith",
        value: function crossWith(v) {
            return Vector3.cross(this, v);
        }
    }, {
        key: "toString",
        value: function toString() {
            return "(" + this.X + ", " + this.Y + ", " + this.Z + ")";
        }
    }, {
        key: "toDisplayString",
        value: function toDisplayString() {
            return "Vector3" + this.toString();
        }
    }, {
        key: "normalized",
        get: function get() {
            return this.multiplyWith(1 / this.magnitude);
        }
    }, {
        key: "X",
        get: function get() {
            return this.rawElements[0];
        },
        set: function set(x) {
            this.rawElements[0] = +x;
        }
    }, {
        key: "Y",
        get: function get() {
            return this.rawElements[1];
        },
        set: function set(y) {
            this.rawElements[1] = +y;
        }
    }, {
        key: "Z",
        get: function get() {
            return this.rawElements[2];
        },
        set: function set(z) {
            this.rawElements[2] = +z;
        }
    }, {
        key: "ElementCount",
        get: function get() {
            return 3;
        }
    }], [{
        key: "copy",
        value: function copy(source) {
            return new Vector3(source.X, source.Y, source.Z);
        }
    }, {
        key: "dot",
        value: function dot(v1, v2) {
            return vec3.dot(v1.rawElements, v2.rawElements);
        }
    }, {
        key: "add",
        value: function add(v1, v2) {
            var newVec = vec3.create();
            return new Vector3(vec3.add(newVec, v1.rawElements, v2.rawElements));
        }
    }, {
        key: "subtract",
        value: function subtract(v1, v2) {
            var newVec = vec3.create();
            return new Vector3(vec3.sub(newVec, v1.rawElements, v2.rawElements));
        }
    }, {
        key: "multiply",
        value: function multiply(s, v) {
            var newVec = vec3.create();
            return new Vector3(vec3.scale(newVec, v.rawElements, s));
        }
    }, {
        key: "negate",
        value: function negate(v1) {
            return Vector3.multiply(-1, v1);
        }
    }, {
        key: "equals",
        value: function equals(v1, v2) {
            return VectorBase.__elementEquals(v1, v2);
        }
    }, {
        key: "nearlyEquals",
        value: function nearlyEquals(v1, v2) {
            return VectorBase.__nearlyElementEquals(v1, v2);
        }
    }, {
        key: "normalize",
        value: function normalize(v1) {
            var newVec = vec3.create();
            return new Vector3(vec3.normalize(newVec, v1.rawElements));
        }
    }, {
        key: "cross",
        value: function cross(v1, v2) {
            var newVec = vec3.create();
            return new Vector3(vec3.cross(newVec, v1.rawElements, v2.rawElements));
        }
    }, {
        key: "min",
        value: function min(v1, v2) {
            return new Vector3(VectorBase.__fromGenerationFunction(v1, v2, function (i, _v1, _v2) {
                return Math.min(_v1.rawElements[i], _v2.rawElements[i]);
            }));
        }
    }, {
        key: "max",
        value: function max(v1, v2) {
            return new Vector3(VectorBase.__fromGenerationFunction(v1, v2, function (i, _v1, _v2) {
                return Math.max(_v1.rawElements[i], _v2.rawElements[i]);
            }));
        }
    }, {
        key: "angle",
        value: function angle(v1, v2) {
            return Math.acos(Vector3.dot(v1.normalized, v2.normalized));
        }
    }, {
        key: "parse",
        value: function parse(str) {
            var parseResult = VectorBase.__parse(str);
            var elements = parseResult.elements;
            if (!elements || elements.length !== 1 && elements.length !== 3) {
                return undefined;
            }
            var result = void 0;
            if (elements.length === 1) {
                result = new Vector3(elements[0], elements[0], elements[0]);
            } else {
                result = new Vector3(elements[0], elements[1], elements[2]);
            }
            if (parseResult.needNormalize) {
                result = result.normalizeThis();
            }
            if (parseResult.coefficient) {
                result = result.multiplyWith(parseResult.coefficient);
            }
            if (parseResult.needNegate) {
                result = result.negateThis();
            }
            return result;
        }
    }, {
        key: "XUnit",
        get: function get() {
            return new Vector3(1, 0, 0);
        }
    }, {
        key: "YUnit",
        get: function get() {
            return new Vector3(0, 1, 0);
        }
    }, {
        key: "ZUnit",
        get: function get() {
            return new Vector3(0, 0, 1);
        }
    }, {
        key: "Zero",
        get: function get() {
            return new Vector3(0, 0, 0);
        }
    }, {
        key: "One",
        get: function get() {
            return new Vector3(1, 1, 1);
        }
    }]);
    return Vector3;
}(VectorBase);

var Vector4 = function (_VectorBase2) {
    (0, _inherits3.default)(Vector4, _VectorBase2);

    function Vector4(x, y, z, w) {
        (0, _classCallCheck3.default)(this, Vector4);

        var _this21 = (0, _possibleConstructorReturn3.default)(this, (Vector4.__proto__ || (0, _getPrototypeOf2.default)(Vector4)).call(this));

        if (typeof y === "undefined") {
            _this21.rawElements = x;
            return (0, _possibleConstructorReturn3.default)(_this21);
        }
        _this21.rawElements = [x, y, z, w];
        return _this21;
    }

    (0, _createClass3.default)(Vector4, [{
        key: "normalizeThis",
        value: function normalizeThis() {
            return Vector4.normalize(this);
        }
    }, {
        key: "dotWith",
        value: function dotWith(v) {
            return Vector4.dot(this, v);
        }
    }, {
        key: "addWith",
        value: function addWith(v) {
            return Vector4.add(this, v);
        }
    }, {
        key: "subtractWith",
        value: function subtractWith(v) {
            return Vector4.subtract(this, v);
        }
    }, {
        key: "multiplyWith",
        value: function multiplyWith(s) {
            return Vector4.multiply(s, this);
        }
    }, {
        key: "negateThis",
        value: function negateThis() {
            return Vector4.negate(this);
        }
    }, {
        key: "equalWith",
        value: function equalWith(v) {
            return Vector4.equals(this, v);
        }
    }, {
        key: "nearlyEqualWith",
        value: function nearlyEqualWith(v) {
            return Vector4.nearlyEquals(this, v);
        }
    }, {
        key: "toString",
        value: function toString() {
            return "(" + this.X + ", " + this.Y + ", " + this.Z + ", " + this.W + ")";
        }
    }, {
        key: "toDisplayString",
        value: function toDisplayString() {
            return "Vector4" + this.toString();
        }
    }, {
        key: "toMathematicaString",
        value: function toMathematicaString() {
            return "{" + this.X + "," + this.Y + "," + this.Z + "," + this.W + "}";
        }
    }, {
        key: "normalized",
        get: function get() {
            return this.multiplyWith(1 / this.magnitude);
        }
    }, {
        key: "X",
        get: function get() {
            return this.rawElements[0];
        },
        set: function set(x) {
            this.rawElements[0] = +x;
        }
    }, {
        key: "Y",
        get: function get() {
            return this.rawElements[1];
        },
        set: function set(y) {
            this.rawElements[1] = +y;
        }
    }, {
        key: "Z",
        get: function get() {
            return this.rawElements[2];
        },
        set: function set(z) {
            this.rawElements[2] = +z;
        }
    }, {
        key: "W",
        get: function get() {
            return this.rawElements[3];
        },
        set: function set(w) {
            this.rawElements[3] = +w;
        }
    }, {
        key: "ElementCount",
        get: function get() {
            return 4;
        }
    }], [{
        key: "copy",
        value: function copy(vec) {
            return new Vector4(vec.X, vec.Y, vec.Z, vec.W);
        }
    }, {
        key: "dot",
        value: function dot(v1, v2) {
            return vec4.dot(v1.rawElements, v2.rawElements);
        }
    }, {
        key: "add",
        value: function add(v1, v2) {
            var newVec = vec4.create();
            return new Vector4(vec4.add(newVec, v1.rawElements, v2.rawElements));
        }
    }, {
        key: "subtract",
        value: function subtract(v1, v2) {
            var newVec = vec4.create();
            return new Vector4(vec4.sub(newVec, v1.rawElements, v2.rawElements));
        }
    }, {
        key: "multiply",
        value: function multiply(s, v) {
            var newVec = vec4.create();
            return new Vector4(vec4.scale(newVec, v.rawElements, s));
        }
    }, {
        key: "negate",
        value: function negate(v1) {
            return Vector4.multiply(-1, v1);
        }
    }, {
        key: "equals",
        value: function equals(v1, v2) {
            return VectorBase.__elementEquals(v1, v2);
        }
    }, {
        key: "nearlyEquals",
        value: function nearlyEquals(v1, v2) {
            return VectorBase.__nearlyElementEquals(v1, v2);
        }
    }, {
        key: "normalize",
        value: function normalize(v1) {
            var newVec = vec4.create();
            return new Vector4(vec4.normalize(newVec, v1.rawElements));
        }
    }, {
        key: "min",
        value: function min(v1, v2) {
            return new Vector4(VectorBase.__fromGenerationFunction(v1, v2, function (i, _v1, _v2) {
                return Math.min(_v1.rawElements[i], _v2.rawElements[i]);
            }));
        }
    }, {
        key: "max",
        value: function max(v1, v2) {
            return new Vector4(VectorBase.__fromGenerationFunction(v1, v2, function (i, _v1, _v2) {
                return Math.max(_v1.rawElements[i], _v2.rawElements[i]);
            }));
        }
    }, {
        key: "angle",
        value: function angle(v1, v2) {
            return Math.acos(Vector4.dot(v1.normalized, v2.normalized));
        }
    }, {
        key: "parse",
        value: function parse(str) {
            var parseResult = VectorBase.__parse(str);
            var elements = parseResult.elements;
            if (!elements || elements.length !== 1 && elements.length !== 4) {
                return undefined;
            }
            var result = void 0;
            if (elements.length === 1) {
                result = new Vector4(elements[0], elements[0], elements[0], elements[0]);
            } else {
                result = new Vector4(elements[0], elements[1], elements[2], elements[3]);
            }
            if (parseResult.needNormalize) {
                result = result.normalizeThis();
            }
            if (parseResult.coefficient) {
                result = result.multiplyWith(parseResult.coefficient);
            }
            if (parseResult.needNegate) {
                result = result.negateThis();
            }
            return result;
        }
    }, {
        key: "XUnit",
        get: function get() {
            return new Vector4(1, 0, 0, 0);
        }
    }, {
        key: "YUnit",
        get: function get() {
            return new Vector4(0, 1, 0, 0);
        }
    }, {
        key: "ZUnit",
        get: function get() {
            return new Vector4(0, 0, 1, 0);
        }
    }, {
        key: "WUnit",
        get: function get() {
            return new Vector4(0, 0, 0, 1);
        }
    }, {
        key: "One",
        get: function get() {
            return new Vector4(1, 1, 1, 1);
        }
    }, {
        key: "Zero",
        get: function get() {
            return new Vector4(0, 0, 0, 0);
        }
    }]);
    return Vector4;
}(VectorBase);

var Colors = {
    "aliceblue": "#F0F8FF",
    "antiquewhite": "#FAEBD7",
    "aqua": "#00FFFF",
    "aquamarine": "#7FFFD4",
    "azure": "#F0FFFF",
    "beige": "#F5F5DC",
    "bisque": "#FFE4C4",
    "black": "#000000",
    "blanchedalmond": "#FFEBCD",
    "blue": "#0000FF",
    "blueviolet": "#8A2BE2",
    "brown": "#A52A2A",
    "burlywood": "#DEB887",
    "cadetblue": "#5F9EA0",
    "chartreuse": "#7FFF00",
    "chocolate": "#D2691E",
    "coral": "#FF7F50",
    "cornflowerblue": "#6495ED",
    "cornsilk": "#FFF8DC",
    "crimson": "#DC143C",
    "cyan": "#00FFFF",
    "darkblue": "#00008B",
    "darkcyan": "#008B8B",
    "darkgoldenrod": "#B8860B",
    "darkgray": "#A9A9A9",
    "darkgreen": "#006400",
    "darkgrey": "#A9A9A9",
    "darkkhaki": "#BDB76B",
    "darkmagenta": "#8B008B",
    "darkolivegreen": "#556B2F",
    "darkorange": "#FF8C00",
    "darkorchid": "#9932CC",
    "darkred": "#8B0000",
    "darksalmon": "#E9967A",
    "darkseagreen": "#8FBC8F",
    "darkslateblue": "#483D8B",
    "darkslategray": "#2F4F4F",
    "darkslategrey": "#2F4F4F",
    "darkturquoise": "#00CED1",
    "darkviolet": "#9400D3",
    "deeppink": "#FF1493",
    "deepskyblue": "#00BFFF",
    "dimgray": "#696969",
    "dimgrey": "#696969",
    "dodgerblue": "#1E90FF",
    "firebrick": "#B22222",
    "floralwhite": "#FFFAF0",
    "forestgreen": "#228B22",
    "fuchsia": "#FF00FF",
    "gainsboro": "#DCDCDC",
    "ghostwhite": "#F8F8FF",
    "gold": "#FFD700",
    "goldenrod": "#DAA520",
    "gray": "#808080",
    "green": "#008000",
    "greenyellow": "#ADFF2F",
    "grey": "#808080",
    "honeydew": "#F0FFF0",
    "hotpink": "#FF69B4",
    "indianred": "#CD5C5C",
    "indigo": "#4B0082",
    "ivory": "#FFFFF0",
    "khaki": "#F0E68C",
    "lavender": "#E6E6FA",
    "lavenderblush": "#FFF0F5",
    "lawngreen": "#7CFC00",
    "lemonchiffon": "#FFFACD",
    "lightblue": "#ADD8E6",
    "lightcoral": "#F08080",
    "lightcyan": "#E0FFFF",
    "lightgoldenrodyellow": "#FAFAD2",
    "lightgray": "#D3D3D3",
    "lightgreen": "#90EE90",
    "lightgrey": "#D3D3D3",
    "lightpink": "#FFB6C1",
    "lightsalmon": "#FFA07A",
    "lightseagreen": "#20B2AA",
    "lightskyblue": "#87CEFA",
    "lightslategray": "#778899",
    "lightslategrey": "#778899",
    "lightsteelblue": "#B0C4DE",
    "lightyellow": "#FFFFE0",
    "lime": "#00FF00",
    "limegreen": "#32CD32",
    "linen": "#FAF0E6",
    "magenta": "#FF00FF",
    "maroon": "#800000",
    "mediumaquamarine": "#66CDAA",
    "mediumblue": "#0000CD",
    "mediumorchid": "#BA55D3",
    "mediumpurple": "#9370DB",
    "mediumseagreen": "#3CB371",
    "mediumslateblue": "#7B68EE",
    "mediumspringgreen": "#00FA9A",
    "mediumturquoise": "#48D1CC",
    "mediumvioletred": "#C71585",
    "midnightblue": "#191970",
    "mintcream": "#F5FFFA",
    "mistyrose": "#FFE4E1",
    "moccasin": "#FFE4B5",
    "navajowhite": "#FFDEAD",
    "navy": "#000080",
    "oldlace": "#FDF5E6",
    "olive": "#808000",
    "olivedrab": "#6B8E23",
    "orange": "#FFA500",
    "orangered": "#FF4500",
    "orchid": "#DA70D6",
    "palegoldenrod": "#EEE8AA",
    "palegreen": "#98FB98",
    "paleturquoise": "#AFEEEE",
    "palevioletred": "#DB7093",
    "papayawhip": "#FFEFD5",
    "peachpuff": "#FFDAB9",
    "peru": "#CD853F",
    "pink": "#FFC0CB",
    "plum": "#DDA0DD",
    "powderblue": "#B0E0E6",
    "purple": "#800080",
    "red": "#FF0000",
    "rosybrown": "#BC8F8F",
    "royalblue": "#4169E1",
    "saddlebrown": "#8B4513",
    "salmon": "#FA8072",
    "sandybrown": "#F4A460",
    "seagreen": "#2E8B57",
    "seashell": "#FFF5EE",
    "sienna": "#A0522D",
    "silver": "#C0C0C0",
    "skyblue": "#87CEEB",
    "slateblue": "#6A5ACD",
    "slategray": "#708090",
    "slategrey": "#708090",
    "snow": "#FFFAFA",
    "springgreen": "#00FF7F",
    "steelblue": "#4682B4",
    "tan": "#D2B48C",
    "teal": "#008080",
    "thistle": "#D8BFD8",
    "tomato": "#FF6347",
    "turquoise": "#40E0D0",
    "violet": "#EE82EE",
    "wheat": "#F5DEB3",
    "white": "#FFFFFF",
    "whitesmoke": "#F5F5F5",
    "yellow": "#FFFF00",
    "yellowgreen": "#9ACD32"
};

var Color4 = function (_VectorBase3) {
    (0, _inherits3.default)(Color4, _VectorBase3);

    function Color4(r, g, b, a) {
        (0, _classCallCheck3.default)(this, Color4);

        var _this22 = (0, _possibleConstructorReturn3.default)(this, (Color4.__proto__ || (0, _getPrototypeOf2.default)(Color4)).call(this));

        _this22.rawElements = [r, g, b, a];
        return _this22;
    }
    /// Color parser for css like syntax


    (0, _createClass3.default)(Color4, [{
        key: "toVector",
        value: function toVector() {
            return new Vector4(this.R, this.G, this.B, this.A);
        }
    }, {
        key: "equalWith",
        value: function equalWith(col) {
            return Color4.equals(col, this);
        }
    }, {
        key: "toString",
        value: function toString() {
            return "rgba(" + Math.round(this.R * 255) + ", " + Math.round(this.G * 255) + ", " + Math.round(this.B * 255) + ", " + Math.round(this.A * 255) + ")";
        }
    }, {
        key: "toDisplayString",
        value: function toDisplayString() {
            var st = "#";
            st += Math.round(this.R * 0xff).toString(16).toUpperCase();
            st += Math.round(this.G * 0xff).toString(16).toUpperCase();
            st += Math.round(this.B * 0xff).toString(16).toUpperCase();
            st += Math.round(this.A * 0xff).toString(16).toUpperCase();
            return "Color4(" + this.R + ", " + this.G + ", " + this.B + ", " + this.A + ", " + st + ")";
        }
    }, {
        key: "R",
        get: function get() {
            return this.rawElements[0];
        }
    }, {
        key: "G",
        get: function get() {
            return this.rawElements[1];
        }
    }, {
        key: "B",
        get: function get() {
            return this.rawElements[2];
        }
    }, {
        key: "A",
        get: function get() {
            return this.rawElements[3];
        }
    }, {
        key: "ElementCount",
        get: function get() {
            return 4;
        }
    }], [{
        key: "internalParse",
        value: function internalParse(color, isFirst, tryParse) {
            if (isFirst && Colors[color]) {
                return Color4.internalParse(Colors[color], false);
            }
            var m = void 0;
            if (isFirst) {
                m = color.match(/^#([0-9a-f]{3})$/i);
                // #fff
                if (m) {
                    var s = m[1];
                    return new Color4(parseInt(s.charAt(0), 16) / 0xf, parseInt(s.charAt(1), 16) / 0xf, parseInt(s.charAt(2), 16) / 0xf, 1);
                }
            }
            if (isFirst) {
                m = color.match(/^#([0-9a-f]{4})$/i);
                // #ffff
                if (m) {
                    var _s = m[1];
                    return new Color4(parseInt(_s.charAt(0), 16) / 0xf, parseInt(_s.charAt(1), 16) / 0xf, parseInt(_s.charAt(2), 16) / 0xf, parseInt(_s.charAt(3), 16) / 0xf);
                }
            }
            // #ffffff
            m = color.match(/^#([0-9a-f]{6})$/i);
            if (m) {
                var _s2 = m[1];
                return new Color4(parseInt(_s2.substr(0, 2), 16) / 0xff, parseInt(_s2.substr(2, 2), 16) / 0xff, parseInt(_s2.substr(4, 2), 16) / 0xff, 1);
            }
            // #ffffffff
            if (isFirst) {
                m = color.match(/^#([0-9a-f]{8})$/i);
                if (m) {
                    var _s3 = m[1];
                    return new Color4(parseInt(_s3.substr(0, 2), 16) / 0xff, parseInt(_s3.substr(2, 2), 16) / 0xff, parseInt(_s3.substr(4, 2), 16) / 0xff, parseInt(_s3.substr(6, 2), 16) / 0xff);
                }
            }
            var n = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
            if (n && isFirst) {
                return new Color4(parseInt(n[1], 10) / 0xff, parseInt(n[2], 10) / 0xff, parseInt(n[3], 10) / 0xff, 1);
            }
            n = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*(\d+)\s*\)$/i);
            if (n && isFirst) {
                var d = parseInt(n[4], 10);
                d = d <= 1 ? d : d / 0xff;
                return new Color4(parseInt(n[1], 10) / 0xff, parseInt(n[2], 10) / 0xff, parseInt(n[3], 10) / 0xff, parseInt(n[4], 10));
            }
            if (tryParse) {
                return undefined;
            }
            throw new Error("Unexpected color string" + color);
        }
    }, {
        key: "parse",
        value: function parse(color, tryParse) {
            return Color4.internalParse(color, true, tryParse);
        }
    }, {
        key: "equals",
        value: function equals(col1, col2) {
            return VectorBase.__elementEquals(col1, col2);
        }
    }]);
    return Color4;
}(VectorBase);

var Color3 = function (_VectorBase4) {
    (0, _inherits3.default)(Color3, _VectorBase4);

    function Color3(r, g, b) {
        (0, _classCallCheck3.default)(this, Color3);

        var _this23 = (0, _possibleConstructorReturn3.default)(this, (Color3.__proto__ || (0, _getPrototypeOf2.default)(Color3)).call(this));

        _this23.rawElements = [r, g, b];
        return _this23;
    }

    (0, _createClass3.default)(Color3, [{
        key: "toVector",
        value: function toVector() {
            return new Vector3(this.R, this.G, this.B);
        }
    }, {
        key: "toVector4",
        value: function toVector4(a) {
            if (typeof a === "undefined") {
                a = 0;
            }
            return new Vector4(this.R, this.G, this.B, a);
        }
    }, {
        key: "equalWith",
        value: function equalWith(col) {
            return Color3.equals(col, this);
        }
    }, {
        key: "toString",
        value: function toString() {
            return "rgb(" + Math.round(this.R * 255) + ", " + Math.round(this.G * 255) + ", " + Math.round(this.B * 255) + ")";
        }
    }, {
        key: "toDisplayString",
        value: function toDisplayString() {
            var st = "#";
            st += Math.round(this.R * 0xff).toString(16).toUpperCase();
            st += Math.round(this.G * 0xff).toString(16).toUpperCase();
            st += Math.round(this.B * 0xff).toString(16).toUpperCase();
            return "Color3(" + this.R + ", " + this.G + ", " + this.B + ", " + st + ")";
        }
    }, {
        key: "R",
        get: function get() {
            return this.rawElements[0];
        }
    }, {
        key: "G",
        get: function get() {
            return this.rawElements[1];
        }
    }, {
        key: "B",
        get: function get() {
            return this.rawElements[2];
        }
    }, {
        key: "ElementCount",
        get: function get() {
            return 3;
        }
    }], [{
        key: "fromColor4",
        value: function fromColor4(col) {
            return new Color3(col.R, col.G, col.B);
        }
    }, {
        key: "parse",
        value: function parse(color, tryParse) {
            return Color3.internalParse(color, true, tryParse);
        }
        /// Color parser for css like syntax

    }, {
        key: "internalParse",
        value: function internalParse(color, isFirst, tryParse) {
            if (isFirst && Colors[color]) {
                var col = Color4.internalParse(Colors[color], false, tryParse);
                return Color3.fromColor4(col);
            }
            var m = void 0;
            if (isFirst) {
                m = color.match(/^#([0-9a-f]{3})$/i);
                // #fff
                if (m) {
                    var s = m[1];
                    return new Color3(parseInt(s.charAt(0), 16) / 0xf, parseInt(s.charAt(1), 16) / 0xf, parseInt(s.charAt(2), 16) / 0xf);
                }
            }
            // #ffffff
            m = color.match(/^#([0-9a-f]{6})$/i);
            if (m) {
                var _s4 = m[1];
                return new Color3(parseInt(_s4.substr(0, 2), 16) / 0xff, parseInt(_s4.substr(2, 2), 16) / 0xff, parseInt(_s4.substr(4, 2), 16) / 0xff);
            }
            var n = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
            if (n && isFirst) {
                return new Color3(parseInt(n[1], 10) / 0xff, parseInt(n[2], 10) / 0xff, parseInt(n[3], 10) / 0xff);
            }
            if (tryParse) {
                return undefined;
            }
            throw new Error("Unexpected color string" + color);
        }
    }, {
        key: "equals",
        value: function equals(col1, col2) {
            return VectorBase.__elementEquals(col1, col2);
        }
    }]);
    return Color3;
}(VectorBase);

var Vector2 = function (_VectorBase5) {
    (0, _inherits3.default)(Vector2, _VectorBase5);

    function Vector2(x, y) {
        (0, _classCallCheck3.default)(this, Vector2);

        var _this24 = (0, _possibleConstructorReturn3.default)(this, (Vector2.__proto__ || (0, _getPrototypeOf2.default)(Vector2)).call(this));

        if (typeof y === "undefined") {
            _this24.rawElements = x;
            return (0, _possibleConstructorReturn3.default)(_this24);
        }
        _this24.rawElements = [x, y];
        return _this24;
    }

    (0, _createClass3.default)(Vector2, [{
        key: "dotWith",
        value: function dotWith(v) {
            return Vector2.dot(this, v);
        }
    }, {
        key: "addWith",
        value: function addWith(v) {
            return Vector2.add(this, v);
        }
    }, {
        key: "subtractWith",
        value: function subtractWith(v) {
            return Vector2.subtract(v, this);
        }
    }, {
        key: "multiplyWith",
        value: function multiplyWith(s) {
            return Vector2.multiply(s, this);
        }
    }, {
        key: "negateThis",
        value: function negateThis() {
            return Vector2.negate(this);
        }
    }, {
        key: "equalWith",
        value: function equalWith(v) {
            return Vector2.equals(this, v);
        }
    }, {
        key: "nearlyEqualWith",
        value: function nearlyEqualWith(v) {
            return Vector2.nearlyEquals(this, v);
        }
    }, {
        key: "normalizeThis",
        value: function normalizeThis() {
            return Vector2.normalize(this);
        }
    }, {
        key: "toString",
        value: function toString() {
            return "(" + this.X + ", " + this.Y + ")";
        }
    }, {
        key: "toDisplayString",
        value: function toDisplayString() {
            return "Vector2" + this.toString();
        }
    }, {
        key: "toMathematicaString",
        value: function toMathematicaString() {
            return "{" + this.X + ", " + this.Y + "}";
        }
    }, {
        key: "normalized",
        get: function get() {
            return this.multiplyWith(1 / this.magnitude);
        }
    }, {
        key: "X",
        get: function get() {
            return this.rawElements[0];
        },
        set: function set(x) {
            this.rawElements[0] = +x;
        }
    }, {
        key: "Y",
        get: function get() {
            return this.rawElements[1];
        },
        set: function set(y) {
            this.rawElements[1] = +y;
        }
    }, {
        key: "ElementCount",
        get: function get() {
            return 2;
        }
    }], [{
        key: "copy",
        value: function copy(vec) {
            return new Vector2(vec.X, vec.Y);
        }
    }, {
        key: "parse",
        value: function parse(str) {
            var parseResult = VectorBase.__parse(str);
            var elements = parseResult.elements;
            if (elements.length !== 1 && elements.length !== 2) {
                return undefined;
            }
            var result = void 0;
            if (elements.length === 1) {
                result = new Vector2(elements[0], elements[0]);
            } else {
                result = new Vector2(elements[0], elements[1]);
            }
            if (parseResult.needNormalize) {
                result = result.normalizeThis();
            }
            if (parseResult.coefficient) {
                result = result.multiplyWith(parseResult.coefficient);
            }
            if (parseResult.needNegate) {
                result = result.negateThis();
            }
            return result;
        }
    }, {
        key: "dot",
        value: function dot(v1, v2) {
            return vec2.dot(v1.rawElements, v2.rawElements);
        }
    }, {
        key: "add",
        value: function add(v1, v2) {
            var newVec = vec2.create();
            return new Vector2(vec2.add(newVec, v1.rawElements, v2.rawElements));
        }
    }, {
        key: "subtract",
        value: function subtract(v1, v2) {
            var newVec = vec2.create();
            return new Vector2(vec2.sub(newVec, v1.rawElements, v2.rawElements));
        }
    }, {
        key: "multiply",
        value: function multiply(s, v) {
            var newVec = vec2.create();
            return new Vector2(vec2.scale(newVec, v.rawElements, s));
        }
    }, {
        key: "negate",
        value: function negate(v1) {
            return Vector2.multiply(-1, v1);
        }
    }, {
        key: "equals",
        value: function equals(v1, v2) {
            return VectorBase.__elementEquals(v1, v2);
        }
    }, {
        key: "nearlyEquals",
        value: function nearlyEquals(v1, v2) {
            return VectorBase.__nearlyElementEquals(v1, v2);
        }
    }, {
        key: "normalize",
        value: function normalize(v1) {
            var newVec = vec2.create();
            return new Vector2(vec2.normalize(newVec, v1.rawElements));
        }
    }, {
        key: "min",
        value: function min(v1, v2) {
            return new Vector2(VectorBase.__fromGenerationFunction(v1, v2, function (i, v1_, v2_) {
                return Math.min(v1_.rawElements[i], v2_.rawElements[i]);
            }));
        }
    }, {
        key: "max",
        value: function max(v1, v2) {
            return new Vector2(VectorBase.__fromGenerationFunction(v1, v2, function (i, v1_, v2_) {
                return Math.max(v1_.rawElements[i], v2_.rawElements[i]);
            }));
        }
    }, {
        key: "angle",
        value: function angle(v1, v2) {
            return Math.acos(Vector2.dot(v1.normalized, v2.normalized));
        }
    }, {
        key: "XUnit",
        get: function get() {
            return new Vector2(1, 0);
        }
    }, {
        key: "YUnit",
        get: function get() {
            return new Vector2(0, 1);
        }
    }, {
        key: "One",
        get: function get() {
            return new Vector2(1, 1);
        }
    }, {
        key: "Zero",
        get: function get() {
            return new Vector2(0, 0);
        }
    }]);
    return Vector2;
}(VectorBase);

var MatrixBase = function () {
    function MatrixBase() {
        (0, _classCallCheck3.default)(this, MatrixBase);
    }

    (0, _createClass3.default)(MatrixBase, [{
        key: "getAt",
        value: function getAt(row, colmun) {
            throw new Error("Not implemented");
        }
    }, {
        key: "getBySingleIndex",
        value: function getBySingleIndex(index) {
            throw new Error("Not implemented");
        }
    }, {
        key: "RowCount",
        get: function get() {
            return 0;
        }
    }, {
        key: "ColmunCount",
        get: function get() {
            return 0;
        }
    }], [{
        key: "__elementEquals",
        value: function __elementEquals(m1, m2) {
            if (m1.RowCount !== m2.RowCount || m1.ColmunCount !== m2.ColmunCount) {
                return false;
            }
            var count = m1.RowCount * m2.ColmunCount;
            for (var i = 0; i < count; i++) {
                if (m1.getBySingleIndex(i) !== m2.getBySingleIndex(i)) {
                    return false;
                }
            }
            return true;
        }
    }]);
    return MatrixBase;
}();

var Matrix = function (_MatrixBase) {
    (0, _inherits3.default)(Matrix, _MatrixBase);

    function Matrix(arr) {
        (0, _classCallCheck3.default)(this, Matrix);

        var _this25 = (0, _possibleConstructorReturn3.default)(this, (Matrix.__proto__ || (0, _getPrototypeOf2.default)(Matrix)).call(this));

        if (arr) {
            _this25.rawElements = arr;
        } else {
            _this25.rawElements = mat4.create();
        }
        return _this25;
    }

    (0, _createClass3.default)(Matrix, [{
        key: "getAt",
        value: function getAt(row, colmun) {
            return this.rawElements[colmun * 4 + row];
        }
    }, {
        key: "setAt",
        value: function setAt(row, colmun, val) {
            this.rawElements[colmun * 4 + row] = val;
        }
    }, {
        key: "getBySingleIndex",
        value: function getBySingleIndex(index) {
            return this.rawElements[index];
        }
    }, {
        key: "getColmun",
        value: function getColmun(col) {
            return new Vector4(this.rawElements[col * 4], this.rawElements[col * 4 + 1], this.rawElements[col * 4 + 2], this.rawElements[col * 4 + 3]);
        }
        /**
        * Get row
        * @params row [0-3]
        */

    }, {
        key: "getRow",
        value: function getRow(row) {
            return new Vector4(this.rawElements[row], this.rawElements[row + 4], this.rawElements[row + 8], this.rawElements[row + 12]);
        }
    }, {
        key: "multiplyWith",
        value: function multiplyWith(m) {
            return Matrix.multiply(this, m);
        }
    }, {
        key: "equalWith",
        value: function equalWith(m) {
            return Matrix.equals(m, this);
        }
    }, {
        key: "toString",
        value: function toString() {
            return "|" + this.getBySingleIndex(0) + " " + this.getBySingleIndex(4) + " " + this.getBySingleIndex(8) + " " + this.getBySingleIndex(12) + "|\n\n                 |" + this.getBySingleIndex(1) + " " + this.getBySingleIndex(5) + " " + this.getBySingleIndex(9) + " " + this.getBySingleIndex(13) + "|\n\n                 |" + this.getBySingleIndex(2) + " " + this.getBySingleIndex(6) + " " + this.getBySingleIndex(10) + " " + this.getBySingleIndex(14) + "|\n\n                 |" + this.getBySingleIndex(3) + " " + this.getBySingleIndex(7) + " " + this.getBySingleIndex(11) + " " + this.getBySingleIndex(15) + "|";
        }
    }, {
        key: "toMathematicaString",
        value: function toMathematicaString() {
            return "{{" + this.getBySingleIndex(0) + "," + this.getBySingleIndex(4) + "," + this.getBySingleIndex(8) + "," + this.getBySingleIndex(12) + "},\n                  {" + this.getBySingleIndex(1) + "," + this.getBySingleIndex(5) + "," + this.getBySingleIndex(9) + "," + this.getBySingleIndex(13) + "},\n                  {" + this.getBySingleIndex(2) + "," + this.getBySingleIndex(6) + "," + this.getBySingleIndex(10) + "," + this.getBySingleIndex(14) + "},\n                  {" + this.getBySingleIndex(3) + "," + this.getBySingleIndex(7) + "," + this.getBySingleIndex(11) + "," + this.getBySingleIndex(15) + "}}";
        }
    }, {
        key: "ElementCount",
        get: function get() {
            return 16;
        }
    }, {
        key: "RowCount",
        get: function get() {
            return 4;
        }
    }, {
        key: "ColmunCount",
        get: function get() {
            return 4;
        }
    }], [{
        key: "zero",
        value: function zero() {
            return new Matrix([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
    }, {
        key: "identity",
        value: function identity() {
            return new Matrix(mat4.create());
        }
    }, {
        key: "fromElements",
        value: function fromElements(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
            return new Matrix([m00, m10, m20, m30, m01, m11, m21, m31, m02, m12, m22, m32, m03, m13, m23, m33]);
        }
    }, {
        key: "fromFunc",
        value: function fromFunc(f) {
            return new Matrix([f(0, 0), f(1, 0), f(2, 0), f(3, 0), f(0, 1), f(1, 1), f(2, 1), f(3, 1), f(0, 2), f(1, 2), f(2, 2), f(3, 2), f(0, 3), f(1, 3), f(2, 3), f(3, 3)]);
        }
    }, {
        key: "equals",
        value: function equals(m1, m2) {
            return Matrix.__elementEquals(m1, m2);
        }
    }, {
        key: "add",
        value: function add(m1, m2) {
            var mat = mat4.create();
            for (var i = 0; i < 16; i++) {
                mat[i] = m1.rawElements[i] + m2.rawElements[i];
            }
            return new Matrix(mat);
        }
    }, {
        key: "subtract",
        value: function subtract(m1, m2) {
            return Matrix.add(m1, Matrix.negate(m2));
        }
    }, {
        key: "scalarMultiply",
        value: function scalarMultiply(s, m) {
            var newMat = mat4.create();
            mat4.multiply(newMat, [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s], m.rawElements);
            return new Matrix(newMat);
        }
    }, {
        key: "multiply",
        value: function multiply(m1, m2) {
            var newMat = mat4.create();
            return new Matrix(mat4.mul(newMat, m1.rawElements, m2.rawElements));
        }
    }, {
        key: "trs",
        value: function trs(t, rot, s) {
            var newMat = mat4.create();
            var cacheMat = mat4.create();
            mat4.mul(newMat, mat4.translate(newMat, mat4.create(), t.rawElements), mat4.fromQuat(cacheMat, rot.rawElements));
            mat4.scale(newMat, newMat, s.rawElements);
            return new Matrix(newMat);
        }
    }, {
        key: "negate",
        value: function negate(m) {
            return this.scalarMultiply(-1, m);
        }
    }, {
        key: "transpose",
        value: function transpose(m) {
            var newMat = mat4.create();
            return new Matrix(mat4.transpose(newMat, m.rawElements));
        }
    }, {
        key: "transformPoint",
        value: function transformPoint(m, t) {
            var newVec = vec3.create();
            vec3.transformMat4(newVec, t.rawElements, m.rawElements);
            return new Vector3(newVec);
        }
    }, {
        key: "transformNormal",
        value: function transformNormal(m, t) {
            var newVec = vec4.create();
            var trans = vec4.create();
            trans[0] = t.X;
            trans[1] = t.Y;
            trans[2] = t.Z;
            trans[3] = 0;
            vec4.transformMat4(newVec, trans, m.rawElements);
            return new Vector3(newVec[0], newVec[1], newVec[2]);
        }
    }, {
        key: "transform",
        value: function transform(m, t) {
            var newVec = vec4.create();
            var trans = vec4.create();
            trans[0] = t.X;
            trans[1] = t.Y;
            trans[2] = t.Z;
            trans[3] = t.W;
            vec4.transformMat4(newVec, trans, m.rawElements);
            return new Vector4(newVec[0], newVec[1], newVec[2], newVec[3]);
        }
        /**
         * Retrieve determinant of passed matrix
         */

    }, {
        key: "determinant",
        value: function determinant(m) {
            return mat4.determinant(m.rawElements);
        }
        /**
         * Compute inverted passed matrix.
         */

    }, {
        key: "inverse",
        value: function inverse(m) {
            var newMat = mat4.create();
            return new Matrix(mat4.invert(newMat, m.rawElements));
        }
        /**
         * Generate linear translation transform matrix.
         */

    }, {
        key: "translate",
        value: function translate(v) {
            var newMat = mat4.create();
            mat4.translate(newMat, newMat, v.rawElements);
            return new Matrix(newMat);
        }
        /**
         * Generate linear scaling transform matrix.
         */

    }, {
        key: "scale",
        value: function scale(v) {
            var newMat = mat4.create();
            mat4.scale(newMat, newMat, v.rawElements);
            return new Matrix(newMat);
        }
    }, {
        key: "rotateX",
        value: function rotateX(angle) {
            var newMat = mat4.create();
            mat4.rotateX(newMat, newMat, angle);
            return new Matrix(newMat);
        }
    }, {
        key: "rotateY",
        value: function rotateY(angle) {
            var newMat = mat4.create();
            mat4.rotateY(newMat, newMat, angle);
            return new Matrix(newMat);
        }
    }, {
        key: "rotateZ",
        value: function rotateZ(angle) {
            var newMat = mat4.create();
            mat4.rotateZ(newMat, newMat, angle);
            return new Matrix(newMat);
        }
    }, {
        key: "rotationQuaternion",
        value: function rotationQuaternion(quat_) {
            var quaternion = quat.create();
            var newMat = mat4.create();
            quat.normalize(quaternion, quat_.rawElements);
            mat4.fromQuat(newMat, quaternion);
            return new Matrix(newMat);
        }
    }, {
        key: "frustum",
        value: function frustum(left, right, bottom, top, near, far) {
            var newMat = mat4.create();
            mat4.frustum(newMat, left, right, bottom, top, near, far);
            return new Matrix(newMat);
        }
    }, {
        key: "ortho",
        value: function ortho(left, right, bottom, top, near, far) {
            var newMat = mat4.create();
            mat4.ortho(newMat, left, right, bottom, top, near, far);
            return new Matrix(newMat);
        }
    }, {
        key: "perspective",
        value: function perspective(fovy, aspect, near, far) {
            var newMat = mat4.create();
            mat4.perspective(newMat, fovy, aspect, near, far);
            return new Matrix(newMat);
        }
    }, {
        key: "lookAt",
        value: function lookAt(eye, _lookAt, up) {
            var newMat = mat4.create();
            mat4.lookAt(newMat, eye.rawElements, _lookAt.rawElements, up.rawElements);
            return new Matrix(newMat);
        }
    }]);
    return Matrix;
}(MatrixBase);

/**
* The class to maniplate quaternion.
* Basically,you don't need to operate raw element.
* You consider to use some of useful methods without editing raw element forcelly.
* Each element will be represented as (w;x,y,z)
* (1,i,j,k) is base axis for quaternion. (i,j,k is pure imaginary number)
* (w;x,y,z) means w*1+x*i+y*j+z*k
*
*/


var Quaternion = function () {
    /**
    * Constructor by specifing each elements.
    */
    function Quaternion(rawElements) {
        (0, _classCallCheck3.default)(this, Quaternion);

        this.rawElements = rawElements;
    }

    (0, _createClass3.default)(Quaternion, [{
        key: "equalWith",
        value: function equalWith(q) {
            return Quaternion.equals(this, q);
        }
        /**
        * Get normalized quaternion
        */

    }, {
        key: "normalize",
        value: function normalize() {
            var newQuat = quat.create();
            return new Quaternion(quat.normalize(newQuat, this.rawElements));
        }
    }, {
        key: "inverse",
        value: function inverse() {
            var newQuat = quat.create();
            return new Quaternion(quat.invert(newQuat, this.rawElements));
        }
    }, {
        key: "toAngleAxisString",
        value: function toAngleAxisString() {
            var angle = 2 * Math.acos(this.W);
            var imm = Math.sqrt(1 - this.W * this.W);
            if (angle !== 180 && angle !== 0) {
                return "axis(" + angle + "," + this.X / imm + "," + this.Y / imm + "," + this.Z / imm + ")";
            } else if (angle === 0) {
                return "axis(" + angle + ",0,1,0)";
            } else {
                return "axis(180d," + this.X + "," + this.Y + "," + this.Z + ")";
            }
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.toAngleAxisString();
        }
    }, {
        key: "factoringQuaternionZXY",
        value: function factoringQuaternionZXY() {
            var result = { x: 0, y: 0, z: 0 };
            var mat = Matrix.rotationQuaternion(this);
            var sx = mat.rawElements[6];
            if (Math.abs(sx) < 1 - 1.0E-4) {
                result.x = Math.asin(sx);
                result.z = Math.atan2(-mat.rawElements[4], mat.rawElements[5]);
                result.y = Math.atan2(-mat.rawElements[2], mat.rawElements[10]);
            } else {
                result.y = 0;
                result.x = Math.PI / 2 * sx;
                result.z = Math.atan2(mat.rawElements[1], mat.rawElements[0]);
            }
            return result;
        }
    }, {
        key: "factoringQuaternionXYZ",
        value: function factoringQuaternionXYZ() {
            var result = { x: 0, y: 0, z: 0 };
            var mat = Matrix.rotationQuaternion(this);
            var sy = -mat.rawElements[2];
            if (Math.abs(sy) < 1 - 1.0E-4) {
                result.x = Math.atan2(mat.rawElements[6], mat.rawElements[10]);
                result.y = Math.asin(sy);
                result.z = Math.atan2(mat.rawElements[1], mat.rawElements[0]);
            } else {
                result.x = 0;
                result.y = Math.PI / 2 * sy;
                result.z = Math.atan2(-mat.rawElements[4], mat.rawElements[5]);
            }
            return result;
        }
    }, {
        key: "eularAngles",
        get: function get() {
            var eular = this.factoringQuaternionZXY();
            return new Vector3(eular.x, eular.y, eular.z);
        },
        set: function set(v) {
            this.rawElements = Quaternion.euler(v.X, v.Y, v.Z).rawElements;
        }
        /**
        * Getter for X.
        */

    }, {
        key: "X",
        get: function get() {
            return this.rawElements[0];
        }
        /**
        * Getter for Y.
        */

    }, {
        key: "Y",
        get: function get() {
            return this.rawElements[1];
        }
        /**
        * Getter for Z.
        */

    }, {
        key: "Z",
        get: function get() {
            return this.rawElements[2];
        }
        /**
        * Getter for W.
        */

    }, {
        key: "W",
        get: function get() {
            return this.rawElements[3];
        }
        /**
        * Getter for imaginary part vector.
        * It returns the vector (x,y,z)
        */

    }, {
        key: "ImaginaryPart",
        get: function get() {
            return new Vector3(this.X, this.Y, this.Z);
        }
        /**
        * Get the conjugate of this quaternion
        */

    }, {
        key: "Conjugate",
        get: function get() {
            var newQuat = quat.create();
            return new Quaternion(quat.conjugate(newQuat, this.rawElements));
        }
        /**
        * Get the length
        */

    }, {
        key: "Length",
        get: function get() {
            return quat.len(this.rawElements);
        }
    }], [{
        key: "equals",
        value: function equals(q1, q2) {
            for (var i = 0; i < 4; i++) {
                if (q1.rawElements[i] !== q2.rawElements[i]) {
                    return false;
                }
            }
            return true;
        }
        /**
        * Calculate add result of two quaternion
        */

    }, {
        key: "add",
        value: function add(q1, q2) {
            var newQuat = quat.create();
            return new Quaternion(quat.add(newQuat, q1.rawElements, q2.rawElements));
        }
        /**
        * Calculate multiply result of two quaternion
        */

    }, {
        key: "multiply",
        value: function multiply(q1, q2) {
            var newQuat = quat.create();
            return new Quaternion(quat.mul(newQuat, q1.rawElements, q2.rawElements));
        }
        /**
        * Calculate the rotation quaternion represented as pair of angle and axis.
        */

    }, {
        key: "angleAxis",
        value: function angleAxis(angle, axis) {
            var axisVec = vec3.create();
            axisVec[0] = axis.X;
            axisVec[1] = axis.Y;
            axisVec[2] = axis.Z;
            var newQuat = quat.create();
            return new Quaternion(quat.setAxisAngle(newQuat, axisVec, +angle));
        }
    }, {
        key: "euler",
        value: function euler(x, y, z) {
            return Quaternion.multiply(Quaternion.angleAxis(z, Vector3.ZUnit), Quaternion.multiply(Quaternion.angleAxis(x, Vector3.XUnit), Quaternion.angleAxis(y, Vector3.YUnit)));
        }
    }, {
        key: "eulerXYZ",
        value: function eulerXYZ(x, y, z) {
            return Quaternion.multiply(Quaternion.angleAxis(z, Vector3.ZUnit), Quaternion.multiply(Quaternion.angleAxis(y, Vector3.YUnit), Quaternion.angleAxis(x, Vector3.XUnit)));
        }
    }, {
        key: "slerp",
        value: function slerp(q1, q2, t) {
            var newQuat = quat.create();
            return new Quaternion(quat.slerp(newQuat, q1.rawElements, q2.rawElements, +t));
        }
        /**
         * Returns the angle in degrees between two rotations q1 and q2.
         * @param q1 the quaternion represents begin angle.
         * @param q2 the quaternion represents end angle.
         * @returns {number} angle represented in radians.
         */

    }, {
        key: "angle",
        value: function angle(q1, q2) {
            var delta = Quaternion.multiply(q2, q1.inverse());
            delta = delta.normalize();
            return 2 * Math.acos(delta.W);
        }
    }, {
        key: "fromToRotation",
        value: function fromToRotation(from, to) {
            var crossed = Vector3.cross(from.normalized, to.normalized);
            var angle = Vector3.dot(from.normalized, to.normalized);
            return Quaternion.angleAxis(angle, crossed);
        }
    }, {
        key: "lookRotation",
        value: function lookRotation(forward, upVec) {
            upVec = upVec || Vector3.YUnit;
            var normalizedForward = forward.normalized;
            var upForwardCross = Vector3.cross(upVec, normalizedForward).normalized;
            var thirdAxis = Vector3.cross(normalizedForward, upForwardCross);
            var m00 = upForwardCross.X;
            var m01 = upForwardCross.Y;
            var m02 = upForwardCross.Z;
            var m10 = thirdAxis.X;
            var m11 = thirdAxis.Y;
            var m12 = thirdAxis.Z;
            var m20 = normalizedForward.X;
            var m21 = normalizedForward.Y;
            var m22 = normalizedForward.Z;
            var num8 = m00 + m11 + m22;
            if (num8 > 0) {
                var num = Math.sqrt(1 + num8);
                return new Quaternion([(m12 - m21) * 0.5 / num, (m20 - m02) * 0.5 / num, (m01 - m10) * 0.5 / num, num / 2]);
            }
            if (m00 >= m11 && m00 >= m22) {
                var num7 = Math.sqrt(1 + m00 - m11 - m22);
                return new Quaternion([(m01 + m10) * 0.5 / num7, (m02 + m20) * 0.5 / num7, (m12 - m21) * 0.5 / num7, num7 / 2]);
            }
            if (m11 > m22) {
                var num6 = Math.sqrt(1 + m11 - m00 - m22);
                return new Quaternion([(m10 + m01) * 0, 5 / num6, 0.5 * num6, (m21 + m12) * 0.5 / num6, (m20 - m02) * 0.5 / num6]);
            }
            var num5 = Math.sqrt(1 + m22 - m00 - m11);
            return new Quaternion([(m20 + m02) * 0.5 / num5, (m21 + m12) * 0.5 / num5, 0.5 * num5, (m01 - m10) * 0.5 / num5]);
        }
    }, {
        key: "Identity",
        get: function get() {
            return new Quaternion(quat.create());
        }
    }]);
    return Quaternion;
}();

var Rectangle = function () {
    function Rectangle(left, top, width, height) {
        (0, _classCallCheck3.default)(this, Rectangle);

        this._left = left;
        this._top = top;
        this._width = width;
        this._height = height;
    }

    (0, _createClass3.default)(Rectangle, [{
        key: "contains",
        value: function contains(xOrPoint, y) {
            var x = void 0;
            if (xOrPoint instanceof Vector2) {
                x = xOrPoint.X;
                y = xOrPoint.Y;
            } else {
                x = xOrPoint;
            }
            return this.Left <= x && this.Right >= x && this.Top <= y && this.Bottom >= y;
        }
    }, {
        key: "toLocal",
        value: function toLocal(xOrPoint, y) {
            var x = void 0;
            if (xOrPoint instanceof Vector2) {
                x = xOrPoint.X;
                y = xOrPoint.Y;
            } else {
                x = xOrPoint;
            }
            x -= this.Left;
            y -= this.Top;
            return xOrPoint instanceof Vector2 ? new Vector2(x, y) : [x, y];
        }
    }, {
        key: "toString",
        value: function toString() {
            return "Rectangle(" + this.Left + "," + this.Top + "-" + this.Right + "," + this.Bottom + ")";
        }
    }, {
        key: "Left",
        get: function get() {
            return this._left;
        }
    }, {
        key: "Right",
        get: function get() {
            return this.Left + this.Width;
        }
    }, {
        key: "Top",
        get: function get() {
            return this._top;
        }
    }, {
        key: "Bottom",
        get: function get() {
            return this._top + this._height;
        }
    }, {
        key: "Width",
        get: function get() {
            return this._width;
        }
    }, {
        key: "Height",
        get: function get() {
            return this._height;
        }
    }], [{
        key: "equals",
        value: function equals(r1, r2) {
            return r1.Left === r2.Left && r1.Right === r2.Right && r1.Top === r2.Top && r1.Bottom === r2.Bottom;
        }
    }, {
        key: "edgeSizeEquals",
        value: function edgeSizeEquals(r1, r2) {
            return r1.Width === r2.Width && r1.Height === r2.Height;
        }
    }]);
    return Rectangle;
}();

///<reference path="../lib-ts/gl-matrix.d.ts"/>

/**
 * Environment uniform value resolver
 */


var EnvUniformValueResolver = function () {
    function EnvUniformValueResolver() {
        (0, _classCallCheck3.default)(this, EnvUniformValueResolver);
    }

    (0, _createClass3.default)(EnvUniformValueResolver, null, [{
        key: "addResolver",

        /**
         * Add static environment uniform value resolver to specified name.
         * @param  {string} name     [description]
         * @param  {string} resolver [description]
         * @return {[type]}          [description]
         */
        value: function addResolver(name, resolver) {
            EnvUniformValueResolver.resolvers[name] = resolver;
        }
        /**
         * Add dynamic environment uniform value resolver.
         * When pasased variable are not resolved by a resolver, that resolver should return null or undefined.
         * @param  {string} resolver [description]
         * @return {[type]}          [description]
         */

    }, {
        key: "addDynamicResolver",
        value: function addDynamicResolver(resolver) {
            EnvUniformValueResolver.dynamicResolvers.push(resolver);
        }
    }, {
        key: "resolve",
        value: function resolve(name, valInfo) {
            if (EnvUniformValueResolver.resolvers[name]) {
                return EnvUniformValueResolver.resolvers[name](valInfo, name);
            } else {
                var targetResolver = null;
                for (var i = 0; i < EnvUniformValueResolver.dynamicResolvers.length; i++) {
                    targetResolver = EnvUniformValueResolver.dynamicResolvers[i](valInfo, name);
                    if (targetResolver != null) {
                        return targetResolver;
                    }
                }
            }
        }
    }]);
    return EnvUniformValueResolver;
}();
/**
 * Static environment uniform value resolvers which names are already known.
 * @type {IVariableInfo}
 */


EnvUniformValueResolver.resolvers = {};
/**
 * Dynamic environment uniform value resolvers which names are not known yet.
 * @type {IVariableInfo}
 */
EnvUniformValueResolver.dynamicResolvers = [];
// Matricies
EnvUniformValueResolver.addResolver("_matPVM", function (valInfo, name) {
    return function (proxy, args) {
        return proxy.uniformMatrix(name, args.transform.calcPVM(args.camera.camera));
    };
});
EnvUniformValueResolver.addResolver("_matP", function (valInfo, name) {
    return function (proxy, args) {
        return proxy.uniformMatrix(name, args.camera.camera.getProjectionMatrix());
    };
});
EnvUniformValueResolver.addResolver("_matV", function (valInfo, name) {
    return function (proxy, args) {
        return proxy.uniformMatrix(name, args.camera.camera.getViewMatrix());
    };
});
EnvUniformValueResolver.addResolver("_matM", function (valInfo, name) {
    return function (proxy, args) {
        return proxy.uniformMatrix(name, args.transform.globalTransform);
    };
});
EnvUniformValueResolver.addResolver("_matVM", function (valInfo, name) {
    return function (proxy, args) {
        return proxy.uniformMatrix(name, args.transform.calcVM(args.camera.camera));
    };
});
EnvUniformValueResolver.addResolver("_matPV", function (valInfo, name) {
    return function (proxy, args) {
        return proxy.uniformMatrix(name, args.camera.camera.getProjectionViewMatrix());
    };
});
// Misc
EnvUniformValueResolver.addResolver("_time", function (valInfo, name) {
    return function (proxy, args) {
        return proxy.uniformFloat(name, Date.now() % 1000000);
    };
});
EnvUniformValueResolver.addResolver("_viewportSize", function (valInfo, name) {
    var cacheVec = new Vector2(0, 0);
    return function (proxy, args) {
        cacheVec.X = args.viewport.Width;
        cacheVec.Y = args.viewport.Height;
        proxy.uniformVector2(name, cacheVec);
    };
});
EnvUniformValueResolver.addResolver("_cameraPosition", function (valInfo, name) {
    return function (proxy, args) {
        return proxy.uniformVector3(name, args.camera.transform.globalPosition);
    };
});
EnvUniformValueResolver.addResolver("_cameraDirection", function (valInfo, name) {
    return function (proxy, args) {
        return proxy.uniformVector3(name, args.camera.transform.forward);
    };
});
EnvUniformValueResolver.addDynamicResolver(function (valInfo, name) {
    if (valInfo.variableType === "sampler2D" && valInfo.variableAnnotation["type"] === "backbuffer") {
        return function (proxy, mat) {
            proxy.uniformTexture2D(name, mat.buffers[valInfo.variableAnnotation["name"]]);
        };
    }
});

function _getDecl(converter, defaultValue, register) {
    return {
        converter: converter,
        defaultValue: defaultValue,
        register: register
    };
}
// return default value if annotation containing default value. if not, return provided default value.
function _resolveDefault(vi, defaultValue) {
    if (vi.variableAnnotation.default) {
        return vi.variableAnnotation.default;
    } else {
        return defaultValue;
    }
}
function _registerUserUniforms(input) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var promises, attributes, _loop, variableName, _ret;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        promises = [];
                        attributes = input.info.gomlAttributes;

                        _loop = function _loop(variableName) {
                            if (variableName.charAt(0) === "_") {
                                // this should not assigned by material argument
                                return "continue";
                            }
                            var valName = variableName;
                            var uniforms = input.info.uniforms;
                            var variableInfo = uniforms[variableName];
                            var annotations = variableInfo.variableAnnotation;
                            if (GLSLUtil.isPrimitive(variableInfo.variableType)) {
                                if (variableInfo.isArray) {
                                    switch (variableInfo.variableType) {
                                        case "float":
                                            var defaultArray = new Array();
                                            defaultArray = defaultArray.map(function (p) {
                                                return 0;
                                            });
                                            attributes[valName] = _getDecl("NumberArray", _resolveDefault(variableInfo, defaultArray), function (proxy, matArg) {
                                                proxy.uniformFloatArray(valName, matArg.attributeValues[valName]);
                                            });
                                            break;
                                        default:
                                            throw new Error("Unsupported array type " + variableInfo.variableType);
                                    }
                                } else {
                                    (function () {
                                        switch (variableInfo.variableType) {
                                            case "bool":
                                                attributes[valName] = _getDecl("Boolean", _resolveDefault(variableInfo, false), function (proxy, matArg) {
                                                    proxy.uniformBool(valName, matArg.attributeValues[valName]);
                                                });
                                                break;
                                            case "float":
                                                attributes[valName] = _getDecl("Number", _resolveDefault(variableInfo, 0), function (proxy, matArg) {
                                                    proxy.uniformFloat(valName, matArg.attributeValues[valName]);
                                                });
                                                break;
                                            case "vec2":
                                                attributes[valName] = _getDecl("Vector2", _resolveDefault(variableInfo, "0,0"), function (proxy, matArg) {
                                                    proxy.uniformVector2(valName, matArg.attributeValues[valName]);
                                                });
                                                break;
                                            case "vec3":
                                                if (annotations["type"] === "color") {
                                                    attributes[valName] = _getDecl("Color3", _resolveDefault(variableInfo, "#000"), function (proxy, matArg) {
                                                        proxy.uniformColor3(valName, matArg.attributeValues[valName]);
                                                    });
                                                } else {
                                                    attributes[valName] = _getDecl("Vector3", _resolveDefault(variableInfo, "0,0,0"), function (proxy, matArg) {
                                                        proxy.uniformVector3(valName, matArg.attributeValues[valName]);
                                                    });
                                                }
                                                break;
                                            case "vec4":
                                                if (annotations["type"] === "color") {
                                                    attributes[valName] = _getDecl("Color4", _resolveDefault(variableInfo, "#0000"), function (proxy, matArg) {
                                                        proxy.uniformColor4(valName, matArg.attributeValues[valName]);
                                                    });
                                                } else {
                                                    attributes[valName] = _getDecl("Vector4", _resolveDefault(variableInfo, "0,0,0,0"), function (proxy, matArg) {
                                                        proxy.uniformVector4(valName, matArg.attributeValues[valName]);
                                                    });
                                                }
                                                break;
                                            case "sampler2D":
                                                var flagAssignTo = undefined;
                                                // check used flag is existing
                                                if (annotations["usedFlag"]) {
                                                    if (annotations["usedFlag"] !== void 0) {
                                                        flagAssignTo = annotations["usedFlag"];
                                                    }
                                                }
                                                attributes[valName] = _getDecl("MaterialTexture", _resolveDefault(variableInfo, undefined), function (proxy, matArgs) {
                                                    var texture = void 0;
                                                    if (matArgs.attributeValues[valName] && (texture = matArgs.attributeValues[valName](matArgs.buffers))) {
                                                        proxy.uniformTexture2D(valName, texture);
                                                        if (flagAssignTo) {
                                                            proxy.uniformBool(flagAssignTo, true);
                                                        }
                                                    } else {
                                                        proxy.uniformTexture2D(valName, matArgs.defaultTexture);
                                                        if (flagAssignTo) {
                                                            proxy.uniformBool(flagAssignTo, false);
                                                        }
                                                    }
                                                });
                                                break;
                                            default:
                                                throw new Error("Unsupported type was found");
                                        }
                                    })();
                                }
                            } else {
                                debugger;
                            }
                        };

                        _context.t0 = _regenerator2.default.keys(input.info.uniforms);

                    case 4:
                        if ((_context.t1 = _context.t0()).done) {
                            _context.next = 11;
                            break;
                        }

                        variableName = _context.t1.value;
                        _ret = _loop(variableName);

                        if (!(_ret === "continue")) {
                            _context.next = 9;
                            break;
                        }

                        return _context.abrupt("continue", 4);

                    case 9:
                        _context.next = 4;
                        break;

                    case 11:
                        _context.next = 13;
                        return _promise2.default.all(promises);

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
/**
 * Register system shader variables whose name starts with _.
 * @param  {ITransformingArgument} input [description]
 * @return {Promise<void>}           [description]
 */
function _registerEnvUniforms(input) {
    var registerers = input.info.systemRegisterers;
    for (var variableName in input.info.uniforms) {
        if (variableName.charAt(0) === "_") {
            var _variableInfo = input.info.uniforms[variableName];
            var resolver = EnvUniformValueResolver.resolve(variableName, _variableInfo);
            if (resolver) {
                registerers.push(resolver);
                continue;
            }
            throw new Error("Unknown environment uniform variable " + variableName);
        }
    }
}
var UniformRegisterer = function UniformRegisterer(input) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _registerUserUniforms(input);

                    case 2:
                        _registerEnvUniforms(input);
                        return _context2.abrupt("return", input);

                    case 4:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
};

function _removeComment(source) {
    var text = "";
    var isLineComment = false;
    var isMultiLineComment = false;
    for (var i = 0; i < source.length; i++) {
        var c = source.charAt(i);
        if (c === "/") {
            if (i + 1 < source.length) {
                if (source.charAt(i + 1) === "/" && !isMultiLineComment) {
                    isLineComment = true;
                    i++;
                    continue;
                } else if (source.charAt(i + 1) === "*" && !isLineComment) {
                    isMultiLineComment = true;
                    i++;
                    continue;
                }
            }
        }
        if (c === "*" && isMultiLineComment && i + 1 < source.length && source.charAt(i + 1) === "/") {
            isMultiLineComment = false;
            i++;
            continue;
        }
        if (c === "\n" && isLineComment) {
            isLineComment = false;
            continue;
        }
        if (!isLineComment && !isMultiLineComment) {
            text += c;
        }
    }
    return text;
}
var CommentRemover = function CommentRemover(input) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        input.info.shaderSource = _removeComment(input.info.shaderSource);
                        return _context3.abrupt("return", input);

                    case 2:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
};

/**
 * Resolve resources with caching.
 */

var CacheResolver = function () {
    function CacheResolver(toAbsolute) {
        (0, _classCallCheck3.default)(this, CacheResolver);

        this.toAbsolute = toAbsolute;
        this.cache = {};
        this.resolvers = {};
    }

    (0, _createClass3.default)(CacheResolver, [{
        key: "resolve",
        value: function resolve(src, resolver) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee4() {
                var abs, result;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                abs = this.toAbsolute(src);

                                if (!this._cached(abs)) {
                                    _context4.next = 5;
                                    break;
                                }

                                return _context4.abrupt("return", this.cache[abs]);

                            case 5:
                                if (!this._resolving(abs)) {
                                    _context4.next = 11;
                                    break;
                                }

                                _context4.next = 8;
                                return this.resolvers[abs];

                            case 8:
                                return _context4.abrupt("return", _context4.sent);

                            case 11:
                                this.resolvers[abs] = resolver(abs);
                                _context4.next = 14;
                                return this.resolvers[abs];

                            case 14:
                                result = _context4.sent;

                                this._resolved(abs, result);
                                return _context4.abrupt("return", result);

                            case 17:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
    }, {
        key: "_cached",
        value: function _cached(abs) {
            return typeof this.cache[abs] !== "undefined";
        }
    }, {
        key: "_resolving",
        value: function _resolving(abs) {
            return typeof this.resolvers[abs] !== "undefined";
        }
    }, {
        key: "_resolved",
        value: function _resolved(abs, result) {
            delete this.resolvers[abs];
            this.cache[abs] = result;
        }
    }]);
    return CacheResolver;
}();

var ImportResolver = function (_CacheResolver) {
    (0, _inherits3.default)(ImportResolver, _CacheResolver);

    function ImportResolver() {
        (0, _classCallCheck3.default)(this, ImportResolver);

        var _this26 = (0, _possibleConstructorReturn3.default)(this, (ImportResolver.__proto__ || (0, _getPrototypeOf2.default)(ImportResolver)).call(this, function (str) {
            var regex = /^https?:\/\/.*/gm;
            return regex.test(str) ? ImportResolver._toAbsolute(str) : str;
        }));

        _this26.staticImports = {};
        return _this26;
    }

    (0, _createClass3.default)(ImportResolver, [{
        key: "resolve",
        value: function resolve(path) {
            var _this27 = this;

            return (0, _get3.default)(ImportResolver.prototype.__proto__ || (0, _getPrototypeOf2.default)(ImportResolver.prototype), "resolve", this).call(this, path, function (abs) {
                return _this27._resolve(path);
            });
        }
    }, {
        key: "_resolve",
        value: function _resolve(path) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee5() {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (!this.staticImports[path]) {
                                    _context5.next = 4;
                                    break;
                                }

                                return _context5.abrupt("return", this.staticImports[path]);

                            case 4:
                                _context5.next = 6;
                                return this._fromExternal(path);

                            case 6:
                                return _context5.abrupt("return", _context5.sent);

                            case 7:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));
        }
    }, {
        key: "_fromExternal",
        value: function _fromExternal(path) {
            return new _promise2.default(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", path);
                xhr.onload = function (v) {
                    resolve(xhr.responseText);
                };
                xhr.onerror = function (e) {
                    reject(e);
                };
                xhr.send();
            });
        }
    }], [{
        key: "_toAbsolute",
        value: function _toAbsolute(href) {
            var link = document.createElement("a");
            link.href = href;
            return link.protocol + "//" + link.host + link.pathname + link.search + link.hash;
        }
    }]);
    return ImportResolver;
}(CacheResolver);

var ImportResolver$1 = new ImportResolver();

function _parseImport(source) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee6() {
        var regexResult, importContent;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        if (!true) {
                            _context6.next = 16;
                            break;
                        }

                        regexResult = /\s*@import\s+"([^"]+)"/.exec(source);

                        if (regexResult) {
                            _context6.next = 4;
                            break;
                        }

                        return _context6.abrupt("break", 16);

                    case 4:
                        importContent = void 0;
                        _context6.next = 7;
                        return ImportResolver$1.resolve(regexResult[1]);

                    case 7:
                        _context6.t0 = _context6.sent;
                        _context6.next = 10;
                        return _parseImport(_context6.t0);

                    case 10:
                        importContent = _context6.sent;

                        if (importContent) {
                            _context6.next = 13;
                            break;
                        }

                        throw new Error("Required shader chunk '" + regexResult[1] + "' was not found!!");

                    case 13:
                        source = source.replace(regexResult[0], "\n" + importContent + "\n");
                        _context6.next = 0;
                        break;

                    case 16:
                        return _context6.abrupt("return", source);

                    case 17:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));
}
var ImportTransformer = function ImportTransformer(input) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee7() {
        var transformed;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return _parseImport(input.info.shaderSource);

                    case 2:
                        transformed = _context7.sent;

                        input.info.shaderSource = transformed;
                        return _context7.abrupt("return", input);

                    case 5:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));
};

var json5 = createCommonjsModule(function (module, exports) {
    // json5.js
    // Modern JSON. See README.md for details.
    //
    // This file is based directly off of Douglas Crockford's json_parse.js:
    // https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js

    var JSON5 = (typeof exports === "undefined" ? "undefined" : (0, _typeof3.default)(exports)) === 'object' ? exports : {};

    JSON5.parse = function () {
        "use strict";

        // This is a function that can parse a JSON5 text, producing a JavaScript
        // data structure. It is a simple, recursive descent parser. It does not use
        // eval or regular expressions, so it can be used as a model for implementing
        // a JSON5 parser in other languages.

        // We are defining the function inside of another function to avoid creating
        // global variables.

        var at,
            // The index of the current character
        lineNumber,
            // The current line number
        columnNumber,
            // The current column number
        ch,
            // The current character
        escapee = {
            "'": "'",
            '"': '"',
            '\\': '\\',
            '/': '/',
            '\n': '', // Replace escaped newlines in strings w/ empty string
            b: '\b',
            f: '\f',
            n: '\n',
            r: '\r',
            t: '\t'
        },
            ws = [' ', '\t', '\r', '\n', '\v', '\f', '\xA0', "\uFEFF"],
            text,
            renderChar = function renderChar(chr) {
            return chr === '' ? 'EOF' : "'" + chr + "'";
        },
            error = function error(m) {

            // Call error when something is wrong.

            var error = new SyntaxError();
            // beginning of message suffix to agree with that provided by Gecko - see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
            error.message = m + " at line " + lineNumber + " column " + columnNumber + " of the JSON5 data. Still to read: " + (0, _stringify2.default)(text.substring(at - 1, at + 19));
            error.at = at;
            // These two property names have been chosen to agree with the ones in Gecko, the only popular
            // environment which seems to supply this info on JSON.parse
            error.lineNumber = lineNumber;
            error.columnNumber = columnNumber;
            throw error;
        },
            next = function next(c) {

            // If a c parameter is provided, verify that it matches the current character.

            if (c && c !== ch) {
                error("Expected " + renderChar(c) + " instead of " + renderChar(ch));
            }

            // Get the next character. When there are no more characters,
            // return the empty string.

            ch = text.charAt(at);
            at++;
            columnNumber++;
            if (ch === '\n' || ch === '\r' && peek() !== '\n') {
                lineNumber++;
                columnNumber = 0;
            }
            return ch;
        },
            peek = function peek() {

            // Get the next character without consuming it or
            // assigning it to the ch varaible.

            return text.charAt(at);
        },
            identifier = function identifier() {

            // Parse an identifier. Normally, reserved words are disallowed here, but we
            // only use this for unquoted object keys, where reserved words are allowed,
            // so we don't check for those here. References:
            // - http://es5.github.com/#x7.6
            // - https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Core_Language_Features#Variables
            // - http://docstore.mik.ua/orelly/webprog/jscript/ch02_07.htm
            // TODO Identifiers can have Unicode "letters" in them; add support for those.

            var key = ch;

            // Identifiers must start with a letter, _ or $.
            if (ch !== '_' && ch !== '$' && (ch < 'a' || ch > 'z') && (ch < 'A' || ch > 'Z')) {
                error("Bad identifier as unquoted key");
            }

            // Subsequent characters can contain digits.
            while (next() && (ch === '_' || ch === '$' || ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9')) {
                key += ch;
            }

            return key;
        },
            number = function number() {

            // Parse a number value.

            var number,
                sign = '',
                string = '',
                base = 10;

            if (ch === '-' || ch === '+') {
                sign = ch;
                next(ch);
            }

            // support for Infinity (could tweak to allow other words):
            if (ch === 'I') {
                number = word();
                if (typeof number !== 'number' || isNaN(number)) {
                    error('Unexpected word for number');
                }
                return sign === '-' ? -number : number;
            }

            // support for NaN
            if (ch === 'N') {
                number = word();
                if (!isNaN(number)) {
                    error('expected word to be NaN');
                }
                // ignore sign as -NaN also is NaN
                return number;
            }

            if (ch === '0') {
                string += ch;
                next();
                if (ch === 'x' || ch === 'X') {
                    string += ch;
                    next();
                    base = 16;
                } else if (ch >= '0' && ch <= '9') {
                    error('Octal literal');
                }
            }

            switch (base) {
                case 10:
                    while (ch >= '0' && ch <= '9') {
                        string += ch;
                        next();
                    }
                    if (ch === '.') {
                        string += '.';
                        while (next() && ch >= '0' && ch <= '9') {
                            string += ch;
                        }
                    }
                    if (ch === 'e' || ch === 'E') {
                        string += ch;
                        next();
                        if (ch === '-' || ch === '+') {
                            string += ch;
                            next();
                        }
                        while (ch >= '0' && ch <= '9') {
                            string += ch;
                            next();
                        }
                    }
                    break;
                case 16:
                    while (ch >= '0' && ch <= '9' || ch >= 'A' && ch <= 'F' || ch >= 'a' && ch <= 'f') {
                        string += ch;
                        next();
                    }
                    break;
            }

            if (sign === '-') {
                number = -string;
            } else {
                number = +string;
            }

            if (!isFinite(number)) {
                error("Bad number");
            } else {
                return number;
            }
        },
            string = function string() {

            // Parse a string value.

            var hex,
                i,
                string = '',
                delim,
                // double quote or single quote
            uffff;

            // When parsing for string values, we must look for ' or " and \ characters.

            if (ch === '"' || ch === "'") {
                delim = ch;
                while (next()) {
                    if (ch === delim) {
                        next();
                        return string;
                    } else if (ch === '\\') {
                        next();
                        if (ch === 'u') {
                            uffff = 0;
                            for (i = 0; i < 4; i += 1) {
                                hex = parseInt(next(), 16);
                                if (!isFinite(hex)) {
                                    break;
                                }
                                uffff = uffff * 16 + hex;
                            }
                            string += String.fromCharCode(uffff);
                        } else if (ch === '\r') {
                            if (peek() === '\n') {
                                next();
                            }
                        } else if (typeof escapee[ch] === 'string') {
                            string += escapee[ch];
                        } else {
                            break;
                        }
                    } else if (ch === '\n') {
                        // unescaped newlines are invalid; see:
                        // https://github.com/aseemk/json5/issues/24
                        // TODO this feels special-cased; are there other
                        // invalid unescaped chars?
                        break;
                    } else {
                        string += ch;
                    }
                }
            }
            error("Bad string");
        },
            inlineComment = function inlineComment() {

            // Skip an inline comment, assuming this is one. The current character should
            // be the second / character in the // pair that begins this inline comment.
            // To finish the inline comment, we look for a newline or the end of the text.

            if (ch !== '/') {
                error("Not an inline comment");
            }

            do {
                next();
                if (ch === '\n' || ch === '\r') {
                    next();
                    return;
                }
            } while (ch);
        },
            blockComment = function blockComment() {

            // Skip a block comment, assuming this is one. The current character should be
            // the * character in the /* pair that begins this block comment.
            // To finish the block comment, we look for an ending */ pair of characters,
            // but we also watch for the end of text before the comment is terminated.

            if (ch !== '*') {
                error("Not a block comment");
            }

            do {
                next();
                while (ch === '*') {
                    next('*');
                    if (ch === '/') {
                        next('/');
                        return;
                    }
                }
            } while (ch);

            error("Unterminated block comment");
        },
            comment = function comment() {

            // Skip a comment, whether inline or block-level, assuming this is one.
            // Comments always begin with a / character.

            if (ch !== '/') {
                error("Not a comment");
            }

            next('/');

            if (ch === '/') {
                inlineComment();
            } else if (ch === '*') {
                blockComment();
            } else {
                error("Unrecognized comment");
            }
        },
            white = function white() {

            // Skip whitespace and comments.
            // Note that we're detecting comments by only a single / character.
            // This works since regular expressions are not valid JSON(5), but this will
            // break if there are other valid values that begin with a / character!

            while (ch) {
                if (ch === '/') {
                    comment();
                } else if (ws.indexOf(ch) >= 0) {
                    next();
                } else {
                    return;
                }
            }
        },
            word = function word() {

            // true, false, or null.

            switch (ch) {
                case 't':
                    next('t');
                    next('r');
                    next('u');
                    next('e');
                    return true;
                case 'f':
                    next('f');
                    next('a');
                    next('l');
                    next('s');
                    next('e');
                    return false;
                case 'n':
                    next('n');
                    next('u');
                    next('l');
                    next('l');
                    return null;
                case 'I':
                    next('I');
                    next('n');
                    next('f');
                    next('i');
                    next('n');
                    next('i');
                    next('t');
                    next('y');
                    return Infinity;
                case 'N':
                    next('N');
                    next('a');
                    next('N');
                    return NaN;
            }
            error("Unexpected " + renderChar(ch));
        },
            value,
            // Place holder for the value function.

        array = function array() {

            // Parse an array value.

            var array = [];

            if (ch === '[') {
                next('[');
                white();
                while (ch) {
                    if (ch === ']') {
                        next(']');
                        return array; // Potentially empty array
                    }
                    // ES5 allows omitting elements in arrays, e.g. [,] and
                    // [,null]. We don't allow this in JSON5.
                    if (ch === ',') {
                        error("Missing array element");
                    } else {
                        array.push(value());
                    }
                    white();
                    // If there's no comma after this value, this needs to
                    // be the end of the array.
                    if (ch !== ',') {
                        next(']');
                        return array;
                    }
                    next(',');
                    white();
                }
            }
            error("Bad array");
        },
            object = function object() {

            // Parse an object value.

            var key,
                object = {};

            if (ch === '{') {
                next('{');
                white();
                while (ch) {
                    if (ch === '}') {
                        next('}');
                        return object; // Potentially empty object
                    }

                    // Keys can be unquoted. If they are, they need to be
                    // valid JS identifiers.
                    if (ch === '"' || ch === "'") {
                        key = string();
                    } else {
                        key = identifier();
                    }

                    white();
                    next(':');
                    object[key] = value();
                    white();
                    // If there's no comma after this pair, this needs to be
                    // the end of the object.
                    if (ch !== ',') {
                        next('}');
                        return object;
                    }
                    next(',');
                    white();
                }
            }
            error("Bad object");
        };

        value = function value() {

            // Parse a JSON value. It could be an object, an array, a string, a number,
            // or a word.

            white();
            switch (ch) {
                case '{':
                    return object();
                case '[':
                    return array();
                case '"':
                case "'":
                    return string();
                case '-':
                case '+':
                case '.':
                    return number();
                default:
                    return ch >= '0' && ch <= '9' ? number() : word();
            }
        };

        // Return the json_parse function. It will have access to all of the above
        // functions and variables.

        return function (source, reviver) {
            var result;

            text = String(source);
            at = 0;
            lineNumber = 1;
            columnNumber = 1;
            ch = ' ';
            result = value();
            white();
            if (ch) {
                error("Syntax error");
            }

            // If there is a reviver function, we recursively walk the new structure,
            // passing each name/value pair to the reviver function for possible
            // transformation, starting with a temporary root object that holds the result
            // in an empty key. If there is not a reviver function, we simply return the
            // result.

            return typeof reviver === 'function' ? function walk(holder, key) {
                var k,
                    v,
                    value = holder[key];
                if (value && (typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }({ '': result }, '') : result;
        };
    }();

    // JSON5 stringify will not quote keys where appropriate
    JSON5.stringify = function (obj, replacer, space) {
        if (replacer && typeof replacer !== "function" && !isArray(replacer)) {
            throw new Error('Replacer must be a function or an array');
        }
        var getReplacedValueOrUndefined = function getReplacedValueOrUndefined(holder, key, isTopLevel) {
            var value = holder[key];

            // Replace the value with its toJSON value first, if possible
            if (value && value.toJSON && typeof value.toJSON === "function") {
                value = value.toJSON();
            }

            // If the user-supplied replacer if a function, call it. If it's an array, check objects' string keys for
            // presence in the array (removing the key/value pair from the resulting JSON if the key is missing).
            if (typeof replacer === "function") {
                return replacer.call(holder, key, value);
            } else if (replacer) {
                if (isTopLevel || isArray(holder) || replacer.indexOf(key) >= 0) {
                    return value;
                } else {
                    return undefined;
                }
            } else {
                return value;
            }
        };

        function isWordChar(c) {
            return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c >= '0' && c <= '9' || c === '_' || c === '$';
        }

        function isWordStart(c) {
            return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c === '_' || c === '$';
        }

        function isWord(key) {
            if (typeof key !== 'string') {
                return false;
            }
            if (!isWordStart(key[0])) {
                return false;
            }
            var i = 1,
                length = key.length;
            while (i < length) {
                if (!isWordChar(key[i])) {
                    return false;
                }
                i++;
            }
            return true;
        }

        // export for use in tests
        JSON5.isWord = isWord;

        // polyfills
        function isArray(obj) {
            if (Array.isArray) {
                return Array.isArray(obj);
            } else {
                return Object.prototype.toString.call(obj) === '[object Array]';
            }
        }

        function isDate(obj) {
            return Object.prototype.toString.call(obj) === '[object Date]';
        }

        var objStack = [];
        function checkForCircular(obj) {
            for (var i = 0; i < objStack.length; i++) {
                if (objStack[i] === obj) {
                    throw new TypeError("Converting circular structure to JSON");
                }
            }
        }

        function makeIndent(str, num, noNewLine) {
            if (!str) {
                return "";
            }
            // indentation no more than 10 chars
            if (str.length > 10) {
                str = str.substring(0, 10);
            }

            var indent = noNewLine ? "" : "\n";
            for (var i = 0; i < num; i++) {
                indent += str;
            }

            return indent;
        }

        var indentStr;
        if (space) {
            if (typeof space === "string") {
                indentStr = space;
            } else if (typeof space === "number" && space >= 0) {
                indentStr = makeIndent(" ", space, true);
            } else {
                // ignore space parameter
            }
        }

        // Copied from Crokford's implementation of JSON
        // See https://github.com/douglascrockford/JSON-js/blob/e39db4b7e6249f04a195e7dd0840e610cc9e941e/json2.js#L195
        // Begin
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            meta = { // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        function escapeString(string) {

            // If the string contains no control characters, no quote characters, and no
            // backslash characters, then we can safely slap some quotes around it.
            // Otherwise we must also replace the offending characters with safe escape
            // sequences.
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c : "\\u" + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }
        // End

        function internalStringify(holder, key, isTopLevel) {
            var buffer, res;

            // Replace the value, if necessary
            var obj_part = getReplacedValueOrUndefined(holder, key, isTopLevel);

            if (obj_part && !isDate(obj_part)) {
                // unbox objects
                // don't unbox dates, since will turn it into number
                obj_part = obj_part.valueOf();
            }
            switch (typeof obj_part === "undefined" ? "undefined" : (0, _typeof3.default)(obj_part)) {
                case "boolean":
                    return obj_part.toString();

                case "number":
                    if (isNaN(obj_part) || !isFinite(obj_part)) {
                        return "null";
                    }
                    return obj_part.toString();

                case "string":
                    return escapeString(obj_part.toString());

                case "object":
                    if (obj_part === null) {
                        return "null";
                    } else if (isArray(obj_part)) {
                        checkForCircular(obj_part);
                        buffer = "[";
                        objStack.push(obj_part);

                        for (var i = 0; i < obj_part.length; i++) {
                            res = internalStringify(obj_part, i, false);
                            buffer += makeIndent(indentStr, objStack.length);
                            if (res === null || typeof res === "undefined") {
                                buffer += "null";
                            } else {
                                buffer += res;
                            }
                            if (i < obj_part.length - 1) {
                                buffer += ",";
                            } else if (indentStr) {
                                buffer += "\n";
                            }
                        }
                        objStack.pop();
                        buffer += makeIndent(indentStr, objStack.length, true) + "]";
                    } else {
                        checkForCircular(obj_part);
                        buffer = "{";
                        var nonEmpty = false;
                        objStack.push(obj_part);
                        for (var prop in obj_part) {
                            if (obj_part.hasOwnProperty(prop)) {
                                var value = internalStringify(obj_part, prop, false);
                                isTopLevel = false;
                                if (typeof value !== "undefined" && value !== null) {
                                    buffer += makeIndent(indentStr, objStack.length);
                                    nonEmpty = true;
                                    key = isWord(prop) ? prop : escapeString(prop);
                                    buffer += key + ":" + (indentStr ? ' ' : '') + value + ",";
                                }
                            }
                        }
                        objStack.pop();
                        if (nonEmpty) {
                            buffer = buffer.substring(0, buffer.length - 1) + makeIndent(indentStr, objStack.length) + "}";
                        } else {
                            buffer = '{}';
                        }
                    }
                    return buffer;
                default:
                    // functions and undefined should be ignored
                    return undefined;
            }
        }

        // special case...when undefined is used inside of
        // a compound object/array, return null.
        // but when top-level, return undefined
        var topLevelHolder = { "": obj };
        if (obj === undefined) {
            return getReplacedValueOrUndefined(topLevelHolder, '', true);
        }
        return internalStringify(topLevelHolder, '', true);
    };
});

function _parseVariableAttributes(attributes) {
    return json5.parse(attributes);
}
function _generateVariableFetchRegex(variableType) {
    return new RegExp("(?:@(\\{.+\\}))?\\s*" + variableType + "\\s+(?:(lowp|mediump|highp)\\s+)?([a-z0-9A-Z]+)\\s+([a-zA-Z0-9_]+)(?:\\s*\\[\\s*([a-zA-Z0-9_]+)\\s*\\]\\s*)?\\s*;", "g");
}
function _parseVariables(source, variableType) {
    var result = {};
    var regex = _generateVariableFetchRegex(variableType);
    var regexResult = void 0;

    var _loop2 = function _loop2() {
        var name = regexResult[4];
        var type = regexResult[3];
        var precision = regexResult[2];
        var rawAnnotations = regexResult[1];
        var isArray = regexResult[5] !== void 0;
        var arrayCount = undefined;
        if (isArray) {
            (function () {
                var c = parseInt(regexResult[5], 10);
                arrayCount = function arrayCount() {
                    return c;
                };
                if (isNaN(c)) {
                    arrayCount = function (_arrayCount) {
                        function arrayCount(_x2) {
                            return _arrayCount.apply(this, arguments);
                        }

                        arrayCount.toString = function () {
                            return _arrayCount.toString();
                        };

                        return arrayCount;
                    }(function (m) {
                        return m[arrayCount];
                    });
                }
            })();
        }
        result[name] = {
            variableName: name,
            variableType: type,
            variablePrecision: precision,
            variableAnnotation: rawAnnotations ? _parseVariableAttributes(rawAnnotations) : {},
            isArray: isArray,
            arrayLength: arrayCount
        };
    };

    while (regexResult = regex.exec(source)) {
        _loop2();
    }
    return result;
}
var VariableParser = function VariableParser(type) {
    return function (arg) {
        return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee8() {
            var variables;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            variables = _parseVariables(arg.info.shaderSource, type);
                            _context8.t0 = type;
                            _context8.next = _context8.t0 === "uniform" ? 4 : _context8.t0 === "attribute" ? 6 : 8;
                            break;

                        case 4:
                            arg.info.uniforms = variables;
                            return _context8.abrupt("break", 9);

                        case 6:
                            arg.info.attributes = variables;
                            return _context8.abrupt("break", 9);

                        case 8:
                            throw new Error("Unknown variable type!!");

                        case 9:
                            return _context8.abrupt("return", arg);

                        case 10:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));
    };
};

function _removeVariableAnnotations(source) {
    var regexResult = void 0;
    while (regexResult = /@\{.+\}/g.exec(source)) {
        source = source.substr(0, regexResult.index) + source.substring(regexResult.index + regexResult[0].length, source.length);
    }
    return source;
}
var VariableAnnotationRemover = function VariableAnnotationRemover(input) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee9() {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        input.info.shaderSource = _removeVariableAnnotations(input.info.shaderSource);
                        return _context9.abrupt("return", input);

                    case 2:
                    case "end":
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));
};

function _regexGLConfigs(source) {
    var regex, regexResult;
    return _regenerator2.default.wrap(function _regexGLConfigs$(_context10) {
        while (1) {
            switch (_context10.prev = _context10.next) {
                case 0:
                    regex = /@([a-zA-Z]+)\(([^)]*)\)/g;
                    regexResult = void 0;

                case 2:
                    if (!(regexResult = regex.exec(source))) {
                        _context10.next = 7;
                        break;
                    }

                    _context10.next = 5;
                    return {
                        name: regexResult[1],
                        args: regexResult[2].split(",")
                    };

                case 5:
                    _context10.next = 2;
                    break;

                case 7:
                case "end":
                    return _context10.stop();
            }
        }
    }, _marked[0], this);
}
function _enablingFunc(target, enabled) {
    if (enabled) {
        return function (gl) {
            gl.enable(target);
        };
    } else {
        return function (gl) {
            gl.disable(target);
        };
    }
}
function _asGLConstants(args, length) {
    if (args.length !== length) {
        throw new Error("The arguments should contain " + length + " of items but there was " + args.length);
    }
    return args.map(function (arg) {
        var value = WebGLRenderingContext[arg.toUpperCase().trim()];
        if (value !== void 0) {
            return value;
        } else {
            throw new Error("Specified WebGL constant " + arg + " was not found");
        }
    });
}
function _parseGLConfigs(source) {
    var configs = _regexGLConfigs(source);
    var configResult = void 0;
    var result = [];
    var depthEnabled = true,
        blendEnabled = true,
        cullEnabled = true;
    while (configResult = configs.next()) {
        if (configResult.done) {
            break;
        }
        var config = configResult.value;

        (function () {
            switch (config.name) {
                case "NoDepth":
                    depthEnabled = false;
                    break;
                case "DepthFunc":
                    depthEnabled = true;
                    var depth = _asGLConstants(config.args, 1);
                    result.push(function (gl) {
                        gl.depthFunc(depth[0]);
                    });
                    break;
                case "NoBlend":
                    blendEnabled = false;
                    break;
                case "NoCull":
                    cullEnabled = false;
                    break;
                case "CullFace":
                    cullEnabled = true;
                    var cullConfig = _asGLConstants(config.args, 1);
                    result.push(function (gl) {
                        gl.cullFace(cullConfig[0]);
                    });
                    break;
                case "BlendFunc":
                    blendEnabled = true;
                    var blendFuncConfig = _asGLConstants(config.args, 2);
                    result.push(function (gl) {
                        gl.blendFunc(blendFuncConfig[0], blendFuncConfig[1]);
                    });
                    break;
                case "BlendFuncSeparate":
                    blendEnabled = true;
                    var blendFuncSeparate = _asGLConstants(config.args, 4);
                    result.push(function (gl) {
                        gl.blendFuncSeparate(blendFuncSeparate[0], blendFuncSeparate[1], blendFuncSeparate[2], blendFuncSeparate[3]);
                    });
                    break;
                case "BlendEquation":
                    blendEnabled = true;
                    var blendEquation = _asGLConstants(config.args, 1);
                    result.push(function (gl) {
                        gl.blendEquation(blendEquation[0]);
                    });
                    break;
                case "BlendEquationSeparate":
                    blendEnabled = true;
                    var blendEquationSeparate = _asGLConstants(config.args, 2);
                    result.push(function (gl) {
                        gl.blendEquationSeparate(blendEquationSeparate[0], blendEquationSeparate[1]);
                    });
                    break;
            }
        })();
    }
    result.unshift(_enablingFunc(WebGLRenderingContext.DEPTH_TEST, depthEnabled));
    result.unshift(_enablingFunc(WebGLRenderingContext.BLEND, blendEnabled));
    result.unshift(_enablingFunc(WebGLRenderingContext.CULL_FACE, cullEnabled));
    return result;
}
var BasicGLConfigParser = function BasicGLConfigParser(input) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee10() {
        return _regenerator2.default.wrap(function _callee10$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        input.info.configurator = _parseGLConfigs(input.info.shaderSource);
                        return _context11.abrupt("return", input);

                    case 2:
                    case "end":
                        return _context11.stop();
                }
            }
        }, _callee10, this);
    }));
};

function _removeAnnotations(source) {
    var regex = /(\s*@[a-zA-Z]*\([^)]*\))/;
    while (true) {
        var found = regex.exec(source);
        if (!found) {
            break;
        }
        source = source.replace(found[0], "");
    }
    return source;
}
var AnnotationRemover = function AnnotationRemover(input) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee11() {
        return _regenerator2.default.wrap(function _callee11$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        input.info.shaderSource = _removeAnnotations(input.info.shaderSource);
                        return _context12.abrupt("return", input);

                    case 2:
                    case "end":
                        return _context12.stop();
                }
            }
        }, _callee11, this);
    }));
};

var SORTPassParser = function () {
    function SORTPassParser() {
        (0, _classCallCheck3.default)(this, SORTPassParser);
    }

    (0, _createClass3.default)(SORTPassParser, null, [{
        key: "parse",
        value: function parse(source) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee12() {
                var transformingInfo, i;
                return _regenerator2.default.wrap(function _callee12$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                transformingInfo = {
                                    origin: source,
                                    info: {
                                        shaderSource: source,
                                        uniforms: {},
                                        attributes: {},
                                        configurator: [],
                                        systemRegisterers: [],
                                        gomlAttributes: {}
                                    }
                                };
                                i = 0;

                            case 2:
                                if (!(i < SORTPassParser.transformers.length)) {
                                    _context13.next = 9;
                                    break;
                                }

                                _context13.next = 5;
                                return SORTPassParser.transformers[i](transformingInfo);

                            case 5:
                                transformingInfo = _context13.sent;

                            case 6:
                                i++;
                                _context13.next = 2;
                                break;

                            case 9:
                                return _context13.abrupt("return", transformingInfo.info);

                            case 10:
                            case "end":
                                return _context13.stop();
                        }
                    }
                }, _callee12, this);
            }));
        }
    }]);
    return SORTPassParser;
}();

SORTPassParser.transformers = [CommentRemover, ImportTransformer, VariableParser("uniform"), VariableParser("attribute"), BasicGLConfigParser, AnnotationRemover, VariableAnnotationRemover, UniformRegisterer];

var PassFactory = function () {
    function PassFactory() {
        (0, _classCallCheck3.default)(this, PassFactory);
    }

    (0, _createClass3.default)(PassFactory, null, [{
        key: "fromSORTPassInfo",

        /**
         * [Instanciate SORT pass from ISORTPassInfo]
         * @param  {WebGLRenderingContext} gl       [description]
         * @param  {ISORTPassInfo}         passInfo [description]
         * @return {Promise<SORTPass>}              [description]
         */
        value: function fromSORTPassInfo(factory, passInfo) {
            var gl = factory.gl;
            var vs = new Shader(gl, WebGLRenderingContext.VERTEX_SHADER);
            var fs = new Shader(gl, WebGLRenderingContext.FRAGMENT_SHADER);
            var program = new Program(gl);
            var tasks = [];
            factory.macro.addObserver(function () {
                PassFactory._updateShaderCode(factory, passInfo, vs, fs, program);
            });
            PassFactory._updateShaderCode(factory, passInfo, vs, fs, program);
            var attributes = PassFactory._getAttributeNames(passInfo);
            PassFactory._appendUserVariableRegistration(tasks, passInfo);
            PassFactory._appendSystemVariableRegistration(tasks, passInfo);
            PassFactory._appendGLConfigurators(tasks, passInfo);
            return new SORTPass(program, attributes, tasks, passInfo);
        }
    }, {
        key: "passInfoFromSORT",
        value: function passInfoFromSORT(source) {
            var splitted = source.split("@Pass");
            splitted.splice(0, 1); // Separate with @Pass and if there was some pass without containing @, that would be skipped since that is assumed as empty.
            return _promise2.default.all(splitted.map(function (p) {
                return SORTPassParser.parse(p);
            }));
        }
    }, {
        key: "_updateShaderCode",
        value: function _updateShaderCode(factory, passInfo, vs, fs, p) {
            vs.update(PassFactory._getShaderSource("VS", factory, passInfo.shaderSource));
            fs.update(PassFactory._getShaderSource("FS", factory, passInfo.shaderSource));
            p.update([vs, fs]);
        }
        /**
         * Generate shader source
         * @param  {string}          shaderType [description]
         * @param  {MaterialFactory} factory    [description]
         * @param  {string}          source     [description]
         * @return {string}                     [description]
         */

    }, {
        key: "_getShaderSource",
        value: function _getShaderSource(shaderType, factory, source) {
            return "#define " + shaderType + "\n" + factory.shaderHeader + "\n" + factory.macro.macroString + "\n/*BEGINNING OF USER CODE*/\n" + source;
        }
        /**
         * Obtain attribute variable names from passInfo
         * @param  {ISORTPassInfo} passInfo [description]
         * @return {string[]}               [description]
         */

    }, {
        key: "_getAttributeNames",
        value: function _getAttributeNames(passInfo) {
            var attributes = [];
            for (var key in passInfo.attributes) {
                attributes.push(key);
            }
            return attributes;
        }
        /**
         * Append configuration task of gl to pre pass tasks.
         * @param  {IMaterialArgument} tasks [description]
         * @return {[type]}                  [description]
         */

    }, {
        key: "_appendGLConfigurators",
        value: function _appendGLConfigurators(tasks, passInfo) {
            var configurators = passInfo.configurator;

            var _loop3 = function _loop3(i) {
                tasks.push(function (p) {
                    return configurators[i](p.program.gl);
                });
            };

            for (var i = 0; i < configurators.length; i++) {
                _loop3(i);
            }
        }
        /**
         * Append registration task of uniform variables exposed to attributes.
         * @param  {IMaterialArgument} tasks [description]
         * @return {[type]}                  [description]
         */

    }, {
        key: "_appendUserVariableRegistration",
        value: function _appendUserVariableRegistration(tasks, passInfo) {
            var _loop4 = function _loop4(key) {
                var registerer = passInfo.gomlAttributes[key].register;
                tasks.push(function (p, m) {
                    return registerer(p.program.uniforms, m);
                });
            };

            for (var key in passInfo.gomlAttributes) {
                _loop4(key);
            }
        }
        /**
         * Append registration task of uniform variables registered by environment.
         * @param  {IMaterialArgument} tasks [description]
         * @return {[type]}                  [description]
         */

    }, {
        key: "_appendSystemVariableRegistration",
        value: function _appendSystemVariableRegistration(tasks, passInfo) {
            var _loop5 = function _loop5(i) {
                tasks.push(function (p, args) {
                    return passInfo.systemRegisterers[i](p.program.uniforms, args);
                });
            };

            for (var i = 0; i < passInfo.systemRegisterers.length; i++) {
                _loop5(i);
            }
        }
    }]);
    return PassFactory;
}();

var ExternalResourceResolver = function (_CacheResolver2) {
    (0, _inherits3.default)(ExternalResourceResolver, _CacheResolver2);

    function ExternalResourceResolver() {
        (0, _classCallCheck3.default)(this, ExternalResourceResolver);
        return (0, _possibleConstructorReturn3.default)(this, (ExternalResourceResolver.__proto__ || (0, _getPrototypeOf2.default)(ExternalResourceResolver)).call(this, ExternalResourceResolver._toAbsolute));
    }

    (0, _createClass3.default)(ExternalResourceResolver, null, [{
        key: "_toAbsolute",
        value: function _toAbsolute(href) {
            var link = document.createElement("a");
            link.href = href;
            return link.protocol + "//" + link.host + link.pathname + link.search + link.hash;
        }
    }]);
    return ExternalResourceResolver;
}(CacheResolver);

var TextFileResolver = function (_ExternalResourceReso) {
    (0, _inherits3.default)(TextFileResolver, _ExternalResourceReso);

    function TextFileResolver() {
        (0, _classCallCheck3.default)(this, TextFileResolver);
        return (0, _possibleConstructorReturn3.default)(this, (TextFileResolver.__proto__ || (0, _getPrototypeOf2.default)(TextFileResolver)).apply(this, arguments));
    }

    (0, _createClass3.default)(TextFileResolver, [{
        key: "resolve",
        value: function resolve(path) {
            return (0, _get3.default)(TextFileResolver.prototype.__proto__ || (0, _getPrototypeOf2.default)(TextFileResolver.prototype), "resolve", this).call(this, path, function (abs) {
                return new _promise2.default(function (resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", abs);
                    xhr.onload = function (v) {
                        resolve(xhr.responseText);
                    };
                    xhr.onerror = function (e) {
                        reject(e);
                    };
                    xhr.send();
                });
            });
        }
    }]);
    return TextFileResolver;
}(ExternalResourceResolver);

var TextFileResolver$1 = new TextFileResolver();

var Material = function () {
    function Material(pass) {
        (0, _classCallCheck3.default)(this, Material);

        this.pass = pass;
    }

    (0, _createClass3.default)(Material, [{
        key: "draw",
        value: function draw(arg) {
            this.pass.forEach(function (p) {
                return p.draw(arg);
            });
        }
    }]);
    return Material;
}();

var ShaderHeader = "/*Header start*/\n// helper macros\n#ifdef FS\n  #define FS_PREC(prec,type) precision prec type;\n  #define VS_PREC(prec,type)\n#endif\n#ifdef VS\n#define VS_PREC(prec,type) precision prec type;\n#define FS_PREC(prec,type)\n#endif\n// constants\n#define PI 3.141592653589793\n#define E 2.718281828459045\n#define LN2 0.6931471805599453\n#define LN10 2.302585092994046\n#define LOG2E 1.4426950408889634\n#define LOG10E 0.4342944819032518\n#define SQRT2 1.4142135623730951\n#define SQRT1_2 0.7071067811865476\n/*Header end*/\n";

/**
 * Manage factories for materials.
 * Materials can be instanciated with this instance.
 */

var MaterialFactory = function () {
    function MaterialFactory(gl) {
        (0, _classCallCheck3.default)(this, MaterialFactory);

        this.gl = gl;
        this.shaderHeader = MaterialFactory.defaultShaderHeader;
        this.macro = new MacroRegistory();
    }

    (0, _createClass3.default)(MaterialFactory, [{
        key: "instanciate",
        value: function instanciate(typeName) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee13() {
                return _regenerator2.default.wrap(function _callee13$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                if (!MaterialFactory.factories[typeName]) {
                                    _context14.next = 4;
                                    break;
                                }

                                return _context14.abrupt("return", MaterialFactory.factories[typeName](this));

                            case 4:
                                _context14.next = 6;
                                return this._waitForRegistered(typeName);

                            case 6:
                                return _context14.abrupt("return", _context14.sent);

                            case 7:
                            case "end":
                                return _context14.stop();
                        }
                    }
                }, _callee13, this);
            }));
        }
    }, {
        key: "_waitForRegistered",
        value: function _waitForRegistered(typeName) {
            var _this30 = this;

            return new _promise2.default(function (resolve) {
                MaterialFactory._onRegister(typeName, function () {
                    resolve(MaterialFactory.factories[typeName](_this30));
                });
            });
        }
    }], [{
        key: "addMaterialType",
        value: function addMaterialType(typeName, factory) {
            MaterialFactory.factories[typeName] = factory;
            if (MaterialFactory.registerdHandlers[typeName]) {
                MaterialFactory.registerdHandlers[typeName].forEach(function (t) {
                    return t();
                });
            }
        }
        /**
         * Add source of .sort material as specified typename.
         * @param  {string}        typeName [description]
         * @param  {string}        source   [description]
         * @return {Promise<void>}          [description]
         */

    }, {
        key: "addSORTMaterial",
        value: function addSORTMaterial(typeName, source) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee14() {
                var sortInfos;
                return _regenerator2.default.wrap(function _callee14$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                _context15.next = 2;
                                return PassFactory.passInfoFromSORT(source);

                            case 2:
                                sortInfos = _context15.sent;

                                MaterialFactory.addMaterialType(typeName, function (factory) {
                                    var sorts = sortInfos.map(function (p) {
                                        return PassFactory.fromSORTPassInfo(factory, p);
                                    });
                                    return new Material(sorts);
                                });

                            case 4:
                            case "end":
                                return _context15.stop();
                        }
                    }
                }, _callee14, this);
            }));
        }
        /**
         * Add source of .sort material from external url as specified typeName.
         * @param  {string}        typeName [description]
         * @param  {string}        url      [description]
         * @return {Promise<void>}          [description]
         */

    }, {
        key: "addSORTMaterialFromURL",
        value: function addSORTMaterialFromURL(typeName, url) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee15() {
                var source;
                return _regenerator2.default.wrap(function _callee15$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                _context16.next = 2;
                                return TextFileResolver$1.resolve(url);

                            case 2:
                                source = _context16.sent;
                                _context16.next = 5;
                                return MaterialFactory.addSORTMaterial(typeName, source);

                            case 5:
                            case "end":
                                return _context16.stop();
                        }
                    }
                }, _callee15, this);
            }));
        }
    }, {
        key: "_onRegister",
        value: function _onRegister(factoryName, handler) {
            if (MaterialFactory.registerdHandlers[factoryName]) {
                MaterialFactory.registerdHandlers[factoryName].push(handler);
            } else {
                MaterialFactory.registerdHandlers[factoryName] = [handler];
            }
        }
    }]);
    return MaterialFactory;
}();

MaterialFactory.defaultShaderHeader = ShaderHeader;
/**
 * Actual material generator.
 */
MaterialFactory.factories = {};
MaterialFactory.registerdHandlers = {};

var Unlit = "@Pass\nFS_PREC(mediump,float)\nvarying vec2 vTexCoord;\n#ifdef VS\nattribute vec3 position;\nattribute vec2 texCoord;\nuniform mat4 _matPVM;\nvoid main()\n{\n  gl_Position = _matPVM * vec4(position,1.0);\n  vTexCoord = texCoord;\n}\n#endif\n#ifdef FS\n@{type:\"color\",default:\"white\"}\nuniform vec4 color;\n@{usedFlag:\"textureUsed\"}\nuniform sampler2D texture;\nuniform bool textureUsed;\nvoid main(void)\n{\n  if(textureUsed){\n    gl_FragColor = color * texture2D(texture,vTexCoord);\n  }else{\n    gl_FragColor = color;\n }\n}\n#endif\n";

var UnlitColor = "@Pass\nFS_PREC(mediump,float)\nvarying vec2 vTexCoord;\n#ifdef VS\nattribute vec3 position;\nattribute vec2 texCoord;\nuniform mat4 _matPVM;\nvoid main()\n{\n  gl_Position = _matPVM * vec4(position,1.0);\n  vTexCoord = texCoord;\n}\n#endif\n#ifdef FS\n@{type:\"color\",default:\"white\"}\nuniform vec4 color;\nvoid main(void)\n{\n    gl_FragColor = color;\n}\n#endif\n";

var UnlitTexture = "@Pass\nFS_PREC(mediump,float)\nvarying vec2 vTexCoord;\n#ifdef VS\nattribute vec3 position;\nattribute vec2 texCoord;\nuniform mat4 _matPVM;\nvoid main()\n{\n  gl_Position = _matPVM * vec4(position,1.0);\n  vTexCoord = texCoord;\n}\n#endif\n#ifdef FS\nuniform sampler2D texture;\nvoid main(void)\n{\n  gl_FragColor = texture2D(texture,vTexCoord);\n}\n#endif\n";

var DefaultMaterial = function () {
    function DefaultMaterial() {
        (0, _classCallCheck3.default)(this, DefaultMaterial);
    }

    (0, _createClass3.default)(DefaultMaterial, null, [{
        key: "register",
        value: function register() {
            MaterialFactory.addSORTMaterial("unlit", Unlit);
            MaterialFactory.addSORTMaterial("unlit-texture", UnlitTexture);
            MaterialFactory.addSORTMaterial("unlit-color", UnlitColor);
        }
    }]);
    return DefaultMaterial;
}();

var GeometryUtility = function () {
    function GeometryUtility() {
        (0, _classCallCheck3.default)(this, GeometryUtility);
    }

    (0, _createClass3.default)(GeometryUtility, null, [{
        key: "fromArray",

        /**
         * Generateor wrap for array
         * @param  {number[]}                 array [description]
         * @return {IterableIterator<number>}       [description]
         */
        value: _regenerator2.default.mark(function fromArray(array) {
            var i;
            return _regenerator2.default.wrap(function fromArray$(_context17) {
                while (1) {
                    switch (_context17.prev = _context17.next) {
                        case 0:
                            i = 0;

                        case 1:
                            if (!(i < array.length)) {
                                _context17.next = 7;
                                break;
                            }

                            _context17.next = 4;
                            return array[i];

                        case 4:
                            i++;
                            _context17.next = 1;
                            break;

                        case 7:
                        case "end":
                            return _context17.stop();
                    }
                }
            }, fromArray, this);
        })
        /**
         * Convert triangles topology to lines. Basically uses for making wireframes.
         * @param  {IterableIterator<number>} indicies [description]
         * @return {IterableIterator<number>}          [description]
         */

    }, {
        key: "linesFromTriangles",
        value: _regenerator2.default.mark(function linesFromTriangles(indicies) {
            var ic, i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _index, a, b, c;

            return _regenerator2.default.wrap(function linesFromTriangles$(_context18) {
                while (1) {
                    switch (_context18.prev = _context18.next) {
                        case 0:
                            ic = new Array(3);
                            i = 0;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context18.prev = 5;
                            _iterator = (0, _getIterator3.default)(indicies);

                        case 7:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context18.next = 17;
                                break;
                            }

                            _index = _step.value;

                            ic[i % 3] = _index;

                            if (!(i % 3 === 2)) {
                                _context18.next = 13;
                                break;
                            }

                            a = ic[0], b = ic[1], c = ic[2];
                            return _context18.delegateYield([a, b, b, c, c, a], "t0", 13);

                        case 13:
                            i++;

                        case 14:
                            _iteratorNormalCompletion = true;
                            _context18.next = 7;
                            break;

                        case 17:
                            _context18.next = 23;
                            break;

                        case 19:
                            _context18.prev = 19;
                            _context18.t1 = _context18["catch"](5);
                            _didIteratorError = true;
                            _iteratorError = _context18.t1;

                        case 23:
                            _context18.prev = 23;
                            _context18.prev = 24;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 26:
                            _context18.prev = 26;

                            if (!_didIteratorError) {
                                _context18.next = 29;
                                break;
                            }

                            throw _iteratorError;

                        case 29:
                            return _context18.finish(26);

                        case 30:
                            return _context18.finish(23);

                        case 31:
                        case "end":
                            return _context18.stop();
                    }
                }
            }, linesFromTriangles, this, [[5, 19, 23, 31], [24,, 26, 30]]);
        })
        /**
         * Generator for ellipse positions
         * @param  {Vector3}                  center [the center position of ellipse]
         * @param  {Vector3}                  up     [up vector for ellipse]
         * @param  {Vector3}                  right  [right vector for ellipse]
         * @param  {number}                   divide [how many triangles should consists in the ellipse]
         * @return {IterableIterator<number>}        [Generated iterator for position]
         */

    }, {
        key: "ellipsePosition",
        value: _regenerator2.default.mark(function ellipsePosition(center, up, right, divide) {
            var step, i, theta, sin, cos;
            return _regenerator2.default.wrap(function ellipsePosition$(_context19) {
                while (1) {
                    switch (_context19.prev = _context19.next) {
                        case 0:
                            _context19.next = 2;
                            return center.X;

                        case 2:
                            _context19.next = 4;
                            return center.Y;

                        case 4:
                            _context19.next = 6;
                            return center.Z;

                        case 6:
                            step = 2 * Math.PI / divide;
                            i = 0;

                        case 8:
                            if (!(i < divide)) {
                                _context19.next = 21;
                                break;
                            }

                            theta = step * i;
                            sin = Math.sin(Math.PI * 2 - theta);
                            cos = Math.cos(Math.PI * 2 - theta);
                            _context19.next = 14;
                            return center.X + cos * up.X + sin * right.X;

                        case 14:
                            _context19.next = 16;
                            return center.Y + cos * up.Y + sin * right.Y;

                        case 16:
                            _context19.next = 18;
                            return center.Z + cos * up.Z + sin * right.Z;

                        case 18:
                            i++;
                            _context19.next = 8;
                            break;

                        case 21:
                        case "end":
                            return _context19.stop();
                    }
                }
            }, ellipsePosition, this);
        })
    }, {
        key: "trianglePosition",
        value: _regenerator2.default.mark(function trianglePosition(center, up, right) {
            var p0, p1, p2;
            return _regenerator2.default.wrap(function trianglePosition$(_context20) {
                while (1) {
                    switch (_context20.prev = _context20.next) {
                        case 0:
                            p0 = center.addWith(up);
                            p1 = center.subtractWith(up).addWith(right);
                            p2 = center.subtractWith(up).subtractWith(right);
                            return _context20.delegateYield(p0.rawElements, "t0", 4);

                        case 4:
                            return _context20.delegateYield(p1.rawElements, "t1", 5);

                        case 5:
                            return _context20.delegateYield(p2.rawElements, "t2", 6);

                        case 6:
                        case "end":
                            return _context20.stop();
                    }
                }
            }, trianglePosition, this);
        })
    }, {
        key: "cubePosition",
        value: _regenerator2.default.mark(function cubePosition(center, up, right, forward) {
            return _regenerator2.default.wrap(function cubePosition$(_context21) {
                while (1) {
                    switch (_context21.prev = _context21.next) {
                        case 0:
                            return _context21.delegateYield(GeometryUtility.quadPosition(center.subtractWith(forward), up, right), "t0", 1);

                        case 1:
                            return _context21.delegateYield(GeometryUtility.quadPosition(center.addWith(forward), up, right.negateThis()), "t1", 2);

                        case 2:
                            return _context21.delegateYield(GeometryUtility.quadPosition(center.addWith(up), forward, right), "t2", 3);

                        case 3:
                            return _context21.delegateYield(GeometryUtility.quadPosition(center.addWith(right), forward, up.negateThis()), "t3", 4);

                        case 4:
                            return _context21.delegateYield(GeometryUtility.quadPosition(center.subtractWith(up), forward, right.negateThis()), "t4", 5);

                        case 5:
                            return _context21.delegateYield(GeometryUtility.quadPosition(center.subtractWith(right), forward, up), "t5", 6);

                        case 6:
                        case "end":
                            return _context21.stop();
                    }
                }
            }, cubePosition, this);
        })
    }, {
        key: "quadPosition",
        value: _regenerator2.default.mark(function quadPosition(center, up, right) {
            var p0, p1, p2, p3;
            return _regenerator2.default.wrap(function quadPosition$(_context22) {
                while (1) {
                    switch (_context22.prev = _context22.next) {
                        case 0:
                            p0 = center.subtractWith(right).addWith(up);
                            p1 = center.addWith(right).addWith(up);
                            p2 = center.addWith(right).subtractWith(up);
                            p3 = center.subtractWith(right).subtractWith(up);
                            return _context22.delegateYield(p0.rawElements, "t0", 5);

                        case 5:
                            return _context22.delegateYield(p1.rawElements, "t1", 6);

                        case 6:
                            return _context22.delegateYield(p2.rawElements, "t2", 7);

                        case 7:
                            return _context22.delegateYield(p3.rawElements, "t3", 8);

                        case 8:
                        case "end":
                            return _context22.stop();
                    }
                }
            }, quadPosition, this);
        })
    }, {
        key: "planePosition",
        value: _regenerator2.default.mark(function planePosition(center, up, right, divide) {
            var x, y, i, j, _i, _j;

            return _regenerator2.default.wrap(function planePosition$(_context23) {
                while (1) {
                    switch (_context23.prev = _context23.next) {
                        case 0:
                            x = center.addWith(right).multiplyWith(2);
                            y = center.subtractWith(up).multiplyWith(2);
                            i = -divide / 2;

                        case 3:
                            if (!(i < divide / 2 + 1)) {
                                _context23.next = 13;
                                break;
                            }

                            j = -divide / 2;

                        case 5:
                            if (!(j < divide / 2 + 1)) {
                                _context23.next = 10;
                                break;
                            }

                            return _context23.delegateYield(x.multiplyWith(j / divide).addWith(y.multiplyWith(i / divide)).rawElements, "t0", 7);

                        case 7:
                            j++;
                            _context23.next = 5;
                            break;

                        case 10:
                            i++;
                            _context23.next = 3;
                            break;

                        case 13:
                            _i = -divide / 2;

                        case 14:
                            if (!(_i < divide / 2 + 1)) {
                                _context23.next = 24;
                                break;
                            }

                            _j = -divide / 2;

                        case 16:
                            if (!(_j < divide / 2 + 1)) {
                                _context23.next = 21;
                                break;
                            }

                            return _context23.delegateYield(x.multiplyWith(_j / divide).addWith(y.multiplyWith(_i / divide)).rawElements, "t1", 18);

                        case 18:
                            _j++;
                            _context23.next = 16;
                            break;

                        case 21:
                            _i++;
                            _context23.next = 14;
                            break;

                        case 24:
                        case "end":
                            return _context23.stop();
                    }
                }
            }, planePosition, this);
        })
    }, {
        key: "cylinderPosition",
        value: _regenerator2.default.mark(function cylinderPosition(center, up, right, forward, divide) {
            var step, d, d2, temp, i, theta, sin, cos, currentCenter, currentRight;
            return _regenerator2.default.wrap(function cylinderPosition$(_context24) {
                while (1) {
                    switch (_context24.prev = _context24.next) {
                        case 0:
                            return _context24.delegateYield(GeometryUtility.ellipsePosition(center.addWith(up), forward, right, divide), "t0", 1);

                        case 1:
                            return _context24.delegateYield(GeometryUtility.ellipsePosition(center.subtractWith(up), forward, Vector3.negate(right), divide), "t1", 2);

                        case 2:
                            step = 2 * Math.PI / divide;
                            d = Math.cos(step / 2);
                            d2 = Math.sin(step / 2);
                            temp = divide % 2 == 0 ? step / 2 : 0;
                            i = 0;

                        case 7:
                            if (!(i < divide)) {
                                _context24.next = 17;
                                break;
                            }

                            theta = step / 2 + step * i;
                            sin = Math.sin((Math.PI - step) / 2 - theta - temp);
                            cos = Math.cos((Math.PI - step) / 2 - theta - temp);
                            currentCenter = new Vector3(d * cos, center.Y, d * sin);
                            currentRight = new Vector3(Math.cos(-step / 2 - theta - temp), center.Y, Math.sin(-step / 2 - theta - temp));
                            return _context24.delegateYield(GeometryUtility.quadPosition(currentCenter, up, Vector3.multiply(d2, currentRight)), "t2", 14);

                        case 14:
                            i++;
                            _context24.next = 7;
                            break;

                        case 17:
                        case "end":
                            return _context24.stop();
                    }
                }
            }, cylinderPosition, this);
        })
    }, {
        key: "conePosition",
        value: _regenerator2.default.mark(function conePosition(center, up, right, forward, divide) {
            var step, d, d2, temp, i, theta, sin, cos, currentCenter, currentRight;
            return _regenerator2.default.wrap(function conePosition$(_context25) {
                while (1) {
                    switch (_context25.prev = _context25.next) {
                        case 0:
                            return _context25.delegateYield(GeometryUtility.ellipsePosition(center.subtractWith(up), forward, Vector3.negate(right), divide), "t0", 1);

                        case 1:
                            step = 2 * Math.PI / divide;
                            d = Math.cos(step / 2) / 2;
                            d2 = Math.sin(step / 2);
                            temp = divide % 2 == 1 ? step / 2 : 0;
                            i = 0;

                        case 6:
                            if (!(i < divide)) {
                                _context25.next = 16;
                                break;
                            }

                            theta = step * i;
                            sin = Math.sin((Math.PI - step) / 2 - theta - temp);
                            cos = Math.cos((Math.PI - step) / 2 - theta - temp);
                            currentCenter = new Vector3(d * cos, center.Y, d * sin);
                            currentRight = new Vector3(Math.cos(-step / 2 - theta - temp), center.Y, Math.sin(-step / 2 - theta - temp));
                            return _context25.delegateYield(GeometryUtility.trianglePosition(currentCenter, up.subtractWith(currentCenter), Vector3.multiply(d2, currentRight)), "t1", 13);

                        case 13:
                            i++;
                            _context25.next = 6;
                            break;

                        case 16:
                        case "end":
                            return _context25.stop();
                    }
                }
            }, conePosition, this);
        })
    }, {
        key: "spherePosition",
        value: _regenerator2.default.mark(function spherePosition(center, up, right, forward, rowDiv, circleDiv) {
            var ia, ja, j, phi, sinPhi, upVector, i, theta;
            return _regenerator2.default.wrap(function spherePosition$(_context26) {
                while (1) {
                    switch (_context26.prev = _context26.next) {
                        case 0:
                            return _context26.delegateYield(center.addWith(up).rawElements, "t0", 1);

                        case 1:
                            return _context26.delegateYield(center.subtractWith(up).rawElements, "t1", 2);

                        case 2:
                            ia = 2 * Math.PI / circleDiv;
                            ja = Math.PI / (rowDiv + 1);
                            j = 1;

                        case 5:
                            if (!(j <= rowDiv)) {
                                _context26.next = 19;
                                break;
                            }

                            phi = ja * j;
                            sinPhi = Math.sin(phi);
                            upVector = up.multiplyWith(Math.cos(phi));
                            i = 0;

                        case 10:
                            if (!(i <= circleDiv)) {
                                _context26.next = 16;
                                break;
                            }

                            theta = ia * i;
                            return _context26.delegateYield(right.multiplyWith(Math.cos(theta)).addWith(forward.multiplyWith(Math.sin(theta))).multiplyWith(sinPhi).addWith(upVector).rawElements, "t2", 13);

                        case 13:
                            i++;
                            _context26.next = 10;
                            break;

                        case 16:
                            j++;
                            _context26.next = 5;
                            break;

                        case 19:
                        case "end":
                            return _context26.stop();
                    }
                }
            }, spherePosition, this);
        })
    }, {
        key: "quadNormal",
        value: _regenerator2.default.mark(function quadNormal(normal) {
            return _regenerator2.default.wrap(function quadNormal$(_context27) {
                while (1) {
                    switch (_context27.prev = _context27.next) {
                        case 0:
                            return _context27.delegateYield(normal.rawElements, "t0", 1);

                        case 1:
                            return _context27.delegateYield(normal.rawElements, "t1", 2);

                        case 2:
                            return _context27.delegateYield(normal.rawElements, "t2", 3);

                        case 3:
                            return _context27.delegateYield(normal.rawElements, "t3", 4);

                        case 4:
                        case "end":
                            return _context27.stop();
                    }
                }
            }, quadNormal, this);
        })
    }, {
        key: "ellipseNormal",
        value: _regenerator2.default.mark(function ellipseNormal(normal, divide) {
            var i;
            return _regenerator2.default.wrap(function ellipseNormal$(_context28) {
                while (1) {
                    switch (_context28.prev = _context28.next) {
                        case 0:
                            i = 0;

                        case 1:
                            if (!(i < divide + 1)) {
                                _context28.next = 6;
                                break;
                            }

                            return _context28.delegateYield(normal.rawElements, "t0", 3);

                        case 3:
                            i++;
                            _context28.next = 1;
                            break;

                        case 6:
                        case "end":
                            return _context28.stop();
                    }
                }
            }, ellipseNormal, this);
        })
    }, {
        key: "triangleNormal",
        value: _regenerator2.default.mark(function triangleNormal(normal) {
            return _regenerator2.default.wrap(function triangleNormal$(_context29) {
                while (1) {
                    switch (_context29.prev = _context29.next) {
                        case 0:
                            return _context29.delegateYield(normal.rawElements, "t0", 1);

                        case 1:
                            return _context29.delegateYield(normal.rawElements, "t1", 2);

                        case 2:
                            return _context29.delegateYield(normal.rawElements, "t2", 3);

                        case 3:
                        case "end":
                            return _context29.stop();
                    }
                }
            }, triangleNormal, this);
        })
    }, {
        key: "cubeNormal",
        value: _regenerator2.default.mark(function cubeNormal(center, up, right, forward) {
            return _regenerator2.default.wrap(function cubeNormal$(_context30) {
                while (1) {
                    switch (_context30.prev = _context30.next) {
                        case 0:
                            return _context30.delegateYield(GeometryUtility.quadNormal(forward.negateThis()), "t0", 1);

                        case 1:
                            return _context30.delegateYield(GeometryUtility.quadNormal(forward), "t1", 2);

                        case 2:
                            return _context30.delegateYield(GeometryUtility.quadNormal(up), "t2", 3);

                        case 3:
                            return _context30.delegateYield(GeometryUtility.quadNormal(right), "t3", 4);

                        case 4:
                            return _context30.delegateYield(GeometryUtility.quadNormal(up.negateThis()), "t4", 5);

                        case 5:
                            return _context30.delegateYield(GeometryUtility.quadNormal(right.negateThis()), "t5", 6);

                        case 6:
                        case "end":
                            return _context30.stop();
                    }
                }
            }, cubeNormal, this);
        })
    }, {
        key: "cylinderNormal",
        value: _regenerator2.default.mark(function cylinderNormal(center, up, right, forward, divide) {
            var step, lastRight, i, theta, sin, cos, currentRight;
            return _regenerator2.default.wrap(function cylinderNormal$(_context31) {
                while (1) {
                    switch (_context31.prev = _context31.next) {
                        case 0:
                            return _context31.delegateYield(GeometryUtility.ellipseNormal(up, divide), "t0", 1);

                        case 1:
                            return _context31.delegateYield(GeometryUtility.ellipseNormal(up.negateThis(), divide), "t1", 2);

                        case 2:
                            step = 2 * Math.PI / divide;
                            lastRight = new Vector3(Math.cos(-step / 2), center.Y, Math.sin(-step / 2));
                            i = 0;

                        case 5:
                            if (!(i < divide)) {
                                _context31.next = 18;
                                break;
                            }

                            theta = step * (i + 1);
                            sin = Math.sin(Math.PI / 2 - theta);
                            cos = Math.cos(Math.PI / 2 - theta);
                            currentRight = new Vector3(Math.cos(-step / 2 - theta), center.Y, Math.sin(-step / 2 - theta));
                            return _context31.delegateYield(Vector3.cross(lastRight, up).rawElements, "t2", 11);

                        case 11:
                            return _context31.delegateYield(Vector3.cross(currentRight, up).rawElements, "t3", 12);

                        case 12:
                            return _context31.delegateYield(Vector3.cross(currentRight, up).rawElements, "t4", 13);

                        case 13:
                            return _context31.delegateYield(Vector3.cross(lastRight, up).rawElements, "t5", 14);

                        case 14:
                            lastRight = currentRight;

                        case 15:
                            i++;
                            _context31.next = 5;
                            break;

                        case 18:
                        case "end":
                            return _context31.stop();
                    }
                }
            }, cylinderNormal, this);
        })
    }, {
        key: "coneNormal",
        value: _regenerator2.default.mark(function coneNormal(center, up, right, forward, divide) {
            var step, d, lastNormal, i, theta, sin, cos, currentCenter, currentRight;
            return _regenerator2.default.wrap(function coneNormal$(_context32) {
                while (1) {
                    switch (_context32.prev = _context32.next) {
                        case 0:
                            return _context32.delegateYield(GeometryUtility.ellipseNormal(up.negateThis(), divide), "t0", 1);

                        case 1:
                            step = Math.PI / divide;
                            d = Math.cos(step / 2) / 2;
                            lastNormal = Vector3.cross(new Vector3(Math.cos(step / 2), center.Y, Math.sin(step / 2)), up.subtractWith(new Vector3(d * Math.cos((Math.PI + step) / 2), center.Y, d * Math.sin((Math.PI + step) / 2))));
                            i = 0;

                        case 5:
                            if (!(i < divide * 2)) {
                                _context32.next = 18;
                                break;
                            }

                            theta = step * i;
                            sin = Math.sin((Math.PI - step) / 2 - theta);
                            cos = Math.cos((Math.PI - step) / 2 - theta);
                            currentCenter = new Vector3(d * cos, center.Y, d * sin);
                            currentRight = new Vector3(Math.cos(-step / 2 - theta), center.Y, Math.sin(-step / 2 - theta));
                            return _context32.delegateYield(Vector3.cross(currentRight, up.subtractWith(currentCenter)).rawElements, "t1", 12);

                        case 12:
                            if (!(i % 2 == 1)) {
                                _context32.next = 15;
                                break;
                            }

                            return _context32.delegateYield(lastNormal.rawElements, "t2", 14);

                        case 14:
                            lastNormal = Vector3.cross(currentRight, up.subtractWith(currentCenter));

                        case 15:
                            i++;
                            _context32.next = 5;
                            break;

                        case 18:
                            return _context32.delegateYield(Vector3.cross(new Vector3(Math.cos(step / 2), center.Y, Math.sin(step / 2)), up.subtractWith(new Vector3(d * Math.cos((Math.PI + step) / 2), center.Y, d * Math.sin((Math.PI + step) / 2)))).rawElements, "t3", 19);

                        case 19:
                        case "end":
                            return _context32.stop();
                    }
                }
            }, coneNormal, this);
        })
    }, {
        key: "planeNormal",
        value: _regenerator2.default.mark(function planeNormal(normal, divide) {
            var s, i, _i2;

            return _regenerator2.default.wrap(function planeNormal$(_context33) {
                while (1) {
                    switch (_context33.prev = _context33.next) {
                        case 0:
                            s = GeometryUtility.planeSize(divide) / 2;
                            i = 0;

                        case 2:
                            if (!(i < s)) {
                                _context33.next = 7;
                                break;
                            }

                            return _context33.delegateYield(normal.rawElements, "t0", 4);

                        case 4:
                            i++;
                            _context33.next = 2;
                            break;

                        case 7:
                            _i2 = 0;

                        case 8:
                            if (!(_i2 < s)) {
                                _context33.next = 13;
                                break;
                            }

                            return _context33.delegateYield(normal.negateThis().rawElements, "t1", 10);

                        case 10:
                            _i2++;
                            _context33.next = 8;
                            break;

                        case 13:
                        case "end":
                            return _context33.stop();
                    }
                }
            }, planeNormal, this);
        })
    }, {
        key: "sphereNormal",
        value: _regenerator2.default.mark(function sphereNormal(up, right, forward, rowDiv, circleDiv) {
            return _regenerator2.default.wrap(function sphereNormal$(_context34) {
                while (1) {
                    switch (_context34.prev = _context34.next) {
                        case 0:
                            return _context34.delegateYield(GeometryUtility.spherePosition(Vector3.Zero, up, right, forward, rowDiv, circleDiv), "t0", 1);

                        case 1:
                        case "end":
                            return _context34.stop();
                    }
                }
            }, sphereNormal, this);
        })
    }, {
        key: "sphereTexCoord",
        value: _regenerator2.default.mark(function sphereTexCoord(rowDiv, circleDiv) {
            var ia, ja, j, phi, sinPhi, i, theta;
            return _regenerator2.default.wrap(function sphereTexCoord$(_context35) {
                while (1) {
                    switch (_context35.prev = _context35.next) {
                        case 0:
                            return _context35.delegateYield([0, 0, 0, 1], "t0", 1);

                        case 1:
                            ia = 2 * Math.PI / circleDiv;
                            ja = Math.PI / (rowDiv + 1);
                            j = 1;

                        case 4:
                            if (!(j <= rowDiv)) {
                                _context35.next = 17;
                                break;
                            }

                            phi = ja * j;
                            sinPhi = Math.sin(phi);
                            i = 0;

                        case 8:
                            if (!(i <= circleDiv)) {
                                _context35.next = 14;
                                break;
                            }

                            theta = ia * i;
                            return _context35.delegateYield([theta / Math.PI / 2, phi / Math.PI], "t1", 11);

                        case 11:
                            i++;
                            _context35.next = 8;
                            break;

                        case 14:
                            j++;
                            _context35.next = 4;
                            break;

                        case 17:
                        case "end":
                            return _context35.stop();
                    }
                }
            }, sphereTexCoord, this);
        })
    }, {
        key: "quadTexCoord",
        value: _regenerator2.default.mark(function quadTexCoord() {
            return _regenerator2.default.wrap(function quadTexCoord$(_context36) {
                while (1) {
                    switch (_context36.prev = _context36.next) {
                        case 0:
                            return _context36.delegateYield([0, 0], "t0", 1);

                        case 1:
                            return _context36.delegateYield([1, 0], "t1", 2);

                        case 2:
                            return _context36.delegateYield([1, 1], "t2", 3);

                        case 3:
                            return _context36.delegateYield([0, 1], "t3", 4);

                        case 4:
                        case "end":
                            return _context36.stop();
                    }
                }
            }, quadTexCoord, this);
        })
    }, {
        key: "cubeTexCoord",
        value: _regenerator2.default.mark(function cubeTexCoord() {
            var i;
            return _regenerator2.default.wrap(function cubeTexCoord$(_context37) {
                while (1) {
                    switch (_context37.prev = _context37.next) {
                        case 0:
                            i = 0;

                        case 1:
                            if (!(i < 6)) {
                                _context37.next = 6;
                                break;
                            }

                            return _context37.delegateYield(GeometryUtility.quadTexCoord(), "t0", 3);

                        case 3:
                            i++;
                            _context37.next = 1;
                            break;

                        case 6:
                        case "end":
                            return _context37.stop();
                    }
                }
            }, cubeTexCoord, this);
        })
    }, {
        key: "triangleTexCoord",
        value: _regenerator2.default.mark(function triangleTexCoord() {
            return _regenerator2.default.wrap(function triangleTexCoord$(_context38) {
                while (1) {
                    switch (_context38.prev = _context38.next) {
                        case 0:
                            return _context38.delegateYield([0, 0], "t0", 1);

                        case 1:
                            return _context38.delegateYield([1, 0], "t1", 2);

                        case 2:
                            return _context38.delegateYield([0, 1], "t2", 3);

                        case 3:
                        case "end":
                            return _context38.stop();
                    }
                }
            }, triangleTexCoord, this);
        })
    }, {
        key: "ellipseTexCoord",
        value: _regenerator2.default.mark(function ellipseTexCoord(divide) {
            var step, i, theta;
            return _regenerator2.default.wrap(function ellipseTexCoord$(_context39) {
                while (1) {
                    switch (_context39.prev = _context39.next) {
                        case 0:
                            return _context39.delegateYield([0.5, 0.5], "t0", 1);

                        case 1:
                            step = 2 * Math.PI / divide;
                            i = 0;

                        case 3:
                            if (!(i < divide)) {
                                _context39.next = 9;
                                break;
                            }

                            theta = step * i;
                            return _context39.delegateYield([0.5 + Math.cos(theta + Math.PI) / 2, 0.5 + Math.sin(theta + Math.PI) / 2], "t1", 6);

                        case 6:
                            i++;
                            _context39.next = 3;
                            break;

                        case 9:
                        case "end":
                            return _context39.stop();
                    }
                }
            }, ellipseTexCoord, this);
        })
    }, {
        key: "planeTexCoord",
        value: _regenerator2.default.mark(function planeTexCoord(divide) {
            var i, j, _i3, _j2;

            return _regenerator2.default.wrap(function planeTexCoord$(_context40) {
                while (1) {
                    switch (_context40.prev = _context40.next) {
                        case 0:
                            i = 0;

                        case 1:
                            if (!(i < divide + 1)) {
                                _context40.next = 11;
                                break;
                            }

                            j = 0;

                        case 3:
                            if (!(j < divide + 1)) {
                                _context40.next = 8;
                                break;
                            }

                            return _context40.delegateYield([j / divide, i / divide], "t0", 5);

                        case 5:
                            j++;
                            _context40.next = 3;
                            break;

                        case 8:
                            i++;
                            _context40.next = 1;
                            break;

                        case 11:
                            _i3 = 0;

                        case 12:
                            if (!(_i3 < divide + 1)) {
                                _context40.next = 22;
                                break;
                            }

                            _j2 = 0;

                        case 14:
                            if (!(_j2 < divide + 1)) {
                                _context40.next = 19;
                                break;
                            }

                            return _context40.delegateYield([_j2 / divide, _i3 / divide], "t1", 16);

                        case 16:
                            _j2++;
                            _context40.next = 14;
                            break;

                        case 19:
                            _i3++;
                            _context40.next = 12;
                            break;

                        case 22:
                        case "end":
                            return _context40.stop();
                    }
                }
            }, planeTexCoord, this);
        })
    }, {
        key: "cylinderTexCoord",
        value: _regenerator2.default.mark(function cylinderTexCoord(divide) {
            var p, j;
            return _regenerator2.default.wrap(function cylinderTexCoord$(_context41) {
                while (1) {
                    switch (_context41.prev = _context41.next) {
                        case 0:
                            return _context41.delegateYield(GeometryUtility.ellipseTexCoord(divide), "t0", 1);

                        case 1:
                            return _context41.delegateYield(GeometryUtility.ellipseTexCoord(divide), "t1", 2);

                        case 2:
                            p = 1 / divide;
                            j = 0;

                        case 4:
                            if (!(j < divide)) {
                                _context41.next = 12;
                                break;
                            }

                            return _context41.delegateYield([p * j, 0], "t2", 6);

                        case 6:
                            return _context41.delegateYield([p * (j + 1), 0], "t3", 7);

                        case 7:
                            return _context41.delegateYield([p * (j + 1), 1], "t4", 8);

                        case 8:
                            return _context41.delegateYield([p * j, 1], "t5", 9);

                        case 9:
                            j++;
                            _context41.next = 4;
                            break;

                        case 12:
                        case "end":
                            return _context41.stop();
                    }
                }
            }, cylinderTexCoord, this);
        })
    }, {
        key: "coneTexCoord",
        value: _regenerator2.default.mark(function coneTexCoord(divide) {
            var step, i, theta;
            return _regenerator2.default.wrap(function coneTexCoord$(_context42) {
                while (1) {
                    switch (_context42.prev = _context42.next) {
                        case 0:
                            return _context42.delegateYield(GeometryUtility.ellipseTexCoord(divide), "t0", 1);

                        case 1:
                            step = Math.PI / 2 / divide;
                            i = 0;

                        case 3:
                            if (!(i < divide)) {
                                _context42.next = 11;
                                break;
                            }

                            theta = -step * i;
                            return _context42.delegateYield([0, 0], "t1", 6);

                        case 6:
                            return _context42.delegateYield([Math.cos(theta - step), Math.sin(theta - step)], "t2", 7);

                        case 7:
                            return _context42.delegateYield([Math.cos(theta), Math.sin(theta)], "t3", 8);

                        case 8:
                            i++;
                            _context42.next = 3;
                            break;

                        case 11:
                        case "end":
                            return _context42.stop();
                    }
                }
            }, coneTexCoord, this);
        })
    }, {
        key: "triangleIndex",
        value: _regenerator2.default.mark(function triangleIndex(offset) {
            var o;
            return _regenerator2.default.wrap(function triangleIndex$(_context43) {
                while (1) {
                    switch (_context43.prev = _context43.next) {
                        case 0:
                            o = offset;
                            return _context43.delegateYield([o, o + 2, o + 1], "t0", 2);

                        case 2:
                        case "end":
                            return _context43.stop();
                    }
                }
            }, triangleIndex, this);
        })
    }, {
        key: "quadIndex",
        value: _regenerator2.default.mark(function quadIndex(offset) {
            var o;
            return _regenerator2.default.wrap(function quadIndex$(_context44) {
                while (1) {
                    switch (_context44.prev = _context44.next) {
                        case 0:
                            o = offset;
                            return _context44.delegateYield([o, o + 2, o + 1, o, o + 3, o + 2], "t0", 2);

                        case 2:
                        case "end":
                            return _context44.stop();
                    }
                }
            }, quadIndex, this);
        })
    }, {
        key: "cubeIndex",
        value: _regenerator2.default.mark(function cubeIndex(offset) {
            var s, i;
            return _regenerator2.default.wrap(function cubeIndex$(_context45) {
                while (1) {
                    switch (_context45.prev = _context45.next) {
                        case 0:
                            s = GeometryUtility.quadSize();
                            i = 0;

                        case 2:
                            if (!(i < 6)) {
                                _context45.next = 7;
                                break;
                            }

                            return _context45.delegateYield(GeometryUtility.quadIndex(offset + s * i), "t0", 4);

                        case 4:
                            i++;
                            _context45.next = 2;
                            break;

                        case 7:
                        case "end":
                            return _context45.stop();
                    }
                }
            }, cubeIndex, this);
        })
    }, {
        key: "sphereIndex",
        value: _regenerator2.default.mark(function sphereIndex(offset, rowDiv, circleDiv) {
            var getIndex, top, bottom, i, j, _i4, _i5;

            return _regenerator2.default.wrap(function sphereIndex$(_context46) {
                while (1) {
                    switch (_context46.prev = _context46.next) {
                        case 0:
                            getIndex = function getIndex(i, j) {
                                return offset + (circleDiv + 1) * j + 2 + i;
                            };

                            top = offset;
                            bottom = offset + 1;
                            // upper side

                            i = 0;

                        case 4:
                            if (!(i < circleDiv)) {
                                _context46.next = 14;
                                break;
                            }

                            _context46.next = 7;
                            return top;

                        case 7:
                            _context46.next = 9;
                            return getIndex(i, 0);

                        case 9:
                            _context46.next = 11;
                            return getIndex(i + 1, 0);

                        case 11:
                            i++;
                            _context46.next = 4;
                            break;

                        case 14:
                            j = 0;

                        case 15:
                            if (!(j < rowDiv - 1)) {
                                _context46.next = 36;
                                break;
                            }

                            _i4 = 0;

                        case 17:
                            if (!(_i4 < circleDiv)) {
                                _context46.next = 33;
                                break;
                            }

                            _context46.next = 20;
                            return getIndex(_i4, j);

                        case 20:
                            _context46.next = 22;
                            return getIndex(_i4, j + 1);

                        case 22:
                            _context46.next = 24;
                            return getIndex(_i4 + 1, j);

                        case 24:
                            _context46.next = 26;
                            return getIndex(_i4, j + 1);

                        case 26:
                            _context46.next = 28;
                            return getIndex(_i4 + 1, j + 1);

                        case 28:
                            _context46.next = 30;
                            return getIndex(_i4 + 1, j);

                        case 30:
                            _i4++;
                            _context46.next = 17;
                            break;

                        case 33:
                            j++;
                            _context46.next = 15;
                            break;

                        case 36:
                            _i5 = 0;

                        case 37:
                            if (!(_i5 < circleDiv)) {
                                _context46.next = 47;
                                break;
                            }

                            _context46.next = 40;
                            return bottom;

                        case 40:
                            _context46.next = 42;
                            return getIndex(_i5 + 1, rowDiv - 1);

                        case 42:
                            _context46.next = 44;
                            return getIndex(_i5, rowDiv - 1);

                        case 44:
                            _i5++;
                            _context46.next = 37;
                            break;

                        case 47:
                        case "end":
                            return _context46.stop();
                    }
                }
            }, sphereIndex, this);
        })
    }, {
        key: "cylinderIndex",
        value: _regenerator2.default.mark(function cylinderIndex(offset, divide) {
            var s, t, i;
            return _regenerator2.default.wrap(function cylinderIndex$(_context47) {
                while (1) {
                    switch (_context47.prev = _context47.next) {
                        case 0:
                            s = GeometryUtility.ellipseSize(divide);
                            t = GeometryUtility.quadSize();
                            return _context47.delegateYield(GeometryUtility.ellipseIndex(offset, divide), "t0", 3);

                        case 3:
                            return _context47.delegateYield(GeometryUtility.ellipseIndex(offset + s, divide), "t1", 4);

                        case 4:
                            i = 0;

                        case 5:
                            if (!(i < divide)) {
                                _context47.next = 10;
                                break;
                            }

                            return _context47.delegateYield(GeometryUtility.quadIndex(offset + s * 2 + t * i), "t2", 7);

                        case 7:
                            i++;
                            _context47.next = 5;
                            break;

                        case 10:
                        case "end":
                            return _context47.stop();
                    }
                }
            }, cylinderIndex, this);
        })
    }, {
        key: "coneIndex",
        value: _regenerator2.default.mark(function coneIndex(offset, divide) {
            var s, t, i;
            return _regenerator2.default.wrap(function coneIndex$(_context48) {
                while (1) {
                    switch (_context48.prev = _context48.next) {
                        case 0:
                            s = GeometryUtility.ellipseSize(divide);
                            t = GeometryUtility.triangleSize();
                            return _context48.delegateYield(GeometryUtility.ellipseIndex(offset, divide), "t0", 3);

                        case 3:
                            i = 0;

                        case 4:
                            if (!(i < divide)) {
                                _context48.next = 9;
                                break;
                            }

                            return _context48.delegateYield(GeometryUtility.triangleIndex(offset + s + i * t), "t1", 6);

                        case 6:
                            i++;
                            _context48.next = 4;
                            break;

                        case 9:
                        case "end":
                            return _context48.stop();
                    }
                }
            }, coneIndex, this);
        })
    }, {
        key: "planeIndex",
        value: _regenerator2.default.mark(function planeIndex(offset, divide) {
            var o, s, j, i, _j3, _i6;

            return _regenerator2.default.wrap(function planeIndex$(_context49) {
                while (1) {
                    switch (_context49.prev = _context49.next) {
                        case 0:
                            o = offset;
                            s = GeometryUtility.planeSize(divide) / 2;
                            j = 0;

                        case 3:
                            if (!(j < divide)) {
                                _context49.next = 15;
                                break;
                            }

                            i = 0;

                        case 5:
                            if (!(i < divide)) {
                                _context49.next = 12;
                                break;
                            }

                            o = offset + i + j * (divide + 1);
                            return _context49.delegateYield([o, o + divide + 2, o + 1], "t0", 8);

                        case 8:
                            return _context49.delegateYield([o, o + divide + 1, o + divide + 2], "t1", 9);

                        case 9:
                            i++;
                            _context49.next = 5;
                            break;

                        case 12:
                            j++;
                            _context49.next = 3;
                            break;

                        case 15:
                            _j3 = 0;

                        case 16:
                            if (!(_j3 < divide)) {
                                _context49.next = 28;
                                break;
                            }

                            _i6 = 0;

                        case 18:
                            if (!(_i6 < divide)) {
                                _context49.next = 25;
                                break;
                            }

                            o = offset + _i6 + _j3 * (divide + 1) + s;
                            return _context49.delegateYield([o, o + 1, o + divide + 2], "t2", 21);

                        case 21:
                            return _context49.delegateYield([o, o + divide + 2, o + divide + 1], "t3", 22);

                        case 22:
                            _i6++;
                            _context49.next = 18;
                            break;

                        case 25:
                            _j3++;
                            _context49.next = 16;
                            break;

                        case 28:
                        case "end":
                            return _context49.stop();
                    }
                }
            }, planeIndex, this);
        })
    }, {
        key: "ellipseIndex",
        value: _regenerator2.default.mark(function ellipseIndex(offset, divide) {
            var i;
            return _regenerator2.default.wrap(function ellipseIndex$(_context50) {
                while (1) {
                    switch (_context50.prev = _context50.next) {
                        case 0:
                            i = 0;

                        case 1:
                            if (!(i < divide - 1)) {
                                _context50.next = 6;
                                break;
                            }

                            return _context50.delegateYield([offset, offset + 1 + i, offset + 2 + i], "t0", 3);

                        case 3:
                            i++;
                            _context50.next = 1;
                            break;

                        case 6:
                            return _context50.delegateYield([offset, offset + divide, offset + 1], "t1", 7);

                        case 7:
                        case "end":
                            return _context50.stop();
                    }
                }
            }, ellipseIndex, this);
        })
    }, {
        key: "quadSize",
        value: function quadSize() {
            return 4;
        }
    }, {
        key: "triangleSize",
        value: function triangleSize() {
            return 3;
        }
    }, {
        key: "cubeSize",
        value: function cubeSize() {
            return 6 * GeometryUtility.quadSize();
        }
    }, {
        key: "sphereSize",
        value: function sphereSize(rowDiv, circleDiv) {
            return 2 + rowDiv * (circleDiv + 1);
        }
    }, {
        key: "cylinderSize",
        value: function cylinderSize(divide) {
            return GeometryUtility.ellipseSize(divide) * 2 + divide * GeometryUtility.quadSize();
        }
    }, {
        key: "coneSize",
        value: function coneSize(divide) {
            return GeometryUtility.ellipseSize(divide) + divide * GeometryUtility.triangleSize();
        }
    }, {
        key: "planeSize",
        value: function planeSize(divide) {
            return (divide + 1) * (divide + 1) * 2;
        }
    }, {
        key: "ellipseSize",
        value: function ellipseSize(divide) {
            return divide + 1;
        }
    }]);
    return GeometryUtility;
}();

/**
 * Provides the feature to instanciate primitive geometry.
 */


var GeometryFactory = function () {
    function GeometryFactory(gl) {
        (0, _classCallCheck3.default)(this, GeometryFactory);

        this.gl = gl;
    }
    /**
     * Add new type geometry
     * @param {string}                   typeName        [description]
     * @param {IAttributeDeclaration }}             argumentDeclarations [description]
     * @param {IGeometryFactoryDelegate} factoryDelegate [description]
     */


    (0, _createClass3.default)(GeometryFactory, [{
        key: "instanciate",
        value: function instanciate(type, args) {
            var factoryDelegate = GeometryFactory.factoryDelegates[type];
            if (!factoryDelegate) {
                throw new Error("Can not instanciate unknown geometry type " + type);
            }
            return factoryDelegate(this.gl, args);
        }
    }, {
        key: "instanciateAsDefault",
        value: function instanciateAsDefault(type) {
            var decl = GeometryFactory.factoryArgumentDeclarations[type];
            var args = {};
            for (var attr in decl) {
                var attrDecl = decl[attr];
                args[attr] = attrDecl.defaultValue;
            }
            return this.instanciate(type, args);
        }
    }], [{
        key: "addType",
        value: function addType(typeName, argumentDeclarations, factoryDelegate) {
            GeometryFactory.factoryDelegates[typeName] = factoryDelegate;
            GeometryFactory.factoryArgumentDeclarations[typeName] = argumentDeclarations;
        }
    }]);
    return GeometryFactory;
}();
/**
 * Delegates to be used as factory
 */


GeometryFactory.factoryDelegates = {};
/**
 * Argument inputs to be used for construction of geometry.
 */
GeometryFactory.factoryArgumentDeclarations = {};

var Buffer = function (_ResourceBase3) {
    (0, _inherits3.default)(Buffer, _ResourceBase3);

    function Buffer(gl, target, usage) {
        (0, _classCallCheck3.default)(this, Buffer);

        var _this31 = (0, _possibleConstructorReturn3.default)(this, (Buffer.__proto__ || (0, _getPrototypeOf2.default)(Buffer)).call(this, gl));

        _this31.target = target;
        _this31.usage = usage;
        _this31.buffer = gl.createBuffer();
        return _this31;
    }

    (0, _createClass3.default)(Buffer, [{
        key: "update",
        value: function update(length, subBuffer) {
            this.bind();
            if (subBuffer) {
                if (!this.valid) {
                    this.gl.bufferData(this.target, length + subBuffer.byteLength, this.usage);
                }
                this.gl.bufferSubData(this.target, length, subBuffer);
            } else {
                if (typeof length === "number") {
                    this.gl.bufferData(this.target, length, this.usage);
                } else {
                    this.gl.bufferData(this.target, length, this.usage);
                }
            }
            this.valid = true;
        }
    }, {
        key: "bind",
        value: function bind() {
            this.gl.bindBuffer(this.target, this.buffer);
        }
    }, {
        key: "destroy",
        value: function destroy() {
            (0, _get3.default)(Buffer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Buffer.prototype), "destroy", this).call(this);
            this.gl.deleteBuffer(this.buffer);
        }
    }]);
    return Buffer;
}(ResourceBase);

/**
 * The geometry class for managing buffer resource
 */


var Geometry = function () {
    function Geometry(verticies, attribInfo, indicies) {
        (0, _classCallCheck3.default)(this, Geometry);

        this.verticies = verticies;
        this.attribInfo = attribInfo;
        this.indicies = indicies;
        this._validateGLContext();
        // check all buffers requested by attribute variables are all contained in verticies
        for (var attrKey in attribInfo) {
            if (typeof verticies[attribInfo[attrKey].bufferName] === "undefined") {
                throw new Error("The buffer request by " + attribInfo[attrKey].bufferName + " is not contained in geometry.");
            }
        }
    }

    (0, _createClass3.default)(Geometry, [{
        key: "draw",
        value: function draw(indexName, attribNames, program) {
            var _this32 = this;

            var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Number.MAX_VALUE;
            var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

            var targetIndex = this.indicies[indexName];
            attribNames.forEach(function (name) {
                var attribInfo = _this32.attribInfo[name];
                if (!attribInfo) {
                    throw new Error("There is no such vertex buffer");
                }
                var index = program.findAttributeLocation(name);
                if (index < 0) {
                    return;
                }
                var buffer = _this32.verticies[attribInfo.bufferName];
                buffer.bind();
                _this32._gl.vertexAttribPointer(index, attribInfo.size, attribInfo.type, false, attribInfo.stride, attribInfo.offset);
            });
            targetIndex.index.bind();
            this._gl.drawElements(targetIndex.topology, Math.min(targetIndex.count, count), targetIndex.type, Math.min(offset * targetIndex.byteSize, (targetIndex.count - 1) * targetIndex.byteSize));
        }
    }, {
        key: "_validateGLContext",
        value: function _validateGLContext() {
            // Check for index buffers
            for (var indexName in this.indicies) {
                var _index2 = this.indicies[indexName];
                if (!this._gl) {
                    this._gl = _index2.index.gl;
                }
                if (this._gl !== _index2.index.gl) {
                    throw new Error("All index buffers should be initialized with same context");
                }
            }
            // Check for vertex buffers
            for (var vertexName in this.verticies) {
                var vertex = this.verticies[vertexName];
                if (this._gl !== vertex.gl) {
                    throw new Error("All vertex buffers should be initialized with same context");
                }
            }
        }
    }]);
    return Geometry;
}();

/**
 * Helper class to instanciate Geometry easily.
 */


var GeometryBuilder = function () {
    function GeometryBuilder() {
        (0, _classCallCheck3.default)(this, GeometryBuilder);
    }

    (0, _createClass3.default)(GeometryBuilder, null, [{
        key: "build",
        value: function build(gl, info) {
            var buffers = {};
            var attribs = {};
            for (var bufferKey in info.verticies) {
                var byteWidth = 4;
                var buffer = info.verticies[bufferKey];
                var sizeSum = 0;
                for (var attribKey in buffer.size) {
                    if (attribs[attribKey]) {
                        throw new Error("Attribute variable name was dupelicated");
                    }
                    var size = buffer.size[attribKey];
                    attribs[attribKey] = {
                        size: size,
                        offset: sizeSum * byteWidth,
                        bufferName: bufferKey,
                        type: buffer.type ? buffer.type : WebGLRenderingContext.FLOAT,
                        stride: 0
                    };
                    sizeSum += size;
                }
                for (var _attribKey in buffer.size) {
                    attribs[_attribKey].stride = sizeSum * byteWidth;
                }
                // generate source array of vertex buffer
                var bufferSource = new Array(sizeSum * buffer.count);
                var bufferGenerator = buffer.getGenerators();
                var generators = [];
                var sizes = [];
                var beforeEach = bufferGenerator.beforeEach ? bufferGenerator.beforeEach() : undefined;
                for (var _attribKey2 in buffer.size) {
                    if (_attribKey2 === "beforeEach") {
                        continue;
                    }
                    var generator = bufferGenerator[_attribKey2];
                    generators.push(generator());
                    sizes.push(buffer.size[_attribKey2]);
                }
                var i = 0;
                for (var vertCount = 0; vertCount < buffer.count; vertCount++) {
                    if (beforeEach && beforeEach.next().done) {
                        throw new Error("before each was ended before reaching count.");
                    }
                    for (var genIndex = 0; genIndex < generators.length; genIndex++) {
                        var _generator = generators[genIndex];
                        for (var sizeIndex = 0; sizeIndex < sizes[genIndex]; sizeIndex++) {
                            var genResult = _generator.next();
                            if (genResult.done) {
                                throw new Error("Generator function finished before reaching specified count");
                            }
                            bufferSource[i] = genResult.value;
                            i++;
                        }
                    }
                }
                // instanciate buffers
                buffers[bufferKey] = new Buffer(gl, WebGLRenderingContext.ARRAY_BUFFER, buffer.usage ? buffer.usage : WebGLRenderingContext.STATIC_DRAW);
                buffers[bufferKey].update(new Float32Array(bufferSource));
            }
            return new Geometry(buffers, attribs, this._generateIndicies(gl, info.indicies));
        }
    }, {
        key: "_generateIndicies",
        value: function _generateIndicies(gl, indexGenerator) {
            var indexMap = {};
            for (var indexName in indexGenerator) {
                var indicies = [];
                var generatorInfo = indexGenerator[indexName];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = (0, _getIterator3.default)(generatorInfo.generator()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var variable = _step2.value;

                        indicies.push(variable);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                var bufferType = this._getIndexType(indicies.length);
                var buffer = new Buffer(gl, WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, WebGLRenderingContext.STATIC_DRAW);
                buffer.update(new bufferType.ctor(indicies));
                indexMap[indexName] = {
                    count: indicies.length,
                    index: buffer,
                    type: bufferType.format,
                    byteSize: bufferType.byteSize,
                    topology: generatorInfo.topology ? generatorInfo.topology : WebGLRenderingContext.TRIANGLES
                };
            }
            return indexMap;
        }
        /**
         * Determine which index type should be used
         * @param  {number} length [description]
         * @return {[type]}        [description]
         */

    }, {
        key: "_getIndexType",
        value: function _getIndexType(length) {
            var format = WebGLRenderingContext.UNSIGNED_INT;
            var arrayConstructor = Uint32Array;
            var byteSize = 4;
            if (length < 256) {
                format = WebGLRenderingContext.UNSIGNED_BYTE;
                arrayConstructor = Uint8Array;
                byteSize = 1;
            } else if (length < 65535) {
                format = WebGLRenderingContext.UNSIGNED_SHORT;
                arrayConstructor = Uint16Array;
                byteSize = 2;
            } else if (length >= 4294967296) {
                throw new Error("Too many index of geometry!");
            }
            return {
                format: format,
                ctor: arrayConstructor,
                byteSize: byteSize
            };
        }
    }]);
    return GeometryBuilder;
}();

// TODO add normal and texCoords
// TODO apply attributes


var DefaultPrimitives = function () {
    function DefaultPrimitives() {
        (0, _classCallCheck3.default)(this, DefaultPrimitives);
    }

    (0, _createClass3.default)(DefaultPrimitives, null, [{
        key: "register",
        value: function register() {
            DefaultPrimitives._registerTriangle();
            DefaultPrimitives._registerQuad();
            DefaultPrimitives._registerCube();
            DefaultPrimitives._registerSphere();
            DefaultPrimitives._registerCircle();
            DefaultPrimitives._registerCylinder();
            DefaultPrimitives._registerCone();
            DefaultPrimitives._registerPlane();
        }
    }, {
        key: "_registerTriangle",
        value: function _registerTriangle() {
            GeometryFactory.addType("triangle", {}, function (gl, attrs) {
                return GeometryBuilder.build(gl, {
                    indicies: {
                        default: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context51) {
                                    while (1) {
                                        switch (_context51.prev = _context51.next) {
                                            case 0:
                                                return _context51.delegateYield(GeometryUtility.triangleIndex(0), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context51.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.TRIANGLES
                        },
                        wireframe: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context52) {
                                    while (1) {
                                        switch (_context52.prev = _context52.next) {
                                            case 0:
                                                return _context52.delegateYield(GeometryUtility.linesFromTriangles(GeometryUtility.triangleIndex(0)), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context52.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.LINES
                        }
                    },
                    verticies: {
                        main: {
                            size: {
                                position: 3,
                                normal: 3,
                                texCoord: 2
                            },
                            count: GeometryUtility.triangleSize(),
                            getGenerators: function getGenerators() {
                                return {
                                    position: _regenerator2.default.mark(function position() {
                                        return _regenerator2.default.wrap(function position$(_context53) {
                                            while (1) {
                                                switch (_context53.prev = _context53.next) {
                                                    case 0:
                                                        return _context53.delegateYield(GeometryUtility.trianglePosition(Vector3.Zero, Vector3.YUnit, Vector3.XUnit), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context53.stop();
                                                }
                                            }
                                        }, position, this);
                                    }),
                                    normal: _regenerator2.default.mark(function normal() {
                                        return _regenerator2.default.wrap(function normal$(_context54) {
                                            while (1) {
                                                switch (_context54.prev = _context54.next) {
                                                    case 0:
                                                        return _context54.delegateYield(GeometryUtility.triangleNormal(Vector3.ZUnit), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context54.stop();
                                                }
                                            }
                                        }, normal, this);
                                    }),
                                    texCoord: _regenerator2.default.mark(function texCoord() {
                                        return _regenerator2.default.wrap(function texCoord$(_context55) {
                                            while (1) {
                                                switch (_context55.prev = _context55.next) {
                                                    case 0:
                                                        return _context55.delegateYield(GeometryUtility.triangleTexCoord(), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context55.stop();
                                                }
                                            }
                                        }, texCoord, this);
                                    })
                                };
                            }
                        }
                    }
                });
            });
        }
    }, {
        key: "_registerQuad",
        value: function _registerQuad() {
            GeometryFactory.addType("quad", {}, function (gl, attrs) {
                return GeometryBuilder.build(gl, {
                    indicies: {
                        default: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context56) {
                                    while (1) {
                                        switch (_context56.prev = _context56.next) {
                                            case 0:
                                                return _context56.delegateYield(GeometryUtility.quadIndex(0), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context56.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.TRIANGLES
                        },
                        wireframe: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context57) {
                                    while (1) {
                                        switch (_context57.prev = _context57.next) {
                                            case 0:
                                                return _context57.delegateYield(GeometryUtility.linesFromTriangles(GeometryUtility.quadIndex(0)), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context57.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.LINES
                        }
                    },
                    verticies: {
                        main: {
                            size: {
                                position: 3,
                                normal: 3,
                                texCoord: 2
                            },
                            count: GeometryUtility.quadSize(),
                            getGenerators: function getGenerators() {
                                return {
                                    position: _regenerator2.default.mark(function position() {
                                        return _regenerator2.default.wrap(function position$(_context58) {
                                            while (1) {
                                                switch (_context58.prev = _context58.next) {
                                                    case 0:
                                                        return _context58.delegateYield(GeometryUtility.quadPosition(Vector3.Zero, Vector3.YUnit, Vector3.XUnit), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context58.stop();
                                                }
                                            }
                                        }, position, this);
                                    }),
                                    normal: _regenerator2.default.mark(function normal() {
                                        return _regenerator2.default.wrap(function normal$(_context59) {
                                            while (1) {
                                                switch (_context59.prev = _context59.next) {
                                                    case 0:
                                                        return _context59.delegateYield(GeometryUtility.quadNormal(Vector3.ZUnit), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context59.stop();
                                                }
                                            }
                                        }, normal, this);
                                    }),
                                    texCoord: _regenerator2.default.mark(function texCoord() {
                                        return _regenerator2.default.wrap(function texCoord$(_context60) {
                                            while (1) {
                                                switch (_context60.prev = _context60.next) {
                                                    case 0:
                                                        return _context60.delegateYield(GeometryUtility.quadTexCoord(), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context60.stop();
                                                }
                                            }
                                        }, texCoord, this);
                                    })
                                };
                            }
                        }
                    }
                });
            });
        }
    }, {
        key: "_registerCube",
        value: function _registerCube() {
            GeometryFactory.addType("cube", {}, function (gl, attrs) {
                return GeometryBuilder.build(gl, {
                    indicies: {
                        default: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context61) {
                                    while (1) {
                                        switch (_context61.prev = _context61.next) {
                                            case 0:
                                                return _context61.delegateYield(GeometryUtility.cubeIndex(0), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context61.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.TRIANGLES
                        },
                        wireframe: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context62) {
                                    while (1) {
                                        switch (_context62.prev = _context62.next) {
                                            case 0:
                                                return _context62.delegateYield(GeometryUtility.linesFromTriangles(GeometryUtility.cubeIndex(0)), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context62.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.LINES
                        }
                    },
                    verticies: {
                        main: {
                            size: {
                                position: 3,
                                normal: 3,
                                texCoord: 2
                            },
                            count: GeometryUtility.cubeSize(),
                            getGenerators: function getGenerators() {
                                return {
                                    position: _regenerator2.default.mark(function position() {
                                        return _regenerator2.default.wrap(function position$(_context63) {
                                            while (1) {
                                                switch (_context63.prev = _context63.next) {
                                                    case 0:
                                                        return _context63.delegateYield(GeometryUtility.cubePosition(Vector3.Zero, Vector3.YUnit, Vector3.XUnit, Vector3.ZUnit.negateThis()), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context63.stop();
                                                }
                                            }
                                        }, position, this);
                                    }),
                                    normal: _regenerator2.default.mark(function normal() {
                                        return _regenerator2.default.wrap(function normal$(_context64) {
                                            while (1) {
                                                switch (_context64.prev = _context64.next) {
                                                    case 0:
                                                        return _context64.delegateYield(GeometryUtility.cubeNormal(Vector3.Zero, Vector3.YUnit, Vector3.XUnit, Vector3.ZUnit.negateThis()), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context64.stop();
                                                }
                                            }
                                        }, normal, this);
                                    }),
                                    texCoord: _regenerator2.default.mark(function texCoord() {
                                        return _regenerator2.default.wrap(function texCoord$(_context65) {
                                            while (1) {
                                                switch (_context65.prev = _context65.next) {
                                                    case 0:
                                                        return _context65.delegateYield(GeometryUtility.cubeTexCoord(), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context65.stop();
                                                }
                                            }
                                        }, texCoord, this);
                                    })
                                };
                            }
                        }
                    }
                });
            });
        }
    }, {
        key: "_registerSphere",
        value: function _registerSphere() {
            GeometryFactory.addType("sphere", {
                divVertical: {
                    converter: "Number",
                    defaultValue: 100
                },
                divHorizontal: {
                    converter: "Number",
                    defaultValue: 100
                }
            }, function (gl, attrs) {
                var dH = attrs["divHorizontal"];
                var dV = attrs["divVertical"];
                return GeometryBuilder.build(gl, {
                    indicies: {
                        default: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context66) {
                                    while (1) {
                                        switch (_context66.prev = _context66.next) {
                                            case 0:
                                                return _context66.delegateYield(GeometryUtility.sphereIndex(0, dH, dV), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context66.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.TRIANGLES
                        },
                        wireframe: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context67) {
                                    while (1) {
                                        switch (_context67.prev = _context67.next) {
                                            case 0:
                                                return _context67.delegateYield(GeometryUtility.linesFromTriangles(GeometryUtility.sphereIndex(0, dH, dV)), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context67.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.LINES
                        }
                    },
                    verticies: {
                        main: {
                            size: {
                                position: 3,
                                normal: 3,
                                texCoord: 2
                            },
                            count: GeometryUtility.sphereSize(dH, dV),
                            getGenerators: function getGenerators() {
                                return {
                                    position: _regenerator2.default.mark(function position() {
                                        return _regenerator2.default.wrap(function position$(_context68) {
                                            while (1) {
                                                switch (_context68.prev = _context68.next) {
                                                    case 0:
                                                        return _context68.delegateYield(GeometryUtility.spherePosition(Vector3.Zero, Vector3.YUnit, Vector3.XUnit, Vector3.ZUnit.negateThis(), dH, dV), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context68.stop();
                                                }
                                            }
                                        }, position, this);
                                    }),
                                    normal: _regenerator2.default.mark(function normal() {
                                        return _regenerator2.default.wrap(function normal$(_context69) {
                                            while (1) {
                                                switch (_context69.prev = _context69.next) {
                                                    case 0:
                                                        return _context69.delegateYield(GeometryUtility.sphereNormal(Vector3.YUnit, Vector3.XUnit, Vector3.ZUnit.negateThis(), dH, dV), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context69.stop();
                                                }
                                            }
                                        }, normal, this);
                                    }),
                                    texCoord: _regenerator2.default.mark(function texCoord() {
                                        return _regenerator2.default.wrap(function texCoord$(_context70) {
                                            while (1) {
                                                switch (_context70.prev = _context70.next) {
                                                    case 0:
                                                        return _context70.delegateYield(GeometryUtility.sphereTexCoord(dH, dV), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context70.stop();
                                                }
                                            }
                                        }, texCoord, this);
                                    })
                                };
                            }
                        }
                    }
                });
            });
        }
    }, {
        key: "_registerCircle",
        value: function _registerCircle() {
            GeometryFactory.addType("circle", {
                divide: {
                    converter: "Number",
                    defaultValue: 50
                }
            }, function (gl, attrs) {
                var div = attrs["divide"];
                return GeometryBuilder.build(gl, {
                    indicies: {
                        default: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context71) {
                                    while (1) {
                                        switch (_context71.prev = _context71.next) {
                                            case 0:
                                                return _context71.delegateYield(GeometryUtility.ellipseIndex(0, div), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context71.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.TRIANGLES
                        },
                        wireframe: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context72) {
                                    while (1) {
                                        switch (_context72.prev = _context72.next) {
                                            case 0:
                                                return _context72.delegateYield(GeometryUtility.linesFromTriangles(GeometryUtility.ellipseIndex(0, div)), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context72.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.LINES
                        }
                    },
                    verticies: {
                        main: {
                            size: {
                                position: 3,
                                normal: 3,
                                texCoord: 2
                            },
                            count: GeometryUtility.ellipseSize(div),
                            getGenerators: function getGenerators() {
                                return {
                                    position: _regenerator2.default.mark(function position() {
                                        return _regenerator2.default.wrap(function position$(_context73) {
                                            while (1) {
                                                switch (_context73.prev = _context73.next) {
                                                    case 0:
                                                        return _context73.delegateYield(GeometryUtility.ellipsePosition(Vector3.Zero, Vector3.YUnit, Vector3.XUnit, div), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context73.stop();
                                                }
                                            }
                                        }, position, this);
                                    }),
                                    normal: _regenerator2.default.mark(function normal() {
                                        return _regenerator2.default.wrap(function normal$(_context74) {
                                            while (1) {
                                                switch (_context74.prev = _context74.next) {
                                                    case 0:
                                                        return _context74.delegateYield(GeometryUtility.ellipseNormal(Vector3.ZUnit, div), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context74.stop();
                                                }
                                            }
                                        }, normal, this);
                                    }),
                                    texCoord: _regenerator2.default.mark(function texCoord() {
                                        return _regenerator2.default.wrap(function texCoord$(_context75) {
                                            while (1) {
                                                switch (_context75.prev = _context75.next) {
                                                    case 0:
                                                        return _context75.delegateYield(GeometryUtility.ellipseTexCoord(div), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context75.stop();
                                                }
                                            }
                                        }, texCoord, this);
                                    })
                                };
                            }
                        }
                    }
                });
            });
        }
    }, {
        key: "_registerCylinder",
        value: function _registerCylinder() {
            GeometryFactory.addType("cylinder", {
                divide: {
                    converter: "Number",
                    defaultValue: 50
                }
            }, function (gl, attrs) {
                var div = attrs["divide"];
                return GeometryBuilder.build(gl, {
                    indicies: {
                        default: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context76) {
                                    while (1) {
                                        switch (_context76.prev = _context76.next) {
                                            case 0:
                                                return _context76.delegateYield(GeometryUtility.cylinderIndex(0, div), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context76.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.TRIANGLES
                        },
                        wireframe: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context77) {
                                    while (1) {
                                        switch (_context77.prev = _context77.next) {
                                            case 0:
                                                return _context77.delegateYield(GeometryUtility.linesFromTriangles(GeometryUtility.cylinderIndex(0, div)), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context77.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.LINES
                        }
                    },
                    verticies: {
                        main: {
                            size: {
                                position: 3,
                                normal: 3,
                                texCoord: 2
                            },
                            count: GeometryUtility.cylinderSize(div),
                            getGenerators: function getGenerators() {
                                return {
                                    position: _regenerator2.default.mark(function position() {
                                        return _regenerator2.default.wrap(function position$(_context78) {
                                            while (1) {
                                                switch (_context78.prev = _context78.next) {
                                                    case 0:
                                                        return _context78.delegateYield(GeometryUtility.cylinderPosition(Vector3.Zero, Vector3.YUnit, Vector3.XUnit, Vector3.ZUnit.negateThis(), div), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context78.stop();
                                                }
                                            }
                                        }, position, this);
                                    }),
                                    normal: _regenerator2.default.mark(function normal() {
                                        return _regenerator2.default.wrap(function normal$(_context79) {
                                            while (1) {
                                                switch (_context79.prev = _context79.next) {
                                                    case 0:
                                                        return _context79.delegateYield(GeometryUtility.cylinderNormal(Vector3.Zero, Vector3.YUnit, Vector3.XUnit, Vector3.ZUnit.negateThis(), div), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context79.stop();
                                                }
                                            }
                                        }, normal, this);
                                    }),
                                    texCoord: _regenerator2.default.mark(function texCoord() {
                                        return _regenerator2.default.wrap(function texCoord$(_context80) {
                                            while (1) {
                                                switch (_context80.prev = _context80.next) {
                                                    case 0:
                                                        return _context80.delegateYield(GeometryUtility.cylinderTexCoord(div), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context80.stop();
                                                }
                                            }
                                        }, texCoord, this);
                                    })
                                };
                            }
                        }
                    }
                });
            });
        }
    }, {
        key: "_registerCone",
        value: function _registerCone() {
            GeometryFactory.addType("cone", {
                divide: {
                    converter: "Number",
                    defaultValue: 50
                }
            }, function (gl, attrs) {
                var div = attrs["divide"];
                return GeometryBuilder.build(gl, {
                    indicies: {
                        default: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context81) {
                                    while (1) {
                                        switch (_context81.prev = _context81.next) {
                                            case 0:
                                                return _context81.delegateYield(GeometryUtility.coneIndex(0, div), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context81.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.TRIANGLES
                        },
                        wireframe: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context82) {
                                    while (1) {
                                        switch (_context82.prev = _context82.next) {
                                            case 0:
                                                return _context82.delegateYield(GeometryUtility.linesFromTriangles(GeometryUtility.coneIndex(0, div)), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context82.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.LINES
                        }
                    },
                    verticies: {
                        main: {
                            size: {
                                position: 3,
                                normal: 3,
                                texCoord: 2
                            },
                            count: GeometryUtility.coneSize(div),
                            getGenerators: function getGenerators() {
                                return {
                                    position: _regenerator2.default.mark(function position() {
                                        return _regenerator2.default.wrap(function position$(_context83) {
                                            while (1) {
                                                switch (_context83.prev = _context83.next) {
                                                    case 0:
                                                        return _context83.delegateYield(GeometryUtility.conePosition(Vector3.Zero, Vector3.YUnit, Vector3.XUnit, Vector3.ZUnit.negateThis(), div), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context83.stop();
                                                }
                                            }
                                        }, position, this);
                                    }),
                                    normal: _regenerator2.default.mark(function normal() {
                                        return _regenerator2.default.wrap(function normal$(_context84) {
                                            while (1) {
                                                switch (_context84.prev = _context84.next) {
                                                    case 0:
                                                        return _context84.delegateYield(GeometryUtility.coneNormal(Vector3.Zero, Vector3.YUnit, Vector3.XUnit, Vector3.ZUnit.negateThis(), div), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context84.stop();
                                                }
                                            }
                                        }, normal, this);
                                    }),
                                    texCoord: _regenerator2.default.mark(function texCoord() {
                                        return _regenerator2.default.wrap(function texCoord$(_context85) {
                                            while (1) {
                                                switch (_context85.prev = _context85.next) {
                                                    case 0:
                                                        return _context85.delegateYield(GeometryUtility.coneTexCoord(div), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context85.stop();
                                                }
                                            }
                                        }, texCoord, this);
                                    })
                                };
                            }
                        }
                    }
                });
            });
        }
    }, {
        key: "_registerPlane",
        value: function _registerPlane() {
            GeometryFactory.addType("plane", {
                divide: {
                    converter: "Number",
                    defaultValue: 10
                }
            }, function (gl, attrs) {
                var div = attrs["divide"];
                return GeometryBuilder.build(gl, {
                    indicies: {
                        default: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context86) {
                                    while (1) {
                                        switch (_context86.prev = _context86.next) {
                                            case 0:
                                                return _context86.delegateYield(GeometryUtility.planeIndex(0, div), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context86.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.TRIANGLES
                        },
                        wireframe: {
                            generator: _regenerator2.default.mark(function generator() {
                                return _regenerator2.default.wrap(function generator$(_context87) {
                                    while (1) {
                                        switch (_context87.prev = _context87.next) {
                                            case 0:
                                                return _context87.delegateYield(GeometryUtility.linesFromTriangles(GeometryUtility.planeIndex(0, div)), "t0", 1);

                                            case 1:
                                            case "end":
                                                return _context87.stop();
                                        }
                                    }
                                }, generator, this);
                            }),
                            topology: WebGLRenderingContext.LINES
                        }
                    },
                    verticies: {
                        main: {
                            size: {
                                position: 3,
                                normal: 3,
                                texCoord: 2
                            },
                            count: GeometryUtility.planeSize(div),
                            getGenerators: function getGenerators() {
                                return {
                                    position: _regenerator2.default.mark(function position() {
                                        return _regenerator2.default.wrap(function position$(_context88) {
                                            while (1) {
                                                switch (_context88.prev = _context88.next) {
                                                    case 0:
                                                        return _context88.delegateYield(GeometryUtility.planePosition(Vector3.Zero, Vector3.YUnit, Vector3.XUnit, div), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context88.stop();
                                                }
                                            }
                                        }, position, this);
                                    }),
                                    normal: _regenerator2.default.mark(function normal() {
                                        return _regenerator2.default.wrap(function normal$(_context89) {
                                            while (1) {
                                                switch (_context89.prev = _context89.next) {
                                                    case 0:
                                                        return _context89.delegateYield(GeometryUtility.planeNormal(Vector3.ZUnit, div), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context89.stop();
                                                }
                                            }
                                        }, normal, this);
                                    }),
                                    texCoord: _regenerator2.default.mark(function texCoord() {
                                        return _regenerator2.default.wrap(function texCoord$(_context90) {
                                            while (1) {
                                                switch (_context90.prev = _context90.next) {
                                                    case 0:
                                                        return _context90.delegateYield(GeometryUtility.planeTexCoord(div), "t0", 1);

                                                    case 1:
                                                    case "end":
                                                        return _context90.stop();
                                                }
                                            }
                                        }, texCoord, this);
                                    })
                                };
                            }
                        }
                    }
                });
            });
        }
    }]);
    return DefaultPrimitives;
}();

function BooleanConverter(val) {
    if (typeof val === "boolean") {
        return val;
    } else if (typeof val === "string") {
        switch (val) {
            case "true":
                return true;
            case "false":
                return false;
            default:
                throw new Error("Invalid string " + val + " for parsing as boolean");
        }
    }
    throw new Error("Parsing failed: " + val);
}

var NodeUtility = function () {
    function NodeUtility() {
        (0, _classCallCheck3.default)(this, NodeUtility);
    }

    (0, _createClass3.default)(NodeUtility, null, [{
        key: "getNodeListIndexByElementIndex",

        /**
         * Get index of NodeList converted from index in Element
         * @param  {HTMLElement} targetElement Parent element of search target elements
         * @param  {number}      elementIndex  Index in element
         * @return {number}                    Index in NodeList
         */
        value: function getNodeListIndexByElementIndex(targetElement, elementIndex) {
            var nodeArray = Array.prototype.slice.call(targetElement.childNodes);
            var elementArray = nodeArray.filter(function (v) {
                return v.nodeType === 1;
            });
            elementIndex = elementIndex < 0 ? elementArray.length + elementIndex : elementIndex;
            var index = nodeArray.indexOf(elementArray[elementIndex]);
            return index === -1 ? null : index;
        }
    }, {
        key: "getAttributes",
        value: function getAttributes(element) {
            var attributes = {};
            var domAttr = element.attributes;
            for (var i = 0; i < domAttr.length; i++) {
                var attrNode = domAttr.item(i);
                var name = attrNode.name;
                attributes[name] = attrNode.value;
            }
            return attributes;
        }
    }]);
    return NodeUtility;
}();

var Constants = function () {
    function Constants() {
        (0, _classCallCheck3.default)(this, Constants);
    }

    (0, _createClass3.default)(Constants, null, [{
        key: "defaultNamespace",
        get: function get() {
            return "HTTP://GRIMOIRE.GL/NS/DEFAULT";
        }
    }]);
    return Constants;
}();

/**
 * The class to identity with XML namespace feature.
 */


var NSIdentity = function () {
    function NSIdentity(ns, name) {
        (0, _classCallCheck3.default)(this, NSIdentity);

        if (name) {
            this.ns = ns.toUpperCase();
            this.name = name;
        } else {
            this.ns = Constants.defaultNamespace;
            this.name = ns;
        }
        // Ensure all of the characters are uppercase
        this.name = NSIdentity._ensureValidIdentity(this.name, true);
        this.ns = NSIdentity._ensureValidIdentity(this.ns);
        this.fqn = this.name + "|" + this.ns;
    }
    /**
     * Generate an instance from Full qualified name.
     * @param  {string}             fqn [description]
     * @return {NSIdentity}     [description]
     */


    (0, _createClass3.default)(NSIdentity, null, [{
        key: "fromFQN",
        value: function fromFQN(fqn) {
            var splitted = fqn.split("|");
            if (splitted.length !== 2) {
                throw new Error("Invalid fqn was given");
            }
            return new NSIdentity(splitted[1], splitted[0]);
        }
        /**
         * Make sure given name is valid for using in identity.
         * | is prohibited for using in name or namespace.
         * . is prohibited for using in name.
         * All lowercase alphabet will be transformed into uppercase.
         * @param  {string} name        [A name to verify]
         * @param  {[type]} noDot=false [Ensure not using dot or not]
         * @return {string}             [Valid name]
         */

    }, {
        key: "_ensureValidIdentity",
        value: function _ensureValidIdentity(name) {
            var noDot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (name.indexOf("|") > -1) {
                throw new Error("Namespace and identity cannnot contain | ");
            }
            if (noDot && name.indexOf(".") > -1) {
                throw new Error("identity cannnot contain .");
            }
            if (name == null) {
                throw new Error("Specified name was null or undefined");
            }
            return name;
        }
    }]);
    return NSIdentity;
}();

var NSDictionary = function () {
    function NSDictionary() {
        (0, _classCallCheck3.default)(this, NSDictionary);

        this._nameObjectMap = new _map2.default();
        this._fqnObjectMap = new _map2.default();
    }

    (0, _createClass3.default)(NSDictionary, [{
        key: "set",
        value: function set(key, value) {
            var namedChildMap = void 0;
            if (this._nameObjectMap.has(key.name)) {
                namedChildMap = this._nameObjectMap.get(key.name);
            } else {
                namedChildMap = new _map2.default();
                this._nameObjectMap.set(key.name, namedChildMap);
            }
            namedChildMap.set(key.fqn, value);
            this._fqnObjectMap.set(key.fqn, value);
        }
    }, {
        key: "delete",
        value: function _delete(key) {
            if (this._fqnObjectMap.has(key.fqn)) {
                var theMap = this._nameObjectMap.get(key.name);
                if (theMap.size === 1) {
                    this._nameObjectMap.delete(key.name);
                } else {
                    theMap.delete(key.fqn);
                }
                this._fqnObjectMap.delete(key.fqn);
            }
        }
    }, {
        key: "get",
        value: function get(arg1, name) {
            if (typeof arg1 === "string") {
                if (name) {
                    return this.get(new NSIdentity(arg1, name));
                } else {
                    var namedMap = this._nameObjectMap.get(arg1);
                    if (!namedMap) {
                        return null;
                    }
                    if (namedMap.size === 1) {
                        var itr = namedMap.values();
                        return itr.next().value;
                    } else {
                        throw new Error("Specified tag name " + arg1 + " is ambigious to identify.");
                    }
                }
            } else {
                if (arg1 instanceof NSIdentity) {
                    return this.fromFQN(arg1.fqn);
                } else {
                    if (arg1.prefix) {
                        return this.get(new NSIdentity(arg1.namespaceURI, arg1.localName));
                    } else {
                        if (arg1.namespaceURI && this._fqnObjectMap.has(arg1.localName + "|" + arg1.namespaceURI)) {
                            return this.get(new NSIdentity(arg1.namespaceURI, arg1.localName));
                        }
                        if (arg1 && arg1.ownerElement && arg1.ownerElement.namespaceURI && this._fqnObjectMap.has(arg1.localName + "|" + arg1.ownerElement.namespaceURI)) {
                            return this.get(new NSIdentity(arg1.ownerElement.namespaceURI, arg1.localName));
                        }
                        return this.get(arg1.localName);
                    }
                }
            }
        }
    }, {
        key: "fromFQN",
        value: function fromFQN(fqn) {
            return this._fqnObjectMap.get(fqn);
        }
    }, {
        key: "isAmbigious",
        value: function isAmbigious(name) {
            return this._nameObjectMap.get(name).size > 1;
        }
    }, {
        key: "has",
        value: function has(name) {
            return this._nameObjectMap.has(name);
        }
    }, {
        key: "pushDictionary",
        value: function pushDictionary(dict) {
            var _this33 = this;

            dict._fqnObjectMap.forEach(function (value, keyFQN) {
                var id = NSIdentity.fromFQN(keyFQN);
                _this33.set(id, value);
            });
            return this;
        }
    }, {
        key: "toArray",
        value: function toArray() {
            var ret = [];
            this._fqnObjectMap.forEach(function (value) {
                ret.push(value);
            });
            return ret;
        }
    }, {
        key: "clone",
        value: function clone() {
            var dict = new NSDictionary();
            return dict.pushDictionary(this);
        }
    }, {
        key: "forEach",
        value: function forEach(callback) {
            this._fqnObjectMap.forEach(function (val, key) {
                callback(val, key);
            });
            return this;
        }
    }, {
        key: "map",
        value: function map(callback) {
            var ret = new NSDictionary();
            this._fqnObjectMap.forEach(function (val, fqn) {
                var id = NSIdentity.fromFQN(fqn);
                ret.set(id, callback(val, fqn));
            });
            return ret;
        }
    }, {
        key: "clear",
        value: function clear() {
            this._nameObjectMap.clear();
            this._fqnObjectMap.clear();
        }
    }]);
    return NSDictionary;
}();

/**
 * Provides static methods to ensure arguments are valid type.
 */


var Ensure = function () {
    function Ensure() {
        (0, _classCallCheck3.default)(this, Ensure);
    }

    (0, _createClass3.default)(Ensure, null, [{
        key: "ensureString",

        /**
         * Ensure specified str being string
         * @param  {string | number}      str [description]
         * @return {string}      [description]
         */
        value: function ensureString(str) {
            if (typeof str === "string") {
                return str;
            } else if (typeof str === "number") {
                return str.toString();
            } else {
                throw new Error("Specified argument can not convert into string");
            }
        }
        /**
         * Ensure specified number being number
         * @param  {string | number}      str [description]
         * @return {string}      [description]
         */

    }, {
        key: "ensureNumber",
        value: function ensureNumber(num) {
            if (typeof num === "string") {
                return parseInt(num, 10);
            } else if (typeof num === "number") {
                return num;
            } else {
                throw new Error("specified argument can not be converted into number");
            }
        }
    }, {
        key: "ensureTobeNSIdentity",
        value: function ensureTobeNSIdentity(name) {
            if (!name) {
                return undefined;
            }
            if (typeof name === "string") {
                return new NSIdentity(name);
            } else {
                return name;
            }
        }
    }, {
        key: "ensureTobeNSIdentityArray",
        value: function ensureTobeNSIdentityArray(names) {
            if (!names) {
                return [];
            }
            var newArr = [];
            for (var i = 0; i < names.length; i++) {
                newArr.push(this.ensureTobeNSIdentity(names[i]));
            }
            return newArr;
        }
    }, {
        key: "ensureTobeNSDictionary",
        value: function ensureTobeNSDictionary(dict, defaultNamespace) {
            if (!dict) {
                return new NSDictionary();
            }
            if (dict instanceof NSDictionary) {
                return dict;
            } else {
                var newDict = new NSDictionary();
                for (var key in dict) {
                    newDict.set(new NSIdentity(defaultNamespace, key), dict[key]);
                }
                return newDict;
            }
        }
    }, {
        key: "ensureTobeMessage",
        value: function ensureTobeMessage(message) {
            if (message.startsWith("$")) {
                return message;
            } else {
                return "$" + message;
            }
        }
    }]);
    return Ensure;
}();

/**
 * Manage a attribute attached to components.
 */


var Attribute = function () {
    function Attribute() {
        (0, _classCallCheck3.default)(this, Attribute);

        /**
         * List of functions that is listening changing values.
         */
        this._observers = [];
    }
    /**
     * Goml tree interface which contains the component this attribute bound to.
     * @return {IGomlInterface} [description]
     */


    (0, _createClass3.default)(Attribute, [{
        key: "addObserver",

        /**
         * Add event handler to observe changing this attribute.
         * @param  {(attr: Attribute) => void} handler handler the handler you want to add.
         * @param {boolean = false} callFirst whether that handler should be called first time.
         */
        value: function addObserver(handler) {
            var callFirst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            this._observers.push(handler);
            if (callFirst) {
                handler(this);
            }
        }
        /**
         * Remove event handler you added.
         * @param  {Attribute} handler [description]
         * @return {[type]}            [description]
         */

    }, {
        key: "removeObserver",
        value: function removeObserver(handler) {
            var index = -1;
            for (var i = 0; i < this._observers.length; i++) {
                if (handler === this._observers[i]) {
                    index = i;
                    break;
                }
            }
            if (index < 0) {
                return;
            }
            this._observers.splice(index, 1);
        }
        /**
         * Bind converted value to specified field.
         * When target object was not specified, field of owner component would be assigned.
         * @param {string} variableName [description]
         * @param {any} targetObject [description]
         */

    }, {
        key: "boundTo",
        value: function boundTo(variableName) {
            var targetObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.component;

            this.addObserver(function (v) {
                targetObject[variableName] = v.Value;
            });
            targetObject[variableName] = this.Value;
        }
        /**
         * Apply default value to attribute from DOM values.
         * @param {string }} domValues [description]
         */

    }, {
        key: "resolveDefaultValue",
        value: function resolveDefaultValue(domValues) {
            if (this._value !== void 0) {
                return;
            }
            var tagAttrValue = domValues[this.name.name];
            if (tagAttrValue !== void 0) {
                this.Value = tagAttrValue; // Dom指定値で解決
                return;
            }
            var nodeDefaultValue = this.component.node.nodeDeclaration.defaultAttributesActual.get(this.name);
            if (nodeDefaultValue !== void 0) {
                this.Value = nodeDefaultValue; // Node指定値で解決
                return;
            }
            var attrDefaultValue = this.declaration.defaultValue;
            this.Value = attrDefaultValue;
        }
    }, {
        key: "_notifyChange",
        value: function _notifyChange() {
            var _this34 = this;

            this._observers.forEach(function (handler) {
                handler(_this34);
            });
        }
    }, {
        key: "tree",
        get: function get() {
            return this.component.tree;
        }
        /**
         * Companion map which is bounding to the component this attribute bound to.
         * @return {NSDictionary<any>} [description]
         */

    }, {
        key: "companion",
        get: function get() {
            return this.component.companion;
        }
        /**
         * Get a value with specified type.
         * @return {any} value with specified type.
         */

    }, {
        key: "Value",
        get: function get() {
            try {
                return this.converter.convert(this._value);
            } catch (e) {
                console.error(e); // TODO should be more convenient error handling
            }
        }
        /**
         * Set a value with any type.
         * @param {any} val Value with string or specified type.
         */
        ,
        set: function set(val) {
            this._value = val;
            this._notifyChange();
        }
        /**
         * Construct a new attribute with name of key and any value with specified type. If constant flag is true, This attribute will be immutable.
         * If converter is not served, string converter will be set as default.
         * @param {string}        key       Key of this attribute.
         * @param {any}           value     Value of this attribute.
         * @param {ConverterBase} converter Converter of this attribute.
         * @param {boolean}       constant  Whether this attribute is immutable or not. False as default.
         */

    }], [{
        key: "generateAttributeForComponent",
        value: function generateAttributeForComponent(name, declaration, component) {
            var attr = new Attribute();
            attr.name = new NSIdentity(component.name.ns, name);
            attr.component = component;
            attr.declaration = declaration;
            var converterName = Ensure.ensureTobeNSIdentity(declaration.converter);
            attr.converter = obtainGomlInterface.converters.get(converterName);
            if (attr.converter === void 0) {
                // When the specified converter was not found
                throw new Error("Specified converter " + converterName.name + " was not found from registered converters.\n Component: " + attr.component.name.fqn + "\n Attribute: " + attr.name.name);
            }
            attr.converter = {
                convert: attr.converter.convert.bind(attr),
                name: attr.converter.name
            };
            attr.component.attributes.set(attr.name, attr);
            return attr;
        }
    }]);
    return Attribute;
}();

/**
 * Base class for any components
 */


var Component = function (_IDObject2) {
    (0, _inherits3.default)(Component, _IDObject2);

    function Component() {
        (0, _classCallCheck3.default)(this, Component);

        /**
         * Whether this component was created by nodeDeclaration
         * @type {boolean}
         */
        var _this35 = (0, _possibleConstructorReturn3.default)(this, (Component.__proto__ || (0, _getPrototypeOf2.default)(Component)).apply(this, arguments));

        _this35.isDefaultComponent = false;
        /**
         * Flag that this component is activated or not.
         * @type {boolean}
         */
        _this35._enabled = true;
        _this35._handlers = [];
        _this35._additionalAttributesNames = [];
        return _this35;
    }

    (0, _createClass3.default)(Component, [{
        key: "getValue",

        /**
         * Obtain value of attribute. When the attribute is not existing, this method would return undefined.
         * @param  {string} name [description]
         * @return {any}         [description]
         */
        value: function getValue(name) {
            var attr = this.attributes.get(name);
            if (attr) {
                return attr.Value;
            } else {
                return undefined;
            }
        }
        /**
         * Set value of attribute
         * @param {string} name  [description]
         * @param {any}    value [description]
         */

    }, {
        key: "setValue",
        value: function setValue(name, value) {
            var attr = this.attributes.get(name); // TODO:check readonly?
            if (attr) {
                attr.Value = value;
            }
        }
    }, {
        key: "getAttribute",
        value: function getAttribute(name) {
            return this.attributes.get(name);
        }
    }, {
        key: "addEnabledObserver",
        value: function addEnabledObserver(handler) {
            this._handlers.push(handler);
        }
    }, {
        key: "removeEnabledObserver",
        value: function removeEnabledObserver(handler) {
            var index = -1;
            for (var i = 0; i < this._handlers.length; i++) {
                if (handler === this._handlers[i]) {
                    index = i;
                    break;
                }
            }
            if (index < 0) {
                return;
            }
            this._handlers.splice(index, 1);
        }
    }, {
        key: "resolveDefaultAttributes",
        value: function resolveDefaultAttributes(nodeAttributes) {
            var _this36 = this;

            if (this.isDefaultComponent) {
                this.attributes.forEach(function (attr) {
                    return attr.resolveDefaultValue(nodeAttributes);
                });
            } else {
                (function () {
                    var attrs = NodeUtility.getAttributes(_this36.element);
                    _this36.attributes.forEach(function (attr) {
                        return attr.resolveDefaultValue(attrs);
                    });
                })();
            }
        }
        /**
         * Add attribute
         * @param {string}                name      [description]
         * @param {IAttributeDeclaration} attribute [description]
         */

    }, {
        key: "__addAtribute",
        value: function __addAtribute(name, attribute) {
            if (!attribute) {
                throw new Error("can not add attribute null or undefined.");
            }
            var attr = Attribute.generateAttributeForComponent(name, attribute, this);
            if (this.isDefaultComponent) {
                this.node.addAttribute(attr);
            }
            if (this.isDefaultComponent) {
                attr.resolveDefaultValue(NodeUtility.getAttributes(this.node.element));
            } else {
                var attrs = NodeUtility.getAttributes(this.element);
                attr.resolveDefaultValue(attrs);
            }
            this._additionalAttributesNames.push(attr.name);
        }
    }, {
        key: "__removeAttributes",
        value: function __removeAttributes(name) {
            var _this37 = this;

            if (name) {
                var _index3 = this._additionalAttributesNames.findIndex(function (id) {
                    return id.name === name;
                });
                if (_index3 < 0) {
                    throw new Error("can not remove attributes :" + name);
                }
                var attrId = this._additionalAttributesNames[_index3];
                if (this.isDefaultComponent) {
                    this.node.removeAttribute(this.attributes.get(attrId));
                }
                this.attributes.delete(attrId);
                this._additionalAttributesNames.splice(_index3, 1);
            } else {
                this._additionalAttributesNames.forEach(function (id) {
                    _this37.__removeAttributes(id.name);
                });
            }
        }
    }, {
        key: "enabled",
        get: function get() {
            return this._enabled;
        },
        set: function set(val) {
            var _this38 = this;

            if (this._enabled === val) {
                return;
            }
            this._enabled = val;
            this._handlers.forEach(function (handler) {
                handler(_this38);
            });
        }
        /**
         * The dictionary which is shared in entire tree.
         * @return {NSDictionary<any>} [description]
         */

    }, {
        key: "companion",
        get: function get() {
            return this.node ? this.node.companion : null;
        }
        /**
         * Tree interface for the tree this node is attached.
         * @return {IGomlInterface} [description]
         */

    }, {
        key: "tree",
        get: function get() {
            return this.node ? this.node.tree : null;
        }
    }]);
    return Component;
}(IDObject);

var GrimoireComponent = function (_Component) {
    (0, _inherits3.default)(GrimoireComponent, _Component);

    function GrimoireComponent() {
        (0, _classCallCheck3.default)(this, GrimoireComponent);
        return (0, _possibleConstructorReturn3.default)(this, (GrimoireComponent.__proto__ || (0, _getPrototypeOf2.default)(GrimoireComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(GrimoireComponent, [{
        key: "$awake",
        value: function $awake() {
            var _this40 = this;

            this.node.resolveAttributesValue();
            this.getAttribute("id").addObserver(function (attr) {
                _this40.node.element.id = attr.Value;
            });
            this.getAttribute("class").addObserver(function (attr) {
                _this40.node.element.className = attr.Value.join(" ");
            });
            this.getAttribute("enabled").addObserver(function (attr) {
                if (_this40.node.isActive) {
                    _this40.node.notifyActivenessUpdate();
                }
            });
        }
    }]);
    return GrimoireComponent;
}(Component);

GrimoireComponent.attributes = {
    id: {
        converter: "String",
        defaultValue: null,
        readonly: false
    },
    class: {
        converter: "StringArray",
        defaultValue: null,
        readonly: false
    },
    enabled: {
        converter: "Boolean",
        defaultValue: true,
        readonly: false
    }
};

function StringArrayConverter(val) {
    if (Array.isArray(val) || !val) {
        return val;
    }
    if (typeof val === "string") {
        return val.split(" ");
    }
    throw new Error("value is not supported by StringArrayConverter.:" + val);
}

function StringConverter(val) {
    if (typeof val === "string") {
        return val;
    } else if (!val) {
        return val;
    } else if (typeof val.toString === "function") {
        return val.toString();
    }
    throw new Error("value is not supported by StringConverter.");
}

var ComponentDeclaration = function () {
    function ComponentDeclaration(name, attributes, ctor) {
        (0, _classCallCheck3.default)(this, ComponentDeclaration);

        this.name = name;
        this.attributes = attributes;
        this.ctor = ctor;
        // if (this.attributes["enabled"]) {//TODO implements enabled
        //   throw new Error("attribute 'enabled' is already defined by default.");
        // }
        // this.attributes["enabled"] = {
        //   converter: "Boolean",
        //   defaultValue: true
        // };
    }

    (0, _createClass3.default)(ComponentDeclaration, [{
        key: "generateInstance",
        value: function generateInstance(componentElement) {
            componentElement = componentElement ? componentElement : document.createElementNS(this.name.ns, this.name.name);
            var component = new this.ctor();
            componentElement.setAttribute("x-gr-id", component.id);
            obtainGomlInterface.componentDictionary[component.id] = component;
            component.name = this.name;
            component.element = componentElement;
            component.attributes = new NSDictionary();
            for (var key in this.attributes) {
                Attribute.generateAttributeForComponent(key, this.attributes[key], component);
            }
            return component;
        }
    }]);
    return ComponentDeclaration;
}();

var NSSet = function () {
    function NSSet() {
        (0, _classCallCheck3.default)(this, NSSet);

        this._contentArray = [];
    }

    (0, _createClass3.default)(NSSet, [{
        key: "push",
        value: function push(item) {
            var index = this._contentArray.findIndex(function (id) {
                return id.fqn === item.fqn;
            });
            if (index === -1) {
                this._contentArray.push(item);
            }
            return this;
        }
    }, {
        key: "pushArray",
        value: function pushArray(item) {
            var _this41 = this;

            item.forEach(function (v) {
                _this41.push(v);
            });
            return this;
        }
    }, {
        key: "values",
        value: function values() {
            return this._contentArray.values();
        }
    }, {
        key: "toArray",
        value: function toArray() {
            var ret = [];
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = (0, _getIterator3.default)(this._contentArray), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    ret.push(item);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return ret;
        }
    }, {
        key: "clone",
        value: function clone() {
            var newSet = new NSSet();
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = (0, _getIterator3.default)(this._contentArray), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var i = _step4.value;

                    newSet.push(i);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return newSet;
        }
    }, {
        key: "merge",
        value: function merge(other) {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = (0, _getIterator3.default)(other._contentArray), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var elem = _step5.value;

                    this.push(elem);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            return this;
        }
    }], [{
        key: "fromArray",
        value: function fromArray(array) {
            var nSet = new NSSet();
            nSet.pushArray(array);
            return nSet;
        }
    }]);
    return NSSet;
}();

var NodeDeclaration = function () {
    function NodeDeclaration(name, defaultComponents, defaultAttributes, superNode, _treeConstraints) {
        (0, _classCallCheck3.default)(this, NodeDeclaration);

        this.name = name;
        this.defaultComponents = defaultComponents;
        this.defaultAttributes = defaultAttributes;
        this.superNode = superNode;
        this._treeConstraints = _treeConstraints;
        if (!this.superNode && this.name.name.toUpperCase() !== "GRIMOIRENODEBASE") {
            this.superNode = new NSIdentity("GrimoireNodeBase");
        }
    }

    (0, _createClass3.default)(NodeDeclaration, [{
        key: "addDefaultComponent",
        value: function addDefaultComponent(componentName) {
            var componentId = Ensure.ensureTobeNSIdentity(componentName);
            this.defaultComponents.push(componentId);
            if (this._defaultComponentsActual) {
                this._defaultComponentsActual.push(componentId);
            }
        }
    }, {
        key: "_resolveInherites",
        value: function _resolveInherites() {
            if (!this.superNode) {
                this._defaultComponentsActual = this.defaultComponents;
                this._defaultAttributesActual = this.defaultAttributes;
                return;
            }
            var superNode = obtainGomlInterface.nodeDeclarations.get(this.superNode);
            var inheritedDefaultComponents = superNode.defaultComponentsActual;
            var inheritedDefaultAttribute = superNode.defaultAttributesActual;
            this._defaultComponentsActual = inheritedDefaultComponents.clone().merge(this.defaultComponents);
            this._defaultAttributesActual = inheritedDefaultAttribute.clone().pushDictionary(this.defaultAttributes);
        }
    }, {
        key: "defaultComponentsActual",
        get: function get() {
            if (!this._defaultComponentsActual) {
                this._resolveInherites();
            }
            return this._defaultComponentsActual;
        }
    }, {
        key: "defaultAttributesActual",
        get: function get() {
            if (!this._defaultAttributesActual) {
                this._resolveInherites();
            }
            return this._defaultAttributesActual;
        }
    }, {
        key: "treeConstraints",
        get: function get() {
            return this._treeConstraints;
        }
    }]);
    return NodeDeclaration;
}();

/**
 * Provides safe xml read feature.
 */


var XMLReader = function () {
    function XMLReader() {
        (0, _classCallCheck3.default)(this, XMLReader);
    }

    (0, _createClass3.default)(XMLReader, null, [{
        key: "parseXML",
        value: function parseXML(doc, rootElementName) {
            var parsed = XMLReader._parser.parseFromString(doc, "text/xml");
            if (rootElementName) {
                if (parsed.documentElement.tagName.toUpperCase() !== rootElementName.toUpperCase()) {
                    throw new Error("Specified document is invalid.");
                } // TODO should throw more detail error
            }
            return [parsed.documentElement]; // TODO: implenent!
        }
    }, {
        key: "getElements",
        value: function getElements(elem, name) {
            var result = [];
            var elems = elem.getElementsByTagName(name);
            for (var i = 0; i < elems.length; i++) {
                result.push(elems.item(i));
            }
            return result;
        }
    }, {
        key: "getSingleElement",
        value: function getSingleElement(elem, name, mandatory) {
            var result = XMLReader.getElements(elem, name);
            if (result.length === 1) {
                return result[0];
            } else if (result.length === 0) {
                if (mandatory) {
                    throw new Error("The mandatory element " + name + " was required, but not found");
                } else {
                    return null;
                }
            } else {
                throw new Error("The element " + name + " requires to exist in single. But there is " + result.length + " count of elements");
            }
        }
    }, {
        key: "getAttribute",
        value: function getAttribute(elem, name, mandatory) {
            var result = elem.attributes.getNamedItem(name);
            if (result) {
                return result.value;
            } else if (mandatory) {
                throw new Error("The mandatory attribute " + name + " was required, but it was not found");
            } else {
                return null;
            }
        }
    }, {
        key: "getAttributeFloat",
        value: function getAttributeFloat(elem, name, mandatory) {
            var resultStr = XMLReader.getAttribute(elem, name, mandatory);
            return parseFloat(resultStr);
        }
    }, {
        key: "getAttributeInt",
        value: function getAttributeInt(elem, name, mandatory) {
            var resultStr = XMLReader.getAttribute(elem, name, mandatory);
            return parseInt(resultStr, 10);
        }
    }, {
        key: "getChildElements",
        value: function getChildElements(elem) {
            var children = elem.childNodes;
            var result = [];
            for (var i = 0; i < children.length; i++) {
                if (children.item(i) instanceof Element) {
                    result.push(children.item(i));
                }
            }
            return result;
        }
    }, {
        key: "getAttributes",
        value: function getAttributes(elem, ns) {
            var result = {};
            var attrs = elem.attributes;
            for (var i = 0; i < attrs.length; i++) {
                var attr = attrs.item(i);
                if (!ns || attr.namespaceURI === ns) {
                    result[attr.localName] = attr.value;
                }
            }
            return result;
        }
    }]);
    return XMLReader;
}();

XMLReader._parser = new DOMParser();

var domain;

// This constructor is used to store event handlers. Instantiating this is
// faster than explicitly calling `Object.create(null)` to get a "clean" empty
// object (tested with v8 v4.9).
function EventHandlers() {}
EventHandlers.prototype = (0, _create2.default)(null);

function EventEmitter() {
    EventEmitter.init.call(this);
}
EventEmitter.usingDomains = false;

EventEmitter.prototype.domain = undefined;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

EventEmitter.init = function () {
    this.domain = null;
    if (EventEmitter.usingDomains) {
        // if there is an active domain, then attach to it.
        if (domain.active && !(this instanceof domain.Domain)) {
            this.domain = domain.active;
        }
    }

    if (!this._events || this._events === (0, _getPrototypeOf2.default)(this)._events) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
    this._maxListeners = n;
    return this;
};

function $getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
    if (isFn) handler.call(self);else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i) {
            listeners[i].call(self);
        }
    }
}
function emitOne(handler, isFn, self, arg1) {
    if (isFn) handler.call(self, arg1);else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i) {
            listeners[i].call(self, arg1);
        }
    }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn) handler.call(self, arg1, arg2);else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i) {
            listeners[i].call(self, arg1, arg2);
        }
    }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn) handler.call(self, arg1, arg2, arg3);else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i) {
            listeners[i].call(self, arg1, arg2, arg3);
        }
    }
}

function emitMany(handler, isFn, self, args) {
    if (isFn) handler.apply(self, args);else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i) {
            listeners[i].apply(self, args);
        }
    }
}

EventEmitter.prototype.emit = function emit(type) {
    var er, handler, len, args, i, events, domain;
    var needDomainExit = false;
    var doError = type === 'error';

    events = this._events;
    if (events) doError = doError && events.error == null;else if (!doError) return false;

    domain = this.domain;

    // If there is no 'error' event listener then throw.
    if (doError) {
        er = arguments[1];
        if (domain) {
            if (!er) er = new Error('Uncaught, unspecified "error" event');
            er.domainEmitter = this;
            er.domain = domain;
            er.domainThrown = false;
            domain.emit('error', er);
        } else if (er instanceof Error) {
            throw er; // Unhandled 'error' event
        } else {
            // At least give some kind of context to the user
            var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
            err.context = er;
            throw err;
        }
        return false;
    }

    handler = events[type];

    if (!handler) return false;

    var isFn = typeof handler === 'function';
    len = arguments.length;
    switch (len) {
        // fast cases
        case 1:
            emitNone(handler, isFn, this);
            break;
        case 2:
            emitOne(handler, isFn, this, arguments[1]);
            break;
        case 3:
            emitTwo(handler, isFn, this, arguments[1], arguments[2]);
            break;
        case 4:
            emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
            break;
        // slower
        default:
            args = new Array(len - 1);
            for (i = 1; i < len; i++) {
                args[i - 1] = arguments[i];
            }emitMany(handler, isFn, this, args);
    }

    if (needDomainExit) domain.exit();

    return true;
};

function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');

    events = target._events;
    if (!events) {
        events = target._events = new EventHandlers();
        target._eventsCount = 0;
    } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener) {
            target.emit('newListener', type, listener.listener ? listener.listener : listener);

            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }

    if (!existing) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    } else {
        if (typeof existing === 'function') {
            // Adding the second element, need to change to array.
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else {
            // If we've already got an array, just append.
            if (prepend) {
                existing.unshift(listener);
            } else {
                existing.push(listener);
            }
        }

        // Check for listener leak
        if (!existing.warned) {
            m = $getMaxListeners(target);
            if (m && m > 0 && existing.length > m) {
                existing.warned = true;
                var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + type + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
                w.name = 'MaxListenersExceededWarning';
                w.emitter = target;
                w.type = type;
                w.count = existing.length;
                emitWarning(w);
            }
        }
    }

    return target;
}
function emitWarning(e) {
    typeof console.warn === 'function' ? console.warn(e) : console.log(e);
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
};

function _onceWrap(target, type, listener) {
    var fired = false;
    function g() {
        target.removeListener(type, g);
        if (!fired) {
            fired = true;
            listener.apply(target, arguments);
        }
    }
    g.listener = listener;
    return g;
}

EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    this.on(type, _onceWrap(this, type, listener));
    return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;

    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');

    events = this._events;
    if (!events) return this;

    list = events[type];
    if (!list) return this;

    if (list === listener || list.listener && list.listener === listener) {
        if (--this._eventsCount === 0) this._events = new EventHandlers();else {
            delete events[type];
            if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
        }
    } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length; i-- > 0;) {
            if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
            }
        }

        if (position < 0) return this;

        if (list.length === 1) {
            list[0] = undefined;
            if (--this._eventsCount === 0) {
                this._events = new EventHandlers();
                return this;
            } else {
                delete events[type];
            }
        } else {
            spliceOne(list, position);
        }

        if (events.removeListener) this.emit('removeListener', type, originalListener || listener);
    }

    return this;
};

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events;

    events = this._events;
    if (!events) return this;

    // not listening for removeListener, no need to emit
    if (!events.removeListener) {
        if (arguments.length === 0) {
            this._events = new EventHandlers();
            this._eventsCount = 0;
        } else if (events[type]) {
            if (--this._eventsCount === 0) this._events = new EventHandlers();else delete events[type];
        }
        return this;
    }

    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
        var keys = (0, _keys2.default)(events);
        for (var i = 0, key; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = new EventHandlers();
        this._eventsCount = 0;
        return this;
    }

    listeners = events[type];

    if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
    } else if (listeners) {
        // LIFO order
        do {
            this.removeListener(type, listeners[listeners.length - 1]);
        } while (listeners[0]);
    }

    return this;
};

EventEmitter.prototype.listeners = function listeners(type) {
    var evlistener;
    var ret;
    var events = this._events;

    if (!events) ret = [];else {
        evlistener = events[type];
        if (!evlistener) ret = [];else if (typeof evlistener === 'function') ret = [evlistener.listener || evlistener];else ret = unwrapListeners(evlistener);
    }

    return ret;
};

EventEmitter.listenerCount = function (emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
    } else {
        return listenerCount.call(emitter, type);
    }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
    var events = this._events;

    if (events) {
        var evlistener = events[type];

        if (typeof evlistener === 'function') {
            return 1;
        } else if (evlistener) {
            return evlistener.length;
        }
    }

    return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? (0, _ownKeys2.default)(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
        list[i] = list[k];
    }list.pop();
}

function arrayClone(arr, i) {
    var copy = new Array(i);
    while (i--) {
        copy[i] = arr[i];
    }return copy;
}

function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
    }
    return ret;
}

/**
 * EventEmitterをmixinしたIDObject
 */

var EEObject = function (_IDObject3) {
    (0, _inherits3.default)(EEObject, _IDObject3);

    function EEObject() {
        (0, _classCallCheck3.default)(this, EEObject);
        return (0, _possibleConstructorReturn3.default)(this, (EEObject.__proto__ || (0, _getPrototypeOf2.default)(EEObject)).call(this));
    }

    (0, _createClass3.default)(EEObject, [{
        key: "emitException",
        value: function emitException(eventName, error) {
            error.handled = false;
            var listeners = this.listeners(eventName);
            for (var i = 0; i < listeners.length; i++) {
                listeners[listeners.length - i - 1](error);
                if (error.handled) {
                    return;
                }
            }
            if (eventName !== "error") {
                this.emitException("error", error);
            } else {
                throw error;
            }
        }
    }]);
    return EEObject;
}(IDObject);

function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        (0, _getOwnPropertyNames2.default)(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
applyMixins(EEObject, [EventEmitter]);

var GomlNode = function (_EEObject) {
    (0, _inherits3.default)(GomlNode, _EEObject);

    /**
     * create new instance.
     * @param  {NodeDeclaration} recipe  作成するノードのDeclaration
     * @param  {Element}         element 対応するDomElement
     * @return {[type]}                  [description]
     */
    function GomlNode(recipe, element) {
        (0, _classCallCheck3.default)(this, GomlNode);

        var _this43 = (0, _possibleConstructorReturn3.default)(this, (GomlNode.__proto__ || (0, _getPrototypeOf2.default)(GomlNode)).call(this));

        _this43.children = [];
        _this43._parent = null;
        _this43._root = null;
        _this43._mounted = false;
        _this43._messageBuffer = [];
        _this43._tree = null;
        _this43._companion = new NSDictionary();
        _this43._deleted = false;
        _this43._attrBuffer = {};
        _this43._defaultValueResolved = false;
        if (!recipe) {
            throw new Error("recipe must not be null");
        }
        _this43.nodeDeclaration = recipe;
        _this43.element = element ? element : document.createElementNS(recipe.name.ns, recipe.name.name); // TODO Could be undefined or null?
        _this43.componentsElement = document.createElement("COMPONENTS");
        _this43._root = _this43;
        _this43._tree = GomlInterfaceGenerator([_this43]);
        _this43._components = [];
        _this43.attributes = new NSDictionary();
        _this43.element.setAttribute("x-gr-id", _this43.id);
        var defaultComponentNames = recipe.defaultComponentsActual;
        // instanciate default components
        defaultComponentNames.toArray().map(function (id) {
            _this43.addComponent(id, null, true);
        });
        // register to GrimoireInterface.
        obtainGomlInterface.nodeDictionary[_this43.id] = _this43;
        return _this43;
    }
    /**
     * Get actual goml node from element of xml tree.
     * @param  {Element}  elem [description]
     * @return {GomlNode}      [description]
     */


    (0, _createClass3.default)(GomlNode, [{
        key: "getChildrenByClass",

        /**
         * search from children node by class property.
         * return all nodes has same class as given.
         * @param  {string}     className [description]
         * @return {GomlNode[]}           [description]
         */
        value: function getChildrenByClass(className) {
            var nodes = this.element.getElementsByClassName(className);
            return new Array(nodes.length).map(function (v, i) {
                return GomlNode.fromElement(nodes.item(i));
            });
        }
        /**
         * search from children node by name property.
         * return all nodes has same name as given.
         * @param  {string}     nodeName [description]
         * @return {GomlNode[]}          [description]
         */

    }, {
        key: "getChildrenByNodeName",
        value: function getChildrenByNodeName(nodeName) {
            var nodes = this.element.getElementsByTagName(nodeName);
            return new Array(nodes.length).map(function (v, i) {
                return GomlNode.fromElement(nodes.item(i));
            });
        }
        /**
         * detach and delete this node and children.
         * call when this node will never use.
         */

    }, {
        key: "delete",
        value: function _delete() {
            this.children.forEach(function (c) {
                c.delete();
            });
            obtainGomlInterface.nodeDictionary[this.id] = null;
            if (this._parent) {
                this._parent.detachChild(this);
            } else {
                this.setMounted(false);
                if (this.element.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                }
            }
            this._deleted = true;
        }
        /**
         * send message to this node.
         * invoke component method has same name as message if this node isActive.
         * @param  {string}  message [description]
         * @param  {any}     args    [description]
         * @return {boolean}         is this node active.
         */

    }, {
        key: "sendMessage",
        value: function sendMessage(message, args) {
            var _this44 = this;

            if (!this.enabled || !this.mounted) {
                return false;
            }
            this._components.forEach(function (component) {
                _this44._sendMessageToComponent(component, message, false, false, args);
            });
            return true;
        }
    }, {
        key: "broadcastMessage",
        value: function broadcastMessage(arg1, arg2, arg3) {
            if (!this.enabled || !this.mounted) {
                return;
            }
            if (typeof arg1 === "number") {
                var range = arg1;
                var message = arg2;
                var args = arg3;
                this.sendMessage(message, args);
                if (range > 0) {
                    for (var i = 0; i < this.children.length; i++) {
                        this.children[i].broadcastMessage(range - 1, message, args);
                    }
                }
            } else {
                var _message = arg1;
                var _args91 = arg2;
                this.sendMessage(_message, _args91);
                for (var _i7 = 0; _i7 < this.children.length; _i7++) {
                    this.children[_i7].broadcastMessage(_message, _args91);
                }
            }
        }
        /**
         * add new instance created by given name and attributes for this node as child.
         * @param {string |   NSIdentity} nodeName      [description]
         * @param {any    }} attributes   [description]
         */

    }, {
        key: "addChildByName",
        value: function addChildByName(nodeName, attributes) {
            if (typeof nodeName === "string") {
                this.addChildByName(new NSIdentity(nodeName), attributes);
            } else {
                var nodeDec = obtainGomlInterface.nodeDeclarations.get(nodeName);
                var node = new GomlNode(nodeDec, null);
                if (attributes) {
                    for (var key in attributes) {
                        var id = key.indexOf("|") !== -1 ? NSIdentity.fromFQN(key) : new NSIdentity(key);
                        node.setValue(id, attributes[key]);
                    }
                }
                this.addChild(node);
            }
        }
        /**
         * Add child for this node.
         * @param {GomlNode} child            child node to add.
         * @param {number}   index            index for insert.なければ末尾に追加
         * @param {[type]}   elementSync=true trueのときはElementのツリーを同期させる。（Elementからパースするときはfalseにする）
         */

    }, {
        key: "addChild",
        value: function addChild(child, index) {
            var elementSync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            if (child._deleted) {
                throw new Error("deleted node never use.");
            }
            if (index != null && typeof index !== "number") {
                throw new Error("insert index should be number or null or undefined.");
            }
            child._parent = this;
            var insertIndex = index == null ? this.children.length : index;
            this.children.splice(insertIndex, 0, child);
            var checkChildConstraints = child.checkTreeConstraints();
            var checkAncestorConstraint = this._callRecursively(function (n) {
                return n.checkTreeConstraints();
            }, function (n) {
                return n._parent ? [n._parent] : [];
            }).reduce(function (list, current) {
                return list.concat(current);
            });
            var errors = checkChildConstraints.concat(checkAncestorConstraint).filter(function (m) {
                return m;
            });
            if (errors.length !== 0) {
                var message = errors.reduce(function (m, current) {
                    return m + "\n" + current;
                });
                throw new Error("tree constraint is not satisfied.\n" + message);
            }
            // handling html
            if (elementSync) {
                var referenceElement = this.element[NodeUtility.getNodeListIndexByElementIndex(this.element, insertIndex)];
                this.element.insertBefore(child.element, referenceElement);
            }
            child._tree = this._tree;
            child._companion = this._companion;
            // mounting
            if (this.mounted) {
                child.setMounted(true);
            }
        }
    }, {
        key: "callRecursively",
        value: function callRecursively(func) {
            return this._callRecursively(func, function (n) {
                return n.children;
            });
        }
        /**
         * delete child node.
         * @param {GomlNode} child Target node to be inserted.
         */

    }, {
        key: "removeChild",
        value: function removeChild(child) {
            var node = this.detachChild(child);
            if (node) {
                node.delete();
            }
        }
        /**
         * detach given node from this node if target is child of this node.
         * return null if target is not child of this node.
         * @param  {GomlNode} child [description]
         * @return {GomlNode}       detached node.
         */

    }, {
        key: "detachChild",
        value: function detachChild(target) {
            // search child.
            var index = this.children.indexOf(target);
            if (index === -1) {
                return null;
            }
            target.setMounted(false);
            target._parent = null;
            this.children.splice(index, 1);
            // html sync
            this.element.removeChild(target.element);
            // check ancestor constraint.
            var errors = this._callRecursively(function (n) {
                return n.checkTreeConstraints();
            }, function (n) {
                return n._parent ? [n._parent] : [];
            }).reduce(function (list, current) {
                return list.concat(current);
            }).filter(function (m) {
                return m;
            });
            if (errors.length !== 0) {
                var message = errors.reduce(function (m, current) {
                    return m + "\n" + current;
                });
                throw new Error("tree constraint is not satisfied.\n" + message);
            }
            return target;
        }
        /**
         * detach this node from parent.
         */

    }, {
        key: "detach",
        value: function detach() {
            if (this.parent) {
                this.parent.detachChild(this);
            } else {
                throw new Error("root Node cannot be detached.");
            }
        }
        /**
         * get value of attribute.
         * @param  {string | NSIdentity}  attrName [description]
         * @return {any}         [description]
         */

    }, {
        key: "getValue",
        value: function getValue(attrName) {
            attrName = Ensure.ensureTobeNSIdentity(attrName);
            var attr = this.attributes.get(attrName);
            if (!attr) {
                var attrBuf = this._attrBuffer[attrName.fqn];
                if (attrBuf !== void 0) {
                    return attrBuf;
                }
                console.warn("attribute \"" + attrName.name + "\" is not found.");
                return;
            } else {
                return attr.Value;
            }
        }
        /**
         * set value to selected attribute.
         * @param {string |     NSIdentity}  attrName [description]
         * @param {any}       value [description]
         */

    }, {
        key: "setValue",
        value: function setValue(attrName, value) {
            attrName = Ensure.ensureTobeNSIdentity(attrName);
            var attr = this.attributes.get(attrName);
            if (!attr) {
                console.warn("attribute \"" + attrName.name + "\" is not found.");
                this._attrBuffer[attrName.fqn] = value;
            } else {
                attr.Value = value;
            }
        }
        /**
         *  Add new attribute. In most of case, users no need to call this method.
         *  Use __addAttribute in Component should be used instead.
         */

    }, {
        key: "addAttribute",
        value: function addAttribute(attr) {
            this.attributes.set(attr.name, attr);
            // check buffer value.
            var attrBuf = this._attrBuffer[attr.name.fqn];
            if (attrBuf !== void 0) {
                attr.Value = attrBuf;
                delete this._attrBuffer[attr.name.fqn];
            }
        }
        /**
         * Update mounted status and emit events
         * @param {boolean} mounted Mounted status.
         */

    }, {
        key: "setMounted",
        value: function setMounted(mounted) {
            if (this._mounted === mounted) {
                return;
            }
            if (mounted) {
                this._mounted = mounted;
                this._clearMessageBuffer("unmount");
                this._sendMessage("awake", true, false);
                this._sendMessage("mount", false, true);
                this.children.forEach(function (child) {
                    child.setMounted(mounted);
                });
            } else {
                this._clearMessageBuffer("mount");
                this.children.forEach(function (child) {
                    child.setMounted(mounted);
                });
                this._sendMessage("unmount", false, true);
                this._sendMessage("dispose", true, false);
                this._tree = null;
                this._companion = null;
                this._mounted = mounted;
            }
        }
        /**
         * Get index of this node from parent.
         * @return {number} number of index.
         */

    }, {
        key: "index",
        value: function index() {
            return this._parent.children.indexOf(this);
        }
        /**
         * remove attribute from this node.
         * @param {Attribute} attr [description]
         */

    }, {
        key: "removeAttribute",
        value: function removeAttribute(attr) {
            this.attributes.delete(attr.name);
        }
        /**
         * attach component to this node.
         * @param {Component} component [description]
         */

    }, {
        key: "addComponent",
        value: function addComponent(component) {
            var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var isDefaultComponent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var declaration = obtainGomlInterface.componentDeclarations.get(component);
            var instance = declaration.generateInstance();
            attributes = attributes || {};
            for (var key in attributes) {
                instance.setValue(key, attributes[key]);
            }
            this._addComponentDirectly(instance, isDefaultComponent);
            return instance;
        }
        /**
         * Internal use!
         * Should not operate by users or plugin developpers
         * @param {Component} component          [description]
         * @param {boolean}   isDefaultComponent [description]
         */

    }, {
        key: "_addComponentDirectly",
        value: function _addComponentDirectly(component, isDefaultComponent) {
            var _this45 = this;

            if (isDefaultComponent) {
                component.isDefaultComponent = true;
            }
            var insertIndex = this._components.length;
            var referenceElement = this.componentsElement[NodeUtility.getNodeListIndexByElementIndex(this.componentsElement, insertIndex)];
            this.componentsElement.insertBefore(component.element, referenceElement);
            this._components.push(component);
            component.node = this;
            component.addEnabledObserver(function (c) {
                if (c.enabled) {
                    // TODO ??
                    _this45._sendBufferdMessageToComponent(c, "mount", false, true);
                    _this45._sendBufferdMessageToComponent(c, "unmount", false, true);
                }
            });
            if (isDefaultComponent) {
                // attributes should be exposed on node
                component.attributes.forEach(function (p) {
                    return _this45.addAttribute(p);
                });
                if (this._defaultValueResolved) {
                    component.attributes.forEach(function (p) {
                        return p.resolveDefaultValue(NodeUtility.getAttributes(_this45.element));
                    });
                }
            }
            if (this._mounted) {
                this._sendMessageToComponent(component, "awake", true, false);
                this._sendMessageToComponent(component, "mount", false, true);
            }
        }
    }, {
        key: "getComponents",
        value: function getComponents() {
            return this._components;
        }
        /**
         * search component by name from this node.
         * @param  {string | NSIdentity}  name [description]
         * @return {Component}   component found first.
         */

    }, {
        key: "getComponent",
        value: function getComponent(name) {
            if (typeof name === "string") {
                for (var i = 0; i < this._components.length; i++) {
                    if (this._components[i].name.name === name) {
                        return this._components[i];
                    }
                }
            } else {
                for (var _i8 = 0; _i8 < this._components.length; _i8++) {
                    if (this._components[_i8].name.fqn === name.fqn) {
                        return this._components[_i8];
                    }
                }
            }
            return null;
        }
        /**
         * resolve default attribute value for all component.
         * すべてのコンポーネントの属性をエレメントかデフォルト値で初期化
         */

    }, {
        key: "resolveAttributesValue",
        value: function resolveAttributesValue() {
            var _this46 = this;

            this._defaultValueResolved = true;
            this._components.forEach(function (component) {
                component.resolveDefaultAttributes(NodeUtility.getAttributes(_this46.element));
            });
        }
        /**
         * check tree constraint for this node.
         * @return {string[]} [description]
         */

    }, {
        key: "checkTreeConstraints",
        value: function checkTreeConstraints() {
            var _this47 = this;

            var constraints = this.nodeDeclaration.treeConstraints;
            if (!constraints) {
                return [];
            }
            var errorMesasges = constraints.map(function (constraint) {
                return constraint(_this47);
            }).filter(function (message) {
                return message !== null;
            });
            if (errorMesasges.length === 0) {
                return null;
            }
            return errorMesasges;
        }
        /**
         * バッファしていたmount,unmountが送信されるかもしれない.アクティブなら
         */

    }, {
        key: "notifyActivenessUpdate",
        value: function notifyActivenessUpdate() {
            if (this.isActive) {
                this._sendBufferdMessage(this.mounted ? "mount" : "unmount", false);
                this.children.forEach(function (child) {
                    child.notifyActivenessUpdate();
                });
            }
        }
        /**
         * コンポーネントにメッセージを送る。送信したらバッファからは削除される.
         * @param  {Component} targetComponent 対象コンポーネント
         * @param  {string}    message         メッセージ
         * @param  {boolean}   forced          trueでコンポーネントのenableを無視して送信
         * @param  {boolean}   toBuffer        trueで送信失敗したらバッファに追加
         * @param  {any}       args            [description]
         * @return {boolean}                   送信したか
         */

    }, {
        key: "_sendMessageToComponent",
        value: function _sendMessageToComponent(targetComponent, message, forced, toBuffer, args) {
            message = Ensure.ensureTobeMessage(message);
            var bufferdIndex = this._messageBuffer.findIndex(function (obj) {
                return obj.message === message && obj.target === targetComponent;
            });
            if (!forced && (!targetComponent.enabled || !this.isActive)) {
                if (toBuffer && bufferdIndex < 0) {
                    this._messageBuffer.push({ message: Ensure.ensureTobeMessage(message), target: targetComponent });
                }
                return false;
            }
            message = Ensure.ensureTobeMessage(message);
            var method = targetComponent[message];
            if (typeof method === "function") {
                method.bind(targetComponent)(args);
            }
            if (bufferdIndex >= 0) {
                this._messageBuffer.splice(bufferdIndex, 1);
            }
            return true;
        }
        /**
         * バッファからメッセージを送信。成功したらバッファから削除
         * @param  {Component} target  [description]
         * @param  {string}    message [description]
         * @param  {boolean}   forced  [description]
         * @param  {any}       args    [description]
         * @return {boolean}           成功したか
         */

    }, {
        key: "_sendBufferdMessageToComponent",
        value: function _sendBufferdMessageToComponent(target, message, forced, sendToRemove, args) {
            if (!forced && (!target.enabled || !this.isActive)) {
                return false;
            }
            message = Ensure.ensureTobeMessage(message);
            var bufferdIndex = this._messageBuffer.findIndex(function (obj) {
                return obj.message === message && obj.target === target;
            });
            if (bufferdIndex >= 0) {
                var method = target[message];
                if (typeof method === "function") {
                    method.bind(target)(args);
                }
                if (sendToRemove) {
                    this._messageBuffer.splice(bufferdIndex, 1);
                }
                return true;
            }
            return false;
        }
    }, {
        key: "_sendMessage",
        value: function _sendMessage(message, forced, toBuffer, args) {
            var _this48 = this;

            this._components.forEach(function (component) {
                _this48._sendMessageToComponent(component, message, forced, toBuffer, args);
            });
        }
        /**
         * バッファのメッセージを送信可能なら送信してバッファから削除
         */

    }, {
        key: "_sendBufferdMessage",
        value: function _sendBufferdMessage(message, forced, args) {
            var _this49 = this;

            var next = [];
            message = Ensure.ensureTobeMessage(message);
            this._messageBuffer.forEach(function (obj) {
                if (obj.message !== message || !_this49._sendBufferdMessageToComponent(obj.target, message, forced, false, args)) {
                    next.push(obj);
                }
            });
            this._messageBuffer = next;
        }
    }, {
        key: "_clearMessageBuffer",
        value: function _clearMessageBuffer(message) {
            message = Ensure.ensureTobeMessage(message);
            this._messageBuffer = this._messageBuffer.filter(function (obj) {
                return obj.message !== message;
            });
        }
    }, {
        key: "_callRecursively",
        value: function _callRecursively(func, nextGenerator) {
            var val = func(this);
            var nexts = nextGenerator(this);
            var nextVals = nexts.map(function (c) {
                return c.callRecursively(func);
            });
            var list = nextVals.reduce(function (clist, current) {
                return clist.concat(current);
            }, []);
            list.unshift(val);
            return list;
        }
    }, {
        key: "name",

        /**
         * Tag name.
         */
        get: function get() {
            return this.nodeDeclaration.name;
        }
        /**
         * GomlInterface that this node is bound to.
         * throw exception if this node is not mounted.
         * @return {IGomlInterface} [description]
         */

    }, {
        key: "tree",
        get: function get() {
            if (!this.mounted) {
                throw new Error("this node is not mounted");
            }
            return this._tree;
        }
        /**
         * indicate this node is already deleted.
         * if this node is deleted once, this node will not be mounted.
         * @return {boolean} [description]
         */

    }, {
        key: "deleted",
        get: function get() {
            return this._deleted;
        }
        /**
         * indicate this node is enabled in tree.
         * This value must be false when ancestor of this node is disabled.
         * @return {boolean} [description]
         */

    }, {
        key: "isActive",
        get: function get() {
            if (this._parent) {
                return this._parent.isActive && this.enabled;
            } else {
                return this.enabled;
            }
        }
        /**
         * indicate this node is enabled.
         * this node never recieve any message if this node is not enabled.
         * @return {boolean} [description]
         */

    }, {
        key: "enabled",
        get: function get() {
            return this.getValue("enabled");
        },
        set: function set(value) {
            this.setValue("enabled", value);
        }
        /**
         * the shared object by all nodes in tree.
         * @return {NSDictionary<any>} [description]
         */

    }, {
        key: "companion",
        get: function get() {
            return this._companion;
        }
        /**
         * parent node of this node.
         * if this node is root, return null.
         * @return {GomlNode} [description]
         */

    }, {
        key: "parent",
        get: function get() {
            return this._parent;
        }
        /**
         * return true if this node has some child nodes.
         * @return {boolean} [description]
         */

    }, {
        key: "hasChildren",
        get: function get() {
            return this.children.length > 0;
        }
        /**
         * indicate mounted status.
         * this property to be true when treeroot registered to GrimoireInterface.
         * to be false when this node detachd from the tree.
         * @return {boolean} Whether this node is mounted or not.
         */

    }, {
        key: "mounted",
        get: function get() {
            return this._mounted;
        }
    }], [{
        key: "fromElement",
        value: function fromElement(elem) {
            return obtainGomlInterface.nodeDictionary[elem.getAttribute("x-gr-id")];
        }
    }]);
    return GomlNode;
}(EEObject);

/**
 * Parser of Goml to Node utilities.
 * This class do not store any nodes and goml properties.
 */


var GomlParser = function () {
    function GomlParser() {
        (0, _classCallCheck3.default)(this, GomlParser);
    }

    (0, _createClass3.default)(GomlParser, null, [{
        key: "parse",

        /**
         * Domをパースする
         * @param  {Element}           source    [description]
         * @param  {GomlNode}          parent    あればこのノードにaddChildされる
         * @return {GomlNode}                    ルートノード
         */
        value: function parse(source, parent, scriptTag) {
            var newNode = GomlParser._createNode(source);
            if (!newNode) {
                // when specified node could not be found
                console.warn("\"" + source.tagName + "\" was not parsed.");
                return null;
            }
            // Parse children recursively
            var children = source.childNodes;
            var childNodeElements = []; // for parse after .Components has resolved.
            if (children && children.length !== 0) {
                var removeTarget = [];
                for (var i = 0; i < children.length; i++) {
                    var child = children.item(i);
                    if (!GomlParser._isElement(child)) {
                        removeTarget.push(child);
                        continue;
                    }
                    if (this._isComponentsTag(child)) {
                        // parse as components
                        GomlParser._parseComponents(newNode, child);
                        removeTarget.push(child);
                    } else {
                        // parse as child node.
                        childNodeElements.push(child);
                    }
                }
                // remove unused elements
                for (var _i9 = 0; _i9 < removeTarget.length; _i9++) {
                    source.removeChild(removeTarget[_i9]);
                }
            }
            // generate tree
            if (parent) {
                parent.addChild(newNode, null, false);
            }
            childNodeElements.forEach(function (child) {
                GomlParser.parse(child, newNode, null);
            });
            return newNode;
        }
        /**
         * GomlNodeのインスタンス化。GrimoireInterfaceへの登録
         * @param  {HTMLElement}      elem         [description]
         * @param  {GomlConfigurator} configurator [description]
         * @return {GomlTreeNodeBase}              [description]
         */

    }, {
        key: "_createNode",
        value: function _createNode(elem) {
            var tagName = elem.localName;
            var recipe = obtainGomlInterface.nodeDeclarations.get(elem);
            if (!recipe) {
                throw new Error("Tag \"" + tagName + "\" is not found.");
            }
            return new GomlNode(recipe, elem);
        }
        /**
         * .COMPONENTSのパース。
         * @param {GomlNode} node          アタッチされるコンポーネント
         * @param {Element}  componentsTag .COMPONENTSタグ
         */

    }, {
        key: "_parseComponents",
        value: function _parseComponents(node, componentsTag) {
            var componentNodes = componentsTag.childNodes;
            if (!componentNodes) {
                return;
            }
            for (var i = 0; i < componentNodes.length; i++) {
                var componentNode = componentNodes.item(i);
                if (!GomlParser._isElement(componentNode)) {
                    continue; // Skip if the node was not element
                }
                var componentDecl = obtainGomlInterface.componentDeclarations.get(componentNode);
                if (!componentDecl) {
                    throw new Error("Component " + componentNode.tagName + " is not found.");
                }
                var component = componentDecl.generateInstance(componentNode);
                node._addComponentDirectly(component, false);
            }
        }
    }, {
        key: "_isElement",
        value: function _isElement(node) {
            return node.nodeType === Node.ELEMENT_NODE;
        }
    }, {
        key: "_isComponentsTag",
        value: function _isComponentsTag(element) {
            var regexToFindComponent = /\.COMPONENTS$/mi; // TODO might needs to fix
            return regexToFindComponent.test(element.nodeName);
        }
    }]);
    return GomlParser;
}();

var ComponentInterface = function () {
    function ComponentInterface(components) {
        (0, _classCallCheck3.default)(this, ComponentInterface);

        this.components = components;
    }

    (0, _createClass3.default)(ComponentInterface, [{
        key: "get",
        value: function get(i1, i2, i3) {
            var c = this.components;
            if (i1 === void 0) {
                if (c.length === 0 || c[0].length === 0 || c[0][0].length === 0) {
                    return null;
                } else if (c.length === 1 && c[0].length === 1 || c[0][0].length === 1) {
                    return c[0][0][0];
                }
                throw new Error("There are too many candidate");
            } else if (i2 === void 0) {
                if (c.length === 0 || c[0].length === 0 || c[0][0].length <= i1) {
                    return null;
                } else if (c.length === 1 && c[0].length === 1) {
                    return c[0][0][i1];
                }
                throw new Error("There are too many candidate");
            } else if (i3 === void 0) {
                if (c.length === 0 || c[0].length <= i2 || c[0][0].length <= i1) {
                    return null;
                } else if (c.length === 1) {
                    return c[0][i2][i1];
                }
                throw new Error("There are too many candidate");
            } else {
                if (c.length <= i3 || c[0].length <= i2 || c[0][0].length <= i1) {
                    return null;
                }
                return c[i3][i2][i1];
            }
        }
    }, {
        key: "forEach",
        value: function forEach(f) {
            this.components.forEach(function (tree, ti) {
                tree.forEach(function (nodes, ni) {
                    nodes.forEach(function (comp, ci) {
                        f(comp, ci, ni, ti);
                    });
                });
            });
            return this;
        }
    }, {
        key: "attr",
        value: function attr(attrName, value) {
            if (value === void 0) {
                // return Attribute.
                return this.components[0][0][0].getValue(attrName).Value;
            } else {
                // set value.
                this.forEach(function (component) {
                    component.setValue(attrName, value);
                });
            }
        }
    }]);
    return ComponentInterface;
}();

/**
 * 複数のノードを対象とした操作を提供するインタフェース
 */


var NodeInterface = function () {
    function NodeInterface(nodes) {
        (0, _classCallCheck3.default)(this, NodeInterface);

        this.nodes = nodes;
    }

    (0, _createClass3.default)(NodeInterface, [{
        key: "queryFunc",
        value: function queryFunc(query) {
            return new ComponentInterface(this.queryComponents(query));
        }
    }, {
        key: "queryComponents",
        value: function queryComponents(query) {
            return this.nodes.map(function (nodes) {
                return nodes.map(function (node) {
                    var componentElements = node.componentsElement.querySelectorAll(query);
                    var components = [];
                    for (var i = 0; i < componentElements.length; i++) {
                        var elem = componentElements[i];
                        var component = obtainGomlInterface.componentDictionary[elem.getAttribute("x-gr-id")];
                        if (component) {
                            components.push(component);
                        }
                    }
                    return components;
                });
            });
        }
    }, {
        key: "get",
        value: function get(i1, i2) {
            var c = this.nodes;
            if (i1 === void 0) {
                if (c.length === 0 || c[0].length === 0) {
                    return null;
                } else if (c.length === 1 && c[0].length === 1) {
                    return c[0][0];
                }
                throw new Error("There are too many candidate");
            } else if (i2 === void 0) {
                if (c.length === 0 || c[0].length <= i1) {
                    return null;
                } else if (c.length === 1 && c[0].length > i1) {
                    return c[0][i1];
                }
                throw new Error("There are too many candidate");
            } else {
                if (c.length <= i1 || c[i1].length <= i2) {
                    return null;
                } else {
                    return c[i1][i2];
                }
            }
        }
    }, {
        key: "getAttribute",
        value: function getAttribute(attrName) {
            if (this.nodes.length > 0 && this.nodes[0].length > 0) {
                throw new Error("node interface is empty.");
            }
        }
    }, {
        key: "setAttribute",
        value: function setAttribute(attrName, value) {
            this.forEach(function (node) {
                var attr = node.attributes.get(attrName);
                if (attr.declaration.readonly) {
                    throw new Error("The attribute " + attr.name.fqn + " is readonly");
                }
                if (attr) {
                    attr.Value = value;
                }
            });
        }
        /**
         * 対象ノードにイベントリスナを追加します。
         * @param {string}   eventName [description]
         * @param {Function} listener  [description]
         */

    }, {
        key: "on",
        value: function on(eventName, listener) {
            this.forEach(function (node) {
                node.on(eventName, listener);
            });
            return this;
        }
        /**
         * 対象ノードに指定したイベントリスナが登録されていれば削除します
         * @param {string}   eventName [description]
         * @param {Function} listener  [description]
         */

    }, {
        key: "off",
        value: function off(eventName, listener) {
            this.forEach(function (node) {
                node.removeListener(eventName, listener);
            });
            return this;
        }
        /**
         * このノードインタフェースが対象とするノードそれぞれに、
         * タグで指定したノードを子要素として追加します。
         * @param {string} tag [description]
         */

    }, {
        key: "append",
        value: function append(tag) {
            this.forEach(function (node) {
                var elems = XMLReader.parseXML(tag);
                elems.forEach(function (elem) {
                    return GomlParser.parse(elem, node, null);
                });
            });
            return this;
        }
        /**
         * このノードインタフェースが対象とするノードの子に、
         * 指定されたノードが存在すれば削除します。
         * @param {GomlNode} child [description]
         */

    }, {
        key: "remove",
        value: function remove(child) {
            this.forEach(function (node) {
                node.removeChild(child);
            });
            return this;
        }
        /**
         * このノードインタフェースが対象とするノードに対して反復処理を行います
         * @param  {GomlNode} callback [description]
         * @return {[type]}            [description]
         */

    }, {
        key: "forEach",
        value: function forEach(callback) {
            this.nodes.forEach(function (array) {
                array.forEach(function (node) {
                    callback(node);
                });
            });
            return this;
        }
        /**
         * このノードインタフェースが対象とするノードを有効、または無効にします。
         * @param {boolean} enable [description]
         */

    }, {
        key: "setEnable",
        value: function setEnable(enable) {
            this.forEach(function (node) {
                node.enabled = !!enable;
            });
            return this;
        }
        /**
         * このノードインタフェースにアタッチされたコンポーネントをセレクタで検索します。
         * @pram  {string}      query [description]
         * @return {Component[]}       [description]
         */

    }, {
        key: "find",
        value: function find(query) {
            var allComponents = [];
            this.queryComponents(query).forEach(function (gomlComps) {
                gomlComps.forEach(function (nodeComps) {
                    nodeComps.forEach(function (comp) {
                        allComponents.push(comp);
                    });
                });
            });
            return allComponents;
        }
        /**
         * このノードインタフェースが対象とするノードのそれぞれの子ノードを対象とする、
         * 新しいノードインタフェースを取得します。
         * @return {NodeInterface} [description]
         */

    }, {
        key: "children",
        value: function children() {
            var children = this.nodes.map(function (nodes) {
                return nodes.map(function (node) {
                    return node.children;
                }).reduce(function (pre, cur) {
                    return pre.concat(cur);
                });
            });
            return new NodeInterface(children);
        }
        /**
         * 対象ノードにコンポーネントをアタッチします。
         * @param {Component} component [description]
         */

    }, {
        key: "addCompnent",
        value: function addCompnent(componentId) {
            this.forEach(function (node) {
                node.addComponent(componentId);
            });
            return this;
        }
        /**
         * 最初の対象ノードを取得する
         * @return {GomlNode} [description]
         */

    }, {
        key: "first",
        value: function first() {
            if (this.count() === 0) {
                return null;
            }
            return this.nodes[0][0];
        }
        /**
         * 対象となる唯一のノードを取得する。
         * 対象が存在しない、あるいは複数存在するときは例外を投げる。
         * @return {GomlNode} [description]
         */

    }, {
        key: "single",
        value: function single() {
            if (this.count() !== 1) {
                throw new Error("this nodeInterface is not single.");
            }
            return this.first();
        }
        /**
         * 対象となるノードの個数を取得する
         * @return {number} [description]
         */

    }, {
        key: "count",
        value: function count() {
            if (this.nodes.length === 0) {
                return 0;
            }
            var counts = this.nodes.map(function (nodes) {
                return nodes.length;
            });
            return counts.reduce(function (total, current) {
                return total + current;
            }, 0);
        }
    }]);
    return NodeInterface;
}();

/**
 * Provides interfaces to treat whole goml tree for each.
 */


var GomlInterface = function () {
    function GomlInterface(rootNodes) {
        (0, _classCallCheck3.default)(this, GomlInterface);

        this.rootNodes = rootNodes;
    }

    (0, _createClass3.default)(GomlInterface, [{
        key: "getNodeById",
        value: function getNodeById(id) {
            var _this50 = this;

            return new Array(this.rootNodes.length).map(function (v, i) {
                return GomlNode.fromElement(_this50.rootNodes[i].element.ownerDocument.getElementById(id));
            });
        }
    }, {
        key: "queryFunc",
        value: function queryFunc(query) {
            var context = new NodeInterface(this.queryNodes(query));
            var queryFunc = context.queryFunc.bind(context);
            (0, _setPrototypeOf2.default)(queryFunc, context);
            return queryFunc;
        }
    }, {
        key: "queryNodes",
        value: function queryNodes(query) {
            return this.rootNodes.map(function (root) {
                var nodelist = root.element.ownerDocument.querySelectorAll(query);
                var nodes = [];
                for (var i = 0; i < nodelist.length; i++) {
                    var node = obtainGomlInterface.nodeDictionary[nodelist.item(i).getAttribute("x-gr-id")];
                    if (node) {
                        nodes.push(node);
                    }
                }
                return nodes;
            });
        }
    }]);
    return GomlInterface;
}();

var GomlInterfaceGenerator = function GomlInterfaceGenerator(rootNodes) {
    var gomlContext = new GomlInterface(rootNodes);
    var queryFunc = gomlContext.queryFunc.bind(gomlContext);
    (0, _setPrototypeOf2.default)(queryFunc, gomlContext);
    return queryFunc;
};

var GrimoireInterfaceImpl = function () {
    function GrimoireInterfaceImpl() {
        (0, _classCallCheck3.default)(this, GrimoireInterfaceImpl);

        this.nodeDeclarations = new NSDictionary();
        this.converters = new NSDictionary();
        this.componentDeclarations = new NSDictionary();
        this.rootNodes = {};
        this.loadTasks = [];
        this.nodeDictionary = {};
        this.componentDictionary = {};
        this.companion = new NSDictionary();
        this.initializedEventHandler = [];
    }
    /**
     * Generate namespace helper function
     * @param  {string} ns namespace URI to be used
     * @return {[type]}    the namespaced identity
     */


    (0, _createClass3.default)(GrimoireInterfaceImpl, [{
        key: "ns",
        value: function ns(_ns) {
            return function (name) {
                return new NSIdentity(_ns, name);
            };
        }
    }, {
        key: "initialize",
        value: function initialize() {
            this.registerConverter("String", StringConverter);
            this.registerConverter("StringArray", StringArrayConverter);
            this.registerConverter("Boolean", BooleanConverter);
            this.registerComponent("GrimoireComponent", GrimoireComponent);
            this.registerNode("GrimoireNodeBase", ["GrimoireComponent"]);
        }
        /**
         * Register plugins
         * @param  {(}      loadTask [description]
         * @return {[type]}          [description]
         */

    }, {
        key: "register",
        value: function register(loadTask) {
            this.loadTasks.push(loadTask);
        }
    }, {
        key: "resolvePlugins",
        value: function resolvePlugins() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee16() {
                var i;
                return _regenerator2.default.wrap(function _callee16$(_context91) {
                    while (1) {
                        switch (_context91.prev = _context91.next) {
                            case 0:
                                i = 0;

                            case 1:
                                if (!(i < this.loadTasks.length)) {
                                    _context91.next = 7;
                                    break;
                                }

                                _context91.next = 4;
                                return this.loadTasks[i]();

                            case 4:
                                i++;
                                _context91.next = 1;
                                break;

                            case 7:
                            case "end":
                                return _context91.stop();
                        }
                    }
                }, _callee16, this);
            }));
        }
        /**
         * register custom component
         * @param  {string                |   NSIdentity} name          [description]
         * @param  {IAttributeDeclaration }} attributes           [description]
         * @param  {Object                |   (new                 (}           obj           [description]
         * @return {[type]}                       [description]
         */

    }, {
        key: "registerComponent",
        value: function registerComponent(name, obj) {
            name = Ensure.ensureTobeNSIdentity(name);
            var attrs = obj["attributes"];
            obj = this._ensureTobeComponentConstructor(obj);
            this.componentDeclarations.set(name, new ComponentDeclaration(name, attrs, obj));
        }
    }, {
        key: "registerNode",
        value: function registerNode(name, requiredComponents, defaultValues, superNode) {
            name = Ensure.ensureTobeNSIdentity(name);
            requiredComponents = Ensure.ensureTobeNSIdentityArray(requiredComponents);
            defaultValues = Ensure.ensureTobeNSDictionary(defaultValues, name.ns);
            superNode = Ensure.ensureTobeNSIdentity(superNode);
            this.nodeDeclarations.set(name, new NodeDeclaration(name, NSSet.fromArray(requiredComponents), defaultValues, superNode));
        }
    }, {
        key: "registerConverter",
        value: function registerConverter(name, converter) {
            name = Ensure.ensureTobeNSIdentity(name);
            this.converters.set(name, { name: name, convert: converter });
        }
    }, {
        key: "addRootNode",
        value: function addRootNode(tag, rootNode) {
            if (!rootNode) {
                throw new Error("can not register null to rootNodes.");
            }
            this.rootNodes[rootNode.id] = rootNode;
            rootNode.companion.set(this.ns(Constants.defaultNamespace)("scriptElement"), tag);
            // check tree constraint.
            var errorMessages = rootNode.callRecursively(function (n) {
                return n.checkTreeConstraints();
            }).reduce(function (list, current) {
                return list.concat(current);
            }).filter(function (error) {
                return error;
            });
            if (errorMessages.length !== 0) {
                var message = errorMessages.reduce(function (m, current) {
                    return m + "\n" + current;
                });
                throw new Error("tree constraint is not satisfied.\n" + message);
            }
            // awake and mount tree.
            rootNode.setMounted(true);
            rootNode.broadcastMessage("treeInitialized", {
                ownerScriptTag: tag,
                id: rootNode.id
            });
            tag.setAttribute("x-rootNodeId", rootNode.id);
            this._onTreeInitialized(tag);
            return rootNode.id;
        }
    }, {
        key: "getRootNode",
        value: function getRootNode(scriptTag) {
            var id = scriptTag.getAttribute("x-rootNodeId");
            return this.rootNodes[id];
        }
    }, {
        key: "queryRootNodes",
        value: function queryRootNodes(query) {
            var scriptTags = document.querySelectorAll(query);
            var nodes = [];
            for (var i = 0; i < scriptTags.length; i++) {
                var node = this.getRootNode(scriptTags.item(i));
                if (node) {
                    nodes.push(node);
                }
            }
            return nodes;
        }
        /**
         * This method is not for users.
         * Just for unit testing.
         *
         * Clear all configuration that GrimoireInterface contain.
         */

    }, {
        key: "clear",
        value: function clear() {
            this.nodeDeclarations.clear();
            this.componentDeclarations.clear();
            this.converters.clear();
            for (var key in this.rootNodes) {
                delete this.rootNodes[key];
            }
            this.loadTasks.splice(0, this.loadTasks.length);
            this.initialize();
        }
        /**
         * Ensure the given object or constructor to be an constructor inherits Component;
         * @param  {Object | (new ()=> Component} obj [The variable need to be ensured.]
         * @return {[type]}      [The constructor inherits Component]
         */

    }, {
        key: "_ensureTobeComponentConstructor",
        value: function _ensureTobeComponentConstructor(obj) {
            if (typeof obj === "function") {
                if (!(obj.prototype instanceof Component) && obj !== Component) {
                    throw new Error("Component constructor must extends Component class.");
                }
            } else if ((typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) === "object") {
                var newCtor = function newCtor() {
                    Component.call(this);
                };
                var properties = {};
                for (var key in obj) {
                    if (key === "attributes") {
                        continue;
                    }
                    properties[key] = { value: obj[key] };
                }
                newCtor.prototype = (0, _create2.default)(Component.prototype, properties);
                Object.defineProperty(newCtor, "attributes", {
                    value: obj["attributes"]
                });
                obj = newCtor;
            } else if (!obj) {
                obj = Component;
            }
            return obj;
        }
    }, {
        key: "_onTreeInitialized",
        value: function _onTreeInitialized(tag) {
            this.initializedEventHandler.forEach(function (h) {
                h(tag.id, tag.className, tag);
            });
        }
    }]);
    return GrimoireInterfaceImpl;
}();

var context = new GrimoireInterfaceImpl();
var obtainGomlInterface = function obtainGomlInterface(query) {
    if (typeof query === "string") {
        return GomlInterfaceGenerator(context.queryRootNodes(query));
    } else {
        context.initializedEventHandler.push(query);
    }
};
// const bindedFunction = obtainGomlInterface.bind(context);
(0, _setPrototypeOf2.default)(obtainGomlInterface, context);

var XMLHttpRequestAsync = function () {
    function XMLHttpRequestAsync() {
        (0, _classCallCheck3.default)(this, XMLHttpRequestAsync);
    }

    (0, _createClass3.default)(XMLHttpRequestAsync, null, [{
        key: "send",
        value: function send(xhr, data) {
            return new _promise2.default(function (resolve, reject) {
                xhr.onload = function (e) {
                    resolve(e);
                };
                xhr.onerror = function (e) {
                    reject(e);
                };
                xhr.send(data);
            });
        }
    }]);
    return XMLHttpRequestAsync;
}();

/**
 * Provides the features to fetch Goml source.
 */


var GomlLoader = function () {
    function GomlLoader() {
        (0, _classCallCheck3.default)(this, GomlLoader);
    }

    (0, _createClass3.default)(GomlLoader, null, [{
        key: "loadFromScriptTag",

        /**
         * Obtain the Goml source from specified tag.
         * @param  {HTMLScriptElement} scriptTag [the script tag to load]
         * @return {Promise<void>}               [the promise to wait for loading]
         */
        value: function loadFromScriptTag(scriptTag) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee17() {
                var srcAttr, source, req, doc, rootNode;
                return _regenerator2.default.wrap(function _callee17$(_context92) {
                    while (1) {
                        switch (_context92.prev = _context92.next) {
                            case 0:
                                srcAttr = scriptTag.getAttribute("src");
                                source = void 0;

                                if (!srcAttr) {
                                    _context92.next = 10;
                                    break;
                                }

                                // ignore text element
                                req = new XMLHttpRequest();

                                req.open("GET", srcAttr);
                                _context92.next = 7;
                                return XMLHttpRequestAsync.send(req);

                            case 7:
                                source = req.responseText;
                                _context92.next = 11;
                                break;

                            case 10:
                                source = scriptTag.text;

                            case 11:
                                doc = XMLReader.parseXML(source, "GOML");
                                rootNode = GomlParser.parse(doc[0], null, scriptTag);

                                obtainGomlInterface.addRootNode(scriptTag, rootNode);

                            case 14:
                            case "end":
                                return _context92.stop();
                        }
                    }
                }, _callee17, this);
            }));
        }
        /**
         * Load from the script tags which will be found with specified query.
         * @param  {string}          query [the query to find script tag]
         * @return {Promise<void[]>}       [the promise to wait for all goml loading]
         */

    }, {
        key: "loadFromQuery",
        value: function loadFromQuery(query) {
            var tags = document.querySelectorAll(query);
            var pArray = [];
            for (var i = 0; i < tags.length; i++) {
                pArray[i] = GomlLoader.loadFromScriptTag(tags.item(i));
            }
            return _promise2.default.all(pArray);
        }
        /**
         * Load all Goml sources contained in HTML.
         * @return {Promise<void>} [the promise to wait for all goml loading]
         */

    }, {
        key: "loadForPage",
        value: function loadForPage() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee18() {
                return _regenerator2.default.wrap(function _callee18$(_context93) {
                    while (1) {
                        switch (_context93.prev = _context93.next) {
                            case 0:
                                _context93.next = 2;
                                return GomlLoader.loadFromQuery('script[type="text/goml"]');

                            case 2:
                            case "end":
                                return _context93.stop();
                        }
                    }
                }, _callee18, this);
            }));
        }
    }]);
    return GomlLoader;
}();

/**
 * Provides procedures for initializing.
 */


var GrimoireInitializer = function () {
    function GrimoireInitializer() {
        (0, _classCallCheck3.default)(this, GrimoireInitializer);
    }

    (0, _createClass3.default)(GrimoireInitializer, null, [{
        key: "initialize",

        /**
         * Start initializing
         * @return {Promise<void>} The promise which will be resolved when all of the Goml script was loaded.
         */
        value: function initialize() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee19() {
                return _regenerator2.default.wrap(function _callee19$(_context94) {
                    while (1) {
                        switch (_context94.prev = _context94.next) {
                            case 0:
                                _context94.prev = 0;

                                GrimoireInitializer._copyGLConstants();
                                obtainGomlInterface.initialize();
                                _context94.next = 5;
                                return GrimoireInitializer._waitForDOMLoading();

                            case 5:
                                _context94.next = 7;
                                return obtainGomlInterface.resolvePlugins();

                            case 7:
                                _context94.next = 9;
                                return GomlLoader.loadForPage();

                            case 9:
                                _context94.next = 14;
                                break;

                            case 11:
                                _context94.prev = 11;
                                _context94.t0 = _context94["catch"](0);

                                console.error(_context94.t0);

                            case 14:
                            case "end":
                                return _context94.stop();
                        }
                    }
                }, _callee19, this, [[0, 11]]);
            }));
        }
        /**
         * Ensure WebGLRenderingContext.[CONSTANTS] is exisiting.
         * Some of the browsers contains them in prototype.
         */

    }, {
        key: "_copyGLConstants",
        value: function _copyGLConstants() {
            if (WebGLRenderingContext.ONE) {
                // Assume the CONSTANTS are already in WebGLRenderingContext
                // Chrome,Firefox,IE,Edge...
                return;
            }
            // Otherwise like ""Safari""
            for (var propName in WebGLRenderingContext.prototype) {
                if (/^[A-Z]/.test(propName)) {
                    var property = WebGLRenderingContext.prototype[propName];
                    WebGLRenderingContext[propName] = property;
                }
            }
        }
        /**
         * Obtain the promise object which will be resolved when DOMContentLoaded event was rised.
         * @return {Promise<void>} the promise
         */

    }, {
        key: "_waitForDOMLoading",
        value: function _waitForDOMLoading() {
            return new _promise2.default(function (resolve) {
                window.addEventListener("DOMContentLoaded", function () {
                    resolve();
                });
            });
        }
    }]);
    return GrimoireInitializer;
}();
/**
 * Just start the process.
 */


GrimoireInitializer.initialize();
window["gr"] = obtainGomlInterface;

/**
 * Provides managing all promise on initializing resources.
 */

var AssetLoader = function (_EEObject2) {
    (0, _inherits3.default)(AssetLoader, _EEObject2);

    function AssetLoader() {
        var _ref;

        (0, _classCallCheck3.default)(this, AssetLoader);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        /**
         * Promise count registered.
         * @type {number}
         */
        var _this51 = (0, _possibleConstructorReturn3.default)(this, (_ref = AssetLoader.__proto__ || (0, _getPrototypeOf2.default)(AssetLoader)).call.apply(_ref, [this].concat(args)));

        _this51.registerCount = 0;
        /**
         * Promise count finished successfully.
         * @type {number}
         */
        _this51.loadCount = 0;
        /**
         * Promise count completed(success and errored)
         * @type {number}
         */
        _this51.completeCount = 0;
        /**
         * Promise count errored
         * @type {number}
         */
        _this51.errorCount = 0;
        /**
         * Main promise to provide tasks for waiting for all resource loading.
         * @type {Promise<void>}
         */
        _this51.promise = new _promise2.default(function (resolve) {
            _this51._resolve = resolve;
        });
        return _this51;
    }
    /**
     * Register an promise to be waited until finished.
     */


    (0, _createClass3.default)(AssetLoader, [{
        key: "register",
        value: function register(promise) {
            var _this52 = this;

            this.registerCount++;
            return new _promise2.default(function (resolve, reject) {
                (function () {
                    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee20() {
                        return _regenerator2.default.wrap(function _callee20$(_context95) {
                            while (1) {
                                switch (_context95.prev = _context95.next) {
                                    case 0:
                                        _context95.prev = 0;
                                        _context95.next = 3;
                                        return promise;

                                    case 3:
                                        _context95.t0 = _context95.sent;
                                        resolve(_context95.t0);

                                        this.loadCount++;
                                        _context95.next = 12;
                                        break;

                                    case 8:
                                        _context95.prev = 8;
                                        _context95.t1 = _context95["catch"](0);

                                        reject(_context95.t1);
                                        this.errorCount++;

                                    case 12:
                                        this.completeCount++;
                                        this._checkLoadCompleted();

                                    case 14:
                                    case "end":
                                        return _context95.stop();
                                }
                            }
                        }, _callee20, this, [[0, 8]]);
                    }));
                }).bind(_this52)();
            });
        }
        /**
         * Verify all promises are completed.
         */

    }, {
        key: "_checkLoadCompleted",
        value: function _checkLoadCompleted() {
            this.emit("progress", this);
            if (this.registerCount === this.completeCount) {
                this._resolve();
            }
        }
    }]);
    return AssetLoader;
}(EEObject);

var DefaultLoaderChunk = "<div style=\"width:100%;height:100%;position: relative;\">\n    <div style=\"width: 55px;height: 55px;border-radius: 100%;border: 5px solid #381794;border-right-color: #FC659D;animation: rotate 1s linear infinite;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;\"></div>\n</div>\n<style type=\"text/css\">\n    @keyframes rotate {\n        from {\n            transform: rotate(0deg);\n        }\n        to {\n            transform: rotate(360deg);\n        }\n    }\n</style>\n";

var AssetLoadingManagerComponent = function (_Component2) {
    (0, _inherits3.default)(AssetLoadingManagerComponent, _Component2);

    function AssetLoadingManagerComponent() {
        var _ref2;

        (0, _classCallCheck3.default)(this, AssetLoadingManagerComponent);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var _this53 = (0, _possibleConstructorReturn3.default)(this, (_ref2 = AssetLoadingManagerComponent.__proto__ || (0, _getPrototypeOf2.default)(AssetLoadingManagerComponent)).call.apply(_ref2, [this].concat(args)));

        _this53.loader = new AssetLoader();
        return _this53;
    }

    (0, _createClass3.default)(AssetLoadingManagerComponent, [{
        key: "$treeInitialized",
        value: function $treeInitialized() {
            if (this.attributes.get("autoStart").Value) {
                this._autoStart();
            }
            this._documentResolver();
        }
    }, {
        key: "$awake",
        value: function $awake() {
            var _this54 = this;

            this.companion.set(obtainGomlInterface.ns(this.name.ns)("loader"), this.loader);
            this.loader.register(new _promise2.default(function (resolve) {
                _this54._documentResolver = resolve;
            }));
            var canvasContainer = this.companion.get("canvasContainer");
            if (!this.getValue("enableLoader")) {
                return;
            }
            var loaderContainer = document.createElement("div");
            loaderContainer.innerHTML = DefaultLoaderChunk;
            loaderContainer.style.width = loaderContainer.style.height = "100%";
            canvasContainer.appendChild(loaderContainer);
            this._loaderElement = loaderContainer;
        }
    }, {
        key: "_autoStart",
        value: function _autoStart() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee21() {
                return _regenerator2.default.wrap(function _callee21$(_context96) {
                    while (1) {
                        switch (_context96.prev = _context96.next) {
                            case 0:
                                _context96.next = 2;
                                return this.loader.promise;

                            case 2:
                                if (this._loaderElement) {
                                    this._loaderElement.remove();
                                }
                                this.node.emit("asset-load-completed");
                                this.tree("goml").setAttribute("loopEnabled", true);

                            case 5:
                            case "end":
                                return _context96.stop();
                        }
                    }
                }, _callee21, this);
            }));
        }
    }]);
    return AssetLoadingManagerComponent;
}(Component);

AssetLoadingManagerComponent.attributes = {
    loadingProgress: {
        defaultValue: 0,
        converter: "Number"
    },
    autoStart: {
        defaultValue: true,
        converter: "Boolean"
    },
    anableLoader: {
        defaultValue: false,
        converter: "Boolean"
    }
};

/**
 * Provides perspective camera as implementation of ICamera.
 */

var PerspectiveCamera = function () {
    function PerspectiveCamera() {
        (0, _classCallCheck3.default)(this, PerspectiveCamera);

        this._viewMatrix = new Matrix();
        this._projectionMatrix = new Matrix();
        this._invProjectionMatrix = new Matrix();
        this._projectionViewMatrix = new Matrix();
        this._eyeCache = Vector3.Zero;
        this._lookAtCache = Vector3.Zero;
        this._upCache = Vector3.Zero;
    }

    (0, _createClass3.default)(PerspectiveCamera, [{
        key: "getViewMatrix",
        value: function getViewMatrix() {
            return this._viewMatrix;
        }
    }, {
        key: "getProjectionMatrix",
        value: function getProjectionMatrix() {
            return this._projectionMatrix;
        }
    }, {
        key: "getInvProjectionMatrix",
        value: function getInvProjectionMatrix() {
            return this._invProjectionMatrix;
        }
    }, {
        key: "getProjectionViewMatrix",
        value: function getProjectionViewMatrix() {
            return this._projectionViewMatrix;
        }
    }, {
        key: "getFar",
        value: function getFar() {
            return this._far;
        }
    }, {
        key: "setFar",
        value: function setFar(far) {
            this._far = far;
            this._recalculateProjection();
        }
    }, {
        key: "getNear",
        value: function getNear() {
            return this._near;
        }
    }, {
        key: "setNear",
        value: function setNear(near) {
            this._near = near;
            this._recalculateProjection();
        }
    }, {
        key: "getAspect",
        value: function getAspect() {
            return this._aspect;
        }
    }, {
        key: "setAspect",
        value: function setAspect(aspect) {
            this._aspect = aspect;
            this._recalculateProjection();
        }
    }, {
        key: "getFovy",
        value: function getFovy() {
            return this._fovy;
        }
    }, {
        key: "setFovy",
        value: function setFovy(fov) {
            this._fovy = fov;
            this._recalculateProjection();
        }
    }, {
        key: "updateTransform",
        value: function updateTransform(transform) {
            vec3.transformMat4(this._eyeCache.rawElements, Vector3.Zero.rawElements, transform.globalTransform.rawElements);
            vec4.transformMat4(this._lookAtCache.rawElements, PerspectiveCamera._frontOrigin.rawElements, transform.globalTransform.rawElements);
            vec3.add(this._lookAtCache.rawElements, this._lookAtCache.rawElements, this._eyeCache.rawElements);
            vec4.transformMat4(this._upCache.rawElements, PerspectiveCamera._upOrigin.rawElements, transform.globalTransform.rawElements);
            mat4.lookAt(this._viewMatrix.rawElements, this._eyeCache.rawElements, this._lookAtCache.rawElements, this._upCache.rawElements);
            mat4.mul(this._projectionViewMatrix.rawElements, this._projectionMatrix.rawElements, this._viewMatrix.rawElements);
        }
    }, {
        key: "_recalculateProjection",
        value: function _recalculateProjection() {
            mat4.perspective(this._projectionMatrix.rawElements, this._fovy, this._aspect, this._near, this._far);
            mat4.mul(this._projectionViewMatrix.rawElements, this._projectionMatrix.rawElements, this._viewMatrix.rawElements);
            mat4.invert(this._invProjectionMatrix.rawElements, this._projectionMatrix.rawElements);
        }
    }]);
    return PerspectiveCamera;
}();

PerspectiveCamera._frontOrigin = new Vector4(0, 0, -1, 0);
PerspectiveCamera._upOrigin = new Vector4(0, 1, 0, 0);

var SceneComponent = function (_Component3) {
    (0, _inherits3.default)(SceneComponent, _Component3);

    function SceneComponent() {
        var _ref3;

        (0, _classCallCheck3.default)(this, SceneComponent);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        var _this55 = (0, _possibleConstructorReturn3.default)(this, (_ref3 = SceneComponent.__proto__ || (0, _getPrototypeOf2.default)(SceneComponent)).call.apply(_ref3, [this].concat(args)));

        _this55.sceneDescription = {};
        return _this55;
    }
    /**
     * Notify update scene only when send update message is needed.
     * @param {number} loopIndex [description]
     */


    (0, _createClass3.default)(SceneComponent, [{
        key: "updateScene",
        value: function updateScene(loopIndex) {
            if (this._lastUpdateIndex !== loopIndex) {
                this.node.broadcastMessage("update", this.sceneDescription);
                this._lastUpdateIndex = loopIndex;
            }
        }
    }]);
    return SceneComponent;
}(Component);

SceneComponent.attributes = {};

var CameraComponent = function (_Component4) {
    (0, _inherits3.default)(CameraComponent, _Component4);

    function CameraComponent() {
        (0, _classCallCheck3.default)(this, CameraComponent);
        return (0, _possibleConstructorReturn3.default)(this, (CameraComponent.__proto__ || (0, _getPrototypeOf2.default)(CameraComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(CameraComponent, [{
        key: "$awake",
        value: function $awake() {
            this.containedScene = CameraComponent._findContainedScene(this.node);
            var c = this.camera = new PerspectiveCamera();
            this.transform = this.node.getComponent("Transform");
            this.$transformUpdated(this.transform);
            this.getAttribute("far").addObserver(function (v) {
                console.log("far", v.Value);
                c.setFar(v.Value);
            }, true);
            this.getAttribute("near").addObserver(function (v) {
                c.setNear(v.Value);
            }, true);
            this.getAttribute("fovy").addObserver(function (v) {
                c.setFovy(v.Value);
            }, true);
            this.getAttribute("aspect").addObserver(function (v) {
                c.setAspect(v.Value);
            }, true);
            this.getAttribute("autoAspect").boundTo("_autoAspect");
        }
    }, {
        key: "updateContainedScene",
        value: function updateContainedScene(loopIndex) {
            if (this.containedScene) {
                this.containedScene.updateScene(loopIndex);
            }
        }
    }, {
        key: "renderScene",
        value: function renderScene(args) {
            if (this.containedScene) {
                this._justifyAspect(args);
                args.sceneDescription = this.containedScene.sceneDescription;
                args.defaultTexture = this.companion.get("defaultTexture");
                this.containedScene.node.broadcastMessage("render", args);
            }
        }
    }, {
        key: "$transformUpdated",
        value: function $transformUpdated(t) {
            if (this.camera) {
                this.camera.updateTransform(t);
            }
        }
    }, {
        key: "_justifyAspect",
        value: function _justifyAspect(args) {
            if (this._autoAspect) {
                var asp = args.viewport.Width / args.viewport.Height;
                if (this._aspectCache !== asp) {
                    this.setValue("aspect", asp);
                    this._aspectCache = asp;
                }
            }
        }
    }], [{
        key: "_findContainedScene",

        /**
        * Find scene tag recursively.
        * @param  {GomlNode}       node [the node to searching currently]
        * @return {SceneComponent}      [the scene component found]
        */
        value: function _findContainedScene(node) {
            if (node.parent) {
                var scene = node.parent.getComponent("Scene");
                if (scene && scene instanceof SceneComponent) {
                    return scene;
                } else {
                    return CameraComponent._findContainedScene(node.parent);
                }
            } else {
                return null;
            }
        }
    }]);
    return CameraComponent;
}(Component);

CameraComponent.attributes = {
    fovy: {
        defaultValue: 0.3,
        converter: "Number"
    },
    near: {
        defaultValue: 0.01,
        converter: "Number"
    },
    far: {
        defaultValue: 10,
        converter: "Number"
    },
    aspect: {
        defaultValue: 1.6,
        converter: "Number"
    },
    autoAspect: {
        defaultValue: true,
        converter: "Boolean"
    }
};

var Texture2D = function (_ResourceBase4) {
    (0, _inherits3.default)(Texture2D, _ResourceBase4);

    function Texture2D(gl) {
        (0, _classCallCheck3.default)(this, Texture2D);

        var _this57 = (0, _possibleConstructorReturn3.default)(this, (Texture2D.__proto__ || (0, _getPrototypeOf2.default)(Texture2D)).call(this, gl));

        _this57._texParameterChanged = true;
        _this57._magFilter = WebGLRenderingContext.LINEAR;
        _this57._minFilter = WebGLRenderingContext.LINEAR;
        _this57._wrapS = WebGLRenderingContext.REPEAT;
        _this57._wrapT = WebGLRenderingContext.REPEAT;
        _this57.texture = gl.createTexture();
        return _this57;
    }

    (0, _createClass3.default)(Texture2D, [{
        key: "update",
        value: function update(levelOrImage, widthOrFlipY, height, border, format, type, pixels, flipYForBuffer) {
            this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.texture);
            var flipY = false;
            var image = void 0;
            var width = void 0;
            var level = void 0;
            if (typeof height === "undefined") {
                flipY = widthOrFlipY ? true : false;
                image = levelOrImage;
            } else {
                level = levelOrImage;
                width = widthOrFlipY;
            }
            this.gl.pixelStorei(WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL, flipY ? 1 : 0);
            if (typeof height === "undefined") {
                this.gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, this._checkSize(image));
            } else {
                if (typeof pixels === "undefined") {
                    pixels = null;
                }
                this.gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, level, format, width, height, border, format, type, pixels);
            }
            this.valid = true;
        }
    }, {
        key: "register",
        value: function register(registerNumber) {
            this.gl.activeTexture(WebGLRenderingContext.TEXTURE0 + registerNumber);
            this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.texture);
            if (this._texParameterChanged) {
                this._updateTexParameter();
            }
        }
    }, {
        key: "destroy",
        value: function destroy() {
            (0, _get3.default)(Texture2D.prototype.__proto__ || (0, _getPrototypeOf2.default)(Texture2D.prototype), "destroy", this).call(this);
            this.gl.deleteTexture(this.texture);
        }
        // There should be more effective way to resize texture

    }, {
        key: "_checkSize",
        value: function _checkSize(img) {
            var w = img.naturalWidth,
                h = img.naturalHeight;
            var size = Math.pow(2, Math.log(Math.min(w, h)) / Math.LN2 | 0); // largest 2^n integer that does not exceed s
            if (w !== h || w !== size) {
                var canv = document.createElement("canvas");
                canv.height = canv.width = size;
                canv.getContext("2d").drawImage(img, 0, 0, w, h, 0, 0, size, size);
                return canv;
            }
            return img;
        }
    }, {
        key: "_updateTexParameter",
        value: function _updateTexParameter() {
            this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, this._minFilter);
            this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, this._magFilter);
            this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_S, this._wrapS);
            this.gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_T, this._wrapT);
            this._texParameterChanged = false;
        }
    }, {
        key: "magFilter",
        get: function get() {
            return this._magFilter;
        },
        set: function set(filter) {
            if (this._magFilter !== filter) {
                this._texParameterChanged = true;
                this._magFilter = filter;
            }
        }
    }, {
        key: "minFilter",
        get: function get() {
            return this._minFilter;
        },
        set: function set(filter) {
            if (this._minFilter !== filter) {
                this._texParameterChanged = true;
                this._minFilter = filter;
            }
        }
    }, {
        key: "wrapS",
        get: function get() {
            return this._wrapS;
        },
        set: function set(filter) {
            if (this._wrapS !== filter) {
                this._texParameterChanged = true;
                this._wrapS = filter;
            }
        }
    }, {
        key: "wrapT",
        get: function get() {
            return this._wrapT;
        },
        set: function set(filter) {
            if (this._wrapT !== filter) {
                this._texParameterChanged = true;
                this._wrapT = filter;
            }
        }
    }]);
    return Texture2D;
}(ResourceBase);

var GLExtRequestor = function () {
    function GLExtRequestor(gl) {
        (0, _classCallCheck3.default)(this, GLExtRequestor);

        this.gl = gl;
        this.extensions = {};
        this._readyExtensions = {};
        this._resolveRequested();
        GLExtRequestor._requestObserver.push(this._resolveExtensionSafely);
    }
    /**
     * Request extension to use.
     * @param {string} str [description]
     */


    (0, _createClass3.default)(GLExtRequestor, [{
        key: "_resolveRequested",

        /**
         * Resolve all extension requested already.
         */
        value: function _resolveRequested() {
            var _this58 = this;

            GLExtRequestor._requestedExtensions.forEach(function (e) {
                _this58._resolveExtensionSafely(e.extensionName);
            });
        }
    }, {
        key: "_resolveExtensionSafely",
        value: function _resolveExtensionSafely(extName) {
            var e = GLExtRequestor._requestedExtensions[GLExtRequestor._requestIndexOf(extName)];
            if (!this._resolveExtension(e.extensionName) && e.isNecessary) {
                throw new Error("A WebGL extension '" + e.extensionName + "' was requested. But that is not supported on this device.");
            }
        }
    }, {
        key: "_resolveExtension",
        value: function _resolveExtension(name) {
            if (this._readyExtensions[name]) {
                return true;
            }
            var ext = void 0;
            if (typeof GLExtRequestor._customExtensionResolvers[name] === "undefined") {
                ext = this.extensions[name] = this.gl.getExtension(name);
            } else {
                ext = this.extensions[name] = GLExtRequestor._customExtensionResolvers[name](this.gl);
            }
            this._readyExtensions[name] = this.extensions[name] !== void 0;
            return !!this._readyExtensions[name];
        }
    }], [{
        key: "request",
        value: function request(extName) {
            var isNecessary = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var index = GLExtRequestor._requestIndexOf(extName);
            if (index > -1 && isNecessary) {
                GLExtRequestor._requestedExtensions[index] = { extensionName: extName, isNecessary: isNecessary };
            } else if (index === -1) {
                GLExtRequestor._requestedExtensions.push({ extensionName: extName, isNecessary: isNecessary });
            }
            GLExtRequestor._requestObserver.forEach(function (o) {
                return o(extName);
            });
        }
    }, {
        key: "_requestIndexOf",
        value: function _requestIndexOf(extName) {
            for (var i = 0; i < GLExtRequestor._requestedExtensions.length; i++) {
                if (GLExtRequestor._requestedExtensions[i].extensionName === extName) {
                    return i;
                }
            }
            return -1;
        }
    }]);
    return GLExtRequestor;
}();
/**
 * Extension list requested to use.
 * @type {string[]}
 */


GLExtRequestor._requestedExtensions = [];
/**
 * Some of extensions needed to override resolving extensions by this.
 */
GLExtRequestor._customExtensionResolvers = {};
GLExtRequestor._requestObserver = [];
GLExtRequestor._customExtensionResolvers["WEBGL_color_buffer_float"] = function (gl) {
    var isSupported = void 0;
    if (gl.getExtension("WEBGL_color_buffer_float") === null) {
        var fbo = gl.createFramebuffer();
        var tex = gl.createTexture();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.FLOAT, null);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            isSupported = false;
        } else {
            isSupported = true;
        }
        gl.deleteTexture(tex);
        gl.deleteFramebuffer(fbo);
    } else {
        isSupported = true;
    }
    return isSupported;
};

var ns = obtainGomlInterface.ns("HTTP://GRIMOIRE.GL/NS/DEFAULT");
var ResizeMode;
(function (ResizeMode) {
    ResizeMode[ResizeMode["Aspect"] = 0] = "Aspect";
    ResizeMode[ResizeMode["Fit"] = 1] = "Fit";
    ResizeMode[ResizeMode["Manual"] = 2] = "Manual";
})(ResizeMode || (ResizeMode = {}));

var CanvasInitializerComponent = function (_Component5) {
    (0, _inherits3.default)(CanvasInitializerComponent, _Component5);

    function CanvasInitializerComponent() {
        (0, _classCallCheck3.default)(this, CanvasInitializerComponent);
        return (0, _possibleConstructorReturn3.default)(this, (CanvasInitializerComponent.__proto__ || (0, _getPrototypeOf2.default)(CanvasInitializerComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(CanvasInitializerComponent, [{
        key: "$awake",
        value: function $awake() {
            var _this60 = this;

            this._scriptTag = this.companion.get("scriptElement");
            if (this._isContainedInBody(this._scriptTag)) {
                // canvas should be placed siblings of the script tag
                this._generateCanvas(this._scriptTag);
            } else {}
            // apply sizes on changed
            this.attributes.get("width").addObserver(function (v) {
                _this60._resize();
            });
            this.attributes.get("height").addObserver(function (v) {
                _this60._resize();
            });
        }
        /**
         * Generate canvas element
         * @param  {Element}           parent [description]
         * @return {HTMLCanvasElement}        [description]
         */

    }, {
        key: "_generateCanvas",
        value: function _generateCanvas(scriptTag) {
            var _this61 = this;

            this.canvas = document.createElement("canvas");
            window.addEventListener("resize", function () {
                return _this61._onWindowResize();
            });
            this._configureCanvas(this.canvas, scriptTag);
            var gl = this._getContext(this.canvas);
            this._defaultTexture = new Texture2D(gl);
            this._defaultTexture.update(0, 1, 1, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
            this.companion.set(ns("gl"), gl);
            this.companion.set(ns("canvasElement"), this.canvas);
            this.companion.set(ns("GLExtRequestor"), new GLExtRequestor(gl));
            this.companion.set(ns("defaultTexture"), this._defaultTexture);
            return this.canvas;
        }
    }, {
        key: "_resize",
        value: function _resize(supressBroadcast) {
            var canvas = this.companion.get("canvasElement");
            var widthRaw = this.getValue("width");
            var heightRaw = this.getValue("height");
            this._widthMode = this._asResizeMode(widthRaw);
            this._heightMode = this._asResizeMode(heightRaw);
            if (this._widthMode === this._heightMode && this._widthMode === ResizeMode.Aspect) {
                throw new Error("Width and height could not have aspect mode in same time!");
            }
            if (this._widthMode === ResizeMode.Aspect) {
                this._ratio = widthRaw.aspect;
            }
            if (this._heightMode === ResizeMode.Aspect) {
                this._ratio = heightRaw.aspect;
            }
            if (this._widthMode === ResizeMode.Manual) {
                this._applyManualWidth(widthRaw.size, supressBroadcast);
            }
            if (this._heightMode === ResizeMode.Manual) {
                this._applyManualHeight(heightRaw.size, supressBroadcast);
            }
            this._onWindowResize(supressBroadcast);
        }
    }, {
        key: "_onWindowResize",
        value: function _onWindowResize(supressBroadcast) {
            var size = this._getParentSize();
            if (this._widthMode === ResizeMode.Fit) {
                this._applyManualWidth(size.width, supressBroadcast);
            }
            if (this._heightMode === ResizeMode.Fit) {
                this._applyManualHeight(size.height, supressBroadcast);
            }
        }
    }, {
        key: "_applyManualWidth",
        value: function _applyManualWidth(width, supressBroadcast) {
            if (width === this.canvas.width) {
                return;
            }
            this.canvas.width = width;
            this._canvasContainer.style.width = width + "px";
            if (!supressBroadcast) {
                this.node.broadcastMessage(1, "resizeCanvas");
            }
            if (this._heightMode === ResizeMode.Aspect) {
                this._applyManualHeight(width / this._ratio, supressBroadcast);
            }
        }
    }, {
        key: "_applyManualHeight",
        value: function _applyManualHeight(height, supressBroadcast) {
            if (height === this.canvas.height) {
                return;
            }
            this.canvas.height = height;
            this._canvasContainer.style.height = height + "px";
            if (!supressBroadcast) {
                this.node.broadcastMessage(1, "resizeCanvas");
            }
            if (this._widthMode === ResizeMode.Aspect) {
                this._applyManualWidth(height * this._ratio, supressBroadcast);
            }
        }
    }, {
        key: "_getParentSize",
        value: function _getParentSize() {
            var parent = this._canvasContainer.parentElement;
            var boundingBox = parent.getBoundingClientRect();
            return boundingBox;
        }
        /**
         * Get resize mode from raw attribute of height or width
         * @param  {string  | number}      mode [description]
         * @return {ResizeMode}   [description]
         */

    }, {
        key: "_asResizeMode",
        value: function _asResizeMode(cso) {
            if (cso.mode === "fit") {
                return ResizeMode.Fit;
            } else if (cso.mode === "aspect") {
                return ResizeMode.Aspect;
            } else {
                return ResizeMode.Manual;
            }
        }
    }, {
        key: "_configureCanvas",
        value: function _configureCanvas(canvas, scriptTag) {
            canvas.style.position = "absolute";
            canvas.style.top = "0px";
            canvas.style.left = "0px";
            this._canvasContainer = document.createElement("div");
            this._canvasContainer.style.position = "relative";
            this._canvasContainer.style.overflow = "hidden";
            this._canvasContainer.appendChild(canvas);
            if (this.getValue("containerId")) {
                this._canvasContainer.id = this.getValue("containerId");
            }
            if (this.getValue("containerClass")) {
                this._canvasContainer.className = this.getValue("containerClass");
            }
            this.companion.set(ns("canvasContainer"), this._canvasContainer);
            scriptTag.parentElement.insertBefore(this._canvasContainer, scriptTag.nextSibling);
            this._resize(true);
        }
    }, {
        key: "_getContext",
        value: function _getContext(canvas) {
            var context = canvas.getContext("webgl");
            if (!context) {
                context = canvas.getContext("webgl-experimental");
            }
            return context;
        }
        /**
         * Check the tag is included in the body
         * @param  {Element} tag [description]
         * @return {boolean}     [description]
         */

    }, {
        key: "_isContainedInBody",
        value: function _isContainedInBody(tag) {
            if (!tag.parentElement) {
                return false;
            }
            if (tag.parentNode.nodeName === "BODY") {
                return true;
            }
            return this._isContainedInBody(tag.parentElement);
        }
    }]);
    return CanvasInitializerComponent;
}(Component);

CanvasInitializerComponent.attributes = {
    width: {
        defaultValue: "fit",
        converter: "CanvasSize"
    },
    height: {
        defaultValue: 480,
        converter: "CanvasSize"
    },
    containerId: {
        defaultValue: undefined,
        converter: "String"
    },
    containerClass: {
        defaultValue: "gr-container",
        converter: "String"
    }
};

var FullscreenComponent = function (_Component6) {
    (0, _inherits3.default)(FullscreenComponent, _Component6);

    function FullscreenComponent() {
        var _ref4;

        (0, _classCallCheck3.default)(this, FullscreenComponent);

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        var _this62 = (0, _possibleConstructorReturn3.default)(this, (_ref4 = FullscreenComponent.__proto__ || (0, _getPrototypeOf2.default)(FullscreenComponent)).call.apply(_ref4, [this].concat(args)));

        _this62._fullscreen = false;
        return _this62;
    }

    (0, _createClass3.default)(FullscreenComponent, [{
        key: "$awake",
        value: function $awake() {
            var _this63 = this;

            this.getAttribute("fullscreen").addObserver(function (attr) {
                if (_this63._fullscreen === attr.Value) {
                    return;
                }
                _this63._fullscreen = attr.Value;
                _this63._switchFullscreen();
            });
        }
    }, {
        key: "_switchFullscreen",
        value: function _switchFullscreen() {
            if (this._fullscreen) {
                this.requestFullscreen(this.companion.get("canvasContainer"));
            } else {
                this.exitFullscreen();
            }
        }
    }, {
        key: "requestFullscreen",
        value: function requestFullscreen(target) {
            if (target.webkitRequestFullscreen) {
                target.webkitRequestFullscreen(); //Chrome15+, Safari5.1+, Opera15+
            } else if (target["mozRequestFullScreen"]) {
                target["mozRequestFullScreen"](); //FF10+
            } else if (target["msRequestFullscreen"]) {
                target["msRequestFullscreen"](); //IE11+
            } else if (target.requestFullscreen) {
                target.requestFullscreen(); // HTML5 Fullscreen API仕様
            } else {
                console.error('ご利用のブラウザはフルスクリーン操作に対応していません');
                return;
            }
        }
        /*フルスクリーン終了用ファンクション*/

    }, {
        key: "exitFullscreen",
        value: function exitFullscreen() {
            if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen(); //Chrome15+, Safari5.1+, Opera15+
            } else if (document["mozCancelFullScreen"]) {
                document["mozCancelFullScreen"](); //FF10+
            } else if (document["msExitFullscreen"]) {
                document["msExitFullscreen"](); //IE11+
            } else if (document["cancelFullScreen"]) {
                document["cancelFullScreen"](); //Gecko:FullScreenAPI仕様
            } else if (document.exitFullscreen) {
                document.exitFullscreen(); // HTML5 Fullscreen API仕様
            }
        }
    }]);
    return FullscreenComponent;
}(Component);

FullscreenComponent.attributes = {
    fullscreen: {
        converter: "Boolean",
        defaultValue: false
    }
};

var GeometryComponent = function (_Component7) {
    (0, _inherits3.default)(GeometryComponent, _Component7);

    function GeometryComponent() {
        (0, _classCallCheck3.default)(this, GeometryComponent);
        return (0, _possibleConstructorReturn3.default)(this, (GeometryComponent.__proto__ || (0, _getPrototypeOf2.default)(GeometryComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(GeometryComponent, [{
        key: "$mount",
        value: function $mount() {
            var type = this.getValue("type");
            if (type) {
                var gf = this.companion.get("GeometryFactory");
                var attrs = GeometryFactory.factoryArgumentDeclarations[type];
                var geometryArgument = {};
                for (var key in attrs) {
                    this.__addAtribute(key, attrs[key]);
                    geometryArgument[key] = this.getValue(key);
                }
                this.geometry = gf.instanciate(type, geometryArgument);
                var gr = this.companion.get("GeometryRegistory");
                var name = this.getValue("name");
                if (!name) {
                    throw new Error("Name was not specified");
                }
                gr.addGeometry(name, this.geometry);
            }
        }
    }]);
    return GeometryComponent;
}(Component);

GeometryComponent.attributes = {
    type: {
        converter: "String",
        defaultValue: undefined
    },
    name: {
        converter: "String",
        defaultValue: undefined
    }
};

var GeometryRegistoryComponent = function (_Component8) {
    (0, _inherits3.default)(GeometryRegistoryComponent, _Component8);

    function GeometryRegistoryComponent() {
        var _ref5;

        (0, _classCallCheck3.default)(this, GeometryRegistoryComponent);

        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        var _this65 = (0, _possibleConstructorReturn3.default)(this, (_ref5 = GeometryRegistoryComponent.__proto__ || (0, _getPrototypeOf2.default)(GeometryRegistoryComponent)).call.apply(_ref5, [this].concat(args)));

        _this65._geometries = {};
        return _this65;
    }

    (0, _createClass3.default)(GeometryRegistoryComponent, [{
        key: "$awake",
        value: function $awake() {
            this._factory = new GeometryFactory(this.companion.get("gl"));
            this.companion.set(this.name, this);
            this.companion.set(obtainGomlInterface.ns(this.name.ns)("GeometryFactory"), this._factory);
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = (0, _getIterator3.default)(this.getValue("defaultGeometry")), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var geometry = _step6.value;

                    this.addGeometry(geometry, this._factory.instanciateAsDefault(geometry));
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
        }
    }, {
        key: "addGeometry",
        value: function addGeometry(name, geometry) {
            this._geometries[name] = geometry;
        }
    }, {
        key: "removeGeometry",
        value: function removeGeometry(name) {
            if (this._geometries[name]) {
                delete this._geometries[name];
            }
        }
    }, {
        key: "getGeometry",
        value: function getGeometry(name) {
            return this._geometries[name];
        }
    }]);
    return GeometryRegistoryComponent;
}(Component);

GeometryRegistoryComponent.attributes = {
    defaultGeometry: {
        converter: "StringArray",
        defaultValue: ["quad", "cube", "sphere"]
    }
};

var HTMLBinderComponent = function (_Component9) {
    (0, _inherits3.default)(HTMLBinderComponent, _Component9);

    function HTMLBinderComponent() {
        var _ref6;

        (0, _classCallCheck3.default)(this, HTMLBinderComponent);

        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
        }

        var _this66 = (0, _possibleConstructorReturn3.default)(this, (_ref6 = HTMLBinderComponent.__proto__ || (0, _getPrototypeOf2.default)(HTMLBinderComponent)).call.apply(_ref6, [this].concat(args)));

        _this66._isFirstCall = true;
        return _this66;
    }

    (0, _createClass3.default)(HTMLBinderComponent, [{
        key: "$awake",
        value: function $awake() {
            this._canvasContainer = this.companion.get("canvasContainer");
            this._currentTransform = this.node.getComponent("Transform");
        }
    }, {
        key: "$mount",
        value: function $mount() {
            this._canvasContainer = this.companion.get("canvasContainer");
            this._currentTransform = this.node.getComponent("Transform");
        }
    }, {
        key: "$treeInitialized",
        value: function $treeInitialized() {
            var _this67 = this;

            this.getAttribute("targetRenderer").addObserver(function (v) {
                if (_this67._rendererQuery !== v.Value) {
                    _this67._onRendererChanged();
                }
            }, true);
            this.getAttribute("htmlQuery").addObserver(function (v) {
                _this67._onQueryChanged(v.Value);
            }, true);
        }
    }, {
        key: "$render",
        value: function $render(args) {
            if (this._isFirstCall) {
                this._onRendererChanged();
                this._isFirstCall = false;
            }
            if (this._queriedElement && args.caller.node === this._targetNode) {
                var vp = args.viewport;
                var rawPos = Matrix.transform(this._currentTransform.calcPVM(args.camera.camera), new Vector4(0, 0, 0, 1));
                var rawScPos = {
                    x: rawPos.X / rawPos.W,
                    y: rawPos.Y / rawPos.W,
                    z: rawPos.Z / rawPos.W
                };
                if (rawScPos.z >= -1 && rawScPos.z <= 1) {
                    var scPos = {
                        x: vp.Left + (rawScPos.x + 1) / 2 * vp.Width,
                        y: vp.Top + (rawScPos.y + 1) / 2 * vp.Height
                    };
                    this._queriedElement.style.visibility = "visible";
                    this._queriedElement.style.left = scPos.x + "px";
                    this._queriedElement.style.bottom = scPos.y + "px";
                } else {
                    this._queriedElement.style.visibility = "hidden";
                }
            }
        }
        /**
         * Restore default position of queried html
         */

    }, {
        key: "_restoreDefault",
        value: function _restoreDefault() {
            this._canvasContainer.removeChild(this._queriedElement);
            this._parentCache.appendChild(this._queriedElement);
            var s = this._queriedElement.style;
            var c = this._styleCache;
            s.position = c["position"];
            s.left = c["left"];
            s.bottom = c["bottom"];
            s.visibility = c["visibility"];
        }
    }, {
        key: "_beginTrack",
        value: function _beginTrack() {
            this._parentCache.removeChild(this._queriedElement);
            this._canvasContainer.appendChild(this._queriedElement);
            this._queriedElement.style.position = "absolute";
        }
    }, {
        key: "_onRendererChanged",
        value: function _onRendererChanged() {
            var _this68 = this;

            var returned = false;
            this.tree(this.getValue("targetRenderer")).forEach(function (n) {
                if (returned) {
                    return true;
                } else {
                    _this68._targetNode = n;
                    returned = true;
                }
            });
        }
    }, {
        key: "_onQueryChanged",
        value: function _onQueryChanged(query) {
            var queried = void 0;
            if (query && query !== "") {
                queried = document.querySelectorAll(query);
            }
            if (this._queriedElement) {
                this._restoreDefault();
            }
            if (!queried || queried.length === 0) {
                this._queriedElement = undefined;
                this._parentCache = undefined;
            } else {
                this._queriedElement = queried.item(0);
                var s = this._queriedElement.style;
                this._styleCache = {
                    position: s.position,
                    visibility: s.visibility,
                    left: s.left,
                    bottom: s.bottom
                };
                this._parentCache = this._queriedElement.parentElement;
                this._beginTrack();
            }
        }
    }]);
    return HTMLBinderComponent;
}(Component);

HTMLBinderComponent.attributes = {
    htmlQuery: {
        defaultValue: undefined,
        converter: "String"
    },
    targetRenderer: {
        defaultValue: "render-scene",
        converter: "String"
    }
};

var LoopManagerComponent = function (_Component10) {
    (0, _inherits3.default)(LoopManagerComponent, _Component10);

    function LoopManagerComponent() {
        var _ref7;

        (0, _classCallCheck3.default)(this, LoopManagerComponent);

        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
        }

        var _this69 = (0, _possibleConstructorReturn3.default)(this, (_ref7 = LoopManagerComponent.__proto__ || (0, _getPrototypeOf2.default)(LoopManagerComponent)).call.apply(_ref7, [this].concat(args)));

        _this69._loopActions = [];
        _this69._loopIndex = 0;
        return _this69;
    }

    (0, _createClass3.default)(LoopManagerComponent, [{
        key: "$awake",
        value: function $awake() {
            var _this70 = this;

            this.attributes.get("loopEnabled").addObserver(function (attr) {
                _this70._begin();
            });
            this._registerNextLoop = window.requestAnimationFrame // if window.requestAnimationFrame is defined or undefined
            ? function () {
                window.requestAnimationFrame(_this70._loop.bind(_this70));
            } : function () {
                window.setTimeout(_this70._loop.bind(_this70), 1000 / 60);
            };
        }
    }, {
        key: "register",
        value: function register(action, priorty) {
            this._loopActions.push({
                action: action,
                priorty: priorty
            });
            this._loopActions.sort(function (a, b) {
                return a.priorty - b.priorty;
            });
        }
    }, {
        key: "_begin",
        value: function _begin() {
            this._registerNextLoop();
        }
    }, {
        key: "_loop",
        value: function _loop() {
            var _this71 = this;

            this._loopActions.forEach(function (a) {
                return a.action(_this71._loopIndex);
            });
            this._loopIndex++;
            this._registerNextLoop();
        }
    }]);
    return LoopManagerComponent;
}(Component);

LoopManagerComponent.attributes = {
    loopEnabled: {
        defaultValue: false,
        converter: "Boolean"
    }
};

var MaterialComponent = function (_Component11) {
    (0, _inherits3.default)(MaterialComponent, _Component11);

    function MaterialComponent() {
        var _ref8;

        (0, _classCallCheck3.default)(this, MaterialComponent);

        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
        }

        var _this72 = (0, _possibleConstructorReturn3.default)(this, (_ref8 = MaterialComponent.__proto__ || (0, _getPrototypeOf2.default)(MaterialComponent)).call.apply(_ref8, [this].concat(args)));

        _this72.materialArgs = {};
        return _this72;
    }

    (0, _createClass3.default)(MaterialComponent, [{
        key: "$mount",
        value: function $mount() {
            var typeName = this.getValue("type");
            if (typeName) {
                this.materialPromise = this.companion.get("MaterialFactory").instanciate(typeName);
                this._registerAttributes();
            }
        }
    }, {
        key: "_registerAttributes",
        value: function _registerAttributes() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee22() {
                var _this73 = this;

                var promises;
                return _regenerator2.default.wrap(function _callee22$(_context97) {
                    while (1) {
                        switch (_context97.prev = _context97.next) {
                            case 0:
                                _context97.next = 2;
                                return this.materialPromise;

                            case 2:
                                this.material = _context97.sent;
                                promises = [];

                                this.material.pass.forEach(function (p) {
                                    if (p instanceof SORTPass) {
                                        var _loop6 = function _loop6(key) {
                                            _this73.__addAtribute(key, p.programInfo.gomlAttributes[key]);
                                            _this73.attributes.get(key).addObserver(function (v) {
                                                _this73.materialArgs[key] = v.Value;
                                            });
                                            var value = _this73.materialArgs[key] = _this73.getValue(key);
                                            if (value instanceof ResourceBase) {
                                                promises.push(value.validPromise);
                                            }
                                        };

                                        for (var key in p.programInfo.gomlAttributes) {
                                            _loop6(key);
                                        }
                                    }
                                });
                                _context97.next = 7;
                                return _promise2.default.all(promises);

                            case 7:
                                this.ready = true;

                            case 8:
                            case "end":
                                return _context97.stop();
                        }
                    }
                }, _callee22, this);
            }));
        }
    }]);
    return MaterialComponent;
}(Component);

MaterialComponent.attributes = {
    type: {
        converter: "String",
        defaultValue: undefined
    }
};

var MaterialContainerComponent = function (_Component12) {
    (0, _inherits3.default)(MaterialContainerComponent, _Component12);

    function MaterialContainerComponent() {
        var _ref9;

        (0, _classCallCheck3.default)(this, MaterialContainerComponent);

        for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            args[_key9] = arguments[_key9];
        }

        var _this74 = (0, _possibleConstructorReturn3.default)(this, (_ref9 = MaterialContainerComponent.__proto__ || (0, _getPrototypeOf2.default)(MaterialContainerComponent)).call.apply(_ref9, [this].concat(args)));

        _this74.materialArgs = {};
        _this74.ready = false;
        _this74.useMaterial = false;
        return _this74;
    }

    (0, _createClass3.default)(MaterialContainerComponent, [{
        key: "$mount",
        value: function $mount() {
            this.attributes.get("material").addObserver(this._onMaterialChanged);
            this.companion.get("loader").register(this._onMaterialChanged());
        }
        /**
         * When the material attribute is changed.
         */

    }, {
        key: "_onMaterialChanged",
        value: function _onMaterialChanged() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee23() {
                var materialPromise;
                return _regenerator2.default.wrap(function _callee23$(_context98) {
                    while (1) {
                        switch (_context98.prev = _context98.next) {
                            case 0:
                                materialPromise = this.getValue("material");

                                if (!(materialPromise === void 0)) {
                                    _context98.next = 4;
                                    break;
                                }

                                this.useMaterial = false;
                                return _context98.abrupt("return");

                            case 4:
                                this.useMaterial = true;
                                if (!this._materialComponent) {
                                    this._prepareInternalMaterial(materialPromise);
                                } else {
                                    this._prepareExternalMaterial(materialPromise);
                                }

                            case 6:
                            case "end":
                                return _context98.stop();
                        }
                    }
                }, _callee23, this);
            }));
        }
        /**
         * Resolve materials only when the material required from external material component.
         * @return {Promise<void>} [description]
         */

    }, {
        key: "_prepareExternalMaterial",
        value: function _prepareExternalMaterial(materialPromise) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee24() {
                var loader, material;
                return _regenerator2.default.wrap(function _callee24$(_context99) {
                    while (1) {
                        switch (_context99.prev = _context99.next) {
                            case 0:
                                loader = this.companion.get("loader");

                                loader.register(materialPromise);
                                _context99.next = 4;
                                return materialPromise;

                            case 4:
                                material = _context99.sent;

                                this.material = material;
                                this.materialArgs = this._materialComponent.materialArgs;
                                this.ready = true;

                            case 8:
                            case "end":
                                return _context99.stop();
                        }
                    }
                }, _callee24, this);
            }));
        }
    }, {
        key: "_prepareInternalMaterial",
        value: function _prepareInternalMaterial(materialPromise) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee25() {
                var _this75 = this;

                var loader, material, promises;
                return _regenerator2.default.wrap(function _callee25$(_context100) {
                    while (1) {
                        switch (_context100.prev = _context100.next) {
                            case 0:
                                // obtain promise of instanciating material
                                loader = this.companion.get("loader");

                                loader.register(materialPromise);

                                if (materialPromise) {
                                    _context100.next = 4;
                                    break;
                                }

                                return _context100.abrupt("return");

                            case 4:
                                _context100.next = 6;
                                return materialPromise;

                            case 6:
                                material = _context100.sent;
                                promises = [];

                                material.pass.forEach(function (p) {
                                    if (p instanceof SORTPass) {
                                        var _loop7 = function _loop7(key) {
                                            var val = p.programInfo.gomlAttributes[key];
                                            _this75.__addAtribute(key, val);
                                            _this75.attributes.get(key).addObserver(function (v) {
                                                _this75.materialArgs[key] = v.Value;
                                            });
                                            var value = _this75.materialArgs[key] = _this75.getValue(key);
                                            if (value instanceof ResourceBase) {
                                                promises.push(value.validPromise);
                                            }
                                        };

                                        for (var key in p.programInfo.gomlAttributes) {
                                            _loop7(key);
                                        }
                                    }
                                });
                                _promise2.default.all(promises);
                                this.material = material;
                                this.ready = true;

                            case 12:
                            case "end":
                                return _context100.stop();
                        }
                    }
                }, _callee25, this);
            }));
        }
    }]);
    return MaterialContainerComponent;
}(Component);

MaterialContainerComponent.attributes = {
    material: {
        converter: "Material",
        defaultValue: "new(unlit)",
        componentBoundTo: "_materialComponent" // When the material was specified with the other material tag, this field would be assigned.
    }
};

var MaterialImporterComponent = function (_Component13) {
    (0, _inherits3.default)(MaterialImporterComponent, _Component13);

    function MaterialImporterComponent() {
        (0, _classCallCheck3.default)(this, MaterialImporterComponent);
        return (0, _possibleConstructorReturn3.default)(this, (MaterialImporterComponent.__proto__ || (0, _getPrototypeOf2.default)(MaterialImporterComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(MaterialImporterComponent, [{
        key: "$awake",
        value: function $awake() {
            if (!this.getValue("typeName") || !this.getValue("src")) {
                throw new Error("type or src cannot be null in material importer");
            } else {
                MaterialFactory.addSORTMaterialFromURL(this.getValue("typeName"), this.getValue("src"));
            }
        }
    }]);
    return MaterialImporterComponent;
}(Component);

MaterialImporterComponent.attributes = {
    typeName: {
        defaultValue: undefined,
        converter: "String"
    },
    src: {
        defaultValue: undefined,
        converter: "String"
    }
};

var MaterialManagerComponent = function (_Component14) {
    (0, _inherits3.default)(MaterialManagerComponent, _Component14);

    function MaterialManagerComponent() {
        (0, _classCallCheck3.default)(this, MaterialManagerComponent);
        return (0, _possibleConstructorReturn3.default)(this, (MaterialManagerComponent.__proto__ || (0, _getPrototypeOf2.default)(MaterialManagerComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(MaterialManagerComponent, [{
        key: "$awake",
        value: function $awake() {
            var ns = obtainGomlInterface.ns(this.name.ns);
            this.companion.set(ns("MaterialFactory"), new MaterialFactory(this.companion.get("gl")));
        }
    }]);
    return MaterialManagerComponent;
}(Component);

MaterialManagerComponent.attributes = {};

var MeshRenderer = function (_Component15) {
    (0, _inherits3.default)(MeshRenderer, _Component15);

    function MeshRenderer() {
        (0, _classCallCheck3.default)(this, MeshRenderer);
        return (0, _possibleConstructorReturn3.default)(this, (MeshRenderer.__proto__ || (0, _getPrototypeOf2.default)(MeshRenderer)).apply(this, arguments));
    }

    (0, _createClass3.default)(MeshRenderer, [{
        key: "$awake",
        value: function $awake() {
            this.getAttribute("targetBuffer").boundTo("_targetBuffer");
            this.getAttribute("layer").boundTo("_layer");
            this.getAttribute("drawOffset").boundTo("_drawOffset");
            this.getAttribute("drawCount").boundTo("_drawCount");
            this.getAttribute("geometry").boundTo("_geometry");
        }
    }, {
        key: "$mount",
        value: function $mount() {
            this._transformComponent = this.node.getComponent("Transform");
            this._materialContainer = this.node.getComponent("MaterialContainer");
        }
    }, {
        key: "$render",
        value: function $render(args) {
            if (this._layer !== args.layer) {
                return;
            }
            if (!this._geometry || !args.material && !this._materialContainer.ready) {
                return; // material is not instanciated yet.
            }
            var renderArgs = {
                targetBuffer: this._targetBuffer,
                geometry: this._geometry,
                attributeValues: null,
                camera: args.camera,
                transform: this._transformComponent,
                buffers: args.buffers,
                viewport: args.viewport,
                drawCount: this._drawCount,
                drawOffset: this._drawOffset,
                sceneDescription: args.sceneDescription,
                defaultTexture: args.defaultTexture
            };
            if (args.material) {
                renderArgs.attributeValues = args.materialArgs;
                args.material.draw(renderArgs);
            } else {
                renderArgs.attributeValues = this._materialContainer.materialArgs;
                this._materialContainer.material.draw(renderArgs);
            }
            this.companion.get("gl").flush();
        }
    }]);
    return MeshRenderer;
}(Component);

MeshRenderer.attributes = {
    geometry: {
        converter: "Geometry",
        defaultValue: "quad"
    },
    targetBuffer: {
        converter: "String",
        defaultValue: "default"
    },
    layer: {
        converter: "String",
        defaultValue: "default"
    },
    drawCount: {
        converter: "Number",
        defaultValue: Number.MAX_VALUE
    },
    drawOffset: {
        converter: "Number",
        defaultValue: 0
    }
};

var MouseCameraControlComponent = function (_Component16) {
    (0, _inherits3.default)(MouseCameraControlComponent, _Component16);

    function MouseCameraControlComponent() {
        var _ref10;

        (0, _classCallCheck3.default)(this, MouseCameraControlComponent);

        for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
            args[_key10] = arguments[_key10];
        }

        var _this79 = (0, _possibleConstructorReturn3.default)(this, (_ref10 = MouseCameraControlComponent.__proto__ || (0, _getPrototypeOf2.default)(MouseCameraControlComponent)).call.apply(_ref10, [this].concat(args)));

        _this79._origin = new Vector3(0, 0, 0);
        _this79._lastScreenPos = null;
        _this79._xsum = 0;
        _this79._ysum = 0;
        return _this79;
    }

    (0, _createClass3.default)(MouseCameraControlComponent, [{
        key: "$awake",
        value: function $awake() {
            this.getAttribute("rotateSpeed").boundTo("_rotateSpeed");
            this.getAttribute("zoomSpeed").boundTo("_zoomSpeed");
            this.getAttribute("moveSpeed").boundTo("_moveSpeed");
            this._transform = this.node.getComponent("Transform");
        }
    }, {
        key: "$mount",
        value: function $mount() {
            this._initialRight = Vector3.copy(this._transform.right);
            this._initialUp = Vector3.copy(this._transform.up);
            this._initialDirection = this._transform.localPosition.subtractWith(this._origin);
            this._initialRotation = this._transform.localRotation;
            var scriptTag = this.companion.get("canvasElement");
            scriptTag.addEventListener("mousemove", this._mouseMove.bind(this));
            scriptTag.addEventListener("contextmenu", this._contextMenu.bind(this));
            scriptTag.addEventListener("mousewheel", this._mouseWheel.bind(this));
        }
    }, {
        key: "_contextMenu",
        value: function _contextMenu(m) {
            m.preventDefault();
        }
    }, {
        key: "_mouseMove",
        value: function _mouseMove(m) {
            if (this._lastScreenPos === null) {
                this._lastScreenPos = {
                    x: m.screenX,
                    y: m.screenY
                };
                return;
            }
            var updated = false;
            var diffX = m.screenX - this._lastScreenPos.x;
            var diffY = m.screenY - this._lastScreenPos.y;
            var distance = this._transform.localPosition.subtractWith(this._origin).magnitude;
            if ((m.buttons & 1) > 0) {
                this._xsum += diffX;
                this._ysum += diffY;
                this._ysum = Math.min(Math.PI * 50, this._ysum);
                this._ysum = Math.max(-Math.PI * 50, this._ysum);
                updated = true;
            }
            if ((m.buttons & 2) > 0) {
                var moveX = -diffX * this._moveSpeed * 0.01;
                var moveY = diffY * this._moveSpeed * 0.01;
                this._origin = this._origin.addWith(this._transform.right.multiplyWith(moveX)).addWith(this._transform.up.multiplyWith(moveY));
                distance = this._transform.localPosition.subtractWith(this._origin).magnitude;
                updated = true;
            }
            if (updated) {
                // rotate excution
                var rotationVartical = Quaternion.angleAxis(-this._xsum * this._rotateSpeed, this._initialUp);
                var rotationHorizontal = Quaternion.angleAxis(-this._ysum * this._rotateSpeed, this._initialRight);
                var rotation = Quaternion.multiply(rotationVartical, rotationHorizontal);
                var rotationMat = Matrix.rotationQuaternion(rotation);
                var direction = Matrix.transformNormal(rotationMat, this._initialDirection);
                this._transform.localPosition = this._origin.addWith(Vector3.normalize(direction).multiplyWith(distance));
                this._transform.localRotation = Quaternion.multiply(this._initialRotation, rotation);
            }
            this._lastScreenPos = {
                x: m.screenX,
                y: m.screenY
            };
        }
    }, {
        key: "_mouseWheel",
        value: function _mouseWheel(m) {
            // let move = m.deltaY * this._moveZ * MouseCameraControlComponent.moveCoefficient;
            // let toOrigin = Vector3.normalize(Vector3.subtract(this._origin, this._transform.localPosition));
            // this._origin = this._origin.addWith(toOrigin.multiplyWith(move));
            // this._transform.localPosition = this._transform.localPosition.addWith(this._transform.forward.multiplyWith(move));
            // m.preventDefault();
            var dir = Vector3.normalize(Vector3.subtract(this._transform.localPosition, this._origin));
            var moveDist = -m.deltaY * this._zoomSpeed;
            var distance = Vector3.subtract(this._origin, this._transform.localPosition).magnitude;
            var nextDist = Math.max(1, distance - moveDist);
            this._transform.localPosition = this._origin.addWith(dir.multiplyWith(nextDist));
            m.preventDefault();
        }
    }]);
    return MouseCameraControlComponent;
}(Component);

MouseCameraControlComponent.attributes = {
    rotateSpeed: {
        defaultValue: 0.01,
        converter: "Number"
    },
    zoomSpeed: {
        defaultValue: 0.05,
        converter: "Number"
    },
    moveSpeed: {
        defaultValue: 1,
        converter: "Number"
    }
};

var RenderBuffer = function (_ResourceBase5) {
    (0, _inherits3.default)(RenderBuffer, _ResourceBase5);

    function RenderBuffer(gl) {
        (0, _classCallCheck3.default)(this, RenderBuffer);

        var _this80 = (0, _possibleConstructorReturn3.default)(this, (RenderBuffer.__proto__ || (0, _getPrototypeOf2.default)(RenderBuffer)).call(this, gl));

        _this80.renderBuffer = gl.createRenderbuffer();
        return _this80;
    }

    (0, _createClass3.default)(RenderBuffer, [{
        key: "update",
        value: function update(format, width, height) {
            this.gl.bindRenderbuffer(WebGLRenderingContext.RENDERBUFFER, this.renderBuffer);
            this.gl.renderbufferStorage(WebGLRenderingContext.RENDERBUFFER, format, width, height);
            this.valid = true;
        }
    }, {
        key: "bind",
        value: function bind() {
            this.gl.bindRenderbuffer(WebGLRenderingContext.RENDERBUFFER, this.renderBuffer);
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.gl.deleteRenderbuffer(this.renderBuffer);
            (0, _get3.default)(RenderBuffer.prototype.__proto__ || (0, _getPrototypeOf2.default)(RenderBuffer.prototype), "destroy", this).call(this);
        }
    }]);
    return RenderBuffer;
}(ResourceBase);

var RenderBufferComponent = function (_Component17) {
    (0, _inherits3.default)(RenderBufferComponent, _Component17);

    function RenderBufferComponent() {
        (0, _classCallCheck3.default)(this, RenderBufferComponent);
        return (0, _possibleConstructorReturn3.default)(this, (RenderBufferComponent.__proto__ || (0, _getPrototypeOf2.default)(RenderBufferComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(RenderBufferComponent, [{
        key: "$mount",
        value: function $mount() {
            this.buffer = new RenderBuffer(this.companion.get("gl"));
        }
    }, {
        key: "$unmount",
        value: function $unmount() {
            this.buffer.destroy();
            this.buffer = null;
        }
    }, {
        key: "$resizeBuffer",
        value: function $resizeBuffer(arg) {
            if (!this.getValue("name")) {
                throw new Error("Attribute 'name' must be specified.");
            }
            this.buffer.update(WebGLRenderingContext.DEPTH_COMPONENT16, arg.widthPowerOf2, arg.heightPowerOf2);
            arg.buffers[this.getValue("name")] = this.buffer;
        }
    }]);
    return RenderBufferComponent;
}(Component);

RenderBufferComponent.attributes = {
    name: {
        converter: "String",
        defaultValue: undefined
    }
};

var RendererComponent = function (_Component18) {
    (0, _inherits3.default)(RendererComponent, _Component18);

    function RendererComponent() {
        var _ref11;

        (0, _classCallCheck3.default)(this, RendererComponent);

        for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
            args[_key11] = arguments[_key11];
        }

        var _this82 = (0, _possibleConstructorReturn3.default)(this, (_ref11 = RendererComponent.__proto__ || (0, _getPrototypeOf2.default)(RendererComponent)).call.apply(_ref11, [this].concat(args)));

        _this82._buffers = {};
        return _this82;
    }

    (0, _createClass3.default)(RendererComponent, [{
        key: "$mount",
        value: function $mount() {
            var _this83 = this;

            this._gl = this.companion.get("gl");
            this._canvas = this.companion.get("canvasElement");
            this._camera = this.getValue("camera");
            this.getAttribute("camera").addObserver(function (v) {
                return _this83._camera = v.Value;
            });
            this.getAttribute("viewport").addObserver(function (v) {
                _this83._viewportSizeGenerator = v.Value;
                _this83.$resizeCanvas();
            });
            this._viewportSizeGenerator = this.getValue("viewport");
        }
    }, {
        key: "$treeInitialized",
        value: function $treeInitialized() {
            // This should be called after mounting all of tree nodes in children
            this.$resizeCanvas();
        }
    }, {
        key: "$resizeCanvas",
        value: function $resizeCanvas() {
            this._viewportCache = this._viewportSizeGenerator(this._canvas);
            var newSizes = this._getSizePowerOf2(this._viewportCache.Width, this._viewportCache.Height);
            if (this.node.children.length === 0) {
                this.node.addChildByName("render-scene", {});
            }
            this.node.broadcastMessage("resizeBuffer", {
                widthPowerOf2: newSizes.width,
                heightPowerOf2: newSizes.height,
                width: this._viewportCache.Width,
                height: this._viewportCache.Height,
                buffers: this._buffers
            });
            this.node.broadcastMessage("bufferUpdated", {
                buffers: this._buffers
            });
        }
    }, {
        key: "$renderViewport",
        value: function $renderViewport(args) {
            this.node.broadcastMessage("render", {
                camera: this._camera,
                viewport: this._viewportCache,
                buffers: this._buffers,
                loopIndex: args.loopIndex
            });
        }
    }, {
        key: "_getSizePowerOf2",
        value: function _getSizePowerOf2(width, height) {
            var nw = Math.pow(2, Math.log(width) / Math.LN2 | 0); // largest 2^n integer that does not exceed s
            var nh = Math.pow(2, Math.log(height) / Math.LN2 | 0); // largest 2^n integer that does not exceed s
            return {
                width: nw,
                height: nh
            };
        }
    }]);
    return RendererComponent;
}(Component);

RendererComponent.attributes = {
    camera: {
        converter: "Component",
        defaultValue: "camera",
        target: "Camera"
    },
    viewport: {
        converter: "Viewport",
        defaultValue: "auto"
    }
};

var RendererManagerComponent = function (_Component19) {
    (0, _inherits3.default)(RendererManagerComponent, _Component19);

    function RendererManagerComponent() {
        (0, _classCallCheck3.default)(this, RendererManagerComponent);
        return (0, _possibleConstructorReturn3.default)(this, (RendererManagerComponent.__proto__ || (0, _getPrototypeOf2.default)(RendererManagerComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(RendererManagerComponent, [{
        key: "$awake",
        value: function $awake() {
            this.getAttribute("bgColor").boundTo("_bgColor");
            this.getAttribute("clearDepth").boundTo("_clearDepth");
        }
    }, {
        key: "$mount",
        value: function $mount() {
            this.gl = this.companion.get("gl");
        }
    }, {
        key: "$treeInitialized",
        value: function $treeInitialized() {
            this.node.getComponent("LoopManager").register(this.onloop.bind(this), 1000);
            if (this.getValue("complementRenderer") && this.node.getChildrenByNodeName("renderer").length === 0) {
                this.node.addChildByName("renderer", {});
            }
        }
    }, {
        key: "onloop",
        value: function onloop(loopIndex) {
            if (this.enabled) {
                var c = this._bgColor;
                this.gl.clearColor(c.R, c.G, c.B, c.A);
                this.gl.clearDepth(this._clearDepth);
                this.gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT | WebGLRenderingContext.DEPTH_BUFFER_BIT);
                this.node.broadcastMessage(1, "renderViewport", { loopIndex: loopIndex });
            }
        }
    }]);
    return RendererManagerComponent;
}(Component);

RendererManagerComponent.attributes = {
    bgColor: {
        defaultValue: new Color4(0, 0, 0, 0),
        converter: "Color4"
    },
    clearDepth: {
        defaultValue: 1.0,
        converter: "Number"
    },
    complementRenderer: {
        defaultValue: true,
        converter: "Boolean"
    }
};

var FrameBuffer = function (_ResourceBase6) {
    (0, _inherits3.default)(FrameBuffer, _ResourceBase6);

    function FrameBuffer(gl) {
        (0, _classCallCheck3.default)(this, FrameBuffer);

        var _this85 = (0, _possibleConstructorReturn3.default)(this, (FrameBuffer.__proto__ || (0, _getPrototypeOf2.default)(FrameBuffer)).call(this, gl));

        _this85.fbo = gl.createFramebuffer();
        return _this85;
    }

    (0, _createClass3.default)(FrameBuffer, [{
        key: "update",
        value: function update(boundTo, level, bindIndex) {
            this.gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, this.fbo);
            if (boundTo instanceof Texture2D) {
                if (typeof bindIndex === "undefined") {
                    bindIndex = 0;
                }
                if (typeof level === "undefined") {
                    level = 0;
                }
                this.gl.framebufferTexture2D(WebGLRenderingContext.FRAMEBUFFER, WebGLRenderingContext.COLOR_ATTACHMENT0 + bindIndex, WebGLRenderingContext.TEXTURE_2D, boundTo.texture, level);
                if (this.gl.checkFramebufferStatus(WebGLRenderingContext.FRAMEBUFFER) !== WebGLRenderingContext.FRAMEBUFFER_COMPLETE) {
                    throw new Error("INCOMPLETE framebuffer");
                }
            } else if (boundTo instanceof RenderBuffer) {
                var registerTarget = level;
                if (typeof level === "undefined") {
                    registerTarget = WebGLRenderingContext.DEPTH_ATTACHMENT;
                }
                this.gl.framebufferRenderbuffer(WebGLRenderingContext.FRAMEBUFFER, registerTarget, WebGLRenderingContext.RENDERBUFFER, boundTo.renderBuffer);
            }
            this.gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null);
        }
    }, {
        key: "bind",
        value: function bind() {
            this.gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, this.fbo);
        }
    }, {
        key: "destroy",
        value: function destroy() {
            (0, _get3.default)(FrameBuffer.prototype.__proto__ || (0, _getPrototypeOf2.default)(FrameBuffer.prototype), "destroy", this).call(this);
            this.gl.deleteFramebuffer(this.fbo);
        }
    }]);
    return FrameBuffer;
}(ResourceBase);

var RenderQuadComponent = function (_Component20) {
    (0, _inherits3.default)(RenderQuadComponent, _Component20);

    function RenderQuadComponent() {
        (0, _classCallCheck3.default)(this, RenderQuadComponent);
        return (0, _possibleConstructorReturn3.default)(this, (RenderQuadComponent.__proto__ || (0, _getPrototypeOf2.default)(RenderQuadComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(RenderQuadComponent, [{
        key: "$awake",
        value: function $awake() {
            this.getAttribute("targetBuffer").boundTo("_targetBuffer");
            this.getAttribute("clearColor").boundTo("_clearColor");
            this.getAttribute("clearColorEnabled").boundTo("_clearColorEnabled");
            this.getAttribute("clearDepthEnabled").boundTo("_clearDepthEnabled");
            this.getAttribute("clearDepth").boundTo("_clearDepth");
        }
    }, {
        key: "$mount",
        value: function $mount() {
            this._gl = this.companion.get("gl");
            this._canvas = this.companion.get("canvasElement");
            var gr = this.companion.get("GeometryRegistory");
            this._geom = gr.getGeometry("quad");
            this._materialContainer = this.node.getComponent("MaterialContainer");
        }
    }, {
        key: "$bufferUpdated",
        value: function $bufferUpdated(args) {
            var out = this.getValue("out");
            if (out !== "default") {
                this._fbo = new FrameBuffer(this.companion.get("gl"));
                this._fbo.update(args.buffers[out]);
            }
            var depthBuffer = this.getValue("depthBuffer");
            if (depthBuffer && this._fbo) {
                this._fbo.update(args.buffers[depthBuffer]);
            }
        }
    }, {
        key: "$render",
        value: function $render(args) {
            if (!this._materialContainer.ready) {
                return;
            }
            // bound render target
            if (this._fbo) {
                this._fbo.bind();
                this._gl.viewport(0, 0, args.viewport.Width, args.viewport.Height);
            } else {
                this._gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null);
                this._gl.viewport(args.viewport.Left, this._canvas.height - args.viewport.Bottom, args.viewport.Width, args.viewport.Height);
            }
            // clear buffer if needed
            if (this._fbo && this._clearColorEnabled) {
                this._gl.clearColor(this._clearColor.R, this._clearColor.G, this._clearColor.B, this._clearColor.A);
                this._gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
            }
            if (this._clearDepthEnabled) {
                this._gl.clearDepth(this._clearDepth);
                this._gl.clear(WebGLRenderingContext.DEPTH_BUFFER_BIT);
            }
            // make rendering argument
            var renderArgs = {
                targetBuffer: this._targetBuffer,
                geometry: this._geom,
                attributeValues: {},
                camera: null,
                transform: null,
                buffers: args.buffers,
                viewport: args.viewport,
                defaultTexture: this.companion.get("defaultTexture")
            };
            renderArgs.attributeValues = this._materialContainer.materialArgs;
            // do render
            this._materialContainer.material.draw(renderArgs);
            this._gl.flush();
        }
    }]);
    return RenderQuadComponent;
}(Component);

RenderQuadComponent.attributes = {
    out: {
        defaultValue: "default",
        converter: "String"
    },
    depthBuffer: {
        defaultValue: undefined,
        converter: "String"
    },
    targetBuffer: {
        defaultValue: "default",
        converter: "String"
    },
    clearColor: {
        defaultValue: "#0000",
        converter: "Color4"
    },
    clearColorEnabled: {
        defaultValue: true,
        converter: "Boolean"
    },
    clearDepthEnabled: {
        defaultValue: true,
        converter: "Boolean"
    },
    clearDepth: {
        defaultValue: 1.0,
        converter: "Number"
    }
};

var RenderSceneComponent = function (_Component21) {
    (0, _inherits3.default)(RenderSceneComponent, _Component21);

    function RenderSceneComponent() {
        (0, _classCallCheck3.default)(this, RenderSceneComponent);
        return (0, _possibleConstructorReturn3.default)(this, (RenderSceneComponent.__proto__ || (0, _getPrototypeOf2.default)(RenderSceneComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(RenderSceneComponent, [{
        key: "$awake",

        // messages
        value: function $awake() {
            this.getAttribute("layer").boundTo("_layer");
            this.getAttribute("clearColor").boundTo("_clearColor");
            this.getAttribute("clearColorEnabled").boundTo("_clearColorEnabled");
            this.getAttribute("clearDepthEnabled").boundTo("_clearDepthEnabled");
            this.getAttribute("clearDepth").boundTo("_clearDepth");
            this.getAttribute("camera").boundTo("_camera");
        }
    }, {
        key: "$mount",
        value: function $mount() {
            this._gl = this.companion.get("gl");
            this._canvas = this.companion.get("canvasElement");
            this._materialContainer = this.node.getComponent("MaterialContainer");
        }
    }, {
        key: "$bufferUpdated",
        value: function $bufferUpdated(args) {
            var out = this.getValue("out");
            if (out !== "default") {
                this._fbo = new FrameBuffer(this.companion.get("gl"));
                this._fbo.update(args.buffers[out]);
            }
            var depthBuffer = this.getValue("depthBuffer");
            if (depthBuffer && this._fbo) {
                this._fbo.update(args.buffers[depthBuffer]);
            }
        }
    }, {
        key: "$render",
        value: function $render(args) {
            var camera = this._camera ? this._camera : args.camera;
            if (!camera) {
                return;
            }
            if (this._fbo) {
                this._fbo.bind();
                this._gl.viewport(0, 0, args.viewport.Width, args.viewport.Height);
            } else {
                this._gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null);
                this._gl.viewport(args.viewport.Left, this._canvas.height - args.viewport.Bottom, args.viewport.Width, args.viewport.Height);
            }
            // clear buffer if needed
            if (this._fbo && this._clearColorEnabled) {
                this._gl.clearColor(this._clearColor.R, this._clearColor.G, this._clearColor.B, this._clearColor.A);
                this._gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
            }
            if (this._clearDepthEnabled) {
                this._gl.clearDepth(this._clearDepth);
                this._gl.clear(WebGLRenderingContext.DEPTH_BUFFER_BIT);
            }
            args.camera.updateContainedScene(args.loopIndex);
            var useMaterial = this._materialContainer.useMaterial;
            args.camera.renderScene({
                caller: this,
                camera: camera,
                buffers: args.buffers,
                layer: this._layer,
                viewport: args.viewport,
                material: useMaterial ? this._materialContainer.material : undefined,
                materialArgs: useMaterial ? this._materialContainer.material : undefined,
                loopIndex: args.loopIndex
            });
        }
    }]);
    return RenderSceneComponent;
}(Component);

RenderSceneComponent.attributes = {
    layer: {
        converter: "String",
        defaultValue: "default"
    },
    depthBuffer: {
        defaultValue: undefined,
        converter: "String"
    },
    out: {
        converter: "String",
        defaultValue: "default"
    },
    clearColor: {
        defaultValue: "#0000",
        converter: "Color4"
    },
    clearColorEnabled: {
        defaultValue: true,
        converter: "Boolean"
    },
    clearDepthEnabled: {
        defaultValue: true,
        converter: "Boolean"
    },
    clearDepth: {
        defaultValue: 1.0,
        converter: "Number"
    },
    camera: {
        defaultValue: undefined,
        converter: "Component",
        target: "Camera"
    }
};

var TextureBufferComponent = function (_Component22) {
    (0, _inherits3.default)(TextureBufferComponent, _Component22);

    function TextureBufferComponent() {
        (0, _classCallCheck3.default)(this, TextureBufferComponent);
        return (0, _possibleConstructorReturn3.default)(this, (TextureBufferComponent.__proto__ || (0, _getPrototypeOf2.default)(TextureBufferComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(TextureBufferComponent, [{
        key: "$mount",
        value: function $mount() {
            this.buffer = new Texture2D(this.companion.get("gl"));
        }
    }, {
        key: "$unmount",
        value: function $unmount() {
            this.buffer.destroy();
            this.buffer = null;
        }
    }, {
        key: "$resizeBuffer",
        value: function $resizeBuffer(arg) {
            if (!this.getValue("name")) {
                throw new Error("Attribute 'name' must be specified.");
            }
            this.buffer.update(0, arg.widthPowerOf2, arg.heightPowerOf2, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, null);
            arg.buffers[this.getValue("name")] = this.buffer;
        }
    }]);
    return TextureBufferComponent;
}(Component);

TextureBufferComponent.attributes = {
    name: {
        converter: "String",
        defaultValue: undefined
    },
    format: {
        converter: "Enum",
        defaultValue: WebGLRenderingContext.RGBA,
        table: {
            RGBA: WebGLRenderingContext.RGBA,
            RGB: WebGLRenderingContext.RGB
        }
    }
};

var ImageResolver = function (_ExternalResourceReso2) {
    (0, _inherits3.default)(ImageResolver, _ExternalResourceReso2);

    function ImageResolver() {
        (0, _classCallCheck3.default)(this, ImageResolver);
        return (0, _possibleConstructorReturn3.default)(this, (ImageResolver.__proto__ || (0, _getPrototypeOf2.default)(ImageResolver)).apply(this, arguments));
    }

    (0, _createClass3.default)(ImageResolver, [{
        key: "resolve",
        value: function resolve(path) {
            return (0, _get3.default)(ImageResolver.prototype.__proto__ || (0, _getPrototypeOf2.default)(ImageResolver.prototype), "resolve", this).call(this, path, function (abs) {
                return new _promise2.default(function (resolve, reject) {
                    var imgTag = new Image();
                    imgTag.onload = function () {
                        resolve(imgTag);
                    };
                    imgTag.onerror = function (e) {
                        reject(e);
                    };
                    imgTag.src = abs;
                });
            });
        }
    }]);
    return ImageResolver;
}(ExternalResourceResolver);

var ImageResolver$1 = new ImageResolver();

var TextureComponent = function (_Component23) {
    (0, _inherits3.default)(TextureComponent, _Component23);

    function TextureComponent() {
        (0, _classCallCheck3.default)(this, TextureComponent);
        return (0, _possibleConstructorReturn3.default)(this, (TextureComponent.__proto__ || (0, _getPrototypeOf2.default)(TextureComponent)).apply(this, arguments));
    }

    (0, _createClass3.default)(TextureComponent, [{
        key: "$mount",
        value: function $mount() {
            var _this91 = this;

            var src = this.getValue("src");
            this._texture = new Texture2D(this.companion.get("gl"));
            this._texture.magFilter = this.getValue("magFilter");
            this._texture.minFilter = this.getValue("minFilter");
            this._texture.wrapT = this.getValue("wrapT");
            this._texture.wrapS = this.getValue("wrapS");
            this.attributes.get("magFilter").addObserver(function (v) {
                return _this91._texture.magFilter = v.Value;
            });
            this.attributes.get("minFilter").addObserver(function (v) {
                return _this91._texture.minFilter = v.Value;
            });
            this.attributes.get("wrapS").addObserver(function (v) {
                return _this91._texture.wrapS = v.Value;
            });
            this.attributes.get("wrapT").addObserver(function (v) {
                return _this91._texture.wrapT = v.Value;
            });
            if (src) {
                this._loadTask(src);
            }
        }
    }, {
        key: "_loadTask",
        value: function _loadTask(src) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee26() {
                var img;
                return _regenerator2.default.wrap(function _callee26$(_context101) {
                    while (1) {
                        switch (_context101.prev = _context101.next) {
                            case 0:
                                _context101.next = 2;
                                return ImageResolver$1.resolve(src);

                            case 2:
                                img = _context101.sent;

                                this._texture.update(img);

                            case 4:
                            case "end":
                                return _context101.stop();
                        }
                    }
                }, _callee26, this);
            }));
        }
    }]);
    return TextureComponent;
}(Component);

TextureComponent.attributes = {
    src: {
        converter: "String",
        defaultValue: undefined
    },
    minFilter: {
        converter: "Enum",
        defaultValue: "LINEAR",
        table: {
            LINEAR: WebGLRenderingContext.LINEAR,
            NEAREST: WebGLRenderingContext.NEAREST,
            NEAREST_MIPMAP_NEAREST: WebGLRenderingContext.NEAREST_MIPMAP_NEAREST,
            NEAREST_MIPMAP_LINEAR: WebGLRenderingContext.NEAREST_MIPMAP_LINEAR,
            LINEAR_MIPMAP_NEAREST: WebGLRenderingContext.LINEAR_MIPMAP_NEAREST,
            LINEAR_MIPMAP_LINEAR: WebGLRenderingContext.LINEAR_MIPMAP_LINEAR
        }
    },
    magFilter: {
        converter: "Enum",
        defaultValue: "LINEAR",
        table: {
            LINEAR: WebGLRenderingContext.LINEAR,
            NEAREST: WebGLRenderingContext.NEAREST
        }
    },
    wrapS: {
        converter: "Enum",
        defaultValue: "REPEAT",
        table: {
            REPEAT: WebGLRenderingContext.REPEAT,
            MIRRORED_REPEAT: WebGLRenderingContext.MIRRORED_REPEAT,
            CLAMP_TO_EDGE: WebGLRenderingContext.CLAMP_TO_EDGE
        }
    },
    wrapT: {
        converter: "Enum",
        defaultValue: "REPEAT",
        table: {
            REPEAT: WebGLRenderingContext.REPEAT,
            MIRRORED_REPEAT: WebGLRenderingContext.MIRRORED_REPEAT,
            CLAMP_TO_EDGE: WebGLRenderingContext.CLAMP_TO_EDGE
        }
    }
};

/**
 * Provides object transformation like translation,rotation,scaling.
 */

var TransformComponent = function (_Component24) {
    (0, _inherits3.default)(TransformComponent, _Component24);

    function TransformComponent() {
        var _ref12;

        (0, _classCallCheck3.default)(this, TransformComponent);

        for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
            args[_key12] = arguments[_key12];
        }

        /**
         * Local transform matrix representing scaling,rotation and translation of attached object.
         * @return {[type]} [description]
         */
        var _this92 = (0, _possibleConstructorReturn3.default)(this, (_ref12 = TransformComponent.__proto__ || (0, _getPrototypeOf2.default)(TransformComponent)).call.apply(_ref12, [this].concat(args)));

        _this92.localTransform = new Matrix();
        /**
         * Global transform that consider parent transform and local transform
         * @return {[type]} [description]
         */
        _this92.globalTransform = new Matrix();
        /**
         * The children transform should be notified when this transform was updated.
         * @type {TransformComponent[]}
         */
        _this92._children = [];
        /**
         * Calculation cache to
         * @return {[type]} [description]
         */
        _this92._cachePVM = new Matrix();
        _this92._cacheVM = new Matrix();
        /**
         * Cache of forward direction of this object
         */
        _this92._forward = new Vector3([0, 0, -1, 0]);
        /**
         * Cache of up direction of this object.
         */
        _this92._up = new Vector3([0, 1, 0, 0]);
        /**
         * Cache of right direction of this object.
         */
        _this92._right = new Vector3([1, 0, 0, 0]);
        _this92._globalPosition = new Vector3([0, 0, 0]);
        _this92._globalScale = new Vector3([1, 1, 1]);
        return _this92;
    }

    (0, _createClass3.default)(TransformComponent, [{
        key: "calcPVM",
        value: function calcPVM(camera) {
            mat4.mul(this._cachePVM.rawElements, camera.getProjectionViewMatrix().rawElements, this.globalTransform.rawElements);
            return this._cachePVM;
        }
    }, {
        key: "calcVM",
        value: function calcVM(camera) {
            mat4.mul(this._cacheVM.rawElements, camera.getViewMatrix().rawElements, this.globalTransform.rawElements);
            return this._cacheVM;
        }
    }, {
        key: "$awake",
        value: function $awake() {
            var _this93 = this;

            // register observers
            this.attributes.get("position").addObserver(function () {
                _this93._localPosition = _this93.attributes.get("position").Value;
                _this93.updateTransform();
            });
            this.attributes.get("rotation").addObserver(function () {
                _this93._localRotation = _this93.attributes.get("rotation").Value;
                _this93.updateTransform();
            });
            this.attributes.get("scale").addObserver(function () {
                _this93._localScale = _this93.attributes.get("scale").Value;
                _this93.updateTransform();
            });
            // assign attribute values to field
            this._localPosition = this.attributes.get("position").Value;
            this._localRotation = this.attributes.get("rotation").Value;
            this._localScale = this.attributes.get("scale").Value;
            this.updateTransform();
        }
    }, {
        key: "$mount",
        value: function $mount() {
            this._parentTransform = this.node.parent.getComponent("Transform");
            if (this._parentTransform) {
                this._parentTransform._children.push(this);
            }
            this.updateTransform();
        }
    }, {
        key: "$unmount",
        value: function $unmount() {
            if (this._parentTransform) {
                this._parentTransform._children.splice(this._parentTransform._children.indexOf(this), 1);
                this._parentTransform = null;
            }
        }
        /**
         * update local transform and global transform.
         * This need to be called if you manually edit raw elements of scale,position or rotation to recalculate transform matricies.
         */

    }, {
        key: "updateTransform",
        value: function updateTransform() {
            mat4.fromRotationTranslationScale(this.localTransform.rawElements, this._localRotation.rawElements, this._localPosition.rawElements, this._localScale.rawElements);
            this.updateGlobalTransform();
        }
        /**
         * Update global transoform.
         */

    }, {
        key: "updateGlobalTransform",
        value: function updateGlobalTransform() {
            if (!this._parentTransform) {
                mat4.copy(this.globalTransform.rawElements, this.localTransform.rawElements);
            } else {
                mat4.mul(this.globalTransform.rawElements, this._parentTransform.globalTransform.rawElements, this.localTransform.rawElements);
            }
            this._updateDirections();
            this._updateGlobalProperty();
            this.node.sendMessage("transformUpdated", this);
            this._children.forEach(function (v) {
                return v.updateGlobalTransform();
            });
        }
    }, {
        key: "_updateDirections",
        value: function _updateDirections() {
            vec4.transformMat4(this._forward.rawElements, TransformComponent._forwardBase.rawElements, this.globalTransform.rawElements);
            vec4.transformMat4(this._up.rawElements, TransformComponent._upBase.rawElements, this.globalTransform.rawElements);
            vec4.transformMat4(this._right.rawElements, TransformComponent._rightBase.rawElements, this.globalTransform.rawElements);
        }
    }, {
        key: "_updateGlobalProperty",
        value: function _updateGlobalProperty() {
            if (!this._parentTransform) {
                vec3.copy(this._globalPosition.rawElements, this._localPosition.rawElements);
                vec3.copy(this._globalScale.rawElements, this._localScale.rawElements);
            } else {
                vec3.transformMat4(this._globalPosition.rawElements, this._localPosition.rawElements, this._parentTransform.globalTransform.rawElements);
                vec3.transformMat4(this._globalScale.rawElements, this._localScale.rawElements, this._parentTransform.globalTransform.rawElements); // TODO buggy
            }
        }
    }, {
        key: "globalPosition",
        get: function get() {
            return this._globalPosition;
        }
    }, {
        key: "localPosition",
        get: function get() {
            return this._localPosition;
        },
        set: function set(val) {
            this._localPosition = val;
            this.attributes.get("position").Value = val;
        }
    }, {
        key: "localRotation",
        get: function get() {
            return this._localRotation;
        },
        set: function set(val) {
            this._localRotation = val;
            this.attributes.get("rotation").Value = val;
        }
    }, {
        key: "globalScale",
        get: function get() {
            return this._globalScale;
        }
    }, {
        key: "localScale",
        get: function get() {
            return this._localScale;
        },
        set: function set(val) {
            this._localScale = val;
            this.attributes.get("scale").Value = val;
        }
    }, {
        key: "forward",
        get: function get() {
            return this._forward;
        }
    }, {
        key: "up",
        get: function get() {
            return this._up;
        }
    }, {
        key: "right",
        get: function get() {
            return this._right;
        }
    }]);
    return TransformComponent;
}(Component);

TransformComponent.attributes = {
    "position": {
        converter: "Vector3",
        defaultValue: Vector3.Zero
    },
    "rotation": {
        converter: "Rotation3",
        defaultValue: Quaternion.Identity
    },
    "scale": {
        converter: "Vector3",
        defaultValue: Vector3.One
    }
};
/**
 * Source vector to be multiplied with global transform to calculate forward direction of attached object.
 */
TransformComponent._forwardBase = new Vector4(0, 0, -1, 0);
/**
 * Source vector to be multiplied with global transform to calculate up direction of attached object.
 */
TransformComponent._upBase = new Vector4(0, 1, 0, 0);
/**
 * Source vector to be multiplied with global transform to calculate right direction of attached object.
 */
TransformComponent._rightBase = new Vector4(1, 0, 0, 0);

/**
 * Utility class to parse the arguments of attributes.
 */

var RotationParser = function () {
    function RotationParser() {
        (0, _classCallCheck3.default)(this, RotationParser);
    }

    (0, _createClass3.default)(RotationParser, null, [{
        key: "parseAngle",

        /**
         * Parse angle strings.
         * "p" means Pi. Ex) 3/4 p
         * "d" means degree. if this unit was specified, the argument will be parsed as degree. Ex) 90d
         * @param input the string to parse.
         * @returns {number} parsed angle in radians.
         */
        value: function parseAngle(input) {
            var regex = /^ *(-? *(?:0|[1-9]\d*)(?: *\.\d+)?) *(?:\/ *((?:0|[1-9]\d*)(?: *\.\d+)?))? *(p|prad|deg|d|r|rad)? *$/gm;
            var result = regex.exec(input);
            if (result == null) {
                throw new Error("faild parse Angle string:'" + input + "'");
            }
            var numerator = parseFloat(result[1]);
            if (result[2]) {
                numerator /= parseFloat(result[2]);
            }
            var unit = result[3];
            if (unit == null) {
                unit = "d";
            }
            if (unit === "r" || unit === "rad") {
                return numerator;
            }
            if (unit === "p" || unit === "prad") {
                return numerator * Math.PI;
            }
            return numerator / 180 * Math.PI;
        }
        /**
         * Parse angle string in 3D.
         * "p" means Pi. Ex) 3/4 p
         * "d" means degree. if this unit was specified, the argument will be parsed as degree. Ex) 90d
         * "eular(x,y,z)" means rotation in eular. This means Z-X-Y rotation like Unity.
         * "axis(angle,x,y,z)" means rotation around specified axis. This means angle radians will be rotated around the axis (x,y,z).
         * This angle can be specified with the character "p" or "d".
         * "x(angle)","y(angle)" or "z(angle)" means rotation around unit axis.
         * This angle can be specified with the character "p" or "d".
         * @param input the string to be parsed as angle in 3D.
         * @returns {Quaternion} parsed rotation in Quaternion.
         */

    }, {
        key: "parseRotation3D",
        value: function parseRotation3D(input) {
            var reg1 = /^ *(x|y|z) *\(([^\(\)]+)\) *$/gm;
            var reg2 = /^ *axis *\(([^\(\),]+),([^\(\),]+),([^\(\),]+),([^\(\),]+)\) *$/gm;
            var reg3 = /^ *([^\(\),]+),([^\(\),]+),([^\(\),]+) *$/gm;
            var result = reg1.exec(input);
            if (result) {
                if (result[1] === "x") {
                    return Quaternion.angleAxis(RotationParser.parseAngle(result[2]), Vector3.XUnit);
                }
                if (result[1] === "y") {
                    return Quaternion.angleAxis(RotationParser.parseAngle(result[2]), Vector3.YUnit);
                }
                if (result[1] === "z") {
                    return Quaternion.angleAxis(RotationParser.parseAngle(result[2]), Vector3.ZUnit);
                }
            }
            var res2 = reg2.exec(input);
            if (res2) {
                var rotation = RotationParser.parseAngle(res2[1]);
                var x = parseFloat(res2[2]);
                var y = parseFloat(res2[3]);
                var z = parseFloat(res2[4]);
                return Quaternion.angleAxis(rotation, new Vector3(x, y, z));
            }
            var res3 = reg3.exec(input);
            if (res3) {
                return Quaternion.euler(RotationParser.parseAngle(res3[1]), RotationParser.parseAngle(res3[2]), RotationParser.parseAngle(res3[3]));
            }
            throw new Error("Unknown format for rotation3D:'" + input + "'");
        }
    }]);
    return RotationParser;
}();

function Angle2DConverter(val) {
    return RotationParser.parseAngle(val);
}

function BooleanConverter$2(val) {
    if (typeof val === "boolean") {
        return val;
    } else if (typeof val === "string") {
        switch (val) {
            case "true":
                return true;
            case "false":
                return false;
            default:
                throw new Error("Invalid string " + val + " for parsing as boolean");
        }
    }
    throw new Error("Parsing failed");
}

function CanvasSizeConverter(val) {
    if (val === "fit") {
        return {
            mode: "fit"
        };
    }
    if (typeof val === "string") {
        var matched = /aspect\(([\d+(?.\d*)?]+)\)/.exec(val);
        if (matched) {
            return {
                mode: "aspect",
                aspect: (0, _parseFloat2.default)(matched[1])
            };
        }
    }
    return {
        mode: "manual",
        size: (0, _parseFloat2.default)(val)
    };
}

function Color3Converter(val) {
    if (val instanceof Color3) {
        return val;
    } else if (val instanceof Color4) {
        return new Color3(val.R, val.G, val.B);
    } else if (typeof val === "string") {
        return Color3.parse(val);
    } else {
        throw new Error(val + " can not be parsed as Color4.");
    }
}

function Color4Converter(val) {
    if (val instanceof Color4) {
        return val;
    } else if (val instanceof Color3) {
        return new Color4(val.R, val.G, val.B, 1.0);
    } else if (typeof val === "string") {
        return Color4.parse(val);
    } else {
        throw new Error(val + " can not be parsed as Color4.");
    }
}

function ComponentConverter(val) {
    if (!this.declaration["target"]) {
        throw new Error("Component converter require to be specified target");
    }
    if (val instanceof GomlNode) {
        return val.getComponent(this.declaration["target"]);
    } else if (val instanceof Component) {
        if (val.name === this.declaration["target"]) {
            return val; // check component type?
        } else {
            throw new Error("Specified component must be " + this.declaration["target"]);
        }
    } else {
        return this.tree(val)(this.declaration["target"]).get(0, 0, 0);
    }
}

function EnumConverter(val) {
    if (!this.declaration["table"]) {
        throw new Error("Enum converter needs to be specified table in attribute dictionary");
    }
    if (typeof val === "number") {
        return val;
    }
    if (typeof val === "string") {
        var result = this.declaration["table"][val];
        if (!result) {
            throw new Error("Specified value is not exisiting in the relation table");
        } else {
            return result;
        }
    }
}

function GeometryConverter(val) {
    if (typeof val === "string") {
        return this.companion.get("GeometryRegistory").getGeometry(val);
    } else if (val instanceof Geometry) {
        return val;
    }
}

function MaterialConverter(val) {
    if (typeof val === "string") {
        var regex = /\s*new\s*\(\s*([a-zA-Z\d\-]+)\s*\)/;
        var regexResult = void 0;
        if (regexResult = regex.exec(val)) {
            this.component[this.declaration["componentBoundTo"]] = null;
            return this.companion.get("MaterialFactory").instanciate(regexResult[1]);
        } else {
            var mc = this.tree(val)("Material").get();
            this.component[this.declaration["componentBoundTo"]] = mc;
            return mc.materialPromise;
        }
    }
}

function MaterialTextureConverter(val) {
    var _this94 = this;

    if (val instanceof Texture2D) {
        return function () {
            return val;
        };
    }
    if (typeof val === "string") {
        var _ret12 = function () {
            var queryRegex = /^query\((.*)\)$/m;
            var regexResult = void 0;
            // Query texture element
            if (regexResult = queryRegex.exec(val)) {
                var queried = _this94.tree(regexResult[1]);
                throw new Error("Not implemeneted yet");
            }
            // from backbuffer
            var backbufferRegex = /^backbuffer\((.*)\)$/m;
            if (regexResult = backbufferRegex.exec(val)) {
                return {
                    v: function v(buffers) {
                        return buffers[regexResult[1]];
                    }
                };
            }
            var tex = new Texture2D(_this94.companion.get("gl"));
            ImageResolver$1.resolve(val).then(function (t) {
                tex.update(t);
            });
            _this94.companion.get("loader").register(tex.validPromise);
            return {
                v: function v() {
                    return tex;
                }
            };
        }();

        if ((typeof _ret12 === "undefined" ? "undefined" : (0, _typeof3.default)(_ret12)) === "object") return _ret12.v;
    }
}

function NumberArrayConverter(val) {
    if (val instanceof Array) {
        return val;
    }
    if (typeof val === "string") {
        var splitted = val.split(",");
        return splitted.map(function (s) {
            return (0, _parseFloat2.default)(s);
        });
    }
}

function NumberConverter(val) {
    return (0, _parseFloat2.default)(val);
}

function ObjectConverter(val) {
    return val;
}

function Rotation3Converter(val) {
    if (val instanceof Quaternion) {
        return val;
    }
    return RotationParser.parseRotation3D(val);
}

function StringArrayConverter$2(val) {
    if (Array.isArray(val)) {
        return val; // should we check the elements are actualy string?
    } else if (typeof val === "string") {
        var splitted = val.split(",");
        return splitted.map(function (s) {
            return s;
        });
    }
}

function StringConverter$2(val) {
    if (typeof val === "string") {
        return val;
    } else if (typeof val === "undefined") {
        return val;
    } else if (typeof val.toString === "function") {
        return val.toString();
    }
}

function Texture2DConverter(val) {
    var _this95 = this;

    if (typeof val === "string") {
        var regex = /^query\((.*)\)$/m;
        var regexResult = void 0;
        if (regexResult = regex.exec(val)) {
            var queried = this.tree(regexResult[1]);
        } else {
            var _ret13 = function () {
                var tex = new Texture2D(_this95.companion.get("gl"));
                ImageResolver$1.resolve(val).then(function (t) {
                    tex.update(t);
                });
                return {
                    v: tex
                };
            }();

            if ((typeof _ret13 === "undefined" ? "undefined" : (0, _typeof3.default)(_ret13)) === "object") return _ret13.v;
        }
    }
}

function Vector2Converter(val) {
    if (val instanceof Vector2) {
        return val;
    } else {
        return Vector2.parse(val);
    }
}

function Vector3Converter(val) {
    if (val instanceof Vector3) {
        return val;
    } else {
        return Vector3.parse(val);
    }
}

function Vector4Converter(val) {
    if (val instanceof Vector4) {
        return val;
    } else {
        return Vector4.parse(val);
    }
}

function _toPixel(parentSize, rep) {
    var regex = /(\d+)\s*%/;
    var regexResult = void 0;
    if (regexResult = regex.exec(rep)) {
        var percentage = (0, _parseFloat2.default)(regexResult[1]);
        return Math.floor(parentSize * percentage * 0.01);
    } else {
        return Math.floor((0, _parseFloat2.default)(rep));
    }
}
function ViewportConverter(val) {
    if (val instanceof Rectangle) {
        return function () {
            return val;
        };
    }
    if (typeof val === "string") {
        if (val === "auto") {
            return function (canvas) {
                return new Rectangle(0, 0, canvas.width, canvas.height);
            };
        } else {
            var _ret14 = function () {
                var sizes = val.split(",");
                if (sizes.length !== 4) {
                    throw new Error("Invalid viewport size was specified.");
                } else {
                    return {
                        v: function v(canvas) {
                            return new Rectangle(_toPixel(canvas.width, sizes[0]), _toPixel(canvas.height, sizes[1]), _toPixel(canvas.width, sizes[2]), _toPixel(canvas.height, sizes[3]));
                        }
                    };
                }
            }();

            if ((typeof _ret14 === "undefined" ? "undefined" : (0, _typeof3.default)(_ret14)) === "object") return _ret14.v;
        }
    }
    throw new Error(val + " could not be parsed");
}

obtainGomlInterface.register(function () {
    return __awaiter(undefined, void 0, void 0, _regenerator2.default.mark(function _callee27() {
        var _$ns;

        return _regenerator2.default.wrap(function _callee27$(_context102) {
            while (1) {
                switch (_context102.prev = _context102.next) {
                    case 0:
                        _$ns = obtainGomlInterface.ns("HTTP://GRIMOIRE.GL/NS/DEFAULT");

                        obtainGomlInterface.registerComponent(_$ns("AssetLoadingManager"), AssetLoadingManagerComponent);
                        obtainGomlInterface.registerComponent(_$ns("Camera"), CameraComponent);
                        obtainGomlInterface.registerComponent(_$ns("CanvasInitializer"), CanvasInitializerComponent);
                        obtainGomlInterface.registerComponent(_$ns("Fullscreen"), FullscreenComponent);
                        obtainGomlInterface.registerComponent(_$ns("Geometry"), GeometryComponent);
                        obtainGomlInterface.registerComponent(_$ns("GeometryRegistory"), GeometryRegistoryComponent);
                        obtainGomlInterface.registerComponent(_$ns("HTMLBinder"), HTMLBinderComponent);
                        obtainGomlInterface.registerComponent(_$ns("LoopManager"), LoopManagerComponent);
                        obtainGomlInterface.registerComponent(_$ns("Material"), MaterialComponent);
                        obtainGomlInterface.registerComponent(_$ns("MaterialContainer"), MaterialContainerComponent);
                        obtainGomlInterface.registerComponent(_$ns("MaterialImporter"), MaterialImporterComponent);
                        obtainGomlInterface.registerComponent(_$ns("MaterialManager"), MaterialManagerComponent);
                        obtainGomlInterface.registerComponent(_$ns("MeshRenderer"), MeshRenderer);
                        obtainGomlInterface.registerComponent(_$ns("MouseCameraControl"), MouseCameraControlComponent);
                        obtainGomlInterface.registerComponent(_$ns("RenderBuffer"), RenderBufferComponent);
                        obtainGomlInterface.registerComponent(_$ns("Renderer"), RendererComponent);
                        obtainGomlInterface.registerComponent(_$ns("RendererManager"), RendererManagerComponent);
                        obtainGomlInterface.registerComponent(_$ns("RenderQuad"), RenderQuadComponent);
                        obtainGomlInterface.registerComponent(_$ns("RenderScene"), RenderSceneComponent);
                        obtainGomlInterface.registerComponent(_$ns("Scene"), SceneComponent);
                        obtainGomlInterface.registerComponent(_$ns("TextureBuffer"), TextureBufferComponent);
                        obtainGomlInterface.registerComponent(_$ns("Texture"), TextureComponent);
                        obtainGomlInterface.registerComponent(_$ns("Transform"), TransformComponent);
                        obtainGomlInterface.registerConverter(_$ns("Angle2D"), Angle2DConverter);
                        obtainGomlInterface.registerConverter(_$ns("Boolean"), BooleanConverter$2);
                        obtainGomlInterface.registerConverter(_$ns("CanvasSize"), CanvasSizeConverter);
                        obtainGomlInterface.registerConverter(_$ns("Color3"), Color3Converter);
                        obtainGomlInterface.registerConverter(_$ns("Color4"), Color4Converter);
                        obtainGomlInterface.registerConverter(_$ns("Component"), ComponentConverter);
                        obtainGomlInterface.registerConverter(_$ns("Enum"), EnumConverter);
                        obtainGomlInterface.registerConverter(_$ns("Geometry"), GeometryConverter);
                        obtainGomlInterface.registerConverter(_$ns("Material"), MaterialConverter);
                        obtainGomlInterface.registerConverter(_$ns("MaterialTexture"), MaterialTextureConverter);
                        obtainGomlInterface.registerConverter(_$ns("NumberArray"), NumberArrayConverter);
                        obtainGomlInterface.registerConverter(_$ns("Number"), NumberConverter);
                        obtainGomlInterface.registerConverter(_$ns("Object"), ObjectConverter);
                        obtainGomlInterface.registerConverter(_$ns("Rotation3"), Rotation3Converter);
                        obtainGomlInterface.registerConverter(_$ns("StringArray"), StringArrayConverter$2);
                        obtainGomlInterface.registerConverter(_$ns("String"), StringConverter$2);
                        obtainGomlInterface.registerConverter(_$ns("Texture2D"), Texture2DConverter);
                        obtainGomlInterface.registerConverter(_$ns("Vector2"), Vector2Converter);
                        obtainGomlInterface.registerConverter(_$ns("Vector3"), Vector3Converter);
                        obtainGomlInterface.registerConverter(_$ns("Vector4"), Vector4Converter);
                        obtainGomlInterface.registerConverter(_$ns("Viewport"), ViewportConverter);
                        obtainGomlInterface.registerNode("goml", ["CanvasInitializer", "LoopManager", "AssetLoadingManager", "GeometryRegistory", "MaterialManager", "RendererManager", "Fullscreen"]);
                        obtainGomlInterface.registerNode("renderer", ["Renderer"]);
                        obtainGomlInterface.registerNode("scene", ["Scene"]);
                        obtainGomlInterface.registerNode("camera", ["Transform", "Camera"]);
                        obtainGomlInterface.registerNode("empty", []);
                        obtainGomlInterface.registerNode("object", ["Transform"]);
                        obtainGomlInterface.registerNode("geometry", ["Geometry"]);
                        obtainGomlInterface.registerNode("texture", ["Texture"]);
                        obtainGomlInterface.registerNode("mesh", ["Transform", "MaterialContainer", "MeshRenderer"]);
                        obtainGomlInterface.registerNode("material", ["Material"]);
                        obtainGomlInterface.registerNode("import-material", ["MaterialImporter"]);
                        obtainGomlInterface.registerNode("texture-buffer", ["TextureBuffer"]);
                        obtainGomlInterface.registerNode("render-buffer", ["RenderBuffer"]);
                        obtainGomlInterface.registerNode("render-scene", ["MaterialContainer", "RenderScene"], {
                            material: null
                        });
                        obtainGomlInterface.registerNode("render-quad", ["MaterialContainer", "RenderQuad"], {
                            material: null
                        });
                        DefaultPrimitives.register();
                        DefaultMaterial.register();

                    case 62:
                    case "end":
                        return _context102.stop();
                }
            }
        }, _callee27, this);
    }));
});


}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":140,"babel-runtime/core-js/get-iterator":1,"babel-runtime/core-js/json/stringify":2,"babel-runtime/core-js/map":3,"babel-runtime/core-js/number/parse-float":4,"babel-runtime/core-js/object/create":5,"babel-runtime/core-js/object/get-own-property-names":8,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/core-js/object/keys":10,"babel-runtime/core-js/object/set-prototype-of":11,"babel-runtime/core-js/promise":12,"babel-runtime/core-js/reflect/own-keys":13,"babel-runtime/core-js/symbol":14,"babel-runtime/helpers/classCallCheck":16,"babel-runtime/helpers/createClass":17,"babel-runtime/helpers/get":18,"babel-runtime/helpers/inherits":19,"babel-runtime/helpers/possibleConstructorReturn":20,"babel-runtime/helpers/typeof":21,"babel-runtime/regenerator":22}]},{},[143]);

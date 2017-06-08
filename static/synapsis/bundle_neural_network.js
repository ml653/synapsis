/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var convnetjs = convnetjs || { REVISION: 'ALPHA' };
(function(global) {
  "use strict";

  // Random number utilities
  var return_v = false;
  var v_val = 0.0;
  var gaussRandom = function() {
    if(return_v) { 
      return_v = false;
      return v_val; 
    }
    var u = 2*Math.random()-1;
    var v = 2*Math.random()-1;
    var r = u*u + v*v;
    if(r == 0 || r > 1) return gaussRandom();
    var c = Math.sqrt(-2*Math.log(r)/r);
    v_val = v*c; // cache this
    return_v = true;
    return u*c;
  }
  var randf = function(a, b) { return Math.random()*(b-a)+a; }
  var randi = function(a, b) { return Math.floor(Math.random()*(b-a)+a); }
  var randn = function(mu, std){ return mu+gaussRandom()*std; }

  // Array utilities
  var zeros = function(n) {
    if(typeof(n)==='undefined' || isNaN(n)) { return []; }
    if(typeof ArrayBuffer === 'undefined') {
      // lacking browser support
      var arr = new Array(n);
      for(var i=0;i<n;i++) { arr[i]= 0; }
      return arr;
    } else {
      return new Float64Array(n);
    }
  }

  var arrContains = function(arr, elt) {
    for(var i=0,n=arr.length;i<n;i++) {
      if(arr[i]===elt) return true;
    }
    return false;
  }

  var arrUnique = function(arr) {
    var b = [];
    for(var i=0,n=arr.length;i<n;i++) {
      if(!arrContains(b, arr[i])) {
        b.push(arr[i]);
      }
    }
    return b;
  }

  // return max and min of a given non-empty array.
  var maxmin = function(w) {
    if(w.length === 0) { return {}; } // ... ;s
    var maxv = w[0];
    var minv = w[0];
    var maxi = 0;
    var mini = 0;
    var n = w.length;
    for(var i=1;i<n;i++) {
      if(w[i] > maxv) { maxv = w[i]; maxi = i; } 
      if(w[i] < minv) { minv = w[i]; mini = i; } 
    }
    return {maxi: maxi, maxv: maxv, mini: mini, minv: minv, dv:maxv-minv};
  }

  // create random permutation of numbers, in range [0...n-1]
  var randperm = function(n) {
    var i = n,
        j = 0,
        temp;
    var array = [];
    for(var q=0;q<n;q++)array[q]=q;
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  // sample from list lst according to probabilities in list probs
  // the two lists are of same size, and probs adds up to 1
  var weightedSample = function(lst, probs) {
    var p = randf(0, 1.0);
    var cumprob = 0.0;
    for(var k=0,n=lst.length;k<n;k++) {
      cumprob += probs[k];
      if(p < cumprob) { return lst[k]; }
    }
  }

  // syntactic sugar function for getting default parameter values
  var getopt = function(opt, field_name, default_value) {
    return typeof opt[field_name] !== 'undefined' ? opt[field_name] : default_value;
  }

  global.randf = randf;
  global.randi = randi;
  global.randn = randn;
  global.zeros = zeros;
  global.maxmin = maxmin;
  global.randperm = randperm;
  global.weightedSample = weightedSample;
  global.arrUnique = arrUnique;
  global.arrContains = arrContains;
  global.getopt = getopt;
  
})(convnetjs);
(function(global) {
  "use strict";

  // Vol is the basic building block of all data in a net.
  // it is essentially just a 3D volume of numbers, with a
  // width (sx), height (sy), and depth (depth).
  // it is used to hold data for all filters, all volumes,
  // all weights, and also stores all gradients w.r.t. 
  // the data. c is optionally a value to initialize the volume
  // with. If c is missing, fills the Vol with random numbers.
  var Vol = function(sx, sy, depth, c) {
    // this is how you check if a variable is an array. Oh, Javascript :)
    if(Object.prototype.toString.call(sx) === '[object Array]') {
      // we were given a list in sx, assume 1D volume and fill it up
      this.sx = 1;
      this.sy = 1;
      this.depth = sx.length;
      // we have to do the following copy because we want to use
      // fast typed arrays, not an ordinary javascript array
      this.w = global.zeros(this.depth);
      this.dw = global.zeros(this.depth);
      for(var i=0;i<this.depth;i++) {
        this.w[i] = sx[i];
      }
    } else {
      // we were given dimensions of the vol
      this.sx = sx;
      this.sy = sy;
      this.depth = depth;
      var n = sx*sy*depth;
      this.w = global.zeros(n);
      this.dw = global.zeros(n);
      if(typeof c === 'undefined') {
        // weight normalization is done to equalize the output
        // variance of every neuron, otherwise neurons with a lot
        // of incoming connections have outputs of larger variance
        var scale = Math.sqrt(1.0/(sx*sy*depth));
        for(var i=0;i<n;i++) { 
          this.w[i] = global.randn(0.0, scale);
        }
      } else {
        for(var i=0;i<n;i++) { 
          this.w[i] = c;
        }
      }
    }
  }

  Vol.prototype = {
    get: function(x, y, d) { 
      var ix=((this.sx * y)+x)*this.depth+d;
      return this.w[ix];
    },
    set: function(x, y, d, v) { 
      var ix=((this.sx * y)+x)*this.depth+d;
      this.w[ix] = v; 
    },
    add: function(x, y, d, v) { 
      var ix=((this.sx * y)+x)*this.depth+d;
      this.w[ix] += v; 
    },
    get_grad: function(x, y, d) { 
      var ix = ((this.sx * y)+x)*this.depth+d;
      return this.dw[ix]; 
    },
    set_grad: function(x, y, d, v) { 
      var ix = ((this.sx * y)+x)*this.depth+d;
      this.dw[ix] = v; 
    },
    add_grad: function(x, y, d, v) { 
      var ix = ((this.sx * y)+x)*this.depth+d;
      this.dw[ix] += v; 
    },
    cloneAndZero: function() { return new Vol(this.sx, this.sy, this.depth, 0.0)},
    clone: function() {
      var V = new Vol(this.sx, this.sy, this.depth, 0.0);
      var n = this.w.length;
      for(var i=0;i<n;i++) { V.w[i] = this.w[i]; }
      return V;
    },
    addFrom: function(V) { for(var k=0;k<this.w.length;k++) { this.w[k] += V.w[k]; }},
    addFromScaled: function(V, a) { for(var k=0;k<this.w.length;k++) { this.w[k] += a*V.w[k]; }},
    setConst: function(a) { for(var k=0;k<this.w.length;k++) { this.w[k] = a; }},

    toJSON: function() {
      // todo: we may want to only save d most significant digits to save space
      var json = {}
      json.sx = this.sx; 
      json.sy = this.sy;
      json.depth = this.depth;
      json.w = this.w;
      return json;
      // we wont back up gradients to save space
    },
    fromJSON: function(json) {
      this.sx = json.sx;
      this.sy = json.sy;
      this.depth = json.depth;

      var n = this.sx*this.sy*this.depth;
      this.w = global.zeros(n);
      this.dw = global.zeros(n);
      // copy over the elements.
      for(var i=0;i<n;i++) {
        this.w[i] = json.w[i];
      }
    }
  }

  global.Vol = Vol;
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience

  // Volume utilities
  // intended for use with data augmentation
  // crop is the size of output
  // dx,dy are offset wrt incoming volume, of the shift
  // fliplr is boolean on whether we also want to flip left<->right
  var augment = function(V, crop, dx, dy, fliplr) {
    // note assumes square outputs of size crop x crop
    if(typeof(fliplr)==='undefined') var fliplr = false;
    if(typeof(dx)==='undefined') var dx = global.randi(0, V.sx - crop);
    if(typeof(dy)==='undefined') var dy = global.randi(0, V.sy - crop);
    
    // randomly sample a crop in the input volume
    var W;
    if(crop !== V.sx || dx!==0 || dy!==0) {
      W = new Vol(crop, crop, V.depth, 0.0);
      for(var x=0;x<crop;x++) {
        for(var y=0;y<crop;y++) {
          if(x+dx<0 || x+dx>=V.sx || y+dy<0 || y+dy>=V.sy) continue; // oob
          for(var d=0;d<V.depth;d++) {
           W.set(x,y,d,V.get(x+dx,y+dy,d)); // copy data over
          }
        }
      }
    } else {
      W = V;
    }

    if(fliplr) {
      // flip volume horziontally
      var W2 = W.cloneAndZero();
      for(var x=0;x<W.sx;x++) {
        for(var y=0;y<W.sy;y++) {
          for(var d=0;d<W.depth;d++) {
           W2.set(x,y,d,W.get(W.sx - x - 1,y,d)); // copy data over
          }
        }
      }
      W = W2; //swap
    }
    return W;
  }

  // img is a DOM element that contains a loaded image
  // returns a Vol of size (W, H, 4). 4 is for RGBA
  var img_to_vol = function(img, convert_grayscale) {

    if(typeof(convert_grayscale)==='undefined') var convert_grayscale = false;

    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");

    // due to a Firefox bug
    try {
      ctx.drawImage(img, 0, 0);
    } catch (e) {
      if (e.name === "NS_ERROR_NOT_AVAILABLE") {
        // sometimes happens, lets just abort
        return false;
      } else {
        throw e;
      }
    }

    try {
      var img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } catch (e) {
      if(e.name === 'IndexSizeError') {
        return false; // not sure what causes this sometimes but okay abort
      } else {
        throw e;
      }
    }

    // prepare the input: get pixels and normalize them
    var p = img_data.data;
    var W = img.width;
    var H = img.height;
    var pv = []
    for(var i=0;i<p.length;i++) {
      pv.push(p[i]/255.0-0.5); // normalize image pixels to [-0.5, 0.5]
    }
    var x = new Vol(W, H, 4, 0.0); //input volume (image)
    x.w = pv;

    if(convert_grayscale) {
      // flatten into depth=1 array
      var x1 = new Vol(W, H, 1, 0.0);
      for(var i=0;i<W;i++) {
        for(var j=0;j<H;j++) {
          x1.set(i,j,0,x.get(i,j,0));
        }
      }
      x = x1;
    }

    return x;
  }
  
  global.augment = augment;
  global.img_to_vol = img_to_vol;

})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience

  // This file contains all layers that do dot products with input,
  // but usually in a different connectivity pattern and weight sharing
  // schemes: 
  // - FullyConn is fully connected dot products 
  // - ConvLayer does convolutions (so weight sharing spatially)
  // putting them together in one file because they are very similar
  var ConvLayer = function(opt) {
    var opt = opt || {};

    // required
    this.out_depth = opt.filters;
    this.sx = opt.sx; // filter size. Should be odd if possible, it's cleaner.
    this.in_depth = opt.in_depth;
    this.in_sx = opt.in_sx;
    this.in_sy = opt.in_sy;
    
    // optional
    this.sy = typeof opt.sy !== 'undefined' ? opt.sy : this.sx;
    this.stride = typeof opt.stride !== 'undefined' ? opt.stride : 1; // stride at which we apply filters to input volume
    this.pad = typeof opt.pad !== 'undefined' ? opt.pad : 0; // amount of 0 padding to add around borders of input volume
    this.l1_decay_mul = typeof opt.l1_decay_mul !== 'undefined' ? opt.l1_decay_mul : 0.0;
    this.l2_decay_mul = typeof opt.l2_decay_mul !== 'undefined' ? opt.l2_decay_mul : 1.0;

    // computed
    // note we are doing floor, so if the strided convolution of the filter doesnt fit into the input
    // volume exactly, the output volume will be trimmed and not contain the (incomplete) computed
    // final application.
    this.out_sx = Math.floor((this.in_sx + this.pad * 2 - this.sx) / this.stride + 1);
    this.out_sy = Math.floor((this.in_sy + this.pad * 2 - this.sy) / this.stride + 1);
    this.layer_type = 'conv';

    // initializations
    var bias = typeof opt.bias_pref !== 'undefined' ? opt.bias_pref : 0.0;
    this.filters = [];
    for(var i=0;i<this.out_depth;i++) { this.filters.push(new Vol(this.sx, this.sy, this.in_depth)); }
    this.biases = new Vol(1, 1, this.out_depth, bias);
  }
  ConvLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;

      var A = new Vol(this.out_sx, this.out_sy, this.out_depth, 0.0);
      for(var d=0;d<this.out_depth;d++) {
        var f = this.filters[d];
        var x = -this.pad;
        var y = -this.pad;
        for(var ax=0; ax<this.out_sx; x+=this.stride,ax++) {
          y = -this.pad;
          for(var ay=0; ay<this.out_sy; y+=this.stride,ay++) {

            // convolve centered at this particular location
            // could be bit more efficient, going for correctness first
            var a = 0.0;
            for(var fx=0;fx<f.sx;fx++) {
              for(var fy=0;fy<f.sy;fy++) {
                for(var fd=0;fd<f.depth;fd++) {
                  var oy = y+fy; // coordinates in the original input array coordinates
                  var ox = x+fx;
                  if(oy>=0 && oy<V.sy && ox>=0 && ox<V.sx) {
                    //a += f.get(fx, fy, fd) * V.get(ox, oy, fd);
                    // avoid function call overhead for efficiency, compromise modularity :(
                    a += f.w[((f.sx * fy)+fx)*f.depth+fd] * V.w[((V.sx * oy)+ox)*V.depth+fd];
                  }
                }
              }
            }
            a += this.biases.w[d];
            A.set(ax, ay, d, a);
          }
        }
      }
      this.out_act = A;
      return this.out_act;
    },
    backward: function() { 

      // compute gradient wrt weights, biases and input data
      var V = this.in_act;
      V.dw = global.zeros(V.w.length); // zero out gradient wrt bottom data, we're about to fill it
      for(var d=0;d<this.out_depth;d++) {
        var f = this.filters[d];
        var x = -this.pad;
        var y = -this.pad;
        for(var ax=0; ax<this.out_sx; x+=this.stride,ax++) {
          y = -this.pad;
          for(var ay=0; ay<this.out_sy; y+=this.stride,ay++) {
            // convolve and add up the gradients. 
            // could be more efficient, going for correctness first
            var chain_grad = this.out_act.get_grad(ax,ay,d); // gradient from above, from chain rule
            for(var fx=0;fx<f.sx;fx++) {
              for(var fy=0;fy<f.sy;fy++) {
                for(var fd=0;fd<f.depth;fd++) {
                  var oy = y+fy;
                  var ox = x+fx;
                  if(oy>=0 && oy<V.sy && ox>=0 && ox<V.sx) {
                    // forward prop calculated: a += f.get(fx, fy, fd) * V.get(ox, oy, fd);
                    //f.add_grad(fx, fy, fd, V.get(ox, oy, fd) * chain_grad);
                    //V.add_grad(ox, oy, fd, f.get(fx, fy, fd) * chain_grad);

                    // avoid function call overhead and use Vols directly for efficiency
                    var ix1 = ((V.sx * oy)+ox)*V.depth+fd;
                    var ix2 = ((f.sx * fy)+fx)*f.depth+fd;
                    f.dw[ix2] += V.w[ix1]*chain_grad;
                    V.dw[ix1] += f.w[ix2]*chain_grad;
                  }
                }
              }
            }
            this.biases.dw[d] += chain_grad;
          }
        }
      }
    },
    getParamsAndGrads: function() {
      var response = [];
      for(var i=0;i<this.out_depth;i++) {
        response.push({params: this.filters[i].w, grads: this.filters[i].dw, l2_decay_mul: this.l2_decay_mul, l1_decay_mul: this.l1_decay_mul});
      }
      response.push({params: this.biases.w, grads: this.biases.dw, l1_decay_mul: 0.0, l2_decay_mul: 0.0});
      return response;
    },
    toJSON: function() {
      var json = {};
      json.sx = this.sx; // filter size in x, y dims
      json.sy = this.sy;
      json.stride = this.stride;
      json.in_depth = this.in_depth;
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.l1_decay_mul = this.l1_decay_mul;
      json.l2_decay_mul = this.l2_decay_mul;
      json.pad = this.pad;
      json.filters = [];
      for(var i=0;i<this.filters.length;i++) {
        json.filters.push(this.filters[i].toJSON());
      }
      json.biases = this.biases.toJSON();
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.sx = json.sx; // filter size in x, y dims
      this.sy = json.sy;
      this.stride = json.stride;
      this.in_depth = json.in_depth; // depth of input volume
      this.filters = [];
      this.l1_decay_mul = typeof json.l1_decay_mul !== 'undefined' ? json.l1_decay_mul : 1.0;
      this.l2_decay_mul = typeof json.l2_decay_mul !== 'undefined' ? json.l2_decay_mul : 1.0;
      this.pad = typeof json.pad !== 'undefined' ? json.pad : 0;
      for(var i=0;i<json.filters.length;i++) {
        var v = new Vol(0,0,0,0);
        v.fromJSON(json.filters[i]);
        this.filters.push(v);
      }
      this.biases = new Vol(0,0,0,0);
      this.biases.fromJSON(json.biases);
    }
  }

  var FullyConnLayer = function(opt) {
    var opt = opt || {};

    // required
    // ok fine we will allow 'filters' as the word as well
    this.out_depth = typeof opt.num_neurons !== 'undefined' ? opt.num_neurons : opt.filters;

    // optional 
    this.l1_decay_mul = typeof opt.l1_decay_mul !== 'undefined' ? opt.l1_decay_mul : 0.0;
    this.l2_decay_mul = typeof opt.l2_decay_mul !== 'undefined' ? opt.l2_decay_mul : 1.0;

    // computed
    this.num_inputs = opt.in_sx * opt.in_sy * opt.in_depth;
    this.out_sx = 1;
    this.out_sy = 1;
    this.layer_type = 'fc';

    // initializations
    var bias = typeof opt.bias_pref !== 'undefined' ? opt.bias_pref : 0.0;
    this.filters = [];
    for(var i=0;i<this.out_depth ;i++) { this.filters.push(new Vol(1, 1, this.num_inputs)); }
    this.biases = new Vol(1, 1, this.out_depth, bias);
  }

  FullyConnLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      var A = new Vol(1, 1, this.out_depth, 0.0);
      var Vw = V.w;
      for(var i=0;i<this.out_depth;i++) {
        var a = 0.0;
        var wi = this.filters[i].w;
        for(var d=0;d<this.num_inputs;d++) {
          a += Vw[d] * wi[d]; // for efficiency use Vols directly for now
        }
        a += this.biases.w[i];
        A.w[i] = a;
      }
      this.out_act = A;
      return this.out_act;
    },
    backward: function() {
      var V = this.in_act;
      V.dw = global.zeros(V.w.length); // zero out the gradient in input Vol
      
      // compute gradient wrt weights and data
      for(var i=0;i<this.out_depth;i++) {
        var tfi = this.filters[i];
        var chain_grad = this.out_act.dw[i];
        for(var d=0;d<this.num_inputs;d++) {
          V.dw[d] += tfi.w[d]*chain_grad; // grad wrt input data
          tfi.dw[d] += V.w[d]*chain_grad; // grad wrt params
        }
        this.biases.dw[i] += chain_grad;
      }
    },
    getParamsAndGrads: function() {
      var response = [];
      for(var i=0;i<this.out_depth;i++) {
        response.push({params: this.filters[i].w, grads: this.filters[i].dw, l1_decay_mul: this.l1_decay_mul, l2_decay_mul: this.l2_decay_mul});
      }
      response.push({params: this.biases.w, grads: this.biases.dw, l1_decay_mul: 0.0, l2_decay_mul: 0.0});
      return response;
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.num_inputs = this.num_inputs;
      json.l1_decay_mul = this.l1_decay_mul;
      json.l2_decay_mul = this.l2_decay_mul;
      json.filters = [];
      for(var i=0;i<this.filters.length;i++) {
        json.filters.push(this.filters[i].toJSON());
      }
      json.biases = this.biases.toJSON();
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.num_inputs = json.num_inputs;
      this.l1_decay_mul = typeof json.l1_decay_mul !== 'undefined' ? json.l1_decay_mul : 1.0;
      this.l2_decay_mul = typeof json.l2_decay_mul !== 'undefined' ? json.l2_decay_mul : 1.0;
      this.filters = [];
      for(var i=0;i<json.filters.length;i++) {
        var v = new Vol(0,0,0,0);
        v.fromJSON(json.filters[i]);
        this.filters.push(v);
      }
      this.biases = new Vol(0,0,0,0);
      this.biases.fromJSON(json.biases);
    }
  }

  global.ConvLayer = ConvLayer;
  global.FullyConnLayer = FullyConnLayer;
  
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  
  var PoolLayer = function(opt) {

    var opt = opt || {};

    // required
    this.sx = opt.sx; // filter size
    this.in_depth = opt.in_depth;
    this.in_sx = opt.in_sx;
    this.in_sy = opt.in_sy;

    // optional
    this.sy = typeof opt.sy !== 'undefined' ? opt.sy : this.sx;
    this.stride = typeof opt.stride !== 'undefined' ? opt.stride : 2;
    this.pad = typeof opt.pad !== 'undefined' ? opt.pad : 0; // amount of 0 padding to add around borders of input volume

    // computed
    this.out_depth = this.in_depth;
    this.out_sx = Math.floor((this.in_sx + this.pad * 2 - this.sx) / this.stride + 1);
    this.out_sy = Math.floor((this.in_sy + this.pad * 2 - this.sy) / this.stride + 1);
    this.layer_type = 'pool';
    // store switches for x,y coordinates for where the max comes from, for each output neuron
    this.switchx = global.zeros(this.out_sx*this.out_sy*this.out_depth);
    this.switchy = global.zeros(this.out_sx*this.out_sy*this.out_depth);
  }

  PoolLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;

      var A = new Vol(this.out_sx, this.out_sy, this.out_depth, 0.0);
      
      var n=0; // a counter for switches
      for(var d=0;d<this.out_depth;d++) {
        var x = -this.pad;
        var y = -this.pad;
        for(var ax=0; ax<this.out_sx; x+=this.stride,ax++) {
          y = -this.pad;
          for(var ay=0; ay<this.out_sy; y+=this.stride,ay++) {

            // convolve centered at this particular location
            var a = -99999; // hopefully small enough ;\
            var winx=-1,winy=-1;
            for(var fx=0;fx<this.sx;fx++) {
              for(var fy=0;fy<this.sy;fy++) {
                var oy = y+fy;
                var ox = x+fx;
                if(oy>=0 && oy<V.sy && ox>=0 && ox<V.sx) {
                  var v = V.get(ox, oy, d);
                  // perform max pooling and store pointers to where
                  // the max came from. This will speed up backprop 
                  // and can help make nice visualizations in future
                  if(v > a) { a = v; winx=ox; winy=oy;}
                }
              }
            }
            this.switchx[n] = winx;
            this.switchy[n] = winy;
            n++;
            A.set(ax, ay, d, a);
          }
        }
      }
      this.out_act = A;
      return this.out_act;
    },
    backward: function() { 
      // pooling layers have no parameters, so simply compute 
      // gradient wrt data here
      var V = this.in_act;
      V.dw = global.zeros(V.w.length); // zero out gradient wrt data
      var A = this.out_act; // computed in forward pass 

      var n = 0;
      for(var d=0;d<this.out_depth;d++) {
        var x = -this.pad;
        var y = -this.pad;
        for(var ax=0; ax<this.out_sx; x+=this.stride,ax++) {
          y = -this.pad;
          for(var ay=0; ay<this.out_sy; y+=this.stride,ay++) {

            var chain_grad = this.out_act.get_grad(ax,ay,d);
            V.add_grad(this.switchx[n], this.switchy[n], d, chain_grad);
            n++;

          }
        }
      }
    },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.sx = this.sx;
      json.sy = this.sy;
      json.stride = this.stride;
      json.in_depth = this.in_depth;
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.pad = this.pad;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.sx = json.sx;
      this.sy = json.sy;
      this.stride = json.stride;
      this.in_depth = json.in_depth;
      this.pad = typeof json.pad !== 'undefined' ? json.pad : 0; // backwards compatibility
      this.switchx = global.zeros(this.out_sx*this.out_sy*this.out_depth); // need to re-init these appropriately
      this.switchy = global.zeros(this.out_sx*this.out_sy*this.out_depth);
    }
  }

  global.PoolLayer = PoolLayer;

})(convnetjs);

(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  
  var InputLayer = function(opt) {
    var opt = opt || {};

    // this is a bit silly but lets allow people to specify either ins or outs
    this.out_sx = typeof opt.out_sx !== 'undefined' ? opt.out_sx : opt.in_sx;
    this.out_sy = typeof opt.out_sy !== 'undefined' ? opt.out_sy : opt.in_sy;
    this.out_depth = typeof opt.out_depth !== 'undefined' ? opt.out_depth : opt.in_depth;
    this.layer_type = 'input';
  }
  InputLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      this.out_act = V;
      return this.out_act; // dummy identity function for now
    },
    backward: function() { },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type; 
    }
  }

  global.InputLayer = InputLayer;
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  
  // Layers that implement a loss. Currently these are the layers that 
  // can initiate a backward() pass. In future we probably want a more 
  // flexible system that can accomodate multiple losses to do multi-task
  // learning, and stuff like that. But for now, one of the layers in this
  // file must be the final layer in a Net.

  // This is a classifier, with N discrete classes from 0 to N-1
  // it gets a stream of N incoming numbers and computes the softmax
  // function (exponentiate and normalize to sum to 1 as probabilities should)
  var SoftmaxLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.num_inputs = opt.in_sx * opt.in_sy * opt.in_depth;
    this.out_depth = this.num_inputs;
    this.out_sx = 1;
    this.out_sy = 1;
    this.layer_type = 'softmax';
  }

  SoftmaxLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;

      var A = new Vol(1, 1, this.out_depth, 0.0);

      // compute max activation
      var as = V.w;
      var amax = V.w[0];
      for(var i=1;i<this.out_depth;i++) {
        if(as[i] > amax) amax = as[i];
      }

      // compute exponentials (carefully to not blow up)
      var es = global.zeros(this.out_depth);
      var esum = 0.0;
      for(var i=0;i<this.out_depth;i++) {
        var e = Math.exp(as[i] - amax);
        esum += e;
        es[i] = e;
      }

      // normalize and output to sum to one
      for(var i=0;i<this.out_depth;i++) {
        es[i] /= esum;
        A.w[i] = es[i];
      }

      this.es = es; // save these for backprop
      this.out_act = A;
      return this.out_act;
    },
    backward: function(y) {

      // compute and accumulate gradient wrt weights and bias of this layer
      var x = this.in_act;
      x.dw = global.zeros(x.w.length); // zero out the gradient of input Vol

      for(var i=0;i<this.out_depth;i++) {
        var indicator = i === y ? 1.0 : 0.0;
        var mul = -(indicator - this.es[i]);
        x.dw[i] = mul;
      }

      // loss is the class negative log likelihood
      return -Math.log(this.es[y]);
    },
    getParamsAndGrads: function() { 
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.num_inputs = this.num_inputs;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.num_inputs = json.num_inputs;
    }
  }

  // implements an L2 regression cost layer,
  // so penalizes \sum_i(||x_i - y_i||^2), where x is its input
  // and y is the user-provided array of "correct" values.
  var RegressionLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.num_inputs = opt.in_sx * opt.in_sy * opt.in_depth;
    this.out_depth = this.num_inputs;
    this.out_sx = 1;
    this.out_sy = 1;
    this.layer_type = 'regression';
  }

  RegressionLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      this.out_act = V;
      return V; // identity function
    },
    // y is a list here of size num_inputs
    backward: function(y) { 

      // compute and accumulate gradient wrt weights and bias of this layer
      var x = this.in_act;
      x.dw = global.zeros(x.w.length); // zero out the gradient of input Vol
      var loss = 0.0;
      if(y instanceof Array || y instanceof Float64Array) {
        for(var i=0;i<this.out_depth;i++) {
          var dy = x.w[i] - y[i];
          x.dw[i] = dy;
          loss += 2*dy*dy;
        }
      } else {
        // assume it is a struct with entries .dim and .val
        // and we pass gradient only along dimension dim to be equal to val
        var i = y.dim;
        var yi = y.val;
        var dy = x.w[i] - yi;
        x.dw[i] = dy;
        loss += 2*dy*dy;
      }
      return loss;
    },
    getParamsAndGrads: function() { 
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.num_inputs = this.num_inputs;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.num_inputs = json.num_inputs;
    }
  }

  var SVMLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.num_inputs = opt.in_sx * opt.in_sy * opt.in_depth;
    this.out_depth = this.num_inputs;
    this.out_sx = 1;
    this.out_sy = 1;
    this.layer_type = 'svm';
  }

  SVMLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      this.out_act = V; // nothing to do, output raw scores
      return V;
    },
    backward: function(y) {

      // compute and accumulate gradient wrt weights and bias of this layer
      var x = this.in_act;
      x.dw = global.zeros(x.w.length); // zero out the gradient of input Vol

      var yscore = x.w[y]; // score of ground truth
      var margin = 1.0;
      var loss = 0.0;
      for(var i=0;i<this.out_depth;i++) {
        if(-yscore + x.w[i] + margin > 0) {
          // violating example, apply loss
          // I love hinge loss, by the way. Truly.
          // Seriously, compare this SVM code with Softmax forward AND backprop code above
          // it's clear which one is superior, not only in code, simplicity
          // and beauty, but also in practice.
          x.dw[i] += 1;
          x.dw[y] -= 1;
          loss += -yscore + x.w[i] + margin;
        }
      }

      return loss;
    },
    getParamsAndGrads: function() { 
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.num_inputs = this.num_inputs;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.num_inputs = json.num_inputs;
    }
  }
  
  global.RegressionLayer = RegressionLayer;
  global.SoftmaxLayer = SoftmaxLayer;
  global.SVMLayer = SVMLayer;

})(convnetjs);

(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  
  // Implements ReLU nonlinearity elementwise
  // x -> max(0, x)
  // the output is in [0, inf)
  var ReluLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.out_sx = opt.in_sx;
    this.out_sy = opt.in_sy;
    this.out_depth = opt.in_depth;
    this.layer_type = 'relu';
  }
  ReluLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      var V2 = V.clone();
      var N = V.w.length;
      var V2w = V2.w;
      for(var i=0;i<N;i++) { 
        if(V2w[i] < 0) V2w[i] = 0; // threshold at 0
      }
      this.out_act = V2;
      return this.out_act;
    },
    backward: function() {
      var V = this.in_act; // we need to set dw of this
      var V2 = this.out_act;
      var N = V.w.length;
      V.dw = global.zeros(N); // zero out gradient wrt data
      for(var i=0;i<N;i++) {
        if(V2.w[i] <= 0) V.dw[i] = 0; // threshold
        else V.dw[i] = V2.dw[i];
      }
    },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type; 
    }
  }

  // Implements Sigmoid nnonlinearity elementwise
  // x -> 1/(1+e^(-x))
  // so the output is between 0 and 1.
  var SigmoidLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.out_sx = opt.in_sx;
    this.out_sy = opt.in_sy;
    this.out_depth = opt.in_depth;
    this.layer_type = 'sigmoid';
  }
  SigmoidLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      var V2 = V.cloneAndZero();
      var N = V.w.length;
      var V2w = V2.w;
      var Vw = V.w;
      for(var i=0;i<N;i++) { 
        V2w[i] = 1.0/(1.0+Math.exp(-Vw[i]));
      }
      this.out_act = V2;
      return this.out_act;
    },
    backward: function() {
      var V = this.in_act; // we need to set dw of this
      var V2 = this.out_act;
      var N = V.w.length;
      V.dw = global.zeros(N); // zero out gradient wrt data
      for(var i=0;i<N;i++) {
        var v2wi = V2.w[i];
        V.dw[i] =  v2wi * (1.0 - v2wi) * V2.dw[i];
      }
    },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type; 
    }
  }

  // Implements Maxout nnonlinearity that computes
  // x -> max(x)
  // where x is a vector of size group_size. Ideally of course,
  // the input size should be exactly divisible by group_size
  var MaxoutLayer = function(opt) {
    var opt = opt || {};

    // required
    this.group_size = typeof opt.group_size !== 'undefined' ? opt.group_size : 2;

    // computed
    this.out_sx = opt.in_sx;
    this.out_sy = opt.in_sy;
    this.out_depth = Math.floor(opt.in_depth / this.group_size);
    this.layer_type = 'maxout';

    this.switches = global.zeros(this.out_sx*this.out_sy*this.out_depth); // useful for backprop
  }
  MaxoutLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      var N = this.out_depth; 
      var V2 = new Vol(this.out_sx, this.out_sy, this.out_depth, 0.0);

      // optimization branch. If we're operating on 1D arrays we dont have
      // to worry about keeping track of x,y,d coordinates inside
      // input volumes. In convnets we do :(
      if(this.out_sx === 1 && this.out_sy === 1) {
        for(var i=0;i<N;i++) {
          var ix = i * this.group_size; // base index offset
          var a = V.w[ix];
          var ai = 0;
          for(var j=1;j<this.group_size;j++) {
            var a2 = V.w[ix+j];
            if(a2 > a) {
              a = a2;
              ai = j;
            }
          }
          V2.w[i] = a;
          this.switches[i] = ix + ai;
        }
      } else {
        var n=0; // counter for switches
        for(var x=0;x<V.sx;x++) {
          for(var y=0;y<V.sy;y++) {
            for(var i=0;i<N;i++) {
              var ix = i * this.group_size;
              var a = V.get(x, y, ix);
              var ai = 0;
              for(var j=1;j<this.group_size;j++) {
                var a2 = V.get(x, y, ix+j);
                if(a2 > a) {
                  a = a2;
                  ai = j;
                }
              }
              V2.set(x,y,i,a);
              this.switches[n] = ix + ai;
              n++;
            }
          }
        }

      }
      this.out_act = V2;
      return this.out_act;
    },
    backward: function() {
      var V = this.in_act; // we need to set dw of this
      var V2 = this.out_act;
      var N = this.out_depth;
      V.dw = global.zeros(V.w.length); // zero out gradient wrt data

      // pass the gradient through the appropriate switch
      if(this.out_sx === 1 && this.out_sy === 1) {
        for(var i=0;i<N;i++) {
          var chain_grad = V2.dw[i];
          V.dw[this.switches[i]] = chain_grad;
        }
      } else {
        // bleh okay, lets do this the hard way
        var n=0; // counter for switches
        for(var x=0;x<V2.sx;x++) {
          for(var y=0;y<V2.sy;y++) {
            for(var i=0;i<N;i++) {
              var chain_grad = V2.get_grad(x,y,i);
              V.set_grad(x,y,this.switches[n],chain_grad);
              n++;
            }
          }
        }
      }
    },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.group_size = this.group_size;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type; 
      this.group_size = json.group_size;
      this.switches = global.zeros(this.group_size);
    }
  }

  // a helper function, since tanh is not yet part of ECMAScript. Will be in v6.
  function tanh(x) {
    var y = Math.exp(2 * x);
    return (y - 1) / (y + 1);
  }
  // Implements Tanh nnonlinearity elementwise
  // x -> tanh(x) 
  // so the output is between -1 and 1.
  var TanhLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.out_sx = opt.in_sx;
    this.out_sy = opt.in_sy;
    this.out_depth = opt.in_depth;
    this.layer_type = 'tanh';
  }
  TanhLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      var V2 = V.cloneAndZero();
      var N = V.w.length;
      for(var i=0;i<N;i++) { 
        V2.w[i] = tanh(V.w[i]);
      }
      this.out_act = V2;
      return this.out_act;
    },
    backward: function() {
      var V = this.in_act; // we need to set dw of this
      var V2 = this.out_act;
      var N = V.w.length;
      V.dw = global.zeros(N); // zero out gradient wrt data
      for(var i=0;i<N;i++) {
        var v2wi = V2.w[i];
        V.dw[i] = (1.0 - v2wi * v2wi) * V2.dw[i];
      }
    },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type; 
    }
  }
  
  global.TanhLayer = TanhLayer;
  global.MaxoutLayer = MaxoutLayer;
  global.ReluLayer = ReluLayer;
  global.SigmoidLayer = SigmoidLayer;

})(convnetjs);

(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience

  // An inefficient dropout layer
  // Note this is not most efficient implementation since the layer before
  // computed all these activations and now we're just going to drop them :(
  // same goes for backward pass. Also, if we wanted to be efficient at test time
  // we could equivalently be clever and upscale during train and copy pointers during test
  // todo: make more efficient.
  var DropoutLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.out_sx = opt.in_sx;
    this.out_sy = opt.in_sy;
    this.out_depth = opt.in_depth;
    this.layer_type = 'dropout';
    this.drop_prob = typeof opt.drop_prob !== 'undefined' ? opt.drop_prob : 0.5;
    this.dropped = global.zeros(this.out_sx*this.out_sy*this.out_depth);
  }
  DropoutLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      if(typeof(is_training)==='undefined') { is_training = false; } // default is prediction mode
      var V2 = V.clone();
      var N = V.w.length;
      if(is_training) {
        // do dropout
        for(var i=0;i<N;i++) {
          if(Math.random()<this.drop_prob) { V2.w[i]=0; this.dropped[i] = true; } // drop!
          else {this.dropped[i] = false;}
        }
      } else {
        // scale the activations during prediction
        for(var i=0;i<N;i++) { V2.w[i]*=this.drop_prob; }
      }
      this.out_act = V2;
      return this.out_act; // dummy identity function for now
    },
    backward: function() {
      var V = this.in_act; // we need to set dw of this
      var chain_grad = this.out_act;
      var N = V.w.length;
      V.dw = global.zeros(N); // zero out gradient wrt data
      for(var i=0;i<N;i++) {
        if(!(this.dropped[i])) { 
          V.dw[i] = chain_grad.dw[i]; // copy over the gradient
        }
      }
    },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.drop_prob = this.drop_prob;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type; 
      this.drop_prob = json.drop_prob;
    }
  }
  

  global.DropoutLayer = DropoutLayer;
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  
  // a bit experimental layer for now. I think it works but I'm not 100%
  // the gradient check is a bit funky. I'll look into this a bit later.
  // Local Response Normalization in window, along depths of volumes
  var LocalResponseNormalizationLayer = function(opt) {
    var opt = opt || {};

    // required
    this.k = opt.k;
    this.n = opt.n;
    this.alpha = opt.alpha;
    this.beta = opt.beta;

    // computed
    this.out_sx = opt.in_sx;
    this.out_sy = opt.in_sy;
    this.out_depth = opt.in_depth;
    this.layer_type = 'lrn';

    // checks
    if(this.n%2 === 0) { console.log('WARNING n should be odd for LRN layer'); }
  }
  LocalResponseNormalizationLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;

      var A = V.cloneAndZero();
      this.S_cache_ = V.cloneAndZero();
      var n2 = Math.floor(this.n/2);
      for(var x=0;x<V.sx;x++) {
        for(var y=0;y<V.sy;y++) {
          for(var i=0;i<V.depth;i++) {

            var ai = V.get(x,y,i);

            // normalize in a window of size n
            var den = 0.0;
            for(var j=Math.max(0,i-n2);j<=Math.min(i+n2,V.depth-1);j++) {
              var aa = V.get(x,y,j);
              den += aa*aa;
            }
            den *= this.alpha / this.n;
            den += this.k;
            this.S_cache_.set(x,y,i,den); // will be useful for backprop
            den = Math.pow(den, this.beta);
            A.set(x,y,i,ai/den);
          }
        }
      }

      this.out_act = A;
      return this.out_act; // dummy identity function for now
    },
    backward: function() { 
      // evaluate gradient wrt data
      var V = this.in_act; // we need to set dw of this
      V.dw = global.zeros(V.w.length); // zero out gradient wrt data
      var A = this.out_act; // computed in forward pass 

      var n2 = Math.floor(this.n/2);
      for(var x=0;x<V.sx;x++) {
        for(var y=0;y<V.sy;y++) {
          for(var i=0;i<V.depth;i++) {

            var chain_grad = this.out_act.get_grad(x,y,i);
            var S = this.S_cache_.get(x,y,i);
            var SB = Math.pow(S, this.beta);
            var SB2 = SB*SB;

            // normalize in a window of size n
            for(var j=Math.max(0,i-n2);j<=Math.min(i+n2,V.depth-1);j++) {              
              var aj = V.get(x,y,j); 
              var g = -aj*this.beta*Math.pow(S,this.beta-1)*this.alpha/this.n*2*aj;
              if(j===i) g+= SB;
              g /= SB2;
              g *= chain_grad;
              V.add_grad(x,y,j,g);
            }

          }
        }
      }
    },
    getParamsAndGrads: function() { return []; },
    toJSON: function() {
      var json = {};
      json.k = this.k;
      json.n = this.n;
      json.alpha = this.alpha; // normalize by size
      json.beta = this.beta;
      json.out_sx = this.out_sx; 
      json.out_sy = this.out_sy;
      json.out_depth = this.out_depth;
      json.layer_type = this.layer_type;
      return json;
    },
    fromJSON: function(json) {
      this.k = json.k;
      this.n = json.n;
      this.alpha = json.alpha; // normalize by size
      this.beta = json.beta;
      this.out_sx = json.out_sx; 
      this.out_sy = json.out_sy;
      this.out_depth = json.out_depth;
      this.layer_type = json.layer_type;
    }
  }
  

  global.LocalResponseNormalizationLayer = LocalResponseNormalizationLayer;
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience

  // transforms x-> [x, x_i*x_j forall i,j]
  // so the fully connected layer afters will essentially be doing tensor multiplies
  var QuadTransformLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.out_sx = opt.in_sx;
    this.out_sy = opt.in_sy;
    // linear terms, and then quadratic terms, of which there are 1/2*n*(n+1),
    // (offdiagonals and the diagonal total) and arithmetic series.
    // Actually never mind, lets not be fancy here yet and just include
    // terms x_ix_j and x_jx_i twice. Half as efficient but much less
    // headache.
    this.out_depth = opt.in_depth + opt.in_depth * opt.in_depth;
    this.layer_type = 'quadtransform';

  }
  QuadTransformLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      var N = this.out_depth;
      var Ni = V.depth;
      var V2 = new Vol(this.out_sx, this.out_sy, this.out_depth, 0.0);
      for(var x=0;x<V.sx;x++) {
        for(var y=0;y<V.sy;y++) {
          for(var i=0;i<N;i++) {
            if(i<Ni) {
              V2.set(x,y,i,V.get(x,y,i)); // copy these over (linear terms)
            } else {
              var i0 = Math.floor((i-Ni)/Ni);
              var i1 = (i-Ni) - i0*Ni;
              V2.set(x,y,i,V.get(x,y,i0) * V.get(x,y,i1)); // quadratic
            }
          }
        }
      }
      this.out_act = V2;
      return this.out_act; // dummy identity function for now
    },
    backward: function() {
      var V = this.in_act;
      V.dw = global.zeros(V.w.length); // zero out gradient wrt data
      var V2 = this.out_act;
      var N = this.out_depth;
      var Ni = V.depth;
      for(var x=0;x<V.sx;x++) {
        for(var y=0;y<V.sy;y++) {
          for(var i=0;i<N;i++) {
            var chain_grad = V2.get_grad(x,y,i);
            if(i<Ni) {
              V.add_grad(x,y,i,chain_grad);
            } else {
              var i0 = Math.floor((i-Ni)/Ni);
              var i1 = (i-Ni) - i0*Ni;
              V.add_grad(x,y,i0,V.get(x,y,i1)*chain_grad);
              V.add_grad(x,y,i1,V.get(x,y,i0)*chain_grad);
            }
          }
        }
      }
    },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type; 
    }
  }
  

  global.QuadTransformLayer = QuadTransformLayer;
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  
  // Net manages a set of layers
  // For now constraints: Simple linear order of layers, first layer input last layer a cost layer
  var Net = function(options) {
    this.layers = [];
  }

  Net.prototype = {
    
    // takes a list of layer definitions and creates the network layer objects
    makeLayers: function(defs) {

      // few checks for now
      if(defs.length<2) {console.log('ERROR! For now at least have input and softmax layers.');}
      if(defs[0].type !== 'input') {console.log('ERROR! For now first layer should be input.');}

      // desugar syntactic for adding activations and dropouts
      var desugar = function() {
        var new_defs = [];
        for(var i=0;i<defs.length;i++) {
          var def = defs[i];
          
          if(def.type==='softmax' || def.type==='svm') {
            // add an fc layer here, there is no reason the user should
            // have to worry about this and we almost always want to
            new_defs.push({type:'fc', num_neurons: def.num_classes});
          }

          if(def.type==='regression') {
            // add an fc layer here, there is no reason the user should
            // have to worry about this and we almost always want to
            new_defs.push({type:'fc', num_neurons: def.num_neurons});
          }

          if((def.type==='fc' || def.type==='conv') 
              && typeof(def.bias_pref) === 'undefined'){
            def.bias_pref = 0.0;
            if(typeof def.activation !== 'undefined' && def.activation === 'relu') {
              def.bias_pref = 0.1; // relus like a bit of positive bias to get gradients early
              // otherwise it's technically possible that a relu unit will never turn on (by chance)
              // and will never get any gradient and never contribute any computation. Dead relu.
            }
          }
          
          if(typeof def.tensor !== 'undefined') {
            // apply quadratic transform so that the upcoming multiply will include
            // quadratic terms, equivalent to doing a tensor product
            if(def.tensor) {
              new_defs.push({type: 'quadtransform'});
            }
          }

          new_defs.push(def);

          if(typeof def.activation !== 'undefined') {
            if(def.activation==='relu') { new_defs.push({type:'relu'}); }
            else if (def.activation==='sigmoid') { new_defs.push({type:'sigmoid'}); }
            else if (def.activation==='tanh') { new_defs.push({type:'tanh'}); }
            else if (def.activation==='maxout') {
              // create maxout activation, and pass along group size, if provided
              var gs = def.group_size !== 'undefined' ? def.group_size : 2;
              new_defs.push({type:'maxout', group_size:gs});
            }
            else { console.log('ERROR unsupported activation ' + def.activation); }
          }
          if(typeof def.drop_prob !== 'undefined' && def.type !== 'dropout') {
            new_defs.push({type:'dropout', drop_prob: def.drop_prob});
          }

        }
        return new_defs;
      }
      defs = desugar(defs);

      // create the layers
      this.layers = [];
      for(var i=0;i<defs.length;i++) {
        var def = defs[i];
        if(i>0) {
          var prev = this.layers[i-1];
          def.in_sx = prev.out_sx;
          def.in_sy = prev.out_sy;
          def.in_depth = prev.out_depth;
        }

        switch(def.type) {
          case 'fc': this.layers.push(new global.FullyConnLayer(def)); break;
          case 'lrn': this.layers.push(new global.LocalResponseNormalizationLayer(def)); break;
          case 'dropout': this.layers.push(new global.DropoutLayer(def)); break;
          case 'input': this.layers.push(new global.InputLayer(def)); break;
          case 'softmax': this.layers.push(new global.SoftmaxLayer(def)); break;
          case 'regression': this.layers.push(new global.RegressionLayer(def)); break;
          case 'conv': this.layers.push(new global.ConvLayer(def)); break;
          case 'pool': this.layers.push(new global.PoolLayer(def)); break;
          case 'relu': this.layers.push(new global.ReluLayer(def)); break;
          case 'sigmoid': this.layers.push(new global.SigmoidLayer(def)); break;
          case 'tanh': this.layers.push(new global.TanhLayer(def)); break;
          case 'maxout': this.layers.push(new global.MaxoutLayer(def)); break;
          case 'quadtransform': this.layers.push(new global.QuadTransformLayer(def)); break;
          case 'svm': this.layers.push(new global.SVMLayer(def)); break;
          default: console.log('ERROR: UNRECOGNIZED LAYER TYPE!');
        }
      }
    },

    // forward prop the network. A trainer will pass in is_training = true
    forward: function(V, is_training) {
      if(typeof(is_training)==='undefined') is_training = false;
      var act = this.layers[0].forward(V, is_training);
      for(var i=1;i<this.layers.length;i++) {
        act = this.layers[i].forward(act, is_training);
      }
      return act;
    },
    
    // backprop: compute gradients wrt all parameters
    backward: function(y) {
      var N = this.layers.length;
      var loss = this.layers[N-1].backward(y); // last layer assumed softmax
      for(var i=N-2;i>=0;i--) { // first layer assumed input
        this.layers[i].backward();
      }
      return loss;
    },
    getParamsAndGrads: function() {
      // accumulate parameters and gradients for the entire network
      var response = [];
      for(var i=0;i<this.layers.length;i++) {
        var layer_reponse = this.layers[i].getParamsAndGrads();
        for(var j=0;j<layer_reponse.length;j++) {
          response.push(layer_reponse[j]);
        }
      }
      return response;
    },
    getPrediction: function() {
      var S = this.layers[this.layers.length-1]; // softmax layer
      var p = S.out_act.w;
      var maxv = p[0];
      var maxi = 0;
      for(var i=1;i<p.length;i++) {
        if(p[i] > maxv) { maxv = p[i]; maxi = i;}
      }
      return maxi;
    },
    toJSON: function() {
      var json = {};
      json.layers = [];
      for(var i=0;i<this.layers.length;i++) {
        json.layers.push(this.layers[i].toJSON());
      }
      return json;
    },
    fromJSON: function(json) {
      this.layers = [];
      for(var i=0;i<json.layers.length;i++) {
        var Lj = json.layers[i]
        var t = Lj.layer_type;
        var L;
        if(t==='input') { L = new global.InputLayer(); }
        if(t==='relu') { L = new global.ReluLayer(); }
        if(t==='sigmoid') { L = new global.SigmoidLayer(); }
        if(t==='tanh') { L = new global.TanhLayer(); }
        if(t==='dropout') { L = new global.DropoutLayer(); }
        if(t==='conv') { L = new global.ConvLayer(); }
        if(t==='pool') { L = new global.PoolLayer(); }
        if(t==='lrn') { L = new global.LocalResponseNormalizationLayer(); }
        if(t==='softmax') { L = new global.SoftmaxLayer(); }
        if(t==='regression') { L = new global.RegressionLayer(); }
        if(t==='fc') { L = new global.FullyConnLayer(); }
        if(t==='maxout') { L = new global.MaxoutLayer(); }
        if(t==='quadtransform') { L = new global.QuadTransformLayer(); }
        if(t==='svm') { L = new global.SVMLayer(); }
        L.fromJSON(Lj);
        this.layers.push(L);
      }
    }
  }
  

  global.Net = Net;
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience

  var Trainer = function(net, options) {

    this.net = net;

    var options = options || {};
    this.learning_rate = typeof options.learning_rate !== 'undefined' ? options.learning_rate : 0.01;
    this.l1_decay = typeof options.l1_decay !== 'undefined' ? options.l1_decay : 0.0;
    this.l2_decay = typeof options.l2_decay !== 'undefined' ? options.l2_decay : 0.0;
    this.batch_size = typeof options.batch_size !== 'undefined' ? options.batch_size : 1;
    this.method = typeof options.method !== 'undefined' ? options.method : 'sgd'; // sgd/adagrad/adadelta/windowgrad

    this.momentum = typeof options.momentum !== 'undefined' ? options.momentum : 0.9;
    this.ro = typeof options.ro !== 'undefined' ? options.ro : 0.95; // used in adadelta
    this.eps = typeof options.eps !== 'undefined' ? options.eps : 1e-6; // used in adadelta

    this.k = 0; // iteration counter
    this.gsum = []; // last iteration gradients (used for momentum calculations)
    this.xsum = []; // used in adadelta
  }

  Trainer.prototype = {
    train: function(x, y) {

      var start = new Date().getTime();
      this.net.forward(x, true); // also set the flag that lets the net know we're just training
      var end = new Date().getTime();
      var fwd_time = end - start;

      var start = new Date().getTime();
      var cost_loss = this.net.backward(y);
      var l2_decay_loss = 0.0;
      var l1_decay_loss = 0.0;
      var end = new Date().getTime();
      var bwd_time = end - start;
      
      this.k++;
      if(this.k % this.batch_size === 0) {

        var pglist = this.net.getParamsAndGrads();

        // initialize lists for accumulators. Will only be done once on first iteration
        if(this.gsum.length === 0 && (this.method !== 'sgd' || this.momentum > 0.0)) {
          // only vanilla sgd doesnt need either lists
          // momentum needs gsum
          // adagrad needs gsum
          // adadelta needs gsum and xsum
          for(var i=0;i<pglist.length;i++) {
            this.gsum.push(global.zeros(pglist[i].params.length));
            if(this.method === 'adadelta') {
              this.xsum.push(global.zeros(pglist[i].params.length));
            } else {
              this.xsum.push([]); // conserve memory
            }
          }
        }

        // perform an update for all sets of weights
        for(var i=0;i<pglist.length;i++) {
          var pg = pglist[i]; // param, gradient, other options in future (custom learning rate etc)
          var p = pg.params;
          var g = pg.grads;

          // learning rate for some parameters.
          var l2_decay_mul = typeof pg.l2_decay_mul !== 'undefined' ? pg.l2_decay_mul : 1.0;
          var l1_decay_mul = typeof pg.l1_decay_mul !== 'undefined' ? pg.l1_decay_mul : 1.0;
          var l2_decay = this.l2_decay * l2_decay_mul;
          var l1_decay = this.l1_decay * l1_decay_mul;

          var plen = p.length;
          for(var j=0;j<plen;j++) {
            l2_decay_loss += l2_decay*p[j]*p[j]/2; // accumulate weight decay loss
            l1_decay_loss += l1_decay*Math.abs(p[j]);
            var l1grad = l1_decay * (p[j] > 0 ? 1 : -1);
            var l2grad = l2_decay * (p[j]);

            var gij = (l2grad + l1grad + g[j]) / this.batch_size; // raw batch gradient

            var gsumi = this.gsum[i];
            var xsumi = this.xsum[i];
            if(this.method === 'adagrad') {
              // adagrad update
              gsumi[j] = gsumi[j] + gij * gij;
              var dx = - this.learning_rate / Math.sqrt(gsumi[j] + this.eps) * gij;
              p[j] += dx;
            } else if(this.method === 'windowgrad') {
              // this is adagrad but with a moving window weighted average
              // so the gradient is not accumulated over the entire history of the run. 
              // it's also referred to as Idea #1 in Zeiler paper on Adadelta. Seems reasonable to me!
              gsumi[j] = this.ro * gsumi[j] + (1-this.ro) * gij * gij;
              var dx = - this.learning_rate / Math.sqrt(gsumi[j] + this.eps) * gij; // eps added for better conditioning
              p[j] += dx;
            } else if(this.method === 'adadelta') {
              // assume adadelta if not sgd or adagrad
              gsumi[j] = this.ro * gsumi[j] + (1-this.ro) * gij * gij;
              var dx = - Math.sqrt((xsumi[j] + this.eps)/(gsumi[j] + this.eps)) * gij;
              xsumi[j] = this.ro * xsumi[j] + (1-this.ro) * dx * dx; // yes, xsum lags behind gsum by 1.
              p[j] += dx;
            } else {
              // assume SGD
              if(this.momentum > 0.0) {
                // momentum update
                var dx = this.momentum * gsumi[j] - this.learning_rate * gij; // step
                gsumi[j] = dx; // back this up for next iteration of momentum
                p[j] += dx; // apply corrected gradient
              } else {
                // vanilla sgd
                p[j] +=  - this.learning_rate * gij;
              }
            }
            g[j] = 0.0; // zero out gradient so that we can begin accumulating anew
          }
        }
      }

      // appending softmax_loss for backwards compatibility, but from now on we will always use cost_loss
      // in future, TODO: have to completely redo the way loss is done around the network as currently 
      // loss is a bit of a hack. Ideally, user should specify arbitrary number of loss functions on any layer
      // and it should all be computed correctly and automatically. 
      return {fwd_time: fwd_time, bwd_time: bwd_time, 
              l2_decay_loss: l2_decay_loss, l1_decay_loss: l1_decay_loss,
              cost_loss: cost_loss, softmax_loss: cost_loss, 
              loss: cost_loss + l1_decay_loss + l2_decay_loss}
    }
  }
  
  global.Trainer = Trainer;
  global.SGDTrainer = Trainer; // backwards compatibility
})(convnetjs);

(function(global) {
  "use strict";

  // used utilities, make explicit local references
  var randf = global.randf;
  var randi = global.randi;
  var Net = global.Net;
  var Trainer = global.Trainer;
  var maxmin = global.maxmin;
  var randperm = global.randperm;
  var weightedSample = global.weightedSample;
  var getopt = global.getopt;
  var arrUnique = global.arrUnique;

  /*
  A MagicNet takes data: a list of convnetjs.Vol(), and labels
  which for now are assumed to be class indeces 0..K. MagicNet then:
  - creates data folds for cross-validation
  - samples candidate networks
  - evaluates candidate networks on all data folds
  - produces predictions by model-averaging the best networks
  */
  var MagicNet = function(data, labels, opt) {
    var opt = opt || {};
    if(typeof data === 'undefined') { data = []; }
    if(typeof labels === 'undefined') { labels = []; }

    // required inputs
    this.data = data; // store these pointers to data
    this.labels = labels;

    // optional inputs
    this.train_ratio = getopt(opt, 'train_ratio', 0.7);
    this.num_folds = getopt(opt, 'num_folds', 10);
    this.num_candidates = getopt(opt, 'num_candidates', 50); // we evaluate several in parallel
    // how many epochs of data to train every network? for every fold?
    // higher values mean higher accuracy in final results, but more expensive
    this.num_epochs = getopt(opt, 'num_epochs', 50); 
    // number of best models to average during prediction. Usually higher = better
    this.ensemble_size = getopt(opt, 'ensemble_size', 10);

    // candidate parameters
    this.batch_size_min = getopt(opt, 'batch_size_min', 10);
    this.batch_size_max = getopt(opt, 'batch_size_max', 300);
    this.l2_decay_min = getopt(opt, 'l2_decay_min', -4);
    this.l2_decay_max = getopt(opt, 'l2_decay_max', 2);
    this.learning_rate_min = getopt(opt, 'learning_rate_min', -4);
    this.learning_rate_max = getopt(opt, 'learning_rate_max', 0);
    this.momentum_min = getopt(opt, 'momentum_min', 0.9);
    this.momentum_max = getopt(opt, 'momentum_max', 0.9);
    this.neurons_min = getopt(opt, 'neurons_min', 5);
    this.neurons_max = getopt(opt, 'neurons_max', 30);

    // computed
    this.folds = []; // data fold indices, gets filled by sampleFolds()
    this.candidates = []; // candidate networks that are being currently evaluated
    this.evaluated_candidates = []; // history of all candidates that were fully evaluated on all folds
    this.unique_labels = arrUnique(labels);
    this.iter = 0; // iteration counter, goes from 0 -> num_epochs * num_training_data
    this.foldix = 0; // index of active fold

    // callbacks
    this.finish_fold_callback = null;
    this.finish_batch_callback = null;

    // initializations
    if(this.data.length > 0) {
      this.sampleFolds();
      this.sampleCandidates();
    }
  };

  MagicNet.prototype = {

    // sets this.folds to a sampling of this.num_folds folds
    sampleFolds: function() {
      var N = this.data.length;
      var num_train = Math.floor(this.train_ratio * N);
      this.folds = []; // flush folds, if any
      for(var i=0;i<this.num_folds;i++) {
        var p = randperm(N);
        this.folds.push({train_ix: p.slice(0, num_train), test_ix: p.slice(num_train, N)});
      }
    },

    // returns a random candidate network
    sampleCandidate: function() {
      var input_depth = this.data[0].w.length;
      var num_classes = this.unique_labels.length;

      // sample network topology and hyperparameters
      var layer_defs = [];
      layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth: input_depth});
      var nl = weightedSample([0,1,2,3], [0.2, 0.3, 0.3, 0.2]); // prefer nets with 1,2 hidden layers
      for(var q=0;q<nl;q++) {
        var ni = randi(this.neurons_min, this.neurons_max);
        var act = ['tanh','maxout','relu'][randi(0,3)];
        if(randf(0,1)<0.5) {
          var dp = Math.random();
          layer_defs.push({type:'fc', num_neurons: ni, activation: act, drop_prob: dp});
        } else {
          layer_defs.push({type:'fc', num_neurons: ni, activation: act});
        }
      }
      layer_defs.push({type:'softmax', num_classes: num_classes});
      var net = new Net();
      net.makeLayers(layer_defs);

      // sample training hyperparameters
      var bs = randi(this.batch_size_min, this.batch_size_max); // batch size
      var l2 = Math.pow(10, randf(this.l2_decay_min, this.l2_decay_max)); // l2 weight decay
      var lr = Math.pow(10, randf(this.learning_rate_min, this.learning_rate_max)); // learning rate
      var mom = randf(this.momentum_min, this.momentum_max); // momentum. Lets just use 0.9, works okay usually ;p
      var tp = randf(0,1); // trainer type
      var trainer_def;
      if(tp<0.33) {
        trainer_def = {method:'adadelta', batch_size:bs, l2_decay:l2};
      } else if(tp<0.66) {
        trainer_def = {method:'adagrad', learning_rate: lr, batch_size:bs, l2_decay:l2};
      } else {
        trainer_def = {method:'sgd', learning_rate: lr, momentum: mom, batch_size:bs, l2_decay:l2};
      }
      
      var trainer = new Trainer(net, trainer_def);

      var cand = {};
      cand.acc = [];
      cand.accv = 0; // this will maintained as sum(acc) for convenience
      cand.layer_defs = layer_defs;
      cand.trainer_def = trainer_def;
      cand.net = net;
      cand.trainer = trainer;
      return cand;
    },

    // sets this.candidates with this.num_candidates candidate nets
    sampleCandidates: function() {
      this.candidates = []; // flush, if any
      for(var i=0;i<this.num_candidates;i++) {
        var cand = this.sampleCandidate();
        this.candidates.push(cand);
      }
    },

    step: function() {
      
      // run an example through current candidate
      this.iter++;

      // step all candidates on a random data point
      var fold = this.folds[this.foldix]; // active fold
      var dataix = fold.train_ix[randi(0, fold.train_ix.length)];
      for(var k=0;k<this.candidates.length;k++) {
        var x = this.data[dataix];
        var l = this.labels[dataix];
        this.candidates[k].trainer.train(x, l);
      }

      // process consequences: sample new folds, or candidates
      var lastiter = this.num_epochs * fold.train_ix.length;
      if(this.iter >= lastiter) {
        // finished evaluation of this fold. Get final validation
        // accuracies, record them, and go on to next fold.
        var val_acc = this.evalValErrors();
        for(var k=0;k<this.candidates.length;k++) {
          var c = this.candidates[k];
          c.acc.push(val_acc[k]);
          c.accv += val_acc[k];
        }
        this.iter = 0; // reset step number
        this.foldix++; // increment fold

        if(this.finish_fold_callback !== null) {
          this.finish_fold_callback();
        }

        if(this.foldix >= this.folds.length) {
          // we finished all folds as well! Record these candidates
          // and sample new ones to evaluate.
          for(var k=0;k<this.candidates.length;k++) {
            this.evaluated_candidates.push(this.candidates[k]);
          }
          // sort evaluated candidates according to accuracy achieved
          this.evaluated_candidates.sort(function(a, b) { 
            return (a.accv / a.acc.length) 
                 > (b.accv / b.acc.length) 
                 ? -1 : 1;
          });
          // and clip only to the top few ones (lets place limit at 3*ensemble_size)
          // otherwise there are concerns with keeping these all in memory 
          // if MagicNet is being evaluated for a very long time
          if(this.evaluated_candidates.length > 3 * this.ensemble_size) {
            this.evaluated_candidates = this.evaluated_candidates.slice(0, 3 * this.ensemble_size);
          }
          if(this.finish_batch_callback !== null) {
            this.finish_batch_callback();
          }
          this.sampleCandidates(); // begin with new candidates
          this.foldix = 0; // reset this
        } else {
          // we will go on to another fold. reset all candidates nets
          for(var k=0;k<this.candidates.length;k++) {
            var c = this.candidates[k];
            var net = new Net();
            net.makeLayers(c.layer_defs);
            var trainer = new Trainer(net, c.trainer_def);
            c.net = net;
            c.trainer = trainer;
          }
        }
      }
    },

    evalValErrors: function() {
      // evaluate candidates on validation data and return performance of current networks
      // as simple list
      var vals = [];
      var fold = this.folds[this.foldix]; // active fold
      for(var k=0;k<this.candidates.length;k++) {
        var net = this.candidates[k].net;
        var v = 0.0;
        for(var q=0;q<fold.test_ix.length;q++) {
          var x = this.data[fold.test_ix[q]];
          var l = this.labels[fold.test_ix[q]];
          net.forward(x);
          var yhat = net.getPrediction();
          v += (yhat === l ? 1.0 : 0.0); // 0 1 loss
        }
        v /= fold.test_ix.length; // normalize
        vals.push(v);
      }
      return vals;
    },

    // returns prediction scores for given test data point, as Vol
    // uses an averaged prediction from the best ensemble_size models
    // x is a Vol.
    predict_soft: function(data) {
      // forward prop the best networks
      // and accumulate probabilities at last layer into a an output Vol
      var nv = Math.min(this.ensemble_size, this.evaluated_candidates.length);
      if(nv === 0) { return new convnetjs.Vol(0,0,0); } // not sure what to do here? we're not ready yet
      var xout, n;
      for(var j=0;j<nv;j++) {
        var net = this.evaluated_candidates[j].net;
        var x = net.forward(data);
        if(j===0) { 
          xout = x; 
          n = x.w.length; 
        } else {
          // add it on
          for(var d=0;d<n;d++) {
            xout.w[d] += x.w[d];
          }
        }
      }
      // produce average
      for(var d=0;d<n;d++) {
        xout.w[d] /= n;
      }
      return xout;
    },

    predict: function(data) {
      var xout = this.predict_soft(data);
      if(xout.w.length !== 0) {
        var stats = maxmin(xout.w);
        var predicted_label = stats.maxi; 
      } else {
        var predicted_label = -1; // error out
      }
      return predicted_label;

    },

    toJSON: function() {
      // dump the top ensemble_size networks as a list
      var nv = Math.min(this.ensemble_size, this.evaluated_candidates.length);
      var json = {};
      json.nets = [];
      for(var i=0;i<nv;i++) {
        json.nets.push(this.evaluated_candidates[i].net.toJSON());
      }
      return json;
    },

    fromJSON: function(json) {
      this.ensemble_size = json.nets.length;
      this.evaluated_candidates = [];
      for(var i=0;i<this.ensemble_size;i++) {
        var net = new Net();
        net.fromJSON(json.nets[i]);
        var dummy_candidate = {};
        dummy_candidate.net = net;
        this.evaluated_candidates.push(dummy_candidate);
      }
    },

    // callback functions
    // called when a fold is finished, while evaluating a batch
    onFinishFold: function(f) { this.finish_fold_callback = f; },
    // called when a batch of candidates has finished evaluating
    onFinishBatch: function(f) { this.finish_batch_callback = f; }
    
  };

  global.MagicNet = MagicNet;
})(convnetjs);
(function(lib) {
  "use strict";
  if (typeof module === "undefined" || typeof module.exports === "undefined") {
    window.jsfeat = lib; // in ordinary browser attach library to window
  } else {
    module.exports = lib; // in nodejs
  }
})(convnetjs);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const path = __webpack_require__(3)
const convnetjs = __webpack_require__(0)
const labels = __webpack_require__(8)

const defaultOptions = {
  num_batches: 21,
  test_batch: 19,
  num_samples_per_batch: 3000,
  image_dimension: 28,
  image_channels: 1,
  use_validation_data: 1,
  random_flip: false,
  random_position: false
};

class ImportUtil {
  constructor(options=defaultOptions) {
    this.num_batches = options.num_batches;  // Import Util only
    this.test_batch = options.test_batch;   // Import Util only
    this.num_samples_per_batch = options.num_samples_per_batch;  // Import Util only
    this.image_dimension = options.image_dimension;  // Import Util only
    this.image_channels = options.image_channels;  // Import Util only
    this.use_validation_data = options.use_validation_data;  // Import Util only
    this.random_flip = options.random_flip;  // Import Util only
    this.random_position = options.random_flip;  // Import Util only

    this.data_img_elts = options.data_img_elts || new Array(this.num_batches)
    this.img_data = options.img_data || new Array(this.num_batches);  // Import Util Only
    this.loaded = options.loaded || new Array(this.num_batches).map(_ => false);  // Also mainly import util
    this.loaded_train_batches = options.loaded_training_batches || []; // Import Util only
  }

  getParams(){
    return {
      num_batches: this.num_batches,
      test_batch: this.test_batch,
      num_samples_per_batch: this.num_samples_per_batch,
      image_dimension: this.image_dimension,
      image_channels: this.image_channels,
      use_validation_data: this.use_validation_data,
      random_flip: this.random_flip,
      random_position: this.random_flip,

      // data_img_elts: this.data_img_elts,
      img_data: this.img_data,
      loaded: this.loaded,
      loaded_training_batches: this.loaded_train_batches
    }
  }

  loadAll() {
    return new Promise((res, _) => {
      for(let i = 0; i < this.num_batches; i++){
        this.load_data_batch(i, res)
      }
    })
  }

  finishedLoading() {
    for(let i = 0; i < this.num_batches; i++){
      console.log(this.img_data[i])
      if(!this.img_data[i]) return false
    } return true
  }

  // sample a random testing instance
  sample_test_instance() {
    const b = this.test_batch;
    const k = Math.floor(Math.random() * this.num_samples_per_batch);
    const n = b * this.num_samples_per_batch + k;

    const p = this.img_data[b].data;
    const x = new convnetjs.Vol(this.image_dimension, this.image_dimension, this.image_channels, 0.0);
    const W = this.image_dimension * this.image_dimension;
    // const j = 0;
    for (let dc = 0; dc < this.image_channels; dc++) { // For each image channel
      let i = 0;
      for (let xc = 0; xc < this.image_dimension; xc++) {
        for (let yc = 0; yc < this.image_dimension; yc++) {
          const ix = ((W * k) + i) * 4 + dc;
          x.set(yc, xc, dc, p[ix] / 255.0 - 0.5);
          i++;
        }
      }
    }

    // distort position and maybe flip
    const xs = [];

    if (this.random_flip || this.random_position) {
      for (let k = 0; k < 6; k++) {
        let test_variation = x;
        if (this.random_position) {
          const dx = Math.floor(Math.random() * 5 - 2);
          const dy = Math.floor(Math.random() * 5 - 2);
          test_variation = convnetjs.augment(test_variation, this.image_dimension, dx, dy, false);
        }

        if (this.random_flip) {
          test_variation = convnetjs.augment(test_variation, this.image_dimension, 0, 0, Math.random() < 0.5);
        }

        xs.push(test_variation);
      }
    } else {
      xs.push(x, this.image_dimension, 0, 0, false); // push an un-augmented copy
    }

    // return multiple augmentations, and we will average the network over them
    // to increase performance
    return {x: xs, label: labels[n]};
  }

    // NOTES: Returns random unseen training instance.
  sample_training_instance(step_num) {
    // find an unloaded batch
    const bi = Math.floor(Math.random() * this.loaded_train_batches.length);  // Random batch
    const b = this.loaded_train_batches[bi]; // b = batch
    const k = Math.floor(Math.random() * this.num_samples_per_batch); // sample within the batch
    const n = b * this.num_samples_per_batch + k;

    // // load more batches over time
    // if (step_num % (2 * this.num_samples_per_batch) === 0 && step_num > 0) {
    //   for (let i = 0; i < this.num_batches; i++) {
    //     if (!this.loaded[i]) {
    //       // load it
    //       this.load_data_batch(i);
    //       break; // okay for now
    //     }
    //   }
    // }

    // fetch the appropriate row of the training image and reshape into a Vol
    const p = this.img_data[b].data;
    let x = new convnetjs.Vol(this.image_dimension, this.image_dimension, this.image_channels, 0.0);
    const W = this.image_dimension * this.image_dimension;
    // const j = 0;
    for (let dc = 0; dc < this.image_channels; dc++) {
      let i = 0;
      for (let xc = 0; xc < this.image_dimension; xc++) {
        for (let yc = 0; yc < this.image_dimension; yc++) {
          const ix = ((W * k) + i) * 4 + dc;
          x.set(yc, xc, dc, p[ix] / 255.0 - 0.5);
          i++;
        }
      }
    }

    // if (this.random_position) {
    //   const dx = Math.floor(Math.random() * 5 - 2);
    //   const dy = Math.floor(Math.random() * 5 - 2);
    //   x = convnetjs.augment(x, this.image_dimension, dx, dy, false); // maybe change position
    // }

    // if (this.random_flip) {
    //   x = convnetjs.augment(x, this.image_dimension, 0, 0, Math.random() < 0.5); // maybe flip horizontally
    // }

    const isval = this.use_validation_data && n % 10 === 0;
    return {x: x, label: labels[n], isval: isval};
  }

  load_data_batch(batch_num, resolve) {
    // Load the dataset with JS in background
    this.data_img_elts[batch_num] = new Image();
    const data_img_elt = this.data_img_elts[batch_num];
    data_img_elt.onload = function() {
      const data_canvas = document.createElement('canvas');
      data_canvas.width = data_img_elt.width;
      data_canvas.height = data_img_elt.height;
      const data_ctx = data_canvas.getContext('2d');
      data_ctx.drawImage(data_img_elt, 0, 0); // copy it over... bit wasteful :(
      this.img_data[batch_num] = data_ctx.getImageData(0, 0, data_canvas.width, data_canvas.height);
      this.loaded[batch_num] = true;
      if (batch_num < this.test_batch) this.loaded_train_batches.push(batch_num);
      if (this.finishedLoading) resolve('finished');
    }.bind(this);
    data_img_elt.src = `/static/mnist/mnist_batch_${batch_num}.png`;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ImportUtil);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__extract_layers__ = __webpack_require__(6);

const cnnutil = __webpack_require__(5);
const convnetjs = __webpack_require__(0);

class MNISTNeuralNetwork {
  constructor(updateStats, importUtil) {
    this.updateStats = updateStats.bind(this);
    this.importUtil = importUtil

    this.isRunning = false;

    this.xLossWindow = new cnnutil.Window(100);
    this.wLossWindow = new cnnutil.Window(100);
    this.trainAccWindow = new cnnutil.Window(100);
    this.valAccWindow = new cnnutil.Window(100);

    // Set up layers and trainer
    const layer_defs = [];
    layer_defs.push({ type: "input", out_sx: 24, out_sy: 24, out_depth: 1 });
    layer_defs.push({
      type: "conv",
      sx: 5,
      filters: 8,
      stride: 1,
      pad: 2,
      activation: "relu"
    });
    layer_defs.push({ type: "pool", sx: 2, stride: 2 });
    layer_defs.push({
      type: "conv",
      sx: 5,
      filters: 16,
      stride: 1,
      pad: 2,
      activation: "relu"
    });
    layer_defs.push({ type: "pool", sx: 3, stride: 3 });
    layer_defs.push({ type: "softmax", num_classes: 10 });

    this.net = new convnetjs.Net();
    this.net.makeLayers(layer_defs);
    this.trainer = new convnetjs.SGDTrainer(this.net, {
      method: "adadelta",
      batch_size: 20,
      l2_decay: 0.001
    });

    this.run = this.run.bind(this);
    this.load = this.load.bind(this);
    this.emit = this.emit.bind(this);
    this.step = this.step.bind(this);
    this.test_predict = this.test_predict.bind(this);

    this.load();
  }

  load() {
    // this.importUtil.load_data_batch(0); // async load train set batch 0
    // this.importUtil.load_data_batch(this.test_batch); // async load test set
  }

  run() {
    this.isRunning = true;
    setInterval(this.step, 25);
  }

  emit() {
    this.updateStats({
      valAcc: this.valAccWindow.get_average(),
      trainAcc: this.trainAccWindow.get_average(),
      examples: this.step_num
    });
  }

  updateView(net) {
  }

  step() {
    const sample = this.importUtil.sample_training_instance();
    var x = sample.x;
    var y = sample.label;

    if (sample.isval) {
      // use x to build our estimate of validation error
      this.net.forward(x);
      let yhat = this.net.getPrediction();
      var val_acc = yhat === y ? 1.0 : 0.0;
      this.valAccWindow.add(val_acc);
      return; // get out
    }

    // train on it with network
    var stats = this.trainer.train(x, y);
    var lossx = stats.cost_loss;
    var lossw = stats.l2_decay_loss;

    // keep track of stats such as the average training error and loss
    let yhat = this.net.getPrediction();
    var train_acc = yhat === y ? 1.0 : 0.0;
    this.xLossWindow.add(lossx);
    this.wLossWindow.add(lossw);
    this.trainAccWindow.add(train_acc);

    // visualize activations
    if (this.step_num % 100 === 0) {
      this.updateView(this.net);
    }

    // run prediction on test set
    if (
      (this.step_num % 100 === 0 && this.step_num > 0) ||
      this.step_num === 100
    ) {
      this.test_predict();
    }
    this.step_num++;
    this.emit();
  }

  // evaluate current network on test set
  test_predict() {
    const num_classes = this.net.layers[this.net.layers.length - 1].out_depth;

    // grab a random test image
    for (let num = 0; num < 4; num++) {
      const sample = this.importUtil.sample_test_instance();
      const y = sample.label; // ground truth label

      // forward prop it through the network
      const aavg = new convnetjs.Vol(1, 1, num_classes, 0.0);

      // ensures we always have a list, regardless if above returns single item or list
      const xs = [].concat(sample.x);
      const n = xs.length;
      for (let i = 0; i < n; i++) {
        const a = this.net.forward(xs[i]);
        aavg.addFrom(a);
      }
      const preds = [];
      for (let k = 0; k < aavg.w.length; k++) {
        preds.push({ k: k, p: aavg.w[k] });
      }
      preds.sort(function(a, b) {
        return a.p < b.p ? 1 : -1;
      });

      const correct = preds[0].k === y;
      if (correct) {
        // global_total_correct++;
      }
      // global_total_count++;
    }
  }
}

// const nn = new MNISTNeuralNetwork();
// nn.run();
/* harmony default export */ __webpack_exports__["a"] = (MNISTNeuralNetwork);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// contains various utility functions
module.exports = (function(exports) {
  // a window stores _size_ number of values
  // and returns averages. Useful for keeping running
  // track of validation or training accuracy during SGD
  const Window = function(size, minsize) {
    this.v = [];
    this.size = typeof size === 'undefined' ? 100 : size;
    this.minsize = typeof minsize === 'undefined' ? 20 : minsize;
    this.sum = 0;
  }
  Window.prototype = {
    add: function(x) {
      this.v.push(x);
      this.sum += x;
      if (this.v.length > this.size) {
        const xold = this.v.shift();
        this.sum -= xold;
      }
    },
    get_average: function() {
      if (this.v.length < this.minsize) return -1;
      else return this.sum / this.v.length;
    },
    reset: function(x) {
      this.v = [];
      this.sum = 0;
    }
  }

  // returns min, max and indeces of an array
  const maxmin = function(w) {
    if (w.length === 0) { return {}; } // ... ;s

    let maxv = w[0];
    let minv = w[0];
    let maxi = 0;
    let mini = 0;
    for (let i = 1; i < w.length; i++) {
      if (w[i] > maxv) { maxv = w[i]; maxi = i; }
      if (w[i] < minv) { minv = w[i]; mini = i; }
    }
    return {maxi: maxi, maxv: maxv, mini: mini, minv: minv, dv:maxv-minv};
  }

  // returns string representation of float
  // but truncated to length of d digits
  const f2t = function(x, d) {
    if(typeof(d)==='undefined') { const d = 5; }
    const dd = 1.0 * Math.pow(10, d);
    return '' + Math.floor(x*dd)/dd;
  }

  exports = exports || {};
  exports.Window = Window;
  exports.maxmin = maxmin;
  exports.f2t = f2t;
  return exports;
})(typeof module != 'undefined' && module.exports);  // add exports to module.exports if in node.js

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const extractLayers = net => {
  // Extract the layers, slicing around Relu layers
  const layers = net.layers.slice(0, 2)
                  .concat(net.layers.slice(3, 5))
                  .concat(net.layers.slice(6));

  return layers.map(layer => extractLayer(layer));
};

const extractLayer = layer => {
  const layerInfo = {
    layer: layer.layer_type,
    x: layer.out_sx,
    y: layer.out_sy,
    z: layer.out_depth
  };

  layerInfo.blocks = extractFilterInfo(layer);
  return layerInfo;
};

const extractFilterInfo = layer => {
  const blocks = [];
  const blockSize = layer.out_sx * layer.out_sy;

  let block;
  let activationOffset = 0; // Keep track of where we are in the activation array
  for (let depth = 0; depth < layer.out_depth; depth++) {
    // Create a new block
    block = {
      min: 99999,
      max: -99999,
      neurons: []
    };

    let activation;
    // We need to have this loop so we know when a block is full without
    // disrupting the offset for the whole layer
    for (let neuronIndex = 0; neuronIndex < blockSize; neuronIndex++) {
      // console.log(layer);
      activation = layer.out_act.w[activationOffset];

      block.neurons.push({
        activation,
        input_neurons: [] // TODO: Extract input neurons
      });

      // Check if max/min has changed
      if (activation < block.min) { block.min = activation; }
      if (activation > block.max) { block.max = activation; }

      activationOffset++;
    }

    blocks.push(block);
  }

  return blocks;
};

/* unused harmony default export */ var _unused_webpack_default_export = (extractLayers);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mnist_neural_network__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__import_util__ = __webpack_require__(1);



// BUNDLER:
// webpack src/synapsis/mnist_worker.js static/synapsis/bundle_neural_network.js -w

// Triggerred when another worker attempts to connect
self.addEventListener("connect", function (e) {
  // get port from connection
  var port = e.ports[0];

  // create function callback for when steps occur
  const onUpdateStats = (stats) => {
    port.postMessage(stats);
  };

  // // init network
  // let network = {};
  // // TEMPORARY: initialize network in a try-catch block so
  // // error messages don't die silently

  // listen in on the other thread for when messages are sent
  port.addEventListener("message", function (e) {
    try {
      const importUtil = new __WEBPACK_IMPORTED_MODULE_1__import_util__["a" /* default */](e.data);
      const network = new __WEBPACK_IMPORTED_MODULE_0__mnist_neural_network__["a" /* default */](onUpdateStats, importUtil);
      network.run();
    } catch (e) {
      port.postMessage(e.stack);
    }

    // port.postMessage("MESSAGE RECEIVED");
    // // Start Network
    // if (e.data === "START") {
    //   network.isRunning = true;
    //   port.postMessage("WORKING");
    // }
    // // Pause Network
    // else if (e.data === "PAUSE") {
    //   network.isRunning = false;
    // }
    // // Reset & Start the network
    // else if (e.data === "RESET") {
    //   network = new MNISTNeuralNetwork(onUpdateStats);
    //   network.isRunning = true;
    // }
  }, false);

  // signal to the other thread that the connection has been made
  port.start();

  // Run the network's listeners in the background.
  // network.run();
}, false);


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = [5, 0, 4, 1, 9, 2, 1, 3, 1, 4, 3, 5, 3, 6, 1, 7, 2, 8, 6, 9, 4, 0, 9, 1, 1, 2, 4, 3, 2, 7, 3, 8, 6, 9, 0, 5, 6, 0, 7, 6, 1, 8, 7, 9, 3, 9, 8, 5, 9, 3, 3, 0, 7, 4, 9, 8, 0, 9, 4, 1, 4, 4, 6, 0, 4, 5, 6, 1, 0, 0, 1, 7, 1, 6, 3, 0, 2, 1, 1, 7, 9, 0, 2, 6, 7, 8, 3, 9, 0, 4, 6, 7, 4, 6, 8, 0, 7, 8, 3, 1, 5, 7, 1, 7, 1, 1, 6, 3, 0, 2, 9, 3, 1, 1, 0, 4, 9, 2, 0, 0, 2, 0, 2, 7, 1, 8, 6, 4, 1, 6, 3, 4, 5, 9, 1, 3, 3, 8, 5, 4, 7, 7, 4, 2, 8, 5, 8, 6, 7, 3, 4, 6, 1, 9, 9, 6, 0, 3, 7, 2, 8, 2, 9, 4, 4, 6, 4, 9, 7, 0, 9, 2, 9, 5, 1, 5, 9, 1, 2, 3, 2, 3, 5, 9, 1, 7, 6, 2, 8, 2, 2, 5, 0, 7, 4, 9, 7, 8, 3, 2, 1, 1, 8, 3, 6, 1, 0, 3, 1, 0, 0, 1, 7, 2, 7, 3, 0, 4, 6, 5, 2, 6, 4, 7, 1, 8, 9, 9, 3, 0, 7, 1, 0, 2, 0, 3, 5, 4, 6, 5, 8, 6, 3, 7, 5, 8, 0, 9, 1, 0, 3, 1, 2, 2, 3, 3, 6, 4, 7, 5, 0, 6, 2, 7, 9, 8, 5, 9, 2, 1, 1, 4, 4, 5, 6, 4, 1, 2, 5, 3, 9, 3, 9, 0, 5, 9, 6, 5, 7, 4, 1, 3, 4, 0, 4, 8, 0, 4, 3, 6, 8, 7, 6, 0, 9, 7, 5, 7, 2, 1, 1, 6, 8, 9, 4, 1, 5, 2, 2, 9, 0, 3, 9, 6, 7, 2, 0, 3, 5, 4, 3, 6, 5, 8, 9, 5, 4, 7, 4, 2, 7, 3, 4, 8, 9, 1, 9, 2, 8, 7, 9, 1, 8, 7, 4, 1, 3, 1, 1, 0, 2, 3, 9, 4, 9, 2, 1, 6, 8, 4, 7, 7, 4, 4, 9, 2, 5, 7, 2, 4, 4, 2, 1, 9, 7, 2, 8, 7, 6, 9, 2, 2, 3, 8, 1, 6, 5, 1, 1, 0, 2, 6, 4, 5, 8, 3, 1, 5, 1, 9, 2, 7, 4, 4, 4, 8, 1, 5, 8, 9, 5, 6, 7, 9, 9, 3, 7, 0, 9, 0, 6, 6, 2, 3, 9, 0, 7, 5, 4, 8, 0, 9, 4, 1, 2, 8, 7, 1, 2, 6, 1, 0, 3, 0, 1, 1, 8, 2, 0, 3, 9, 4, 0, 5, 0, 6, 1, 7, 7, 8, 1, 9, 2, 0, 5, 1, 2, 2, 7, 3, 5, 4, 9, 7, 1, 8, 3, 9, 6, 0, 3, 1, 1, 2, 6, 3, 5, 7, 6, 8, 3, 9, 5, 8, 5, 7, 6, 1, 1, 3, 1, 7, 5, 5, 5, 2, 5, 8, 7, 0, 9, 7, 7, 5, 0, 9, 0, 0, 8, 9, 2, 4, 8, 1, 6, 1, 6, 5, 1, 8, 3, 4, 0, 5, 5, 8, 3, 6, 2, 3, 9, 2, 1, 1, 5, 2, 1, 3, 2, 8, 7, 3, 7, 2, 4, 6, 9, 7, 2, 4, 2, 8, 1, 1, 3, 8, 4, 0, 6, 5, 9, 3, 0, 9, 2, 4, 7, 1, 2, 9, 4, 2, 6, 1, 8, 9, 0, 6, 6, 7, 9, 9, 8, 0, 1, 4, 4, 6, 7, 1, 5, 7, 0, 3, 5, 8, 4, 7, 1, 2, 5, 9, 5, 6, 7, 5, 9, 8, 8, 3, 6, 9, 7, 0, 7, 5, 7, 1, 1, 0, 7, 9, 2, 3, 7, 3, 2, 4, 1, 6, 2, 7, 5, 5, 7, 4, 0, 2, 6, 3, 6, 4, 0, 4, 2, 6, 0, 0, 0, 0, 3, 1, 6, 2, 2, 3, 1, 4, 1, 5, 4, 6, 4, 7, 2, 8, 7, 9, 2, 0, 5, 1, 4, 2, 8, 3, 2, 4, 1, 5, 4, 6, 0, 7, 9, 8, 4, 9, 8, 0, 1, 1, 0, 2, 2, 3, 2, 4, 4, 5, 8, 6, 5, 7, 7, 8, 8, 9, 7, 4, 7, 3, 2, 0, 8, 6, 8, 6, 1, 6, 8, 9, 4, 0, 9, 0, 4, 1, 5, 4, 7, 5, 3, 7, 4, 9, 8, 5, 8, 6, 3, 8, 6, 9, 9, 1, 8, 3, 5, 8, 6, 5, 9, 7, 2, 5, 0, 8, 5, 1, 1, 0, 9, 1, 8, 6, 7, 0, 9, 3, 0, 8, 8, 9, 6, 7, 8, 4, 7, 5, 9, 2, 6, 7, 4, 5, 9, 2, 3, 1, 6, 3, 9, 2, 2, 5, 6, 8, 0, 7, 7, 1, 9, 8, 7, 0, 9, 9, 4, 6, 2, 8, 5, 1, 4, 1, 5, 5, 1, 7, 3, 6, 4, 3, 2, 5, 6, 4, 4, 0, 4, 4, 6, 7, 2, 4, 3, 3, 8, 0, 0, 3, 2, 2, 9, 8, 2, 3, 7, 0, 1, 1, 0, 2, 3, 3, 8, 4, 3, 5, 7, 6, 4, 7, 7, 8, 5, 9, 7, 0, 3, 1, 6, 2, 4, 3, 4, 4, 7, 5, 9, 6, 9, 0, 7, 1, 4, 2, 7, 3, 6, 7, 5, 8, 4, 5, 5, 2, 7, 1, 1, 5, 6, 8, 5, 8, 4, 0, 7, 9, 9, 2, 9, 7, 7, 8, 7, 4, 2, 6, 9, 1, 7, 0, 6, 4, 2, 5, 7, 0, 7, 1, 0, 3, 7, 6, 5, 0, 6, 1, 5, 1, 7, 8, 5, 0, 3, 4, 7, 7, 5, 7, 8, 6, 9, 3, 8, 6, 1, 0, 9, 7, 1, 3, 0, 5, 6, 4, 4, 2, 4, 4, 3, 1, 7, 7, 6, 0, 3, 6, 0, 7, 1, 1, 4, 9, 4, 3, 4, 8, 2, 2, 1, 8, 7, 0, 8, 1, 0, 7, 6, 3, 7, 7, 5, 8, 8, 9, 0, 0, 4, 1, 5, 2, 2, 3, 9, 4, 9, 5, 0, 6, 7, 7, 1, 8, 0, 2, 2, 0, 4, 1, 1, 2, 7, 3, 9, 7, 2, 8, 1, 9, 5, 8, 8, 1, 9, 8, 3, 1, 6, 5, 7, 4, 2, 7, 0, 3, 0, 4, 1, 1, 7, 9, 1, 1, 8, 5, 7, 5, 0, 6, 6, 0, 4, 1, 2, 3, 4, 4, 6, 8, 0, 9, 5, 8, 7, 0, 3, 5, 4, 5, 9, 6, 7, 1, 9, 6, 1, 3, 8, 3, 9, 1, 2, 7, 7, 7, 0, 2, 3, 1, 1, 4, 2, 5, 6, 0, 9, 6, 2, 8, 9, 2, 3, 3, 6, 9, 1, 4, 3, 3, 0, 7, 7, 1, 7, 7, 3, 6, 4, 9, 5, 4, 4, 2, 7, 9, 0, 9, 8, 4, 4, 9, 1, 2, 4, 9, 3, 0, 4, 1, 6, 2, 6, 3, 7, 4, 2, 6, 6, 7, 1, 8, 9, 0, 4, 1, 4, 2, 1, 3, 6, 4, 6, 7, 5, 8, 7, 0, 5, 1, 4, 2, 8, 4, 7, 7, 3, 8, 4, 9, 5, 8, 6, 7, 3, 4, 6, 7, 1, 7, 4, 3, 3, 9, 8, 8, 1, 8, 6, 3, 1, 1, 3, 5, 2, 8, 4, 2, 9, 7, 1, 4, 8, 2, 9, 6, 4, 1, 3, 4, 2, 5, 2, 5, 6, 8, 0, 6, 2, 4, 9, 4, 9, 4, 5, 1, 5, 8, 4, 7, 9, 5, 9, 5, 9, 1, 5, 8, 3, 9, 9, 1, 8, 3, 8, 6, 5, 2, 7, 2, 7, 6, 0, 9, 7, 9, 4, 6, 0, 5, 3, 5, 7, 3, 9, 3, 6, 8, 3, 1, 7, 6, 5, 5, 7, 6, 5, 8, 2, 1, 7, 9, 2, 7, 3, 6, 7, 8, 5, 3, 7, 7, 8, 4, 0, 7, 3, 0, 6, 3, 9, 7, 1, 9, 5, 3, 6, 0, 9, 2, 8, 0, 9, 1, 6, 0, 0, 1, 9, 0, 0, 4, 2, 1, 7, 0, 3, 4, 4, 7, 5, 9, 8, 2, 0, 0, 8, 6, 2, 2, 7, 6, 1, 2, 9, 2, 6, 9, 7, 9, 5, 0, 8, 1, 5, 2, 4, 3, 9, 4, 7, 5, 6, 6, 7, 7, 6, 8, 5, 9, 7, 0, 6, 1, 9, 2, 3, 3, 5, 4, 3, 5, 8, 6, 3, 7, 2, 8, 4, 9, 5, 0, 2, 1, 4, 2, 4, 3, 1, 7, 1, 8, 0, 9, 6, 8, 1, 9, 4, 4, 9, 1, 8, 9, 6, 5, 5, 3, 3, 0, 1, 4, 3, 8, 3, 4, 2, 0, 7, 5, 5, 1, 8, 5, 3, 4, 6, 0, 5, 7, 2, 6, 6, 0, 1, 1, 4, 7, 9, 0, 0, 6, 6, 8, 6, 9, 4, 5, 2, 4, 0, 7, 5, 6, 5, 0, 9, 8, 6, 1, 9, 7, 5, 7, 5, 1, 1, 3, 0, 2, 0, 3, 8, 1, 6, 4, 6, 2, 6, 4, 8, 8, 1, 4, 4, 7, 1, 2, 2, 3, 9, 6, 4, 9, 5, 6, 2, 3, 9, 2, 6, 2, 7, 4, 3, 6, 4, 9, 7, 0, 2, 2, 9, 5, 4, 5, 0, 1, 4, 3, 6, 3, 2, 9, 7, 5, 3, 7, 0, 9, 5, 8, 3, 2, 0, 1, 8, 3, 0, 1, 2, 3, 4, 0, 0, 1, 7, 2, 9, 3, 9, 4, 2, 5, 8, 6, 7, 7, 9, 8, 9, 9, 2, 0, 0, 1, 4, 2, 4, 3, 9, 4, 3, 5, 7, 6, 5, 7, 1, 8, 6, 9, 3, 0, 4, 1, 2, 2, 5, 3, 7, 4, 1, 7, 7, 8, 1, 9, 2, 3, 2, 4, 0, 1, 8, 4, 3, 6, 5, 6, 4, 7, 9, 3, 1, 3, 0, 2, 1, 1, 0, 9, 9, 4, 6, 7, 6, 3, 5, 5, 4, 4, 6, 9, 1, 1, 3, 1, 1, 0, 5, 1, 4, 4, 6, 6, 6, 0, 1, 2, 0, 8, 2, 2, 1, 1, 3, 7, 9, 5, 3, 0, 2, 0, 6, 2, 9, 0, 7, 6, 9, 9, 1, 2, 9, 3, 4, 7, 9, 6, 0, 9, 4, 8, 7, 7, 9, 8, 6, 9, 5, 2, 2, 2, 3, 9, 8, 8, 8, 6, 4, 4, 4, 4, 2, 4, 6, 0, 7, 0, 7, 8, 2, 0, 8, 8, 3, 6, 8, 6, 6, 8, 6, 5, 1, 1, 8, 7, 8, 3, 6, 8, 9, 5, 0, 0, 0, 3, 2, 6, 6, 7, 8, 3, 5, 1, 4, 3, 5, 9, 4, 5, 4, 1, 1, 5, 4, 0, 9, 7, 1, 2, 5, 7, 9, 4, 0, 3, 6, 1, 7, 7, 5, 6, 3, 0, 1, 1, 4, 2, 4, 3, 6, 4, 7, 5, 7, 6, 9, 7, 2, 8, 4, 9, 8, 0, 7, 1, 1, 2, 3, 3, 5, 4, 6, 5, 0, 6, 3, 7, 3, 8, 2, 9, 0, 0, 9, 1, 2, 2, 9, 3, 9, 4, 6, 5, 2, 6, 6, 7, 6, 8, 2, 9, 2, 0, 6, 7, 2, 8, 6, 9, 0, 9, 6, 0, 3, 1, 1, 4, 9, 5, 8, 1, 0, 6, 6, 7, 2, 3, 4, 2, 3, 9, 0, 0, 4, 5, 0, 6, 4, 7, 4, 3, 1, 9, 3, 9, 9, 3, 1, 8, 7, 1, 7, 2, 8, 9, 9, 6, 2, 7, 2, 5, 0, 6, 7, 3, 9, 5, 9, 0, 8, 5, 8, 4, 9, 0, 5, 3, 2, 4, 8, 7, 4, 1, 5, 4, 6, 3, 7, 7, 9, 6, 6, 2, 2, 1, 6, 5, 4, 5, 3, 0, 5, 5, 2, 0, 5, 8, 8, 4, 2, 6, 9, 7, 1, 0, 2, 3, 1, 8, 7, 1, 8, 2, 7, 2, 6, 3, 2, 3, 7, 6, 8, 7, 5, 3, 8, 4, 4, 9, 4, 6, 4, 5, 5, 1, 1, 9, 3, 8, 6, 1, 4, 1, 7, 5, 4, 0, 4, 2, 7, 7, 5, 8, 0, 6, 9, 6, 6, 8, 7, 2, 0, 8, 8, 4, 8, 4, 4, 2, 3, 2, 3, 8, 2, 0, 5, 0, 0, 1, 0, 2, 1, 3, 3, 4, 7, 5, 3, 6, 1, 7, 6, 8, 3, 9, 0, 0, 7, 1, 2, 2, 4, 3, 7, 4, 1, 5, 0, 6, 3, 7, 9, 8, 7, 9, 5, 0, 1, 1, 8, 2, 6, 3, 3, 4, 3, 5, 3, 7, 1, 8, 1, 9, 6, 8, 9, 9, 7, 5, 0, 7, 3, 0, 6, 3, 8, 1, 6, 6, 1, 8, 6, 4, 6, 1, 0, 7, 1, 6, 4, 5, 1, 6, 7, 4, 8, 2, 5, 7, 3, 8, 4, 1, 6, 3, 3, 4, 5, 3, 2, 4, 5, 7, 1, 2, 4, 0, 0, 5, 8, 0, 6, 1, 1, 9, 3, 2, 1, 3, 4, 2, 4, 3, 4, 5, 8, 5, 6, 7, 6, 8, 9, 4, 0, 9, 4, 9, 4, 7, 4, 1, 6, 1, 3, 7, 3, 8, 3, 3, 2, 4, 4, 8, 7, 6, 4, 3, 6, 8, 7, 0, 7, 9, 5, 6, 5, 2, 3, 0, 4, 1, 4, 0, 5, 6, 1, 2, 6, 3, 4, 8, 5, 9, 5, 0, 2, 7, 5, 2, 9, 3, 4, 4, 0, 5, 2, 5, 5, 2, 9, 8, 3, 5, 2, 4, 4, 6, 7, 6, 4, 6, 6, 7, 0, 9, 6, 1, 8, 8, 5, 2, 1, 1, 5, 2, 0, 6, 9, 5, 2, 3, 1, 4, 1, 7, 6, 9, 2, 4, 6, 0, 1, 0, 5, 5, 5, 9, 2, 0, 4, 1, 1, 2, 4, 3, 0, 4, 2, 5, 7, 6, 2, 7, 7, 8, 3, 9, 0, 0, 2, 1, 1, 2, 8, 3, 4, 4, 1, 5, 9, 6, 1, 7, 5, 8, 9, 9, 6, 0, 1, 1, 7, 2, 8, 3, 7, 7, 8, 8, 8, 9, 7, 6, 8, 2, 4, 7, 4, 1, 8, 5, 0, 6, 9, 2, 8, 5, 2, 0, 0, 5, 4, 4, 3, 2, 1, 0, 5, 8, 5, 1, 4, 7, 2, 1, 4, 8, 6, 3, 4, 8, 1, 7, 5, 1, 3, 7, 1, 7, 9, 0, 0, 1, 9, 4, 0, 4, 8, 4, 8, 5, 1, 7, 1, 4, 2, 4, 4, 9, 2, 7, 3, 2, 4, 6, 9, 5, 1, 3, 2, 9, 4, 4, 3, 3, 6, 9, 2, 0, 6, 8, 8, 7, 5, 6, 6, 3, 8, 0, 4, 4, 6, 6, 7, 3, 4, 7, 7, 0, 6, 1, 6, 1, 6, 2, 0, 9, 7, 3, 6, 1, 3, 8, 2, 9, 2, 8, 7, 2, 9, 5, 6, 2, 2, 6, 4, 9, 7, 6, 3, 0, 0, 5, 0, 3, 1, 3, 0, 6, 2, 3, 3, 5, 0, 0, 7, 3, 4, 7, 5, 6, 4, 1, 4, 5, 2, 5, 1, 9, 5, 8, 6, 0, 7, 9, 4, 0, 9, 1, 3, 2, 5, 3, 3, 4, 6, 5, 1, 6, 7, 7, 7, 8, 4, 9, 3, 0, 0, 1, 0, 2, 0, 3, 6, 4, 6, 7, 5, 8, 1, 9, 4, 0, 8, 1, 9, 2, 6, 3, 1, 5, 0, 6, 4, 7, 8, 8, 7, 9, 6, 0, 1, 0, 7, 1, 5, 0, 5, 1, 0, 2, 2, 3, 8, 0, 1, 6, 3, 9, 7, 6, 8, 6, 6, 5, 9, 2, 0, 9, 6, 1, 5, 4, 2, 9, 7, 5, 3, 7, 1, 5, 6, 6, 7, 7, 3, 3, 6, 1, 2, 4, 7, 1, 8, 3, 2, 3, 8, 7, 5, 3, 7, 9, 8, 8, 6, 8, 8, 8, 2, 8, 4, 8, 1, 4, 5, 7, 1, 2, 2, 1, 9, 9, 5, 8, 2, 7, 9, 9, 7, 3, 7, 3, 1, 0, 6, 7, 9, 5, 2, 4, 1, 1, 0, 1, 3, 2, 9, 6, 4, 1, 3, 5, 9, 0, 1, 1, 4, 2, 3, 3, 0, 4, 2, 5, 3, 6, 4, 7, 5, 0, 0, 1, 2, 2, 7, 3, 7, 4, 7, 5, 6, 6, 5, 7, 3, 8, 1, 9, 9, 0, 7, 1, 8, 2, 0, 3, 4, 4, 3, 5, 1, 6, 7, 9, 5, 8, 0, 2, 1, 6, 3, 9, 3, 6, 2, 1, 2, 9, 1, 9, 3, 9, 9, 4, 4, 4, 2, 3, 9, 8, 0, 1, 4, 4, 8, 1, 2, 2, 7, 9, 3, 0, 3, 4, 3, 9, 6, 1, 2, 7, 0, 4, 6, 4, 1, 1, 4, 8, 3, 7, 6, 6, 2, 0, 2, 8, 8, 1, 7, 8, 2, 2, 7, 6, 6, 2, 7, 1, 0, 2, 4, 5, 1, 4, 9, 5, 6, 6, 0, 7, 2, 7, 5, 5, 1, 3, 1, 0, 4, 2, 1, 2, 1, 2, 6, 7, 0, 3, 6, 5, 3, 2, 4, 1, 0, 4, 2, 4, 1, 3, 4, 0, 6, 0, 5, 8, 4, 7, 0, 3, 1, 1, 2, 7, 6, 9, 5, 6, 0, 3, 5, 3, 1, 0, 1, 5, 4, 6, 9, 6, 3, 8, 5, 7, 6, 3, 1, 5, 9, 0, 2, 1, 1, 2, 8, 3, 8, 4, 0, 5, 5, 6, 5, 7, 7, 8, 0, 9, 6, 0, 9, 1, 8, 2, 3, 3, 4, 4, 3, 5, 5, 6, 5, 7, 1, 8, 8, 9, 0, 0, 2, 1, 6, 2, 7, 3, 7, 4, 7, 7, 7, 8, 1, 9, 4, 8, 6, 5, 1, 7, 0, 9, 1, 5, 9, 0, 8, 8, 1, 3, 2, 5, 7, 4, 7, 8, 0, 3, 8, 0, 0, 2, 4, 1, 9, 0, 9, 2, 0, 5, 8, 8, 8, 8, 9, 5, 8, 3, 3, 0, 6, 4, 4, 4, 8, 1, 2, 6, 9, 1, 6, 3, 3, 0, 6, 3, 4, 6, 2, 9, 4, 3, 6, 7, 7, 4, 5, 9, 2, 7, 8, 0, 1, 9, 1, 4, 4, 8, 4, 3, 9, 2, 2, 7, 1, 7, 8, 9, 9, 5, 8, 7, 4, 6, 9, 4, 4, 8, 8, 9, 6, 6, 6, 9, 4, 4, 2, 1, 9, 2, 0, 0, 3, 6, 4, 1, 2, 1, 8, 6, 7, 4, 5, 8, 1, 9, 1, 6, 3, 4, 5, 6, 0, 5, 1, 0, 1, 2, 2, 0, 6, 5, 4, 6, 7, 5, 2, 0, 8, 1, 9, 2, 8, 1, 3, 7, 8, 8, 8, 1, 2, 4, 8, 3, 0, 2, 7, 8, 9, 2, 2, 7, 8, 9, 5, 3, 6, 9, 3, 0, 2, 1, 3, 2, 5, 3, 4, 4, 4, 5, 9, 6, 5, 7, 9, 8, 3, 9, 4, 0, 8, 1, 0, 2, 2, 3, 9, 4, 5, 5, 7, 6, 2, 7, 7, 8, 1, 0, 7, 3, 5, 4, 4, 5, 3, 6, 4, 7, 2, 8, 1, 9, 7, 6, 1, 0, 9, 3, 1, 4, 7, 1, 9, 4, 4, 0, 2, 8, 2, 6, 7, 0, 0, 7, 7, 8, 7, 7, 8, 7, 9, 9, 3, 0, 4, 4, 0, 9, 3, 9, 5, 7, 6, 0, 7, 5, 1, 8, 2, 5, 7, 9, 4, 8, 4, 8, 7, 7, 9, 5, 0, 6, 6, 5, 4, 3, 9, 8, 6, 1, 9, 6, 7, 8, 2, 5, 9, 9, 2, 2, 1, 2, 2, 0, 9, 9, 4, 2, 3, 4, 9, 7, 3, 3, 3, 1, 9, 3, 7, 6, 5, 6, 0, 2, 6, 1, 3, 2, 4, 6, 3, 0, 8, 2, 4, 2, 2, 7, 1, 1, 9, 3, 9, 7, 4, 4, 4, 8, 8, 9, 5, 2, 3, 9, 4, 5, 2, 6, 6, 8, 6, 0, 7, 0, 4, 9, 7, 1, 9, 1, 0, 0, 5, 1, 1, 2, 9, 3, 5, 5, 3, 6, 4, 9, 2, 0, 6, 1, 1, 2, 0, 3, 9, 4, 3, 5, 3, 6, 3, 7, 1, 8, 7, 0, 0, 1, 1, 2, 9, 3, 5, 4, 1, 5, 8, 6, 3, 7, 3, 8, 7, 1, 7, 0, 1, 1, 8, 5, 0, 3, 4, 4, 8, 4, 1, 0, 7, 0, 2, 6, 8, 9, 7, 6, 4, 6, 3, 5, 6, 4, 1, 4, 4, 4, 3, 0, 3, 7, 1, 9, 3, 5, 1, 7, 2, 3, 3, 1, 6, 4, 8, 4, 1, 0, 8, 9, 8, 9, 4, 6, 2, 1, 1, 8, 0, 3, 0, 8, 7, 8, 4, 8, 7, 8, 5, 8, 8, 4, 4, 7, 9, 7, 9, 1, 9, 9, 8, 8, 0, 7, 0, 8, 7, 9, 6, 3, 7, 3, 6, 5, 8, 5, 9, 0, 6, 7, 1, 9, 0, 5, 2, 6, 7, 5, 1, 0, 3, 6, 9, 1, 1, 4, 4, 1, 3, 1, 3, 2, 8, 8, 7, 2, 5, 6, 1, 1, 0, 5, 2, 0, 9, 1, 0, 2, 8, 3, 6, 4, 2, 5, 3, 6, 2, 7, 5, 8, 2, 9, 8, 0, 6, 1, 9, 2, 0, 3, 1, 1, 9, 5, 3, 6, 9, 7, 8, 8, 1, 0, 1, 1, 3, 2, 4, 3, 0, 4, 0, 5, 3, 6, 8, 7, 7, 8, 7, 9, 0, 6, 4, 4, 3, 2, 1, 6, 8, 4, 0, 7, 5, 5, 9, 5, 5, 4, 7, 7, 2, 8, 1, 9, 6, 2, 5, 9, 6, 3, 4, 9, 6, 3, 3, 8, 8, 2, 2, 0, 9, 9, 8, 8, 4, 0, 4, 5, 3, 6, 2, 0, 3, 1, 2, 0, 9, 2, 2, 5, 5, 3, 3, 5, 4, 3, 8, 8, 8, 0, 7, 0, 4, 5, 9, 4, 0, 3, 6, 4, 0, 1, 9, 5, 6, 3, 4, 0, 2, 8, 2, 3, 1, 0, 4, 6, 7, 2, 0, 7, 2, 1, 4, 1, 6, 8, 7, 1, 8, 7, 4, 1, 0, 3, 6, 8, 4, 4, 3, 2, 9, 0, 8, 9, 9, 7, 2, 6, 7, 7, 5, 4, 3, 1, 3, 6, 1, 8, 9, 4, 8, 1, 6, 2, 8, 6, 5, 7, 9, 1, 6, 9, 6, 8, 0, 0, 0, 6, 7, 9, 7, 4, 9, 9, 9, 9, 7, 6, 7, 2, 8, 3, 6, 7, 9, 1, 7, 2, 1, 5, 1, 3, 7, 7, 0, 8, 6, 0, 3, 1, 3, 2, 6, 3, 8, 4, 9, 5, 6, 6, 1, 7, 3, 8, 2, 9, 4, 0, 2, 1, 5, 2, 9, 3, 2, 4, 4, 5, 7, 6, 8, 7, 3, 8, 7, 9, 2, 0, 1, 1, 9, 2, 7, 3, 6, 4, 6, 5, 5, 6, 4, 7, 5, 8, 8, 9, 7, 6, 5, 2, 8, 6, 9, 5, 0, 4, 1, 2, 2, 0, 0, 8, 0, 1, 2, 7, 0, 1, 2, 8, 8, 3, 7, 7, 0, 1, 1, 7, 1, 1, 2, 4, 9, 4, 0, 5, 6, 7, 6, 4, 9, 9, 7, 7, 7, 2, 8, 6, 3, 5, 5, 3, 2, 9, 1, 9, 8, 0, 2, 8, 6, 7, 2, 9, 6, 0, 3, 6, 7, 3, 7, 0, 5, 4, 4, 6, 7, 3, 6, 7, 6, 0, 1, 1, 1, 4, 8, 8, 6, 8, 1, 1, 0, 2, 1, 9, 8, 3, 9, 1, 5, 4, 5, 2, 8, 9, 4, 8, 2, 2, 9, 8, 4, 6, 8, 9, 5, 2, 4, 9, 7, 6, 6, 3, 1, 3, 9, 6, 7, 3, 0, 1, 5, 2, 8, 5, 0, 0, 1, 3, 1, 1, 1, 5, 2, 5, 6, 9, 7, 8, 3, 0, 7, 9, 9, 0, 2, 1, 6, 2, 9, 3, 7, 4, 8, 5, 4, 6, 8, 7, 7, 8, 0, 9, 7, 0, 5, 1, 9, 2, 8, 3, 6, 4, 9, 5, 8, 6, 9, 7, 5, 8, 1, 9, 1, 0, 3, 1, 1, 2, 6, 3, 7, 4, 5, 5, 6, 6, 2, 7, 0, 8, 8, 9, 2, 6, 4, 1, 6, 9, 9, 9, 3, 9, 2, 4, 9, 4, 8, 3, 4, 8, 5, 1, 0, 4, 0, 1, 6, 2, 6, 5, 4, 0, 7, 9, 9, 5, 1, 3, 9, 0, 9, 4, 5, 9, 1, 1, 7, 7, 4, 4, 5, 4, 3, 1, 3, 8, 1, 7, 0, 6, 2, 0, 4, 8, 8, 1, 6, 8, 1, 2, 3, 6, 3, 2, 9, 0, 1, 9, 1, 1, 7, 2, 1, 5, 5, 4, 6, 5, 4, 7, 4, 7, 8, 5, 4, 3, 4, 0, 2, 2, 5, 2, 1, 2, 6, 7, 1, 3, 5, 1, 5, 4, 3, 4, 6, 3, 7, 0, 1, 0, 2, 4, 9, 7, 2, 9, 6, 7, 2, 8, 6, 8, 0, 7, 0, 9, 0, 6, 9, 3, 4, 1, 7, 7, 4, 9, 2, 6, 6, 3, 3, 3, 3, 1, 3, 0, 4, 2, 7, 6, 9, 0, 3, 5, 1, 6, 3, 6, 4, 8, 7, 7, 3, 3, 8, 5, 9, 8, 3, 3, 4, 0, 7, 1, 6, 2, 0, 3, 8, 7, 4, 8, 3, 9, 2, 0, 7, 3, 8, 4, 0, 7, 1, 8, 0, 0, 5, 1, 4, 2, 1, 3, 7, 4, 7, 5, 1, 6, 5, 7, 5, 8, 9, 9, 8, 5, 0, 1, 5, 9, 6, 9, 0, 7, 4, 1, 9, 0, 2, 9, 8, 0, 7, 5, 3, 9, 7, 7, 7, 1, 7, 3, 4, 6, 7, 3, 0, 2, 3, 0, 0, 9, 4, 0, 8, 6, 9, 1, 3, 7, 7, 2, 0, 8, 7, 3, 6, 4, 9, 7, 6, 6, 7, 6, 9, 3, 8, 2, 7, 3, 0, 8, 5, 9, 9, 4, 2, 8, 4, 8, 8, 7, 4, 1, 8, 0, 1, 8, 6, 7, 7, 7, 7, 5, 2, 9, 3, 2, 6, 3, 6, 1, 4, 1, 6, 4, 4, 5, 1, 5, 2, 0, 5, 4, 3, 8, 1, 7, 7, 4, 5, 9, 6, 2, 2, 3, 6, 6, 7, 4, 8, 1, 4, 2, 4, 4, 8, 1, 2, 5, 0, 1, 2, 9, 8, 3, 5, 2, 7, 0, 4, 0, 9, 2, 7, 9, 4, 3, 5, 6, 4, 0, 9, 1, 8, 2, 1, 3, 7, 4, 2, 5, 2, 6, 7, 7, 5, 8, 8, 9, 1, 0, 1, 1, 0, 2, 3, 3, 1, 4, 4, 5, 0, 6, 4, 7, 0, 8, 1, 9, 1, 0, 3, 1, 3, 2, 3, 3, 3, 4, 2, 5, 7, 6, 2, 7, 6, 8, 4, 9, 1, 8, 6, 0, 7, 5, 7, 6, 0, 6, 1, 0, 6, 8, 4, 0, 4, 2, 2, 3, 9, 7, 6, 9, 7, 4, 2, 7, 3, 1, 1, 9, 0, 1, 5, 7, 6, 1, 5, 0, 4, 0, 1, 4, 9, 1, 3, 7, 6, 5, 2, 7, 2, 1, 8, 3, 8, 3, 8, 3, 3, 1, 6, 6, 0, 9, 5, 7, 7, 4, 9, 3, 5, 0, 8, 2, 5, 5, 1, 2, 7, 6, 9, 0, 0, 8, 2, 9, 6, 4, 5, 3, 4, 5, 7, 4, 6, 8, 5, 1, 0, 5, 4, 9, 3, 0, 9, 6, 3, 4, 8, 6, 4, 8, 3, 1, 6, 4, 0, 7, 1, 5, 2, 7, 2, 2, 2, 2, 8, 0, 1, 0, 0, 1, 3, 7, 6, 7, 2, 9, 2, 5, 5, 9, 9, 8, 5, 9, 7, 6, 3, 8, 1, 8, 9, 2, 7, 3, 0, 6, 8, 1, 0, 2, 0, 9, 9, 8, 8, 9, 3, 5, 1, 2, 8, 6, 8, 2, 6, 4, 5, 8, 2, 4, 1, 6, 1, 5, 6, 0, 2, 1, 2, 2, 0, 3, 9, 4, 2, 5, 6, 7, 7, 8, 5, 0, 4, 1, 6, 2, 7, 3, 3, 4, 0, 5, 3, 6, 3, 7, 0, 8, 4, 9, 0, 0, 1, 1, 5, 2, 9, 3, 0, 4, 4, 7, 5, 8, 3, 1, 1, 6, 1, 8, 4, 9, 6, 9, 1, 0, 7, 1, 0, 2, 6, 4, 4, 4, 4, 3, 7, 7, 5, 4, 9, 4, 1, 4, 3, 0, 7, 3, 4, 8, 4, 7, 6, 5, 4, 8, 0, 2, 7, 1, 3, 7, 1, 9, 4, 1, 8, 1, 9, 6, 6, 2, 5, 1, 4, 3, 9, 8, 9, 6, 6, 4, 9, 9, 7, 4, 8, 2, 3, 4, 4, 4, 7, 6, 7, 2, 5, 5, 2, 5, 8, 0, 3, 2, 0, 8, 0, 0, 2, 6, 7, 8, 8, 1, 8, 7, 3, 1, 3, 6, 3, 7, 0, 6, 1, 8, 4, 7, 7, 4, 3, 9, 2, 3, 6, 3, 1, 5, 6, 8, 7, 0, 4, 3, 0, 7, 9, 9, 4, 7, 3, 7, 1, 9, 9, 1, 7, 6, 0, 7, 5, 8, 6, 0, 9, 1, 2, 2, 9, 3, 0, 4, 1, 5, 6, 6, 1, 7, 0, 8, 7, 9, 6, 0, 9, 1, 6, 2, 9, 3, 2, 4, 5, 5, 1, 6, 1, 7, 7, 8, 5, 9, 1, 0, 4, 1, 4, 2, 3, 3, 1, 4, 1, 5, 0, 6, 7, 7, 3, 8, 9, 5, 1, 1, 1, 9, 5, 9, 1, 7, 1, 1, 6, 0, 8, 9, 7, 0, 2, 5, 3, 9, 6, 7, 8, 1, 0, 7, 3, 2, 1, 2, 7, 3, 4, 6, 1, 8, 1, 0, 9, 8, 0, 3, 1, 2, 7, 0, 2, 9, 6, 0, 1, 6, 7, 1, 9, 7, 6, 5, 5, 8, 8, 3, 4, 4, 8, 7, 3, 6, 4, 6, 6, 3, 8, 8, 9, 9, 4, 4, 0, 7, 8, 1, 0, 0, 1, 8, 5, 7, 1, 7, 5, 5, 9, 9, 4, 2, 5, 3, 7, 4, 6, 6, 0, 1, 0, 1, 2, 4, 8, 5, 3, 5, 0, 0, 6, 4, 3, 8, 3, 7, 1, 4, 3, 9, 2, 2, 0, 3, 6, 6, 7, 4, 3, 2, 2, 4, 9, 1, 0, 5, 2, 4, 8, 2, 1, 0, 8, 4, 4, 8, 0, 6, 4, 1, 4, 9, 6, 3, 1, 2, 9, 0, 1, 0, 4, 2, 9, 9, 4, 3, 8, 6, 9, 3, 0, 6, 7, 0, 3, 1, 4, 2, 3, 3, 0, 4, 2, 5, 5, 6, 3, 7, 2, 8, 5, 9, 2, 0, 1, 1, 8, 2, 9, 3, 1, 4, 1, 5, 7, 6, 4, 7, 7, 8, 3, 9, 3, 0, 5, 1, 3, 2, 0, 3, 0, 4, 0, 7, 4, 8, 8, 9, 0, 0, 1, 8, 7, 3, 9, 9, 5, 5, 9, 6, 7, 8, 2, 4, 6, 9, 8, 1, 6, 7, 9, 1, 6, 2, 0, 9, 6, 6, 2, 9, 1, 1, 2, 1, 3, 1, 5, 2, 7, 8, 0, 1, 0, 2, 8, 0, 2, 7, 3, 7, 5, 5, 1, 8, 2, 2, 6, 9, 1, 8, 7, 4, 0, 6, 0, 7, 3, 1, 0, 6, 6, 0, 9, 3, 4, 6, 7, 8, 9, 7, 3, 0, 0, 4, 0, 2, 6, 7, 5, 4, 6, 4, 8, 2, 0, 8, 7, 1, 7, 5, 1, 1, 2, 2, 7, 5, 6, 6, 7, 4, 2, 3, 9, 0, 2, 0, 9, 0, 4, 3, 4, 7, 7, 0, 3, 6, 0, 4, 3, 8, 6, 8, 1, 3, 8, 9, 0, 9, 0, 8, 0, 2, 8, 7, 8, 7, 9, 1, 7, 0, 3, 1, 4, 2, 3, 3, 8, 4, 9, 5, 6, 6, 4, 7, 0, 8, 3, 9, 8, 0, 6, 1, 8, 2, 5, 3, 2, 4, 5, 5, 6, 6, 9, 7, 3, 8, 9, 9, 3, 0, 8, 1, 3, 2, 0, 3, 2, 4, 9, 5, 9, 6, 4, 7, 3, 8, 4, 9, 3, 6, 5, 2, 7, 5, 8, 6, 2, 2, 7, 5, 5, 1, 9, 7, 1, 1, 8, 8, 3, 3, 3, 8, 2, 7, 2, 1, 5, 7, 3, 1, 4, 4, 7, 7, 7, 2, 4, 6, 5, 5, 9, 3, 5, 9, 3, 9, 8, 0, 0, 8, 0, 7, 6, 3, 0, 0, 0, 3, 7, 7, 8, 0, 8, 1, 9, 1, 2, 2, 4, 1, 1, 6, 6, 0, 0, 5, 4, 3, 9, 3, 1, 6, 7, 3, 0, 5, 1, 9, 0, 9, 7, 0, 5, 1, 2, 2, 3, 3, 0, 4, 0, 5, 1, 6, 9, 7, 1, 8, 9, 9, 6, 0, 5, 1, 2, 2, 1, 3, 9, 4, 8, 7, 8, 8, 9, 9, 7, 0, 3, 1, 9, 2, 7, 3, 8, 4, 5, 5, 1, 6, 6, 7, 6, 8, 9, 9, 0, 6, 3, 0, 7, 7, 6, 3, 7, 7, 1, 1, 9, 3, 8, 7, 6, 9, 3, 7, 4, 4, 1, 0, 7, 0, 6, 6, 3, 9, 4, 5, 9, 6, 8, 9, 7, 8, 5, 5, 6, 1, 2, 5, 0, 3, 5, 9, 0, 8, 1, 3, 0, 4, 9, 0, 3, 5, 2, 6, 5, 3, 0, 4, 2, 8, 7, 0, 8, 6, 1, 4, 6, 8, 6, 1, 4, 3, 2, 4, 3, 0, 3, 1, 1, 9, 0, 2, 1, 3, 7, 7, 7, 5, 6, 1, 2, 7, 9, 2, 3, 8, 0, 7, 9, 0, 5, 1, 5, 9, 8, 6, 9, 4, 0, 1, 7, 2, 5, 3, 8, 1, 6, 3, 6, 5, 6, 3, 5, 4, 0, 1, 0, 6, 0, 8, 8, 0, 0, 8, 2, 9, 3, 4, 9, 9, 2, 2, 1, 6, 3, 0, 5, 1, 1, 2, 7, 3, 9, 5, 4, 6, 2, 7, 2, 8, 9, 9, 3, 0, 0, 1, 1, 2, 4, 4, 3, 5, 3, 6, 9, 7, 5, 8, 2, 9, 9, 0, 3, 1, 6, 2, 5, 3, 7, 4, 1, 5, 2, 6, 1, 7, 2, 8, 4, 9, 6, 0, 7, 7, 3, 5, 6, 0, 6, 8, 5, 4, 7, 1, 6, 8, 6, 8, 7, 1, 7, 3, 3, 1, 2, 8, 4, 3, 9, 7, 4, 9, 3, 3, 8, 0, 6, 9, 6, 4, 9, 4, 0, 0, 6, 7, 3, 4, 1, 2, 2, 9, 7, 8, 3, 7, 4, 2, 1, 7, 6, 8, 5, 9, 0, 3, 6, 1, 1, 4, 9, 6, 3, 5, 1, 2, 1, 2, 0, 2, 6, 5, 6, 6, 1, 7, 3, 8, 4, 7, 5, 5, 3, 1, 9, 6, 1, 4, 1, 9, 5, 2, 9, 9, 3, 3, 5, 5, 9, 3, 1, 6, 9, 6, 4, 0, 1, 0, 0, 2, 0, 5, 0, 6, 2, 4, 9, 9, 8, 2, 8, 7, 9, 4, 2, 9, 2, 1, 5, 0, 7, 2, 2, 2, 6, 3, 7, 6, 2, 1, 8, 8, 9, 3, 6, 0, 3, 3, 9, 5, 3, 0, 2, 0, 1, 6, 0, 1, 5, 6, 4, 9, 0, 5, 9, 3, 3, 9, 4, 4, 7, 5, 6, 8, 1, 6, 2, 7, 4, 1, 6, 1, 3, 7, 4, 0, 6, 1, 9, 2, 1, 3, 7, 4, 3, 5, 8, 6, 3, 7, 7, 8, 0, 9, 3, 0, 4, 1, 5, 2, 7, 3, 2, 4, 6, 5, 9, 6, 1, 7, 6, 8, 6, 9, 6, 0, 1, 1, 5, 2, 8, 3, 0, 4, 9, 5, 2, 6, 7, 7, 3, 8, 5, 9, 1, 1, 8, 0, 6, 4, 5, 5, 4, 6, 8, 6, 3, 3, 0, 4, 9, 4, 2, 2, 3, 8, 9, 1, 2, 0, 7, 6, 3, 4, 7, 9, 1, 7, 7, 2, 2, 3, 4, 3, 2, 9, 1, 2, 7, 0, 8, 9, 5, 3, 1, 3, 8, 9, 9, 1, 0, 5, 9, 2, 2, 3, 1, 1, 9, 6, 5, 7, 7, 3, 6, 7, 9, 8, 0, 4, 5, 0, 3, 2, 9, 4, 6, 0, 1, 2, 3, 4, 1, 7, 1, 8, 5, 0, 2, 7, 1, 0, 3, 6, 4, 9, 1, 3, 2, 2, 2, 4, 4, 8, 7, 6, 7, 0, 7, 1, 8, 0, 2, 6, 7, 7, 1, 2, 2, 9, 0, 7, 3, 9, 6, 5, 8, 8, 4, 9, 9, 6, 8, 6, 4, 2, 9, 8, 9, 1, 9, 7, 2, 5, 3, 5, 2, 7, 9, 3, 7, 5, 6, 0, 5, 1, 3, 1, 4, 3, 1, 8, 5, 4, 2, 9, 1, 4, 6, 5, 8, 1, 5, 8, 5, 6, 7, 8, 2, 9, 1, 0, 1, 1, 4, 2, 2, 3, 8, 4, 3, 5, 4, 6, 4, 7, 2, 8, 7, 9, 1, 0, 0, 1, 3, 2, 1, 3, 9, 4, 6, 5, 9, 6, 8, 7, 8, 8, 1, 0, 6, 1, 7, 2, 7, 3, 2, 4, 1, 5, 4, 6, 4, 7, 4, 8, 1, 9, 5, 6, 6, 6, 4, 3, 2, 4, 9, 2, 5, 8, 5, 1, 7, 0, 7, 6, 3, 4, 8, 9, 3, 7, 8, 2, 5, 3, 0, 3, 9, 9, 0, 3, 3, 3, 5, 9, 0, 1, 7, 5, 9, 2, 4, 3, 9, 1, 4, 6, 4, 7, 0, 3, 1, 7, 0, 8, 8, 4, 5, 0, 0, 2, 1, 4, 0, 0, 0, 7, 9, 8, 4, 0, 6, 7, 3, 0, 3, 6, 2, 9, 5, 3, 2, 2, 3, 4, 5, 8, 8, 6, 1, 0, 7, 5, 2, 7, 3, 5, 8, 1, 1, 0, 9, 8, 5, 1, 1, 6, 5, 7, 9, 2, 7, 9, 1, 7, 9, 9, 1, 5, 2, 6, 6, 5, 8, 2, 6, 6, 0, 1, 6, 7, 3, 5, 0, 5, 6, 7, 8, 3, 0, 5, 1, 0, 3, 1, 5, 1, 2, 3, 3, 8, 5, 1, 3, 0, 0, 1, 4, 2, 5, 3, 3, 4, 3, 5, 7, 6, 5, 7, 1, 8, 9, 9, 3, 0, 2, 1, 0, 2, 0, 3, 4, 4, 3, 5, 6, 6, 4, 7, 6, 8, 1, 9, 9, 0, 4, 1, 6, 2, 2, 3, 0, 4, 8, 5, 5, 6, 6, 7, 7, 8, 2, 9, 2, 7, 6, 4, 4, 7, 6, 7, 1, 3, 4, 9, 2, 8, 2, 8, 0, 3, 8, 1, 3, 5, 0, 8, 5, 2, 8, 7, 8, 6, 7, 1, 8, 5, 9, 2, 3, 6, 9, 4, 9, 1, 3, 8, 5, 7, 6, 5, 7, 5, 1, 1, 4, 8, 8, 9, 4, 1, 0, 3, 2, 6, 9, 3, 8, 3, 4, 2, 6, 2, 7, 6, 4, 6, 1, 5, 4, 5, 1, 3, 4, 3, 6, 8, 9, 1, 7, 6, 1, 5, 1, 6, 6, 8, 6, 1, 3, 9, 6, 7, 8, 6, 8, 8, 3, 3, 1, 7, 9, 9, 7, 0, 3, 0, 3, 3, 4, 7, 4, 9, 7, 3, 6, 0, 8, 2, 8, 0, 4, 1, 5, 0, 3, 1, 0, 0, 7, 1, 8, 0, 8, 4, 8, 7, 2, 9, 2, 2, 2, 0, 0, 6, 3, 2, 9, 6, 5, 2, 6, 2, 1, 9, 2, 9, 5, 0, 5, 1, 0, 2, 7, 3, 4, 4, 1, 5, 4, 6, 3, 8, 5, 9, 3, 0, 5, 1, 7, 3, 9, 4, 6, 5, 4, 6, 4, 7, 0, 8, 1, 9, 5, 0, 1, 1, 0, 2, 7, 3, 7, 4, 6, 5, 6, 6, 9, 7, 7, 8, 1, 9, 0, 1, 1, 8, 0, 6, 3, 7, 0, 1, 3, 3, 5, 7, 4, 7, 4, 9, 1, 3, 6, 6, 7, 0, 4, 2, 6, 6, 8, 4, 0, 8, 6, 4, 9, 5, 1, 0, 0, 3, 7, 9, 6, 2, 8, 1, 8, 1, 1, 5, 3, 9, 7, 4, 3, 2, 7, 0, 0, 4, 8, 4, 3, 0, 2, 9, 3, 6, 0, 9, 7, 2, 5, 2, 8, 1, 5, 7, 4, 9, 2, 5, 5, 1, 3, 1, 5, 9, 8, 6, 9, 0, 8, 1, 4, 8, 6, 4, 4, 6, 6, 8, 0, 8, 4, 2, 8, 6, 8, 3, 4, 2, 4, 9, 8, 2, 8, 4, 7, 0, 9, 9, 1, 0, 7, 3, 3, 3, 6, 5, 5, 8, 0, 4, 1, 7, 5, 6, 9, 2, 5, 2, 9, 7, 3, 7, 2, 0, 5, 5, 9, 1, 5, 5, 6, 3, 3, 0, 3, 1, 2, 2, 7, 3, 1, 4, 7, 5, 5, 6, 1, 7, 9, 8, 6, 0, 6, 1, 7, 4, 1, 7, 7, 0, 5, 1, 9, 4, 5, 7, 4, 8, 3, 9, 3, 6, 8, 8, 3, 2, 1, 4, 7, 6, 3, 8, 3, 6, 7, 6, 2, 7, 3, 1, 7, 7, 8, 0, 9, 2, 3, 2, 9, 0, 8, 1, 1, 6, 0, 5, 6, 1, 7, 2, 9, 0, 5, 2, 8, 3, 8, 4, 8, 8, 2, 3, 1, 7, 2, 4, 9, 1, 8, 7, 6, 4, 7, 8, 0, 3, 0, 9, 8, 6, 9, 7, 3, 0, 0, 9, 0, 6, 0, 0, 2, 6, 8, 1, 5, 0, 5, 5, 6, 5, 5, 1, 7, 0, 5, 1, 4, 0, 2, 9, 8, 4, 4, 5, 1, 9, 8, 7, 4, 0, 0, 2, 9, 1, 6, 4, 7, 4, 0, 9, 2, 6, 9, 7, 0, 4, 1, 8, 1, 9, 5, 0, 8, 1, 7, 2, 3, 3, 5, 7, 8, 8, 4, 0, 0, 1, 1, 2, 8, 3, 5, 4, 3, 5, 8, 6, 0, 8, 0, 9, 7, 0, 9, 1, 3, 7, 1, 9, 0, 6, 6, 3, 0, 3, 5, 9, 9, 9, 2, 5, 1, 1, 8, 4, 1, 2, 3, 5, 2, 4, 1, 7, 6, 9, 2, 1, 4, 5, 7, 2, 9, 6, 6, 3, 9, 7, 4, 8, 6, 5, 6, 1, 3, 2, 9, 6, 9, 6, 5, 7, 5, 8, 1, 8, 9, 1, 4, 8, 8, 3, 4, 7, 6, 0, 0, 0, 0, 1, 3, 5, 3, 0, 8, 5, 1, 2, 2, 8, 8, 0, 5, 4, 2, 3, 9, 1, 3, 8, 4, 2, 5, 9, 3, 9, 0, 5, 1, 2, 3, 6, 0, 5, 4, 7, 8, 1, 2, 9, 5, 7, 7, 1, 1, 2, 4, 6, 9, 0, 8, 0, 8, 1, 4, 2, 1, 3, 8, 4, 3, 5, 9, 6, 2, 7, 9, 8, 9, 9, 6, 0, 4, 1, 6, 2, 9, 3, 7, 4, 6, 7, 3, 8, 5, 9, 8, 0, 6, 1, 1, 2, 6, 3, 7, 4, 8, 7, 6, 8, 5, 9, 1, 5, 7, 1, 5, 9, 1, 9, 2, 0, 5, 9, 5, 0, 4, 5, 3, 9, 9, 1, 0, 7, 9, 2, 9, 2, 5, 3, 2, 3, 9, 2, 2, 0, 6, 9, 5, 0, 0, 6, 9, 1, 5, 7, 7, 5, 4, 0, 4, 3, 7, 4, 0, 7, 3, 6, 8, 6, 2, 3, 6, 3, 4, 8, 6, 4, 8, 7, 5, 1, 7, 0, 7, 8, 8, 7, 9, 5, 9, 2, 7, 1, 8, 1, 0, 4, 8, 5, 3, 5, 1, 0, 2, 4, 8, 8, 1, 7, 3, 4, 7, 9, 3, 2, 0, 3, 7, 6, 6, 4, 2, 1, 5, 2, 7, 1, 4, 5, 7, 2, 5, 0, 8, 4, 0, 8, 2, 6, 7, 1, 0, 9, 4, 3, 5, 2, 2, 0, 0, 0, 5, 2, 8, 5, 0, 6, 7, 9, 5, 3, 7, 6, 7, 3, 7, 6, 5, 0, 2, 1, 2, 2, 3, 3, 6, 4, 8, 6, 1, 7, 1, 8, 1, 9, 2, 0, 1, 1, 3, 2, 2, 3, 9, 4, 7, 5, 7, 1, 3, 7, 1, 8, 4, 0, 2, 1, 9, 2, 2, 3, 6, 1, 8, 7, 7, 8, 1, 8, 4, 5, 5, 7, 7, 9, 5, 5, 8, 0, 6, 8, 1, 3, 6, 5, 0, 4, 6, 8, 0, 3, 4, 0, 0, 2, 9, 1, 7, 0, 1, 2, 9, 5, 2, 8, 9, 8, 5, 5, 5, 3, 2, 0, 2, 4, 8, 4, 6, 1, 9, 6, 7, 1, 1, 3, 5, 0, 2, 3, 4, 6, 6, 9, 0, 3, 8, 7, 2, 9, 8, 7, 8, 0, 6, 4, 9, 8, 2, 3, 6, 2, 1, 7, 4, 7, 2, 9, 7, 5, 1, 1, 7, 5, 1, 2, 9, 8, 8, 9, 1, 6, 6, 9, 5, 7, 0, 6, 8, 4, 0, 1, 2, 2, 3, 0, 1, 6, 4, 1, 6, 1, 6, 7, 0, 2, 7, 3, 8, 6, 1, 4, 1, 8, 2, 6, 4, 4, 6, 6, 3, 5, 3, 0, 8, 2, 1, 0, 3, 5, 5, 6, 2, 5, 4, 0, 6, 1, 3, 2, 9, 1, 8, 7, 8, 8, 7, 1, 7, 4, 2, 3, 2, 2, 7, 8, 3, 2, 9, 7, 1, 9, 2, 3, 3, 9, 2, 0, 1, 1, 1, 2, 3, 3, 8, 4, 8, 5, 5, 6, 8, 7, 7, 8, 2, 9, 0, 0, 1, 1, 4, 2, 2, 3, 1, 4, 1, 5, 3, 6, 6, 7, 0, 8, 3, 9, 1, 0, 5, 1, 3, 2, 8, 3, 9, 4, 3, 7, 9, 8, 8, 9, 6, 0, 7, 0, 2, 1, 9, 0, 3, 1, 7, 2, 1, 7, 3, 5, 6, 3, 9, 4, 8, 4, 2, 0, 0, 0, 0, 6, 8, 9, 9, 6, 1, 6, 6, 2, 1, 3, 4, 4, 6, 4, 4, 9, 0, 1, 7, 7, 2, 9, 4, 5, 2, 7, 5, 5, 5, 6, 9, 2, 6, 3, 1, 1, 1, 4, 8, 4, 1, 0, 7, 9, 9, 9, 2, 6, 2, 1, 3, 8, 1, 3, 3, 3, 8, 7, 7, 3, 2, 9, 9, 8, 2, 8, 3, 4, 2, 7, 2, 7, 3, 6, 0, 2, 1, 1, 2, 9, 2, 8, 3, 7, 2, 8, 9, 8, 3, 2, 5, 3, 4, 9, 1, 0, 7, 7, 8, 9, 9, 0, 8, 6, 0, 4, 2, 1, 5, 1, 9, 2, 8, 8, 4, 2, 1, 6, 0, 1, 3, 5, 1, 0, 8, 1, 1, 2, 5, 3, 5, 4, 8, 5, 0, 6, 5, 7, 1, 8, 7, 9, 4, 0, 8, 1, 0, 2, 1, 3, 3, 4, 4, 5, 7, 6, 6, 7, 2, 8, 8, 9, 0, 0, 1, 1, 3, 2, 6, 3, 0, 4, 5, 5, 9, 6, 5, 7, 9, 8, 0, 9, 0, 2, 1, 2, 1, 7, 5, 6, 5, 4, 9, 0, 7, 5, 8, 8, 1, 0, 1, 7, 4, 3, 2, 5, 8, 4, 2, 1, 9, 8, 8, 0, 6, 5, 8, 2, 0, 7, 0, 2, 0, 3, 9, 6, 1, 2, 9, 1, 2, 7, 0, 7, 9, 9, 0, 9, 7, 1, 9, 2, 0, 4, 8, 6, 4, 7, 2, 7, 5, 5, 5, 4, 3, 5, 6, 0, 6, 1, 6, 1, 4, 9, 3, 9, 0, 8, 3, 0, 3, 2, 4, 0, 2, 3, 5, 5, 6, 6, 7, 1, 7, 8, 1, 6, 5, 4, 0, 6, 2, 0, 6, 9, 4, 2, 8, 6, 5, 4, 3, 3, 3, 9, 0, 3, 3, 0, 7, 0, 5, 5, 2, 2, 4, 5, 0, 8, 9, 8, 1, 8, 6, 9, 9, 4, 7, 3, 1, 4, 6, 2, 7, 8, 0, 8, 3, 7, 0, 1, 3, 1, 3, 3, 5, 6, 2, 9, 9, 4, 5, 1, 6, 3, 9, 8, 7, 7, 1, 6, 6, 9, 6, 3, 6, 3, 2, 7, 1, 4, 2, 1, 7, 9, 4, 1, 0, 0, 7, 6, 1, 0, 3, 1, 0, 2, 0, 3, 6, 4, 2, 5, 5, 6, 1, 7, 0, 8, 0, 9, 1, 0, 7, 3, 0, 4, 8, 5, 3, 6, 3, 7, 1, 8, 5, 9, 5, 0, 7, 1, 8, 2, 0, 3, 8, 7, 7, 8, 6, 9, 7, 7, 7, 6, 6, 0, 8, 6, 6, 6, 2, 6, 2, 9, 1, 0, 0, 0, 1, 1, 1, 3, 3, 9, 1, 7, 7, 3, 7, 8, 0, 5, 4, 8, 1, 1, 5, 4, 1, 8, 7, 5, 3, 1, 7, 0, 3, 1, 5, 6, 3, 0, 1, 3, 7, 8, 7, 9, 3, 2, 2, 1, 2, 7, 6, 4, 4, 5, 8, 2, 2, 8, 7, 4, 9, 7, 1, 1, 9, 8, 1, 0, 6, 6, 2, 3, 3, 2, 3, 9, 7, 0, 8, 4, 3, 7, 9, 4, 4, 3, 8, 4, 9, 5, 3, 0, 7, 0, 0, 2, 5, 0, 3, 1, 7, 2, 1, 3, 5, 4, 0, 5, 3, 6, 4, 7, 7, 8, 4, 9, 0, 0, 0, 1, 9, 2, 4, 3, 7, 4, 6, 7, 0, 8, 7, 9, 0, 0, 6, 1, 2, 2, 0, 3, 1, 7, 4, 8, 8, 9, 7, 8, 0, 6, 8, 5, 9, 0, 8, 6, 6, 8, 6, 9, 9, 4, 9, 1, 5, 9, 9, 0, 8, 4, 6, 8, 6, 9, 1, 1, 1, 4, 2, 0, 6, 5, 3, 5, 8, 4, 2, 0, 4, 7, 4, 6, 1, 0, 3, 1, 6, 7, 0, 0, 9, 6, 9, 8, 3, 7, 7, 9, 7, 8, 8, 6, 0, 0, 4, 8, 2, 1, 2, 7, 6, 7, 8, 1, 4, 3, 1, 1, 6, 0, 8, 0, 1, 7, 2, 8, 5, 9, 1, 3, 7, 8, 6, 4, 4, 7, 1, 2, 9, 3, 3, 6, 9, 9, 6, 2, 4, 2, 5, 4, 9, 6, 1, 5, 6, 5, 1, 1, 9, 3, 5, 3, 2, 7, 1, 8, 8, 2, 5, 5, 7, 7, 4, 9, 9, 8, 9, 2, 7, 1, 2, 3, 9, 0, 3, 1, 1, 2, 6, 3, 1, 4, 4, 5, 2, 6, 6, 7, 1, 8, 4, 9, 9, 0, 2, 1, 0, 2, 2, 3, 7, 4, 6, 5, 2, 6, 8, 7, 9, 8, 1, 9, 6, 0, 2, 1, 9, 2, 3, 4, 8, 6, 3, 7, 6, 8, 7, 9, 5, 3, 1, 8, 4, 0, 9, 7, 1, 1, 9, 0, 7, 7, 9, 5, 8, 5, 8, 6, 3, 9, 6, 0, 3, 1, 1, 0, 6, 0, 4, 8, 8, 3, 1, 4, 0, 3, 1, 1, 3, 0, 6, 9, 5, 5, 1, 3, 2, 4, 3, 9, 7, 3, 9, 7, 4, 6, 7, 9, 2, 2, 7, 4, 3, 5, 4, 7, 7, 2, 1, 1, 7, 6, 1, 4, 4, 9, 2, 4, 8, 9, 9, 4, 1, 1, 6, 2, 9, 2, 7, 1, 7, 3, 2, 2, 4, 9, 1, 4, 7, 3, 3, 8, 9, 2, 1, 2, 0, 2, 2, 1, 7, 2, 8, 8, 9, 6, 4, 5, 5, 1, 9, 6, 6, 7, 9, 2, 2, 1, 4, 3, 6, 7, 6, 5, 2, 9, 5, 3, 4, 8, 5, 7, 1, 5, 4, 7, 1, 0, 9, 7, 5, 4, 6, 8, 1, 8, 8, 3, 1, 7, 8, 6, 5, 9, 2, 9, 3, 4, 9, 8, 5, 4, 1, 1, 8, 0, 0, 6, 3, 6, 8, 0, 6, 1, 8, 2, 6, 3, 8, 4, 4, 6, 7, 7, 3, 8, 9, 0, 1, 1, 4, 2, 3, 3, 3, 4, 5, 5, 9, 6, 3, 7, 7, 8, 6, 9, 8, 0, 0, 1, 6, 2, 5, 3, 8, 5, 8, 6, 5, 7, 9, 4, 1, 0, 2, 7, 2, 2, 5, 9, 8, 4, 5, 2, 9, 9, 2, 8, 0, 4, 3, 5, 7, 8, 1, 8, 3, 0, 8, 3, 5, 5, 4, 4, 6, 3, 1, 3, 6, 4, 9, 6, 1, 5, 8, 1, 8, 7, 2, 8, 3, 4, 0, 5, 3, 7, 6, 2, 3, 3, 4, 6, 7, 6, 3, 7, 9, 7, 7, 7, 1, 6, 3, 0, 2, 1, 0, 0, 6, 1, 3, 6, 3, 5, 6, 3, 6, 1, 3, 4, 6, 7, 7, 6, 3, 2, 4, 2, 2, 5, 1, 9, 0, 1, 4, 2, 4, 2, 2, 7, 6, 9, 6, 7, 6, 9, 2, 2, 4, 0, 5, 4, 2, 8, 6, 7, 6, 0, 2, 3, 7, 8, 6, 4, 6, 6, 4, 1, 4, 4, 5, 0, 2, 3, 3, 6, 3, 2, 3, 0, 2, 4, 3, 8, 4, 1, 8, 3, 0, 1, 0, 0, 6, 9, 5, 0, 9, 1, 1, 2, 4, 3, 6, 5, 7, 6, 0, 7, 4, 8, 1, 0, 8, 1, 8, 2, 2, 3, 2, 4, 0, 5, 8, 6, 4, 7, 0, 8, 1, 0, 3, 1, 5, 2, 6, 3, 6, 4, 4, 5, 3, 6, 3, 7, 4, 8, 2, 9, 7, 8, 4, 3, 3, 7, 2, 0, 4, 1, 4, 7, 2, 3, 9, 0, 1, 9, 2, 4, 6, 5, 3, 2, 2, 0, 7, 6, 0, 2, 1, 1, 5, 1, 5, 1, 7, 7, 1, 2, 6, 4, 4, 2, 9, 9, 6, 7, 9, 0, 3, 0, 3, 7, 8, 5, 6, 1, 1, 1, 8, 6, 6, 1, 0, 8, 8, 2, 7, 7, 6, 4, 4, 0, 5, 4, 4, 2, 0, 5, 0, 0, 2, 3, 0, 1, 4, 9, 6, 1, 5, 1, 4, 0, 0, 6, 8, 9, 7, 3, 2, 0, 0, 8, 6, 3, 7, 9, 5, 6, 5, 3, 9, 0, 6, 1, 9, 4, 1, 5, 3, 6, 8, 7, 3, 8, 3, 9, 7, 0, 5, 1, 7, 2, 8, 3, 6, 4, 2, 5, 6, 6, 5, 7, 2, 8, 4, 0, 7, 1, 2, 2, 1, 3, 4, 4, 1, 5, 8, 6, 9, 7, 4, 8, 9, 9, 6, 1, 9, 6, 5, 8, 6, 9, 9, 9, 1, 0, 9, 1, 8, 2, 1, 4, 5, 4, 3, 3, 0, 7, 6, 4, 3, 4, 4, 4, 9, 0, 8, 3, 8, 8, 6, 7, 0, 5, 5, 1, 7, 5, 8, 8, 0, 9, 3, 2, 5, 5, 4, 1, 6, 1, 9, 6, 8, 2, 3, 1, 3, 3, 3, 8, 2, 6, 7, 4, 4, 9, 3, 2, 0, 0, 0, 0, 7, 1, 7, 6, 6, 2, 0, 5, 6, 5, 8, 0, 6, 2, 2, 8, 7, 0, 4, 6, 2, 8, 8, 1, 0, 7, 7, 9, 3, 1, 5, 9, 3, 2, 5, 6, 8, 7, 5, 6, 9, 6, 1, 8, 2, 7, 6, 4, 2, 9, 2, 2, 8, 1, 2, 3, 6, 3, 1, 0, 2, 5, 1, 5, 6, 7, 1, 9, 2, 7, 3, 0, 7, 2, 3, 7, 7, 9, 7, 1, 3, 3, 6, 6, 4, 7, 2, 8, 7, 0, 1, 3, 9, 5, 1, 3, 3, 6, 0, 0, 1, 1, 3, 2, 3, 3, 9, 6, 9, 7, 9, 8, 0, 9, 1, 0, 8, 1, 6, 2, 2, 3, 5, 4, 0, 5, 3, 6, 5, 7, 5, 0, 5, 1, 1, 2, 8, 3, 5, 4, 6, 5, 5, 6, 0, 7, 5, 8, 9, 9, 4, 8, 1, 7, 5, 4, 1, 3, 7, 9, 8, 8, 2, 8, 4, 3, 8, 1, 5, 5, 5, 8, 4, 2, 9, 7, 2, 4, 5, 2, 1, 6, 3, 5, 7, 2, 5, 4, 3, 5, 4, 6, 9, 4, 4, 1, 9, 7, 2, 5, 2, 1, 3, 3, 0, 3, 1, 6, 0, 9, 8, 6, 4, 3, 3, 3, 5, 1, 7, 6, 3, 5, 3, 6, 0, 1, 3, 9, 7, 3, 9, 7, 1, 4, 7, 7, 7, 0, 4, 9, 6, 0, 0, 0, 4, 3, 7, 7, 6, 9, 9, 2, 5, 0, 0, 1, 7, 0, 0, 1, 0, 0, 6, 4, 5, 0, 5, 4, 3, 7, 6, 9, 7, 2, 2, 0, 1, 6, 0, 2, 0, 2, 1, 9, 3, 9, 2, 0, 6, 1, 2, 2, 8, 3, 1, 4, 7, 5, 4, 6, 7, 7, 6, 8, 7, 9, 9, 0, 0, 1, 2, 2, 7, 3, 6, 4, 5, 5, 3, 6, 2, 7, 3, 8, 7, 0, 0, 1, 6, 2, 8, 3, 0, 5, 9, 6, 6, 7, 4, 8, 7, 5, 1, 4, 2, 8, 0, 7, 2, 4, 7, 7, 1, 7, 0, 3, 8, 9, 6, 8, 4, 8, 7, 3, 1, 1, 8, 5, 4, 8, 5, 2, 1, 7, 2, 4, 6, 2, 6, 6, 5, 1, 6, 5, 7, 2, 1, 4, 4, 5, 7, 5, 1, 8, 3, 6, 8, 4, 6, 4, 7, 1, 2, 8, 3, 7, 2, 5, 7, 5, 8, 1, 3, 8, 3, 9, 9, 1, 1, 3, 1, 6, 3, 3, 1, 3, 3, 2, 4, 2, 1, 6, 9, 9, 4, 9, 4, 6, 3, 3, 3, 3, 8, 8, 9, 1, 7, 6, 5, 5, 3, 6, 8, 8, 5, 1, 9, 9, 7, 7, 2, 6, 7, 8, 6, 3, 3, 7, 0, 4, 2, 7, 3, 0, 2, 9, 1, 0, 7, 0, 1, 3, 3, 7, 2, 9, 5, 3, 8, 0, 0, 2, 5, 0, 6, 1, 8, 0, 3, 1, 0, 0, 6, 4, 6, 0, 4, 1, 3, 0, 9, 4, 0, 7, 2, 9, 4, 2, 7, 0, 4, 6, 0, 2, 2, 6, 7, 2, 8, 2, 9, 9, 3, 9, 8, 0, 1, 1, 2, 2, 5, 3, 7, 4, 0, 5, 0, 6, 4, 7, 2, 8, 0, 9, 9, 0, 9, 1, 2, 2, 9, 3, 6, 4, 8, 5, 8, 6, 3, 7, 7, 8, 5, 9, 2, 0, 7, 1, 2, 2, 3, 3, 2, 4, 8, 5, 9, 6, 3, 7, 7, 8, 0, 9, 8, 7, 8, 4, 1, 3, 6, 8, 5, 5, 6, 1, 1, 8, 0, 5, 6, 2, 9, 8, 3, 6, 5, 1, 6, 9, 6, 2, 0, 4, 0, 0, 5, 9, 2, 9, 6, 3, 2, 7, 8, 7, 0, 9, 2, 1, 9, 8, 0, 2, 1, 7, 8, 5, 9, 8, 3, 5, 2, 3, 8, 2, 7, 2, 1, 0, 5, 5, 6, 8, 2, 6, 3, 0, 8, 4, 3, 0, 9, 3, 6, 8, 0, 1, 9, 0, 7, 3, 4, 0, 7, 4, 1, 7, 7, 4, 7, 9, 0, 2, 6, 9, 2, 1, 9, 2, 5, 5, 8, 7, 1, 1, 3, 7, 1, 1, 7, 6, 1, 7, 2, 3, 0, 3, 3, 6, 8, 5, 4, 6, 0, 2, 8, 8, 6, 7, 6, 6, 1, 4, 3, 9, 0, 8, 8, 8, 9, 2, 4, 9, 1, 6, 8, 5, 6, 5, 8, 9, 9, 5, 8, 3, 7, 7, 8, 4, 5, 3, 1, 6, 2, 0, 2, 0, 0, 6, 9, 9, 8, 0, 2, 1, 3, 1, 4, 3, 0, 2, 4, 1, 8, 0, 4, 0, 0, 1, 7, 2, 7, 3, 7, 4, 0, 5, 8, 6, 9, 7, 3, 8, 7, 9, 9, 0, 1, 1, 5, 2, 0, 3, 8, 4, 7, 5, 2, 6, 4, 7, 1, 8, 0, 9, 2, 0, 0, 1, 9, 2, 5, 3, 6, 4, 3, 5, 6, 6, 9, 7, 1, 8, 3, 9, 6, 0, 7, 9, 1, 5, 7, 5, 3, 6, 8, 9, 5, 8, 1, 9, 4, 8, 5, 7, 8, 5, 8, 1, 1, 0, 9, 0, 2, 2, 3, 2, 6, 7, 2, 8, 0, 2, 2, 0, 2, 1, 7, 2, 9, 6, 2, 3, 5, 3, 9, 7, 7, 3, 1, 3, 2, 6, 9, 4, 4, 9, 2, 0, 6, 9, 1, 5, 9, 2, 4, 8, 3, 2, 1, 0, 0, 0, 2, 1, 8, 3, 8, 2, 0, 1, 2, 7, 9, 4, 1, 6, 1, 3, 2, 1, 0, 3, 9, 9, 3, 1, 5, 7, 7, 6, 4, 8, 1, 4, 7, 3, 1, 1, 2, 4, 7, 3, 5, 6, 6, 9, 9, 0, 0, 1, 7, 7, 4, 5, 6, 4, 0, 4, 7, 7, 1, 7, 5, 9, 9, 5, 9, 8, 0, 8, 6, 4, 5, 9, 2, 0, 4, 8, 9, 9, 2, 8, 7, 0, 0, 1, 3, 2, 9, 4, 3, 5, 4, 6, 3, 7, 4, 8, 6, 9, 1, 0, 8, 1, 6, 4, 5, 5, 2, 6, 0, 7, 9, 8, 6, 9, 4, 0, 3, 1, 0, 4, 0, 7, 5, 0, 6, 9, 1, 9, 8, 7, 4, 7, 0, 5, 2, 1, 5, 0, 3, 0, 4, 7, 2, 0, 1, 1, 1, 4, 6, 6, 0, 6, 8, 6, 0, 5, 3, 2, 5, 8, 3, 0, 9, 1, 5, 7, 5, 6, 1, 2, 9, 1, 6, 7, 7, 7, 6, 6, 2, 1, 7, 4, 6, 9, 9, 6, 2, 7, 4, 4, 2, 4, 3, 7, 5, 2, 1, 8, 4, 2, 3, 0, 7, 1, 0, 2, 3, 3, 3, 4, 6, 5, 0, 6, 9, 7, 4, 8, 0, 9, 1, 0, 6, 1, 1, 2, 0, 3, 4, 4, 0, 5, 2, 6, 6, 7, 8, 8, 3, 9, 1, 0, 1, 1, 0, 2, 2, 3, 5, 4, 0, 5, 9, 6, 1, 7, 1, 8, 0, 9, 9, 6, 0, 5, 5, 9, 7, 3, 3, 4, 7, 3, 7, 8, 4, 5, 8, 1, 5, 5, 3, 2, 1, 3, 2, 0, 7, 1, 9, 2, 5, 1, 9, 3, 1, 2, 6, 6, 1, 5, 8, 3, 3, 0, 8, 7, 9, 2, 3, 7, 5, 4, 5, 6, 2, 4, 9, 0, 6, 5, 6, 9, 8, 9, 8, 8, 1, 9, 3, 5, 6, 3, 3, 1, 0, 7, 1, 4, 4, 7, 4, 6, 2, 5, 3, 4, 1, 0, 3, 0, 2, 6, 7, 6, 2, 2, 9, 0, 9, 6, 8, 3, 6, 7, 8, 7, 0, 4, 8, 4, 5, 3, 4, 9, 7, 2, 5, 8, 1, 9, 2, 6, 4, 0, 5, 9, 1, 5, 7, 3, 6, 8, 2, 8, 9, 7, 3, 1, 3, 4, 7, 0, 9, 4, 2, 3, 2, 9, 0, 0, 6, 7, 6, 2, 5, 1, 5, 9, 6, 1, 0, 5, 7, 1, 5, 7, 7, 4, 6, 8, 6, 6, 2, 1, 1, 6, 4, 8, 4, 8, 1, 0, 0, 1, 5, 2, 1, 3, 2, 4, 8, 7, 2, 8, 9, 9, 5, 0, 1, 1, 2, 2, 8, 3, 5, 4, 9, 5, 7, 6, 8, 7, 4, 8, 8, 9, 5, 0, 6, 1, 1, 2, 0, 3, 3, 4, 3, 7, 5, 8, 4, 9, 9, 1, 2, 6, 4, 8, 2, 9, 5, 9, 1, 0, 4, 1, 8, 2, 6, 4, 8, 4, 4, 3, 4, 7, 1, 4, 7, 4, 4, 4, 3, 0, 9, 3, 7, 8, 6, 7, 5, 5, 6, 8, 5, 2, 9, 1, 9, 5, 1, 8, 0, 5, 3, 1, 3, 1, 4, 6, 6, 2, 3, 1, 3, 3, 3, 4, 2, 9, 7, 4, 1, 9, 1, 2, 2, 0, 4, 0, 1, 4, 8, 4, 3, 6, 6, 2, 0, 5, 7, 5, 4, 0, 9, 2, 7, 6, 8, 8, 1, 1, 2, 7, 7, 9, 7, 1, 8, 9, 9, 2, 4, 6, 8, 7, 3, 6, 3, 6, 0, 8, 3, 7, 4, 4, 8, 2, 5, 1, 5, 3, 7, 3, 9, 0, 6, 5, 0, 5, 9, 8, 6, 0, 3, 3, 4, 7, 3, 9, 3, 7, 5, 3, 2, 6, 4, 7, 5, 8, 9, 0, 6, 3, 2, 5, 4, 3, 9, 0, 5, 1, 9, 2, 6, 3, 7, 4, 6, 5, 6, 6, 9, 7, 3, 8, 5, 9, 8, 0, 2, 1, 5, 2, 0, 3, 9, 4, 9, 5, 4, 6, 5, 7, 6, 8, 8, 9, 9, 0, 5, 1, 2, 2, 3, 3, 7, 4, 3, 5, 4, 6, 1, 7, 6, 8, 1, 9, 0, 7, 1, 6, 0, 4, 2, 3, 9, 0, 4, 6, 1, 6, 4, 6, 8, 9, 4, 0, 9, 0, 8, 1, 7, 3, 8, 9, 1, 4, 4, 5, 3, 7, 0, 9, 3, 5, 1, 6, 3, 8, 3, 9, 5, 1, 1, 3, 4, 8, 7, 5, 1, 7, 5, 8, 3, 1, 2, 4, 3, 8, 3, 5, 5, 8, 9, 1, 4, 0, 6, 7, 4, 6, 0, 1, 0, 6, 4, 0, 2, 3, 1, 4, 0, 6, 1, 8, 4, 9, 6, 2, 7, 1, 9, 7, 8, 4, 0, 5, 7, 2, 4, 5, 9, 2, 7, 1, 8, 2, 6, 9, 4, 3, 5, 9, 6, 2, 5, 2, 4, 5, 2, 8, 4, 7, 3, 4, 6, 7, 9, 1, 2, 8, 0, 0, 6, 9, 2, 6, 6, 8, 1, 1, 3, 1, 7, 5, 2, 7, 4, 6, 0, 3, 3, 5, 6, 4, 3, 2, 6, 9, 3, 0, 1, 4, 2, 7, 4, 4, 3, 3, 3, 2, 0, 9, 4, 2, 2, 0, 7, 3, 0, 4, 4, 5, 0, 0, 8, 0, 2, 3, 2, 2, 3, 8, 0, 3, 6, 3, 4, 0, 3, 1, 4, 0, 4, 1, 6, 7, 1, 1, 0, 3, 7, 5, 7, 1, 1, 7, 0, 1, 6, 8, 5, 6, 2, 8, 9, 1, 8, 0, 0, 4, 9, 3, 7, 0, 9, 1, 7, 2, 1, 3, 2, 7, 2, 8, 7, 9, 9, 0, 7, 1, 5, 2, 9, 3, 6, 7, 6, 8, 9, 9, 3, 0, 2, 1, 8, 2, 2, 3, 1, 4, 3, 5, 0, 6, 5, 7, 8, 8, 7, 9, 4, 7, 4, 4, 6, 0, 7, 4, 6, 0, 1, 1, 5, 7, 3, 9, 6, 5, 8, 1, 4, 4, 8, 2, 4, 8, 9, 9, 1, 4, 5, 3, 1, 1, 6, 7, 8, 8, 0, 2, 7, 4, 7, 4, 7, 3, 7, 3, 0, 6, 6, 9, 8, 9, 1, 5, 7, 8, 5, 6, 4, 7, 9, 0, 7, 6, 9, 8, 9, 2, 9, 6, 9, 3, 5, 9, 1, 3, 9, 2, 7, 1, 9, 7, 9, 4, 8, 8, 9, 8, 1, 9, 3, 0, 6, 3, 7, 3, 0, 9, 9, 9, 6, 4, 1, 1, 2, 0, 3, 3, 3, 7, 1, 5, 5, 8, 0, 8, 2, 2, 3, 9, 9, 7, 1, 1, 2, 2, 9, 6, 7, 4, 4, 2, 8, 3, 5, 6, 1, 6, 4, 5, 7, 0, 1, 0, 5, 2, 1, 8, 7, 1, 9, 6, 1, 1, 9, 0, 6, 4, 3, 3, 2, 1, 8, 6, 7, 1, 1, 9, 7, 0, 3, 1, 2, 2, 9, 3, 8, 4, 0, 5, 2, 6, 1, 7, 5, 8, 1, 9, 4, 0, 6, 1, 0, 2, 0, 3, 8, 4, 5, 5, 1, 6, 7, 7, 0, 8, 7, 9, 7, 0, 6, 1, 5, 2, 0, 3, 1, 4, 2, 5, 2, 6, 6, 7, 7, 8, 1, 9, 0, 8, 5, 6, 1, 5, 1, 0, 1, 6, 2, 8, 9, 9, 9, 4, 7, 1, 7, 9, 8, 5, 9, 3, 4, 0, 2, 4, 8, 8, 2, 9, 6, 1, 9, 4, 6, 0, 3, 5, 2, 1, 5, 5, 8, 7, 7, 6, 5, 0, 1, 1, 8, 7, 4, 0, 5, 6, 1, 8, 4, 9, 9, 5, 1, 4, 2, 7, 0, 9, 4, 8, 7, 6, 0, 0, 7, 8, 1, 1, 4, 7, 2, 7, 2, 1, 1, 3, 9, 2, 8, 1, 2, 4, 6, 2, 8, 0, 9, 0, 3, 7, 5, 8, 2, 4, 4, 6, 0, 4, 9, 9, 6, 3, 4, 8, 5, 4, 5, 7, 9, 2, 3, 5, 8, 6, 3, 3, 8, 6, 5, 9, 5, 6, 7, 3, 6, 2, 5, 2, 4, 4, 4, 6, 7, 9, 5, 0, 1, 2, 1, 5, 8, 5, 1, 1, 7, 3, 4, 3, 0, 9, 7, 7, 1, 2, 3, 2, 1, 5, 3, 7, 0, 9, 7, 8, 6, 2, 0, 1, 7, 3, 9, 1, 9, 3, 7, 0, 5, 1, 3, 3, 8, 4, 7, 5, 9, 6, 2, 7, 3, 8, 3, 9, 1, 0, 2, 1, 0, 2, 7, 3, 7, 4, 8, 5, 3, 6, 5, 7, 0, 8, 2, 0, 4, 1, 9, 2, 9, 3, 0, 4, 8, 5, 0, 6, 5, 7, 6, 9, 7, 7, 5, 0, 4, 5, 2, 2, 8, 9, 1, 0, 1, 1, 1, 5, 6, 8, 0, 8, 8, 0, 7, 9, 3, 3, 0, 2, 1, 7, 4, 8, 9, 4, 9, 4, 1, 5, 2, 9, 1, 6, 0, 1, 5, 0, 7, 4, 7, 5, 5, 3, 4, 9, 2, 4, 7, 3, 4, 4, 0, 2, 5, 0, 4, 5, 7, 0, 8, 1, 7, 3, 1, 2, 9, 9, 4, 1, 8, 6, 5, 0, 1, 1, 6, 1, 6, 8, 9, 0, 6, 4, 7, 7, 9, 7, 4, 6, 4, 3, 0, 5, 5, 6, 9, 6, 2, 0, 1, 7, 8, 3, 5, 5, 3, 4, 3, 2, 0, 4, 3, 1, 7, 8, 2, 3, 8, 5, 8, 6, 8, 5, 8, 2, 1, 0, 6, 6, 9, 7, 8, 1, 7, 2, 2, 5, 4, 8, 0, 1, 4, 9, 0, 3, 2, 8, 8, 8, 3, 8, 0, 3, 3, 7, 0, 6, 1, 8, 9, 7, 4, 1, 7, 4, 7, 6, 4, 7, 2, 9, 2, 9, 5, 3, 7, 0, 0, 3, 5, 4, 6, 5, 7, 6, 3, 7, 5, 0, 0, 1, 0, 2, 8, 3, 7, 4, 6, 5, 5, 6, 3, 7, 5, 0, 8, 1, 7, 2, 2, 3, 9, 4, 9, 5, 4, 6, 9, 7, 7, 8, 4, 9, 2, 8, 6, 7, 9, 7, 6, 0, 0, 1, 8, 3, 7, 5, 9, 2, 5, 8, 2, 0, 0, 9, 0, 6, 5, 0, 4, 9, 7, 1, 2, 1, 8, 8, 0, 4, 9, 3, 5, 2, 6, 1, 1, 2, 6, 6, 8, 5, 3, 6, 5, 7, 6, 4, 8, 8, 5, 1, 9, 8, 4, 0, 0, 5, 8, 9, 6, 4, 7, 1, 2, 9, 7, 2, 9, 1, 0, 9, 8, 6, 9, 7, 8, 9, 3, 0, 9, 4, 0, 6, 4, 1, 9, 7, 0, 3, 5, 8, 9, 9, 9, 6, 5, 3, 4, 9, 6, 0, 9, 5, 5, 7, 9, 1, 8, 6, 8, 1, 7, 0, 7, 9, 0, 3, 8, 3, 6, 4, 1, 4, 4, 0, 3, 6, 3, 2, 4, 5, 6, 4, 5, 4, 1, 0, 9, 2, 6, 0, 0, 1, 6, 2, 3, 3, 5, 4, 1, 5, 8, 6, 4, 7, 4, 8, 9, 9, 9, 0, 7, 1, 6, 2, 8, 3, 7, 4, 6, 5, 0, 6, 9, 7, 0, 8, 8, 0, 3, 1, 8, 2, 5, 3, 7, 4, 0, 5, 3, 6, 3, 7, 8, 8, 4, 9, 1, 7, 8, 4, 4, 3, 4, 8, 1, 5, 1, 1, 1, 8, 3, 8, 5, 6, 7, 1, 9, 9, 4, 2, 8, 4, 1, 0, 4, 9, 1, 9, 7, 3, 4, 7, 8, 7, 6, 9, 4, 1, 1, 8, 9, 4, 9, 4, 1, 2, 3, 7, 5, 5, 8, 8, 3, 5, 6, 3, 6, 2, 5, 2, 3, 0, 9, 5, 4, 8, 3, 6, 4, 0, 6, 4, 1, 0, 3, 3, 5, 8, 8, 1, 6, 0, 7, 3, 8, 0, 9, 4, 4, 7, 3, 4, 7, 9, 1, 2, 8, 9, 1, 1, 0, 2, 1, 5, 7, 7, 0, 1, 0, 7, 0, 1, 5, 6, 3, 7, 0, 3, 3, 3, 1, 6, 2, 5, 1, 6, 9, 2, 9, 8, 8, 7, 1, 6, 0, 4, 6, 9, 9, 8, 8, 9, 7, 6, 1, 9, 0, 5, 8, 3, 0, 7, 3, 4, 7, 3, 8, 6, 4, 0, 4, 0, 2, 4, 8, 6, 9, 6, 9, 9, 2, 0, 7, 1, 7, 1, 5, 3, 1, 2, 3, 1, 6, 0, 3, 0, 6, 1, 3, 2, 4, 3, 1, 4, 3, 5, 1, 6, 5, 7, 2, 8, 1, 9, 2, 0, 9, 1, 8, 2, 3, 3, 3, 4, 9, 5, 8, 6, 7, 7, 2, 8, 4, 9, 6, 0, 3, 1, 6, 2, 0, 3, 0, 4, 8, 5, 6, 6, 9, 7, 3, 8, 0, 9, 7, 4, 9, 2, 8, 6, 5, 4, 2, 7, 8, 5, 6, 4, 7, 7, 9, 8, 7, 9, 8, 2, 3, 9, 2, 3, 7, 9, 4, 3, 8, 8, 1, 2, 3, 0, 1, 9, 4, 8, 1, 6, 9, 0, 4, 1, 0, 0, 3, 4, 4, 3, 3, 5, 4, 3, 3, 8, 1, 0, 3, 0, 6, 5, 9, 4, 3, 3, 3, 5, 7, 3, 3, 0, 2, 8, 6, 3, 1, 0, 5, 6, 0, 2, 1, 7, 7, 1, 2, 1, 9, 8, 2, 1, 2, 7, 0, 1, 5, 3, 8, 8, 9, 5, 1, 1, 4, 2, 5, 0, 1, 9, 7, 7, 3, 6, 1, 7, 4, 4, 4, 1, 8, 6, 6, 7, 2, 5, 9, 1, 7, 2, 6, 6, 1, 7, 0, 1, 3, 9, 4, 8, 7, 0, 2, 6, 2, 9, 2, 4, 7, 9, 3, 9, 9, 6, 1, 2, 1, 3, 4, 7, 9, 1, 9, 9, 8, 2, 3, 2, 6, 5, 6, 3, 6, 7, 7, 8, 0, 0, 4, 1, 4, 2, 6, 3, 7, 4, 8, 5, 6, 6, 5, 7, 4, 8, 2, 9, 5, 0, 7, 1, 6, 2, 8, 3, 5, 4, 1, 5, 5, 6, 3, 7, 7, 8, 8, 9, 9, 0, 3, 1, 0, 2, 5, 3, 0, 4, 3, 5, 1, 6, 1, 7, 1, 8, 2, 9, 0, 2, 6, 5, 6, 1, 8, 6, 7, 4, 7, 3, 6, 9, 4, 9, 1, 0, 8, 9, 3, 7, 4, 1, 5, 6, 0, 4, 3, 3, 3, 6, 5, 2, 0, 2, 6, 0, 0, 0, 1, 8, 7, 2, 2, 5, 9, 9, 4, 8, 5, 6, 0, 5, 9, 7, 5, 0, 5, 0, 7, 4, 1, 7, 8, 4, 2, 3, 0, 2, 8, 2, 5, 4, 1, 1, 3, 3, 8, 4, 6, 7, 2, 7, 9, 7, 3, 2, 5, 0, 6, 9, 2, 8, 4, 5, 4, 6, 9, 4, 8, 3, 4, 8, 2, 2, 8, 8, 7, 3, 5, 8, 7, 9, 8, 5, 1, 8, 1, 0, 6, 5, 5, 4, 6, 7, 1, 1, 4, 3, 9, 1, 8, 7, 5, 9, 0, 0, 4, 9, 3, 1, 8, 7, 8, 3, 0, 8, 1, 0, 0, 3, 7, 9, 0, 1, 2, 6, 9, 4, 7, 3, 7, 2, 1, 1, 2, 8, 5, 6, 0, 4, 5, 5, 0, 0, 5, 1, 5, 5, 9, 5, 3, 6, 3, 5, 3, 0, 1, 1, 1, 2, 9, 3, 8, 4, 8, 5, 5, 6, 0, 7, 2, 8, 3, 9, 1, 0, 7, 1, 4, 2, 6, 3, 7, 4, 0, 5, 1, 6, 5, 7, 9, 9, 2, 0, 7, 1, 6, 2, 1, 3, 0, 4, 3, 7, 2, 9, 7, 4, 5, 7, 6, 6, 4, 3, 6, 4, 0, 0, 2, 9, 9, 7, 5, 1, 7, 9, 7, 3, 0, 8, 8, 4, 3, 7, 8, 3, 2, 0, 4, 9, 4, 9, 4, 1, 9, 1, 7, 4, 0, 2, 1, 0, 5, 6, 2, 2, 5, 1, 7, 1, 2, 1, 6, 1, 3, 7, 3, 2, 5, 4, 5, 7, 4, 5, 2, 2, 1, 9, 3, 4, 3, 5, 4, 8, 9, 9, 6, 7, 3, 0, 3, 0, 9, 7, 1, 5, 2, 1, 9, 1, 8, 7, 7, 6, 9, 6, 2, 6, 5, 8, 2, 2, 2, 2, 5, 7, 2, 7, 6, 4, 9, 0, 4, 2, 0, 4, 3, 2, 6, 3, 1, 3, 0, 3, 3, 1, 9, 1, 8, 6, 0, 9, 8, 5, 8, 5, 9, 3, 7, 0, 5, 8, 9, 3, 6, 9, 8, 6, 2, 0, 7, 1, 9, 2, 4, 3, 9, 4, 2, 5, 1, 6, 3, 7, 4, 8, 3, 9, 0, 0, 8, 1, 1, 2, 1, 3, 8, 4, 8, 5, 2, 6, 5, 7, 3, 8, 8, 9, 9, 0, 4, 1, 2, 2, 1, 3, 2, 4, 7, 5, 8, 6, 8, 7, 5, 8, 6, 9, 4, 3, 3, 4, 7, 1, 4, 4, 8, 6, 4, 6, 5, 7, 6, 3, 7, 3, 8, 2, 5, 1, 8, 9, 3, 4, 0, 7, 7, 3, 5, 4, 3, 9, 7, 1, 9, 1, 8, 0, 1, 1, 4, 4, 6, 6, 9, 0, 8, 2, 8, 8, 8, 2, 6, 5, 2, 2, 7, 1, 3, 7, 9, 0, 0, 2, 9, 0, 9, 6, 5, 8, 2, 2, 5, 9, 7, 2, 0, 3, 6, 6, 7, 9, 9, 8, 4, 7, 0, 8, 7, 9, 5, 2, 5, 2, 8, 9, 7, 8, 0, 6, 4, 4, 5, 4, 9, 4, 0, 0, 0, 0, 5, 8, 1, 0, 2, 8, 6, 6, 2, 6, 9, 8, 1, 7, 5, 3, 5, 8, 9, 0, 0, 3, 2, 6, 1, 8, 4, 3, 1, 1, 9, 3, 3, 9, 1, 1, 3, 9, 9, 0, 8, 7, 5, 2, 8, 7, 3, 4, 0, 3, 4, 1, 9, 7, 4, 6, 3, 0, 7, 1, 2, 2, 1, 3, 3, 4, 3, 5, 3, 6, 2, 7, 7, 8, 8, 9, 1, 0, 2, 1, 7, 2, 1, 3, 7, 4, 0, 5, 7, 6, 1, 7, 6, 8, 6, 9, 7, 0, 8, 1, 9, 2, 7, 3, 5, 4, 0, 5, 8, 7, 7, 8, 3, 9, 7, 3, 9, 8, 0, 0, 2, 7, 2, 1, 3, 0, 8, 7, 0, 6, 3, 9, 6, 0, 3, 1, 0, 0, 0, 0, 3, 8, 6, 3, 3, 4, 6, 3, 6, 1, 3, 5, 0, 0, 5, 0, 5, 9, 4, 5, 0, 3, 0, 4, 3, 7, 7, 6, 6, 9, 5, 2, 3, 4, 4, 5, 1, 7, 5, 2, 8, 1, 1, 6, 5, 4, 5, 9, 1, 4, 0, 9, 9, 4, 1, 1, 8, 2, 5, 2, 9, 5, 0, 8, 6, 1, 5, 3, 0, 2, 3, 9, 6, 4, 7, 3, 3, 2, 1, 1, 3, 2, 5, 8, 4, 6, 9, 5, 6, 1, 9, 6, 2, 7, 5, 2, 0, 1, 8, 3, 6, 7, 8, 5, 6, 9, 5, 3, 9, 8, 5, 7, 2, 5, 3, 7, 1, 0, 5, 7, 1, 4, 4, 8, 8, 8, 0, 5, 8, 0, 5, 6, 4, 6, 3, 3, 8, 7, 9, 6, 9, 9, 5, 9, 9, 4, 6, 8, 0, 4, 5, 1, 2, 0, 1, 6, 2, 6, 3, 0, 8, 1, 7, 2, 7, 3, 2, 4, 8, 5, 3, 6, 1, 7, 1, 8, 5, 9, 8, 0, 1, 1, 5, 2, 8, 3, 5, 7, 2, 8, 0, 9, 7, 0, 8, 1, 9, 2, 7, 3, 4, 4, 8, 7, 8, 8, 8, 9, 4, 6, 9, 9, 4, 6, 2, 1, 2, 9, 8, 9, 3, 9, 8, 4, 3, 4, 6, 3, 4, 8, 3, 1, 0, 4, 2, 1, 0, 2, 9, 5, 4, 0, 5, 9, 9, 4, 0, 9, 5, 0, 6, 7, 1, 4, 9, 4, 1, 1, 8, 8, 3, 7, 9, 6, 7, 0, 2, 8, 2, 1, 3, 8, 2, 2, 0, 6, 6, 2, 3, 0, 8, 9, 4, 1, 5, 2, 1, 5, 2, 4, 2, 5, 1, 6, 7, 7, 1, 7, 3, 5, 8, 3, 4, 0, 2, 2, 3, 2, 9, 2, 0, 7, 9, 3, 5, 5, 7, 2, 6, 1, 5, 4, 7, 4, 1, 3, 0, 0, 6, 0, 4, 8, 2, 5, 2, 4, 8, 7, 1, 9, 1, 8, 3, 7, 8, 9, 4, 6, 7, 3, 3, 1, 7, 7, 9, 9, 1, 6, 3, 3, 8, 3, 5, 1, 0, 0, 1, 2, 2, 6, 8, 0, 1, 5, 8, 6, 5, 6, 9, 8, 6, 7, 7, 3, 5, 5, 1, 8, 2, 3, 8, 0, 1, 1, 2, 2, 6, 3, 9, 1, 8, 5, 8, 6, 6, 0, 2, 1, 8, 2, 3, 3, 1, 1, 8, 5, 4, 6, 1, 7, 7, 8, 4, 0, 5, 1, 7, 2, 9, 3, 1, 1, 4, 7, 9, 4, 2, 8, 3, 1, 3, 5, 3, 6, 7, 5, 4, 7, 9, 2, 9, 8, 3, 6, 9, 3, 1, 3, 3, 8, 9, 6, 8, 5, 8, 4, 7, 0, 6, 9, 4, 1, 2, 7, 9, 2, 2, 9, 6, 1, 9, 5, 1, 1, 6, 3, 3, 2, 3, 3, 5, 6, 7, 1, 6, 3, 4, 6, 5, 9, 7, 0, 9, 1, 2, 8, 5, 1, 0, 4, 9, 0, 0, 6, 5, 1, 0, 2, 3, 6, 0, 9, 3, 2, 9, 2, 7, 3, 7, 5, 1, 5, 3, 0, 9, 7, 7, 7, 7, 9, 6, 6, 6, 2, 2, 9, 0, 4, 4, 7, 9, 0, 6, 2, 6, 3, 2, 4, 7, 0, 3, 0, 6, 8, 1, 5, 5, 1, 7, 3, 1, 7, 1, 9, 8, 8, 7, 8, 5, 9, 0, 0, 5, 9, 7, 8, 2, 9, 9, 0, 0, 6, 7, 5, 8, 6, 7, 7, 0, 4, 2, 7, 2, 5, 0, 4, 3, 1, 0, 3, 6, 5, 0, 3, 6, 0, 7, 1, 3, 2, 6, 3, 1, 4, 7, 5, 2, 6, 6, 7, 4, 8, 4, 9, 4, 0, 0, 1, 4, 2, 6, 3, 6, 4, 5, 5, 4, 6, 8, 7, 4, 8, 4, 9, 0, 0, 0, 1, 8, 2, 4, 3, 0, 6, 1, 7, 1, 8, 5, 9, 8, 0, 7, 9, 1, 9, 3, 8, 0, 9, 9, 8, 7, 4, 4, 1, 9, 7, 3, 7, 4, 3, 2, 0, 6, 0, 2, 7, 0, 8, 0, 2, 8, 0, 2, 1, 8, 2, 0, 6, 2, 3, 2, 3, 9, 7, 8, 3, 9, 3, 5, 6, 5, 6, 4, 4, 8, 9, 5, 1, 5, 9, 1, 8, 2, 2, 8, 0, 1, 3, 5, 2, 8, 1, 0, 7, 6, 3, 8, 1, 4, 3, 6, 9, 2, 1, 1, 7, 8, 6, 7, 8, 3, 4, 9, 3, 2, 1, 4, 4, 5, 0, 8, 5, 1, 3, 2, 6, 9, 9, 9, 6, 1, 1, 3, 8, 7, 2, 5, 2, 8, 5, 9, 7, 0, 8, 8, 9, 1, 8, 4, 0, 8, 1, 7, 2, 2, 3, 3, 4, 3, 5, 3, 6, 7, 7, 0, 8, 4, 9, 1, 0, 2, 1, 9, 2, 6, 3, 7, 4, 5, 5, 2, 6, 0, 7, 5, 8, 1, 9, 9, 0, 1, 1, 8, 2, 4, 3, 4, 4, 8, 5, 1, 6, 6, 7, 5, 8, 7, 9, 5, 1, 3, 2, 9, 6, 2, 5, 4, 3, 7, 0, 5, 2, 0, 8, 7, 7, 5, 0, 1, 3, 5, 6, 0, 4, 7, 4, 5, 3, 2, 6, 0, 7, 2, 2, 7, 3, 9, 9, 2, 1, 9, 2, 5, 1, 2, 2, 1, 9, 8, 6, 2, 0, 2, 1, 4, 3, 6, 0, 7, 2, 8, 7, 9, 5, 5, 7, 9, 6, 0, 1, 5, 9, 7, 0, 1, 6, 4, 0, 0, 6, 0, 0, 8, 2, 9, 0, 3, 6, 5, 1, 8, 5, 6, 8, 2, 4, 4, 3, 6, 0, 5, 1, 9, 5, 3, 4, 6, 4, 4, 8, 6, 8, 8, 4, 4, 5, 1, 7, 4, 5, 3, 7, 0, 8, 5, 3, 4, 4, 9, 8, 3, 8, 1, 5, 5, 2, 9, 9, 5, 7, 4, 1, 9, 3, 1, 8, 8, 1, 1, 0, 2, 7, 6, 5, 1, 9, 3, 6, 7, 9, 9, 4, 7, 7, 2, 7, 7, 9, 6, 9, 8, 5, 1, 8, 9, 3, 6, 4, 0, 4, 4, 3, 3, 8, 2, 6, 3, 2, 1, 0, 8, 1, 4, 2, 4, 3, 0, 7, 0, 8, 7, 9, 0, 3, 7, 4, 3, 7, 7, 9, 4, 0, 6, 1, 9, 2, 4, 3, 1, 7, 6, 8, 2, 3, 8, 8, 9, 7, 6, 1, 1, 0, 1, 7, 1, 6, 5, 9, 5, 0, 3, 1, 8, 0, 9, 0, 4, 1, 6, 0, 6, 9, 9, 3, 0, 4, 9, 7, 8, 6, 2, 9, 2, 2, 6, 1, 1, 6, 7, 4, 3, 4, 3, 1, 1, 2, 0, 2, 9, 1, 7, 3, 8, 2, 9, 9, 1, 3, 5, 2, 5, 1, 6, 2, 6, 1, 5, 6, 2, 7, 8, 2, 8, 3, 0, 8, 7, 7, 3, 5, 4, 7, 2, 0, 3, 7, 8, 4, 7, 6, 6, 3, 0, 7, 5, 6, 8, 9, 1, 9, 3, 4, 0, 8, 1, 4, 6, 1, 6, 0, 3, 6, 2, 6, 4, 0, 4, 1, 5, 2, 0, 3, 4, 4, 9, 5, 9, 6, 8, 7, 4, 8, 9, 9, 5, 0, 2, 3, 7, 4, 3, 5, 8, 6, 3, 7, 3, 8, 2, 9, 7, 0, 1, 1, 1, 2, 1, 3, 2, 4, 7, 5, 0, 6, 8, 7, 3, 8, 8, 9, 8, 0, 4, 5, 2, 5, 5, 6, 3, 5, 2, 0, 6, 9, 8, 8, 4, 9, 1, 8, 6, 4, 9, 1, 9, 7, 7, 5, 2, 1, 2, 0, 5, 0, 3, 2, 1, 2, 0, 7, 4, 1, 7, 2, 6, 6, 6, 3, 4, 3, 0, 7, 7, 3, 5, 3, 7, 4, 4, 4, 7, 1, 4, 5, 5, 0, 4, 9, 3, 5, 2, 2, 3, 8, 9, 2, 7, 0, 3, 0, 1, 1, 5, 7, 0, 6, 3, 3, 9, 2, 6, 1, 4, 7, 0, 1, 6, 3, 4, 9, 9, 7, 9, 6, 1, 1, 7, 4, 3, 0, 7, 5, 4, 6, 7, 1, 2, 7, 7, 5, 7, 7, 4, 2, 6, 7, 1, 9, 6, 5, 6, 8, 1, 0, 8, 1, 4, 2, 6, 3, 4, 4, 7, 5, 3, 8, 8, 9, 5, 0, 5, 1, 6, 2, 6, 3, 3, 4, 8, 5, 8, 6, 7, 7, 0, 8, 2, 9, 8, 0, 4, 1, 4, 2, 4, 3, 1, 4, 6, 5, 6, 6, 9, 7, 8, 8, 6, 9, 0, 8, 5, 6, 5, 5, 3, 0, 6, 6, 8, 8, 9, 9, 1, 4, 7, 1, 3, 9, 5, 5, 8, 3, 3, 0, 2, 4, 9, 8, 1, 9, 4, 1, 2, 4, 3, 0, 8, 5, 6, 5, 7, 2, 0, 5, 5, 4, 9, 0, 7, 7, 4, 6, 0, 0, 1, 1, 9, 7, 8, 0, 8, 6, 6, 8, 1, 9, 3, 5, 3, 4, 4, 7, 5, 9, 9, 8, 0, 6, 5, 0, 7, 8, 0, 1, 8, 7, 1, 7, 1, 1, 2, 3, 9, 2, 6, 3, 8, 1, 6, 4, 7, 2, 8, 0, 4, 0, 2, 7, 6, 8, 9, 4, 8, 6, 6, 4, 3, 9, 4, 3, 9, 8, 3, 4, 1, 7, 9, 2, 2, 5, 2, 6, 7, 3, 6, 6, 5, 2, 8, 2, 3, 4, 1, 6, 7, 9, 9, 0, 9, 2, 0, 1, 9, 3, 7, 3, 8, 9, 5, 7, 8, 8, 7, 7, 1, 2, 2, 2, 2, 5, 0, 7, 9, 9, 9, 8, 1, 2, 6, 1, 7, 3, 2, 1, 5, 3, 3, 0, 1, 1, 1, 2, 5, 3, 3, 4, 7, 5, 2, 6, 1, 7, 8, 8, 1, 9, 2, 0, 3, 1, 3, 2, 4, 3, 9, 4, 9, 5, 9, 6, 0, 7, 1, 8, 5, 9, 8, 0, 7, 1, 1, 2, 8, 3, 4, 4, 1, 5, 8, 6, 6, 7, 6, 8, 2, 9, 3, 5, 5, 0, 7, 6, 9, 8, 1, 9, 7, 4, 9, 1, 7, 9, 2, 5, 9, 3, 1, 0, 2, 4, 6, 8, 1, 9, 0, 1, 5, 4, 1, 0, 9, 5, 6, 1, 7, 5, 9, 4, 1, 0, 6, 7, 2, 6, 1, 0, 4, 1, 8, 7, 5, 0, 4, 6, 9, 8, 4, 9, 2, 5, 1, 4, 9, 7, 9, 9, 1, 8, 9, 6, 4, 0, 1, 8, 5, 1, 2, 7, 1, 7, 5, 1, 1, 3, 6, 2, 6, 3, 3, 1, 3, 4, 5, 2, 3, 0, 2, 0, 9, 7, 1, 8, 3, 4, 5, 6, 1, 4, 0, 9, 2, 3, 6, 8, 1, 4, 6, 7, 4, 2, 2, 5, 0, 6, 1, 3, 0, 6, 1, 9, 8, 6, 3, 3, 5, 2, 8, 2, 4, 4, 0, 6, 7, 9, 0, 0, 5, 2, 1, 5, 5, 5, 9, 1, 7, 3, 3, 3, 4, 9, 3, 7, 1, 2, 6, 5, 7, 7, 6, 9, 3, 8, 4, 2, 2, 1, 8, 3, 7, 1, 4, 3, 8, 0, 8, 1, 7, 2, 0, 3, 5, 4, 9, 7, 6, 8, 5, 9, 5, 0, 0, 1, 7, 2, 9, 3, 5, 7, 9, 8, 0, 9, 2, 0, 6, 1, 5, 2, 1, 3, 5, 4, 0, 5, 5, 6, 9, 7, 1, 8, 0, 9, 1, 2, 1, 5, 0, 1, 8, 6, 0, 4, 9, 3, 1, 9, 6, 9, 7, 0, 9, 9, 7, 7, 3, 1, 3, 6, 5, 4, 4, 3, 1, 6, 4, 2, 3, 2, 6, 0, 6, 0, 7, 5, 9, 9, 6, 5, 0, 7, 7, 3, 7, 2, 7, 2, 5, 4, 0, 7, 3, 6, 9, 7, 4, 7, 3, 2, 4, 8, 6, 8, 9, 2, 1, 8, 3, 3, 2, 7, 7, 1, 5, 3, 6, 9, 8, 0, 5, 9, 1, 1, 0, 7, 9, 3, 3, 8, 8, 0, 3, 3, 1, 9, 7, 1, 7, 6, 8, 4, 7, 3, 2, 2, 1, 1, 1, 8, 9, 6, 2, 1, 2, 5, 4, 0, 7, 1, 2, 2, 6, 3, 8, 4, 5, 5, 8, 6, 0, 8, 1, 0, 3, 1, 4, 2, 2, 3, 4, 4, 1, 5, 9, 6, 5, 7, 5, 8, 1, 9, 4, 0, 9, 4, 6, 5, 1, 6, 0, 7, 6, 8, 3, 9, 6, 0, 9, 7, 2, 0, 0, 7, 3, 8, 6, 3, 3, 5, 6, 3, 7, 8, 3, 8, 0, 1, 3, 4, 6, 9, 3, 6, 4, 1, 9, 8, 1, 9, 5, 4, 9, 1, 5, 2, 8, 5, 8, 9, 2, 9, 6, 5, 3, 4, 5, 3, 4, 3, 5, 3, 1, 9, 0, 0, 6, 1, 6, 9, 3, 1, 5, 2, 1, 7, 4, 9, 1, 1, 5, 0, 4, 6, 5, 2, 6, 4, 8, 0, 8, 3, 7, 8, 3, 9, 9, 5, 4, 6, 2, 6, 4, 5, 7, 1, 8, 7, 4, 1, 1, 4, 8, 6, 4, 9, 2, 1, 8, 3, 1, 1, 2, 6, 0, 3, 5, 0, 9, 6, 6, 7, 6, 1, 7, 3, 0, 8, 4, 2, 8, 6, 7, 2, 5, 6, 5, 7, 2, 8, 7, 7, 2, 0, 3, 1, 3, 2, 2, 3, 6, 4, 0, 5, 3, 6, 6, 7, 3, 8, 5, 9, 7, 0, 0, 1, 7, 2, 3, 3, 9, 7, 6, 8, 8, 9, 0, 0, 2, 1, 0, 2, 2, 3, 9, 7, 4, 8, 0, 9, 7, 3, 0, 4, 8, 1, 0, 4, 6, 6, 5, 6, 0, 7, 8, 3, 3, 3, 1, 2, 5, 1, 3, 9, 0, 4, 3, 7, 8, 3, 1, 5, 1, 4, 5, 9, 7, 1, 4, 1, 5, 0, 9, 1, 9, 4, 0, 6, 0, 0, 4, 2, 7, 5, 3, 2, 1, 1, 4, 7, 1, 5, 0, 0, 0, 0, 9, 2, 7, 3, 2, 7, 0, 6, 9, 9, 5, 8, 2, 7, 8, 8, 0, 9, 9, 2, 4, 2, 3, 9, 1, 9, 8, 5, 1, 4, 2, 4, 8, 4, 2, 0, 6, 0, 4, 8, 8, 6, 8, 6, 0, 8, 3, 5, 1, 1, 6, 7, 8, 0, 6, 3, 8, 6, 2, 7, 9, 8, 7, 3, 0, 1, 2, 3, 6, 9, 9, 5, 3, 9, 9, 9, 2, 5, 0, 0, 8, 4, 9, 3, 4, 1, 9, 7, 6, 6, 6, 0, 5, 1, 8, 2, 2, 3, 4, 4, 1, 5, 4, 6, 2, 7, 7, 8, 0, 9, 0, 0, 1, 1, 5, 2, 0, 3, 5, 4, 0, 7, 6, 8, 6, 9, 1, 0, 2, 1, 6, 2, 1, 3, 7, 4, 5, 7, 1, 8, 8, 9, 5, 6, 9, 4, 1, 2, 5, 6, 0, 4, 2, 7, 8, 8, 7, 9, 5, 3, 6, 9, 9, 3, 2, 8, 7, 2, 4, 0, 7, 9, 6, 8, 1, 0, 3, 0, 3, 1, 3, 0, 8, 5, 5, 3, 0, 5, 8, 3, 3, 8, 1, 0, 5, 0, 6, 5, 8, 4, 4, 3, 1, 4, 6, 1, 1, 5, 7, 3, 5, 0, 2, 6, 0, 2, 5, 7, 2, 1, 5, 1, 6, 8, 7, 1, 5, 7, 5, 1, 0, 3, 3, 8, 7, 5, 8, 4, 4, 2, 7, 0, 6, 9, 0, 2, 5, 6, 9, 7, 5, 1, 2, 9, 1, 6, 4, 4, 3, 6, 9, 2, 2, 3, 3, 7, 3, 1, 4, 2, 0, 5, 7, 3, 9, 7, 9, 8, 6, 0, 0, 1, 4, 2, 0, 3, 6, 4, 3, 5, 5, 6, 4, 7, 1, 8, 5, 9, 0, 0, 5, 1, 5, 2, 1, 3, 0, 4, 5, 5, 9, 7, 6, 8, 1, 9, 7, 0, 2, 1, 0, 2, 7, 3, 6, 7, 0, 8, 9, 9, 6, 5, 4, 2, 5, 8, 1, 1, 7, 7, 6, 2, 0, 4, 0, 1, 3, 4, 7, 1, 0, 8, 3, 3, 3, 7, 1, 8, 4, 4, 9, 3, 0, 3, 2, 5, 8, 6, 7, 7, 7, 0, 8, 6, 2, 1, 6, 6, 1, 8, 1, 0, 2, 1, 3, 5, 9, 0, 9, 8, 1, 5, 7, 1, 6, 8, 3, 4, 2, 7, 5, 6, 3, 9, 8, 1, 3, 9, 0, 0, 2, 6, 5, 7, 7, 1, 8, 2, 6, 3, 7, 9, 9, 2, 9, 4, 5, 5, 1, 3, 1, 7, 7, 5, 2, 3, 9, 1, 8, 8, 2, 2, 8, 2, 5, 3, 2, 0, 6, 2, 9, 9, 8, 4, 5, 9, 8, 7, 8, 0, 8, 0, 2, 2, 4, 7, 1, 4, 7, 9, 6, 9, 6, 2, 2, 8, 2, 1, 1, 5, 6, 6, 8, 9, 4, 8, 6, 3, 5, 8, 3, 3, 1, 6, 3, 7, 1, 0, 9, 0, 5, 0, 1, 1, 6, 2, 9, 3, 5, 4, 4, 5, 3, 6, 4, 7, 7, 8, 6, 9, 2, 0, 9, 1, 2, 2, 1, 3, 5, 7, 8, 8, 5, 9, 6, 0, 5, 1, 0, 2, 2, 3, 5, 4, 8, 5, 1, 6, 9, 7, 3, 8, 0, 9, 7, 0, 2, 8, 2, 7, 0, 8, 2, 9, 1, 9, 7, 0, 9, 1, 8, 4, 3, 5, 8, 1, 6, 6, 7, 0, 5, 5, 2, 6, 4, 7, 9, 3, 8, 9, 5, 9, 2, 3, 0, 8, 4, 1, 8, 2, 8, 9, 7, 6, 6, 7, 3, 3, 0, 3, 7, 4, 2, 7, 2, 7, 2, 9, 0, 1, 1, 7, 4, 6, 3, 2, 5, 1, 7, 5, 4, 5, 4, 0, 1, 5, 3, 0, 1, 8, 1, 4, 7, 0, 1, 3, 8, 8, 8, 1, 1, 2, 1, 2, 0, 3, 7, 1, 5, 3, 0, 6, 8, 7, 7, 3, 9, 4, 8, 9, 1, 6, 9, 5, 6, 1, 3, 9, 1, 8, 7, 1, 8, 1, 5, 2, 9, 7, 7, 6, 8, 8, 5, 8, 1, 4, 9, 2, 8, 2, 8, 0, 0, 1, 7, 2, 4, 3, 1, 4, 2, 5, 3, 6, 2, 7, 1, 8, 4, 9, 7, 0, 0, 1, 1, 2, 5, 3, 4, 4, 4, 5, 7, 6, 0, 7, 2, 8, 8, 0, 7, 1, 0, 2, 2, 3, 9, 4, 6, 5, 1, 6, 3, 7, 4, 8, 8, 9, 9, 7, 3, 1, 6, 5, 1, 6, 9, 2, 0, 5, 0, 0, 5, 5, 5, 4, 9, 2, 1, 0, 5, 8, 3, 1, 1, 7, 3, 1, 3, 8, 5, 3, 1, 8, 6, 7, 5, 1, 8, 7, 5, 1, 3, 4, 9, 4, 2, 4, 1, 5, 7, 7, 0, 4, 8, 4, 5, 7, 0, 2, 2, 5, 5, 3, 2, 9, 6, 3, 0, 9, 3, 0, 8, 8, 1, 7, 7, 9, 9, 0, 5, 6, 5, 3, 0, 0, 6, 4, 8, 6, 4, 3, 6, 7, 4, 0, 8, 1, 5, 4, 9, 8, 5, 1, 4, 2, 4, 9, 6, 3, 7, 1, 2, 8, 1, 4, 0, 2, 3, 9, 4, 8, 4, 8, 1, 6, 9, 5, 2, 2, 0, 1, 9, 9, 7, 2, 9, 9, 2, 1, 0, 0, 8, 5, 9, 3, 5, 3, 3, 6, 5, 1, 7, 2, 0, 5, 8, 0, 3, 3, 3, 7, 6, 6, 1, 1, 3, 5, 3, 5, 7, 9, 0, 8, 0, 0, 0, 9, 9, 0, 7, 1, 4, 2, 7, 3, 3, 4, 2, 5, 6, 6, 1, 7, 6, 8, 0, 9, 4, 0, 2, 1, 1, 2, 7, 3, 6, 4, 8, 5, 8, 6, 3, 7, 5, 8, 6, 9, 1, 0, 3, 1, 4, 2, 9, 3, 9, 4, 4, 5, 5, 6, 2, 7, 4, 8, 9, 9, 5, 6, 3, 0, 5, 3, 9, 4, 6, 1, 5, 4, 7, 0, 7, 8, 0, 6, 4, 4, 9, 5, 6, 4, 0, 0, 1, 7, 1, 8, 4, 7, 1, 7, 6, 9, 0, 0, 3, 9, 9, 7, 8, 4, 3, 2, 9, 5, 7, 8, 6, 5, 0, 9, 1, 8, 2, 8, 0, 7, 0, 1, 7, 3, 5, 5, 6, 3, 2, 1, 4, 6, 2, 5, 1, 3, 8, 8, 1, 7, 2, 3, 2, 1, 6, 6, 6, 8, 1, 5, 7, 9, 1, 2, 3, 2, 3, 0, 4, 9, 5, 2, 6, 4, 1, 7, 8, 3, 2, 1, 5, 3, 1, 6, 7, 2, 5, 1, 7, 2, 9, 6, 9, 0, 4, 2, 3, 2, 7, 7, 7, 1, 1, 3, 2, 7, 1, 4, 1, 7, 1, 4, 8, 8, 6, 9, 6, 2, 8, 9, 3, 5, 9, 1, 6, 5, 4, 6, 9, 8, 1, 3, 2, 5, 6, 6, 3, 0, 8, 9, 8, 9, 2, 3, 7, 1, 0, 1, 2, 0, 8, 3, 3, 4, 6, 5, 6, 6, 9, 7, 2, 8, 3, 9, 9, 0, 9, 1, 5, 2, 6, 3, 5, 8, 6, 0, 6, 1, 8, 2, 6, 3, 2, 7, 6, 8, 8, 9, 7, 9, 4, 0, 9, 1, 9, 4, 9, 7, 2, 3, 2, 2, 9, 9, 9, 0, 4, 5, 8, 6, 6, 7, 8, 3, 8, 9, 8, 9, 6, 3, 5, 8, 5, 1, 7, 2, 1, 9, 7, 6, 7, 7, 5, 5, 9, 6, 7, 3, 4, 4, 7, 9, 9, 1, 4, 2, 2, 9, 8, 3, 5, 4, 8, 4, 0, 3, 0, 1, 8, 7, 1, 3, 4, 4, 1, 9, 9, 6, 8, 9, 7, 8, 9, 1, 4, 1, 0, 6, 6, 6, 3, 8, 6, 2, 6, 8, 6, 4, 3, 8, 2, 0, 1, 0, 1, 1, 5, 2, 5, 3, 4, 4, 1, 7, 2, 8, 9, 9, 8, 0, 3, 1, 3, 2, 5, 3, 0, 4, 1, 5, 1, 6, 9, 7, 6, 8, 1, 9, 3, 0, 4, 1, 1, 3, 1, 4, 2, 7, 1, 8, 2, 9, 3, 8, 5, 6, 2, 5, 1, 0, 7, 6, 8, 8, 7, 9, 9, 4, 7, 1, 8, 9, 8, 0, 6, 4, 7, 8, 5, 9, 4, 1, 7, 4, 7, 0, 1, 2, 7, 1, 9, 5, 8, 4, 4, 0, 6, 7, 3, 6, 9, 0, 6, 1, 5, 7, 6, 0, 3, 6, 1, 8, 6, 4, 5, 7, 4, 9, 4, 8, 1, 6, 5, 0, 3, 8, 1, 1, 1, 7, 1, 7, 6, 1, 8, 3, 3, 2, 3, 3, 1, 1, 7, 4, 2, 2, 0, 0, 0, 0, 2, 7, 7, 8, 8, 4, 1, 6, 8, 9, 3, 3, 0, 8, 6, 4, 7, 7, 2, 2, 1, 5, 4, 6, 4, 3, 2, 6, 2, 9, 3, 6, 8, 3, 7, 2, 3, 2, 1, 4, 9, 6, 5, 0, 8, 5, 6, 5, 3, 1, 4, 3, 3, 3, 0, 9, 0, 7, 2, 8, 8, 7, 7, 2, 3, 7, 5, 9, 6, 8, 0, 2, 0, 1, 6, 3, 8, 1, 1, 3, 5, 0, 0, 1, 7, 2, 5, 3, 7, 4, 9, 7, 7, 8, 3, 9, 3, 0, 6, 1, 9, 2, 3, 3, 5, 4, 4, 5, 8, 6, 8, 7, 6, 8, 9, 9, 6, 0, 8, 1, 5, 2, 6, 3, 6, 7, 8, 8, 1, 9, 4, 7, 1, 7, 9, 0, 2, 3, 9, 1, 3, 8, 8, 9, 8, 8, 4, 6, 0, 5, 2, 4, 6, 7, 7, 3, 3, 1, 0, 9, 2, 1, 0, 4, 2, 5, 4, 5, 2, 6, 8, 0, 5, 1, 9, 3, 7, 6, 2, 4, 1, 8, 9, 9, 0, 8, 4, 5, 1, 2, 3, 1, 8, 0, 2, 5, 7, 6, 4, 6, 6, 3, 1, 3, 4, 3, 3, 1, 1, 7, 1, 2, 5, 2, 2, 7, 4, 2, 8, 3, 2, 6, 3, 8, 4, 5, 7, 1, 3, 4, 7, 9, 6, 0, 1, 6, 3, 8, 8, 8, 3, 0, 5, 3, 9, 9, 5, 4, 4, 3, 8, 7, 0, 1, 7, 7, 3, 6, 9, 9, 5, 4, 0, 2, 7, 9, 3, 9, 3, 4, 0, 9, 3, 4, 6, 0, 3, 7, 3, 1, 6, 3, 0, 0, 2, 1, 5, 2, 7, 3, 9, 7, 6, 8, 9, 9, 8, 0, 7, 1, 3, 2, 3, 3, 7, 4, 8, 7, 0, 8, 8, 9, 8, 0, 5, 1, 7, 2, 7, 3, 2, 7, 2, 8, 0, 9, 1, 0, 7, 0, 6, 7, 9, 5, 3, 5, 7, 3, 4, 7, 0, 8, 1, 6, 6, 6, 9, 4, 5, 6, 1, 3, 3, 8, 4, 8, 6, 3, 9, 0, 4, 1, 5, 4, 6, 4, 1, 7, 7, 3, 1, 1, 7, 1, 6, 9, 4, 1, 1, 2, 2, 1, 2, 3, 5, 9, 1, 2, 7, 7, 3, 7, 4, 9, 5, 9, 2, 0, 4, 4, 0, 5, 0, 9, 8, 1, 0, 1, 3, 5, 0, 9, 2, 1, 0, 3, 5, 4, 3, 3, 1, 1, 4, 9, 0, 1, 4, 0, 2, 7, 2, 7, 6, 0, 7, 1, 1, 2, 7, 3, 4, 4, 5, 5, 3, 7, 4, 8, 2, 9, 5, 0, 5, 1, 8, 2, 0, 3, 6, 4, 8, 7, 5, 8, 2, 9, 0, 0, 2, 3, 5, 4, 6, 7, 3, 8, 6, 9, 8, 9, 7, 7, 0, 0, 4, 9, 1, 0, 1, 1, 6, 5, 5, 8, 6, 8, 2, 0, 9, 9, 4, 3, 1, 2, 6, 7, 5, 8, 1, 4, 9, 6, 8, 4, 2, 5, 4, 3, 9, 9, 5, 4, 3, 3, 4, 4, 5, 2, 3, 0, 3, 5, 5, 0, 1, 1, 3, 6, 4, 9, 4, 3, 8, 2, 8, 9, 5, 1, 2, 6, 8, 0, 4, 1, 0, 1, 5, 8, 5, 0, 9, 4, 8, 7, 6, 7, 1, 6, 0, 3, 9, 6, 3, 0, 6, 1, 8, 3, 7, 5, 3, 4, 3, 2, 6, 1, 1, 1, 4, 8, 5, 3, 9, 5, 3, 6, 0, 7, 1, 5, 6, 2, 8, 0, 9, 6, 8, 7, 2, 1, 1, 2, 1, 5, 9, 8, 8, 1, 6, 9, 8, 3, 9, 8, 3, 2, 4, 8, 5, 8, 9, 7, 2, 1, 6, 7, 8, 9, 4, 2, 9, 0, 4, 1, 7, 2, 9, 3, 8, 4, 9, 7, 1, 8, 1, 9, 9, 0, 3, 1, 3, 2, 7, 3, 5, 4, 7, 7, 9, 8, 5, 9, 7, 0, 0, 1, 6, 2, 4, 3, 5, 4, 3, 7, 4, 9, 0, 5, 4, 0, 5, 8, 4, 3, 4, 5, 1, 4, 1, 8, 3, 3, 3, 0, 8, 2, 9, 1, 8, 0, 7, 2, 6, 8, 3, 4, 8, 4, 0, 1, 7, 6, 4, 1, 7, 3, 3, 0, 5, 3, 1, 6, 8, 9, 2, 3, 6, 7, 3, 4, 9, 9, 5, 7, 6, 0, 7, 9, 7, 4, 1, 8, 8, 2, 1, 7, 8, 7, 3, 5, 1, 7, 6, 1, 7, 9, 8, 5, 3, 2, 4, 4, 9, 8, 9, 9, 0, 6, 7, 9, 3, 7, 1, 6, 2, 4, 0, 1, 2, 2, 4, 6, 4, 1, 1, 1, 9, 7, 4, 2, 6, 3, 1, 6, 1, 4, 9, 8, 9, 9, 4, 6, 3, 4, 7, 6, 4, 5, 4, 0, 1, 2, 6, 1, 6, 0, 8, 5, 2, 0, 7, 1, 2, 1, 5, 7, 1, 8, 5, 4, 2, 3, 8, 2, 4, 7, 4, 9, 1, 3, 9, 9, 3, 0, 3, 1, 3, 2, 6, 3, 2, 4, 5, 5, 4, 7, 7, 8, 5, 9, 4, 0, 8, 1, 4, 2, 1, 3, 0, 4, 0, 6, 4, 7, 9, 8, 1, 9, 4, 0, 1, 1, 4, 2, 7, 3, 8, 4, 8, 5, 8, 6, 4, 7, 0, 8, 9, 9, 1, 7, 7, 7, 1, 1, 3, 3, 0, 7, 4, 5, 9, 2, 7, 8, 4, 0, 9, 7, 6, 5, 6, 9, 1, 6, 1, 0, 3, 9, 8, 4, 2, 3, 9, 2, 6, 3, 6, 8, 4, 3, 7, 2, 3, 5, 7, 3, 4, 9, 2, 4, 8, 1, 8, 9, 1, 2, 5, 1, 7, 9, 0, 6, 9, 7, 4, 9, 0, 0, 3, 4, 6, 6, 6, 1, 2, 7, 2, 3, 2, 8, 0, 9, 3, 6, 7, 8, 7, 3, 1, 9, 6, 1, 4, 0, 4, 9, 6, 3, 9, 3, 4, 6, 0, 2, 7, 5, 6, 3, 1, 4, 1, 0, 1, 1, 6, 2, 8, 3, 5, 4, 9, 5, 2, 6, 7, 7, 4, 8, 5, 9, 4, 0, 6, 1, 6, 2, 4, 3, 7, 4, 0, 5, 8, 6, 9, 7, 3, 8, 2, 9, 0, 0, 8, 1, 1, 2, 9, 3, 3, 4, 7, 5, 0, 6, 8, 7, 6, 8, 8, 9, 0, 4, 6, 2, 4, 0, 9, 2, 6, 5, 7, 9, 6, 4, 9, 2, 1, 6, 8, 5, 7, 9, 6, 3, 8, 5, 2, 0, 7, 7, 5, 1, 2, 1, 9, 5, 6, 3, 7, 0, 5, 7, 1, 9, 1, 6, 0, 1, 4, 6, 1, 7, 4, 4, 5, 9, 1, 5, 4, 7, 2, 9, 6, 8, 1, 5, 2, 6, 4, 2, 4, 4, 7, 8, 2, 1, 0, 5, 2, 9, 0, 2, 8, 2, 2, 8, 3, 0, 6, 6, 0, 4, 2, 3, 1, 3, 9, 1, 2, 2, 0, 4, 5, 1, 2, 5, 6, 8, 3, 9, 8, 3, 3, 4, 4, 0, 5, 3, 6, 9, 3, 0, 5, 2, 1, 7, 1, 1, 2, 1, 6, 0, 2, 7, 1, 6, 3, 7, 1, 6, 8, 0, 3, 6, 5, 9, 0, 4, 3, 8, 1, 4, 0, 3, 1, 3, 8, 7, 2, 8, 6, 1, 4, 0, 9, 4, 5, 3, 2, 0, 6, 6, 1, 8, 4, 3, 4, 7, 8, 8, 6, 5, 1, 7, 1, 8, 2, 0, 7, 1, 7, 2, 0, 3, 5, 4, 6, 5, 6, 6, 4, 7, 8, 8, 6, 0, 8, 1, 5, 2, 5, 3, 6, 4, 7, 5, 8, 6, 9, 7, 1, 8, 6, 9, 2, 0, 7, 1, 1, 2, 4, 3, 5, 4, 5, 7, 8, 8, 2, 0, 1, 8, 9, 3, 6, 9, 8, 5, 3, 6, 9, 8, 1, 4, 2, 9, 6, 1, 3, 7, 7, 1, 2, 2, 8, 3, 4, 5, 1, 9, 7, 6, 5, 9, 8, 1, 7, 1, 7, 1, 0, 2, 8, 9, 5, 5, 5, 8, 4, 1, 6, 2, 0, 0, 3, 7, 6, 7, 6, 5, 6, 8, 8, 2, 4, 9, 4, 8, 5, 9, 1, 0, 1, 4, 5, 6, 9, 7, 8, 1, 1, 3, 2, 4, 5, 5, 9, 6, 2, 0, 0, 3, 0, 6, 8, 8, 1, 7, 5, 0, 7, 4, 1, 9, 5, 3, 8, 7, 2, 5, 1, 4, 4, 3, 0, 4, 1, 2, 4, 8, 1, 1, 7, 5, 4, 1, 7, 2, 9, 4, 7, 3, 4, 0, 9, 0, 5, 0, 9, 5, 4, 7, 2, 0, 1, 6, 5, 4, 6, 8, 3, 8, 1, 6, 2, 3, 3, 9, 6, 9, 7, 8, 7, 2, 6, 7, 0, 7, 1, 1, 3, 0, 2, 1, 1, 2, 6, 3, 5, 4, 9, 5, 9, 6, 7, 7, 9, 8, 4, 9, 9, 0, 0, 1, 2, 2, 1, 3, 4, 4, 0, 5, 8, 6, 6, 8, 4, 9, 8, 0, 4, 1, 3, 2, 0, 3, 3, 4, 0, 5, 4, 6, 5, 8, 4, 7, 9, 0, 5, 4, 9, 0, 4, 6, 0, 4, 6, 7, 9, 6, 3, 2, 8, 3, 7, 4, 8, 8, 2, 7, 2, 8, 9, 6, 3, 3, 9, 8, 3, 2, 2, 2, 2, 8, 4, 4, 4, 5, 1, 0, 8, 2, 8, 0, 3, 1, 7, 1, 0, 2, 6, 9, 4, 6, 1, 8, 0, 1, 8, 2, 2, 1, 1, 0, 9, 6, 9, 9, 6, 7, 6, 5, 8, 3, 5, 9, 6, 3, 9, 7, 7, 1, 2, 8, 4, 3, 9, 8, 8, 7, 1, 2, 9, 1, 5, 9, 9, 5, 9, 5, 6, 0, 6, 1, 7, 1, 4, 9, 8, 8, 0, 2, 8, 0, 6, 4, 0, 5, 7, 6, 9, 5, 4, 0, 4, 3, 9, 7, 4, 9, 6, 9, 7, 3, 7, 0, 9, 3, 8, 1, 3, 0, 9, 4, 9, 9, 2, 5, 0, 4, 3, 7, 7, 9, 9, 7, 1, 0, 1, 1, 8, 2, 2, 3, 3, 4, 1, 5, 3, 6, 6, 7, 8, 8, 2, 9, 5, 0, 2, 1, 5, 2, 7, 3, 9, 4, 6, 5, 1, 6, 1, 7, 0, 8, 3, 9, 8, 0, 1, 1, 3, 2, 2, 3, 1, 4, 5, 7, 7, 8, 3, 9, 3, 2, 7, 2, 7, 7, 9, 6, 5, 4, 7, 7, 3, 3, 9, 5, 1, 4, 0, 1, 7, 8, 0, 0, 6, 5, 3, 2, 9, 7, 7, 2, 4, 3, 6, 6, 2, 2, 1, 1, 4, 7, 8, 7, 0, 9, 9, 9, 3, 1, 2, 2, 4, 4, 0, 6, 1, 7, 8, 7, 9, 5, 7, 4, 0, 5, 1, 0, 5, 9, 8, 9, 1, 8, 4, 0, 8, 2, 0, 0, 7, 3, 0, 5, 4, 1, 2, 8, 8, 6, 6, 4, 1, 6, 6, 0, 7, 6, 1, 4, 0, 3, 9, 9, 1, 3, 3, 0, 2, 0, 3, 5, 0, 2, 9, 5, 2, 8, 5, 8, 5, 9, 0, 4, 5, 3, 1, 4, 1, 2, 9, 8, 2, 5, 3, 5, 7, 7, 8, 1, 4, 3, 6, 6, 1, 9, 3, 4, 7, 1, 3, 3, 7, 8, 5, 7, 0, 6, 2, 9, 3, 3, 9, 3, 2, 7, 1, 4, 6, 1, 9, 9, 3, 1, 4, 0, 4, 0, 3, 1, 8, 2, 9, 3, 2, 4, 8, 5, 6, 7, 0, 8, 0, 9, 0, 0, 1, 1, 0, 2, 3, 3, 3, 4, 1, 5, 5, 6, 5, 7, 9, 8, 4, 0, 2, 1, 9, 2, 4, 4, 4, 5, 1, 6, 0, 7, 6, 8, 9, 8, 4, 9, 8, 9, 6, 0, 7, 1, 8, 2, 7, 4, 5, 7, 1, 4, 0, 0, 6, 3, 4, 8, 6, 8, 1, 2, 1, 1, 0, 7, 0, 3, 4, 5, 5, 8, 0, 5, 0, 5, 2, 9, 7, 2, 4, 5, 1, 1, 3, 1, 1, 6, 1, 2, 9, 1, 1, 3, 1, 8, 0, 6, 5, 4, 5, 9, 3, 4, 4, 9, 3, 2, 3, 0, 6, 0, 9, 4, 1, 4, 8, 6, 9, 0, 8, 2, 5, 8, 2, 0, 6, 6, 1, 8, 4, 1, 9, 7, 6, 9, 9, 1, 9, 9, 8, 2, 1, 6, 2, 7, 2, 6, 0, 6, 1, 8, 5, 4, 5, 9, 7, 2, 0, 1, 1, 3, 5, 0, 7, 5, 5, 5, 1, 8, 9, 0, 0, 3, 8, 7, 7, 9, 5, 7, 1, 0, 9, 2, 4, 7, 8, 3, 6, 6, 4, 7, 3, 8, 4, 0, 8, 3, 6, 5, 6, 0, 2, 1, 9, 2, 8, 3, 0, 4, 6, 5, 9, 7, 3, 8, 8, 0, 7, 1, 6, 2, 3, 3, 2, 4, 3, 7, 5, 8, 3, 9, 0, 0, 8, 1, 9, 2, 3, 3, 2, 4, 3, 7, 4, 8, 9, 9, 9, 7, 0, 7, 7, 0, 7, 3, 3, 1, 3, 8, 9, 9, 7, 2, 6, 1, 6, 8, 6, 6, 1, 5, 3, 4, 1, 7, 7, 3, 4, 4, 5, 1, 6, 8, 0, 6, 4, 9, 2, 1, 6, 4, 9, 5, 3, 0, 1, 1, 5, 3, 0, 6, 9, 4, 7, 8, 2, 9, 6, 8, 5, 5, 9, 2, 9, 1, 2, 0, 3, 7, 5, 6, 6, 6, 6, 3, 7, 3, 2, 3, 3, 1, 4, 7, 3, 2, 7, 2, 1, 3, 3, 6, 8, 8, 7, 5, 5, 1, 6, 4, 8, 9, 0, 0, 8, 6, 5, 8, 5, 8, 3, 0, 7, 8, 7, 2, 5, 4, 0, 3, 4, 7, 4, 1, 6, 7, 6, 6, 3, 9, 1, 4, 5, 2, 8, 9, 1, 9, 5, 2, 5, 0, 1, 4, 2, 9, 4, 4, 4, 0, 6, 7, 1, 1, 9, 3, 4, 2, 7, 9, 4, 0, 1, 1, 5, 2, 7, 3, 6, 4, 9, 5, 5, 6, 2, 7, 7, 8, 5, 9, 3, 0, 1, 1, 3, 2, 2, 3, 1, 4, 7, 5, 2, 6, 1, 7, 0, 8, 5, 9, 8, 0, 8, 1, 6, 2, 6, 3, 2, 4, 2, 5, 8, 6, 5, 7, 3, 8, 5, 9, 4, 7, 0, 6, 1, 4, 4, 0, 1, 5, 6, 8, 0, 0, 0, 7, 9, 3, 6, 5, 4, 4, 3, 3, 2, 6, 0, 2, 5, 1, 2, 7, 1, 7, 9, 9, 4, 9, 1, 1, 3, 2, 4, 4, 4, 6, 2, 7, 1, 7, 1, 5, 6, 4, 6, 5, 7, 0, 3, 9, 8, 9, 8, 8, 0, 0, 1, 2, 9, 0, 3, 3, 0, 5, 1, 6, 0, 1, 2, 8, 9, 6, 9, 4, 6, 6, 4, 0, 8, 9, 2, 2, 8, 6, 7, 4, 7, 3, 9, 9, 5, 3, 7, 0, 8, 0, 0, 5, 9, 2, 0, 5, 5, 8, 7, 8, 0, 8, 9, 9, 1, 4, 8, 3, 2, 8, 0, 8, 2, 5, 4, 5, 5, 7, 0, 1, 1, 3, 9, 6, 8, 9, 3, 4, 1, 1, 6, 7, 1, 6, 0, 9, 1, 3, 2, 3, 4, 7, 7, 4, 5, 1, 1, 9, 7, 1, 9, 0, 0, 6, 7, 0, 8, 1, 1, 2, 2, 3, 6, 4, 7, 5, 3, 6, 8, 7, 0, 8, 4, 9, 7, 0, 5, 1, 4, 2, 1, 3, 5, 4, 6, 5, 2, 6, 0, 7, 6, 8, 0, 9, 2, 0, 9, 1, 8, 2, 2, 3, 9, 4, 6, 5, 4, 6, 5, 7, 7, 8, 5, 9, 3, 0, 6, 8, 6, 3, 0, 9, 8, 5, 9, 5, 8, 2, 6, 6, 1, 8, 0, 4, 9, 9, 9, 1, 0, 7, 3, 1, 3, 2, 0, 3, 7, 5, 1, 9, 0, 6, 5, 9, 9, 1, 2, 1, 5, 1, 6, 2, 8, 9, 3, 5, 0, 6, 6, 8, 2, 1, 9, 2, 1, 0, 0, 7, 0, 7, 0, 5, 1, 8, 9, 2, 7, 9, 1, 8, 2, 9, 0, 0, 6, 4, 8, 7, 8, 3, 4, 4, 0, 5, 0, 6, 7, 0, 2, 3, 1, 6, 9, 8, 2, 7, 4, 0, 7, 4, 9, 2, 1, 7, 0, 4, 5, 3, 0, 7, 9, 5, 8, 4, 6, 3, 1, 4, 9, 2, 3, 8, 3, 1, 7, 5, 4, 1, 7, 2, 7, 0, 5, 2, 6, 5, 1, 6, 5, 4, 2, 3, 0, 0, 5, 0, 9, 0, 5, 3, 8, 3, 3, 5, 5, 7, 5, 0, 0, 6, 5, 4, 2, 8, 3, 8, 1, 6, 4, 3, 1, 9, 2, 9, 5, 8, 2, 2, 5, 7, 1, 7, 6, 1, 1, 0, 0, 1, 0, 2, 7, 3, 8, 4, 0, 5, 9, 8, 7, 9, 9, 0, 6, 1, 1, 2, 5, 3, 4, 4, 0, 5, 2, 6, 8, 7, 0, 8, 8, 9, 9, 0, 4, 1, 9, 2, 1, 3, 5, 4, 5, 5, 6, 6, 8, 7, 3, 8, 4, 9, 6, 1, 6, 4, 5, 5, 6, 4, 3, 2, 6, 3, 1, 3, 1, 0, 6, 9, 9, 5, 0, 4, 3, 3, 7, 0, 5, 8, 2, 4, 6, 0, 6, 7, 8, 7, 0, 1, 9, 6, 5, 9, 5, 1, 4, 2, 5, 9, 7, 3, 7, 6, 5, 2, 4, 3, 0, 4, 0, 6, 8, 8, 3, 5, 1, 7, 8, 2, 2, 3, 8, 8, 9, 1, 2, 2, 7, 9, 7, 5, 5, 8, 1, 8, 5, 7, 4, 1, 2, 7, 5, 1, 1, 1, 7, 0, 9, 3, 1, 4, 9, 2, 4, 6, 1, 4, 0, 7, 8, 4, 1, 2, 1, 7, 8, 4, 1, 2, 3, 9, 4, 9, 6, 2, 2, 8, 3, 6, 4, 1, 9, 0, 9, 6, 0, 8, 7, 5, 5, 5, 1, 0, 3, 5, 4, 3, 2, 5, 8, 9, 6, 7, 8, 8, 1, 5, 4, 9, 9, 6, 0, 9, 8, 0, 4, 6, 5, 3, 6, 0, 6, 5, 9, 8, 0, 9, 9, 1, 1, 8, 7, 1, 6, 6, 9, 0, 5, 0, 6, 1, 4, 2, 1, 3, 6, 4, 3, 5, 6, 6, 6, 7, 6, 8, 7, 9, 2, 0, 7, 1, 9, 2, 3, 3, 6, 4, 9, 5, 4, 6, 0, 0, 4, 1, 1, 2, 4, 3, 4, 4, 9, 5, 5, 6, 9, 7, 5, 8, 3, 9, 1, 1, 9, 4, 8, 5, 5, 3, 9, 3, 8, 0, 7, 9, 4, 5, 5, 4, 1, 3, 7, 0, 9, 8, 7, 4, 3, 6, 3, 7, 2, 0, 7, 7, 9, 7, 4, 1, 1, 6, 4, 9, 4, 1, 0, 2, 2, 9, 2, 3, 0, 6, 5, 2, 9, 3, 4, 4, 3, 6, 9, 7, 0, 2, 4, 3, 7, 8, 4, 1, 9, 2, 5, 9, 2, 8, 9, 8, 6, 7, 1, 1, 4, 7, 3, 1, 7, 1, 9, 0, 2, 3, 6, 4, 6, 2, 9, 6, 0, 4, 4, 7, 7, 4, 1, 2, 8, 7, 1, 4, 7, 2, 5, 9, 9, 2, 7, 7, 7, 2, 3, 8, 9, 6, 7, 1, 6, 0, 1, 6, 6, 5, 3, 1, 8, 3, 9, 5, 1, 9, 0, 7, 8, 4, 4, 8, 1, 9, 5, 6, 3, 9, 4, 3, 1, 0, 8, 0, 8, 6, 7, 3, 3, 0, 9, 5, 9, 1, 3, 8, 8, 1, 9, 6, 4, 0, 7, 0, 8, 1, 5, 2, 9, 3, 3, 4, 7, 5, 2, 6, 1, 7, 7, 8, 0, 9, 5, 0, 0, 1, 1, 2, 4, 3, 7, 4, 3, 6, 9, 7, 7, 8, 7, 0, 8, 1, 9, 2, 8, 3, 2, 4, 6, 7, 0, 8, 0, 9, 7, 3, 2, 4, 3, 1, 5, 4, 3, 6, 2, 6, 9, 7, 2, 3, 1, 3, 2, 2, 2, 1, 9, 9, 2, 4, 2, 7, 9, 3, 7, 5, 2, 4, 1, 9, 3, 1, 4, 1, 9, 0, 4, 1, 7, 4, 4, 6, 3, 0, 8, 2, 1, 1, 5, 7, 0, 5, 6, 0, 0, 0, 4, 2, 6, 0, 2, 6, 4, 8, 3, 2, 6, 9, 4, 2, 7, 3, 3, 7, 2, 6, 7, 9, 1, 8, 9, 7, 0, 8, 6, 9, 2, 2, 8, 2, 9, 9, 2, 8, 2, 6, 8, 4, 2, 4, 5, 4, 5, 0, 7, 0, 5, 8, 1, 0, 3, 8, 3, 6, 2, 6, 3, 8, 9, 5, 0, 7, 2, 0, 7, 3, 9, 6, 1, 7, 7, 8, 8, 3, 9, 1, 5, 3, 7, 9, 2, 5, 3, 9, 6, 9, 4, 5, 7, 0, 8, 7, 8, 2, 7, 7, 0, 4, 5, 3, 7, 1, 5, 0, 8, 1, 9, 2, 6, 3, 5, 4, 7, 5, 0, 6, 1, 7, 3, 8, 0, 0, 3, 1, 2, 2, 8, 3, 3, 4, 8, 7, 4, 8, 0, 9, 2, 0, 3, 1, 5, 2, 8, 3, 0, 4, 4, 5, 9, 6, 9, 8, 8, 9, 0, 1, 9, 0, 7, 6, 8, 3, 4, 4, 4, 4, 1, 2, 6, 8, 0, 1, 8, 0, 0, 6, 3, 4, 8, 9, 5, 7, 3, 2, 1, 3, 1, 3, 9, 9, 1, 2, 4, 0, 6, 9, 9, 3, 1, 3, 0, 9, 8, 1, 9, 5, 7, 2, 4, 3, 9, 1, 9, 6, 4, 7, 6, 3, 1, 7, 3, 8, 2, 4, 8, 0, 4, 2, 5, 4, 5, 0, 7, 2, 8, 7, 0, 8, 4, 0, 3, 7, 4, 0, 8, 6, 9, 9, 6, 3, 3, 2, 7, 4, 2, 8, 6, 6, 1, 0, 2, 1, 9, 0, 3, 8, 5, 1, 3, 6, 8, 7, 1, 2, 0, 9, 6, 7, 7, 9, 4, 5, 2, 8, 1, 9, 8, 6, 4, 5, 9, 2, 3, 6, 6, 2, 5, 8, 2, 1, 9, 7, 3, 5, 9, 5, 4, 7, 6, 3, 1, 5, 3, 0, 1, 1, 5, 3, 6, 8, 6, 4, 1, 9, 8, 4, 0, 5, 0, 1, 9, 8, 9, 6, 6, 8, 1, 9, 9, 0, 1, 1, 9, 2, 2, 3, 7, 4, 4, 5, 1, 6, 0, 9, 3, 0, 3, 1, 0, 2, 1, 3, 2, 4, 1, 5, 5, 6, 7, 7, 8, 8, 5, 9, 2, 0, 9, 1, 7, 2, 3, 3, 1, 9, 3, 8, 2, 1, 8, 0, 5, 9, 8, 5, 2, 7, 1, 5, 0, 1, 1, 8, 5, 6, 6, 9, 4, 0, 6, 4, 1, 1, 9, 9, 3, 3, 8, 8, 8, 4, 4, 7, 2, 0, 1, 1, 5, 9, 6, 2, 9, 8, 9, 7, 5, 8, 4, 9, 3, 6, 0, 0, 2, 6, 4, 5, 0, 5, 0, 3, 8, 3, 6, 3, 3, 9, 2, 8, 3, 0, 6, 6, 4, 1, 3, 0, 8, 0, 4, 6, 0, 2, 2, 1, 4, 1, 9, 3, 8, 2, 8, 7, 2, 7, 4, 8, 1, 8, 5, 7, 6, 0, 7, 2, 9, 0, 6, 3, 8, 1, 1, 3, 1, 7, 2, 2, 5, 4, 7, 9, 6, 4, 7, 3, 1, 6, 6, 5, 2, 3, 6, 2, 1, 5, 2, 5, 2, 9, 5, 4, 3, 1, 9, 7, 4, 2, 2, 6, 3, 5, 0, 0, 6, 1, 9, 2, 5, 3, 6, 4, 3, 5, 9, 6, 2, 7, 2, 8, 8, 9, 8, 0, 7, 1, 1, 2, 1, 3, 3, 4, 5, 5, 1, 6, 7, 7, 0, 8, 0, 9, 1, 0, 1, 1, 9, 2, 6, 3, 4, 4, 0, 5, 3, 6, 0, 7, 6, 8, 7, 9, 1, 8, 1, 9, 3, 5, 1, 7, 4, 0, 3, 3, 6, 1, 3, 6, 8, 8, 8, 4, 9, 1, 8, 7, 3, 6, 5, 5, 3, 6, 8, 4, 8, 2, 6, 7, 5, 8, 6, 1, 6, 3, 4, 4, 0, 7, 4, 2, 2, 0, 9, 5, 4, 0, 0, 1, 3, 9, 8, 2, 7, 3, 3, 2, 4, 3, 3, 5, 3, 5, 9, 7, 7, 8, 9, 4, 2, 9, 1, 9, 1, 7, 3, 1, 9, 1, 2, 7, 3, 8, 1, 3, 6, 4, 3, 8, 5, 6, 4, 3, 8, 8, 8, 0, 9, 9, 2, 6, 1, 2, 5, 0, 1, 1, 1, 0, 5, 6, 5, 2, 3, 3, 5, 8, 8, 9, 6, 0, 0, 7, 9, 2, 1, 3, 7, 4, 9, 5, 6, 5, 3, 2, 1, 8, 4, 5, 6, 4, 7, 6, 3, 6, 7, 6, 0, 7, 5, 9, 4, 1, 1, 8, 3, 2, 5, 1, 2, 2, 0, 6, 7, 5, 0, 3, 4, 4, 5, 7, 0, 9, 6, 4, 4, 0, 1, 0, 2, 5, 5, 9, 3, 0, 8, 1, 8, 2, 3, 3, 8, 4, 1, 5, 6, 6, 1, 7, 6, 8, 4, 9, 6, 0, 9, 1, 9, 2, 4, 3, 3, 4, 0, 5, 8, 6, 8, 7, 0, 8, 6, 9, 7, 0, 3, 1, 7, 2, 2, 3, 4, 4, 3, 5, 2, 6, 6, 7, 1, 7, 9, 6, 5, 4, 4, 3, 1, 0, 9, 6, 5, 6, 6, 6, 0, 9, 7, 0, 0, 0, 9, 1, 0, 3, 5, 9, 1, 4, 1, 5, 2, 7, 6, 9, 3, 5, 0, 6, 4, 8, 1, 9, 9, 1, 0, 3, 2, 8, 8, 5, 7, 7, 7, 8, 3, 1, 6, 4, 1, 8, 7, 5, 1, 8, 7, 1, 1, 0, 6, 7, 8, 6, 8, 1, 6, 6, 7, 0, 2, 3, 5, 4, 6, 6, 3, 8, 9, 9, 1, 2, 6, 1, 3, 7, 4, 4, 8, 5, 6, 2, 2, 7, 2, 5, 5, 2, 4, 2, 2, 9, 1, 3, 4, 9, 2, 2, 6, 2, 0, 5, 7, 8, 3, 7, 1, 4, 7, 7, 7, 1, 3, 8, 3, 0, 2, 9, 4, 6, 1, 8, 1, 1, 7, 1, 4, 5, 7, 7, 5, 6, 8, 3, 6, 5, 4, 4, 1, 2, 8, 9, 3, 0, 1, 4, 4, 7, 2, 4, 2, 3, 0, 2, 0, 9, 9, 2, 3, 0, 7, 3, 9, 4, 7, 5, 8, 0, 2, 0, 3, 3, 0, 2, 2, 8, 5, 3, 5, 0, 0, 1, 2, 2, 6, 3, 9, 4, 0, 5, 2, 6, 0, 7, 5, 8, 5, 9, 1, 0, 1, 1, 8, 2, 5, 3, 0, 4, 9, 5, 6, 6, 2, 7, 1, 8, 3, 9, 7, 0, 1, 1, 0, 2, 8, 3, 3, 4, 3, 5, 3, 6, 0, 7, 5, 8, 4, 9, 9, 8, 1, 9, 3, 2, 2, 6, 0, 1, 0, 7, 5, 6, 3, 3, 0, 5, 3, 4, 0, 8, 0, 2, 9, 6, 1, 4, 0, 7, 3, 2, 7, 3, 5, 4, 0, 5, 2, 9, 5, 2, 1, 0, 2, 3, 2, 9, 0, 7, 4, 3, 4, 9, 9, 3, 4, 8, 8, 7, 2, 4, 3, 4, 8, 9, 0, 8, 3, 5, 7, 8, 4, 2, 7, 6, 2, 9, 2, 5, 7, 3, 2, 6, 6, 5, 5, 7, 1, 0, 1, 2, 6, 3, 9, 1, 8, 3, 3, 2, 2, 7, 8, 3, 6, 1, 1, 1, 7, 7, 1, 0, 7, 8, 7, 5, 8, 1, 7, 8, 6, 2, 3, 1, 1, 3, 9, 7, 3, 0, 2, 8, 9, 7, 3, 2, 6, 4, 8, 4, 7, 8, 5, 0, 0, 1, 4, 5, 1, 1, 2, 4, 1, 6, 4, 0, 9, 5, 2, 1, 6, 6, 5, 6, 9, 9, 7, 0, 2, 7, 6, 6, 6, 1, 0, 1, 0, 0, 4, 1, 6, 2, 9, 3, 4, 4, 8, 5, 0, 6, 5, 7, 2, 8, 9, 9, 2, 0, 7, 1, 4, 2, 1, 3, 2, 4, 2, 5, 0, 6, 2, 7, 2, 8, 5, 9, 6, 0, 5, 1, 3, 2, 4, 3, 7, 4, 1, 5, 5, 6, 4, 7, 7, 8, 8, 9, 4, 1, 4, 3, 6, 5, 7, 9, 5, 4, 6, 1, 9, 7, 9, 7, 6, 2, 4, 1, 0, 4, 5, 8, 2, 3, 6, 8, 6, 2, 4, 9, 6, 3, 6, 8, 3, 5, 3, 4, 8, 9, 9, 7, 9, 5, 0, 4, 9, 3, 1, 9, 2, 2, 4, 5, 1, 7, 4, 4, 4, 1, 0, 2, 9, 3, 7, 5, 8, 9, 0, 1, 6, 6, 5, 0, 7, 1, 4, 0, 1, 0, 0, 2, 6, 8, 5, 7, 4, 2, 6, 5, 6, 1, 4, 1, 9, 8, 8, 5, 1, 6, 3, 4, 0, 0, 6, 4, 4, 7, 3, 3, 4, 6, 1, 8, 1, 0, 3, 3, 3, 7, 3, 4, 2, 0, 0, 6, 5, 9, 1, 2, 0, 6, 8, 5, 1, 8, 3, 6, 4, 9, 0, 0, 1, 4, 3, 0, 5, 6, 1, 1, 3, 9, 2, 2, 1, 0, 3, 9, 4, 5, 1, 1, 4, 3, 4, 6, 0, 9, 3, 4, 3, 8, 3, 3, 1, 7, 6, 7, 0, 6, 2, 3, 4, 0, 3, 5, 7, 6, 7, 2, 5, 2, 7, 0, 3, 1, 2, 2, 4, 3, 5, 4, 3, 5, 4, 6, 2, 7, 5, 8, 0, 9, 5, 0, 2, 1, 0, 2, 0, 3, 9, 4, 7, 5, 8, 6, 2, 7, 3, 8, 8, 9, 2, 0, 4, 1, 1, 2, 6, 3, 2, 4, 9, 5, 6, 6, 2, 7, 9, 8, 9, 9, 7, 2, 6, 4, 9, 1, 9, 5, 7, 6, 3, 1, 7, 1, 4, 7, 4, 8, 2, 5, 5, 3, 2, 4, 1, 6, 9, 7, 9, 0, 2, 3, 3, 2, 9, 9, 8, 8, 1, 6, 3, 8, 2, 9, 3, 9, 6, 7, 5, 7, 2, 2, 7, 1, 8, 1, 4, 2, 9, 8, 6, 0, 0, 6, 2, 5, 9, 3, 8, 8, 0, 1, 3, 3, 5, 6, 1, 0, 6, 4, 3, 8, 1, 9, 8, 7, 1, 2, 1, 7, 3, 1, 9, 8, 9, 2, 6, 1, 5, 7, 3, 7, 2, 3, 5, 2, 2, 4, 6, 6, 1, 5, 5, 9, 0, 4, 2, 2, 2, 8, 0, 2, 3, 5, 3, 1, 0, 0, 6, 5, 6, 0, 1, 6, 9, 2, 3, 3, 7, 6, 1, 9, 0, 0, 2, 1, 7, 2, 9, 3, 2, 4, 3, 5, 2, 6, 3, 7, 6, 8, 4, 9, 5, 0, 9, 1, 1, 2, 7, 3, 2, 4, 0, 5, 9, 6, 6, 7, 6, 8, 4, 9, 5, 0, 8, 1, 5, 2, 0, 3, 5, 4, 8, 5, 4, 6, 2, 7, 2, 8, 6, 9, 2, 4, 8, 7, 0, 8, 8, 6, 8, 3, 0, 4, 9, 0, 6, 9, 7, 7, 5, 1, 3, 9, 0, 3, 8, 8, 5, 4, 9, 7, 7, 3, 9, 0, 3, 9, 8, 9, 3, 6, 8, 1, 7, 4, 1, 5, 1, 4, 9, 6, 9, 2, 7, 0, 9, 6, 9, 2, 7, 1, 0, 1, 7, 1, 7, 1, 7, 7, 0, 2, 5, 4, 2, 2, 2, 9, 6, 4, 0, 5, 0, 8, 3, 4, 2, 2, 1, 7, 4, 0, 3, 0, 2, 7, 0, 5, 5, 7, 5, 6, 6, 6, 2, 6, 9, 8, 9, 2, 7, 5, 4, 2, 5, 2, 1, 7, 4, 7, 4, 4, 3, 0, 9, 2, 3, 4, 1, 2, 1, 3, 2, 3, 7, 3, 4, 1, 7, 8, 6, 9, 6, 6, 5, 1, 5, 0, 0, 5, 0, 9, 4, 6, 0, 9, 8, 8, 0, 0, 2, 3, 0, 0, 2, 9, 6, 6, 9, 3, 1, 0, 7, 1, 4, 2, 9, 3, 3, 4, 1, 5, 1, 6, 1, 7, 3, 8, 5, 9, 4, 0, 3, 1, 1, 3, 1, 4, 4, 7, 4, 8, 8, 9, 2, 0, 3, 1, 1, 2, 3, 3, 8, 4, 3, 7, 7, 8, 2, 9, 1, 9, 4, 9, 5, 8, 5, 5, 0, 0, 1, 7, 9, 7, 2, 5, 4, 7, 6, 9, 3, 9, 2, 4, 8, 7, 7, 0, 7, 4, 8, 1, 7, 4, 3, 4, 1, 7, 9, 5, 3, 8, 4, 1, 7, 4, 2, 9, 6, 8, 9, 4, 2, 1, 5, 8, 2, 6, 1, 6, 6, 4, 4, 5, 5, 3, 8, 3, 7, 5, 4, 2, 4, 5, 9, 7, 3, 2, 4, 5, 1, 0, 4, 8, 1, 3, 7, 0, 4, 8, 6, 7, 2, 4, 0, 9, 3, 5, 6, 0, 4, 0, 8, 0, 2, 4, 7, 6, 9, 2, 2, 7, 4, 6, 6, 8, 6, 3, 2, 1, 5, 8, 2, 3, 7, 1, 1, 0, 4, 3, 1, 6, 0, 2, 0, 0, 5, 1, 0, 2, 1, 3, 1, 4, 0, 5, 9, 6, 5, 7, 4, 8, 6, 9, 1, 0, 0, 1, 4, 2, 7, 3, 9, 6, 4, 7, 3, 0, 4, 1, 9, 2, 3, 3, 4, 4, 9, 5, 5, 6, 8, 7, 9, 8, 5, 9, 2, 1, 6, 0, 9, 6, 4, 3, 2, 4, 6, 4, 1, 2, 6, 8, 5, 1, 0, 0, 3, 6, 0, 7, 2, 2, 4, 3, 6, 3, 6, 9, 5, 3, 4, 3, 8, 9, 2, 1, 3, 5, 3, 2, 5, 3, 5, 1, 5, 6, 3, 7, 7, 3, 2, 7, 0, 8, 5, 4, 1, 0, 4, 2, 0, 7, 7, 8, 5, 0, 6, 7, 8, 0, 9, 6, 0, 9, 4, 3, 4, 2, 3, 4, 9, 8, 4, 6, 1, 0, 2, 5, 9, 7, 9, 5, 8, 1, 4, 0, 1, 6, 7, 7, 2, 2, 1, 9, 7, 7, 1, 9, 2, 5, 5, 6, 9, 5, 6, 2, 8, 6, 8, 2, 1, 8, 6, 1, 0, 7, 4, 5, 6, 5, 5, 7, 9, 3, 7, 5, 1, 0, 6, 1, 0, 1, 6, 3, 7, 8, 4, 4, 6, 9, 9, 4, 1, 5, 5, 1, 1, 8, 1, 6, 2, 8, 9, 9, 2, 0, 7, 1, 0, 2, 7, 3, 2, 4, 5, 5, 1, 6, 7, 7, 6, 8, 0, 9, 7, 0, 2, 1, 7, 2, 0, 3, 2, 4, 0, 5, 1, 6, 9, 7, 1, 8, 3, 9, 1, 0, 9, 1, 2, 2, 9, 3, 6, 4, 3, 5, 6, 6, 0, 7, 0, 8, 1, 9, 1, 0, 5, 8, 5, 7, 2, 8, 8, 9, 1, 9, 1, 0, 2, 1, 0, 4, 8, 5, 6, 1, 0, 6, 6, 7, 5, 3, 6, 2, 3, 9, 9, 0, 7, 5, 1, 6, 0, 7, 1, 3, 2, 9, 4, 9, 6, 3, 3, 8, 8, 9, 4, 6, 4, 7, 1, 5, 4, 6, 8, 3, 0, 5, 4, 0, 6, 5, 7, 4, 6, 0, 4, 3, 2, 4, 4, 7, 2, 7, 3, 4, 2, 3, 7, 2, 7, 1, 8, 5, 5, 5, 8, 0, 7, 5, 1, 0, 4, 8, 9, 4, 2, 6, 2, 7, 3, 0, 3, 2, 2, 9, 2, 3, 1, 4, 0, 4, 1, 8, 1, 1, 2, 2, 2, 2, 9, 3, 0, 1, 3, 3, 8, 6, 6, 7, 8, 3, 7, 4, 1, 9, 2, 1, 0, 9, 9, 8, 8, 5, 5, 0, 7, 2, 7, 8, 6, 6, 7, 6, 3, 8, 8, 2, 2, 8, 2, 4, 9, 4, 8, 2, 0, 2, 9, 8, 8, 0, 7, 0, 4, 1, 6, 2, 9, 3, 9, 4, 0, 5, 2, 6, 0, 8, 6, 9, 8, 0, 2, 1, 3, 2, 1, 3, 0, 4, 4, 5, 0, 6, 6, 7, 9, 8, 3, 0, 1, 1, 1, 4, 0, 5, 2, 6, 7, 7, 1, 8, 3, 9, 5, 8, 6, 7, 4, 4, 4, 7, 0, 7, 3, 3, 5, 9, 1, 8, 2, 8, 7, 3, 9, 1, 6, 5, 9, 2, 0, 7, 4, 4, 1, 2, 7, 6, 8, 1, 1, 5, 8, 2, 6, 4, 4, 5, 8, 5, 7, 8, 2, 6, 4, 4, 6, 4, 5, 4, 3, 1, 1, 8, 3, 7, 4, 5, 0, 5, 9, 1, 1, 8, 2, 9, 3, 1, 7, 3, 2, 6, 9, 3, 5, 3, 6, 2, 7, 2, 8, 6, 9, 5, 6, 5, 1, 3, 1, 3, 3, 8, 6, 1, 7, 6, 7, 5, 0, 6, 5, 8, 1, 1, 6, 9, 6, 7, 7, 6, 9, 8, 5, 3, 9, 7, 2, 4, 4, 7, 4, 0, 4, 9, 4, 0, 9, 0, 1, 3, 8, 7, 6, 9, 4, 3, 8, 0, 1, 1, 7, 0, 3, 1, 8, 0, 3, 4, 8, 0, 1, 1, 3, 0, 4, 4, 1, 7, 2, 9, 5, 2, 9, 0, 8, 6, 1, 2, 3, 6, 3, 2, 5, 2, 4, 9, 8, 9, 2, 0, 5, 1, 7, 2, 5, 3, 3, 4, 1, 5, 1, 6, 3, 7, 6, 8, 1, 9, 8, 0, 7, 1, 6, 2, 6, 3, 6, 4, 7, 5, 0, 6, 2, 9, 9, 0, 8, 1, 2, 2, 0, 3, 9, 4, 8, 5, 0, 6, 0, 7, 1, 8, 5, 5, 7, 7, 7, 0, 1, 8, 5, 4, 6, 0, 1, 2, 8, 1, 8, 0, 7, 2, 1, 8, 4, 5, 8, 4, 2, 4, 3, 1, 8, 6, 6, 1, 5, 3, 9, 6, 8, 9, 5, 3, 8, 7, 8, 4, 7, 9, 4, 7, 5, 4, 8, 8, 5, 3, 8, 2, 7, 7, 1, 7, 9, 9, 8, 5, 6, 7, 5, 6, 0, 5, 8, 2, 8, 4, 2, 8, 1, 9, 0, 6, 8, 9, 2, 7, 1, 6, 2, 1, 4, 6, 6, 1, 4, 7, 9, 2, 3, 3, 4, 6, 4, 6, 3, 6, 3, 2, 1, 1, 2, 0, 5, 5, 1, 0, 6, 1, 9, 2, 0, 1, 0, 7, 5, 8, 8, 1, 9, 4, 5, 9, 5, 3, 5, 9, 2, 0, 8, 1, 8, 2, 7, 3, 4, 4, 1, 5, 1, 6, 7, 7, 0, 8, 4, 9, 7, 0, 9, 1, 5, 2, 5, 3, 9, 4, 5, 7, 9, 8, 1, 9, 3, 0, 6, 1, 8, 2, 8, 3, 2, 4, 6, 5, 5, 6, 7, 7, 3, 8, 9, 9, 1, 6, 2, 0, 4, 3, 8, 4, 2, 1, 0, 4, 7, 0, 7, 8, 4, 6, 6, 4, 4, 5, 0, 4, 6, 0, 8, 7, 1, 8, 0, 7, 4, 7, 2, 9, 1, 0, 1, 4, 0, 9, 4, 9, 5, 7, 6, 4, 9, 2, 6, 0, 6, 5, 5, 8, 5, 5, 3, 9, 4, 8, 9, 8, 5, 4, 2, 0, 4, 7, 6, 1, 4, 3, 8, 5, 2, 6, 6, 5, 1, 3, 4, 8, 1, 7, 0, 3, 4, 1, 7, 6, 5, 8, 4, 5, 3, 9, 8, 2, 5, 2, 7, 0, 8, 9, 9, 2, 7, 4, 7, 6, 6, 5, 5, 2, 4, 1, 6, 3, 4, 6, 7, 6, 3, 2, 8, 1, 7, 2, 6, 6, 7, 0, 9, 7, 3, 4, 4, 7, 2, 8, 2, 9, 6, 2, 5, 9, 3, 5, 7, 1, 0, 8, 3, 3, 9, 5, 5, 6, 5, 8, 9, 0, 1, 0, 6, 9, 9, 9, 5, 3, 9, 1, 8, 1, 7, 0, 0, 1, 1, 2, 6, 3, 7, 4, 1, 5, 2, 6, 6, 7, 8, 8, 2, 9, 9, 0, 6, 1, 2, 2, 3, 3, 6, 4, 7, 5, 7, 6, 0, 7, 1, 8, 6, 9, 5, 0, 2, 1, 3, 2, 7, 3, 2, 4, 7, 7, 8, 8, 5, 9, 5, 0, 3, 7, 3, 0, 2, 7, 9, 8, 1, 3, 3, 0, 1, 0, 5, 5, 2, 5, 0, 3, 6, 8, 5, 8, 4, 1, 5, 4, 9, 6, 7, 1, 0, 8, 1, 0, 2, 2, 8, 7, 6, 3, 1, 9, 1, 4, 0, 1, 5, 2, 3, 5, 1, 9, 9, 8, 3, 9, 9, 5, 5, 4, 1, 3, 5, 0, 9, 3, 4, 3, 9, 4, 0, 7, 0, 1, 1, 2, 3, 1, 8, 0, 1, 6, 2, 2, 4, 3, 6, 8, 6, 9, 7, 5, 4, 6, 5, 6, 1, 7, 1, 1, 5, 4, 0, 6, 2, 2, 5, 9, 5, 1, 6, 5, 6, 5, 0, 5, 5, 3, 8, 1, 7, 4, 2, 8, 4, 6, 5, 3, 0, 7, 2, 0, 9, 9, 7, 5, 8, 6, 9, 7, 2, 1, 1, 3, 4, 2, 6, 6, 1, 2, 3, 6, 8, 7, 8, 8, 7, 7, 1, 0, 5, 1, 4, 2, 9, 3, 7, 4, 0, 5, 2, 6, 1, 7, 3, 8, 0, 9, 9, 0, 4, 1, 2, 2, 5, 3, 9, 4, 8, 5, 8, 6, 5, 7, 9, 8, 7, 9, 2, 0, 2, 1, 2, 2, 6, 3, 4, 4, 1, 5, 7, 6, 0, 7, 8, 8, 3, 9, 6, 6, 4, 4, 0, 2, 2, 6, 1, 4, 7, 7, 3, 5, 7, 5, 8, 4, 8, 7, 2, 8, 4, 9, 9, 2, 5, 9, 6, 3, 2, 9, 9, 3, 7, 8, 3, 2, 5, 0, 1, 9, 0, 8, 6, 0, 4, 5, 0, 6, 1, 0, 9, 1, 4, 0, 1, 4, 7, 2, 1, 6, 9, 5, 7, 3, 2, 5, 2, 3, 5, 8, 1, 0, 3, 0, 5, 5, 8, 4, 8, 3, 8, 4, 4, 1, 2, 5, 2, 3, 4, 0, 1, 8, 2, 3, 1, 6, 5, 2, 8, 7, 3, 1, 8, 1, 1, 8, 7, 1, 7, 7, 3, 1, 3, 3, 6, 8, 0, 5, 8, 0, 2, 9, 4, 7, 9, 6, 6, 7, 8, 4, 6, 1, 9, 6, 5, 8, 1, 4, 5, 7, 7, 5, 4, 1, 3, 2, 9, 6, 5, 7, 2, 1, 6, 9, 7, 8, 0, 0, 8, 6, 4, 9, 9, 4, 3, 9, 2, 9, 7, 6, 5, 2, 3, 3, 2, 7, 1, 1, 9, 9, 0, 2, 6, 2, 1, 5, 3, 3, 6, 7, 1, 8, 6, 0, 2, 1, 7, 2, 9, 3, 5, 4, 8, 5, 7, 6, 2, 7, 8, 8, 6, 9, 4, 0, 9, 1, 3, 2, 5, 3, 5, 4, 7, 5, 8, 6, 4, 7, 7, 8, 4, 9, 3, 0, 6, 1, 0, 2, 9, 3, 4, 4, 4, 5, 0, 6, 3, 1, 7, 3, 4, 5, 3, 9, 6, 4, 1, 1, 2, 7, 4, 1, 3, 4, 4, 8, 4, 3, 9, 8, 4, 2, 6, 9, 1, 3, 0, 8, 5, 8, 8, 9, 7, 7, 4, 5, 5, 9, 0, 2, 1, 5, 5, 7, 3, 4, 1, 1, 5, 2, 5, 3, 4, 5, 3, 9, 3, 1, 4, 1, 6, 0, 8, 0, 0, 2, 0, 8, 3, 7, 1, 5, 3, 1, 3, 1, 3, 8, 2, 5, 7, 6, 7, 4, 1, 0, 1, 3, 8, 0, 7, 3, 5, 7, 1, 6, 4, 9, 6, 2, 7, 6, 7, 6, 3, 9, 0, 0, 2, 4, 6, 0, 5, 6, 8, 1, 9, 0, 3, 9, 5, 5, 8, 1, 2, 3, 5, 7, 8, 6, 7, 9, 3, 7, 8, 3, 2, 0, 9, 5, 8, 6, 1, 2, 5, 2, 6, 0, 2, 1, 4, 2, 7, 3, 1, 4, 6, 5, 0, 6, 3, 7, 0, 0, 3, 1, 3, 2, 2, 3, 3, 6, 9, 7, 4, 8, 6, 9, 8, 1, 2, 0, 7, 1, 1, 2, 9, 3, 1, 4, 4, 5, 6, 6, 0, 7, 9, 8, 0, 3, 9, 1, 2, 2, 6, 1, 6, 9, 5, 2, 5, 4, 9, 0, 9, 9, 8, 9, 7, 3, 7, 7, 5, 7, 4, 9, 9, 1, 0, 4, 3, 2, 4, 7, 5, 2, 7, 5, 2, 8, 6, 6, 3, 0, 6, 4, 3, 0, 4, 3, 3, 8, 8, 1, 1, 0, 9, 3, 7, 0, 4, 4, 7, 7, 2, 4, 7, 9, 7, 2, 2, 9, 6, 1, 9, 2, 8, 5, 3, 7, 8, 1, 1, 7, 9, 1, 7, 6, 2, 7, 7, 3, 5, 3, 6, 6, 8, 5, 1, 6, 2, 7, 3, 6, 8, 8, 9, 8, 4, 2, 6, 9, 9, 5, 9, 3, 8, 7, 8, 4, 2, 3, 4, 0, 1, 4, 5, 6, 3, 6, 2, 9, 5, 0, 6, 1, 2, 1, 9, 3, 6, 2, 1, 1, 1, 0, 1, 0, 5, 1, 2, 2, 1, 3, 0, 4, 6, 7, 0, 8, 4, 9, 7, 0, 8, 1, 4, 2, 5, 3, 7, 4, 8, 7, 6, 8, 8, 9, 5, 0, 7, 1, 8, 2, 5, 3, 4, 4, 7, 5, 3, 6, 2, 7, 0, 8, 1, 8, 3, 0, 7, 5, 9, 6, 8, 6, 1, 0, 2, 8, 7, 0, 9, 2, 0, 3, 0, 7, 7, 9, 7, 4, 9, 7, 0, 1, 5, 7, 1, 1, 9, 4, 1, 0, 5, 0, 5, 4, 8, 1, 2, 7, 2, 5, 6, 7, 2, 1, 5, 3, 2, 3, 4, 3, 9, 1, 1, 6, 8, 9, 7, 7, 4, 4, 2, 3, 3, 0, 6, 2, 2, 6, 6, 0, 9, 8, 4, 9, 8, 4, 1, 3, 6, 5, 4, 4, 8, 8, 3, 1, 3, 5, 6, 9, 0, 0, 5, 6, 3, 4, 1, 3, 3, 6, 2, 3, 7, 3, 2, 8, 5, 1, 2, 4, 2, 7, 4, 5, 1, 7, 6, 2, 6, 2, 8, 0, 1, 0, 4, 1, 5, 7, 1, 7, 7, 9, 7, 5, 5, 9, 4, 8, 1, 9, 8, 6, 0, 8, 7, 8, 6, 2, 1, 3, 2, 6, 1, 1, 0, 2, 0, 9, 2, 8, 0, 5, 1, 2, 3, 6, 8, 2, 5, 4, 0, 8, 0, 5, 9, 0, 2, 1, 5, 2, 4, 3, 3, 4, 3, 6, 0, 7, 4, 8, 2, 0, 7, 1, 4, 2, 7, 3, 7, 4, 3, 5, 1, 8, 5, 9, 0, 0, 4, 1, 0, 2, 9, 3, 1, 4, 9, 5, 1, 6, 3, 7, 5, 8, 5, 9, 4, 0, 9, 1, 9, 7, 1, 9, 9, 5, 4, 1, 1, 8, 8, 9, 7, 4, 1, 3, 1, 1, 6, 7, 9, 8, 7, 2, 0, 4, 9, 3, 6, 6, 9, 9, 6, 9, 8, 5, 0, 8, 8, 6, 9, 6, 1, 8, 5, 2, 0, 6, 7, 3, 1, 9, 2, 3, 1, 2, 2, 1, 1, 7, 4, 4, 0, 8, 4, 8, 2, 9, 7, 0, 4, 3, 0, 3, 7, 9, 4, 0, 7, 5, 1, 2, 9, 9, 3, 4, 5, 1, 2, 0, 4, 3, 8, 7, 6, 7, 8, 7, 4, 8, 8, 2, 8, 9, 2, 7, 0, 5, 0, 5, 7, 1, 3, 2, 6, 6, 3, 3, 3, 6, 1, 6, 2, 0, 3, 2, 1, 8, 9, 1, 9, 6, 4, 1, 4, 0, 1, 4, 1, 3, 4, 1, 7, 6, 7, 1, 7, 9, 1, 0, 5, 1, 6, 2, 7, 3, 8, 4, 8, 5, 6, 6, 3, 7, 5, 8, 0, 9, 5, 0, 4, 1, 2, 2, 6, 3, 0, 4, 3, 7, 5, 8, 6, 9, 4, 0, 6, 1, 6, 2, 3, 3, 6, 4, 7, 5, 1, 6, 4, 7, 3, 8, 1, 9, 8, 7, 2, 7, 1, 7, 7, 3, 7, 1, 7, 8, 8, 7, 9, 6, 2, 0, 2, 2, 7, 6, 6, 8, 5, 3, 8, 2, 2, 8, 2, 1, 0, 1, 4, 7, 2, 2, 5, 0, 7, 7, 4, 1, 3, 6, 0, 0, 9, 4, 4, 6, 3, 4, 3, 4, 4, 5, 5, 8, 4, 0, 4, 6, 4, 2, 8, 3, 4, 1, 5, 3, 5, 6, 4, 8, 1, 4, 5, 0, 7, 7, 1, 5, 6, 8, 0, 8, 3, 3, 3, 7, 9, 8, 0, 9, 9, 2, 4, 6, 2, 2, 3, 5, 9, 3, 6, 1, 8, 7, 1, 3, 8, 9, 4, 1, 8, 9, 2, 9, 5, 6, 7, 0, 1, 3, 2, 9, 9, 2, 8, 8, 0, 1, 8, 4, 8, 3, 9, 5, 4, 2, 8, 9, 1, 2, 3, 9, 1, 1, 6, 6, 2, 5, 1, 8, 8, 9, 0, 4, 9, 2, 3, 5, 3, 0, 7, 1, 4, 2, 0, 3, 4, 4, 2, 5, 3, 6, 9, 7, 7, 8, 1, 9, 0, 0, 6, 1, 7, 2, 1, 3, 0, 4, 7, 5, 6, 6, 2, 7, 8, 8, 1, 9, 1, 0, 8, 1, 3, 2, 5, 3, 2, 4, 4, 5, 1, 6, 6, 7, 6, 8, 5, 9, 0, 6, 3, 4, 7, 2, 7, 6, 1, 4, 1, 7, 5, 5, 6, 5, 8, 4, 8, 7, 1, 8, 0, 9, 6, 2, 7, 9, 9, 3, 6, 9, 9, 3, 4, 8, 4, 2, 4, 0, 5, 9, 0, 8, 8, 0, 0, 5, 7, 6, 1, 0, 4, 1, 3, 0, 8, 4, 5, 2, 9, 6, 2, 5, 0, 3, 4, 5, 2, 3, 1, 8, 1, 3, 8, 4, 0, 1, 6, 5, 6, 3, 7, 0, 1, 8, 6, 3, 9, 0, 1, 6, 1, 2, 4, 7, 5, 1, 2, 1, 7, 8, 9, 1, 1, 7, 1, 1, 7, 3, 3, 8, 0, 5, 7, 2, 0, 0, 6, 9, 8, 7, 5, 6, 5, 7, 4, 4, 9, 1, 1, 6, 2, 8, 9, 4, 3, 7, 8, 5, 4, 1, 8, 2, 4, 6, 4, 7, 2, 9, 5, 8, 1, 0, 4, 6, 7, 9, 9, 4, 1, 6, 7, 2, 5, 3, 2, 7, 0, 1, 8, 9, 2, 2, 0, 2, 6, 5, 7, 3, 1, 7, 2, 8, 9, 0, 2, 1, 9, 2, 4, 3, 3, 1, 3, 5, 1, 6, 0, 7, 8, 8, 8, 0, 2, 1, 4, 2, 3, 3, 7, 4, 8, 5, 4, 6, 5, 7, 9, 8, 2, 9, 5, 0, 8, 1, 2, 2, 6, 3, 2, 4, 0, 5, 7, 6, 5, 7, 8, 8, 0, 9, 3, 8, 5, 9, 3, 2, 8, 6, 7, 1, 1, 7, 5, 6, 1, 3, 4, 5, 4, 4, 1, 8, 6, 2, 7, 6, 4, 4, 6, 7, 4, 2, 2, 3, 8, 4, 5, 5, 9, 9, 0, 2, 1, 0, 3, 3, 2, 9, 9, 4, 6, 9, 6, 7, 9, 3, 7, 9, 4, 3, 6, 8, 9, 7, 0, 1, 9, 4, 5, 9, 4, 8, 2, 5, 4, 8, 4, 2, 9, 6, 1, 9, 4, 5, 4, 3, 2, 6, 8, 5, 0, 2, 5, 5, 6, 7, 4, 2, 6, 3, 8, 1, 3, 3, 0, 2, 8, 7, 0, 3, 1, 1, 9, 9, 2, 0, 1, 1, 1, 7, 9, 0, 3, 8, 8, 5, 9, 6, 0, 8, 7, 2, 2, 1, 5, 3, 4, 5, 1, 0, 5, 7, 3, 0, 6, 8, 2, 7, 1, 2, 8, 4, 5, 4, 3, 8, 6, 0, 1, 1, 3, 5, 7, 1, 0, 1, 2, 6, 0, 0, 7, 0, 1, 4, 4, 9, 5, 8, 1, 5, 8, 1, 3, 6, 6, 6, 4, 0, 1, 7, 8, 6, 5, 1, 2, 1, 7, 0, 4, 1, 1, 2, 7, 3, 4, 4, 7, 5, 1, 6, 8, 7, 6, 8, 1, 9, 3, 0, 2, 1, 7, 2, 7, 3, 9, 4, 1, 5, 0, 6, 7, 7, 0, 8, 3, 9, 1, 0, 9, 1, 4, 2, 9, 3, 7, 4, 5, 7, 6, 8, 0, 9, 2, 0, 5, 7, 1, 8, 4, 4, 4, 1, 4, 8, 7, 8, 9, 1, 2, 3, 4, 1, 1, 8, 6, 3, 7, 7, 1, 9, 4, 3, 7, 4, 8, 7, 9, 8, 9, 4, 1, 7, 4, 8, 3, 9, 3, 3, 4, 1, 5, 4, 7, 6, 8, 5, 0, 6, 4, 7, 3, 7, 1, 1, 9, 6, 2, 4, 7, 9, 6, 2, 6, 9, 1, 3, 2, 5, 0, 3, 2, 6, 1, 0, 2, 0, 3, 2, 3, 4, 7, 2, 0, 7, 5, 4, 0, 9, 1, 5, 5, 1, 4, 2, 1, 3, 0, 6, 6, 1, 9, 8, 1, 3, 3, 8, 0, 0, 5, 3, 4, 0, 5, 6, 4, 1, 6, 6, 7, 9, 5, 5, 8, 9, 1, 4, 7, 5, 2, 8, 8, 6, 0, 7, 0, 1, 7, 1, 8, 7, 8, 0, 8, 1, 4, 2, 6, 3, 2, 4, 3, 5, 7, 6, 4, 7, 1, 8, 7, 9, 2, 0, 3, 1, 7, 2, 2, 3, 3, 4, 6, 5, 5, 6, 5, 7, 8, 8, 5, 9, 7, 0, 8, 1, 5, 2, 6, 3, 5, 4, 8, 5, 0, 6, 0, 7, 9, 8, 0, 9, 2, 7, 3, 7, 3, 7, 6, 3, 7, 0, 7, 3, 0, 1, 9, 8, 5, 7, 9, 6, 5, 4, 9, 5, 1, 6, 1, 0, 4, 2, 7, 6, 8, 8, 7, 3, 9, 2, 3, 8, 4, 1, 7, 1, 8, 7, 6, 2, 5, 0, 1, 7, 5, 1, 8, 6, 5, 0, 1, 4, 4, 6, 9, 4, 9, 4, 5, 5, 6, 8, 9, 0, 1, 6, 2, 2, 8, 3, 6, 1, 6, 3, 4, 6, 3, 5, 4, 1, 5, 8, 8, 4, 8, 0, 3, 7, 1, 5, 1, 8, 2, 8, 3, 3, 5, 7, 1, 8, 3, 9, 3, 2, 7, 6, 6, 2, 7, 5, 2, 3, 4, 1, 6, 7, 2, 3, 4, 9, 1, 1, 0, 9, 0, 9, 6, 6, 1, 0, 0, 9, 6, 3, 1, 7, 1, 0, 4, 4, 3, 5, 5, 0, 5, 9, 8, 2, 1, 8, 5, 1, 5, 4, 3, 3, 0, 5, 9, 2, 9, 9, 7, 4, 7, 0, 9, 2, 3, 9, 2, 1, 9, 6, 5, 5, 0, 8, 7, 9, 7, 4, 5, 2, 1, 5, 5, 0, 4, 1, 8, 2, 4, 3, 8, 4, 1, 5, 6, 6, 9, 7, 0, 8, 0, 9, 0, 0, 0, 1, 4, 2, 7, 3, 1, 4, 3, 7, 7, 8, 7, 9, 9, 0, 9, 1, 2, 4, 9, 5, 3, 6, 5, 7, 4, 8, 5, 3, 0, 4, 8, 1, 4, 4, 0, 6, 0, 6, 9, 7, 7, 3, 3, 3, 0, 4, 1, 3, 2, 5, 9, 0, 9, 1, 6, 4, 5, 6, 7, 0, 3, 2, 2, 8, 5, 2, 2, 5, 9, 2, 4, 1, 9, 7, 0, 0, 2, 2, 6, 0, 6, 6, 9, 6, 2, 9, 1, 8, 4, 9, 7, 2, 7, 2, 3, 9, 5, 9, 8, 5, 3, 4, 0, 4, 5, 0, 5, 0, 6, 8, 7, 6, 1, 6, 3, 8, 9, 5, 6, 3, 6, 8, 6, 5, 1, 0, 1, 3, 6, 6, 6, 7, 6, 8, 5, 3, 9, 1, 6, 3, 5, 9, 1, 5, 0, 1, 6, 5, 3, 5, 8, 0, 9, 7, 6, 3, 1, 1, 0, 7, 9, 6, 9, 0, 9, 1, 9, 2, 5, 3, 2, 4, 0, 5, 0, 6, 9, 7, 7, 8, 1, 1, 7, 2, 3, 3, 4, 5, 6, 6, 2, 7, 4, 0, 4, 1, 5, 2, 9, 3, 5, 4, 5, 5, 2, 6, 6, 8, 6, 1, 8, 0, 1, 2, 3, 1, 4, 5, 6, 6, 5, 1, 9, 1, 3, 7, 6, 8, 1, 5, 4, 1, 8, 6, 6, 7, 7, 0, 1, 3, 2, 3, 4, 0, 0, 2, 4, 6, 9, 9, 1, 8, 6, 5, 9, 8, 8, 6, 2, 8, 6, 9, 3, 9, 7, 7, 6, 1, 8, 2, 3, 1, 9, 1, 5, 1, 2, 2, 3, 8, 4, 0, 4, 5, 3, 7, 3, 6, 5, 5, 3, 3, 1, 8, 9, 1, 7, 3, 2, 6, 4, 0, 9, 4, 7, 8, 5, 9, 5, 4, 5, 7, 6, 2, 1, 7, 8, 1, 4, 8, 6, 2, 9, 1, 4, 7, 5, 7, 5, 3, 9, 2, 3, 0, 1, 4, 7, 6, 7, 6, 1, 8, 6, 5, 0, 9, 1, 8, 9, 2, 6, 5, 8, 1, 4, 0, 0, 5, 6, 0, 2, 3, 2, 4, 8, 3, 2, 9, 2, 6, 4, 2, 5, 5, 2, 0, 9, 6, 7, 9, 3, 0, 2, 1, 5, 2, 6, 3, 4, 4, 6, 5, 0, 6, 2, 7, 8, 8, 3, 9, 8, 0, 8, 1, 7, 2, 6, 3, 8, 4, 3, 5, 5, 6, 3, 7, 5, 8, 9, 9, 7, 0, 0, 1, 2, 2, 2, 3, 3, 4, 3, 5, 1, 6, 1, 7, 5, 8, 3, 9, 4, 7, 5, 7, 8, 7, 3, 3, 0, 0, 7, 3, 6, 1, 2, 8, 8, 7, 0, 6, 3, 4, 1, 5, 0, 6, 9, 0, 3, 2, 7, 6, 5, 8, 4, 3, 2, 2, 7, 8, 3, 1, 1, 1, 9, 7, 7, 2, 5, 0, 6, 7, 7, 1, 4, 6, 8, 0, 8, 4, 9, 6, 6, 4, 6, 4, 2, 5, 1, 8, 1, 0, 8, 6, 7, 2, 1, 3, 2, 3, 0, 6, 8, 5, 2, 1, 4, 8, 6, 5, 2, 9, 6, 4, 4, 0, 2, 7, 1, 5, 8, 8, 9, 8, 4, 3, 6, 7, 1, 8, 5, 9, 4, 2, 0, 6, 0, 2, 9, 5, 3, 3, 7, 1, 9, 7, 3, 3, 0, 9, 9, 1, 0, 9, 7, 9, 0, 6, 5, 0, 9, 9, 9, 4, 6, 3, 2, 7, 8, 0, 7, 4, 5, 5, 4, 0, 9, 9, 5, 2, 4, 8, 3, 1, 5, 4, 9, 3, 4, 5, 6, 2, 5, 9, 3, 4, 3, 0, 7, 2, 6, 9, 7, 1, 2, 6, 4, 5, 1, 8, 7, 9, 5, 4, 7, 2, 6, 5, 9, 0, 4, 1, 9, 2, 8, 3, 1, 4, 6, 5, 1, 6, 7, 7, 5, 8, 6, 9, 2, 0, 1, 1, 5, 2, 3, 3, 0, 6, 2, 7, 6, 8, 8, 0, 6, 1, 6, 2, 3, 3, 1, 7, 6, 8, 8, 9, 9, 1, 8, 8, 9, 6, 2, 7, 6, 1, 1, 1, 6, 4, 7, 3, 7, 7, 1, 7, 9, 8, 5, 9, 2, 3, 5, 6, 5, 0, 0, 3, 7, 6, 1, 4, 1, 8, 6, 3, 0, 1, 4, 1, 2, 5, 8, 9, 3, 0, 5, 4, 5, 1, 9, 7, 6, 9, 8, 5, 2, 1, 1, 1, 4, 9, 9, 8, 1, 6, 1, 6, 3, 0, 8, 1, 2, 8, 1, 8, 8, 3, 3, 2, 1, 0, 4, 9, 5, 7, 4, 4, 5, 5, 4, 8, 6, 3, 8, 5, 0, 8, 2, 5, 7, 4, 4, 7, 7, 7, 3, 7, 5, 1, 1, 5, 9, 3, 1, 0, 0, 1, 8, 2, 9, 3, 8, 4, 3, 5, 4, 6, 0, 7, 3, 8, 6, 9, 4, 0, 6, 1, 0, 2, 0, 3, 8, 4, 7, 5, 5, 6, 4, 7, 1, 8, 8, 9, 2, 0, 9, 1, 9, 2, 0, 3, 9, 5, 8, 6, 2, 8, 2, 1, 1, 4, 8, 5, 9, 4, 9, 2, 3, 3, 6, 3, 1, 0, 2, 5, 3, 4, 1, 3, 7, 0, 8, 8, 0, 6, 2, 7, 3, 0, 5, 7, 6, 7, 7, 1, 3, 6, 2, 9, 9, 2, 7, 3, 7, 6, 0, 2, 3, 3, 9, 6, 5, 8, 2, 5, 4, 2, 1, 3, 7, 8, 2, 1, 2, 2, 6, 9, 2, 5, 7, 8, 4, 8, 6, 7, 0, 1, 1, 7, 6, 1, 0, 1, 6, 0, 8, 3, 3, 4, 3, 2, 5, 6, 4, 7, 7, 4, 4, 2, 5, 7, 9, 4, 5, 2, 9, 9, 2, 2, 9, 7, 8, 9, 3, 2, 6, 8, 1, 6, 6, 1, 0, 0, 3, 6, 1, 8, 2, 5, 7, 5, 1, 0, 2, 5, 9, 3, 1, 5, 2, 7, 6, 4, 6, 8, 1, 5, 4, 9, 3, 6, 1, 9, 8, 3, 0, 0, 3, 0, 1, 6, 8, 3, 5, 0, 0, 5, 7, 8, 8, 9, 5, 1, 6, 8, 1, 1, 7, 6, 9, 0, 6, 0, 4, 1, 5, 2, 8, 3, 5, 4, 3, 5, 0, 6, 6, 7, 0, 8, 8, 9, 0, 0, 0, 1, 1, 2, 0, 3, 9, 4, 1, 5, 6, 6, 5, 7, 9, 0, 9, 1, 4, 2, 8, 3, 6, 4, 4, 5, 1, 6, 2, 7, 8, 8, 7, 9, 3, 6, 4, 4, 3, 2, 9, 6, 9, 4, 8, 7, 2, 5, 2, 5, 5, 7, 0, 8, 6, 9, 2, 2, 8, 9, 1, 3, 6, 9, 7, 2, 0, 0, 1, 9, 4, 8, 5, 0, 6, 5, 6, 6, 7, 0, 5, 1, 1, 0, 5, 2, 0, 6, 5, 5, 8, 3, 3, 5, 5, 3, 4, 8, 2, 0, 6, 0, 9, 5, 2, 4, 2, 3, 0, 4, 6, 1, 9, 5, 6, 3, 2, 0, 0, 8, 9, 6, 9, 2, 5, 7, 1, 1, 2, 1, 2, 8, 9, 1, 0, 7, 2, 1, 0, 3, 7, 8, 2, 5, 2, 4, 1, 2, 4, 0, 3, 9, 3, 7, 5, 6, 0, 7, 3, 4, 8, 1, 2, 6, 0, 8, 4, 4, 6, 7, 7, 5, 5, 1, 5, 2, 6, 6, 1, 7, 8, 1, 5, 9, 0, 8, 4, 9, 7, 4, 3, 9, 2, 9, 7, 6, 8, 2, 5, 3, 1, 7, 6, 1, 7, 9, 3, 2, 6, 2, 4, 5, 3, 3, 7, 7, 0, 8, 7, 0, 2, 1, 0, 2, 4, 3, 7, 4, 6, 5, 1, 6, 3, 7, 8, 8, 1, 9, 9, 0, 8, 1, 3, 2, 1, 3, 7, 4, 5, 7, 1, 8, 0, 9, 1, 0, 4, 1, 4, 2, 4, 3, 1, 4, 7, 5, 5, 6, 8, 7, 2, 8, 2, 9, 5, 0, 1, 9, 8, 5, 8, 0, 3, 9, 4, 8, 2, 9, 8, 4, 2, 1, 0, 7, 2, 7, 6, 3, 9, 5, 0, 1, 1, 0, 7, 0, 1, 7, 8, 0, 0, 1, 3, 2, 6, 2, 3, 3, 8, 7, 5, 3, 8, 3, 2, 6, 9, 6, 5, 1, 0, 0, 2, 9, 1, 0, 2, 1, 3, 7, 5, 6, 3, 3, 2, 2, 6, 3, 4, 1, 8, 9, 2, 1, 6, 7, 1, 6, 4, 8, 9, 4, 3, 3, 9, 1, 4, 4, 2, 0, 9, 5, 2, 3, 6, 6, 6, 9, 7, 1, 6, 7, 9, 5, 0, 4, 7, 4, 7, 7, 3, 2, 0, 2, 7, 7, 6, 9, 3, 5, 7, 8, 9, 9, 9, 8, 9, 0, 2, 1, 4, 2, 8, 3, 5, 4, 1, 5, 1, 7, 9, 0, 6, 1, 2, 2, 2, 3, 7, 6, 7, 1, 5, 2, 8, 3, 5, 4, 9, 5, 2, 6, 2, 9, 1, 9, 9, 6, 4, 5, 5, 9, 9, 2, 4, 3, 3, 1, 3, 2, 0, 1, 1, 2, 1, 1, 6, 3, 6, 2, 8, 6, 4, 5, 5, 3, 3, 0, 0, 6, 7, 4, 2, 0, 6, 5, 5, 9, 1, 9, 5, 8, 0, 1, 0, 7, 4, 4, 4, 7, 3, 0, 7, 1, 4, 6, 2, 3, 1, 7, 3, 9, 3, 0, 6, 9, 2, 5, 9, 3, 9, 8, 6, 8, 2, 7, 0, 1, 3, 4, 6, 0, 2, 3, 7, 9, 2, 0, 3, 7, 7, 2, 3, 1, 7, 9, 2, 1, 9, 5, 2, 1, 2, 7, 4, 2, 9, 1, 1, 6, 2, 8, 6, 8, 8, 0, 0, 1, 1, 2, 2, 3, 0, 4, 9, 5, 9, 6, 7, 8, 9, 9, 8, 0, 7, 1, 4, 2, 8, 3, 8, 4, 1, 5, 4, 6, 1, 7, 9, 8, 2, 9, 3, 0, 9, 1, 6, 2, 0, 3, 7, 4, 6, 5, 5, 6, 7, 7, 3, 8, 4, 9, 7, 0, 5, 9, 5, 4, 7, 2, 8, 4, 3, 1, 6, 5, 8, 6, 9, 1, 9, 1, 7, 7, 8, 8, 8, 5, 7, 3, 1, 4, 4, 6, 0, 7, 7, 0, 7, 3, 3, 2, 0, 6, 6, 9, 8, 8, 5, 5, 8, 8, 1, 6, 0, 8, 7, 9, 3, 9, 4, 7, 8, 7, 7, 2, 7, 1, 0, 1, 1, 1, 4, 2, 4, 8, 0, 7, 3, 6, 4, 5, 0, 3, 3, 8, 4, 1, 4, 3, 1, 6, 5, 0, 8, 4, 0, 8, 5, 9, 5, 4, 2, 9, 2, 7, 8, 9, 1, 5, 9, 2, 5, 7, 9, 1, 7, 8, 6, 2, 2, 1, 6, 7, 0, 7, 2, 3, 0, 2, 2, 0, 5, 4, 7, 6, 6, 6, 4, 9, 9, 4, 1, 2, 9, 8, 1, 2, 4, 5, 1, 1, 1, 0, 0, 5, 6, 0, 7, 3, 0, 4, 1, 3, 2, 9, 9, 6, 5, 7, 7, 3, 7, 4, 0, 3, 4, 0, 2, 6, 4, 9, 1, 0, 3, 1, 1, 2, 8, 3, 7, 4, 2, 5, 6, 6, 8, 7, 4, 8, 5, 9, 6, 0, 6, 1, 2, 2, 2, 3, 7, 4, 0, 5, 6, 6, 4, 0, 1, 1, 9, 2, 6, 3, 5, 4, 3, 5, 9, 6, 5, 7, 7, 8, 8, 9, 1, 2, 0, 1, 8, 2, 4, 1, 9, 3, 9, 9, 1, 9, 8, 3, 2, 7, 0, 0, 3, 7, 8, 7, 1, 5, 2, 7, 2, 9, 2, 9, 6, 4, 2, 7, 7, 0, 6, 1, 3, 4, 8, 4, 2, 7, 0, 5, 1, 8, 2, 1, 7, 4, 1, 9, 9, 8, 0, 4, 1, 1, 1, 8, 4, 6, 1, 6, 3, 4, 5, 6, 3, 0, 5, 5, 9, 5, 9, 3, 3, 3, 2, 5, 2, 2, 7, 5, 0, 7, 0, 2, 3, 5, 2, 9, 5, 6, 2, 9, 2, 2, 0, 6, 9, 2, 4, 1, 1, 2, 2, 0, 0, 8, 7, 3, 1, 8, 6, 3, 4, 0, 8, 8, 9, 7, 4, 4, 4, 9, 7, 5, 3, 0, 1, 9, 6, 7, 1, 0, 2, 0, 6, 4, 0, 9, 9, 1, 5, 6, 1, 2, 2, 7, 8, 6, 5, 8, 8, 3, 3, 5, 9, 2, 8, 1, 1, 8, 8, 6, 9, 1, 5, 0, 0, 3, 5, 1, 7, 4, 8, 0, 2, 1, 9, 2, 2, 3, 5, 4, 3, 5, 5, 6, 1, 7, 3, 8, 6, 9, 5, 0, 6, 1, 2, 2, 8, 3, 3, 4, 1, 5, 9, 6, 4, 7, 6, 8, 0, 0, 2, 1, 3, 2, 0, 3, 5, 1, 0, 5, 0, 6, 9, 7, 3, 8, 1, 7, 9, 0, 9, 6, 4, 0, 0, 7, 5, 3, 8, 8, 5, 6, 2, 7, 6, 1, 6, 3, 4, 7, 3, 9, 9, 7, 9, 4, 7, 0, 0, 2, 2, 5, 0, 0, 3, 6, 9, 4, 4, 9, 4, 5, 0, 6, 4, 5, 8, 2, 3, 9, 8, 8, 3, 5, 5, 1, 8, 9, 1, 8, 1, 3, 0, 4, 1, 0, 8, 5, 4, 4, 2, 8, 6, 6, 8, 3, 4, 4, 2, 8, 5, 0, 8, 6, 6, 4, 0, 8, 5, 1, 7, 3, 1, 4, 4, 0, 7, 1, 1, 9, 1, 2, 8, 3, 3, 7, 9, 1, 7, 2, 5, 7, 3, 2, 9, 8, 0, 7, 7, 0, 2, 1, 0, 9, 6, 6, 7, 4, 6, 9, 6, 2, 4, 1, 7, 2, 2, 3, 7, 7, 9, 0, 2, 2, 1, 1, 5, 3, 6, 4, 9, 7, 6, 2, 4, 5, 3, 8, 9, 1, 4, 6, 1, 8, 4, 5, 6, 6, 9, 0, 6, 8, 5, 9, 9, 4, 4, 9, 6, 2, 9, 6, 5, 0, 5, 1, 4, 2, 0, 3, 4, 4, 6, 5, 9, 6, 7, 7, 1, 8, 7, 9, 3, 0, 0, 1, 2, 2, 7, 3, 7, 4, 9, 5, 7, 6, 2, 7, 7, 8, 6, 9, 1, 0, 8, 1, 1, 2, 4, 3, 5, 4, 1, 5, 5, 6, 1, 7, 8, 8, 8, 9, 5, 0, 3, 4, 7, 0, 2, 1, 9, 7, 9, 9, 6, 5, 6, 1, 8, 4, 2, 2, 2, 8, 7, 9, 0, 4, 0, 3, 8, 1, 7, 7, 6, 8, 4, 2, 6, 4, 6, 4, 4, 3, 6, 3, 8, 6, 8, 9, 0, 9, 3, 5, 1, 8, 5, 6, 9, 7, 1, 0, 8, 6, 6, 8, 7, 2, 5, 6, 3, 3, 1, 9, 1, 8, 0, 6, 8, 1, 2, 7, 0, 4, 5, 8, 9, 8, 3, 9, 9, 0, 6, 3, 6, 3, 3, 9, 5, 0, 7, 9, 8, 4, 6, 1, 5, 0, 0, 3, 9, 7, 6, 5, 3, 8, 2, 7, 8, 7, 0, 8, 2, 2, 8, 9, 7, 7, 1, 1, 1, 2, 3, 6, 6, 4, 4, 2, 8, 3, 1, 6, 4, 6, 9, 0, 6, 2, 7, 8, 0, 1, 0, 6, 0, 1, 3, 0, 1, 4, 0, 3, 3, 1, 1, 6, 6, 1, 2, 9, 1, 0, 1, 1, 9, 2, 0, 3, 2, 4, 2, 5, 5, 6, 7, 7, 6, 8, 7, 9, 5, 0, 8, 1, 3, 2, 4, 3, 1, 4, 7, 5, 4, 6, 2, 7, 6, 8, 2, 9, 5, 0, 6, 1, 1, 2, 7, 3, 2, 6, 8, 7, 5, 8, 0, 9, 6, 8, 8, 1, 1, 0, 0, 7, 6, 5, 3, 1, 8, 8, 0, 6, 1, 4, 9, 1, 0, 9, 6, 3, 4, 8, 3, 4, 5, 4, 2, 7, 1, 0, 5, 1, 7, 9, 9, 2, 7, 8, 2, 7, 6, 8, 3, 2, 4, 5, 8, 9, 4, 6, 2, 0, 0, 6, 4, 5, 2, 5, 5, 3, 2, 3, 7, 3, 2, 8, 9, 1, 8, 4, 1, 0, 6, 6, 0, 1, 1, 0, 7, 0, 5, 6, 4, 2, 6, 1, 4, 1, 7, 3, 9, 2, 7, 8, 7, 8, 7, 7, 0, 0, 5, 3, 4, 6, 2, 8, 2, 9, 7, 9, 2, 2, 5, 4, 5, 9, 9, 4, 9, 3, 3, 6, 8, 2, 9, 2, 6, 5, 8, 3, 4, 2, 8, 5, 6, 5, 1, 9, 7, 1, 0, 6, 9, 5, 5, 0, 1, 1, 3, 2, 0, 3, 4, 4, 6, 5, 2, 7, 0, 8, 4, 0, 0, 1, 5, 2, 2, 3, 1, 4, 2, 5, 5, 0, 1, 1, 8, 2, 9, 3, 0, 4, 5, 5, 9, 6, 1, 2, 8, 1, 9, 2, 1, 1, 1, 3, 8, 9, 8, 9, 3, 8, 6, 3, 1, 7, 5, 0, 0, 7, 3, 7, 2, 5, 9, 7, 9, 9, 5, 9, 1, 4, 8, 7, 8, 0, 5, 3, 4, 4, 9, 1, 8, 7, 0, 5, 4, 8, 8, 1, 9, 4, 6, 9, 6, 8, 6, 4, 8, 1, 7, 8, 3, 6, 0, 6, 5, 0, 2, 3, 9, 5, 5, 5, 3, 7, 6, 9, 8, 6, 8, 9, 4, 2, 9, 6, 9, 2, 8, 1, 5, 2, 2, 0, 8, 8, 9, 3, 3, 8, 7, 3, 7, 0, 2, 8, 0, 7, 8, 4, 8, 9, 4, 5, 8, 0, 2, 9, 7, 0, 5, 0, 4, 4, 8, 6, 7, 0, 7, 9, 1, 1, 6, 6, 4, 2, 2, 6, 1, 8, 3, 3, 6, 1, 4, 8, 0, 3, 3, 1, 9, 0, 9, 3, 7, 1, 2, 4, 1, 0, 2, 1, 3, 2, 5, 3, 0, 4, 4, 5, 8, 6, 4, 7, 4, 8, 1, 9, 0, 0, 5, 1, 3, 2, 5, 3, 3, 4, 6, 5, 1, 6, 8, 7, 1, 8, 8, 9, 7, 0, 1, 1, 9, 2, 1, 3, 2, 4, 9, 5, 3, 6, 7, 7, 7, 8, 3, 9, 9, 8, 3, 9, 8, 5, 5, 7, 5, 0, 2, 3, 2, 1, 5, 6, 9, 8, 1, 4, 9, 1, 7, 7, 7, 6, 9, 5, 6, 6, 9, 7, 2, 8, 0, 1, 7, 4, 4, 0, 8, 5, 5, 0, 9, 1, 5, 9, 6, 2, 3, 3, 5, 2, 3, 3, 4, 5, 8, 5, 6, 7, 0, 8, 3, 4, 0, 9, 6, 9, 4, 7, 0, 1, 7, 1, 0, 9, 6, 8, 7, 3, 5, 4, 0, 8, 0, 6, 9, 3, 6, 8, 0, 0, 1, 9, 3, 6, 9, 2, 8, 1, 5, 0, 9, 1, 2, 0, 5, 6, 7, 2, 0, 3, 1, 8, 4, 9, 0, 0, 8, 7, 6, 2, 9, 3, 1, 4, 1, 8, 7, 5, 1, 4, 7, 6, 0, 6, 7, 6, 4, 7, 4, 9, 0, 1, 1, 2, 7, 1, 7, 2, 6, 6, 0, 5, 3, 3, 6, 4, 5, 7, 3, 9, 2, 4, 0, 0, 7, 0, 9, 5, 0, 9, 3, 0, 0, 1, 1, 2, 7, 3, 4, 4, 9, 5, 0, 6, 0, 7, 9, 8, 8, 9, 2, 0, 0, 1, 2, 2, 9, 4, 3, 5, 3, 6, 7, 7, 2, 8, 7, 9, 1, 0, 7, 1, 1, 2, 0, 3, 1, 4, 5, 5, 6, 6, 3, 7, 4, 8, 1, 9, 5, 8, 9, 6, 4, 5, 0, 0, 4, 6, 1, 8, 2, 9, 6, 4, 4, 1, 9, 9, 6, 5, 1, 3, 4, 0, 0, 4, 0, 8, 0, 9, 4, 1, 6, 5, 0, 5, 5, 2, 4, 1, 8, 4, 0, 0, 9, 7, 7, 6, 4, 0, 1, 1, 4, 8, 4, 9, 7, 4, 2, 7, 8, 6, 1, 0, 4, 8, 3, 1, 8, 7, 4, 7, 3, 1, 3, 2, 2, 3, 0, 1, 5, 4, 8, 2, 6, 0, 6, 0, 2, 7, 2, 8, 1, 8, 6, 4, 7, 7, 8, 2, 3, 5, 4, 6, 2, 3, 3, 6, 6, 4, 2, 6, 5, 5, 3, 1, 7, 3, 2, 9, 8, 2, 1, 5, 9, 7, 2, 9, 0, 8, 1, 2, 1, 1, 3, 3, 9, 1, 2, 3, 0, 0, 8, 1, 8, 2, 6, 4, 0, 5, 6, 6, 4, 7, 4, 8, 4, 9, 7, 0, 5, 1, 2, 2, 8, 3, 8, 4, 0, 5, 0, 6, 5, 7, 9, 8, 5, 0, 7, 1, 2, 2, 0, 3, 2, 4, 8, 5, 9, 6, 2, 7, 6, 8, 7, 9, 0, 7, 2, 2, 0, 9, 9, 4, 1, 2, 4, 9, 4, 8, 1, 4, 5, 5, 0, 8, 9, 8, 4, 0, 7, 3, 6, 5, 5, 4, 7, 3, 4, 3, 6, 4, 6, 6, 2, 5, 0, 1, 6, 7, 6, 8, 9, 4, 8, 5, 8, 7, 2, 3, 7, 5, 4, 2, 5, 3, 4, 6, 4, 6, 7, 7, 8, 7, 3, 7, 9, 6, 5, 0, 7, 1, 9, 0, 1, 1, 1, 6, 4, 5, 3, 5, 4, 2, 4, 9, 9, 3, 9, 1, 7, 4, 1, 8, 5, 8, 6, 7, 5, 6, 6, 2, 6, 2, 1, 9, 5, 6, 3, 5, 9, 9, 0, 1, 7, 2, 5, 2, 4, 7, 9, 9, 8, 7, 0, 9, 0, 8, 4, 9, 4, 7, 9, 0, 5, 5, 6, 0, 9, 3, 2, 8, 9, 4, 5, 6, 3, 1, 4, 4, 8, 0, 7, 3, 5, 6, 5, 2, 3, 0, 3, 1, 4, 3, 7, 1, 1, 0, 2, 9, 2, 0, 7, 1, 4, 2, 5, 3, 4, 5, 5, 6, 0, 7, 7, 8, 4, 9, 5, 0, 0, 1, 6, 4, 2, 7, 2, 8, 0, 9, 3, 0, 9, 1, 5, 4, 4, 7, 6, 8, 4, 9, 7, 1, 6, 7, 1, 9, 7, 5, 9, 1, 3, 9, 4, 1, 3, 7, 7, 8, 6, 2, 1, 3, 6, 6, 3, 9, 1, 9, 1, 5, 9, 8, 9, 6, 7, 7, 7, 0, 1, 6, 8, 8, 2, 3, 4, 9, 0, 8, 9, 6, 7, 1, 3, 7, 3, 9, 6, 4, 4, 1, 7, 0, 9, 3, 5, 8, 2, 7, 4, 7, 7, 8, 5, 7, 9, 6, 6, 6, 8, 2, 5, 8, 5, 1, 2, 6, 0, 1, 6, 0, 8, 4, 3, 3, 5, 1, 0, 6, 5, 1, 3, 9, 8, 0, 4, 1, 2, 2, 2, 3, 0, 4, 7, 5, 3, 6, 2, 7, 4, 8, 1, 9, 3, 0, 3, 1, 6, 2, 2, 3, 2, 4, 0, 5, 5, 6, 3, 9, 5, 0, 0, 1, 3, 2, 8, 3, 2, 9, 9, 0, 8, 9, 1, 0, 2, 9, 1, 3, 6, 2, 4, 7, 9, 8, 5, 4, 6, 6, 8, 1, 7, 0, 2, 4, 2, 0, 3, 5, 1, 0, 6, 1, 3, 3, 5, 2, 4, 9, 3, 1, 9, 6, 1, 0, 6, 1, 9, 1, 1, 8, 1, 0, 6, 4, 6, 7, 7, 7, 0, 6, 1, 3, 0, 6, 8, 0, 4, 7, 7, 4, 6, 4, 0, 1, 8, 8, 4, 3, 1, 7, 6, 1, 4, 9, 6, 3, 9, 8, 4, 0, 7, 1, 7, 2, 6, 3, 1, 4, 0, 5, 4, 6, 1, 7, 7, 8, 9, 9, 3, 0, 9, 1, 1, 2, 0, 3, 1, 4, 5, 5, 1, 8, 0, 9, 0, 0, 7, 1, 3, 2, 2, 3, 6, 4, 6, 5, 4, 8, 8, 9, 1, 8, 0, 3, 8, 4, 1, 7, 0, 8, 8, 6, 7, 3, 6, 4, 3, 0, 3, 9, 3, 7, 7, 1, 5, 9, 7, 3, 4, 8, 8, 4, 1, 7, 4, 3, 1, 0, 4, 9, 5, 6, 5, 1, 3, 4, 3, 5, 7, 4, 5, 6, 7, 2, 1, 0, 7, 6, 9, 2, 4, 1, 0, 1, 7, 1, 3, 1, 3, 7, 9, 2, 7, 4, 6, 7, 6, 5, 4, 2, 8, 9, 0, 4, 8, 5, 8, 8, 4, 4, 9, 2, 8, 0, 6, 5, 9, 1, 2, 1, 6, 7, 0, 6, 9, 6, 2, 6, 2, 8, 7, 2, 6, 5, 0, 2, 3, 2, 2, 7, 9, 7, 9, 4, 3, 0, 1, 2, 1, 4, 1, 2, 0, 5, 1, 0, 8, 3, 2, 3, 9, 3, 7, 1, 0, 8, 0, 9, 3, 6, 0, 1, 5, 0, 6, 5, 9, 9, 5, 8, 3, 5, 3, 8, 5, 5, 1, 5, 9, 8, 1, 0, 5, 3, 8, 0, 7, 8, 8, 3, 8, 9, 2, 6, 4, 3, 0, 0, 6, 1, 7, 2, 1, 3, 7, 7, 0, 8, 1, 9, 0, 0, 6, 1, 7, 2, 6, 3, 9, 4, 5, 7, 8, 8, 9, 9, 6, 0, 5, 1, 4, 2, 8, 3, 7, 4, 4, 7, 6, 8, 3, 9, 9, 1, 4, 0, 6, 1, 5, 2, 8, 7, 0, 7, 5, 3, 0, 2, 1, 2, 5, 3, 6, 9, 2, 1, 8, 7, 0, 9, 9, 5, 9, 7, 7, 2, 7, 9, 4, 6, 1, 1, 8, 3, 1, 7, 5, 3, 8, 9, 6, 8, 9, 8, 2, 8, 1, 8, 6, 8, 5, 4, 2, 7, 7, 2, 2, 1, 4, 9, 7, 8, 3, 7, 4, 8, 5, 8, 8, 0, 0, 7, 1, 9, 4, 5, 4, 0, 1, 6, 7, 8, 7, 2, 9, 6, 1, 0, 5, 1, 8, 2, 2, 3, 5, 4, 3, 5, 6, 6, 0, 7, 2, 8, 6, 9, 8, 0, 0, 1, 4, 2, 4, 3, 1, 4, 2, 5, 2, 6, 9, 7, 2, 8, 4, 9, 7, 0, 1, 1, 6, 2, 7, 3, 1, 4, 1, 5, 1, 6, 0, 7, 9, 8, 5, 9, 0, 0, 5, 9, 1, 9, 6, 8, 6, 9, 2, 8, 9, 4, 6, 1, 2, 7, 3, 7, 3, 3, 9, 5, 6, 1, 3, 0, 7, 0, 8, 2, 8, 7, 4, 7, 9, 8, 3, 2, 7, 0, 4, 1, 0, 2, 7, 6, 7, 3, 7, 3, 5, 7, 0, 3, 6, 3, 4, 4, 1, 6, 9, 6, 8, 6, 2, 4, 3, 9, 9, 1, 9, 5, 9, 0, 0, 9, 4, 8, 9, 2, 0, 0, 4, 0, 2, 1, 9, 7, 5, 6, 6, 3, 7, 2, 3, 1, 7, 7, 2, 4, 2, 6, 7, 3, 2, 1, 8, 3, 0, 9, 4, 1, 8, 7, 3, 6, 1, 8, 6, 4, 2, 3, 0, 1, 9, 0, 2, 9, 3, 6, 9, 1, 9, 7, 3, 5, 2, 4, 7, 4, 5, 7, 7, 2, 6, 8, 2, 4, 3, 8, 9, 8, 9, 4, 3, 8, 9, 9, 6, 8, 7, 0, 6, 1, 0, 2, 4, 3, 2, 4, 6, 5, 7, 6, 0, 7, 2, 8, 9, 9, 8, 0, 9, 1, 2, 2, 6, 3, 9, 4, 2, 5, 6, 6, 6, 7, 6, 8, 3, 9, 2, 0, 0, 1, 4, 2, 2, 3, 9, 4, 9, 5, 9, 6, 2, 7, 5, 8, 8, 9, 4, 1, 1, 0, 9, 4, 1, 5, 1, 6, 6, 6, 5, 3, 2, 4, 8, 4, 5, 2, 1, 8, 4, 1, 8, 0, 2, 6, 8, 4, 4, 9, 6, 7, 2, 2, 6, 3, 2, 3, 4, 9, 4, 2, 4, 0, 8, 9, 1, 3, 5, 3, 1, 9, 5, 1, 7, 5, 6, 2, 1, 3, 4, 1, 9, 6, 7, 7, 8, 3, 6, 7, 5, 8, 1, 4, 9, 0, 7, 2, 0, 4, 5, 0, 6, 2, 0, 4, 3, 7, 7, 8, 1, 0, 1, 7, 9, 0, 9, 6, 7, 9, 0, 3, 6, 2, 7, 4, 4, 0, 6, 5, 1, 7, 3, 5, 3, 1, 8, 0, 1, 8, 6, 1, 2, 6, 2, 7, 3, 2, 2, 9, 1, 7, 5, 9, 7, 5, 3, 8, 3, 9, 7, 6, 7, 5, 0, 2, 8, 6, 1, 2, 7, 8, 6, 1, 2, 7, 9, 5, 4, 5, 5, 7, 5, 3, 1, 5, 8, 0, 2, 1, 9, 1, 0, 3, 5, 8, 2, 4, 0, 9, 5, 4, 8, 5, 3, 1, 8, 8, 4, 6, 1, 8, 6, 9, 3, 0, 3, 1, 6, 2, 1, 3, 4, 4, 4, 5, 6, 7, 2, 9, 1, 0, 8, 1, 7, 2, 7, 3, 7, 4, 2, 5, 2, 6, 9, 7, 9, 8, 7, 9, 5, 0, 8, 1, 0, 4, 1, 7, 5, 8, 9, 9, 4, 8, 2, 1, 9, 0, 2, 9, 3, 5, 7, 7, 4, 8, 6, 6, 4, 9, 3, 0, 6, 4, 0, 1, 4, 9, 0, 3, 6, 8, 9, 4, 1, 4, 8, 7, 4, 0, 9, 1, 9, 9, 9, 2, 1, 8, 3, 7, 0, 8, 3, 9, 9, 6, 1, 0, 2, 6, 2, 5, 2, 5, 6, 3, 0, 3, 7, 3, 5, 4, 7, 9, 8, 4, 4, 0, 1, 6, 8, 1, 9, 0, 0, 0, 1, 6, 7, 2, 3, 1, 0, 1, 8, 3, 9, 2, 5, 7, 2, 7, 5, 8, 7, 6, 0, 0, 7, 2, 1, 0, 9, 3, 0, 6, 6, 8, 8, 7, 6, 1, 7, 5, 6, 9, 5, 9, 2, 3, 9, 7, 6, 2, 5, 4, 4, 9, 9, 4, 6, 3, 5, 6, 6, 2, 0, 4, 8, 1, 1, 7, 2, 2, 5, 0, 9, 1, 4, 2, 8, 3, 1, 4, 5, 5, 3, 6, 9, 7, 2, 8, 8, 9, 9, 0, 1, 1, 5, 2, 6, 3, 6, 7, 0, 8, 3, 9, 2, 0, 1, 1, 1, 2, 1, 3, 7, 4, 1, 5, 0, 6, 5, 7, 8, 8, 6, 9, 1, 0, 8, 9, 7, 5, 5, 6, 2, 4, 8, 1, 8, 9, 0, 3, 9, 8, 0, 4, 5, 4, 1, 7, 9, 0, 4, 1, 4, 9, 9, 2, 5, 8, 7, 7, 1, 8, 8, 5, 9, 9, 2, 6, 4, 0, 6, 6, 5, 3, 5, 3, 1, 3, 0, 9, 5, 9, 2, 8, 0, 1, 9, 4, 2, 0, 7, 6, 9, 1, 1, 0, 6, 0, 1, 6, 2, 2, 7, 1, 9, 1, 4, 3, 8, 2, 7, 7, 1, 7, 1, 7, 2, 0, 8, 7, 0, 0, 9, 3, 7, 6, 7, 8, 9, 2, 5, 4, 3, 9, 1, 4, 7, 3, 0, 6, 4, 5, 8, 5, 4, 9, 5, 4, 1, 1, 2, 7, 5, 0, 9, 1, 3, 2, 0, 3, 1, 4, 5, 5, 4, 6, 4, 7, 8, 8, 5, 9, 8, 0, 3, 1, 4, 2, 3, 3, 3, 4, 2, 5, 9, 6, 4, 7, 7, 8, 2, 0, 6, 1, 0, 2, 8, 3, 0, 4, 5, 5, 8, 6, 0, 7, 1, 8, 9, 6, 3, 2, 4, 7, 8, 1, 3, 5, 0, 6, 2, 2, 1, 5, 5, 0, 1, 5, 6, 4, 0, 2, 3, 0, 2, 8, 2, 0, 7, 1, 2, 2, 4, 3, 6, 4, 0, 5, 5, 6, 4, 7, 9, 8, 1, 7, 8, 1, 8, 7, 9, 7, 1, 0, 4, 1, 3, 4, 8, 4, 7, 4, 3, 5, 2, 7, 3, 4, 7, 9, 4, 7, 5, 2, 1, 6, 7, 3, 7, 9, 3, 4, 3, 9, 9, 0, 6, 8, 1, 7, 6, 9, 4, 0, 7, 6, 1, 3, 4, 0, 3, 4, 5, 6, 6, 3, 6, 7, 5, 8, 1, 9, 7, 3, 3, 1, 4, 8, 8, 4, 3, 2, 0, 9, 6, 8, 2, 2, 3, 8, 6, 6, 7, 5, 2, 2, 5, 6, 6, 9, 8, 6, 9, 0, 6, 3, 0, 6, 8, 3, 4, 1, 2, 2, 3, 5, 2, 0, 1, 3, 1, 7, 5, 6, 6, 1, 7, 5, 5, 5, 9, 9, 6, 8, 8, 0, 2, 9, 4, 0, 2, 1, 3, 2, 2, 3, 4, 4, 6, 7, 6, 8, 7, 9, 9, 0, 7, 1, 3, 2, 5, 0, 7, 1, 6, 5, 2, 1, 7, 3, 4, 9, 5, 0, 2, 9, 7, 7, 9, 1, 5, 3, 8, 6, 8, 9, 6, 2, 8, 4, 7, 7, 6, 7, 0, 4, 1, 3, 3, 8, 3, 3, 3, 7, 8, 1, 4, 1, 7, 7, 8, 9, 5, 3, 6, 9, 8, 1, 2, 6, 7, 4, 9, 3, 5, 9, 3, 8, 4, 1, 6, 0, 6, 1, 5, 2, 8, 3, 8, 4, 1, 5, 1, 8, 1, 9, 5, 0, 8, 1, 5, 2, 4, 3, 4, 4, 0, 5, 1, 8, 5, 9, 1, 0, 9, 1, 3, 2, 4, 3, 7, 4, 2, 5, 7, 6, 9, 7, 8, 8, 2, 9, 7, 3, 6, 2, 0, 9, 8, 3, 7, 2, 4, 1, 8, 4, 9, 5, 5, 5, 9, 2, 7, 3, 7, 2, 9, 1, 0, 3, 8, 9, 9, 7, 0, 2, 5, 1, 9, 9, 9, 1, 7, 8, 1, 8, 1, 7, 7, 8, 2, 1, 9, 0, 6, 0, 4, 6, 4, 7, 1, 5, 1, 0, 9, 6, 3, 1, 1, 1, 4, 2, 2, 5, 9, 0, 9, 7, 8, 8, 7, 4, 2, 4, 5, 1, 9, 8, 2, 5, 6, 9, 1, 0, 9, 3, 6, 7, 5, 1, 7, 6, 0, 2, 8, 6, 1, 6, 7, 1, 7, 3, 7, 8, 1, 9, 9, 9, 1, 5, 9, 9, 6, 3, 5, 7, 2, 5, 1, 6, 1, 2, 9, 2, 3, 0, 8, 9, 4, 4, 9, 0, 5, 1, 5, 2, 6, 3, 1, 4, 3, 5, 6, 6, 2, 7, 2, 8, 3, 9, 3, 1, 7, 4, 1, 7, 8, 0, 2, 1, 8, 2, 6, 3, 5, 4, 2, 5, 1, 6, 5, 7, 4, 8, 9, 9, 3, 3, 1, 7, 7, 1, 4, 0, 7, 7, 6, 5, 8, 5, 6, 6, 7, 1, 6, 0, 2, 0, 2, 8, 8, 3, 4, 4, 9, 3, 8, 1, 4, 9, 2, 5, 2, 3, 5, 4, 7, 9, 8, 3, 4, 9, 1, 2, 0, 4, 1, 5, 5, 1, 3, 6, 3, 4, 8, 9, 7, 4, 6, 9, 5, 4, 1, 1, 4, 2, 6, 5, 5, 8, 0, 1, 9, 2, 9, 9, 9, 4, 1, 3, 8, 8, 5, 2, 8, 2, 8, 1, 5, 2, 6, 1, 4, 1, 0, 3, 4, 9, 5, 3, 0, 8, 4, 7, 1, 0, 0, 7, 9, 4, 8, 8, 7, 8, 3, 5, 4, 0, 8, 6, 4, 6, 3, 3, 8, 7, 6, 6, 7, 9, 7, 9, 4, 4, 4, 8, 9, 1, 0, 0, 5, 1, 5, 2, 5, 3, 1, 4, 6, 5, 2, 6, 0, 7, 2, 8, 2, 9, 7, 0, 9, 1, 5, 2, 5, 3, 1, 7, 0, 8, 0, 9, 4, 0, 8, 1, 5, 2, 2, 3, 4, 7, 7, 8, 3, 9, 4, 1, 6, 8, 4, 6, 0, 7, 4, 1, 4, 1, 7, 4, 3, 3, 3, 7, 9, 7, 5, 8, 5, 9, 2, 3, 1, 6, 8, 0, 7, 3, 0, 6, 2, 4, 5, 7, 2, 5, 8, 6, 7, 0, 6, 3, 1, 8, 8, 3, 6, 1, 6, 1, 4, 5, 3, 9, 7, 0, 4, 9, 6, 6, 6, 2, 8, 1, 1, 7, 5, 9, 2, 9, 7, 8, 5, 6, 9, 6, 5, 8, 9, 8, 4, 2, 2, 6, 7, 3, 0, 2, 8, 9, 4, 0, 0, 3, 3, 5, 4, 8, 2, 3, 7, 5, 3, 8, 4, 5, 2, 7, 5, 7, 2, 0, 7, 1, 1, 2, 0, 3, 8, 4, 6, 5, 9, 6, 1, 7, 4, 8, 4, 9, 6, 0, 3, 1, 9, 2, 2, 3, 6, 4, 5, 5, 5, 6, 1, 7, 4, 8, 3, 9, 1, 0, 1, 1, 0, 2, 1, 3, 4, 4, 9, 5, 5, 6, 7, 7, 5, 8, 9, 9, 8, 1, 5, 8, 9, 6, 1, 7, 9, 2, 5, 7, 7, 1, 9, 1, 9, 4, 6, 3, 5, 7, 9, 8, 3, 9, 1, 3, 9, 6, 2, 0, 4, 3, 5, 4, 0, 8, 8, 4, 1, 5, 5, 7, 9, 5, 3, 0, 8, 3, 6, 9, 8, 2, 1, 8, 2, 3, 9, 1, 4, 1, 3, 5, 7, 9, 2, 4, 3, 3, 3, 0, 2, 4, 8, 0, 7, 9, 2, 6, 7, 9, 3, 2, 6, 2, 2, 1, 1, 7, 4, 9, 3, 5, 1, 1, 4, 1, 2, 9, 8, 8, 0, 6, 8, 9, 4, 0, 7, 0, 1, 0, 6, 1, 4, 8, 8, 4, 7, 8, 1, 8, 1, 2, 3, 6, 8, 3, 8, 2, 1, 9, 3, 2, 1, 4, 5, 0, 3, 9, 5, 0, 0, 3, 1, 7, 4, 4, 6, 5, 8, 8, 9, 3, 5, 5, 2, 8, 2, 5, 4, 4, 0, 7, 8, 6, 4, 5, 0, 2, 6, 2, 4, 2, 0, 7, 1, 7, 1, 0, 9, 5, 1, 1, 1, 5, 7, 3, 1, 0, 7, 1, 8, 2, 6, 5, 5, 6, 0, 7, 9, 8, 1, 9, 4, 0, 4, 1, 4, 2, 1, 3, 0, 4, 5, 5, 0, 6, 5, 7, 6, 8, 0, 0, 6, 1, 4, 2, 7, 3, 5, 4, 7, 5, 3, 6, 3, 7, 2, 8, 6, 9, 9, 2, 8, 1, 5, 7, 5, 2, 4, 5, 7, 0, 2, 8, 7, 0, 3, 2, 1, 7, 5, 8, 5, 8, 9, 3, 7, 0, 8, 6, 6, 0, 7, 2, 4, 7, 2, 6, 1, 6, 2, 1, 8, 2, 8, 8, 2, 8, 3, 7, 3, 7, 5, 4, 9, 7, 2, 7, 3, 3, 2, 7, 3, 4, 6, 5, 1, 4, 7, 3, 3, 3, 0, 8, 9, 4, 6, 5, 9, 4, 5, 1, 9, 1, 2, 9, 3, 7, 0, 4, 5, 3, 5, 7, 3, 3, 0, 3, 6, 0, 6, 2, 6, 5, 5, 5, 7, 6, 5, 3, 1, 1, 9, 5, 0, 2, 1, 5, 8, 9, 9, 9, 7, 8, 1, 4, 5, 1, 8, 0, 5, 6, 2, 0, 7, 9, 3, 6, 9, 8, 6, 8, 6, 5, 7, 6, 7, 1, 8, 1, 2, 9, 0, 8, 5, 9, 5, 2, 6, 3, 6, 5, 1, 5, 5, 9, 8, 4, 4, 2, 3, 1, 8, 9, 2, 4, 8, 9, 4, 1, 8, 3, 4, 9, 0, 2, 2, 0, 6, 6, 8, 0, 3, 4, 5, 0, 3, 6, 2, 0, 3, 1, 8, 2, 4, 3, 0, 4, 4, 6, 3, 8, 8, 1, 1, 2, 0, 3, 7, 4, 1, 5, 9, 6, 2, 7, 7, 9, 5, 1, 1, 2, 6, 3, 5, 4, 4, 5, 4, 6, 0, 7, 2, 8, 4, 6, 5, 6, 1, 0, 7, 2, 0, 3, 9, 7, 3, 4, 1, 7, 2, 1, 2, 9, 0, 1, 9, 7, 4, 1, 8, 4, 6, 0, 6, 0, 5, 1, 2, 7, 8, 5, 6, 7, 9, 1, 0, 3, 9, 3, 8, 3, 1, 1, 7, 6, 1, 9, 1, 7, 6, 4, 7, 3, 9, 0, 3, 2, 5, 6, 9, 0, 7, 8, 9, 9, 9, 4, 6, 3, 1, 5, 9, 4, 2, 8, 7, 1, 6, 5, 7, 0, 8, 6, 2, 6, 9, 3, 6, 3, 2, 8, 8, 1, 6, 4, 3, 7, 6, 5, 3, 7, 0, 2, 8, 2, 0, 0, 0, 0, 5, 7, 7, 7, 1, 9, 3, 5, 8, 9, 3, 8, 0, 9, 8, 6, 9, 8, 9, 2, 1, 3, 4, 6, 6, 1, 7, 2, 8, 9, 3, 2, 1, 5, 7, 2, 3, 2, 5, 4, 6, 8, 5, 4, 2, 6, 3, 5, 3, 0, 3, 1, 6, 2, 2, 3, 6, 4, 1, 5, 9, 6, 2, 7, 8, 8, 0, 9, 3, 0, 1, 1, 8, 2, 3, 3, 6, 4, 6, 5, 6, 6, 8, 7, 8, 8, 6, 9, 0, 0, 5, 1, 5, 2, 1, 3, 7, 4, 9, 5, 3, 6, 6, 7, 6, 8, 2, 9, 7, 6, 4, 2, 0, 7, 2, 1, 4, 5, 8, 6, 8, 2, 6, 5, 0, 0, 3, 5, 7, 4, 1, 2, 1, 0, 2, 8, 2, 1, 1, 7, 2, 1, 2, 8, 9, 3, 6, 8, 6, 7, 7, 1, 4, 7, 1, 7, 1, 0, 0, 1, 3, 4, 6, 4, 0, 4, 2, 5, 1, 7, 1, 4, 9, 4, 7, 9, 9, 7, 3, 2, 7, 6, 0, 5, 5, 3, 1, 9, 0, 4, 9, 3, 3, 9, 0, 0, 8, 8, 8, 7, 6, 9, 9, 0, 2, 6, 2, 3, 8, 0, 7, 4, 1, 6, 2, 3, 7, 7, 0, 0, 9, 1, 1, 4, 6, 8, 2, 8, 9, 1, 2, 2, 3, 9, 1, 3, 1, 1, 0, 8, 3, 4, 7, 2, 8, 9, 5, 8, 8, 2, 4, 8, 5, 6, 3, 6, 2, 9, 9, 2, 0, 9, 5, 6, 4, 0, 5, 5, 5, 3, 1, 3, 9, 6, 0, 3, 0, 1, 9, 2, 7, 5, 9, 0, 0, 3, 3, 7, 6, 1, 0, 5, 9, 5, 4, 9, 2, 8, 9, 0, 0, 9, 9, 0, 6, 1, 5, 2, 4, 3, 6, 4, 1, 5, 1, 6, 8, 7, 6, 8, 2, 9, 3, 0, 8, 1, 7, 2, 4, 3, 7, 4, 9, 7, 5, 8, 2, 9, 0, 0, 5, 1, 2, 2, 1, 3, 9, 4, 0, 5, 7, 6, 4, 7, 9, 8, 1, 9, 4, 9, 6, 7, 3, 4, 6, 1, 4, 5, 4, 8, 5, 8, 1, 0, 6, 9, 0, 3, 1, 2, 2, 7, 9, 8, 8, 1, 5, 6, 2, 1, 3, 0, 4, 4, 7, 5, 0, 3, 5, 9, 1, 4, 7, 3, 9, 4, 9, 2, 7, 0, 2, 5, 9, 0, 1, 1, 1, 3, 9, 2, 1, 9, 5, 1, 0, 6, 9, 0, 8, 1, 7, 1, 8, 8, 8, 0, 0, 4, 0, 7, 1, 7, 1, 6, 1, 3, 3, 6, 9, 0, 5, 7, 7, 3, 7, 5, 6, 4, 3, 2, 2, 4, 1, 1, 1, 8, 5, 3, 9, 7, 8, 1, 4, 0, 1, 6, 7, 7, 3, 1, 6, 2, 6, 5, 2, 8, 1, 1, 0, 9, 3, 3, 1, 8, 5, 2, 6, 8, 8, 8, 6, 7, 1, 1, 1, 7, 8, 9, 1, 2, 0, 0, 7, 1, 3, 2, 7, 3, 9, 4, 6, 5, 8, 6, 4, 7, 1, 8, 0, 9, 6, 0, 6, 1, 2, 2, 8, 3, 0, 4, 5, 5, 0, 6, 1, 7, 3, 0, 5, 1, 7, 2, 4, 3, 1, 4, 3, 5, 0, 6, 8, 7, 1, 8, 6, 8, 6, 7, 0, 4, 7, 7, 2, 7, 5, 3, 7, 9, 3, 8, 0, 1, 0, 5, 0, 8, 2, 2, 6, 7, 9, 4, 8, 2, 6, 6, 6, 4, 4, 5, 4, 5, 1, 8, 1, 6, 6, 4, 5, 4, 6, 4, 3, 1, 3, 8, 8, 7, 6, 5, 4, 5, 9, 1, 0, 8, 1, 9, 7, 3, 6, 6, 1, 3, 6, 3, 3, 2, 9, 2, 3, 6, 1, 9, 5, 9, 1, 6, 5, 5, 6, 5, 9, 3, 0, 3, 9, 8, 7, 1, 4, 6, 7, 5, 7, 6, 2, 8, 5, 1, 3, 9, 4, 7, 1, 6, 4, 8, 5, 3, 1, 7, 8, 4, 4, 7, 0, 0, 9, 9, 2, 0, 1, 0, 1, 3, 4, 7, 1, 9, 1, 3, 7, 0, 1, 2, 7, 0, 2, 1, 8, 0, 2, 1, 8, 0, 0, 4, 2, 0, 5, 1, 7, 0, 8, 4, 2, 7, 9, 9, 1, 2, 2, 0, 2, 6, 5, 2, 6, 6, 3, 2, 9, 2, 2, 9, 5, 9, 4, 0, 6, 1, 1, 2, 4, 3, 7, 4, 9, 5, 4, 6, 2, 7, 4, 8, 4, 9, 3, 0, 6, 1, 4, 2, 6, 3, 6, 4, 0, 5, 5, 6, 7, 7, 9, 0, 4, 1, 6, 2, 9, 3, 9, 4, 5, 5, 1, 6, 1, 7, 3, 8, 9, 9, 3, 7, 3, 4, 9, 3, 9, 8, 8, 5, 9, 1, 8, 8, 3, 5, 1, 2, 0, 8, 8, 6, 8, 1, 6, 9, 9, 2, 3, 4, 7, 0, 6, 9, 4, 9, 6, 3, 7, 7, 7, 1, 1, 8, 8, 4, 2, 4, 9, 2, 5, 7, 8, 5, 6, 8, 6, 5, 4, 3, 3, 2, 8, 2, 9, 0, 4, 5, 1, 8, 3, 6, 7, 0, 2, 4, 7, 0, 7, 3, 7, 8, 3, 1, 1, 0, 0, 3, 4, 0, 0, 4, 1, 7, 4, 4, 3, 9, 1, 2, 5, 9, 9, 1, 9, 2, 0, 1, 5, 7, 1, 1, 7, 6, 4, 7, 0, 3, 5, 3, 2, 6, 3, 2, 4, 8, 4, 7, 6, 6, 4, 4, 8, 9, 5, 8, 4, 8, 3, 2, 8, 9, 4, 6, 1, 5, 0, 5, 2, 9, 3, 5, 6, 3, 7, 7, 0, 4, 6, 3, 1, 6, 7, 0, 4, 0, 1, 4, 4, 6, 5, 6, 2, 9, 4, 0, 6, 1, 1, 1, 2, 3, 0, 2, 1, 1, 9, 0, 8, 0, 9, 1, 7, 2, 4, 3, 5, 4, 8, 7, 4, 8, 6, 9, 3, 0, 7, 1, 3, 2, 5, 3, 3, 4, 5, 5, 9, 6, 9, 7, 0, 8, 6, 9, 2, 0, 6, 1, 3, 2, 7, 3, 9, 4, 1, 5, 4, 7, 7, 8, 1, 9, 4, 8, 5, 6, 1, 5, 3, 0, 1, 6, 1, 8, 6, 9, 0, 4, 0, 1, 3, 9, 8, 5, 4, 3, 6, 0, 3, 4, 4, 8, 8, 9, 7, 1, 8, 4, 0, 0, 1, 5, 8, 5, 8, 4, 9, 0, 6, 7, 3, 6, 5, 0, 9, 1, 0, 7, 2, 0, 3, 6, 6, 8, 2, 9, 0, 5, 9, 4, 8, 7, 0, 6, 9, 0, 1, 8, 3, 1, 2, 7, 1, 7, 5, 1, 0, 3, 0, 2, 7, 3, 9, 1, 3, 4, 7, 2, 1, 0, 8, 0, 6, 4, 4, 9, 9, 3, 6, 8, 8, 4, 7, 7, 5, 2, 5, 5, 2, 6, 7, 3, 3, 6, 5, 9, 6, 6, 9, 3, 5, 2, 4, 2, 7, 4, 2, 6, 2, 5, 4, 5, 3, 1, 7, 3, 4, 3, 4, 9, 5, 7, 8, 8, 0, 7, 8, 2, 1, 2, 1, 5, 7, 7, 1, 9, 1, 8, 1, 2, 1, 1, 3, 3, 0, 1, 6, 3, 9, 0, 7, 1, 3, 2, 2, 3, 9, 4, 6, 5, 3, 6, 3, 7, 4, 8, 8, 9, 9, 0, 6, 1, 7, 2, 2, 3, 3, 4, 1, 7, 3, 8, 4, 9, 8, 0, 2, 1, 4, 2, 2, 3, 6, 4, 1, 7, 9, 8, 2, 9, 2, 7, 7, 7, 7, 7, 4, 3, 8, 0, 0, 3, 4, 1, 5, 8, 0, 7, 0, 6, 9, 4, 2, 0, 2, 2, 9, 6, 2, 8, 9, 3, 6, 1, 0, 1, 1, 7, 4, 7, 3, 1, 5, 6, 1, 0, 5, 4, 5, 6, 7, 4, 9, 4, 1, 0, 6, 6, 8, 2, 5, 3, 4, 1, 9, 3, 4, 6, 0, 8, 7, 5, 9, 9, 0, 4, 8, 0, 9, 7, 2, 5, 2, 8, 8, 8, 7, 3, 3, 7, 3, 8, 8, 9, 8, 2, 6, 5, 2, 3, 8, 1, 9, 7, 9, 3, 1, 9, 6, 1, 9, 9, 5, 9, 6, 6, 7, 0, 4, 9, 4, 4, 6, 3, 0, 7, 4, 0, 0, 4, 0, 1, 6, 4, 5, 3, 3, 5, 3, 4, 3, 0, 5, 2, 8, 1, 6, 8, 8, 9, 7, 4, 6, 0, 8, 1, 3, 2, 7, 3, 1, 4, 3, 5, 0, 6, 0, 7, 3, 8, 9, 9, 5, 0, 1, 1, 9, 2, 4, 3, 2, 4, 7, 5, 1, 6, 8, 7, 0, 8, 1, 9, 9, 0, 8, 1, 4, 2, 1, 3, 4, 4, 4, 5, 2, 6, 7, 7, 2, 8, 5, 9, 0, 2, 2, 2, 2, 7, 7, 6, 5, 4, 2, 0, 8, 5, 7, 8, 6, 0, 9, 7, 8, 3, 2, 5, 4, 4, 6, 1, 4, 8, 1, 0, 7, 5, 5, 2, 9, 7, 5, 2, 0, 3, 9, 1, 2, 7, 0, 7, 6, 9, 6, 9, 6, 1, 2, 2, 9, 4, 4, 6, 8, 7, 0, 7, 9, 5, 7, 4, 0, 5, 8, 0, 1, 1, 0, 1, 7, 9, 7, 0, 6, 2, 6, 0, 8, 3, 3, 5, 7, 6, 4, 1, 2, 8, 8, 6, 3, 4, 0, 6, 8, 0, 1, 6, 9, 4, 6, 3, 3, 9, 4, 3, 3, 0, 8, 0, 3, 5, 2, 2, 7, 5, 0, 8, 7, 8, 1, 8, 7, 9, 4, 4, 4, 2, 8, 8, 7, 8, 6, 5, 0, 5, 0, 7, 5, 1, 0, 3, 1, 6, 1, 9, 9, 4, 8, 1, 4, 3, 9, 7, 7, 6, 5, 9, 2, 3, 2, 3, 9, 7, 5, 4, 1, 1, 2, 9, 9, 1, 7, 0, 2, 6, 3, 0, 6, 1, 5, 2, 6, 3, 3, 4, 1, 7, 0, 8, 2, 9, 1, 0, 1, 1, 3, 2, 3, 3, 3, 7, 6, 8, 2, 9, 6, 0, 6, 1, 0, 2, 6, 3, 3, 7, 0, 8, 2, 9, 7, 1, 9, 8, 7, 6, 3, 7, 5, 2, 7, 7, 8, 1, 2, 1, 4, 4, 3, 3, 6, 7, 9, 7, 7, 8, 5, 9, 9, 3, 8, 6, 6, 0, 6, 3, 7, 6, 7, 1, 0, 8, 0, 4, 3, 5, 3, 3, 0, 9, 3, 2, 2, 8, 5, 3, 8, 1, 2, 1, 2, 5, 3, 9, 0, 0, 7, 4, 8, 4, 3, 0, 8, 9, 3, 6, 4, 9, 4, 2, 2, 2, 6, 1, 4, 7, 4, 9, 1, 5, 4, 1, 8, 1, 5, 9, 1, 8, 9, 6, 8, 6, 2, 9, 8, 0, 7, 0, 7, 0, 6, 1, 1, 8, 4, 4, 1, 6, 4, 8, 9, 8, 3, 2, 9, 6, 1, 3, 8, 2, 1, 9, 0, 2, 5, 9, 3, 0, 8, 3, 5, 7, 4, 4, 4, 5, 6, 8, 8, 3, 6, 5, 9, 8, 8, 5, 9, 4, 9, 7, 1, 6, 3, 5, 4, 2, 3, 2, 9, 7, 5, 7, 9, 0, 6, 5, 8, 5, 9, 3, 3, 0, 2, 1, 2, 2, 1, 3, 0, 4, 2, 5, 5, 6, 4, 7, 3, 8, 2, 9, 3, 0, 5, 1, 8, 2, 8, 3, 1, 4, 9, 5, 9, 6, 7, 7, 5, 8, 1, 9, 9, 0, 5, 1, 7, 2, 9, 3, 6, 4, 6, 6, 3, 7, 8, 8, 2, 9, 0, 6, 3, 2, 5, 7, 8, 1, 8, 5, 7, 6, 7, 2, 6, 0, 9, 8, 1, 1, 6, 7, 1, 1, 2, 8, 9, 3, 5, 8, 7, 7, 2, 1, 1, 7, 9, 7, 9, 0, 2, 1, 8, 4, 4, 4, 1, 7, 5, 4, 9, 4, 6, 9, 0, 7, 6, 2, 9, 6, 2, 5, 8, 3, 8, 9, 7, 4, 7, 3, 8, 9, 2, 0, 8, 8, 1, 7, 7, 9, 5, 0, 8, 3, 4, 0, 1, 4, 1, 6, 4, 3, 5, 7, 7, 0, 1, 1, 9, 4, 9, 8, 1, 8, 1, 1, 3, 2, 0, 9, 2, 3, 9, 8, 8, 9, 2, 8, 3, 2, 9, 8, 6, 6, 0, 5, 3, 2, 7, 6, 6, 2, 8, 6, 8, 0, 5, 5, 8, 3, 8, 3, 5, 6, 1, 3, 0, 2, 1, 7, 9, 6, 0, 5, 3, 9, 0, 8, 5, 0, 0, 9, 3, 0, 9, 1, 9, 2, 8, 3, 0, 4, 2, 5, 4, 6, 9, 7, 5, 8, 9, 9, 3, 0, 8, 1, 2, 2, 2, 3, 1, 4, 8, 5, 4, 6, 5, 7, 7, 8, 2, 9, 2, 0, 1, 1, 2, 2, 2, 3, 5, 4, 1, 5, 9, 6, 8, 7, 3, 8, 2, 9, 4, 9, 2, 8, 7, 6, 3, 5, 2, 9, 4, 2, 2, 3, 6, 4, 4, 3, 4, 8, 6, 5, 0, 1, 7, 5, 4, 2, 6, 3, 3, 0, 6, 1, 9, 2, 3, 1, 5, 3, 4, 2, 1, 6, 3, 5, 5, 3, 9, 0, 7, 7, 4, 4, 3, 6, 9, 4, 6, 0, 4, 5, 9, 9, 3, 9, 0, 8, 9, 3, 7, 1, 2, 7, 6, 4, 2, 7, 6, 6, 6, 5, 3, 0, 6, 6, 1, 6, 5, 2, 2, 0, 9, 6, 2, 3, 6, 7, 5, 7, 3, 4, 5, 4, 8, 3, 8, 9, 4, 2, 1, 8, 6, 9, 2, 6, 8, 0, 1, 9, 8, 5, 3, 3, 2, 8, 1, 8, 4, 7, 4, 1, 4, 4, 7, 0, 0, 4, 8, 8, 1, 5, 5, 2, 1, 3, 3, 9, 5, 0, 5, 7, 1, 2, 6, 1, 0, 9, 6, 1, 1, 5, 2, 1, 2, 7, 9, 4, 0, 8, 9, 6, 2, 1, 8, 2, 0, 1, 4, 6, 7, 8, 8, 8, 5, 0, 4, 1, 4, 2, 7, 3, 6, 4, 0, 7, 6, 8, 4, 9, 5, 0, 1, 1, 9, 2, 9, 3, 7, 4, 3, 7, 8, 8, 2, 9, 6, 0, 2, 1, 3, 2, 0, 3, 5, 7, 1, 8, 3, 9, 2, 1, 9, 1, 1, 7, 4, 4, 8, 8, 3, 1, 9, 5, 1, 7, 7, 2, 9, 8, 3, 6, 2, 3, 9, 3, 7, 8, 9, 6, 1, 9, 5, 1, 5, 7, 4, 2, 5, 1, 1, 5, 8, 1, 0, 3, 4, 2, 1, 2, 5, 3, 0, 0, 2, 6, 4, 4, 1, 3, 7, 7, 4, 6, 5, 9, 3, 0, 6, 4, 6, 1, 8, 4, 1, 0, 0, 6, 3, 1, 1, 2, 8, 6, 9, 9, 4, 2, 9, 2, 7, 3, 1, 0, 7, 7, 6, 2, 2, 9, 2, 2, 3, 3, 8, 4, 5, 0, 9, 0, 5, 8, 6, 7, 6, 8, 4, 0, 7, 9, 7, 8, 2, 9, 9, 0, 4, 2, 8, 0, 3, 1, 0, 2, 4, 3, 2, 4, 2, 5, 1, 6, 3, 7, 5, 8, 0, 9, 3, 0, 9, 1, 1, 2, 2, 3, 7, 4, 1, 5, 0, 6, 7, 7, 3, 8, 3, 9, 9, 0, 8, 1, 3, 2, 3, 3, 9, 4, 4, 5, 0, 6, 1, 7, 6, 8, 3, 9, 7, 5, 4, 8, 3, 7, 3, 4, 1, 7, 1, 7, 9, 3, 1, 8, 7, 8, 3, 3, 6, 1, 6, 5, 3, 8, 5, 2, 2, 7, 3, 6, 8, 8, 6, 6, 7, 4, 3, 4, 4, 4, 1, 1, 6, 8, 4, 8, 1, 9, 7, 1, 1, 2, 9, 2, 1, 6, 5, 9, 8, 9, 2, 6, 5, 5, 3, 5, 0, 3, 6, 3, 6, 8, 5, 8, 0, 1, 3, 9, 4, 7, 4, 6, 5, 8, 2, 3, 0, 7, 0, 4, 7, 7, 2, 0, 3, 9, 1, 3, 2, 7, 0, 9, 7, 3, 5, 0, 2, 2, 1, 0, 4, 1, 3, 0, 0, 1, 4, 0, 6, 4, 9, 0, 7, 1, 2, 0, 9, 4, 5, 7, 9, 9, 2, 2, 0, 0, 6, 6, 6, 2, 4, 6, 3, 2, 2, 2, 3, 9, 9, 9, 7, 0, 1, 1, 0, 2, 5, 3, 8, 4, 8, 5, 0, 6, 1, 7, 0, 8, 6, 9, 4, 0, 6, 1, 0, 2, 1, 3, 9, 4, 6, 5, 7, 6, 8, 7, 9, 8, 6, 9, 6, 1, 5, 0, 0, 9, 0, 5, 3, 7, 0, 5, 4, 1, 6, 8, 4, 6, 7, 9, 1, 0, 2, 4, 9, 1, 8, 9, 8, 3, 5, 8, 6, 4, 2, 4, 8, 7, 1, 0, 8, 1, 0, 2, 4, 7, 0, 8, 5, 2, 9, 5, 8, 9, 7, 6, 1, 0, 3, 6, 3, 5, 1, 5, 0, 3, 2, 3, 9, 3, 3, 9, 6, 8, 6, 1, 9, 4, 3, 0, 0, 6, 4, 1, 1, 0, 4, 0, 9, 6, 1, 2, 6, 1, 4, 1, 2, 3, 7, 2, 9, 7, 5, 7, 4, 8, 7, 8, 6, 7, 6, 8, 8, 4, 2, 6, 4, 0, 9, 7, 1, 0, 5, 3, 7, 6, 1, 7, 5, 1, 4, 5, 6, 3, 3, 7, 2, 2, 3, 4, 3, 9, 9, 4, 1, 3, 2, 6, 4, 2, 6, 2, 6, 5, 3, 3, 9, 9, 9, 4, 0, 1, 3, 7, 1, 2, 2, 5, 4, 0, 5, 1, 1, 2, 6, 3, 1, 4, 3, 5, 8, 6, 6, 7, 7, 8, 3, 0, 8, 1, 4, 2, 8, 3, 2, 4, 8, 5, 0, 6, 0, 7, 7, 8, 8, 9, 1, 0, 3, 1, 4, 2, 6, 3, 8, 4, 4, 5, 3, 6, 9, 7, 8, 0, 7, 7, 6, 0, 4, 7, 4, 8, 6, 3, 2, 0, 0, 0, 2, 5, 5, 5, 7, 3, 7, 8, 0, 8, 3, 1, 3, 8, 6, 4, 1, 9, 2, 6, 0, 1, 9, 8, 7, 0, 9, 2, 6, 7, 9, 3, 2, 9, 8, 2, 8, 5, 7, 9, 6, 5, 2, 4, 3, 0, 8, 3, 0, 3, 9, 4, 5, 7, 5, 9, 1, 0, 3, 1, 8, 9, 6, 1, 6, 2, 0, 7, 1, 9, 9, 1, 3, 0, 3, 6, 9, 2, 7, 4, 8, 0, 2, 3, 9, 5, 5, 6, 9, 6, 2, 5, 8, 6, 6, 7, 6, 1, 2, 4, 9, 4, 3, 2, 3, 6, 9, 2, 3, 9, 0, 1, 5, 5, 7, 5, 0, 5, 4, 3, 1, 1, 8, 4, 1, 8, 2, 6, 9, 3, 9, 7, 1, 0, 1, 9, 1, 5, 2, 6, 8, 7, 0, 1, 5, 3, 2, 8, 9, 2, 1, 6, 5, 2, 3, 6, 3, 4, 3, 2, 7, 7, 7, 8, 0, 7, 7, 1, 2, 0, 6, 1, 0, 2, 9, 3, 7, 4, 7, 5, 3, 6, 7, 7, 7, 8, 4, 9, 9, 0, 1, 1, 2, 2, 0, 3, 2, 4, 9, 5, 4, 6, 6, 7, 7, 8, 3, 9, 8, 0, 6, 1, 9, 2, 7, 3, 4, 4, 8, 5, 9, 6, 9, 7, 0, 8, 4, 9, 4, 9, 4, 7, 3, 5, 4, 2, 8, 9, 4, 0, 5, 1, 3, 5, 4, 8, 6, 8, 4, 0, 8, 9, 4, 3, 4, 2, 7, 7, 6, 8, 7, 4, 5, 6, 7, 1, 1, 0, 3, 4, 5, 5, 4, 3, 3, 9, 8, 0, 5, 5, 6, 0, 5, 1, 7, 6, 0, 9, 3, 3, 1, 1, 2, 6, 5, 0, 8, 1, 0, 1, 6, 8, 1, 0, 6, 4, 4, 7, 9, 7, 7, 6, 4, 3, 1, 5, 0, 6, 2, 6, 6, 3, 4, 1, 3, 8, 8, 3, 7, 5, 0, 6, 9, 7, 6, 5, 6, 2, 0, 7, 4, 1, 7, 1, 0, 9, 8, 2, 4, 8, 3, 8, 2, 3, 9, 3, 5, 0, 5, 1, 7, 2, 4, 3, 3, 4, 7, 5, 4, 6, 6, 7, 4, 8, 9, 9, 4, 0, 7, 1, 5, 2, 1, 3, 6, 4, 9, 5, 0, 6, 4, 7, 5, 8, 1, 9, 9, 0, 6, 1, 2, 2, 0, 3, 9, 4, 1, 5, 1, 6, 4, 7, 8, 8, 1, 9, 6, 0, 9, 0, 4, 7, 2, 2, 7, 4, 4, 2, 9, 6, 7, 5, 3, 5, 1, 3, 1, 7, 0, 8, 0, 6, 6, 6, 9, 4, 9, 3, 1, 2, 5, 6, 1, 3, 4, 8, 7, 0, 3, 1, 4, 4, 7, 5, 9, 6, 0, 4, 1, 7, 6, 8, 6, 0, 1, 3, 2, 1, 5, 5, 5, 4, 9, 1, 3, 9, 2, 1, 2, 2, 9, 7, 4, 0, 0, 1, 5, 3, 7, 8, 9, 2, 0, 9, 8, 7, 5, 9, 5, 4, 0, 2, 9, 5, 3, 8, 1, 6, 8, 5, 4, 5, 6, 9, 7, 9, 9, 1, 4, 8, 6, 2, 0, 9, 5, 1, 9, 3, 7, 4, 5, 3, 5, 1, 4, 0, 1, 9, 2, 6, 0, 3, 9, 6, 5, 8, 7, 7, 1, 0, 7, 1, 1, 0, 9, 5, 4, 8, 3, 2, 5, 7, 7, 7, 4, 0, 9, 1, 4, 2, 7, 3, 5, 4, 1, 5, 0, 6, 0, 7, 0, 8, 3, 9, 2, 0, 6, 1, 3, 2, 6, 3, 8, 4, 6, 5, 7, 6, 8, 7, 4, 8, 0, 9, 5, 0, 6, 1, 3, 2, 1, 3, 4, 4, 8, 5, 2, 6, 5, 7, 3, 8, 9, 9, 1, 5, 8, 7, 7, 7, 2, 7, 6, 0, 1, 4, 0, 0, 8, 3, 2, 1, 1, 8, 0, 9, 4, 2, 4, 1, 4, 8, 6, 6, 5, 5, 4, 4, 5, 7, 3, 3, 0, 4, 8, 1, 7, 8, 8, 6, 7, 9, 8, 1, 5, 4, 6, 5, 2, 5, 4, 6, 9, 0, 4, 1, 9, 3, 8, 6, 4, 4, 4, 8, 9, 9, 2, 8, 1, 5, 3, 2, 6, 1, 7, 0, 5, 7, 0, 2, 2, 5, 8, 5, 6, 6, 7, 6, 6, 6, 2, 3, 4, 3, 8, 3, 8, 1, 0, 7, 6, 2, 3, 2, 2, 7, 9, 2, 5, 3, 6, 6, 4, 8, 2, 5, 7, 1, 3, 4, 0, 9, 5, 0, 1, 5, 3, 0, 4, 6, 1, 8, 6, 8, 7, 0, 5, 8, 8, 2, 8, 3, 5, 9, 7, 4, 7, 3, 7, 7, 0, 1, 6, 7, 2, 6, 8, 9, 6, 4, 5, 2, 8, 9, 1, 9, 0, 2, 9, 0, 6, 8, 1, 5, 0, 0, 4, 4, 6, 9, 1, 4, 7, 0, 6, 7, 5, 1, 3, 3, 5, 2, 7, 9, 9, 0, 6, 1, 5, 2, 1, 3, 8, 4, 7, 5, 8, 6, 1, 7, 0, 8, 6, 9, 8, 0, 9, 1, 9, 2, 8, 3, 4, 4, 6, 5, 7, 6, 0, 7, 2, 8, 2, 9, 0, 0, 5, 1, 3, 2, 8, 3, 7, 6, 2, 7, 9, 8, 3, 9, 1, 8, 6, 4, 2, 0, 8, 0, 3, 7, 0, 2, 7, 4, 8, 2, 9, 6, 0, 5, 2, 5, 9, 3, 5, 7, 6, 8, 1, 6, 0, 6, 5, 4, 1, 3, 5, 2, 7, 6, 2, 6, 9, 4, 1, 4, 6, 3, 3, 8, 2, 8, 7, 3, 5, 0, 9, 1, 9, 4, 1, 7, 7, 8, 1, 0, 9, 3, 4, 1, 9, 9, 2, 0, 4, 5, 4, 4, 2, 1, 8, 9, 3, 1, 0, 2, 2, 7, 4, 0, 7, 1, 1, 3, 2, 8, 9, 2, 4, 9, 7, 2, 6, 7, 1, 7, 4, 9, 7, 9, 8, 0, 4, 4, 2, 2, 6, 5, 2, 8, 5, 6, 8, 5, 9, 5, 3, 9, 1, 9, 0, 1, 6, 1, 2, 5, 4, 7, 9, 6, 5, 8, 5, 2, 1, 9, 4, 1, 1, 3, 1, 2, 5, 3, 6, 4, 2, 3, 3, 1, 1, 9, 9, 0, 6, 9, 8, 5, 8, 6, 7, 3, 1, 6, 1, 8, 2, 7, 3, 0, 6, 1, 9, 0, 9, 5, 6, 8, 0, 2, 3, 7, 5, 7, 1, 0, 9, 1, 9, 2, 7, 3, 5, 4, 7, 5, 5, 6, 5, 7, 4, 8, 4, 9, 8, 0, 4, 1, 3, 2, 2, 3, 5, 4, 9, 5, 7, 6, 0, 7, 8, 8, 8, 9, 7, 0, 7, 1, 1, 2, 4, 3, 8, 7, 9, 8, 1, 9, 4, 0, 5, 9, 1, 5, 3, 5, 2, 6, 8, 9, 3, 8, 9, 9, 4, 8, 8, 7, 3, 7, 3, 3, 9, 5, 1, 1, 6, 0, 6, 2, 4, 2, 7, 7, 5, 8, 9, 2, 8, 0, 1, 1, 4, 2, 0, 6, 5, 3, 9, 3, 5, 7, 3, 3, 7, 3, 8, 4, 2, 6, 3, 6, 4, 6, 8, 1, 5, 5, 1, 0, 8, 8, 3, 2, 3, 0, 1, 1, 0, 7, 6, 6, 1, 3, 8, 2, 1, 1, 8, 7, 3, 3, 9, 1, 6, 3, 2, 9, 7, 1, 2, 7, 5, 6, 6, 8, 0, 4, 6, 3, 0, 1, 5, 4, 6, 3, 6, 6, 1, 9, 2, 6, 6, 1, 6, 4, 8, 2, 9, 2, 3, 7, 6, 9, 4, 5, 3, 4, 0, 8, 6, 8, 6, 4, 2, 9, 3, 0, 4, 8, 4, 9, 3, 8, 9, 0, 5, 3, 4, 4, 2, 5, 5, 6, 8, 7, 3, 8, 6, 9, 3, 1, 1, 0, 7, 1, 1, 2, 6, 3, 4, 4, 2, 7, 7, 8, 5, 9, 4, 0, 3, 1, 9, 2, 5, 3, 6, 4, 8, 5, 3, 6, 8, 7, 9, 8, 2, 9, 2, 0, 8, 8, 9, 7, 4, 8, 1, 9, 3, 9, 6, 0, 6, 1, 9, 4, 6, 5, 8, 1, 8, 6, 6, 2, 7, 9, 6, 6, 9, 7, 1, 3, 6, 9, 5, 9, 2, 3, 3, 8, 5, 1, 4, 2, 3, 9, 6, 6, 4, 3, 3, 5, 9, 0, 1, 5, 5, 4, 0, 3, 1, 4, 2, 7, 4, 7, 6, 9, 4, 1, 7, 4, 8, 3, 8, 7, 9, 6, 7, 2, 3, 1, 8, 5, 0, 5, 4, 0, 2, 5, 5, 0, 2, 8, 2, 4, 7, 6, 3, 7, 9, 0, 2, 2, 8, 4, 9, 8, 0, 1, 8, 2, 8, 2, 5, 3, 2, 1, 6, 3, 8, 6, 2, 4, 5, 9, 4, 6, 0, 5, 3, 1, 8, 9, 8, 8, 8, 1, 2, 1, 3, 5, 9, 0, 3, 2, 3, 7, 5, 8, 9, 6, 6, 6, 3, 8, 7, 2, 1, 8, 2, 4, 2, 4, 8, 2, 4, 2, 4, 8, 7, 0, 4, 0, 9, 1, 7, 2, 6, 3, 2, 4, 0, 5, 7, 6, 0, 0, 8, 1, 2, 2, 4, 3, 1, 4, 9, 5, 8, 6, 3, 7, 2, 8, 4, 0, 4, 1, 2, 2, 9, 6, 7, 7, 9, 8, 3, 9, 6, 0, 6, 2, 4, 1, 5, 6, 7, 5, 5, 9, 0, 3, 7, 5, 5, 0, 2, 7, 4, 1, 1, 1, 3, 5, 2, 3, 2, 0, 3, 7, 5, 9, 6, 6, 3, 1, 2, 6, 5, 7, 5, 4, 9, 9, 2, 5, 5, 7, 5, 9, 4, 8, 7, 5, 1, 6, 8, 2, 7, 4, 3, 8, 5, 1, 8, 5, 2, 9, 7, 2, 1, 2, 4, 8, 1, 0, 8, 6, 3, 4, 1, 3, 3, 3, 8, 1, 2, 2, 2, 4, 4, 1, 3, 9, 2, 6, 4, 9, 0, 3, 8, 4, 2, 0, 4, 3, 1, 9, 3, 0, 9, 2, 0, 7, 3, 1, 2, 1, 5, 0, 9, 7, 6, 6, 2, 2, 1, 2, 8, 7, 1, 6, 6, 0, 0, 6, 5, 9, 9, 4, 7, 8, 0, 4, 9, 3, 3, 3, 3, 7, 7, 8, 2, 0, 5, 5, 3, 8, 9, 3, 8, 0, 7, 6, 0, 8, 8, 3, 4, 7, 0, 8, 1, 5, 3, 1, 8, 8, 4, 0, 6, 1, 5, 2, 1, 3, 3, 4, 1, 7, 2, 8, 4, 9, 0, 0, 5, 1, 1, 2, 0, 3, 3, 4, 9, 5, 5, 6, 0, 7, 9, 8, 3, 9, 0, 0, 2, 1, 7, 2, 9, 3, 2, 4, 8, 7, 7, 8, 9, 9, 8, 7, 8, 2, 8, 9, 0, 9, 1, 8, 7, 4, 3, 0, 6, 3, 0, 5, 3, 4, 4, 3, 3, 3, 2, 4, 4, 6, 1, 6, 6, 5, 2, 5, 8, 1, 8, 7, 2, 8, 0, 4, 1, 5, 7, 7, 5, 3, 0, 5, 9, 2, 4, 3, 1, 6, 5, 6, 2, 7, 7, 7, 5, 0, 2, 1, 4, 0, 5, 1, 0, 6, 4, 3, 3, 1, 5, 4, 5, 7, 0, 3, 0, 8, 4, 6, 3, 2, 1, 2, 5, 5, 9, 9, 8, 1, 8, 7, 6, 9, 5, 7, 7, 9, 7, 9, 2, 1, 1, 0, 4, 8, 3, 9, 6, 3, 3, 8, 6, 4, 5, 6, 3, 1, 7, 4, 7, 0, 0, 3, 2, 6, 9, 4, 3, 8, 8, 1, 3, 3, 0, 1, 4, 0, 2, 9, 1, 0, 7, 1, 8, 2, 1, 3, 3, 5, 7, 6, 9, 8, 9, 9, 1, 0, 1, 1, 3, 2, 2, 3, 3, 4, 0, 7, 1, 8, 0, 9, 8, 0, 0, 1, 8, 2, 4, 3, 7, 4, 8, 7, 2, 9, 6, 2, 0, 2, 0, 7, 1, 6, 2, 4, 9, 0, 1, 8, 0, 0, 6, 5, 7, 2, 4, 7, 4, 2, 6, 3, 5, 6, 7, 2, 3, 1, 6, 7, 8, 7, 1, 9, 7, 9, 9, 1, 0, 2, 2, 4, 4, 6, 8, 7, 1, 7, 7, 5, 9, 4, 6, 5, 2, 0, 7, 1, 6, 1, 9, 9, 6, 2, 7, 0, 2, 3, 5, 1, 2, 4, 0, 0, 8, 6, 9, 4, 9, 3, 6, 9, 4, 3, 0, 0, 1, 0, 3, 5, 5, 2, 0, 8, 9, 8, 3, 8, 2, 8, 2, 5, 4, 5, 8, 7, 7, 1, 2, 4, 2, 1, 9, 3, 6, 8, 3, 9, 7, 3, 5, 7, 8, 4, 2, 1, 7, 1, 7, 0, 0, 6, 0, 0, 6, 1, 0, 2, 2, 3, 0, 4, 8, 5, 6, 6, 3, 7, 9, 8, 2, 9, 4, 0, 2, 1, 0, 2, 0, 3, 3, 4, 4, 7, 5, 8, 8, 9, 0, 0, 2, 1, 8, 2, 7, 3, 8, 4, 2, 7, 4, 8, 6, 9, 9, 0, 6, 0, 8, 1, 1, 0, 0, 1, 1, 5, 3, 3, 4, 4, 2, 2, 6, 4, 3, 4, 6, 0, 7, 0, 3, 6, 9, 9, 7, 6, 7, 6, 4, 5, 6, 7, 6, 3, 5, 2, 1, 2, 0, 3, 0, 4, 5, 4, 9, 9, 1, 1, 2, 4, 7, 0, 0, 7, 6, 7, 2, 5, 3, 6, 7, 2, 5, 3, 7, 1, 1, 4, 0, 4, 9, 0, 0, 9, 5, 1, 4, 8, 3, 3, 5, 3, 7, 7, 7, 3, 7, 9, 9, 8, 5, 8, 5, 4, 5, 7, 2, 7, 6, 6, 6, 2, 4, 1, 1, 9, 5, 8, 2, 7, 4, 8, 1, 8, 4, 2, 1, 3, 7, 9, 5, 3, 7, 3, 4, 5, 4, 5, 2, 0, 6, 7, 9, 9, 3, 5, 4, 0, 5, 6, 7, 4, 6, 1, 7, 1, 6, 2, 6, 8, 0, 1, 9, 5, 5, 0, 4, 1, 6, 2, 7, 3, 6, 4, 8, 5, 2, 6, 1, 7, 2, 8, 0, 9, 6, 0, 4, 1, 7, 2, 1, 3, 6, 4, 9, 5, 3, 6, 6, 7, 7, 8, 6, 9, 2, 0, 2, 1, 9, 2, 5, 3, 5, 4, 0, 5, 2, 6, 3, 9, 4, 6, 4, 4, 7, 4, 6, 3, 5, 6, 0, 2, 8, 3, 1, 4, 8, 8, 1, 7, 6, 8, 4, 6, 6, 9, 2, 8, 1, 3, 6, 2, 4, 2, 0, 8, 2, 4, 5, 2, 3, 0, 0, 1, 5, 1, 6, 2, 8, 9, 8, 6, 7, 8, 1, 1, 9, 2, 4, 0, 2, 6, 1, 5, 8, 2, 1, 7, 2, 5, 0, 3, 8, 9, 6, 3, 0, 7, 6, 1, 6, 3, 8, 8, 1, 1, 9, 9, 7, 5, 6, 0, 1, 1, 1, 1, 1, 9, 7, 2, 9, 6, 6, 0, 6, 4, 8, 5, 6, 6, 1, 5, 1, 0, 0, 3, 5, 1, 0, 8, 1, 6, 1, 9, 0, 3, 4, 0, 4, 1, 4, 0, 7, 4, 7, 7, 7, 3, 5, 2, 8, 6, 5, 5, 6, 4, 1, 7, 4, 9, 3, 7, 1, 0, 4, 1, 1, 2, 1, 3, 2, 4, 1, 5, 7, 6, 3, 7, 1, 8, 0, 9, 2, 0, 8, 1, 5, 2, 6, 3, 7, 4, 9, 5, 1, 6, 7, 7, 1, 0, 2, 1, 9, 2, 5, 3, 8, 4, 4, 5, 1, 6, 1, 0, 0, 7, 6, 5, 6, 0, 3, 8, 1, 4, 6, 1, 7, 8, 8, 8, 0, 1, 5, 3, 5, 1, 8, 9, 7, 0, 9, 4, 3, 4, 5, 0, 8, 7, 5, 2, 5, 9, 5, 8, 0, 7, 4, 2, 2, 4, 7, 7, 4, 8, 5, 9, 5, 3, 5, 1, 4, 4, 9, 6, 6, 2, 2, 2, 8, 7, 6, 8, 6, 6, 0, 4, 9, 9, 5, 2, 7, 9, 2, 3, 4, 5, 5, 3, 5, 6, 0, 6, 0, 0, 1, 2, 1, 2, 4, 7, 3, 4, 7, 9, 9, 5, 6, 1, 5, 2, 9, 6, 1, 1, 1, 8, 0, 3, 7, 5, 9, 0, 2, 0, 6, 6, 0, 1, 5, 6, 1, 9, 8, 6, 9, 7, 0, 1, 5, 1, 4, 7, 3, 1, 3, 2, 4, 4, 1, 5, 2, 6, 0, 7, 1, 8, 5, 9, 7, 0, 6, 1, 3, 2, 8, 3, 1, 4, 7, 5, 9, 6, 8, 7, 0, 8, 0, 9, 9, 0, 1, 1, 3, 2, 6, 3, 5, 4, 7, 5, 9, 6, 5, 7, 1, 8, 0, 9, 9, 1, 2, 3, 3, 5, 1, 9, 7, 4, 8, 1, 6, 7, 6, 7, 2, 2, 4, 1, 7, 4, 2, 8, 5, 2, 7, 9, 6, 3, 5, 8, 2, 5, 0, 4, 3, 8, 1, 8, 0, 9, 7, 3, 4, 9, 7, 2, 0, 5, 5, 7, 6, 4, 4, 1, 1, 2, 2, 3, 1, 9, 5, 1, 8, 6, 4, 0, 7, 1, 7, 2, 1, 8, 8, 5, 8, 1, 2, 1, 5, 8, 0, 5, 4, 6, 6, 4, 6, 7, 8, 3, 1, 6, 2, 8, 5, 0, 8, 3, 1, 7, 8, 4, 4, 0, 0, 6, 6, 9, 8, 2, 9, 6, 3, 5, 2, 6, 2, 9, 5, 0, 7, 4, 3, 0, 3, 6, 5, 1, 4, 9, 3, 2, 5, 0, 3, 9, 4, 5, 7, 1, 9, 3, 8, 7, 0, 6, 7, 9, 1, 4, 7, 7, 4, 7, 2, 6, 0, 3, 1, 0, 9, 5, 5, 6, 5, 2, 6, 2, 4, 0, 5, 1, 8, 7, 5, 8, 0, 9, 8, 0, 9, 1, 2, 2, 7, 3, 8, 4, 6, 5, 4, 6, 2, 0, 7, 1, 4, 8, 1, 9, 3, 8, 7, 4, 1, 1, 1, 8, 4, 8, 6, 1, 3, 3, 4, 1, 3, 8, 6, 3, 3, 3, 9, 0, 7, 9, 6, 4, 3, 9, 9, 8, 2, 7, 6, 8, 2, 1, 2, 7, 7, 8, 1, 7, 7, 5, 9, 1, 1, 6, 2, 5, 2, 0, 4, 9, 7, 5, 0, 0, 9, 2, 2, 1, 9, 8, 6, 0, 7, 0, 3, 1, 2, 6, 0, 6, 4, 7, 7, 1, 0, 1, 1, 7, 0, 0, 7, 1, 4, 2, 7, 3, 7, 4, 9, 5, 3, 6, 8, 7, 8, 8, 1, 9, 2, 0, 1, 1, 4, 2, 4, 3, 7, 4, 1, 5, 6, 6, 7, 7, 2, 8, 8, 0, 8, 1, 9, 2, 6, 3, 3, 4, 1, 5, 8, 6, 1, 7, 3, 8, 4, 9, 6, 7, 5, 0, 3, 4, 2, 0, 5, 6, 3, 4, 3, 3, 5, 3, 4, 4, 6, 8, 5, 7, 9, 8, 3, 6, 1, 9, 3, 8, 8, 3, 8, 2, 2, 2, 9, 8, 7, 4, 1, 2, 6, 0, 0, 1, 5, 1, 1, 2, 2, 9, 6, 6, 9, 8, 2, 1, 2, 2, 9, 1, 9, 0, 5, 6, 8, 9, 6, 3, 4, 7, 3, 1, 4, 8, 6, 3, 7, 8, 9, 1, 0, 9, 1, 5, 2, 9, 6, 8, 0, 2, 4, 6, 6, 0, 5, 4, 2, 5, 6, 0, 5, 3, 2, 1, 4, 8, 0, 6, 3, 7, 0, 5, 6, 9, 2, 9, 5, 3, 1, 0, 9, 3, 0, 1, 8, 4, 3, 4, 8, 0, 7, 4, 7, 9, 4, 2, 6, 6, 7, 5, 7, 4, 2, 7, 6, 9, 6, 7, 1, 0, 8, 1, 8, 3, 1, 4, 1, 5, 4, 6, 5, 7, 7, 8, 6, 0, 5, 1, 2, 2, 2, 3, 9, 4, 1, 7, 3, 8, 6, 9, 7, 0, 2, 1, 4, 2, 1, 3, 4, 4, 4, 7, 0, 8, 8, 0, 7, 5, 3, 6, 7, 8, 7, 3, 6, 9, 6, 0, 8, 2, 4, 3, 0, 3, 1, 3, 2, 9, 6, 9, 0, 5, 6, 6, 2, 4, 6, 4, 2, 2, 8, 7, 0, 0, 7, 3, 8, 9, 1, 6, 1, 8, 6, 7, 7, 3, 0, 4, 1, 0, 1, 4, 3, 1, 4, 6, 9, 7, 6, 8, 5, 4, 0, 9, 8, 6, 5, 5, 8, 6, 3, 6, 4, 7, 6, 8, 7, 8, 2, 1, 6, 8, 4, 3, 2, 7, 5, 7, 1, 1, 4, 5, 6, 0, 2, 5, 5, 2, 3, 4, 4, 3, 5, 1, 9, 8, 2, 2, 0, 9, 5, 9, 7, 5, 9, 2, 6, 6, 8, 4, 2, 4, 5, 1, 8, 7, 6, 1, 8, 4, 1, 3, 0, 9, 9, 7, 8, 1, 3, 2, 1, 6, 8, 0, 4, 7, 5, 3, 1, 0, 9, 1, 6, 2, 5, 3, 2, 4, 9, 5, 0, 6, 2, 7, 8, 8, 9, 9, 5, 0, 1, 1, 4, 2, 2, 3, 7, 4, 4, 5, 0, 6, 6, 7, 0, 8, 7, 9, 5, 0, 0, 1, 6, 2, 6, 3, 2, 4, 1, 5, 4, 6, 5, 7, 2, 8, 3, 9, 4, 7, 7, 4, 5, 0, 6, 4, 8, 0, 9, 1, 7, 7, 4, 9, 9, 5, 7, 1, 1, 4, 7, 2, 1, 8, 4, 9, 1, 4, 1, 3, 1, 1, 5, 7, 4, 8, 1, 2, 5, 4, 0, 3, 3, 6, 1, 9, 0, 9, 2, 5, 5, 8, 9, 6, 9, 7, 7, 0, 2, 6, 4, 8, 7, 2, 9, 6, 4, 3, 2, 9, 1, 3, 8, 2, 9, 8, 0, 6, 8, 1, 8, 7, 0, 4, 8, 8, 6, 8, 0, 9, 9, 0, 7, 3, 3, 3, 0, 9, 1, 0, 0, 5, 6, 2, 0, 5, 6, 0, 6, 9, 4, 4, 4, 1, 4, 0, 9, 3, 9, 7, 2, 5, 1, 8, 9, 7, 6, 7, 1, 8, 9, 2, 0, 9, 8, 7, 9, 1, 8, 2, 0, 6, 5, 4, 8, 2, 4, 5, 7, 2, 4, 3, 7, 6, 3, 6, 4, 5, 2, 0, 1, 0, 3, 7, 2, 5, 4, 2, 9, 8, 9, 1, 3, 6, 2, 1, 5, 0, 9, 4, 3, 3, 3, 1, 2, 6, 0, 1, 7, 9, 0, 0, 1, 1, 9, 2, 4, 3, 5, 4, 9, 5, 2, 6, 3, 7, 4, 8, 9, 9, 2, 0, 6, 1, 4, 2, 0, 3, 6, 4, 3, 5, 0, 6, 5, 7, 9, 8, 7, 9, 9, 0, 8, 1, 0, 2, 7, 3, 9, 4, 8, 5, 6, 6, 3, 7, 3, 8, 2, 5, 3, 0, 1, 6, 8, 8, 5, 9, 1, 4, 7, 1, 3, 9, 0, 0, 2, 4, 6, 8, 2, 9, 1, 1, 3, 4, 0, 0, 9, 5, 3, 1, 8, 5, 5, 4, 2, 0, 4, 7, 3, 6, 9, 0, 1, 1, 3, 7, 9, 0, 6, 6, 7, 8, 1, 9, 1, 5, 8, 4, 9, 7, 3, 6, 1, 0, 2, 8, 9, 1, 4, 7, 1, 7, 0, 1, 0, 3, 3, 2, 0, 3, 0, 1, 5, 0, 2, 0, 2, 7, 8, 8, 4, 4, 7, 9, 6, 3, 8, 8, 0, 4, 8, 7, 1, 2, 7, 5, 8, 6, 3, 3, 4, 6, 1, 9, 0, 4, 2, 6, 4, 9, 1, 0, 0, 2, 3, 5, 8, 5, 3, 1, 0, 3, 6, 3, 5, 9, 1, 7, 2, 8, 4, 7, 2, 2, 7, 2, 8, 5, 9, 7, 8, 9, 3, 2, 2, 1, 9, 3, 6, 0, 1, 1, 8, 2, 5, 3, 9, 4, 0, 5, 5, 6, 8, 7, 1, 8, 5, 9, 4, 0, 0, 1, 5, 2, 0, 3, 5, 4, 5, 5, 5, 6, 0, 7, 2, 8, 5, 9, 9, 0, 4, 1, 5, 2, 1, 3, 3, 4, 1, 5, 1, 6, 1, 7, 4, 8, 0, 9, 8, 8, 5, 9, 9, 5, 7, 7, 0, 0, 1, 3, 9, 1, 5, 6, 6, 8, 8, 4, 5, 1, 8, 7, 7, 6, 3, 5, 8, 6, 1, 4, 9, 2, 9, 7, 4, 8, 5, 1, 6, 3, 6, 2, 0, 0, 0, 5, 0, 0, 2, 1, 7, 9, 8, 2, 9, 3, 1, 2, 2, 3, 1, 5, 1, 5, 7, 7, 4, 9, 8, 9, 4, 7, 3, 1, 7, 1, 6, 9, 0, 0, 2, 7, 3, 3, 7, 4, 0, 8, 2, 6, 1, 3, 5, 8, 2, 0, 8, 6, 4, 2, 2, 1, 1, 0, 3, 1, 9, 0, 3, 6, 8, 2, 0, 3, 8, 8, 4, 9, 7, 0, 4, 7, 7, 2, 2, 3, 0, 4, 6, 5, 9, 5, 9, 2, 4, 8, 1, 5, 8, 4, 9, 6, 8, 6, 1, 6, 1, 7, 5, 9, 8, 1, 1, 8, 0, 2, 2, 1, 5, 2, 4, 6, 8, 5, 2, 3, 0, 4, 4, 7, 3, 9, 4, 4, 7, 0, 5, 0, 9, 5, 6, 9, 1, 0, 0, 1, 5, 2, 3, 3, 7, 4, 0, 5, 1, 6, 8, 7, 5, 8, 1, 9, 2, 0, 0, 1, 3, 2, 7, 3, 2, 5, 0, 6, 1, 7, 2, 8, 7, 9, 7, 0, 0, 1, 1, 2, 7, 3, 4, 4, 4, 5, 0, 6, 6, 7, 7, 8, 4, 9, 4, 0, 4, 7, 0, 0, 7, 7, 6, 8, 0, 3, 1, 0, 9, 0, 8, 5, 3, 5, 3, 3, 5, 8, 0, 8, 0, 1, 9, 8, 0, 4, 5, 9, 9, 6, 2, 1, 8, 8, 1, 0, 6, 2, 0, 3, 6, 9, 0, 4, 0, 1, 4, 2, 5, 5, 9, 9, 1, 8, 8, 9, 3, 4, 9, 3, 9, 0, 6, 3, 8, 3, 7, 4, 1, 7, 0, 0, 1, 1, 4, 9, 2, 1, 0, 2, 0, 7, 8, 9, 5, 1, 9, 0, 9, 6, 6, 2, 4, 0, 0, 3, 7, 8, 0, 9, 6, 4, 7, 2, 5, 5, 1, 6, 5, 6, 1, 5, 4, 6, 6, 7, 7, 1, 2, 4, 1, 4, 8, 2, 2, 6, 7, 2, 7, 9, 9, 1, 3, 3, 2, 1, 7, 4, 1, 8, 3, 6, 3, 3, 7, 7, 2, 0, 0, 9, 4, 5, 6, 6, 0, 7, 8, 1, 0, 3, 4, 8, 3, 2, 7, 6, 8, 2, 8, 6, 0, 2, 0, 7, 2, 8, 0, 7, 2, 0, 5, 1, 4, 2, 4, 3, 0, 4, 7, 5, 5, 6, 5, 7, 7, 8, 1, 9, 9, 0, 7, 1, 4, 2, 9, 3, 9, 4, 4, 7, 3, 8, 0, 9, 0, 0, 9, 1, 4, 2, 3, 3, 1, 7, 8, 8, 1, 9, 7, 0, 8, 5, 5, 6, 7, 9, 5, 0, 3, 3, 1, 3, 6, 9, 0, 9, 8, 5, 3, 6, 6, 4, 0, 4, 4, 2, 2, 9, 7, 6, 3, 8, 1, 7, 7, 9, 9, 1, 7, 5, 7, 2, 6, 6, 1, 3, 5, 4, 3, 0, 9, 4, 7, 1, 6, 6, 9, 4, 2, 9, 3, 6, 5, 5, 2, 1, 6, 2, 3, 6, 2, 6, 0, 7, 5, 8, 4, 8, 3, 1, 4, 8, 6, 3, 2, 7, 8, 7, 6, 1, 2, 0, 6, 0, 2, 5, 1, 2, 3, 8, 3, 4, 3, 3, 4, 1, 3, 8, 2, 2, 0, 9, 9, 9, 0, 5, 3, 2, 7, 6, 2, 4, 6, 8, 6, 2, 2, 5, 4, 4, 4, 7, 1, 1, 4, 2, 9, 6, 1, 0, 0, 0, 2, 1, 6, 2, 3, 3, 3, 4, 2, 5, 5, 6, 8, 7, 9, 8, 0, 9, 2, 0, 9, 1, 3, 2, 7, 3, 5, 6, 6, 7, 1, 8, 8, 9, 0, 0, 6, 1, 8, 2, 5, 3, 9, 4, 1, 5, 4, 6, 3, 7, 1, 8, 9, 9, 7, 5, 9, 4, 4, 8, 5, 7, 6, 4, 5, 7, 4, 7, 1, 3, 7, 9, 2, 8, 5, 8, 0, 3, 1, 1, 1, 5, 1, 8, 8, 2, 7, 7, 4, 4, 5, 2, 8, 6, 8, 4, 7, 5, 7, 5, 1, 8, 1, 6, 2, 4, 3, 4, 3, 4, 1, 1, 8, 8, 7, 7, 7, 5, 0, 5, 3, 1, 5, 8, 5, 3, 2, 6, 7, 3, 1, 3, 0, 2, 5, 2, 8, 6, 3, 9, 6, 9, 5, 6, 8, 5, 0, 5, 9, 3, 9, 3, 4, 8, 7, 1, 1, 6, 9, 5, 7, 6, 5, 8, 0, 1, 0, 9, 2, 7, 7, 6, 9, 8, 2, 3, 1, 7, 8, 4, 7, 7, 1, 0, 6, 9, 9, 0, 1, 0, 9, 3, 4, 7, 8, 9, 7, 3, 2, 0, 8, 2, 2, 0, 3, 1, 0, 0, 7, 1, 5, 0, 1, 4, 6, 0, 3, 1, 2, 0, 4, 4, 3, 7, 7, 9, 5, 2, 4, 0, 0, 6, 4, 2, 1, 6, 0, 2, 8, 2, 9, 9, 8, 9, 3, 0, 1, 1, 6, 2, 1, 3, 3, 4, 5, 5, 2, 6, 7, 7, 6, 8, 9, 0, 1, 1, 1, 2, 8, 3, 1, 4, 2, 5, 0, 6, 9, 7, 3, 8, 6, 0, 1, 1, 3, 2, 2, 3, 5, 4, 3, 5, 7, 6, 1, 1, 4, 7, 4, 4, 3, 0, 7, 6, 1, 4, 5, 1, 0, 4, 1, 3, 3, 6, 8, 2, 5, 3, 3, 4, 4, 8, 2, 7, 9, 8, 3, 6, 8, 9, 1, 8, 4, 3, 2, 2, 4, 2, 6, 8, 1, 4, 2, 8, 0, 5, 8, 6, 3, 5, 5, 0, 5, 2, 2, 0, 4, 1, 5, 1, 1, 2, 1, 9, 9, 6, 6, 8, 1, 1, 9, 2, 6, 1, 2, 0, 4, 6, 4, 5, 9, 2, 3, 9, 8, 1, 5, 5, 7, 3, 2, 9, 4, 3, 9, 7, 3, 1, 0, 8, 9, 3, 5, 8, 6, 1, 4, 9, 4, 5, 7, 5, 7, 0, 4, 1, 0, 1, 5, 9, 8, 8, 4, 2, 0, 6, 9, 0, 9, 4, 7, 5, 8, 6, 3, 5, 6, 0, 0, 3, 7, 1, 0, 8, 9, 6, 6, 7, 7, 5, 8, 9, 4, 3, 4, 0, 9, 3, 5, 1, 2, 4, 1, 0, 8, 4, 2, 9, 2, 7, 9, 3, 6, 2, 7, 6, 1, 5, 8, 4, 5, 7, 4, 9, 4, 7, 0, 0, 9, 1, 1, 2, 8, 3, 0, 4, 3, 6, 2, 7, 9, 8, 9, 0, 8, 1, 4, 2, 0, 3, 8, 4, 0, 5, 9, 6, 8, 7, 8, 8, 6, 9, 3, 0, 0, 1, 5, 2, 6, 3, 5, 4, 1, 5, 7, 6, 1, 7, 5, 8, 8, 9, 0, 6, 0, 4, 6, 7, 9, 4, 7, 3, 4, 6, 7, 2, 6, 3, 6, 4, 7, 8, 7, 9, 9, 2, 8, 2, 2, 8, 7, 5, 5, 0, 6, 2, 6, 0, 4, 1, 7, 1, 9, 2, 6, 9, 8, 6, 5, 8, 2, 1, 4, 2, 5, 1, 1, 0, 3, 6, 6, 5, 2, 2, 8, 9, 4, 7, 1, 5, 7, 3, 1, 9, 0, 3, 5, 8, 7, 3, 2, 8, 7, 1, 1, 9, 7, 5, 6, 5, 7, 0, 6, 1, 1, 1, 7, 9, 0, 8, 9, 2, 2, 6, 5, 0, 2, 6, 6, 5, 2, 0, 1, 3, 6, 1, 9, 8, 6, 6, 9, 7, 2, 5, 5, 9, 7, 9, 1, 3, 2, 0, 0, 3, 0, 1, 2, 0, 2, 4, 2, 9, 0, 7, 4, 3, 7, 2, 9, 6, 8, 5, 9, 4, 6, 7, 7, 9, 5, 7, 5, 0, 6, 3, 0, 4, 0, 5, 5, 6, 7, 7, 9, 8, 7, 9, 2, 0, 1, 1, 9, 2, 7, 3, 0, 7, 2, 0, 4, 3, 6, 7, 6, 8, 2, 9, 0, 6, 0, 0, 4, 4, 3, 0, 0, 8, 1, 6, 7, 8, 9, 7, 2, 7, 0, 9, 5, 0, 1, 4, 0, 9, 0, 9, 3, 7, 6, 4, 2, 0, 0, 3, 1, 5, 0, 5, 5, 3, 1, 8, 8, 9, 8, 2, 2, 2, 6, 0, 5, 9, 3, 7, 0, 3, 6, 1, 6, 3, 0, 6, 7, 6, 8, 2, 1, 1, 2, 2, 9, 6, 1, 0, 4, 2, 3, 2, 6, 8, 0, 9, 9, 5, 3, 1, 2, 6, 4, 8, 6, 0, 4, 0, 1, 0, 7, 1, 7, 2, 6, 3, 1, 4, 4, 5, 2, 6, 2, 7, 5, 8, 8, 0, 2, 1, 8, 2, 7, 3, 7, 4, 1, 5, 3, 6, 2, 7, 9, 8, 4, 9, 2, 0, 5, 1, 6, 2, 0, 3, 1, 7, 3, 8, 7, 9, 5, 4, 6, 9, 9, 9, 8, 8, 0, 3, 6, 5, 9, 4, 2, 3, 1, 3, 2, 6, 1, 6, 7, 5, 5, 5, 1, 1, 1, 7, 4, 8, 7, 4, 7, 5, 0, 7, 1, 3, 6, 5, 2, 2, 1, 3, 8, 6, 6, 6, 5, 7, 8, 7, 3, 0, 1, 1, 0, 0, 7, 1, 8, 6, 9, 9, 8, 3, 5, 1, 4, 4, 0, 7, 6, 3, 4, 8, 4, 6, 8, 2, 4, 2, 5, 9, 7, 1, 6, 5, 0, 9, 3, 1, 8, 2, 9, 2, 1, 7, 8, 9, 1, 7, 5, 9, 7, 9, 0, 1, 3, 0, 5, 8, 0, 9, 0, 7, 0, 0, 5, 3, 0, 8, 8, 1, 3, 4, 4, 0, 5, 3, 7, 6, 3, 2, 0, 0, 6, 1, 1, 3, 1, 1, 6, 0, 9, 9, 0, 0, 4, 1, 7, 2, 8, 3, 6, 4, 7, 5, 1, 6, 7, 7, 2, 8, 4, 9, 6, 0, 2, 1, 5, 4, 2, 5, 5, 6, 6, 7, 4, 8, 4, 9, 5, 0, 9, 1, 4, 2, 6, 3, 6, 4, 7, 5, 1, 6, 0, 7, 7, 8, 7, 9, 2, 6, 3, 8, 9, 7, 2, 8, 2, 6, 8, 0, 4, 1, 4, 7, 8, 5, 3, 2, 4, 1, 4, 7, 6, 3, 1, 0, 2, 5, 1, 1, 9, 6, 6, 5, 9, 1, 3, 2, 3, 0, 1, 2, 6, 3, 1, 4, 1, 8, 5, 3, 5, 3, 0, 6, 8, 5, 7, 9, 7, 9, 8, 3, 2, 3, 9, 7, 0, 9, 5, 3, 4, 4, 3, 1, 6, 7, 4, 3, 6, 9, 1, 6, 5, 9, 7, 0, 6, 9, 9, 6, 2, 0, 4, 6, 5, 1, 6, 8, 2, 5, 4, 1, 0, 0, 5, 1, 0, 0, 1, 9, 6, 5, 1, 9, 4, 0, 3, 2, 3, 1, 1, 4, 1, 9, 6, 6, 2, 8, 2, 9, 3, 2, 1, 0, 4, 1, 9, 2, 6, 3, 7, 4, 4, 5, 6, 6, 3, 7, 1, 8, 7, 9, 0, 0, 1, 1, 2, 2, 1, 3, 4, 4, 8, 5, 5, 6, 4, 7, 7, 8, 6, 9, 6, 0, 2, 1, 0, 2, 8, 3, 1, 4, 4, 5, 1, 6, 6, 7, 7, 8, 1, 9, 0, 1, 1, 6, 2, 8, 3, 9, 5, 9, 4, 0, 1, 1, 7, 2, 6, 4, 1, 4, 2, 3, 9, 7, 7, 4, 0, 4, 9, 4, 5, 0, 7, 3, 4, 8, 9, 5, 5, 8, 2, 2, 5, 1, 6, 7, 9, 3, 1, 5, 2, 8, 9, 5, 4, 5, 8, 9, 1, 2, 1, 5, 7, 1, 3, 1, 9, 6, 4, 2, 2, 1, 3, 3, 5, 1, 7, 8, 6, 6, 6, 4, 3, 9, 5, 4, 9, 9, 2, 2, 1, 0, 6, 0, 4, 4, 8, 4, 3, 6, 8, 2, 7, 0, 1, 2, 1, 8, 7, 0, 8, 6, 0, 8, 0, 7, 2, 9, 2, 1, 7, 9, 4, 2, 9, 6, 6, 7, 3, 6, 1, 6, 1, 8, 7, 7, 4, 4, 8, 9, 7, 2, 0, 1, 1, 3, 4, 3, 1, 0, 5, 5, 9, 5, 2, 8, 9, 0, 3, 3, 3, 7, 1, 9, 8, 7, 7, 0, 7, 2, 6, 7, 2, 9, 3, 1, 6, 3, 0, 6, 8, 7, 4, 8, 6, 0, 3, 3, 0, 5, 9, 3, 3, 6, 9, 0, 2, 1, 7, 2, 8, 3, 1, 4, 0, 5, 1, 6, 8, 7, 9, 8, 5, 9, 5, 0, 8, 1, 3, 2, 4, 3, 9, 4, 3, 5, 5, 6, 9, 7, 2, 8, 4, 9, 8, 0, 1, 1, 7, 2, 0, 3, 2, 4, 3, 5, 2, 6, 9, 7, 7, 8, 7, 9, 3, 6, 9, 0, 6, 8, 1, 0, 2, 2, 6, 3, 6, 7, 7, 9, 6, 4, 2, 7, 0, 1, 6, 9, 6, 1, 1, 7, 3, 1, 0, 4, 1, 0, 1, 0, 3, 4, 2, 1, 6, 7, 9, 5, 1, 7, 8, 1, 4, 3, 7, 3, 7, 3, 7, 1, 2, 6, 8, 9, 3, 7, 3, 4, 9, 3, 4, 0, 8, 2, 3, 5, 9, 2, 0, 6, 8, 0, 9, 8, 0, 9, 5, 4, 6, 3, 4, 5, 8, 4, 2, 8, 1, 1, 5, 0, 9, 6, 3, 4, 0, 3, 5, 6, 3, 3, 6, 3, 9, 8, 1, 1, 0, 4, 3, 7, 8, 5, 1, 7, 0, 2, 4, 2, 5, 0, 1, 0, 2, 1, 2, 7, 7, 7, 3, 9, 4, 5, 1, 9, 7, 8, 7, 9, 0, 6, 7, 8, 9, 8, 4, 2, 4, 3, 4, 6, 9, 1, 2, 2, 2, 9, 5, 8, 8, 9, 1, 5, 9, 2, 7, 5, 5, 2, 0, 6, 1, 2, 2, 4, 4, 8, 1, 4, 5, 6, 2, 5, 5, 1, 6, 2, 0, 3, 9, 4, 4, 8, 1, 0, 6, 1, 7, 2, 7, 3, 9, 4, 0, 5, 9, 6, 0, 7, 8, 8, 2, 9, 7, 0, 6, 1, 5, 2, 0, 3, 9, 4, 7, 5, 1, 6, 4, 8, 8, 9, 6, 5, 8, 0, 5, 3, 5, 1, 2, 6, 6, 8, 3, 4, 9, 1, 0, 7, 1, 6, 1, 5, 8, 6, 7, 4, 1, 2, 5, 7, 7, 8, 7, 3, 6, 4, 1, 3, 1, 4, 9, 7, 5, 2, 7, 5, 3, 0, 3, 1, 5, 9, 9, 2, 1, 3, 8, 2, 0, 3, 0, 5, 0, 5, 6, 7, 6, 8, 2, 4, 0, 9, 9, 9, 1, 7, 1, 1, 4, 9, 7, 8, 7, 3, 8, 4, 2, 8, 2, 6, 3, 3, 8, 8, 5, 6, 9, 0, 4, 1, 1, 0, 0, 6, 6, 2, 9, 3, 1, 8, 2, 9, 6, 0, 9, 7, 1, 2, 8, 3, 1, 4, 3, 5, 1, 5, 9, 2, 7, 8, 9, 5, 1, 4, 5, 6, 2, 6, 9, 6, 3, 7, 7, 9, 6, 1, 2, 8, 3, 2, 4, 1, 2, 2, 8, 6, 9, 5, 7, 3, 1, 4, 7, 7, 9, 9, 0, 4, 5, 5, 5, 9, 6, 0, 5, 1, 2, 2, 9, 3, 9, 4, 2, 5, 6, 6, 5, 7, 4, 8, 8, 9, 1, 0, 8, 1, 7, 2, 1, 3, 1, 4, 3, 5, 5, 6, 7, 7, 7, 8, 2, 9, 2, 0, 6, 1, 1, 2, 5, 3, 7, 4, 0, 5, 0, 6, 0, 7, 0, 8, 4, 8, 1, 7, 4, 7, 2, 0, 8, 1, 5, 3, 9, 7, 1, 5, 0, 2, 0, 8, 3, 0, 4, 7, 9, 5, 9, 9, 1, 9, 7, 6, 7, 0, 7, 9, 5, 4, 2, 1, 8, 1, 0, 5, 5, 8, 8, 5, 0, 8, 1, 6, 9, 3, 7, 2, 7, 1, 0, 2, 4, 3, 3, 8, 5, 3, 8, 2, 4, 6, 2, 5, 8, 6, 1, 8, 2, 2, 6, 7, 9, 4, 5, 8, 6, 1, 1, 0, 8, 5, 8, 3, 2, 9, 4, 4, 8, 1, 6, 9, 1, 2, 9, 1, 0, 9, 7, 6, 8, 7, 2, 9, 9, 6, 6, 1, 0, 7, 2, 3, 8, 8, 9, 7, 1, 2, 4, 9, 0, 6, 2, 5, 7, 8, 4, 7, 0, 5, 2, 3, 5, 9, 3, 0, 5, 5, 5, 7, 0, 1, 4, 6, 1, 1, 4, 0, 7, 9, 4, 3, 0, 3, 8, 4, 7, 4, 7, 0, 7, 6, 1, 4, 6, 2, 7, 3, 2, 4, 3, 0, 9, 0, 7, 2, 7, 0, 9, 1, 3, 2, 1, 3, 9, 4, 2, 7, 4, 8, 2, 9, 4, 0, 0, 1, 8, 2, 4, 3, 7, 4, 9, 5, 7, 6, 2, 7, 8, 8, 1, 0, 5, 1, 9, 2, 3, 3, 2, 6, 7, 9, 1, 6, 0, 1, 5, 9, 1, 9, 4, 9, 6, 4, 4, 1, 9, 2, 0, 5, 5, 0, 2, 0, 8, 6, 9, 0, 8, 8, 1, 1, 7, 0, 8, 9, 8, 1, 9, 2, 9, 2, 3, 2, 1, 5, 9, 2, 7, 1, 1, 4, 0, 7, 3, 1, 8, 7, 3, 9, 6, 6, 3, 3, 3, 3, 5, 1, 6, 0, 3, 0, 2, 5, 2, 6, 8, 6, 6, 8, 9, 0, 2, 1, 7, 2, 3, 3, 1, 4, 2, 5, 2, 6, 3, 7, 5, 8, 6, 9, 8, 0, 9, 1, 6, 2, 2, 3, 4, 4, 3, 5, 4, 6, 2, 7, 6, 8, 3, 9, 5, 0, 3, 1, 1, 2, 5, 3, 6, 4, 1, 6, 7, 7, 6, 8, 0, 0, 2, 5, 5, 0, 1, 8, 8, 0, 8, 2, 6, 9, 3, 4, 6, 7, 8, 1, 9, 9, 2, 1, 8, 7, 1, 1, 8, 4, 4, 0, 3, 0, 3, 4, 1, 1, 8, 7, 0, 5, 4, 7, 7, 1, 4, 3, 9, 3, 1, 3, 2, 1, 9, 6, 7, 9, 4, 7, 2, 4, 8, 3, 1, 0, 7, 2, 5, 6, 0, 8, 7, 1, 6, 5, 5, 9, 9, 0, 8, 6, 8, 6, 3, 3, 5, 3, 4, 8, 3, 1, 8, 4, 0, 7, 3, 2, 4, 2, 3, 0, 7, 0, 5, 1, 9, 7, 0, 7, 3, 8, 0, 9, 9, 6, 8, 8, 5, 8, 3, 2, 0, 3, 7, 2, 4, 9, 7, 8, 8, 5, 4, 2, 9, 6, 2, 2, 1, 4, 9, 8, 2, 4, 2, 6, 3, 5, 1, 0, 4, 1, 3, 2, 0, 3, 5, 4, 9, 5, 3, 6, 1, 7, 5, 8, 9, 9, 5, 0, 4, 1, 4, 2, 6, 3, 4, 4, 9, 5, 7, 6, 1, 7, 6, 8, 6, 9, 7, 0, 0, 3, 2, 4, 9, 5, 2, 6, 7, 7, 3, 8, 8, 9, 2, 9, 0, 7, 0, 5, 7, 2, 3, 9, 8, 0, 3, 1, 3, 5, 3, 8, 7, 8, 3, 0, 5, 9, 3, 3, 9, 2, 5, 7, 1, 8, 0, 4, 5, 4, 2, 5, 7, 9, 3, 6, 8, 1, 4, 0, 3, 4, 1, 5, 8, 3, 0, 9, 7, 4, 2, 2, 8, 0, 5, 5, 1, 0, 9, 1, 8, 6, 3, 9, 2, 3, 3, 2, 0, 9, 6, 1, 5, 6, 6, 0, 0, 1, 8, 1, 6, 8, 4, 0, 4, 4, 0, 7, 4, 7, 3, 6, 9, 0, 7, 7, 1, 3, 7, 5, 8, 4, 2, 2, 2, 4, 1, 1, 3, 8, 1, 3, 4, 5, 6, 6, 8, 7, 5, 0, 9, 6, 2, 7, 2, 1, 1, 2, 5, 5, 6, 8, 8, 1, 9, 9, 2, 3, 5, 8, 3, 2, 1, 8, 8, 8, 1, 7, 2, 1, 7, 7, 8, 9, 1, 2, 7, 0, 6, 1, 1, 2, 7, 3, 7, 4, 7, 5, 9, 6, 2, 7, 7, 8, 4, 9, 0, 0, 5, 1, 4, 2, 8, 3, 7, 4, 2, 5, 7, 6, 3, 7, 7, 8, 7, 9, 6, 0, 8, 1, 7, 2, 9, 3, 2, 4, 6, 5, 4, 6, 7, 7, 5, 8, 0, 9, 1, 2, 7, 5, 8, 1, 5, 6, 7, 4, 9, 3, 0, 9, 6, 9, 0, 0, 6, 9, 1, 7, 3, 1, 2, 6, 5, 4, 2, 3, 2, 6, 3, 2, 6, 2, 5, 0, 1, 0, 1, 8, 3, 2, 2, 5, 4, 9, 5, 8, 3, 6, 1, 5, 3, 7, 6, 0, 8, 0, 3, 4, 0, 1, 7, 7, 0, 4, 3, 3, 3, 2, 9, 2, 1, 4, 3, 7, 1, 6, 2, 4, 5, 7, 1, 7, 3, 7, 3, 2, 7, 0, 6, 9, 1, 8, 9, 5, 8, 6, 5, 4, 5, 3, 5, 8, 9, 2, 2, 8, 4, 3, 6, 8, 7, 9, 8, 5, 8, 8, 9, 0, 7, 5, 4, 4, 8, 7, 8, 1, 0, 3, 8, 1, 5, 7, 7, 9, 9, 6, 2, 2, 8, 0, 9, 9, 3, 1, 0, 7, 0, 3, 8, 8, 5, 0, 3, 3, 6, 9, 2, 1, 5, 6, 1, 4, 6, 3, 5, 2, 2, 1, 1, 8, 8, 6, 6, 1, 7, 5, 6, 5, 8, 6, 2, 5, 6, 0, 6, 1, 9, 2, 7, 3, 4, 4, 0, 5, 4, 6, 8, 7, 4, 8, 0, 9, 4, 0, 4, 1, 1, 2, 7, 3, 6, 4, 4, 5, 0, 6, 4, 7, 7, 8, 2, 0, 2, 1, 4, 2, 4, 3, 5, 4, 6, 5, 2, 6, 3, 7, 6, 8, 5, 2, 9, 5, 1, 1, 3, 6, 8, 4, 3, 3, 9, 9, 0, 9, 1, 0, 3, 9, 6, 7, 3, 1, 3, 6, 2, 4, 5, 3, 6, 6, 5, 2, 6, 2, 1, 0, 7, 8, 4, 2, 8, 5, 8, 9, 6, 8, 5, 6, 8, 5, 4, 0, 3, 4, 1, 1, 0, 7, 1, 4, 7, 3, 0, 4, 1, 1, 5, 3, 9, 7, 6, 4, 7, 7, 8, 7, 6, 0, 0, 9, 3, 8, 4, 5, 9, 6, 6, 4, 9, 3, 4, 8, 6, 2, 6, 8, 1, 3, 5, 8, 9, 9, 6, 5, 8, 8, 4, 4, 3, 3, 2, 1, 3, 7, 1, 9, 5, 6, 2, 2, 1, 7, 5, 3, 7, 3, 5, 9, 0, 1, 5, 4, 3, 3, 1, 9, 9, 8, 8, 2, 1, 1, 9, 8, 2, 6, 7, 4, 7, 5, 6, 1, 7, 5, 6, 5, 2, 6, 1, 5, 9, 0, 4, 1, 9, 2, 3, 3, 2, 4, 5, 7, 6, 8, 8, 9, 2, 0, 8, 1, 9, 2, 4, 3, 0, 4, 1, 5, 5, 6, 7, 7, 2, 8, 1, 9, 8, 0, 8, 1, 2, 2, 2, 3, 2, 5, 5, 6, 4, 7, 7, 8, 9, 9, 9, 3, 6, 5, 3, 3, 9, 2, 1, 9, 2, 3, 8, 2, 2, 1, 8, 4, 5, 3, 0, 2, 7, 1, 9, 3, 7, 9, 6, 7, 8, 2, 9, 1, 7, 2, 8, 8, 3, 9, 4, 1, 4, 8, 6, 8, 1, 7, 7, 0, 6, 0, 9, 7, 9, 7, 9, 8, 3, 7, 7, 6, 7, 1, 4, 4, 8, 6, 0, 1, 4, 2, 5, 5, 8, 0, 6, 0, 3, 3, 8, 8, 5, 4, 1, 4, 9, 1, 3, 8, 4, 6, 7, 5, 8, 9, 0, 0, 3, 0, 2, 0, 9, 3, 8, 7, 9, 1, 1, 6, 2, 2, 0, 6, 3, 6, 1, 0, 9, 4, 1, 5, 8, 4, 2, 1, 7, 3, 9, 8, 2, 6, 2, 3, 7, 9, 0, 9, 8, 5, 3, 7, 5, 8, 9, 5, 9, 6, 1, 4, 5, 7, 9, 6, 5, 2, 3, 2, 9, 0, 8, 9, 9, 4, 9, 0, 0, 1, 3, 2, 3, 3, 1, 4, 1, 7, 0, 8, 7, 9, 9, 0, 1, 1, 9, 2, 7, 3, 4, 4, 2, 5, 8, 6, 3, 7, 0, 8, 7, 0, 7, 1, 6, 7, 4, 8, 6, 9, 8, 6, 9, 9, 0, 6, 6, 1, 7, 9, 6, 9, 9, 9, 4, 8, 4, 1, 2, 4, 2, 1, 0, 2, 0, 9, 2, 5, 4, 3, 6, 0, 9, 4, 5, 9, 1, 1, 4, 7, 3, 1, 6, 8, 9, 7, 8, 6, 1, 0, 8, 8, 4, 1, 1, 0, 6, 9, 0, 1, 6, 2, 3, 5, 1, 4, 3, 7, 2, 7, 3, 2, 8, 7, 3, 5, 5, 2, 7, 1, 5, 4, 9, 4, 7, 3, 1, 0, 7, 0, 3, 8, 5, 5, 2, 4, 6, 7, 7, 8, 8, 8, 3, 7, 8, 9, 7, 6, 8, 3, 9, 1, 0, 7, 2, 9, 3, 6, 4, 3, 3, 3, 7, 2, 8, 6, 1, 0, 8, 6, 8, 8, 6, 0, 8, 1, 0, 2, 1, 3, 7, 4, 9, 5, 3, 6, 6, 7, 1, 8, 1, 9, 4, 0, 2, 1, 9, 2, 9, 3, 4, 4, 9, 5, 9, 6, 6, 7, 3, 8, 1, 0, 9, 1, 7, 2, 2, 3, 6, 4, 7, 5, 7, 6, 4, 7, 6, 8, 2, 9, 5, 5, 4, 2, 0, 8, 0, 1, 8, 7, 8, 2, 2, 4, 0, 1, 0, 4, 3, 1, 3, 4, 4, 9, 8, 6, 1, 8, 1, 4, 5, 5, 4, 3, 1, 7, 2, 8, 6, 4, 2, 3, 2, 3, 1, 5, 8, 6, 8, 7, 3, 0, 0, 6, 2, 1, 6, 6, 8, 8, 7, 7, 1, 0, 0, 1, 9, 5, 6, 6, 4, 0, 2, 0, 6, 6, 3, 1, 9, 5, 4, 8, 0, 4, 6, 2, 9, 3, 3, 9, 4, 7, 6, 6, 4, 9, 6, 1, 8, 9, 2, 0, 2, 6, 1, 7, 1, 1, 1, 2, 0, 3, 2, 9, 9, 2, 7, 4, 3, 5, 6, 5, 9, 3, 4, 7, 3, 1, 5, 8, 7, 2, 6, 2, 9, 3, 7, 0, 9, 2, 9, 9, 5, 4, 5, 9, 3, 7, 6, 0, 2, 0, 2, 2, 3, 7, 1, 4, 6, 9, 1, 9, 2, 2, 3, 8, 6, 9, 9, 1, 1, 8, 7, 3, 8, 8, 9, 3, 3, 6, 8, 7, 6, 0, 1, 4, 0, 0, 9, 0, 6, 1, 1, 2, 3, 3, 8, 4, 6, 5, 3, 6, 4, 7, 4, 8, 3, 9, 7, 0, 7, 1, 0, 2, 5, 3, 3, 4, 5, 5, 1, 6, 8, 7, 9, 8, 5, 9, 2, 0, 2, 1, 5, 2, 4, 3, 6, 4, 7, 5, 2, 6, 3, 7, 5, 8, 5, 9, 3, 1, 7, 0, 8, 4, 7, 6, 0, 3, 2, 4, 3, 4, 1, 2, 7, 8, 4, 1, 4, 0, 8, 6, 9, 4, 7, 9, 7, 7, 3, 2, 1, 3, 4, 3, 3, 9, 1, 2, 9, 0, 7, 9, 5, 3, 1, 3, 0, 9, 0, 1, 7, 5, 5, 2, 7, 3, 8, 1, 7, 6, 7, 7, 7, 3, 8, 7, 0, 8, 3, 4, 1, 0, 4, 2, 9, 4, 7, 0, 7, 2, 9, 4, 4, 7, 3, 8, 0, 0, 9, 7, 6, 0, 8, 6, 0, 9, 3, 3, 7, 2, 2, 4, 0, 8, 8, 6, 9, 0, 4, 5, 1, 7, 8, 5, 7, 1, 1, 0, 3, 8, 4, 1, 5, 6, 4, 7, 8, 2, 7, 9, 5, 7, 6, 9, 4, 5, 1, 6, 1, 5, 8, 2, 8, 6, 0, 2, 7, 8, 0, 1, 5, 7, 5, 5, 6, 5, 4, 7, 9, 3, 2, 5, 5, 0, 8, 1, 9, 1, 1, 3, 1, 8, 3, 4, 8, 9, 4, 4, 6, 5, 0, 1, 4, 8, 0, 6, 1, 8, 0, 9, 8, 0, 0, 1, 5, 2, 7, 3, 2, 4, 4, 5, 8, 6, 3, 7, 2, 8, 0, 9, 6, 0, 1, 1, 7, 2, 6, 3, 0, 4, 6, 5, 7, 6, 5, 7, 5, 8, 2, 9, 6, 0, 0, 1, 9, 2, 8, 3, 0, 4, 5, 5, 6, 6, 7, 7, 2, 8, 5, 4, 9, 9, 3, 4, 0, 2, 0, 9, 1, 4, 7, 5, 7, 8, 9, 0, 9, 3, 9, 5, 3, 5, 2, 1, 1, 7, 0, 8, 6, 4, 1, 5, 2, 7, 0, 2, 4, 3, 1, 6, 5, 7, 5, 7, 8, 7, 6, 6, 5, 0, 8, 1, 6, 0, 5, 6, 7, 5, 5, 5, 9, 2, 9, 9, 0, 3, 2, 1, 5, 4, 7, 8, 8, 7, 7, 3, 0, 8, 7, 2, 4, 6, 0, 5, 0, 2, 3, 7, 4, 9, 5, 7, 9, 9, 1, 1, 5, 0, 4, 8, 0, 9, 1, 7, 8, 0, 7, 5, 6, 0, 0, 3, 8, 8, 1, 4, 9, 6, 8, 2, 9, 0, 9, 4, 1, 1, 3, 3, 9, 1, 9, 0, 4, 9, 7, 0, 2, 1, 0, 2, 2, 3, 4, 4, 3, 5, 7, 6, 5, 7, 7, 8, 7, 9, 5, 0, 8, 1, 7, 4, 4, 5, 5, 6, 9, 7, 5, 8, 5, 9, 6, 0, 2, 1, 9, 4, 5, 5, 7, 6, 4, 7, 8, 8, 9, 9, 9, 7, 2, 0, 6, 6, 7, 0, 4, 7, 0, 3, 4, 8, 9, 6, 5, 7, 1, 1, 8, 3, 5, 7, 7, 9, 8, 7, 5, 4, 2, 0, 8, 6, 9, 4, 6, 9, 1, 5, 1, 6, 4, 5, 9, 2, 1, 9, 1, 8, 4, 5, 3, 1, 1, 5, 7, 3, 1, 9, 3, 4, 6, 5, 5, 6, 7, 3, 8, 4, 5, 8, 7, 0, 2, 6, 5, 4, 8, 8, 2, 1, 6, 3, 1, 4, 9, 0, 5, 1, 4, 9, 7, 2, 0, 3, 9, 7, 3, 2, 4, 5, 8, 1, 5, 7, 7, 2, 8, 8, 0, 7, 7, 0, 9, 1, 4, 9, 0, 6, 7, 4, 5, 9, 5, 2, 9, 1, 1, 2, 1, 3, 6, 7, 8, 0, 9, 2, 9, 1, 3, 3, 6, 5, 1, 3, 2, 4, 2, 7, 8, 2, 4, 5, 7, 8, 6, 1, 8, 6, 3, 8, 8, 5, 0, 6, 7, 0, 8, 8, 5, 9, 9, 4, 8, 9, 5, 2, 0, 6, 0, 0, 2, 1, 5, 2, 5, 3, 2, 4, 6, 5, 1, 6, 9, 7, 9, 0, 0, 1, 4, 2, 3, 3, 0, 4, 6, 5, 8, 6, 2, 7, 5, 8, 0, 9, 3, 0, 5, 1, 8, 2, 7, 3, 4, 4, 9, 5, 9, 6, 9, 7, 7, 8, 1, 9, 4, 7, 1, 7, 7, 0, 0, 4, 7, 0, 8, 3, 3, 1, 4, 8, 7, 9, 8, 2, 1, 1, 2, 8, 8, 6, 4, 5, 5, 4, 4, 7, 2, 3, 0, 4, 1, 1, 5, 8, 6, 6, 5, 9, 6, 1, 0, 4, 9, 5, 4, 0, 9, 1, 4, 3, 1, 6, 9, 4, 9, 8, 3, 9, 6, 8, 5, 2, 4, 1, 1, 0, 5, 7, 7, 2, 3, 5, 6, 5, 3, 6, 3, 6, 2, 6, 8, 3, 3, 3, 6, 3, 0, 1, 4, 7, 4, 2, 5, 2, 1, 7, 8, 2, 0, 3, 1, 6, 5, 8, 6, 5, 4, 1, 8, 4, 6, 9, 1, 0, 9, 5, 2, 0, 9, 6, 7, 8, 3, 8, 7, 0, 4, 8, 4, 2, 1, 3, 9, 9, 6, 4, 8, 3, 3, 7, 4, 1, 2, 7, 5, 6, 3, 9, 6, 4, 3, 2, 2, 9, 5, 9, 2, 2, 2, 0, 2, 8, 9, 4, 0, 9, 8, 4, 2, 0, 5, 7, 2, 1, 3, 3, 1, 2, 6, 9, 9, 0, 1, 1, 7, 2, 6, 3, 2, 8, 9, 9, 7, 0, 0, 1, 0, 2, 9, 3, 5, 4, 7, 5, 4, 6, 3, 7, 3, 8, 3, 0, 0, 1, 4, 2, 2, 3, 3, 6, 6, 7, 2, 8, 2, 9, 8, 0, 0, 3, 2, 9, 0, 5, 4, 6, 0, 8, 7, 4, 2, 9, 5, 1, 0, 7, 3, 1, 1, 2, 9, 3, 0, 5, 1, 9, 7, 6, 6, 9, 9, 1, 5, 2, 8, 0, 7, 7, 8, 2, 6, 9, 2, 8, 2, 9, 7, 0, 3, 7, 5, 1, 4, 3, 3, 0, 0, 3, 6, 6, 3, 8, 5, 7, 2, 4, 2, 9, 2, 7, 5, 5, 7, 8, 0, 1, 7, 5, 2, 1, 2, 2, 1, 0, 0, 2, 6, 4, 3, 3, 6, 0, 5, 0, 6, 0, 1, 3, 7, 5, 8, 7, 0, 6, 7, 9, 5, 9, 9, 8, 7, 2, 1, 7, 5, 7, 5, 1, 4, 0, 0, 1, 6, 2, 0, 3, 1, 5, 7, 6, 4, 7, 6, 8, 3, 9, 1, 0, 6, 1, 4, 2, 5, 3, 4, 4, 6, 5, 2, 6, 7, 7, 1, 8, 4, 9, 8, 0, 4, 1, 6, 6, 5, 7, 2, 8, 3, 9, 1, 0, 4, 5, 7, 6, 7, 8, 0, 3, 1, 3, 7, 3, 5, 9, 5, 9, 7, 5, 0, 6, 3, 4, 3, 4, 6, 7, 5, 0, 7, 3, 2, 9, 6, 6, 5, 9, 7, 1, 3, 5, 6, 2, 9, 6, 6, 6, 3, 7, 2, 8, 6, 1, 3, 6, 3, 7, 8, 8, 2, 8, 1, 1, 7, 8, 9, 3, 3, 7, 3, 1, 8, 2, 2, 7, 6, 1, 1, 5, 6, 0, 4, 9, 2, 8, 4, 3, 0, 1, 8, 8, 7, 4, 0, 1, 8, 4, 6, 3, 9, 9, 1, 7, 8, 1, 9, 0, 3, 7, 2, 3, 9, 0, 6, 1, 3, 2, 8, 3, 9, 4, 8, 5, 3, 6, 2, 7, 5, 8, 4, 9, 7, 0, 0, 1, 4, 2, 5, 3, 0, 4, 1, 5, 3, 6, 3, 7, 3, 8, 8, 9, 4, 0, 6, 1, 7, 2, 8, 3, 0, 4, 6, 4, 4, 5, 1, 6, 9, 6, 3, 3, 0, 4, 9, 2, 3, 8, 0, 1, 1, 0, 5, 6, 8, 4, 3, 9, 7, 7, 4, 2, 5, 3, 1, 3, 9, 9, 3, 9, 4, 3, 1, 3, 2, 9, 4, 1, 3, 5, 8, 2, 9, 3, 8, 1, 7, 6, 7, 7, 5, 3, 9, 7, 0, 8, 3, 4, 1, 0, 2, 2, 1, 4, 3, 0, 9, 2, 5, 4, 9, 7, 0, 8, 2, 0, 4, 7, 3, 0, 2, 6, 0, 9, 8, 3, 7, 2, 6, 4, 3, 8, 3, 6, 2, 0, 3, 1, 6, 0, 1, 8, 4, 1, 3, 6, 9, 7, 8, 2, 2, 9, 5, 7, 5, 9, 8, 5, 4, 8, 3, 9, 2, 6, 8, 5, 8, 2, 5, 6, 9, 2, 5, 8, 9, 1, 5, 7, 8, 5, 8, 5, 1, 7, 3, 3, 2, 0, 2, 1, 0, 1, 6, 3, 4, 8, 6, 4, 4, 9, 8, 5, 2, 1, 9, 8, 5, 9, 1, 1, 4, 2, 7, 1, 2, 5, 6, 6, 4, 7, 8, 0, 3, 1, 0, 2, 9, 3, 3, 5, 8, 6, 4, 7, 0, 0, 8, 1, 8, 2, 2, 3, 0, 1, 1, 5, 2, 6, 0, 7, 8, 9, 3, 8, 2, 7, 1, 0, 8, 2, 7, 3, 9, 4, 4, 3, 6, 8, 6, 5, 8, 1, 3, 5, 7, 2, 1, 3, 1, 0, 2, 1, 9, 2, 2, 6, 4, 3, 1, 0, 9, 7, 0, 2, 1, 6, 0, 1, 7, 0, 8, 5, 9, 9, 4, 9, 6, 8, 1, 3, 2, 1, 9, 7, 9, 4, 8, 7, 2, 4, 4, 0, 1, 0, 7, 6, 2, 6, 1, 2, 7, 6, 2, 3, 4, 7, 0, 7, 2, 4, 1, 4, 5, 3, 3, 8, 9, 9, 9, 6, 3, 0, 3, 9, 3, 5, 6, 3, 7, 1, 7, 3, 8, 7, 2, 2, 7, 1, 5, 9, 6, 1, 0, 5, 2, 1, 2, 7, 6, 4, 3, 8, 9, 6, 5, 1, 4, 2, 7, 1, 5, 6, 8, 0, 4, 1, 0, 2, 2, 3, 8, 7, 6, 8, 2, 9, 4, 0, 3, 1, 4, 2, 3, 6, 7, 7, 3, 8, 3, 9, 3, 0, 4, 1, 1, 2, 0, 3, 9, 7, 9, 5, 4, 7, 5, 7, 8, 7, 7, 3, 1, 1, 7, 9, 2, 2, 4, 1, 0, 6, 9, 5, 6, 7, 4, 1, 7, 8, 9, 6, 1, 9, 5, 1, 3, 0, 3, 1, 6, 3, 5, 6, 7, 8, 0, 9, 4, 5, 1, 2, 6, 1, 8, 7, 7, 5, 1, 6, 9, 6, 3, 6, 1, 3, 2, 1, 2, 7, 8, 2, 6, 2, 4, 3, 8, 8, 2, 1, 8, 0, 3, 6, 4, 8, 4, 8, 4, 0, 1, 8, 9, 2, 1, 3, 3, 9, 5, 4, 3, 3, 7, 7, 2, 1, 8, 7, 1, 9, 1, 4, 8, 2, 7, 9, 2, 9, 7, 7, 2, 1, 1, 3, 8, 9, 6, 0, 7, 1, 1, 2, 7, 3, 3, 4, 9, 7, 9, 8, 2, 9, 2, 0, 5, 1, 0, 2, 0, 3, 3, 7, 9, 8, 5, 9, 1, 0, 1, 4, 3, 5, 9, 6, 6, 7, 5, 8, 4, 9, 9, 2, 9, 2, 8, 7, 5, 6, 4, 4, 1, 7, 0, 3, 8, 5, 0, 4, 1, 1, 9, 8, 8, 0, 7, 7, 1, 2, 0, 2, 8, 1, 8, 7, 3, 7, 4, 9, 3, 9, 7, 4, 5, 6, 1, 7, 9, 7, 2, 5, 5, 4, 8, 5, 3, 0, 1, 9, 4, 0, 7, 2, 5, 3, 8, 5, 6, 6, 4, 1, 2, 8, 4, 6, 6, 0, 6, 6, 2, 8, 8, 8, 0, 8, 2, 4, 4, 3, 7, 8, 3, 1, 2, 3, 0, 6, 0, 9, 2, 4, 1, 1, 5, 7, 6, 6, 7, 9, 3, 3, 7, 3, 8, 7, 0, 4, 6, 1, 1, 9, 0, 1, 0, 0, 6, 6, 3, 0, 9, 1, 0, 2, 5, 3, 8, 4, 1, 5, 3, 6, 4, 7, 5, 0, 4, 1, 7, 2, 2, 3, 7, 4, 1, 5, 1, 6, 4, 7, 9, 8, 5, 9, 8, 0, 3, 1, 6, 2, 0, 3, 2, 4, 0, 5, 9, 6, 9, 7, 0, 8, 1, 9, 4, 1, 3, 7, 8, 4, 8, 8, 3, 1, 8, 5, 2, 6, 1, 5, 7, 7, 0, 2, 1, 8, 1, 6, 5, 3, 6, 3, 6, 8, 8, 6, 4, 5, 3, 4, 3, 0, 6, 9, 6, 1, 2, 7, 1, 2, 5, 9, 2, 1, 3, 3, 4, 2, 1, 2, 5, 3, 2, 0, 6, 6, 0, 4, 0, 3, 4, 7, 3, 6, 4, 9, 3, 0, 9, 8, 2, 1, 5, 4, 9, 0, 6, 6, 0, 1, 8, 2, 2, 6, 3, 9, 6, 2, 3, 2, 6, 3, 0, 5, 1, 5, 3, 1, 9, 0, 0, 7, 2, 7, 5, 9, 5, 6, 5, 4, 8, 7, 8, 0, 7, 2, 2, 3, 4, 4, 4, 0, 6, 0, 0, 8, 7, 8, 6, 8, 3, 5, 7, 1, 7, 3, 5, 7, 7, 4, 4, 9, 6, 8, 7, 8, 8, 9, 3, 0, 0, 9, 2, 8, 8, 9, 9, 0, 9, 2, 1, 6, 3, 5, 4, 6, 6, 7, 7, 7, 3, 5, 6, 4, 2, 1, 0, 3, 6, 0, 6, 1, 7, 2, 7, 3, 2, 4, 3, 5, 2, 6, 1, 7, 9, 8, 5, 9, 3, 0, 6, 1, 9, 2, 2, 3, 2, 4, 4, 5, 9, 6, 4, 7, 1, 8, 5, 9, 1, 0, 7, 1, 0, 2, 4, 3, 8, 4, 6, 5, 4, 6, 3, 7, 8, 8, 0, 9, 9, 3, 7, 4, 0, 1, 0, 4, 6, 0, 7, 8, 4, 6, 8, 4, 8, 5, 2, 4, 9, 0, 8, 7, 4, 8, 5, 7, 7, 7, 0, 9, 5, 0, 8, 4, 9, 7, 1, 4, 1, 2, 9, 0, 4, 5, 6, 8, 4, 8, 1, 8, 8, 4, 0, 0, 4, 7, 9, 1, 9, 3, 6, 5, 4, 3, 5, 1, 0, 6, 0, 5, 9, 3, 8, 8, 0, 7, 7, 3, 0, 1, 5, 6, 0, 8, 9, 5, 2, 9, 7, 2, 3, 2, 7, 0, 3, 9, 1, 2, 1, 4, 6, 6, 4, 5, 3, 2, 1, 7, 4, 3, 3, 1, 3, 3, 7, 6, 0, 6, 5, 2, 8, 1, 9, 2, 0, 6, 9, 0, 8, 7, 7, 7, 8, 4, 5, 7, 1, 4, 3, 8, 4, 9, 4, 2, 7, 9, 5, 5, 0, 1, 4, 5, 0, 8, 6, 3, 3, 5, 3, 6, 8, 0, 7, 9, 3, 9, 2, 3, 2, 1, 5, 1, 1, 0, 3, 1, 4, 2, 4, 3, 5, 4, 0, 8, 7, 9, 1, 0, 3, 1, 1, 2, 1, 3, 7, 4, 2, 5, 8, 6, 0, 7, 9, 0, 5, 1, 7, 2, 0, 3, 1, 4, 2, 7, 9, 8, 4, 9, 0, 0, 7, 5, 2, 6, 5, 8, 9, 3, 9, 9, 2, 0, 4, 2, 2, 3, 0, 3, 8, 3, 1, 9, 3, 9, 8, 5, 5, 6, 0, 4, 6, 4, 5, 2, 8, 5, 0, 4, 4, 7, 1, 0, 6, 3, 8, 9, 9, 6, 2, 8, 6, 7, 5, 9, 6, 1, 5, 5, 1, 2, 2, 6, 6, 3, 4, 4, 8, 0, 6, 4, 8, 1, 2, 6, 8, 5, 9, 1, 0, 2, 4, 6, 0, 6, 9, 7, 1, 8, 8, 8, 1, 1, 9, 8, 4, 3, 5, 7, 7, 1, 6, 2, 8, 7, 4, 0, 4, 7, 0, 0, 8, 1, 8, 5, 0, 0, 8, 5, 9, 2, 6, 8, 4, 0, 2, 4, 3, 9, 4, 8, 4, 3, 0, 1, 5, 8, 8, 2, 2, 9, 5, 9, 6, 5, 1, 4, 7, 8, 6, 2, 2, 5, 8, 7, 1, 1, 9, 4, 8, 3, 0, 9, 9, 7, 4, 1, 5, 2, 2, 6, 9, 0, 8, 7, 5, 0, 3, 1, 2, 2, 8, 3, 5, 6, 9, 7, 0, 8, 8, 1, 8, 2, 0, 3, 1, 4, 7, 7, 6, 8, 2, 9, 0, 0, 7, 1, 7, 2, 0, 3, 0, 4, 8, 5, 9, 6, 7, 7, 7, 8, 7, 9, 0, 1, 8, 2, 0, 6, 3, 5, 1, 3, 9, 0, 4, 2, 1, 8, 0, 7, 5, 0, 7, 3, 5, 6, 4, 4, 8, 1, 6, 4, 1, 3, 8, 6, 6, 7, 1, 2, 1, 3, 2, 9, 2, 1, 2, 2, 7, 1, 1, 2, 1, 9, 2, 6, 4, 0, 7, 1, 9, 3, 2, 0, 7, 2, 5, 5, 4, 7, 2, 2, 5, 9, 2, 1, 6, 9, 7, 0, 9, 6, 7, 0, 1, 6, 2, 0, 1, 2, 8, 0, 4, 6, 5, 1, 3, 5, 4, 8, 5, 4, 7, 3, 6, 0, 2, 1, 9, 4, 0, 8, 5, 8, 8, 4, 6, 5, 2, 7, 8, 5, 2, 7, 4, 8, 1, 3, 8, 4, 5, 8, 0, 8, 4, 5, 5, 2, 8, 9, 0, 7, 4, 1, 8, 3, 4, 8, 9, 1, 4, 0, 4, 7, 1, 5, 1, 9, 2, 6, 0, 9, 0, 4, 5, 7, 1, 7, 3, 9, 2, 9, 3, 5, 6, 8, 1, 3, 7, 4, 7, 4, 5, 3, 4, 2, 0, 0, 0, 1, 7, 2, 6, 3, 2, 4, 3, 5, 1, 6, 1, 7, 0, 8, 1, 0, 9, 1, 8, 2, 1, 3, 0, 4, 9, 7, 1, 8, 7, 9, 6, 0, 0, 1, 2, 2, 4, 3, 5, 4, 5, 6, 7, 7, 6, 0, 8, 8, 0, 7, 3, 8, 3, 9, 5, 1, 6, 4, 6, 5, 1, 1, 6, 6, 8, 7, 1, 3, 1, 2, 5, 9, 1, 0, 2, 5, 6, 6, 0, 7, 6, 3, 9, 9, 6, 9, 2, 3, 8, 8, 7, 1, 0, 2, 5, 3, 0, 5, 6, 0, 6, 5, 0, 4, 8, 0, 0, 3, 0, 4, 8, 7, 6, 7, 0, 9, 1, 4, 6, 3, 5, 7, 3, 6, 8, 2, 4, 1, 1, 5, 7, 8, 8, 4, 2, 6, 3, 7, 8, 0, 3, 2, 1, 9, 4, 3, 3, 4, 2, 4, 6, 8, 5, 1, 5, 2, 2, 2, 4, 3, 2, 1, 7, 7, 8, 3, 9, 4, 1, 5, 7, 1, 8, 9, 8, 8, 8, 1, 0, 1, 5, 0, 9, 2, 4, 7, 7, 6, 6, 8, 6, 2, 4, 8, 7, 4, 7, 4, 0, 2, 6, 2, 1, 8, 2, 0, 1, 0, 8, 1, 6, 2, 5, 3, 9, 4, 2, 5, 3, 6, 3, 7, 7, 8, 2, 0, 7, 1, 3, 2, 7, 3, 4, 4, 4, 5, 2, 6, 2, 7, 2, 8, 0, 9, 3, 0, 3, 1, 5, 2, 5, 3, 0, 4, 3, 5, 5, 6, 8, 7, 8, 8, 6, 9, 1, 0, 7, 5, 1, 3, 1, 9, 5, 0, 8, 2, 2, 3, 2, 3, 3, 3, 8, 9, 2, 9, 8, 5, 9, 6, 9, 4, 7, 2, 1, 3, 1, 9, 1, 6, 4, 8, 3, 7, 3, 9, 4, 1, 7, 5, 3, 2, 2, 6, 2, 3, 0, 4, 1, 0, 6, 4, 0, 1, 7, 6, 7, 4, 1, 9, 0, 6, 2, 5, 4, 1, 2, 2, 9, 6, 0, 6, 0, 7, 5, 8, 3, 1, 0, 8, 3, 3, 8, 7, 8, 1, 8, 2, 4, 7, 1, 1, 0, 5, 6, 0, 0, 5, 3, 2, 4, 9, 3, 8, 8, 3, 4, 1, 0, 8, 2, 9, 0, 5, 1, 2, 3, 6, 9, 4, 4, 8, 9, 2, 5, 5, 1, 4, 6, 1, 6, 7, 1, 1, 6, 4, 2, 3, 2, 9, 1, 1, 0, 2, 9, 6, 1, 0, 6, 7, 6, 3, 1, 0, 6, 1, 7, 2, 3, 3, 2, 4, 7, 6, 6, 7, 6, 8, 0, 9, 4, 0, 0, 1, 3, 2, 0, 3, 0, 4, 6, 5, 4, 6, 5, 7, 1, 8, 5, 9, 3, 0, 9, 1, 3, 2, 6, 3, 2, 4, 7, 5, 5, 6, 5, 7, 1, 8, 7, 9, 5, 0, 5, 8, 5, 7, 0, 8, 2, 9, 6, 9, 5, 0, 1, 1, 9, 4, 3, 5, 9, 1, 3, 6, 9, 7, 1, 3, 8, 2, 4, 9, 8, 0, 8, 5, 2, 6, 8, 7, 9, 3, 8, 9, 7, 9, 2, 3, 0, 8, 1, 1, 7, 2, 1, 9, 1, 6, 2, 3, 0, 5, 6, 0, 9, 5, 5, 4, 2, 0, 2, 3, 8, 4, 1, 7, 3, 7, 6, 9, 5, 1, 8, 4, 5, 3, 5, 7, 8, 6, 5, 2, 3, 1, 8, 5, 3, 5, 5, 0, 6, 5, 2, 0, 9, 8, 1, 4, 6, 6, 8, 2, 2, 8, 5, 1, 3, 2, 5, 2, 9, 3, 0, 1, 7, 3, 6, 4, 1, 5, 2, 1, 1, 9, 7, 8, 2, 1, 3, 1, 1, 5, 4, 0, 1, 2, 4, 7, 8, 8, 5, 6, 6, 8, 2, 2, 7, 8, 0, 4, 3, 4, 5, 2, 4, 2, 4, 8, 1, 0, 1, 0, 0, 1, 8, 2, 9, 3, 6, 6, 2, 7, 9, 8, 3, 0, 1, 1, 9, 2, 1, 3, 5, 4, 4, 5, 7, 6, 6, 7, 6, 8, 4, 9, 5, 0, 8, 1, 8, 2, 3, 3, 6, 4, 4, 5, 2, 6, 9, 7, 1, 8, 3, 9, 5, 1, 7, 8, 6, 6, 4, 1, 6, 4, 3, 9, 6, 3, 8, 7, 5, 7, 7, 9, 7, 1, 7, 8, 7, 4, 8, 7, 8, 2, 7, 2, 8, 0, 1, 5, 6, 8, 6, 6, 2, 1, 4, 0, 7, 4, 7, 7, 1, 1, 0, 2, 9, 1, 5, 6, 5, 7, 0, 3, 8, 3, 8, 6, 0, 5, 7, 6, 7, 2, 9, 8, 8, 7, 6, 6, 9, 8, 6, 9, 2, 9, 8, 5, 8, 3, 3, 7, 7, 0, 0, 6, 7, 9, 4, 0, 3, 1, 0, 1, 2, 3, 0, 2, 9, 1, 1, 0, 9, 0, 6, 1, 7, 2, 8, 3, 4, 4, 0, 5, 4, 6, 0, 7, 4, 8, 8, 9, 8, 0, 7, 1, 0, 2, 2, 3, 5, 4, 4, 5, 0, 6, 2, 7, 9, 8, 9, 9, 1, 0, 7, 1, 5, 2, 1, 3, 9, 4, 1, 5, 2, 6, 4, 7, 7, 8, 9, 9, 2, 7, 2, 5, 7, 5, 4, 1, 1, 9, 8, 9, 3, 7, 5, 1, 6, 0, 3, 9, 1, 0, 0, 5, 2, 7, 9, 1, 0, 7, 6, 2, 6, 2, 8, 3, 4, 6, 0, 8, 4, 0, 4, 8, 9, 3, 2, 2, 2, 0, 8, 9, 7, 0, 3, 6, 3, 1, 9, 7, 1, 5, 7, 8, 4, 3, 8, 4, 4, 7, 4, 6, 1, 6, 2, 3, 0, 2, 3, 3, 1, 4, 6, 8, 9, 8, 2, 7, 2, 1, 3, 0, 6, 8, 6, 7, 4, 7, 9, 5, 6, 9, 5, 2, 0, 8, 3, 5, 2, 3, 2, 4, 5, 6, 3, 1, 6, 1, 0, 4, 6, 5, 1, 5, 6, 0, 8, 4, 5, 8, 4, 7, 2, 4, 6, 9, 8, 2, 9, 3, 3, 6, 9, 4, 1, 2, 3, 4, 8, 1, 3, 5, 6, 4, 5, 2, 4, 0, 7, 4, 8, 8, 5, 6, 4, 1, 0, 9, 0, 3, 7, 2, 4, 0, 2, 0, 7, 2, 5, 5, 3, 6, 8, 9, 6, 3, 7, 6, 0, 3, 4, 6, 0, 0, 5, 1, 4, 2, 1, 3, 2, 4, 4, 5, 7, 6, 7, 7, 1, 8, 1, 9, 1, 0, 2, 1, 2, 2, 1, 3, 4, 4, 1, 5, 4, 6, 8, 7, 2, 8, 2, 9, 4, 0, 3, 1, 3, 2, 9, 3, 4, 4, 0, 5, 7, 6, 6, 6, 8, 8, 4, 2, 3, 3, 3, 7, 2, 8, 9, 6, 2, 6, 4, 8, 1, 0, 5, 1, 4, 7, 2, 1, 1, 7, 4, 3, 4, 0, 9, 2, 0, 2, 8, 0, 9, 2, 0, 5, 1, 4, 2, 1, 6, 6, 8, 5, 0, 1, 8, 2, 4, 0, 9, 2, 2, 3, 8, 4, 0, 8, 7, 3, 4, 8, 8, 5, 7, 3, 5, 6, 9, 5, 6, 9, 6, 8, 5, 1, 0, 7, 5, 9, 0, 3, 9, 4, 4, 1, 9, 7, 5, 3, 8, 9, 6, 6, 1, 7, 6, 4, 4, 9, 2, 3, 1, 0, 0, 9, 0, 6, 5, 0, 4, 6, 7, 1, 0, 0, 7, 5, 9, 8, 9, 7, 6, 2, 7, 5, 2, 1, 3, 0, 3, 1, 6, 0, 6, 9, 9, 4, 6, 5, 0, 7, 2, 0, 3, 2, 5, 1, 4, 9, 7, 6, 1, 7, 8, 4, 9, 8, 6, 8, 8, 5, 4, 0, 3, 1, 1, 2, 3, 3, 8, 4, 0, 5, 7, 6, 2, 7, 0, 0, 7, 1, 5, 2, 3, 3, 8, 4, 2, 5, 8, 6, 4, 7, 6, 8, 7, 0, 2, 1, 2, 2, 3, 3, 3, 4, 8, 5, 6, 6, 9, 7, 4, 8, 7, 9, 6, 0, 0, 7, 9, 0, 1, 7, 3, 8, 7, 3, 8, 0, 4, 0, 4, 5, 3, 5, 8, 3, 7, 8, 2, 8, 6, 1, 0, 8, 6, 4, 3, 9, 2, 6, 9, 1, 8, 8, 4, 0, 8, 2, 9, 7, 6, 3, 7, 4, 4, 1, 9, 2, 7, 5, 3, 9, 6, 8, 5, 9, 6, 5, 6, 4, 0, 3, 4, 3, 2, 4, 4, 7, 3, 9, 0, 0, 6, 1, 3, 9, 8, 1, 3, 2, 5, 7, 9, 9, 9, 1, 3, 0, 0, 6, 6, 2, 5, 4, 5, 0, 9, 3, 9, 4, 2, 6, 2, 6, 8, 5, 5, 6, 8, 7, 0, 1, 7, 4, 0, 4, 9, 2, 5, 6, 4, 2, 8, 9, 1, 1, 4, 5, 1, 3, 5, 1, 7, 4, 4, 8, 5, 6, 6, 3, 1, 7, 1, 0, 6, 5, 7, 6, 3, 7, 4, 1, 5, 3, 7, 8, 4, 2, 7, 6, 4, 2, 9, 6, 2, 4, 6, 2, 9, 7, 4, 8, 4, 7, 9, 0, 1, 1, 2, 2, 1, 3, 1, 4, 3, 5, 8, 6, 1, 7, 7, 0, 2, 1, 7, 2, 1, 3, 6, 4, 0, 5, 3, 7, 9, 8, 2, 9, 4, 0, 3, 1, 3, 2, 2, 3, 4, 4, 9, 5, 9, 6, 4, 1, 7, 6, 2, 0, 7, 1, 5, 2, 7, 4, 2, 7, 1, 4, 6, 4, 0, 4, 4, 0, 9, 3, 5, 8, 9, 7, 4, 5, 4, 8, 3, 2, 7, 1, 3, 7, 9, 3, 2, 5, 4, 5, 2, 9, 7, 1, 4, 2, 7, 1, 6, 3, 9, 8, 3, 6, 4, 4, 1, 9, 6, 4, 3, 9, 1, 2, 9, 0, 7, 0, 0, 4, 8, 4, 3, 6, 3, 2, 6, 5, 7, 5, 6, 0, 2, 2, 9, 6, 5, 8, 2, 1, 6, 1, 5, 9, 5, 2, 1, 6, 8, 7, 8, 6, 5, 6, 4, 8, 8, 7, 3, 3, 7, 3, 7, 0, 6, 5, 5, 7, 8, 0, 6, 2, 1, 7, 2, 7, 4, 8, 2, 0, 1, 3, 4, 5, 3, 3, 3, 6, 6, 0, 0, 1, 8, 2, 2, 3, 4, 7, 5, 8, 9, 0, 2, 1, 5, 2, 4, 3, 6, 4, 2, 5, 3, 6, 0, 0, 9, 1, 8, 2, 7, 3, 1, 7, 7, 9, 3, 1, 0, 7, 8, 4, 9, 8, 9, 1, 5, 6, 1, 3, 7, 3, 4, 6, 5, 5, 3, 9, 4, 1, 4, 3, 2, 3, 0, 0, 5, 6, 1, 4, 3, 3, 2, 7, 2, 6, 4, 9, 2, 8, 3, 1, 2, 4, 8, 0, 4, 6, 7, 6, 8, 9, 6, 2, 7, 2, 9, 3, 7, 0, 1, 7, 3, 2, 5, 2, 2, 3, 1, 4, 4, 0, 1, 0, 0, 8, 5, 5, 9, 1, 4, 3, 0, 7, 1, 4, 7, 9, 0, 8, 6, 8, 0, 9, 0, 0, 3, 9, 0, 8, 9, 9, 3, 0, 3, 2, 1, 6, 3, 7, 5, 4, 8, 7, 7, 5, 7, 0, 0, 1, 1, 2, 2, 3, 8, 4, 6, 5, 3, 6, 4, 7, 6, 8, 1, 9, 9, 0, 2, 1, 8, 2, 0, 3, 5, 4, 9, 5, 4, 6, 8, 7, 0, 8, 0, 0, 2, 1, 1, 2, 3, 3, 3, 4, 8, 5, 1, 6, 3, 8, 6, 3, 9, 4, 3, 7, 8, 8, 0, 6, 0, 3, 1, 4, 0, 0, 3, 9, 2, 7, 5, 1, 3, 9, 7, 3, 0, 8, 3, 4, 1, 7, 6, 3, 7, 0, 8, 9, 5, 9, 0, 6, 1, 1, 2, 4, 0, 5, 6, 4, 6, 6, 5, 2, 3, 0, 5, 6, 0, 1, 7, 1, 9, 1, 5, 7, 1, 2, 7, 7, 8, 5, 1, 2, 0, 9, 7, 4, 0, 5, 3, 8, 3, 4, 1, 2, 4, 9, 1, 7, 9, 0, 9, 0, 3, 7, 1, 5, 0, 1, 6, 1, 4, 7, 8, 6, 5, 6, 3, 6, 3, 8, 2, 2, 3, 2, 7, 7, 8, 7, 2, 4, 6, 0, 1, 2, 8, 4, 5, 2, 6, 5, 5, 0, 2, 3, 9, 3, 2, 3, 6, 1, 8, 8, 1, 1, 9, 0, 7, 5, 3, 9, 6, 6, 3, 9, 2, 8, 2, 5, 6, 8, 7, 0, 5, 3, 9, 0, 9, 8, 9, 3, 9, 9, 5, 0, 7, 1, 2, 2, 5, 3, 6, 4, 4, 5, 1, 6, 6, 7, 2, 8, 1, 9, 5, 7, 9, 8, 3, 9, 8, 0, 2, 1, 0, 4, 8, 5, 1, 6, 9, 7, 5, 8, 6, 9, 1, 4, 4, 2, 7, 6, 0, 1, 5, 1, 8, 7, 6, 8, 6, 5, 0, 3, 0, 7, 8, 0, 1, 0, 5, 2, 1, 6, 7, 9, 4, 8, 9, 8, 4, 9, 8, 9, 6, 7, 4, 7, 7, 2, 3, 1, 5, 1, 3, 0, 9, 8, 9, 9, 3, 2, 5, 1, 3, 7, 8, 2, 9, 0, 0, 6, 8, 8, 2, 5, 2, 0, 7, 3, 3, 4, 1, 3, 7, 9, 1, 6, 0, 0, 0, 6, 2, 9, 1, 0, 3, 1, 5, 2, 1, 3, 9, 4, 1, 5, 1, 6, 2, 7, 7, 8, 8, 9, 8, 0, 0, 1, 6, 2, 6, 3, 1, 4, 8, 5, 5, 6, 8, 7, 5, 8, 3, 0, 9, 1, 2, 2, 7, 3, 4, 4, 3, 5, 3, 6, 5, 9, 3, 5, 9, 0, 5, 6, 8, 8, 7, 9, 1, 4, 7, 1, 5, 9, 3, 5, 5, 3, 2, 0, 4, 8, 3, 9, 1, 1, 5, 4, 5, 0, 5, 5, 4, 5, 9, 7, 4, 6, 7, 0, 9, 1, 7, 6, 4, 8, 2, 9, 8, 5, 1, 4, 5, 7, 9, 6, 4, 0, 9, 8, 0, 1, 6, 7, 0, 7, 4, 1, 8, 3, 5, 2, 5, 3, 9, 1, 3, 4, 9, 2, 7, 0, 7, 0, 9, 4, 7, 6, 8, 4, 3, 9, 3, 3, 0, 8, 9, 4, 4, 7, 8, 2, 7, 5, 5, 6, 2, 3, 9, 6, 8, 9, 1, 6, 0, 3, 6, 2, 0, 2, 2, 4, 2, 6, 0, 2, 2, 5, 5, 5, 1, 1, 5, 3, 2, 3, 2, 9, 5, 2, 1, 5, 9, 7, 0, 9, 6, 8, 8, 2, 7, 1, 8, 3, 3, 1, 7, 3, 3, 0, 6, 1, 7, 2, 5, 3, 8, 4, 8, 5, 3, 6, 6, 7, 8, 8, 1, 9, 2, 0, 9, 1, 6, 2, 1, 3, 5, 4, 9, 5, 7, 6, 0, 7, 4, 8, 1, 0, 9, 1, 2, 2, 4, 3, 1, 4, 7, 5, 3, 6, 7, 7, 3, 8, 9, 9, 0, 2, 4, 2, 1, 7, 1, 6, 9, 4, 3, 0, 1, 5, 6, 8, 1, 0, 5, 7, 5, 3, 0, 5, 3, 4, 9, 1, 6, 8, 1, 0, 9, 5, 7, 2, 2, 7, 6, 2, 3, 3, 2, 6, 2, 2, 7, 1, 4, 7, 5, 7, 0, 9, 3, 1, 5, 2, 6, 6, 1, 7, 4, 5, 2, 4, 3, 0, 4, 1, 4, 1, 9, 9, 3, 8, 3, 0, 5, 2, 0, 0, 0, 3, 9, 5, 7, 6, 6, 1, 2, 8, 1, 6, 3, 4, 3, 6, 6, 0, 1, 9, 0, 2, 2, 6, 7, 4, 7, 3, 4, 9, 9, 3, 7, 0, 9, 0, 8, 5, 5, 2, 4, 5, 0, 8, 4, 8, 3, 8, 6, 9, 6, 4, 5, 3, 8, 4, 5, 2, 3, 8, 4, 8, 1, 5, 0, 5, 9, 7, 4, 1, 0, 3, 0, 6, 2, 9, 9, 4, 1, 3, 6, 8, 0, 7, 7, 6, 8, 9, 0, 3, 8, 3, 7, 7, 8, 4, 4, 1, 2, 9, 8, 1, 1, 0, 6, 6, 5, 0, 1, 1, 7, 2, 7, 3, 1, 4, 0, 5, 0, 6, 8, 7, 6, 8, 9, 9, 4, 0, 6, 1, 9, 2, 6, 3, 9, 4, 4, 5, 6, 6, 1, 7, 2, 8, 6, 9, 7, 0, 9, 1, 6, 2, 8, 3, 6, 4, 9, 5, 8, 6, 8, 7, 8, 8, 6, 9, 1, 7, 6, 0, 9, 6, 7, 0, 9, 7, 1, 3, 6, 8, 4, 6, 1, 7, 5, 1, 3, 3, 5, 7, 9, 9, 6, 7, 3, 4, 1, 0, 4, 2, 4, 5, 0, 0, 1, 6, 6, 4, 7, 9, 4, 6, 5, 2, 6, 9, 8, 8, 8, 5, 9, 3, 8, 9, 8, 8, 8, 3, 4, 4, 3, 0, 9, 5, 4, 4, 1, 8, 0, 6, 1, 3, 2, 0, 8, 6, 0, 3, 5, 4, 9, 0, 3, 1, 0, 9, 3, 2, 3, 3, 3, 7, 4, 9, 2, 1, 6, 2, 1, 5, 7, 1, 9, 7, 9, 2, 2, 8, 1, 7, 7, 0, 0, 1, 8, 9, 0, 6, 6, 4, 7, 9, 8, 2, 9, 1, 5, 2, 5, 3, 7, 7, 0, 0, 8, 2, 3, 1, 3, 5, 1, 3, 6, 4, 8, 7, 6, 2, 8, 1, 8, 6, 6, 8, 7, 5, 6, 0, 4, 8, 4, 9, 3, 2, 3, 6, 2, 0, 1, 1, 6, 2, 5, 3, 0, 4, 3, 5, 8, 6, 9, 7, 8, 8, 3, 9, 0, 0, 3, 1, 4, 2, 5, 3, 9, 4, 5, 5, 5, 6, 0, 7, 1, 8, 0, 9, 3, 0, 5, 1, 2, 2, 3, 3, 1, 4, 3, 5, 8, 6, 0, 7, 8, 8, 2, 9, 1, 7, 5, 0, 0, 6, 1, 0, 9, 7, 7, 3, 1, 8, 3, 7, 5, 1, 2, 3, 7, 7, 3, 9, 3, 7, 7, 4, 3, 0, 7, 2, 7, 5, 9, 0, 9, 6, 4, 4, 0, 9, 7, 8, 8, 5, 1, 1, 5, 5, 1, 3, 6, 3, 1, 4, 5, 0, 9, 5, 8, 4, 3, 8, 9, 6, 4, 3, 6, 4, 5, 8, 5, 0, 0, 6, 7, 4, 6, 8, 5, 3, 4, 4, 0, 0, 9, 1, 7, 9, 7, 2, 8, 7, 0, 9, 2, 1, 8, 2, 4, 5, 2, 1, 2, 7, 5, 2, 9, 8, 5, 7, 9, 0, 7, 1, 4, 9, 7, 6, 3, 4, 1, 9, 2, 2, 0, 1, 2, 2, 0, 3, 1, 7, 5, 0, 4, 2, 7, 1, 9, 3, 0, 1, 6, 2, 2, 5, 1, 8, 3, 1, 4, 6, 2, 8, 6, 5, 2, 6, 4, 0, 8, 8, 8, 9, 3, 4, 0, 9, 7, 2, 9, 0, 8, 1, 0, 2, 9, 3, 8, 4, 8, 5, 0, 8, 7, 9, 2, 0, 5, 1, 0, 2, 9, 3, 2, 4, 8, 5, 1, 6, 8, 7, 3, 8, 6, 9, 9, 0, 3, 1, 9, 2, 4, 3, 0, 4, 2, 5, 5, 8, 1, 5, 5, 2, 2, 1, 9, 7, 6, 2, 1, 4, 6, 1, 0, 4, 6, 1, 6, 4, 5, 9, 6, 6, 8, 8, 6, 4, 1, 5, 5, 3, 8, 7, 4, 8, 1, 4, 6, 3, 6, 3, 7, 5, 4, 0, 6, 6, 7, 1, 6, 6, 5, 8, 8, 7, 0, 0, 0, 1, 1, 5, 8, 6, 4, 0, 0, 8, 2, 5, 2, 0, 3, 6, 1, 1, 7, 5, 5, 8, 1, 4, 0, 7, 4, 6, 3, 9, 8, 1, 5, 9, 7, 7, 6, 1, 7, 2, 6, 3, 3, 4, 2, 5, 2, 5, 1, 3, 3, 7, 1, 3, 0, 1, 9, 8, 3, 2, 5, 2, 8, 3, 4, 2, 0, 7, 9, 4, 2, 9, 8, 9, 4, 2, 7, 8, 7, 1, 9, 8, 4, 3, 8, 8, 2, 3, 5, 6, 2, 7, 2, 0, 9, 4, 3, 0, 3, 0, 7, 1, 7, 2, 5, 3, 2, 4, 8, 5, 8, 6, 7, 7, 2, 8, 9, 9, 2, 0, 0, 1, 9, 2, 9, 3, 2, 4, 9, 5, 7, 6, 8, 7, 5, 8, 5, 9, 5, 0, 3, 1, 1, 2, 0, 3, 6, 4, 5, 5, 6, 6, 5, 7, 9, 8, 5, 9, 1, 1, 8, 8, 7, 6, 7, 7, 7, 1, 9, 1, 5, 4, 2, 3, 0, 7, 9, 9, 0, 3, 6, 6, 2, 0, 2, 3, 9, 6, 6, 4, 0, 8, 7, 6, 3, 0, 2, 1, 0, 1, 1, 5, 9, 9, 3, 4, 6, 3, 1, 0, 2, 4, 1, 6, 4, 9, 4, 1, 5, 7, 1, 9, 0, 5, 9, 1, 6, 1, 4, 9, 8, 8, 0, 6, 1, 6, 6, 9, 7, 8, 6, 8, 7, 8, 7, 2, 0, 7, 7, 4, 6, 5, 9, 8, 7, 3, 8, 5, 6, 4, 6, 7, 3, 6, 7, 5, 9, 2, 2, 2, 8, 2, 8, 7, 5, 7, 3, 1, 9, 0, 7, 1, 6, 2, 1, 3, 4, 4, 1, 5, 7, 6, 3, 7, 0, 8, 5, 9, 1, 0, 0, 1, 6, 2, 6, 3, 3, 4, 6, 5, 3, 6, 7, 7, 0, 8, 3, 9, 4, 0, 3, 1, 1, 2, 5, 3, 1, 4, 0, 5, 3, 6, 2, 7, 3, 8, 2, 9, 0, 3, 8, 2, 7, 9, 0, 3, 3, 2, 7, 1, 4, 4, 3, 5, 7, 5, 2, 2, 8, 3, 0, 2, 7, 1, 7, 3, 8, 9, 4, 7, 7, 2, 0, 1, 7, 1, 0, 8, 8, 8, 1, 7, 9, 8, 8, 1, 2, 0, 4, 0, 9, 6, 9, 7, 0, 7, 4, 5, 4, 0, 3, 6, 9, 1, 7, 1, 9, 2, 3, 5, 5, 0, 9, 7, 0, 0, 4, 4, 1, 4, 5, 1, 0, 8, 3, 6, 4, 0, 8, 0, 1, 0, 7, 3, 2, 7, 6, 1, 7, 6, 7, 4, 5, 2, 7, 6, 4, 4, 8, 5, 7, 4, 9, 1, 7, 3, 5, 8, 7, 6, 2, 3, 3, 9, 8, 9, 6, 5, 4, 9, 2, 3, 7, 7, 8, 8, 3, 5, 0, 6, 1, 4, 1, 7, 4, 6, 3, 2, 2, 2, 1, 0, 0, 9, 5, 4, 7, 0, 8, 1, 5, 2, 9, 3, 8, 4, 1, 5, 7, 6, 9, 7, 3, 8, 5, 9, 4, 0, 0, 1, 0, 2, 6, 3, 3, 4, 9, 5, 8, 6, 8, 7, 7, 8, 8, 9, 7, 0, 9, 1, 4, 2, 8, 3, 7, 4, 5, 5, 7, 6, 7, 7, 4, 8, 8, 9, 0, 1, 1, 8, 1, 6, 9, 7, 9, 1, 3, 1, 7, 4, 9, 3, 4, 7, 7, 7, 1, 8, 8, 9, 0, 3, 2, 6, 2, 0, 2, 3, 8, 6, 6, 4, 3, 8, 8, 4, 0, 5, 0, 7, 3, 5, 6, 6, 5, 0, 7, 3, 2, 9, 9, 2, 8, 8, 8, 3, 6, 1, 9, 1, 1, 5, 1, 9, 5, 4, 2, 3, 5, 0, 3, 4, 2, 4, 4, 0, 8, 9, 3, 6, 4, 9, 8, 2, 3, 2, 6, 1, 5, 7, 9, 9, 7, 5, 9, 1, 0, 1, 4, 9, 0, 8, 7, 6, 7, 6, 5, 9, 5, 0, 7, 0, 8, 0, 7, 1, 7, 8, 0, 4, 6, 6, 4, 8, 0, 8, 9, 2, 9, 6, 2, 3, 7, 2, 8, 4, 8, 0, 4, 9, 8, 0, 3, 3, 9, 7, 0, 4, 4, 5, 2, 8, 5, 3, 7, 5, 7, 8, 0, 5, 4, 4, 0, 7, 6, 6, 2, 2, 7, 2, 4, 7, 5, 7, 5, 0, 5, 5, 4, 1, 6, 5, 1, 3, 4, 0, 3, 1, 6, 2, 5, 3, 4, 4, 7, 5, 6, 6, 3, 7, 1, 8, 5, 9, 8, 0, 4, 1, 2, 2, 6, 3, 6, 4, 0, 5, 6, 6, 6, 7, 6, 8, 8, 9, 8, 0, 5, 1, 2, 2, 7, 3, 0, 4, 8, 5, 1, 6, 3, 7, 9, 8, 1, 5, 0, 2, 1, 8, 6, 1, 8, 7, 9, 2, 5, 4, 6, 1, 2, 4, 8, 1, 7, 4, 4, 9, 6, 6, 2, 8, 7, 5, 3, 3, 0, 7, 0, 8, 1, 3, 9, 3, 9, 5, 3, 6, 6, 7, 0, 0, 6, 6, 4, 1, 8, 6, 3, 8, 8, 7, 0, 0, 5, 1, 5, 5, 7, 6, 5, 0, 7, 8, 7, 5, 8, 0, 2, 6, 6, 1, 8, 5, 9, 8, 6, 4, 9, 2, 6, 3, 0, 9, 3, 7, 5, 6, 7, 9, 6, 1, 2, 9, 7, 0, 3, 6, 3, 7, 6, 1, 1, 2, 2, 3, 1, 9, 0, 2, 1, 4, 2, 5, 9, 5, 1, 3, 1, 7, 7, 5, 7, 3, 5, 1, 1, 8, 1, 2, 7, 2, 6, 3, 5, 0, 9, 2, 8, 9, 3, 4, 2, 9, 9, 7, 9, 0, 7, 0, 8, 2, 9, 7, 9, 4, 1, 9, 6, 9, 0, 2, 4, 8, 6, 1, 4, 5, 1, 6, 2, 9, 5, 8, 8, 3, 2, 8, 3, 3, 0, 6, 6, 7, 4, 0, 6, 4, 5, 0, 6, 0, 2, 1, 9, 2, 7, 3, 7, 4, 0, 5, 3, 6, 2, 7, 9, 8, 5, 9, 2, 0, 7, 1, 4, 2, 9, 3, 8, 4, 2, 5, 2, 6, 6, 7, 6, 8, 1, 9, 8, 0, 8, 1, 1, 2, 5, 3, 6, 4, 4, 5, 0, 6, 2, 7, 4, 0, 3, 6, 9, 4, 6, 7, 5, 4, 4, 3, 6, 6, 2, 2, 6, 3, 2, 4, 7, 8, 3, 7, 9, 8, 1, 6, 4, 9, 1, 8, 9, 3, 5, 2, 8, 2, 4, 4, 1, 8, 2, 5, 6, 6, 9, 5, 8, 0, 6, 2, 5, 0, 2, 1, 5, 1, 1, 2, 5, 6, 8, 8, 2, 1, 1, 2, 7, 0, 8, 6, 3, 9, 0, 3, 2, 9, 5, 3, 5, 7, 7, 1, 3, 8, 9, 3, 1, 8, 0, 5, 3, 0, 6, 1, 4, 1, 2, 9, 1, 8, 2, 2, 6, 0, 3, 4, 5, 5, 5, 5, 9, 0, 3, 3, 5, 1, 7, 8, 6, 6, 7, 9, 2, 0, 2, 3, 9, 1, 4, 0, 3, 4, 0, 7, 4, 5, 5, 4, 0, 7, 0, 9, 0, 7, 8, 0, 7, 1, 0, 2, 1, 3, 4, 7, 9, 8, 9, 9, 5, 0, 8, 1, 3, 2, 8, 3, 5, 4, 5, 5, 7, 6, 7, 7, 4, 8, 7, 9, 8, 0, 0, 1, 4, 2, 2, 3, 6, 4, 5, 5, 1, 6, 8, 7, 8, 8, 1, 0, 2, 7, 5, 5, 1, 0, 3, 8, 0, 4, 4, 1, 3, 8, 2, 8, 1, 1, 4, 3, 8, 1, 8, 8, 1, 3, 9, 7, 6, 9, 7, 3, 7, 0, 3, 9, 6, 4, 2, 4, 6, 0, 4, 7, 5, 4, 9, 2, 1, 8, 3, 7, 1, 2, 9, 4, 3, 7, 9, 8, 4, 9, 3, 3, 8, 1, 5, 4, 1, 6, 8, 5, 9, 2, 7, 2, 0, 2, 4, 5, 8, 6, 4, 7, 8, 8, 3, 7, 5, 5, 7, 1, 2, 6, 0, 4, 0, 9, 9, 2, 7, 9, 2, 3, 7, 5, 5, 3, 0, 6, 5, 6, 7, 0, 3, 0, 6, 2, 1, 5, 6, 6, 2, 4, 7, 9, 7, 2, 8, 7, 3, 4, 2, 9, 9, 5, 1, 0, 3, 2, 4, 2, 5, 3, 0, 6, 9, 1, 1, 8, 9, 3, 0, 8, 3, 0, 5, 3, 1, 5, 8, 0, 1, 0, 0, 6, 8, 1, 7, 6, 6, 9, 1, 5, 1, 3, 9, 9, 6, 4, 0, 5, 6, 8, 2, 6, 8, 7, 8, 1, 4, 1, 6, 7, 1, 0, 8, 1, 1, 2, 1, 3, 5, 4, 1, 7, 8, 8, 7, 9, 9, 0, 3, 1, 3, 2, 6, 3, 6, 4, 3, 0, 5, 1, 5, 2, 7, 3, 4, 7, 0, 8, 3, 9, 2, 1, 1, 5, 5, 9, 7, 6, 0, 9, 4, 3, 0, 5, 2, 0, 3, 0, 1, 7, 9, 9, 4, 6, 2, 1, 2, 6, 7, 7, 9, 7, 6, 9, 2, 2, 0, 4, 6, 8, 4, 8, 3, 0, 7, 6, 3, 4, 7, 1, 3, 2, 5, 8, 5, 7, 1, 1, 7, 1, 7, 0, 9, 7, 0, 6, 9, 0, 2, 1, 2, 2, 5, 3, 5, 4, 6, 5, 7, 6, 6, 7, 4, 8, 0, 9, 0, 1, 6, 2, 2, 3, 5, 4, 6, 5, 9, 6, 7, 7, 8, 8, 1, 0, 4, 1, 2, 2, 0, 3, 0, 4, 9, 5, 9, 6, 1, 7, 9, 8, 0, 9, 3, 8, 2, 4, 1, 0, 4, 0, 1, 7, 8, 2, 3, 6, 1, 5, 7, 5, 9, 3, 4, 7, 1, 6, 5, 6, 5, 4, 1, 3, 9, 2, 3, 6, 4, 6, 0, 4, 1, 4, 8, 3, 6, 8, 5, 8, 9, 3, 0, 0, 8, 1, 8, 4, 0, 5, 8, 6, 3, 4, 3, 7, 7, 8, 9, 0, 8, 3, 4, 1, 5, 9, 0, 0, 5, 9, 2, 1, 0, 2, 0, 7, 7, 0, 9, 1, 5, 3, 9, 8, 7, 2, 5, 9, 1, 2, 0, 7, 6, 7, 9, 9, 1, 4, 4, 2, 4, 5, 4, 8, 3, 6, 8, 5, 0, 9, 9, 9, 2, 1, 1, 1, 1, 7, 5, 6, 2, 9, 1, 1, 2, 3, 9, 2, 6, 3, 1, 4, 3, 3, 6, 1, 1, 9, 4, 3, 3, 6, 5, 8, 8, 7, 1, 0, 3, 1, 0, 0, 8, 5, 2, 8, 4, 2, 3, 7, 9, 7, 2, 0, 2, 1, 6, 2, 4, 3, 1, 4, 1, 5, 6, 6, 2, 7, 4, 8, 6, 9, 0, 0, 8, 1, 3, 2, 6, 3, 7, 4, 0, 5, 2, 6, 4, 7, 1, 8, 3, 9, 4, 0, 1, 1, 5, 2, 1, 3, 2, 4, 5, 5, 7, 6, 9, 7, 3, 8, 7, 9, 8, 8, 0, 7, 6, 4, 5, 7, 3, 7, 9, 3, 7, 9, 6, 8, 7, 8, 7, 3, 2, 1, 7, 5, 1, 8, 6, 2, 8, 7, 1, 4, 9, 2, 6, 6, 6, 1, 9, 5, 0, 5, 9, 8, 2, 6, 6, 4, 6, 4, 6, 4, 0, 1, 4, 8, 7, 7, 0, 5, 7, 5, 1, 1, 4, 8, 6, 9, 8, 1, 9, 3, 5, 6, 6, 3, 6, 3, 9, 2, 2, 2, 2, 6, 1, 9, 0, 9, 9, 6, 0, 5, 6, 5, 1, 3, 4, 3, 4, 8, 7, 1, 9, 6, 4, 8, 2, 1, 9, 9, 6, 7, 4, 6, 2, 8, 6, 3, 1, 7, 7, 4, 3, 7, 8, 0, 7, 9, 0, 0, 6, 0, 4, 3, 2, 7, 4, 9, 7, 3, 5, 0, 5, 2, 8, 0, 1, 1, 1, 0, 9, 1, 6, 0, 1, 4, 1, 0, 6, 1, 0, 0, 2, 4, 8, 7, 2, 9, 3, 2, 9, 0, 6, 6, 4, 2, 7, 6, 9, 2, 1, 2, 5, 9, 4, 9, 1, 0, 2, 1, 4, 2, 2, 3, 8, 4, 3, 5, 7, 6, 1, 7, 7, 8, 9, 0, 6, 1, 3, 2, 6, 3, 7, 4, 4, 5, 2, 6, 5, 7, 6, 8, 3, 0, 3, 1, 2, 2, 0, 3, 0, 8, 3, 7, 3, 4, 4, 7, 5, 7, 4, 9, 1, 8, 9, 3, 9, 1, 0, 5, 9, 8, 0, 4, 8, 2, 6, 6, 2, 4, 0, 4, 7, 1, 7, 8, 4, 7, 7, 5, 1, 5, 3, 1, 6, 9, 7, 1, 8, 3, 4, 6, 7, 3, 7, 3, 6, 2, 4, 2, 1, 6, 7, 9, 2, 9, 8, 6, 0, 5, 6, 5, 9, 3, 9, 3, 2, 8, 5, 1, 5, 7, 1, 6, 2, 8, 2, 3, 7, 7, 6, 4, 3, 7, 5, 0, 3, 9, 2, 0, 5, 0, 9, 2, 2, 7, 0, 9, 6, 1, 8, 0, 3, 1, 2, 0, 9, 4, 3, 0, 3, 1, 6, 0, 1, 4, 7, 7, 5, 9, 3, 2, 8, 0, 0, 6, 2, 2, 0, 6, 4, 2, 2, 2, 7, 9, 6, 9, 9, 0, 8, 1, 1, 2, 4, 3, 1, 4, 6, 5, 6, 6, 8, 7, 8, 8, 3, 0, 7, 1, 1, 2, 5, 3, 1, 4, 2, 5, 4, 6, 1, 7, 6, 8, 1, 9, 8, 0, 7, 1, 1, 2, 8, 3, 8, 4, 2, 5, 5, 6, 2, 7, 8, 8, 5, 9, 3, 8, 1, 3, 6, 4, 9, 7, 6, 8, 5, 6, 1, 3, 6, 4, 4, 0, 3, 9, 3, 7, 7, 1, 0, 9, 0, 3, 8, 8, 0, 4, 3, 7, 2, 3, 3, 0, 2, 9, 8, 4, 6, 5, 9, 4, 8, 6, 7, 2, 8, 0, 2, 6, 4, 2, 7, 1, 5, 1, 7, 1, 3, 1, 8, 7, 5, 2, 3, 4, 3, 2, 6, 9, 0, 4, 8, 5, 2, 8, 1, 4, 6, 2, 4, 9, 1, 7, 7, 0, 3, 0, 4, 7, 7, 5, 5, 1, 8, 7, 1, 6, 8, 6, 2, 6, 9, 8, 1, 2, 0, 5, 1, 2, 1, 2, 9, 7, 9, 7, 5, 4, 2, 0, 8, 2, 0, 4, 4, 2, 2, 3, 8, 3, 0, 3, 1, 1, 3, 8, 9, 9, 5, 6, 3, 1, 5, 0, 4, 5, 5, 9, 2, 6, 1, 9, 7, 8, 4, 5, 8, 8, 7, 5, 6, 5, 9, 8, 2, 0, 7, 3, 2, 0, 4, 8, 1, 6, 8, 3, 3, 0, 5, 1, 2, 2, 8, 3, 8, 4, 7, 6, 5, 7, 1, 8, 5, 0, 7, 1, 3, 2, 6, 3, 3, 4, 8, 6, 8, 7, 5, 8, 0, 0, 0, 1, 5, 2, 5, 3, 0, 4, 9, 6, 8, 7, 4, 8, 2, 8, 4, 1, 3, 7, 2, 2, 1, 4, 9, 1, 4, 4, 9, 1, 6, 4, 8, 9, 5, 6, 9, 8, 3, 4, 3, 7, 1, 8, 1, 4, 7, 3, 9, 3, 1, 6, 8, 7, 5, 0, 0, 6, 1, 1, 1, 6, 1, 8, 3, 7, 8, 0, 8, 1, 7, 0, 9, 8, 4, 5, 1, 0, 9, 6, 6, 1, 5, 5, 9, 8, 9, 4, 1, 2, 8, 3, 7, 9, 0, 7, 7, 6, 9, 9, 2, 0, 6, 6, 4, 3, 2, 3, 4, 7, 6, 5, 6, 3, 7, 1, 7, 8, 8, 2, 9, 2, 8, 3, 7, 0, 5, 2, 3, 9, 8, 4, 9, 9, 3, 7, 4, 0, 0, 0, 7, 2, 4, 7, 3, 4, 2, 9, 2, 9, 5, 2, 0, 8, 5, 1, 7, 5, 9, 6, 4, 9, 9, 8, 3, 3, 2, 8, 8, 3, 4, 6, 0, 7, 5, 0, 8, 4, 5, 0, 0, 0, 4, 1, 7, 2, 1, 3, 5, 4, 1, 5, 1, 6, 8, 7, 1, 8, 5, 9, 6, 0, 6, 1, 2, 2, 9, 3, 1, 4, 0, 5, 1, 6, 3, 7, 7, 8, 6, 9, 7, 0, 2, 1, 9, 2, 0, 3, 4, 4, 1, 9, 0, 1, 5, 0, 0, 0, 5, 3, 3, 6, 0, 1, 4, 4, 4, 3, 2, 2, 7, 9, 9, 1, 7, 2, 3, 1, 3, 2, 4, 9, 0, 0, 3, 1, 4, 3, 9, 0, 2, 6, 2, 2, 7, 9, 1, 1, 9, 9, 6, 0, 8, 0, 3, 0, 0, 1, 6, 0, 5, 1, 5, 4, 3, 5, 5, 7, 6, 8, 7, 3, 8, 4, 6, 7, 0, 1, 4, 1, 5, 0, 2, 7, 0, 5, 2, 9, 1, 9, 9, 4, 8, 7, 9, 5, 0, 8, 4, 3, 1, 4, 4, 4, 4, 3, 0, 2, 9, 3, 4, 4, 0, 5, 8, 6, 8, 7, 5, 1, 1, 0, 5, 1, 6, 2, 3, 3, 4, 4, 7, 5, 3, 6, 3, 7, 1, 8, 8, 0, 3, 1, 7, 2, 4, 3, 2, 4, 9, 5, 1, 6, 2, 7, 0, 0, 2, 9, 8, 5, 8, 0, 7, 9, 2, 8, 3, 9, 6, 8, 1, 4, 8, 1, 2, 7, 0, 7, 6, 3, 4, 5, 9, 1, 9, 0, 6, 0, 0, 0, 5, 1, 6, 2, 3, 6, 9, 3, 4, 3, 7, 7, 9, 4, 5, 6, 3, 6, 8, 6, 3, 4, 3, 9, 0, 1, 4, 9, 3, 5, 5, 8, 3, 2, 5, 0, 8, 0, 4, 1, 6, 7, 8, 6, 4, 3, 3, 2, 3, 1, 6, 7, 5, 3, 9, 1, 1, 3, 4, 9, 5, 1, 7, 7, 4, 6, 1, 8, 6, 4, 2, 3, 1, 1, 7, 4, 7, 0, 9, 5, 4, 3, 5, 6, 4, 9, 7, 6, 5, 1, 2, 7, 3, 4, 0, 4, 5, 7, 8, 2, 5, 2, 8, 5, 5, 7, 2, 9, 6, 5, 8, 4, 2, 8, 6, 8, 4, 4, 2, 0, 2, 8, 8, 9, 1, 8, 1, 0, 7, 1, 2, 2, 0, 3, 8, 4, 4, 5, 9, 6, 0, 7, 9, 8, 9, 9, 0, 0, 8, 1, 3, 2, 5, 3, 2, 4, 7, 5, 5, 6, 9, 7, 9, 8, 7, 9, 3, 0, 6, 1, 2, 2, 4, 3, 3, 4, 1, 5, 3, 6, 5, 7, 2, 8, 3, 9, 3, 7, 1, 2, 8, 9, 8, 4, 5, 2, 0, 9, 9, 8, 4, 4, 3, 5, 2, 8, 2, 8, 1, 0, 2, 3, 1, 5, 9, 4, 6, 3, 8, 3, 3, 5, 4, 1, 2, 7, 9, 8, 7, 4, 4, 5, 7, 7, 2, 2, 8, 6, 4, 6, 9, 7, 1, 7, 8, 7, 9, 0, 8, 1, 0, 0, 2, 1, 1, 6, 5, 5, 5, 5, 6, 2, 0, 9, 5, 3, 1, 1, 8, 4, 4, 8, 9, 8, 5, 7, 0, 3, 1, 8, 6, 2, 4, 9, 5, 1, 1, 2, 5, 6, 6, 5, 6, 9, 7, 1, 4, 2, 7, 2, 3, 7, 6, 9, 1, 7, 5, 9, 3, 9, 8, 1, 4, 0, 7, 9, 8, 7, 4, 0, 7, 5, 8, 0, 2, 3, 8, 8, 7, 4, 9, 6, 1, 1, 8, 4, 3, 3, 2, 6, 2, 2, 0, 0, 9, 4, 2, 8, 7, 1, 4, 3, 2, 1, 6, 0, 0, 9, 1, 0, 4, 1, 6, 2, 4, 3, 1, 4, 8, 5, 1, 6, 2, 7, 4, 8, 4, 9, 0, 0, 6, 1, 5, 2, 5, 3, 0, 4, 2, 5, 0, 6, 1, 7, 0, 8, 0, 9, 0, 0, 3, 1, 0, 2, 5, 3, 7, 4, 5, 5, 9, 6, 9, 9, 8, 8, 3, 4, 7, 0, 3, 0, 3, 7, 7, 2, 9, 4, 1, 2, 5, 6, 8, 5, 2, 5, 4, 3, 9, 7, 5, 8, 1, 6, 0, 6, 2, 4, 7, 3, 4, 2, 4, 6, 5, 6, 0, 3, 8, 8, 9, 8, 5, 3, 5, 0, 0, 1, 8, 4, 3, 4, 0, 7, 0, 3, 3, 5, 3, 4, 6, 1, 3, 9, 7, 1, 5, 2, 9, 1, 3, 3, 8, 9, 6, 2, 8, 7, 9, 7, 9, 9, 8, 4, 4, 2, 5, 5, 4, 8, 9, 6, 9, 5, 2, 5, 8, 9, 8, 9, 2, 1, 3, 1, 3, 5, 9, 7, 7, 6, 6, 9, 1, 1, 7, 3, 3, 2, 9, 3, 2, 1, 0, 9, 8, 0, 3, 9, 6, 1, 3, 0, 2, 5, 5, 8, 1, 2, 7, 7, 9, 7, 7, 0, 0, 1, 0, 2, 7, 3, 0, 4, 2, 5, 4, 6, 7, 7, 4, 8, 7, 9, 8, 0, 5, 1, 6, 2, 3, 3, 2, 4, 4, 5, 8, 6, 2, 7, 8, 8, 9, 9, 3, 0, 5, 1, 9, 2, 9, 3, 7, 4, 6, 5, 7, 6, 9, 7, 4, 8, 4, 5, 2, 2, 8, 8, 1, 1, 9, 7, 2, 2, 9, 4, 6, 1, 3, 4, 7, 1, 8, 4, 8, 9, 1, 6, 5, 8, 7, 4, 6, 5, 8, 3, 8, 7, 7, 8, 6, 4, 8, 3, 6, 3, 5, 5, 6, 6, 6, 7, 3, 0, 1, 6, 7, 1, 0, 6, 8, 8, 7, 7, 2, 0, 9, 1, 6, 5, 8, 6, 3, 0, 5, 8, 0, 5, 4, 0, 1, 6, 2, 1, 2, 5, 3, 8, 9, 4, 5, 2, 3, 3, 3, 9, 6, 7, 1, 6, 7, 9, 3, 1, 5, 9, 2, 0, 4, 6, 9, 7, 8, 1, 3, 2, 0, 3, 7, 9, 4, 2, 7, 4, 8, 5, 5, 5, 0, 3, 2, 7, 6, 5, 0, 3, 2, 1, 4, 8, 3, 2, 6, 2, 9, 3, 5, 0, 3, 2, 2, 9, 8, 4, 1, 9, 9, 0, 2, 2, 6, 7, 2, 4, 0, 9, 3, 9, 4, 2, 2, 8, 0, 1, 2, 5, 6, 6, 9, 9, 8, 8, 2, 3, 1, 8, 1, 3, 8, 6, 8, 4, 6, 0, 2, 0, 8, 1, 0, 2, 0, 3, 4, 4, 6, 5, 8, 6, 7, 7, 5, 8, 0, 9, 6, 0, 7, 1, 4, 2, 4, 3, 7, 4, 1, 5, 9, 6, 1, 7, 9, 8, 1, 9, 6, 0, 0, 1, 8, 2, 7, 3, 3, 4, 5, 5, 3, 6, 0, 7, 3, 8, 2, 6, 4, 0, 4, 3, 0, 4, 1, 1, 1, 4, 6, 0, 4, 8, 2, 6, 7, 4, 1, 5, 3, 4, 2, 0, 1, 7, 3, 8, 1, 7, 2, 7, 5, 9, 3, 0, 5, 4, 2, 9, 8, 9, 4, 7, 2, 4, 2, 2, 1, 0, 3, 5, 6, 8, 0, 5, 4, 9, 1, 8, 5, 8, 7, 4, 0, 0, 3, 7, 7, 1, 2, 3, 7, 5, 2, 1, 0, 3, 8, 1, 6, 5, 8, 3, 7, 8, 6, 7, 8, 3, 5, 1, 0, 6, 9, 8, 1, 5, 9, 9, 5, 2, 0, 2, 0, 0, 3, 9, 6, 2, 9, 4, 7, 6, 3, 5, 3, 2, 5, 7, 3, 3, 7, 1, 3, 3, 7, 6, 9, 6, 7, 2, 7, 1, 1, 2, 9, 6, 9, 0, 8, 2, 1, 2, 8, 7, 2, 1, 7, 3, 3, 7, 5, 4, 8, 7, 5, 4, 3, 8, 6, 9, 6, 2, 2, 9, 1, 5, 9, 1, 1, 5, 4, 6, 9, 8, 9, 3, 4, 5, 8, 6, 9, 8, 8, 0, 8, 0, 5, 9, 0, 9, 6, 3, 5, 1, 7, 1, 0, 0, 6, 1, 8, 2, 1, 3, 3, 4, 6, 5, 0, 6, 3, 7, 8, 8, 8, 9, 4, 0, 6, 1, 7, 2, 4, 3, 8, 4, 7, 5, 5, 6, 0, 7, 7, 8, 6, 9, 3, 0, 4, 1, 6, 2, 8, 3, 8, 4, 3, 5, 3, 6, 6, 7, 1, 8, 9, 9, 4, 7, 5, 5, 4, 5, 2, 1, 2, 9, 7, 9, 2, 7, 2, 1, 8, 0, 4, 9, 7, 0, 0, 7, 1, 1, 3, 7, 7, 3, 9, 6, 3, 8, 9, 0, 3, 8, 3, 3, 1, 2, 4, 0, 8, 9, 2, 0, 1, 6, 4, 1, 1, 7, 3, 5, 3, 8, 8, 3, 0, 4, 3, 7, 7, 6, 7, 3, 3, 2, 9, 3, 7, 8, 4, 9, 5, 4, 3, 8, 4, 8, 5, 7, 1, 1, 2, 0, 2, 8, 2, 7, 7, 7, 2, 9, 0, 2, 9, 3, 2, 4, 4, 6, 3, 1, 5, 1, 5, 4, 4, 5, 3, 5, 3, 0, 1, 4, 1, 8, 6, 7, 2, 4, 7, 9, 2, 2, 2, 3, 3, 6, 0, 4, 6, 1, 0, 2, 2, 4, 0, 1, 0, 5, 0, 4, 4, 2, 1, 0, 7, 4, 6, 8, 0, 6, 1, 1, 4, 9, 5, 3, 6, 2, 0, 0, 2, 0, 0, 2, 2, 5, 2, 6, 8, 9, 0, 3, 8, 6, 2, 3, 9, 6, 4, 0, 2, 1, 3, 2, 3, 3, 9, 4, 5, 7, 1, 0, 2, 3, 5, 4, 8, 7, 1, 0, 9, 1, 1, 2, 4, 3, 5, 4, 7, 5, 8, 6, 1, 7, 3, 8, 7, 7, 3, 2, 2, 4, 8, 1, 3, 4, 0, 1, 5, 4, 5, 9, 4, 6, 2, 8, 3, 4, 7, 5, 5, 3, 8, 7, 4, 8, 8, 4, 0, 6, 2, 7, 8, 0, 5, 6, 3, 1, 5, 6, 5, 8, 4, 7, 5, 0, 7, 0, 0, 0, 9, 6, 1, 1, 6, 5, 8, 2, 3, 3, 8, 9, 2, 7, 8, 6, 4, 9, 9, 1, 7, 9, 7, 0, 1, 6, 5, 7, 3, 2, 1, 5, 3, 3, 2, 1, 0, 2, 0, 3, 9, 0, 8, 2, 5, 9, 8, 4, 4, 9, 6, 7, 3, 0, 4, 0, 1, 2, 8, 7, 4, 4, 0, 9, 3, 9, 5, 2, 6, 9, 1, 8, 6, 3, 6, 6, 8, 7, 8, 0, 4, 4, 8, 0, 3, 0, 0, 1, 2, 2, 7, 3, 1, 4, 3, 6, 2, 7, 5, 8, 2, 0, 1, 1, 0, 2, 3, 3, 7, 4, 3, 5, 0, 6, 5, 7, 5, 8, 3, 9, 9, 0, 6, 1, 9, 2, 2, 3, 9, 4, 4, 5, 5, 6, 7, 7, 1, 8, 7, 1, 7, 4, 7, 4, 7, 2, 7, 3, 9, 3, 7, 0, 6, 9, 4, 5, 2, 4, 9, 3, 3, 0, 3, 8, 5, 4, 0, 6, 6, 7, 9, 0, 3, 7, 8, 7, 9, 1, 8, 6, 4, 9, 9, 1, 8, 2, 0, 9, 8, 3, 6, 6, 4, 2, 6, 3, 1, 4, 1, 6, 3, 8, 8, 7, 5, 2, 1, 3, 0, 8, 6, 1, 8, 2, 2, 9, 4, 5, 6, 8, 5, 8, 6, 7, 6, 1, 2, 7, 2, 1, 7, 1, 2, 0, 4, 3, 7, 4, 8, 2, 5, 6, 2, 4, 2, 7, 3, 4, 8, 2, 3, 7, 6, 4, 3, 2, 9, 9, 2, 2, 5, 7, 4, 9, 5, 2, 7, 8, 5, 6, 1, 1, 7, 0, 8, 6, 2, 8, 1, 5, 9, 5, 6, 0, 2, 5, 6, 3, 1, 5, 8, 9, 1, 7, 7, 4, 9, 8, 0, 9, 7, 6, 0, 9, 5, 3, 8, 0, 6, 0, 0, 6, 8, 3, 4, 0, 5, 5, 1, 8, 8, 9, 7, 1, 8, 8, 7, 1, 8, 6, 6, 0, 7, 0, 0, 1, 4, 2, 4, 3, 8, 4, 1, 5, 0, 6, 0, 7, 3, 8, 4, 9, 9, 0, 5, 1, 2, 3, 0, 4, 2, 5, 1, 6, 2, 7, 1, 8, 3, 9, 6, 0, 2, 1, 4, 2, 4, 3, 5, 4, 1, 5, 2, 6, 4, 7, 8, 8, 4, 9, 3, 1, 3, 4, 1, 4, 4, 3, 5, 3, 7, 0, 7, 9, 0, 5, 6, 4, 2, 3, 0, 0, 5, 8, 1, 4, 2, 0, 6, 7, 9, 7, 0, 6, 8, 9, 9, 1, 6, 2, 7, 9, 5, 3, 3, 6, 1, 2, 6, 3, 7, 4, 1, 6, 5, 5, 6, 2, 8, 3, 5, 8, 5, 1, 0, 2, 0, 9, 0, 5, 2, 8, 9, 8, 0, 7, 0, 1, 1, 7, 5, 1, 4, 1, 4, 3, 6, 4, 7, 4, 4, 7, 7, 4, 5, 2, 8, 7, 3, 2, 5, 9, 8, 2, 8, 7, 3, 9, 5, 2, 7, 8, 7, 6, 7, 1, 5, 8, 7, 5, 9, 5, 6, 0, 6, 5, 5, 3, 8, 5, 9, 9, 7, 7, 9, 4, 3, 8, 3, 9, 3, 6, 7, 9, 1, 0, 7, 0, 3, 6, 0, 3, 7, 0, 3, 5, 4, 8, 7, 9, 7, 1, 9, 8, 5, 1, 1, 0, 1, 0, 2, 1, 5, 2, 2, 3, 9, 4, 6, 5, 7, 6, 4, 7, 7, 8, 6, 0, 4, 1, 1, 2, 2, 3, 2, 4, 8, 5, 4, 6, 8, 7, 6, 8, 4, 9, 2, 0, 2, 1, 7, 2, 4, 3, 3, 4, 3, 6, 4, 7, 5, 8, 0, 8, 6, 2, 7, 6, 7, 9, 4, 6, 3, 1, 9, 9, 9, 9, 5, 9, 1, 4, 0, 4, 8, 3, 3, 8, 0, 1, 6, 4, 8, 1, 0, 2, 6, 5, 3, 0, 1, 9, 1, 4, 4, 9, 9, 1, 5, 7, 8, 4, 8, 4, 7, 1, 8, 8, 9, 7, 8, 6, 6, 0, 8, 8, 8, 1, 0, 8, 0, 2, 6, 6, 3, 2, 4, 0, 8, 9, 1, 1, 9, 2, 6, 5, 3, 4, 9, 5, 1, 6, 0, 7, 9, 3, 8, 0, 9, 2, 4, 2, 0, 2, 4, 7, 6, 5, 2, 0, 0, 3, 0, 5, 7, 2, 6, 1, 5, 4, 8, 4, 4, 3, 2, 0, 0, 0, 0, 8, 4, 5, 1, 4, 3, 7, 4, 9, 2, 7, 3, 8, 8, 8, 3, 7, 7, 9, 9, 6, 2, 3, 8, 1, 5, 7, 1, 9, 5, 6, 1, 3, 1, 3, 5, 1, 6, 0, 5, 2, 7, 6, 3, 0, 5, 5, 9, 6, 3, 8, 5, 7, 4, 3, 6, 5, 1, 8, 6, 3, 7, 0, 3, 1, 5, 2, 7, 3, 0, 4, 6, 5, 7, 6, 3, 7, 6, 8, 8, 9, 8, 0, 8, 1, 1, 2, 6, 3, 8, 4, 4, 5, 4, 6, 9, 7, 9, 8, 2, 9, 1, 0, 1, 1, 4, 2, 8, 3, 9, 4, 5, 5, 3, 6, 6, 7, 5, 8, 7, 9, 5, 0, 0, 8, 2, 7, 4, 8, 4, 9, 9, 9, 2, 0, 5, 1, 6, 4, 0, 5, 6, 1, 7, 6, 4, 7, 0, 3, 1, 2, 9, 9, 2, 0, 5, 5, 0, 6, 7, 7, 3, 3, 1, 9, 7, 9, 9, 3, 8, 8, 7, 1, 9, 2, 3, 9, 4, 6, 2, 7, 3, 5, 3, 6, 8, 3, 1, 5, 4, 0, 3, 5, 3, 4, 5, 0, 8, 3, 7, 4, 9, 7, 5, 7, 1, 9, 0, 4, 0, 3, 5, 7, 7, 6, 4, 2, 6, 1, 5, 5, 6, 5, 2, 0, 5, 5, 5, 0, 2, 6, 3, 7, 7, 0, 7, 2, 1, 9, 0, 3, 4, 4, 3, 4, 7, 8, 4, 1, 3, 2, 7, 2, 6, 3, 9, 1, 8, 3, 6, 6, 4, 7, 8, 3, 4, 9, 2, 6, 2, 5, 4, 1, 6, 9, 5, 8, 3, 1, 3, 1, 4, 5, 3, 0, 8, 2, 9, 7, 2, 8, 3, 6, 4, 6, 9, 8, 5, 4, 2, 4, 6, 2, 0, 2, 1, 8, 4, 0, 9, 0, 6, 1, 2, 2, 3, 3, 1, 8, 5, 9, 8, 0, 3, 1, 3, 2, 1, 4, 3, 5, 5, 6, 1, 7, 9, 8, 1, 9, 6, 0, 5, 1, 8, 2, 7, 3, 7, 4, 5, 5, 7, 6, 5, 7, 5, 8, 2, 9, 7, 3, 6, 5, 1, 3, 1, 2, 0, 9, 7, 3, 5, 2, 8, 1, 7, 4, 4, 5, 9, 5, 7, 2, 7, 3, 8, 2, 8, 1, 4, 3, 7, 9, 7, 7, 9, 2, 4, 1, 8, 2, 4, 8, 7, 9, 2, 1, 9, 8, 9, 8, 4, 7, 7, 8, 6, 1, 2, 0, 9, 0, 2, 6, 4, 7, 5, 7, 1, 7, 7, 5, 1, 6, 5, 1, 9, 5, 2, 7, 4, 1, 0, 2, 8, 5, 5, 0, 6, 7, 7, 9, 3, 9, 3, 0, 1, 3, 0, 8, 4, 4, 6, 8, 4, 4, 6, 1, 4, 8, 9, 6, 2, 5, 9, 9, 0, 0, 7, 0, 6, 0, 3, 3, 9, 7, 2, 1, 8, 6, 6, 4, 0, 2, 0, 6, 9, 6, 8, 0, 6, 4, 4, 5, 6, 4, 2, 1, 4, 3, 1, 8, 8, 6, 7, 3, 3, 9, 5, 9, 5, 5, 3, 9, 5, 3, 1, 7, 6, 6, 9, 2, 5, 2, 9, 0, 7, 0, 7, 1, 2, 2, 5, 3, 1, 4, 3, 5, 9, 6, 6, 7, 3, 8, 0, 9, 9, 0, 6, 1, 9, 2, 4, 3, 5, 4, 0, 5, 8, 6, 1, 7, 8, 8, 0, 9, 4, 0, 3, 1, 5, 2, 2, 3, 7, 4, 4, 5, 9, 9, 7, 1, 7, 3, 4, 5, 1, 9, 4, 4, 2, 1, 8, 7, 8, 7, 3, 2, 8, 1, 9, 4, 7, 8, 8, 3, 2, 8, 9, 2, 4, 9, 9, 3, 5, 8, 1, 5, 5, 4, 2, 8, 5, 8, 4, 9, 0, 4, 4, 3, 8, 9, 3, 2, 1, 5, 1, 7, 4, 4, 0, 1, 4, 2, 1, 3, 1, 5, 2, 9, 6, 1, 5, 6, 7, 0, 9, 1, 4, 0, 0, 0, 7, 2, 7, 8, 6, 7, 5, 2, 0, 5, 4, 1, 5, 1, 5, 8, 5, 5, 2, 6, 1, 4, 4, 0, 8, 4, 4, 7, 7, 3, 1, 6, 8, 8, 0, 0, 7, 3, 7, 7, 2, 4, 8, 0, 3, 6, 4, 9, 8, 2, 0, 6, 4, 5, 9, 8, 7, 6, 8, 9, 9, 0, 7, 4, 7, 0, 3, 6, 4, 1, 0, 9, 7, 2, 8, 0, 8, 9, 7, 5, 3, 1, 0, 3, 7, 7, 4, 6, 9, 9, 0, 4, 6, 8, 3, 3, 0, 7, 4, 7, 0, 6, 1, 3, 9, 0, 0, 5, 7, 6, 9, 2, 9, 2, 5, 0, 1, 1, 7, 2, 3, 3, 5, 4, 9, 5, 9, 6, 7, 7, 4, 8, 9, 9, 3, 0, 1, 1, 3, 2, 9, 3, 4, 4, 2, 5, 7, 6, 8, 7, 3, 8, 1, 9, 2, 0, 7, 1, 0, 2, 2, 3, 4, 5, 7, 6, 6, 7, 0, 8, 3, 8, 6, 9, 3, 5, 0, 7, 4, 0, 7, 3, 8, 1, 1, 4, 2, 1, 7, 7, 8, 6, 7, 5, 6, 6, 4, 4, 6, 2, 5, 7, 0, 8, 2, 1, 8, 3, 6, 4, 4, 3, 5, 7, 6, 2, 0, 5, 1, 0, 3, 1, 1, 9, 3, 2, 9, 3, 6, 2, 1, 3, 5, 5, 7, 5, 2, 7, 6, 8, 8, 4, 4, 9, 2, 9, 8, 7, 1, 1, 7, 1, 0, 9, 0, 0, 1, 7, 2, 8, 2, 3, 3, 8, 9, 6, 4, 3, 9, 8, 3, 0, 0, 9, 8, 6, 5, 2, 6, 1, 9, 0, 8, 1, 7, 0, 7, 6, 4, 2, 1, 3, 4, 8, 4, 9, 7, 0, 7, 7, 3, 2, 1, 3, 5, 4, 1, 5, 0, 5, 2, 2, 5, 8, 1, 5, 7, 4, 8, 6, 0, 6, 4, 6, 6, 7, 7, 9, 2, 1, 9, 8, 0, 2, 1, 1, 9, 2, 6, 6, 7, 5, 1, 3, 4, 4, 4, 7, 9, 9, 0, 4, 6, 0, 9, 0, 8, 5, 5, 9, 1, 0, 8, 1, 6, 2, 5, 3, 7, 4, 0, 5, 9, 6, 1, 7, 3, 8, 5, 9, 1, 0, 6, 1, 3, 2, 4, 3, 9, 4, 1, 5, 6, 6, 5, 7, 1, 8, 2, 9, 3, 0, 7, 1, 4, 2, 9, 3, 2, 4, 1, 5, 0, 6, 1, 7, 4, 8, 1, 9, 9, 0, 3, 0, 0, 1, 7, 0, 5, 1, 4, 2, 5, 7, 9, 5, 6, 3, 9, 4, 7, 2, 6, 4, 7, 4, 9, 0, 4, 0, 5, 6, 7, 9, 4, 6, 1, 6, 5, 5, 7, 7, 7, 3, 4, 2, 3, 2, 7, 3, 2, 4, 4, 4, 7, 9, 6, 1, 7, 4, 1, 0, 1, 7, 5, 9, 6, 7, 8, 5, 7, 6, 7, 2, 2, 3, 7, 1, 5, 4, 6, 4, 4, 0, 8, 9, 5, 9, 6, 6, 2, 1, 8, 8, 0, 3, 1, 3, 8, 7, 8, 3, 2, 9, 6, 8, 7, 8, 1, 9, 9, 6, 4, 8, 7, 8, 5, 8, 7, 4, 8, 7, 9, 7, 5, 6, 7, 2, 1, 1, 6, 9, 9, 8, 0, 7, 1, 8, 1, 8, 0, 7, 6, 2, 6, 2, 7, 3, 2, 9, 7, 3, 2, 3, 5, 0, 9, 7, 7, 9, 3, 5, 6, 6, 5, 5, 0, 0, 0, 6, 9, 1, 4, 5, 9, 0, 0, 4, 8, 1, 0, 1, 8, 2, 4, 8, 1, 2, 5, 6, 6, 1, 3, 5, 0, 0, 4, 1, 6, 2, 3, 3, 8, 4, 8, 5, 1, 6, 5, 7, 0, 8, 1, 9, 6, 0, 5, 1, 7, 2, 3, 3, 9, 4, 2, 5, 0, 8, 4, 0, 3, 1, 9, 2, 9, 3, 6, 4, 6, 5, 1, 6, 3, 7, 9, 8, 0, 8, 1, 6, 9, 5, 4, 0, 5, 6, 8, 8, 7, 9, 0, 4, 6, 1, 8, 9, 3, 0, 8, 4, 7, 8, 1, 9, 7, 1, 9, 4, 9, 0, 8, 5, 3, 1, 1, 4, 8, 0, 8, 7, 0, 6, 7, 0, 0, 1, 8, 7, 9, 0, 7, 6, 4, 8, 7, 9, 8, 5, 4, 7, 8, 9, 2, 8, 5, 6, 8, 0, 0, 8, 1, 1, 2, 7, 7, 7, 9, 1, 4, 3, 2, 2, 5, 3, 8, 1, 7, 4, 2, 2, 4, 0, 8, 0, 8, 7, 0, 8, 6, 4, 5, 6, 4, 4, 5, 9, 2, 3, 5, 8, 7, 4, 5, 7, 6, 2, 6, 3, 2, 6, 4, 9, 4, 6, 9, 3, 7, 2, 9, 2, 0, 4, 5, 6, 6, 9, 1, 0, 0, 2, 8, 5, 3, 5, 5, 1, 1, 3, 3, 3, 8, 9, 0, 7, 7, 8, 5, 7, 5, 2, 4, 2, 0, 9, 7, 8, 1, 2, 1, 1, 3, 3, 7, 1, 6, 3, 8, 0, 0, 1, 7, 2, 9, 3, 4, 4, 8, 5, 8, 6, 0, 7, 8, 8, 6, 9, 1, 0, 1, 1, 4, 2, 6, 3, 4, 4, 7, 5, 5, 6, 5, 7, 9, 8, 8, 9, 5, 0, 5, 1, 8, 2, 9, 3, 5, 4, 1, 5, 0, 6, 6, 7, 5, 8, 9, 9, 6, 0, 2, 8, 3, 3, 1, 9, 1, 5, 2, 5, 1, 2, 9, 6, 8, 8, 3, 4, 7, 9, 7, 1, 2, 7, 7, 1, 0, 2, 9, 3, 7, 5, 9, 9, 0, 6, 0, 9, 3, 1, 5, 1, 8, 1, 3, 2, 3, 9, 1, 5, 3, 6, 6, 8, 8, 1, 8, 2, 5, 0, 1, 7, 8, 7, 0, 5, 4, 8, 5, 2, 8, 9, 7, 8, 3, 7, 2, 1, 1, 3, 2, 4, 7, 5, 6, 6, 8, 0, 7, 3, 8, 6, 4, 8, 0, 7, 2, 0, 6, 4, 1, 2, 0, 7, 2, 7, 4, 5, 4, 4, 7, 3, 9, 4, 7, 2, 1, 8, 7, 1, 4, 5, 0, 1, 7, 2, 2, 4, 0, 3, 8, 0, 2, 0, 3, 0, 2, 3, 1, 3, 3, 5, 8, 7, 9, 0, 0, 6, 1, 8, 1, 6, 7, 3, 2, 4, 1, 6, 0, 9, 4, 9, 3, 8, 3, 2, 9, 7, 1, 7, 9, 1, 8, 0, 1, 1, 6, 2, 1, 3, 2, 4, 9, 7, 2, 8, 2, 9, 8, 0, 9, 1, 1, 2, 6, 3, 7, 4, 1, 5, 5, 6, 1, 7, 4, 8, 3, 9, 5, 0, 3, 1, 3, 2, 9, 3, 2, 7, 5, 8, 4, 9, 8, 7, 0, 9, 3, 5, 6, 0, 3, 8, 0, 3, 2, 5, 6, 4, 2, 8, 7, 2, 7, 1, 2, 0, 6, 2, 5, 5, 7, 8, 6, 8, 1, 1, 6, 6, 2, 1, 3, 3, 4, 0, 7, 3, 5, 6, 4, 9, 8, 3, 7, 7, 0, 4, 4, 9, 7, 7, 0, 0, 4, 9, 7, 7, 4, 7, 7, 9, 1, 5, 6, 7, 7, 6, 0, 4, 7, 8, 8, 9, 7, 6, 5, 9, 3, 4, 7, 1, 7, 2, 2, 0, 7, 6, 6, 1, 8, 7, 4, 2, 3, 4, 0, 6, 2, 4, 9, 6, 2, 5, 3, 0, 8, 2, 3, 1, 7, 0, 8, 1, 2, 2, 2, 1, 3, 7, 5, 8, 3, 1, 1, 2, 8, 8, 8, 2, 2, 7, 6, 9, 2, 3, 2, 9, 2, 0, 4, 1, 2, 2, 0, 3, 9, 4, 9, 5, 8, 6, 0, 7, 1, 0, 7, 1, 8, 2, 0, 3, 7, 7, 2, 8, 6, 9, 2, 0, 3, 1, 5, 7, 8, 8, 8, 9, 8, 2, 9, 5, 7, 1, 9, 6, 7, 4, 8, 3, 3, 9, 0, 9, 1, 0, 0, 4, 9, 3, 4, 6, 7, 0, 2, 0, 8, 8, 3, 9, 0, 8, 7, 7, 4, 0, 4, 0, 4, 4, 5, 1, 4, 4, 1, 1, 2, 3, 7, 6, 0, 4, 1, 7, 4, 7, 2, 0, 9, 9, 0, 8, 9, 4, 3, 3, 8, 8, 1, 3, 1, 8, 6, 5, 9, 8, 0, 4, 7, 1, 3, 7, 2, 9, 6, 2, 6, 0, 6, 9, 0, 1, 3, 7, 6, 3, 3, 8, 5, 0, 6, 3, 8, 8, 7, 1, 9, 6, 1, 4, 1, 3, 9, 6, 0, 1, 9, 5, 3, 5, 2, 6, 7, 5, 9, 0, 9, 1, 0, 2, 8, 3, 6, 4, 3, 5, 3, 6, 2, 7, 0, 0, 5, 1, 5, 2, 1, 3, 5, 4, 3, 5, 0, 6, 5, 7, 8, 0, 7, 1, 1, 2, 8, 3, 1, 4, 7, 5, 2, 7, 4, 4, 6, 0, 4, 4, 6, 0, 5, 1, 6, 7, 5, 5, 9, 1, 3, 4, 7, 2, 6, 4, 4, 3, 3, 1, 7, 7, 3, 8, 8, 2, 3, 4, 9, 4, 2, 3, 2, 3, 9, 6, 0, 6, 7, 7, 3, 0, 1, 2, 2, 6, 4, 3, 2, 9, 9, 3, 8, 2, 5, 8, 5, 1, 2, 7, 1, 0, 2, 3, 2, 2, 0, 9, 3, 4, 0, 0, 8, 3, 3, 7, 8, 7, 0, 7, 5, 7, 2, 1, 2, 1, 3, 2, 4, 6, 2, 4, 4, 2, 4, 3, 5, 6, 5, 6, 4, 5, 1, 7, 4, 5, 3, 2, 6, 8, 2, 1, 7, 6, 1, 1, 0, 0, 2, 4, 2, 3, 1, 1, 7, 6, 4, 1, 3, 9, 2, 0, 7, 1, 7, 2, 5, 3, 8, 4, 9, 5, 8, 6, 3, 7, 2, 8, 6, 0, 7, 1, 1, 2, 2, 3, 0, 4, 9, 5, 9, 6, 1, 7, 6, 8, 0, 9, 0, 0, 6, 1, 4, 2, 8, 3, 1, 4, 8, 5, 2, 6, 8, 7, 2, 8, 2, 1, 9, 0, 0, 4, 0, 5, 5, 6, 7, 6, 2, 3, 8, 4, 3, 4, 6, 1, 1, 0, 9, 6, 1, 4, 8, 9, 2, 7, 0, 2, 3, 3, 4, 3, 2, 9, 8, 2, 1, 0, 0, 9, 9, 3, 7, 3, 3, 9, 1, 1, 3, 5, 3, 2, 9, 3, 7, 1, 7, 6, 7, 7, 9, 3, 2, 7, 8, 4, 0, 2, 2, 4, 7, 8, 0, 7, 0, 6, 9, 3, 2, 6, 0, 5, 7, 5, 1, 0, 8, 1, 6, 7, 2, 9, 7, 9, 5, 8, 9, 6, 5, 2, 6, 2, 8, 1, 7, 5, 5, 7, 3, 5, 0, 1, 1, 3, 8, 4, 9, 4, 5, 1, 8, 6, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 7, 8, 9, 7, 1, 5, 6, 2, 5, 4, 8, 1, 7, 1, 8, 3, 8, 7, 1, 7, 7, 0, 1, 4, 4, 4, 4, 4, 9, 7, 2, 6, 5, 4, 3, 8, 7, 9, 0, 6, 4, 6, 3, 7, 0, 1, 4, 8, 8, 1, 2, 9, 3, 1, 8, 4, 2, 9, 9, 2, 9, 6, 0, 5, 3, 3, 6, 3, 1, 2, 5, 0, 3, 7, 6, 1, 5, 5, 9, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 6, 8, 2, 3, 7, 4, 6, 8, 6, 6, 8, 0, 1, 7, 1, 7, 3, 5, 0, 2, 2, 0, 2, 5, 4, 1, 5, 1, 2, 3, 4, 8, 3, 3, 6, 5, 9, 9, 3, 8, 1, 3, 7, 9, 3, 4, 1, 7, 3, 9, 6, 7, 4, 9, 7, 0, 9, 6, 0, 6, 1, 0, 5, 8, 5, 0, 1, 0, 9, 4, 5, 9, 7, 1, 9, 6, 8, 9, 2, 8, 5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 9, 0, 5, 6, 8, 3, 9, 0, 2, 3, 3, 3, 9, 5, 6, 4, 4, 2, 5, 4, 3, 9, 6, 8, 7, 9, 1, 5, 2, 6, 3, 4, 4, 1, 6, 4, 9, 6, 5, 1, 2, 6, 6, 7, 8, 8, 1, 8, 3, 7, 1, 2, 7, 0, 7, 5, 0, 0, 1, 5, 0, 0, 4, 8, 3, 1, 8, 2, 9, 9, 5, 2, 6, 4, 8, 2, 5, 4, 1, 7, 1, 4, 3, 9, 7, 1, 2, 6, 0, 7, 3, 0, 1, 2, 3, 4, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 7, 0, 6, 0, 7, 3, 7, 3, 7, 9, 7, 4, 0, 2, 6, 5, 6, 5, 2, 9, 5, 3, 9, 8, 3, 4, 0, 5, 4, 6, 3, 4, 8, 0, 6, 4, 8, 1, 3, 4, 0, 1, 9, 2, 3, 7, 9, 1, 2, 5, 1, 7, 2, 8, 7, 0, 1, 9, 6, 4, 1, 2, 3, 7, 0, 2, 1, 3, 1, 7, 2, 1, 6, 8, 0, 8, 9, 1, 6, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 6, 4, 2, 6, 4, 7, 5, 5, 4, 7, 8, 9, 2, 9, 3, 9, 3, 8, 2, 0, 5, 0, 7, 0, 4, 2, 6, 5, 3, 5, 3, 8, 0, 0, 3, 4, 1, 5, 3, 0, 8, 3, 0, 6, 2, 7, 1, 1, 8, 1, 7, 1, 3, 8, 9, 7, 6, 7, 4, 1, 6, 7, 5, 1, 7, 1, 9, 8, 0, 6, 9, 4, 9, 9, 3, 7, 1, 9, 2, 2, 5, 3, 7, 8, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 1, 0, 5, 5, 1, 9, 0, 4, 1, 9, 3, 8, 4, 7, 7, 8, 5, 0, 6, 5, 5, 3, 3, 3, 9, 8, 1, 4, 0, 6, 1, 0, 0, 6, 2, 1, 1, 3, 2, 8, 8, 7, 8, 4, 6, 0, 2, 0, 3, 6, 8, 7, 1, 5, 9, 9, 3, 2, 4, 9, 4, 6, 5, 3, 2, 5, 5, 9, 4, 1, 6, 5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 6, 4, 2, 6, 4, 7, 5, 5, 4, 7, 8, 9, 2, 9, 3, 9, 3, 8, 2, 0, 9, 8, 0, 5, 6, 0, 1, 0, 4, 2, 6, 5, 5, 5, 4, 3, 4, 1, 5, 3, 0, 8, 3, 0, 6, 2, 7, 1, 1, 8, 1, 7, 1, 3, 8, 5, 4, 2, 0, 9, 7, 6, 7, 4, 1, 6, 8, 4, 7, 5, 1, 2, 6, 7, 1, 9, 8, 0, 6, 9, 4, 9, 9, 6, 2, 3, 7, 1, 9, 2, 2, 5, 3, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 1, 2, 1, 3, 9, 9, 8, 5, 3, 7, 0, 7, 7, 5, 7, 9, 9, 4, 7, 0, 3, 4, 1, 4, 4, 7, 5, 8, 1, 4, 8, 4, 1, 8, 6, 6, 4, 6, 3, 5, 7, 2, 5, 9, 2, 6, 2, 1, 2, 0, 8, 3, 8, 3, 0, 8, 7, 4, 9, 5, 0, 9, 7, 4, 9, 1, 6, 2, 7, 6, 1, 8, 6, 1, 0, 3, 6, 2, 1, 4, 0, 1, 2, 3, 4, 7, 8, 9, 0, 1, 2, 3, 4, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 4, 3, 1, 8, 6, 1, 9, 2, 4, 0, 9, 9, 3, 7, 7, 9, 1, 8, 4, 7, 5, 8, 5, 3, 2, 2, 0, 5, 8, 6, 0, 3, 8, 1, 0, 3, 0, 4, 7, 4, 9, 2, 9, 1, 2, 1, 7, 1, 6, 7, 3, 3, 6, 2, 8, 7, 6, 4, 9, 8, 8, 2, 9, 6, 5, 5, 9, 5, 3, 7, 4, 7, 6, 0, 0, 4, 6, 6, 9, 0, 1, 1, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 2, 0, 2, 1, 5, 9, 6, 5, 9, 3, 5, 0, 7, 1, 1, 5, 3, 0, 7, 9, 6, 1, 6, 7, 4, 9, 5, 7, 9, 8, 5, 6, 2, 4, 8, 9, 2, 2, 8, 0, 6, 4, 3, 3, 1, 2, 4, 1, 5, 8, 9, 6, 9, 3, 4, 0, 3, 9, 0, 2, 7, 1, 1, 0, 7, 6, 2, 2, 7, 6, 0, 6, 9, 4, 8, 4, 3, 3, 7, 8, 1, 0, 4, 5, 8, 3, 0, 6, 8, 3, 7, 8, 5, 7, 8, 2, 3, 4, 6, 7, 8, 9, 0, 1, 2, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 8, 7, 5, 7, 3, 3, 8, 6, 5, 4, 0, 9, 3, 2, 2, 3, 0, 6, 4, 3, 7, 6, 9, 2, 2, 3, 5, 5, 0, 7, 2, 3, 4, 0, 0, 5, 1, 8, 9, 0, 8, 9, 6, 5, 6, 7, 5, 3, 5, 3, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 3, 5, 9, 4, 1, 7, 7, 2, 1, 4, 8, 3, 8, 2, 9, 3, 8, 5, 4, 8, 8, 9, 7, 5, 4, 3, 9, 2, 5, 7, 4, 1, 2, 3, 6, 0, 1, 0, 0, 2, 8, 7, 2, 5, 1, 1, 8, 5, 6, 4, 0, 4, 7, 3, 6, 8, 0, 3, 7, 6, 9, 2, 6, 5, 8, 6, 9, 0, 4, 0, 6, 1, 9, 2, 0, 9, 5, 1, 3, 7, 6, 9, 4, 8, 3, 7, 7, 6, 3, 0, 5, 6, 2, 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 5, 6, 6, 0, 8, 3, 7, 9, 4, 7, 1, 9, 1, 7, 1, 4, 1, 7, 5, 7, 1, 3, 3, 1, 6, 9, 7, 4, 3, 0, 2, 5, 2, 6, 0, 8, 4, 8, 1, 5, 0, 6, 6, 3, 4, 7, 5, 7, 2, 2, 0, 0, 1, 7, 7, 9, 5, 9, 8, 9, 6, 8, 3, 6, 1, 2, 9, 5, 2, 5, 2, 6, 2, 4, 8, 4, 6, 5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 4, 5, 6, 7, 8, 0, 4, 0, 1, 7, 5, 1, 4, 2, 8, 4, 3, 1, 7, 8, 2, 4, 3, 3, 6, 9, 9, 5, 8, 6, 7, 0, 6, 2, 6, 3, 9, 1, 7, 4, 8, 8, 9, 0, 3, 0, 5, 2, 9, 4, 1, 0, 3, 7, 5, 8, 7, 7, 8, 2, 9, 5, 5, 1, 2, 6, 4, 2, 5, 2, 3, 6, 0, 0, 7, 5, 2, 8, 1, 6, 1, 0, 4, 3, 1, 6, 1, 9, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 6, 7, 8, 0, 1, 2, 3, 4, 7, 8, 9, 2, 2, 4, 0, 7, 3, 5, 4, 1, 8, 0, 5, 2, 7, 2, 3, 6, 2, 1, 7, 7, 9, 2, 4, 6, 7, 7, 5, 9, 9, 1, 8, 6, 4, 6, 0, 9, 2, 6, 4, 3, 9, 0, 8, 8, 9, 4, 7, 1, 3, 6, 9, 4, 1, 7, 6, 9, 3, 3, 7, 4, 1, 9, 1, 0, 6, 0, 1, 2, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 2, 9, 3, 2, 1, 4, 5, 5, 2, 3, 2, 1, 3, 9, 7, 2, 1, 2, 8, 9, 1, 8, 8, 7, 0, 6, 7, 7, 8, 7, 5, 0, 6, 1, 5, 7, 4, 6, 1, 2, 7, 9, 9, 0, 3, 8, 4, 4, 1, 8, 6, 5, 0, 0, 3, 7, 1, 6, 4, 2, 6, 6, 0, 4, 5, 4, 1, 3, 8, 6, 3, 9, 9, 5, 9, 3, 6, 4, 7, 6, 2, 2, 0, 9, 4, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 6, 0, 3, 4, 1, 4, 0, 7, 8, 7, 7, 9, 0, 4, 9, 4, 0, 5, 8, 5, 9, 8, 8, 4, 0, 7, 1, 3, 5, 3, 1, 6, 5, 3, 8, 7, 3, 1, 6, 8, 5, 9, 2, 2, 0, 9, 2, 4, 6, 7, 3, 1, 3, 6, 6, 2, 1, 2, 6, 0, 7, 8, 9, 2, 9, 5, 1, 8, 3, 5, 6, 8, 7, 2, 1, 0, 4, 1, 4, 9, 5, 9, 0, 6, 9, 0, 1, 5, 9, 7, 3, 4, 9, 6, 6, 5, 4, 0, 7, 4, 0, 1, 3, 1, 3, 4, 7, 2, 7, 1, 2, 1, 1, 7, 4, 2, 3, 5, 1, 2, 4, 4, 6, 3, 5, 5, 6, 0, 4, 1, 9, 5, 7, 8, 9, 3, 7, 4, 6, 4, 3, 0, 7, 0, 2, 9, 1, 7, 3, 2, 9, 7, 7, 6, 2, 7, 8, 4, 7, 3, 6, 1, 3, 6, 9, 3, 1, 4, 1, 7, 6, 9, 6, 0, 5, 4, 9, 9, 2, 1, 9, 4, 8, 7, 3, 9, 7, 4, 4, 4, 9, 2, 5, 4, 7, 6, 7, 9, 0, 5, 8, 5, 6, 6, 5, 7, 8, 1, 0, 1, 6, 4, 6, 7, 3, 1, 7, 1, 8, 2, 0, 2, 9, 9, 5, 5, 1, 5, 6, 0, 3, 4, 4, 6, 5, 4, 6, 5, 4, 5, 1, 4, 4, 7, 2, 3, 2, 7, 1, 8, 1, 8, 1, 8, 5, 0, 8, 9, 2, 5, 0, 1, 1, 1, 0, 9, 0, 3, 1, 6, 4, 2, 3, 6, 1, 1, 1, 3, 9, 5, 2, 9, 4, 5, 9, 3, 9, 0, 3, 6, 5, 5, 7, 2, 2, 7, 1, 2, 8, 4, 1, 7, 3, 3, 8, 8, 7, 9, 2, 2, 4, 1, 5, 9, 8, 7, 2, 3, 0, 4, 4, 2, 4, 1, 9, 5, 7, 7, 2, 8, 2, 6, 8, 5, 7, 7, 9, 1, 8, 1, 8, 0, 3, 0, 1, 9, 9, 4, 1, 8, 2, 1, 2, 9, 7, 5, 9, 2, 6, 4, 1, 5, 8, 2, 9, 2, 0, 4, 0, 0, 2, 8, 4, 7, 1, 2, 4, 0, 2, 7, 4, 3, 3, 0, 0, 3, 1, 9, 6, 5, 2, 5, 9, 2, 9, 3, 0, 4, 2, 0, 7, 1, 1, 2, 1, 5, 3, 3, 9, 7, 8, 6, 5, 6, 1, 3, 8, 1, 0, 5, 1, 3, 1, 5, 5, 6, 1, 8, 5, 1, 7, 9, 4, 6, 2, 2, 5, 0, 6, 5, 6, 3, 7, 2, 0, 8, 8, 5, 4, 1, 1, 4, 0, 3, 3, 7, 6, 1, 6, 2, 1, 9, 2, 8, 6, 1, 9, 5, 2, 5, 4, 4, 2, 8, 3, 8, 2, 4, 5, 0, 3, 1, 7, 7, 5, 7, 9, 7, 1, 9, 2, 1, 4, 2, 9, 2, 0, 4, 9, 1, 4, 8, 1, 8, 4, 5, 9, 8, 8, 3, 7, 6, 0, 0, 3, 0, 2, 6, 6, 4, 9, 3, 3, 3, 2, 3, 9, 1, 2, 6, 8, 0, 5, 6, 6, 6, 3, 8, 8, 2, 7, 5, 8, 9, 6, 1, 8, 4, 1, 2, 5, 9, 1, 9, 7, 5, 4, 0, 8, 9, 9, 1, 0, 5, 2, 3, 7, 8, 9, 4, 0, 6, 3, 9, 5, 2, 1, 3, 1, 3, 6, 5, 7, 4, 2, 2, 6, 3, 2, 6, 5, 4, 8, 9, 7, 1, 3, 0, 3, 8, 3, 1, 9, 3, 4, 4, 6, 4, 2, 1, 8, 2, 5, 4, 8, 8, 4, 0, 0, 2, 3, 2, 7, 7, 0, 8, 7, 4, 4, 7, 9, 6, 9, 0, 9, 8, 0, 4, 6, 0, 6, 3, 5, 4, 8, 3, 3, 9, 3, 3, 3, 7, 8, 0, 8, 2, 1, 7, 0, 6, 5, 4, 3, 8, 0, 9, 6, 3, 8, 0, 9, 9, 6, 8, 6, 8, 5, 7, 8, 6, 0, 2, 4, 0, 2, 2, 3, 1, 9, 7, 5, 1, 0, 8, 4, 6, 2, 6, 7, 9, 3, 2, 9, 8, 2, 2, 9, 2, 7, 3, 5, 9, 1, 8, 0, 2, 0, 5, 2, 1, 3, 7, 6, 7, 1, 2, 5, 8, 0, 3, 7, 2, 4, 0, 9, 1, 8, 6, 7, 7, 4, 3, 4, 9, 1, 9, 5, 1, 7, 3, 9, 7, 6, 9, 1, 3, 7, 8, 3, 3, 6, 7, 2, 8, 5, 8, 5, 1, 1, 4, 4, 3, 1, 0, 7, 7, 0, 7, 9, 4, 4, 8, 5, 5, 4, 0, 8, 2, 1, 0, 8, 4, 5, 0, 4, 0, 6, 1, 7, 3, 2, 6, 7, 2, 6, 9, 3, 1, 4, 6, 2, 5, 4, 2, 0, 6, 2, 1, 7, 3, 4, 1, 0, 5, 4, 3, 1, 1, 7, 4, 9, 9, 4, 8, 4, 0, 2, 4, 5, 1, 1, 6, 4, 7, 1, 9, 4, 2, 4, 1, 5, 5, 3, 8, 3, 1, 4, 5, 6, 8, 9, 4, 1, 5, 3, 8, 0, 3, 2, 5, 1, 2, 8, 3, 4, 4, 0, 8, 8, 3, 3, 1, 7, 3, 5, 9, 6, 3, 2, 6, 1, 3, 6, 0, 7, 2, 1, 7, 1, 4, 2, 4, 2, 1, 7, 9, 6, 1, 1, 2, 4, 8, 1, 7, 7, 4, 8, 0, 7, 3, 1, 3, 1, 0, 7, 7, 0, 3, 5, 5, 2, 7, 6, 6, 9, 2, 8, 3, 5, 2, 2, 5, 6, 0, 8, 2, 9, 2, 8, 8, 8, 8, 7, 4, 9, 3, 0, 6, 6, 3, 2, 1, 3, 2, 2, 9, 3, 0, 0, 5, 7, 8, 1, 4, 4, 6, 0, 2, 9, 1, 4, 7, 4, 7, 3, 9, 8, 8, 4, 7, 1, 2, 1, 2, 2, 3, 2, 3, 2, 3, 9, 1, 7, 4, 0, 3, 5, 5, 8, 6, 3, 2, 6, 7, 6, 6, 3, 2, 7, 8, 1, 1, 7, 5, 6, 4, 9, 5, 1, 3, 3, 4, 7, 8, 9, 1, 1, 6, 9, 1, 4, 4, 5, 4, 0, 6, 2, 2, 3, 1, 5, 1, 2, 0, 3, 8, 1, 2, 6, 7, 1, 6, 2, 3, 9, 0, 1, 2, 2, 0, 8, 9, 9, 0, 2, 5, 1, 9, 7, 8, 1, 0, 4, 1, 7, 9, 6, 4, 2, 6, 8, 1, 3, 7, 5, 4, 4, 1, 8, 1, 3, 8, 1, 2, 5, 8, 0, 6, 2, 1, 1, 7, 1, 5, 3, 4, 6, 9, 5, 0, 9, 2, 2, 4, 8, 2, 1, 7, 2, 4, 9, 4, 4, 0, 3, 9, 2, 2, 3, 3, 8, 3, 5, 7, 3, 5, 8, 1, 2, 4, 4, 6, 4, 9, 5, 1, 0, 6, 9, 5, 9, 5, 9, 7, 3, 8, 0, 3, 7, 1, 3, 6, 7, 8, 5, 9, 7, 9, 6, 9, 6, 3, 7, 4, 4, 5, 3, 5, 4, 7, 8, 7, 8, 0, 7, 6, 8, 8, 7, 3, 3, 1, 9, 5, 2, 7, 3, 5, 1, 1, 2, 1, 4, 7, 4, 7, 5, 4, 5, 4, 0, 8, 3, 6, 9, 6, 0, 2, 7, 4, 4, 4, 4, 6, 6, 4, 7, 9, 3, 4, 5, 5, 8, 7, 3, 7, 2, 7, 0, 2, 4, 1, 1, 6, 6, 9, 2, 8, 7, 2, 0, 1, 5, 0, 9, 1, 7, 0, 6, 0, 8, 6, 8, 1, 8, 0, 3, 3, 7, 2, 3, 6, 2, 1, 6, 1, 1, 3, 7, 9, 0, 8, 0, 5, 4, 0, 2, 8, 7, 2, 9, 8, 4, 0, 9, 5, 8, 5, 1, 2, 1, 3, 1, 7, 4, 5, 7, 2, 0, 9, 8, 8, 6, 2, 5, 4, 1, 9, 2, 1, 5, 8, 7, 0, 2, 4, 4, 3, 6, 8, 8, 2, 4, 0, 5, 0, 4, 4, 7, 9, 3, 4, 1, 5, 9, 7, 3, 5, 8, 8, 0, 5, 3, 3, 6, 6, 0, 1, 6, 0, 3, 5, 4, 4, 1, 2, 9, 1, 4, 6, 9, 9, 3, 9, 8, 4, 4, 3, 1, 3, 1, 8, 8, 7, 9, 4, 8, 8, 7, 9, 7, 1, 4, 5, 6, 0, 5, 2, 2, 2, 1, 5, 5, 2, 4, 9, 6, 2, 7, 7, 2, 2, 1, 1, 2, 8, 3, 7, 2, 4, 1, 7, 1, 7, 6, 7, 8, 2, 7, 3, 1, 7, 5, 8, 2, 6, 2, 2, 5, 6, 5, 0, 9, 2, 4, 3, 3, 9, 7, 6, 6, 8, 0, 4, 1, 5, 8, 2, 9, 1, 8, 0, 6, 7, 2, 1, 0, 5, 5, 2, 0, 2, 2, 0, 2, 4, 9, 8, 0, 9, 9, 4, 6, 5, 4, 9, 1, 8, 3, 4, 9, 9, 1, 2, 2, 8, 1, 9, 6, 4, 0, 9, 4, 8, 3, 8, 6, 0, 2, 5, 1, 9, 6, 2, 9, 4, 0, 9, 6, 0, 6, 2, 5, 4, 2, 3, 8, 4, 5, 5, 0, 3, 8, 5, 3, 5, 8, 6, 5, 7, 6, 3, 3, 9, 6, 1, 1, 2, 9, 0, 4, 3, 3, 6, 9, 5, 7, 3, 7, 7, 7, 8, 7, 9, 8, 3, 0, 7, 2, 7, 9, 4, 5, 4, 9, 3, 2, 1, 4, 0, 2, 3, 7, 5, 7, 8, 8, 5, 0, 1, 1, 4, 8, 3, 9, 0, 0, 0, 6, 6, 2, 3, 7, 8, 4, 7, 7, 9, 2, 4, 1, 4, 5, 2, 4, 9, 9, 1, 8, 4, 0, 9, 8, 4, 8, 7, 7, 0, 7, 8, 8, 6, 0, 4, 8, 8, 2, 4, 7, 6, 6, 6, 4, 7, 1, 8, 8, 2, 3, 6, 3, 0, 0, 3, 7, 6, 9, 7, 9, 9, 5, 4, 3, 3, 6, 1, 2, 3, 7, 3, 3, 2, 0, 3, 3, 8, 4, 3, 6, 3, 5, 0, 2, 0, 9, 0, 7, 4, 6, 9, 3, 5, 1, 9, 6, 1, 4, 5, 4, 5, 0, 5, 9, 5, 2, 1, 2, 9, 1, 9, 9, 4, 0, 8, 4, 5, 2, 9, 2, 1, 2, 1, 7, 3, 6, 8, 8, 4, 9, 1, 9, 8, 5, 7, 5, 1, 1, 8, 6, 5, 2, 4, 4, 3, 2, 3, 5, 6, 8, 8, 6, 2, 3, 1, 0, 5, 8, 9, 2, 9, 6, 7, 0, 4, 8, 7, 1, 7, 4, 1, 0, 9, 7, 2, 0, 0, 9, 1, 7, 8, 7, 8, 4, 7, 2, 0, 4, 6, 0, 3, 1, 1, 3, 3, 9, 6, 7, 4, 1, 5, 3, 0, 8, 7, 3, 9, 6, 9, 3, 5, 0, 2, 7, 4, 5, 1, 7, 5, 8, 0, 8, 8, 1, 5, 0, 3, 0, 3, 1, 4, 0, 3, 7, 2, 7, 1, 8, 0, 7, 0, 4, 3, 1, 9, 8, 7, 7, 1, 4, 9, 9, 3, 2, 1, 7, 9, 0, 2, 0, 3, 3, 7, 6, 9, 2, 3, 3, 7, 7, 0, 0, 7, 5, 2, 9, 8, 7, 4, 4, 2, 6, 6, 1, 9, 6, 8, 2, 9, 0, 8, 3, 1, 1, 6, 3, 5, 1, 1, 1, 3, 1, 2, 3, 0, 2, 0, 1, 3, 5, 5, 7, 4, 8, 9, 6, 9, 6, 8, 3, 6, 6, 8, 5, 1, 4, 2, 4, 4, 5, 1, 1, 9, 0, 2, 4, 9, 5, 7, 1, 8, 8, 5, 6, 9, 8, 7, 1, 1, 6, 7, 6, 3, 2, 2, 0, 8, 9, 2, 5, 1, 0, 8, 1, 9, 5, 7, 9, 6, 9, 0, 6, 1, 5, 5, 8, 3, 8, 2, 6, 5, 0, 7, 4, 6, 1, 3, 4, 7, 3, 2, 3, 4, 2, 5, 2, 7, 1, 7, 2, 6, 4, 1, 5, 7, 8, 6, 0, 1, 8, 2, 5, 7, 7, 6, 9, 3, 5, 8, 4, 2, 4, 0, 8, 8, 3, 4, 9, 2, 7, 5, 8, 6, 5, 6, 0, 8, 6, 7, 3, 6, 4, 9, 4, 6, 6, 3, 2, 4, 1, 0, 1, 4, 6, 2, 9, 1, 1, 0, 6, 3, 9, 5, 6, 5, 6, 5, 8, 4, 6, 4, 3, 9, 1, 3, 4, 1, 9, 1, 7, 1, 1, 9, 3, 5, 4, 0, 7, 3, 6, 1, 7, 5, 5, 3, 3, 0, 1, 5, 7, 5, 8, 6, 5, 1, 0, 4, 2, 3, 4, 6, 7, 9, 8, 1, 8, 4, 9, 2, 8, 6, 2, 7, 0, 0, 6, 7, 5, 8, 6, 0, 9, 3, 7, 1, 3, 5, 4, 3, 3, 5, 5, 6, 3, 0, 2, 3, 4, 2, 3, 0, 9, 9, 4, 7, 2, 8, 4, 7, 0, 6, 2, 8, 5, 2, 8, 5, 7, 3, 0, 8, 2, 3, 2, 8, 2, 5, 5, 7, 6, 4, 6, 8, 4, 8, 2, 7, 4, 5, 2, 0, 3, 9, 4, 6, 7, 2, 5, 6, 1, 1, 2, 3, 6, 7, 8, 7, 6, 4, 8, 9, 4, 8, 6, 3, 8, 3, 1, 0, 6, 2, 2, 5, 6, 9, 5, 8, 1, 4, 1, 7, 8, 4, 6, 1, 8, 4, 3, 1, 2, 8, 0, 8, 5, 9, 1, 4, 2, 0, 2, 7, 0, 9, 0, 2, 5, 7, 6, 7, 9, 4, 2, 6, 2, 4, 4, 8, 0, 4, 4, 5, 8, 0, 6, 8, 9, 8, 5, 6, 9, 0, 4, 8, 7, 1, 3, 4, 5, 8, 0, 9, 1, 3, 3, 6, 9, 8, 7, 1, 0, 5, 7, 1, 7, 5, 2, 7, 9, 1, 8, 5, 2, 4, 9, 4, 7, 2, 2, 3, 4, 9, 1, 9, 2, 1, 7, 9, 4, 4, 1, 6, 7, 2, 7, 8, 8, 1, 9, 7, 1, 1, 7, 5, 3, 3, 5, 1, 3, 7, 6, 1, 3, 8, 7, 5, 9, 9, 0, 0, 2, 8, 8, 2, 3, 7, 1, 3, 0, 3, 4, 4, 3, 8, 9, 2, 3, 9, 7, 1, 1, 7, 0, 4, 9, 6, 5, 9, 1, 7, 0, 2, 0, 0, 4, 6, 7, 0, 7, 1, 4, 6, 4, 5, 4, 9, 9, 1, 7, 9, 5, 3, 3, 8, 2, 3, 6, 2, 2, 1, 1, 1, 1, 1, 6, 9, 8, 4, 3, 7, 1, 6, 4, 5, 0, 4, 7, 4, 2, 4, 0, 7, 0, 1, 9, 8, 8, 6, 0, 0, 4, 9, 6, 8, 2, 2, 3, 8, 4, 8, 2, 2, 1, 7, 5, 4, 4, 0, 4, 3, 9, 7, 3, 1, 0, 1, 2, 5, 9, 2, 1, 0, 1, 8, 9, 1, 6, 8, 3, 8, 9, 3, 6, 2, 8, 3, 2, 2, 1, 0, 4, 2, 9, 2, 4, 3, 7, 9, 1, 5, 2, 4, 9, 0, 3, 8, 5, 3, 6, 0, 9, 4, 6, 2, 5, 0, 2, 7, 4, 6, 6, 8, 6, 6, 8, 6, 9, 1, 7, 2, 5, 9, 9, 0, 7, 2, 7, 6, 7, 0, 6, 5, 2, 4, 7, 2, 0, 9, 9, 2, 2, 9, 4, 4, 2, 3, 3, 2, 1, 7, 0, 7, 6, 4, 1, 3, 8, 7, 4, 5, 9, 2, 5, 1, 8, 7, 3, 7, 1, 5, 5, 0, 9, 1, 4, 0, 6, 3, 3, 6, 0, 4, 9, 7, 5, 1, 6, 8, 9, 5, 5, 7, 9, 3, 8, 3, 8, 1, 5, 3, 5, 0, 5, 5, 3, 8, 6, 7, 7, 7, 3, 7, 0, 5, 9, 0, 2, 5, 5, 3, 1, 7, 7, 8, 6, 5, 9, 3, 8, 9, 5, 3, 7, 9, 1, 7, 0, 0, 3, 7, 2, 5, 8, 1, 8, 6, 2, 9, 5, 7, 5, 7, 8, 6, 2, 5, 1, 4, 8, 4, 5, 8, 3, 0, 6, 2, 7, 3, 3, 2, 1, 0, 7, 3, 4, 0, 3, 9, 3, 2, 8, 9, 0, 3, 8, 0, 7, 6, 5, 4, 7, 3, 9, 0, 8, 6, 2, 5, 6, 1, 0, 0, 4, 4, 0, 1, 2, 3, 2, 7, 7, 8, 5, 2, 5, 7, 6, 9, 1, 4, 1, 6, 4, 2, 4, 3, 5, 4, 3, 9, 5, 0, 1, 5, 3, 8, 9, 1, 9, 7, 9, 5, 5, 2, 7, 4, 6, 0, 1, 1, 1, 0, 4, 4, 7, 6, 3, 0, 0, 4, 3, 0, 6, 1, 9, 6, 1, 3, 8, 1, 2, 5, 6, 2, 7, 3, 6, 0, 1, 9, 7, 6, 6, 8, 9, 2, 9, 5, 8, 3, 1, 0, 0, 7, 6, 6, 2, 1, 6, 9, 3, 1, 8, 6, 9, 0, 6, 0, 0, 0, 6, 3, 5, 9, 3, 4, 5, 5, 8, 5, 3, 0, 4, 0, 2, 9, 6, 8, 2, 3, 1, 2, 1, 1, 5, 6, 9, 8, 0, 6, 6, 5, 5, 3, 8, 6, 2, 1, 4, 5, 4, 3, 7, 8, 5, 0, 9, 3, 5, 1, 1, 0, 4, 4, 7, 0, 1, 7, 0, 1, 6, 1, 4, 5, 6, 6, 5, 7, 8, 4, 4, 7, 2, 5, 3, 7, 0, 7, 7, 9, 6, 4, 2, 8, 5, 7, 8, 3, 9, 5, 8, 9, 9, 8, 6, 2, 8, 9, 2, 3, 6, 1, 1, 8, 9, 3, 4, 0, 7, 9, 6, 4, 1, 4, 1, 3, 4, 9, 3, 1, 4, 7, 7, 4, 7, 2, 9, 3, 0, 8, 8, 8, 4, 0, 4, 4, 1, 5, 2, 8, 3, 4, 9, 5, 2, 8, 1, 5, 3, 7, 9, 4, 2, 5, 6, 3, 5, 9, 3, 5, 9, 3, 1, 9, 5, 3, 0, 6, 9, 8, 4, 0, 4, 9, 2, 9, 0, 1, 0, 3, 1, 6, 5, 8, 1, 5, 3, 3, 0, 3, 5, 5, 9, 2, 8, 7, 0, 4, 9, 1, 9, 7, 7, 5, 5, 2, 0, 9, 1, 8, 6, 2, 3, 9, 6, 2, 1, 9, 1, 3, 5, 5, 0, 3, 8, 3, 3, 7, 6, 6, 0, 1, 4, 0, 6, 9, 8, 1, 2, 9, 9, 5, 9, 7, 3, 7, 8, 0, 1, 3, 0, 4, 6, 1, 0, 2, 5, 8, 4, 4, 1, 1, 5, 4, 6, 6, 0, 6, 9, 2, 6, 2, 7, 1, 7, 9, 4, 0, 0, 3, 8, 2, 2, 3, 1, 6, 0, 5, 7, 7, 9, 2, 6, 7, 9, 7, 8, 6, 8, 8, 4, 6, 8, 4, 1, 2, 8, 1, 3, 9, 4, 0, 3, 7, 3, 2, 3, 3, 7, 3, 4, 0, 6, 2, 0, 8, 1, 5, 3, 5, 4, 1, 7, 1, 5, 7, 5, 7, 3, 2, 2, 7, 3, 7, 3, 7, 8, 5, 4, 5, 2, 5, 6, 5, 3, 6, 7, 4, 1, 7, 1, 5, 2, 3, 6, 3, 1, 4, 2, 6, 7, 4, 3, 8, 0, 6, 2, 1, 6, 5, 3, 9, 1, 9, 3, 2, 1, 8, 4, 4, 6, 5, 8, 6, 9, 7, 7, 8, 6, 9, 7, 3, 9, 4, 0, 5, 4, 6, 4, 1, 2, 3, 0, 0, 2, 6, 6, 5, 7, 0, 8, 6, 4, 7, 9, 0, 7, 3, 4, 2, 1, 8, 8, 5, 9, 2, 7, 1, 8, 8, 8, 2, 7, 6, 0, 1, 2, 7, 1, 0, 8, 3, 6, 0, 5, 3, 6, 2, 8, 7, 0, 1, 4, 2, 1, 1, 4, 4, 4, 4, 7, 1, 6, 2, 9, 9, 0, 0, 1, 8, 8, 4, 3, 4, 2, 0, 6, 1, 6, 1, 2, 2, 2, 1, 2, 3, 7, 8, 1, 0, 0, 2, 1, 6, 6, 0, 1, 6, 2, 5, 1, 7, 4, 8, 2, 1, 4, 3, 8, 3, 9, 9, 4, 8, 3, 4, 7, 2, 7, 5, 7, 0, 4, 3, 3, 2, 6, 7, 6, 0, 0, 6, 7, 7, 0, 5, 5, 8, 1, 0, 7, 0, 2, 8, 1, 5, 0, 8, 8, 0, 3, 2, 7, 7, 2, 6, 4, 7, 5, 5, 5, 2, 9, 2, 8, 4, 6, 8, 6, 5, 0, 0, 8, 7, 6, 1, 7, 1, 1, 2, 7, 4, 0, 0, 7, 7, 6, 3, 8, 6, 4, 2, 0, 9, 4, 0, 5, 7, 8, 2, 7, 4, 7, 1, 1, 3, 6, 6, 2, 9, 1, 9, 4, 8, 3, 6, 9, 5, 9, 6, 2, 4, 6, 7, 7, 0, 6, 6, 9, 4, 8, 3, 5, 3, 4, 9, 0, 0, 5, 2, 5, 0, 7, 1, 1, 1, 6, 7, 6, 7, 9, 6, 6, 4, 1, 4, 3, 1, 1, 2, 2, 4, 1, 0, 8, 7, 6, 3, 4, 0, 0, 6, 3, 3, 0, 7, 1, 7, 1, 1, 3, 1, 0, 9, 9, 7, 5, 4, 1, 4, 8, 9, 5, 3, 5, 1, 9, 8, 2, 3, 3, 9, 9, 0, 1, 0, 2, 9, 3, 9, 3, 3, 6, 2, 4, 9, 8, 3, 7, 4, 0, 4, 7, 8, 4, 9, 8, 9, 9, 7, 5, 9, 2, 8, 2, 2, 0, 2, 2, 3, 8, 4, 6, 8, 6, 8, 2, 4, 6, 7, 9, 3, 3, 9, 4, 3, 1, 4, 4, 7, 0, 5, 9, 6, 0, 4, 4, 4, 4, 6, 1, 2, 3, 3, 6, 4, 5, 9, 6, 8, 5, 6, 5, 8, 6, 4, 1, 8, 6, 5, 2, 8, 4, 5, 5, 4, 7, 7, 0, 7, 8, 2, 2, 3, 7, 0, 1, 8, 0, 7, 1, 9, 8, 7, 5, 5, 9, 1, 7, 5, 4, 9, 1, 2, 2, 1, 6, 6, 7, 1, 1, 4, 0, 7, 4, 2, 4, 0, 6, 4, 7, 6, 9, 5, 3, 4, 6, 5, 0, 1, 8, 8, 2, 8, 3, 5, 7, 8, 0, 8, 5, 7, 1, 1, 0, 1, 3, 7, 8, 5, 0, 7, 1, 1, 0, 1, 1, 4, 5, 2, 7, 6, 2, 3, 0, 2, 8, 5, 9, 6, 9, 7, 2, 1, 3, 6, 4, 1, 8, 2, 4, 0, 5, 1, 0, 2, 2, 6, 4, 4, 3, 9, 6, 1, 6, 5, 7, 9, 2, 0, 2, 6, 0, 1, 4, 3, 5, 2, 8, 8, 0, 8, 8, 9, 0, 9, 6, 7, 6, 3, 9, 3, 4, 7, 7, 7, 4, 9, 0, 6, 4, 8, 4, 2, 7, 2, 8, 1, 0, 0, 7, 8, 3, 3, 3, 1, 3, 7, 6, 1, 3, 1, 6, 6, 5, 7, 4, 7, 5, 9, 5, 8, 4, 9, 9, 1, 6, 5, 0, 1, 3, 7, 0, 3, 4, 8, 2, 2, 0, 2, 5, 1, 5, 1, 4, 8, 8, 9, 1, 2, 1, 3, 5, 1, 0, 9, 4, 4, 8, 3, 2, 5, 9, 7, 6, 6, 2, 0, 0, 0, 5, 8, 7, 1, 5, 2, 3, 8, 5, 1, 8, 2, 0, 4, 9, 9, 6, 2, 3, 3, 5, 6, 4, 8, 0, 9, 2, 8, 3, 6, 7, 5, 7, 2, 9, 4, 9, 1, 2, 8, 6, 0, 7, 0, 9, 1, 1, 6, 7, 5, 9, 9, 1, 9, 5, 9, 2, 5, 0, 4, 1, 0, 8, 9, 0, 8, 9, 8, 9, 4, 2, 5, 7, 9, 8, 9, 8, 0, 9, 9, 6, 8, 9, 9, 5, 9, 8, 5, 1, 0, 3, 3, 5, 2, 1, 6, 5, 0, 2, 8, 1, 5, 6, 2, 3, 0, 2, 2, 6, 4, 3, 5, 5, 1, 7, 2, 1, 6, 9, 1, 9, 9, 5, 5, 1, 6, 2, 2, 8, 6, 7, 1, 4, 6, 0, 4, 0, 3, 3, 2, 2, 3, 6, 8, 9, 8, 5, 3, 8, 5, 4, 5, 2, 0, 5, 6, 3, 2, 8, 3, 9, 9, 5, 7, 9, 4, 6, 7, 1, 3, 7, 3, 6, 6, 0, 9, 0, 1, 9, 9, 2, 8, 8, 0, 1, 6, 9, 7, 5, 3, 4, 7, 4, 9, 9, 4, 3, 6, 3, 1, 1, 7, 6, 9, 1, 8, 4, 1, 1, 9, 9, 4, 3, 6, 8, 1, 6, 0, 4, 1, 3, 7, 7, 4, 9, 5, 1, 0, 0, 1, 1, 6, 2, 1, 9, 8, 4, 0, 3, 6, 4, 9, 0, 7, 1, 6, 5, 7, 5, 2, 5, 1, 8, 5, 4, 7, 0, 6, 7, 0, 2, 5, 8, 1, 0, 4, 5, 7, 1, 8, 5, 1, 9, 0, 0, 6, 0, 7, 3, 1, 8, 3, 9, 7, 0, 0, 8, 9, 5, 9, 8, 3, 2, 7, 2, 9, 7, 2, 1, 1, 3, 7, 5, 3, 1, 9, 8, 2, 2, 2, 8, 8, 5, 7, 3, 8, 9, 8, 8, 6, 8, 2, 3, 9, 7, 5, 6, 2, 9, 2, 8, 8, 1, 6, 8, 8, 7, 9, 1, 8, 0, 1, 7, 2, 0, 7, 5, 1, 9, 0, 2, 0, 9, 8, 6, 2, 3, 9, 3, 8, 0, 2, 1, 1, 1, 1, 4, 2, 9, 7, 2, 5, 1, 1, 2, 1, 9, 9, 9, 1, 0, 2, 0, 2, 1, 1, 4, 6, 4, 1, 5, 4, 9, 7, 7, 1, 5, 6, 2, 2, 2, 8, 0, 6, 9, 6, 1, 9, 7, 7, 1, 4, 8, 5, 3, 4, 3, 4, 9, 7, 5, 0, 7, 4, 8, 8, 1, 5, 3, 9, 5, 9, 7, 6, 9, 0, 3, 6, 3, 9, 8, 2, 2, 1, 2, 8, 6, 8, 5, 5, 3, 9, 4, 9, 2, 5, 1, 5, 1, 4, 4, 1, 4, 4, 3, 5, 9, 1, 2, 2, 3, 3, 0, 2, 9, 0, 0, 9, 9, 6, 0, 9, 3, 2, 8, 4, 1, 9, 9, 7, 2, 7, 9, 9, 5, 9, 5, 1, 1, 8, 3, 5, 1, 9, 5, 3, 5, 4, 9, 5, 9, 3, 1, 9, 0, 9, 7, 5, 4, 9, 2, 0, 1, 0, 5, 1, 4, 9, 3, 3, 6, 1, 5, 2, 5, 2, 2, 0, 9, 2, 6, 6, 0, 1, 2, 0, 3, 0, 2, 5, 5, 7, 9, 5, 5, 0, 8, 9, 5, 0, 3, 2, 5, 9, 0, 8, 8, 4, 5, 8, 8, 4, 5, 4, 8, 5, 4, 9, 2, 2, 1, 2, 6, 8, 8, 7, 0, 3, 6, 6, 4, 3, 8, 8, 7, 2, 2, 0, 0, 9, 3, 9, 9, 1, 9, 8, 6, 6, 4, 2, 6, 9, 2, 8, 5, 4, 5, 7, 9, 9, 9, 2, 1, 8, 3, 4, 0, 7, 8, 3, 9, 3, 4, 6, 5, 6, 2, 3, 9, 2, 6, 0, 0, 6, 1, 2, 8, 7, 9, 8, 2, 0, 4, 7, 7, 5, 0, 5, 6, 4, 6, 7, 4, 3, 0, 7, 5, 0, 7, 4, 2, 0, 8, 9, 9, 4, 2, 4, 6, 7, 8, 7, 6, 9, 4, 1, 3, 7, 3, 0, 8, 8, 7, 6, 9, 3, 9, 2, 2, 9, 2, 1, 8, 3, 2, 9, 6, 8, 4, 0, 1, 2, 8, 4, 5, 2, 7, 8, 1, 1, 3, 0, 3, 5, 7, 0, 3, 1, 9, 3, 6, 3, 1, 7, 7, 3, 0, 8, 4, 8, 2, 6, 5, 2, 9, 7, 3, 9, 0, 9, 9, 6, 4, 2, 9, 7, 2, 1, 1, 6, 7, 4, 7, 5, 9, 6, 8, 2, 1, 4, 4, 5, 7, 6, 1, 3, 2, 5, 9, 9, 3, 6, 1, 1, 4, 6, 9, 7, 2, 1, 5, 1, 4, 6, 3, 8, 1, 1, 0, 3, 1, 6, 8, 4, 9, 0, 7, 3, 0, 2, 9, 0, 6, 6, 6, 3, 6, 7, 7, 2, 8, 6, 0, 8, 3, 0, 2, 9, 8, 3, 2, 5, 3, 8, 8, 0, 0, 1, 9, 5, 1, 3, 9, 6, 0, 1, 4, 1, 7, 1, 2, 3, 7, 9, 7, 4, 9, 9, 3, 9, 2, 8, 2, 7, 1, 8, 0, 9, 1, 0, 1, 7, 7, 9, 6, 9, 9, 9, 2, 1, 6, 1, 3, 5, 7, 1, 9, 7, 6, 4, 5, 7, 6, 6, 9, 9, 6, 3, 6, 2, 9, 8, 1, 2, 2, 5, 5, 2, 3, 7, 2, 1, 0, 1, 0, 4, 5, 2, 8, 2, 8, 3, 5, 1, 7, 8, 1, 1, 2, 9, 7, 8, 4, 0, 3, 0, 7, 8, 8, 4, 7, 7, 8, 5, 8, 4, 9, 8, 1, 3, 8, 0, 3, 1, 7, 9, 5, 5, 1, 6, 5, 7, 4, 9, 3, 5, 4, 7, 1, 2, 0, 8, 1, 6, 0, 7, 3, 4, 7, 3, 9, 6, 0, 8, 6, 4, 8, 7, 7, 9, 3, 8, 6, 9, 7, 2, 3, 4, 0, 2, 1, 8, 3, 5, 5, 7, 2, 4, 6, 7, 2, 8, 3, 0, 8, 7, 8, 9, 0, 8, 4, 4, 5, 8, 5, 6, 6, 3, 0, 9, 3, 7, 6, 8, 9, 3, 4, 9, 5, 8, 9, 1, 2, 8, 8, 6, 8, 1, 3, 7, 9, 0, 1, 1, 4, 7, 0, 8, 1, 7, 4, 5, 7, 1, 2, 1, 1, 3, 9, 6, 2, 1, 2, 8, 0, 7, 6, 6, 9, 3, 7, 0, 5, 2, 8, 0, 5, 4, 3, 8, 4, 6, 6, 2, 7, 9, 5, 1, 3, 2, 4, 3, 6, 1, 9, 4, 4, 7, 6, 5, 4, 1, 9, 9, 2, 7, 8, 0, 1, 3, 6, 1, 3, 4, 1, 1, 1, 5, 6, 0, 7, 0, 7, 2, 3, 2, 5, 2, 2, 9, 4, 9, 8, 1, 2, 1, 6, 1, 2, 7, 8, 0, 0, 0, 8, 2, 2, 9, 2, 2, 7, 9, 9, 2, 7, 5, 1, 3, 4, 9, 4, 1, 8, 5, 6, 2, 8, 3, 1, 2, 8, 4, 9, 9, 3, 7, 0, 7, 7, 2, 3, 2, 4, 0, 3, 9, 9, 8, 4, 1, 0, 6, 0, 9, 6, 8, 6, 1, 1, 9, 8, 9, 2, 3, 5, 5, 9, 4, 2, 1, 9, 4, 3, 9, 6, 0, 4, 0, 6, 0, 1, 2, 3, 4, 7, 8, 9, 0, 1, 2, 3, 4, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 3, 4, 7, 8, 6, 3, 4, 0, 9, 7, 1, 9, 3, 8, 4, 7, 3, 0, 9, 1, 4, 5, 4, 6, 2, 0, 6, 2, 1, 1, 1, 1, 7, 2, 4, 7, 5, 2, 9, 4, 5, 8, 4, 2, 9, 7, 0, 0, 7, 5, 1, 1, 7, 6, 6, 6, 8, 2, 2, 7, 7, 4, 0, 2, 4, 2, 1, 8, 9, 6, 1, 0, 5, 9, 6, 9, 8, 0, 3, 0, 8, 3, 9, 6, 3, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 5, 4, 8, 7, 4, 7, 7, 3, 9, 8, 8, 3, 1, 5, 8, 2, 7, 4, 2, 1, 5, 4, 5, 5, 8, 6, 4, 4, 4, 1, 8, 7, 5, 5, 1, 8, 9, 1, 3, 6, 3, 3, 2, 2, 6, 9, 9, 6, 5, 5, 3, 3, 8, 1, 6, 5, 6, 8, 1, 9, 7, 6, 8, 3, 7, 4, 7, 0, 9, 0, 0, 3, 7, 9, 3, 0, 2, 0, 1, 0, 1, 0, 4, 0, 1, 0, 4, 7, 9, 6, 2, 6, 2, 2, 9, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 0, 5, 6, 6, 0, 8, 0, 2, 3, 7, 9, 4, 7, 1, 9, 1, 7, 1, 4, 0, 0, 4, 1, 7, 5, 7, 1, 3, 3, 3, 1, 6, 9, 7, 4, 3, 0, 2, 5, 2, 6, 0, 8, 9, 4, 3, 5, 4, 8, 1, 5, 9, 0, 6, 4, 3, 6, 3, 3, 8, 1, 4, 7, 5, 7, 2, 2, 0, 0, 1, 7, 7, 9, 5, 9, 8, 9, 6, 8, 8, 2, 3, 6, 1, 2, 9, 8, 9, 5, 2, 6, 2, 4, 8, 4, 6, 5, 0, 1, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 7, 4, 2, 0, 9, 0, 1, 5, 8, 8, 0, 2, 7, 8, 4, 4, 6, 1, 0, 4, 5, 3, 9, 4, 2, 0, 5, 0, 1, 3, 2, 9, 1, 6, 0, 1, 1, 8, 0, 4, 7, 7, 6, 3, 6, 0, 7, 3, 5, 4, 2, 4, 1, 8, 3, 5, 6, 7, 0, 6, 7, 1, 2, 5, 8, 1, 9, 3, 8, 2, 8, 7, 6, 7, 1, 4, 6, 2, 9, 3, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 0, 1, 2, 8, 9, 1, 4, 0, 9, 5, 0, 8, 0, 7, 7, 1, 1, 2, 9, 3, 6, 7, 2, 3, 8, 1, 2, 9, 8, 8, 7, 1, 7, 1, 1, 0, 3, 4, 2, 6, 4, 7, 4, 2, 7, 4, 9, 1, 0, 6, 8, 5, 5, 5, 3, 5, 9, 7, 4, 8, 5, 9, 6, 9, 3, 0, 3, 8, 9, 1, 8, 1, 6, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 5, 3, 2, 9, 3, 2, 1, 4, 5, 5, 2, 3, 2, 1, 3, 9, 7, 2, 1, 2, 8, 9, 1, 8, 8, 7, 8, 1, 0, 0, 7, 7, 8, 7, 5, 0, 6, 1, 5, 7, 4, 6, 1, 2, 5, 0, 7, 9, 9, 0, 3, 8, 4, 4, 8, 1, 8, 6, 5, 9, 0, 0, 0, 3, 7, 1, 6, 4, 2, 6, 6, 0, 4, 5, 4, 1, 3, 8, 6, 3, 9, 9, 5, 9, 3, 7, 8, 5, 6, 4, 7, 6, 2, 2, 0, 9, 4, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 5, 6, 0, 1, 2, 3, 4, 5, 6, 8, 7, 1, 3, 2, 8, 0, 7, 5, 9, 9, 6, 0, 9, 4, 1, 3, 2, 1, 2, 3, 8, 3, 2, 6, 5, 6, 8, 2, 7, 4, 8, 1, 8, 0, 5, 3, 9, 4, 1, 9, 2, 1, 9, 6, 7, 9, 0, 4, 6, 1, 7, 3, 8, 7, 2, 9, 6, 5, 8, 3, 9, 0, 5, 7, 1, 6, 1, 0, 9, 3, 3, 4, 4, 0, 6, 2, 5, 4, 2, 3, 4, 6, 0, 0, 2, 0, 1, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 1, 3, 7, 5, 2, 8, 0, 7, 5, 9, 9, 0, 9, 1, 1, 5, 8, 8, 6, 3, 2, 1, 8, 3, 2, 6, 5, 6, 7, 4, 1, 0, 5, 3, 1, 9, 2, 1, 9, 6, 0, 4, 6, 1, 7, 3, 8, 7, 2, 9, 6, 5, 8, 3, 5, 7, 1, 6, 1, 0, 9, 6, 2, 5, 4, 2, 3, 4, 4, 6, 0, 0, 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 6, 5, 0, 6, 8, 9, 4, 1, 9, 5, 3, 0, 4, 8, 9, 1, 4, 0, 5, 5, 2, 1, 5, 4, 0, 7, 6, 0, 1, 7, 0, 6, 8, 9, 5, 1, 7, 9, 8, 6, 0, 8, 1, 7, 7, 1, 3, 2, 3, 1, 4, 2, 0, 0, 7, 8, 4, 6, 4, 9, 3, 8, 4, 7, 2, 5, 6, 3, 6, 9, 6, 3, 2, 2, 4, 6, 9, 0, 2, 5, 5, 1, 3, 3, 9, 7, 8, 7, 2, 2, 5, 7, 9, 8, 2, 1, 3, 1, 3, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 6, 5, 3, 0, 7, 0, 4, 1, 4, 3, 6, 7, 2, 3, 1, 2, 1, 2, 9, 6, 0, 1, 3, 0, 2, 7, 5, 7, 6, 2, 9, 1, 9, 0, 6, 0, 6, 0, 2, 0, 6, 1, 5, 8, 4, 3, 0, 1, 5, 4, 4, 8, 5, 7, 5, 7, 8, 3, 4, 8, 8, 5, 2, 9, 7, 1, 3, 8, 1, 0, 7, 5, 9, 6, 9, 4, 7, 7, 9, 9, 3, 4, 4, 3, 8, 6, 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 8, 3, 9, 5, 5, 2, 6, 8, 4, 9, 1, 7, 1, 2, 3, 5, 9, 6, 9, 1, 1, 1, 2, 9, 5, 6, 8, 1, 2, 0, 7, 7, 5, 8, 2, 9, 8, 9, 0, 4, 6, 7, 1, 3, 4, 5, 6, 0, 3, 6, 8, 7, 0, 4, 2, 7, 4, 7, 5, 4, 3, 4, 2, 8, 1, 5, 1, 2, 0, 2, 5, 6, 4, 3, 0, 0, 0, 3, 3, 5, 7, 0, 6, 4, 8, 8, 6, 3, 4, 6, 9, 9, 8, 2, 7, 7, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 2, 1, 7, 2, 5, 0, 8, 0, 2, 7, 8, 8, 3, 6, 0, 2, 7, 6, 6, 1, 2, 8, 8, 7, 7, 4, 7, 7, 3, 7, 4, 5, 4, 3, 3, 8, 4, 1, 1, 9, 7, 4, 3, 7, 3, 3, 0, 2, 5, 5, 6, 6, 3, 5, 2, 5, 9, 9, 8, 4, 1, 0, 6, 0, 9, 6, 8, 8, 5, 6, 1, 1, 9, 8, 9, 2, 3, 5, 5, 9, 4, 2, 1, 9, 3, 9, 2, 0, 6, 0, 4, 0, 0, 1, 2, 3, 4, 7, 8, 9, 0, 1, 2, 3, 7, 8, 9, 0, 1, 2, 3, 4, 7, 8, 9, 7, 3, 0, 3, 1, 8, 7, 6, 4, 0, 2, 6, 8, 3, 2, 8, 1, 2, 0, 7, 1, 0, 4, 4, 5, 8, 0, 6, 2, 3, 1, 5, 1, 8, 5, 9, 4, 0, 7, 5, 8, 8, 3, 8, 9, 2, 6, 2, 5, 3, 1, 7, 3, 9, 1, 9, 9, 6, 0, 3, 9, 2, 8, 1, 4, 3, 5, 2, 9, 2, 5, 8, 9, 5, 0, 1, 2, 4, 5, 6, 0, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 1, 0, 4, 5, 6, 6, 3, 4, 4, 2, 8, 1, 0, 6, 4, 9, 7, 2, 3, 3, 9, 2, 0, 9, 3, 3, 9, 1, 5, 2, 3, 7, 7, 8, 4, 0, 2, 4, 0, 2, 4, 7, 8, 0, 7, 0, 6, 9, 3, 2, 8, 6, 0, 5, 7, 5, 1, 0, 8, 1, 6, 7, 2, 9, 7, 9, 5, 8, 6, 2, 6, 2, 8, 1, 7, 5, 0, 1, 1, 3, 8, 4, 9, 1, 8, 6, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 7, 8, 9, 0, 1, 7, 8, 9, 9, 8, 9, 8, 4, 1, 7, 7, 3, 3, 7, 6, 6, 6, 1, 9, 0, 1, 7, 6, 3, 2, 1, 7, 1, 3, 9, 1, 7, 6, 8, 4, 1, 4, 3, 6, 9, 6, 1, 4, 4, 7, 2, 4, 4, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 9, 0, 1, 2, 3, 4, 7, 8, 1, 3, 5, 1, 7, 7, 2, 1, 4, 8, 3, 4, 4, 3, 9, 7, 4, 1, 2, 3, 5, 9, 1, 6, 0, 1, 0, 0, 2, 8, 7, 1, 1, 4, 0, 4, 7, 3, 6, 8, 0, 3, 7, 4, 0, 6, 9, 2, 6, 5, 8, 6, 9, 0, 4, 0, 6, 1, 9, 2, 0, 9, 5, 1, 3, 7, 6, 9, 3, 0, 2, 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 1, 7, 2, 5, 0, 8, 0, 2, 7, 8, 8, 3, 0, 6, 0, 2, 7, 6, 6, 1, 2, 8, 8, 7, 7, 4, 7, 7, 3, 7, 4, 5, 4, 3, 3, 8, 4, 5, 4, 1, 1, 9, 7, 4, 3, 7, 3, 3, 0, 2, 5, 5, 6, 3, 1, 5, 2, 5, 9, 9, 8, 4, 1, 0, 6, 0, 9, 6, 8, 8, 5, 6, 1, 1, 9, 8, 9, 2, 3, 5, 5, 9, 4, 2, 1, 9, 4, 9, 1, 3, 9, 2, 0, 6, 0, 4, 0, 6, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 8, 0, 7, 1, 0, 7, 5, 5, 6, 9, 0, 1, 0, 0, 8, 3, 4, 3, 1, 5, 0, 0, 9, 5, 3, 4, 9, 3, 7, 6, 9, 2, 4, 5, 7, 2, 6, 4, 9, 4, 9, 4, 1, 2, 2, 5, 8, 1, 3, 2, 9, 4, 3, 8, 2, 2, 1, 2, 8, 6, 5, 1, 6, 7, 2, 1, 3, 9, 3, 8, 7, 5, 7, 0, 7, 4, 8, 8, 5, 0, 6, 6, 3, 7, 6, 9, 9, 4, 8, 4, 1, 0, 6, 6, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 7, 4, 0, 4, 0, 1, 7, 9, 5, 1, 4, 2, 8, 9, 4, 3, 7, 8, 2, 4, 4, 3, 3, 6, 9, 9, 5, 8, 6, 7, 0, 6, 8, 2, 6, 3, 9, 3, 2, 8, 6, 1, 7, 4, 8, 8, 9, 0, 3, 3, 9, 0, 5, 2, 9, 4, 1, 0, 3, 7, 5, 8, 7, 7, 8, 2, 9, 7, 1, 2, 6, 4, 2, 5, 2, 3, 6, 6, 5, 0, 0, 2, 8, 1, 6, 1, 0, 4, 3, 1, 6, 1, 9, 0, 1, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 4, 0, 0, 7, 2, 4, 3, 8, 6, 6, 3, 2, 6, 3, 3, 0, 1, 4, 7, 8, 0, 3, 1, 9, 0, 1, 9, 1, 2, 7, 0, 1, 3, 8, 2, 9, 2, 7, 6, 5, 5, 9, 9, 8, 2, 9, 1, 3, 2, 3, 4, 3, 1, 9, 0, 9, 3, 6, 8, 7, 0, 1, 0, 5, 8, 2, 7, 7, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 7, 4, 8, 1, 5, 6, 5, 7, 2, 8, 6, 3, 3, 8, 6, 5, 4, 0, 9, 1, 7, 2, 9, 1, 5, 1, 3, 2, 2, 3, 0, 6, 4, 3, 7, 6, 9, 0, 4, 8, 1, 4, 0, 6, 1, 2, 6, 9, 2, 2, 3, 5, 5, 1, 0, 7, 7, 9, 6, 2, 9, 4, 7, 0, 2, 3, 4, 0, 0, 8, 8, 8, 5, 1, 3, 7, 4, 9, 8, 8, 9, 0, 9, 8, 9, 0, 2, 6, 5, 6, 7, 4, 7, 5, 4, 1, 3, 5, 3, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 6, 0, 1, 2, 4, 5, 6, 7, 8, 1, 7, 2, 4, 1, 4, 1, 4, 9, 6, 8, 4, 5, 3, 7, 8, 4, 3, 3, 5, 6, 7, 0, 6, 1, 6, 8, 7, 0, 1, 5, 0, 8, 5, 0, 1, 5, 8, 4, 2, 3, 9, 7, 6, 9, 1, 9, 0, 6, 7, 1, 2, 3, 9, 2, 4, 5, 5, 3, 7, 5, 3, 1, 8, 2, 2, 3, 0, 2, 9, 4, 9, 7, 0, 2, 7, 4, 9, 9, 2, 5, 9, 8, 3, 8, 6, 7, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 7, 2, 6, 5, 5, 3, 7, 8, 6, 6, 6, 6, 4, 3, 8, 8, 3, 0, 1, 9, 0, 5, 4, 1, 9, 1, 2, 7, 0, 1, 3, 8, 2, 9, 2, 7, 4, 2, 6, 5, 5, 9, 9, 1, 1, 5, 7, 6, 8, 2, 9, 4, 3, 1, 9, 0, 9, 3, 6, 8, 7, 0, 1, 0, 5, 8, 2, 7, 7, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 1, 2, 1, 3, 9, 9, 8, 5, 3, 7, 0, 7, 7, 5, 7, 9, 9, 4, 7, 0, 3, 4, 1, 5, 8, 1, 4, 8, 4, 1, 8, 6, 6, 4, 6, 0, 5, 5, 3, 3, 5, 7, 2, 5, 9, 6, 9, 2, 6, 2, 1, 2, 0, 8, 3, 8, 3, 0, 8, 7, 4, 9, 5, 0, 9, 7, 0, 0, 4, 6, 0, 9, 1, 6, 2, 7, 6, 8, 3, 5, 2, 1, 8, 3, 8, 6, 1, 0, 2, 1, 4, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 7, 6, 4, 7, 6, 2, 3, 4, 8, 7, 8, 6, 9, 8, 3, 2, 2, 8, 4, 8, 5, 6, 5, 0, 2, 0, 1, 1, 2, 9, 6, 8, 2, 1, 0, 6, 5, 2, 9, 7, 5, 3, 9, 3, 7, 1, 8, 3, 8, 1, 9, 5, 5, 0, 1, 1, 9, 8, 2, 6, 0, 4, 5, 0, 3, 1, 8, 6, 7, 5, 9, 9, 3, 0, 3, 1, 4, 4, 0, 4, 9, 0, 1, 2, 3, 5, 6, 7, 8, 0, 1, 2, 3, 5, 6, 7, 8, 9, 0, 1, 2, 3, 5, 6, 7, 8, 9, 9, 7, 0, 9, 0, 1, 5, 8, 8, 0, 9, 3, 2, 7, 8, 4, 6, 1, 0, 4, 9, 4, 2, 0, 5, 0, 1, 6, 9, 3, 2, 9, 1, 6, 0, 1, 1, 8, 7, 7, 6, 3, 6, 0, 7, 2, 4, 1, 7, 0, 6, 7, 1, 2, 5, 8, 1, 8, 2, 8, 7, 6, 8, 7, 1, 6, 2, 9, 3, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 9, 5, 7, 0, 3, 1, 6, 8, 4, 1, 5, 6, 4, 2, 7, 8, 1, 3, 4, 3, 4, 7, 2, 0, 5, 0, 1, 9, 2, 3, 2, 3, 5, 5, 7, 8, 4, 9, 9, 7, 1, 1, 9, 0, 7, 8, 3, 4, 8, 6, 3, 8, 0, 9, 6, 2, 1, 0, 1, 0, 6, 2, 3, 8, 9, 0, 7, 2, 3, 4, 5, 5, 2, 8, 5, 4, 6, 6, 6, 7, 9, 1, 8, 2, 1, 5, 3, 4, 7, 9, 4, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 9, 0, 1, 3, 1, 5, 1, 2, 4, 9, 2, 4, 6, 8, 0, 1, 1, 9, 2, 6, 6, 8, 7, 4, 2, 9, 7, 0, 2, 1, 0, 3, 6, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 6, 5, 9, 7, 0, 2, 3, 4, 3, 8, 5, 1, 5, 2, 3, 0, 1, 2, 1, 3, 2, 6, 5, 3, 0, 7, 2, 7, 4, 6, 4, 0, 5, 9, 9, 8, 9, 5, 3, 1, 7, 4, 7, 6, 5, 4, 0, 0, 6, 6, 2, 0, 6, 3, 7, 7, 4, 4, 3, 9, 2, 8, 9, 6, 0, 9, 5, 3, 8, 8, 7, 1, 4, 0, 4, 8, 5, 2, 3, 9, 0, 1, 9, 1, 5, 1, 7, 4, 8, 6, 2, 1, 6, 8, 8, 0, 1, 2, 3, 4, 7, 8, 9, 0, 1, 2, 3, 4, 6, 7, 8, 9, 0, 1, 2, 3, 4, 7, 8, 9, 1, 4, 5, 3, 3, 0, 9, 5, 4, 3, 0, 8, 4, 6, 7, 0, 7, 7, 1, 6, 9, 1, 3, 6, 2, 3, 8, 2, 3, 8, 9, 5, 8, 8, 7, 1, 7, 1, 1, 0, 3, 4, 2, 6, 4, 7, 4, 2, 7, 4, 2, 9, 2, 7, 9, 2, 1, 0, 6, 5, 3, 4, 8, 5, 9, 6, 9, 0, 6, 3, 0, 8, 1, 6, 0, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 7, 8, 9, 0, 1, 2, 3, 4, 7, 2, 5, 1, 6, 4, 3, 9, 9, 0, 9, 7, 1, 6, 4, 3, 6, 2, 0, 9, 8, 6, 5, 7, 0, 0, 1, 7, 4, 3, 2, 4, 1, 3, 7, 6, 4, 7, 7, 7, 9, 8, 4, 3, 8, 2, 8, 3, 5, 8, 0, 5, 4, 7, 1, 3, 1, 7, 9, 6, 2, 0, 9, 1, 7, 3, 3, 9, 1, 6, 4, 3, 9, 8, 2, 1, 8, 6, 4, 1, 5, 5, 6, 5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 6, 9, 7, 0, 2, 3, 4, 3, 8, 5, 1, 3, 0, 1, 2, 1, 3, 2, 0, 7, 2, 6, 4, 0, 5, 9, 9, 8, 9, 5, 3, 1, 7, 4, 7, 0, 0, 6, 6, 6, 3, 7, 4, 2, 8, 9, 8, 7, 1, 4, 0, 4, 8, 5, 2, 3, 9, 0, 1, 9, 1, 5, 1, 7, 6, 1, 2, 1, 6, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 5, 6, 7, 8, 1, 0, 4, 5, 6, 6, 3, 4, 4, 2, 8, 1, 0, 6, 4, 9, 7, 2, 9, 2, 0, 9, 3, 3, 9, 1, 5, 2, 3, 1, 6, 7, 3, 7, 8, 4, 0, 2, 4, 0, 2, 4, 7, 8, 0, 7, 0, 6, 9, 3, 2, 4, 8, 6, 0, 5, 7, 5, 1, 0, 8, 1, 6, 7, 2, 9, 7, 9, 5, 6, 5, 2, 6, 2, 8, 1, 7, 5, 5, 7, 3, 5, 0, 1, 1, 3, 8, 4, 9, 4, 5, 1, 8, 6, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 5, 3, 2, 9, 3, 2, 1, 4, 5, 5, 2, 3, 2, 1, 3, 9, 7, 2, 1, 2, 8, 9, 1, 8, 8, 7, 8, 1, 0, 0, 6, 7, 7, 8, 7, 5, 0, 6, 1, 5, 7, 4, 6, 1, 2, 5, 0, 7, 9, 9, 0, 3, 4, 4, 8, 4, 1, 8, 6, 5, 9, 0, 0, 0, 3, 7, 1, 6, 4, 6, 0, 4, 5, 4, 1, 3, 8, 6, 3, 9, 9, 5, 9, 3, 7, 8, 5, 6, 4, 7, 6, 2, 2, 0, 9, 4, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 6, 4, 2, 6, 4, 7, 5, 5, 4, 7, 2, 9, 3, 9, 3, 8, 2, 0, 9, 5, 6, 0, 1, 0, 6, 5, 3, 5, 3, 8, 0, 0, 3, 4, 1, 5, 3, 0, 8, 3, 0, 6, 2, 7, 8, 1, 7, 1, 3, 8, 5, 4, 2, 0, 9, 7, 6, 7, 4, 1, 6, 2, 6, 7, 1, 9, 8, 0, 6, 9, 4, 9, 9, 6, 2, 3, 7, 1, 9, 2, 2, 5, 3, 7, 8, 0, 1, 2, 3, 4, 7, 8, 9, 0, 1, 2, 3, 4, 7, 8, 9, 0, 1, 7, 8, 9, 8, 9, 2, 6, 1, 3, 5, 4, 8, 2, 6, 4, 3, 4, 5, 9, 2, 0, 3, 9, 4, 9, 7, 3, 8, 7, 4, 4, 9, 8, 5, 8, 2, 6, 6, 2, 3, 1, 3, 2, 7, 3, 1, 9, 0, 1, 1, 3, 5, 0, 7, 8, 1, 5, 1, 4, 6, 0, 0, 4, 9, 1, 6, 6, 9, 0, 7, 6, 1, 1, 0, 1, 2, 3, 4, 7, 2, 3, 4, 5, 6, 7, 0, 1, 2, 7, 8, 6, 3, 9, 7, 1, 9, 3, 9, 6, 1, 7, 2, 4, 4, 5, 7, 0, 0, 1, 6, 6, 8, 2, 7, 7, 2, 4, 2, 1, 6, 1, 0, 6, 9, 8, 3, 9, 6, 3, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 6, 8, 9, 9, 0, 1, 2, 4, 4, 3, 7, 4, 4, 4, 0, 3, 8, 7, 5, 8, 2, 1, 7, 5, 3, 8, 5, 2, 5, 1, 1, 6, 2, 1, 3, 8, 6, 4, 2, 6, 2, 5, 5, 0, 2, 8, 0, 6, 8, 1, 7, 9, 1, 9, 2, 6, 7, 6, 6, 8, 7, 4, 9, 2, 1, 3, 3, 0, 5, 5, 8, 0, 3, 7, 9, 7, 0, 2, 7, 9, 1, 7, 8, 0, 3, 5, 3, 6, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 7, 8, 9, 6, 4, 2, 6, 4, 7, 8, 9, 2, 9, 3, 9, 3, 0, 0, 1, 0, 4, 2, 6, 3, 5, 3, 0, 3, 4, 1, 5, 3, 0, 8, 3, 0, 6, 1, 7, 8, 0, 9, 2, 6, 7, 1, 9, 6, 9, 4, 9, 9, 6, 7, 1, 2, 5, 3, 7, 8, 0, 1, 2, 4, 5, 6, 7, 8, 9, 0, 1, 3, 4, 5, 6, 7, 8, 0, 1, 3, 4, 7, 8, 9, 7, 5, 5, 1, 9, 9, 7, 1, 0, 0, 5, 9, 7, 1, 7, 2, 2, 3, 6, 8, 3, 2, 0, 0, 6, 1, 7, 5, 8, 6, 2, 9, 4, 8, 8, 7, 1, 0, 8, 7, 7, 5, 8, 5, 3, 4, 6, 1, 1, 5, 5, 0, 7, 2, 3, 6, 4, 1, 2, 4, 1, 5, 4, 2, 0, 4, 8, 6, 1, 9, 0, 2, 5, 6, 9, 3, 6, 3, 6, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 5, 6, 7, 8, 1, 0, 9, 5, 7, 5, 1, 8, 6, 9, 0, 4, 1, 9, 3, 8, 4, 4, 7, 0, 1, 9, 2, 8, 7, 8, 2, 5, 9, 6, 0, 6, 5, 5, 3, 3, 3, 9, 8, 1, 1, 0, 6, 1, 0, 0, 6, 2, 1, 1, 3, 2, 7, 7, 8, 8, 7, 8, 4, 6, 0, 2, 0, 7, 0, 3, 6, 8, 7, 1, 5, 9, 9, 3, 7, 2, 4, 9, 4, 3, 6, 2, 2, 5, 3, 2, 5, 5, 9, 4, 1, 7, 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 0, 1, 2, 7, 5, 3, 4, 4, 0, 0, 6, 9, 6, 6, 5, 7, 2, 3, 4, 4, 9, 1, 4, 0, 7, 9, 5, 7, 2, 3, 1, 4, 4, 0, 9, 9, 6, 1, 8, 3, 3, 7, 3, 9, 8, 8, 4, 7, 7, 6, 2, 1, 9, 8, 7, 8, 8, 7, 2, 2, 3, 9, 3, 3, 5, 5, 0, 7, 9, 5, 6, 5, 1, 4, 1, 1, 2, 8, 2, 6, 1, 5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 0, 6, 0, 0, 2, 3, 7, 9, 4, 7, 1, 9, 1, 7, 1, 4, 0, 0, 1, 7, 5, 7, 1, 3, 3, 3, 1, 6, 9, 7, 1, 3, 0, 2, 6, 0, 8, 9, 4, 3, 5, 4, 8, 1, 5, 9, 0, 6, 6, 3, 8, 1, 4, 7, 5, 2, 0, 0, 1, 7, 8, 9, 6, 8, 8, 2, 3, 6, 1, 2, 9, 5, 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 7, 4, 6, 1, 4, 0, 9, 9, 3, 7, 8, 4, 7, 5, 8, 5, 3, 2, 2, 0, 5, 8, 6, 0, 3, 8, 1, 0, 3, 0, 4, 7, 4, 9, 2, 9, 5, 7, 1, 7, 1, 6, 6, 5, 6, 2, 8, 7, 6, 4, 9, 9, 5, 3, 7, 4, 3, 0, 4, 6, 6, 1, 1, 3, 2, 1, 0, 0, 1, 2, 3, 4, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 7, 8, 9, 0, 8, 3, 9, 5, 5, 2, 6, 8, 4, 1, 7, 1, 2, 3, 5, 6, 9, 1, 1, 1, 2, 1, 2, 0, 7, 7, 5, 8, 2, 9, 8, 6, 7, 3, 4, 6, 8, 7, 0, 4, 2, 7, 7, 5, 4, 3, 4, 2, 8, 1, 5, 1, 0, 2, 3, 3, 5, 7, 0, 6, 8, 6, 3, 9, 9, 8, 2, 7, 7, 1, 0, 1, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 7, 8, 9, 7, 8, 6, 4, 1, 9, 3, 8, 4, 4, 7, 0, 1, 9, 2, 8, 7, 8, 2, 6, 0, 6, 5, 3, 3, 3, 9, 1, 4, 0, 6, 1, 0, 0, 6, 2, 1, 1, 7, 7, 8, 4, 6, 0, 7, 0, 3, 6, 8, 7, 1, 5, 2, 4, 9, 4, 3, 6, 4, 1, 7, 2, 6, 5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6];


/***/ })
/******/ ]);
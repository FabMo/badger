// Lookup tables for topological thinning
var lut_a = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var lut_b = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]
var lut_c = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var lut_d = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var lut_e = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var lut_f = [0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var lut_g = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var lut_h = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

var PointStore = function() {
	this.map = {};
}

PointStore.prototype.add = function(x,y,v) { 
	this.map[[x,y]] = [x,y,v]; 
}
PointStore.prototype.has = function(x,y) { return [x,y] in this.map; }
PointStore.prototype.remove = function(x,y) { delete this.map[[x,y]]; }
PointStore.prototype.getPoints = function() {
	retval = [];
	for(key in this.map) {
		v = this.map[key];
		retval.push([v[0],v[1]]);
	}
	return retval;
}
PointStore.prototype.size = function() { return Object.keys(this.map).length; }
PointStore.prototype.value = function(x,y) { 
	try {
		return this.map[[x,y]][2]; 
	} catch(e) {
		return undefined;
	} 
}
PointStore.prototype.clone = function(v) {
	retval = new PointStore();
	for(key in this.map) {
		pt = this.map[key];
		retval.map[key] = [pt[0],pt[1], (typeof v != 'undefined') ? v : pt[2]];
	}
	return retval;
}
PointStore.prototype.increment = function(x,y) { this.map[[x,y]][2] += 1; }
PointStore.prototype.translate = function(dx,dy) {
	retval = new PointStore();
	for(key in this.map) {
		pt = this.map[key];
		retval.map[[pt[0]+dx,pt[1]+dy]] = [pt[0],pt[1],pt[2]];
	}
	return retval;
}

// Return maximum value in an array
function max(arr) {
	retval = arr[0];
	for(var i=1; i<arr.length; i++) {
		retval = Math.max(arr[i], retval);
	}
	return retval;
}

// Return minimum value in an array
function min(arr) {
	retval = arr[0];
	for(var i=1; i<arr.length; i++) {
		retval = Math.min(arr[i], retval);
	}
	return retval;
}

// Return a bit mask that corresponds to the neighborhood of pixel values supplied
function neighborhoodToMask(n,ne,e,se,s,sw,w,nw) {
	return (n << 0) | (ne << 1) | (e << 2) | (se << 3) | (s << 4) | (sw << 5) | (w << 6) | (nw << 7);
}

// Image object.  Constructor can create from a canvas, context, or an empty image from dimensions
function Img(arg1,arg2) {
	function arrayFromCanvas(canvas) {
		var ctx = canvas.getContext('2d');
		var imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
		var data = imgData.data;
		retval = [];
		for(var i=0; i<data.length; i+=4) {
			v = Math.max(data[i], data[i+1], data[i+2]);
			retval.push(v);
		}
		return retval;
	}

	if(arg1 instanceof jQuery) {
		canvas = arg1[0];
		this.width = canvas.width;
		this.height = canvas.height;
		this.d = arrayFromCanvas(arg1);
	} else if(arg1 instanceof HTMLCanvasElement) {
		this.width = arg1.width;
		this.height = arg1.height;
		this.d = arrayFromCanvas(arg1);
	} else if(arg1 instanceof CanvasRenderingContext2D) {
		this.width = arg1.canvas.width;
		this.height = arg1.canvas.height;
		this.d = arrayFromCanvas(arg1.canvas);
	} else if(arg1 !== undefined && arg2 !== undefined) {
		this.width = arg1;
		this.height = arg2;
		this.d = [];
		for(i=0; i<this.width*this.height; i++) {
			this.d.push(0);
		}
	} else {
		throw "I don't know how to make an image from this"
	}
}

// Draw this image on the supplied canvas
Img.prototype.drawOn = function(canvas, lut) {
	var ctx = canvas.getContext("2d");
	var imgData = ctx.createImageData(this.width, this.height);
	var data = imgData.data;
	var i=0;
	for(var j=0; j<data.length; j+=4) {
		var v = this.d[i++];
		if(lut) {
			data[j] = lut.red(v);
			data[j+1] = lut.green(v);
			data[j+2] = lut.blue(v);
		} else {
			data[j] = v;
			data[j+1] = v;
			data[j+2] = v;
		}
		data[j+3] = 0xff;

	}
	ctx.putImageData(imgData, 0,0);
}

// Set all pixels in this image that are above thresh to the value supplied
Img.prototype.threshold = function(thresh, value) {
	value = value || 0xff;
	for(var i=0; i<this.d.length; i++) {
		this.d[i] = this.d[i] >= thresh ? value : 0;
	} 
}

// Set a pixel to a value
Img.prototype.setPixel = function(x,y,val) {
	this.d[x+y*this.width] = val;
}

// Get the value of the supplied pixel
Img.prototype.getPixel = function(x,y) {
	return this.d[x+y*this.width];
}

// Perform a single morphological dilation with a d8 kernel
Img.prototype._dilate = function() {
	for(var x = 1; x<this.width-1; x++) {
		for(var y=1; y<this.height-1; y++) {
			center = this.getPixel(x,y);
			if(center === 0x00) {
				a = this.getPixel(x-1,y-1);
				b = this.getPixel(x+0,y-1);
				c = this.getPixel(x+1,y-1);
				d = this.getPixel(x-1,y+0);
				//e = this.getPixel(x,y);
				f = this.getPixel(x+1,y+0);
				g = this.getPixel(x-1,y+1);
				h = this.getPixel(x+0,y+1);
				i = this.getPixel(x+1,y+1);
				var v = a | b | c | d | f | g | h | i;
				if(v === 0xff) {
					this.setPixel(x,y,1);
				}
			}
		}
	}
}

// Perform a single morphological erosion with a d8 kernel
Img.prototype._erode = function() {
	for(var x = 1; x<this.width-1; x++) {
		for(var y=1; y<this.height-1; y++) {
			center = this.getPixel(x,y);
			if(center === 0xff) {
				a = this.getPixel(x-1,y-1);
				b = this.getPixel(x+0,y-1);
				c = this.getPixel(x+1,y-1);
				d = this.getPixel(x-1,y+0);
				//e = this.getPixel(x,y);
				f = this.getPixel(x+1,y+0);
				g = this.getPixel(x-1,y+1);
				h = this.getPixel(x+0,y+1);
				i = this.getPixel(x+1,y+1);
				var v = a & b & c & d & f & g & h & i;
				if(v === 0) {
					this.setPixel(x,y,1);
				}
			}
		}
	}
}

// Dilate the image by the specified amount
Img.prototype.dilate = function(iterations) {
	var iterations = iterations || 1;
	for(var i=0; i<iterations; i++) {
		this._dilate();
		this.threshold(1, 0xff);
	}
}

// Erode the image by the specified amount
Img.prototype.erode = function(iterations) {
	var iterations = iterations || 1;
	for(var i=0; i<iterations; i++) {
		this._erode();
		this.threshold(2, 0xff);
	}
}

// Ajust the range of the image to the min/max specified
Img.prototype.normalize = function(minval, maxval) {
	var img_min = min(this.d);
	var img_max = max(this.d);
	var img_scale = (img_max - img_min);
	var output_scale = (maxval-minval);

	for(var i=0; i<this.d.length; i++) {
		var p = minval + output_scale*(this.d[i] - img_min)/img_scale;
		this.d[i] = p;
	}
}

// Get the bit mask for the neighborhood of the specified pixel
Img.prototype.neighborhood = function(x,y) {
	nw = this.getPixel(x-1,y-1) ? 1 : 0;
	n = this.getPixel(x+0,y-1) ? 1 : 0;
	ne = this.getPixel(x+1,y-1) ? 1 : 0;
	w = this.getPixel(x-1,y+0) ? 1 : 0;
	e = this.getPixel(x+1,y+0) ? 1 : 0;
	sw = this.getPixel(x-1,y+1) ? 1 : 0;
	s = this.getPixel(x+0,y+1) ? 1 : 0;
	se = this.getPixel(x+1,y+1) ? 1 : 0;
	return neighborhoodToMask(n,ne,e,se,s,sw,w,nw);
}

// Chessboard distance transform
Img.prototype.cdt = function() {
	// Create second image to store result
	new_img = new Img(this.width, this.height);
	this.threshold(0xff, 0xffff);
	var pixel_changed = true;
	var max_v = 0
	var iteration = 0;
	while(pixel_changed) {
		iteration += 1;
		pixel_changed = false;
		var pixels_changed = 0;
		for(var x = 1; x<this.width-1; x++) {
			for(var y=1; y<this.height-1; y++) {
				center = this.getPixel(x,y);
				if(center === 0xffff) {
					 n = this.getPixel(x+0,y-1);
					 e = this.getPixel(x+1,y+0);
					 s = this.getPixel(x+0,y+1);
					 w = this.getPixel(x-1,y+0);
					nw = this.getPixel(x-1,y+1);
					ne = this.getPixel(x+1,y-1);
					se = this.getPixel(x+1,y-1);
					sw = this.getPixel(x-1,y+1);

					var v = n & s & e & w 
					var v2 = ne & se & sw & ne;

					if(v === 0) {
						new_img.setPixel(x,y,iteration);
						this.setPixel(x,y,1.0);
						pixel_changed = true;
						pixels_changed += 1;
						
					} else  if(v2 === 0) {
						new_img.setPixel(x,y,iteration);
						this.setPixel(x,y,1);						
						//this.setPixel(x,y,1.41421356237);
						pixel_changed = true;
						pixels_changed += 1;
					}
				}
			}
		}
		this.threshold(2, 0xffff);
	}
	for(i=0; i<this.d.length; i++) {
		this.d[i] = new_img.d[i];
	}
}

// Chessboard distance transform
Img.prototype.mdt = function() {
	// Create second image to store result
	new_img = new Img(this.width, this.height);
	this.threshold(0xff, 0xffff);
	var pixel_changed = true;
	var max_v = 0
	var iteration = 0;
	while(pixel_changed) {
		iteration += 1;
		pixel_changed = false;
		var pixels_changed = 0;
		for(var x = 1; x<this.width-1; x++) {
			for(var y=1; y<this.height-1; y++) {
				center = this.getPixel(x,y);
				if(center === 0xffff) {
					n = this.getPixel(x+0,y-1);
					s = this.getPixel(x+0,y+1);
					w = this.getPixel(x-1,y+0);
					e = this.getPixel(x+1,y+0);
					var v = n & s & e & w;
					if(v === 0) {
						new_img.setPixel(x,y,iteration);
						this.setPixel(x,y,1);
						pixel_changed = true;
						pixels_changed += 1;
						
					}
				}
			}
		}
		this.threshold(2, 0xffff);
	}
	for(i=0; i<this.d.length; i++) {
		this.d[i] = new_img.d[i];
	}
}

Img.prototype.clone = function() {
	retval = new Img(this.width, this.height)
	for(i=0; i<this.d.length; i++) {
		retval.d[i] = this.d[i];
	}
	return retval;
}

Img.prototype.mask = function(img) {
	if(this.d.length != img.d.length) {
		throw "Can't mask.  Images aren't the same size"
	}
	for(i=0; i<this.d.length; i++) {
		this.d[i] = img.d[i] ? this.d[i] : 0;
	}
}

Img.prototype.skel = function() {
	var changed = true;
	while(changed) {
		changed = false;
		changed |= this._thin(lut_a);
		changed |= this._thin(lut_b);
		changed |= this._thin(lut_c);
		changed |= this._thin(lut_d);
		changed |= this._thin(lut_e);
		changed |= this._thin(lut_f);
		changed |= this._thin(lut_g);
		changed |= this._thin(lut_h);
	}
}

Img.prototype.mat = function() {
	mask = this.clone();
	mask.skel();
	this.mdt();
	//this.cdt();
	this.mask(mask);
}

Img.prototype._thin = function(lut) {
	var changed = false;
	for(var x = 1; x<this.width-1; x++) {
		for(var y=1; y<this.height-1; y++) {
			center = this.getPixel(x,y);
			if(center === 0xff) {
				var mask = this.neighborhood(x,y)
				if(lut[mask]) {
					this.setPixel(x,y,1)
					changed = true;
				}
			}
		}
	}
	this.threshold(2, 0xff);
	return changed;
}

Img.prototype.getOnPixels = function() {
	retval = new PointStore();
	for(var y=this.height-1; y>=0; y--) {
		for(var x=0; x<this.width; x++) {
			px = this.getPixel(x,y);
			if(px) { 
				retval.add(x,y,px);
			}
		}
	}
	return retval;
}
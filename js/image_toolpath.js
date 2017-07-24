function move(x,y,z,fr) {
	return "G1 X" + Number(x).toFixed(4) + " Y" + Number(y).toFixed(4) + " Z" + Number(z).toFixed(4) + " F" + (fr*60.0).toFixed(4);
};

function jog(x,y) {
	return "G0 X" + Number(x).toFixed(4) + " Y" + Number(y).toFixed(4);
};
function pullup(z) {
	return "G0 Z" + Number(z).toFixed(4);
};

function getLowerLeftMostPoint(ps) {
	all_points = ps.getPoints();
	var xmin = all_points[0][0];
	var ymin = all_points[0][1];
	for(var i in all_points) {
		p = all_points[i];
		if(p[0] < xmin) {
			if(p[1] < ymin) {
				xmin = p[0];
				ymin = p[1];
			}
		}
	}
	return [xmin,ymin];
}

function getHighestPoint(ps) {
	all_points = ps.getPoints();
	var pmin = all_points[0];
	var vmin = ps.value(pmin[0],pmin[1]);
	for(var i in all_points) {
		p = all_points[i];
		if(ps.value(p[0],p[1]) < vmin) {
			min = p;
		}
	}
	return pmin;
}

function extractGlyphs(ps) {
	var ps = ps.clone();
	function destructiveSearch(ps, x, y, glyph) {
		if(glyph) {
			var glyph = glyph;
		} else {
			var glyph = new PointStore();
		}
		if(ps.has(x,y)) {
			px = ps.value(x,y);
			glyph.add(x,y,px);
			ps.remove(x,y);
			destructiveSearch(ps, x+0,y+1, glyph); //N
			destructiveSearch(ps, x+1,y+1,glyph); //NE
			destructiveSearch(ps, x+1,y+0, glyph); //E
			destructiveSearch(ps, x+1,y-1,glyph); //SE
			destructiveSearch(ps, x+0,y-1,glyph); //S
			destructiveSearch(ps, x-1,y-1,glyph); //SW
			destructiveSearch(ps, x-1,y+0,glyph); //W
			destructiveSearch(ps, x-1,y+1,glyph); //NW
		}
		return glyph;
	}

	glyphs = [];
	while(ps.size() > 0) {
		var starting_point = getLowerLeftMostPoint(ps);
		var x = starting_point[0];
		var y = starting_point[1];
		glyphs.push(destructiveSearch(ps, x,y));
	}
	return glyphs;
}

function glyphToPath(glyph) {
	// Visit memo, increment pixel values on each visit
	var memo = glyph.clone(0);
	// Unvisited set, remove pixels once visited
	var unvisited = glyph.clone();
	// Path stack for backtracking
	var pathstack = [];
	// Path which is ultimately returned
	var path = [];
	// True if we've passed a junction since we started walking the path
	var has_choices = false;

	function choices(x,y,v) {
		neighbors = [];
		if(memo.value(x+0,y+1) <= v) {neighbors.push([x+0,y+1]);}
		if(memo.value(x+1,y+1) <= v) {neighbors.push([x+1,y+1]);}
		if(memo.value(x+1,y+0) <= v) {neighbors.push([x+1,y+0]);}
		if(memo.value(x+1,y-1) <= v) {neighbors.push([x+1,y-1]);}
		if(memo.value(x+0,y-1) <= v) {neighbors.push([x+0,y-1]);}
		if(memo.value(x-1,y-1) <= v) {neighbors.push([x-1,y-1]);}
		if(memo.value(x-1,y+0) <= v) {neighbors.push([x-1,y+0]);}
		if(memo.value(x-1,y+1) <= v) {neighbors.push([x-1,y+1]);}
		return neighbors
	}

	function visit(x,y) {
		memo.increment(x,y);
		unvisited.remove(x,y);
		path.push([x,y]);
		return choices(x,y,0);
	}

	// Break out of this 
	while(unvisited.size() > 0) {
		// Start at the "highest" point (the one with the lowest pixel value)
		var loc = getHighestPoint(unvisited);
		// Initially, there's one and only one path to search
		has_choices = false;

		// We'll break out of this loop every time we pick the tool up or if we've visited everything
		while(unvisited.size() > 0) {
			// Visit the current location
			next_choices = visit(loc[0],loc[1]);

			// If the there are more than one paths to take, take the first one,
			// but make a note that there's choices left to explore
			if(next_choices.length > 1) {
				has_choices = true;
				pathstack.push(loc);
				loc = next_choices[0];
			} else if(next_choices.length == 1) {
				pathstack.push(loc);
				loc = next_choices[0];
			} else {
				// If there's still a place we can go that has unexplored choices,
				// we allow backtracking over our existing path to revisit them
				loc = has_choices ? pathstack.pop() : null;
			}

			// loc === null means we ran out of explorable branches, or we ran out of area to backtrack
			// either way, pick up the tool, and resume with any unexplored area that's left.
			if(loc == null) {
				path.push(null); // Marker in the output path to indicate that we're picking up the tool
				break;
			}
		}
	}
	return path;
}

function createTextCanvas(text, font) {
	var cvs = document.createElement('canvas');
	var cxt = cvs.getContext("2d");
	cxt.font = font;
	var metrics = cxt.measureText(text);
	cvs.width = metrics.width + 20;
	cvs.height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + 20;
	var x = 10;
	var y = cvs.height-metrics.actualBoundingBoxDescent-10;
	
	cxt.font = font;
	cxt.fillStyle = "#330066";
	cxt.fillText(text, x,y);

	cvs.origin = [x,y];
	cvs.fontMetrics = metrics;

	return cvs;
}
function createPaths(paths, pointset, scale, ox, oy, theta) {
	output = []
	var pulled_up = true;
	for(path in paths) {
		path = paths[path];
		current_output = [];
		for(i in path) {
			point = path[i];
			// Pull up for dead ends within a path
			if(point === null) {
				output.push(current_output);
				current_output = []
				pulled_up = true;
			} else {
				var x = scale*(point[0]-ox);
				var y = -scale*(point[1]-oy);
				var z = -scale*(pointset.value(point[0],point[1])/2.0)/Math.sin(theta);
				// Jog between pullups
				if(pulled_up) {
					pulled_up = false;
				}
				current_output.push({'x':x,'y':y,'z':z});
			}
		}
		output.push(current_output);
		current_output = []
		pulled_up = true;
	}
return output
}

function createToolPaths(canvas, options) {
	options = options || {};
	var feedrate = options.feedrate || 2.0;
	var bit_angle = options.bit_angle || 90.0;
	var theta = 0.0174532925*(bit_angle/2.0);
	var zpullup = options.zpullup || 0.5;
	var text_height = options.text_height || 2.0;
	var debug = options.debug;

	// Create an image for dealing in memory
	var img = new Img(canvas);

	// Convert to monochrome
	img.threshold(1,0xff);

	// Medial axis transform
	img.mat();

	// Extract points on the skeleton
	pointset = img.getOnPixels();



	if(debug) {
		img.normalize(0, 0xff);
		canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		img.drawOn(canvas, LUTBlueOrange);
		$('#debug').append(canvas);
	}
	// Pull glyphs
	glyphs = extractGlyphs(pointset);

	// Find paths via search
	var paths = []
	for(i in glyphs) {
		paths.push(glyphToPath(glyphs[i]));
	}

	// Info!
	console.info(glyphs.length + " glyphs extracted.")

	// Begin the gcode file
	var gcodes = [
		'(VCarve File)',
		pullup(zpullup),
		'M4',
		'G4 P3'
	];

	var pulled_up = true;
	var scale = text_height/canvas.fontMetrics.actualBoundingBoxAscent;
	var ox = canvas.origin[0];
	var oy = canvas.origin[1];
	simplifyablePaths = createPaths(paths, pointset, scale, ox, oy, theta);
	simple_paths = []
	for(path in simplifyablePaths) {
		path = simplifyablePaths[path];
		simple_paths.push(simplify(path, 0.005, true));
		//simple_paths.push(path);
	}

	for(path in simple_paths) {
		path = simple_paths[path];
		gcodes.push(jog(path[0].x, path[0].y));
		for(point in path) {
			point = path[point];
			gcodes.push(move(point.x, point.y, point.z, feedrate));
		}
		gcodes.push(pullup(zpullup));
	}
	/*
	for(path in paths) {
		path = paths[path];
		for(i in path) {
			point = path[i];
			// Pull up for dead ends within a path
			if(point === null) {
				gcodes.push(pullup(zpullup));
				pulled_up = true;
			} else {
				var x = scale*(point[0]-ox);
				var y = -scale*(point[1]-oy);
				var z = -scale*pointset.value(point[0],point[1])/Math.sin(theta);
				// Jog between pullups
				if(pulled_up) {
					gcodes.push(jog(x,y));
					pulled_up = false;
				}
				gcodes.push(move(x, y, z, feedrate))
			}
		}
		// Pull up between paths
		gcodes.push(pullup(zpullup));
		pulled_up = true;
	}
	*/
	//gcodes.push(pullup(zpullup));
	gcodes.push(jog(0,0));
	gcodes.push('M8');
	return gcodes.join('\n');
}
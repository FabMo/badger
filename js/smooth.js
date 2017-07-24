function makeSmooth(){
	if (points.length){
		if(points[points.length-1].length>0){
			endpts.push([points[points.length-1][0]])
			endpts[endpts.length-1].push(points[points.length-1][points[points.length-1].length-1])
		}
	

	if((Math.abs(endpts[endpts.length-1][0].x-endpts[endpts.length-1][1].x)<=10) && (Math.abs(endpts[endpts.length-1][0].y-endpts[endpts.length-1][1].y)<=10)){
		endpts[endpts.length-1][1]=endpts[endpts.length-1][0]
		points[points.length-1].push(endpts[endpts.length-1][0])
		endpts.pop()
	}
	else{

		for(i=endpts.length-2;i>=0;i--){
			if((Math.abs(endpts[endpts.length-1][0].x-endpts[i][0].x)<=15) && (Math.abs(endpts[endpts.length-1][0].y-endpts[i][0].y)<=10)){
				endpts[endpts.length-1][0]=endpts[i][0]
				points[points.length-1].splice(0,0,endpts[i][0])
			}
	
			if((Math.abs(endpts[endpts.length-1][1].x-endpts[i][1].x)<=15) && (Math.abs(endpts[endpts.length-1][1].y-endpts[i][1].y)<=10)){
				endpts[endpts.length-1][1]=endpts[i][1]
				points[points.length-1].push(endpts[i][1])
			}
	
			if((Math.abs(endpts[endpts.length-1][1].x-endpts[i][0].x)<=15) && (Math.abs(endpts[endpts.length-1][1].y-endpts[i][0].y)<=10)){
				endpts[endpts.length-1][1]=endpts[i][0]
				points[points.length-1].push(endpts[i][0])
			}
	
			if((Math.abs(endpts[endpts.length-1][0].x-endpts[i][1].x)<=15) && (Math.abs(endpts[endpts.length-1][0].y-endpts[i][1].y)<=10)){
				endpts[endpts.length-1][0]=endpts[i][1]
				points[points.length-1].splice(0,0,endpts[i][1])
			}
		}
	}

	var g = (parseInt(document.getElementById("gloss").value))
	//simplify
	points[points.length-1]=simplify(points[points.length-1], (g), false)
	curve=points[points.length-1]
	smooth.push([])

	if(curve.length==1){
		smooth[points.length-1].push(curve[0])
	}

	//CHAIKIN'S ALGORITHM
	if(g>6){
		g=6
	}

	if(curve.length>1){
		if(smooth[points.length-1]) {
			while(n<(g)){
		
			smooth[points.length-1].push(curve[0])
			for(i=0;i<curve.length-1;i++){
				var p0 = curve[i]
				var p1 = curve[i+1]
				var p0x = p0.x,
					p0y = p0.y,
					p1x = p1.x,
				p1y = p1.y

					smooth[points.length-1].push({x:(0.75*p0x+0.25*p1x),y:(0.75*p0y+0.25*p1y)})
					smooth[points.length-1].push({x:(0.25*p0x+0.75*p1x),y:(0.25*p0y+0.75*p1y)})
				}
				smooth[points.length-1].push(curve[curve.length-1])
				curve=smooth[points.length-1]
				smooth[points.length-1]=[]
				n++
			}
		}
	}

	n=0
	smooth[points.length-1]=curve
	}
	for(i=0;i<smooth.length;i++){

		if((Math.min.apply(this,$.map(smooth[i], function(o){ return o.x; })))<MinX){
			MinX = Math.min.apply(this,$.map(smooth[i], function(o){ return o.x; }))
		}
		if((Math.max.apply(this,$.map(smooth[i], function(o){ return o.x; })))>MaxX){
			MaxX = Math.max.apply(this,$.map(smooth[i], function(o){ return o.x; }))
		}
		if((Math.min.apply(this,$.map(smooth[i], function(o){ return o.y; })))<MinY){
			MinY = Math.min.apply(this,$.map(smooth[i], function(o){ return o.y; }))
		}
		if((Math.max.apply(this,$.map(smooth[i], function(o){ return o.y; })))>MaxY){
			MaxY = Math.max.apply(this,$.map(smooth[i], function(o){ return o.y; }))
		}
	}

	//console.log(MinX + " " + MinY + " " + MaxX + " " + MaxY);
	//console.log(smooth)
	draw()

}

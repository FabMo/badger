
var MinX = 100000
var MaxX = -100000
var MinY = 100000
var MaxY = -100000
var DeltaX
var DeltaY
var points = [];
var smooth = [];
var endpts = [];
var sketch = false;
var animation = true;
var n = 0


var posX = -10000
var posY = 10000
var state = "idle"
var Scale;


function draw(){

	c = document.getElementById("myCanvas")
	ctx = c.getContext("2d")

	ctx.canvas.height = $(window).height()
	ctx.canvas.width = $(window).width()

	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)

	ctx.lineWidth = 6

	if($('.inputContainer').data('open')== 'true'){
		ctx.strokeStyle = "#aaa"
	}
	else{
		ctx.strokeStyle = "#6495ed"
	}

	ctx.beginPath()
	ctx.lineJoin="round"
	ctx.lineCap="round"

	if(smooth.length>0){
		for(i=0;i<smooth.length;i++){
			for(j=0;j<smooth[i].length;j++){
				if(j==0){
				ctx.moveTo(smooth[i][j].x,smooth[i][j].y)			
				}
				else{
				ctx.lineTo(smooth[i][j].x+0.001,smooth[i][j].y)
				}
			}
			ctx.stroke()
		}		
	}

	//display points
	/*
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#000"

	if(smooth.length>0){
		for(i=0;i<smooth.length;i++){
			for(j=0;j<smooth[i].length;j++){
			   ctx.beginPath();
				ctx.arc(smooth[i][j].x,smooth[i][j].y,2,0,2*Math.PI);
				ctx.stroke()
			}
		}
	
	}
	*/

	//dimensions
	if($('.inputContainer').data('open')== 'false'){
		//document.getElementById("input").style.display="none";
	}

	if($('.inputContainer').data('open')== 'true'){

		//document.getElementById("submitJob").style.display="none";
		//document.getElementById("play").style.display="none";

		ctx.lineWidth = 1
		ctx.strokeStyle = "#aaa"
		ctx.fillStyle = "#aaa"

		ctx.beginPath()
		ctx.moveTo(MinX,MinY)
		ctx.lineTo(MinX,MaxY)
		ctx.lineTo(MaxX,MaxY)
		ctx.stroke()

		ctx.beginPath()
		ctx.arc(MinX,MinY,2,0,2*Math.PI)
		ctx.fill()
	
		ctx.beginPath()
		ctx.arc(MinX,MaxY,2,0,2*Math.PI)
		ctx.fill()

		ctx.beginPath()
		ctx.arc(MaxX,MaxY,2,0,2*Math.PI)
		ctx.fill()

		ctx.font = "22px Arial"
		if((Math.abs(MaxX-MinX))>(Math.abs(MaxY-MinY)) && ((((Math.abs(MaxY-MinY))/(Math.abs(MaxX-MinX)))*4)<3) ){
			ctx.fillText( '4\"',MinX+((MaxX-MinX)/2),MaxY+30) //x
	
			var x = (((Math.abs(MaxY-MinY))/(Math.abs(MaxX-MinX)))*4).toFixed(1);		
			ctx.fillText( (x + '\"'),MinX-50,MinY+((MaxY-MinY)/2)) //y
		}
		else{
			ctx.fillText( '3\"',MinX-30,MinY+((MaxY-MinY)/2)) //y

			var y = (((Math.abs(MaxX-MinX))/(Math.abs(MaxY-MinY)))*3).toFixed(1);
			ctx.fillText( (y + '\"'),MinX+((MaxX-MinX)/2),MaxY+30) //x	
		}

	}

	///Draw circle representing pin 

	

	// if (points.length) {



	// 	var allpoints =  [].concat.apply([], smooth);
	// 	var hull = convexHull(allpoints);
	// 	var d = 0;
	// 	var center_x;
	// 	var center_y;
	// 	hull.forEach(function(p){
		
	// 		for(i = 0; i < hull.length; i++ ){
	// 			var dist = Math.sqrt( Math.pow((p.x-hull[i].x), 2) + Math.pow((p.y-hull[i].y), 2) );
	// 			if (dist > d) {
	// 				 d = dist;
	// 				 center_x = (p.x+hull[i].x)/2;
	// 				 center_y = (p.y+hull[i].y)/2;
	// 			}
	// 		}
	// 	});



		
	// 	var lengthX = MaxX - MinX;
	// 	var lengthY = MaxY - MinY;
	// 	ctx.beginPath();
	// 	ctx.arc(center_x, center_y, ((d/2)+50), 0, 2 * Math.PI);
	// 	ctx.stroke();

	// 	//////add smiley icons 

	// }


	


	


	//document.getElementById("run").checked=true
	if(document.getElementById("run").checked==true){

		ctx.beginPath()
		ctx.lineWidth = 2
		ctx.strokeStyle = "#aa00aa"
		ctx.moveTo(MinX+posX+5,MaxY-posY)
		ctx.lineTo(MinX+posX-5,MaxY-posY)

		ctx.moveTo(MinX+posX,MaxY-posY-5)
		ctx.lineTo(MinX+posX,MaxY-posY+5)
		ctx.stroke()


		ctx.beginPath()
		ctx.arc(MinX+posX,MaxY-posY,3,0,2*Math.PI)
		ctx.strokeStyle = "#fff000"
		ctx.fillStyle = "#ff00ff"
		ctx.fill()
		ctx.stroke()

	}

	ctx.beginPath()
	ctx.lineWidth = 6
	ctx.strokeStyle = "#6495ed"
}

function convexHull(pts) {
        pts.sort(function (a, b) {
            return a.x != b.x ? a.x - b.x : a.y - b.y;
        });

        var n = pts.length;
        var hull = [];

        for (var i = 0; i < 2 * n; i++) {
            var j = i < n ? i : 2 * n - 1 - i;
            while (hull.length >= 2 && removeMiddle(hull[hull.length - 2], hull[hull.length - 1], pts[j]))
                hull.pop();
            hull.push(pts[j]);
        }

        hull.pop();
        return hull;
    }
	
    function removeMiddle(a, b, c) {
        var cross = (a.x - b.x) * (c.y - b.y) - (a.y - b.y) * (c.x - b.x);
        var dot = (a.x - b.x) * (c.x - b.x) + (a.y - b.y) * (c.y - b.y);
        return cross < 0 || cross == 0 && dot <= 0;
    }

function clear(){
   MinX = 100000
   MaxX = -100000
   MinY = 100000
   MaxY = -100000
   points=[]
   smooth=[]
   draw();

	i=0
	j=0

	if(animation==true){
		ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2)
		ctx.moveTo(default_sketch[0][0].x,default_sketch[0][0].y)
	animate()
}
ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function animate () {
   if(animation==true){       
   setTimeout(function () {    
      ctx.lineTo(default_sketch[i][j].x,default_sketch[i][j].y)

		if(sketch==false){
			ctx.stroke()   
		}

      j=j+2                    
      if (j < default_sketch[i].length) {            
         animate()            
      }
		else if((j>=default_sketch[i].length) && (i<default_sketch.length-1)) {
			i++
			j=0
			ctx.moveTo(default_sketch[i][j].x,default_sketch[i][j].y)
			animate()
		}
            
   }, 1)
	
	}
	if(animation==true){
		setTimeout("turnOffAnimation();",3000)
	}

}

function turnOffAnimation(){
	if(animation==true){
		animation = false
		clear()
	}
}



fabmo.on('status', function(stat) {



	state = stat.state
	if(state=="running"){
		posX = stat.posx/Scale
		posY = stat.posy/Scale
		draw()
	}
	else{
		posX = -10000
		posY = 10000
	}

});


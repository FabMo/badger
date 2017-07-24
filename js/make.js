var SafeZ = 0.2
var g = ""

function make(){


	if(smooth.length>0){

	g=""

	//calculate scaling
	//Bill's mods
    
    DeltaX = (MaxX - MinX)
    DeltaY = (MaxY - MinY)
    var ScaleFactorX = SizeX / DeltaX
    var ScaleFactorY = SizeY / DeltaY
    if (ScaleFactorX < ScaleFactorY) {
        Scale = ScaleFactorX
    }
    else {
        Scale = ScaleFactorY
    }

	console.log(MaxX, MaxY, DeltaX, DeltaY, Scale, (DeltaX*Scale), (DeltaY*Scale));
	//console.log(Scale)
	//end Bill's mods

	var material = {feed:500,plunge:200}
	var pass = 1
	var pass_no=1
	var pass_depth=1

	//add test for inch/metric based on size of drawing
	//Bill's mod

	if (SizeX > 6){
		g+="g21\n"}
	else{
		g+="g20\n"
	}
	
	g+="g0z " + SafeZ + "\n"
	g+="m4\n"
	g+="g4p2\n"

	while(pass<=pass_no){

   	for(i=0;i<smooth.length;i++){
	 if(smooth[i][0]) {
		g+="g0x"+((((smooth[i][0].x) - MinX) * Scale) -  (DeltaX*Scale/2)).toFixed(3)  +"y"+ (((DeltaY - ((smooth[i][0].y)- MinY)) * Scale) - (DeltaY*Scale/2)).toFixed(3) + "\n"
		g+="g1z " + CutDepth + "f60\n"
		g+="g1f60\n"
		for(j=1;j<smooth[i].length;j++){
			g+="g1x"+((((smooth[i][j].x) - MinX) * Scale) - (DeltaX*Scale/2)).toFixed(3)  +"y"+ (((DeltaY - ((smooth[i][j].y) - MinY) )* Scale) - (DeltaY*Scale/2)).toFixed(3)  + "\n"
		}
		g+="g0z " + SafeZ + "\n"
		
		g+="g0x"+((((smooth[i][0].x) - MinX) * Scale) -  (DeltaX*Scale/2)).toFixed(3)  +"y"+ (((DeltaY - ((smooth[i][0].y)- MinY)) * Scale) - (DeltaY*Scale/2)).toFixed(3) + "\n"
		g+="g1z " + CutDepth + "f60\n"
		g+="g1f60\n"
		for(j=1;j<smooth[i].length;j++){
			g+="g1x"+((((smooth[i][j].x) - MinX) * Scale) - (DeltaX*Scale/2)).toFixed(3)  +"y"+ (((DeltaY - ((smooth[i][j].y) - MinY) )* Scale) - (DeltaY*Scale/2)).toFixed(3)  + "\n"
		}
		g+="g0z " + SafeZ + "\n"
	 }	
   	}
   	pass++
	   g+="f1000\n"
	g+="g1y4x0\n"
	}

g+="m5\n"
g+="m30\n"


if(document.getElementById("run").checked==true){
	fabmo.runGCode(g)
}
else{

	if(jobNum==undefined){
		jobNum = 1
	}

	fabmo.submitJob({
		file : g,
		filename : "sketch" + jobNum + ".g",
		name : "SKETCH " + jobNum,
   	description : "Smooth Sketch"
	});

	jobNum++

	myConfig.job = jobNum
	
	fabmo.setAppConfig(myConfig)

	clear()
}



}
else{
	console.log("no sketch")
}



}

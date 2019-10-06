var g_strLines = [
		"無無無無無無無無無無無無無肌肌肌", 
		"無無無無無無赤赤赤赤赤無無肌肌肌", 
		"無無無無無赤赤赤赤赤赤赤赤赤肌肌", 
		"無無無無無茶茶茶肌肌茶肌無赤赤赤", 
		"無無無無茶肌茶肌肌肌茶肌肌赤赤赤", 
		"無無無無茶肌茶茶肌肌肌茶肌肌肌赤", 
		"無無無無茶茶肌肌肌肌茶茶茶茶赤無", 
		"無無無無無無肌肌肌肌肌肌肌赤無無", 
		"無無赤赤赤赤赤青赤赤赤青赤無無無", 
		"無赤赤赤赤赤赤赤青赤赤赤青無無茶", 
		"肌肌赤赤赤赤赤赤青青青青青無無茶", 
		"肌肌肌無青青赤青青黄青青黄青茶茶", 
		"無肌無茶青青青青青青青青青青茶茶", 
		"無無茶茶茶青青青青青青青青青茶茶", 
		"無茶茶茶青青青青青青青無無無無無", 
		"無茶無無青青青青無無無無無無無無"
	];

function getRgbColor( c )
{
	var colorHash = {
		"無":"#000000",
		"白":"#ffffff",
		"肌":"#ffcccc",
		"茶":"#800000",
		"赤":"#ff0000",
		"黄":"#ffff00",
		"緑":"#00ff00",
		"水":"#00ffff",
		"青":"#0000ff",
		"紫":"#800080"
	};
	return colorHash[ c ];
}

function lerp(a, b, p) {
	return (b-a)*p + a;
}

function init() {
	var canvas = document.getElementById("canvas");

	// canvas dimensions
	var width = 465;
	var height = 465;

	// retina
	var dpr = window.devicePixelRatio || 1;
	canvas.width = width*dpr;
	canvas.height = height*dpr;
	canvas.getContext("2d").scale(dpr, dpr);

	// simulation
	var sim = new VerletJS(width, height, canvas);
	sim.friction = 1;
	sim.highlightColor = "#fff";
	
	// entities
	var min = Math.min(width,height)*0.5;
	//var segments = 20;
	var segments = 20;
	var cloth = sim.cloth(new Vec2(width/2,height/3), min, min, segments, 6, 0.9);
	
	cloth.drawConstraints = function(ctx, composite) {
		var stride = min/segments;
		var x,y;
		for (y=1;y<segments;++y) {
			var strLine = "";
			//strLine = g_strLines[y-1];
			if ( y >= 2 && y <= 17 )
			{
				strLine = g_strLines[y-2];
			}
			for (x=1;x<segments;++x) {
				ctx.beginPath();

				var i1 = (y-1)*segments+x-1;
				var i2 = (y)*segments+x;
				
				ctx.moveTo(cloth.particles[i1].pos.x, cloth.particles[i1].pos.y);
				ctx.lineTo(cloth.particles[i1+1].pos.x, cloth.particles[i1+1].pos.y);
				
				ctx.lineTo(cloth.particles[i2].pos.x, cloth.particles[i2].pos.y);
				ctx.lineTo(cloth.particles[i2-1].pos.x, cloth.particles[i2-1].pos.y);
				
				var off = cloth.particles[i2].pos.x - cloth.particles[i1].pos.x;
				off += cloth.particles[i2].pos.y - cloth.particles[i1].pos.y;
				off *= 0.25;
				
				var coef = Math.round((Math.abs(off)/stride)*255);
				if (coef > 255)
					coef = 255;
				
				//ctx.fillStyle = "rgba(" + coef + ",0," + (255-coef)+ "," +lerp(0.25,1,coef/255.0)+")";
				//ctx.fillStyle = "rgb(" + coef + ",0," + (255-coef)+ ")";
				var ch = "";
				var style = "";
				if ( strLine !== "" && strLine.length > 0 )
				{
					if ( x >= 2 && x <= 17 )
					{
						ch = strLine.substr( x-2, 1 );
						style = getRgbColor( ch );
					}
				}
				if ( style === "" || ch == "無" )
				{
					ctx.fillStyle = "rgb(" + coef + ",0," + (255-coef)+ ")";
				}
				else
				{
					ctx.fillStyle = style;
				}
				
				ctx.fill();
			}
		}
		
		var c;
		for (c in composite.constraints) {
			if (composite.constraints[c] instanceof PinConstraint) {
				var point = composite.constraints[c];
				ctx.beginPath();
				ctx.arc(point.pos.x, point.pos.y, 1.2, 0, 2*Math.PI);
				ctx.fillStyle = "rgba(255,255,255,1)";
				ctx.fill();
			}
		}
	};
	
	cloth.drawParticles = function(ctx, composite) {
		// do nothing for particles
	};
	
	// animation loop
	var legIndex = 0;
	var loop = function() {
		sim.frame(16);
		sim.draw();
		requestAnimFrame(loop);
	};

	loop();
}

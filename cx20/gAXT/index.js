// forked from cx20's "forked: pixi.js 2.0 test" http://jsdo.it/cx20/f4qV
// forked from cx20's "forked: pixi.js 2.0 test" http://jsdo.it/cx20/ixz3
// forked from djankey's "pixi.js 2.0 test" http://jsdo.it/djankey/wXPz
// forked from djankey's "pixi.js performance test" http://jsdo.it/djankey/testpixijs

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","無","無","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","無","無","茶",
    "肌","肌","肌","無","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "無","肌","無","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
];

function getRgbColor( c, baseColor )
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

    if ( c == "赤" || c == "青" ) {
        return colorHash[ baseColor ];
    } else {
        return colorHash[ c ];
    }
}

function getSingleLightColor( c, baseColor, rgbType )
{
    var result = "";

    var rgb = getRgbColor( c, baseColor );
    rgb = rgb.replace("#", "");
    var r = parseInt( "0x" + rgb.substr( 0, 2 ), 16 );
    var g = parseInt( "0x" + rgb.substr( 2, 2 ), 16 );
    var b = parseInt( "0x" + rgb.substr( 4, 2 ), 16 );

    switch ( rgbType )
    {
    case 'r':
        result = r;
        break;
    case 'g':
        result = g;
        break;
    case 'b':
        result = b;
        break;
    }
    //console.log( result );
    return result;
}

var stage, renderer, stageWidth, stageHeight;
var container;
var particleTextures = [];
var particles, stats, gui, changing;
var mousex, mousey;
var TOTAL = 30000;

function getDataURL( baseColor ) {
    var canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    var ctx = canvas.getContext("2d");
    var image = ctx.createImageData( 16, 16 );
    for ( var i =0; i < image.data.length; i += 4 ) {
        if ( dataSet[i/4] != "無" ) {
            image.data[i  ] = getSingleLightColor( dataSet[i/4], baseColor, "r" );
            image.data[i+1] = getSingleLightColor( dataSet[i/4], baseColor, "g" );
            image.data[i+2] = getSingleLightColor( dataSet[i/4], baseColor, "b" );
            image.data[i+3] = 255;
        }
    }
    ctx.putImageData( image, 0, 0 );
    var dataURL = canvas.toDataURL();
    return dataURL;
}

function getImageArrayDataURL( baseColors ) {
    var count = baseColors.length;
    var canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16 * count;
    var ctx = canvas.getContext("2d");
    var image = ctx.createImageData( 16, 16 * count );
    for ( var j = 0; j < count; j++ ) {
        for ( var i = 0; i < (16 * 16 * 4); i += 4 ) {
            if ( dataSet[(i/4)] != "無" ) {
                var imageBase = (16 * 16 * 4) * j;
                image.data[imageBase + i  ] = getSingleLightColor( dataSet[(i/4)], baseColors[j], "r" );
                image.data[imageBase + i+1] = getSingleLightColor( dataSet[(i/4)], baseColors[j], "g" );
                image.data[imageBase + i+2] = getSingleLightColor( dataSet[(i/4)], baseColors[j], "b" );
                image.data[imageBase + i+3] = 255;
            }
        }
    }
    ctx.putImageData( image, 0, 0 );
    var dataURL = canvas.toDataURL();
    return dataURL;
}

//var colors = [ "白", "肌", "茶", "赤", "黄", "緑", "水", "青", "紫" ];
var colors = [ "白", "茶", "赤", "黄", "緑", "水", "青", "紫" ];

function init() {   
    // dimension
    stageWidth = window.innerWidth;
    stageHeight = window.innerHeight;
    mousex = stageWidth/2;
    mousey = stageHeight/2;    
    
    // renderer
    renderer = PIXI.autoDetectRenderer(stageWidth, stageHeight);
    document.body.appendChild(renderer.view);
    stage = new PIXI.Stage();  
    
    container = new PIXI.ParticleContainer(200000, [false, true, false, false, false]);
    //container = new PIXI.Container();
    stage.addChild(container);
    
    var imageArray = getImageArrayDataURL(colors);
    var imageArrayTexture = new PIXI.Texture.fromImage(imageArray);
    for (var i = 0; i < colors.length; i++) {
        var texture = new PIXI.Texture(imageArrayTexture.baseTexture, new PIXI.math.Rectangle(0, i * 16, 16, 16));
        particleTextures.push(texture);
    }
    
    particles = [];
    changing = false;
    
    // remove all particles from stage
    function removeAllBalls() {
        var len = particles.length;        
        for(i = 0; i<len; i++) {            
            var old = particles[i].sprite;           
            container.removeChild(old);    
        }
       
        particles = [];
        renderer.render(stage);
    }

     // add particles on container
    function addParticles() {
        removeAllBalls();
        
        for (i = 0; i < TOTAL; i++) {  
            // 1. 毎回、異なる色のスプライトを順次作成（色1,色2,色3,色1,色2,色3,...）
            var ball = new PIXI.Sprite(particleTextures[i % colors.length]); 
            // 2. 毎回、異なる色のスプライトをランダムに作成（色2,色3,色1,色3,色2,色1,...）
            //var ball = new PIXI.Sprite(particleTextures[Math.floor(Math.random() * colors.length)]); 
            // 3. 順次連続した色のスプライトを生成（色1,色1,色2,色2,色3,色3,...）
            //var ball = new PIXI.Sprite(particleTextures[Math.floor(i / TOTAL * colors.length)]);
            // 4. 「1.」と「3.」の複合ケース
            //var ball = new PIXI.Sprite(particleTextures[Math.floor(20 * i / TOTAL * colors.length) % colors.length]); 
            ball.anchor.x = 0.5;
            ball.anchor.y = 0.5;
            ball.vx = 0;
            ball.vy = 0;
            ball.position.x = Math.random() * stageWidth;
            ball.position.y = Math.random() * stageHeight;
            container.addChild(ball);
                
            particles.push({sprite:ball, vx:0, vy:0});
        }
    }    
    
    // mouse move
    function moveHandler(event) {
        mousex = event.clientX;
        mousey = event.clientY;
    }    
    document.body.onmousemove = moveHandler;   
    
    // Stats
    stats = new Stats();
    stats.setMode(0);
    document.body.appendChild(stats.domElement); 
    
     // GUI
    gui = new dat.GUI();
    gui.width = 220;  
    var totalc = gui.add(window, 'TOTAL', 500, 50000).step(500).name('Particles');
    gui.close(); 
    
    totalc.onChange(function(value) {
       changing = true;
    });
    totalc.onFinishChange(function(value) {
        changing = false;
        removeAllBalls();               
        addParticles(); 
        requestAnimationFrame(tick);
    });    
    
    // go!
    addParticles();
    
    // animate
    requestAnimationFrame(tick); 
}

function tick() {    
    if(changing) return;
    
     for (var i = 0; i < TOTAL; i++) {
		var ball = particles[i].sprite;
		var dx = ball.position.x - mousex;
		var dy = ball.position.y - mousey;
		var vx = particles[i].vx;
		var vy = particles[i].vy;     
       
		if (dx * dx + dy * dy <= 10000) {
			vx += dx * 0.01;
			vy += dy * 0.01;
		}
		vx *= 0.95;
		vy *= 0.95;

		vx += Math.random() - 0.5;
		vy += Math.random() - 0.5;

		var x = ball.position.x += vx;
		var y = ball.position.y += vy;

		if (x < 0 || x > stageWidth || y < 0 || y > stageHeight) {
			var r = Math.atan2(y - stageHeight / 2, x - stageWidth / 2);
			vx = -Math.cos(r);
			vy = -Math.sin(r);
		}

		particles[i].vx = vx;
		particles[i].vy = vy;      
	}
    
    renderer.render(stage);
    stats.update();
    
    requestAnimationFrame(tick);
}

// Init
window.addEventListener('load', init, false);
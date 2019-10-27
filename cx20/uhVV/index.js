// forked from goodboy's "pixi.js example" http://www.goodboydigital.com/pixijs/bunnymark/
// forked from cx20's "pixi.js v3 を試してみるテスト（その２）" http://jsdo.it/cx20/tWmt
// forked from goodboy's "pixi.js example" http://www.goodboydigital.com/pixijs/masky/
// forked from cx20's "pixi.js v3 を試してみるテスト" http://jsdo.it/cx20/4c4K
// forked from cx20's "pixi.js v2 を試してみるテスト" http://jsdo.it/cx20/vmuo

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

$(document).ready(onReady)

var width = 465;
var height = 465;

var marios = [];
var gravity = 0.5;

var maxX = width;
var minX = 0;
var maxY = height;
var minY = 0;

var startBunnyCount = 2;
var marioType = 0;
var isAdding = false;
var count = 0;
var renderer;
var container;
var currentTexture;

var amount = 100;

function onReady()
{
	renderer = PIXI.autoDetectRenderer(width, height);
	stage = new PIXI.Container();

	document.body.appendChild(renderer.view);
	renderer.view.style.position = "absolute";
	stats = new Stats();
	
	document.body.appendChild( stats.domElement );
	stats.domElement.style.position = "absolute";
	stats.domElement.style.top = "0px";
	requestAnimationFrame(update);
	
	counter = document.createElement("div");
	counter.className = "counter";
	document.body.appendChild( counter);

	count = startBunnyCount;
	counter.innerHTML = count + " MARIO";
	
	container = new PIXI.ParticleContainer(200000, [false, true, false, false, false]);
	stage.addChild(container);

	marioTextures = [];
	var imageArray = getImageArrayDataURL(colors);
	imageArrayTexture = new PIXI.Texture.fromImage(imageArray);
	for (var i = 0; i < colors.length; i++) {
		var texture = new PIXI.Texture(imageArrayTexture.baseTexture, new PIXI.math.Rectangle(0, i * 16, 16, 16));
		marioTextures.push(texture);
	}
	marioType = 0;
	currentTexture = marioTextures[marioType];

	for (var i = 0; i < startBunnyCount; i++) {
		var mario = new PIXI.Sprite(currentTexture);
		mario.speedX = Math.random() * 10;
		mario.speedY = (Math.random() * 10) - 5;
		mario.anchor.x = 0.5;
		mario.anchor.y = 1;
		marios.push(mario);
		container.addChild(mario);
	}
	
	$(renderer.view).mousedown(function(){
		isAdding = true;
	});
	
	$(renderer.view).mouseup(function(){
		marioType++
		marioType %= colors.length;
		currentTexture = marioTextures[marioType];

		isAdding = false;
	})
	
	document.addEventListener("touchstart", onTouchStart, true);
	document.addEventListener("touchend", onTouchEnd, true);
}

function onTouchStart(event)
{
	isAdding = true;
}

function onTouchEnd(event)
{
	marioType++
	marioType %= colors.length;
	currentTexture = marioTextures[marioType];

	isAdding = false;
}

function update()
{
	stats.begin();
	if(isAdding)
	{
		if(count < 200000)
		{
			for (var i = 0; i < amount; i++) 
			{
				var mario = new PIXI.Sprite(currentTexture);
				mario.speedX = Math.random() * 10;
				mario.speedY = (Math.random() * 10) - 5;
				mario.anchor.y = 1;
				marios.push(mario);
				mario.scale.set(0.5 + Math.random()*0.5);
				mario.rotation = (Math.random()-0.5)
				container.addChild(mario);
				count++;
			}
		}
	
		counter.innerHTML = count + " MARIO";
	}
	
	for (var i = 0; i < marios.length; i++) 
	{
		var mario = marios[i];
	
		mario.position.x += mario.speedX;
		mario.position.y += mario.speedY;
		mario.speedY += gravity;
		
		if (mario.position.x > maxX)
		{
			mario.speedX *= -1;
			mario.position.x = maxX;
		}
		else if (mario.position.x < minX)
		{
			mario.speedX *= -1;
			mario.position.x = minX;
		}
		
		if (mario.position.y > maxY)
		{
			mario.speedY *= -0.85;
			mario.position.y = maxY;
			mario.spin = (Math.random()-0.5) * 0.2;
			if (Math.random() > 0.5)
			{
				mario.speedY -= Math.random() * 6;
			}
		} 
		else if (mario.position.y < minY)
		{
			mario.speedY = 0;
			mario.position.y = minY;
		}
		
	}
	
	renderer.render(stage);
	requestAnimationFrame(update);
	stats.end();
}

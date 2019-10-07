// forked from tkrkt's "単純図形回転" http://jsdo.it/tkrkt/diagram_rotate

var DOT_SIZE = 5;
var X_START_POS = 100;
var Y_START_POS = 100;

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

var config = {
    obj: {
        num: 20,
        step: Math.PI/24*0.5,
        lineWidth: 1,
        radius: 100
    },
    canvas: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    loop: {
        interval: 50
    },
    drawPattern: function(ctx){
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(100, 27);
        ctx.lineTo(27, 100);
        ctx.closePath();
        ctx.stroke();
    },
    drawMario: function(ctx) {
        for (var i = 0; i < dataSet.length; i++) {
            var x = X_START_POS + (15 - (i % 16)) * DOT_SIZE;
            var y = Y_START_POS + Math.floor((15-i) / 16) * DOT_SIZE;
            var color = getRgbColor(dataSet[i]);
            if (dataSet[i] != "無") {
                ctx.fillStyle = color;
                ctx.fillRect(x, y, DOT_SIZE*0.9, DOT_SIZE*0.9);
            }
        }
    }
};

function Obj(center, offset, step){
    this.center = center;
    this.offset = offset;
    this.step = step;
}

Obj.prototype.draw = function(ctx){
    this.step += config.obj.step;
    
    ctx.save();
    ctx.translate(this.center.x, this.center.y);
    ctx.rotate(this.step + this.offset);
    
    //config.drawPattern(ctx);
    config.drawMario(ctx);
    
    ctx.restore();
};

// init canvas
var canvas = document.createElement('canvas');
canvas.width = config.canvas.width;
canvas.height = config.canvas.height;
document.body.appendChild(canvas);

// init context
var ctx = canvas.getContext('2d');

// init buffer
var bufferCanvas = document.createElement('canvas');
bufferCanvas.width = config.canvas.width;
bufferCanvas.height = config.canvas.height;
var buffer = bufferCanvas.getContext('2d');
/*
buffer.strokeStyle = '#000';
buffer.fillStyle = '#fff';
buffer.lineWidth = config.obj.lineWidth;
buffer.shadowColor = '#000';
buffer.shadowBlur = 10;
*/
buffer.strokeStyle = '#fff';
buffer.fillStyle = '#000';
buffer.lineWidth = config.obj.lineWidth;
//buffer.shadowColor = '#777';
//buffer.shadowBlur = 10;


var objList = [];
for(var i=0; i<config.obj.num; i++){
    var theta = i * Math.PI * 2 / config.obj.num;
    objList.push(new Obj({
        x: config.canvas.width/2 + config.obj.radius * Math.cos(theta),
        y: config.canvas.height/2 + config.obj.radius * Math.sin(theta)
    }, theta, Math.PI * i * 2));
}

function loop(){
    buffer.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);
    for(var i=0, len=objList.length; i<len; i++){
        objList[i].draw(buffer);
    }
    ctx.putImageData(buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height), 0, 0);
}

setInterval(loop, config.loop.interval);
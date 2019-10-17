// forked from amusan's "LIght Circles" http://jsdo.it/amusan/xbdI

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
        "無":[0x00, 0x00, 0x00],
        "白":[0xff, 0xff, 0xff],
        "肌":[0xff, 0xcc, 0xcc],
        "茶":[0x80, 0x00, 0x00],
        "赤":[0xff, 0x00, 0x00],
        "黄":[0xff, 0xff, 0x00],
        "緑":[0x00, 0xff, 0x00],
        "水":[0x00, 0xff, 0xff],
        "青":[0x00, 0x00, 0xff],
        "紫":[0x80, 0x00, 0x80]
    };
    return colorHash[ c ];
}

LightCircle = new function() {
    
    var cnavas;
    var ctx;
    
    var MAX_CIRCLE_NUM = 256;
    var LIGHT_TIME = 60;
    var r=255;
    var g=80;
    var b=80;
    
    var c = new Array(MAX_CIRCLE_NUM);
    
    var mouseX;
    var mouseY;
    
    this.init = function() {
        canvas = document.getElementById('world');
        ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        circleInit();
        
        document.addEventListener('mousemove', mouseMove);
        
        setInterval( loop, 1000/60 );
    };
    
    function mouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    
    function hitCheckCircleAndMouse() {
        var x = Math.floor( mouseX/29 );
        var y = Math.floor( mouseY/29 );
        
        c[y*16+x].lightTime = LIGHT_TIME;
    }

    function circleInit() {    
        for (var i=0; i<16; i++) {
            for (var j=0; j<16; j++) {
                c[i*16+j] = new Circle( j*29+14, i*29+14, 10 );
            }
        }
    }


    function circleDraw() {
        
        for (var i=0; i<MAX_CIRCLE_NUM; i++) {    
            
            if (c[i].lightTime > 0) c[i].lightTime -= 1;
            
            var rate = c[i].lightTime / LIGHT_TIME;
            var alpha = 0.2 + 0.8*rate;
            ctx.shadowBlur = 60 * rate; 
            
            var color;
            if ( dataSet[i] != "無") {
                var rgb = getRgbColor(dataSet[i]);
                color = "rgba("+ rgb[0] +","+ rgb[1] +","+ rgb[2] +","+ alpha +")";
            } else {
                color = "rgba("+ r +","+ g +","+ b +","+ alpha +")";
            }
            ctx.fillStyle = color;
            ctx.shadowColor = color;

            ctx.beginPath();
            ctx.arc(c[i].x,c[i].y,c[i].r, 0, Math.PI*2, false);
            ctx.fill();          
        }
    }
    
    function backDraw() {
        var gradient = ctx.createRadialGradient( canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, 250 );
        gradient.addColorStop(0, "rgb("+ Math.round(r*0.2) +","+ Math.round(g*0.2) +","+ Math.round(b*0.2) +")");
        gradient.addColorStop(0.4, "rgb("+ Math.round(r*0.13) +","+ Math.round(g*0.13) +","+ Math.round(b*0.13) +")");
        gradient.addColorStop(1, "rgb("+ Math.round(r*0.1) +","+ Math.round(g*0.1) +","+ Math.round(b*0.1) +")");

        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.arc( canvas.width/2, canvas.height/2, 320, 0, Math.PI*2, true );
        ctx.fill();
    }
    
    function colorChange() {
        r += 3-Math.round( Math.random() * 6);
        g += 3-Math.round( Math.random() * 6);
        b += 3-Math.round( Math.random() * 6);
        if (r > 255) r = 255;
        if (g > 255) g = 255;
        if (b > 255) b = 255;
        if (r < 80) r = 80;
        if (g < 80) g = 80;
        if (b < 80) b = 80;
    }


    function loop() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        hitCheckCircleAndMouse();
        backDraw();
        circleDraw();
        colorChange();
    }
};


function Circle(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.lightTime = 0;
}

LightCircle.init();

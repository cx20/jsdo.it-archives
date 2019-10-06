// forked from yuqq.js's "Pendulum Wave" http://jsdo.it/yuqq.js/qjtB
/*
  + うまくwave効果が出るようにdtとStartAngleと糸の長さ要調節
  + Chromeだけ球がチラついたり表示されなかったりする
*/

var _DEBUG = false;
//var PendulumNumber = 12;
//var PendulumNumber = 16;
var PendulumNumber = 256;
var MaxStringLength = 300;
var MinStringLength = 200;
var StartAngle = 0.2;
//var PendulumRadius = 10;
var PendulumRadius = 5;
var g = 9.8127;
var dt = 200;
var k = 0;

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

/*
function getRgbColor( c )
{
    var colorHash = {
        "無":0x000000,
        "白":0xffffff,
        "肌":0xffcccc,
        "茶":0x800000,
        "赤":0xff0000,
        "黄":0xffff00,
        "緑":0x00ff00,
        "水":0x00ffff,
        "青":0x0000ff,
        "紫":0x800080
    };
    return colorHash[ c ];
}
*/
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


setTimeout(function() {

    var cvs = {
        'elem': undefined,
        'width': 0,
        'height': 0,
        'ctx': undefined,
        'left': 0,
        'top': 0,
        'pos_x': 0,
        'pos_y': 0
    };

    cvs.elem = document.getElementById('cvs');
    if (!cvs.elem || !cvs.elem.getContext) {
        return alert('require canvas support');
    };
    (function() {
        var b = document.body;
        var d = document.documentElement;
        cvs.width = Math.max(b.clientWidth, b.scrollWidth, d.scrollWidth, d.clientWidth);
        cvs.height = Math.max(b.clientHeight, b.scrollHeight, d.scrollHeight, d.clientHeight);
    })();
    cvs.elem.height = cvs.height;
    cvs.elem.width = cvs.width;
    cvs.ctx = cvs.elem.getContext('2d');
    cvs.left = cvs.elem.getBoundingClientRect ? cvs.elem.getBoundingClientRect().left : 0;
    cvs.top = cvs.elem.getBoundingClientRect ? cvs.elem.getBoundingClientRect().top : 0;

    setTimeout(function() {
        drawStaticObject();
        requestAnimationFrame(render);
    }, 0);

    if (_DEBUG) {
        var info = {
            'elem': undefined,
            'totalTime': 0,
            'lastTime': 0,
            'frame': 0,
            'fps': 0
        };
        (function() {
            info.elem = document.createElement('span');
            info.elem.setAttribute('id', 'fps');
            document.body.insertBefore(info.elem, cvs.elem.nextSibling);
            info.lastTime = (new Date()).getTime();
        })();

        function updateInfo() {
            var now = (new Date()).getTime();
            var delta = now - info.lastTime;
            info.lastTime = now;
            info.totalTime += delta;
            info.frame++;
            info.fps = (1000 * info.frame / info.totalTime).toFixed(2);
            info.elem.innerHTML = 'Frame/s: ' + info.fps;
        }
    }

    var theta = [];
    var omega = [];
    var r = [];
    var colors = [];

    function hsv2rgb(hue, sat, val) {
        var red, grn, blu, i, f, p, q, t;
        hue %= 360;
        if (val == 0) {
            return 'rgb(0,0,0)';
        }
        sat /= 100;
        val /= 100;
        hue /= 60;
        i = Math.floor(hue);
        f = hue - i;
        p = val * (1 - sat);
        q = val * (1 - (sat * f));
        t = val * (1 - (sat * (1 - f)));
        if (i == 0) {
            red = val;
            grn = t;
            blu = p;
        }
        else if (i == 1) {
            red = q;
            grn = val;
            blu = p;
        }
        else if (i == 2) {
            red = p;
            grn = val;
            blu = t;
        }
        else if (i == 3) {
            red = p;
            grn = q;
            blu = val;
        }
        else if (i == 4) {
            red = t;
            grn = p;
            blu = val;
        }
        else if (i == 5) {
            red = val;
            grn = p;
            blu = q;
        }
        red = Math.floor(red * 255);
        grn = Math.floor(grn * 255);
        blu = Math.floor(blu * 255);
        return 'rgb(' + [red, grn, blu].join(',') + ')';
    }

    (function() {
        var color;
        var delta = (MaxStringLength - MinStringLength) / PendulumNumber;
        for (var i = 0; i < PendulumNumber; i++) {
            //theta[i] = StartAngle;
            theta[i] = (-8 + i % 16) * 0.05;
            omega[i] = 0;
            //r[i] = MinStringLength + i * delta;
            r[i] = MinStringLength + i * delta;
            //colors[i] = hsv2rgb(i * (360 / PendulumNumber), 80, 80);
            color = dataSet[i];
            colors[i] = getRgbColor( color );
        }
    })();

    function clearCanvas() {
        cvs.ctx.clearRect(0, 0, cvs.width, cvs.height);
    }

    function drawPendulum() {
        var pos_x = cvs.width / 2;
        var pos_y = 0;

        for (var i = 0; i < PendulumNumber; i++) {
            omega[i] -= (g / r[i] * Math.sin(theta[i]) + k * omega[i]) * dt / 1000;
            theta[i] += omega[i];
            var x = r[i] * Math.sin(theta[i]);
            var y = r[i] * Math.cos(theta[i]) * 1.5;
            //cvs.ctx.fillStyle = colors[i];
            if ( dataSet[i] != "無" ) {
                cvs.ctx.beginPath();
                cvs.ctx.moveTo(pos_x, pos_y);
                cvs.ctx.lineTo(pos_x + x, pos_y + y);
                //cvs.ctx.strokeStyle = "#222";
                cvs.ctx.strokeStyle = colors[i];
                cvs.ctx.stroke();
                cvs.ctx.closePath();
                cvs.ctx.beginPath();
                cvs.ctx.arc(pos_x + x, pos_y + y, PendulumRadius, 0, 2 * Math.PI, false);
                cvs.ctx.fillStyle = colors[i];
                cvs.ctx.fill();
                cvs.ctx.closePath();
            }
        }

    }

    function drawStaticObject() {

    }

    function render() {
        clearCanvas();
        drawPendulum();
        if (_DEBUG) updateInfo();
        requestAnimationFrame(render);
    }

}, 0);

//set window.requestAnimationFrame
(function(w, r) {
    w['r' + r] = w['r' + r] || w['webkitR' + r] || w['mozR' + r] || w['msR' + r] || w['oR' + r] ||
    function(c) {
        w.setTimeout(c, 1000 / 60);
    };
})(window, 'equestAnimationFrame');
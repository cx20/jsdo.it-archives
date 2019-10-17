// forked from 79yuuki's "arc art的な描画" http://jsdo.it/79yuuki/k5VF

var X_START_POS = 50;
var Y_START_POS = 50;
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

onload = function(){
    var canvas = document.getElementById("main");
    if(!canvas.getContext) return false;
    var ctx = canvas.getContext("2d");
    
    var radius = 20;             // 円周の半径
    var angle  = 0;              // 角度
    var size   = 8;              // 描く円のサイズ
    var center = { x: X_START_POS, y: Y_START_POS };   // 原点
    var point  = { x: 0, y: 0 };   // 円を描く座標
    var delay  = 10;
    
    function loop(){
        // canvasをリセット
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        var k = 0;
        for(var i = 0; i < 16; i++){
            for(var j = 0; j < 16; j++){
                
                // 原点に目印の円を描く
                ctx.beginPath();
                ctx.strokeStyle = "#777777";
                ctx.arc(center.x + (i*23), center.y + (j*23), radius, 0, Math.PI*2, true);
                ctx.stroke();
                
                // 三角関数を使って座標を計算
                point.x = radius * Math.cos((angle + i*5 + j*5) * Math.PI/180) + center.x+(i*23);
                point.y = radius * Math.sin((angle + i*5 + j*5) * Math.PI/180) + center.y+(j*23);
                
                k = j * 16 + i;
                if ( dataSet[k] != "無" ) {
                    ctx.beginPath();
                    // 計算で得られた座標を中心に四角を描く
                    //ctx.arc(point.x, point.y, size, 0, Math.PI*2, false);
                    ctx.rect(point.x - radius/2, point.y - radius/2, radius, radius);
                    ctx.fillStyle = getRgbColor(dataSet[k]);
                    ctx.fill();
                }
                
                //角度を徐々に変えていく
                angle += 0.03;
                
            }
        }
    }
    
    function animationLoop() {
        loop();
        requestAnimationFrame(animationLoop);
    }
    animationLoop();
    
};


// 各ブラウザ対応
window.requestAnimationFrame = (function(){
	return window.requestAnimationFrame		||
		window.webkitRequestAnimationFrame	||
		window.mozRequestAnimationFrame		||
		window.oRequestAnimationFrame		||
		window.msRequestAnimationFrame		||
		function(callback, element){
			window.setTimeout(callback, 1000 / 60);
		};
})();
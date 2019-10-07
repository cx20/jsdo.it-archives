// forked from cx20's "時計の針にドット絵を貼りつけるテスト" http://jsdo.it/cx20/k6UQ
// forked from jsdo.it_team's "Human Clock" http://jsdo.it/jsdo.it_team/jam_session1

var DOT_SIZE = 5;
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

window.onload = function () {
    var r = Snap(465, 465);
    var center = 465 >> 1;
    var updateView = (function() {
        var sec;
        return function () {
            var now = new Date, now_sec = now.getSeconds();
            if (now_sec == sec) return;
            var hour = now.getHours(), min = now.getMinutes();
            
            _updateView(hour, min, sec = now_sec);
        }
    })();
    
    for (var i = 0; i < 12; ++i) {
        var matrix = new Snap.Matrix().rotate(i * 30, center , center);
        drawTrapezium(4, 16, 2, 0, center, center + 180 -16).transform(matrix);
    }
    
    var hour = drawTrapezium(6, -90, 10, 5, center, center, 0xdc143c);
    var min = drawTrapezium(5, -130, 8, 5, center, center, 0x228b22);
    var sec = drawTrapezium(3, -150, 5, 5, center, center, 0xeb6101);

    var luigi = drawMario(5, -130, 8, 5, center, center, "luigi");
    var mario = drawMario(3, -150, 5, 5, center, center, "mario");
    
    updateView();
    setInterval(updateView, 100);
    
    function drawTrapezium(right, top, left, bottom, centerX, centerY, color) {
        var commands = ['M', 'L', 'L', 'L', 'L'];
        var coordinates = [
            left, bottom, -left, bottom, -right, top, right, top, left, bottom
        ];
        var data = [];
        for (var i = 0; i < 5; ++i) {
            data.push(commands[i]);
            data.push(centerX + coordinates[2 * i], ",", centerY + coordinates[2 * i + 1]);
        }
        color = color ? color.toString(16) : "000000";
        while (color.length < 6) color = "0" + color;
        color = "#" + color;
        return r.path(data.join('')).attr({fill:color, stroke:"none"});
    }
    
    function drawMario(right, top, left, bottom, centerX, centerY, character )
    {
        var i, x, y;
        var dot;
        var c;
        var st = r.group();
        for ( i = 0; i < dataSet.length; i++ ) {
            x = ( i % 16 ) * DOT_SIZE;
            y = ( Math.floor( i / 16 ) * DOT_SIZE );
            c = dataSet[i];
            if ( c != "無" ) {
                // 色変更
                if ( c == "赤" && character == "luigi" ) {
                    c = "緑";
                }
                dot = r.rect( centerX + x - ( DOT_SIZE * 16 / 2), 0 + y, DOT_SIZE, DOT_SIZE ).attr("fill",  getRgbColor( c ) );
                st.add( dot );
            }
        }
        return st;
    }
    
    function _updateView(h, m, s) {
        setRotation(hour, (h % 12) * 30 + m / 2, center, center); 
        setRotation(min, m * 6, center, center);
        setRotation(sec, s * 6, center, center);
        
        setRotation(luigi, m * 6, center, center);
        setRotation(mario, s * 6, center, center);
    }
    
    function setRotation(node, angle, centerX, centerY) {
        //node.attr({rotation : angle + " " + centerX + " " + centerY});
        var matrix = new Snap.Matrix().rotate(angle, centerX, centerY);
        node.transform(matrix);
    }
};

// forked from cx20's "Snap.svg でドット絵を描いてみるテスト" http://jsdo.it/cx20/kCUy

var X_MAX = 465;
var Y_MAX = 465;
var X_START_POS = 100;
var Y_START_POS = 50;
var DOT_SIZE = 50;
var STEP = 30;

var s = Snap(X_MAX, Y_MAX);
for ( var i = 0; i < (Y_MAX/STEP); i++ ) {
    s.rect(0, i * STEP, X_MAX, STEP/2);
}

var rect1 = s.rect(X_START_POS + DOT_SIZE * 1, Y_START_POS, DOT_SIZE * 0.8, DOT_SIZE * 0.8).attr({fill: "#ffff00"});
var rect2 = s.rect(X_START_POS + DOT_SIZE * 2, Y_START_POS, DOT_SIZE * 0.8, DOT_SIZE * 0.8).attr({fill: "#00007f"});
var rect3 = s.rect(X_START_POS + DOT_SIZE * 3, Y_START_POS, DOT_SIZE * 0.8, DOT_SIZE * 0.8).attr({fill: "#ffff00"});
var rect4 = s.rect(X_START_POS + DOT_SIZE * 4, Y_START_POS, DOT_SIZE * 0.8, DOT_SIZE * 0.8).attr({fill: "#00007f"});

var reverse = false;

loop();

function loop() {
    animate();
    setTimeout( loop, 3000 );
}

function animate() {
    var start = reverse ? 350 : Y_START_POS;
    var end   = reverse ? Y_START_POS : 350;
    Snap.animate(start, end, function (val) {
        rect1.attr({y: val});
        rect2.attr({y: val});
        rect3.attr({y: val});
        rect4.attr({y: val});
    }, 3000);
    reverse = !reverse;
}

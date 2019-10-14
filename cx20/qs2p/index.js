var markup;
var world;
var perspective = 1000;
var degree_x = 81;
var degree_y = 0;
var degree_z = -32;

// 各ブラウザ対応
window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame     ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        window.oRequestAnimationFrame       ||
        window.msRequestAnimationFrame      ||
        function(callback, element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function init() {
    var gui = new dat.GUI();
    gui.add(this, "perspective", 0, 1000).step(1).listen();
    gui.add(this, "degree_x", -180, 180).step(1).listen();
    gui.add(this, "degree_y", -180, 180).step(1).listen();
    gui.add(this, "degree_z", -180, 180).step(1).listen();
    gui.add(this, "set");
    gui.add(this, "reset");
    
    markup = document.getElementById("markup");
    world = document.getElementById("world");
    
    markup.style.position = "absolute";
    markup.style.backgroundColor = "#777";
    markup.style.top = "400px";
}

function set() {
    perspective = 1000;
    degree_x = 81;
    degree_y = 0;
    degree_z = -32;
}

function reset() {
    perspective = 0;
    degree_x = 0;
    degree_y = 0;
    degree_z = 0;
}

function update() {
    requestAnimationFrame(update);
    //var style = "transform: perspective(" + perspective + "px) rotateX(" + degree_x + "deg) rotateY(" + degree_y + "deg) rotateZ(" + degree_z + "deg)";
    //world.style = style;
    var style = "perspective(" + perspective + "px) rotateX(" + degree_x + "deg) rotateY(" + degree_y + "deg) rotateZ(" + degree_z + "deg)";
    world.style.WebkitTransform = style;
    world.style.MozTransform = style;
    world.style.msTransform = style;
    // スタイル確認用ログ出力
    markup.innerHTML = style;
    console.log( style );
}

init();
update();

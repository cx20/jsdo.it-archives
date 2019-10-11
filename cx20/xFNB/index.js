// forked from cx20's "メカ生体をドット絵に変えてみるテスト" http://jsdo.it/cx20/uUn3
// forked from otherone's "CreateJS メカ生体 BOID" http://jsdo.it/otherone/svBv

//*************************************************************
//変数
var canvas, stage,fishImg,traceTxt;
var fileList = 
    [
        {"src":"../../assets/c/f/Q/F/cfQFC.png","id":"image1"}
    ];

var queue = new createjs.LoadQueue(false);
var imgList = [],
    setCnt = 0; //読み込み画像
var viewWidth = window.innerWidth,
    viewHeight = window.innerHeight
var tankLeft, tankRight, tankTop, tankBottom;
var streamVX = 2,
    streamVY = 0;
var separete_dist_min = 20,
    attract_dist_max = 500;
var SCALE = window.innerHeight / 440 * 2;

//*************************************************************

function init() {
    //canvas
    canvas = document.getElementById("Canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stage = new Stage(canvas);
    imgload();

    tankLeft = -viewWidth / 3;
    tankRight = viewWidth * 4 / 3;
    tankTop = -viewHeight / 3;
    tankBottom = viewHeight * 4 / 3;
}

//*************************************************************
function imgload() {
    queue.loadManifest(fileList, true);
    // 任意のタイミングで読込を開始したい場合、第2引数にfalseを指定し、queue.load()を実行する// queue.loadManifest(manifest,false);// queue.load();
    queue.addEventListener("fileload", handleFileLoad);
    queue.addEventListener("complete", handleComplete);
}

function handleFileLoad(e) {
    fishImg = e.item.src;
}

function handleComplete() {

    var n = 60 * SCALE; //osakana no kazu 
    for (i = 0; i < n; i++) {
        setInstance(fishImg);
    }

/*
    //トレース目的などに使いたい
    traceTxt = new createjs.Text("最初に表示させる文字", "12px Arial", "white");
    stage.addChild(traceTxt),traceTxt.text="出力：";
    traceTxt.x = 10,traceTxt.y = 10,traceTxt.maxWidth = 200,traceTxt.lineWidth = 50,traceTxt.lineHeight = 28; // 行の高さ  
*/
    Ticker.addListener(window);
    Ticker.useRAF = true;
    Ticker.setFPS(60);
}

function setInstance(_imgsrc) {
    var _bitmap = new Bitmap(_imgsrc);
    _bitmap.x = Math.random() * (canvas.width - _bitmap.image.width) + _bitmap.image.width;
    _bitmap.y = Math.random() * (canvas.height - _bitmap.image.height) + _bitmap.image.height;

    _bitmap.scaleX = (Math.random() * 5 / 10) + 0.7;
    _bitmap.scaleY = (Math.random() * 3 / 10) + 0.9;

    //中心点の設定
    _bitmap.regX = _bitmap.image.width / 1.5, _bitmap.regY = _bitmap.image.height / 2;
    //_bitmap.rotation = Math.floor(Math.random()*360);

    _bitmap.bActive = true;
    _bitmap.vx = _bitmap.vy = 0;
    _bitmap.rotationValue = 0;
    imgList[setCnt] = _bitmap;
    setCnt++;
    stage.addChild(_bitmap);

    // キャラクターを45度回転
    var matrix = _bitmap.getMatrix();
    matrix.rotate(45 * createjs.Matrix2D.DEG_TO_RAD);
    matrix.scale(1.6, 0.8);
    matrix.decompose(_bitmap);

    _bitmap.addEventListener('click', mouseAct);
}

//*************************************************************
function mouseAct(event) {
    alert("おした");
}

//*************************************************************
function tick() {
    fishControll();
    stage.update();
}

//*************************************************************
function fishControll() {
    var n = imgList.length;
    for (var i = 0; i < n; i++) {
        var _fish = imgList[i];

        if (!_fish.bActive) continue;

        boid(_fish);

        if (Math.abs(_fish.vx) + Math.abs(_fish.vy) > 5) {
            _fish.vx *= 0.9;
            _fish.vy *= 0.9;
        }

        var totalVX = streamVX + _fish.vx;
        var totalVY = streamVY + _fish.vy;
        _fish.rotationValue += (Math.atan2(totalVY, totalVX) - _fish.rotationValue) / 3
        _fish.rotation = _fish.rotationValue * 180 / Math.PI;



        _fish.x += totalVX;
        _fish.y += totalVY;

        if (_fish.x > tankRight) {
            _fish.x = tankLeft + (_fish.x - tankRight);
        } else if (_fish.x < tankLeft) {
            _fish.x = tankRight + (_fish.x - tankLeft);
        }
        if (_fish.y > tankBottom) {
            _fish.y = tankTop + (_fish.y - tankBottom);
        } else if (_fish.y < tankTop) {
            _fish.y = tankBottom + (_fish.y - tankTop);
        }
    }
    //    traceTxt.text="出力:"+_fish.rotationValue;
}

//*************************************************************

function boid(fish) {
    var nearestDist = Number.POSITIVE_INFINITY;
    var nearestFish = null;
    var myPoint = new Point(fish.x, fish.y);

    //一番近いやつを探す
    var n = imgList.length;
    for (var i = 0; i < n; i++) {
        var tgtFish = imgList[i];
        if (tgtFish == fish) continue;
        var distance = fn_distance(myPoint.x, myPoint.y, tgtFish.x, tgtFish.y);
        if (distance < nearestDist) {
            nearestDist = distance;
            nearestFish = tgtFish;
        }

    }

    if (nearestFish === null) return;

    //近いやつとの距離を保つ
    var distX = nearestFish.x - fish.x;
    var distY = nearestFish.y - fish.y;
    nearestDist -= (nearestFish.scaleX * 100 + fish.scaleX * 100) / 2;
    var separationRatio = 0.004;


    //近すぎるので離す
    if (nearestDist < separete_dist_min) {
        fish.vx += -distX * separationRatio * Math.max(2 - fish.scaleX, 0.5);
        fish.vy += -distY * separationRatio * Math.max(2 - fish.scaleX, 0.5);
    }

    //遠すぎるので近づける
    else if (nearestDist < attract_dist_max) {
        fish.vx += distX * separationRatio * Math.max(2 - fish.scaleX, 0.5);
        fish.vy += distY * separationRatio * Math.max(2 - fish.scaleX, 0.5);

    }

    // console.log(nearestDist);

    //近いやつの動きを少し真似る
    var copyRatio = 0.01;
    fish.vx += nearestFish.vx * copyRatio;
    fish.vy += nearestFish.vy * copyRatio;



    //真ん中の方向を向く
    var centerizeRatio = 0.1;
    var halfHeight = viewHeight / 2;
    if (fish.y < halfHeight) {
        fish.vy -= (fish.y - halfHeight) / halfHeight * centerizeRatio;
    } else {
        fish.vy += (fish.y - halfHeight) / halfHeight * -centerizeRatio;
    }

    fish.vx += 0.3;
}

function fn_distance(x1, y1, x2, y2) {
    var a = x2 - x1;
    var b = y2 - y1;
    var c = Math.sqrt(a * a + b * b);
    return c;
}

init();

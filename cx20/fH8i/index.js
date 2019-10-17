// forked from naoyashiga's "CreateJSでオリンピックのロゴ" http://jsdo.it/naoyashiga/77i7

var X_START_POS = 50;
var Y_START_POS = 50;
var DOT_SIZE = 20;

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


/*-----------------------------------
    グローバル変数
-----------------------------------*/
var cj = createjs,
    stage,
    particles = [],
    centerX,
    centerY,
    particleNum = 12,
    speed = Math.PI / 60,
    RADIUS = 5,
    margin = RADIUS / 10;
    SPEED_MIN = RADIUS * 5,
    SPEED_MAX = RADIUS * 10;

//    color = ["blue","black","red","yellow","green"];

/*-----------------------------------
    メイン
-----------------------------------*/
function init(){
    var rotateCenterX,
        rotateCenterY,
        circle,
        radius = RADIUS;
    //ステージ生成
    stage = new cj.Stage("world");
    stage.canvas.width　= window.innerWidth;
    stage.canvas.height　= window.innerHeight;

    for ( var i = 0; i < dataSet.length; i++ ) {
        var x = Math.floor( i % 16 ) * DOT_SIZE + X_START_POS;
        var y = Math.floor( i / 16 ) * DOT_SIZE + Y_START_POS;
        var color = dataSet[i];
        if ( color != "無" ) {
            circle = new Circle(x, y, radius, color );  
            circle.create();
        }
    }

    //ステージ更新
    stage.update();
}
//cj.Ticker.timingMode = cj.Ticker.RAF;
cj.Ticker.setFPS(20);
cj.Ticker.addEventListener("tick",tick);


/*-----------------------------------
    自動更新される関数
-----------------------------------*/
function tick(){
    for(var i = 0;i < particles.length;i++){
        var particle = particles[i];
        particle.move();
    }

    //ステージ更新
    stage.update();
}


/*-----------------------------------
    パーティクルを定義
-----------------------------------*/
function Particle(cx,cy,_angle,_radius,_color){
    this.initialize();

    //半径
    this.radius = getRandomNum(10,20);
    
    getColor(this,_color);
            
    this.graphics.drawCircle(0,0,getRandomNum(1,10))
    .endFill();
    //中心位置
    this.centerX = cx;
    this.centerY = cy;
    //角度
    this.angle = _angle;
    //角速度
    if(getRandomNum(1,10) % 2 === 0){
        this.speed =  Math.PI / (getRandomNum(SPEED_MIN,SPEED_MAX));
    }else{
        //逆回転
        this.speed =  - Math.PI / (getRandomNum(SPEED_MIN,SPEED_MAX));
    }
    
    //回転の中心
    this.rotateCenterX = cx + _radius;
    this.rotateCenterY = cy;
    
    //重なったところの合成方法
    this.compositeOperation = "darker";    
}

//継承
Particle.prototype = new cj.Shape();

/*-----------------------------------
    パーティクル移動位置
-----------------------------------*/
Particle.prototype.move = function(){
    this.angle += this.speed;
    
    //回転中心位置を回転させる
    this.rotateCenterX = this.centerX + (RADIUS - margin) * Math.cos(this.angle / 5);
    this.rotateCenterY = this.centerY + (RADIUS - margin) * Math.sin(this.angle / 5);
    
    //回転の軌跡上を三角関数の軌跡を描く
    this.x = this.rotateCenterX + this.radius * Math.cos(this.angle / 360) * Math.cos(this.angle);
    this.y = this.rotateCenterY + this.radius * Math.sin(this.angle / 360) * Math.sin(this.angle);

};

/*-----------------------------------
    輪
-----------------------------------*/
function Circle(cx,cy,r,_color){
/*
    if(cy == 1){//輪の上段
        this.centerX = r + 2 * r * (cx - 1) + ((window.innerWidth / 2) - 3 * r);
        this.centerY = r * cy + ((window.innerHeight / 2) - 1.5 * r);
    }else{//輪の下段
        this.centerX = r + 2 * r * (cx - 1) + r + ((window.innerWidth / 2) - 3 * r);
        this.centerY = r * cy + ((window.innerHeight / 2) - 1.5 * r);
    }
*/
    this.centerX = cx;
    this.centerY = cy;
    
    this.radius = r;
    this.color = _color;
}

/*-----------------------------------
    輪の軌道上にパーティクルを生成
-----------------------------------*/
Circle.prototype.create = function(){
    var rotateCenterX = this.centerX + this.radius,
        rotateCenterY = this.centerY;
    
    for(var j = 1;j < particleNum;j++){
        var angle = j * 15 * 10;
        
        //パーティクル生成
        var particle = new Particle(this.centerX,this.centerY,angle,this.radius,this.color);
        particles.push(particle);
        //ステージに追加
        stage.addChild(particle);
    }

};

/*-----------------------------------
    範囲を決めて乱数生成
-----------------------------------*/
function getRandomNum( min, max ) {
    return ( Math.random() * ( max - min ) + min ) | 0;
}

/*-----------------------------------
    パーティクルの色を決定
-----------------------------------*/
function getColor(obj,_color){
    var fillColor;
    //色
    switch(_color){
        case "青":
            switch((Math.random() * 5 | 0 ) % 5){
                case 0:
                    fillColor = obj.graphics.beginFill("#0B5FA5");
                    break;
                case 1:
                    fillColor = obj.graphics.beginFill("#25547B");
                    break;
                case 2:
                    fillColor = obj.graphics.beginFill("#043C6B");
                    break;
                case 3:
                    fillColor = obj.graphics.beginFill("#3F8FD2");
                    break;
                case 4:
                    fillColor = obj.graphics.beginFill("#66A1D2");
                    break;
                default:
                    break;
            }
            break;
        case "黒":
            switch((Math.random() * 5 | 0 ) % 5){
                case 0:
                    fillColor = obj.graphics.beginFill("#000");
                    break;
                case 1:
                    fillColor = obj.graphics.beginFill("#111");
                    break;
                case 2:
                    fillColor = obj.graphics.beginFill("#191919");
                    break;
                case 3:
                    fillColor = obj.graphics.beginFill("#2a2a2a");
                    break;
                case 4:
                    fillColor = obj.graphics.beginFill("#3b3b3b");
                    break;
                default:
                    break;
            }
            break;
        case "赤":
            switch((Math.random() * 5 | 0 ) % 5){
                case 0:
                    fillColor = obj.graphics.beginFill("#FF0000");
                    break;
                case 1:
                    fillColor = obj.graphics.beginFill("#BF3030");
                    break;
                case 2:
                    fillColor = obj.graphics.beginFill("#A60000");
                    break;
                case 3:
                    fillColor = obj.graphics.beginFill("#FF4040");
                    break;
                case 4:
                    fillColor = obj.graphics.beginFill("#FF7373");
                    break;
                default:
                    break;
            }
            break; 
        case "肌":
            switch((Math.random() * 5 | 0 ) % 5){
                case 0:
                    fillColor = obj.graphics.beginFill("#FFE4C4");
                    break;
                case 1:
                    fillColor = obj.graphics.beginFill("#FFEBCD");
                    break;
                case 2:
                    fillColor = obj.graphics.beginFill("#FDE8D0");
                    break;
                case 3:
                    fillColor = obj.graphics.beginFill("#FAD9C0");
                    break;
                case 4:
                    fillColor = obj.graphics.beginFill("#FFE6BE");
                    break;
                default:
                    break;
            }
            break; 
        case "茶":
            switch((Math.random() * 5 | 0 ) % 5){
                case 0:
                    fillColor = obj.graphics.beginFill("#824522");
                    break;
                case 1:
                    fillColor = obj.graphics.beginFill("#824522");
                    break;
                case 2:
                    fillColor = obj.graphics.beginFill("#8C5B32");
                    break;
                case 3:
                    fillColor = obj.graphics.beginFill("#976035");
                    break;
                case 4:
                    fillColor = obj.graphics.beginFill("#D86632");
                    break;
                default:
                    break;
            }
            break; 
        case "黄":
            switch((Math.random() * 5 | 0 ) % 5){
                case 0:
                    fillColor = obj.graphics.beginFill("#FFF500");
                    break;
                case 1:
                    fillColor = obj.graphics.beginFill("#BFBA30");
                    break;
                case 2:
                    fillColor = obj.graphics.beginFill("#A69F00");
                    break;
                case 3:
                    fillColor = obj.graphics.beginFill("#FFF840");
                    break;
                case 4:
                    fillColor = obj.graphics.beginFill("#FFFA73");
                    break;
                default:
                    break;
            }
            break; 
        case "緑":
            switch((Math.random() * 5 | 0 ) % 5){
                case 0:
                    fillColor = obj.graphics.beginFill("#25D500");
                    break;
                case 1:
                    fillColor = obj.graphics.beginFill("#3DA028");
                    break;
                case 2:
                    fillColor = obj.graphics.beginFill("#188A00");
                    break;
                case 3:
                    fillColor = obj.graphics.beginFill("#59EA3A");
                    break;
                case 4:
                    fillColor = obj.graphics.beginFill("#80EA69");
                    break;
                default:
                    break;
            }
            break; 
        default:
            break;              
    }
    
    return fillColor;
}
init();
// forked from dentaq's "相互にぶつかり合うボール" http://jsdo.it/dentaq/rnI4

var DOT_SIZE = 20;
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

function getGradientColor( rgb, pattern )
{
    var result = "";
    rgb = rgb.replace("#", "");
    var r = parseInt( "0x" + rgb.substr( 0, 2 ), 16 );
    var g = parseInt( "0x" + rgb.substr( 2, 2 ), 16 );
    var b = parseInt( "0x" + rgb.substr( 4, 2 ), 16 );
    var a = 0;
    
    switch ( pattern )
    {
        case 1:
            // rgba(255, 255, 255, 1)
            r = 255;
            g = 255;
            b = 255;
            a = 1;
            break;
        case 2:
            r += 85;
            g += 85;
            b += 85;
            // rgba(255, 85, 85, 1)
            a = 1;
            break;
        case 3:
            // rgba(128, 0, 0, 1)
            a = 1;
            break;
        case 4:
            // rgba(128, 0, 0, 0)
            a = 0;
            break;
    }
    result = "rgba( " + r + ", " + g + ", " + b + ", " + a + ")";
    //console.log( result );
    return result;
}

window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
    canvasApp();
}

function canvasApp() {
    function drawScreen() {
        //context.fillStyle = '#EEEEEE';
        context.fillStyle = '#000000';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);
        //Box
        context.strokeStyle = '#000000';
        context.strokeRect(1, 1, theCanvas.width-2, theCanvas.height-2);
        
        update();
        testWalls();
        collide();
        render();
    }
    
    function update() {
        for(var i = 0; i <balls.length; i++) {
            ball = balls[i];
            ball.nextx = (ball.x + ball.velocityx);
            ball.nexty = (ball.y + ball.velocityy);
        }
    }
    
    function testWalls() {
        var ball;
        
        for( var i = 0; i < balls.length; i++) {
            ball = balls[i];
            
            if (ball.nextx + ball.radius > theCanvas.width) {
                ball.velocityx = ball.velocityx*-1;
                ball.nextx = theCanvas.width - ball.radius;
            
            } else if (ball.nextx - ball.radius < 0 ) {
                ball.velocityx = ball.velocityx*-1;
                ball.nextx = ball.radius;
                
            } else if (ball.nexty + ball.radius > theCanvas.height) {
                ball.velocityy = ball.velocityy*-1;
                ball.nexty = theCanvas.height - ball.radius;
                
            } else if(ball.nexty -ball.radius < 0) {
                ball.velocityy = ball.velocityy*-1;
                ball.nexty = ball.radius;
            }
        }
    }
    
    function render() {
        var ball;
        //context.fillStyle = "#000000";
        for ( var i = 0; i < balls.length; i++) {
            ball = balls[i];
            ball.x = ball.nextx;
            ball.y = ball.nexty;
/*
            context.fillStyle = ball.color;
            
            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, true);
            context.fill();
*/
            var radius = (DOT_SIZE / 2 ) - 2;
            var gradient = context.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
            gradient.addColorStop(0,    getGradientColor(ball.color, 1));
            gradient.addColorStop(0.2,  getGradientColor(ball.color, 2));
            gradient.addColorStop(0.95, getGradientColor(ball.color, 3));
            gradient.addColorStop(1,    getGradientColor(ball.color, 4));
            context.fillStyle = gradient;
            context.fillRect(ball.x - ball.radius, ball.y - ball.radius, ball.x + ball.radius, ball.y + ball.radius);
        }
    }
    
    function collide() {
        var ball;
        var testBall;
        for ( var i = 0; i < balls.length; i++) {
            ball = balls[i];
            for (var j = i+1; j <balls.length; j++) {
                testBall = balls[j];
                if (hitTestCircle(ball, testBall)) {
                    collideBalls(ball, testBall);
                }
            }
        }
    }
    
    function hitTestCircle(ball1, ball2) {
        var retval = false;
        var dx = ball1.nextx - ball2.nextx;
        var dy = ball1.nexty - ball2.nexty;
        var distance = (dx * dx + dy * dy);
        if (distance <= (ball1.radius+ball2.radius)*(ball1.radius+ball2.radius)){
            retval = true;
        }
        return retval;
    }
    
    function collideBalls(ball1, ball2) {
        var dx = ball1.nextx - ball2.nextx;
        var dy = ball1.nexty - ball2.nexty;
        var collisionAngle = Math.atan2(dy, dx);
        var speed1 = Math.sqrt(ball1.velocityx * ball1.velocityx +
                                ball1.velocityy * ball1.velocityy);
        var speed2 = Math.sqrt(ball2.velocityx * ball2.velocityx +
                               ball2.velocityy * ball2.velocityy);
        var direction1 = Math.atan2(ball1.velocityy, ball1.velocityx);
        var direction2 = Math.atan2(ball2.velocityy, ball2.velocityx);
        var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
        var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
        var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
        var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);
        
        var final_velocityx_1 = ((ball1.mass - ball2.mass) * velocityx_1 +
                                 (ball2.mass + ball2.mass) * velocityx_2) / (ball1.mass + ball2.mass);
        var final_velocityx_2 = ((ball1.mass + ball1.mass) * velocityx_1 +
                                 (ball2.mass - ball1.mass) * velocityx_2) / (ball1.mass + ball2.mass);
        
        var final_velocityy_1 = velocityy_1;
        var final_velocityy_2 = velocityy_2;
        
        ball1.velocityx = Math.cos(collisionAngle) * final_velocityx_1 +
            Math.cos(collisionAngle + Math.PI/2) * final_velocityy_1;
        ball1.velocityy = Math.sin(collisionAngle) * final_velocityx_1 +
            Math.sin(collisionAngle + Math.PI/2) * final_velocityy_1;
        ball2.velocityx = Math.cos(collisionAngle) * final_velocityx_2 +
            Math.cos(collisionAngle + Math.PI/2) * final_velocityy_2;
        ball2.velocityy = Math.sin(collisionAngle) * final_velocityx_2 +
            Math.sin(collisionAngle + Math.PI/2) * final_velocityy_2;
        
        ball1.nextx = (ball1.nextx += ball1.velocityx);
        ball1.nexty = (ball1.nexty += ball1.velocityy);
        ball2.nextx = (ball2.nextx += ball2.velocityx);
        ball2.nexty = (ball2.nexty += ball2.velocityy);
    }
    
    //var numBalls = 200;
    var numBalls = dataSet.length;
    var maxSize = 15;
    var maxSpeed = maxSize+5;
    var balls = [];
    var tempBall;
    var tempX;
    var tempY;
    var tempSpeed;
    var tempAngle;
    var tempRadius;
    var tempRadians;
    var tempvelocityx;
    var tempvelocityy;
    
    theCanvas = document.getElementById("canvasOne");
    context = theCanvas.getContext("2d");
    var x, y;
    var color;
    for (var i =0; i < numBalls; i++) {
        //tempRadius = 5;
        tempRadius = (DOT_SIZE/2)-2;
        color = getRgbColor( dataSet[i] );
        if ( dataSet[i] != "無" ) {
            tempX = X_START_POS + ( i % 16 ) * DOT_SIZE;
            tempY = Y_START_POS + Math.floor( i / 16 ) * DOT_SIZE;
            //tempSpeed = 4;
            tempSpeed = 2;
            tempAngle = Math.floor(Math.random()*360);
            tempRadians = tempAngle * Math.PI / 180;
            tempvelocityx = Math.cos(tempRadians) * tempSpeed;
            tempvelocityy = Math.sin(tempRadians) * tempSpeed;
            
            tempBall = {
                x: tempX,
                y: tempY,
                nextX: tempX,
                nextY: tempY,
                radius: tempRadius,
                speed: tempSpeed,
                angle: tempAngle,
                velocityx: tempvelocityx,
                velocityy: tempvelocityy,
                mass: tempRadius,
                color: color
            };
            balls.push(tempBall);
        }
    }
    
    function canStartHere(ball) {
        var retval = true;
        for (var i = 0; i < balls.length; i++) {
            if (hitTestCircle(ball, balls[i])) {
                retval = false;
            }
        }
        return retval;
    }
    setInterval(drawScreen, 33);
}

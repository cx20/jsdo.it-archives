// forked from uriuriuriu's "now" http://codepen.io/uriuriuriu/pen/LvsEr

//var DOT_SIZE = 15;
var DOT_SIZE = (window.innerHeight/20); // 15;
var X_START_POS = DOT_SIZE * 6; // 90;
var Y_START_POS = DOT_SIZE * 3; // 90;
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

function getRgbColor( c ) {
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

$(function(){
  /* 
    :glitchBox
  */
  function glitchBox(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
  }
  glitchBox.prototype.glitchWave = function(renderLineHeight, cuttingHeight){
    var image = this.ctx.getImageData(0, renderLineHeight, this.width, cuttingHeight);
    this.ctx.putImageData(image, 0, renderLineHeight - 10);
  };
  glitchBox.prototype.glitchSlip = function(waveDistance){
    var startHeight = this.height * Math.random();
    var endHeight = startHeight + 30 + (Math.random() * 40);
    for(var h = startHeight; h < endHeight; h++){
      if(Math.random() < 0.1)h++;
        var image = this.ctx.getImageData(0, h, this.width, 1);
        this.ctx.putImageData(image, Math.random()*waveDistance-(waveDistance/2), h); 
    }
  };
  glitchBox.prototype.glitchSlipColor = function(waveDistance){
    var startHeight = this.height * Math.random();
    var endHeight = startHeight + 30 + (Math.random() * 40);
    var imageData = this.ctx.getImageData(0, startHeight,
                                          this.width, endHeight);
    var data = imageData.data;
    var r = g = b = 0;
    for(var i = 0, len = imageData.width * imageData.height; i<len; i++){
      if(i % imageData.width ==0){
        r = i + Math.floor((Math.random() -0.5) * waveDistance);
        g = i + Math.floor((Math.random() -0.5) * waveDistance);
        b = i + Math.floor((Math.random() -0.5) * waveDistance);
      }
      data[i*4] = data[r*4];      //r
      data[i*4 + 1] = data[g*4 + 1];  //g
      data[i*4 + 2] = data[b*4 + 2]; //b
//      data[i*4 + 3] = data[a*4 + 3];  //a
    }
    this.ctx.putImageData(imageData, 0, startHeight);
  };
  glitchBox.prototype.glitchFillRandom = function(fillCnt, cuttingMaxHeight){
    var cw = this.width;
    var ch = this.height;
    for(var i = 0; i< fillCnt; i++){
      var rndX = cw * Math.random();
      var rndY = ch * Math.random();
      var rndW = cw * Math.random();
      var rndH = (cuttingMaxHeight * Math.random() + 1);
      var image = this.ctx.getImageData(rndX,rndY,rndW, rndH);
      this.ctx.putImageData(image, (rndX* Math.random())%cw, rndY);
    }
  }
  
  
  /* 
    :canvasView
  */  
  function canvasView(canvas, FPS, loopFPS){
    if(canvas == null){
      canvas = document.createElement('canvas');
    }
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.GRID_X = 50;
    this.GRID_Y = 50;
    this.frm = 0;
    this.frmLoop = 0;
    this.FPS = FPS;
    this.loopFPS = loopFPS;
    this.bgCanvasImage;
  }
  canvasView.prototype.initCanvas = function(){
    this.canvas.width = this.width = window.innerWidth;
    this.canvas.height = this.height = window.innerHeight;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.globalAlpha = 1;
  }
  canvasView.prototype.addFrmCount = function(){
    this.frm++;
    this.frmLoop++;
    this.frmLoop = (this.frmLoop % this.loopFPS);
  }

  canvasView.prototype.drawCanvas = function(){
    var cw = this.width;
    var ch = this.height;
    var ctx = this.ctx;
/*
    this.drawBG();
    // circle
    ctx.strokeStyle = 'rgba(30,30,30,0.8)';
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.arc(cw/2, ch/2, cw*0.4705, 0, 2*Math.PI, false);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,130,1)';
    ctx.beginPath();
    ctx.lineWidth = 2;
    var taskFPS = (this.frm % this.loopFPS)/this.loopFPS;
    ctx.arc(cw/2, ch/2, cw*0.4705, 0, 2*Math.PI*taskFPS, false);
    ctx.stroke();
    // bar
    ctx.fillStyle = this.makeGradientStyle();
    var taskFPS = this.frm % this.loopFPS;
    ctx.fillRect(cw/this.loopFPS * taskFPS, ch*0.45,
                 cw*0.5, ch*0.1);
    ctx.fillRect(cw/this.loopFPS * taskFPS - cw, ch*0.45,
                 cw*0.5, ch*0.1);
    // text
    ctx.fillStyle = '#000000';
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "14px 'Futura'";
//    ctx.fillText("frame : " + this.frm, cw/2, ch*0.855, 500);
//    ctx.fillText("width : " + cw + " / height : " +   ch + "px",cw/2, ch*0.89, 500);
    var dataTextH = ch * 0.91;
    var subDataTextH = dataTextH + 16;
    ctx.fillText(this.frm, cw/2 -120, dataTextH, 500);
    ctx.fillText(cw + " px",cw/2, dataTextH, 500);
    ctx.fillText(ch + " px",cw/2 +120, dataTextH, 500);
    ctx.font = "8px 'Futura'";
    ctx.fillText("frame", cw/2 -120, subDataTextH, 500);
    ctx.fillText("width",cw/2, subDataTextH, 500);
    ctx.fillText("height",cw/2 +120, subDataTextH, 500);
    ctx.font = "24px 'Futura'";
    var dayTextH = (ch * 0.5) - 120;
    var daySubTextH = dayTextH + 28;
    ctx.fillText(yyyymmdd(), cw/2, dayTextH, 500);
    ctx.font = "8px 'Futura'";
    ctx.fillText("     year        month      day", cw/2, daySubTextH, 500);
    ctx.font = "110px 'Futura'";
    var mainTextH = (ch * 0.5) - 80;
    var subTextH = mainTextH + 120;
    ctx.fillText(hhmissms(), cw/2, mainTextH, 640);
    ctx.font = "8px 'Futura'";
    ctx.fillText("hour", cw/2 - 260, subTextH, 100);
    ctx.fillText("minute", cw/2 - 110, subTextH, 100);
    ctx.fillText("second", cw/2 + 40, subTextH, 100);
    ctx.fillText("milli second", cw/2 + 230, subTextH, 100);
*/
    this.drawBG();
    for(var i = 0; i < dataSet.length; i++) {
      var x = X_START_POS + (i % 16) * DOT_SIZE;
      var y = Y_START_POS + Math.floor(i / 16) * DOT_SIZE;
      if ( dataSet[i] != "無" ) {
        var color = getRgbColor(dataSet[i]);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, DOT_SIZE - 2, DOT_SIZE - 2);
      }
    }
  }
  canvasView.prototype.drawBG = function(){
    if(this.bgCanvasImage == null){
      var cw = this.width;
      var ch = this.height;
      var ctx = this.ctx;
      // set grid
      this.setGrid();
      // set circle
      ctx.strokeStyle = 'rgba(30,30,30,0.8)';
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.arc(cw/2, ch/2, cw/2, 0, Math.PI*2, false);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(30,30,30,0.8)';
      ctx.beginPath();
      ctx.lineWidth = 12;
      ctx.arc(cw/2, ch/2, cw*0.450, 0, Math.PI*2, false);
      ctx.stroke();
      // set slash
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(cw,ch);
      ctx.stroke();
      ctx.moveTo(cw, 0);
      ctx.lineTo(0, ch);
      ctx.stroke();
      // save Image
      this.bgCanvasImage = ctx.getImageData(0, 0,cw,ch);
    }
    // put saved image
    this.ctx.putImageData(this.bgCanvasImage, 0,0);
  }
 
  canvasView.prototype.setGrid = function(){
    var pointR = 0.6;
    var pointBigR = 1.2;
    var detailCeparetCnt = 5;
//    var gridW = this.width / this.GRID_X*10;
//    var gridH = this.height / this.GRID_Y*10;
    var gridW = 100;
    var gridH = 100;
    
    // detailDot
    var patternCanvas1 = document.createElement("canvas");
    patternCanvas1.width = gridW/detailCeparetCnt;
    patternCanvas1.height = gridH/detailCeparetCnt;
    var pCtx = patternCanvas1.getContext("2d");
    pCtx.arc(gridW/detailCeparetCnt/2,gridH/detailCeparetCnt/2,
             pointR,0,Math.PI * 2);
    pCtx.fillStyle = "rgba(0,0,0,0.2)";
    pCtx.fill();

    // grid+
    var patternCanvas2 = document.createElement("canvas");
    patternCanvas2.width = gridW;
    patternCanvas2.height = gridH;
    var pCtx2 = patternCanvas2.getContext("2d");
    pCtx2.arc((gridW/2),(gridH/2),pointBigR,0,Math.PI * 2);
    pCtx2.fillStyle = "rgba(0,0,0,0.5)";
    pCtx2.fill();
    pCtx2.lineWidth = 0.2;
    pCtx2.strokeStyle = 'rgba(0,0,0,0.1)';
    pCtx2.moveTo(0, (gridH/2));
    pCtx2.lineTo(gridW, (gridH/2));
    pCtx2.stroke();
    pCtx2.moveTo((gridW/2), 0);
    pCtx2.lineTo((gridW/2), gridH);
    pCtx2.stroke();

    pCtx2.fillStyle = pCtx2.createPattern(patternCanvas1, "repeat");
    pCtx2.fillRect(0, 0,patternCanvas2.width, patternCanvas2.height);

    var ctx = this.ctx;
    ctx.fillStyle = ctx.createPattern(patternCanvas2, "repeat");
    ctx.fillRect(0, 0,this.width, this.height);
    
  }
  canvasView.prototype.makeGradientStyle = function(){
    var grad  = this.ctx.createLinearGradient(0,0, this.width,0);
    grad.addColorStop(0,'rgb(220, 0, 0)');
    grad.addColorStop(0.5,'rgb(220, 0, 220)');
    grad.addColorStop(1,'rgb(0, 0, 220)');
    return grad;
  }

  // other
  // 1桁の数字を0埋めで2桁にする
  var toDoubleDigits = function(num) {
    num += "";
    if (num.length === 1)num = "0" + num;
   return num;     
  };
  var toTripleDigits = function(num) {
    num += "";
    if (num.length === 1)num = "0" + num;
    if (num.length === 2)num = "0" + num;
   return num;
  };

  // 日付をYYYY/MM/DD HH:DD:MI:SS形式で取得
  var yyyymmdd = function() {
    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = toDoubleDigits(date.getMonth() + 1);
    var dd = toDoubleDigits(date.getDate());
    return yyyy + '/' + mm + '/' + dd;
  };
  var hhmissms = function() {
    var date = new Date();
    var hh = toDoubleDigits(date.getHours());
    var mi = toDoubleDigits(date.getMinutes());
    var ss = toDoubleDigits(date.getSeconds());
    var ms = toTripleDigits(date.getMilliseconds())
    return hh + ':' + mi + ':' + ss + ':' + ms;
  };
  var getRandOffsetNum = function(){
    var num = Math.random() * 1800 + 250;
    if(Math.random() < 0.6){
      num *= -1;
    }
    return num;
  }


  var FPS = 30;
  var loopFPS = 100;
  var canvasView = new canvasView(null, FPS, loopFPS);
  canvasView.initCanvas();
  var glitch = new glitchBox(canvasView.canvas);
  document.body.appendChild(canvasView.canvas);
  var render = function(){
    canvasView.addFrmCount();
    canvasView.drawCanvas();
    if(canvasView.frmLoop < 10){
      // fillCnt, cuttingMaxHeight
      glitch.glitchFillRandom(5, 20);
    }
    if(canvasView.frmLoop < 20){
      glitch.glitchSlip(8);
    }
    if(94 < canvasView.frmLoop){
      glitch.glitchSlipColor(50);
    }
    // renderLineHeight, cuttingHeight
    glitch.glitchWave((canvasView.frm * 3) % canvasView.height, 3);
    //  if(counter >= 10)clearInterval(timer);  
  }
  
  // animation task
  window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame  ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback, element){
        window.setTimeout(callback, 1000 / FPS);
      };
  })();
  function animationLoop(){
    render();
    requestAnimationFrame(animationLoop);
  };
  animationLoop();
});

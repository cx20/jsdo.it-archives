// forked from kimmy's Dots http://codepen.io/kimmy/pen/yyzOgY/

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

(function(win, doc) {
  function Dot(ctx) {
    this.ctx = ctx;
  }
  Dot.SIZE = {
    MAX: 30,
    DIFF: 25
  };
  Dot.prototype = {
    constructor: Dot,
    draw: function(x, y, r, c) {
      var ctx = this.ctx;

      ctx.save();
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, false);
      ctx.globalCompositeOperation = "lighter";
      ctx.fill();
      ctx.restore();
    }
  };

  function Dots(canvas, width, height) {
    $(canvas).css({
      marginTop: -height,
      marginLeft: -width
    });
    this.ctx = canvas.getContext("2d");
    this.dot = new Dot(ctx);
    this.distance = 27;
    this.list = (function(that, width, height) {
      var list = [],
          min = (width < height) ? width : height,
          i = 0,
          length = min / that.distance - 1 | 0,
          margin = (min - (length - 1) * that.distance) / 2;
      
      console.log(min, margin);
      
      for (; i < length; ++i) {
        list.push(that.distance * i + margin);
      }

      return list;
    })(this, width * 2, height * 2);
    this.length = Math.pow(this.list.length, 2);
    this.limit = this._getDistance(this.list[0], this.list[0], this.list[1], this.list[1]);
  }
  Dots.prototype = {
    constructor: Dots,
    _getDistance: function(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    },
    _getSize: function(distance) {
      var per = distance / this.limit;

      if (per > 1) {
        per = 1;
      }

      return Dot.SIZE.MAX - Dot.SIZE.DIFF * per;
    },
    draw: function(x2, y2) {
      var ctx = this.ctx,
        dot = this.dot,
        list = this.list,
        r, x1, y1;

      for (var i = 0, length = this.length; i < length; ++i) {
        x1 = list[i % this.list.length];
        y1 = list[i / this.list.length | 0];
        r = this._getSize(this._getDistance(x1, y1, x2, y2));
        c = getRgbColor(dataSet[i]);
        dot.draw(x1, y1, r, c);
      }
    },
    getRandom: function() {
      return this.list[Math.random() * this.list.length | 0];
    }
  };

  var min = (win.innerWidth < win.innerHeight) ? win.innerWidth : win.innerHeight,
      width = 465/2,
      height = 465/2,
      canvas = doc.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      dots = new Dots(canvas, width, height);

  _init();

  function _init() {
    var i = 0,
        r = 20,
        $obj;

    $obj = $({
      x : dots.getRandom(),
      y : dots.getRandom()
    });

    _draw();

    (function animate() {
      var ms = 800;

      $obj.animate({
        x: dots.getRandom(),
        y: dots.getRandom()
      }, {
        duration: ms,
        progress: _draw,
        complete: animate
      });
    })();

    function _draw() {
      _clearCanvas();
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width * 2, height * 2);
      dots.draw($obj[0].x, $obj[0].y);
    }
  }

  function _clearCanvas() {
    canvas.width = width * 2;
    canvas.height = height * 2;
  }
})(this, document);

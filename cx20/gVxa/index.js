// forked from edo_m18's "UndulateNet" http://jsdo.it/edo_m18/tY0o

//var DOT_SIZE = 20;
var DOT_SIZE = (window.innerHeight/18); // 20;
var X_START_POS = 50;
var Y_START_POS = 0;
var X_MAX = 440;
var Y_MAX = 440;

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


var HALF_ROOT_3 = Math.sqrt(3) / 2,
    isTouch = !!('createTouch' in document),
    cursorStartEvent = isTouch ? 'touchstart' : 'mousedown',
    cursorMoveEvent = isTouch ? 'touchmove' : 'mousemove',
    cursorEndEvent = isTouch ? 'touchend' : 'mouseup',
    requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function( callback, element ){
              window.setTimeout(callback, 1000 / 60);
            };
    })();

/* ==================== EventHandler ==================== */

function EventHandler() {}
EventHandler.prototype.handleEvent = function( event ) {
    if ( this[event.type] ) {
        this[event.type](event);
    }
};

// ======================= UndulateNode  ===============================

function UndulateNode( settings ) {
    // extend settings over constructor
    for ( var key in settings ) {
        this[ key ] = settings[ key ];
    }

    this.angle = 0;
    this.offsetX = 0;
    this.offsetY = 0;
}

UndulateNode.prototype.elasticizeProperty = function ( prop, target ) {
    var deltaProp = prop + 'Delta';
    this[ deltaProp ] = ( this[ deltaProp ] || 0 ) * this.parent.elasticity + (this[ prop ] - target) * this.parent.responsiveness;
    this[ prop ] -= this[ deltaProp ];
};

UndulateNode.prototype.update = function() {

    var cursor, identifier, distance, angle, dx, dy;

    for ( identifier in this.parent.cursors ) {
        cursor = this.parent.cursors[ identifier ];
        dx = cursor.pageX - this.x - this.parent.offset.x;
        dy = cursor.pageY - this.y - this.parent.offset.y;
        distance = Math.sqrt( dx * dx + dy * dy );
        angle = Math.atan2( dy, dx );
    }

    this.angle = angle || this.angle;

    var targetD = distance ? (this.parent.displacementRadius - distance) : 0;

    targetD = Math.max( targetD, 0 ) * this.parent.displacementIntensity;

    var targetOffsetX = Math.cos( this.angle ) * -targetD,
        targetOffsetY = Math.sin( this.angle ) * -targetD;
        
    this.elasticizeProperty( 'offsetX', targetOffsetX );
    this.elasticizeProperty( 'offsetY', targetOffsetY );

    this.x = this.origin.x + this.offsetX + X_START_POS;
    this.y = this.origin.y + this.offsetY + Y_START_POS;
};

UndulateNode.prototype.render = function() {
    var ctx = this.parent.context;
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = 'white';
    if ( this.parent.isRenderingGrid ) {

        // node on right
        this.renderLineToNode( this.parent.nodes[ this.row ][ this.col + 1 ] );

        var nextNodeRow = this.parent.nodes[ this.row + 1 ],
            colShiftA = this.row % 2 ? 0 : -1,
            colShiftB = this.row % 2 ? 1 : 0;

        if (nextNodeRow) {
            // diagonal down/left
            this.renderLineToNode( nextNodeRow[ this.col + colShiftA ] );
            // diagonal down/right
            this.renderLineToNode( nextNodeRow[ this.col + colShiftB ] );
        }
    }

/*
    // ctx.fillStyle = 'white';
    //if ( this.parent.isRenderingDots ) {
        ctx.beginPath();
        ctx.arc( this.x, this.y, 5, 0, Math.PI*2, false );
        ctx.fill();
    //}
*/
    var radius = (DOT_SIZE　/ 2 ) - 2;
    var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, radius);
    gradient.addColorStop(0,    getGradientColor(this.color, 1));
    gradient.addColorStop(0.2,  getGradientColor(this.color, 2));
    gradient.addColorStop(0.95, getGradientColor(this.color, 3));
    gradient.addColorStop(1,    getGradientColor(this.color, 4));
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x - radius, this.y - radius, this.x + radius, this.y + radius);
    
};

UndulateNode.prototype.renderLineToNode = function( node ) {
    // don't proceed if no node
    if (!node) {
        return;
    }

    var ctx = this.parent.context;
    ctx.beginPath();
    ctx.moveTo( this.x, this.y );
    ctx.lineTo( node.x, node.y );
    ctx.stroke();
};


// ======================= UndulateNet  ===============================

function UndulateNet( settings ) {
    // extend settings over constructor
    for ( var key in settings ) {
        this[ key ] = settings[ key ];
    }

    // don't proceed if canvas is not supported
    if ( !this.canvas.getContext || !this.canvas.getContext('2d') ) {
        return;
    }

    // get canvas context
    this.context = this.canvas.getContext('2d');

    // add nodes
    this.populate();
    this.cursors = {};
    this.canvas.addEventListener( cursorStartEvent, this, false );
    this.animate();
}

UndulateNet.prototype = new EventHandler();
UndulateNet.prototype.populate = function() {
    this.offset = {
      x: this.canvas.offsetLeft,
      y: this.canvas.offsetTop
    };

    //var verticalPadding = 100;

    // set size
    //this.width = this.canvas.width = X_MAX;    // window.innerWidth;
    //this.height = this.canvas.height = Y_MAX;    // window.innerHeight + verticalPadding * 2;
    this.width = this.canvas.width = window.innerWidth;    // window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;    // window.innerHeight + verticalPadding * 2;

    //var netHeight = this.height - verticalPadding * 2;
    var netHeight = this.height;

    this.spacing = Math.sqrt( ( this.width * netHeight ) / ( this.nodeCount * HALF_ROOT_3 ) );

    this.nodes = [];

    this.cols = Math.ceil( this.width / this.spacing );
    this.rows = Math.ceil( netHeight / ( this.spacing * HALF_ROOT_3 ) );

    var nodeCount = this.cols * this.rows;

    var xAdjust = ( ( this.width % this.spacing ) - this.spacing / 2 ) / 2,
        yAdjust = ( netHeight % ( this.spacing * HALF_ROOT_3 ) ) / 2 + 100,
        origin,
        y, x, row, col, rowAdjust, node,
        rowNodes;

    var ctx = this.context;

    var i;
    var color;
    for ( row = 0; row < this.rows; row++ ) {
        this.nodes[row] = [];
        y = row * this.spacing * HALF_ROOT_3 + yAdjust;
        for ( col = 0; col < this.cols; col++ ) {
            rowAdjust = (row % 2) * 0.5;
            origin = {
                x : (col + rowAdjust) * this.spacing + xAdjust,
                'y' : y
            };
            if ( row < 16 && col < 16 ) { 
                i = row * 16 + col;
                color = getRgbColor( dataSet[i] );
            } else {
                color = "#000000";
            }
            node = new UndulateNode({
                parent : this,
                'origin' : origin,
                'row' : row,
                'col' : col,
                'color' : color
            });

            this.nodes[row].push( node );
        }
    }
};

UndulateNet.prototype.animate = function() {

var ctx = this.context,
    node, row, col;

ctx.clearRect( 0, 0, this.width, this.height );

for ( row = 0; row < this.rows; row++ ) {
    for ( col = 0; col < this.cols; col++ ) {
        node = this.nodes[row][col];
        node.update();
    }
}

for ( row = 0; row < this.rows; row++ ) {
    for ( col = 0; col < this.cols; col++ ) {
        node = this.nodes[row][col];
        // 黒は描画しない
        if ( node.color != "#000000" ) {
            node.render();
        }
    }
}

var instance = this;
    requestAnimFrame( function() { instance.animate(); } );
};

// ======================= event handling ===============================

UndulateNet.prototype.mousedown = function( event ) {
this.cursorStart( event );
    event.preventDefault();
};

UndulateNet.prototype.mousemove = function( event ) {
    this.cursors.mouse = event;
};

UndulateNet.prototype.mouseup = function( event ) {
    this.cursorEnd( event );
};

// TODO - add multi-touch
UndulateNet.prototype.touchstart = function( event ) {
    this.cursorStart( event.changedTouches[0] );
    event.preventDefault();
};

UndulateNet.prototype.touchend = function( event ) {
    this.cursorEnd( event );
};

UndulateNet.prototype.cursorStart = function( cursor ) {
    this.cursors.mouse = cursor;

    document.addEventListener( cursorMoveEvent, this, false );
    document.addEventListener( cursorEndEvent, this, false );
};

UndulateNet.prototype.cursorEnd = function ( event ) {
    delete this.cursors.mouse;

    document.removeEventListener( cursorMoveEvent, this, false );
    document.removeEventListener( cursorEndEvent, this, false );
};

// ======================= init  ===============================

function init() {
    var canvasElem = document.getElementById('cv');
	canvasElem.width = window.innerWidth;
	canvasElem.height = window.innerHeight;
    var net = new UndulateNet({
        canvas: canvasElem,
        nodeCount: 550, // an approximate figure
        elasticity: 0.97,
        responsiveness: 0.06,
        displacementRadius: 400,
        displacementIntensity: -0.12,
        isRenderingGrid: false,
        isRenderingDots: false
    });
}

init();

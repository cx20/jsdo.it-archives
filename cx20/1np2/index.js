// forked from kazuki_nagasawa's "2次元 落下する球体 その1" http://jsdo.it/kazuki_nagasawa/createjs-easeljs-007

var DOT_SIZE = 16;
var X_START_POS = 50;
var Y_START_POS = -280;

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

// 重力加速度
//var _G = 9.80665;
var _G = 9.80665 / 2; // スピードを1/2に変更

// FPS
var _FPS = 30;

// 単位時間
var _dt  = 1;

/*
 * Get random color string
 */
function _getRandomColor() {
    return '#' + ( ( 1 << 24 ) * Math.random() | 0 ).toString( 16 );
}

/*
 * Field
 */
var Field = function( stage ) {

    // canvas object
    var _stage = stage;
    var _field = null;

    // color
    var _color = '#EEEEEE';

    // children
    var _children = [];

    // Self
    var _self = this;


    /*
     * Initialize
     */
    this.initialize = function( width, height ) {

        if ( _field === null ) {
            _field = new createjs.Shape();
        }
        _stage.addChild( _field );

        _field.addEventListener( 'click', function( event ) {
            _onClick( event );
        } );

        this.initData();

        this.resize( width, height );
    };


    /*
     * Update
     */
    this.update = function() {
        _.each( _children, function( child ) {
            child.update();
        } );
        _stage.update();
    };

    /*
     * initData
     */
    this.initData = function() {
        for ( var i = 0; i < dataSet.length; i++ ) {
            var x = (i % 16) * DOT_SIZE + X_START_POS;
            var y = Math.floor(i / 16) * DOT_SIZE + Y_START_POS;
            var coord = _display2World( x, y );
            var mass = Math.random() * 1 + 1;
            var v_x  = Math.random() * 2 + 1;
            if ( dataSet[i] != "無" ) {
                var color = getRgbColor( dataSet[i] );
        
                var circle = new Circle( _self );
                circle.initialize( _stage, coord.x, coord.y, mass, v_x, color );
                _addChild( circle );
            }
        }
    };

    /*
     * resize
     */
    this.resize = function( width, height ) {
        _stage.canvas.width  = width;
        _stage.canvas.height = height;

        _drawBackground();
    };

    /*
     * Get field size
     */
    this.getFieldSize = function() {
        return { 'width': _stage.canvas.width, 'height': _stage.canvas.height };
    };


    /*
     * 背景描画
     */
    var _drawBackground = function() {

        if ( _field !== null ) {
            _field.graphics.clear();
            _field.graphics.beginFill( _color ).drawRect( 0, 0, _stage.canvas.width, _stage.canvas.height );
        }
    };


    /*
     * world2Display
     * 内部計算座標から表示用座標に変換する。
     */
    this.world2Display = function( x, y ) {
        return _world2Display( x, y );
    };

    var _world2Display = function( x, y ) {
        var new_x = x;
        var new_y = _stage.canvas.height - y;
        return { 'x': new_x, 'y': new_y };
    };


    /*
     * display2World
     * 表示用座標から内部計算座標に変換する。
     */
    this.display2World = function( x, y ) {
        return _display2World( x, y );
    };

    var _display2World = function( x, y ) {
        var new_x = x;
        var new_y = _stage.canvas.height - y;
        return { 'x': new_x, 'y': new_y };
    };


    /*
     * AddChild
     */
    var _addChild = function( child ) {
        _children.push( child );
    };
    

    /*
     * RemoveChild
     */
    this.removeChild = function( child ) {
        _removeChild( child );
    };

    var _removeChild = function( child ) {
        var index = _.indexOf( _children, child );
        if ( index >= 0 ) {
            _children.splice( index, 1 );
            _stage.removeChild( child.getDisplayObject() );
        }
    };


    /*
     * Click 時の処理
     */
    var _onClick = function( event ) {

        var coord = _display2World( event.stageX, event.stageY );
        var mass = Math.random() * 4 + 1; // 1 ～ 5
        var v_x  = Math.random() * 15 + 5; // 5 ～ 20
        var color = _getRandomColor();

        var circle = new Circle( _self );
        circle.initialize( _stage, coord.x, coord.y, mass, v_x, color );
        _addChild( circle );
    };
};


/*
 * Circle
 */
var Circle = function( field ) {

    var _field = field;
    var _circle = null;
    var _radius_unit = 5;

    // Mass
    var _mass = 1;
    var _radius = 0; // 描画する円の半径は unit * mass。初期化時に計算。

    // Acceleration
    var _a_y = 0;

    // Velocity
    var _v_x = 0; // X 方向は等速度運動。初期化時に設定。
    var _v_y = 0;

    // Position
    var _x = 0;
    var _y = 0;

    // Color
    var _color = '#000000';
    var _alpha = 1;

    // Time
    var _time_count = 0;
    var _time_max = 3000; // 基準を超えると削除開始。

    // Flags
    var _vanish_flag = false;
    var _delete_flag = false;

    /*
     * Initialize
     */
    this.initialize = function( stage, x, y, mass, v_x, color ) {
        _x = x; _y = y; _mass = mass;
        _v_x = v_x; _color = color;

        _radius = _radius_unit * _mass;

        if ( _circle === null ) {
            _circle = new createjs.Shape();
        }
        stage.addChild( _circle );
    };
    

    /*
     * 描画オブジェクト取得
     */
    this.getDisplayObject = function() {
        return _circle;
    };
    

    /*
     * Update
     */
    this.update = function() {

        var field_size = _field.getFieldSize();

        // Acceleration
        _a_y = - _G / _mass;

        // Velocity
        _v_y += _a_y * _dt;

        // Position
        _x += _v_x * _dt;
        _y += _v_y * _dt;
        
        // reflection
        if ( _y < _radius ) {
            _v_y = - _v_y;
            _y = _radius;
        }
        if ( _x >= field_size.width ) {
            _v_x = - _v_x;
            _x = field_size.width;
        } else if ( _x <= 0 ) {
            _v_x = - _v_x;
            _x = 0;
        }

        // Time
        _time_count += _dt;
        if ( _time_count > _time_max ) {
            _vanish_flag = true;
        }

        // Vanish
        if ( _vanish_flag ) {
            _alpha -= 0.01;
            if ( _alpha < 0 ) {
                _delete_flag = true;
            }
        }

        // Delete
        if ( _delete_flag ) {
            _vanish_flag = false; _delete_flag = false;
            _field.removeChild( this );
        }

        // 描画 update
        _update();
    };

    var _update = function() {

        if ( _circle !== null ) {
            var coords = _field.world2Display( _x, _y );
            _circle.graphics.clear();
            _circle.graphics.beginFill( _color ).drawCircle( coords.x, coords.y, _radius );
            _circle.alpha = _alpha;
        }
    };
};



$(window).ready( function() {

    var stage = new createjs.Stage( 'canvas' );

    var field = new Field( stage );
    field.initialize( $(window).innerWidth(), $(window).innerHeight() );

    // Resize
    $(window).resize( function() {
        field.resize( $(window).innerWidth(), $(window).innerHeight() );
    } );

    // Ticker
    createjs.Ticker.addEventListener( 'tick', function() {
        field.update();
    } );
    createjs.Ticker.setFPS( _FPS );
} );

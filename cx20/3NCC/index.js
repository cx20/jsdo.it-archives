// forked from kazuki_nagasawa's "Three.js でオセロ対戦 その2 (表示をちょっと豪華に…)" http://jsdo.it/kazuki_nagasawa/threejs-othello-002
// forked from kazuki_nagasawa's "Three.js でオセロ対戦 その1 (表示のみ)" http://jsdo.it/kazuki_nagasawa/threejs-othello-001

var DOT_SIZE = 0.3;
var X_START_POS = -2;
var Y_START_POS = -2;
var Z_START_POS = -3;

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
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤",
    "無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤","赤",
    "無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤","赤","無",
    "無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤",
    "無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤","赤",
    "無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤","赤","無",
    "無","無","無","無","無","無","無","無","無","無","赤","赤","赤","赤","無","無",
    "無","無","無","無","無","無","無","無","無","無","赤","赤","赤","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶",
    "無","無","無","無","無","無","無","無","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","無","無","無","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","無","無","無","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","赤","赤","赤","無","無","無","肌","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","肌","肌","肌",
    "無","無","無","無","無","茶","茶","茶","無","無","無","無","無","赤","赤","赤",
    "無","無","無","無","茶","肌","無","無","無","無","無","無","無","赤","赤","赤",
    "無","無","無","無","茶","肌","無","無","無","無","無","茶","赤","赤","赤","赤",
    "無","無","無","無","茶","茶","無","無","無","無","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","無","無",
    "無","無","無","無","無","無","無","無","無","青","青","赤","赤","無","無","無",
    "無","無","無","無","無","無","無","無","無","青","赤","赤","赤","無","無","茶",
    "無","無","無","無","無","無","無","無","青","青","青","青","青","無","無","茶",
    "無","無","無","無","無","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","無","無",
    "無","無","無","無","無","茶","茶","茶","肌","肌","無","無","無","無","無","無",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","無","無","無","無","無","無",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","無","無",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","無","無",
    "無","無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","無","無","無",
    "無","無","無","無","無","無","無","赤","赤","赤","赤","青","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","赤","青","無","無","茶",
    "無","無","無","無","無","無","赤","赤","赤","青","青","青","青","無","無","茶",
    "無","無","無","無","無","青","赤","青","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","無","青","青","青","青","青","無","無","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","無","無",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","無","無","無","無","無",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","無","無","無",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","無",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","無","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","無","無","無",
    "無","無","無","無","無","無","赤","青","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","青","赤","赤","赤","無","無","無","茶",
    "無","無","無","無","無","無","赤","赤","青","青","青","青","青","無","無","茶",
    "無","無","無","無","無","青","赤","青","青","青","青","青","黄","無","茶","茶",
    "無","無","無","茶","無","青","青","青","青","青","青","青","青","無","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","無","茶","茶",
    "無","茶","茶","茶","無","無","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","無","無","無","無","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","無","無",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","無","無","無",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","無","無","無",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","無",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","無","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","無","無","無",
    "無","無","無","無","無","青","赤","青","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","青","赤","赤","青","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","青","赤","赤","青","青","青","無","無","無","無","無",
    "無","無","無","無","無","青","赤","青","青","青","青","青","無","無","無","無",
    "無","無","無","茶","無","青","青","青","青","青","青","青","無","無","無","無",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","無","無",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","無","無","無",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","無","無","無",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","無",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","無","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","無","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","無","無","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","無","無","無","無","無",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","無","無","無","無","無",
    "肌","肌","肌","無","無","無","赤","青","青","青","青","青","無","無","無","無",
    "無","肌","無","茶","無","無","青","青","青","青","青","青","無","無","無","無",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","無","無",
    "無","無","無","無","無","茶","茶","茶","肌","肌","無","無","無","無","無","無",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","無","無","無","無","無","無",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","無","無",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","無","無",
    "無","無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","無","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","無","無","無","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","無","無","無","無","無","無",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","無","無","無","無","無","無",
    "肌","肌","肌","無","無","無","赤","青","青","黄","無","無","無","無","無","無",
    "無","肌","無","茶","無","無","青","青","青","青","青","無","無","無","無","無",
    "無","無","茶","茶","茶","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","赤","赤","赤","無","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","無","無","無",
    "無","無","無","無","無","茶","茶","茶","無","無","無","無","無","無","無","無",
    "無","無","無","無","茶","肌","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","茶","肌","無","無","無","無","無","茶","無","無","無","無",
    "無","無","無","無","茶","茶","無","無","無","無","茶","茶","茶","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","赤","赤","赤","赤","赤","青","無","無","無","無","無","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","無","無","無","無","無","無","無",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","無","無","無","無","無","無","無",
    "肌","肌","肌","無","無","無","無","青","青","無","無","無","無","無","無","無",
    "無","肌","無","茶","無","無","青","青","青","青","無","無","無","無","無","無",
    "無","無","茶","茶","茶","無","青","青","青","青","無","無","無","無","無","無",
    "無","茶","茶","茶","無","無","青","青","青","青","無","無","無","無","無","無",
    "無","茶","無","無","無","無","無","無","無","無","無","無","無","無","無","無"
    ]
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

/*
 * Constant
 */
// Parameters
var OTHELLO_FIELD_SIZE = 8; // オセロ盤の一辺のサイズ
var OBJECTS_SIZE       = 5; // オセロ盤や石の描画基本サイズ

// Othello color status
var OTHELLO_EMPTY = 0;
var OTHELLO_BLACK = 1;
var OTHELLO_WHITE = 2;

// Othello action status
var OTHELLO_CREATE = 0;
var OTHELLO_CHANGE = 1;

// Background texture path
var BACKGROUND_TEXTURE_LEFT   = '../../assets/g/5/i/h/g5ihV.jpg';
var BACKGROUND_TEXTURE_RIGHT  = '../../assets/g/W/R/Z/gWRZ2.jpg';
var BACKGROUND_TEXTURE_FRONT  = '../../assets/q/R/r/w/qRrwX.jpg';
var BACKGROUND_TEXTURE_BACK   = '../../assets/q/R/U/D/qRUD1.jpg';
var BACKGROUND_TEXTURE_BOTTOM = '../../assets/d/9/0/y/d90yC.jpg';
var BACKGROUND_TEXTURE_TOP    = '../../assets/k/9/G/o/k9Go1.jpg';

// Field line color
var OTHELLO_FIELD_LINE_COLOR = 0x00FA9A;

// Field texture path
var OTHELLO_FIELD_TEXTURE = '../../assets/o/t/x/W/otxWC.jpg'; // From "http://free-texture.net/"

// Stone color (s)
// 0 番目から max_length 番目までグラデーション
var OTHELLO_STONE_COLOR = [];
OTHELLO_STONE_COLOR[0] = 0x000000;
OTHELLO_STONE_COLOR[1] = 0x222222;
OTHELLO_STONE_COLOR[2] = 0x444444;
OTHELLO_STONE_COLOR[3] = 0x666666;
OTHELLO_STONE_COLOR[4] = 0x888888;
OTHELLO_STONE_COLOR[5] = 0xBBBBBB;
OTHELLO_STONE_COLOR[6] = 0xDDDDDD;
OTHELLO_STONE_COLOR[7] = 0xFFFFFF;

/*
 * ThreeJS Renderer
 */
var ThreeRenderer = function()
{
    var _renderer = null;
    var _scene    = null;
    var _camera   = null;
    var _lights   = null;

    // Objects parameters
    var _objects_size = OBJECTS_SIZE;

    // Camera position
    var _camera_r     = 60;
    var _camera_phi   = 60;
    var _camera_theta =  0;

    var _camera_update_flag = true;

    // Background
    var _background = null;

    // Othello field
    var _othello_field = null;

    // Othello blocks
    var _othello_blocks = null;

    /*
     * Initialize
     */
    this.initialize = function() {

        _initThreeJs();
        _initScene();
        _initCamera();

        _initLights();

        // Background
        _background = new Background( _scene );
        _background.initialize();

        // Othello field
        _othello_field = new OthelloField( _scene, _objects_size );
        _othello_field.initialize();

        // Othello blocks
        _othello_blocks = new OthelloBlocks( _scene, _objects_size );
        _othello_blocks.initialize();

        _loop();
    };

    /*
     * SetCameraMoveFlag
     */
    this.setCameraMoveFlag = function( flag ) {
        _camera_update_flag = flag;
    };

    /*
     * getDomElement
     * Renderer の DOM Element を取得する。canvas に登録することで表示可能。
     */
    this.getDomElement = function() {
        return _renderer.domElement;
    };

    /*
     * Set order
     * オセロ管理側からの描画命令を設定する。
     */
    this.setOrder = function( x, y, color, action ) {
        var order_obj = { x: x, y: y, color: color, action: action };
        _othello_blocks.setOrderQueue( order_obj );
    };

    /*
     * Resize
     */
    this.resize = function( width, height ) {

        _renderer.setSize( width, height );

        if ( height <= 0 ) { height = 1.0; }
        _camera.aspect = width / height;
        _camera.updateProjectionMatrix();
    };


    var _initThreeJs = function() {
        _renderer = new THREE.WebGLRenderer( { antialias: true } );
    };

    var _initScene = function() {
        _scene = new THREE.Scene();
    };

    var _initCamera = function() {
        _camera = new THREE.PerspectiveCamera( 45, 1.0, 0.1, 10000 ); // perspective は resize 時に設定
    };

    var _initLights = function() {

        _lights = {}; // @todo: lights 設定
        _lights[0] = new THREE.DirectionalLight( 0x888888, 1.0, 0 ); // 平行光源
        _lights[0].position.set( -1500, -1500, 1000 );

        _lights[1] = new THREE.AmbientLight( 0xAAAAAA ); // 環境光源

        _.each( _lights, function( light ) {
            _scene.add( light );
        } );
    };

    /*
     * Loop
     */
    var _loop = function() {

        _renderer.clear();
        _renderer.render( _scene, _camera );

        // Othello blocks
        _othello_blocks.update();

        // Camera position
        if ( _camera_update_flag ) {
            _camera_theta += 0.3;
            _setCameraPosition();
        }

        window.requestAnimationFrame( function() { _loop(); } );
    };

    var _setCameraPosition = function() {

        var rad_phi   = _camera_phi * Math.PI / 180.0;
        var rad_theta = _camera_theta * Math.PI / 180.0;

        var pos = new THREE.Vector3( 0, 0, 0 );
        pos.x = _camera_r * Math.sin( rad_phi ) * Math.cos( rad_theta );
        pos.y = _camera_r * Math.sin( rad_phi ) * Math.sin( rad_theta );
        pos.z = _camera_r * Math.cos( rad_phi );

        _camera.position.set( pos.x, pos.y, pos.z );
        _camera.up.set( 0, 0, 1 );
        _camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
    };
};


/*
 * Background
 * 背景・テクスチャ表示
 * ( Three.js sample "canvas_geometry_panorama.html" 参照 )
 */
var Background = function( scene ) {

    var _scene = scene;

    var _texture_placeholder  = null;

    this.initialize = function() {

        _texture_placeholder = document.createElement( 'canvas' );
        _texture_placeholder.width  = 128;
        _texture_placeholder.height = 128;

        var materials = [
            _loadTexture( BACKGROUND_TEXTURE_LEFT ),   // left
            _loadTexture( BACKGROUND_TEXTURE_RIGHT ),  // right
            _loadTexture( BACKGROUND_TEXTURE_FRONT ),  // front
            _loadTexture( BACKGROUND_TEXTURE_BACK ),   // back
            _loadTexture( BACKGROUND_TEXTURE_BOTTOM ), // botton
            _loadTexture( BACKGROUND_TEXTURE_TOP )     // top
        ];

        var geometry = new THREE.BoxGeometry( 128, 128, 128, 1, 1, 1 );
        var material = new THREE.MeshFaceMaterial( materials );

        var mesh = new THREE.Mesh( geometry, material );
        _scene.add( mesh );
    };

    var _loadTexture = function( path ) {

        var texture  = new THREE.Texture( _texture_placeholder );
        var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.BackSide } );

        var image = new Image();
        image.onload = function() {
            texture.image       = this;
            texture.needsUpdate = true;
        };
        image.src = path;

        return material;
    };
};


/*
 * Othello field
 * オセロ盤
 */
var OthelloField = function( scene, objects_size )
{
    var _scene        = scene;
    var _objects_size = objects_size;

    var _offset = _objects_size * ( OTHELLO_FIELD_SIZE / 2 );

    /*
     * Initialize
     */
    this.initialize = function() {

        _initializeLines();
        _initializeField();
    };

    var _initializeLines = function() {

        var position_x, position_y;
        var geometry, line;

        var material = new THREE.LineBasicMaterial( { color: OTHELLO_FIELD_LINE_COLOR } );
        var line_offset = _objects_size / 2.0;

        for ( var x = 0; x < OTHELLO_FIELD_SIZE + 1; x++ ) {
            for ( var y = 0; y < OTHELLO_FIELD_SIZE + 1; y++ ) {

                // X方向
                geometry = new THREE.Geometry();
                position_x = x * _objects_size - _offset - line_offset;
                geometry.vertices.push( new THREE.Vector3( position_x, -_offset - line_offset, 0 ) );
                geometry.vertices.push( new THREE.Vector3( position_x,  _offset - line_offset, 0 ) );

                line = new THREE.Line( geometry, material.clone() );
                _scene.add( line );

                // Y方向
                geometry = new THREE.Geometry();
                position_y = y * _objects_size - _offset - line_offset;
                geometry.vertices.push( new THREE.Vector3( -_offset - line_offset, position_y, 0 ) );
                geometry.vertices.push( new THREE.Vector3(  _offset - line_offset, position_y, 0 ) );

                line = new THREE.Line( geometry, material.clone() );
                _scene.add( line );
            }
        }                    
    };

    var _initializeField = function() {

        var geometry = new THREE.PlaneGeometry( _objects_size, _objects_size );
        var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( OTHELLO_FIELD_TEXTURE ) } );
 
        var tmp_material = null;
        var mesh         = null;
        var position_x, position_y, position_z;
        for ( var x = 0; x < OTHELLO_FIELD_SIZE; x++ ) {
            for ( var y = 0; y < OTHELLO_FIELD_SIZE; y++ ) {

                tmp_material = material.clone();
                position_x = x * _objects_size - _offset;
                position_y = y * _objects_size - _offset;
                position_z = - _objects_size / 2.0;
                mesh = new THREE.Mesh( geometry.clone(), tmp_material );
                mesh.position.set( position_x, position_y, position_z );
                _scene.add( mesh );
            }
        }
    };
};


/*
 * Othello blocks
 * オセロの石配置
 */
var OthelloBlocks = function( scene, objects_size )
{
    var _scene        = scene;
    var _objects_size = objects_size;

    // 動作ステータス
    var _STATUS_FREE    = 0;
    var _STATUS_WORKING = 1;

    // 詳細ステータス (石の更新)
    var _STATUS_DETAIL_FREE         = 0;
    var _STATUS_DETAIL_MOVEING      = 1;
    var _STATUS_DETAIL_CHANGING_B2W = 2;
    var _STATUS_DETAIL_CHANGING_W2B = 3;

    // Parameters
    var _othello_stone_first_height = 40;
    var _color_black = OTHELLO_STONE_COLOR[0];
    var _color_white = OTHELLO_STONE_COLOR[OTHELLO_STONE_COLOR.length-1];

    var _offset = _objects_size * ( OTHELLO_FIELD_SIZE / 2 );

    // ThreeJS
    //var _geometry = new THREE.SphereGeometry( OBJECTS_SIZE / 2, 16, 32 );
    var _geometry = new THREE.Geometry();
    var _material = new THREE.MeshPhongMaterial( { shininess: 30, transparent: true, shading:THREE.SmoothShading  } );
    var cube = new THREE.CubeGeometry(DOT_SIZE * 0.8, DOT_SIZE * 0.8, DOT_SIZE * 0.8);
    for (j = 0; j < dataSet.length; j++) {
        for (i = 0; i < dataSet[j].length; i++) {
            x = (i % 16) * DOT_SIZE + X_START_POS;
            y = j * DOT_SIZE + Y_START_POS;
            z = (16 - Math.floor(i / 16)) * DOT_SIZE + Z_START_POS;

            if (dataSet[j][i] != "無") {
                var material = new THREE.MeshLambertMaterial({
                    color: "#fff"
                });
                var mesh = new THREE.Mesh(cube, material);
                mesh.position.x = x - 0;
                mesh.position.y = y;
                mesh.position.z = z;
                //scene.add(meshArray[i]);
                THREE.GeometryUtils.merge(_geometry, mesh); 
            }
        }
    }
    var _material = new THREE.MeshPhongMaterial( { shininess: 30, transparent: true, shading:THREE.SmoothShading  } );

    // Status
    var _status        = null;
    var _status_detail = null;

    // 移動・変更対象
    var _target_object = null;

    // Othello blocks ( Material & Mesh )
    var _blocks = null;

    // Order queue
    var _queue = null;

    /*
     * Initialize
     */
    this.initialize = function() {
        _queue  = [];

        _status        = _STATUS_FREE;
        _status_detail = _STATUS_DETAIL_FREE;

        _target_object = { material: null, mesh: null, color_index: 0 };

        // Initialize othello blocks
        _blocks = [];
        for ( var x = 0; x < OTHELLO_FIELD_SIZE; x++ ) {
            _blocks[x] = [];
            for ( var y = 0; y < OTHELLO_FIELD_SIZE; y++ ) {
                _blocks[x][y] = { material: null, mesh: null, color_index: 0 };
            }
        }
    };

    /*
     * Set order queue
     * 管理側からの命令オブジェクトを Queue に積む
     */
    this.setOrderQueue = function( order_obj ) {
        _queue.push( order_obj );
    };

    /*
     * Update
     */
    this.update = function() {

        if ( _status === _STATUS_FREE ) {
            var flag = _checkOrderQueue();
            if ( flag ) {
                _status = _STATUS_WORKING;
            }
        }
        else if ( _status === _STATUS_WORKING ) {
            var flag = _update();
            if ( ! flag ) {
                _status = _STATUS_FREE;
            }
        }
    
    };

    /*
     * Check order queue
     * 命令オブジェクト確認。命令があれば抜き出して各処理に回す。
     * 動作を開始したら true。そうでなければ false。
     */
    var _checkOrderQueue = function() {

        var result = false;

        if ( _queue.length > 0 ) {

            var order_obj = _queue.shift();
            if ( order_obj.action === OTHELLO_CREATE ) {
                _createOthelloStone( order_obj.x, order_obj.y, order_obj.color );
                result = true;
            }
            else if ( order_obj.action === OTHELLO_CHANGE ) {
                _changeOthelloStone( order_obj.x, order_obj.y, order_obj.color );
                result = true;
            }
            else {
                console.log( "Error: Othello action is incorrect. (" + order_obj.action + ")" );
            }
        }

        return result;
    };


    /*
     * Create othello object
     * 指定位置にオセロの石を作成。更新処理は _update。
     */
    var _createOthelloStone = function( x, y, color ) {

        var geometry = _geometry.clone();
        var material = _material.clone();

        var color_index;
        if ( color === OTHELLO_BLACK ) {
            material.ambient.set( _color_black );
            material.color.set( _color_black );
            material.specular.set( _color_black );
            color_index = 0;
        } else {
            material.ambient.set( _color_white );
            material.color.set( _color_white );
            material.specular.set( _color_white );
            color_index = OTHELLO_STONE_COLOR.length - 1;
        }

        var position_x, potision_y, position_z;
        position_x = x * _objects_size - _offset;
        position_y = y * _objects_size - _offset;
        position_z = _othello_stone_first_height;

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( position_x, position_y, position_z );
        _scene.add( mesh );

        _blocks[x][y].material    = material;
        _blocks[x][y].mesh        = mesh;
        _blocks[x][y].color_index = color_index;

        _status_detail             = _STATUS_DETAIL_MOVEING;
        _target_object.material    = material;
        _target_object.mesh        = mesh;
        _target_object.color_index = color_index;
    };


    /*
     * Change othello stone
     * オセロの石の色を指定した色に変える。更新処理は _update。
     */
    var _changeOthelloStone = function( x, y, color ) {

        if ( color === OTHELLO_BLACK ) {
            _status_detail = _STATUS_DETAIL_CHANGING_W2B;
        } else {
            _status_detail = _STATUS_DETAIL_CHANGING_B2W;
        }
        _target_object.material    = _blocks[x][y].material;
        _target_object.mesh        = _blocks[x][y].mesh;
        _target_object.color_index = _blocks[x][y].color_index;
    };

    /*
     * Update
     * ( private 処理 )
     * 引き続き更新が必要な場合は true を返す。
     */
    var _update = function() {

        var result = true;

        if ( _status_detail === _STATUS_DETAIL_MOVEING ) {
            _target_object.mesh.position.z -= 1;
            if ( _target_object.mesh.position.z <= 0 ) {
                _target_object.mesh.position.z = 0;
                _status_detail = _STATUS_DETAIL_FREE;
                result = false;
            }
        }
        else if ( _status_detail === _STATUS_DETAIL_CHANGING_W2B ) {
            _target_object.color_index -= 1;
            if ( _target_object.color_index <= 0 ) {
                _target_object.color_index = 0;
                _status_detail = _STATUS_DETAIL_FREE;
                result = false;
            }
            _target_object.material.ambient.set( OTHELLO_STONE_COLOR[_target_object.color_index] );
            _target_object.material.color.set( OTHELLO_STONE_COLOR[_target_object.color_index] );
            _target_object.material.specular.set( OTHELLO_STONE_COLOR[_target_object.color_index] );
        }
        else if ( _status_detail === _STATUS_DETAIL_CHANGING_B2W ) {
            _target_object.color_index += 1;
            if ( _target_object.color_index >= OTHELLO_STONE_COLOR.length - 1 ) {
                _target_object.color_index = OTHELLO_STONE_COLOR.length - 1;
                _status_detail = _STATUS_DETAIL_FREE;
                result = false;
            }
            _target_object.material.ambient.set( OTHELLO_STONE_COLOR[_target_object.color_index] );
            _target_object.material.color.set( OTHELLO_STONE_COLOR[_target_object.color_index] );
            _target_object.material.specular.set( OTHELLO_STONE_COLOR[_target_object.color_index] );
        }

        return result;
    };
};


/*
 * Othello manager
 * 試合管理
 */
var Othello = function( renderer )
{
    var _renderer = renderer;

    // Othello field
    var _othello_field = null;

    // Parameters

    /*
     * Initialize
     */
    this.initialize = function() {

        // Initialize othello field
        _othello_field = [];
        for ( var x = 0; x < OTHELLO_FIELD_SIZE; x++ ) {
            _othello_field[x] = [];
            for ( var y = 0; y < OTHELLO_FIELD_SIZE; y++ ) {
                _othello_field[x][y] = new OthelloCell( _renderer, x, y );
                _othello_field[x][y].initialize( OTHELLO_EMPTY );
            }
        }

        // 初期表示
        _othello_field[3][3].change( OTHELLO_WHITE );
        _othello_field[3][4].change( OTHELLO_BLACK );
        _othello_field[4][3].change( OTHELLO_BLACK );
        _othello_field[4][4].change( OTHELLO_WHITE );
    };

    /*
     * Input
     * 指定した色、位置を入力。
     * 設定できたら true を返す。
     */
    this.input = function( color, x, y ) {

        // 置けるか判定
        var flag = _verifyPutStone( color, x, y );
        if ( ! flag ) {
            return false;
        }

        // 石を置く
        _othello_field[x][y].change( color );

        // 石をひっくり返す
        _reverseStone( color, x, y );

        return true;
    };

    /*
     * Verify put stone
     * 石が置けるかどうか確認。置ける場合は true を返す。
     */
    var _verifyPutStone = function( color, x, y ) {

        // 既に置いてある所には置けない
        if ( _othello_field[x][y].getStatus() !== OTHELLO_EMPTY ) {
            return false;
        }

        // 8方向それぞれの返せる座標値を取得
        var positions = null;
        for ( var dir_x = -1; dir_x <= 1; dir_x++ ) {
            for ( var dir_y = -1; dir_y <= 1; dir_y++ ) {
                positions = _getReverseStonesPosition( color, x, y, dir_x, dir_y );
                if ( positions.length > 0 ) {
                    return true;
                }
            }
        }

        return false;
    };


    /*
     * Reverse stone
     */
    var _reverseStone = function( color, x, y ) {

        // 8方向それぞれの返せる座標値を取得
        var positions = null;
        for ( var dir_x = -1; dir_x <= 1; dir_x++ ) {
            for ( var dir_y = -1; dir_y <= 1; dir_y++ ) {
                positions = _getReverseStonesPosition( color, x, y, dir_x, dir_y );
                _.each( positions, function( position ) {
                    _othello_field[position.x][position.y].change( color );
                } );
            }
        }
    };


    /*
     * Get reverse stone position
     * 方向指定で返せる石の座標を取得する。
     */
    var _getReverseStonesPosition = function( color, x, y, dir_x, dir_y ) {

        if ( dir_x === 0 && dir_y === 0 ) {
            return [];
        }

        var first_pos_x = x;
        var first_pos_y = y;

        var reverse_flag = false;

        var count       = 0;
        var pos_x       = first_pos_x;
        var pos_y       = first_pos_y;
        var stone_color = null;
        while ( true ) {

            count += 1;
            pos_x += dir_x;
            pos_y += dir_y;

            // 範囲外になったら終了。
            if ( ( pos_x < 0 || pos_x >= OTHELLO_FIELD_SIZE ) ||
                 ( pos_y < 0 || pos_y >= OTHELLO_FIELD_SIZE ) ) {
                break;
            }

            // 石が無ければ終了
            stone_color = _othello_field[pos_x][pos_y].getStatus();
            if ( stone_color === OTHELLO_EMPTY ) {
                break;
            }

            // 隣が同じ色だったら終了
            if ( count === 1 && color === stone_color ) {
                break;
            }

            // 2つ以上進んでいて、同じ色だったら反転観光
            if ( count >= 2 && color === stone_color ) {
                reverse_flag = true;
                break;
            }
        }

        // 返せる石の座標を積んで返却。
        var reverse_stones_position = [];
        if ( reverse_flag ) {

            pos_x = first_pos_x;
            pos_y = first_pos_y;
            for ( var i = 0; i < count; i++ ) {

                pos_x += dir_x;
                pos_y += dir_y;
                reverse_stones_position.push( { x: pos_x, y: pos_y } );
            }
        }

        return reverse_stones_position;
    };
};


/*
 * Othello cell
 * オセロの各マス目
 */
var OthelloCell = function( renderer, x, y )
{
    var _renderer = renderer;
    var _x        = x;
    var _y        = y;

    // Status
    var _status = null;

    /*
     * Initialize
     */
    this.initialize = function( status ) {
        _status = status;
    };

    /*
     * Get color
     */
    this.getStatus = function() {
        return _status;
    };

    /*
     * Status change
     */
    this.change = function( status ) {

        // pre : EMPTY
        if ( _status === OTHELLO_EMPTY ) {

            // EMPTY => BLACK
            if ( status === OTHELLO_BLACK ) {
                _setOrder( OTHELLO_BLACK, OTHELLO_CREATE );
            }
            // EMPTY => WHITE
            else if ( status === OTHELLO_WHITE ) {
                _setOrder( OTHELLO_WHITE, OTHELLO_CREATE );
            }
        }

        // pre : BLACK
        else if ( _status === OTHELLO_BLACK ) {

            // BLACK => WHITE
            if ( status === OTHELLO_WHITE ) {
                _setOrder( OTHELLO_WHITE, OTHELLO_CHANGE );
            }
        }

        // pre : WHITE
        else if ( _status === OTHELLO_WHITE ) {

            // WHITE => BLACK
            if ( status === OTHELLO_BLACK ) {
                _setOrder( OTHELLO_BLACK, OTHELLO_CHANGE );
            }
        }

        // pre : other
        else {
            console.log( "Error : pre othello status is incorrect. (" + _x + ", " + _y + ", " + _status + ")" );
        }

        _status = status;
    };

    /*
     * Set order
     * 描画オブジェクトに描画命令を渡す。
     */
    var _setOrder = function( othello_color, othello_action ) {
        _renderer.setOrder( _x, _y, othello_color, othello_action );
    };
};



/*
 * WebGL check
 */
function verifyWebGL() {
	try {
		return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
	} catch( e ) {
		return false;
    }
}


/*
 * Main
 */
$(window).ready( function() {

    // Browser check
    if ( ! verifyWebGL() ) {
        $('body').append( document.createTextNode( 'WebGL not supported.' ) );
        return;
    }

    // Othello renderer
    var canvas_elm = document.createElement('div');
    canvas_elm.setAttribute( 'id', 'canvas_frame' );
    $('body').append( canvas_elm );

    var $canvas_frame = $('#canvas_frame');

    var renderer = new ThreeRenderer();
    renderer.initialize();
    $canvas_frame.append( renderer.getDomElement() );
    
    // Othello Manager
    var manager = new Othello( renderer );
    manager.initialize();

    // Resize
    function resize( width, height ) {
        $canvas_frame.innerWidth( width );
        $canvas_frame.innerHeight( height );
        renderer.resize( width, height );
    }
    resize( $(window).innerWidth(), $(window).innerHeight() );

    // Click
    var camera_update_flag = true;
    $('#canvas_frame').click( function() {
        if ( camera_update_flag ) {
            camera_update_flag = false;
        } else {
            camera_update_flag = true;
        }
        renderer.setCameraMoveFlag( camera_update_flag );
    } );

    // Resize event
    var _timer = false;
    $(window).resize( function() {
        if ( _timer !== false ) {
            clearTimeout( _timer );
        }
        _timer = setTimeout( function() { resize( $(window).innerWidth(), $(window).innerHeight() ); }, 200 );
    } );


    // Test: Random play
    var put_max   = OTHELLO_FIELD_SIZE * OTHELLO_FIELD_SIZE - 4;
    var try_max   = 1000; // 一定回数失敗したらパス。
    var put_count = 0;

    function randomPlay( color ) {

        put_count++;
        if ( put_count > put_max ) {
            return;
        }

        var try_count = 0;
        var put_flag = false;
        while ( ! put_flag ) {
            var x = Math.floor( Math.random() * OTHELLO_FIELD_SIZE );
            var y = Math.floor( Math.random() * OTHELLO_FIELD_SIZE );
            put_flag = manager.input( color, x, y );

            try_count++;
            if ( try_count >= try_max ) {
                break;
            }
        }

        if ( color === OTHELLO_BLACK ) {
            color = OTHELLO_WHITE;
        } else {
            color = OTHELLO_BLACK;
        }
        setTimeout( function() { randomPlay(color); }, 1500 );
    }
    setTimeout( function() { randomPlay( OTHELLO_BLACK ); }, 1500 );

} );
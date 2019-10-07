// forked from cx20's "某未確認物体を変形してみるテスト" http://jsdo.it/cx20/uoO9
// forked from cx20's "某アニメで見かけた未確認物体を描いてみるテスト" http://jsdo.it/cx20/yWKn
// forked from Brian Inacio's "Interactive 3D Cube" http://www.brianinacio.ca/work/CMCC/CMCC_Cube/cube.html

var container, stats;
var camera, controls, scene, renderer;
var mesh, plane;

var ID = 1;
var list = [];

var targetRotation = 0;
//This needs to be declared separately, currently not sure why but cube does not appear otherwise
var targetRotationOnMouseDown = 0;
var rotationSpeed = 0.05;
		
var mouseX, mouseY, mouseXOnMouseDown, mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var ROT_SPEED = 200;
var group_rot = 0;
var group;
var theta = 0;
var L_SIZE = 3;
var M_SIZE = 2;
var S_SIZE = 1;
var SIZE = 20;

/*
var cubes = [
    // 大サイズ
    { x: 3+L_SIZE/2  , y: 3+L_SIZE/2  , z: 3+L_SIZE/2  , size:L_SIZE },
    { x:-3-L_SIZE/2  , y: 3+L_SIZE/2  , z: 3+L_SIZE/2  , size:L_SIZE },
    { x:-3-L_SIZE/2  , y:-3-L_SIZE/2  , z: 3+L_SIZE/2  , size:L_SIZE },
    { x: 3+L_SIZE/2  , y:-3-L_SIZE/2  , z: 3+L_SIZE/2  , size:L_SIZE },
    { x: 3+L_SIZE/2  , y: 3+L_SIZE/2  , z:-3-L_SIZE/2  , size:L_SIZE },
    { x:-3-L_SIZE/2  , y: 3+L_SIZE/2  , z:-3-L_SIZE/2  , size:L_SIZE },
    { x:-3-L_SIZE/2  , y:-3-L_SIZE/2  , z:-3-L_SIZE/2  , size:L_SIZE },
    { x: 3+L_SIZE/2  , y:-3-L_SIZE/2  , z:-3-L_SIZE/2  , size:L_SIZE },
    // 中サイズ
    { x: 1+M_SIZE/2  , y: 4+M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y: 1+M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y:-4-M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y:-1-M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y: 1+M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y: 4+M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y:-1-M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x: 1+M_SIZE/2  , y:-4-M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    
    { x: 1+M_SIZE/2  , y: 4+M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y: 1+M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y:-4-M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y:-1-M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y: 1+M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y: 4+M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y:-1-M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x: 1+M_SIZE/2  , y:-4-M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },

    { x: 4+M_SIZE/2  , y: 4+M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y: 4+M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y:-4-M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y:-4-M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y: 4+M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y: 4+M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y:-4-M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y:-4-M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    
    // 内側の中サイズの立方体
    { x: 1+M_SIZE/2  , y: 1+M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y: 1+M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y:-1-M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x: 1+M_SIZE/2  , y:-1-M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x: 1+M_SIZE/2  , y: 1+M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y: 1+M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y:-1-M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    { x: 1+M_SIZE/2  , y:-1-M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    // 中央の中サイズの立方体
    { x: 0           , y: 0           , z: 0           , size:M_SIZE },

    // 小サイズ
    { x: 0+S_SIZE/2  , y: 5+S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y: 0+S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x:-0-S_SIZE/2  , y:-5-S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y:-0-S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y: 0+S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x:-0-S_SIZE/2  , y: 5+S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y:-0-S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x: 0+S_SIZE/2  , y:-5-S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },

    { x: 0+S_SIZE/2  , y: 5+S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y: 0+S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x:-0-S_SIZE/2  , y:-5-S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y:-0-S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y: 0+S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x:-0-S_SIZE/2  , y: 5+S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y:-0-S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x: 0+S_SIZE/2  , y:-5-S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },

    { x: 5+S_SIZE/2  , y: 5+S_SIZE/2  , z: 0+S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y: 5+S_SIZE/2  , z: 0+S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y:-5-S_SIZE/2  , z: 0+S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y:-5-S_SIZE/2  , z: 0+S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y: 5+S_SIZE/2  , z:-0-S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y: 5+S_SIZE/2  , z:-0-S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y:-5-S_SIZE/2  , z:-0-S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y:-5-S_SIZE/2  , z:-0-S_SIZE/2  , size:S_SIZE }
];
*/

var DOT_SIZE = 20;
var X_START_POS = -8 * DOT_SIZE;
var Y_START_POS = -8 * DOT_SIZE;
var Z_START_POS = -4.5 * DOT_SIZE;

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

function getRandomColor() {
    var r = Math.floor(Math.random() * 128);
    var g = Math.floor(Math.random() * 128);
    var b = Math.floor(Math.random() * 128);
    return "rgb(" + r + "," + g + "," + b + ")";
}

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    //The smaller the first number is, the closer the cube appears
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    //The height of the camera in comparison to the scene
    camera.position.x = -100;
    camera.position.y = 250;
    //The zoom level of the camera
    camera.position.z = 500;

    //The mouse controls that allow for dragging of cube closer or further away visually
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.addEventListener('change', render, false);

    //Create the scene
    scene = new THREE.Scene();
    group = new THREE.Object3D();
    scene.add(group);

/*
    for (var i = 0; i < cubes.length; i++) {
        cube = cubes[i];

        //Cube
        var geometry = new THREE.CubeGeometry(cube.size * SIZE, cube.size * SIZE, cube.size * SIZE);

        //This is the 'shadow'/plane colour
        var material = new THREE.MeshBasicMaterial({
            color: 0xe0e0e0,
            vertexColors: THREE.FaceColors
        });


        for (var j = 0; j < geometry.faces.length; j++) {
            geometry.faces[0].color.setRGB(Math.random(), Math.random(), Math.random());
            geometry.faces[1].color.setRGB(Math.random(), Math.random(), Math.random());
            geometry.faces[2].color.setRGB(Math.random(), Math.random(), Math.random());
            geometry.faces[4].color.setRGB(Math.random(), Math.random(), Math.random());
            geometry.faces[3].color.setRGB(Math.random(), Math.random(), Math.random());
            geometry.faces[5].color.setRGB(Math.random(), Math.random(), Math.random());
        }

        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = cube.x * SIZE * 1.02;
        mesh.position.y = cube.y * SIZE * 1.02;
        mesh.position.z = cube.z * SIZE * 1.02;
        group.add(mesh);
        list.push(mesh);
    }
*/
    var i, j;
    var x, y, z;
    var meshArray = [];
    var color;
    var geometry = new THREE.CubeGeometry(DOT_SIZE * 0.8, DOT_SIZE * 0.8, DOT_SIZE * 0.8);
    for (j = 0; j < dataSet.length; j++) {
        for (i = 0; i < dataSet[j].length; i++) {
            x = (i % 16) * DOT_SIZE + X_START_POS;
            y = (16 - Math.floor(i / 16)) * DOT_SIZE + Y_START_POS;
            z = j * DOT_SIZE + Z_START_POS;
            color = getRgbColor(dataSet[j][i]);

            if (dataSet[j][i] != "無") {
                var material = new THREE.MeshLambertMaterial({
                    color: color
                });
                meshArray[i] = new THREE.Mesh(geometry, material);
                meshArray[i].position.x = x - 0;
                meshArray[i].position.y = y;
                meshArray[i].position.z = z;
                //scene.add(meshArray[i]);
                group.add(meshArray[i]);
                list.push(meshArray[i]);
            }
        }
    }

    //ライティング
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-1, -1, -1).normalize();
    scene.add(light2);
    
    // create and start the renderer; choose antialias setting.
    if (isWebgl())
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    else
        renderer = new THREE.CanvasRenderer();

    renderer.setSize(window.innerWidth - 5, window.innerHeight - 5);
    //renderer.setSize(440, 440);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    window.addEventListener('resize', onWindowResize, false);

    for (i = 0; i < list.length; i++) {
        new TWEEN.Tween(list[i].scale).to({
            x: 1,
            y: 1,
            z: 1
        }, 1000)
            .easing(TWEEN.Easing.Back.Out).start();
    }

    setInterval(changeID, 5000);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.handleResize();
    render();
}

function onDocumentMouseDown(event) {
    event.preventDefault();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mouseout', onDocumentMouseOut, false);

    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onDocumentMouseUp(event) {
    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentMouseOut(event) {
    //To get rid of redundant code, call function that does same thing above
    onDocumentMouseUp(event);
}

function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
        event.preventDefault();

        mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }
}

function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        //The rotation of the cube on its' x-axis
        targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * rotationSpeed;
    }
}


/**************THIS BLOCK IS NECESSARY -> DRAWS DEBUG AXES********************/
var debugaxis = function (axisLength) {
    //Shorten the vertex function
    function v(x, y, z) {
        return new THREE.Vector3(x, y, z);
    }

    //Create axis (point1, point2, colour)

    function createAxis(p1, p2, color) {
        var line, lineGeometry = new THREE.Geometry(),
            lineMat = new THREE.LineBasicMaterial({
                color: color,
                lineWidth: 1
            });
        lineGeometry.vertices.push(p1, p2);
        line = new THREE.Line(lineGeometry, lineMat);
        scene.add(line);
    }

    createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
    createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
    createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
};

//To use enter the axis length
//debugaxis(400);
/**************************************************************************************/

function isWebgl() {
    try {
        return !!window.WebGLRenderingContext && !! document.createElement('canvas').getContext('experimental-webgl');
    } catch (e) {
        return false;
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    TWEEN.update();
    group_rot += 0.0001 * ROT_SPEED;
    group.rotation.x = group_rot;
    group.rotation.y = group_rot;
    group.rotation.z = group_rot;
    renderer.render(scene, camera);
}

function changeID() {

    switch (ID) {
    case 1:
        changeFormation1();
        break;
    case 2:
        changeFormation2();
        break;
    case 3:
        changeFormation3();
        break;
    default:
        changeFormation1();
        break;
    }

    ID++;
    if (ID > 3) {
        ID = 1;
    }
}

//Random

function changeFormation1() {
    for (var i = 0; i < list.length; i++) {
        var rot = 360 / list.length * i;
        var vx = Math.random() * 600 - 300;
        var vy = Math.random() * 600 - 300;
        var vz = Math.random() * 600 - 300;

        new TWEEN.Tween(list[i].position).to({
            x: vx,
            y: vy,
            z: vz
        }, 1000)
            .easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(list[i].rotation).to({
            x: 0,
            y: rot,
            z: 0
        }, 1000)
            .easing(TWEEN.Easing.Cubic.InOut).start();
    }
}

//Cube

function changeFormation2() {
    var i, j, k;
    var x, y, z;
    k = 0;
    for (j = 0; j < dataSet.length; j++) {
        for (i = 0; i < dataSet[j].length; i++) {
            x = (i % 16) * DOT_SIZE + X_START_POS;
            y = (16 - Math.floor(i / 16)) * DOT_SIZE + Y_START_POS;
            z = j * DOT_SIZE + Z_START_POS;
            if (dataSet[j][i] != "無") {
                new TWEEN.Tween(list[k].position).to({
                    x: x,
                    y: y,
                    z: z
                }, 1000)
                    .easing(TWEEN.Easing.Exponential.InOut).start();
        
                new TWEEN.Tween(list[k].rotation).to({
                    x: 0,
                    y: 0,
                    z: 0
                }, 1000)
                    .easing(TWEEN.Easing.Cubic.InOut).start();
                k++;
            }
        }
    }
}

//Spiral

function changeFormation3() {
    for (var i = 0; i < list.length; i++) {
        var rot = 25 * i;
        var vx = 150 * Math.sin(rot * Math.PI / 180);
        var vy = 1 * i - 400;
        var vz = 150 * Math.cos(rot * Math.PI / 180);

        new TWEEN.Tween(list[i].position).to({
            x: vx,
            y: vy,
            z: vz
        }, 1000)
            .easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(list[i].rotation).to({
            x: 0,
            y: rot,
            z: 0
        }, 1000)
            .easing(TWEEN.Easing.Cubic.InOut).start();
    }
}

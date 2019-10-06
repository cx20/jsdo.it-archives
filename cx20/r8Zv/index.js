// forked from cx20's "Three.js でドット絵を表示するテスト" http://jsdo.it/cx20/3U7N
var DOT_SIZE = 3;
var X_START_POS = 0;
var Y_START_POS = -20;

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

var width  = 440;
var height = 440;
var fov    = 80;
var aspect = width / height;
var near   = 1;
var far    = 1000;
var mouseX = 0;
var mouseY = 0;
var windowHalfX = width / 2;
var windowHalfY = height / 2;
var camera;
var scene;
var rendere;
var theta = 0;

init();
animate();

function init() {
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    
    camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.z = 50;
    
    scene = new THREE.Scene();
    
    var i, x, y;
    var meshArray = [];
    var geometry = new THREE.CubeGeometry(DOT_SIZE*0.8, DOT_SIZE*0.8, DOT_SIZE*0.8);
	for ( i = 0; i < dataSet.length; i++ ) {
        x = ( i % 16 ) * DOT_SIZE + X_START_POS;
        y = ( 16 - Math.floor( i / 16 ) ) * DOT_SIZE + Y_START_POS;
        color = getRgbColor(dataSet[i]);
        
        if ( dataSet[i] != "無" ) {
            var material = new THREE.MeshLambertMaterial( { color: color } );
            meshArray[i] = new THREE.Mesh( geometry, material);
            meshArray[i].position.x = x;
            meshArray[i].position.y = y;
            scene.add( meshArray[i] );
        }
    }
    
    //ライティング
    var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );

    var light2 = new THREE.DirectionalLight( 0xffffff );
    light2.position.set( -1, -1, -1 ).normalize();
    scene.add( light2 );

	// create and start the renderer; choose antialias setting.
	if ( isWebgl() )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 
    
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
    renderer.render( scene, camera );
}

function isWebgl() {
	try { 
		return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
    } catch( e ) {
		return false;
	}
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY; 
}

function animate() {
    requestAnimationFrame( animate );
    
    render();
}

function render(){
    camera.lookAt( scene.position );
    camera.position.x = 80 * Math.sin( theta * Math.PI / 180 ) * -1; // 逆回転
    //camera.position.y = 80 * Math.sin( theta * Math.PI / 180 );
    camera.position.z = 80 * Math.cos( theta * Math.PI / 180 );
    //console.log( camera.position.x + "," + camera.position.y + "," + camera.position.z );
    
    theta++;
    renderer.render( scene, camera );
}


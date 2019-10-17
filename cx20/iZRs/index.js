// forked from kazuki_nagasawa's "Three.js 練習 ～ プログラマブルシェーダーで色変更 ～" http://jsdo.it/kazuki_nagasawa/threejs-009

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

function getSingleColor( c, rgbType )
{
    var result = 0;
    var rgb = getRgbColor( c );
    rgb = rgb.replace("#", "");
    var r = parseInt( "0x" + rgb.substr( 0, 2 ), 16 );
    var g = parseInt( "0x" + rgb.substr( 2, 2 ), 16 );
    var b = parseInt( "0x" + rgb.substr( 4, 2 ), 16 );
    switch ( rgbType )
    {
    case 'r':
        result = r;
        break;
    case 'g':
        result = g;
        break;
    case 'b':
        result = b;
        break;
    }
    return result;
}
var Plotter = function( element, w, h ) {

	_plotter = this;

	this.canvas_element = element;
	this.width = w;
	this.height = h;

	this.renderer = null;
	this.scene = null;
	this.camera = null;
	this.light = null;

	// ShaderMaterial
	this.material = null;
	this.material_data = null;
	
	// Plane
	this.plane_size = 16;
	
	// Cube
	this.cube_size = 1.0;
	this.fraction = 0.7;

	// Camera position
	this.camera_r = 30;	// 15;
	this.camera_phi = 50;
	this.camera_theta = 30;
	this.camera_look_x = 0;
	this.camera_look_y = 0;
	this.camera_look_z = 0;
	
	this.update_camera_flag = true;
};

Plotter.prototype = {
		
	plotStart : function() {

		this.initThree();
		this.initScene();
		this.initCamera();
		this.initLight();
		this.initObject();

		this.plotLoop();
	},


	initThree : function() {

		if ( verifyWebGL() ) {
			this.renderer = new THREE.WebGLRenderer( { antialias : true } );
		} else {
			this.renderer = new THREE.CanvasRenderer();
		}

		this.renderer.sortObjects = false;
		this.renderer.setSize( this.width, this.height );
		this.canvas_element.append( this.renderer.domElement );
		this.renderer.setClearColorHex( 0x000000, 1.0 ); // Black
	},


	initScene : function() {
		this.scene = new THREE.Scene();
	},


	initCamera : function() {

		this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 0.1, 10000 );
		this.setCameraPosition();
	},


	setCameraPosition : function() {

		var rad_phi = this.camera_phi * Math.PI / 180.0;
		var rad_theta = this.camera_theta * Math.PI / 180.0;

		var pos = new THREE.Vector3( 0, 0, 0 );
		pos.x = this.camera_r * Math.sin( rad_phi ) * Math.cos( rad_theta );
		pos.y = this.camera_r * Math.sin( rad_phi ) * Math.sin( rad_theta );
		pos.z = this.camera_r * Math.cos( rad_phi );

		this.camera.position.set( pos.x, pos.y, pos.z );
		this.camera.up.set( 0, 0, 1 );
		this.camera.lookAt( { x : this.camera_look_x, y : this.camera_look_y, z : this.camera_look_z } );
	},


	initLight : function() {

		this.light = {};
		this.light[0] = new THREE.DirectionalLight( 0xFFFFFF, 1.0, 0 ); // 平行光源
		this.light[0].position.set( 0, 0, 1000 );
		this.scene.add( this.light[0] );

        this.light[1] = new THREE.AmbientLight( 0xCCCCCC ); // 環境光源
		this.scene.add( this.light[1] );
    },


	initObject : function() {

		// Plane
		var plane = new THREE.Mesh( 
			new THREE.PlaneGeometry( this.plane_size, this.plane_size, this.plane_size, this.plane_size ),
			new THREE.MeshBasicMaterial( { color: 0x00EE00, wireframe: true, transparent: true } )
		);
		plane.position.set( 0, 0, 0 );
		this.scene.add( plane );
		
		this.color = [];
		this.material = [];
		this.material_data = [];

		//var geometry = new THREE.CubeGeometry( this.cube_size, this.cube_size, this.cube_size );
		var cube_max = this.plane_size;
		var offset = cube_max / 2 - 0.5;
        var geometry;
		
		// Cubes
		for ( var y = 0; y < cube_max; y++) {
			for ( var x = cube_max - 1 ; x >= 0; x-- ) {
/*
				// 一定確率で Cube 作成
				if ( Math.random() > this.fraction ) {
					continue;
				}
*/
                if ( dataSet[y*16+(15-x)] != "無" ) {
                    geometry = new THREE.CubeGeometry( this.cube_size - 0.1, this.cube_size - 0.1, this.cube_size - 0.1 );
                } else { 
                    geometry = new THREE.CubeGeometry( 0, 0, 0 );
                }
                
				var color = new THREE.Color( 0x000000 );
				color.setRGB( Math.random(), Math.random(), Math.random() );
				var alpha = 0.8; // 1.0;
				var material = new THREE.ShaderMaterial( {
					vertexShader : $('#vshader').text(),
					fragmentShader : $('#fshader').text(),
					uniforms : {
						color : { type : 'c', value : color },
						alpha : { type : 'f', value : alpha }
					}
				} );
				
				var data = {};
				data.updated = new Date();
				data.refresh = Math.random() * 5000; // 0秒 ～ 5秒 で変化。

				var cube = new THREE.Mesh( geometry, material );
				cube.position.set( x - offset, y - offset, 0 );
				this.scene.add( cube );
				
				this.material.push( material );
				this.material_data.push( data );
			}
		}
	},

	
	updateMaterial : function() {

		for ( var i = 0, l = this.material.length; i < l; i++ ) {
			
			var material = this.material[i];
			var data = this.material_data[i];
			var now = new Date();
			if ( now - data.updated > data.refresh ) {
				
				data.updated = now;

				var color = material.uniforms.color.value;
				var red   = getSingleColor( dataSet[i], 'r' ) / 255;
				var green = getSingleColor( dataSet[i], 'g' ) / 255;
				var blue  = getSingleColor( dataSet[i], 'b' ) / 255;

				color.setRGB( red, green, blue );
			}
		}
	},
	
	updateCamera : function() {

		if ( this.update_camera_flag ) {
			this.camera_theta += 0.1;
			this.setCameraPosition();
		}
	},
	
	changeUpdateCameraFlag : function() {
		
		if ( this.update_camera_flag ) {
			this.update_camera_flag = false;
		} else {
			this.update_camera_flag = true;
		}
	},

	plotLoop : function() {

		_plotter.updateMaterial();
		_plotter.updateCamera();
		
		_plotter.renderer.clear();
		_plotter.renderer.render( _plotter.scene, _plotter.camera );
		window.requestAnimationFrame( function() { _plotter.plotLoop(); } );
	},

	onResize : function( width, height ) {
		
		_plotter.width = width;
		_plotter.height = height;

		_plotter.renderer.setSize( _plotter.width, _plotter.height );
		_plotter.camera.aspect = _plotter.width / _plotter.height;
		_plotter.camera.updateProjectionMatrix();
	},
	
	onClick : function() {
		_plotter.changeUpdateCameraFlag();
	}
};


// Get Canvas size
getCanvasSize = function() {

	var result = {};

	var wrapper_width = $('#wrapper').width();
	var window_height = $(window).height() - $('#navbar').height() * 2;

	var width = 0;
	var height = 0;
	if ( wrapper_width > window_height ) {
		result.width = wrapper_width;
		result.height = window_height;
	} else {
		result.width = wrapper_width;
		result.height = wrapper_width;
	}

	return result;
};


// Verify WebGL
verifyWebGL = function() {

	try {
		return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
	} catch( e ) {
		return false;
	}
};


$(document).ready( function() {

	var canvas_element = $('#canvas-frame');

	if ( ! verifyWebGL() ) {
		canvas_element.html( '<h2>WebGL 非対応です。</h2>' );
		return;
	}

	var size = getCanvasSize();
	canvas_element.width( size.width );
	canvas_element.height( size.height );
	
	var plotter = new Plotter( canvas_element, size.width, size.height );

	// Resize
	var resize_timer = false;
	$(window).resize( function() {
		if ( resize_timer !== false ) {
			clearTimeout( resize_timer );
		}
		resize_timer = setTimeout( function() {

			size = getCanvasSize();
			canvas_element.width( size.width );
			canvas_element.height( size.height );

			plotter.onResize( canvas_element.width(), canvas_element.height() );
		}, 200 );
	} );
	
	// Click
	canvas_element.click( function() {
		plotter.onClick();
	} );

	plotter.plotStart();
});

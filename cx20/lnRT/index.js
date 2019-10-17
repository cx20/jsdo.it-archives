// forked from kazuki_nagasawa's "うぇーぶ" http://jsdo.it/kazuki_nagasawa/threejs-wave

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
		"無":"#449944",
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

var Plotter = function( element, w, h ) {

	_plotter = this;

	this.canvas_element = element;
	this.width = w;
	this.height = h;

	this.renderer = null;
	this.scene = null;
	this.camera = null;
	this.light = null;

	this.field = null;
	this.boxes = null;

	// Camera position
	//this.camera_r = 80;
	this.camera_r = 60;
	this.camera_phi = 50;
	this.camera_theta = 0;
	this.camera_look_x = 0;
	this.camera_look_y = 0;
	this.camera_look_z = 0;
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
		this.renderer.setClearColorHex( 0xFFFFFF, 1.0 ); // White
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

/*
		this.light[1] = new THREE.AmbientLight( 0xCCCCCC ); // 環境光源
		this.scene.add( this.light[1] );
*/
	},


	initObject : function() {

		this.field = new Field( this.scene );
		this.field.init();

		this.boxes = new Boxes( this.scene );
		this.boxes.init();
	},


	updateCamera : function() {

		this.camera_theta += 0.1;
		this.setCameraPosition();
	},


	plotLoop : function() {

		_plotter.updateCamera();

		_plotter.field.update();
		_plotter.boxes.update();

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
	}
};


var Field = function( scene ) {

	_field = this;

	this.scene = scene;

	//this.field_range = 33;
	this.field_range = 16;
	this.field_size = 2;

	this.geometry = new THREE.PlaneGeometry( this.field_size, this.field_size, 8, 8 );
	this.material = [];
	this.material[0] = new THREE.MeshLambertMaterial( { 
		color : 0x696969,
		ambient : 0x696969,
		opacity : 1.0
	} );
	this.material[1] = new THREE.MeshLambertMaterial( {
		color : 0xFFFAF0,
		ambient : 0xFFFAF0,
		opacity : 1.0
	} );
};

Field.prototype = {

	init : function () {

		var offset = this.field_range / 2;

/*
		var plane = new THREE.Mesh( 
			new THREE.PlaneGeometry( this.field_range * 2, this.field_range * 2, 32, 32 ),
			new THREE.MeshBasicMaterial( { color: 0x00EE00, wireframe: true, transparent: true } )
		);
*/
		var plane = new THREE.Mesh( 
			new THREE.PlaneGeometry( this.field_range * 2, this.field_range * 2, 16, 16 ),
			new THREE.MeshBasicMaterial( { color: 0x00EE00, wireframe: true, transparent: true } )
		);
		plane.position.set( 0, 0, 0 );
		this.scene.add( plane );
	},

	update : function () {}
};


var Boxes = function( scene ) {

	_boxes = this;

	this.scene = scene;

	this.update_flag = false;

	this.box = [];
	//this.box_range = 31;
	this.box_range = 16;
	this.box_size = 2;

	this.box_data = [];

	this.geometry = new THREE.CubeGeometry( this.box_size, this.box_size, this.box_size );

	// Wave
	//this.wave_max = 20;
	this.wave_max = 3;
	this.created = new Date();
};

Boxes.prototype = {

	init : function() {

		var color = Math.floor( Math.random() * 0xFFFFFF );

		// Box data
/*
		for ( var y = 0; y < this.box_range; y++ ) {
			for ( var x = 0; x < this.box_range; x++ ) {
				var obj = {};
				obj.x = x;
				obj.y = y;
				obj.z = this.wave_max * Math.sin( Math.PI * ( x + y ) / this.box_range );
				obj.color = color;

				this.box_data.push( obj );
			}
		}
*/
		var i = 0;
		for ( i = 0; i < dataSet.length; i++ ) {
			x = Math.floor( i / 16 ) + 0.5;
			y = i % 16 + 0.5;
			color = getRgbColor(dataSet[i]);
			var obj = {};
			obj.x = x;
			obj.y = y;
			obj.z = this.wave_max * Math.sin( Math.PI * ( x + y ) / this.box_range );
			obj.color = color;
			this.box_data.push( obj );
		}

		// Box
		var offset = this.box_range / 2;
		for ( i = 0, l = this.box_data.length; i < l; i++ ) {

			var data = this.box_data[i];
			var box = new THREE.Mesh( this.geometry, new THREE.MeshLambertMaterial( {
				color : data.color,
				ambient : data.color,
				specular : 0xDDDDDD,
				shininess : 60,
				metal : true
			} ) );
 
			box.position.set( ( data.x - offset ) * this.box_size, ( data.y - offset ) * this.box_size, data.z );
			this.scene.add( box );

			this.box[i] = box;
		}
	},

	update : function() {

		if ( this.update_flag !== true ) {

			this.update_flag = true;

			var update_func = this._update();
			update_func.done( function() {
				_boxes.updateBoxes(); 
				_boxes.update_flag = false;
			} );
		}
	},


	_update : function() {

		var d = new $.Deferred();

		setTimeout( function() {

			// Data update
			var now = new Date();
			var diff = now - _boxes.created;
			for ( var y = 0; y < _boxes.box_range; y++ ) {
				for ( var x = 0; x < _boxes.box_range; x++ ){
					var data = _boxes.box_data[ x + y * _boxes.box_range ];
					data.z = _boxes.wave_max * Math.sin( Math.PI * ( x + y ) / _boxes.box_range + diff / 1000 );
				}
			}

			return d.resolve();
		}, 1 );

		return d.promise();
	},


	updateBoxes : function() {

		var offset = this.box_range / 2;
		for ( var i = 0, l = this.box_data.length; i < l; i++ ) {

			var data = this.box_data[i];
			var box = this.box[i];
			box.position.set( ( data.x - offset ) * this.box_size, ( data.y - offset ) * this.box_size, data.z );
		}
	}
};


// Get Array clone
Array.prototype.clone = function() {
	return Array.apply( null, this );
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

/*
    if ( ! verifyWebGL() ) {
		canvas_element.html( '<h2>WebGL 非対応です。</h2>' );
		return;
	}
*/
    
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

	plotter.plotStart();
});

// forked from cx20's "Three.js の海のサンプルに飛行石を追加してみるテスト" http://jsdo.it/cx20/uikZ
// forked from cx20's "Three.js + Water Shader を試してみるテスト" http://jsdo.it/cx20/5hXN
// forked from Jérémy BOUNY's "Ocean" https://github.com/jbouny/ocean/tree/master/demo

// window.js
var ID = 1;
var list = [];

var targetRotation = 0;
//This needs to be declared separately, currently not sure why but cube does not appear otherwise
var targetRotationOnMouseDown = 0;

var ROT_SPEED = 100;
var group_rot = 0;
var group;
var theta = 0;
var L_SIZE = 3;
var M_SIZE = 2;
var S_SIZE = 1;
var SIZE = 15;

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

var WINDOW = {
	ms_Width: 0,
	ms_Height: 0,
	ms_Callbacks: {
		70: "WINDOW.toggleFullScreen()"		// Toggle fullscreen
	},
	
	initialize: function initialize() {
		this.updateSize();
		
		// Create callbacks from keyboard
		$(document).keydown(function(inEvent) { WINDOW.callAction(inEvent.keyCode); }) ;
		$(window).resize(function(inEvent) {
			WINDOW.updateSize();
			WINDOW.resizeCallback(WINDOW.ms_Width, WINDOW.ms_Height);
		});
	},
	updateSize: function updateSize() {
		this.ms_Width = $(window).width();
		this.ms_Height = $(window).height() - 4;
	},
	callAction: function callAction(inId) {
		if(inId in this.ms_Callbacks) {
			eval(this.ms_Callbacks[inId]);
			return false ;
		}
	},
	toggleFullScreen: function toggleFullScreen() {
		if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
			if(document.documentElement.requestFullscreen)
				document.documentElement.requestFullscreen();
			else if(document.documentElement.mozRequestFullScreen)
				document.documentElement.mozRequestFullScreen();
			else if(document.documentElement.webkitRequestFullscreen)
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		} 
		else  {
			if(document.cancelFullScreen)
				document.cancelFullScreen();
			else if(document.mozCancelFullScreen)
				document.mozCancelFullScreen();
			else if (document.webkitCancelFullScreen)
				document.webkitCancelFullScreen();
		}
	},	
	resizeCallback: function resizeCallback(inWidth, inHeight) {}
};

// demo.js
var DEMO = {
	ms_Canvas: null,
	ms_Renderer: null,
	ms_Camera: null, 
	ms_Scene: null, 
	ms_Controls: null,
	ms_Water: null,
	ms_FilesDND: null,
	ms_Projector: null,
	ms_Clickable: [],

    enable: (function enable() {
        try {
            var aCanvas = document.createElement('canvas');
            return !! window.WebGLRenderingContext && (aCanvas.getContext('webgl') || aCanvas.getContext('experimental-webgl'));
        }
        catch(e) {
            return false;
        }
    })(),
	
	initialize: function initialize(inIdCanvas, inParameters) {
		this.ms_Canvas = $('#'+inIdCanvas);

		
		// Initialize Renderer, Camera, Projector and Scene
		this.ms_Renderer = this.enable? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		this.ms_Canvas.html(this.ms_Renderer.domElement);
		this.ms_Scene = new THREE.Scene();
		
//-------------------------------------------
		group = new THREE.Object3D();
		this.ms_Scene.add(group);
        var i;
		for (i = 0; i < cubes.length; i++) {
			cube = cubes[i];

			//Cube
			var geometry = new THREE.CubeGeometry(cube.size * SIZE, cube.size * SIZE, cube.size * SIZE);

			//This is the 'shadow'/plane colour
			var material = new THREE.MeshBasicMaterial({
				color: 0xe0e0e0,
				vertexColors: THREE.FaceColors
			});

			for (var j = 0; j < geometry.faces.length; j += 2) {
				var hexColor = Math.random() * 0xffffff;
				geometry.faces[j].color.setHex(hexColor);
				geometry.faces[j + 1].color.setHex(hexColor);
			}

			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = cube.x * SIZE * 1.02;
			mesh.position.y = cube.y * SIZE * 1.02 + 100;
			mesh.position.z = cube.z * SIZE * 1.02;
			group.add(mesh);
			list.push(mesh);
		}
//-------------------------------------------
		this.ms_Camera = new THREE.PerspectiveCamera(55.0, WINDOW.ms_Width / WINDOW.ms_Height, 0.5, 3000000);
		//this.ms_Camera.position.set(0, Math.max(inParameters.width * 1.5, inParameters.height) / 8, -inParameters.height);
        this.ms_Camera.position.set(0, 200, -500);
		this.ms_Camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.ms_Projector = new THREE.Projector();
		
		// Initialize Orbit control		
		this.ms_Controls = new THREE.OrbitControls(this.ms_Camera, this.ms_Renderer.domElement);
		this.ms_Controls.userPan = false;
		this.ms_Controls.userPanSpeed = 0.0;
		this.ms_Controls.maxDistance = 5000.0;
		this.ms_Controls.maxPolarAngle = Math.PI * 0.495;

        // Add light
		var directionalLight = new THREE.DirectionalLight(0xffff55, 1);
		directionalLight.position.set(-600, 300, 600);
		this.ms_Scene.add(directionalLight);
		
		// Load textures		
		//var waterNormals = new THREE.ImageUtils.loadTexture('./assets/img/waternormals.jpg');
		var waterNormals = new THREE.ImageUtils.loadTexture('../assets/f/F/2/S/fF2SS.jpg');
		waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 
		
		// Create the water effect
		this.ms_Water = new THREE.Water(this.ms_Renderer, this.ms_Camera, this.ms_Scene, {
			textureWidth: 512, 
			textureHeight: 512,
			waterNormals: waterNormals,
			alpha: 	1.0,
			sunDirection: directionalLight.position.normalize(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 50.0,
		});
		var aMeshMirror = new THREE.Mesh(
			new THREE.PlaneGeometry(inParameters.width * 500, inParameters.height * 500, 5, 5), 
			this.ms_Water.material
		);
		aMeshMirror.add(this.ms_Water);
		aMeshMirror.rotation.x = - Math.PI * 0.5;
		this.ms_Scene.add(aMeshMirror);
	
		this.loadSkyBox();

        for (i = 0; i < list.length; i++) {
            new TWEEN.Tween(list[i].scale).to({
                x: 1,
                y: 1,
                z: 1
            }, 1000)
            .easing(TWEEN.Easing.Back.Out).start();
        }
        
        console.log( "this.changeID" );
        setInterval(this.changeID, 5000);
    },
	
	loadSkyBox: function loadSkyBox() {
		var aCubeMap = THREE.ImageUtils.loadTextureCube([
            '../assets/j/r/q/8/jrq8Z.jpg',    // px.jpg
            '../assets/b/A/n/h/bAnhv.jpg',    // nx.jpg
            '../assets/k/F/t/6/kFt6K.jpg',    // py.jpg
            '../assets/l/6/9/p/l69pi.jpg',    // ny.jpg
            '../assets/k/2/t/g/k2tgI.jpg',    // pz.jpg
            '../assets/l/O/u/H/lOuHI.jpg'     // nz.jpg
		]);
		aCubeMap.format = THREE.RGBFormat;

		var aShader = THREE.ShaderLib['cube'];
		aShader.uniforms['tCube'].value = aCubeMap;

		var aSkyBoxMaterial = new THREE.ShaderMaterial({
		  fragmentShader: aShader.fragmentShader,
		  vertexShader: aShader.vertexShader,
		  uniforms: aShader.uniforms,
		  depthWrite: false,
		  side: THREE.BackSide
		});

		var aSkybox = new THREE.Mesh(
		  new THREE.CubeGeometry(1000000, 1000000, 1000000),
		  aSkyBoxMaterial
		);
		
		this.ms_Scene.add(aSkybox);
	},
	
	display: function display() {
		this.ms_Water.render();
		this.ms_Renderer.render(this.ms_Scene, this.ms_Camera);
	},
	
	update: function update() {
		TWEEN.update();
		this.ms_Water.material.uniforms.time.value += 1.0 / 60.0;
		this.ms_Controls.update();
		this.display();
	},
	
	resize: function resize(inWidth, inHeight) {
		this.ms_Camera.aspect =  inWidth / inHeight;
		this.ms_Camera.updateProjectionMatrix();
		this.ms_Renderer.setSize(inWidth, inHeight);
		this.ms_Canvas.html(this.ms_Renderer.domElement);
		this.display();
	},
    
    changeID: function changeID() {
    
        switch (ID) {
        case 1:
            this.DEMO.changeFormation1();
            break;
        case 2:
            this.DEMO.changeFormation2();
            break;
        case 3:
            this.DEMO.changeFormation3();
            break;
        default:
            this.DEMO.changeFormation1();
            break;
        }
    
        ID++;
        if (ID > 3) {
            ID = 1;
        }
    },
    
    // Random
    changeFormation1: function changeFormation1() {
        for (var i = 0; i < list.length; i++) {
            var rot = 360 / list.length * i;
            var vx = Math.random() * 350 - 200;
            var vy = Math.random() * 350 - 200 + 200;
            var vz = Math.random() * 350 - 200;
    
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
    },
    
    // Cube
    changeFormation2: function changeFormation2() {
        for (var i = 0; i < list.length; i++) {
            new TWEEN.Tween(list[i].position).to({
                    x: cubes[i].x * 15,
                    y: cubes[i].y * 15 + 100,
                    z: cubes[i].z * 15
                }, 1000)
                .easing(TWEEN.Easing.Exponential.InOut).start();
    
            new TWEEN.Tween(list[i].rotation).to({
                    x: 0,
                    y: 0,
                    z: 0
                }, 1000)
                .easing(TWEEN.Easing.Cubic.InOut).start();
        }
    },
    
    // Spiral
    changeFormation3: function changeFormation3() {
        for (var i = 0; i < list.length; i++) {
            var rot = 25 * i;
            var vx = 150 * Math.sin(rot * Math.PI / 180);
            var vy = 10 * i - 250 + 200;
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
    
};

// main.js
function mainLoop() {
	requestAnimationFrame(mainLoop);

    group_rot += 0.0001 * ROT_SPEED;
    group.rotation.x = 0;
    group.rotation.y = group_rot;
    group.rotation.z = 0;
	DEMO.update();
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    
    var vector = new THREE.Vector3( 
        ( event.clientX / window.innerWidth ) * 2 - 1, 
        - ( event.clientY / window.innerHeight ) * 2 + 1, 
        0.5 );
    
    DEMO.ms_Projector.unprojectVector( vector, DEMO.ms_Camera );
    
    var ray = new THREE.Raycaster( DEMO.ms_Camera.position, vector.sub( DEMO.ms_Camera.position ).normalize() );
    var intersects = ray.intersectObjects( DEMO.ms_Clickable );    

    if (intersects.length > 0) {  
        intersects[0].object.callback();
    }                
}

$(function() {
	WINDOW.initialize();

	document.addEventListener('click', onDocumentMouseDown, false);
	
	var parameters = {
		width: 2000,
		height: 2000,
		widthSegments: 250,
		heightSegments: 250,
		depth: 1500,
		param: 4,
		filterparam: 1
	};
	
	DEMO.initialize('canvas-3d', parameters);
	
	WINDOW.resizeCallback = function(inWidth, inHeight) { DEMO.resize(inWidth, inHeight); };
	DEMO.resize(WINDOW.ms_Width, WINDOW.ms_Height);
	
	mainLoop();
});

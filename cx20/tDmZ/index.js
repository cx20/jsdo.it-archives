// forked from MarkusSprunck's "THREE.SimpleDatGui Demo" http://webgl-examples.appspot.com/simple-webgl-gui/THREE.SimpleDatGuiDemo.html

var camera, cameraHUD, stats, scene, sceneHUD, renderer, mesh, gui, trackbarControl, container, hemiLight;

function myOptionsDefinition() {
    "use strict";
    return {
        RENDER_TEXT: "Hello World!",
        TRANPARENT: false,
        ROTATION_SPEED: 2.5,
        ROTATION_ANGLE: 0.0,
        FONT_SIZE: 150,
        ROTATION_X_AXIS: true,
        OPACITY: 75,
        FONT_NAME: "Gentilis",
        SHOW_STATS: true
    };
}
var myOptions = myOptionsDefinition();

var guiDefaultWidth = 300;
var guiBorderTop = 10;
var guiBorderRight = 10;
var guiBorderLeft = 10;
var guiHudModus = !(document.location.search === "?hud=false");

init();
animate();

function init() {
    "use strict";
    
    // Prepare scene 
    
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(0x444444);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    document.body.appendChild(renderer.domElement);
    
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    scene = new THREE.Scene();
    
    // Add lights
    
    var light1 = new THREE.PointLight(0xFFFFFF);
    light1.position.set(-300, 300, 2 * camera.position.z);
    light1.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(light1);
    
    var light2 = new THREE.PointLight(0xFFFFFF);
    light2.position.set(0, 0, -camera.position.z);
    light2.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(light2);
    
    // Add content 
    
    addOrUpdateRotatingText(scene, myOptions.RENDER_TEXT);
    
    // Add GUI
    
    var myFunctions = {
        RESET_EVENT: function() {
            trackbarControl.reset();
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 500;
            camera.rotation.x = 0;
            camera.rotation.y = 0;
            camera.rotation.z = 0;
            camera.lookAt(new THREE.Vector3(0, 0, 0));
        }
    };
    
    if (guiHudModus) {
        var width = window.innerWidth;
        var height = window.innerHeight;
        
        cameraHUD = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1, 10);
        cameraHUD.position.z = 10;
        cameraHUD.lookAt(new THREE.Vector3(0, 0, 0));
        
        sceneHUD = new THREE.Scene();
        
        gui = new THREE.SimpleDatGui({
            scene: sceneHUD,
            camera: cameraHUD,
            renderer: renderer,
            width: guiDefaultWidth,
            scale: 1.2
        });
    } else {
        gui = new THREE.SimpleDatGui({
            scene: scene,
            camera: camera,
            renderer: renderer,
            width: guiDefaultWidth,
            position: new THREE.Vector3(-295, 200, 80),
            scale: 1.2
        });
    }
    gui.add(myFunctions, 'RESET_EVENT').name('Reset Position');
    gui.add(myOptions, 'TRANPARENT').name('Tranparent').onChange(function(value) {
        myOptions.OPACITY = (value) ? 80 : 100;
    });
    gui.add(myOptions, 'OPACITY', 10, 100).step(10).name('Opacity').onChange(function(value) {
        myOptions.TRANPARENT = !(value == 100);
    });
    gui.add(myOptions, 'RENDER_TEXT').name('Render Text').onChange(function(value) {
        addOrUpdateRotatingText(scene, myOptions.RENDER_TEXT);
    });
    gui.add(myOptions, 'FONT_NAME', ['Helvetiker', 'Gentilis', 'Optimer']).name('Font Type').onChange(
        function(value) {
            addOrUpdateRotatingText(scene, myOptions.RENDER_TEXT);
        });
    
    var folder1 = gui.addFolder("Advanced Options");
    folder1.add(myOptions, 'FONT_SIZE', {
        Small: 80,
        Medium: 150,
        Large: 180,
        Huge: 300
    }).name('Font Size').onChange(function(value) {
        addOrUpdateRotatingText(scene, myOptions.RENDER_TEXT);
    });
    folder1.add(myOptions, 'ROTATION_SPEED', -5, 5).step(0.5).name('Rotation Speed');
    folder1.add(myOptions, 'ROTATION_ANGLE', 0, Math.PI * 2).step(0.1).name('Rotation Angle').onChange(
        function(value) {
            mesh.rotation.x = myOptions.ROTATION_ANGLE;
            addOrUpdateRotatingText(scene, myOptions.RENDER_TEXT);
        });
    ;
    folder1.add(myOptions, 'ROTATION_X_AXIS').name('Rotation Active');
    folder1.add(myOptions, 'SHOW_STATS').name('Show Stats');
    folder1.open();
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize, false);
    
    renderer.domElement.addEventListener('mousedown', function(event) {
        if (event.which == 3) {
            myFunctions.RESET_EVENT();
        }
    });
    
    trackbarControl = new THREE.TrackballControls(camera, renderer.domElement);
    trackbarControl.target.set(0, 0, 0);
    trackbarControl.rotateSpeed = 1.0;
    trackbarControl.zoomSpeed = 1.2;
    trackbarControl.panSpeed = 0.8;
    trackbarControl.staticMoving = false;
    trackbarControl.dynamicDampingFactor = 0.15;
    
    // Add performance display
    
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '' + guiBorderTop + 'px';
    stats.domElement.style.right = '' + guiBorderRight + 'px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild(stats.domElement);
    
    onWindowResize();
}

function onWindowResize() {
    "use strict";
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (guiHudModus) {
        cameraHUD.left = -window.innerWidth / 2;
        cameraHUD.right = window.innerWidth / 2;
        cameraHUD.top = window.innerHeight / 2;
        cameraHUD.bottom = -window.innerHeight / 2;
        cameraHUD.updateProjectionMatrix();
        
        gui.update({
            position: new THREE.Vector3(guiBorderLeft - window.innerWidth / 2, window.innerHeight / 2
                                        - guiBorderTop, 1)
        });
    }
}

function animate() {
    "use strict";
    
    requestAnimationFrame(animate);
    
    gui.setOpacity(myOptions.OPACITY);
    gui.update();
    
    if (myOptions.ROTATION_X_AXIS) {
        mesh.rotation.x = (mesh.rotation.x + 0.005 * myOptions.ROTATION_SPEED) % (Math.PI * 2);
        myOptions.ROTATION_ANGLE = mesh.rotation.x;
    }
    
    trackbarControl.update();
    stats.domElement.hidden = !myOptions.SHOW_STATS;
    if (myOptions.SHOW_STATS) {
        stats.update();
    }
    
    if (guiHudModus) {
        renderer.clear();
        renderer.render(scene, camera);
        renderer.render(sceneHUD, cameraHUD);
    } else {
        renderer.clear();
        renderer.render(scene, camera);
    }
}

function addOrUpdateRotatingText(scene, value) {
    "use strict";
    
    var oldRotationX = 0;
    
    if (typeof mesh !== "undefined") {
        oldRotationX = mesh.rotation.x;
        scene.remove(mesh);
    }
    
    if (typeof myOptions.FONT_NAME === "undefined") {
        console.log("myOptions.FONT_NAME === undefined");
    }
    
    var geometry = new THREE.TextGeometry(myOptions.RENDER_TEXT, {
        height: myOptions.FONT_SIZE / 10,
        size: myOptions.FONT_SIZE,
        font: myOptions.FONT_NAME.toLowerCase()
    });
    var material = new THREE.MeshPhongMaterial({
        color: 0x1ed36f
    });
    mesh = new THREE.Mesh(geometry, material);
    
    mesh.rotation.x = oldRotationX;
    
    geometry.computeBoundingBox();
    geometry.textWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    mesh.translateX(-geometry.textWidth / 2);
    
    scene.add(mesh);
}

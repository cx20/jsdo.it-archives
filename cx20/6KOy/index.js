// forked from three.js css3d examples - molecules http://threejs.org/examples/css3d_molecules.html

var camera, scene, renderer;
var controls;
var root;
var objects = [];
var tmpVec1 = new THREE.Vector3();
var tmpVec2 = new THREE.Vector3();
var tmpVec3 = new THREE.Vector3();
var tmpVec4 = new THREE.Vector3();
var visualizationType = 2;
var loader = new THREE.PDBLoader();
var colorSpriteMap = {};
var baseSprite = document.createElement('img');
var menu = document.getElementById("menu");
init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 1000;
    scene = new THREE.Scene();
    root = new THREE.Object3D();
    scene.add(root);

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;
    controls.addEventListener('change', render);

    baseSprite.onload = function () {
        //loadMolecule("models/molecules/c60.pdb");
        loadMolecule("../../assets/p/4/e/K/p4eKh.txt");
    };
    //baseSprite.src = 'textures/sprites/ball.png';
    baseSprite.src = '../../assets/x/T/J/1/xTJ1e.png';
    
    window.addEventListener('resize', onWindowResize, false);
}

function showAtoms() {
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        if (object instanceof THREE.CSS3DSprite) {
            object.element.style.display = "";
            object.visible = true;
        } else {
            object.element.style.display = "none";
            object.visible = false;
        }
    }
}

function showBonds() {
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        if (object instanceof THREE.CSS3DSprite) {
            object.element.style.display = "none";
            object.visible = false;
        } else {
            object.element.style.display = "";
            object.element.style.height = object.userData.bondLengthFull;
            object.visible = true;
        }
    }
}

function showAtomsBonds() {
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        object.element.style.display = "";
        object.visible = true;
        if (!(object instanceof THREE.CSS3DSprite)) {
            object.element.style.height = object.userData.bondLengthShort;
        }
    }
}

function colorify(ctx, width, height, color, a) {
    var r = color.r;
    var g = color.g;
    var b = color.b;
    var imageData = ctx.getImageData(0, 0, width, height);
    var data = imageData.data;
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (y * width + x) * 4;
            data[index] *= r;
            data[index + 1] *= g;
            data[index + 2] *= b;
            data[index + 3] *= a;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function imageToCanvas(image) {
    var width = image.width;
    var height = image.height;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);
    return canvas;
}

function loadMolecule(url) {
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        object.parent.remove(object);
    }
    objects = [];
    loader.load(url, function (geometry, geometryBonds) {
        var offset = THREE.GeometryUtils.center(geometry);
        geometryBonds.applyMatrix(new THREE.Matrix4().makeTranslation(offset.x, offset.y, offset.z));

        for (var i = 0; i < geometry.vertices.length; i++) {
            var position = geometry.vertices[i];
            var color = geometry.colors[i];
            var element = geometry.elements[i];
            if (!colorSpriteMap[element]) {
                var canvas = imageToCanvas(baseSprite);
                var context = canvas.getContext('2d');
                colorify(context, canvas.width, canvas.height, color, 1);
                var dataUrl = canvas.toDataURL();
                colorSpriteMap[element] = dataUrl;
            }
            colorSprite = colorSpriteMap[element];
            var atom = document.createElement('img');
            atom.src = colorSprite;
            var object = new THREE.CSS3DSprite(atom);
            object.position.copy(position);
            object.position.multiplyScalar(75);
            object.matrixAutoUpdate = false;
            object.updateMatrix();
            root.add(object);
            objects.push(object);
        }

        for (var i = 0; i < geometryBonds.vertices.length; i += 2) {
            var start = geometryBonds.vertices[i];
            var end = geometryBonds.vertices[i + 1];
            start.multiplyScalar(75);
            end.multiplyScalar(75);
            tmpVec1.subVectors(end, start);
            var bondLength = tmpVec1.length() - 50;

            //
            var bond = document.createElement('div');
            bond.className = "bond";
            bond.style.height = bondLength + "px";

            var object = new THREE.CSS3DObject(bond);
            object.position.copy(start);
            object.position.lerp(end, 0.5);
            object.userData.bondLengthShort = bondLength + "px";
            object.userData.bondLengthFull = (bondLength + 55) + "px";

            //
            var axis = tmpVec2.set(0, 1, 0).cross(tmpVec1);
            var radians = Math.acos(tmpVec3.set(0, 1, 0).dot(tmpVec4.copy(tmpVec1).normalize()));
            var objMatrix = new THREE.Matrix4().makeRotationAxis(axis.normalize(), radians);
            object.matrix = objMatrix;
            object.rotation.setFromRotationMatrix(object.matrix, object.rotation.order);
            object.matrixAutoUpdate = false;
            object.updateMatrix();
            root.add(object);
            objects.push(object);

            //
            var bond = document.createElement('div');
            bond.className = "bond";
            bond.style.height = bondLength + "px";

            var joint = new THREE.Object3D(bond);
            joint.position.copy(start);
            joint.position.lerp(end, 0.5);
            joint.matrix.copy(objMatrix);
            joint.rotation.setFromRotationMatrix(joint.matrix, joint.rotation.order);
            joint.matrixAutoUpdate = false;
            joint.updateMatrix();

            var object = new THREE.CSS3DObject(bond);
            object.rotation.y = Math.PI / 2;
            object.matrixAutoUpdate = false;
            object.updateMatrix();
            object.userData.bondLengthShort = bondLength + "px";
            object.userData.bondLengthFull = (bondLength + 55) + "px";
            object.userData.joint = joint;
            joint.add(object);
            root.add(joint);
            objects.push(object);
        }

        //console.log( "CSS3DObjects:", objects.length );
        switch (visualizationType) {
        case 0:
            showAtoms();
            break;
        case 1:
            showBonds();
            break;
        case 2:
            showAtomsBonds();
            break;
        }
        render();
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    var time = Date.now() * 0.0004;
    root.rotation.x = time;
    root.rotation.y = time * 0.7;
    render();
}

function render() {
    renderer.render(scene, camera);
}

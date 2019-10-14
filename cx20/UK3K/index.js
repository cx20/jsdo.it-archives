// forked from https://github.com/HunterLarco/voxel.css/blob/master/tests/demo.html

var scene;
var world;
var editor;
var lightSource;

function init() {
    scene = new voxelcss.Scene();
    scene.rotate(-Math.PI / 5, Math.PI / 4, 0);
    scene.attach(document.body);

    world = new voxelcss.World(scene, 'Demo World');
    editor = new voxelcss.Editor(world);
    editor.enableAutoSave();

    lightSource = new voxelcss.LightSource(300, 300, 300, 750, 0.2, 1);
    scene.addLightSource(lightSource);

    buildCube();
}

function buildCube() {
    for (var x = -3; x <= 3; x++) {
        for (var y = -3; y <= 3; y++) {
            for (var z = -3; z <= 3; z++) {
                if ([x, y, z].filter(function(value) {
                        return Math.abs(value) === 3
                    }).length >= 2) {
                    editor.add(new voxelcss.Voxel(x * 40, y * 40, z * 40, 40, {
                        mesh: new voxelcss.Mesh(new voxelcss.ColorFace('#ca8940'))
                    }));
                }
            }
        }
    }
}

init();
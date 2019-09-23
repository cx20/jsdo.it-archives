// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/g28w
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/czeo
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/6Cd9
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/WltV
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（VBO編）" http://jsdo.it/cx20/KVOj
// forked from cx20's "[WebGL] QTEK を試してみるテスト（VBO編）" http://jsdo.it/cx20/ICwE
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var app = clay.application.create('#main', {
    init: function (app) {
        this._world = new OIMO.World({ 
            timestep: 1/60 * 2, 
            iterations: 8, 
            broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
            worldscale: 1, // scale full world 
            random: true,  // randomize sample
            info: false,   // calculate statistic or not
            gravity: [0,-9.8,0] 
        });
        
        // Create a orthographic camera
        this._camera = app.createCamera(null, null, 'perspective');
        this._camera.position.set(0, 0, 5);
        // Create geometry
        var geometryCube  = new clay.geometry.Cube();
        var geometryGround  = new clay.geometry.Cube();
        geometryCube .generateTangents();
        geometryGround .generateTangents();
        
        var shader = clay.shader.library.get('clay.standard', 'diffuseMap');
        var material = new clay.Material({
            shader: shader
        })
                
        this._oimoCube = this._world.add({
            type: "box",
            size: [50*2, 50*2, 50*2],
            pos: [0, 100, 0],
            rot: [10, 0, 10],
            move: true,
            density: 1
        });
        
        this._oimoGround = this._world.add({
           type: "box",
            size: [200*2, 4*2, 200*2],
            pos: [0, -50, 0],
            rot: [0, 0, 0],
            move: false,
            density: 1
        });
        
        this._rad = 0;
         
        this._meshCube = app.createMesh(geometryCube, material);
        this._meshCube.scale.set(50, 50, 50);
        this._meshCube.position.set(0, 100, 0);
        this._meshGround = app.createMesh(geometryGround, material);
        this._meshGround.scale.set(200, 4, 200);
        this._meshGround.position.set(0, -50, 0);
        var diffuse = new clay.Texture2D;
        diffuse.load("/assets/A/k/w/j/AkwjW.jpg");
        material.set('diffuseMap', diffuse);
        
        app.createAmbientLight("#fff", 1.0);
    },
    loop: function () {
        this._world.step();
        
        var pos = this._oimoCube.getPosition();
        this._meshCube.position.set(pos.x, pos.y, pos.z);
        var rot = this._oimoCube.getQuaternion();
        this._meshCube.rotation.set(rot.x, rot.y, rot.z, rot.w);
        this._camera.lookAt( new clay.Vector3(0,0,0), new clay.Vector3(0, 1, 0));
        this._camera.position.set( 400 * Math.sin(this._rad ), 0, 400 * Math.cos(this._rad ));
        this._rad += Math.PI/180;
     }
});
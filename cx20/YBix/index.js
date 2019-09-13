// forked from cx20's "[WebGL] Grimoire.js で Ammo.js を試してみるテスト（その２）" http://jsdo.it/cx20/2TNj
// forked from cx20's "[WebGL] Grimoire.js で Ammo.js を試してみるテスト（調整中）" http://jsdo.it/cx20/ejW7
// forked from cx20's "[WebGL] Grimoire.js で Oimo.js を試してみるテスト" http://jsdo.it/cx20/kQ0F
// forked from cx20's "[WebGL] Grimoire.js で Cannon.js を試してみるテスト" http://jsdo.it/cx20/4xwo
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その４）（VBO編）" http://jsdo.it/cx20/swSy
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）（VBO編）" http://jsdo.it/cx20/YiRx
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）（VBO編）" http://jsdo.it/cx20/e3YN
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

Ammo().then(function(Ammo) {
var update_trans = new Ammo.btTransform();
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
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BG","BG","BG",
    "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BG","BG",
    "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BR","BG","BK","RD","RD","RD",
    "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BR","BG","BG","RD","RD","RD",
    "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BG","RD",
    "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","RD","BK",
    "BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BG","RD","BK","BK",
    "BK","BK","RD","RD","RD","RD","RD","BL","RD","RD","RD","BL","RD","BK","BK","BK",
    "BK","RD","RD","RD","RD","RD","RD","RD","BL","RD","RD","RD","BL","BK","BK","BR",
    "BG","BG","RD","RD","RD","RD","RD","RD","BL","BL","BL","BL","BL","BK","BK","BR",
    "BG","BG","BG","BK","BL","BL","RD","BL","BL","YL","BL","BL","YL","BL","BR","BR",
    "BK","BG","BK","BR","BL","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    "BK","BR","BK","BK","BL","BL","BL","BL","BK","BK","BK","BK","BK","BK","BK","BK"
];

function getRgbColor(colorType)
{
    var colorHash = {
        "BK":"#dcaa6b", // black
        "WH":"#FFFFFF", // white
        "BG":"#FFCCCC", // beige
        "BR":"#800000", // brown
        "RD":"#FF0000", // red
        "YL":"#FFFF00", // yellow
        "GN":"#00FF00", // green
        "WT":"#00FFFF", // water
        "BL":"#0000FF", // blue
        "PR":"#800080"  // purple
    };
    return colorHash[colorType];
}

const Quaternion = gr.lib.math.Quaternion;
gr(function() {
    const scene = gr("#main")("scene").single();
    for (var i = 0; i < dataSet.length; i++) {
        var x = i % 16 - 8;
        var y = 16 - Math.floor(i / 16);
        var z = 0;
        const n = scene.addChildByName("rigid-cube", {
            albedo: getRgbColor(dataSet[i]),
            scale: 0.5,
            position: [x * 1.2, y * 1.2, 0]
        });
    }

});

gr.register(() => {
    gr.registerComponent("AmmoScene", {
        attributes: {
        },
        $awake: function() {
            var collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
            var dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
            var overlappingPairCache = new Ammo.btDbvtBroadphase();
            var solver = new Ammo.btSequentialImpulseConstraintSolver();
            var dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(
                dispatcher, 
                overlappingPairCache, 
                solver, 
                collisionConfiguration
            );
            dynamicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));
            this.world = dynamicsWorld;
        },
        $update: function() {
            this.world.stepSimulation(1/60, 0);
        }
    });
    gr.overrideDeclaration("scene", ["AmmoScene"]);
    gr.registerComponent("Rigid", {
        attributes: {
            shape: {
                default: "box",
                converter: "String"
            },
            move: {
                converter: "Boolean",
                default: true
            }
        },
        $mount: function() {
            this.__bindAttributes();
            this.transform = this.node.getComponent("Transform");
            const p = this.transform.position;
            const r = this.transform.rotation;
            const s = this.transform.scale;
            const ammoScene = this.node.getComponentInAncestor("AmmoScene");
            var size = new Ammo.btVector3(s.X, s.Y, s.Z);
            var pos = new Ammo.btVector3(p.X, p.Y, p.Z);
            var form = new Ammo.btTransform();
            form.setIdentity();
            form.setOrigin(pos);
            var shape;
            var mass = this.move ? 10 : 0;
            if ( this.shape == "box" ) {
                shape = new Ammo.btBoxShape(size);
            } else if ( this.shape == "sphere" ) {
                shape = new Ammo.btSphereShape(size);
            }
            var localInertia = new Ammo.btVector3(0, 0, 0);
            shape.calculateLocalInertia(mass,localInertia);
            var body = new Ammo.btRigidBody(
                new Ammo.btRigidBodyConstructionInfo(
                    mass,
                    new Ammo.btDefaultMotionState(form),
                    shape,
                    localInertia
                )
            );
            this.body = body;
            ammoScene.world.addRigidBody(body);
        },
        $update: function() {
            this.body.getMotionState().getWorldTransform(update_trans);
            const p = update_trans.getOrigin();
            this.transform.setAttribute("position", [p.x(), p.y(), p.z()]);
            const r = update_trans.getRotation();
            this.transform.setAttribute("rotation", [r.x(), r.y(), r.z(), r.w()]);
        }
    });
    gr.registerNode("rigid-cube", ["Rigid"], {
        geometry: "cube",
        scale: 0.5
    }, "mesh");
    gr.registerNode("rigid-sphere", ["Rigid"], {
        geometry: "sphere",
        scale: 0.5
    }, "mesh");
});
});
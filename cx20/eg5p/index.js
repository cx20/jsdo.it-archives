// forked from cx20's "[WebGL] Grimoire.js + OimoPhysics.js で箱にボールを入れてみるテスト（調整中）" http://jsdo.it/cx20/2t2l
// forked from cx20's "[WebGL] Grimoire.js + Oimo.js で箱にボールを入れてみるテスト（調整中）" http://jsdo.it/cx20/0fsp
// forked from cx20's "[WebGL] Grimoire.js で Oimo.js を試してみるテスト（その４改）" http://jsdo.it/cx20/sRhd
// forked from cx20's "[WebGL] Grimoire.js で Oimo.js を試してみるテスト（その４）" http://jsdo.it/cx20/ue3r
// forked from cx20's "[WebGL] Grimoire.js で Oimo.js を試してみるテスト（その３）" http://jsdo.it/cx20/G2wl
// forked from cx20's "[WebGL] Grimoire.js で Oimo.js を試してみるテスト（その２）" http://jsdo.it/cx20/sVc4
// forked from cx20's "[WebGL] Grimoire.js で Oimo.js を試してみるテスト" http://jsdo.it/cx20/kQ0F
// forked from cx20's "[WebGL] Grimoire.js で Cannon.js を試してみるテスト" http://jsdo.it/cx20/4xwo
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その４）（VBO編）" http://jsdo.it/cx20/swSy
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）（VBO編）" http://jsdo.it/cx20/YiRx
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）（VBO編）" http://jsdo.it/cx20/e3YN
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

let counter = 0;
const Quaternion = gr.lib.math.Quaternion;
let stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

var dataSet = [
    {material:"#mat1", imageFile:"../../assets/3/O/Z/o/3OZoF.jpg", scale:1.0}, // Basketball.jpg
    {material:"#mat2", imageFile:"../../assets/2/y/4/W/2y4Wl.jpg", scale:0.9}, // BeachBall.jpg
    {material:"#mat3", imageFile:"../../assets/r/x/X/q/rxXqY.jpg", scale:1.0}, // Football.jpg
    {material:"#mat4", imageFile:"../../assets/i/M/6/F/iM6FW.jpg", scale:0.3}, // Softball.jpg
    {material:"#mat5", imageFile:"../../assets/f/M/F/x/fMFxB.jpg", scale:0.3}, // TennisBall.jpg
];
gr(function() {
    const scene = gr("#main")("scene").single();
    for ( let i = 0; i < 200; i++ ) {
        let x = -5 + Math.random() * 10;
        let y = 20 + Math.random() * 10;
        let z = -5 + Math.random() * 10;
        var idx = Math.floor(Math.random() * dataSet.length);
        const n = scene.addChildByName("rigid-sphere", {
            material: dataSet[idx].material,
            //texture: dataSet[idx].imageFile,
            scale:dataSet[idx].scale,
            position: [x, y, z],
        });
    }
});
gr.register(() => {
    gr.registerComponent("OimoScene", {
        attributes: {
        },
        $awake: function() {
            this.world = new OIMO.World();
            this.world.gravity = new OIMO.Vec3(0, -9.80665, 0);
        },
        $update: function() {
        	stats.begin();
            this.world.step(1/30);
            stats.end();
        }
    });
    gr.overrideDeclaration("scene", ["OimoScene"]);
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
            const oimoScene = this.node.getComponentInAncestor("OimoScene");
            const shapec = new OIMO.ShapeConfig();
            if ( this.shape == "box" ) {
                shapec.geometry = new OIMO.BoxGeometry(new OIMO.Vec3(s.X, s.Y, s.Z));
            } else {
                shapec.geometry = new OIMO.SphereGeometry(s.X);
            }
            const bodyc = new OIMO.RigidBodyConfig();
            bodyc.type = this.move ? OIMO.RigidBodyType.DYNAMIC : OIMO.RigidBodyType.STATIC;
            bodyc.position = new OIMO.Vec3(p.X, p.Y, p.Z);
            this.body = new OIMO.RigidBody(bodyc);
            this.body.setRotationXyz(new OIMO.Vec3(r.X, r.Y, r.Z));
            this.body.addShape(new OIMO.Shape(shapec));
            oimoScene.world.addRigidBody(this.body);
        },
        $update: function() {
            const p = this.body.getPosition();
            this.transform.setAttribute("position", [p.x, p.y, p.z]);
            const r = this.body.getOrientation();
            this.transform.setAttribute("rotation", new Quaternion([r.x, r.y, r.z, r.w]));
            if ( p.y < -10 ) {
                let x = -5 + Math.random() * 10;
                let y = 20 + Math.random() * 10;
                let z = -5 + Math.random() * 10;
    
                this.body.setAngularVelocity(new OIMO.Vec3(0, 0, 0));
                this.body.setLinearVelocity(new OIMO.Vec3(0, -9.80665, 0));
                this.body.setPosition(new OIMO.Vec3(x, y, z));
            }
        }
    });
    gr.registerNode("rigid-cube", ["Rigid"], {
        geometry: "cube",
        shape: "box",
        scale: [1,1,1],
        transparent:"false"
    }, "mesh");
    gr.registerNode("rigid-sphere", ["Rigid"], {
        geometry: "sphere",
        shape: "sphere",
        scale: [1,1,1],
        transparent:"false"
    }, "mesh");
});
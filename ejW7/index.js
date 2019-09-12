// forked from cx20's "[WebGL] Grimoire.js で Oimo.js を試してみるテスト" http://jsdo.it/cx20/kQ0F
// forked from cx20's "[WebGL] Grimoire.js で Cannon.js を試してみるテスト" http://jsdo.it/cx20/4xwo
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その４）（VBO編）" http://jsdo.it/cx20/swSy
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）（VBO編）" http://jsdo.it/cx20/YiRx
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）（VBO編）" http://jsdo.it/cx20/e3YN
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

var update_trans = new Ammo.btTransform();
const Quaternion = gr.lib.math.Quaternion;
gr(function() {
    const scene = gr("#main")("scene").single();
    setInterval(function() {
        const n = scene.addChildByName("rigid-sphere", {
            material: ["#red", "#green", "#blue"][Math.floor(Math.random() * 3)],
            position: [Math.random() * 3 - 1.5, Math.random() * 5 + 5, Math.random() * 3 - 1.5]
        });
    }, 200);
});
gr.register(() => {
    gr.registerComponent("AmmoScene", {
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
        material:"#green",
        geometry: "cube",
        scale: 0.5
    }, "mesh");
    gr.registerNode("rigid-sphere", ["Rigid"], {
        material:"#green",
        geometry: "sphere",
        scale: 0.5
    }, "mesh");
});
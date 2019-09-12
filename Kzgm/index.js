// forked from cx20's "[WebGL] Grimoire.js で Cannon.js を試してみるテスト" http://jsdo.it/cx20/4xwo
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その４）（VBO編）" http://jsdo.it/cx20/swSy
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）（VBO編）" http://jsdo.it/cx20/YiRx
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）（VBO編）" http://jsdo.it/cx20/e3YN
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

var timeStep = 1 / 60

const Quaternion = gr.lib.math.Quaternion;
gr(function () {
    const scene = gr("#main")("scene").single();
    setInterval(function () {
        const n = scene.addChildByName("rigid-cube", {
            material: ["#red", "#green", "#blue"][Math.floor(Math.random() * 3)],
            position: [Math.random() * 3 - 1.5, Math.random() * 5 + 5, Math.random() * 3 - 1.5]
        });
    }, 200);
});
gr.register(() => {
    gr.registerComponent("CannonScene", {
        $awake: function () {
            this.world = new CANNON.World();
            this.world.gravity.set(0, -9.82, 0);
            this.world.broadphase = new CANNON.NaiveBroadphase();
            this.world.solver.iterations = 10;
            this.world.solver.tolerance = 0.1;
        },
        $update: function () {
            this.world.step(timeStep);
        }
    });
    gr.overrideDeclaration("scene", ["CannonScene"]);
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
        $mount: function () {
            this.__bindAttributes();
            this.transform = this.node.getComponent("Transform");
            const p = this.transform.localPosition;
            const r = this.transform.localRotation;
            const s = this.transform.localScale;
            var mass = 1.0;
            var shape;
            if (this.shape == "box") {
                shape = new CANNON.Box(new CANNON.Vec3(s.X, s.Y, s.Z));
            }
            body = new CANNON.Body({
                mass: this.move ? 1.0 : 0.0,
                position: new CANNON.Vec3(p.X, p.Y, p.Z),
                shape: shape
            });
            this.body = body;
            const cannonScene = this.node.getComponentInAncestor("CannonScene");
            cannonScene.world.addBody(body);
        },
        $update: function () {
            const p = this.body.position;
            this.transform.setAttribute("position", [p.x, p.y, p.z]);
            const r = this.body.quaternion;
            this.transform.setAttribute("rotation", new Quaternion([r.x, r.y, r.z, r.w]));
        }
    });
    gr.registerNode("rigid-cube", ["Rigid"], {
        material: "#green",
        geometry: "cube",
        scale: 0.5
    }, "mesh");
});
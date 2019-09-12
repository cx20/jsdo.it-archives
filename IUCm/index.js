// forked from cx20's "[WebGL] Grimoire.js で Oimo.js を試してみるテスト（その２）" http://jsdo.it/cx20/sVc4
// forked from cx20's "[WebGL] Grimoire.js で Oimo.js を試してみるテスト" http://jsdo.it/cx20/kQ0F
// forked from cx20's "[WebGL] Grimoire.js で Cannon.js を試してみるテスト" http://jsdo.it/cx20/4xwo
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その４）（VBO編）" http://jsdo.it/cx20/swSy
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）（VBO編）" http://jsdo.it/cx20/YiRx
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）（VBO編）" http://jsdo.it/cx20/e3YN
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

const Quaternion = gr.lib.math.Quaternion;
gr(function() {
    const scene = gr("#main")("scene").single();
/*
    setInterval(function() {
        const n = scene.addChildByName("rigid-cube", {
            material: ["#red", "#green", "#blue"][Math.floor(Math.random() * 3)],
            position: [Math.random() * 3 - 1.5, Math.random() * 5 + 5, Math.random() * 3 - 1.5]
        });
    }, 200);
*/
    setInterval(function() {
        const n = scene.addChildByName("rigid-gltf", {
            //material: ["#red", "#green", "#blue"][Math.floor(Math.random() * 3)],
            position: [Math.random() * 3 - 1.5, Math.random() * 5 + 5, Math.random() * 3 - 1.5]
        });
        gr("#main")("object.LOD3sp").setAttribute('position', "-0.2, -0.8, 0");
    }, 200);
});
gr.register(() => {
    gr.registerComponent("OimoScene", {
        $awake: function() {
            this.world = new OIMO.World();
        },
        $update: function() {
            this.world.step();
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
            this.body = oimoScene.world.add({
                type: this.shape == "duck" ? "sphere" : this.shape,
                size: this.shape == "duck" ? [s.X * 0.5, s.Y * 0.5, s.Z * 0.5] : [s.X * 2, s.Y * 2, s.Z * 2],
                pos: [p.X, p.Y, p.Z],
                rot: [r.X, r.Y, r.Z],
                move: this.move,
                density: 1
            });
        },
        $update: function() {
            const p = this.body.getPosition();
            this.transform.setAttribute("position", [p.x, p.y, p.z]);
            const r = this.body.getQuaternion();
            this.transform.setAttribute("rotation", new Quaternion([r.x, r.y, r.z, r.w]));
        }
    });
    gr.registerNode("rigid-cube", ["Rigid"], {
        material:"#green",
        geometry: "cube",
        scale: 0.5
    }, "mesh");
    gr.registerNode("rigid-gltf", ["Rigid"], {
        src: "../assets/g/s/5/8/gs58O.gltf", // glTF-Embedded/Duck.gltf
        shape: "duck",
        //material:"#green",
        //geometry: "cube",
        scale: 1.0
    }, "model");
});
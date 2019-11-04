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

const Quaternion = gr.lib.math.Quaternion;
var dataSet = [
    {imageFile:"../../assets/3/O/Z/o/3OZoF.jpg", scale:1.0}, // Basketball.jpg
    {imageFile:"../../assets/2/y/4/W/2y4Wl.jpg", scale:0.9}, // BeachBall.jpg
    {imageFile:"../../assets/r/x/X/q/rxXqY.jpg", scale:1.0}, // Football.jpg
    {imageFile:"../../assets/i/M/6/F/iM6FW.jpg", scale:0.3}, // Softball.jpg
    {imageFile:"../../assets/f/M/F/x/fMFxB.jpg", scale:0.3}, // TennisBall.jpg
];
gr(function() {
    const scene = gr("#main")("scene").single();
    var timer = setInterval(function() {
        var idx = Math.floor(Math.random() * dataSet.length);
        const n = scene.addChildByName("rigid-sphere", {
            texture: dataSet[idx].imageFile,
            scale:dataSet[idx].scale,
            position: [Math.random() * 4 - 2, Math.random() * 5 + 15, Math.random() * 4 - 2],
        });
    }, 30);
    setTimeout(function(){
        clearInterval(timer);
    }, 10000 );
});
gr.register(() => {
    gr.registerComponent("OimoScene", {
        attributes: {
        },
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
            var all = 0xffffffff; // 11111111 11111111 11111111 11111111
            var config = [
                1,   // 密度
                0.4, // 摩擦係数
                0.6, // 反発係数
                1,   // 所属する衝突グループのビット
                all  // 衝突する衝突グループのビット
            ];
            this.__bindAttributes();
            this.transform = this.node.getComponent("Transform");
            const p = this.transform.position;
            const r = this.transform.rotation;
            const s = this.transform.scale;
            const oimoScene = this.node.getComponentInAncestor("OimoScene");
            this.body = oimoScene.world.add({
                type: this.shape,
                size: this.shape == "box" ? [s.X*2, s.Y*2, s.Z*2] : [s.X, s.Y, s.Z],
                pos: [p.X, p.Y, p.Z],
                rot: [r.X, r.Y, r.Z],
                move: this.move,
                density: 1,
                config: config
            });
        },
        $update: function() {
            const p = this.body.getPosition();
            this.transform.setAttribute("position", [p.x, p.y, p.z]);
            const r = this.body.getQuaternion();
            this.transform.setAttribute("rotation", new Quaternion([r.x, r.y, r.z, r.w]));
            if ( p.y < -10 ) {
                x = Math.random() * 4 - 2;
                y = Math.random() * 5 + 15;
                z = Math.random() * 4 - 2;
                this.body.resetPosition(x, y, z);
                //this.body.linearVelocity = new OIMO.Vec3((Math.random() - 0.5) * 5, 8, (Math.random() - 0.5) * 5);
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
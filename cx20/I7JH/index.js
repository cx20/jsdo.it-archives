// forked from cx20's "[WebGL] Grimoire.js で動的にmeshを追加するサンプルを試してみる" http://jsdo.it/cx20/C5Kq
// forked from cx20's "[WebGL] Grimoire.js で Cube を動的に追加してみるテスト（改）" http://jsdo.it/cx20/w8ZO
// forked from cx20's "[WebGL] Grimoire.js で Cube を動的に追加してみるテスト" http://jsdo.it/cx20/8Mxl
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）" http://jsdo.it/cx20/a1kX
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）" http://jsdo.it/cx20/mjC6
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

gr.registerComponent("RotateSelf", {
    attributes: {
        test: {
            defaultValue: "HELLO WORLD!",
            converter: "String"
        }
    },
    $awake: function() {
        console.log("awake");
        this.i = 0;
    },
    $mount: function() {},
    $update: function() {
      console.log("update");
        this.i++;
        this.node.setAttribute("rotation", this.i + "," + this.i + "," + this.i);
    }
});
gr.registerNode("rotate", ["RotateSelf"], {}, "mesh");
gr(function() {
    var $$ = gr("#main");
    $$("#mesh-1").addComponent("RotateSelf");
});
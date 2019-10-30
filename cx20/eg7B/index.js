// forked from cx20's "[WebGL] A-Frame を試してみるテスト（その４）" http://jsdo.it/cx20/k7B2
// forked from cx20's "[WebGL] A-Frame を試してみるテスト（その３）" http://jsdo.it/cx20/qgOl
// forked from cx20's "[WebGL] A-Frame を試してみるテスト（その２）" http://jsdo.it/cx20/OclK
// forked from cx20's "[WebGL] A-Frame を試してみるテスト" http://jsdo.it/cx20/AOwl
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC
// nothing

/*
<a-scene>
    <a-assets>
      <img id="my-texture" src="/assets/A/k/w/j/AkwjW.jpg">
    </a-assets>

    <a-sky color="#ECECEC"></a-sky>
    <a-camera position="0 0 3.8"></a-camera>
    <a-entity scale="2 2 2" geometry="primitive: box;" position="0 1 0" material="src: #my-texture">
        <a-animation easing="linear" attribute="rotation" dur="10000" to="360 360 360" repeat="indefinite"></a-animation>
    </a-entity>
</a-scene>

*/

let scene = document.querySelector("a-scene");
let assets = document.createElement("a-assets");
let img = document.createElement("img");
img.setAttribute("id", "my-texture");
img.setAttribute("src", "../../assets/A/k/w/j/AkwjW.jpg");
assets.appendChild(img);

let sky = document.createElement("a-sky");
sky.setAttribute("color", "#ECECEC");

let camera = document.createElement("a-camera");
camera.setAttribute("position", "0 0 3.8");

let entity = document.createElement("a-entity");
entity.setAttribute("scale", "2 2 2");
entity.setAttribute("geometry", "primitive: box;");
entity.setAttribute("position", "0 1 0");
entity.setAttribute("material", "src: #my-texture");

let animation = document.createElement("a-animation");
animation.setAttribute("easing", "linear");
animation.setAttribute("attribute", "rotation");
animation.setAttribute("dur", "10000");
animation.setAttribute("to", "360 360 360");
animation.setAttribute("repeat", "indefinite");

entity.appendChild(animation);

scene.appendChild(assets);
scene.appendChild(sky);
scene.appendChild(camera);
scene.appendChild(entity);

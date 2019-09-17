Babylon.js でカスタムシェーダを使用してみるテスト（その２）

＜対応した点＞
・waterMaterial.js を jsdo.it で動作するようシェーダの格納先を変更
　＜変更前＞
　Water/water.vertex.fx
　Water/water.fragment.fx
　＜変更後＞
　BABYLON.Effect.ShadersStore["Water/waterVertexShader"] = vs;　
　BABYLON.Effect.ShadersStore["Water/waterFragmentShader"] = fs;

・skyBox が jsdo.it で動作するようパスを調整
　＜変更前＞
　var extensions = ["_px.jpg", ... , "_nz.jpg"];
　＜変更後＞
　var extensions = [
　　"../../../../assets/e/Y/8/U/eY8Uv.jpg", // "skybox/skybox_px.jpg", 
　　　:
　　"../../../../assets/h/z/U/B/hzUBa.jpg" // "skybox/skybox_nz.jpg"
　];

＜参考＞
■ Babylon.js: Creating a convincing world for your game with custom shaders, height maps and skyboxes - Eternal Coding - MSDN Blogs
http://blogs.msdn.com/b/eternalcoding/archive/2013/08/06/babylon-js-creating-a-convincing-world-for-your-game-with-custom-shaders-height-maps-and-skyboxes.aspx

■ Using babylon.js - Test page
http://www.babylonjs.com/tutorials/blogs/customShaders/customShaders.html

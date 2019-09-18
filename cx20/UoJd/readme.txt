[WebGL] アヒルを海に浮かべてみるテスト（改）（Babylon.js編）

＜対応した点＞
・アヒルの姿が水面に反射するよう対応。
　var duck = scene.getMeshByName("LOD3sp");
　waterMaterial.reflectionTexture.renderList.push(duck);

＜参考＞
■ Where is the sample to display the duck.gltf?
http://www.html5gamedevs.com/topic/21439-where-is-the-sample-to-display-the-duckgltf/

■ glTF Babylon.js GDC Demo
http://babylonjs-extras.azurewebsites.net/GDC/

■ Shadows Tutorials - BabylonJS Documentation
http://doc.babylonjs.com/tutorials/Shadows

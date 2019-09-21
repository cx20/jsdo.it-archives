[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その２０）（調整中）

RuntimeError: Vertex shader failed to compile. Compile log: ERROR: 0:29: '=' : dimension mismatch
ERROR: 0:29: 'assign' : cannot convert from 'highp 3-component vector of float' to 'varying highp 4-component vector of float'
ERROR: 0:38: '+' : wrong operand types - no operation '+' exists that takes a left-hand operand of type 'uniform highp 3-component vector of float' and a right operand of type 'highp 4-component vector of float' (or there is no acceptable conversion)

Error
at new t (https://cdn.rawgit.com/cx20/gltf-test/f04e8b26/libs/cesium/1.50/Cesium.js:444:28523)
at f (https://cdn.rawgit.com/cx20/gltf-test/f04e8b26/libs/cesium/1.50/Cesium.js:473:30655)
at y (https://cdn.rawgit.com/cx20/gltf-test/f04e8b26/libs/cesium/1.50/Cesium.js:474:717)
at d.get (https://cdn.rawgit.com/cx20/gltf-test/f04e8b26/libs/cesium/1.50/Cesium.js:474:1482)
at tt (https://cdn.rawgit.com/cx20/gltf-test/f04e8b26/libs/cesium/1.50/Cesium.js:495:17176)
at https://cdn.rawgit.com/cx20/gltf-test/f04e8b26/libs/cesium/1.50/Cesium.js:495:19504
at Function.i.meshPrimitive (https://cdn.rawgit.com/cx20/gltf-test/f04e8b26/libs/cesium/1.50/Cesium.js:491:31983)
at https://cdn.rawgit.com/cx20/gltf-test/f04e8b26/libs/cesium/1.50/Cesium.js:495:19461
at Function.i.object (https://cdn.rawgit.com/cx20/gltf-test/f04e8b26/libs/cesium/1.50/Cesium.js:491:29794)
at Function.i.topLevel (https://cdn.rawgit.com/cx20/gltf-test/f04e8b26/libs/cesium/1.50/Cesium.js:491:29899)


＜他ライブラリ比較＞
■ [WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その２０）（調整中）
http://jsdo.it/cx20/gykb
■ [WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その２０）（調整中）
http://jsdo.it/cx20/OjW2A
■ [WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その２０）（調整中）
http://jsdo.it/cx20/q8ln
■ [WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その２０）（調整中）
http://jsdo.it/cx20/wecq
■ [WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その２０）（調整中）
http://jsdo.it/cx20/6dtI

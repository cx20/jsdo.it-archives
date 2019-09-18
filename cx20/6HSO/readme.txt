[WebGL] Babylon.js + objFileLoaderを試してみるテスト（修正版）

＜対応した点＞
・テクスチャが縞模様になる問題を修正
　BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;
・jsdo.it 用に .obj ファイルを修正（.mtl の参照部分をコメントアウト。Importer がエラーとなる為）
　## mtllib adobe.mtl

＜参考＞
■ Babylon.js .obj File Loader problem?
http://www.html5gamedevs.com/topic/19351-babylonjs-obj-file-loader-problem/

■ Babylon.js .obj File Loader
http://doc.babylonjs.com/extensions/OBJ

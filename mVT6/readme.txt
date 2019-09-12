[WebGL] クォータニオンを使用して三角形を回転させてみるテスト

＜対応した点＞
・glTF アニメーションモデルではクォータニオンによる回転が必要となる為、その仕組みをテスト。
・クォータニオンによる回転は JavaScript の行列ライブラリである glMatrix.js を使用。
　＜例＞
　var q = quat.create();
　var v = vec3.create();
　q.set([0.0, 0.0, 0.707, 0.707]); // クォータニオンで 90 度回転を指定
　v.set([0.0, 0.0, -2.0]); // 平行移動行列で位置を指定
　mat4.fromRotationTranslation(mvMatrix, q, v);

＜参考＞
■ A Simple Animation
https://github.com/KhronosGroup/glTF-Tutorials/blob/master/gltfTutorial/gltfTutorial_006_SimpleAnimation.md

■ glMatrix
http://glmatrix.net/

■ [WebGL] 行列演算ライブラリを使用してみるテスト（glMatrix.js v2.x編）
http://jsdo.it/cx20/fCkX

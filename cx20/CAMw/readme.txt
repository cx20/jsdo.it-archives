[WebGL] GLBoost で Teapot に光を当ててみるテスト

GLBoost 作者の emadurandal さんにマテリアルの使い方を教えていただきました。

＜対応した点＞
・ライト設定
　var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(-1, -1, -1));
　scene.addChild( directionalLight );

・マテリアル設定
　material.shaderClass = GLBoost.LambertShader; // Lambert（拡散反射のみ）
　material.shaderClass = GLBoost.PhongShader; // Phong（鏡面反射あり。つまりハイライト（ツヤ表現）あり）

＜他ライブラリ比較＞
■ [簡易版] WebGL で Teapot に光を当ててみるテスト
http://jsdo.it/cx20/sVfd
■ [WebGL] GLBoost で Teapot に光を当ててみるテスト
http://jsdo.it/cx20/CAMw
■ [WebGL] Grimoire.js で Teapot に光を当ててみるテスト（シェーダ編）
http://jsdo.it/cx20/0i8H
■ [WebGL] Grimoire.js で Teapot に光を当ててみるテスト（forward-shading編）
http://jsdo.it/cx20/iWpu/

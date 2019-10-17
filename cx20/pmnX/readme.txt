texgen.js を試してみるテスト

texgen.js は three.js の作者である mr.doob さんによるテクスチャ生成ライブラリです。
各ピクセルに対して定義した手続きを処理させることによって色を求める仕組みのようです。
そういう意味では、GLSL のようなシェーダに近い気がします。

使い方は、Raphael.js や Snap.svg と同様に、メソッドチェーンにて記述する方式のようです。

＜対応した点＞
・サンプルを jsdo.it に移植

＜参考＞
■ mrdoob/texgen.js
https://github.com/mrdoob/texgen.js

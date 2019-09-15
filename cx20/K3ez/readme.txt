GLBoost で地球に雲を表示してみるテスト（改2）

＜対応した点＞
・GLBoost のライブラリを最新化。
　http://jsdo.it/cx20/kmx9 で PhongShader が角ばって表示されていたのは不具合だったとのこと。
・再び、シェーダを HalfLambertShader → PhongShader に変更。

＜対応できていない点＞
・法線マップ、鏡面マップには未対応。

＜参考＞
■ Normalize normal in phong fragment shader
https://github.com/emadurandal/GLBoost/commit/6650d1d475e180d20c345121d674033ea99f2afd

■ Three.js で地球を表示させてみるテスト
http://jsdo.it/cx20/78Dn

[GLSL] テクスチャを合成してみるテスト
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

＜対応した点＞
・雲テクスチャを noise として合成するよう対応。
　雲テクスチャならびに、シェーダ部は、以下からお借りしました。
　■ Shader - Animation (Three.js)
　http://stemkoski.github.io/Three.js/Shader-Animate.html

＜対応できていない点＞
・やり方がまずいのか、IE11 と iOS で上手く合成してくれない（元画像が残ってしまう）模様。

＜参考＞
■ Shader - Animation (Three.js)
http://stemkoski.github.io/Three.js/Shader-Animate.html

■ WebGL マルチテクスチャ - wgld.org
http://wgld.org/d/webgl/w027.html

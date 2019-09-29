Three.js で太陽を表示させてみるテスト

＜対応した点＞
・Three.js + GLSL シェーダを用いて太陽を表現するよう対応。
　※ http://stemkoski.github.io/Three.js/Shader-Fireball.html からの移植になります。

＜対応できていない点＞
・Chrome, Firefox は特段問題ないが、IE11, Edge だとシェーダが滑らか表示されない。
　http://jsdo.it/cx20/wVSQ と同様に noise 画像を合成する際に元画像が残ってしまうのが原因の模様。

＜参考＞
■ Shader - Fireball (Three.js)
http://stemkoski.github.io/Three.js/Shader-Fireball.html

■ [GLSL] テクスチャを合成してみるテスト
http://jsdo.it/cx20/wVSQ

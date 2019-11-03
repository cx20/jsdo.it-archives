[WebGL] CZPG.js を試してみるテスト（その２）

CZPG.js は PrincessGod さんによる WebGL 2.0 対応の軽量ライブラリです。

＜対応した点＞
・色設定用の頂点バッファを追加。
・GLSL のシェーダに色設定用変数を追加
　＜頂点シェーダ＞
　in vec4 color
　out vec4 vColor;
　＜フラグメントシェーダ＞
　in vec4 vColor
　out vec4 fragColor

＜参考＞
■ PrincessGod/CraZyPG
https://github.com/PrincessGod/CraZyPG
■ CraZyPG
http://princessgod.com/CraZyPG/

■ 各種 WebGL ライブラリによる基本サンプル一覧
http://qiita.com/cx20/items/0fa19c96aa6470d98807


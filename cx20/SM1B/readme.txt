[WebGL] Grimoire.js で３次元リサージュ図形を描いてみるテスト

＜対応した点＞
・GeometryFactory を用いて３次元リサージュ図形を描くよう対応
　設定例）
　x = sin(ω1t + α)
　y = sin(ω2t + β)
　z = sin(ω3t + γ)

＜変更履歴＞
2017/07/29 grimoire-preset-basic.js v1.8.6 → v1.10.19 に変更。スクリプトタグに記載したシェーダをマテリアル名で参照するよう対応。
2017/03/20 初版作成

＜参考＞
■ GrimoireGL/GrimoireJS
https://github.com/GrimoireGL/GrimoireJS

■ [WebGL] three.js で３次元リサージュ図形を描いてみるテスト（BufferGeometry編）
http://jsdo.it/cx20/075N

■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807

■ パラメトリック曲面を描くのに適した WebGL ライブラリについて - Qiita
http://qiita.com/cx20/items/e983572d5dde2fa9a85b

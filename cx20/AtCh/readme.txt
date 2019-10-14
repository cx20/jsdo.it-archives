[WebGL] Grimoire.js で render-quad を使ってシェーダを実行してみるテスト

＜対応した点＞
・render-quad でシェーダの描画結果を表示するよう対応。
・GLSL Sandbox の作品を Grimoire.js で表示させるよう調整。
　＜変更箇所＞
　uniform float time;　　　　→ _time
　uniform vec2 resolution;　 → _viewportSize

＜変更履歴＞
2017/07/06 grimoire-preset-basic.js v1.9.28 → v1.10.16 に変更。スクリプトタグに記載したシェーダをマテリアル名で参照するよう対応。
2017/05/06 初版作成

＜参考＞
■ Grimoire.js Example #clover
https://grimoiregl.github.io/grimoire.gl-example/#clover

■ GLSL Sandbox #40209.0
http://glslsandbox.com/e#40209.0

■ Grimoire.jsでシェーダープログラミング入門1
http://qiita.com/kyasbal_1994/items/cff1466719934f461ca8

■ Grimoire.jsのタグベースレンダラーの仕組み - Qiita
http://qiita.com/kyasbal_1994/items/3cd082c7f21503746f0e

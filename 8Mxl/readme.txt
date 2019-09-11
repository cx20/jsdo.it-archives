[WebGL] Grimoire.js で Cube を動的に追加してみるテスト

＜対応した点＞
・Grimoire.js のバージョンを 2016.11.03 版に変更
　・attr → setAttribute に変更
　・gr(function(){}) で囲むよう対応。
　・import-material を削除
　・material id="sprite" type="sprite" → "unlit" に変更
　　unlitはデフォルトの状態で存在するシェーダーとのこと。

＜参考＞
■ JavascriptでGOMLを扱う - Grimoire.js
https://grimoire.gl/tutorial/03-handle-goml-with-js.html#動的にmeshを追加してみる
■ GrimoireGL/GrimoireJS
https://github.com/GrimoireGL/GrimoireJS
■ GrimoireGL/grimoire.gl-example
https://github.com/GrimoireGL/grimoire.gl-example
■ Grimoire.js
https://grimoire.gl/
■ Try out! | Grimoire.js
https://grimoire.gl/example/
■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807

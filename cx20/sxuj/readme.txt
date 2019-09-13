[WebGL] Grimoire.js でドット絵を描いてみるテスト

＜対応した点＞
・キューブをドット絵になるよう配置。
・GOML で width="fit" height="fit" を用いる場合は、CSS で height:100%; の指定を行うよう対応。
　そうしないと、高さ0となってしまい、行列の計算が正しくされないとのこと。

＜参考＞
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

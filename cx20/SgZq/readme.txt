forked: p5.js(instance mode) - Color Wave

p5.js は JavaScript で Processing ライクにコードを書く為のライブラリです。
ライブラリの使い方としては以下の２通りの使い方があるようです。

・global mode … Processing ライクに記述するモード
・instance mode … JavaScript のオブジェクトとして扱うモード

＜対応した点＞
・Processing.js のサンプルを p5.js に移植
　・instance mode を使用
　・size() → createCanvas() に変更
　・translate() の挙動をそろえる為、push/pop を追加

＜参考＞
■ processing/p5.js
https://github.com/processing/p5.js

■ Instance Mode - p5.js
http://p5js.org/examples/examples/Instance_Mode_Instantiation.php

■ Processing transition - processing_p5.js Wiki
https://github.com/processing/p5.js/wiki/Processing-transition

■ 各種 WebGL ライブラリで基本図形を表示してみる
http://qiita.com/cx20/items/0fa19c96aa6470d98807

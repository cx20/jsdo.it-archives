p5.js でドット絵を描くテスト

p5.js は Processing の描画機能を JavaScript から利用できるようにするライブラリのようです。
似たようなライブラリとして Processing.js がありますが、微妙に位置づけが異なるようです。

＜Processing.js の特徴＞
・Processing の JavaScript 実装。
・Processing の構文が使える為、サンプルコードがほぼそのまま流用できる。
・使用するときにタイプ属性 <script type="application/processing"> が必要。
・JavaScript の IDE でデバッグ実行がしにくい

＜p5.js の特徴＞
・Processing の描画関数を JavaScript のライブラリとして移植。
・Processing と構文が少し異なる為、サンプルコードは、一部修正が必要（組み込み型やクラスの使用箇所など）です。
・使用するときにタイプ属性 <script type="application/processing"> は不要。JavaScript として利用可能。
・JavaScript の IDE でデバッグ実行が可能。

＜対応した点＞
・Processing.js 用のサンプルコードを p5.js 用に移植。

＜参考＞
■ lmccart/p5.js
https://github.com/lmccart/p5.js
■ Processing transition - Overview of differences
https://github.com/lmccart/p5.js/wiki/Processing-transition
■ Processingとp5.js - おおまかな違い（上記の日本語訳）
https://gist.github.com/mactkg/633224e60cfaae8789c2
■ p5.js
http://p5js.org/
■ p5.js 入門(公式のGet startedを意訳しながらやってみた)
http://kuteken.hatenablog.com/entry/2014/08/07/162714
■ DailyJS: p5.js
http://dailyjs.com/2014/08/07/p5js/

＜関連＞
■ Processing.js でドット絵を描くテスト
http://jsdo.it/cx20/in7V

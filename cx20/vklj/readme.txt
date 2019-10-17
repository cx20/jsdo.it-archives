スポットライトでドット絵を描いてみるテスト

要 WebGL 対応ブラウザ（IE11 など最新ブラウザ推奨）

＜対応した点＞
・THREE.SpotLight() で指定位置のライト色を変更することでドット絵を表現するよう対応。

＜ハマった点＞
・当初、何も考えずに 16x16 個＝256個 の THREE.SpotLight() を作成した所、重すぎて、使い物にならなかった。
  その為、スポットライトを３個に限定し、移動させることでドット絵を表現することとした。

＜ソース解説＞
■ スポットライトでドット絵を描いてみるテスト - CX's Hatena Blog
http://cx20.hatenablog.com/entry/2014/02/08/133430

＜参考＞
■ 初心者でも絶対わかる、WebGLプログラミング＜three.js最初の一歩＞ - HTML5Experts.jp
http://html5experts.jp/yomotsu/5225/

■ three.js wiki - SpotLight
http://www56.atwiki.jp/threejs/pages/80.html


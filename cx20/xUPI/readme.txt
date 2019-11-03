[WebGL] TDL を試してみるテスト

TDL は Three D Library の略で WebGL 向けの低レベルライブラリです。
TWGL と同じ greggman さんのライブラリで、TDL は使いやすさより速度に注力しているようです。

＜対応した点＞
・TDL でポリゴン1枚描くよう対応

＜対応していない点＞
・本来は tdl.require() を用いて必要なライブラリをロードするスタイルなようですが、jsdo.it の asset のファイル名の都合上、一括で tdl.js といてロードしています。

＜参考＞
■ greggman/tdl
https://github.com/greggman/tdl

■ Your browser supports WebGL
https://get.webgl.org/

■ 空が狭い: WebGL Advent calender 3日目
http://nyamadandan.blogspot.jp/2011/12/webgl-advent-calender-3.html

＜いろんな WebGL ライブラリを試してみるシリーズ＞
■ [簡易版] 30行で WebGL を試してみるテスト（ライブラリなし）
http://jsdo.it/cx20/oaQC
■ [WebGL] webgl-utils.js を試してみるテスト
http://jsdo.it/cx20/d23X
■ [WebGL] TDL を試してみるテスト
http://jsdo.it/cx20/xUPI
■ [WebGL] TWGL.js を試してみるテスト
http://jsdo.it/cx20/giVf
■ [WebGL] PhiloGL を試してみるテスト
http://jsdo.it/cx20/bfyq
■ [WebGL] lightgl.js を試してみるテスト
http://jsdo.it/cx20/rm4H
■ [WebGL] GLOW.js を試してみるテスト
http://jsdo.it/cx20/5BvD
■ [WebGL] SpiderGL を試してみるテスト
http://jsdo.it/cx20/jKwi
■ [WebGL] WebGL Helper を試してみるテスト
http://jsdo.it/cx20/avc4

[WebGL] p5.js を試してみるテスト（その２）

＜対応した点＞
・四角形を描くよう対応

＜対応できていない点＞
・頂点バッファ毎に色を設定する方法が分からなかった。

＜ライブラリの仕様なのかバグなのか不明な点＞
・createCanvas() と createGraphics() で 'webgl' 指定した場合の座標系が異なる模様。
　createCanvas　：中心が (0,0)
　createGraphics：左上が (0,0)
・createCanvas() + 'webgl' を使用した場合、TRIANGLE_STRIP オプションを文字定数で指定しないと効かない模様。

＜変更履歴＞
・2015/09/25 createGraphics()→createCanvas(), vertex(x,y)→vertex(x,y,z)
・2015/09/23 初版作成

＜参考＞
■ [WebGL] Processing.js を試してみるテスト（その２）
http://jsdo.it/cx20/eA2K

■ processing/p5.js
https://github.com/processing/p5.js

■ Draft of getting started with webgl in p5js doc.
https://gist.github.com/indefinit/45a78da8d7c943b22dc1

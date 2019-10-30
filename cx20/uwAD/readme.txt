[WebGL] p5.js を試してみるテスト

p5.js は Processing ライクに使える JavaScript のライブラリです。
v0.4.6 より WebGL もサポートしているようなので試してみました。
ただし、v0.4.13 現在、未実装機能やバグも多々あるようです。。。
例）Uncaught Error: stroke for shapes in 3D not yet implemented, use fill for now :(

＜対応した点＞
・p5.js で WebGL を使用するよう対応。

＜ライブラリの仕様なのかバグなのか不明な点＞
・createCanvas() と createGraphics() で 'webgl' 指定した場合の座標系が異なる模様。
　createCanvas　：中心が (0,0)
　createGraphics：左上が (0,0)

＜変更履歴＞
・2015/09/25 createGraphics()→createCanvas(), vertex(x,y)→vertex(x,y,z)
・2015/09/23 初版作成

＜参考＞
■ [WebGL] Processing.js を試してみるテスト
http://jsdo.it/cx20/xde6

■ processing/p5.js
https://github.com/processing/p5.js

■ Draft of getting started with webgl in p5js doc.
https://gist.github.com/indefinit/45a78da8d7c943b22dc1

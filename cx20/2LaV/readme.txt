[WebGL] stackgl を試してみるテスト

stackgl は WebGL の為のオープンソフトウェアのエコシステムとのことです。
browserify と npm によって構築されています。

＜対応した点＞
・stackgl でポリゴン1枚描くよう対応

＜対応していない点＞
・本サンプルは、browserify により生成された bundle.js をベースに手修正を行っています。
　例）
　browserify index.js > bundle.js
・stackgl を理解せずに修正を行っている為、修正の仕方に問題がある（本来、生成されないコードとなっている）可能性があります。

＜参考＞
■ stack.gl
http://stack.gl/
■ stackgl/gl-now
https://github.com/stackgl/gl-now
■ gl-now
http://mikolalysenko.github.io/gl-now/
■ Browserify: それはrequire()を使うための魔法の杖 - Qiita
http://qiita.com/cognitom/items/4c63969b5085c90639d4

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
■ [WebGL] stackgl を試してみるテスト
http://jsdo.it/cx20/2LaV

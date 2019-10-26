forked: WebGL 2 Crowds

本サンプルは、現状 Chrome canary でしか動作しない為、動作環境にご注意ください。

＜対応した点＞
・WebGL 2 の TransformFeedback サンプルを jsdo.it で動作するよう移植

＜対応できていない点＞
・モデルが黒く忍者っぽく表示されているのはテクスチャが一部上手く表示されていない為です。正しくは下記を参照願います。
　http://toji.github.io/webgl2-crowd/
・Firefox 44.0a2 (2015-11-10) ではシェーダがエラーとなり表示されなかった。

＜テストした環境＞
・Chrome 48.0.2560 canary
　→ 起動オプションに「--enable-unsafe-es3-apis」を追加

＜参考＞
■ toji/webgl2-crowd
https://github.com/toji/webgl2-crowd
■ WebGL 2 Crowds
http://toji.github.io/webgl2-crowd/
■ TojiCode: What's coming in WebGL 2.0
http://blog.tojicode.com/2013/09/whats-coming-in-webgl-20.html
■ なにが変わるの WebGL 2.0
http://wgld.org/o/tools/slide/doc/005/
■ WebGL Report 実行結果（WebGL2編） - Qiita
http://qiita.com/cx20/items/455f029cd0e037fecad9

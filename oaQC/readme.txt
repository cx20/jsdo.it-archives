[簡易版] 30行で WebGL を試してみるテスト

ポリゴン1枚書くのに100行とか覚えるのはハードルが高い気がしたので、
時間が無い人向けに短縮したコード（簡易版コード）を書いてみました。

＜対応した点＞
・可読性を損ねない形で WebGL + GLSL の最小コードとなるようコードを記述。
・ライブラリを使わないよう対応。

＜対応していない点＞
・初期化処理の一部を省いています。
・エラー処理も省いています。
・アニメーションもしません。

＜ベースにしたサンプル＞
■ WebGL for Internet Explorer
http://msdn.microsoft.com/en-us/library/ie/dn302469(v=vs.85).aspx

＜参考＞
■ 第二回 WebGLスクール 「WebGLの手続きと手順」 - Qiita
http://qiita.com/konweb/items/a1c58c1722c62a61f35d

■ js4k intro
https://github.com/doxas/js4kintro/blob/master/src/full_debug.html

■ WebGL リファレンス
http://ec.nikkeibp.co.jp/nsp/dl/08513/HTML5GAMES_AppB.pdf

空耳モールス信号メーカー for jsdo.it ver 0.01

@mach3ss さんのプレゼンを参考にモールス信号に変換するやつを作ってみました。

＜概要＞
「日本語」→「フリガナAPI」→「空耳辞書（モールス信号版）」→「モールス信号」→「Web Audio APIにて再生」

＜対応した点＞
・空耳メーカーの変換辞書をモールス信号用に変更。
・Web Audio API による再生に対応（https://gist.github.com/myme/7554709 を参考）

＜対応できていない点＞
・変換辞書をゴリゴリ置換しただけで、ほぼ未テストです。

＜参考＞
■ Web Audio API とモールス信号
http://www.slideshare.net/mach3ss/slide-37613454

■ みんなの知識【ちょっと便利帳】 - モールス符号（モールス信号）一覧
http://www.benricho.org/symbol/morse.html

■ Testing out Web Audio API with a simple morse code generator.
https://gist.github.com/myme/7554709

■ A Morse Code generator in Java Script
https://gist.github.com/eholk/0115691987090973cefe

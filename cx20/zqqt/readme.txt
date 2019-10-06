XLSX.js でドット絵を描いてみるテスト

「Save」ボタンを押すと、HTML TABLE の内容が Excel ファイルとしてダウンロードされます。

Chrome と Firefox で動作すること確認。IE11 では動作しない模様。

＜対応した点＞
・HTML TABLE の内容を元に XLSX.js を用いて Excel ファイルを生成するよう対応。
・ドット絵になるよう、Excel の罫線の色を変更。

＜対応できていない点＞
・背景色を設定する方法が分からなかった（恐らく、ライブラリが対応していない）為、
　罫線の色で代用。
・空セルを作ろうとすると、正しい Excel ファイルが出来ないようなので、
　空セルには「＿」を入れるようにしている。ちょっとダサいのだけど・・・

＜参考＞
■ JavaScriptでXLSX形式を扱う「XLSX.js」- MOONGIFT
http://www.moongift.jp/2012/10/20121017-3/

■ stephen-hardy_xlsx.js - GitHub
https://github.com/stephen-hardy/xlsx.js

■ Edit fiddle - JSFiddle
http://jsfiddle.net/innovatejs/ueETX/


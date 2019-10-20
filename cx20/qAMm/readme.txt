Canvas でベクターフォントを使って文字を描いてみるテスト

＜対応した点＞
・HTML5 Canvas にベクターフォントで文字を描画するよう対応
　フォントは
　■ Hershey Vector Font - Roman characters
　http://paulbourke.net/dataformats/hershey/
　の「Japanese character set（http://paulbourke.net/dataformats/hershey/japanese.gz）」をお借りしました。

＜変更履歴＞
2015/03/29 文字の最後に余分な線が入るケースがあった為、ctx.closePath() の呼び出しを削除。
2015/03/28 新規作成

＜参考＞
■ Hershey Vector Font
http://paulbourke.net/dataformats/hershey/

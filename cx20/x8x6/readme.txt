音楽に合わせてドット絵を震わせてみるテスト

＜対応した点＞
・グラフの代わりにドット絵を描画するよう変更。
・Web Audio API 仕様変更に伴う対応（Chroe 36.0/Firefox 31.0 にて動作確認）
　＜変更箇所＞
　・webkitAudioContext() → AudioContext() 
　・createGainNode() → createGain()
　・noteOn() → start()
　・noteOff() → stop()

＜変更履歴＞
2014/08/02 Web Audio API 仕様変更に伴う対応（Chroe 36.0/Firefox 31.0 にて動作確認）
2013/09/08 初版

＜参考＞
■ three.js でドットを回転するテスト - jsdo.it
http://jsdo.it/cx20/bv1B

Three.js で音楽のビジュアライズを試してみるテスト

＜対応した点＞
・リアルタイム波形表示処理を「2D」（Canvas）→「3D」（Three.js）に移植。
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
■ Web Audio APIで音楽のリアルタイム波形表示
http://jsdo.it/ryoheycc/tk3X

■ Three.js でリサージュ図形を書いてみるテスト
http://jsdo.it/cx20/khMp

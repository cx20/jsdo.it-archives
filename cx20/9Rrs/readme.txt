Three.js で音楽のビジュアライズを試してみるテスト（その４）

＜対応した点＞
・TimeDomainData と FrequencyData の両方を表示するよう対応。
　getByteTimeDomainData(Uint8Array array) … Uint8Array に信号の生データを取得する。
　getByteFrequencyData(Uint8Array array) … Unit8Array にスペクトル情報を取得する。
・「stop」ボタンを追加。

＜変更履歴＞
2015/03/20 音声データをogg形式→mp3形式に変更
2014-08-03 初版

＜参考＞
■ Canvas で音楽のビジュアライズを試してみるテスト（その２）
http://jsdo.it/cx20/etk3

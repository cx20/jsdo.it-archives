Canvas で音楽のビジュアライズを試してみるテスト

＜対応した点＞
・TimeDomainData と FrequencyData の両方を表示するよう対応。
　getByteTimeDomainData(Uint8Array array) … Uint8Array に信号の生データを取得する。
　getByteFrequencyData(Uint8Array array) … Unit8Array にスペクトル情報を取得する。

＜参考＞
■ Web Audio APIについて（３）「音楽データを可視化する」 - ハードコイルド・ワンダーランド
http://weathercook.hatenadiary.jp/entry/20111206/1323183519

■ Web Audio API 解説 - 12.アナライザーの使い方 g200kg Music & Software
http://www.g200kg.com/jp/docs/webaudio/analyser.html

＜関連＞
■ forked: drawTimeDomainData
http://jsdo.it/cx20/hVXk

■ forked: drawFrequencyData
http://jsdo.it/cx20/8Bp5

■ Three.js で音楽のビジュアライズを試してみるテスト
http://jsdo.it/cx20/qNBt


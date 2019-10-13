MMLEmitter で MML を試してみるテスト（その２）

楽器の波形が三角波になっているか確認してみました。

osc.type = "triangle";

＜対応した点＞
・MML の再生結果を Canvas を用いた簡易ビジュアライザで表示するよう対応。
・波形の形が分かるようテンポ指定を「t200」→「t20」に変更。

＜変更履歴＞
2014/08/20 ライブラリ名変更「wamml」→「MMLEmitter」に伴う対応
2014/08/19 新規作成

＜参考＞
■ Web Audio API用のMMLイベントシーケンサー wamml です - 音の鳴るブログ
http://mohayonao.hatenablog.com/entry/2014/08/18/135210

＜関連＞
■ Canvas で音楽のビジュアライズを試してみるテスト（その２）
http://jsdo.it/cx20/etk3

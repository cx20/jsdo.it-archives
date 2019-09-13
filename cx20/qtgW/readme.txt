[簡易版] WebGL で地理院地図3Dデータをプロットしてみるテスト（HeightMap 編）

＜対応した点＞
・HeightMap データを用いて、データを表示するよう対応。
　
　＜ファイルサイズの違い＞
　fuji.csv … 430 KB
　fuji.png … 16 KB

＜Height Map 作成手順＞
1. 地理院地図３Dサイトより CSV データを入手
　■ 地理院地図３D
　http://cyberjapandata.gsi.go.jp/3d/

　→ [3Dデータをダウンロードする] - [WebGL用ファイル] に含まれる「dem.csv」を参照

2. 変換ツールにて、Height Map 画像を作成
　■ 標高CSV→Height Map 変換ツール（仮）
　http://jsdo.it/cx20/9DjJ

＜参考＞
■ Babylon.js で国土地理院のデータを表示してみるテスト
http://jsdo.it/cx20/cERE

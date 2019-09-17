Babylon.js で国土地理院のデータを表示してみるテスト

＜対応した点＞
・自作の変換ツールで作った Height Map を用いて、表示するよう対応。
・回転するよう対応

＜Height Map 作成手順＞
1. 地理院地図３Dサイトより CSV データを入手
　■ 地理院地図３D
　http://cyberjapandata.gsi.go.jp/3d/

　→ [3Dデータをダウンロードする] - [WebGL用ファイル] に含まれる「dem.csv」を参照

2. 変換ツールにて、Height Map 画像を作成
　■ 標高CSV→Height Map 変換ツール（仮）
　http://jsdo.it/cx20/9DjJ

＜参考＞
■ 14 Height map - BabylonJS Babylon.js Wiki
https://github.com/BabylonJS/Babylon.js/wiki/14-Height-map

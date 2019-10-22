九州付近の地図に震度データを合成してみる

正確な情報については各情報提供元を参照願います。

＜対応した点＞
・Cesium.js でなく Three.js を使用して3Dデータを表示するよう対応。
・3Dデータは国土地理院の3D地図よりCSVデータをHeightmap形式に変換して使用（容量節約の為）
・地下のイメージが分かるよう透過およびワイヤフレームにて表示
・震度データは防災科学技術研究所のHi-netのものを使用

＜情報源＞
3Dデータ：国土地理院
通常地図：国土地理院
空撮写真：Google, ZENRIN
中央構造線：Wikipedia
地質図&活断層：地質調査総合センター 地質図Navi
布田川・日奈久断層帯：Wikipedia
九州の地表の動き：京都大防災研究所 / 朝日新聞

＜震度データ＞
防災科学技術研究所 Hi-net 高感度地震観測網 気象庁一元化処理 震源リスト
期間：2016/04/14 21:00 - 2016/04/17 20:00

＜凡例＞
M5.0以上 ：赤
M3.0～5.0：オレンジ
M1.0～3.0：黄色

＜参考＞
■ 地理院地図３D
http://cyberjapandata.gsi.go.jp/3d/index.html
■ 3D地図に震度データを合成してみる（熊本周辺）
http://jsdo.it/cx20/0MBc
■ 防災科学技術研究所 Hi-net 高感度地震観測網（データダウンロードは要ユーザー登録）
http://www.hinet.bosai.go.jp/?LANG=ja
■ 中央構造線 - Wikipedia
https://ja.wikipedia.org/wiki/%E4%B8%AD%E5%A4%AE%E6%A7%8B%E9%80%A0%E7%B7%9A
■ 地質図Navi - 産総研
https://gbank.gsj.jp/geonavi/
■ 布田川・日奈久断層帯 - Wikipedia
https://ja.wikipedia.org/wiki/%E5%B8%83%E7%94%B0%E5%B7%9D%E3%83%BB%E6%97%A5%E5%A5%88%E4%B9%85%E6%96%AD%E5%B1%A4%E5%B8%AF
■ 震源、ひずみ集中帯と重なる　専門家「警戒が必要」：朝日新聞デジタル
http://www.asahi.com/articles/ASJ4K04XDJ4JPLBJ00Z.html

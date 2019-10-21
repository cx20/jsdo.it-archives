スーパーカミオカンデ付近の3Dデータを表示してみる（改2）

＜対応した点＞
・地形（マテリアル）をワイヤフレームでなく半透明で表示してみるよう変更。
　＜設定内容＞
　transparent: true, // 半透明合成のパラメータ
　blending: THREE.NormalBlending, // 半透明合成の方法
　opacity: 0.5, // 透明度

＜情報源＞
3Dデータ：国土地理院
通常地図：国土地理院
空撮写真：Google, ZENRIN

＜参考＞
■ Webグラフィックをハックする（5）：多彩な表現力のWebGLを扱いやすくする「Three.js」 (3/5) - ＠IT
http://www.atmarkit.co.jp/ait/articles/1210/04/news142_3.html

■ ノーベル物理学賞の梶田隆章さんが研究　スーパーカミオカンデとは？ - withnews（ウィズニュース）
http://withnews.jp/article/f0151006003qq000000000000000G0010901qq000012591A

■ スーパーカミオカンデ 公式ホームページ
http://www-sk.icrr.u-tokyo.ac.jp/sk/

■ 地理院地図３D
http://cyberjapandata.gsi.go.jp/3d/index.html

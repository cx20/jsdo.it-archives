Three.js でドット絵を回転するテスト（その４）

読み込みが遅いのでしばらくお待ちください。

＜対応した点＞
・爪楊枝を THREE.CylinderGeometry() にて実装
・立体っぽくなるよう凹凸を追加
・高速化の為、色毎に THREE.GeometryUtils.merge() を実施

＜対応できていない点＞
・あまり爪楊枝っぽく見えない気が。。。
・肝心のキャラクタ部分が立体に出来ていない。

＜参考＞
■ 爪楊枝約1万4000本で再現した「スーパーマリオブラザーズ」タイトル画面が職人技 - ねとらぼ
http://nlab.itmedia.co.jp/nl/articles/1504/04/news016.html

＜関連＞
■ Three.js + LiquidFun.js でドット絵を落下させてみるテスト（その３）
http://jsdo.it/cx20/rCWX

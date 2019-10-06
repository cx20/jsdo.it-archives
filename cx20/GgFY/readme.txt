Three.js + CSS3DRenderer でドット絵を表示してみるテスト

＜対応した点＞
・WebGL Renderer → CSS 3D Renderer に変更。

＜確認した環境＞
[OK] Windows 10 Build 10240 + Chrome 48.0.2564.97 m
[OK] Windows 10 Build 10240 + Firefox 44.0
[NG] Windows 10 Build 10240 + IE 11.0.10240.16644（preserve-3d 未対応の為）
[△] Windows 10 Build 10240 + Edge 20.10240.16384.0（透過処理 NG）
[OK] Windows 10 Build 14251 + Edge 28.14251.10000.0（透過処理 OK）

＜参考＞
■ voxel.css でドット絵を描いてみるテスト
http://jsdo.it/cx20/uwAa

■ 段ボール箱でドット絵を作るテスト（CSS3DRenderer版）
http://jsdo.it/cx20/A0Fu

■ スマホでも動く物理演算で転がる3Dサイコロを作ったのでその解説 - CSS-EBLOG
http://css-eblog.com/3d/css3drenderer-dice.html

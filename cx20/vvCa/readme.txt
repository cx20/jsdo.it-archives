[WebGL] three.js を試してみるテスト（組み込み関数編）

＜対応した点＞
・three.js で THREE.Shape() を使用してポリゴンを描くよう対応。
　var shape = new THREE.Shape();
　shape.moveTo(   0, 0.5 ); // v0
　shape.lineTo(-0.5,-0.5 ); // v1
　shape.lineTo( 0.5,-0.5 ); // v2
　shape.lineTo(   0, 0.5 ); // v0

＜参考＞
■ [WebGL] three.js を試してみるテスト（BufferGeometry編）
http://jsdo.it/cx20/yCyD

■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807

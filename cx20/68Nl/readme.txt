Matter.js + Three.js でドット絵を物理演算してみるテスト（その２）

＜対応した点＞
・全体的にチョークと黒板っぽくなるよう色を変更
・形もチョークっぽくなるよう調整。
　THREE.BoxGeometry(）→ THREE.CylinderGeometry()
・物理演算の処理を□→○に変更
　Bodies.rectangle() → Bodies.circle()

＜参考＞
■ Matter.js でドット絵を物理演算してみるテスト（その４）
http://jsdo.it/cx20/uTss

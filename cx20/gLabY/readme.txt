Three.js + Oimo.js でポッキーを落下させてみるテスト（その３）

ポッキーが割り箸っぽかった為、形を修正。

＜対応した点＞
・BoxGeometry → CylinderGeometry を使うよう修正。
・OIMO.Body の type:'cylinder' で物理演算を行うよう合わせて対応。

＜参考＞
■ Three.js　CylinderGeometry（円柱）
http://gupuru.hatenablog.jp/entry/2013/12/15/204613

■ Three.js + Oimo.js で六角形の箱を落下させてみるテスト
http://jsdo.it/cx20/pd9Y


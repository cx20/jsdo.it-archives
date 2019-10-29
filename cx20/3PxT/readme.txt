PlayCanvas でゴゴゴを落下させてみるテスト

＜対応した点＞
・落下させるオブジェクトがゴゴゴになるよう修正

＜対応できていない点＞
・物理演算しているのは、ベースとなっている box だけで、各パーツは物理演算してません。。。
　＜コードの概要＞
　// ベースとなるオブジェクト
　var boxTemplate = new pc.fw.Entity();
　application.context.systems.model.addComponent(boxTemplate, {
　　　type: "box",
　　　castShadows: true,
　　　enabled: false // 非表示
　});
　// ベースとなるオブジェクトにゴゴゴとなるようパーツを追加
　boxTemplate.addChild( part0 );
　boxTemplate.addChild( part1 );
　boxTemplate.addChild( part2 );
　boxTemplate.addChild( part3 );
　boxTemplate.addChild( part4 );

＜○○でゴゴゴを落下させてみるシリーズ＞
■ Three.js + Oimo.js でゴゴゴを落下させてみるテスト
http://jsdo.it/cx20/yYRM

■ Three.js + Cannon.js でゴゴゴを落下させてみるテスト
http://jsdo.it/cx20/7lgA

■ Babylon.js + Cannon.js でゴゴゴを落下させてみるテスト
http://jsdo.it/cx20/kUd3

■ PlayCanvas でゴゴゴを落下させてみるテスト
http://jsdo.it/cx20/3PxT

■ Matter.js でゴゴゴを物理演算してみるテスト
http://jsdo.it/cx20/dJbc

■ 雲の中でゴゴゴを落下させてみるテスト
http://jsdo.it/cx20/lJhf

■ GLSL ray marching でゴゴゴを動かしてみるテスト
http://jsdo.it/cx20/hMvj

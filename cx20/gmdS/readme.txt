PlayCanvas で碁石を落下させてみるテスト

Google ロゴを見ていて、なんとなく。。。

＜対応した点＞
・球体を碁石っぽくなるよう高さを調整。
　sphereTemplate.setLocalScale( 0.5, 0.25, 0.5 );

＜対応できていない点＞
・テクスチャの使い方が分からなかった為、
　碁盤のマス目は組み込みオブジェクトの「Box」を引き延ばして線のかわりに配置していますｗ

＜参考＞
■ 本因坊秀策生誕 185 周年
http://www.google.com/doodles/honinbo-shusakus-185th-birthday

■ RIGIDBODY PHYSICS - FALLING SHAPES
http://playcanvas.github.io/#physics/falling_shapes/index.html

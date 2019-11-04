Three.js + Oimo.js でゴゴゴを落下させてみるテスト

＜対応した点＞
・椅子をゴゴゴに変更
　＜椅子＞
　types = [ 'box', 'box', 'box', 'box', 'box', 'box', 'box', 'box' ];
　sizes = [ 30,5,30,  4,30,4,  4,30,4,  4,30,4,  4,30,4,  4,30,4,  4,30,4,  23,10,3 ];
　positions = [ 0,0,0,  12,-16,12,  -12,-16,12,  12,-16,-12,  -12,-16,-12,  12,16,-12,  -12,16,-12,  0,25,-12 ];
　
　＜ゴゴゴ＞
　types = [ 'box', 'box', 'box', 'box', 'box' ];
　sizes = [ 30,5,5,  5,30,5, 30,5,5, 5,10,10, 5,10,10 ];
　positions = [ 0,-15,0, 15,0,0, 0,15,0, 20,15,0, 25,15,0 ];

・Canvas を使ったテクスチャを格子模様から単色に変更

＜○○でゴゴゴを落下させてみるシリーズ＞
■ Three.js + Oimo.js でゴゴゴを落下させてみるテスト
http://jsdo.it/cx20/yYRM

■ Three.js + Cannon.js でゴゴゴを落下させてみるテスト
http://jsdo.it/cx20/7lgA

■ Babylon.js + Cannon.js でゴゴゴを落下させてみるテスト
http://jsdo.it/cx20/kUd3

■ Matter.js でゴゴゴを物理演算してみるテスト
http://jsdo.it/cx20/dJbc

■ 雲の中でゴゴゴを落下させてみるテスト
http://jsdo.it/cx20/lJhf

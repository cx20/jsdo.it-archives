texgen.js を試してみるテスト（その４）

＜対応した点＞
・texgen.js の組み込み関数である Rect() を試してみた。
　.add( new TG.Rect().position( 0,  0).size(32, 32).color( 1.0, 0.0, 0.0 ) )
　.add( new TG.Rect().position(32, 32).size(32, 32).color( 0.0, 1.0, 0.0 ) )
　.add( new TG.Rect().position(64, 64).size(32, 32).color( 0.0, 0.0, 1.0 ) )

＜参考＞
■ mrdoob/texgen.js
https://github.com/mrdoob/texgen.js

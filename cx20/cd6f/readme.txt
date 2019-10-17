texgen.js を試してみるテスト（その２）

＜対応した点＞
・texgen.js の組み込み関数である Noise() を試してみた。
　.add( new TG.Noise().color( 1.0, 0.0, 0.0 ) )
　.add( new TG.Noise().color( 0.0, 1.0, 0.0 ) )
　.add( new TG.Noise().color( 0.0, 0.0, 1.0 ) )

＜参考＞
■ mrdoob/texgen.js
https://github.com/mrdoob/texgen.js

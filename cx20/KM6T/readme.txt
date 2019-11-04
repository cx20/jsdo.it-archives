Babylon.js + Oimo.js で箱にボールを入れてみるテスト（その２改）（調整中）

＜対応した点＞
・ライブラリを最新化（Babylon.js v2.1→v3.1）
・テクスチャの仕様が変わったことによる対応。
・ProceduralTextures がプラグイン扱いになったことによる対応
・ボールに影を付けるよう対応。

＜対応できていない点＞
・しばらく（数分間）放置するとエラーになる模様。。。

Oimo.js:11700 
Uncaught TypeError: Cannot read property 'pair' of undefined
　　at OIMO.SAPBroadPhase.collectPairs (VM620 Oimo.js:11700)
　　at OIMO.SAPBroadPhase.detectPairs (VM620 Oimo.js:11222)
　　at OIMO.World.step (VM620 Oimo.js:449)
　　at t.executeStep (VM618 babylon.js:40)
　　at t._step (VM618 babylon.js:40)
　　at i.render (VM618 babylon.js:12)
　　at KM6T:132
　　at n._renderLoop (VM618 babylon.js:5)

＜参考＞
■ 各種 WebGLライブラリと3D物理演算ライブラリの組み合わせ一覧
http://qiita.com/cx20/items/3ebed669fb9c9e797935

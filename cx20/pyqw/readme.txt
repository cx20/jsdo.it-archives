Three.js + ShaderMaterial を試してみるテスト

three.js のサンプル
　■ three.js webgl - materials - shaders [custom]
　http://threejs.org/examples/webgl_shader2.html
を少し改造してみました。

＜対応した点＞
・コードの簡略化の為、ライブラリの依存関係を削除（Detector.js / Stats.js）
・fragment_shader1～4 → fragment_shader1 のみを表示するよう変更
・GLSL のコードを GLSL Sandbox より移植
　＜GLSL Sandbox より移植する際の変更点＞
　変更前）vec2 position = ( gl_FragCoord.xy / resolution.xy ) / 4.0;
　変更後）vec2 position = vUv;

＜参考＞
■ three.js webgl - materials - shaders [custom]
http://threejs.org/examples/webgl_shader2.html

■ GLSL でドット絵を描いてみるテスト - CX's Hatena Blog
http://cx20.hatenablog.com/entry/2014/03/16/224946

■ ドット絵をうにょーんとジャンプさせてみる
https://glsl.heroku.com/e#15569.0

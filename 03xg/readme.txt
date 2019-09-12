[WebGL] Grimoire.js で動画テクスチャを試してみるテスト

＜対応した点＞
・テクスチャを動画テクスチャに変更
　変更前）texture="http://jsrun.it/assets/6/8/Z/v/68Zv6.jpg"/
　変更後）<video-texture src="http://jsrun.it/assets/G/B/h/x/GBhxi" currentTime="10"/>
　　　　　<mesh geometry="sphere" texture="query(video-texture)" />

＜素材＞
Credit: NASA/JPL/University of Arizona

＜更新履歴＞
2017/04/07 ライブラリ更新。メモリリーク改善。grimoire-preset-basic.js v1.9.22
2017/04/06 ライブラリ更新。動画テクスチャがループするよう改善。grimoire-preset-basic.js v1.9.20
2017/03/25 初版。動画テクスチャがループしない。grimoire-preset-basic.js v1.9.8 

＜参考＞
■ File_PIA02863 - Jupiter surface motion animation.gif - Wikipedia, the free encyclopedia
https://en.wikipedia.org/wiki/File:PIA02863_-_Jupiter_surface_motion_animation.gif
■ Catalog Page for PIA02863
http://photojournal.jpl.nasa.gov/catalog/PIA02863
■ Gfycat - jiffier gifs（アニメーションgif→webm,mp4 変換）
http://gfycat.com/
■ Fun With Live Video in WebGL - Learning Three.js
http://learningthreejs.com/blog/2012/02/07/live-video-in-webgl/
■ Three.js で木星を表示させてみるテスト（その２）
http://jsdo.it/cx20/0h13

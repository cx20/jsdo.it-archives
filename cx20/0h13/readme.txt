Three.js で木星を表示させてみるテスト（その２）

時々見える黒い丸は木星の衛星イオとエウロパのようです。

＜対応した点＞
・テクスチャに動画テクスチャを用いるよう対応
　アニメーションgif を MP4 形式に変換しビデオテクスチャとして使用

＜テストした環境＞
[OK] Windows 10 Build 10240 + Chrome 46.0.2490.86 m
[OK] Windows 10 Build 10240 + Firefox 42.0
[NG] Windows 10 Build 10240 + IE 11.0.10240.16590
[NG] Windows 10 Build 10240 + Edge 20.10240.16384.0
[NG] Windows 10 Build 10586 + IE 11.0.10586.0
[OK] Windows 10 Build 10586 + Edge 25.10586.0.0

＜素材＞
Credit: NASA/JPL/University of Arizona

＜参考＞
■ File_PIA02863 - Jupiter surface motion animation.gif - Wikipedia, the free encyclopedia
https://en.wikipedia.org/wiki/File:PIA02863_-_Jupiter_surface_motion_animation.gif
■ Catalog Page for PIA02863
http://photojournal.jpl.nasa.gov/catalog/PIA02863
■ Gfycat - jiffier gifs（アニメーションgif→webm,mp4 変換）
http://gfycat.com/
■ Fun With Live Video in WebGL - Learning Three.js
http://learningthreejs.com/blog/2012/02/07/live-video-in-webgl/
■ Three.jsで動画をテクスチャに指定する - Qiita
http://qiita.com/edo_m18/items/b697cba36de168e8a608
■ Three.js でビデオを表示させてみるテスト（その２）
http://jsdo.it/cx20/hTIt

＜IE11 のコンソールに出力されたエラー内容＞
WEBGL11072: INVALID_VALUE: texImage2D: このテクスチャ ソースはサポートされていません
WEBGL11098: drawArrays: テクスチャが 2 のべき乗以外のテクスチャであるか、または完全なミップマップ状態ではありません


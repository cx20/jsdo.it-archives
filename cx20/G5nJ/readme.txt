[WebGL] GLBoost + glTF Loader を試してみるテスト（その１）

GLBoost で glTF ファイルの読み込み機能が開発中らしいので試してみました。

＜対応した点＞
・最新の GLBoost を用い glTF ファイルを読み込むよう対応。
・glTF ファイルは glTF-Embedded のものを使用（Data URI Scheme を使用）

＜対応できていない点＞
・Safari だと Data URI Scheme で指定したデータが読み込めない模様？
　→ Safari でも Babylon.js では同じファイルが読み込めるようなので、要調査。

＜確認した環境＞
[OK] Windows 10 + Chrome 48.0.2564.109 m
[OK] Windows 10 + Firefox 44.0.2
[OK] Windows 10 + Microsoft Edge 25.10586.0.0(EdgeHTML 13.10586)
[OK] Windows 10 + 11.103.10586.0
[NG] Mac OSX 10.10.5 + Safari 601.2.7
[OK] Mac OSX 10.10.5 + Firefox 38.0
[OK] Mac OSX 10.10.5 + Chrome 47.0
[NG] iPhone 9.2.1 + Safari 601.1

＜変更履歴＞
2016/02/17 ライブラリの最新化で既定の角度単位がradian→degreeに変更された為、対応。
2016/02/10 初版作成。

＜参考＞
■ emadurandal/GLBoost
https://github.com/emadurandal/GLBoost
■ GLBoost glTF Loading example
https://rawcdn.githack.com/emadurandal/GLBoost/master/examples/standalone/loading_gltf/index.html
■ glTF/sampleModels/box/glTF-Embedded/
https://github.com/KhronosGroup/glTF/tree/master/sampleModels/Box/glTF-Embedded

＜関連＞
■ [WebGL] Babylon.js + glTFFileLoader を試してみるテスト
http://jsdo.it/cx20/yptM
■ three.js で glTF 形式のデータを表示してみるテスト（その２）
http://jsdo.it/cx20/cpkp
■ [WebGL] xeoEngine + glTF ファイルを試してみるテスト
http://jsdo.it/cx20/q6In
■ [WebGL] GLBoost + glTF Loader を試してみるテスト（その１）
http://jsdo.it/cx20/G5nJ

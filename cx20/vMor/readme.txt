Babylon.js で３次元リサージュ図形を描いてみるテスト

＜対応した点＞
・パラメータを変えることで様々な図形を描くよう対応
　設定例）
　x = sin(ω1t + α)
　y = sin(ω2t + β)
　z = sin(ω3t + γ)

・リサージュ図形の回転は、BABYLON.ArcRotateCamera() でなく、オブジェクト自体を回転することで対応。
　試したところ、ArcRotateCamera で X 軸回転を 3.14 以上に設定できないことが判明（upperBetaLimit = Math.PI が設定されている）
　恐らく、カメラの可動範囲として制限が入っているのではないかと思われる。

＜参考＞
■ リサジュー曲線によるスクリーンセーバーの作成
http://www.math.ryukoku.ac.jp/~tsutomu/undergraduate/2005/05yuki.pdf

■ [簡易版] WebGL で３次元リサージュ図形を描いてみるテスト
http://jsdo.it/cx20/yoSK

■ 03 Position, Rotation & Scaling · BabylonJS_Babylon.js Wiki
https://github.com/BabylonJS/Babylon.js/wiki/03---Position,-Rotation-&-Scaling

■ 05 Cameras · BabylonJS_Babylon.js Wiki
https://github.com/BabylonJS/Babylon.js/wiki/05-Cameras

■ Babylon.js でドット絵を回転するテスト
http://jsdo.it/cx20/5gwF

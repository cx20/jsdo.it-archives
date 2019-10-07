pixi.js v3 の Particle Container を試してみるテスト

＜v2 での問題点＞
>・new PIXI.Sprite() で生成する際に ① と ② では、② の方が、高速に描画される。
>　① 毎回、異なる色のスプライトを作成（色1,色2,色3,色1,色2,色3,...）… 遅い
>　② 順次連続した色のスプライトを生成（色1,色1,色2,色2,色3,色3,...）… 速い
>　ただし、② の案だと、表示する色が偏ってしまう（最後に描画した色が最前に表示される為）

v2 では ① の方法を用いると、WebGL の draw 呼び出しがスプライト数ぶん発行されるかなり遅かった。
v3 では ① の方法でも draw 呼び出しが1回で済む為、かなり高速化される。

＜対応した点＞
・Sprite を Particle Container を用いて描画するよう対応。

＜参考＞
■ Pixi.js v3 - Goodboy
http://www.goodboydigital.com/pixi-js-v3/

■ pixi.js v3 を試してみるテスト（その３）
http://jsdo.it/cx20/uhVV

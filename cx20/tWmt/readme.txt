pixi.js v3 を試してみるテスト（その２）

v3 で追加された機能の１つ「Alpha Masking」を試してみました。

＜対応した点＞
・Alpha Masking を使うよう対応。

　> var myMaskSprite = new PIXI.Sprite.fromImage('myMask.png');
　> var mySprite = new PIXI.Sprite.fromImage('myAwesomeSprite.png');
　> mySprite.mask = myMaskSprite;

＜参考＞
■ Pixi.js v3 - Goodboy
http://www.goodboydigital.com/pixi-js-v3/

■ Pixi.js Example
http://www.goodboydigital.com/pixijs/masky/


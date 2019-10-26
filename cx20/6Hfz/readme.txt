[簡易版] WebGL 2.0 でテクスチャ付き立方体を回転させてみるテスト
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

＜対応した点＞
・WebGL 2.0 でテクスチャ付き立方体を描くよう対応。
・GLSL ES 3.0 対応として texture2D() → texture() に変更

＜テストした環境＞
・Chrome 45.0.2445.0 canary
・Firefox Developer Edition 40.0a2 (2015-06-22)

＜参考＞
■ WebGL Report 実行結果（WebGL2編） - Qiita
http://qiita.com/cx20/items/455f029cd0e037fecad9

■ [簡易版] WebGL でテクスチャ付き立方体を回転させてみるテスト（glMatrix.js v2.x編）
http://jsdo.it/cx20/jqD6

■ [OpenGL ES 3.0] iOSでテクスチャ貼り付ける
http://kengolab.net/archives/125

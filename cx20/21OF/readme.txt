[WebGL] GLBoost を試してみるテスト（tmlib.js編）（その４）

GLBoost は @emadurandal さんが開発中の玄人向けのWebGLライブラリです。
WebGL 1.0/2.0 対応の他、WebGL 拡張を生かした高速化対応がされているようです。

＜対応した点＞
・tmlib.js + GLBoost にて立方体にテクスチャを貼るよう対応。
・ライブラリ組み込みの行列演算関数を用いて立方体を回転させるよう対応。
・背景色を白色に変更
・ライブラリを最新版に変更
　・IE/Edge/Safari サポートの追加
　・WebGL 拡張（WEBGL_draw_buffers/OES_vertex_array_object）が未サポート環境でも動作するよう対応。

＜変更履歴＞
2016/01/30 ライブラリを最新化。既定のカリングを無効化。
2016/01/17 ライブラリを最新版に差し替え。mesh → mesh / geometry に機能分割。
2015/12/11 tm.geom.Vector3 → GLBoost.Vector3 に変更。
2015/12/07 ライブラリを最新版に差し替え。IE/Edge/Safari サポートの追加。
2015/12/05 初版作成

＜参考＞
■ emadurandal/GLBoost
https://github.com/emadurandal/GLBoost

■ [簡易版] WebGL でテクスチャ付き立方体を回転させてみるテスト（glMatrix.js v2.2.2編）
http://jsdo.it/cx20/jqD6

■ 各種 WebGL ライブラリで基本図形を表示してみる
http://qiita.com/cx20/items/0fa19c96aa6470d98807

■ Microsoft Edge（2015年11月）における WebGL 対応状況
http://qiita.com/cx20/items/9c572f86790667c3fc8a

[WebGL] Grimoire.js でポストエフェクトを試してみるテスト

＜対応した点＞
　<renderer>
　　<render-buffer name="rb"/>                  … レンダーバッファを用意する
　　<texture-buffer name="bb1"/>                … バックバッファを用意する
　　<render-scene out="bb1" depthBuffer="rb"/>  … シーンをバックバッファに描画する
　　<render-quad material="new(postEffect)" source="backbuffer(bb1)" out="default"/> … ポストエフェクトを行った結果を画面に描画する
　</renderer>

＜参考情報＞
■ ポストエフェクトを作成する - Grimoire.js
https://grimoire.gl/tutorial/12-create-post-effect.html
■ ポストエフェクトする - Qiita
http://qiita.com/pnlybubbles/items/c87e8e7466ecdc11a23c
■ [OpenGL] FrameBufferとRenderBufferについてメモ - Qiita
http://qiita.com/edo_m18/items/95483cabf50494f53bb5

■ GLSL で画像にフィルタをかけてみるテスト（その４）/ モノクロ
http://jsdo.it/cx20/o45z
■ GLSL で画像にフィルタをかけてみるテスト（その５改）/ モザイク
http://jsdo.it/cx20/8lzU

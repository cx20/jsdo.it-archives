GLSL で画像にフィルタをかけてみるテスト（その２）

＜対応した点＞
・uniform 変数に time / mouse / resolution を追加。
　uniform float time;
　uniform vec2 mouse;
　uniform vec2 resolution;
・テクスチャ画像に基本図形を合成。

＜参考＞
■ GLSLだけで図形を描く - Qiita
http://qiita.com/edo_m18/items/85d5c0ca5bdf0ed159e4

■ [連載]やってみれば超簡単！ WebGL と GLSL で始める、はじめてのシェーダコーディング（９） - Qiita
http://qiita.com/doxas/items/56170e6f1e7fa8f46886

■ 時間経過とマウスカーソル座標 - wgld.org
http://wgld.org/d/glsl/g002.html

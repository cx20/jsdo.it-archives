GLSL で正弦波を描いてみるテスト

＜対応した点＞
・数式をサインカーブに変更

＜追記＞
IE11 で表示できるよう、以下変更しました。

変更前） var gl = c.getContext('webgl');
変更後） var gl = c.getContext('webgl') || c.getContext('experimental-webgl');

＜参考＞
■ [連載]やってみれば超簡単！ WebGL と GLSL で始める、はじめてのシェーダコーディング（２）
http://qiita.com/doxas/items/f34325520d1aa5af4692

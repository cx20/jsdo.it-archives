GLSL で正弦波を描いてみるテスト（その４）

＜対応した点＞
・縦軸と横軸のグラフの交点を青でプロットするよう対応

＜追記＞
IE11 で表示できるよう、以下変更しました。

変更前） var gl = c.getContext('webgl');
変更後） var gl = c.getContext('webgl') || c.getContext('experimental-webgl');

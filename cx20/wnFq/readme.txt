GLSL でリサージュ図形を描いてみるテスト（その３）

＜対応した点＞
・リサージュ図形の比率を変更

＜追記＞
IE11 で表示できるよう、以下変更しました。

変更前） var gl = c.getContext('webgl');
変更後） var gl = c.getContext('webgl') || c.getContext('experimental-webgl');

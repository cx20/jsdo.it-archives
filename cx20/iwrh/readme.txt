GLSL で正弦波を描いてみるテスト（その２）

＜対応した点＞
・方眼用紙を追加

＜追記＞
IE11 で表示できるよう、以下変更しました。

変更前） var gl = c.getContext('webgl');
変更後） var gl = c.getContext('webgl') || c.getContext('experimental-webgl');

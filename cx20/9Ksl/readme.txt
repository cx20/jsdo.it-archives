GLSL でリサージュ図形を描いてみるテスト（その２）

＜対応した点＞
・@h_doxas さんのコードをベースに変更。
・色付けを HSV に変更

＜追記＞
IE11 で表示できるよう、以下変更しました。

変更前） var gl = c.getContext('webgl');
変更後） var gl = c.getContext('webgl') || c.getContext('experimental-webgl');

＜参考＞
■ GLSL 10分クッキング ＞ http://goo.gl/kfGUpQ  - @h_doxas
https://twitter.com/h_doxas/status/523199760434724864


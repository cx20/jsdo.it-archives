GLSL でリサージュ図形を描いてみるテスト

＜対応した点＞
・サインカーブからリサージュ図形になるよう変更。

＜対応できていない点＞
・サインカーブ描画時のようにループ無しでリサージュ図形を描きたかったが方法が分からなかった。。。

＜追記＞
IE11 で表示できるよう、以下変更しました。

変更前） var gl = c.getContext('webgl');
変更後） var gl = c.getContext('webgl') || c.getContext('experimental-webgl');

＜参考＞
■ GLSL で光の点をぐるぐるアニメーションさせるやつ書いてみた - 凹みTips
http://tips.hecomi.com/entry/20130323/1364046980

■ Canvas でリサージュ図形を描いてみるテスト
http://jsdo.it/cx20/fO6R

■ リサジュー図形 - Wikipedia
http://ja.wikipedia.org/wiki/%E3%83%AA%E3%82%B5%E3%82%B8%E3%83%A5%E3%83%BC%E5%9B%B3%E5%BD%A2

■ [連載]やってみれば超簡単！ WebGL と GLSL で始める、はじめてのシェーダコーディング（３）
http://qiita.com/doxas/items/7e830faefdf14189a7a4

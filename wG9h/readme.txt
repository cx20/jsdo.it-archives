[WebGL] Grimoire.js でハーモノグラフみたいな何かを描いてみるテスト（シェーダ編）

＜対応した点＞
・GLSL の頂点シェーダを用いて座標を計算させるよう対応。
・リサージュ図形からハーモノグラフに変更
　x = A1 * sin(f1 * t + p1) * exp(-d1 * t) + A2 * sin(f2 * t + p2) * exp(-d2 * t)
　y = A3 * sin(f3 * t + p3) * exp(-d3 * t) + A4 * sin(f4 * t + p4) * exp(-d4 * t)

＜対応出来ていない点＞
・本サンプルのシェーダーでにはランダム化処理が入っていない為、厳密にはハーモノグラフとは異なります。

　f1 = sin(_time/1000.0);
　f2 = mod(_time/1000.0, 0.5);
　f3 = mod(_time/1000.0, 1.0);
　f4 = 1.0;
　p1 = _time/1000.0;

　下記のランダム化処理を JavaScript 側で算出し、uniform 変数で渡すなどの対応が必要。
　function randomHarmonograph() {
　　f1 = (f1 + Math.random() / 40) % 10;
　　f2 = (f2 + Math.random() / 40) % 10;
　　f3 = (f3 + Math.random() / 40) % 10;
　　f4 = (f4 + Math.random() / 40) % 10;
　　p1 += (Math.PI*2 * 0.5 / 360);
　}

＜変更履歴＞
2017/07/29 grimoire-preset-basic.js v1.8.6 → v1.10.19 に変更。スクリプトタグに記載したシェーダをマテリアル名で参照するよう対応。
2017/05/21 初版作成

＜参考＞
■ [簡易版] WebGL でハーモノグラフみたいな何かを描いてみるテスト
http://jsdo.it/cx20/synR

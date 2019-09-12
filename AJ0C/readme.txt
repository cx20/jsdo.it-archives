[WebGL] Grimoire.js でハーモノグラフを描いてみるテスト（JS編）

＜対応した点＞
・VBO を JavaScript から操作することによりハーモノグラフを描くよう対応
　x = A1 * sin(f1 * t + p1) * exp(-d1 * t) + A2 * sin(f2 * t + p2) * exp(-d2 * t)
　y = A3 * sin(f3 * t + p3) * exp(-d3 * t) + A4 * sin(f4 * t + p4) * exp(-d4 * t)

・ライブラリを grimoirejs-preset-basic v1.8.6 → 1.10.19 に変更
　v1.9.28 では getGeometry() が Promise を返却するようになっている為、VBO を JS 側で更新する場合は注意。

　＜v1.8.6 の VBO の更新方法＞
　$update: function () {
　　var gr = this.companion.get("GeometryRegistory");
　　var geometry = gr.getGeometry("c1");
　　var buffer = geometry.buffers[geometry.accessors["POSITION"].bufferIndex];
　　buffer.update(positions);
　}
　
　＜v1.9.28 の VBO の更新方法＞
　$update: function () {
　　var gr = this.companion.get("GeometryRegistory");
　　var geometryPromise = gr.getGeometry("c1");
　　geometryPromise.then(geometry=>{
　　　var buffer = geometry.buffers[geometry.accessors["POSITION"].bufferIndex];
　　　buffer.update(positions);
　　});
　}

＜変更履歴＞
2017/07/29 grimoire-preset-basic.js v1.8.6 → v1.10.19 に変更。スクリプトタグに記載したシェーダをマテリアル名で参照するよう対応。
2017/05/20 初版作成

＜参考＞
■ [WebGL] lightgl.js でハーモノグラフを描いてみるテスト
http://jsdo.it/cx20/ry8D

■ [WebGL] Grimoire.js でハーモノグラフを描いてみるテスト（シェーダ編）
http://jsdo.it/cx20/oH1o

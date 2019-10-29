[WebGL] Grimoire.js でクリフォードアトラクターを描いてみるテスト

＜対応した点＞
・kos さんの clifford attractor サンプルを Grimoire.js 版に移植
・z軸の描画と回転を追加。
・マウスによる回転機能を追加。

・ライブラリを grimoirejs-preset-basic v1.8.6 → 1.9.28 に変更
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
 
　もしくは `async`や`await`をサポートしているのなら、下記の書き方も可能。
　$update: async function(){
　　var gr = this.companion.get("GeometryRegistory");
　　var geometry = await gr.getGeometry("c1");
　　var buffer = geometry.buffers[geometry.accessors["POSITION"].bufferIndex];
　　buffer.update(positions);
　}


＜参考＞
■ clifford attractor WebGL版
http://jsdo.it/kos/Coyf

■ [WebGL] lightgl.js でクリフォードアトラクターを描いてみるテスト
http://jsdo.it/cx20/k283

■ Canvas で Clifford Attractor
http://platycerium.sakura.ne.jp/node/755

■ Clifford Attractors
http://paulbourke.net/fractals/clifford/

■ パラメトリック曲面を描くのに適した WebGL ライブラリについて
http://qiita.com/cx20/items/e983572d5dde2fa9a85b

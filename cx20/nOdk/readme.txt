[簡易版] WebGL 2.0 でテクスチャ付き立方体を回転させてみるテスト（VAO編）
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

WebGL 1.0 では拡張機能であった VAO が WebGL 2.0 では標準機能となるようなので試してみました。

＜対応した点＞
・WebGL 2.0 の標準機能である VAO (vertex array object) を使用するよう対応。
　VAO を用いることで、ループ内での煩雑なバインド処理を簡素化できるようです。

　　＜VAO 未使用＞
　　gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
　　gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);
　　gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
　　gl.vertexAttribPointer(aLoc[1], 4, gl.FLOAT, false, 0, 0);
　　gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
　　　　　↓
　　＜VAO 使用＞
　　gl.bindVertexArray(vao);

＜設定方法＞
■ WebGL Report 実行結果（WebGL2編） - Qiita
http://qiita.com/cx20/items/455f029cd0e037fecad9

＜テストした環境＞
[OK] Windows 10 IP + Chrome 43.0.2357.130 m
[OK] Windows 10 IP + Chrome 45.0.2448.0 canary
[OK] Windows 10 IP + Firefox Developer Edition 41.0a2 (2015-07-05)
[NG] Windows 10 IP + Firefox 39.0
→ Firefox 39.0 では gl.createVertexArray() は未実装の模様。

＜参考＞
■ [簡易版] WebGL でテクスチャ付き立方体を回転させてみるテスト（VAO編）
http://jsdo.it/cx20/rkoU

■ wgld.org | WebGL: VAO(vertex array object) |
http://wgld.org/d/webgl/w073.html

■ TojiCode: OES_vertex_array_object extension
http://blog.tojicode.com/2012/10/oesvertexarrayobject-extension.html

GLSL で画像にフィルタをかけてみるテスト（その１４）

＜対応した点＞
・球体にテクスチャを貼るよう対応（Shadertoy の投稿作品（iq's "Screen space bump mapping"）を移植）

＜対応できていない点＞
・bump mapping の処理がうまくいかなかった（dFdx の引数が違う～みたいなエラーが出た）為、該当呼び出し部分は削除しました。

＜参考＞
■ Screen space bump mapping
https://www.shadertoy.com/view/ldSGzR

[WebGL] Grimoire.js で小惑星を表示させてみるテスト（フラットシェーディング編）

＜対応した点＞
・小惑星をフラットシェーディングで描画するよう対応。
　1. OES_standard_derivatives 拡張の有効化
　　 GLExtRequestor.request("OES_standard_derivatives");
　2. シェーダ内で GL_OES_standard_derivatives 拡張の有効化
　　 #extension GL_OES_standard_derivatives : enable
　3. シェーダにフラットシェーディング用のコードを記述
　　　vec3 dx = dFdx(vPosition.xyz);
　　　vec3 dy = dFdy(vPosition.xyz);
　　　vec3 n = normalize(cross(normalize(dx), normalize(dy)));

＜変更履歴＞
2017/07/09 grimoire-preset-basic.js v1.8.6 → v1.10.16 に変更。スクリプトタグに記載したシェーダをマテリアル名で参照するよう対応。
2017/03/20 初版作成

＜参考＞
■ [簡易版] WebGL で小惑星に光を当ててみるテスト（改）
http://jsdo.it/cx20/8hau

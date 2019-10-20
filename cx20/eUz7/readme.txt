[GLSL] Three.js + ParticleSystem で球体にドットを配置してみるテスト（その３改）

＜対応した点＞
・球座標の公式を用いて球の表面のみドットを配置するよう対応。

　■ 極座標系 - Wikipedia
　http://ja.wikipedia.org/wiki/%E6%A5%B5%E5%BA%A7%E6%A8%99%E7%B3%BB
　
　　x = r sinθcosφ
　　y = r sinθsinφ
　　z = r cosθ

＜変更履歴＞
・2015/09/18 ライブラリバージョンを「最新」→「r71」に変更。
・2014/07/23 初版作成

＜参考＞
■ 子供向けにアンパンマンを - ryamadaのコンピュータ・数学メモ
http://d.hatena.ne.jp/ryamada/20130806/1375328142

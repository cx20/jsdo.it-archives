GLSL で画像にフィルタをかけてみるテスト（その５改）

＜対応した点＞
・モザイク処理のコードを圧縮。
　uv = floor(uv * 30.0) / 30.0; とするだけ、モザイク処理がされるらしい。

＜参考＞
■ GLSLでモザイク処理 - Qiita
http://qiita.com/edo_m18/items/d166653ac0dccbc607dc

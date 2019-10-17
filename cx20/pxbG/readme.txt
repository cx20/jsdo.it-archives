GLSL でドット絵を描いてみるテスト（その３）

＜対応した点＞
・１行追加することで、ドット絵を揺らしてみた。
　pos.x += sin((pos.y + time) * 10.0) * 0.01;

＜関連＞
https://glsl.heroku.com/e#14919.0

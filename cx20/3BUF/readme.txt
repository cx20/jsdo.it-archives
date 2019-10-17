GLSL でドット絵を描いてみるテスト（その４）

色々とエフェクトを追加してみた。

＜対応した点＞
・横揺れエフェクト
 　pos.x += sin((pos.y + time) * 10.0) * 0.01;
・縦揺れエフェクト
 　pos.y += cos((pos.x + time) * 10.0) * 0.01;
・マス目エフェクト
 　color *= vec3(clamp( abs(triwave(dposition.x/pixelsize))*3.0 , 0.0 , 1.0 ));
 　color *= vec3(clamp( abs(triwave(dposition.y/pixelsize))*3.0 , 0.0 , 1.0 ));
・ダークネスエフェクト
 　float darkness = sin((position.x/resolution.x)*PI)*sin((position.y/resolution.y)*PI);
 　color *= vec3(clamp( darkness*4.0 ,0.0 ,1.0 ));

＜関連＞
https://glsl.heroku.com/e#14930.0

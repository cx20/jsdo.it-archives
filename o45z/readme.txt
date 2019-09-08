GLSL で画像にフィルタをかけてみるテスト（その４）

＜対応した点＞
・モノクロ写真になるよう変更
　float mono = (color.r + color.g + color.b) / 3.0;
　gl_FragColor = vec4(mono, mono, mono, 1.0);

＜参考＞
■ モノクロ画像
http://d-kami.net/shader/mono.html

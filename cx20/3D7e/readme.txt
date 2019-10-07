[GLSL] Three.js + ParticleSystem でコマアニメしてみるテスト（その６）

※ 本サンプルのコマアニメはスプライトでなく計算で行っています。

＜対応した点＞
・ドット絵でドット絵を描くよう調整
・GLSL の頂点シェーダを用いて Particle をジャンプさせるよう対応
・テクスチャはCanvasで生成するよう対応（画像ファイルを使わないよう変更）

＜対応できていない点＞
・Windows では動作するようですが、Mac だと GLSL のフラグメントシェーダの一部がうまくいかないようです。。。
// 以下コメントアウトした箇所
/*
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    const vec3 fogColor = vec3( 0.0 );

    float fogFactor = smoothstep( 200.0, 600.0, depth );
    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
*/
　
  上記コードは、Three.js サンプルから移植したものだが、確認したところ元となったサンプルも Mac では動作しない模様。。。
  
　■ three.js webgl - custom attributes
　http://threejs.org/examples/webgl_custom_attributes_particles3.html

＜変更履歴＞
・2015/09/18 ライブラリバージョンを「最新」→「r71」に変更。
・2014/12/06 初版作成

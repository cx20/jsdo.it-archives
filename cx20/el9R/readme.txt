[WebGL] Grimoire.js でポストエフェクトを試してみるテスト（その１５）

＜対応した点＞
・Shadertoy の作品を Grimore.js のシェーダに移植
　＜主な対応箇所＞
　mainImage() → main()
　o → gl_FragColor
　fragCoord → gl_FragCoord
　iResolution → _viewportSize
　texture() → texture2D()
　iTime → _time / 1000.0
　iChannel0 → texture

＜参考＞
■ Broken Cam Distortion
https://www.shadertoy.com/view/4dBBRy

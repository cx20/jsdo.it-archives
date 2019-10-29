[WebGL] Grimoire.js で AmbientLight を使ってみるテスト（調整中）

Grimoire.js の次バージョンで AmbientLight が使えるようになるらしいので試してみました。

＜対応した点＞
・Grimoire.js の開発中プラグイン forward-shading.js の AmbientLight を用いてモデルを照らすよう対応。

＜対応できていない点＞
・使用ライブラリを beta 版に変更してみたところ自動回転がされなくなってしまっている模様。。
　Utility.ts:149 
　Uncaught Error: registering component has not 'componentName': Rotate
　　　at Object.assert (Utility.ts:149)
　　　at Function.registerComponent (GrimoireInterfaceImpl.ts:280)
　　　at yQou:79

＜参考＞
■ grimoirejs-forward-shading/src/Components/AmbientLightTypeComponent.ts
https://github.com/GrimoireGL/grimoirejs-forward-shading/blob/core1.0.0/src/Components/AmbientLightTypeComponent.ts
■ GrimoireJS v1.0(beta)の新機能の紹介 - Qiita
https://qiita.com/moajo/items/70036f166e1309ef6ec2

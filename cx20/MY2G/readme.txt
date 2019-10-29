[WebGL] Grimoire.js + OimoPhysics.js で大量のボールを落下させてみるテスト

＜対応した点＞
・大量のボール（1000個）を表示するよう対応。
・stats.js で計測するよう対応。
・Rigidコンポーネントの $update() から stats.js 呼び出すとオブジェクトの個数分、計測処理が呼び出されてしまう為、
　LoopManager から stats.js を呼び出すよう対応。
　＜LoopManager の使い方＞
　1. getComponent で LoopManager コンポーネントを取得
　2．LoopManager コンポーネントの register 関数にて、優先度の高いタスクとして stats.begin() を登録 ※ ループ処理の最初に呼ばれる
　3．LoopManager コンポーネントの register 関数にて、優先度の低いタスクとして stats.end() を登録 ※ ループ処理の最後に呼ばれる

　＜コード概要＞
　const l = gr("*")("goml").get(0).getComponent("LoopManager");
　l.register(()=>stats.begin(), Number.POSITIVE_INFINITY);
　l.register(()=>stats.end(), Number.NEGATIVE_INFINITY);

＜参考＞
■ LoopManagerComponent / register 関数
https://api.grimoire.gl/grimoirejs-fundamental/classes/loopmanagercomponent.html#register

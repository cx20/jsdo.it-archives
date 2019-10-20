Three.js でカメラを２つ使ってみるテスト

＜対応した点＞
・カメラを２つ使うよう対応。
　＜使い方＞
　renderer.autoClear = false;

　camera1 = new THREE.PerspectiveCamera(...);
　camera2 = new THREE.PerspectiveCamera(...);

　// camera1 の viewport を設定
　renderer.setViewport(0, 0, window.innerWidth/2, window.innerHeight );
　renderer.render(scene, camera1);

　// camera2 の viewport を設定
　renderer.setViewport( window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight );
　renderer.render(scene, camera2);

＜参考＞
■ Three.js　２画面表示 - Three.jsを使って、作ってみた
http://gupuru.hatenablog.jp/entry/2013/12/23/203045

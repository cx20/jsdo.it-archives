Three.js で月食っぽいものを表示してみるテスト（改）（調整中）

＜対応した点＞
・PointLight の intensity（光の強さ）をマイナスに設定するよう変更
　変更前）light2 = new THREE.PointLight( new THREE.Color(0x89462e), 2.0);
　変更後）light2 = new THREE.PointLight( new THREE.Color(0x2070d0), -2.0);

＜参考＞
■ Three.js で月食っぽいものを表示してみるテスト（その４）（調整中）
http://jsdo.it/cx20/EkZz

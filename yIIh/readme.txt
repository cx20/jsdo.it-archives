[WebGL] Grimoire.js カメラを回転させてみるテスト（その２）

＜対応した点＞
・カメラの位置を計算で求めるよう対応。
　let x = Math.sin(Math.PI * this.phi / 180) * 30;
　let y = Math.cos(Math.PI * this.phi / 180) * 30;
　this.node.setAttribute('position', `${x}, 0, ${y}`);

・カメラの方向を中心を向かせるよう対応
　const cp = this.node.getAttribute('position');
　const m2c = cp.subtractWith(new Vector3(0, 0, 0));
　const rot = Quaternion.lookRotation(m2c,new Vector3(0,1,0));
　this.node.setAttribute('rotation', rot);

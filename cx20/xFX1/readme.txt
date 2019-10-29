PlayCanvas で碁盤を回転させてみるテスト

＜対応した点＞
・カメラの位置を変更するよう対応

　　＜追加したコードの箇所＞
　　Camera.prototype.update = function (dt) {
　　　　this.timer += dt;
　　　　// Spin the camera around a center point
　　　　var x = Math.sin(this.timer * 0.25) * 6;
　　　　var z = Math.cos(this.timer * 0.25) * 4;
　　　　var e = this.entity;
　　　　e.setPosition(x, 5, z);
　　　　e.lookAt(0, 3, 0);
　　}

＜対応できていない点＞
・落下した後の碁石が碁盤から浮いてしまっている。。。
・落下した後の碁石が縦の状態で停止するケースがある。。。

＜参考＞
■ CodePen - A Pen by PlayCanvas
http://codepen.io/playcanvas/pen/ctxoD

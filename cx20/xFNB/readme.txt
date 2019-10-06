ドット絵が泳いでるっぽく見えるよう調整してみるテスト

立ち泳ぎっぽい感じだったので、少し傾きを加えることで、泳いでるように見えるよう調整。

＜対応した点＞
・以下のコードを追加。

　// キャラクターを45度回転
　var matrix = _bitmap.getMatrix();
　matrix.rotate(45 * createjs.Matrix2D.DEG_TO_RAD);
　matrix.scale(1.6, 0.8);
　matrix.decompose(_bitmap);

＜参考＞
■ EaselJSのMatrix2Dクラスを使った変換行列の操作 - kudox.jp
http://kudox.jp/java-script/createjs-easeljs-matrix2d

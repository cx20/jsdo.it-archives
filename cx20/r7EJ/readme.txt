Three.jsで波動シミュレーションを試してみるテスト

■ natural science Laboratory > コンピュータ・シミュレーション講座 > 仮想物理実験室
http://www.natural-science.or.jp/article/laboratory/cat467/cat704/

のサンプルを試してみました。

＜対応した点＞
・サンプルで使用していた Three.js のバージョンを変更（r56→r68）
・Three.js のバージョン変更による対応
　THREE.CubeGeometry → THREE.BoxGeometry
・Material をワイヤフレーム表示に変更
・カメラ位置を変更し自動的に別角度から表示するよう対応。

＜対応できていない点＞
・ほぼサンプルのままなので、内容までは理解できてません。。。

＜変更履歴＞
・2015/06/20 Three.js r71 に対応。
・2014-07-26 新規作成

＜参考＞
■ Three.js（WebGL）による波動方程式の時間発展
http://www.natural-science.or.jp/article/20130518141153.php

■ 波動方程式
http://www.natural-science.or.jp/WebGL/WaveEquation_Neumann.html

■ 波の伝播シミュレーションの実装解説 - ニコニコ動画
http://www.nicovideo.jp/watch/sm9470923

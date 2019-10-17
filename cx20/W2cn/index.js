// forked from manse's "オリンピックロゴ" http://jsdo.it/manse/IARr

var dataSet = [
    {x:204, y:30, w:50, h:12, angle:0},
    {x:203, y:44, w:24, h:45, angle:74},
    {x:151, y:44, w:12, h:51, angle:419},
    {x:256, y:44, w:45, h:25, angle:14},
    {x:307, y:44, w:50, h:13, angle:29},
    {x:211, y:70, w:36, h:36, angle:360},
    {x:112, y:82, w:50, h:12, angle:360},
    {x:294, y:82, w:50, h:12, angle:0},
    {x:344, y:95, w:13, h:50, angle:59},
    {x:112, y:96, w:25, h:45, angle:72},
    {x:166, y:96, w:45, h:25, angle:15},
    {x:294, y:96, w:24, h:45, angle:73},
    {x:352, y:108, w:36, h:36, angle:360},
    {x:121, y:121, w:36, h:37, angle:360},
    {x:75, y:134, w:36, h:37, angle:59},
    {x:307, y:134, w:45, h:25, angle:15},
    {x:390, y:146, w:25, h:45, angle:14},
    {x:121, y:160, w:44, h:26, angle:72},
    {x:345, y:172, w:36, h:36, angle:29},
    {x:62, y:185, w:50, h:12, angle:30},
    {x:55, y:197, w:50, h:13, angle:59},
    {x:404, y:197, w:13, h:51, angle:30},
    {x:30, y:204, w:12, h:52, angle:360},
    {x:416, y:204, w:12, h:52, angle:360},
    {x:100, y:224, w:45, h:26, angle:44},
    {x:358, y:224, w:25, h:45, angle:43},
    {x:67, y:249, w:45, h:25, angle:73},
    {x:390, y:249, w:25, h:45, angle:14},
    {x:113, y:275, w:37, h:37, angle:59},
    {x:345, y:275, w:36, h:37, angle:29},
    {x:55, y:301, w:50, h:13, angle:59},
    {x:158, y:301, w:45, h:25, angle:74},
    {x:300, y:301, w:25, h:45, angle:15},
    {x:404, y:301, w:12, h:51, angle:29},
    {x:100, y:327, w:45, h:26, angle:44},
    {x:203, y:327, w:36, h:37, angle:59},
    {x:255, y:327, w:26, h:45, angle:44},
    {x:358, y:327, w:25, h:45, angle:44},
    {x:275, y:346, w:12, h:52, angle:360},
    {x:144, y:352, w:50, h:13, angle:59},
    {x:314, y:353, w:12, h:50, angle:29},
    {x:114, y:379, w:50, h:13, angle:29},
    {x:189, y:379, w:45, h:26, angle:44},
    {x:241, y:379, w:36, h:37, angle:29},
    {x:344, y:379, w:13, h:51, angle:419},
];

var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#01256d";

for (var i = 0; i < dataSet.length; i++) {
    var rect = dataSet[i];
    ctx.save();                             // 現在の描画状態（主に変換マトリックス）を保持
    ctx.translate(rect.x, rect.y);          // 回転時の中心点を設定
    ctx.rotate(rect.angle * Math.PI / 180); // 指定角度を回転
    ctx.fillRect(0, 0, rect.w, rect.h);     // 四角形描画
    ctx.restore();                          // 描画状態を復元
}

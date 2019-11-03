// forked from cx20's "[WebGL] xml3d.js を試してみるテスト（その２）" http://jsdo.it/cx20/E4Jd
// forked from cx20's "[WebGL] xml3d.js を試してみるテスト" http://jsdo.it/cx20/Y75u
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC
// nothing

var anim = {};
function initAnim() {
    anim.xfm = document.getElementById("myxfm");
    anim.lastTime = (new Date()).getTime();
    anim.rotAngle = 0.0;
    anim.intervalID = window.setInterval(function () {
        var currentTime = (new Date).getTime();
        var delta = currentTime - anim.lastTime;
        anim.rotAngle += (30 * delta) / 1000.0;
        anim.xfm.setAttribute("rotation", "1.0 0.0 1.0 "+(anim.rotAngle * Math.PI / 180));
        anim.lastTime = currentTime;
    }, 20);
}
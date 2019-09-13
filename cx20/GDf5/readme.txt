[WebGL] Grimoire.js でマウスイベントを試してみるテスト

＜対応した点＞
・マウスオーバーで色を変更するよう対応。
　var mesh = $$("#cube");
　mesh.on("mouseenter",function() {
　　mesh.setAttribute("color", "#ff0000");
　});
　mesh.on("mouseleave",function() {
　　mesh.setAttribute("color", "#ffffff");
　});

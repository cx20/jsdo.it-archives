// forked from cx20's "標高CSV→Height Map 変換ツール（仮）" http://jsdo.it/cx20/9DjJ
// forked from cx20's "ライブラリ→PNG変換用ツール（仮）" http://jsdo.it/cx20/yfCo

var csv2img = function(text, height_max){
	//var s = text.split("\n"); // CSV を配列に展開
	//s = s.filter(function(e) { return e !== ""; }); // 空行は除外
    var s = text.split(",");

	var WIDTH = 257;
	var HEIGHT = 257;

	var canvas = document.createElement('canvas');
	canvas.width = WIDTH-1;
	canvas.height = HEIGHT-1;
	var ctx = canvas.getContext("2d");

	var img = ctx.createImageData(WIDTH, HEIGHT);
	var buffer = img.data;
	var x, y, z;
	var data = [];
	// HeightMap 作成処理
	for (var i = 0; i < HEIGHT-1; i++) {
		for (var j = 0; j < WIDTH-1; j++) {
			var h = s[i*WIDTH+j];
			x = j;
			y = i;
			z = Math.floor((h / height_max) * 256); // 256諧調
			var pos = (y * HEIGHT + x) * 4;
			buffer[pos + 0] = z;
			buffer[pos + 1] = z;
			buffer[pos + 2] = z;
			buffer[pos + 3] = 255;
		}
	}
	
	ctx.putImageData(img, 0, 0);
	var result = canvas.toDataURL();
	
	return result;
};

window.addEventListener('DOMContentLoaded', function() {
	// ファイルが指定されたタイミングで、その内容を表示
	document.querySelector("#file").addEventListener('change', function(e) {
		// File APIを利用できるかをチェック
		if (window.File) {
			// 指定されたファイルを取得
			var input = document.querySelector('#file').files[0];
			var height_max = document.getElementById('height_max').value;
			// ファイル読み込みの準備（1）
			var reader = new FileReader();
			// ファイルの読み込みに成功したら、その内容を<div id="result">に反映（2）
			reader.addEventListener('load', function(e) {
				document.getElementById("img1").src = csv2img(reader.result, height_max);
			}, true);
			// ファイルの内容をテキストとして取得（3）
			reader.readAsText(input, 'UTF-8');
		}
	}, true);
});

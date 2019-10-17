// 円を描画
function drawCircle(ctx, x, y, radius, colour, fill) {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    if ( fill ) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
    ctx.closePath();
}

// 四角を描画
function drawBox(ctx, x, y, w, h, colour, fill) {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    if (fill) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
    ctx.closePath();
}

// ベン図を描画
function drawVennDiagram(type, x, y, w, h, strA, strB, pt) {
    var ctx = document.getElementById("work").getContext("2d");
    ctx.clearRect(x, y, w, h);

    var op = {
        "and": ["source-in", "source-over"],
        "or": ["source-over", "source-over"],
        "xor": ["xor", "source-over"],
        "nand": ["source-in", "xor"],
        "nor": ["source-over", "xor"],
        "xnor": ["xor", "xor"]
    };

    ctx.globalCompositeOperation = "source-over";

    var colour = "#777";
    drawCircle(ctx, x + w * 0.325, y + h * 0.5, w * 0.25, colour, true);
    ctx.globalCompositeOperation = op[type][0];
    drawCircle(ctx, x + w * 0.675, y + h * 0.5, w * 0.25, colour, true);
    var fill = false;
    if (op[type][1] == "xor") {
        ctx.globalCompositeOperation = op[type][1];
        drawBox(ctx, x, y, w, h, colour, true);
    }

    ctx.globalCompositeOperation = "source-over";

    // 文字を描画
    ctx.fillStyle = "#00f";
    ctx.font = pt + "pt Helvetica";
    ctx.fillText(strA, x + w * 0.325 - ctx.measureText(strA).width / 2, y + h * 0.5 + pt / 2);
    ctx.fillText(strB, x + w * 0.675 - ctx.measureText(strB).width / 2, y + h * 0.5 + pt / 2);
    
    // 補助線を描画
    drawCircle(ctx, x + w * 0.325, y + h * 0.5, w * 0.25, colour, false);
    drawCircle(ctx, x + w * 0.675, y + h * 0.5, w * 0.25, colour, false);
    drawBox(ctx, x, y, w, h, colour, false);

    var image = ctx.getImageData(x, y, w, h);
    return image;
}

// 初期処理
function init() {
    var x = 50;
    var y = 50;
    var w = 100;
    var h = 100;
    var strA = "A"; // 円に表示する文字 
    var strB = "B"; // 円に表示する文字
    var pt = 8; // フォントサイズ
    var canvas2 = document.getElementById('venn');
    var ctx2 = canvas2.getContext('2d');
    var types = ["and", "or", "xor", "nand", "nor", "xnor"];
    for (var i = 0; i < types.length; i++) {
        var type = types[i]; // ベン図の種類
        var image = drawVennDiagram(type, x, y, w, h, strA, strB, pt);
        ctx2.putImageData(image, x + Math.floor(i / 3) * (w + 10) , y + (i % 3 ) * (h + 10));
    }
}

init();

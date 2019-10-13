// forked from cx20's "Snap.svg でドット絵を描いてみるテスト" http://jsdo.it/cx20/kCUy

"use strict";

var X_START_POS = 50;
var Y_START_POS = 50;
var CELL_WIDTH  = 50;
var CELL_HEIGHT = 40;

// P→Rの経路描画用
var directions_PtoR = [
    ["↑","↑","→","→"],
    ["↑","→","↑","→"],
    ["↑","→","→","↑"],
    ["→","↑","↑","→"],
    ["→","↑","→","↑"],
    ["→","→","↑","↑"]
];

// R→Qの経路描画用
var directions_RtoQ = [
    ["↑","↑","→","→","→"],
    ["↑","→","↑","→","→"],
    ["↑","→","→","↑","→"],
    ["↑","→","→","→","↑"],
    ["→","↑","↑","→","→"],
    ["→","↑","→","↑","→"],
    ["→","↑","→","→","↑"],
    ["→","→","↑","↑","→"],
    ["→","→","↑","→","↑"],
    ["→","→","→","↑","↑"]
];

var route = -1; // 経路番号
var funcs = [ loopRoutePtoR, loopRouteRtoQ ];

// 1．問題用紙の作成
var s = Snap(465, 465);

// 2.質問文の描画
showQuestion();

// 3.経路 P→R の描画
loopRoutePtoR();

// 4.経路 R→Q の描画
setTimeout(loopRouteRtoQ, 8000);

// 5.解答の描画
setTimeout(showAnswer, 20000);

function showQuestion() {
    // 質問文
    s.text( 5, 20, "図の線上を点Pから点Rを通って点Qに至る最短経路は何通りあるか。" );

    var x1;
    var x2;
    var y1;
    var y2;
    // 縦線
    for ( var y = 0; y < 5; y++ ) {
        x1 = X_START_POS;
        x2 = X_START_POS + CELL_WIDTH * 5;
        y1 = Y_START_POS + CELL_HEIGHT * y;
        y2 = Y_START_POS + CELL_HEIGHT * y;
        s.line( x1, y1, x2, y2 ).attr({ stroke: "#777", strokeWidth: 2 });
    }
    // 横線
    for ( var x = 0; x < 6; x++ ) {
        x1 = X_START_POS + CELL_WIDTH * x;
        x2 = X_START_POS + CELL_WIDTH * x;
        y1 = Y_START_POS;
        y2 = Y_START_POS + CELL_HEIGHT * 4;
        s.line( x1, y1, x2, y2 ).attr({ stroke: "#777", strokeWidth: 2 });
    }

    // 点 P
    s.circle( X_START_POS + CELL_WIDTH * 0, Y_START_POS + CELL_HEIGHT * 4, 5 ).attr({ stroke: "#777", strokeWidth: 2 });
    // 点 R
    s.circle( X_START_POS + CELL_WIDTH * 2, Y_START_POS + CELL_HEIGHT * 2, 5 ).attr({ stroke: "#777", strokeWidth: 2 });
    // 点 Q
    s.circle( X_START_POS + CELL_WIDTH * 5, Y_START_POS + CELL_HEIGHT * 0, 5 ).attr({ stroke: "#777", strokeWidth: 2 });

    // P
    s.text( X_START_POS + CELL_WIDTH * 0 - 20, Y_START_POS + CELL_HEIGHT * 4 + 20, "P" );
    // R
    s.text( X_START_POS + CELL_WIDTH * 2 - 20, Y_START_POS + CELL_HEIGHT * 2 - 10, "R" );
    // Q
    s.text( X_START_POS + CELL_WIDTH * 5 + 10, Y_START_POS + CELL_HEIGHT * 0 - 10, "Q" );
}

function loopRoutePtoR() {
    var param = {
        directions: directions_PtoR,
        route: route,
        count: 4,
        x0: X_START_POS + CELL_WIDTH * 0,
        y0: Y_START_POS + CELL_HEIGHT * 4,
        routeName: "PtoR",
        dasharray: "none" // 実線で描画
    };

    animateRoute(param);

    if (route < param.directions.length) {
        setTimeout(loopRoutePtoR, 1000);
        route += 1;
    } else {
        route = -1;
    }
}

function loopRouteRtoQ() {
    var param = {
        directions: directions_RtoQ,
        route: route,
        count: 5,
        x0: X_START_POS + CELL_WIDTH * 2,
        y0: Y_START_POS + CELL_HEIGHT * 2,
        routeName: "RtoQ",
        dasharray: "3 3" // 点線で描画
    };

    animateRoute(param);

    if (route < param.directions.length) {
        setTimeout(loopRouteRtoQ, 1000);
        route += 1;
    } else {
        route = -1;
    }
}

function showAnswer() {
    s.rect( 300, 300, 100, 50 ).attr({ stroke: "#777", strokeWidth: 2, fill:"none" });
    // 解答
    s.text( 250, 330, "正解：" );
    s.text( 300, 290, "6×10通りの為" );
    s.text( 330, 330, "60通り" );
}

var colorSet = [
    "#ff0000", // 赤
    "#00ff00", // 黄緑
    "#0000ff", // 青
    "#ffff00", // 黄
    "#00ffff", // 水
    "#ff00ff", // 赤紫
    "#800000", // 茶
    "#008000", // 緑
    "#000080", // 紺
    "#808000", // 黄土
    "#008080", // 青緑
    "#800080" // 紫
]

function animateRoute(param) {
    var direction = param.directions;
    var route = param.route;
    var count = param.count;
    var x0 = param.x0;
    var y0 = param.y0;
    var x1, y1;
    var x2, y2;
    var routeName = param.routeName;
    var dasharray = param.dasharray;
    var margin_x = (route - count / 2) * 1.5;
    var margin_y = (route - count / 2) * 1.5;
    var path_base = "M " + (x0 + margin_x) + "," + (y0 + margin_y);
    var path1;
    var path2;

    var lastPos = -1;
    var rows = 0;
    var cols = 0;
    var color;
    Snap.animate(0, 99, function (val) {
        var pos = Math.floor(val / (100 / count));
        if (lastPos != pos && route != -1 && route < direction.length) {
            switch (direction[route][pos]) {
            case "↑":
                y0 -= CELL_HEIGHT;
                rows = 1;
                cols = 0;
                break;
            case "→":
                x0 += CELL_WIDTH;
                rows = 0;
                cols = 1;
                break;
            }

            x1 = CELL_WIDTH * cols;
            y1 = -CELL_HEIGHT * rows;

            path1 = path_base + " l" + x1 + "," + y1;
            color = colorSet[route];
            // 経路の描画
            s.path(path1).attr({
                stroke: color,
                strokeWidth: 3,
                fill: "none",
                "stroke-dasharray": dasharray
            });

            switch (routeName) {
            case "PtoR":
                x2 = X_START_POS + CELL_WIDTH * 0;
                y2 = 270 + route * 15;
                break;
            case "RtoQ":
                x2 = X_START_POS + CELL_WIDTH * 2;
                y2 = 270 + route * 15;
                break;
            }
            // 凡例の描画
            path2 = "M " + x2 + "," + y2 + " L " + (x2 + 50) + "," + y2;
            s.path(path2).attr({
                stroke: color,
                strokeWidth: 3,
                fill: "none",
                "stroke-dasharray": dasharray
            });
            s.text(x2 + 60, y2 + 5, route + 1);

            path_base = "M " + (x0 + margin_x) + "," + (y0 + margin_y);

            lastPos = pos;
        }
    }, 1000);
}
 
// forked from cx20's "Snap.svg で試験問題を解いてみるテスト（その２）" http://jsdo.it/cx20/2agQ
// forked from cx20's "Snap.svg で試験問題を解いてみるテスト" http://jsdo.it/cx20/5AWE
// forked from cx20's "Snap.svg でドット絵を描いてみるテスト" http://jsdo.it/cx20/kCUy

"use strict";

var questionTableData = [
    [ "ﾄﾗﾝｻﾞｸｼｮﾝ", "DBに対するRead回数とWrite回数"],
    [ "T1,T2", "Read 10, Write 20"],
    [ "T3,T4", "Read 100"],
    [ "T5,T6", "Read 20, Write 10"]
];

var questionGraphData = [
    { text:"T1", start:  0, end: 50, commit:true },
    { text:"T2", start: 10, end:150, commit:true },
    { text:"T3", start:100, end:220, commit:false },
    { text:"T4", start:  0, end:220, commit:false },
    { text:"T5", start: 90, end:190, commit:true },
    { text:"T6", start:125, end:220, commit:false }
];

var answerData = [
    { text:"T1", answer:"不要", description:"チェックポイント時点でコミット済みの為、回復は不要。" },
    { text:"T2", answer:"前進", description:"障害発生時点でコミット済みの為、前進復帰。" },
    { text:"T3", answer:"不要", description:"参照のみの為、回復は不要。" },
    { text:"T4", answer:"不要", description:"参照のみの為、回復は不要。" },
    { text:"T5", answer:"前進", description:"障害発生時点でコミット済みの為、前進復帰。" },
    { text:"T6", answer:"後退", description:"障害発生時点でコミット未済の為、後退復帰。" }
]

// 1．問題用紙の作成
var s = Snap(465, 465);

// 2.質問文の描画
showQuestion();

// 3.解答の描画
showAnswer();

function showQuestionText() {
    // 質問文
    s.text( 5, 20, "DBMSをシステム障害発生後に再立ち上げするとき" );
    s.text( 5, 40, "前進復帰すべきトランザクションと後進復帰すべき" );
    s.text( 5, 60, "トランザクションとして適切なものはどれか。" );
}

function showQuestionTable() {
    // 表作成
    s.rect( 10, 70, 400, 100 ).attr({ stroke: "#777", strokeWidth: 2, fill:"none" });
    s.line( 50+70, 70, 50+70, 70+100 ).attr({ stroke: "#777", strokeWidth: 2 });
    var y;
    for ( y = 70; y < (70+100); y += 25 ) {
        s.line( 10, y, 10+400, y ).attr({ stroke: "#777", strokeWidth: 2 });
    }

    for ( var i = 0; i < questionTableData.length; i++ ) {
        s.text(  20, 90+i*25, questionTableData[i][0] );
        s.text( 130, 90+i*25, questionTableData[i][1] );
    }
}

function showQuestionGraph() {
    var poly = s.polyline( 10,0,0,5,0,-5 ).attr({fill:"#000"});
    var marker = poly.marker( 0,-5, 10,10, 10,0 );
    
    // → 時間
    s.line( 10+50, 200, 300+50, 200 ).attr({ stroke: "#000", strokeWidth: 1, fill:"none", "marker-end":marker });
    s.text( 300+5+50, 200+5, "時間" );

    for ( var i = 0; i < questionGraphData.length; i++ ) {
        s.text(  50, 240+i*25, questionGraphData[i].text );
        s.line(  80 + questionGraphData[i].start, 235+i*25, 80 + questionGraphData[i].end, 235+i*25 ).attr({ stroke: "#000", strokeWidth: 1, fill:"none" });
        if ( questionGraphData[i].commit ) {
            s.circle(  80 + questionGraphData[i].end, 235+i*25, 3 ).attr({ stroke: "#000", strokeWidth: 1, fill:"#000" });
        }
    }

    // チェックポイント
    var path = Snap.format("M{x},{y}h{dim.width}v{dim.height}h{dim['negative width']}z", {
        x: 138,
        y: 220,
        dim: {
            width: 28,
            height: 160,
            "negative width": -28
        }
    });
    s.path(path).attr( { stroke:"#000", fill:"white" });
    s.text(0, 0, "チェックポイント").attr({textpath: "M158,350L158,240"});

    // 障害発生
    var path = Snap.format("M{x},{y}h{dim.width}v{dim.height}h{dim['negative width']}z", {
        x: 300,
        y: 200,
        dim: {
            width: 28,
            height: 180,
            "negative width": -28
        }
    });
    s.path(path).attr( { stroke:"#f00", fill:"white" });
    s.text(0, 0, "障害発生").attr({textpath:"M320,330L320,240", fill:"#f00" });
}

function showQuestion() {
    // 質問文
    showQuestionText();
    // 表作成
    showQuestionTable();
    // グラフ作成
    showQuestionGraph();
}

function showAnswer() {
    
    animateAnswer();
}

function animateAnswer() {
    // 解説エリア
    s.text( 5, 395, "＜解説＞");
    var path = Snap.format("M{x},{y}h{dim.width}v{dim.height}h{dim['negative width']}z", {
        x: 5,
        y: 400,
        dim: {
            width: 400,
            height: 50,
            "negative width": -400
        }
    });
    s.path(path).attr( { stroke:"#000", fill:"white" });

    Snap.animate(0, 99, function (val) {
        var pos = Math.floor(val / (100 / 6));
        s.text(  5, 240+pos*25, answerData[pos].answer ).hover(
            // hover 開始
            function () {
                this.attr( { fill:"red" });
                s.path(path).attr( { stroke:"#000", fill:"white" });
                s.text( 10, 420, answerData[pos].description);
            },
            // hover 終了
            function() {
                this.attr( { fill:"black" });
            }
        );
    }, 3000);
}

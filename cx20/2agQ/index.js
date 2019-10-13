// forked from cx20's "Snap.svg で試験問題を解いてみるテスト" http://jsdo.it/cx20/5AWE
// forked from cx20's "Snap.svg でドット絵を描いてみるテスト" http://jsdo.it/cx20/kCUy

"use strict";

var X_START_POS = 50;
var Y_START_POS = 50;

var answerData = [
	[ "", "入力例", "状態の遷移"],
	[ "ア", "1011", "S1→S2→S2→S1→S2"],
	[ "イ", "1100", "S1→S2→S1→S3→S2"],
	[ "ウ", "1101", "S1→S2→S1→S3→S3"],
	[ "エ", "1110", "S1→S2→S1→S2→S2"]
];

// 1．問題用紙の作成
var s = Snap(465, 465);

// 2.質問文の描画
showQuestion();

// 3.解答の描画
showAnswer();

function showQuestion() {
    // 質問文
    s.text( 5, 20, "次に示す有限オートマトンが受理する入力列はどれか。" );
    s.text( 5, 40, "ここでS1は初期状態をS3は受理状態を表している。" );
    
    // S1
    s.circle(  50, 120, 20 ).attr({ stroke: "#000", strokeWidth: 1, fill:"none" });
    // S2
    s.circle( 150, 120, 20 ).attr({ stroke: "#000", strokeWidth: 1, fill:"none" });
    // S3
    s.circle( 250, 120, 20 ).attr({ stroke: "#000", strokeWidth: 1, fill:"none" });
    s.circle( 250, 120, 15 ).attr({ stroke: "#000", strokeWidth: 1, fill:"none" });

    var poly = s.polyline( 10,0,0,5,0,-5 ).attr({fill:"#000"});
    var marker = poly.marker( 0,-5, 10,10, 10,0 );
    
    // → S1
    s.line( 10,    120, 10+20, 120 ).attr({ stroke: "#000", strokeWidth: 1, fill:"none", "marker-end":marker });
    // S1 → S2
    s.line( 50+20, 120-5,  50+20+(150-50)-(20+20), 120-5 ).attr({ stroke: "#000", strokeWidth: 1, fill:"none", "marker-end":marker });
    // S1 ← S1
    s.line( 50+20+(150-50)-(20+20), 120+5,  50+20, 120+5 ).attr({ stroke: "#000", strokeWidth: 1, fill:"none", "marker-end":marker });
    // S2 ← S3
    s.line( 50+20+(250-50)-(20+20), 120+0, 150+20, 120+0 ).attr({ stroke: "#000", strokeWidth: 1, fill:"none", "marker-end":marker });

    // S2 → S2
    s.path( "M 140,100 A 20,20 0 1,1 160,100" ).attr( {stroke:"#000", fill:"none", "marker-end":marker} );
    // S3 → S3
    s.path( "M 240,100 A 20,20 0 1,1 260,100" ).attr( {stroke:"#000", fill:"none", "marker-end":marker} );
    // S1 → S3
    s.path( "M  50,140 A 20,10 0 1,0 250,140" ).attr( {stroke:"#000", fill:"none", "marker-end":marker} );
    
    // S1
    s.text(  50-8, 120+5, "S1" );
    // S2
    s.text( 150-8, 120+5, "S2" );
    // S3
    s.text( 250-8, 120+5, "S3" );

    // 1:S1 → S1
    s.text(  100, 110, "1" );
    // 1:S1 ← S2
    s.text(  100, 140, "1" );
    // 0:S2 → S2
    s.text(  145,  60, "0" );
    // 0:S2 ← S3
    s.text(  200, 140, "0" );
    // 0:S1 → S3
    s.text(  145, 180, "0" );
    // 1:S3 → S3
    s.text(  245,  60, "1" );
    
    // 選択肢
    s.text(  10, 220, "ア 1011" );
    s.text( 110, 220, "イ 1100" );
    s.text( 210, 220, "ウ 1101" );
    s.text( 310, 220, "エ 1110" );
}

function showAnswer() {
    // 表作成
    s.rect( 10, 230, 400, 200 ).attr({ stroke: "#777", strokeWidth: 2, fill:"none" });
    s.line( 50, 230, 50, 230+200 ).attr({ stroke: "#777", strokeWidth: 2 });
    s.line( 50+70, 230, 50+70, 230+200 ).attr({ stroke: "#777", strokeWidth: 2 });
    var y;
    for ( y = 230; y < (230+200); y += (200/5) ) {
        s.line( 10, y, 10+400, y ).attr({ stroke: "#777", strokeWidth: 2 });
    }
    
    animateAnswer();
}

function animateAnswer() {
    Snap.animate(0, 99, function (val) {
        var pos = Math.floor(val / (100 / 5));
        s.text(  20, 255+pos*200/5, answerData[pos][0] );
        s.text(  60, 255+pos*200/5, answerData[pos][1] );
        s.text( 130, 255+pos*200/5, answerData[pos][2] );
    }, 10000, mina.linear, markAnswer);
}

function markAnswer() {
    s.circle( 28, 255+3*200/5-3, 15 ).attr({ stroke: "#f00", strokeWidth: 1, fill:"none" });
}
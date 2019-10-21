// forked from cx20's "JointJS で組織図を書いてみるテスト" http://jsdo.it/cx20/hGvF
// forked from JointJS's "Organizational Charts Demo" http://www.jointjs.com/demos/org

var graph = new joint.dia.Graph();

var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: 465,
    height: 200,
    gridSize: 1,
    model: graph
});

function state(x, y, label) {
    
    var cell = new joint.shapes.fsa.State({
        position: { x: x, y: y },
        size: { width: 60, height: 60 },
        attrs: { text : { text: label }}
    });
    graph.addCell(cell);
    return cell;
}

function endState(x, y, label) {
    
    var cell = new joint.shapes.fsa.EndState({
        position: { x: x, y: y },
        size: { width: 60, height: 60 },
        attrs: { 
            '.outer': {
                transform: 'translate(10, 10)',
                r: 10,
                fill: '#FFFFFF',
                stroke: 'black'
            },

            '.inner': {
                transform: 'translate(10, 10)',
                r: 6,
                fill: '#FFFFFF',
                stroke: 'black'
            }
        }
    });
    
    var text = new joint.shapes.basic.Text({
        position: { x: x+22, y: y+22 },
        size: { width: 15, height: 15 },
        attrs: { text: { text: label, fill: 'black', 'font-weight': 'bold' } }
    });

    graph.addCells([cell, text]);
    return cell;
}

function link(source, target, label, vertices) {
    
    var cell = new joint.shapes.fsa.Arrow({
        source: { id: source.id },
        target: { id: target.id },
        labels: [{ position: 0.5, attrs: { text: { text: label || '', 'font-weight': 'bold' } } }],
        vertices: vertices || []
    });
    graph.addCell(cell);
    return cell;
}

function showQuestion()
{
    var start = new joint.shapes.fsa.StartState({ position: { x: 10, y: 80 } });
    graph.addCell(start);
    
    var s1  = state(100, 60, 'S1');
    var s2  = state(200, 60, 'S2');
    var s3  = endState(300, 60, 'S3');
    link(start, s1,  '開始');
    link(s1, s2, '1', [{x: 180, y: 75}]);
    link(s2, s1, '1', [{x: 180, y: 115}]);
    link(s3, s2, '0');
    link(s2, s2, '0', [{x: 190,y: 30}, {x: 230,y: 10}, {x: 260, y: 30}]);
    link(s3, s3, '1', [{x: 290,y: 30}, {x: 330,y: 10}, {x: 360, y: 30}]);
    link(s1, s3, '0', [{x: 210,y: 160}, {x: 260, y: 150} ]);
}

var answerData = [
    [ "選択肢", "入力例", "状態の遷移（反転させると答えが表示されます）"],
    [ "ア", "1011", "S1→S2→S2→S1→S2"],
    [ "イ", "1100", "S1→S2→S1→S3→S2"],
    [ "ウ", "1101", "S1→S2→S1→S3→S3（正解）"],
    [ "エ", "1110", "S1→S2→S1→S2→S2"]
];

function showAnswer() {
    var table = document.createElement("table");
    //table.style.border = 1;
    table.style.border="0px solid black";
    var i = 0;
    for (var r = 0; r < answerData.length; r++) {
        var row = table.insertRow(r);
        for (var c = 0; c < answerData[r].length; c++) {
            var cell = row.insertCell(c);
            var txt = answerData[r][c];
            if ( r > 0 && c == 2 ) {
                cell.style.color = "white";
            } else {
                cell.style.color = "black";
            }
            cell.style.border="1px solid black";
            cell.textContent = txt;
        }
    }

    document.body.appendChild(table);
}

showQuestion();
showAnswer();

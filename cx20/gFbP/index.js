// forked from cx20's "JointJS で状態遷移図を書いてみるテスト" http://jsdo.it/cx20/3R2n
// forked from cx20's "JointJS で組織図を書いてみるテスト" http://jsdo.it/cx20/hGvF
// forked from JointJS's "Organizational Charts Demo" http://www.jointjs.com/demos/org

var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({

    el: $('#paper'), model: graph,
    width: 465, height: 250, gridSize: 5,
    snapLinks: true,
    defaultLink: new joint.shapes.logic.Wire,

    validateConnection: function(vs, ms, vt, mt, e, vl) {

        if (e === 'target') {

            // target requires an input port to connect
            if (!mt || !mt.getAttribute('class') || mt.getAttribute('class').indexOf('input') < 0) return false;

            // check whether the port is being already used
            var portUsed = _.find(this.model.getLinks(), function(link) {

                return (link.id !== vl.model.id &&
                        link.get('target').id === vt.model.id &&
                        link.get('target').port === mt.getAttribute('port')); 
            });

            return !portUsed;

        } else { // e === 'source'

            // source requires an output port to connect
            return ms && ms.getAttribute('class') && ms.getAttribute('class').indexOf('output') >= 0; 
        }
    }
});

// zoom the viewport by 50%
paper.scale(1.5,1.5);

function toggleLive(model, signal) {
    // add 'live' class to the element if there is a positive signal
    V(paper.findViewByModel(model).el).toggleClass('live', signal > 0);
}

function broadcastSignal(gate, signal) {
    // broadcast signal to all output ports
    _.defer(_.invoke, graph.getConnectedLinks(gate, { outbound: true }), 'set', 'signal', signal);
}

function initializeSignal() {

    var signal = 0; // Math.random();
    // > 0 wire with a positive signal is alive
    // < 0 wire with a negative signal means, there is no signal 
    // 0 none of the above - reset value

    // cancel all signals stores in wires
    _.invoke(graph.getLinks(), 'set', 'signal', 0);

    // remove all 'live' classes
    $('.live').each(function() { V(this).removeClass('live') });

    _.each(graph.getElements(), function(element) {
        // broadcast a new signal from every input in the graph
        (element instanceof joint.shapes.logic.Input) && broadcastSignal(element, signal);
    });

    return signal;
}

// Every logic gate needs to know how to handle a situation, when a signal comes to their ports.
joint.shapes.logic.Gate.prototype.onSignal = function(signal, handler) { handler.call(this, signal) }
// The repeater delays a signal handling by 400ms
//joint.shapes.logic.Repeater.prototype.onSignal = function(signal, handler) { _.delay(handler, 400, signal) }
joint.shapes.logic.Repeater.prototype.onSignal = function(signal, handler) { _.delay(handler, 400, signal) }
// Output element just marks itself as alive.
joint.shapes.logic.Output.prototype.onSignal = function(signal) { toggleLive(this, signal); }

// diagramm setup
var gates = {
    inputX: new joint.shapes.logic.Input({ position: { x: 2, y:  10 }, size:{width:20}, attrs: { text : { text: "X" }}}),
    inputY: new joint.shapes.logic.Input({ position: { x: 2, y: 120 }, size:{width:20}, attrs: { text : { text: "Y" }}}),
    nandX: new joint.shapes.logic.Nand({ position: { x: 70, y: 10 }}),
    nandY: new joint.shapes.logic.Nand({ position: { x: 70, y: 110 }}),
    nandZ: new joint.shapes.logic.Nand({ position: { x: 170, y: 60 }}),
    output: new joint.shapes.logic.Output({ position: { x: 282, y: 65 }, size:{width:20}, attrs: { text : { text: "Z" }}}),
}

var wires = [
    { source: { id: gates.inputX.id, port: 'out' }, target: { id: gates.nandX.id, port: 'in1' }},
    { source: { id: gates.inputX.id, port: 'out' }, target: { id: gates.nandX.id, port: 'in2' }},
    { source: { id: gates.inputY.id, port: 'out' }, target: { id: gates.nandY.id, port: 'in1' }},
    { source: { id: gates.inputY.id, port: 'out' }, target: { id: gates.nandY.id, port: 'in2' }},
    { source: { id: gates.nandX.id, port: 'out' }, target: { id: gates.nandZ.id, port: 'in1' }},
    { source: { id: gates.nandY.id, port: 'out' }, target: { id: gates.nandZ.id, port: 'in2' }},
    { source: { id: gates.nandZ.id, port: 'out' }, target: { id: gates.output.id, port: 'in' }}
];

// add gates and wires to the graph
graph.addCells(_.toArray(gates));
_.each(wires, function(attributes) { graph.addCell(new joint.shapes.logic.Wire(attributes)) });

graph.on('change:source change:target', function(model, end) {

    var e = 'target' in model.changed ? 'target' : 'source';

    if ((model.previous(e).id && !model.get(e).id) || (!model.previous(e).id && model.get(e).id)) {
        // if source/target has been connected to a port or disconnected from a port reinitialize signals
        current = initializeSignal();
    }
});

graph.on('change:signal', function(wire, signal) {

    toggleLive(wire, signal);

    var magnitude = Math.abs(signal);

    // if a new signal has been generated stop transmitting the old one
    if (magnitude !== current) return;

    var gate = graph.getCell(wire.get('target').id);

    if (gate) {

        gate.onSignal(signal, function() {

            // get an array of signals on all input ports
            var inputs = _.chain(graph.getConnectedLinks(gate, { inbound: true }))
                .groupBy(function(wire) { return wire.get('target').port })
                .map(function(wires) { return Math.max.apply(this, _.invoke(wires, 'get', 'signal')) > 0 })
                .value();

            // calculate the output signal
            var output = magnitude * (gate.operation.apply(gate, inputs) ? 1 : -1);
            
            broadcastSignal(gate, output);
        });
   }
});

// initialize signal and keep its value
var current = initializeSignal();

var answerData = [
    [ "選択肢", "式", "解説（反転させると答えが表示されます）"],
    [ "ア", "Ｘ・Ｙ", ""],
    [ "イ", "Ｘ＋Ｙ", "<span style='text-decoration:overline;'>Ｘ</span>・<span style='text-decoration:overline;'>Ｘ</span>＝<span style='text-decoration:overline;'>Ｘ</span>、<span style='text-decoration:overline;'>Ｙ</span>・<span style='text-decoration:overline;'>Ｙ</span>＝<span style='text-decoration:overline;'>Ｙ</span>、<span style='text-decoration:overline;'>Ｘ</span>・<span style='text-decoration:overline;'>Ｙ</span>＝<span style='text-decoration:overline;'>Ｘ＋Ｙ</span>、NAND なのでＸ＋Ｙ"],
    [ "ウ", "<span style='text-decoration:overline;'>Ｘ・Ｙ</span>", ""],
    [ "エ", "<span style='text-decoration:overline;'>Ｘ＋Ｙ</span>", ""]
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
            cell.style.padding="2px";
            cell.style.textAlign="center";
            cell.innerHTML = txt;
        }
    }

    document.body.appendChild(table);
}

showAnswer();

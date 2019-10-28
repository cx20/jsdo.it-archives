// forked from cx20's "CodeMirror で自動書記のテスト" http://jsdo.it/cx20/3kwZ
// forked from cx20's "CodeMirror サンプル" http://jsdo.it/cx20/cR0K
var tid = 0;
var pos = 0;
var codeHello = "hello = ->\n    $(\"#container\")\n        .append $(\"<p>\")\n        .append \"Hello, CoffeeScript World!\"\n\nhello()";
var MAX = codeHello.length;
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    matchBrackets: true,
    autofocus: true,
    mode: "text/x-coffeescript"
});

init();

function init() {
    tid = setInterval( typing, 100 );
}

function typing() {
    if ( pos < MAX ) {
        var c = codeHello.substr( pos, 1 );
        var value = editor.doc.getValue();
        value += c;
        editor.doc.setValue( value );
        editor.setCursor( editor.doc.lineCount() );
        pos++;
    } 
    else if ( pos === MAX ) {
        clearInterval( tid );
        setTimeout(runCoffeeScript, 0);
    }
}

function runCoffeeScript() {
    CoffeeScript.run(editor.doc.getValue());
}
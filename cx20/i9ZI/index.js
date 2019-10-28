// forked from cx20's "CodeMirror で自動書記のテスト" http://jsdo.it/cx20/3kwZ
// forked from cx20's "CodeMirror サンプル" http://jsdo.it/cx20/cR0K
var tid = 0;
var pos = 0;
var codeHello = "--This is Lua!\nlocal jq = js.get(\"$\")\nlocal container = jq(\"#container\")\ncontainer.append( jq(\"<p>\").append(\"Hello, Lua World!\") )\n";
var MAX = codeHello.length;
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    matchBrackets: true,
    autofocus: true,
    mode: "text/x-lua"
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
        setTimeout(runLua, 0);
    }
}

function runLua() {
    Lua.execute(editor.doc.getValue());
}

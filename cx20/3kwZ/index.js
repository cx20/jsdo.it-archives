// forked from cx20's "CodeMirror サンプル" http://jsdo.it/cx20/cR0K
var pos = 0;
var codeHello = "#include <stdio.h>\n\nint main( int argc, char* argv[] )\n{\n\tprintf(\"Hello, CodeMirror World!\\n\");\n\treturn 0;\n}\n";
var MAX = codeHello.length;
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    matchBrackets: true,
    autofocus: true,
    mode: "text/x-csrc"
});

function init() {
    setInterval( typing, 100 );
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
}

// forked from cx20's "CodeMirror で自動書記のテスト" http://jsdo.it/cx20/3kwZ
// forked from cx20's "CodeMirror サンプル" http://jsdo.it/cx20/cR0K
var tid = 0;
var pos = 0;
var codeHello = "CREATE TABLE tb_greeting( message VARCHAR(100) );\n\nINSERT INTO tb_greeting VALUES('Hello, SQL.js World!');\n\nSELECT * FROM tb_greeting;\n";
var MAX = codeHello.length;
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    matchBrackets: true,
    autofocus: true,
    mode: "text/x-sql"
});

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
        setTimeout(runSQL, 0);
    }
}

// Connect to the HTML element we 'print' to
function print(text) {
  var element = document.getElementById('container');
  element.innerHTML = text.replace(/\n/g, '<br>');
}


// Open a database
var db = SQL.open();

function runSQL() {
    var commands = editor.doc.getValue();
    execute( commands );
}

// Run a command in the database
function execute(commands) {
  try {
    var data = db.exec(commands.replace(/\n/g, '; '));
    print(JSON.stringify(data, null, '  '));
  } catch(e) {
    print(e);
  }
}

init();

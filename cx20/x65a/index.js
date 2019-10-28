// forked from cx20's "CodeMirror で自動書記のテスト" http://jsdo.it/cx20/3kwZ
// forked from cx20's "CodeMirror サンプル" http://jsdo.it/cx20/cR0K
var tid = 0;
var pos = 0;
var codeHello = "class Greeter {\n    greeting: string;\n    constructor(message: string) {\n        this.greeting = message;\n    }\n    greet() {\n        return \"Hello, \" + this.greeting;\n    }\n}\n\nvar greeter = new Greeter(\"TypeScript World!\");\n\nvar container = document.getElementById(\"container\");\n\ncontainer.textContent = greeter.greet();\n";
var MAX = codeHello.length;
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    matchBrackets: true,
    autofocus: true,
    mode: "text/typescript"
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
        setTimeout(runTypeScript, 0);
    }
}

function runTypeScript() {
    var filename = "jsdo.it.ts";
    var source = editor.doc.getValue();
    var result = compile(filename, source);
    eval(result);
}

function compile( filename, source ) {
	var compiler = new TypeScript.TypeScriptCompiler(filename);

	var snapshot = TypeScript.ScriptSnapshot.fromString(source);
	compiler.addFile(filename, snapshot);

	var iter = compiler.compile();

	var output = '';
	while(iter.moveNext()) {
	var current = iter.current().outputFiles[0];
		output += !!current ? current.text : '';
	}

	var diagnostics = compiler.getSemanticDiagnostics(filename);
	if (!output && diagnostics.length) {
		throw new Error(diagnostics[0].text());
	}
	
	return output;
}

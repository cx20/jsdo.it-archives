// forked from cx20's "CodeMirror で自動書記のテスト" http://jsdo.it/cx20/3kwZ
// forked from cx20's "CodeMirror サンプル" http://jsdo.it/cx20/cR0K
var tid = 0;
var pos = 0;
var codeHello = "class Greeting\n  def initialize(root)\n    # get jQuery selected object\n    @container = root.call(\"$\", \"#container\")\n  end\n  def hello(str)\n    @container.call(\"append\", \"<p>Hello, #{str} World!</p>\")\n  end\nend\n\n# This is the entrypoint file for webruby\nroot_object = MrubyJs::get_root_object\n\ng = Greeting.new(root_object)\ng.hello(\"WebRuby\")\n";
var MAX = codeHello.length;
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    matchBrackets: true,
    autofocus: true,
    mode: "text/x-ruby"
});

var escaped = {
    stringToBytes: function( text ){
        var s = text.replace(/[^\u00-\uff]/g, function($0){
            return escape($0);
        }), i, l, b=[];
        for(l = s.length, i = 0; i < l; i++) {
            b.push(s.charCodeAt(i));
        }
        s = i = l = void 0;
        return b;
    },
    bytesToString: function( bytes ){
        var i, l, r='';
        for(i=0,l=bytes.length; i<l; i++){
            r += String.fromCharCode(bytes[i]);
        }
        i = l = void 0;
        return unescape(r);
    }
};

var img2txt = function( img ){
    var c, w, h, x, g, i, l, b, t, r;

    if(!img instanceof HTMLImageElement || img.complete!==true) return;
    
    t = window.utf8 && !!utf8.bytesToString ? utf8.bytesToString : escaped.bytesToString;
    
    c = document.createElement('canvas');
    w = c.width = img.width;
    h = c.height = img.height;
    x = c.getContext('2d');
    i = 0;
    b = [];
    x.drawImage(img, 0, 0);
    g = x.getImageData(0,0,w,h).data;
    for(l=g.length; i<l&&g[i+3]===255; i+=4) { b.push(g[i]); }
    r = t(b);
    
    c = w = h = x = g = i = l = b = void 0;
    return r;
};

$("#img1").load(function(){
    var img = document.getElementById("img1");
    var text = img2txt( img );
    
    var script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.text = text;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild( script );
    console.log( text );
    init();
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
        setTimeout(runRuby, 0);
    }
}

function runRuby() {
    var w = WEBRUBY();
    w.run_source(editor.doc.getValue());
}
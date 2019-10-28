// forked from cx20's "CodeMirror で自動書記のテスト" http://jsdo.it/cx20/3kwZ
// forked from cx20's "CodeMirror サンプル" http://jsdo.it/cx20/cR0K

var pos = 0;
var codeSet = [
    "var canvas = document.getElementById(\"world\");\n\nvar renderer = new GLBoost.Renderer({\n    canvas: canvas,\n    clearColor: {red: 1, green: 1, blue: 1, alpha: 1}\n});\n\nvar scene = new GLBoost.Scene();\n\nvar positions = [\n    new GLBoost.Vector3(0.0, 0.5, 0.0),\n    new GLBoost.Vector3(-0.5, -0.5, 0.0),\n    new GLBoost.Vector3(0.5, -0.5, 0.0)\n];\n\nvar colors = [\n    new GLBoost.Vector3(0.0, 0.0, 1.0),\n    new GLBoost.Vector3(0.0, 0.0, 1.0),\n    new GLBoost.Vector3(0.0, 0.0, 1.0),\n];\n\nvar geometry = new GLBoost.Geometry(canvas);\ngeometry.setVerticesData({\n    position: positions,\n    color: colors\n});\nvar mesh = new GLBoost.Mesh(geometry);\n\nscene.add(mesh);\n\nscene.prepareForRender();\n\nvar render = function (){\n    renderer.clearCanvas();\n    renderer.draw(scene);\n    requestAnimationFrame(render);\n};\n\nrender();",
    "var canvas = document.getElementById(\"world\");\n\nvar renderer = new GLBoost.Renderer({\n    canvas: canvas,\n    clearColor: {red: 1, green: 1, blue: 1, alpha: 1}\n});\n\nvar scene = new GLBoost.Scene();\n\nvar positions = [\n    new GLBoost.Vector3(-0.5,  0.5, 0.0), // v0\n    new GLBoost.Vector3( 0.5,  0.5, 0.0), // v1\n    new GLBoost.Vector3(-0.5, -0.5, 0.0), // v2\n    new GLBoost.Vector3( 0.5, -0.5, 0.0)  // v3\n];\n\nvar colors = [\n    new GLBoost.Vector3(1.0, 0.0, 0.0),  // v0\n    new GLBoost.Vector3(0.0, 1.0, 0.0),  // v1\n    new GLBoost.Vector3(0.0, 0.0, 1.0),  // v2\n    new GLBoost.Vector3(1.0, 1.0, 0.0)   // v3\n];\n\nvar indices = [\n    0, 2, 1,\n    2, 3, 1\n];\n\nvar geometry = new GLBoost.Geometry(canvas);\ngeometry.setVerticesData({\n    position: positions,\n    color: colors\n}, [indices], GLBoost.TRIANGLE_STRIP);\n\nvar mesh = new GLBoost.Mesh(geometry);\n\nscene.add( mesh );\n\nscene.prepareForRender();\n\nvar render = function (){\n    renderer.clearCanvas();\n    renderer.draw(scene);\n    requestAnimationFrame(render);\n};\n\nfunction draw(canvas) {\n    var domElement = canvas;\n    canvas.context.drawImage(domElement, 0, 0, domElement.width, domElement.height);\n}\n\nrender();",
    "var canvas = document.getElementById(\"world\");\n\nvar renderer = new GLBoost.Renderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});\nvar scene = new GLBoost.Scene();\nvar light = new GLBoost.DirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(-1, -1, -1));\nscene.add( light );\n\nvar shader = new GLBoost.PhongShader();\nvar material = new GLBoost.ClassicMaterial();\nmaterial.shader = shader;\n\nvar geometry = new GLBoost.Cube(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(1, 0, 0));\nvar mesh = new GLBoost.Mesh(geometry, material);\nscene.add( mesh );\n\nvar camera = new GLBoost.Camera({\n    eye: new GLBoost.Vector3(0.0, 0, 3),\n    center: new GLBoost.Vector3(0.0, 0.0, 0.0),\n    up: new GLBoost.Vector3(0.0, 1.0, 0.0)\n}, {\n    fovy: 45.0,\n    aspect: 1.0,\n    zNear: 0.1,\n    zFar: 1000.0\n});\n\nscene.add( camera );\nscene.prepareForRender();\n\nvar angle = 0;\nvar render = function (){\n    renderer.clearCanvas();\n    renderer.draw(scene);\n    var rotateMatrixX = GLBoost.Matrix33.rotateX(1);\n    var rotateMatrixY = GLBoost.Matrix33.rotateY(1);\n    var rotatedVector = rotateMatrixX.multiplyVector(camera.eye);\n    rotatedVector = rotateMatrixY.multiplyVector(rotatedVector);\n    camera.eye = rotatedVector;\n    requestAnimationFrame(render);\n};\n\nrender();"
];
var codeHello = "";
var MAX = 0;
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    matchBrackets: true,
    autofocus: true,
    mode: "text/javascript"
});

var timer = 0;
var index = 0;

var c = document.getElementById("world");
var gl = c.getContext("webgl") || c.getContext("experimental-webgl");
gl.clearColor(1.0, 1.0, 1.0, 1.0);

function init() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    editor.setValue("");
    editor.setCursor(editor.lineCount());
    codeHello = codeSet[index % codeSet.length];
    pos = 0;
    MAX = codeHello.length;
    timer = setInterval(typing, 10);
    index++;
}

function typing() {
    if (pos < MAX) {
        var str = codeHello.substr(pos, 1);
        var cursor = editor.getCursor();
        var line = editor.getLine(cursor.line);
        var pos3 = {
            line: cursor.line,
            ch: line.length
        }
        editor.replaceRange(str, pos3);
        editor.setCursor(editor.lineCount());
        pos++;
    } else {
        var value = editor.getValue();
        clearInterval(timer);
        eval(value);
        setTimeout(init, 3000);
    }
}

init();

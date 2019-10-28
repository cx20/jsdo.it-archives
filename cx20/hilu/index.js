// forked from cx20's "CodeMirror サンプル" http://jsdo.it/cx20/cR0K
var pos = 0;
var code;
//var codeHello = "#include <stdio.h>\n\nint main( int argc, char* argv[] )\n{\n\tprintf(\"Hello, CodeMirror World!\\n\");\n\treturn 0;\n}\n";
var codeHello = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 resolution;\nuniform float time;\n\nvoid main() {\n    float r = sin(time+10.0);\n    float g = sin(time+20.0);\n    float b = sin(time+30.0);\n    float a = 1.0;\n    \n    gl_FragColor = vec4(r, g, b, a);\n}";
var MAX = codeHello.length;

function typing() {
    if ( pos < MAX ) {
        var c = codeHello.substr( pos, 1 );
        var value = code.getValue();
        value += c;
        code.setValue( value );
        code.setCursor( code.lineCount() );
        pos++;
    }
    else if ( pos === MAX ) {
        setTimeout(animate, 0);
    }
}

if (!window.requestAnimationFrame) {

    window.requestAnimationFrame = (function () {

        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {

                window.setTimeout(callback, 1000 / 60);

        };

    })();

}

// Get older browsers safely through init code, so users can read the
// message about how to download newer browsers.
if (!Date.now) {
    Date.now = function () {
        return +new Date();
    };
}

// Greetings to Iq/RGBA! ;)

var quality = 2,
    quality_levels = [0.5, 1, 2, 4, 8];
var toolbar, compileButton, fullscreenButton, compileTimer, errorLines = [];
var canvas, gl, buffer, currentProgram, vertexPosition, screenVertexPosition, panButton,
    parameters = {
        startTime: Date.now(),
        time: 0,
        mouseX: 0.5,
        mouseY: 0.5,
        screenWidth: 0,
        screenHeight: 0
    },
    surface = {
        centerX: 0,
        centerY: 0,
        width: 1,
        height: 1,
        isPanning: false,
        isZooming: false,
        lastX: 0,
        lastY: 0
    },
    frontTarget, backTarget, screenProgram, getWebGL, resizer = {}, compileOnChangeCode = true;


function init() {

    if (!document.addEventListener) {
        document.location = 'http://get.webgl.org/';
        return;
    }

    canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    document.body.appendChild(canvas);

    //


    //

    toolbar = document.createElement('div');
    toolbar.style.position = 'absolute';
    toolbar.style.top = '25px';
    toolbar.style.left = '25px';
    document.body.appendChild(toolbar);

    var rightside = document.createElement('div');
    rightside.style.cssFloat = 'right';
    toolbar.appendChild(rightside);

    panButton = document.createElement('button');
    panButton.textContent = 'pan/zoom';
    panButton.style.cursor = 'move';
    panButton.style.display = 'none';
    panButton.title = "Pan: left-drag, Zoom: right-drag. Use 'hide code' for a large pan/zoom area.";
    rightside.appendChild(panButton);

    fullscreenButton = document.createElement('button');
    fullscreenButton.textContent = 'fullscreen';
    fullscreenButton.title = 'Press F11 to enter or leave fullscreen mode';
    fullscreenButton.addEventListener('click', function (event) {

        if (document.body.requestFullScreen) {
            document.body.requestFullScreen();
        } else if (document.body.mozRequestFullScreen) {
            document.body.mozRequestFullScreen();
        } else if (document.body.webkitRequestFullScreen) {
            document.body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }

    }, false);

    rightside.appendChild(fullscreenButton);

    var button = document.createElement('a');
    button.textContent = 'gallery';
    button.href = 'http://glsl.heroku.com/';
    rightside.appendChild(button);

    var button = document.createElement('button');
    button.textContent = 'hide code';
    button.addEventListener('click', function (event) {

        if (isCodeVisible()) {

            button.textContent = 'show code';
            code.getWrapperElement().style.display = 'none';
            compileButton.style.visibility = 'hidden';
            set_parent_button('hidden');
            stopHideUI();

        } else {

            button.textContent = 'hide code';
            code.getWrapperElement().style.display = '';
            compileButton.style.visibility = 'visible';
            set_parent_button('visible');

        }

    }, false);
    toolbar.appendChild(button);

    var select = document.createElement('select');

    for (var i = 0; i < quality_levels.length; i++) {

        var option = document.createElement('option');
        option.textContent = quality_levels[i];
        if (quality_levels[i] == quality) option.selected = true;
        select.appendChild(option);

    }

    select.addEventListener('change', function (event) {

        quality = quality_levels[event.target.selectedIndex];
        onWindowResize();

    }, false);

    toolbar.appendChild(select);

    compileButton = document.createElement('button');
    compileButton.textContent = 'compile';
    compileButton.addEventListener('click', function (event) {

        compile();

    }, false);
    toolbar.appendChild(compileButton);

    // Initialise WebGL

    try {

        gl = canvas.getContext('experimental-webgl', {
            preserveDrawingBuffer: true
        });

    } catch (error) {}

    if (!gl) {

        alert("WebGL not supported, but code will be shown.");

    } else {

        // Create vertex buffer (2 triangles)

        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]), gl.STATIC_DRAW);

        // Create surface buffer (coordinates at screen corners)

        surface.buffer = gl.createBuffer();
    }

    // initialize code editor
    code = CodeMirror(document.body, {
        lineNumbers: true,
        matchBrackets: true,
        indentWithTabs: true,
        tabSize: 4,
        indentUnit: 4,
        mode: "text/x-glsl",
        onChange: function () {
            if (compileOnChangeCode) {
                clearTimeout(compileTimer);
                compileTimer = setTimeout(compile, 500);
            }
        }
    });
    code.getWrapperElement().style.display = '';
    resizer.offsetMouseX = 0;
    resizer.offsetMouseY = 0;
    resizer.isResizing = false;
    resizer.currentWidth = 100;
    resizer.currentHeight = 100;
    resizer.minWidth = 100;
    resizer.minHeight = 100;
    resizer.maxWidth = 100;
    resizer.maxHeight = 100;
    resizer.element = document.createElement('div');
    resizer.element.className = 'resizer';
    code.getWrapperElement().appendChild(resizer.element);

    resizer.element.addEventListener('mousedown', function (event) {
        if (event.button !== 2) {
            resizer.offsetMouseX = event.clientX - resizer.currentWidth;
            resizer.offsetMouseY = event.clientY - resizer.currentHeight;
            resizer.isResizing = true;
            event.preventDefault();
        }
    }, false);

    if (gl) {

        var surfaceMouseDown = function (event) {

            if (event.shiftKey) {
                resetSurface();
            }

            if (event.button === 0) {
                surface.isPanning = true;
                document.body.style.cursor = 'move';
            } else {
                surface.isZooming = true;
                document.body.style.cursor = 'se-resize';
                panButton.style.cursor = 'se-resize';
            }

            surface.lastX = event.clientX;
            surface.lastY = event.clientY;
            event.preventDefault();

        };

        var noContextMenu = function (event) {

            event.preventDefault();

        };

        canvas.addEventListener('mousedown', surfaceMouseDown, false);
        panButton.addEventListener('mousedown', surfaceMouseDown, false);

        canvas.addEventListener('contextmenu', noContextMenu, false);
        panButton.addEventListener('contextmenu', noContextMenu, false);

        setInterval( typing, 100 );
    }

    var clientXLast, clientYLast;

    document.addEventListener('mousemove', function (event) {

        var clientX = event.clientX;
        var clientY = event.clientY;

        if (clientXLast == clientX && clientYLast == clientY)
            return;

        clientXLast = clientX;
        clientYLast = clientY;

        stopHideUI();

        var codeElement, dx, dy;

        parameters.mouseX = clientX / window.innerWidth;
        parameters.mouseY = 1 - clientY / window.innerHeight;

        if (resizer.isResizing) {

            resizer.currentWidth = Math.max(Math.min(clientX - resizer.offsetMouseX, resizer.maxWidth), resizer.minWidth);
            resizer.currentHeight = Math.max(Math.min(clientY - resizer.offsetMouseY, resizer.maxHeight), resizer.minWidth);
            codeElement = code.getWrapperElement();
            codeElement.style.width = resizer.currentWidth + 'px';
            codeElement.style.height = resizer.currentHeight + 'px';
            code.refresh();
            event.preventDefault();

        } else if (surface.isPanning) {

            dx = clientX - surface.lastX;
            dy = clientY - surface.lastY;
            surface.centerX -= dx * surface.width / window.innerWidth;
            surface.centerY += dy * surface.height / window.innerHeight;
            surface.lastX = clientX;
            surface.lastY = clientY;
            computeSurfaceCorners();
            event.preventDefault();

        } else if (surface.isZooming) {

            dx = clientX - surface.lastX;
            dy = clientY - surface.lastY;
            surface.height *= Math.pow(0.997, dx + dy);
            surface.lastX = clientX;
            surface.lastY = clientY;
            computeSurfaceCorners();
            event.preventDefault();

        }
    }, false);

    function settleDown(event) {
        resizer.isResizing = surface.isPanning = surface.isZooming = false;
        document.body.style.cursor = 'default';
        panButton.style.cursor = 'move';
    }

    function mouseLeave(event) {
        settleDown(event);

        if (!isCodeVisible())
            startHideUITimer();
    }

    document.addEventListener('mouseup', settleDown, false);
    document.addEventListener('mouseleave', mouseLeave, false);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);
/*
    //				load_url_code();
    code.getWrapperElement().text = document.getElementById('example').textContent;
    code.refresh();
*/
    compileScreenProgram();

}

function isCodeVisible() {
    return code && code.getWrapperElement().style.display !== 'none';
}

var hideUITimer;
var isUIHidden = false;

function startHideUITimer() {

    stopHideUITimer();
    if (!isUIHidden && !isCodeVisible())
        hideUITimer = window.setTimeout(onHideUITimer, 1000 * 5);

    function onHideUITimer() {

        stopHideUITimer();
        if (!isUIHidden && !isCodeVisible()) {

            isUIHidden = true;
            toolbar.style.display = 'none';
            document.body.style.cursor = 'none';
        }
    }

    function stopHideUITimer() {

        if (hideUITimer) {

            window.clearTimeout(hideUITimer);
            hideUITimer = 0;
        }
    }
}

function stopHideUI() {

    if (isUIHidden) {

        isUIHidden = false;
        toolbar.style.display = '';
        document.body.style.cursor = '';
    }
    startHideUITimer();
}


function computeSurfaceCorners() {

    if (gl) {

        surface.width = surface.height * parameters.screenWidth / parameters.screenHeight;

        var halfWidth = surface.width * 0.5,
            halfHeight = surface.height * 0.5;

        gl.bindBuffer(gl.ARRAY_BUFFER, surface.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            surface.centerX - halfWidth, surface.centerY - halfHeight,
            surface.centerX + halfWidth, surface.centerY - halfHeight,
            surface.centerX - halfWidth, surface.centerY + halfHeight,
            surface.centerX + halfWidth, surface.centerY - halfHeight,
            surface.centerX + halfWidth, surface.centerY + halfHeight,
            surface.centerX - halfWidth, surface.centerY + halfHeight
        ]), gl.STATIC_DRAW);

    }

}

function resetSurface() {

    surface.centerX = surface.centerY = 0;
    surface.height = 1;
    computeSurfaceCorners();

}

function compile() {

    if (!gl) {

        if (!getWebGL) {

            getWebGL = true;
            compileButton.addEventListener('click', function (event) {

                document.location = 'http://get.webgl.org/';

            }, false);
            compileButton.title = 'http://get.webgl.org/';
            compileButton.style.color = '#ff0000';
            compileButton.textContent = 'WebGL not supported!';

        }
        return;

    }

    var program = gl.createProgram();
    var fragment = code.getValue();
    var vertex = document.getElementById('surfaceVertexShader').textContent;

    var vs = createShader(vertex, gl.VERTEX_SHADER);
    var fs = createShader(fragment, gl.FRAGMENT_SHADER);

    if (vs === null || fs === null) return null;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.deleteShader(vs);
    gl.deleteShader(fs);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {

        var error = gl.getProgramInfoLog(program);

        compileButton.title = error;
        console.error(error);

        console.error('VALIDATE_STATUS: ' + gl.getProgramParameter(program, gl.VALIDATE_STATUS), 'ERROR: ' + gl.getError());
        compileButton.style.color = '#ff0000';
        compileButton.textContent = 'compiled with errors';

        return;

    }

    if (currentProgram) {

        gl.deleteProgram(currentProgram);
        //setURL(fragment);

    }

    currentProgram = program;

    compileButton.style.color = '#00ff00';
    compileButton.textContent = 'compiled successfully';

    panButton.style.display = (fragment.indexOf('varying vec2 surfacePosition;') >= 0) ? 'inline' : 'none';

    // Cache uniforms

    cacheUniformLocation(program, 'time');
    cacheUniformLocation(program, 'mouse');
    cacheUniformLocation(program, 'resolution');
    cacheUniformLocation(program, 'backbuffer');
    cacheUniformLocation(program, 'surfaceSize');

    // Load program into GPU

    gl.useProgram(currentProgram);

    // Set up buffers

    surface.positionAttribute = gl.getAttribLocation(currentProgram, "surfacePosAttrib");
    gl.enableVertexAttribArray(surface.positionAttribute);

    vertexPosition = gl.getAttribLocation(currentProgram, "position");
    gl.enableVertexAttribArray(vertexPosition);

}

function compileScreenProgram() {

    if (!gl) {
        return;
    }

    var program = gl.createProgram();
    var fragment = document.getElementById('fragmentShader').textContent;
    var vertex = document.getElementById('vertexShader').textContent;

    var vs = createShader(vertex, gl.VERTEX_SHADER);
    var fs = createShader(fragment, gl.FRAGMENT_SHADER);

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.deleteShader(vs);
    gl.deleteShader(fs);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {

        console.error('VALIDATE_STATUS: ' + gl.getProgramParameter(program, gl.VALIDATE_STATUS), 'ERROR: ' + gl.getError());

        return;

    }

    screenProgram = program;

    gl.useProgram(screenProgram);

    cacheUniformLocation(program, 'resolution');
    cacheUniformLocation(program, 'texture');

    screenVertexPosition = gl.getAttribLocation(screenProgram, "position");
    gl.enableVertexAttribArray(screenVertexPosition);

}

function cacheUniformLocation(program, label) {

    if (program.uniformsCache === undefined) {

        program.uniformsCache = {};

    }

    program.uniformsCache[label] = gl.getUniformLocation(program, label);

}

//

function createTarget(width, height) {

    var target = {};

    target.framebuffer = gl.createFramebuffer();
    target.renderbuffer = gl.createRenderbuffer();
    target.texture = gl.createTexture();

    // set up framebuffer

    gl.bindTexture(gl.TEXTURE_2D, target.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target.texture, 0);

    // set up renderbuffer

    gl.bindRenderbuffer(gl.RENDERBUFFER, target.renderbuffer);

    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, target.renderbuffer);

    // clean up

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return target;

}

function createRenderTargets() {

    frontTarget = createTarget(parameters.screenWidth, parameters.screenHeight);
    backTarget = createTarget(parameters.screenWidth, parameters.screenHeight);

}

//

var dummyFunction = function () {};


//

function htmlEncode(str) {

    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

}

//

function createShader(src, type) {

    var shader = gl.createShader(type);
    var line, lineNum, lineError, index = 0,
        indexEnd;

    while (errorLines.length > 0) {
        line = errorLines.pop();
        code.setLineClass(line, null);
        code.clearMarker(line);
    }

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    compileButton.title = '';

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {

        var error = gl.getShaderInfoLog(shader);

        // Remove trailing linefeed, for FireFox's benefit.
        while ((error.length > 1) && (error.charCodeAt(error.length - 1) < 32)) {
            error = error.substring(0, error.length - 1);
        }

        compileButton.title = error;
        console.error(error);

        compileButton.style.color = '#ff0000';
        compileButton.textContent = 'compiled with errors';

        while (index >= 0) {
            index = error.indexOf("ERROR: 0:", index);
            if (index < 0) {
                break;
            }
            index += 9;
            indexEnd = error.indexOf(':', index);
            if (indexEnd > index) {
                lineNum = parseInt(error.substring(index, indexEnd));
                if ((!isNaN(lineNum)) && (lineNum > 0)) {
                    index = indexEnd + 1;
                    indexEnd = error.indexOf("ERROR: 0:", index);
                    lineError = htmlEncode((indexEnd > index) ? error.substring(index, indexEnd) : error.substring(index));
                    line = code.setMarker(lineNum - 1, '<abbr title="' + lineError + '">' + lineNum + '</abbr>', "errorMarker");
                    code.setLineClass(line, "errorLine");
                    errorLines.push(line);
                }
            }
        }

        return null;

    }

    return shader;

}

//

function onWindowResize(event) {

    var isMaxWidth = ((resizer.currentWidth === resizer.maxWidth) || (resizer.currentWidth === resizer.minWidth)),
        isMaxHeight = ((resizer.currentHeight === resizer.maxHeight) || (resizer.currentHeight === resizer.minHeight));

    toolbar.style.width = window.innerWidth - 47 + 'px';

    resizer.isResizing = false;
    resizer.maxWidth = window.innerWidth - 75;
    resizer.maxHeight = window.innerHeight - 125;
    if (isMaxWidth || (resizer.currentWidth > resizer.maxWidth)) {
        resizer.currentWidth = resizer.maxWidth;
    }
    if (isMaxHeight || (resizer.currentHeight > resizer.maxHeight)) {
        resizer.currentHeight = resizer.maxHeight;
    }
    if (resizer.currentWidth < resizer.minWidth) {
        resizer.currentWidth = resizer.minWidth;
    }
    if (resizer.currentHeight < resizer.minHeight) {
        resizer.currentHeight = resizer.minHeight;
    }

    code.getWrapperElement().style.top = '75px';
    code.getWrapperElement().style.left = '25px';
    code.getWrapperElement().style.width = resizer.currentWidth + 'px';
    code.getWrapperElement().style.height = resizer.currentHeight + 'px';

    canvas.width = window.innerWidth / quality;
    canvas.height = window.innerHeight / quality;

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    parameters.screenWidth = canvas.width;
    parameters.screenHeight = canvas.height;

    computeSurfaceCorners();

    if (gl) {

        gl.viewport(0, 0, canvas.width, canvas.height);

        createRenderTargets();

    }
}

//

function animate() {

    requestAnimationFrame(animate);
    render();

}

function render() {

    if (!currentProgram) return;

    parameters.time = Date.now() - parameters.startTime;

    // Set uniforms for custom shader

    gl.useProgram(currentProgram);

    gl.uniform1f(currentProgram.uniformsCache.time, parameters.time / 1000);
    gl.uniform2f(currentProgram.uniformsCache.mouse, parameters.mouseX, parameters.mouseY);
    gl.uniform2f(currentProgram.uniformsCache.resolution, parameters.screenWidth, parameters.screenHeight);
    gl.uniform1i(currentProgram.uniformsCache.backbuffer, 0);
    gl.uniform2f(currentProgram.uniformsCache.surfaceSize, surface.width, surface.height);

    gl.bindBuffer(gl.ARRAY_BUFFER, surface.buffer);
    gl.vertexAttribPointer(surface.positionAttribute, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, backTarget.texture);

    // Render custom shader to front buffer

    gl.bindFramebuffer(gl.FRAMEBUFFER, frontTarget.framebuffer);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // Set uniforms for screen shader

    gl.useProgram(screenProgram);

    gl.uniform2f(screenProgram.uniformsCache.resolution, parameters.screenWidth, parameters.screenHeight);
    gl.uniform1i(screenProgram.uniformsCache.texture, 1);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(screenVertexPosition, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, frontTarget.texture);

    // Render front buffer to screen

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // Swap buffers

    var tmp = frontTarget;
    frontTarget = backTarget;
    backTarget = tmp;

}

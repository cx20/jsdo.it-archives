// forked from cx20's "WebRuby を自動コーディングしてみるテスト" http://jsdo.it/cx20/kd0i
// forked from cx20's "CodeMirror で自動書記のテスト" http://jsdo.it/cx20/3kwZ
// forked from cx20's "CodeMirror サンプル" http://jsdo.it/cx20/cR0K

window.addEventListener('DOMContentLoaded', function () {

  var $ = function (s) { return document.querySelector(s); };
  var frame = $('#frame');
  var tty = new TTY($('#screen'), frame);
  var dos = new DOS(tty);

  var lores = new LoRes($('#lores'), 40, 48);
  var hires = new HiRes($('#hires'), 280, 192);
  var hires2 = new HiRes($('#hires2'), 280, 192);
  var display = {
    state: { graphics: false, full: true, page1: true, lores: true },
    setState: function (state, value /* ... */) {
      var args = Array.prototype.slice.call(arguments);
      while (args.length) {
        state = args.shift();
        value = args.shift();
        this.state[state] = value;
      }

      if (this.state.graphics) {
        lores.show(this.state.lores);
        hires.show(!this.state.lores && this.state.page1);
        hires2.show(!this.state.lores && !this.state.page1);
        tty.splitScreen(tty.getScreenSize().height - (this.state.full ? 0 : 4));
      } else {
        lores.show(false);
        hires.show(false);
        hires2.show(false);
        tty.splitScreen(0);
      }
    }
  };
  var pdl = [0, 0, 0, 0];

  // Lexical highlighting, if available
  var editor;
  if (typeof CodeMirror === 'function') {
    editor = new CodeMirror($('#editorframe'), {
      mode: 'basic',
      tabMode: 'default',
      content: $('#source').value,
      height: '100%'
    });
  } else {
    editor = (function () {
      var textArea = document.createElement('textarea');
      $('#editorframe').appendChild(textArea);
      textArea.style.width = '598px';
      textArea.style.height = '384px';
      return {
        getValue: function () {
          return textArea.value;
        },
        setValue: function (value) {
          textArea.value = value;
        },
        setCursor: function (line, column) {
          // TODO: Implement me!
        }
      };
    }());
  }

  function getSource() {
    return editor.getValue();
  }

  function setSource(source) {
    editor.setValue(source);
  }

  var program;
  $('#btn_run').addEventListener('click', function () {
    run();
  });
  function run() {
    dos.reset();
    tty.reset();
    tty.autoScroll = true;

    try {
      program = basic.compile(getSource());
    } catch (e) {
      if (e instanceof basic.ParseError) {
        editor.setCursor({ line: e.line - 1, ch: e.column - 1 });
        console.log(e.message +
                    ' (source line:' + e.line + ', column:' + e.column + ')');
      }
      alert(e);
      return;
    }

    stopped = false;
    updateUI();

    program.init({
      tty: tty,
      hires: hires,
      hires2: hires2,
      lores: lores,
      display: display,
      paddle: function (n) { return pdl[n]; }
    });
    setTimeout(driver, 0);
  }

  // Mouse-as-Joystick
  var wrapper = $('#screen-wrapper');
  wrapper.addEventListener('mousemove', function (e) {
    var rect = wrapper.getBoundingClientRect(),
        x = e.clientX - rect.left, y = e.clientY - rect.top;
    function clamp(n, min, max) { return n < min ? min : n > max ? max : n; }
    pdl[0] = clamp(x / (rect.width - 1), 0, 1);
    pdl[1] = clamp(y / (rect.height - 1), 0, 1);
  });

  var stopped = true;
  function updateUI() {
    $("#btn_run").disabled = stopped ? "" : "disabled";

    if (stopped) {
      $("#btn_run").focus();
    } else {
      tty.focus();
    }
  }


  // TODO: Expose a RESPONSIVE |---+--------| FAST slider in the UI
  // Number of steps to execute before yielding execution
  // (Use a prime to minimize risk of phasing with loops)
  var NUM_SYNCHRONOUS_STEPS = 37;

  function driver() {
    var state = basic.STATE_RUNNING;
    var statements = NUM_SYNCHRONOUS_STEPS;

    while (!stopped && state === basic.STATE_RUNNING && statements > 0) {

      try {
        state = program.step(driver);
      } catch (e) {
        console.log(e);
        alert(e.message ? e.message : e);
        stopped = true;
        updateUI();
        return;
      }

      statements -= 1;
    }

    if (state === basic.STATE_STOPPED || stopped) {
      stopped = true;
      updateUI();
    } else if (state === basic.STATE_BLOCKED) {
      // Fall out
    } else { // state === basic.STATE_RUNNING
      setTimeout(driver, 0); // Keep going
    }
  }

  init();
  
  function init() {
    tid = setInterval( typing, 100 );
  }
  
  var pos = 0;
  //var codeHello = "10 DIM I\n20 FOR I = 1 TO 10\n30 PRINT I\n40 NEXT I\n";
  var codeHello = "10 PRINT \"Hello, Basic World!\"\n20 DIM I\n30 FOR I = 1 TO 10\n40 PRINT I\n50 NEXT I\n";
  var MAX = codeHello.length;

  function typing() {
      if ( pos < MAX ) {
          var c = codeHello.substr( pos, 1 );
          var value = getSource();
          value += c;
          setSource( value );
          pos++;
      } 
      else if ( pos === MAX ) {
          clearInterval( tid );
          setTimeout(run, 0);
      }
  }
});

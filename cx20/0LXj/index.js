// forked from cx20's "Matter.js でドット絵を物理演算してみるテスト（その２改2）" http://jsdo.it/cx20/axih
// forked from cx20's "Matter.js でドット絵を物理演算してみるテスト（その２改）" http://jsdo.it/cx20/lGhf
// forked from cx20's "Matter.js でドット絵を物理演算してみるテスト（その２）" http://jsdo.it/cx20/x3rlt
// forked from cx20's "Matter.js でドット絵を物理演算してみるテスト" http://jsdo.it/cx20/pjXR
var DOT_SIZE = 16;
var X_START_POS = 100;
var Y_START_POS = 80;

(function() {

    // Matter aliases
    var Engine = Matter.Engine,
        Gui = Matter.Gui,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Constraint = Matter.Constraint,
        Events = Matter.Events;

    var Demo = {};

    var _engine,
        _gui,
        _sceneName;
    
    Demo.init = function() {
        var container = document.getElementById('canvas-container');

        // engine options - these are the defaults
        var options = {
            positionIterations: 6,
            velocityIterations: 4,
            enableSleeping: false,
            timeScale: 1
        };

        // create a Matter engine, with the element to insert the canvas into
        // NOTE: this is actually Matter.Engine.create(), see the aliases at top of this file
        _engine = Engine.create(container, options);

        // run the engine
        Engine.run(_engine);

        // default scene function name
        _sceneName = 'stress';
        //_sceneName = 'wreckingBall';
        
        // get the scene function name from hash
        if (window.location.hash.length !== 0) 
            _sceneName = window.location.hash.replace('#', '');

        // set up a scene with bodies
        Demo[_sceneName]();

        // set up demo interface
        Demo.initControls();
    };

    if (window.addEventListener) {
        window.addEventListener('load', Demo.init);
    } else if (window.attachEvent) {
        window.attachEvent('load', Demo.init);
    }

    Demo.initControls = function() {
    };

    Demo.reset = function() {
        var _world = _engine.world;
        
        World.clear(_world);
        Engine.clear(_engine);

        _engine.enableSleeping = false;
        _engine.world.gravity.y = 0.2;

        var offset = 5;
        // left box
        World.addBody(_world, Bodies.rectangle(97, 191, 96, 2, { angle: Math.PI * 36.87/180, isStatic: true }));
        // right box
        World.addBody(_world, Bodies.rectangle(334, 169, 128, 2, { angle: Math.PI * -53.13/180, isStatic: true }));
        // bottom box
        World.addBody(_world, Bodies.rectangle(220, 212, 156, 2, { isStatic: false }));
        World.addBody(_world, Bodies.rectangle(135, 300, 2, 160, { isStatic: true }));
        World.addBody(_world, Bodies.rectangle(215, 380, 160, 2, { isStatic: true }));
        World.addBody(_world, Bodies.rectangle(295, 300, 2, 160, { isStatic: true }));

        World.addBody(_world, Bodies.rectangle(230, 400, 350, 20, { isStatic: true }));
        var renderOptions = _engine.render.options;
        
        renderOptions.wireframes = false;
        renderOptions.showDebug = false;
        renderOptions.showBroadphase = false;
        renderOptions.showBounds = false;
        renderOptions.showVelocity = false;
        renderOptions.showCollisions = false;
        renderOptions.showAxes = false;
        renderOptions.showPositions = false;
        renderOptions.showAngleIndicator = false;
        renderOptions.showIds = false;
        renderOptions.showShadows = false;
        renderOptions.background = '#000';
    };

    Demo.stress = function() {
        var _world = _engine.world;
        
        Demo.reset();
        var _i = 0;
        var alpha = Math.PI * -53.13/180;
        
        // left box
        var stack1 = Composites.stack(0, 0, 3*2, 3*2, 0, 0, function(x, y, column, row) {
            var x1 = column * DOT_SIZE;
            var y1 = row * DOT_SIZE;
            var x2 = x1 * Math.cos(alpha) - y1 * Math.sin(alpha) + 62;
            var y2 = x1 * Math.sin(alpha) + y1 * Math.cos(alpha) + 148;
            return Bodies.circle(x2, y2, DOT_SIZE*0.5, { render:{ fillStyle:"#ff0000", strokeStyle:"#707070", lineWidth:2 } });
            //return Bodies.circle(x2, y2, DOT_SIZE*0.5, { render:{} });
        });
        World.addComposite(_world, stack1);

        // right box
        var stack2 = Composites.stack(0, 0, 4*2, 4*2, 0, 0, function(x, y, column, row) {
            var x1 = column * DOT_SIZE;
            var y1 = row * DOT_SIZE;
            var x2 = x1 * Math.cos(alpha) - y1 * Math.sin(alpha) + 197;
            var y2 = x1 * Math.sin(alpha) + y1 * Math.cos(alpha) + 133;
            return Bodies.circle(x2, y2, DOT_SIZE*0.5, { render:{ fillStyle:"#0000ff", strokeStyle:"#707070", lineWidth:2 } });
            //return Bodies.circle(x2, y2, DOT_SIZE*0.5, { render:{} });
        });
        World.addComposite(_world, stack2);

        var renderOptions = _engine.render.options;
        renderOptions.showAngleIndicator = false;
    };
})();

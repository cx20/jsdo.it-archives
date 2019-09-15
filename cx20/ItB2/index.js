// forked from cx20's "[WebGL] GLBoost + Particle を試してみるテスト（ES5編）" http://jsdo.it/cx20/WlL5
// forked from cx20's "[WebGL] GLBoost + Particle を試してみるテスト（ES6編）" http://jsdo.it/cx20/gM7m
// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト（その３）" http://jsdo.it/cx20/ed5q
// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト（その２）" http://jsdo.it/cx20/aeZe
// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト" http://jsdo.it/cx20/2Nrf
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その３）" http://jsdo.it/cx20/Elgc
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その２）" http://jsdo.it/cx20/Uvah
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

"use strict";

// for liquidfun.js
var world = null;
var timeStep = 1.0 / 60.0;
var velocityIterations = 8;
var positionIterations = 3;
var g_groundBody = null;
var test;
//var METER = 100;
var METER = 200;
var OFFSET_X = -465 / 2;
var OFFSET_Y = -465 / 2;
var windowWidth = 465;
var windowHeight = 465;

function WaveMachine() {
    var bdDef = new b2BodyDef();
    var bobo = world.CreateBody(bdDef);
    var wg = new b2PolygonShape();
    wg.SetAsBoxXYCenterAngle(
        windowWidth / METER / 2,
        0.05,
        new b2Vec2(windowWidth / METER / 2, windowHeight / METER + 0.05),
        0
    );
    bobo.CreateFixtureFromShape(wg, 5);
    var wgl = new b2PolygonShape();
    wgl.SetAsBoxXYCenterAngle(
        0.05,
        windowHeight / METER / 2,
        new b2Vec2(-0.05, windowHeight / METER / 2),
        0
    );
    bobo.CreateFixtureFromShape(wgl, 5);
    var wgr = new b2PolygonShape();
    wgr.SetAsBoxXYCenterAngle(
        0.05,
        windowHeight / METER / 2,
        new b2Vec2(windowWidth / METER + 0.05,
            windowHeight / METER / 2),
        0
    );
    bobo.CreateFixtureFromShape(wgr, 5);
    var psd = new b2ParticleSystemDef();
    //psd.radius = 0.025;
    psd.radius = 0.025 * 2;
    psd.dampingStrength = 0.2;
    var particleSystem = world.CreateParticleSystem(psd);
    var box = new b2PolygonShape();
    box.SetAsBoxXYCenterAngle(
        1,
        2,
        new b2Vec2(windowWidth / 2 / METER, -windowHeight / 4 / METER),
        0
    );
    var particleGroupDef = new b2ParticleGroupDef();
    particleGroupDef.shape = box;
    var particleGroup = particleSystem.CreateParticleGroup(particleGroupDef);
}

WaveMachine.prototype.Step = function() {
    world.Step(timeStep, velocityIterations, positionIterations);
    this.time += timeStep;
}

function testSwitch(testName) {
    world.SetGravity(new b2Vec2(0, 10));
    var bd = new b2BodyDef;
    g_groundBody = world.CreateBody(bd);
    test = new window[testName];
}

// for glboost.js
var canvas;
var renderer;
var scene;
var camera;
var particlesPosition = [];
var particlesColors = [];
var particleGeometry;

function init() {
    testSwitch("WaveMachine");
    canvas = document.getElementById("world");

    renderer = new GLBoost.Renderer({
        canvas: canvas,
        clearColor: {
            red: 0.0,
            green: 0.0,
            blue: 0.0,
            alpha: 1
        }
    });
    var gl = renderer.glContext;
    gl.disable(gl.DEPTH_TEST);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    scene = new GLBoost.Scene();

    camera = new GLBoost.Camera({
        eye: new GLBoost.Vector3(0.0, 1.5, 10.0),
        center: new GLBoost.Vector3(0.0, 1.5, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 45.0,
        aspect: 1.0,
        zNear: 0.1,
        zFar: 500.0
    });
    scene.add(camera);

    var directionalLight = new GLBoost.DirectionalLight(new GLBoost.Vector3(0.3, 0.3, 0.3), new GLBoost.Vector3(0, 0, -1), '#world');
    scene.add(directionalLight);

    var particles = world.particleSystems[0].GetPositionBuffer();

    var wide = 10;
    particlesPosition = [];
    particlesColors = [];
    for (let i = 0; i < particles.length; i++) {
        particlesColors.push(new GLBoost.Vector4(Math.random(), Math.random(), Math.random(), 1));
        particlesPosition.push(new GLBoost.Vector3((Math.random() - 0.5) * wide, (Math.random() - 0.5) * wide, (Math.random() - 0.5) * 0));
        //particlesPosition.push(new GLBoost.Vector3((Math.random() - 0.5) * wide, (Math.random() - 0.5) * wide, (Math.random() - 0.5) * wide));
    }

    particleGeometry = new GLBoost.Particle({
        position: particlesPosition,
        color: particlesColors
    }, 0.5, 0.5, null, GLBoost.DYNAMIC_DRAW, '#world');

    var material = new GLBoost.ClassicMaterial('#world');
    //var texture = new GLBoost.Texture('/assets/S/0/o/W/S0oWl.png', '#world'); // fireball.png
    var texture = new GLBoost.Texture('../../assets/q/p/2/z/qp2zo.png', '#world'); // iceball.png
    material.diffuseTexture = texture;
    var particle = new GLBoost.Mesh(particleGeometry, material);
    scene.add(particle);

    scene.prepareForRender();
}


var render = function() {
    renderer.clearCanvas();
    renderer.draw(scene);

    //var rotateMatrix = GLBoost.Matrix33.rotateY(-0.01);
    var rotateMatrix = GLBoost.Matrix33.rotateY(0);
    var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
    camera.eye = rotatedVector;

    world.Step(timeStep, velocityIterations, positionIterations);
    var particles = world.particleSystems[0].GetPositionBuffer();

    for (var i = 0; i < particles.length; i++) {
        var x = particles[i * 2] * METER + OFFSET_X;
        var y = 465 - particles[(i * 2) + 1] * METER + OFFSET_Y;
        var z = 0;
        particlesPosition[i].x = x / 100;
        particlesPosition[i].y = y / 100;
    }

    particleGeometry.updateVerticesData({
        position: particlesPosition
    }, 0.5, 0.5, null);

    requestAnimationFrame(render);
};

var gravity = new b2Vec2(0, 10);
world = new b2World(gravity);

init();
render();

// forked from cx20's "pixi.js v3 を試してみるテスト" http://jsdo.it/cx20/4c4K
// forked from cx20's "pixi.js v2 を試してみるテスト" http://jsdo.it/cx20/vmuo

var renderer = PIXI.autoDetectRenderer(465, 465);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// custom filter
function SmokeFilter(fragmentSource)
{

    PIXI.Filter.call(this,
        // vertex shader
        null,
        // fragment shader
        fragmentSource,
        // set the uniforms
        {
            resolution : { type: '2f', value: [465, 465] },
            alpha : { type: '1f', value: 1.0 },
            shift : { type: '1f', value: 1.6 },
            time : { type: '1f', value: 0 },
            speed : { type: '2f', value: [0.7, 0.4] }
        }
    );
}

SmokeFilter.prototype = Object.create(PIXI.Filter.prototype);
SmokeFilter.prototype.constructor = SmokeFilter;

function NoiseFilter(fragmentSource)
{

    PIXI.Filter.call(this,
        // vertex shader
        null,
        // fragment shader
        fragmentSource,
        // set the uniforms
        {
            //uScan : { type: 'sampler2D', value:new PIXI.Texture.fromImage("scan.png")},
            power : { type: '1f', value: 3/465 },
            noise : { type: '1f', value: 0.2 }
        }
    );
}

NoiseFilter.prototype = Object.create(PIXI.Filter.prototype);
NoiseFilter.prototype.constructor = NoiseFilter;

var bg = PIXI.Sprite.fromImage("../../assets/8/u/k/a/8ukah.jpg");
stage.addChild(bg);

var fragmentSrc = document.getElementById("fs1").textContent;
var smokeFilter = new SmokeFilter(fragmentSrc);
bg.filters = [smokeFilter];

var logo = PIXI.Sprite.fromImage("../../assets/8/K/c/3/8Kc3Z.png");
logo.position.x = 0;
logo.position.y = 465/3;
stage.addChild(logo);

var fragmentSrc = document.getElementById("fs2").textContent;
var noiseFilter = new NoiseFilter(fragmentSrc);
stage.filters = [noiseFilter];

var count = 0;
var count2 = 0;
var ease = 0;
function animate() {
    count += 0.01;
    smokeFilter.uniforms.time = count;

    count2++;
    if(count2 > 150)
    {
        count2 = 0;
        ease = ( Math.random() * 30);
    }

    ease *= 0.9;
    noiseFilter.uniforms.power += (ease -  noiseFilter.uniforms.power ) * 0.3;
    ease =  0.8 + Math.random() * 0.2;
    noiseFilter.uniforms.noise += 0.1;
    noiseFilter.uniforms.noise %= 1;

    renderer.render(stage);
    requestAnimationFrame( animate );
}

animate();

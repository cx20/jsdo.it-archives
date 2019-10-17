// forked from Francesco Trillini's "GooglePixelate" http://codepen.io/Francext/pen/frFIh

/*
 * Copyright MIT © <2013> <Francesco Trillini>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and 
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var DOT_SIZE = 20;
var X_START_POS = 50;
var Y_START_POS = 0;
var X_MAX = 440;
var Y_MAX = 440;

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
	"‥","‥","‥","‥","‥","‥","‥","‥","‥","‥","‥","‥","‥","□","□","□",
	"‥","‥","‥","‥","‥","‥","〓","〓","〓","〓","〓","‥","‥","□","□","□",
	"‥","‥","‥","‥","‥","〓","〓","〓","〓","〓","〓","〓","〓","〓","□","□",
	"‥","‥","‥","‥","‥","■","■","■","□","□","■","□","‥","■","■","■",
	"‥","‥","‥","‥","■","□","■","□","□","□","■","□","□","■","■","■",
	"‥","‥","‥","‥","■","□","■","■","□","□","□","■","□","□","□","■",
	"‥","‥","‥","‥","■","■","□","□","□","□","■","■","■","■","■","‥",
	"‥","‥","‥","‥","‥","‥","□","□","□","□","□","□","□","■","‥","‥",
	"‥","‥","■","■","■","■","■","〓","■","■","■","〓","■","‥","‥","‥",
	"‥","■","■","■","■","■","■","■","〓","■","■","■","〓","‥","‥","■",
	"□","□","■","■","■","■","■","■","〓","〓","〓","〓","〓","‥","‥","■",
	"□","□","□","‥","〓","〓","■","〓","〓","□","〓","〓","□","〓","■","■",
	"‥","□","‥","■","〓","〓","〓","〓","〓","〓","〓","〓","〓","〓","■","■",
	"‥","‥","■","■","■","〓","〓","〓","〓","〓","〓","〓","〓","〓","■","■",
	"‥","■","■","■","〓","〓","〓","〓","〓","〓","〓","‥","‥","‥","‥","‥",
	"‥","■","‥","‥","〓","〓","〓","〓","‥","‥","‥","‥","‥","‥","‥","‥"
];

var GooglePixelate = {};

(function (GooglePixelate, undefined) {

    var self = window.GooglePixelate || {}, canvas, context, color = {
            r: 0,
            g: 0,
            b: 0
        }, text = [],
        dirtyRegions = [],
        bounceFactor = 0.6,
        cycle = 0.0,
        FPS = 60;

    /*
     * Init.
     */

    self.init = function () {

        var body = document.querySelector('body');

        canvas = document.createElement('canvas');

        canvas.setAttribute('id', 'canvas');
        canvas.setAttribute('width', window.innerWidth);
        canvas.setAttribute('height', window.innerHeight);
        canvas.setAttribute('style', 'background-color: #000; position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;');

        body.appendChild(canvas);

        // Browser supports canvas?
        if ( !! (self.gotSupport())) {

            context = canvas.getContext('2d');

            // Event
            window.onresize = onResize;

            self.buildTexture();

        } else {

            console.error('Please, update your browser for seeing this animation.');

        }

    };

    /*
     * On resize window event.
     */

    function onResize() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }

    /*
     * Checks if browser supports canvas element.
     */

    self.gotSupport = function () {

        return canvas.getContext && canvas.getContext('2d');

    };

    /*
     * Building texture.
     */

    self.buildTexture = function () {

        // Let's start by drawing the original texture
        if (text.length === 0) {

            //context.font =  canvas.width / 8 + 'px Kristen ITC, sans-serif';
            context.font = '20px ＭＳゴシック';
            context.fillStyle = 'rgb(255, 255, 255)';
            context.textAlign = 'center';
            //context.fillText('Google', canvas.width / 2, canvas.height / 2);

            for (var i = 0; i < dataSet.length; i++) {
                var pos_x = canvas.width / 2 - (DOT_SIZE*16/2) + (i % 16) * DOT_SIZE;
                var pos_y = canvas.width / 2 - (DOT_SIZE*16/2) + Math.floor(i / 16) * DOT_SIZE;
                context.fillText(dataSet[i], pos_x, pos_y);
            }
            var surface = context.getImageData(0, 0, canvas.width, canvas.height);

            context.clearRect(0, 0, canvas.width, canvas.height);

            for (var rgb = 0, pixel = surface.data.length; rgb < pixel; rgb += 120 + Math.floor(Math.random() * 60)) {

                // Draw only if white pixels found
                if (surface.data[rgb] === 255 && surface.data[rgb + 1] === 255 && surface.data[rgb + 2] === 255) {

                    // Current pixel coordinates
                    var x = (rgb / 4) % canvas.width,
                        y = (rgb / 4 - x) / canvas.width;

                    text.push({

                        x: x,
                        y: y,
                        vx: 5 + (Math.random() * -10),
                        vy: 5 + (Math.random() * -5),
                        radius: 15,
                        alpha: Math.random(),
                        color: 'rgb' + '(' + color.r + ', ' + color.g + ', ' + color.b + ')',
                        release: false,
                        reduce: false

                    });

                    dirtyRegions.push({

                        x: x,
                        y: y,
                        radius: 15

                    });

                }

            }

        }

        // Logic
        self.clear();
        self.update();
        self.render();

        requestAnimFrame(self.buildTexture);

    };

    /*
     * Clear only dirty regions.
     */

    self.clear = function () {

        [].forEach.call(dirtyRegions, function (dirty, index) {

            var x, y, width, height;

            width = (2 * text[index].radius) + 4;
            height = width;

            x = dirty.x - (width / 2);
            y = dirty.y - (height / 2);

            context.clearRect(Math.floor(x), Math.floor(y), Math.ceil(width), Math.ceil(height));

        });

    };

    /*
     * Let's update the pixels.
     */

    self.update = function () {

        [].forEach.call(text, function (pixel, index) {

            if (!pixel.release) {

                pixel.radius = Math.max(pixel.radius - 0.045, 10) === 10 ? pixel.release = true : pixel.radius -= 0.045;
                pixel.alpha = Math.max(pixel.alpha - 0.02, 0.0) === 0.0 ? Math.min(Math.random(), 1.0) : pixel.alpha -= 0.02;

            }

            // Explosion
            if (pixel.release) {

                // Fly away
                pixel.x += pixel.vx;
                pixel.y -= pixel.vy;
                pixel.vy -= 0.20;
                pixel.alpha = 1.0;

                // Random radius
                if (!pixel.reduce) {

                    pixel.radius = Math.random() * 15;
                    pixel.reduce = true;

                }

                if (pixel.reduce)

                    pixel.radius = Math.max(pixel.radius - 0.08, 5);

                // Bottom bounds
                if (pixel.y >= canvas.height - pixel.radius) {

                    pixel.y = canvas.height - pixel.radius;
                    pixel.vy *= -bounceFactor;

                }

                // Right bounds
                if (pixel.x >= canvas.width - pixel.radius) {

                    pixel.x = canvas.width - pixel.radius;
                    pixel.vx *= -bounceFactor;

                }

                // Top bounds
                if (pixel.y <= 0) {

                    pixel.y = 0;
                    pixel.vy *= -bounceFactor;

                }

                // Left bounds
                if (pixel.x <= 0) {

                    pixel.x = 0;
                    pixel.vx *= -bounceFactor;

                }

                // Loss energy at floor collision
                if (pixel.y === canvas.height - pixel.radius) {

                    pixel.vx = Math.max(pixel.vx - 0.15, 0);
                    pixel.vy = Math.max(pixel.vy - 0.15, 0);

                }

            }

        });

    };

    /*
     * Useful color cycle algorithm.
     */

    self.colorCycle = function () {

        cycle = Math.min(cycle + 0.2, 100) !== 100 ? cycle += 0.2 : 0;

        color.r = ~~ (Math.sin(0.3 * cycle + 0) * 127 + 128);
        color.g = ~~ (Math.sin(0.3 * cycle + 2) * 127 + 128);
        color.b = ~~ (Math.sin(0.3 * cycle + 4) * 127 + 128);

    };

    /*
     * Let's render the pixels.
     */

    self.render = function () {

        [].forEach.call(text, function (pixel, index) {

            context.save();
            context.beginPath();
            context.globalAlpha = pixel.alpha;
            context.fillStyle = 'rgb' + '(' + color.r + ', ' + color.g + ', ' + color.b + ')';
            context.translate(pixel.x, pixel.y);
            context.rect(0, 0, pixel.radius, pixel.radius);
            context.fill();
            context.restore();

            // Dirty regions
            dirtyRegions[index].x = pixel.x;
            dirtyRegions[index].y = pixel.y;
            dirtyRegions[index].radius = pixel.radius;

        });

        self.colorCycle();

    };

    /*
     * Request new frame by Paul Irish.
     * 60 FPS.
     */

    window.requestAnimFrame = (function () {

        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||

        function (callback) {

            window.setTimeout(callback, 1000 / FPS);

        };

    })();

    window.addEventListener ? window.addEventListener('load', self.init, false) : window.onload = self.init;

})(GooglePixelate);
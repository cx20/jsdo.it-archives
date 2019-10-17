// forked from Francesco Trillini's "GoogleElastic" http://codepen.io/Francext/pen/hIyea

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
	"‥","■","‥","‥","〓","〓","〓","〓","‥","‥","‥","‥","‥","‥","‥","‥",
];

var GoogleElastic = {};

;(function (GoogleElastic, undefined) {

    var self = window.GoogleElastic || {}, canvas, context, coords = {
            x: -99999,
            y: -99999
        }, dots = [],
        dirtyRegions = [],
        forceFactor, bounceFactor = 0.5,
        inputForce = 0,
        step = 0,
        steps = 20,
        FPS = 60;

    // Dat GUI default values
    var ease = 0.5,
        tick = intermittence = gravity = fade = false;

    /*
     * Settings.
     */

    var Settings = function () {

        this.ease = 0.5;
        this.tick = this.intermittence = this.gravity = this.fade = false;

        this.changeEase = function (value) {

            ease = value;

        };

        this.enableTick = function (value) {

            !tick ? tick = true : tick = false;

        };

        this.enableIntermittence = function (value) {

            !intermittence ? intermittence = true : intermittence = false;

        };

        this.enableGravity = function (value) {

            !gravity ? gravity = true : gravity = false;

        };

        this.fade = function (value) {

            fade = true;

        };

    };

    /*
     * Init.
     */

    self.init = function () {

        var settings = new Settings();
/*
		var GUI = new dat.GUI();
		
		// Dat GUI main
		GUI.add(settings, 'ease').min(0.1).max(0.9).onChange(settings.changeEase);
		GUI.add(settings, 'tick').onChange(settings.enableTick);
		GUI.add(settings, 'intermittence').onChange(settings.enableIntermittence);
		GUI.add(settings, 'gravity').onChange(settings.enableGravity);
		GUI.add(settings, 'fade');
*/
        var body = document.querySelector('body');

        canvas = document.createElement('canvas');

        canvas.width = X_MAX; // innerWidth;
        canvas.height = Y_MAX; // innerHeight;

        canvas.style.backgroundColor = '#000';
        canvas.style.position = 'absolute';
        canvas.style.top = 0;
        canvas.style.bottom = 0;
        canvas.style.left = 0;
        canvas.style.right = 0;
        canvas.style.zIndex = -1;

        body.appendChild(canvas);

        // Browser supports canvas?
        if ( !! (self.gotSupport())) {

            context = canvas.getContext('2d');

            // Events
            if ('ontouchstart' in window) {

                document.addEventListener('touchstart', self.onTouchStart, false);
                document.addEventListener('touchend', self.onTouchEnd, false);
                document.addEventListener('touchmove', self.onTouchMove, false);

            } else {

                document.addEventListener('mousedown', self.onMouseDown, false);
                document.addEventListener('mouseup', self.onMouseUp, false);
                document.addEventListener('mousemove', self.onMouseMove, false);

            }

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
     * Mouse down event.
     */

    self.onMouseDown = function (event) {

        event.preventDefault();

        forceFactor = true;

    };

    /*
     * Mouse up event.
     */

    self.onMouseUp = function (event) {

        event.preventDefault();

        forceFactor = false;

    };

    /*
     * Mouse move event.
     */

    self.onMouseMove = function (event) {

        event.preventDefault();

        coords.x = event.pageX - canvas.offsetLeft;
        coords.y = event.pageY - canvas.offsetTop;

    };

    /*
     * Touch start event.
     */

    self.onTouchStart = function (event) {

        event.preventDefault();

        forceFactor = true;

    };

    /*
     * Touch end event.
     */

    self.onTouchEnd = function (event) {

        event.preventDefault();

        forceFactor = false;

    };

    /*
     * Touch move event.
     */

    self.onTouchMove = function (event) {

        event.preventDefault();

        coords.x = event.touches[0].pageX - canvas.offsetLeft;
        coords.y = event.touches[0].pageY - canvas.offsetTop;

    };

    /*
     * Building texture.
     */

    self.buildTexture = function () {

        // Let's start by drawing the original texture
        if (dots.length === 0) {

            context.font = '18px ＭＳゴシック';
            context.fillStyle = 'rgb(255, 255, 255)';
            context.textAlign = 'center';
/*
			context.fillText('Google', canvas.width / 2, canvas.height / 2);
*/
            for (var i = 0; i < dataSet.length; i++) {
                var x = canvas.width / 2 - (DOT_SIZE*16/2) + (i % 16) * DOT_SIZE;
                var y = canvas.width / 2 - (DOT_SIZE*16/2) + Math.floor(i / 16) * DOT_SIZE;
                context.fillText(dataSet[i], x, y);
            }

            var surface = context.getImageData(0, 0, canvas.width, canvas.height);

            context.clearRect(0, 0, canvas.width, canvas.height);

            for (var width = 0, len1 = surface.width; width < len1; width += 4) {

                for (var height = 0, len2 = surface.height; height < len2; height += 4) {

                    var color = surface.data[(height * surface.width * 4) + (width * 4) - 1];

                    // The pixel color is white? So draw on it...
                    if (color === 255) {

                        var randomX = Math.random() * canvas.width,
                            randomY = Math.random() * canvas.height;

                        dots.push({

                            x: randomX,
                            y: randomY,
                            vx: (width - randomX) / steps,
                            vy: (height - randomY) / steps,
                            goalX: width,
                            goalY: height,
                            alpha: 1.0,
                            radius: 2,
                            explosionX: 10 + (Math.random() * -20),
                            explosionY: 10 + (Math.random() * -10),
                            gravity: Math.random() * 20,
                            rotation: Math.random() * 360,
                            release: true

                        });

                        dirtyRegions.push({

                            x: randomX,
                            y: randomY,
                            radius: 2

                        });

                    }

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

            width = (2 * dirty.radius) + 4;
            height = width;

            x = dirty.x - (width / 2);
            y = dirty.y - (height / 2);

            context.clearRect(Math.floor(x), Math.floor(y), Math.ceil(width), Math.ceil(height));

        });

    };

    /*
     * Let's update the dots.
     */

    self.update = function () {

        step = Math.min(step + 1, steps);

        [].forEach.call(dots, function (dot, index) {

            // Reach the goal position
            if (step !== steps) {

                dot.x += dot.vx;
                dot.y += dot.vy;

            } else {

                // On gravity...
                if (gravity) {

                    // Let's go down bebe!
                    dot.y -= dot.gravity;
                    dot.gravity -= 2;

                    // Bottom bounds
                    if (dot.y >= canvas.height - dot.radius) {

                        dot.y = canvas.height - dot.radius;
                        dot.gravity *= -bounceFactor;

                    }

                    // Loss energy at floor collision
                    dot.y === canvas.height - dot.radius ? dot.gravity = Math.max(dot.gravity - 2, 0) : null;

                }

                // On fading...
                else if (fade) {

                    if (dot.release) {

                        // Fly away
                        dot.x += dot.explosionX;
                        dot.y -= dot.explosionY;

                        var angle = Math.random() * Math.PI * 2;
                        var radius = Math.random() * dot.radius;

                        dot.rotation = Math.max(dot.rotation * -5, 0);

                        // Rotate
                        dot.explosionX += Math.cos(angle) * radius;
                        dot.explosionY += Math.sin(angle) * radius;

                        // Fade out
                        dot.radius = Math.max(dot.radius + 0.10, 15);
                        dot.alpha = Math.max(dot.alpha - 0.07, 0.0);

                    }

                    // If fade is over...
                    if (dot.alpha <= 0.0) {

                        // Restore to the original position
                        dot.x = dot.goalX;
                        dot.y = dot.goalY;

                        dot.radius = 2;
                        dot.alpha = 1.0;
                        dot.release = false;

                        // Enable gravity if selected meanwhile fading
                        if (index === dots.length - 1) {

                            fade = false;

                        }

                    }

                }

                // On normale state...
                else {

                    var angle = Math.atan2(dot.y - coords.y, dot.x - coords.x);

                    dot.x += Math.cos(angle) * self.distanceTo(dot) + (dot.goalX - dot.x) * ease;
                    dot.y += Math.sin(angle) * self.distanceTo(dot) + (dot.goalY - dot.y) * ease;

                    if ( !! forceFactor)

                        inputForce = Math.min(inputForce + 0.20, 4000);

                    else

                        inputForce = Math.max(inputForce - 0.20, 0);

                    // Reset 'em all
                    dot.gravity = Math.random() * 20;
                    dot.release = true;
                    dot.explosionX = 10 + (Math.random() * -20);
                    dot.explosionY = 10 + (Math.random() * -10);

                }

            }

        });

    };

    /*
     * Let's render the dots.
     */

    self.render = function () {

        [].forEach.call(dots, function (dot, index) {

            context.save();
            context.beginPath();
            context.globalAlpha = intermittence ? Math.max(Math.random(), 0.1) : dot.alpha;
            context.fillStyle = 'rgb(255, 255, 255)';
            context.translate(dot.x, dot.y);
            context.rotate(dot.rotation * Math.PI / 180);
            context.arc(0, 0, dot.radius, 0, Math.PI * 2);
            context.fill();
            context.closePath();
            context.restore();

            // Dirty regions
            dirtyRegions[index].x = dot.x;
            dirtyRegions[index].y = dot.y;
            dirtyRegions[index].radius = dot.radius;

        });

    };

    /*
     * Distance between two points.
     */

    self.distanceTo = function (dot) {

        var dx = Math.abs(coords.x - dot.x);
        var dy = Math.abs(coords.y - dot.y);

        if (tick)

            return ((2000 + Math.random() * 2000) + inputForce) / Math.sqrt(dx * dx + dy * dy);

        else

            return (1000 + inputForce) / Math.sqrt(dx * dx + dy * dy);

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

})(GoogleElastic);

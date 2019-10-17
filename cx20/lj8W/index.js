// forked from suffick's "Fluid Simulation" http://codepen.io/stuffit/pen/hszvg

/*
Copyright (c) 2013 Stuffit at codepen.io (http://codepen.io/stuffit)

View this and others at http://lonely-pixel.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the 
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom the Software is furnished 
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.
*/

/* Settings */

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
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","無","無","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","無","無","茶",
    "肌","肌","肌","無","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "無","肌","無","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
];

function getRgbaColor( c )
{
    var colorHash = {
        "無":"rgba(  0,  0,  0",
        "白":"rgba(255,255,255",
        "肌":"rgba(255,204,204",
        "茶":"rgba(128,  0,  0",
        "赤":"rgba(255,  0,  0",
        "黄":"rgba(255,255,  0",
        "緑":"rgba(  0,255,  0",
        "水":"rgba(  0,255,255",
        "青":"rgba(  0,  0,255",
        "紫":"rgba(128,  0,128"
    };
    return colorHash[ c ];
}

var colorSet = [ "無", "白", "肌", "茶", "赤", "黄", "緑", "水", "青", "紫"];
function getColorNameIndex( c ) {
	var result = 0;
	for ( var i = 0; i < colorSet.length; i++ ) {
		if ( c == colorSet[i] ) {
			result = i;
			break;
		}
	}
	return result;
}

var MOUSE_INFLUENCE = 5,
    GRAVITY_X     = 0,
    GRAVITY_Y     = 0,
    MOUSE_REPEL   = false,
    GROUPS        = [50,50,50],
    GROUP_COLOURS = ['rgba(97,160,232'];

window.requestAnimFrame =
window.requestAnimationFrame       || 
window.webkitRequestAnimationFrame || 
window.mozRequestAnimationFrame    || 
window.oRequestAnimationFrame      || 
window.msRequestAnimationFrame     ||
function( callback ){
    window.setTimeout(callback, 1000 / 60);
};

var fluid = function () {

    var ctx;
    var width;
    var height;
    var num_x;
    var num_y;
    var particles;
    var grid;
    var meta_ctx;
    var threshold = 220;
    var play = false;
    var spacing = 45;
    //var radius = 30;
    var radius = 18;
    var limit = radius * 0.66;
    var textures;
    var num_particles;

    var mouse = {
        down: false,
        x: 0,
        y: 0
    };

    var process_image = function () {
        var imageData = meta_ctx.getImageData(0, 0, width, height),
            pix = imageData.data;

        for (var i = 0, n = pix.length; i < n; i += 4) {
            (pix[i + 3] < threshold) && (pix[i + 3] /= 6);
        }

        ctx.putImageData(imageData, 0, 0);
    };

    var run = function () {

        //var time = new Date().getTime();
        meta_ctx.clearRect(0, 0, width, height);

        for (var i = 0, l = num_x * num_y; i < l; i++) grid[i].length = 0;


        var i = num_particles;
        while (i--) particles[i].first_process();
        i = num_particles;
        while (i--) particles[i].second_process();

        process_image();

        if (mouse.down) {

            ctx.canvas.style.cursor = 'none';

            ctx.fillStyle = 'rgba(97, 160, 232, 0.05)';
            ctx.beginPath();
            ctx.arc(
                mouse.x,
                mouse.y,
                radius * MOUSE_INFLUENCE,
                0,
                Math.PI * 2
            );
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = 'rgba(97, 160, 232, 0.05)';
            ctx.beginPath();
            ctx.arc(
                mouse.x,
                mouse.y, (radius * MOUSE_INFLUENCE) / 3,
                0,
                Math.PI * 2
            );
            ctx.closePath();
            ctx.fill();
        } else ctx.canvas.style.cursor = 'default';

        //console.log(new Date().getTime() - time);

        if (play)
            requestAnimFrame(run);
    };

    var Particle = function (type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.px = x;
        this.py = y;
        this.vx = 0;
        this.vy = 0;
    };

    Particle.prototype.first_process = function () {

        var g = grid[Math.round(this.y / spacing) * num_x + Math.round(this.x / spacing)];

        if (g) g.close[g.length++] = this;

        this.vx = this.x - this.px;
        this.vy = this.y - this.py;

        if (mouse.down) {
            var dist_x = this.x - mouse.x;
            var dist_y = this.y - mouse.y;
            var dist = Math.sqrt(dist_x * dist_x + dist_y * dist_y);
            if (dist < radius * MOUSE_INFLUENCE) {
                var cos = dist_x / dist;
                var sin = dist_y / dist;
                this.vx += (MOUSE_REPEL) ? cos : -cos;
                this.vy += (MOUSE_REPEL) ? sin : -sin;
            }
        }

        this.vx += GRAVITY_X;
        this.vy += GRAVITY_Y;
        this.px = this.x;
        this.py = this.y;
        this.x += this.vx;
        this.y += this.vy;
    };

    Particle.prototype.second_process = function () {

        var force = 0,
            force_b = 0,
            cell_x = Math.round(this.x / spacing),
            cell_y = Math.round(this.y / spacing),
            close = [];

        for (var x_off = -1; x_off < 2; x_off++) {
            for (var y_off = -1; y_off < 2; y_off++) {
                var cell = grid[(cell_y + y_off) * num_x + (cell_x + x_off)];
                if (cell && cell.length) {
                    for (var a = 0, l = cell.length; a < l; a++) {
                        var particle = cell.close[a];
                        if (particle != this) {
                            var dfx = particle.x - this.x;
                            var dfy = particle.y - this.y;
                            var distance = Math.sqrt(dfx * dfx + dfy * dfy);
                            if (distance < spacing) {
                                var m = 1 - (distance / spacing);
                                force += Math.pow(m, 2);
                                force_b += Math.pow(m, 3) / 2;
                                particle.m = m;
                                particle.dfx = (dfx / distance) * m;
                                particle.dfy = (dfy / distance) * m;
                                close.push(particle);
                            }
                        }
                    }
                }
            }
        }

        force = (force - 3) * 0.5;

        for (var i = 0, l = close.length; i < l; i++) {

            var neighbor = close[i];

            var press = force + force_b * neighbor.m;
            if (this.type != neighbor.type) press *= 0.35;

            var dx = neighbor.dfx * press * 0.5;
            var dy = neighbor.dfy * press * 0.5;

            neighbor.x += dx;
            neighbor.y += dy;
            this.x -= dx;
            this.y -= dy;
        }

        if (this.x < limit) this.x = limit;
        else if (this.x > width - limit) this.x = width - limit;

        if (this.y < limit) this.y = limit;
        else if (this.y > height - limit) this.y = height - limit;

        this.draw();
    };

    Particle.prototype.draw = function () {

        var size = radius * 2;

        meta_ctx.drawImage(
            textures[this.type],
            this.x - radius,
            this.y - radius,
            size,
            size);
    };

    return {

        init: function (canvas, w, h) {

            particles = [];
            grid = [];
            close = [];
            textures = [];

            var canvas = document.getElementById(canvas);
            ctx = canvas.getContext('2d');
            canvas.height = h || window.innerHeight;
            canvas.width = w || window.innerWidth;
            width = canvas.width;
            height = canvas.height;

            var meta_canvas = document.createElement("canvas");
            meta_canvas.width = width;
            meta_canvas.height = height;
            meta_ctx = meta_canvas.getContext("2d");
            //for(var i = 0; i < GROUPS.length; i++) {
            for (var i = 0; i < colorSet.length; i++) {

                var colour;

                if (colorSet[i]) {
                    colour = getRgbaColor(colorSet[i]);
                } else {

                    colour =
                        'hsla(' + Math.round(Math.random() * 360) + ', 80%, 60%';
                }
                console.log(colour);
                textures[i] = document.createElement("canvas");
                textures[i].width = radius * 2;
                textures[i].height = radius * 2;
                var nctx = textures[i].getContext("2d");

                var grad = nctx.createRadialGradient(
                    radius,
                    radius,
                    1,
                    radius,
                    radius,
                    radius
                );

                grad.addColorStop(0, colour + ',1)');
                grad.addColorStop(1, colour + ',0)');
                nctx.fillStyle = grad;
                nctx.beginPath();
                nctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
                nctx.closePath();
                nctx.fill();
            }

            canvas.onmousedown = function (e) {
                mouse.down = true;
                return false;
            };

            canvas.onmouseup = function (e) {
                mouse.down = false;
                return false;
            };

            canvas.onmousemove = function (e) {
                var rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
                return false;
            };

            num_x = Math.round(width / spacing) + 1;
            num_y = Math.round(height / spacing) + 1;

            for (var i = 0; i < num_x * num_y; i++) {
                grid[i] = {
                    length: 0,
                    close: []
                }
            }

            var pos;
            for (var y = 0; y < 16; y++) {
                for (var x = 0; x < 16; x++) {
                    pos = y * 16 + x;
                    particles.push(
                        new Particle(
                            getColorNameIndex(dataSet[pos]),
                            radius + (x + 1) * radius,
                            radius + (y + 1) * radius
                        )
                    );
                }
            }

            num_particles = particles.length;

            play = true;
            run();
        },

        stop: function () {
            play = false;
        }

    };

}();

fluid.init('c', 440, 440);

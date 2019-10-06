// forked from Michael Fields's "Particle Wall" http://codepen.io/mfields/pen/LIFao

/**
 * Particle Wall
 *
 * This is a reproduction of Robert Penner's Particle Wall exercise
 * from his book titled "Robert Penner's Programming Macromedia Flash MX".
 * It was ported from Actionscript/Flash to Javascript/Canvas and has been
 * released with the permission of the author.
 *
 * Copyright (c) 2013 Michael Fields

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

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
/*
    var colorHash = {
        "無":"#000000",
        "白":"#ffffff",
        "肌":"#ffcccc",
        "茶":"#800000",
        "赤":"#ff0000",
        "黄":"#ffff00",
        "緑":"#00ff00",
        "水":"#00ffff",
        "青":"#0000ff",
        "紫":"#800080"
    };
*/
    var colorHash = {
        "無":{ r:0x00, g:0x00, b:0x00, a:1 },
        "白":{ r:0xff, g:0xff, b:0xff, a:1 },
        "肌":{ r:0xff, g:0xcc, b:0xcc, a:1 },
        "茶":{ r:0x80, g:0x00, b:0x00, a:1 },
        "赤":{ r:0xff, g:0x00, b:0x00, a:1 },
        "黄":{ r:0xff, g:0xff, b:0x00, a:1 },
        "緑":{ r:0x00, g:0xff, b:0x00, a:1 },
        "水":{ r:0x00, g:0xff, b:0xff, a:1 },
        "青":{ r:0x00, g:0x00, b:0xff, a:1 },
        "紫":{ r:0x80, g:0x00, b:0x80, a:1 }
    };
    return colorHash[ c ];
}

(function ( window, $ ) {

"use strict";

var document, stage, animation, gradient, Sphere, plane, button, form, rotation;

document = window.document;


/***************************************************
	Stage: Canvas Object
****************************************************/

stage = {};
stage.el = $( stage );
stage.canvas = window.document.getElementById( 'stage' );
stage.context = stage.canvas.getContext( '2d' );


/***************************************************
	Animation: Object
****************************************************/

animation = {
	lastTime: 0,
	broadcaster: $( {} ),
	frame: undefined
};
animation.init = function() {
	animation.start();
	animation.listen( form, [
		'motion:pause',
		'motion:play'
	] );
};
animation.listen = function( element, actions ) {
	var i;
	for ( i = 0; i < actions.length; i++ ) {
		element.on( actions[i], animation.act.bind( animation ) );
	}
};
animation.act = function( e ) {
	switch ( e.type ) {
		case 'motion:pause' :
			animation.pause();
			break;
		case 'motion:play' :
			animation.play();
			break;
	}
};
animation.start = function() {
	var currTime = new Date().getTime(),
		timeToCall = Math.max( 0, 16 - ( currTime - animation.lastTime ) );
	animation.frame = window.setTimeout( animation.start, timeToCall );
	animation.lastTime = currTime + timeToCall;
	animation.broadcaster.trigger( 'nextFrame' );
};
animation.play = function() {
	if ( ! animation.frame ) {
		animation.start();
	}
};
animation.pause = function() {
	if ( animation.frame ) {
		animation.frame = window.clearTimeout( animation.frame );
		animation.frame = undefined;
		return true;
	}
	return false;
};


/***************************************************
	Gradient: Canvas Object
****************************************************/

gradient = ( function () {
	var g = document.createElement( 'canvas' ),
		gc = g.getContext( '2d' ),
		size = 100,
		h = size / 2,
		glow = gc.createRadialGradient( h / 1.4, h / 1.4, 1, h, h, h );

	g.width = size;
	g.height = size;
	glow.addColorStop( 0, 'rgba( 255, 255, 255, 0.3 )' );
	glow.addColorStop( 1, 'rgba( 255, 255 ,255, 0 )' );
	gc.fillStyle = glow;
	gc.fillRect( 0, 0, size, size );

	return g;
} () );


/***************************************************
	Sphere: Constructor
****************************************************/

Sphere = function( args ) {
	this.x = args.x;
	this.y = args.y;
	this.z = args.z;

	this.radius   = ( undefined !== args.radius ) ? args.radius : 10;
	this.color = args.color;
	this.range = {
		min: 50,
		max: 255
	};
};
Sphere.prototype.project = function ( p ) {
	p = 300 / ( this.z + 300 );

	return new this.constructor( {
		x: this.x * p,
		y: this.y * p,
		z: 0,
		radius: ( ( this.radius * 2 ) * p ) / 2,
		color: this.color
	} );
};
Sphere.prototype.rotateX = function ( angle ) {
	var y, z;

	angle = angle * ( Math.PI / 180 );

	y = this.y * Math.cos( angle ) - this.z * Math.sin( angle );
	z = this.y * Math.sin( angle ) + this.z * Math.cos( angle );

	this.y = y;
	this.z = z;
};
Sphere.prototype.rotateY = function( angle ) {
	var x, z;

	angle = angle * ( Math.PI / 180 );

	x = this.x * Math.cos( angle ) - this.z * Math.sin( angle );
	z = this.x * Math.sin( angle ) + this.z * Math.cos( angle );

	this.x = x;
	this.z = z;
};
Sphere.prototype.rotateZ = function ( angle ) {
	var x, y;

	angle = angle * ( Math.PI / 180 );

	x = this.x * Math.cos( angle ) - this.y * Math.sin( angle );
	y = this.x * Math.sin( angle ) + this.y * Math.cos( angle );

	this.x = x;
	this.y = y;
};
Sphere.prototype.draw = function() {
	var ctx = stage.context,
		p = this.project(),
		c = p.color;

	/* Draw the ball using only the projected values. */
	ctx.beginPath();
	ctx.moveTo( p.x, p.y );
	ctx.arc( p.x, p.y, p.radius, 0, Math.PI * 2 );
	ctx.closePath();

	ctx.fillStyle = 'rgba( ' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ' )';
	ctx.fill();

	ctx.drawImage(
		gradient,
		p.x - p.radius -1,
		p.y - p.radius -1,
		p.radius * 1.9,
		p.radius * 1.9
	);
};


/***************************************************
	Plane: Object
****************************************************/

plane = {
	spheres: [],
	size: 250,
	divisions: 16,
	colors: [
		{ r: 161, g:  98, b: 191, a: 1 }, // Purple
		{ r: 115, g: 175, b: 255, a: 1 }, // Blue
		{ r: 234, g: 222, b:  30, a: 1 }, // Yellow
		{ r: 113, g: 233, b: 122, a: 1 }, // Green
		{ r: 250, g:  75, b:  75, a: 1 }  // Red
	],
	rotate: {
		x: true,
		y: true,
		z: true
	}
};
plane.init = function() {
	plane.create();
	plane.draw();
	animation.broadcaster.on( 'nextFrame', plane.draw );
	form.on( 'motion:rotate', plane.changeRotation );
};
plane.create = function() {
/*
	var i, j, c;
	for ( i = 0; i <= plane.divisions; i++ ) {
		for ( j = 0; j <= plane.divisions; j++ ) {
			c = Math.floor( Math.random() * plane.colors.length );
			plane.spheres.push( new Sphere( {
				x: plane.size * ( i / plane.divisions ) - plane.size / 2,
				y: plane.size * ( j / plane.divisions ) - plane.size / 2,
				z: 0,
				color: plane.colors[c],
				radius: 12
			} ) );
		}
	}
*/
	var i, x, y, c;
	for ( y = 0; y < plane.divisions; y++ ) {
		for ( x = 0; x < plane.divisions; x++ ) {
			i = y + x * 16;
			c = dataSet[i];
			plane.spheres.push( new Sphere( {
				x: plane.size * ( x / plane.divisions ) - plane.size / 2,
				y: plane.size * ( (15-y) / plane.divisions ) - plane.size / 2,
				z: 0,
				color: getRgbaColor(c),
				radius: 6
			} ) );
		}
	}
};
plane.draw = function() {
	var i = plane.spheres.length,
		ctx = stage.context;
	/*
	 * Sort the Spheres by z axis.
	 *
	 * This is necessary because there is no z axis in canvas.
	 * Instead the z axis needs to be achieved through the order
	 * in which the spheres are drawn. Those further away are
	 * drawn first and those closest are drawn last.
	 */
	plane.spheres.sort( function( a, b ) {
		if ( a.z === b.z ) {
			return 0;
		}
		if ( a.z > b.z ) {
			return 1;
		}
		return -1;
	} );

	ctx.clearRect( 0, 0, stage.canvas.width, stage.canvas.height );

	while ( i-- ) {
		ctx.save();
		ctx.translate( stage.canvas.width / 2, stage.canvas.height / 2 );

		if ( plane.rotate.x ) {
			plane.spheres[i].rotateX( 1 );
		}
		if ( plane.rotate.y ) {
			plane.spheres[i].rotateY( 1 );
		}
		if ( plane.rotate.z ) {
			plane.spheres[i].rotateZ( 1 );
		}

		plane.spheres[i].draw();
		ctx.restore();
	}
};
plane.changeRotation = function( event, axis, status ) {
	status = ( 'play' === status ) ? true : false;
	plane.rotate[axis] = status;
};


/***************************************************
	UI Form: jQuery Object.
****************************************************/

form = {};
form.init = function() {
	form = $( '#user' );
};


/***************************************************
	UI Rotation: Rotation Controls.
****************************************************/

rotation = {};
rotation.init = function () {
	rotation.el = $( '#rotation' );
	rotation.x = $( '#rotate-x' );
	rotation.y = $( '#rotate-y' );
	rotation.z = $( '#rotate-z' );
	rotation.toggle = rotation.el.find( 'legend' );
	rotation.value = rotation.isChecked();
};
rotation.bind = function() {
	rotation.x.on( 'change', rotation.transmit.bind( rotation ) );
	rotation.y.on( 'change', rotation.transmit.bind( rotation ) );
	rotation.z.on( 'change', rotation.transmit.bind( rotation ) );
	rotation.toggle.on( 'click', rotation.peekaboo.bind( rotation ) );
};
rotation.isChecked = function() {
	var x, y, z;

	x = rotation.x.is( ':checked' );
	y = rotation.y.is( ':checked' );
	z = rotation.z.is( ':checked' );

	return ( x || y || z );
};
rotation.transmit = function( e ) {
	var el, newValue, axis, action;

	el = $( e.target );
	newValue = rotation.isChecked();

	if ( newValue !== rotation.value ) {
		rotation.value = newValue;

		if ( el.is( ':checked' ) ) {
			rotation.el.trigger( 'rotation:true' );
			form.trigger( 'motion:play' );
		} else {
			rotation.el.trigger( 'rotation:false' );
			form.trigger( 'motion:pause' );
		}
	}

	switch( el.attr( 'id' ) ) {
		case 'rotate-x' :
			axis = 'x';
			break;
		case 'rotate-y' :
			axis = 'y';
			break;
		case 'rotate-z' :
			axis = 'z';
			break;
	}

	action = ( el.is( ':checked' ) ) ? 'play' : 'pause';

	form.trigger( 'motion:rotate', [axis, action] );
};
rotation.peekaboo = function() {
	if ( rotation.el.hasClass( 'visibility' ) ) {
		rotation.el.removeClass( 'visibility' );
	} else {
		rotation.el.addClass( 'visibility' );
	}
};

/***************************************************
	UI Element: Button.
****************************************************/

button = {
	states: [
		'play',
		'pause',
		'disabled'
	]
};
button.init = function() {
	button.el = $( '#toggle' );
	button.el.on( 'click', button.click.bind( button ) );
	button.state = button.getStateFromDOM();
};
button.bind = function() {
	rotation.el.on( 'motion:pause',     button.transmit.bind( button ) );
	rotation.el.on( 'motion:play',      button.transmit.bind( button ) );
	rotation.el.on( 'rotation:true',    button.transmit.bind( button ) );
	rotation.el.on( 'rotation:false',   button.transmit.bind( button ) );
};
button.transmit = function( e ) {
	switch ( e.type ) {
		case 'motion:pause' :
			button.changeState( 'pause' );
			form.trigger( 'motion:play' );
			break;
		case 'motion:play' :
			button.changeState( 'play' );
			form.trigger( 'motion:pause' );
			break;
		case 'rotation:true' :
			button.changeState( 'play' );
			button.el.trigger( 'button:pause' );
			break;
		case 'rotation:false' :
			button.changeState( 'disabled' );
			button.el.trigger( 'button:disabled' );
			break;
	}
};
button.getStateFromDOM = function() {
	var state = button.el.data( 'state' );
	if ( -1 < button.states.indexOf( state ) ) {
		return state;
	}
};
button.changeState = function( state ) {
	if ( -1 < button.states.indexOf( state ) ) {
		button.state = state;
		button.el.data( 'state', state );
		switch ( state ) {
			case 'pause' :
				button.el
					.data( 'state', 'play' )
					.val( 'Play' )
					.removeClass( 'disabled' );
				return 'pause';
			case 'play' :
				button.el
					.data( 'state', 'pause' )
					.val( 'Pause' )
					.removeClass( 'disabled' );
				return 'play';
			case 'disabled' :
				button.el
					.data( 'state', 'disabled' )
					.val( 'Disabled' )
					.addClass( 'disabled' );
				return 'disabled';
		}
	}
	return false;
};
button.click = function( e ) {
	var newState, oldState;

	oldState = button.el.data( 'state' );
	newState = button.changeState( button.el.data( 'state' ) );

	if ( 'disabled' === oldState && oldState === newState ) {
		e.preventDefault();
	}

	switch ( newState ) {
		case 'pause' :
			form.trigger( 'motion:pause' );
			break;
		case 'play' :
			form.trigger( 'motion:play' );
			break;
		case 'disabled' :

			break;
	}
};


/***************************************************
	Set everything into motion.
****************************************************/

$( document )
	.ready( form.init )
	.ready( plane.init )
	.ready( rotation.init )
	.ready( button.init )
	.ready( animation.init )
	.ready( button.bind )
	.ready( rotation.bind );

} ( window, jQuery ) );
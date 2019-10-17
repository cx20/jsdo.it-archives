// forked from mrdoob's "Map Generator" http://jsdo.it/mrdoob/xI3u
// Based on Jared Tarbell's Substrate algorithm concept.
// http://www.complexification.net/gallery/machines/substrate/index.php

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

function getRgbColor( c )
{
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
    return colorHash[ c ];
}

var Boid = function ( x, y, angle ) {

    this.x = x;
    this.y = y;
    this.color = 'rgb(0,0,' + Math.floor( Math.random() * 255 ) + ')';
    
    this.angle = Math.pow( Math.random(), 20 ) + angle;
    this.dx = Math.cos( this.angle );
    this.dy = Math.sin( this.angle );

    this.life = Math.random() * 100 + 100;
    this.dead = false;

    this.update = function () {

	    context.strokeStyle = this.color;
	    context.beginPath();
	    context.moveTo( this.x, this.y );

	    var pos = Math.floor(this.x / width * 16) + Math.floor(this.y / height * 16) * 16;
	    if ( dataSet[pos] != "無" ) {
	        context.strokeStyle = getRgbColor( dataSet[pos] );
	    }

	    this.x += this.dx * 2;
	    this.y += this.dy * 2;
	    this.life -= 1;

	    context.lineTo( this.x, this.y );
	    context.stroke();

	    var index = ( Math.floor( this.x ) + width * Math.floor( this.y ) ) * 4;

	    if ( this.life <= 0 ) this.kill();
	    if ( data[ index + 3 ] > 0 ) this.kill();

	    if ( this.x < 0 || this.x > width ) this.kill();						
	    if ( this.y < 0 || this.y > height ) this.kill();

    }

    this.kill = function () {

	    boids.splice( boids.indexOf( this ), 1 );
	    this.dead = true;

    }

}

var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.getElementById( 'world' );
canvas.width = width;
canvas.height = height;

var context = canvas.getContext( '2d' );
var image, data;

var boids = [];
boids.push( new Boid( width / 2, height / 2, Math.random() * 360 * Math.PI / 180 ) );

setInterval( function () {

    image = context.getImageData( 0, 0, width, height );
    data = image.data;
    
    console.log( boids.length );

    for ( var i = 0; i < boids.length; i ++ ) {

	    var boid = boids[ i ];
	    boid.update();

	    if ( !boid.dead && Math.random() > 0.8 && boids.length < 500 ) {

		    boids.push( new Boid( boid.x, boid.y, ( Math.random() > 0.5 ? 90 : - 90 ) * Math.PI / 180 + boid.angle ) );

	    }

    }

}, 1000 / 60 );
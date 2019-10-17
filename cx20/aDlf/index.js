// forked from cx20's "BOIDサンプルの鳥を紙飛行機に変えてみるテスト" http://jsdo.it/cx20/wSPx
// forked from cx20's "BOIDサンプルの鳥を立方体に変えてみるテスト" http://jsdo.it/cx20/5zEv
// forked from cx20's "Three.jsのBOIDサンプルを実行させて見るテスト" http://jsdo.it/cx20/1VeO9
// forked from cx20's "こいのぼりを空に放流させて見るテスト（3Dバージョン）" http://jsdo.it/cx20/oJI5
// forked from Thanh Tran's "Fish Boids" http://labs.int3ractive.com/javascript/canvas/fish-boids/

var DOT_SIZE = 2;
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


/**
 * Based on THREE example: https://github.com/mrdoob/three.js/blob/master/examples/canvas_geometry_birds.html
 * Which is based on http://www.openprocessing.org/visuals/?visualID=6910
 */
var Bird = function () {

    var scope = this;

    THREE.Geometry.call(this);

    // 立方体個別の要素を作成
    var meshItem = new THREE.Mesh(new THREE.CubeGeometry(DOT_SIZE * 0.8, DOT_SIZE * 0.8, DOT_SIZE * 0.8));

    // ドット絵を作成
    for (var i = 0; i < dataSet.length; i++) {
        var x = (i % 16) * DOT_SIZE;
        var y = (16 - Math.floor(i / 16)) * DOT_SIZE;
        var z = 0;

        if (dataSet[i] != "無") {
            meshItem.position.x = x;
            meshItem.position.y = y;
            meshItem.position.z = z;
        }

        // ジオメトリを結合
        THREE.GeometryUtils.merge(this, meshItem);
    }

};

Bird.prototype = new THREE.Geometry();
Bird.prototype.constructor = Bird;

var BirdMesh = function () {
  THREE.Mesh.call(this,
    new Bird(),
    new THREE.MeshBasicMaterial( { color:Math.random() * 0xffffff  } )
  );

  this.phase = Math.floor( Math.random() * 62.83 );
};

BirdMesh.prototype = new THREE.Mesh();
BirdMesh.prototype.constructor = BirdMesh;

BirdMesh.prototype.updateCourse = function(boid) {
/*
  var phase = this.phase,
      rotation = this.rotation,
      geometry = this.geometry,
      boidVelocity = boid.velocity,
      color = this.material.color;

  color.r = color.g = color.b = ( 500 - this.position.z ) / 1000;

  rotation.y = Math.atan2( - boidVelocity.z, boidVelocity.x );
  rotation.z = Math.asin( boidVelocity.y / boidVelocity.length() );

  phase = ( phase + ( Math.max( 0, rotation.z ) + 0.1 )  ) % 62.83;
  geometry.vertices[ 5 ].y = geometry.vertices[ 4 ].y = Math.sin( phase ) * 5;

  this.phase = phase;
*/
};

/**
 * Based on THREE example: https://github.com/mrdoob/three.js/blob/master/examples/canvas_geometry_birds.html
 * Which is based on http://www.openprocessing.org/visuals/?visualID=6910
 * Author: Thanh Tran - trongthanh@gmail.com
 */
var Fish = function () {

	THREE.PlaneGeometry.call( this, 30, 15, 2, 1 );

};

Fish.prototype = new THREE.PlaneGeometry();
Fish.prototype.constructor = Fish;

var FishMesh = function () {
  THREE.Mesh.call(this,
    new Fish(),
//    new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/fish-texture.png' ), overdraw: true } )
    new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'http://jsrun.it/assets/n/w/n/o/nwnoW.png' ), overdraw: true } )
  );

  this.phase = Math.floor( Math.random() * 62.83 );
};

FishMesh.prototype = new THREE.Mesh();
FishMesh.prototype.constructor = FishMesh;

FishMesh.prototype.updateCourse = function(boid) {
  var phase = this.phase,
      rotation = this.rotation,
      geometry = this.geometry,
      boidVelocity = boid.velocity;

  rotation.y = Math.atan2( - boidVelocity.z, boidVelocity.x );
  rotation.z = Math.asin( boidVelocity.y / boidVelocity.length() ) * 0.2; //reduce fish's vertical rotation

  phase = ( phase + ( Math.max( 0, rotation.z ) + 0.1 )  ) % 62.83;
  geometry.vertices[ 3 ].z = geometry.vertices[ 0 ].z = Math.sin( phase ) * 5;

  this.phase = phase;
};

/**
 * Based on THREE example: https://github.com/mrdoob/three.js/blob/master/examples/canvas_geometry_birds.html
 * Which is based on http://www.openprocessing.org/visuals/?visualID=6910
 * Copyright: 2011 (c) int3ractive.com
 * Author: Thanh Tran - trongthanh@gmail.com
 */

/**
 * Convenient class to instanciate a THREEJS scene with Boid
 **/
var BoidScene = function () {};

BoidScene.prototype = {
  init: function (boidContainer, numBirds, isFish) {
    var containerRect = boidContainer.getBoundingClientRect(),
      viewWidth = containerRect.width,
      viewHeight = containerRect.height,
      scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera( 75, viewWidth / viewHeight, 1, 10000 ),
      //renderer = new THREE.CanvasRenderer(),
      renderer = new THREE.WebGLRenderer(),
      birds = [],
      boids = [],
      boid, bird,
      that = this;

    if(isFish === undefined) isFish = false;
    numBirds = numBirds || 50;

    camera.position.x = 200;
    camera.position.y = -50;
    camera.position.z = 200;
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    for ( var i = 0; i < numBirds; i ++ ) {
      if (isFish) {
        //reduce maxspeed & steer force
        boid = boids[ i ] = new Boid(2, 0.02);
        //the actual 3D object
        bird = birds[ i ] = new FishMesh();
      } else {
        boid = boids[ i ] = new Boid(4, 0.1);
        bird = birds[ i ] = new BirdMesh();
      }
      
      boid.position.x = Math.random() * 500 - 250;
      boid.position.y = Math.random() * 500 - 250;
      boid.position.z = Math.random() * 500 - 250;
      boid.velocity.x = Math.random() * 2 - 1;
      boid.velocity.y = Math.random() * 2 - 1;
      boid.velocity.z = Math.random() * 2 - 1;
      boid.setAvoidWalls( true );
      boid.setWorldSize( 500, 500, 400 );

      bird.position = boids[ i ].position;
      bird.doubleSided = true;

      scene.add( bird );
    }

    // renderer.autoClear = false;

    renderer.setSize( viewWidth, viewHeight );

    document.addEventListener( 'mousemove', this.documentMouseMoveHandler.bind(this), false );
    window.addEventListener('resize', this.windowResizeHandler.bind(this),false);

    //add scene to DOM
    boidContainer.appendChild(renderer.domElement);

    this.animate = function () {
      
      requestAnimationFrame( that.animate );
      
      that.render();
//      stats.update();

    };

    //members:
    this.container = boidContainer;
    this.viewWidth = viewWidth;
    this.viewHeight = viewHeight;
    this.halfViewWidth = viewWidth / 2;
    this.halfViewHeight = viewHeight / 2;
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.offset = {x:containerRect.left, y:containerRect.top};
    this.birds = birds;
    this.boids = boids;

  },

  documentMouseMoveHandler: function ( e ) {
    var boid,
        offset = this.offset,
        boids = this.boids,
        vector = new THREE.Vector3( e.clientX - offset.x - this.halfViewWidth, - e.clientY - offset.y + this.halfViewHeight, 0 );
    vector.multiplyScalar(0.87);

    for ( var i = 0, il = boids.length; i < il; i++ ) {
      boid = boids[ i ];
      vector.z = boid.position.z;
      boid.repulse( vector );
    }

  },

  windowResizeHandler: function (e) {
    var containerRect = this.container.getBoundingClientRect();

    this.offset.x = containerRect.left;
    this.offset.y = containerRect.top;
  },

  render: function() {
    var boid, bird,
        boids = this.boids,
        birds = this.birds;

    for ( var i = birds.length - 1; i >= 0; i-- ) {
      boid = boids[ i ];
      boid.run( boids );
      bird = birds[ i ];
      bird.updateCourse(boid);
    }
    
    this.renderer.render( this.scene, this.camera );
  }
};

/**
 * Main Class
 **/
var Main = function (win) {
  if (win.mainApp) {
    alert('Main singleton exception');
  }
  
  var doc = win.document,
      mainEl = doc.getElementById('main-container'),
      that = this;

  var boidScene = new BoidScene();
  //boidScene.init(doc.getElementById('fish-frame'), 50, true); // Fish
  //  boidScene.init(doc.getElementById('fish-frame'), 50, false); // Bird
    boidScene.init(doc.getElementById('fish-frame'), 50, false); // Bird
  boidScene.animate();

  //members
  this.win = win;
  this.doc = doc;
  this.boidScene = boidScene;
};

//this is where it all begin:
window.onload =  function() {
  //main application singleton
  window.mainApp = new Main(window);
};

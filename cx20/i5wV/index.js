// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その５）" http://jsdo.it/cx20/qEka
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その４）" http://jsdo.it/cx20/jEqZ
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その３）" http://jsdo.it/cx20/ky6o
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その２）" http://jsdo.it/cx20/rrlt
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

var scene;
var camera;
var theta = 0;

var fireWorkObjects = [];
var cameraDeg = 0;
var animCounter = 0;

width = window.innerWidth;
height = window.innerHeight;

// forked from studio-kakky's "3D FireWorks" http://jsdo.it/studio-kakky/yRrV
var FireWork = function(options){
	this.object3D = new THREE.Object3D();
	this.radius;
	this.options;
	if(options != undefined){
		this.options = options;
	}
	if(this.options.position != undefined){
		this.object3D.position.x = this.options.position.x
		this.object3D.position.y = this.options.position.y
		this.object3D.position.z = this.options.position.z
	}

	this.ag = 0.2;

	this.louchSpeed = 12
	if(this.options.louchSpeed != undefined) this.louchSpeed = this.options.louchSpeed;
	this.tagetScale = 40;
	this.isExplode = false;
	this.isExploded = false;
	this.isEndAnim = false

	this.starLayers = [];

	this.init();
};

FireWork.prototype.init = function(){

	this.setCore();
	this.vy = this.louchSpeed;
};


FireWork.prototype.setCore = function(){
	var geometry = new THREE.SphereGeometry(3,20,20);
	var sMaterial = new THREE.MeshBasicMaterial(
		{color:0xff0000}
	);

	this.core = new THREE.Mesh(geometry,sMaterial);
	this.object3D.add(this.core);

	geometry.dispose();
	sMaterial.dispose();


};

FireWork.prototype.setLayeredPoint = function(radius,segment_num,layer_num,layers_distance,colors){
	for(var i = 0; i< layer_num;i++){
		var layerRadius = radius - layers_distance*i;
		var layerSegment = segment_num - 2*i;
		var color = colors[i];
		if(color == undefined) color = 0xff0000;
		this.addRegIntPointSphere(layerSegment,layerRadius,color);
	}
}


FireWork.prototype.addRegIntPointSphere = function(segment,sphereRadius,color){

	stars_point =[
		/*topVertex = */	{x:0,y:sphereRadius,z:0},
		/*bottomVertex = */	{x:0,y:-sphereRadius,z:0}
	]

	for(var i = 1;i<segment;i++){
		var segment_deg = ( Math.PI/segment ) * i;
		var segment_radius = Math.abs( sphereRadius * Math.sin(segment_deg) );
		var point_num = Math.ceil( 2 * Math.sin(segment_deg) * segment );

		var y = sphereRadius * Math.cos(segment_deg) + Math.random()*0.3;

		for(var k = 0;k<point_num;k++){
			var degreeY = Math.PI * 2 / point_num * k ;
			var x = segment_radius * Math.cos( degreeY ) + Math.random()*0.3;
			var z = segment_radius * Math.sin( degreeY ) + Math.random()*0.3;

			var points = {x:x,y:y,z:z};

			stars_point.push(points)
		}
	}


	var geo = new THREE.Geometry();

	var star_num = stars_point.length
	for(var i = 0;i < star_num;i++){
		geo.vertices.push(new THREE.Vector3(stars_point[i].x,stars_point[i].y,stars_point[i].z))
	}

	var pMaterial = new THREE.PointCloudMaterial({color:color,size:5,transparent: true ,opacity:1});
	var stars = new THREE.PointCloud(geo,pMaterial);
	this.starLayers.push({object:stars,geometry:geo,color:color,opacity:1});
	this.object3D.add(stars);

	pMaterial.dispose();

};

FireWork.prototype.launchAnimation = function(){
	var temp_vy = this.vy - this.ag;
	if(temp_vy <= 2){
		this.vy = 2;
		this.isExplode = true;
		this.setLayeredPoint(6,15,4,1,[0xff0000,0x00ff00,0x0000ff,0xff00ff]);


		this.object3D.remove(this.core);
		//this.core.dispose();

	}else{
		this.vy = temp_vy;

	}
	this.object3D.position.y += this.vy;

	/*this.vx = 1 - Math.random()*2;
	this.position.x += this.vx;*/

}

FireWork.prototype.explosionAnimation = function(){
	var diffScale = (this.tagetScale - this.object3D.scale.x)/15;
	this.object3D.scale.x +=  diffScale;
	this.object3D.scale.y = this.object3D.scale.z = this.object3D.scale.x;
	if(diffScale <= 0.1) this.isExploded = true;

}

FireWork.prototype.disappearAnimation = function(){
	var limit = this.starLayers.length;
	for(var i = 0;i<limit;i++){
		var layerStar = this.starLayers[i];
		this.object3D.remove(layerStar.object);
		//layerStar.object.dispose();

		var TargetOpacity =layerStar.opacity - 0.05;

		var newMaterial = new THREE.PointCloudMaterial({color:layerStar.color,opacity:TargetOpacity,size:5})
		var stars = new THREE.PointCloud(layerStar.geometry,newMaterial);
		this.starLayers[i] = {object:stars,geometry:layerStar.geometry,color:layerStar.color,opacity:TargetOpacity};
		this.object3D.add(stars)

		newMaterial.dispose();

		if(TargetOpacity < 0.1){
			this.object3D.remove(stars);
			//stars.dispose();
			layerStar.geometry.dispose();
			this.starLayers[i] = null;
		}

	}

	if(TargetOpacity < 0.1){
		this.isEndAnim = true;
	}
}


FireWork.prototype.animate = function(){
	if(!this.isExplode) this.launchAnimation();
	else if( ! this.isExploded) this.explosionAnimation();
	else if(! this.isEndAnim )this.disappearAnimation();
}

function setScene (){
	scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));
	camera = new THREE.PerspectiveCamera(75,1,1,1000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(465, 465);
	document.body.appendChild(renderer.domElement);

	camera.position.y = 100;
	camera.position.z = 700
};

function setFW() {
		var FW1 = new FireWork({position:{x:200 - Math.random()*400,y:0,z:Math.random()*10},louchSpeed:12 + Math.random()*5});
		scene.add(FW1.object3D);
		fireWorkObjects.push(FW1);
		FW1 = null;


};

function render(){
	requestAnimationFrame(render);
	if((animCounter % 24) == 0){
		setFW();
	}

	cameraDeg += Math.PI/1400;
	camera.position.x = 700 * Math.sin(cameraDeg);
	//camera.position.y = 200;
	camera.position.z = 700 * Math.cos(cameraDeg);
	camera.lookAt({x:0,y:400,z:0})
	renderer.render(scene,camera);

	var limit = fireWorkObjects.length
	var tempArray = [];
	for(var i = 0;i<limit;i++){
		fireWorkObjects[i].animate();
		if(!fireWorkObjects[i].isEndAnim){
			tempArray.push(
				fireWorkObjects[i])
		}else{
			scene.remove(fireWorkObjects[i].object3D);
			//fireWorkObjects[i].object3D.dispose();
			//renderer.deallocateObject(fireWorkObjects[i].object3D)
		}
	}
	fireWorkObjects = tempArray;

	animCounter++;
}

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function (evt) {
    setScene();

    var x1 = 128;
    var y1 = 128;
    var x2 = 192; // 256 -> 192
    var y2 = 192; // 256 -> 192
    //var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    var geometry = new THREE.Geometry();
    var s = (evt.target.response || evt.target.responseText).split("\n");
    var c = 0;
    var colors = [];
    for (var i = 0; i < y2; i++) {
        var r = s[i].split(",");
        for (var j in r) {
            var h = r[j] == 'e' ? 0 : Number(r[j]);
            var x = (j - 90) * 10;
            var y = (i - 90) * 10;
            var z = (h * 1.5) * 10; // 高さの強調度を変える場合は、ここの数値を変更する
            var color = new THREE.Color();
            color.setHSL((z/120 * 360 | 0) / 360.0, 0.80, 0.50);
            var vertex = new THREE.Vector3( x, y, z );
            geometry.vertices.push( vertex );
            colors.push(color);
        }
    }
    
    geometry.colors = colors;

    // material
    var material = new THREE.PointCloudMaterial( {
        size: 3,
        transparent: true,
        opacity: 0.7,
        vertexColors: true
    } );

    // particle system
    var plane = new THREE.PointCloud( geometry, material );
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）

    scene.add(plane);

    render();
}, false);
//xhr.open('GET',  'dem.csv', true);
xhr.open('GET', '../../assets/2/g/t/o/2gtor.csv', true);
xhr.send(null);

window.onresize = function () {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height); // レンダラ―画面の再設定
    camera.aspect = width / height; // カメラのアスペクト比の再調整
    camera.updateProjectionMatrix();
    render();
};

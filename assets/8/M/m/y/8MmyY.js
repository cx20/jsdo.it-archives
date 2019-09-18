"use strict";

// Solid Particle System : SPS

var SolidParticleSystem = function(name, scene) {

  // public members  
  this.particles = [];
  this.nbParticles = 0;
  this.billboard = false;
  this.counter = 0;


  // private members
  this._scene = scene;
  this._positions = [];
  this._indices = [];
  this._normals = [];
  this._colors = [];
  this._uvs = [];
  this._index = 0;  // indices index
  this._shapeCounter = 0;
  this._useParticleColor = true;
  this._useParticleTexture = true;
  this._useParticleRotation = true;
  this._useParticleVertex = false;
  this._cam_axisZ = BABYLON.Vector3.Zero();
  this._cam_axisY = BABYLON.Vector3.Zero();
  this._cam_axisX = BABYLON.Vector3.Zero();
  this._axisX = BABYLON.Axis.X;
  this._axisY = BABYLON.Axis.Y;
  this._axisZ = BABYLON.Axis.Z;
  this._camera = scene.activeCamera;
  this._fakeCamPos = BABYLON.Vector3.Zero();
  this._rotMatrix = new BABYLON.Matrix();
  this._invertedMatrix = new BABYLON.Matrix();
  this._rotated = BABYLON.Vector3.Zero();
  this._quaternion = new BABYLON.Quaternion();
  this._vertex = BABYLON.Vector3.Zero();
  this._yaw = 0.0;
  this._pitch = 0.0;
  this._roll = 0.0;
  this._halfroll = 0.0;
  this._halfpitch = 0.0;
  this._halfyaw = 0.0;
  this._sinRoll = 0.0;
  this._cosRoll = 0.0;
  this._sinPitch = 0.0;
  this._cosPitch = 0.0;
  this._sinYaw = 0.0;
  this._cosYaw = 0.0;
};

// dispose the SPS
SolidParticleSystem.prototype.dispose = function() {
  this.mesh.dispose();
  this.mesh = null;
  this.particles.length = 0;
  this.nbParticles = null;
  this.billboard = null;
  this.counter = null;
  this._scene = null;
  this._positions.length = 0;
  this._indices.length = 0;
  this._normals.length = 0;
  this._colors.length = 0;
  this._uvs.length = 0;
  this._index = null;
  this._shapeCounter = null;
  this._useParticleColor = null;
  this._useParticleTexture = null;
  this._useParticleRotation = null;
  this._useParticleVertex = null;
  this._cam_axisZ = null;
  this._cam_axisY = null;
  this._cam_axisX = null;
  this._axisX = null;
  this._axisY = null;
  this._axisZ = null;
  this._camera = null;
  this._fakeCamPos = null;
  this._rotMatrix = null;
  this._invertedMatrix = null;
  this._rotated = null;
  this._quaternion = null;
  this._vertex = null;
  this._yaw = null;
  this._pitch = null;
  this._roll = null;
  this._halfroll = null;
  this._halfpitch = null;
  this._halfyaw = null;
  this._sinRoll = null;
  this._cosRoll = null;
  this._sinPitch = null;
  this._cosPitch = null;
  this._sinYaw = null;
  this._cosYaw = null;
};

// build the SPS mesh : returns the mesh
SolidParticleSystem.prototype.buildMesh  = function() {
  if (this.nbParticles == 0) {
    this.addTriangles(1, 1);
  }
  BABYLON.VertexData.ComputeNormals(this._positions, this._indices, this._normals);
  var vertexData = new BABYLON.VertexData();
  vertexData.positions = this._positions;
  vertexData.indices = this._indices;
  vertexData.normals = this._normals;
  if (this._uvs) {
    vertexData.uvs = this._uvs;
  }
  if (this._colors) {
    vertexData.colors = this._colors;
  }
  var mesh = new BABYLON.Mesh(name, this._scene);
  vertexData.applyToMesh(mesh, true);
  this.mesh = mesh;
  return mesh;
};


// add a particle object in the particles array
SolidParticleSystem.prototype._addParticle = function(p, idxpos, shape, shapeUV, shapeId) {
  this.particles.push( {
    idx: p, 
    _pos: idxpos,
    _shape: shape, 
    _shapeUV : shapeUV,
    shapeId: shapeId,
    color: new BABYLON.Color4(1, 1, 1, 1),
    position: BABYLON.Vector3.Zero(), 
    rotation : BABYLON.Vector3.Zero(),
    quaternion : undefined,
    scale: new BABYLON.Vector3(1 ,1, 1), 
    uvs: [0,0, 1,1],
    velocity: BABYLON.Vector3.Zero(),
    alive: true
  } );
};

// add all the particles of a given shape to the particles array
SolidParticleSystem.prototype._addParticles = function(nb, builder, shape, shapeUV) {
  for (var i = 0; i < nb; i++) {
    builder(this._index, shape, shapeUV, this._positions, this._indices, this._uvs, this._colors);
    this._addParticle(this.nbParticles + i, this._positions.length, shape, shapeUV, this._shapeCounter);
    this._index += shape.length;
  }
  this.nbParticles += nb;
  this._shapeCounter ++;
};

// Pre-build model : triangle
SolidParticleSystem.prototype.addTriangles = function(nb, size) {
  var half = size / 2;
  var h = size * Math.sqrt(3) / 4;
  // shape and shapeUV
  var triangleShape = [
    new BABYLON.Vector3(-half, -h, 0),
    new BABYLON.Vector3(half, -h, 0),
    new BABYLON.Vector3(0, h, 0)
  ];
  var triangleUV = [0,1, 1,1, 0.5,0];
  // builder
  var triangleBuilder = function(p, shape, shapeUV, positions, indices, uvs, colors) {
    positions.push(shape[0].x, shape[0].y, shape[0].z);
    positions.push(shape[1].x, shape[1].y, shape[1].z);
    positions.push(shape[2].x, shape[2].y, shape[2].z);
    indices.push(p, p + 1, p + 2);
    for (var v = 0; v < 3; v++) {
      colors.push(1,1,1,1);
      uvs.push(shapeUV[v * 2], shapeUV[v * 2 + 1]);
    }
  };
  // particles
  this._addParticles(nb, triangleBuilder, triangleShape, triangleUV);
  return this._shapeCounter;
};


// Pre-build model : quad
SolidParticleSystem.prototype.addQuads = function(nb, size) {
  var half = size / 2;
  // shape and shapeUV
  var quadShape = [ 
    new BABYLON.Vector3(-half, -half, 0.0),
    new BABYLON.Vector3(half, -half, 0.0),
    new BABYLON.Vector3(half, half, 0.0),
    new BABYLON.Vector3(-half, half, 0.0),
  ];
  var quadUV = [0,1, 1,1, 1,0, 0,0];
  // builder
  var quadBuilder = function(p, shape, shapeUV, positions, indices, uvs, colors) {
    positions.push(shape[0].x, shape[0].y, shape[0].z);
    positions.push(shape[1].x, shape[1].y, shape[1].z);
    positions.push(shape[2].x, shape[2].y, shape[2].z);
    positions.push(shape[3].x, shape[3].y, shape[3].z);
    indices.push(p, p + 1, p + 2);
    indices.push(p, p + 2, p + 3);
    for (var v = 0; v < 4; v++) {
      colors.push(1,1,1,1);
      uvs.push(shapeUV[v * 2], shapeUV[v * 2 + 1]);
    }
  };
  // particles
  this._addParticles(nb, quadBuilder, quadShape, quadUV);
  return this._shapeCounter;
};


SolidParticleSystem.prototype.addCubes = function(nb, size) {
  var half = size / 2;
  // shape and shapeUV
  var cubeShape = [ 
    // front face
    new BABYLON.Vector3(-half, -half, -half), 
    new BABYLON.Vector3(half, -half, -half),
    new BABYLON.Vector3(half, half, -half),
    new BABYLON.Vector3(-half, half, -half),
    //back face
    new BABYLON.Vector3(half, -half, half), 
    new BABYLON.Vector3(-half, -half, half),
    new BABYLON.Vector3(-half, half, half),
    new BABYLON.Vector3(half, half, half),   
    // left face
    new BABYLON.Vector3(-half, -half, half), 
    new BABYLON.Vector3(-half, -half, -half),
    new BABYLON.Vector3(-half, half, -half),
    new BABYLON.Vector3(-half, half, half),
    // right face 
    new BABYLON.Vector3(half, -half, -half), 
    new BABYLON.Vector3(half, -half, half),
    new BABYLON.Vector3(half, half, half),
    new BABYLON.Vector3(half, half, -half),
    // top face
    new BABYLON.Vector3(-half, half, -half), 
    new BABYLON.Vector3(half, half, -half),
    new BABYLON.Vector3(half, half, half),
    new BABYLON.Vector3(-half, half, half),
    // bottom face
    new BABYLON.Vector3(-half, -half, half), 
    new BABYLON.Vector3(half, -half, half),
    new BABYLON.Vector3(half, -half, -half),
    new BABYLON.Vector3(-half, -half, -half)    
  ];
  var cubeUV = [];
  for (var f = 0; f < 6; f++) {
    cubeUV.push(0,1, 1,1, 1,0, 0,0);
  }
  // builder
  var cubeBuilder = function(p, shape, shapeUV, positions, indices, uvs, colors) { 
    var i;
    for (i = 0; i < 24; i++) {
      positions.push(shape[i].x, shape[i].y, shape[i].z);
      colors.push(1,1,1,1);  
    }
    var j;
    for (i = 0; i < 6; i++) {
      j = i * 4;
      indices.push(p + j, p + j + 1, p + j + 2);
      indices.push(p + j, p + j + 2, p + j + 3);     
      for (var u = 0; u < shapeUV.length; u++) {
        uvs.push(shapeUV[u]);
      }
      
    }
  };
  // particles
  this._addParticles(nb, cubeBuilder, cubeShape, cubeUV);
  return this._shapeCounter;
};

SolidParticleSystem.prototype.addTetrahedrons = function(nb, size) {
  var half = size / 2;
  var h = size * Math.sqrt(3) / 4;
  var high = size * Math.sqrt(6) / 3;
  // shape and shapeUV
  var pt0 = new BABYLON.Vector3(-half, -h, -high / 4);
  var pt1 = new BABYLON.Vector3(half, -h, -high / 4);
  var pt2 = new BABYLON.Vector3(0, h, -high / 4);
  var pt3 = new BABYLON.Vector3(0, 0, high * 3 / 4);
  var tetraShape = [ 
    pt0, pt1, pt2,    // front face
    pt0, pt3, pt1,    // bottom face
    pt3, pt0, pt2,    // left face
    pt1, pt3, pt2     // right face
  ];
  var tetraUV = [];
  for (var f = 0; f < 4; f++) {
    tetraUV.push(0,1, 1,1, 0.5,0);
  }
  // builder
  var tetraBuilder = function(p, shape, shapeUV, positions, indices, uvs, colors) { 
    var i;
    for (i = 0; i < 12; i++) {
      positions.push(shape[i].x, shape[i].y, shape[i].z);
      colors.push(1,1,1,1);
    }
    var j;
    for (i = 0; i < 4; i++) {
      j = i * 3;
      indices.push(p + j, p + j + 1, p + j + 2);
      for (var u = 0; u < shapeUV.length; u++) {
        uvs.push(shapeUV[u]);
      }
    }
  };
  // particles
  this._addParticles(nb, tetraBuilder, tetraShape, tetraUV);
  return this._shapeCounter;
};

SolidParticleSystem.prototype.addPolygons = function(nb, size, vertexNb) {
  vertexNb = vertexNb || 12;
  var half = size / 2;
  var pi2 = Math.PI * 2;
  // shape and shapeUV
  var polygonShape = [];
  var polygonUV = [];
  polygonShape.push(BABYLON.Vector3.Zero()); // central point
  polygonUV.push(0.5, 0.5);
  var ang = 0;
  for (var i = 0; i < vertexNb; i++) {
    ang = i * pi2 / vertexNb;
    var x = half * Math.cos(ang);
    var y = half * Math.sin(ang);
    var u = ((x / half) + 1) / 2;
    var v = (1 - (y / half)) / 2;
    polygonShape.push(new BABYLON.Vector3(x, y, 0));
    polygonUV.push(u, v);
  }
  polygonShape.push(polygonShape[1]); // close the polygon
  polygonUV.push(polygonUV[2], polygonUV[3]);
  // builder
  var polygonBuilder = function(p, shape, shapeUV, positions, indices, uvs, colors) { 
    var i;
    for (i = 0; i < shape.length; i++) {
      positions.push(shape[i].x, shape[i].y, shape[i].z);
      colors.push(1,1,1,1);
      uvs.push(shapeUV[i * 2], shapeUV[i * 2 + 1]);
    }
    for (i = 1; i <= vertexNb; i++) {
      indices.push(p + i + 1, p, p + i);
    }
  };
  // particles
  this._addParticles(nb, polygonBuilder, polygonShape, polygonUV);
  return this._shapeCounter;
};

SolidParticleSystem.prototype.addShape = function(mesh, nb) {
  var meshPos = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
  var meshInd = mesh.getIndices();
  var meshUV = mesh.getVerticesData(BABYLON.VertexBuffer.UVKind);
  var meshCol = mesh.getVerticesData(BABYLON.VertexBuffer.ColorKind);
  // shape and shapeUV
  var posToShape = function(positions) {
    var shape = [];
    for (var i = 0; i < positions.length; i += 3) {
      shape.push(new BABYLON.Vector3(positions[i], positions[i + 1], positions[i + 2]));
    }
    return shape;
  };
  var uvsToShapeUV = function(uvs) {
    var shapeUV = [];
      if (uvs) {
      for (var i = 0; i < uvs.length; i+= 2) {
        shapeUV.push(uvs[i], uvs[i + 1]);
      }
    }
    return shapeUV;
  };
  var shape = posToShape(meshPos);
  var shapeUV = uvsToShapeUV(meshUV);
  // builder
  var meshBuilder = function(p, shape, positions, meshInd, indices, meshUV, uvs, meshCol, colors) { 
    var i;
    var u = 0;
    var c = 0;
    for (i = 0; i < shape.length; i++) {
      positions.push(shape[i].x, shape[i].y, shape[i].z);
      if (meshUV) {
        uvs.push(meshUV[u], meshUV[u + 1]);
        u += 2;
      }
      if (meshCol) {
        colors.push(meshCol[c], meshCol[c + 1], meshCol[c + 2], meshCol[c + 3]);
        c += 4;
      }
      else {
        colors.push(1,1,1,1);
      }
    }
    for (i = 0; i < meshInd.length; i++) {
      indices.push(p + meshInd[i]);
    }
  };
  // particles
  for (var i = 0; i < nb; i++) {
    meshBuilder(this._index, shape, this._positions, meshInd, this._indices, meshUV, this._uvs, meshCol, this._colors);
    this._addParticle(this.nbParticles + i, this._positions.length, shape, shapeUV, this._shapeCounter);
    this._index += shape.length;
  }
  this.nbParticles += nb;
  this._shapeCounter ++;
  return this._shapeCounter;
};

// reset a particle to its just built status
SolidParticleSystem.prototype.resetParticle = function(particle) {
  for (var pt = 0; pt < particle._shape.length; pt++) {
    this._positions[particle._pos + pt * 3] = particle._shape[pt].x;      
    this._positions[particle._pos + pt * 3 + 1] = particle._shape[pt].y;
    this._positions[particle._pos + pt * 3 + 2] = particle._shape[pt].z;
  }
};




// set all the particles
SolidParticleSystem.prototype.setParticles = function() {

  // custom beforeUpdate
  this.beforeUpdateParticles();

  this._cam_axisX.x = 1;
  this._cam_axisX.y = 0;
  this._cam_axisX.z = 0;

  this._cam_axisY.x = 0;
  this._cam_axisY.y = 1;
  this._cam_axisY.z = 0;

  this._cam_axisZ.x = 0;
  this._cam_axisZ.y = 0;
  this._cam_axisZ.z = 1;

  // if the particles will always face the camera
  if (this.billboard)  {    
      // compute a fake camera position : un-rotate the camera position by the current mesh rotation
      this._yaw = this.mesh.rotation.y;
      this._pitch = this.mesh.rotation.x;
      this._roll = this.mesh.rotation.z;
      this._quaternionRotationYPR();
      this._quaternionToRotationMatrix();    
      this._rotMatrix.invertToRef(this._invertedMatrix);
      BABYLON.Vector3.TransformCoordinatesToRef(this._camera.globalPosition, this._invertedMatrix, this._fakeCamPos);

      // set two orthogonal vectors (_cam_axisX and and _cam_axisY) to the cam-mesh axis (_cam_axisZ)
      (this._fakeCamPos).subtractToRef(this.mesh.position, this._cam_axisZ);
      BABYLON.Vector3.CrossToRef(this._cam_axisZ, this._axisX, this._cam_axisY);
      BABYLON.Vector3.CrossToRef(this._cam_axisZ, this._cam_axisY, this._cam_axisX);
      this._cam_axisY.normalize();
      this._cam_axisX.normalize();
      this._cam_axisZ.normalize();
  }
  

  BABYLON.Matrix.IdentityToRef(this._rotMatrix);
  var idx = 0;
  var index = 0;
  var colidx = 0;
  var colorIndex = 0;
  var uvidx = 0;
  var uvIndex = 0;

  // particle loop
  for (var p = 0; p < this.nbParticles; p++) { 
    this._particle = this.particles[p];

    // call to custom user function to update the particle properties
    this.updateParticle(this._particle); 

    // particle rotation matrix
    if (this.billboard) {
      this._particle.rotation.x = 0.0;
      this._particle.rotation.y = 0.0;
    }
    if (this._useParticleRotation) {
      if (this._particle.quaternion) {
        this._quaternion.x = this._particle.quaternion.x;
        this._quaternion.y = this._particle.quaternion.y;
        this._quaternion.z = this._particle.quaternion.z;
        this._quaternion.w = this._particle.quaternion.w;
      }
      else {
        this._yaw = this._particle.rotation.y;
        this._pitch = this._particle.rotation.x;
        this._roll = this._particle.rotation.z;
        this._quaternionRotationYPR();
      }
      this._quaternionToRotationMatrix();
    }
  
    for (var pt = 0; pt < this._particle._shape.length; pt++) {
      idx = index + pt * 3;
      colidx = colorIndex + pt * 4;
      uvidx = uvIndex + pt * 2;

      this._vertex.x = this._particle._shape[pt].x;
      this._vertex.y = this._particle._shape[pt].y;
      this._vertex.z = this._particle._shape[pt].z;

      if (this._useParticleVertex) {
        this.updateParticleVertex(this._particle, this._vertex, pt);
      }

      BABYLON.Vector3.TransformCoordinatesToRef(this._vertex, this._rotMatrix, this._rotated);

      this._positions[idx]     = this._particle.position.x + this._cam_axisX.x * this._rotated.x * this._particle.scale.x + this._cam_axisY.x * this._rotated.y * this._particle.scale.y + this._cam_axisZ.x * this._rotated.z * this._particle.scale.z;      
      this._positions[idx + 1] = this._particle.position.y + this._cam_axisX.y * this._rotated.x * this._particle.scale.x + this._cam_axisY.y * this._rotated.y * this._particle.scale.y + this._cam_axisZ.y * this._rotated.z * this._particle.scale.z; 
      this._positions[idx + 2] = this._particle.position.z + this._cam_axisX.z * this._rotated.x * this._particle.scale.x + this._cam_axisY.z * this._rotated.y * this._particle.scale.y + this._cam_axisZ.z * this._rotated.z * this._particle.scale.z; 

      if (this._useParticleColor) {
        this._colors[colidx] = this._particle.color.r;
        this._colors[colidx + 1] = this._particle.color.g;
        this._colors[colidx + 2] = this._particle.color.b;
        this._colors[colidx + 3] = this._particle.color.a;
      }

      if (this._useParticleTexture) {
        this._uvs[uvidx] = this._particle._shapeUV[pt * 2] * (this._particle.uvs[2] - this._particle.uvs[0]) + this._particle.uvs[0];
        this._uvs[uvidx + 1] = this._particle._shapeUV[pt * 2 + 1] * (this._particle.uvs[3] - this._particle.uvs[1]) + this._particle.uvs[1];
      }
    }
    index = idx + 3;
    colorIndex = colidx + 4;
    uvIndex = uvidx + 2;
  }

if (this._useParticleColor) {
  this.mesh.updateVerticesData(BABYLON.VertexBuffer.ColorKind, this._colors, false, false);
}
if (this._useParticleTexture) {
  this.mesh.updateVerticesData(BABYLON.VertexBuffer.UVKind, this._uvs, false, false);
}
this.mesh.updateVerticesData(BABYLON.VertexBuffer.PositionKind, this._positions, false, false);
if (!this.mesh._areNormalsFrozen) {
  var indices = this.mesh.getIndices();
  BABYLON.VertexData.ComputeNormals(this._positions, this._indices, this._normals);
  this.mesh.updateVerticesData(BABYLON.VertexBuffer.NormalKind, this._normals, false, false);
}
this.afterUpdateParticles();
//this.mesh.refreshBoundingInfo();
};

// internal implementation of BJS Quaternion.RotationYawPitchRollToRef()
SolidParticleSystem.prototype._quaternionRotationYPR = function() {
  this._halfroll = this._roll * 0.5;
  this._halfpitch = this._pitch * 0.5;
  this._halfyaw = this._yaw * 0.5;
  this._sinRoll = Math.sin(this._halfroll);
  this._cosRoll = Math.cos(this._halfroll);
  this._sinPitch = Math.sin(this._halfpitch);
  this._cosPitch = Math.cos(this._halfpitch);
  this._sinYaw = Math.sin(this._halfyaw);
  this._cosYaw = Math.cos(this._halfyaw);
  this._quaternion.x = (this._cosYaw * this._sinPitch * this._cosRoll) + (this._sinYaw * this._cosPitch * this._sinRoll);
  this._quaternion.y = (this._sinYaw * this._cosPitch * this._cosRoll) - (this._cosYaw * this._sinPitch * this._sinRoll);
  this._quaternion.z = (this._cosYaw * this._cosPitch * this._sinRoll) - (this._sinYaw * this._sinPitch * this._cosRoll);
  this._quaternion.w = (this._cosYaw * this._cosPitch * this._cosRoll) + (this._sinYaw * this._sinPitch * this._sinRoll);
};

// internal implemenation of BJS toRotationMatric()
SolidParticleSystem.prototype._quaternionToRotationMatrix = function() {
  this._rotMatrix.m[0] = 1.0 - (2.0 * (this._quaternion.y * this._quaternion.y + this._quaternion.z * this._quaternion.z));
  this._rotMatrix.m[1] = 2.0 * (this._quaternion.x * this._quaternion.y + this._quaternion.z * this._quaternion.w);
  this._rotMatrix.m[2] = 2.0 * (this._quaternion.z * this._quaternion.x - this._quaternion.y * this._quaternion.w);
  this._rotMatrix.m[3] = 0;
  this._rotMatrix.m[4] = 2.0 * (this._quaternion.x * this._quaternion.y - this._quaternion.z * this._quaternion.w);
  this._rotMatrix.m[5] = 1.0 - (2.0 * (this._quaternion.z * this._quaternion.z + this._quaternion.x * this._quaternion.x));
  this._rotMatrix.m[6] = 2.0 * (this._quaternion.y * this._quaternion.z + this._quaternion.x * this._quaternion.w);
  this._rotMatrix.m[7] = 0;
  this._rotMatrix.m[8] = 2.0 * (this._quaternion.z * this._quaternion.x + this._quaternion.y * this._quaternion.w);
  this._rotMatrix.m[9] = 2.0 * (this._quaternion.y * this._quaternion.z - this._quaternion.x * this._quaternion.w);
  this._rotMatrix.m[10] = 1.0 - (2.0 * (this._quaternion.y * this._quaternion.y + this._quaternion.x * this._quaternion.x));
  this._rotMatrix.m[11] = 0;
  this._rotMatrix.m[12] = 0;
  this._rotMatrix.m[13] = 0;
  this._rotMatrix.m[14] = 0;
  this._rotMatrix.m[15] = 1.0;
};

// Optimizers
SolidParticleSystem.prototype.enableParticleRotation = function() {
  this._useParticleRotation = true;
}; 

SolidParticleSystem.prototype.disableParticleRotation = function() {
  this._useParticleRotation = false;
}; 

SolidParticleSystem.prototype.enableParticleColor = function() {
  this._useParticleColor = true;
}; 

SolidParticleSystem.prototype.disableParticleColor = function() {
  this._useParticleColor = false;
}; 

SolidParticleSystem.prototype.enableParticleTexture = function() {
  this._useParticleTexture = true;
}; 

SolidParticleSystem.prototype.disableParticleTexture = function() {
  this._useParticleTexture = false;
}; 

SolidParticleSystem.prototype.enableParticleVertex = function() {
  this._useParticleVertex = true;
}; 

SolidParticleSystem.prototype.disableParticleVertex = function() {
  this._useParticleVertex = false;
}; 

// =======================================================================
// Particle behavior logic
// these following methods may be overwritten by the user to fit his needs


// init : set all particles first values and calls updateParticle to set them in space
// can be overwritten by the user
SolidParticleSystem.prototype.initParticles = function() {
    /*
    for (var p = 0; p < this.nbParticles; p++) {
      // your process here
    }
    */
};



// recycle a particle : can by overwritten by the user
SolidParticleSystem.prototype.recycleParticle = function(particle) {
  return particle;
};


// update a particle : can be overwritten by the user
// will be called on each particle by setParticles() :
// ex : just set a particle position or velocity and recycle conditions
SolidParticleSystem.prototype.updateParticle = function(particle) {
  return particle;
};

// update a vertex of a particle : can be overwritten by the user
// will be called on each vertex particle by setParticles() :
// ex : just set a vertex particle position
SolidParticleSystem.prototype.updateParticleVertex = function(particle, vertex, i) {
  return vertex;
};


// will be called before any other treatment by setParticles()
SolidParticleSystem.prototype.beforeUpdateParticles = function() {

};

// will be called after all setParticles() treatments
SolidParticleSystem.prototype.afterUpdateParticles = function() {

};
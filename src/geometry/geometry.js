LIME.Geometry = function(scene) {
   this.context = scene.getContext();
   this.vertices = [];
   this.normals = [];
   this.ratio = scene.getAspectRatio();

   var gl = this.context;
   this.vertexBuffer = gl.createBuffer();
   if(!this.vertexBuffer) {
      console.log("Failed to created vertex buffer object.");
      return -1;
   }
};

LIME.Geometry.prototype.createRectangle = function(length, width, zOffset) {
   this.vertices = [];

   if (zOffset == undefined) zOffset = 0.0;

   this.vertices.push(-(width/2), -(length/2), zOffset);
   this.vertices.push(-(width/2), (length/2), zOffset);
   this.vertices.push((width/2), (length/2), zOffset);
   this.vertices.push((width/2), -(length/2), zOffset);

   this.createBuffer();
};

LIME.Geometry.prototype.createTriangle = function(length, width, zOffset) {
   this.vertices = [];

   if (zOffset == undefined) zOffset = 0.0;

   this.vertices.push(-(width/2), -(length/2), zOffset);    
   this.vertices.push((width/2), -(length/2), zOffset);
   this.vertices.push(0.0, (length/2), zOffset);

   this.createBuffer();
};

LIME.Geometry.prototype.createCube = function(length, width, depth) {
   this.vertices = [];

   var l = length/2;
   var w = width/2;
   var d = depth/2;

  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3

  this.vertices = [
    -l, w, d,  //v6
    -l, -w, d,  //v7
    l, -w, d,  //v4

    -l, w, d,  //v6
    l, -w, d,  //v4
    l, w, d,  //v5

    l, w, d,  //v5
    l, -w, d,  //v4
    l, -w, -d,  //v3

    l, w, d,  //v5
    l, -w, -d,  //v3
    l, w, -d,  //v0

    l, -w, d,  //v4
    -l, -w, d,  //v7
    -l, -w, -d,  //v2

    l, -w, d,  //v4
    -l, -w, -d,  //v2
    l, -w, -d,  //v3

    l, w, -d,  //v0
    -l, w, -d,  //v1
    -l, w, d,  //v6

    l, w, -d,  //v0
    -l, w, d,  //v6
    l, w, d,  //v5

    -l, -w, -d,  //v2
    -l, w, -d,  //v1
    l, w, -d,  //v0

    -l, -w, -d,  //v2
    l, w, -d,  //v0
    l, -w, -d,  //v3

    -l, w, -d,  //v1
    -l, -w, -d,  //v2
    -l, -w, d,  //v7

    -l, w, -d,  //v1
    -l, -w, d,  //v7
    -l, w, d  //v6
  ];

  this.normals = [
    0.0, 0.0, 1.0,  //v6
    0.0, 0.0, 1.0,  //v7
    0.0, 0.0, 1.0,  //v4

    0.0, 0.0, 1.0,  //v6
    0.0, 0.0, 1.0,  //v4
    0.0, 0.0, 1.0,  //v5

    1.0, 0.0, 0.0,  //v5
    1.0, 0.0, 0.0,  //v4
    1.0, 0.0, 0.0,  //v3

    1.0, 0.0, 0.0,  //v5
    1.0, 0.0, 0.0,  //v3
    1.0, 0.0, 0.0,  //v0

    0.0, -1.0, 0.0,  //v4
    0.0, -1.0, 0.0,  //v7
    0.0, -1.0, 0.0,  //v2

    0.0, -1.0, 0.0,  //v4
    0.0, -1.0, 0.0,  //v2
    0.0, -1.0, 0.0,  //v3

    0.0, 1.0, 0.0,  //v0
    0.0, 1.0, 0.0,  //v1
    0.0, 1.0, 0.0,  //v6

    0.0, 1.0, 0.0,  //v0
    0.0, 1.0, 0.0,  //v6
    0.0, 1.0, 0.0,  //v5

    0.0, 0.0, -1.0,  //v2
    0.0, 0.0, -1.0,  //v1
    0.0, 0.0, -1.0,  //v0

    0.0, 0.0, -1.0,  //v2
    0.0, 0.0, -1.0,  //v0
    0.0, 0.0, -1.0,  //v3

    -1.0, 0.0, 0.0,  //v1
    -1.0, 0.0, 0.0,  //v2
    -1.0, 0.0, 0.0,  //v7

    -1.0, 0.0, 0.0,  //v1
    -1.0, 0.0, 0.0,  //v7
    -1.0, 0.0, 0.0,  //v6
  ];

   this.createBuffer();
};

LIME.Geometry.prototype.createCircle = function(radius, segments) {
   this.vertices = [];
   var angle = 0;

   this.vertices.push(0.0, 0.0, 0.0);

   for(var i = 0; i < segments + 1; i++){
      angle = ((2*Math.PI) / segments)*i;
      this.vertices.push(radius * Math.cos(angle), radius * Math.sin(angle), 0.0);
   }
   this.createBuffer();
};

LIME.Geometry.prototype.points_from_array = function(arr) {
   this.vertices = arr.splice(0,arr.length);
   this.createBuffer();
};

LIME.Geometry.prototype.addPoints = function(points, clear) {
   if (clear) this.vertices = [];
   for(var i = 0; i < points.length/3; i++) {
      this.vertices.push(points[0 + 3*i], points[1 + 3*i], points[2 + 3*i]);
   }
   this.createBuffer();
};

LIME.Geometry.prototype.setNormals = function(arr) {
  if(arr.length != this.vertices.length) { 
    console.log("Vertices and normal array mis-match!");
  }

  else {
    this.normals = arr.splice(0,arr.length);
  }
};

LIME.Geometry.prototype.createBuffer = function() {
   var gl = this.context;
   gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
};

LIME.Geometry.prototype.getBuffer = function() {
   return this.vertexBuffer;
};

LIME.Geometry.prototype.getGeometry = function() {
   return new Float32Array(this.vertices);
};

LIME.Geometry.prototype.getArraySize = function() {
   return this.vertices.length;
};

LIME.Geometry.prototype.getNormals = function() {
  return new Float32Array(this.normals);
};

LIME.Geometry.prototype.offsetCenter = function(x, y) {
   for(var i = 0; i < this.vertices.length/3; i++) {
      this.vertices[0 + 3*i] += x;
      this.vertices[1 + 3*i] += y;
   }
};


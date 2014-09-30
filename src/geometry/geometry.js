LIME.Geometry = function(scene) {
   this.vertices = [];
   this.ratio = scene.getAspectRatio();
};

LIME.Geometry.prototype.createRectangle = function(length, width, zOffset) {
   this.vertices = [];

   if (zOffset == undefined) zOffset = 0.0;

   this.vertices.push(-(width/2), -(length/2), 0.0);
   this.vertices.push(-(width/2), (length/2), 0.0);
   this.vertices.push((width/2), (length/2), 0.0);
   this.vertices.push((width/2), -(length/2), 0.0);
};

LIME.Geometry.prototype.createTriangle = function(length, width, zOffset) {
   this.vertices = [];

   if (zOffset == undefined) zOffset = 0.0;

   this.vertices.push(-(width/2), -(length/2), 0.0);
   this.vertices.push((width/2), -(length/2), 0.0);
   this.vertices.push(0.0, (length/2), 0.0);
};

LIME.Geometry.prototype.createCube = function(length, width, depth) {
   this.vertices = [];

   var l = length/2;
   var w = width/2;
   var d = depth/2;

   this.vertices.push(-l, -w, d);
   this.vertices.push(-l, w, d);
   this.vertices.push(l, -w, d);
   this.vertices.push(l, w, d);

   this.vertices.push(l, -w, d);
   this.vertices.push(l, w, d);
   this.vertices.push(l, -w, -d);
   this.vertices.push(l, w, -d);

   this.vertices.push(l, -w, -d);
   this.vertices.push(l, w, -d);
   this.vertices.push(-l, -w, -d);
   this.vertices.push(-l, w, -d);

   this.vertices.push(-l,-w, -d);
   this.vertices.push(-l, w, -d);
   this.vertices.push(-l, -w, d);
   this.vertices.push(-l, w, d);

   this.vertices.push(-l, -w, d);
   this.vertices.push(l, -w, d);
   this.vertices.push(-l, -w, -d);
   this.vertices.push(l, -w, -d);

   this.vertices.push(-l, w, d);
   this.vertices.push(l, w, d);
   this.vertices.push(-l, w, -d);
   this.vertices.push(l, w, -d);
};

LIME.Geometry.prototype.createCircle = function(radius, segments) {
   this.vertices = [];
   var angle = 0;

   this.vertices.push(0.0, 0.0, 0.0);

   for(var i = 0; i < segments + 1; i++){
      angle = ((2*Math.PI) / segments)*i;
      this.vertices.push(radius * Math.cos(angle), radius * Math.sin(angle), 0.0);
   }
};

LIME.Geometry.prototype.addPoints = function(points, clear) {
   if (clear) this.vertices = [];
   for(var i = 0; i < points.length/3; i++) {
      this.vertices.push(points[0 + 3*i], points[1 + 3*i], points[2 + 3*i]);
   }
};

LIME.Geometry.prototype.getGeometry = function() {
   //this.applyAspectRatio();
   return new Float32Array(this.vertices);
};

LIME.Geometry.prototype.getArraySize = function() {
   return this.vertices.length;
};

LIME.Geometry.prototype.applyAspectRatio = function() {
   for(var i = 0; i < this.vertices.length/3; i++) {
      this.vertices[0 + 3*i] *= this.ratio[1];
   }
}

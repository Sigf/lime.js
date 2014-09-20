LIME.Geometry = function() {
   this.vertices = [];

   this.createRectangle = function(length, width, zOffset) {
      this.vertices = [];

      if (zOffset == undefined) zOffset = 0.0;

      this.vertices.push(-(width/2), -(length/2), 0.0);
      this.vertices.push(-(width/2), (length/2), 0.0);
      this.vertices.push((width/2), (length/2), 0.0);
      this.vertices.push((width/2), -(length/2), 0.0);
   };

   this.createTriangle = function(length, width, zOffset) {
      this.vertices = [];

      if (zOffset == undefined) zOffset = 0.0;

      this.vertices.push(-(width/2), -(length/2), 0.0);
      this.vertices.push((width/2), -(length/2), 0.0);
      this.vertices.push(0.0, (length/2), 0.0);
   };

   this.createCube = function(length, width, depth) {
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

   this.getGeometry = function() {
      return new Float32Array(this.vertices);
   }

   this.getArraySize = function() {
      return this.vertices.length;
   }
};

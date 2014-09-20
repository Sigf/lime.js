LIME.Shape = function(geomerty, material, gl, drawType) {
   this.geomerty = geometry;
   this.material = material;
   this.context = gl;
   this.modelMatrix = new Matrix4();
   this.u_ModelMatrix = context.getUniformLocation(material.getProgram(), 'u_ModelMatrix');

   switch(drawType) {
      case 0:
         this.drawType = context.POINTS;
         break;
      case 1:
         this.drawType = context.LINES;
         break;
      case 2:
         this.drawType = context.LINE_STRIP;
         break;
      case 3:
         this.drawType = context.LINE_LOOP;
         break;
      case 4:
         this.drawType = context.TRIANGLES;
         break;
      case 5:
         this.drawType = context.TRIANGLE_STRIP;
         break;
      case 6:
         this.drawType = context.TRIANGLE_FAN;
         break;
      default:
         this.drawType = context.POINTS;
   }

   var gl = this.context;

   if(!this.geometry.getArraySize()) {
      console.log("The shape doesn't have any points in its array!");
      return;
   }

   n = this.geometry.getArraySize() / 3;

   this.vertexArray = this.geometry.getGemetry();

   this.colorArray = this.material.getColorArray();

   this.vertexBuffer = gl.createBuffer();
   if(!this.vertexBuffer) {
      console.log("Failed to created vertex buffer object.");
      return -1;
   }

   this.colorBuffer = gl.createBuffer();
   if(!this.vertexBuffer) {
      console.log("Failed to created color buffer object.");
      return -1;
   }

   this.a_Position = gl.getAttribLocation(gl.program, 'a_Position');
   if (this.a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return -1;
   }

   this.a_Color = gl.getAttribLocation(gl.program, 'a_Color');
   if (this.a_Color < 0) {
      console.log('Failed to get the storage location of a_Position');
      return -1;
   }

   this.draw = function() {
      var gl = this.context;  

      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.vertexArray, gl.STATIC_DRAW);
      gl.vertexAttribPointer(this.a_Position, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.a_Position);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.colorArray, gl.STATIC_DRAW);
      gl.vertexAttribPointer(this.a_Color, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.a_Color);

      gl.uniformMatrix4fv(this.u_ModelMatrix, false, this.modelMatrix.elements);
      gl.drawArrays(this.drawType, 0, this.vertices.length / 3);
   };

   this.setRotation = function(angle, x, y, z){
      this.modelMatrix.setRotate(angle, x, y, z);
   };

   this.rotate = function(angle, x, y, z){
      this.modelMatrix.rotate(angle, x, y, z);
   };

   this.setPosition = function(x, y, z){
      this.modelMatrix.setTranslate(x, y, z);
   };

   this.translate = function(x, y, z){
      this.modelMatrix.translate(x, y, z);
   };

   this.setScale = function(x, y, z){
      this.modelMatrix.setScale(x, y, z);
   };

   this.scale = function(x, y, z){
      this.modelMatrix.scale(x, y, z);
   };
};

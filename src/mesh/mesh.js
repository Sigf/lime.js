LIME.Shape = function(geometry, material, gl, drawType) {
   this.x;
   this.y;
   this.z;
   this.hitbox = [];
   this.texCoord;
   this.geometry = geometry;
   this.material = material;
   this.context = gl;
   this.modelMatrix = new Matrix4();
   this.u_ModelMatrix = this.context.getUniformLocation(material.getProgram(), 'u_ModelMatrix');

   switch(drawType) {
      case 0:
         this.drawType = this.context.POINTS;
         break;
      case 1:
         this.drawType = this.context.LINES;
         break;
      case 2:
         this.drawType = this.context.LINE_STRIP;
         break;
      case 3:
         this.drawType = this.context.LINE_LOOP;
         break;
      case 4:
         this.drawType = this.context.TRIANGLES;
         break;
      case 5:
         this.drawType = this.context.TRIANGLE_STRIP;
         break;
      case 6:
         this.drawType = this.context.TRIANGLE_FAN;
         break;
      default:
         this.drawType = this.context.POINTS;
   }

   var gl = this.context;

   if(!this.geometry.getArraySize()) {
      console.log("The shape doesn't have any points in its array!");
      return;
   }

   this.vertexArray = this.geometry.getGeometry();
   this.vertexBuffer = gl.createBuffer();
   if(!this.vertexBuffer) {
      console.log("Failed to created vertex buffer object.");
      return -1;
   }

   this.a_Position = gl.getAttribLocation(this.material.getProgram(), 'a_Position');
   if (this.a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return -1;
   }

   if(this.material.getType() == LIME.perPixelColorMaterial) {
      this.colorArray = this.material.getColorArray();  
      this.colorBuffer = gl.createBuffer();
      if(!this.vertexBuffer) {
         console.log("Failed to created color buffer object.");
         return -1;
      }
      this.a_Color = gl.getAttribLocation(this.material.getProgram(), 'a_Color');
      if (this.a_Color < 0) {
         console.log('Failed to get the storage location of a_Position');
         return -1;
      }
   }

   else if(this.material.getType() == LIME.flatTextureMaterial) {

      this.texCoordbuffer = gl.createBuffer();
      if(!this.texCoordbuffer) {
         console.log("failed to create texture coordinate buffer.");
         return -1;
      }

      this.a_TexCoord = gl.getAttribLocation(this.material.getProgram(), 'a_TexCoord');
      if(!this.a_TexCoord) {
         console.log("failed to get the storage location for a_TexCoord.");
         return -1;
      }
   }
}

LIME.Shape.prototype.generateHitbox = function() {
   /*var min_x = 0.0;
   var min_y = 0.0;
   var max_x = 0.0;
   var max_y = 0.0;

   var points = this.geometry.getGeometry();

   for(var i = 0; i < points.length/3; i++) {
      if((points[0 + (3*i)] + this.x) > max_x) max_x = points[0 + (3*i)];
      if((points[0 + (3*i)] + this.x) < min_x) min_x = points[0 + (3*i)];
      if((points[1 + (3*i)] + this.y) < min_y) min_y = points[0 + (3*i)];
        if((points[1 + (3*i)] + this.y) < min_y) min_y = points[0 + (3*i)];
   }

   this.hitbox.push(min_x);
   this.hitbox.push(min_y);
   this.hitbox.push(max_x);
   this.hitbox.push(max_y);*/

   this.hitbox = [];

   this.hitbox.push(this.x);
   this.hitbox.push(this.y);
   this.hitbox.push(this.x + 0.16);
   this.hitbox.push(this.y + 0.1);
}

LIME.Shape.prototype.draw = function(offset, frame_size) {
   var gl = this.context;
   if(frames == undefined) frames = 1;
   if(frame_size == undefined) var n = this.geometry.getArraySize() / 3; 
   else var n = frame_size;
   if(offset == undefined) offset = 0;

   gl.useProgram(this.material.getProgram());

   gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, this.vertexArray, gl.STATIC_DRAW);
   gl.vertexAttribPointer(this.a_Position, 3, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(this.a_Position); 

   if(this.material.getType() == LIME.perPixelColorMaterial) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.colorArray, gl.STATIC_DRAW);
      gl.vertexAttribPointer(this.a_Color, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.a_Color);
   }
  
   else if(this.material.getType() == LIME.flatTextureMaterial /*&& this.material.isReady()*/) {

      if(this.texCoord == undefined) {
         console.log("no texture coordinate set.");
         return -1;
      }
      gl.activeTexture(gl.TEXTURE0 + this.material.getTextureIndex());
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.bindTexture(gl.TEXTURE_2D, this.material.getTexture());
      gl.uniform1i(this.material.getSampler(), this.material.texture_index);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.material.getImage());

      gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordbuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.texCoord, gl.STATIC_DRAW);
      gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.a_TexCoord);
   }

   gl.uniformMatrix4fv(this.u_ModelMatrix, false, this.modelMatrix.elements);
   gl.drawArrays(this.drawType, offset  , n);
};

LIME.Shape.prototype.setRotation = function(angle, x, y, z){
   this.modelMatrix.setRotate(angle, x, y, z);
};

LIME.Shape.prototype.rotate = function(angle, x, y, z){
   this.modelMatrix.rotate(angle, x, y, z);
};

LIME.Shape.prototype.setPosition = function(x, y, z){
   this.modelMatrix.setTranslate(x, y, z);
   this.x = x;
   this.y = y;
   this.z = z;
};

LIME.Shape.prototype.translate = function(x, y, z){
   this.modelMatrix.translate(x, y, z);
   this.x += x;
   this.y += y;
   this.z += z;
};

LIME.Shape.prototype.setScale = function(x, y, z){
   this.modelMatrix.setScale(x, y, z);
};

LIME.Shape.prototype.scale = function(x, y, z){
   this.modelMatrix.scale(x, y, z);
};

LIME.Shape.prototype.getLocation = function() {
   return [this.x, this.y, this.z];
};

LIME.Shape.prototype.getHitbox = function() {
   return this.hitbox;
};

LIME.Shape.prototype.setTexCoord = function(arr) {
   this.texCoord = new Float32Array(arr);
}

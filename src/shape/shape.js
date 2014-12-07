LIME.Shape = function(geometry, material, gl, drawType, camera, uv_set) {
   this.x;
   this.y;
   this.z;
   this.hitbox = [];
   this.texCoord = [];
   (uv_set === undefined) ? this.texCoord = [] : this.texCoord = new Float32Array(uv_set);
   this.geometry = geometry;
   this.vertexArray = geometry.getGeometry();
   this.normals = geometry.getNormals();
   this.normalMatrix = new Matrix4();
   this.material = material;
   this.context = gl;
   this.camera = camera;
   this.modelMatrix = new Matrix4();
   this.viewMatrix = this.camera.getViewMatrix();
   this.projectionMatrix = this.camera.getProjectionMatrix();
   this.mvpMatrix = new Matrix4();
   this.modelViewMatrix = new Matrix4();
   //this.u_ModelMatrix = this.context.getUniformLocation(material.getProgram(), 'u_ModelMatrix');

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

   this.vertexBuffer = this.geometry.getBuffer();
   /*this.vertexBuffer = gl.createBuffer();
   if(!this.vertexBuffer) {
      console.log("Failed to created vertex buffer object.");
      return -1;
   }*/

   this.a_Position = gl.getAttribLocation(this.material.getProgram(), 'a_Position');
   if (this.a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return -1;
   }

   this.u_MvpMatrix = gl.getUniformLocation(this.material.getProgram(), 'u_MvpMatrix');
   if(!this.u_MvpMatrix) {
      console.log("Failed to get the storage location of u_MvpMatrix");
      return -1;
   }

   if(this.material.isLit || this.material.type == LIME.PhongShader) {
    this.normalsBuffer = gl.createBuffer();
    this.a_Normal = gl.getAttribLocation(this.material.getProgram(), 'a_Normal');
    if(this.a_Normal < 0) {
         console.log("failed to get the storage location for a_Normal.");
         return -1;
      }

   }

   if(this.material.getType() == LIME.perPixelColorMaterial) {
      this.colorArray = this.material.getColorArray();  
      this.colorBuffer = this.material.getColorBuffer();

      this.a_Color = gl.getAttribLocation(this.material.getProgram(), 'a_Color');
      if (this.a_Color < 0) {
         console.log('Failed to get the storage location of a_Color');
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

   if(this.material.isLit){
    this.u_LightColor = gl.getUniformLocation(this.material.getProgram(), 'u_LightColor');
    if(!this.u_LightColor) {
         console.log("failed to get the storage location for u_LightColor.");
         return -1;
      }
    this.u_LightDirection = gl.getUniformLocation(this.material.getProgram(), 'u_LightDirection');
    if(!this.u_LightDirection) {
         console.log("failed to get the storage location for u_LightDirection.");
         return -1;
      }
    
   this.u_NormalMatrix = gl.getUniformLocation(this.material.getProgram(), 'u_NormalMatrix');
    
   }

   gl.bufferData(gl.ARRAY_BUFFER, this.geometry.getGeometry(), gl.STATIC_DRAW);

   if(this.material.type == LIME.PhongShader) gl.enableVertexAttribArray(this.material.a_Position);
   else gl.enableVertexAttribArray(this.a_Position);

    if(this.material.getType() == LIME.perPixelColorMaterial) {
      //gl.bufferData(gl.ARRAY_BUFFER, this.colorArray, gl.STATIC_DRAW);
      //gl.enableVertexAttribArray(this.a_Color);
    }

    if(this.material.getType() == LIME.flatTextureMaterial) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);//
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);//
      gl.bindTexture(gl.TEXTURE_2D, this.material.getTexture());
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);//
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);//

    }
};

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
};

LIME.Shape.prototype.draw = function(light, offset, frame_size) {
   var gl = this.context;
   if(this.material.getType() == LIME.flatTextureMaterial && !this.material.isReady()) return;
   if(frames == undefined) frames = 1;
   if(frame_size == undefined) var n = this.geometry.getArraySize() / 3; 
   else var n = frame_size;
   if(offset == undefined) offset = 0;

   gl.useProgram(this.material.getProgram());

   if(this.material.type == LIME.PhongShader) {
      var lightColor = light.getColor();
      var lightDirection = light.getDirection();
      //var lightPosition = light.getPosition();

      var lightPosition = new Vector3([10.0, 10.0, 10.0]);
      var lightSpec = new Vector3([1.0, 1.0, 1.0]);
      var lightAmbient = new Vector3([0.3, 0.3, 0.3]);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.vertexAttribPointer(this.material.a_Position, 3, gl.FLOAT, false, 0, 0);

      gl.uniform3fv(this.material.u_Ld, lightColor.elements);
      gl.uniform3fv(this.material.u_Ls, lightSpec.elements);
      gl.uniform3fv(this.material.u_La, lightAmbient.elements);

      gl.uniform3fv(this.material.u_Kd, this.material.Kd.elements);
      gl.uniform3fv(this.material.u_Ks, this.material.Ks.elements);
      gl.uniform3fv(this.material.u_Ka, this.material.Ka.elements);

      gl.uniform1f(this.material.u_Shininess, this.material.shine);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);//
      gl.vertexAttribPointer(this.material.a_Normal, 3, gl.FLOAT, false, 0, 0);//?
      gl.enableVertexAttribArray(this.material.a_Normal);//?

      this.mvpMatrix.set(this.projectionMatrix).multiply(this.viewMatrix).multiply(this.modelMatrix);
      this.modelViewMatrix.set(this.viewMatrix).multiply(this.modelMatrix);
      gl.uniformMatrix4fv(this.material.u_MvpMatrix, false, this.mvpMatrix.elements);
      gl.uniformMatrix4fv(this.material.u_NormalMatrix, false, this.normalMatrix.elements);
      gl.uniformMatrix4fv(this.material.u_ModelViewMatrix, false, this.modelViewMatrix.elements);
      //gl.uniformMatrix4fv(this.material.u_ProjectionMatrix, false, this.projectionMatrix.elements);

      gl.drawArrays(this.drawType, offset, n);

      return 1;
   }

   gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
   gl.vertexAttribPointer(this.a_Position, 3, gl.FLOAT, false, 0, 0);

   if(this.material.isLit && light === undefined) {
    console.log("no light set!");
    return 0;
   }

   if(this.material.isLit) {
    var lightColor = light.getColor();
    var lightDirection = light.getDirection();
  
    gl.uniform3fv(this.u_LightColor, lightColor.elements);
    gl.uniform3fv(this.u_LightDirection, lightDirection.elements);
    gl.uniformMatrix4fv(this.u_NormalMatrix, false, this.normalMatrix.elements);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);//
    gl.vertexAttribPointer(this.a_Normal, 3, gl.FLOAT, false, 0, 0);//?
    gl.enableVertexAttribArray(this.a_Normal);//?

   }

   if(this.material.getType() == LIME.perPixelColorMaterial) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.colorArray, gl.STATIC_DRAW);//
      gl.vertexAttribPointer(this.a_Color, 4, gl.FLOAT, false, 0, 0);//
      gl.enableVertexAttribArray(this.a_Color);//?
   }
  
   else if(this.material.getType() == LIME.flatTextureMaterial) {

      if(this.texCoord == undefined) {
         console.log("no texture coordinate set.");
         return -1;
      }
      gl.activeTexture(gl.TEXTURE0 + this.material.getTextureIndex());
      gl.bindTexture(gl.TEXTURE_2D, this.material.getTexture());// both
      gl.uniform1i(this.material.getSampler(), this.material.texture_index);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.material.getImage());//

      gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordbuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.texCoord, gl.STATIC_DRAW);//
      gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, 0, 0);//?
      gl.enableVertexAttribArray(this.a_TexCoord);//?
   }
   this.mvpMatrix.set(this.projectionMatrix).multiply(this.viewMatrix).multiply(this.modelMatrix);
   gl.uniformMatrix4fv(this.u_MvpMatrix, false, this.mvpMatrix.elements);
   gl.drawArrays(this.drawType, offset, n);
};

LIME.Shape.prototype.updateNormalsMatrix = function() {
  this.normalMatrix.setInverseOf(this.modelMatrix);
  this.normalMatrix.transpose();
}

LIME.Shape.prototype.setRotation = function(angle, x, y, z){
   this.modelMatrix.setRotate(angle, x, y, z);
   this.updateNormalsMatrix();
};

LIME.Shape.prototype.rotate = function(angle, x, y, z){
   this.modelMatrix.rotate(angle, x, y, z);
   this.updateNormalsMatrix();
};

LIME.Shape.prototype.setPosition = function(x, y, z){
   this.modelMatrix.setTranslate(x, y, z);
   this.updateNormalsMatrix();
   this.x = x;
   this.y = y;
   this.z = z;
};

LIME.Shape.prototype.translate = function(x, y, z){
   this.modelMatrix.translate(x, y, z);
   this.updateNormalsMatrix();
   this.x += x;
   this.y += y;
   this.z += z;
};

LIME.Shape.prototype.setScale = function(x, y, z){
   this.modelMatrix.setScale(x, y, z);
   this.updateNormalsMatrix();
};

LIME.Shape.prototype.scale = function(x, y, z){
   this.modelMatrix.scale(x, y, z);
   this.updateNormalsMatrix();
};

LIME.Shape.prototype.getLocation = function() {
   return [this.x, this.y, this.z];
};

LIME.Shape.prototype.getHitbox = function() {
   return this.hitbox;
};

LIME.Shape.prototype.setTexCoord = function(arr) {
   this.texCoord = new Float32Array(arr);
};


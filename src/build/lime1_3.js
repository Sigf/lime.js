// @author Sebastien Hutt

var LIME = { REVISION: '03' };

// draw type constants
LIME.drawPoints = 0;
LIME.drawLines = 1;
LIME.drawLineStrip = 2;
LIME.drawLineLoop = 3;
LIME.drawTriangles = 4;
LIME.drawTriangleStrip = 5;
LIME.drawTriangleFan = 6;

// geometry type constants
LIME.faltMaterial = 0;
LIME.perPixelColorMaterial = 1;
LIME.flatTextureMaterial = 2;
LIME.currentTextureUnit = 0;

// light types
LIME.ambiant = 0;
LIME.directional = 1;
LIME.point = 2;LIME.Geometry = function(scene) {
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
LIME.FlatMaterial = function(gl, r, g, b, a, lighting) {

  this.context = gl;
  this.program;
  this.red = r;
  this.green = g;
  this.blue = b;
  this.alpha = a;
  this.type = LIME.flatShader;
  this.isLit = lighting;
  
  if(this.isLit) {
    var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_MvpMatrix;\n' +
    'uniform mat4 u_NormalMatrix;\n' +
    'attribute vec4 a_Normal;\n' +
    'uniform vec3 u_LightColor;\n' +
    'uniform vec3 u_LightDirection;\n' +

    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  vec4 a_Color = vec4(' + (r).toFixed(1) + ', ' + (g).toFixed(1) + ', ' + (b).toFixed(1) + ', ' + (a).toFixed(1) + ');\n' +
    '  vec3 ambient = vec3(0.2, 0.2, 0.2) * a_Color.rgb;\n' +
    '  gl_Position = u_MvpMatrix * a_Position;\n' +
    '  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
    '  float nDotL = max(dot(u_LightDirection, normal), 0.0);\n' +
    '  vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;\n' +
    '  v_Color = vec4(diffuse + ambient, a_Color.a);\n' +
    '}\n' ;

    var FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif GL_ES\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' + 
    '  gl_FragColor = v_Color;\n' +
    '}\n';
  }
  else {
    var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_MvpMatrix;\n' +
    'void main() {\n' +
    '  gl_Position = u_MvpMatrix * a_Position;\n' +
    '  gl_PointSize = 5.0;\n' +
    '}\n' ;

    var FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif GL_ES\n' +
    'void main() {\n' + 
    '  gl_FragColor = vec4(' + (r).toFixed(1) + ', ' + (g).toFixed(1) + ', ' + (b).toFixed(1) + ', ' + (a).toFixed(1) + ');\n' +
    '}\n';
    }
  var program = createProgram(this.context, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log('Failed to create program');
    return false; 
  }
  this.program = program;
};

LIME.FlatMaterial.prototype.getProgram = function() {
  return this.program;
};

LIME.FlatMaterial.prototype.getType = function() {
  return this.type;
};
LIME.FlatTextureMaterial = function(gl, tex, index){

  this.context = gl;
  this.program;
  this.texture_path = tex;
  this.texture;
  this.u_sampler;
  this.image;
  this.ready = false;
  this.type = LIME.flatTextureMaterial;
  this.texture_index = index;

  var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

  var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '}\n';

  var program = createProgram(this.context, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log('Failed to create program');
    return false; 
  }
  this.program = program;

  this.initTexture();
};

LIME.FlatTextureMaterial.prototype.initTexture = function() {
  var gl = this.context;
  this.texture = gl.createTexture();
  if(!this.texture) {
    console.log("failed to create texture.");
    return false;
  }

  this.u_sampler = gl.getUniformLocation(this.program, 'u_Sampler');
  if(!this.u_sampler) {
    console.log("failed to create storage location for u_sampler");
    return false;
  }

  this.image = new Image();
  if(!this.image) {  
    console.log("failed to create image object.");
    return false;
  }
  this.image.crossOrigin = "anonymous";
  this.image.src = this.texture_path;

  var index = this.texture_index;
  var self = this;

  loadTexture = function(this_index) {
    self.ready = true;
    self.texture_index = this_index;
  }

  this.image.onload = function(){loadTexture(index); };
  return true;
};

LIME.FlatTextureMaterial.prototype.getProgram = function() {
  return this.program;
};

LIME.FlatTextureMaterial.prototype.getType = function() {
  return this.type;
};

LIME.FlatTextureMaterial.prototype.isReady = function() {
  return this.ready;
};

LIME.FlatTextureMaterial.prototype.getTextureIndex = function() {
  return this.texture_index;
};

LIME.FlatTextureMaterial.prototype.getTexture = function() {
  return this.texture;
};

LIME.FlatTextureMaterial.prototype.getSampler = function() {
  return this.u_sampler;
};

LIME.FlatTextureMaterial.prototype.getImage = function() {
  return this.image;
};
LIME.PerPixelColorMaterial = function(geometry, gl, lighting) {

  this.context = gl;
  this.program;
  this.vertexColor = [];
  this.n = geometry.getArraySize() / 3;
  this.type = LIME.perPixelColorMaterial;
  this.colorBuffer;
  this.isLit = lighting;

  if(this.isLit) {
    var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_MvpMatrix;\n' +
    'uniform mat4 u_NormalMatrix;\n' +
    'attribute vec4 a_Color;\n' +

    'attribute vec4 a_Normal;\n' +
    'uniform vec3 u_LightColor;\n' +
    'uniform vec3 u_LightDirection;\n' +

    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_Position = u_MvpMatrix * a_Position;\n' +
    '  vec3 ambient = vec3(0.4, 0.4, 0.4) * a_Color.rgb;\n' +
    '  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
    '  float nDotL = max(dot(u_LightDirection, normal), 0.0);\n' +
    '  vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;\n' +
    '  v_Color = vec4(diffuse + ambient, a_Color.a);\n' +
    '}\n' ;

    var FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif GL_ES\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' + 
    '  gl_FragColor = v_Color;\n' +
    '}\n';
  }
  else {
    var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_MvpMatrix;\n' +
    'attribute vec4 a_Color;\n' + 
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_Position = u_MvpMatrix * a_Position;\n' +
    '  v_Color = a_Color;\n' +
    '  gl_PointSize = 5.0;\n' +
    '}\n' ;

    var FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif GL_ES\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' + 
    '  gl_FragColor = v_Color;\n' +
    '}\n';
  }

  var program = createProgram(this.context, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log('Failed to create program');
    return false;
  }
  this.program = program;
};

LIME.PerPixelColorMaterial.prototype.getColorArray = function(n) {
  return new Float32Array(this.vertexColor);
};

LIME.PerPixelColorMaterial.prototype.setColorArray = function(arr) {
  if(arr.length/4 != this.n) { 
    console.log("Vertices and vertices color array mis-match!");
  }

  else {
    this.vertexColor = arr.splice(0,arr.length);
    this.colorBuffer = this.context.createBuffer();
  }
};

LIME.PerPixelColorMaterial.prototype.getProgram = function() {
  return this.program;
};

LIME.PerPixelColorMaterial.prototype.getColorBuffer = function() {
  return this.colorBuffer;
};

LIME.PerPixelColorMaterial.prototype.getType = function() {
  return this.type;
};
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

   if(this.material.isLit) {
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
   gl.enableVertexAttribArray(this.a_Position);

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

   gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
   gl.vertexAttribPointer(this.a_Position, 3, gl.FLOAT, false, 0, 0);

   if(this.material.isLit && light === undefined) {
    console.log("no light set!");
    return 0;
   }

   if(this.material.isLit) {
    var lightColor = light.getColor();
    var lightDirection = light.getDirection();
  
  gl.uniform3f(this.u_LightColor, lightColor[0], lightColor[1], lightColor[2]);
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
LIME.Scene = function (canvasName) {
  this.canvas = document.getElementById(canvasName);
  this.context = getWebGLContext(this.canvas);
  this.scene_objects = [];
  this.scene_lights = [];
  this.mouse_x = 0.0;
  this.mouse_y = 0.0;

  this.context.clearColor(0.0, 0.0, 0.0, 1.0);
  this.context.enable(this.context.DEPTH_TEST);

  var self = this;

  this.canvas.onmousemove = function(ev ) {
    self.mouse_x = ev.clientX;
    self.mouse_y = ev.clientY;

    var rect = ev.target.getBoundingClientRect() ;

    self.mouse_x = ((self.mouse_x - rect.left) - self.canvas.width/2)/(self.canvas.width/2);
    self.mouse_y = (self.canvas.height/2 - (self.mouse_y - rect.top))/(self.canvas.height/2);
  }
};  

LIME.Scene.prototype.clearCanvas = function() {
  this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
};

LIME.Scene.prototype.setClearColor = function(r, g, b, a) {
  this.context.clearColor(r, g, b, a);
};

LIME.Scene.prototype.addObjectToScene = function(an_object) {
  this.scene_objects.push(an_object);
};

LIME.Scene.prototype.addLightToScene = function(a_light) {
  this.scene_lights.push(a_light);
};

LIME.Scene.prototype.draw = function() {

  for(var j = 0; j < this.scene_objects.length; j++) {
      this.scene_objects[j].draw(this.scene_lights[0]);
    }


  /*
  if(this.scene_lights.length == 0) {
    for(var j = 0; j < this.scene_objects.length; j++) {
      this.scene_objects[j].draw();
    }
  }

  else {
    for(var i = 0; i < this.scene_objects.length; i++) {
      for(var j = 0; j < this.scene_lights.length; j++) {
        this.scene_objects[i].draw(this.scene_lights[j]);
      }
    }
  }
  */
};

LIME.Scene.prototype.getMouseCoordinate = function() {
 return [this.mouse_x, this.mouse_y];
};

LIME.Scene.prototype.getAspectRatio = function() {
  return [this.canvas.width/this.canvas.height];
};

LIME.Scene.prototype.getContext = function() {
  return this.context;
};

LIME.Scene.prototype.getCanvas = function() {
  return this.canvas;
};
LIME.Camera = function(context) {
  this.gl = context;

  this.position = [0.0, 0.0, 0.0];
  this.lookAt = [0.0, 0.0, 0.0];
  this.up = [0.0, 1.0, 0.0];
  this.angle = 0;

  this.phi = 0;
  this.theta = 0;

  this.viewMatrix = new Matrix4();
  this.projectionMatrix = new Matrix4();
  this.viewMatrix.setLookAt(
    this.position[0],
    this.position[1],
    this.position[2],
    this.lookAt[0],
    this.lookAt[1],
    this.lookAt[2],
    this.up[0],
    this.up[1],
    this.up[2]
  );
};

LIME.Camera.prototype.refresh = function() {
  this.viewMatrix.setLookAt(
    this.position[0],
    this.position[1],
    this.position[2],
    this.lookAt[0],
    this.lookAt[1],
    this.lookAt[2],
    this.up[0],
    this.up[1],
    this.up[2]
  );
};

LIME.Camera.prototype.lookAt = function(x,y,z) {

  if(x === undefined) x = 0.0;
  if(y === undefined) y = 0.0;
  if(z === undefined) z = 0.0;

  this.lookAt = [x, y, z];
  this.refresh();
};

LIME.Camera.prototype.move = function(x,y,z) {

  if(x === undefined) x = 0.0;
  if(y === undefined) y = 0.0;
  if(z === undefined) z = 0.0;

  this.position = [x, y, z];
  this.refresh();
};

LIME.Camera.prototype.setUp = function(x,y,z) {

  if(x === undefined) x = 0.0;
  if(y === undefined) y = 0.0;
  if(z === undefined) z = 0.0;

  this.up = [x, y, z];
  this.refresh();
};

LIME.Camera.prototype.rotate_x = function(angle) {
  angle = ((Math.PI * 2) / 360) * angle;
  this.angle = angle;

  var x = this.position[0] + (Math.sin(angle) * 3.0);
  var y = this.position[1];
  var z = this.position[2] + (Math.cos(angle) * 3.0);
  this.lookAt = [x, y, z];

  this.refresh();
};

LIME.Camera.prototype.look_at_mouse = function(mouse_pos, speed) {

  var lon = 0;
  var lat = 0;
  var phi = 0;
  var tetha = 0;

  lon = mouse_pos[0] * speed;
  lat = mouse_pos[1] * speed;

  lat = Math.max( - 85, Math.min( 85, lat ) );
  phi = ( 90 - lat ) * Math.PI / 180;
  theta = ( 270 + lon ) * Math.PI / 180;

  this.phi = phi;
  this.theta = theta;

  this.lookAt[0] = this.position[0] + 100 * Math.sin( phi ) * Math.cos( theta );
  this.lookAt[1] = this.position[1] + 100 * Math.cos( phi );
  this.lookAt[2] = this.position[2] + 100 * Math.sin( phi ) * Math.sin( theta );

  this.refresh();
};

LIME.Camera.prototype.moveForward = function(step, angle) {
  angle = ((Math.PI * 2) / 360) * angle;
  var x = this.position[0] + (Math.sin(this.angle + angle) * step);
  var y = this.position[1];
  var z = this.position[2] + (Math.cos(this.angle + angle) * step);
  this.position = [x, y, z];
  this.refresh();
};

LIME.Camera.prototype.move_toward_mouse = function(step, angle) {
  angle = ((Math.PI * 2) / 360) * angle;
  var x = this.position[0] + (Math.sin(-this.theta + angle) * step);
  var y = this.position[1];
  var z = this.position[2] + (Math.cos(-this.theta + angle) * step);
  this.position = [x, y, z];
  this.refresh();
};

LIME.Camera.prototype.setPerspective = function(fov, aspect, near, far) {
  this.projectionMatrix.setPerspective(fov, aspect, near, far);
};

LIME.Camera.prototype.getViewMatrix = function() {
  return this.viewMatrix;
};

LIME.Camera.prototype.getProjectionMatrix = function() {
  return this.projectionMatrix;
};

LIME.Camera.prototype.getLookAt = function() {
  return this.lookAt;
};

LIME.Camera.prototype.getPosition = function() {
  return this.position;
};
LIME.Light = function(type) {
  this.direction = [];
  this.light_color;
  this.position;
  this.type = type;
};

LIME.Light.prototype.setDirection = function(x, y, z) {
  if(this.type != LIME.directional) {
    console.log("setDircetion can only used for a directional light!");
    return 0;
  }

  this.direction = [];
  this.direction.push(x);
  this.direction.push(y);
  this.direction.push(z);
};

LIME.Light.prototype.setColor = function(r, g, b) {
  this.light_color = [];
  this.light_color.push(r);
  this.light_color.push(g);
  this.light_color.push(b);
};

LIME.Light.prototype.getDirection = function(){
  if(this.type != LIME.directional) {
    console.log("getDircetion can only used for a directional light!");
    return 0;
  }

  var direction = new Vector3(this.direction);
  direction.normalize();

  return direction;
};

LIME.Light.prototype.getColor = function(){
  return this.light_color;
};
//------------------------------------------------------------------------------
// OBJParser
// (c) 2012 matsuda and itami
//------------------------------------------------------------------------------

// OBJDoc object
// Constructor
var OBJDoc = function(fileName) {
  this.fileName = fileName;
  this.mtls = new Array(0);      // Initialize the property for MTL
  this.objects = new Array(0);   // Initialize the property for Object
  this.vertices = new Array(0);  // Initialize the property for Vertex
  this.normals = new Array(0);   // Initialize the property for Normal
}

// Parsing the OBJ file
OBJDoc.prototype.parse = function(fileString, scale, reverse) {
  var lines = fileString.split('\n');  // Break up into lines and store them as array
  lines.push(null); // Append null
  var index = 0;    // Initialize index of line

  var currentObject = null;
  var currentMaterialName = "";
  
  // Parse line by line
  var line;         // A string in the line to be parsed
  var sp = new StringParser();  // Create StringParser
  while ((line = lines[index++]) != null) {
    sp.init(line);                  // init StringParser
	var command = sp.getWord();     // Get command
	if(command == null)	 continue;  // check null command

    switch(command){
    case '#':
      continue;  // Skip comments
    case 'mtllib':     // Read Material chunk
      var path = this.parseMtllib(sp, this.fileName);
      var mtl = new MTLDoc();   // Create MTL instance
      this.mtls.push(mtl);
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          if (request.status != 404) {
            onReadMTLFile(request.responseText, mtl);
          }else{
            mtl.complete = true;
          }
        }
      }
      request.open('GET', path, true);  // Create a request to acquire the file
      request.send();                   // Send the request
      continue; // Go to the next line
    case 'o':
    case 'g':   // Read Object name
      var object = this.parseObjectName(sp);
      this.objects.push(object);
      currentObject = object;
      continue; // Go to the next line
    case 'v':   // Read vertex
      var vertex = this.parseVertex(sp, scale);
      this.vertices.push(vertex); 
      continue; // Go to the next line
    case 'vn':   // Read normal
      var normal = this.parseNormal(sp);
      this.normals.push(normal); 
      continue; // Go to the next line
    case 'usemtl': // Read Material name
      currentMaterialName = this.parseUsemtl(sp);
      continue; // Go to the next line
    case 'f': // Read face
      var face = this.parseFace(sp, currentMaterialName, this.vertices, reverse);
      currentObject.addFace(face);
      continue; // Go to the next line
    }
  }

  return true;
}

OBJDoc.prototype.parseMtllib = function(sp, fileName) {
  // Get directory path
  var i = fileName.lastIndexOf("/");
  var dirPath = "";
  if(i > 0) dirPath = fileName.substr(0, i+1);

  return dirPath + sp.getWord();   // Get path
}

OBJDoc.prototype.parseObjectName = function(sp) {
  var name = sp.getWord();
  return (new OBJObject(name));
}

OBJDoc.prototype.parseVertex = function(sp, scale) {
  var x = sp.getFloat() * scale;
  var y = sp.getFloat() * scale;
  var z = sp.getFloat() * scale;
  return (new Vertex(x, y, z));
}

OBJDoc.prototype.parseNormal = function(sp) {
  var x = sp.getFloat();
  var y = sp.getFloat();
  var z = sp.getFloat();
  return (new Normal(x, y, z));
}

OBJDoc.prototype.parseUsemtl = function(sp) {
  return sp.getWord();
}

OBJDoc.prototype.parseFace = function(sp, materialName, vertices, reverse) {  
  var face = new Face(materialName);
  // get indices
  for(;;){
    var word = sp.getWord();
    if(word == null) break;
    var subWords = word.split('/');
    if(subWords.length >= 1){
      var vi = parseInt(subWords[0]) - 1;
      face.vIndices.push(vi);
    }
    if(subWords.length >= 3){
      var ni = parseInt(subWords[2]) - 1;
      face.nIndices.push(ni);
    }else{
      face.nIndices.push(-1);
    }
  }

  // calc normal
  var v0 = [
    vertices[face.vIndices[0]].x,
    vertices[face.vIndices[0]].y,
    vertices[face.vIndices[0]].z];
  var v1 = [
    vertices[face.vIndices[1]].x,
    vertices[face.vIndices[1]].y,
    vertices[face.vIndices[1]].z];
  var v2 = [
    vertices[face.vIndices[2]].x,
    vertices[face.vIndices[2]].y,
    vertices[face.vIndices[2]].z];

  // é¢ã®æ³•ç·šã‚’è¨ˆç®—ã—ã¦normalã«è¨­å®š
  var normal = calcNormal(v0, v1, v2);
  // æ³•ç·šãŒæ­£ã—ãæ±‚ã‚ã‚‰ã‚ŒãŸã‹èª¿ã¹ã‚‹
  if (normal == null) {
    if (face.vIndices.length >= 4) { // é¢ãŒå››è§’å½¢ãªã‚‰åˆ¥ã®3ç‚¹ã®çµ„ã¿åˆã‚ã›ã§æ³•ç·šè¨ˆç®—
      var v3 = [
        vertices[face.vIndices[3]].x,
        vertices[face.vIndices[3]].y,
        vertices[face.vIndices[3]].z];
      normal = calcNormal(v1, v2, v3);
    }
    if(normal == null){         // æ³•ç·šãŒæ±‚ã‚ã‚‰ã‚Œãªã‹ã£ãŸã®ã§Yè»¸æ–¹å‘ã®æ³•ç·šã¨ã™ã‚‹
      normal = [0.0, 1.0, 0.0];
    }
  }
  if(reverse){
    normal[0] = -normal[0];
    normal[1] = -normal[1];
    normal[2] = -normal[2];
  }
  face.normal = new Normal(normal[0], normal[1], normal[2]);

  // Devide to triangles if face contains over 3 points.
  if(face.vIndices.length > 3){
    var n = face.vIndices.length - 2;
    var newVIndices = new Array(n * 3);
    var newNIndices = new Array(n * 3);
    for(var i=0; i<n; i++){
      newVIndices[i * 3 + 0] = face.vIndices[0];
      newVIndices[i * 3 + 1] = face.vIndices[i + 1];
      newVIndices[i * 3 + 2] = face.vIndices[i + 2];
      newNIndices[i * 3 + 0] = face.nIndices[0];
      newNIndices[i * 3 + 1] = face.nIndices[i + 1];
      newNIndices[i * 3 + 2] = face.nIndices[i + 2];
    }
    face.vIndices = newVIndices;
    face.nIndices = newNIndices;
  }
  face.numIndices = face.vIndices.length;

  return face;
}

// Analyze the material file
function onReadMTLFile(fileString, mtl) {
  var lines = fileString.split('\n');  // Break up into lines and store them as array
  lines.push(null);           // Append null
  var index = 0;              // Initialize index of line

  // Parse line by line
  var line;      // A string in the line to be parsed
  var name = ""; // Material name
  var sp = new StringParser();  // Create StringParser
  while ((line = lines[index++]) != null) {
    sp.init(line);                  // init StringParser
    var command = sp.getWord();     // Get command
    if(command == null)	 continue;  // check null command

    switch(command){
    case '#':
      continue;    // Skip comments
    case 'newmtl': // Read Material chunk
      name = mtl.parseNewmtl(sp);    // Get name
      continue; // Go to the next line
    case 'Kd':   // Read normal
      if(name == "") continue; // Go to the next line because of Error
      var material = mtl.parseRGB(sp, name);
      mtl.materials.push(material);
      name = "";
      continue; // Go to the next line
    }
  }
  mtl.complete = true;
}

// Check Materials
OBJDoc.prototype.isMTLComplete = function() {
  if(this.mtls.length == 0) return true;
  for(var i = 0; i < this.mtls.length; i++){
    if(!this.mtls[i].complete) return false;
  }
  return true;
}

// Find color by material name
OBJDoc.prototype.findColor = function(name){
  for(var i = 0; i < this.mtls.length; i++){
    for(var j = 0; j < this.mtls[i].materials.length; j++){
      if(this.mtls[i].materials[j].name == name){
        return(this.mtls[i].materials[j].color)
      }
    }
  }
  return(new Color(0.8, 0.8, 0.8, 1));
}

//------------------------------------------------------------------------------
// Retrieve the information for drawing 3D model
OBJDoc.prototype.getDrawingInfo = function() {
  // Create an arrays for vertex coordinates, normals, colors, and indices
  var numIndices = 0;
  for(var i = 0; i < this.objects.length; i++){
    numIndices += this.objects[i].numIndices;
  }
  var numVertices = numIndices;
  var vertices = new Float32Array(numVertices * 3);
  var normals = new Float32Array(numVertices * 3);
  var colors = new Float32Array(numVertices * 4);
  var indices = new Uint16Array(numIndices);

  // Set vertex, normal and color
  var index_indices = 0;
  for(var i = 0; i < this.objects.length; i++){
    var object = this.objects[i];
    for(var j = 0; j < object.faces.length; j++){
      var face = object.faces[j];
      var color = this.findColor(face.materialName);
      var faceNormal = face.normal;
      for(var k = 0; k < face.vIndices.length; k++){
        // Set index
        indices[index_indices] = index_indices;
        // Copy vertex
        var vIdx = face.vIndices[k];
        var vertex = this.vertices[vIdx];
        vertices[index_indices * 3 + 0] = vertex.x;
        vertices[index_indices * 3 + 1] = vertex.y;
        vertices[index_indices * 3 + 2] = vertex.z;
        // Copy color
        colors[index_indices * 4 + 0] = color.r;
        colors[index_indices * 4 + 1] = color.g;
        colors[index_indices * 4 + 2] = color.b;
        colors[index_indices * 4 + 3] = color.a;
        // Copy normal
        var nIdx = face.nIndices[k];
        if(nIdx >= 0){
          var normal = this.normals[nIdx];
          normals[index_indices * 3 + 0] = normal.x;
          normals[index_indices * 3 + 1] = normal.y;
          normals[index_indices * 3 + 2] = normal.z;
        }else{
          normals[index_indices * 3 + 0] = faceNormal.x;
          normals[index_indices * 3 + 1] = faceNormal.y;
          normals[index_indices * 3 + 2] = faceNormal.z;
        }
        index_indices ++;
      }
    }
  }

  return new DrawingInfo(vertices, normals, colors, indices);
}

//------------------------------------------------------------------------------
// MTLDoc Object
//------------------------------------------------------------------------------
var MTLDoc = function() {
  this.complete = false; // MTL is configured correctly
  this.materials = new Array(0);
}

MTLDoc.prototype.parseNewmtl = function(sp) {
  return sp.getWord();         // Get name
}

MTLDoc.prototype.parseRGB = function(sp, name) {
  var r = sp.getFloat();
  var g = sp.getFloat();
  var b = sp.getFloat();
  return (new Material(name, r, g, b, 1));
}

//------------------------------------------------------------------------------
// Material Object
//------------------------------------------------------------------------------
var Material = function(name, r, g, b, a) {
  this.name = name;
  this.color = new Color(r, g, b, a);
}

//------------------------------------------------------------------------------
// Vertex Object
//------------------------------------------------------------------------------
var Vertex = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

//------------------------------------------------------------------------------
// Normal Object
//------------------------------------------------------------------------------
var Normal = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

//------------------------------------------------------------------------------
// Color Object
//------------------------------------------------------------------------------
var Color = function(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}

//------------------------------------------------------------------------------
// OBJObject Object
//------------------------------------------------------------------------------
var OBJObject = function(name) {
  this.name = name;
  this.faces = new Array(0);
  this.numIndices = 0;
}

OBJObject.prototype.addFace = function(face) {
  this.faces.push(face);
  this.numIndices += face.numIndices;
}

//------------------------------------------------------------------------------
// Face Object
//------------------------------------------------------------------------------
var Face = function(materialName) {
  this.materialName = materialName;
  if(materialName == null)  this.materialName = "";
  this.vIndices = new Array(0);
  this.nIndices = new Array(0);
}

//------------------------------------------------------------------------------
// DrawInfo Object
//------------------------------------------------------------------------------
var DrawingInfo = function(vertices, normals, colors, indices) {
  this.vertices = vertices;
  this.normals = normals;
  this.colors = colors;
  this.indices = indices;
}

//------------------------------------------------------------------------------
// Constructor
var StringParser = function(str) {
  this.str;   // Store the string specified by the argument
  this.index; // Position in the string to be processed
  this.init(str);
}
// Initialize StringParser object
StringParser.prototype.init = function(str){
  this.str = str;
  this.index = 0;
}

// Skip delimiters
StringParser.prototype.skipDelimiters = function()  {
  for(var i = this.index, len = this.str.length; i < len; i++){
    var c = this.str.charAt(i);
    // Skip TAB, Space, '(', ')
    if (c == '\t'|| c == ' ' || c == '(' || c == ')' || c == '"') continue;
    break;
  }
  this.index = i;
}

// Skip to the next word
StringParser.prototype.skipToNextWord = function() {
  this.skipDelimiters();
  var n = getWordLength(this.str, this.index);
  this.index += (n + 1);
}

// Get word
StringParser.prototype.getWord = function() {
  this.skipDelimiters();
  var n = getWordLength(this.str, this.index);
  if (n == 0) return null;
  var word = this.str.substr(this.index, n);
  this.index += (n + 1);

  return word;
}

// Get integer
StringParser.prototype.getInt = function() {
  return parseInt(this.getWord());
}

// Get floating number
StringParser.prototype.getFloat = function() {
  return parseFloat(this.getWord());
}

// Get the length of word
function getWordLength(str, start) {
  var n = 0;
  for(var i = start, len = str.length; i < len; i++){
    var c = str.charAt(i);
    if (c == '\t'|| c == ' ' || c == '(' || c == ')' || c == '"') 
	break;
  }
  return i - start;
}

//------------------------------------------------------------------------------
// Common function
//------------------------------------------------------------------------------
function calcNormal(p0, p1, p2) {
  // v0: a vector from p1 to p0, v1; a vector from p1 to p2
  var v0 = new Float32Array(3);
  var v1 = new Float32Array(3);
  for (var i = 0; i < 3; i++){
    v0[i] = p0[i] - p1[i];
    v1[i] = p2[i] - p1[i];
  }

  // The cross product of v0 and v1
  var c = new Float32Array(3);
  c[0] = v0[1] * v1[2] - v0[2] * v1[1];
  c[1] = v0[2] * v1[0] - v0[0] * v1[2];
  c[2] = v0[0] * v1[1] - v0[1] * v1[0];

  // Normalize the result
  var v = new Vector3(c);
  v.normalize();
  return v.elements;
}// cuon-matrix.js (c) 2012 kanda and matsuda
/** 
 * This is a class treating 4x4 matrix.
 * This class contains the function that is equivalent to OpenGL matrix stack.
 * The matrix after conversion is calculated by multiplying a conversion matrix from the right.
 * The matrix is replaced by the calculated result.
 */

/**
 * Constructor of Matrix4
 * If opt_src is specified, new matrix is initialized by opt_src.
 * Otherwise, new matrix is initialized by identity matrix.
 * @param opt_src source matrix(option)
 */
var Matrix4 = function(opt_src) {
  var i, s, d;
  if (opt_src && typeof opt_src === 'object' && opt_src.hasOwnProperty('elements')) {
    s = opt_src.elements;
    d = new Float32Array(16);
    for (i = 0; i < 16; ++i) {
      d[i] = s[i];
    }
    this.elements = d;
  } else {
    this.elements = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
  }
};

/**
 * Set the identity matrix.
 * @return this
 */
Matrix4.prototype.setIdentity = function() {
  var e = this.elements;
  e[0] = 1;   e[4] = 0;   e[8]  = 0;   e[12] = 0;
  e[1] = 0;   e[5] = 1;   e[9]  = 0;   e[13] = 0;
  e[2] = 0;   e[6] = 0;   e[10] = 1;   e[14] = 0;
  e[3] = 0;   e[7] = 0;   e[11] = 0;   e[15] = 1;
  return this;
};

/**
 * Copy matrix.
 * @param src source matrix
 * @return this
 */
Matrix4.prototype.set = function(src) {
  var i, s, d;

  s = src.elements;
  d = this.elements;

  if (s === d) {
    return;
  }
    
  for (i = 0; i < 16; ++i) {
    d[i] = s[i];
  }

  return this;
};

/**
 * Multiply the matrix from the right.
 * @param other The multiply matrix
 * @return this
 */
Matrix4.prototype.concat = function(other) {
  var i, e, a, b, ai0, ai1, ai2, ai3;
  
  // Calculate e = a * b
  e = this.elements;
  a = this.elements;
  b = other.elements;
  
  // If e equals b, copy b to temporary matrix.
  if (e === b) {
    b = new Float32Array(16);
    for (i = 0; i < 16; ++i) {
      b[i] = e[i];
    }
  }
  
  for (i = 0; i < 4; i++) {
    ai0=a[i];  ai1=a[i+4];  ai2=a[i+8];  ai3=a[i+12];
    e[i]    = ai0 * b[0]  + ai1 * b[1]  + ai2 * b[2]  + ai3 * b[3];
    e[i+4]  = ai0 * b[4]  + ai1 * b[5]  + ai2 * b[6]  + ai3 * b[7];
    e[i+8]  = ai0 * b[8]  + ai1 * b[9]  + ai2 * b[10] + ai3 * b[11];
    e[i+12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
  }
  
  return this;
};
Matrix4.prototype.multiply = Matrix4.prototype.concat;

/**
 * Multiply the three-dimensional vector.
 * @param pos  The multiply vector
 * @return The result of multiplication(Float32Array)
 */
Matrix4.prototype.multiplyVector3 = function(pos) {
  var e = this.elements;
  var p = pos.elements;
  var v = new Vector3();
  var result = v.elements;

  result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[ 8] + e[11];
  result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[ 9] + e[12];
  result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + e[13];

  return v;
};

/**
 * Multiply the four-dimensional vector.
 * @param pos  The multiply vector
 * @return The result of multiplication(Float32Array)
 */
Matrix4.prototype.multiplyVector4 = function(pos) {
  var e = this.elements;
  var p = pos.elements;
  var v = new Vector4();
  var result = v.elements;

  result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[ 8] + p[3] * e[12];
  result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[ 9] + p[3] * e[13];
  result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + p[3] * e[14];
  result[3] = p[0] * e[3] + p[1] * e[7] + p[2] * e[11] + p[3] * e[15];

  return v;
};

/**
 * Transpose the matrix.
 * @return this
 */
Matrix4.prototype.transpose = function() {
  var e, t;

  e = this.elements;

  t = e[ 1];  e[ 1] = e[ 4];  e[ 4] = t;
  t = e[ 2];  e[ 2] = e[ 8];  e[ 8] = t;
  t = e[ 3];  e[ 3] = e[12];  e[12] = t;
  t = e[ 6];  e[ 6] = e[ 9];  e[ 9] = t;
  t = e[ 7];  e[ 7] = e[13];  e[13] = t;
  t = e[11];  e[11] = e[14];  e[14] = t;

  return this;
};

/**
 * Calculate the inverse matrix of specified matrix, and set to this.
 * @param other The source matrix
 * @return this
 */
Matrix4.prototype.setInverseOf = function(other) {
  var i, s, d, inv, det;

  s = other.elements;
  d = this.elements;
  inv = new Float32Array(16);

  inv[0]  =   s[5]*s[10]*s[15] - s[5] *s[11]*s[14] - s[9] *s[6]*s[15]
            + s[9]*s[7] *s[14] + s[13]*s[6] *s[11] - s[13]*s[7]*s[10];
  inv[4]  = - s[4]*s[10]*s[15] + s[4] *s[11]*s[14] + s[8] *s[6]*s[15]
            - s[8]*s[7] *s[14] - s[12]*s[6] *s[11] + s[12]*s[7]*s[10];
  inv[8]  =   s[4]*s[9] *s[15] - s[4] *s[11]*s[13] - s[8] *s[5]*s[15]
            + s[8]*s[7] *s[13] + s[12]*s[5] *s[11] - s[12]*s[7]*s[9];
  inv[12] = - s[4]*s[9] *s[14] + s[4] *s[10]*s[13] + s[8] *s[5]*s[14]
            - s[8]*s[6] *s[13] - s[12]*s[5] *s[10] + s[12]*s[6]*s[9];

  inv[1]  = - s[1]*s[10]*s[15] + s[1] *s[11]*s[14] + s[9] *s[2]*s[15]
            - s[9]*s[3] *s[14] - s[13]*s[2] *s[11] + s[13]*s[3]*s[10];
  inv[5]  =   s[0]*s[10]*s[15] - s[0] *s[11]*s[14] - s[8] *s[2]*s[15]
            + s[8]*s[3] *s[14] + s[12]*s[2] *s[11] - s[12]*s[3]*s[10];
  inv[9]  = - s[0]*s[9] *s[15] + s[0] *s[11]*s[13] + s[8] *s[1]*s[15]
            - s[8]*s[3] *s[13] - s[12]*s[1] *s[11] + s[12]*s[3]*s[9];
  inv[13] =   s[0]*s[9] *s[14] - s[0] *s[10]*s[13] - s[8] *s[1]*s[14]
            + s[8]*s[2] *s[13] + s[12]*s[1] *s[10] - s[12]*s[2]*s[9];

  inv[2]  =   s[1]*s[6]*s[15] - s[1] *s[7]*s[14] - s[5] *s[2]*s[15]
            + s[5]*s[3]*s[14] + s[13]*s[2]*s[7]  - s[13]*s[3]*s[6];
  inv[6]  = - s[0]*s[6]*s[15] + s[0] *s[7]*s[14] + s[4] *s[2]*s[15]
            - s[4]*s[3]*s[14] - s[12]*s[2]*s[7]  + s[12]*s[3]*s[6];
  inv[10] =   s[0]*s[5]*s[15] - s[0] *s[7]*s[13] - s[4] *s[1]*s[15]
            + s[4]*s[3]*s[13] + s[12]*s[1]*s[7]  - s[12]*s[3]*s[5];
  inv[14] = - s[0]*s[5]*s[14] + s[0] *s[6]*s[13] + s[4] *s[1]*s[14]
            - s[4]*s[2]*s[13] - s[12]*s[1]*s[6]  + s[12]*s[2]*s[5];

  inv[3]  = - s[1]*s[6]*s[11] + s[1]*s[7]*s[10] + s[5]*s[2]*s[11]
            - s[5]*s[3]*s[10] - s[9]*s[2]*s[7]  + s[9]*s[3]*s[6];
  inv[7]  =   s[0]*s[6]*s[11] - s[0]*s[7]*s[10] - s[4]*s[2]*s[11]
            + s[4]*s[3]*s[10] + s[8]*s[2]*s[7]  - s[8]*s[3]*s[6];
  inv[11] = - s[0]*s[5]*s[11] + s[0]*s[7]*s[9]  + s[4]*s[1]*s[11]
            - s[4]*s[3]*s[9]  - s[8]*s[1]*s[7]  + s[8]*s[3]*s[5];
  inv[15] =   s[0]*s[5]*s[10] - s[0]*s[6]*s[9]  - s[4]*s[1]*s[10]
            + s[4]*s[2]*s[9]  + s[8]*s[1]*s[6]  - s[8]*s[2]*s[5];

  det = s[0]*inv[0] + s[1]*inv[4] + s[2]*inv[8] + s[3]*inv[12];
  if (det === 0) {
    return this;
  }

  det = 1 / det;
  for (i = 0; i < 16; i++) {
    d[i] = inv[i] * det;
  }

  return this;
};

/**
 * Calculate the inverse matrix of this, and set to this.
 * @return this
 */
Matrix4.prototype.invert = function() {
  return this.setInverseOf(this);
};

/**
 * Set the orthographic projection matrix.
 * @param left The coordinate of the left of clipping plane.
 * @param right The coordinate of the right of clipping plane.
 * @param bottom The coordinate of the bottom of clipping plane.
 * @param top The coordinate of the top top clipping plane.
 * @param near The distances to the nearer depth clipping plane. This value is minus if the plane is to be behind the viewer.
 * @param far The distances to the farther depth clipping plane. This value is minus if the plane is to be behind the viewer.
 * @return this
 */
Matrix4.prototype.setOrtho = function(left, right, bottom, top, near, far) {
  var e, rw, rh, rd;

  if (left === right || bottom === top || near === far) {
    throw 'null frustum';
  }

  rw = 1 / (right - left);
  rh = 1 / (top - bottom);
  rd = 1 / (far - near);

  e = this.elements;

  e[0]  = 2 * rw;
  e[1]  = 0;
  e[2]  = 0;
  e[3]  = 0;

  e[4]  = 0;
  e[5]  = 2 * rh;
  e[6]  = 0;
  e[7]  = 0;

  e[8]  = 0;
  e[9]  = 0;
  e[10] = -2 * rd;
  e[11] = 0;

  e[12] = -(right + left) * rw;
  e[13] = -(top + bottom) * rh;
  e[14] = -(far + near) * rd;
  e[15] = 1;

  return this;
};

/**
 * Multiply the orthographic projection matrix from the right.
 * @param left The coordinate of the left of clipping plane.
 * @param right The coordinate of the right of clipping plane.
 * @param bottom The coordinate of the bottom of clipping plane.
 * @param top The coordinate of the top top clipping plane.
 * @param near The distances to the nearer depth clipping plane. This value is minus if the plane is to be behind the viewer.
 * @param far The distances to the farther depth clipping plane. This value is minus if the plane is to be behind the viewer.
 * @return this
 */
Matrix4.prototype.ortho = function(left, right, bottom, top, near, far) {
  return this.concat(new Matrix4().setOrtho(left, right, bottom, top, near, far));
};

/**
 * Set the perspective projection matrix.
 * @param left The coordinate of the left of clipping plane.
 * @param right The coordinate of the right of clipping plane.
 * @param bottom The coordinate of the bottom of clipping plane.
 * @param top The coordinate of the top top clipping plane.
 * @param near The distances to the nearer depth clipping plane. This value must be plus value.
 * @param far The distances to the farther depth clipping plane. This value must be plus value.
 * @return this
 */
Matrix4.prototype.setFrustum = function(left, right, bottom, top, near, far) {
  var e, rw, rh, rd;

  if (left === right || top === bottom || near === far) {
    throw 'null frustum';
  }
  if (near <= 0) {
    throw 'near <= 0';
  }
  if (far <= 0) {
    throw 'far <= 0';
  }

  rw = 1 / (right - left);
  rh = 1 / (top - bottom);
  rd = 1 / (far - near);

  e = this.elements;

  e[ 0] = 2 * near * rw;
  e[ 1] = 0;
  e[ 2] = 0;
  e[ 3] = 0;

  e[ 4] = 0;
  e[ 5] = 2 * near * rh;
  e[ 6] = 0;
  e[ 7] = 0;

  e[ 8] = (right + left) * rw;
  e[ 9] = (top + bottom) * rh;
  e[10] = -(far + near) * rd;
  e[11] = -1;

  e[12] = 0;
  e[13] = 0;
  e[14] = -2 * near * far * rd;
  e[15] = 0;

  return this;
};

/**
 * Multiply the perspective projection matrix from the right.
 * @param left The coordinate of the left of clipping plane.
 * @param right The coordinate of the right of clipping plane.
 * @param bottom The coordinate of the bottom of clipping plane.
 * @param top The coordinate of the top top clipping plane.
 * @param near The distances to the nearer depth clipping plane. This value must be plus value.
 * @param far The distances to the farther depth clipping plane. This value must be plus value.
 * @return this
 */
Matrix4.prototype.frustum = function(left, right, bottom, top, near, far) {
  return this.concat(new Matrix4().setFrustum(left, right, bottom, top, near, far));
};

/**
 * Set the perspective projection matrix by fovy and aspect.
 * @param fovy The angle between the upper and lower sides of the frustum.
 * @param aspect The aspect ratio of the frustum. (width/height)
 * @param near The distances to the nearer depth clipping plane. This value must be plus value.
 * @param far The distances to the farther depth clipping plane. This value must be plus value.
 * @return this
 */
Matrix4.prototype.setPerspective = function(fovy, aspect, near, far) {
  var e, rd, s, ct;

  if (near === far || aspect === 0) {
    throw 'null frustum';
  }
  if (near <= 0) {
    throw 'near <= 0';
  }
  if (far <= 0) {
    throw 'far <= 0';
  }

  fovy = Math.PI * fovy / 180 / 2;
  s = Math.sin(fovy);
  if (s === 0) {
    throw 'null frustum';
  }

  rd = 1 / (far - near);
  ct = Math.cos(fovy) / s;

  e = this.elements;

  e[0]  = ct / aspect;
  e[1]  = 0;
  e[2]  = 0;
  e[3]  = 0;

  e[4]  = 0;
  e[5]  = ct;
  e[6]  = 0;
  e[7]  = 0;

  e[8]  = 0;
  e[9]  = 0;
  e[10] = -(far + near) * rd;
  e[11] = -1;

  e[12] = 0;
  e[13] = 0;
  e[14] = -2 * near * far * rd;
  e[15] = 0;

  return this;
};

/**
 * Multiply the perspective projection matrix from the right.
 * @param fovy The angle between the upper and lower sides of the frustum.
 * @param aspect The aspect ratio of the frustum. (width/height)
 * @param near The distances to the nearer depth clipping plane. This value must be plus value.
 * @param far The distances to the farther depth clipping plane. This value must be plus value.
 * @return this
 */
Matrix4.prototype.perspective = function(fovy, aspect, near, far) {
  return this.concat(new Matrix4().setPerspective(fovy, aspect, near, far));
};

/**
 * Set the matrix for scaling.
 * @param x The scale factor along the X axis
 * @param y The scale factor along the Y axis
 * @param z The scale factor along the Z axis
 * @return this
 */
Matrix4.prototype.setScale = function(x, y, z) {
  var e = this.elements;
  e[0] = x;  e[4] = 0;  e[8]  = 0;  e[12] = 0;
  e[1] = 0;  e[5] = y;  e[9]  = 0;  e[13] = 0;
  e[2] = 0;  e[6] = 0;  e[10] = z;  e[14] = 0;
  e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  return this;
};

/**
 * Multiply the matrix for scaling from the right.
 * @param x The scale factor along the X axis
 * @param y The scale factor along the Y axis
 * @param z The scale factor along the Z axis
 * @return this
 */
Matrix4.prototype.scale = function(x, y, z) {
  var e = this.elements;
  e[0] *= x;  e[4] *= y;  e[8]  *= z;
  e[1] *= x;  e[5] *= y;  e[9]  *= z;
  e[2] *= x;  e[6] *= y;  e[10] *= z;
  e[3] *= x;  e[7] *= y;  e[11] *= z;
  return this;
};

/**
 * Set the matrix for translation.
 * @param x The X value of a translation.
 * @param y The Y value of a translation.
 * @param z The Z value of a translation.
 * @return this
 */
Matrix4.prototype.setTranslate = function(x, y, z) {
  var e = this.elements;
  e[0] = 1;  e[4] = 0;  e[8]  = 0;  e[12] = x;
  e[1] = 0;  e[5] = 1;  e[9]  = 0;  e[13] = y;
  e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = z;
  e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  return this;
};

/**
 * Multiply the matrix for translation from the right.
 * @param x The X value of a translation.
 * @param y The Y value of a translation.
 * @param z The Z value of a translation.
 * @return this
 */
Matrix4.prototype.translate = function(x, y, z) {
  var e = this.elements;
  e[12] += e[0] * x + e[4] * y + e[8]  * z;
  e[13] += e[1] * x + e[5] * y + e[9]  * z;
  e[14] += e[2] * x + e[6] * y + e[10] * z;
  e[15] += e[3] * x + e[7] * y + e[11] * z;
  return this;
};

/**
 * Set the matrix for rotation.
 * The vector of rotation axis may not be normalized.
 * @param angle The angle of rotation (degrees)
 * @param x The X coordinate of vector of rotation axis.
 * @param y The Y coordinate of vector of rotation axis.
 * @param z The Z coordinate of vector of rotation axis.
 * @return this
 */
Matrix4.prototype.setRotate = function(angle, x, y, z) {
  var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;

  angle = Math.PI * angle / 180;
  e = this.elements;

  s = Math.sin(angle);
  c = Math.cos(angle);

  if (0 !== x && 0 === y && 0 === z) {
    // Rotation around X axis
    if (x < 0) {
      s = -s;
    }
    e[0] = 1;  e[4] = 0;  e[ 8] = 0;  e[12] = 0;
    e[1] = 0;  e[5] = c;  e[ 9] =-s;  e[13] = 0;
    e[2] = 0;  e[6] = s;  e[10] = c;  e[14] = 0;
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  } else if (0 === x && 0 !== y && 0 === z) {
    // Rotation around Y axis
    if (y < 0) {
      s = -s;
    }
    e[0] = c;  e[4] = 0;  e[ 8] = s;  e[12] = 0;
    e[1] = 0;  e[5] = 1;  e[ 9] = 0;  e[13] = 0;
    e[2] =-s;  e[6] = 0;  e[10] = c;  e[14] = 0;
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  } else if (0 === x && 0 === y && 0 !== z) {
    // Rotation around Z axis
    if (z < 0) {
      s = -s;
    }
    e[0] = c;  e[4] =-s;  e[ 8] = 0;  e[12] = 0;
    e[1] = s;  e[5] = c;  e[ 9] = 0;  e[13] = 0;
    e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = 0;
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  } else {
    // Rotation around another axis
    len = Math.sqrt(x*x + y*y + z*z);
    if (len !== 1) {
      rlen = 1 / len;
      x *= rlen;
      y *= rlen;
      z *= rlen;
    }
    nc = 1 - c;
    xy = x * y;
    yz = y * z;
    zx = z * x;
    xs = x * s;
    ys = y * s;
    zs = z * s;

    e[ 0] = x*x*nc +  c;
    e[ 1] = xy *nc + zs;
    e[ 2] = zx *nc - ys;
    e[ 3] = 0;

    e[ 4] = xy *nc - zs;
    e[ 5] = y*y*nc +  c;
    e[ 6] = yz *nc + xs;
    e[ 7] = 0;

    e[ 8] = zx *nc + ys;
    e[ 9] = yz *nc - xs;
    e[10] = z*z*nc +  c;
    e[11] = 0;

    e[12] = 0;
    e[13] = 0;
    e[14] = 0;
    e[15] = 1;
  }

  return this;
};

/**
 * Multiply the matrix for rotation from the right.
 * The vector of rotation axis may not be normalized.
 * @param angle The angle of rotation (degrees)
 * @param x The X coordinate of vector of rotation axis.
 * @param y The Y coordinate of vector of rotation axis.
 * @param z The Z coordinate of vector of rotation axis.
 * @return this
 */
Matrix4.prototype.rotate = function(angle, x, y, z) {
  return this.concat(new Matrix4().setRotate(angle, x, y, z));
};

/**
 * Set the viewing matrix.
 * @param eyeX, eyeY, eyeZ The position of the eye point.
 * @param centerX, centerY, centerZ The position of the reference point.
 * @param upX, upY, upZ The direction of the up vector.
 * @return this
 */
Matrix4.prototype.setLookAt = function(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
  var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;

  fx = centerX - eyeX;
  fy = centerY - eyeY;
  fz = centerZ - eyeZ;

  // Normalize f.
  rlf = 1 / Math.sqrt(fx*fx + fy*fy + fz*fz);
  fx *= rlf;
  fy *= rlf;
  fz *= rlf;

  // Calculate cross product of f and up.
  sx = fy * upZ - fz * upY;
  sy = fz * upX - fx * upZ;
  sz = fx * upY - fy * upX;

  // Normalize s.
  rls = 1 / Math.sqrt(sx*sx + sy*sy + sz*sz);
  sx *= rls;
  sy *= rls;
  sz *= rls;

  // Calculate cross product of s and f.
  ux = sy * fz - sz * fy;
  uy = sz * fx - sx * fz;
  uz = sx * fy - sy * fx;

  // Set to this.
  e = this.elements;
  e[0] = sx;
  e[1] = ux;
  e[2] = -fx;
  e[3] = 0;

  e[4] = sy;
  e[5] = uy;
  e[6] = -fy;
  e[7] = 0;

  e[8] = sz;
  e[9] = uz;
  e[10] = -fz;
  e[11] = 0;

  e[12] = 0;
  e[13] = 0;
  e[14] = 0;
  e[15] = 1;

  // Translate.
  return this.translate(-eyeX, -eyeY, -eyeZ);
};

/**
 * Multiply the viewing matrix from the right.
 * @param eyeX, eyeY, eyeZ The position of the eye point.
 * @param centerX, centerY, centerZ The position of the reference point.
 * @param upX, upY, upZ The direction of the up vector.
 * @return this
 */
Matrix4.prototype.lookAt = function(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
  return this.concat(new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
};

/**
 * Multiply the matrix for project vertex to plane from the right.
 * @param plane The array[A, B, C, D] of the equation of plane "Ax + By + Cz + D = 0".
 * @param light The array which stored coordinates of the light. if light[3]=0, treated as parallel light.
 * @return this
 */
Matrix4.prototype.dropShadow = function(plane, light) {
  var mat = new Matrix4();
  var e = mat.elements;

  var dot = plane[0] * light[0] + plane[1] * light[1] + plane[2] * light[2] + plane[3] * light[3];

  e[ 0] = dot - light[0] * plane[0];
  e[ 1] =     - light[1] * plane[0];
  e[ 2] =     - light[2] * plane[0];
  e[ 3] =     - light[3] * plane[0];

  e[ 4] =     - light[0] * plane[1];
  e[ 5] = dot - light[1] * plane[1];
  e[ 6] =     - light[2] * plane[1];
  e[ 7] =     - light[3] * plane[1];

  e[ 8] =     - light[0] * plane[2];
  e[ 9] =     - light[1] * plane[2];
  e[10] = dot - light[2] * plane[2];
  e[11] =     - light[3] * plane[2];

  e[12] =     - light[0] * plane[3];
  e[13] =     - light[1] * plane[3];
  e[14] =     - light[2] * plane[3];
  e[15] = dot - light[3] * plane[3];

  return this.concat(mat);
}

/**
 * Multiply the matrix for project vertex to plane from the right.(Projected by parallel light.)
 * @param normX, normY, normZ The normal vector of the plane.(Not necessary to be normalized.)
 * @param planeX, planeY, planeZ The coordinate of arbitrary points on a plane.
 * @param lightX, lightY, lightZ The vector of the direction of light.(Not necessary to be normalized.)
 * @return this
 */
Matrix4.prototype.dropShadowDirectionally = function(normX, normY, normZ, planeX, planeY, planeZ, lightX, lightY, lightZ) {
  var a = planeX * normX + planeY * normY + planeZ * normZ;
  return this.dropShadow([normX, normY, normZ, -a], [lightX, lightY, lightZ, 0]);
};

/**
 * Constructor of Vector3
 * If opt_src is specified, new vector is initialized by opt_src.
 * @param opt_src source vector(option)
 */
var Vector3 = function(opt_src) {
  var v = new Float32Array(3);
  if (opt_src && typeof opt_src === 'object') {
    v[0] = opt_src[0]; v[1] = opt_src[1]; v[2] = opt_src[2];
  } 
  this.elements = v;
}

/**
  * Normalize.
  * @return this
  */
Vector3.prototype.normalize = function() {
  var v = this.elements;
  var c = v[0], d = v[1], e = v[2], g = Math.sqrt(c*c+d*d+e*e);
  if(g){
    if(g == 1)
        return this;
   } else {
     v[0] = 0; v[1] = 0; v[2] = 0;
     return this;
   }
   g = 1/g;
   v[0] = c*g; v[1] = d*g; v[2] = e*g;
   return this;
};

/**
 * Constructor of Vector4
 * If opt_src is specified, new vector is initialized by opt_src.
 * @param opt_src source vector(option)
 */
var Vector4 = function(opt_src) {
  var v = new Float32Array(4);
  if (opt_src && typeof opt_src === 'object') {
    v[0] = opt_src[0]; v[1] = opt_src[1]; v[2] = opt_src[2]; v[3] = opt_src[3];
  } 
  this.elements = v;
}
// shader-utils.js, from cuon-utils.js (c) 2012 kanda and matsuda
// Basic helper functions for compiling, linking and loading shaders as well as getting
// a webgl context across browsers.

/**
 * Create a program object and make current
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return true, if the program object was created and successfully made current 
 */
function initShaders(gl, vshader, fshader) {
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log('Failed to create program');
    return false;
  }

  gl.useProgram(program);
  gl.program = program;

  return true;
}

/**
 * Create the linked program object
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return created program object, or null if the creation has failed
 */
function createProgram(gl, vshader, fshader) {
  // Create shader object
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // Create a program object
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  // Attach the shader objects
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // Link the program object
  gl.linkProgram(program);

  // Check the result of linking
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

/**
 * Create a shader object
 * @param gl GL context
 * @param type the type of the shader object to be created
 * @param source shader program (string)
 * @return created shader object, or null if the creation has failed.
 */
function loadShader(gl, type, source) {
  // Create shader object
  var shader = gl.createShader(type);
  if (shader == null) {
    console.log('unable to create shader');
    return null;
  }

  // Set the shader program
  gl.shaderSource(shader, source);

  // Compile the shader
  gl.compileShader(shader);

  // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + error);
    console.log(source);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/** 
 * Initialize and get the rendering for WebGL
 * @param canvas <cavnas> element
 * @param opt_debug flag to initialize the context for debugging
 * @return the rendering context for WebGL
 */
function getWebGLContext(canvas, opt_debug) {
  // Get the rendering context for WebGL
  var gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) return null;

  // if opt_debug is explicitly false, create the context for debugging
  if (arguments.length < 2 || opt_debug) {
    gl = WebGLDebugUtils.makeDebugContext(gl);
  }

  return gl;
}//Copyright (c) 2009 The Chromium Authors. All rights reserved.
//Use of this source code is governed by a BSD-style license that can be
//found in the LICENSE file.

// Various functions for helping debug WebGL apps.

WebGLDebugUtils = function() {

/**
 * Wrapped logging function.
 * @param {string} msg Message to log.
 */
var log = function(msg) {
  if (window.console && window.console.log) {
    window.console.log(msg);
  }
};

/**
 * Which arguements are enums.
 * @type {!Object.<number, string>}
 */
var glValidEnumContexts = {

  // Generic setters and getters

  'enable': { 0:true },
  'disable': { 0:true },
  'getParameter': { 0:true },

  // Rendering

  'drawArrays': { 0:true },
  'drawElements': { 0:true, 2:true },

  // Shaders

  'createShader': { 0:true },
  'getShaderParameter': { 1:true },
  'getProgramParameter': { 1:true },

  // Vertex attributes

  'getVertexAttrib': { 1:true },
  'vertexAttribPointer': { 2:true },

  // Textures

  'bindTexture': { 0:true },
  'activeTexture': { 0:true },
  'getTexParameter': { 0:true, 1:true },
  'texParameterf': { 0:true, 1:true },
  'texParameteri': { 0:true, 1:true, 2:true },
  'texImage2D': { 0:true, 2:true, 6:true, 7:true },
  'texSubImage2D': { 0:true, 6:true, 7:true },
  'copyTexImage2D': { 0:true, 2:true },
  'copyTexSubImage2D': { 0:true },
  'generateMipmap': { 0:true },

  // Buffer objects

  'bindBuffer': { 0:true },
  'bufferData': { 0:true, 2:true },
  'bufferSubData': { 0:true },
  'getBufferParameter': { 0:true, 1:true },

  // Renderbuffers and framebuffers

  'pixelStorei': { 0:true, 1:true },
  'readPixels': { 4:true, 5:true },
  'bindRenderbuffer': { 0:true },
  'bindFramebuffer': { 0:true },
  'checkFramebufferStatus': { 0:true },
  'framebufferRenderbuffer': { 0:true, 1:true, 2:true },
  'framebufferTexture2D': { 0:true, 1:true, 2:true },
  'getFramebufferAttachmentParameter': { 0:true, 1:true, 2:true },
  'getRenderbufferParameter': { 0:true, 1:true },
  'renderbufferStorage': { 0:true, 1:true },

  // Frame buffer operations (clear, blend, depth test, stencil)

  'clear': { 0:true },
  'depthFunc': { 0:true },
  'blendFunc': { 0:true, 1:true },
  'blendFuncSeparate': { 0:true, 1:true, 2:true, 3:true },
  'blendEquation': { 0:true },
  'blendEquationSeparate': { 0:true, 1:true },
  'stencilFunc': { 0:true },
  'stencilFuncSeparate': { 0:true, 1:true },
  'stencilMaskSeparate': { 0:true },
  'stencilOp': { 0:true, 1:true, 2:true },
  'stencilOpSeparate': { 0:true, 1:true, 2:true, 3:true },

  // Culling

  'cullFace': { 0:true },
  'frontFace': { 0:true },
};

/**
 * Map of numbers to names.
 * @type {Object}
 */
var glEnums = null;

/**
 * Initializes this module. Safe to call more than once.
 * @param {!WebGLRenderingContext} ctx A WebGL context. If
 *    you have more than one context it doesn't matter which one
 *    you pass in, it is only used to pull out constants.
 */
function init(ctx) {
  if (glEnums == null) {
    glEnums = { };
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'number') {
        glEnums[ctx[propertyName]] = propertyName;
      }
    }
  }
}

/**
 * Checks the utils have been initialized.
 */
function checkInit() {
  if (glEnums == null) {
    throw 'WebGLDebugUtils.init(ctx) not called';
  }
}

/**
 * Returns true or false if value matches any WebGL enum
 * @param {*} value Value to check if it might be an enum.
 * @return {boolean} True if value matches one of the WebGL defined enums
 */
function mightBeEnum(value) {
  checkInit();
  return (glEnums[value] !== undefined);
}

/**
 * Gets an string version of an WebGL enum.
 *
 * Example:
 *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
 *
 * @param {number} value Value to return an enum for
 * @return {string} The string version of the enum.
 */
function glEnumToString(value) {
  checkInit();
  var name = glEnums[value];
  return (name !== undefined) ? name :
      ("*UNKNOWN WebGL ENUM (0x" + value.toString(16) + ")");
}

/**
 * Returns the string version of a WebGL argument.
 * Attempts to convert enum arguments to strings.
 * @param {string} functionName the name of the WebGL function.
 * @param {number} argumentIndx the index of the argument.
 * @param {*} value The value of the argument.
 * @return {string} The value as a string.
 */
function glFunctionArgToString(functionName, argumentIndex, value) {
  var funcInfo = glValidEnumContexts[functionName];
  if (funcInfo !== undefined) {
    if (funcInfo[argumentIndex]) {
      return glEnumToString(value);
    }
  }
  return value.toString();
}

/**
 * Given a WebGL context returns a wrapped context that calls
 * gl.getError after every command and calls a function if the
 * result is not gl.NO_ERROR.
 *
 * @param {!WebGLRenderingContext} ctx The webgl context to
 *        wrap.
 * @param {!function(err, funcName, args): void} opt_onErrorFunc
 *        The function to call when gl.getError returns an
 *        error. If not specified the default function calls
 *        console.log with a message.
 */
function makeDebugContext(ctx, opt_onErrorFunc) {
  init(ctx);
  opt_onErrorFunc = opt_onErrorFunc || function(err, functionName, args) {
        // apparently we can't do args.join(",");
        var argStr = "";
        for (var ii = 0; ii < args.length; ++ii) {
          argStr += ((ii == 0) ? '' : ', ') +
              glFunctionArgToString(functionName, ii, args[ii]);
        }
        log("WebGL error "+ glEnumToString(err) + " in "+ functionName +
            "(" + argStr + ")");
      };

  // Holds booleans for each GL error so after we get the error ourselves
  // we can still return it to the client app.
  var glErrorShadow = { };

  // Makes a function that calls a WebGL function and then calls getError.
  function makeErrorWrapper(ctx, functionName) {
    return function() {
      var result = ctx[functionName].apply(ctx, arguments);
      var err = ctx.getError();
      if (err != 0) {
        glErrorShadow[err] = true;
        opt_onErrorFunc(err, functionName, arguments);
      }
      return result;
    };
  }

  // Make a an object that has a copy of every property of the WebGL context
  // but wraps all functions.
  var wrapper = {};
  for (var propertyName in ctx) {
    if (typeof ctx[propertyName] == 'function') {
       wrapper[propertyName] = makeErrorWrapper(ctx, propertyName);
     } else {
       wrapper[propertyName] = ctx[propertyName];
     }
  }

  // Override the getError function with one that returns our saved results.
  wrapper.getError = function() {
    for (var err in glErrorShadow) {
      if (glErrorShadow[err]) {
        glErrorShadow[err] = false;
        return err;
      }
    }
    return ctx.NO_ERROR;
  };

  return wrapper;
}

function resetToInitialState(ctx) {
  var numAttribs = ctx.getParameter(ctx.MAX_VERTEX_ATTRIBS);
  var tmp = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, tmp);
  for (var ii = 0; ii < numAttribs; ++ii) {
    ctx.disableVertexAttribArray(ii);
    ctx.vertexAttribPointer(ii, 4, ctx.FLOAT, false, 0, 0);
    ctx.vertexAttrib1f(ii, 0);
  }
  ctx.deleteBuffer(tmp);

  var numTextureUnits = ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);
  for (var ii = 0; ii < numTextureUnits; ++ii) {
    ctx.activeTexture(ctx.TEXTURE0 + ii);
    ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
    ctx.bindTexture(ctx.TEXTURE_2D, null);
  }

  ctx.activeTexture(ctx.TEXTURE0);
  ctx.useProgram(null);
  ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
  ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
  ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
  ctx.disable(ctx.BLEND);
  ctx.disable(ctx.CULL_FACE);
  ctx.disable(ctx.DEPTH_TEST);
  ctx.disable(ctx.DITHER);
  ctx.disable(ctx.SCISSOR_TEST);
  ctx.blendColor(0, 0, 0, 0);
  ctx.blendEquation(ctx.FUNC_ADD);
  ctx.blendFunc(ctx.ONE, ctx.ZERO);
  ctx.clearColor(0, 0, 0, 0);
  ctx.clearDepth(1);
  ctx.clearStencil(-1);
  ctx.colorMask(true, true, true, true);
  ctx.cullFace(ctx.BACK);
  ctx.depthFunc(ctx.LESS);
  ctx.depthMask(true);
  ctx.depthRange(0, 1);
  ctx.frontFace(ctx.CCW);
  ctx.hint(ctx.GENERATE_MIPMAP_HINT, ctx.DONT_CARE);
  ctx.lineWidth(1);
  ctx.pixelStorei(ctx.PACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, false);
  ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  // TODO: Delete this IF.
  if (ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL) {
    ctx.pixelStorei(ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL, ctx.BROWSER_DEFAULT_WEBGL);
  }
  ctx.polygonOffset(0, 0);
  ctx.sampleCoverage(1, false);
  ctx.scissor(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.stencilFunc(ctx.ALWAYS, 0, 0xFFFFFFFF);
  ctx.stencilMask(0xFFFFFFFF);
  ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);
  ctx.viewport(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT);

  // TODO: This should NOT be needed but Firefox fails with 'hint'
  while(ctx.getError());
}

function makeLostContextSimulatingContext(ctx) {
  var wrapper_ = {};
  var contextId_ = 1;
  var contextLost_ = false;
  var resourceId_ = 0;
  var resourceDb_ = [];
  var onLost_ = undefined;
  var onRestored_ = undefined;
  var nextOnRestored_ = undefined;

  // Holds booleans for each GL error so can simulate errors.
  var glErrorShadow_ = { };

  function isWebGLObject(obj) {
    //return false;
    return (obj instanceof WebGLBuffer ||
            obj instanceof WebGLFramebuffer ||
            obj instanceof WebGLProgram ||
            obj instanceof WebGLRenderbuffer ||
            obj instanceof WebGLShader ||
            obj instanceof WebGLTexture);
  }

  function checkResources(args) {
    for (var ii = 0; ii < args.length; ++ii) {
      var arg = args[ii];
      if (isWebGLObject(arg)) {
        return arg.__webglDebugContextLostId__ == contextId_;
      }
    }
    return true;
  }

  function clearErrors() {
    var k = Object.keys(glErrorShadow_);
    for (var ii = 0; ii < k.length; ++ii) {
      delete glErrorShdow_[k];
    }
  }

  // Makes a function that simulates WebGL when out of context.
  function makeLostContextWrapper(ctx, functionName) {
    var f = ctx[functionName];
    return function() {
      // Only call the functions if the context is not lost.
      if (!contextLost_) {
        if (!checkResources(arguments)) {
          glErrorShadow_[ctx.INVALID_OPERATION] = true;
          return;
        }
        var result = f.apply(ctx, arguments);
        return result;
      }
    };
  }

  for (var propertyName in ctx) {
    if (typeof ctx[propertyName] == 'function') {
       wrapper_[propertyName] = makeLostContextWrapper(ctx, propertyName);
     } else {
       wrapper_[propertyName] = ctx[propertyName];
     }
  }

  function makeWebGLContextEvent(statusMessage) {
    return {statusMessage: statusMessage};
  }

  function freeResources() {
    for (var ii = 0; ii < resourceDb_.length; ++ii) {
      var resource = resourceDb_[ii];
      if (resource instanceof WebGLBuffer) {
        ctx.deleteBuffer(resource);
      } else if (resource instanceof WebctxFramebuffer) {
        ctx.deleteFramebuffer(resource);
      } else if (resource instanceof WebctxProgram) {
        ctx.deleteProgram(resource);
      } else if (resource instanceof WebctxRenderbuffer) {
        ctx.deleteRenderbuffer(resource);
      } else if (resource instanceof WebctxShader) {
        ctx.deleteShader(resource);
      } else if (resource instanceof WebctxTexture) {
        ctx.deleteTexture(resource);
      }
    }
  }

  wrapper_.loseContext = function() {
    if (!contextLost_) {
      contextLost_ = true;
      ++contextId_;
      while (ctx.getError());
      clearErrors();
      glErrorShadow_[ctx.CONTEXT_LOST_WEBGL] = true;
      setTimeout(function() {
          if (onLost_) {
            onLost_(makeWebGLContextEvent("context lost"));
          }
        }, 0);
    }
  };

  wrapper_.restoreContext = function() {
    if (contextLost_) {
      if (onRestored_) {
        setTimeout(function() {
            freeResources();
            resetToInitialState(ctx);
            contextLost_ = false;
            if (onRestored_) {
              var callback = onRestored_;
              onRestored_ = nextOnRestored_;
              nextOnRestored_ = undefined;
              callback(makeWebGLContextEvent("context restored"));
            }
          }, 0);
      } else {
        throw "You can not restore the context without a listener"
      }
    }
  };

  // Wrap a few functions specially.
  wrapper_.getError = function() {
    if (!contextLost_) {
      var err;
      while (err = ctx.getError()) {
        glErrorShadow_[err] = true;
      }
    }
    for (var err in glErrorShadow_) {
      if (glErrorShadow_[err]) {
        delete glErrorShadow_[err];
        return err;
      }
    }
    return ctx.NO_ERROR;
  };

  var creationFunctions = [
    "createBuffer",
    "createFramebuffer",
    "createProgram",
    "createRenderbuffer",
    "createShader",
    "createTexture"
  ];
  for (var ii = 0; ii < creationFunctions.length; ++ii) {
    var functionName = creationFunctions[ii];
    wrapper_[functionName] = function(f) {
      return function() {
        if (contextLost_) {
          return null;
        }
        var obj = f.apply(ctx, arguments);
        obj.__webglDebugContextLostId__ = contextId_;
        resourceDb_.push(obj);
        return obj;
      };
    }(ctx[functionName]);
  }

  var functionsThatShouldReturnNull = [
    "getActiveAttrib",
    "getActiveUniform",
    "getBufferParameter",
    "getContextAttributes",
    "getAttachedShaders",
    "getFramebufferAttachmentParameter",
    "getParameter",
    "getProgramParameter",
    "getProgramInfoLog",
    "getRenderbufferParameter",
    "getShaderParameter",
    "getShaderInfoLog",
    "getShaderSource",
    "getTexParameter",
    "getUniform",
    "getUniformLocation",
    "getVertexAttrib"
  ];
  for (var ii = 0; ii < functionsThatShouldReturnNull.length; ++ii) {
    var functionName = functionsThatShouldReturnNull[ii];
    wrapper_[functionName] = function(f) {
      return function() {
        if (contextLost_) {
          return null;
        }
        return f.apply(ctx, arguments);
      }
    }(wrapper_[functionName]);
  }

  var isFunctions = [
    "isBuffer",
    "isEnabled",
    "isFramebuffer",
    "isProgram",
    "isRenderbuffer",
    "isShader",
    "isTexture"
  ];
  for (var ii = 0; ii < isFunctions.length; ++ii) {
    var functionName = isFunctions[ii];
    wrapper_[functionName] = function(f) {
      return function() {
        if (contextLost_) {
          return false;
        }
        return f.apply(ctx, arguments);
      }
    }(wrapper_[functionName]);
  }

  wrapper_.checkFramebufferStatus = function(f) {
    return function() {
      if (contextLost_) {
        return ctx.FRAMEBUFFER_UNSUPPORTED;
      }
      return f.apply(ctx, arguments);
    };
  }(wrapper_.checkFramebufferStatus);

  wrapper_.getAttribLocation = function(f) {
    return function() {
      if (contextLost_) {
        return -1;
      }
      return f.apply(ctx, arguments);
    };
  }(wrapper_.getAttribLocation);

  wrapper_.getVertexAttribOffset = function(f) {
    return function() {
      if (contextLost_) {
        return 0;
      }
      return f.apply(ctx, arguments);
    };
  }(wrapper_.getVertexAttribOffset);

  wrapper_.isContextLost = function() {
    return contextLost_;
  };

  function wrapEvent(listener) {
    if (typeof(listener) == "function") {
      return listener;
    } else {
      return function(info) {
        listener.handleEvent(info);
      }
    }
  }

  wrapper_.registerOnContextLostListener = function(listener) {
    onLost_ = wrapEvent(listener);
  };

  wrapper_.registerOnContextRestoredListener = function(listener) {
    if (contextLost_) {
      nextOnRestored_ = wrapEvent(listener);
    } else {
      onRestored_ = wrapEvent(listener);
    }
  }

  return wrapper_;
}

return {
  /**
   * Initializes this module. Safe to call more than once.
   * @param {!WebGLRenderingContext} ctx A WebGL context. If
   *    you have more than one context it doesn't matter which one
   *    you pass in, it is only used to pull out constants.
   */
  'init': init,

  /**
   * Returns true or false if value matches any WebGL enum
   * @param {*} value Value to check if it might be an enum.
   * @return {boolean} True if value matches one of the WebGL defined enums
   */
  'mightBeEnum': mightBeEnum,

  /**
   * Gets an string version of an WebGL enum.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
   *
   * @param {number} value Value to return an enum for
   * @return {string} The string version of the enum.
   */
  'glEnumToString': glEnumToString,

  /**
   * Converts the argument of a WebGL function to a string.
   * Attempts to convert enum arguments to strings.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glFunctionArgToString('bindTexture', 0, gl.TEXTURE_2D);
   *
   * would return 'TEXTURE_2D'
   *
   * @param {string} functionName the name of the WebGL function.
   * @param {number} argumentIndx the index of the argument.
   * @param {*} value The value of the argument.
   * @return {string} The value as a string.
   */
  'glFunctionArgToString': glFunctionArgToString,

  /**
   * Given a WebGL context returns a wrapped context that calls
   * gl.getError after every command and calls a function if the
   * result is not NO_ERROR.
   *
   * You can supply your own function if you want. For example, if you'd like
   * an exception thrown on any GL error you could do this
   *
   *    function throwOnGLError(err, funcName, args) {
   *      throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to" +
   *            funcName;
   *    };
   *
   *    ctx = WebGLDebugUtils.makeDebugContext(
   *        canvas.getContext("webgl"), throwOnGLError);
   *
   * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
   * @param {!function(err, funcName, args): void} opt_onErrorFunc The function
   *     to call when gl.getError returns an error. If not specified the default
   *     function calls console.log with a message.
   */
  'makeDebugContext': makeDebugContext,

  /**
   * Given a WebGL context returns a wrapped context that adds 4
   * functions.
   *
   * ctx.loseContext:
   *   simulates a lost context event.
   *
   * ctx.restoreContext:
   *   simulates the context being restored.
   *
   * ctx.registerOnContextLostListener(listener):
   *   lets you register a listener for context lost. Use instead
   *   of addEventListener('webglcontextlostevent', listener);
   *
   * ctx.registerOnContextRestoredListener(listener):
   *   lets you register a listener for context restored. Use
   *   instead of addEventListener('webglcontextrestored',
   *   listener);
   *
   * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
   */
  'makeLostContextSimulatingContext': makeLostContextSimulatingContext,

  /**
   * Resets a context to the initial state.
   * @param {!WebGLRenderingContext} ctx The webgl context to
   *     reset.
   */
  'resetToInitialState': resetToInitialState
};

}();

/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimationFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */

WebGLUtils = function() {

/**
 * Creates the HTLM for a failure message
 * @param {string} canvasContainerId id of container of th
 *        canvas.
 * @return {string} The html.
 */
var makeFailHTML = function(msg) {
  return '' +
        '<div style="margin: auto; width:500px;z-index:10000;margin-top:20em;text-align:center;">' + msg + '</div>';
  return '' +
    '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
    '<td align="center">' +
    '<div style="display: table-cell; vertical-align: middle;">' +
    '<div style="">' + msg + '</div>' +
    '</div>' +
    '</td></tr></table>';
};

/**
 * Mesasge for getting a webgl browser
 * @type {string}
 */
var GET_A_WEBGL_BROWSER = '' +
  'This page requires a browser that supports WebGL.<br/>' +
  '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

/**
 * Mesasge for need better hardware
 * @type {string}
 */
var OTHER_PROBLEM = '' +
  "It doesn't appear your computer can support WebGL.<br/>" +
  '<a href="http://get.webgl.org">Click here for more information.</a>';

/**
 * Creates a webgl context. If creation fails it will
 * change the contents of the container of the <canvas>
 * tag to an error message with the correct links for WebGL.
 * @param {Element} canvas. The canvas element to create a
 *     context from.
 * @param {WebGLContextCreationAttirbutes} opt_attribs Any
 *     creation attributes you want to pass in.
 * @param {function:(msg)} opt_onError An function to call
 *     if there is an error during creation.
 * @return {WebGLRenderingContext} The created context.
 */
var setupWebGL = function(canvas, opt_attribs, opt_onError) {
  function handleCreationError(msg) {
      var container = document.getElementsByTagName("body")[0];
    //var container = canvas.parentNode;
    if (container) {
      var str = window.WebGLRenderingContext ?
           OTHER_PROBLEM :
           GET_A_WEBGL_BROWSER;
      if (msg) {
        str += "<br/><br/>Status: " + msg;
      }
      container.innerHTML = makeFailHTML(str);
    }
  };

  opt_onError = opt_onError || handleCreationError;

  if (canvas.addEventListener) {
    canvas.addEventListener("webglcontextcreationerror", function(event) {
          opt_onError(event.statusMessage);
        }, false);
  }
  var context = create3DContext(canvas, opt_attribs);
  if (!context) {
    if (!window.WebGLRenderingContext) {
      opt_onError("");
    } else {
      opt_onError("");
    }
  }

  return context;
};

/**
 * Creates a webgl context.
 * @param {!Canvas} canvas The canvas tag to get context
 *     from. If one is not passed in one will be created.
 * @return {!WebGLContext} The created context.
 */
var create3DContext = function(canvas, opt_attribs) {
  var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
  var context = null;
  for (var ii = 0; ii < names.length; ++ii) {
    try {
      context = canvas.getContext(names[ii], opt_attribs);
    } catch(e) {}
    if (context) {
      break;
    }
  }
  return context;
}

return {
  create3DContext: create3DContext,
  setupWebGL: setupWebGL
};
}();

/**
 * Provides requestAnimationFrame in a cross browser
 * way.
 */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
             window.setTimeout(callback, 1000/60);
           };
  })();
}

/** * ERRATA: 'cancelRequestAnimationFrame' renamed to 'cancelAnimationFrame' to reflect an update to the W3C Animation-Timing Spec. 
 * 
 * Cancels an animation frame request. 
 * Checks for cross-browser support, falls back to clearTimeout. 
 * @param {number}  Animation frame request. */
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                 window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
                                 window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
                                 window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
                                 window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
                                 window.clearTimeout);
}
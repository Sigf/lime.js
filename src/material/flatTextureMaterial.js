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

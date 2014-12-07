// TODO
// - Add uniform for ambient light
// - Add uniform declaration in class 

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


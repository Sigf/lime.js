 // TODO
 LIME.PerPixelColorMaterial = function(geometry, gl) {

  this.context = gl;
  this.program;
  this.vertexColor = [];
  this.n = geometry.getArraySize() / 3;
  this.type = LIME.perPixelColorMaterial;

  var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'attribute vec4 a_Color;\n' + 
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
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

  var program = createProgram(this.context, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log('Failed to create program');
    return false;
  }
  this.program = program;
};

LIME.PerPixelColorMaterial.prototype.getColorArray = function(n) {
  return new Float32Array(this.vertexColor);
}

LIME.PerPixelColorMaterial.prototype.setColorArray = function(arr) {
  if(arr.length/4 != this.n) { 
    console.log("Vertices and vertices color array mis-match!");
  }

  else {
    this.vertexColor = arr.splice(0,arr.length);
  }
}

LIME.PerPixelColorMaterial.prototype.getProgram = function() {
  return this.program;
}

LIME.PerPixelColorMaterial.prototype.getType = function() {
  return this.type;
}

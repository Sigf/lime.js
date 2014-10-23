 LIME.FlatMaterial = function(gl, r, g, b, a) {

  this.context = gl;
  this.program;
  this.red = r;
  this.green = g;
  this.blue = b;
  this.alpha = a;
  this.type = LIME.flatShader;

  var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
  '  gl_PointSize = 5.0;\n' +
  '}\n' ;

  var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif GL_ES\n' +
  'void main() {\n' + 
  '  gl_FragColor = vec4(' + (r).toFixed(1) + ', ' + (g).toFixed(1) + ', ' + (b).toFixed(1) + ', ' + (a).toFixed(1) + ');\n' +
  '}\n';

  var program = createProgram(this.context, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log('Failed to create program');
    return false; 
  }
  this.program = program;
};

LIME.FlatMaterial.prototype.getProgram = function() {
  return this.program;
}

LIME.FlatMaterial.prototype.getType = function() {
  return this.type;
}
 // TODO
 // Split this class into 2, make the flat shader using a non varying variable
 // for the color and hard code the color in the shader from input. So we don't
 // need to pass the geometry for every shapes if the color is the same per vertex.
 LIME.FlatShader = function(geometry, gl, r, g, b, a) {

  this.context = gl;
  this.program;
  this.vertexColor = [];
  this.red = r;
  this.green = g;
  this.blue = b;
  this.alpha = a;
  this.n = geometry.getArraySize() / 3;

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

LIME.FlatShader.prototype.getColorArray = function(n) {
  for(var i = 0; i < this.n; i++)
  {
    this.vertexColor.push(this.red);
    this.vertexColor.push(this.green);
    this.vertexColor.push(this.blue);
    this.vertexColor.push(this.alpha);
  }
  return new Float32Array(this.vertexColor);
}

LIME.FlatShader.prototype.getProgram = function() {
  return this.program;
}

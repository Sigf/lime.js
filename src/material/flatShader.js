LIME.FlatShader = function(r, g, b, a) {

  this.program;
  this.vertexColor = [];
  this.red = r;
  this.green = g;
  this.blue = b;
  this.alpha = a;

  var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'attribute vec4 a_Color;\n' + 
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
  '  v_Color = a_Color;\n' +
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

  this.getColorArray = function(n) {
    for(var i = 0; i < n; i++)
    {
      vertexColor.push(r);
      vertexColor.push(g);
      vertexColor.push(b);
      vertexColor.push(a);
    }
    return new Float32Array(this.vertexColor);
  }

  this.getProgram = function() {
    return this.program;
  }
}

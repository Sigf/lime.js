// TODO
// - Add uniform for a_Color instead of concatenate
// - Add uniform for ambient light
// - Add uniform declaration in class
// - Add controls to change uiniforms

LIME.FlatMaterial = function(gl, r, g, b, a, lighting) {

  this.context = gl;
  this.program;
  this.color = [r, g, b, a];
  this.type = LIME.flatMaterial;
  this.isLit = lighting;
  
  if(this.isLit) {
    var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Normal;\n' +
    'uniform vec4 u_Color;\n' +
    'uniform vec4 u_Ambient;\n' +
    'uniform mat4 u_MvpMatrix;\n' +
    'uniform mat4 u_NormalMatrix;\n' +
    'uniform vec3 u_LightColor;\n' +
    'uniform vec3 u_LightDirection;\n' +

    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  vec4 a_Color = vec4( u_Color );\n' +
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
    'uniform vec4 u_Color;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_Position = u_MvpMatrix * a_Position;\n' +
    '  gl_PointSize = 5.0;\n' +
    '  v_Color = u_Color;\n' +
    '}\n' ;

    var FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif GL_ES\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' + 
    '  gl_FragColor = v_Color);\n' +
    '}\n';
    }

  var program = createProgram(this.context, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log('Failed to create program');
    return false; 
  }
  this.program = program;

  this.a_Position = createAttribLocation(gl, this.program, 'a_Position');
  this.a_Normal = createAttribLocation(gl, this.program, 'a_Normal');

  this.u_Color = createUniformLocation(gl, this.program, 'u_Color');
  this.u_Ambient = createUniformLocation(gl, this.program, 'u_Ambient');
  this.u_MvpMatrix = createUniformLocation(gl, this.program, 'u_Color');
  this.u_NormalMatrix = createUniformLocation(gl, this.program, 'u_Color');
  this.u_LightColor = createUniformLocation(gl, this.program, 'u_Color');
  this.u_LightDirection = createUniformLocation(gl, this.program, 'u_Color');

};

LIME.FlatMaterial.prototype.getProgram = function() {
  return this.program;
};

LIME.FlatMaterial.prototype.getType = function() {
  return this.type;
};

LIME.FlatMaterial.prototype.getColor = function() {
  return new Vector4(this.color);
};

LIME.FlatMaterial.prototype.setColor = function(r, g, b, a) {
  this.color = [r, g, b, a];
};


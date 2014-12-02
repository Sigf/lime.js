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

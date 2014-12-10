// TODO
// 

LIME.GouraudMaterial = function(gl, Kd_r, Kd_g, Kd_b, Ka_r, Ka_g, Ka_b, Ks_r, Ks_g, Ks_b, sh) {
  this.context = gl;
  this.program;
  this.Ka = new Vector3([Ka_r, Ka_g, Ka_b]);
  this.Kd = new Vector3([Kd_r, Kd_g, Kd_b]);
  this.Ks = new Vector3([Ks_r, Ks_g, Ks_b]);
  this.shine = sh;

  this.a_Position;
  this.a_Normal;
  this.u_Mvpmatrix;
  this.u_NormalMatrix;
  this.u_ModelViewMatrix;
  this.u_ProjectionMatrix;
  this.u_La;
  this.u_Ls;
  this.u_Ld;
  this.u_LightPosition;
  this.u_Ka;
  this.u_Ks;
  this.u_Kd;
  this.u_Shininess;

  this.type = LIME.PhongShader;

  var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +

  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_NormalMatrix;\n' +
  'uniform mat4 u_ModelViewMatrix;\n' +

  'uniform vec3 u_La;\n' +
  'uniform vec3 u_Ld;\n' +
  'uniform vec3 u_Ls;\n' +
  'uniform vec4 u_LightPosition;\n' +

  'uniform vec3 u_Ka;\n' +
  'uniform vec3 u_Kd;\n' +
  'uniform vec3 u_Ks;\n' +
  'uniform float u_Shininess;\n' +

  'varying vec3 v_LightItensity;\n' +

  'void main() {\n' +
  '  vec3 tnorm = normalize( mat3(u_NormalMatrix) * vec3(a_Normal));\n' +
  '  vec4 eyeCoords = u_ModelViewMatrix * a_Position;\n' +
  '  vec3 s = normalize(vec3(u_LightPosition - eyeCoords));\n' +
  '  vec3 v = normalize(-eyeCoords.xyz);\n' +
  '  vec3 r = reflect(-s, tnorm);\n' +
  '  vec3 ambient = u_La * u_Ka;\n' +
  '  float sDotN = max( dot(s,tnorm), 0.0);\n' +
  '  vec3 diffuse = u_Ld * u_Kd * sDotN;\n' +
  '  vec3 spec = vec3(0.0);\n' +
  '  if(sDotN > 0.0);\n' +
  '    spec = u_Ls * u_Ks * pow(max(dot(r,v), 0.0), u_Shininess);\n' +

  '  v_LightItensity = ambient + diffuse + spec;\n' +

  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '}\n' ;

  var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'varying vec3 v_LightItensity;\n' +
  'void main() {\n' + 
  '  gl_FragColor = vec4(v_LightItensity, 1.0);\n' +
  '}\n';

  var program = createProgram(this.context, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log('Failed to create program');
    return false; 
  }
  this.program = program;

  this.a_Position = createAttribLocation(gl, this.program, 'a_Position');
  this.a_Normal = createAttribLocation(gl, this.program, 'a_Normal');
  
  this.u_MvpMatrix = createUniformLocation(gl, this.program, 'u_MvpMatrix');
  this.u_NormalMatrix = createUniformLocation(gl, this.program, 'u_NormalMatrix');
  this.u_ModelViewMatrix = createUniformLocation(gl, this.program, 'u_ModelViewMatrix');
  this.u_La = createUniformLocation(gl, this.program, 'u_La');
  this.u_Ls = createUniformLocation(gl, this.program, 'u_Ls');
  this.u_Ld = createUniformLocation(gl, this.program, 'u_Ld');
  this.u_LightPosition = createUniformLocation(gl, this.program, 'u_LightPosition');
  this.u_Ka = createUniformLocation(gl, this.program, 'u_Ka');
  this.u_Ks = createUniformLocation(gl, this.program, 'u_Ks');
  this.u_Kd = createUniformLocation(gl, this.program, 'u_Kd');
  this.u_Shininess = createUniformLocation(gl, this.program, 'u_Shininess');

};

LIME.GouraudMaterial.prototype.getProgram = function() {
  return this.program;
};

LIME.GouraudMaterial.prototype.getType = function() {
  return this.type;
};

LIME.GouraudMaterial.prototype.get_Ka = function() {
  return this.Ka;
};

LIME.GouraudMaterial.prototype.get_Kd = function() {
  return this.Kd;
};

LIME.GouraudMaterial.prototype.get_Ks = function() {
  return this.Ks;
};


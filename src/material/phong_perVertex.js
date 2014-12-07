// TODO
// 

LIME.PhongMaterial = function(gl, Kd_r, Kd_g, Kd_b, Ka_r, Ka_g, Ka_b, Ks_r, Ks_g, Ks_b, sh) {
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

  this.a_Position = gl.getAttribLocation(this.program, 'a_Position');
   if (this.a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return -1;
   }

  this.a_Normal = gl.getAttribLocation(this.program, 'a_Normal');
   if (this.a_Normal < 0) {
      console.log('Failed to get the storage location of a_Normal');
      return -1;
   }

  this.u_MvpMatrix = gl.getUniformLocation(this.program, 'u_MvpMatrix');
   if(!this.u_MvpMatrix) {
      console.log("Failed to get the storage location of u_MvpMatrix");
      return -1;
   }

  this.u_NormalMatrix = gl.getUniformLocation(this.program, 'u_NormalMatrix');
   if(!this.u_NormalMatrix) {
      console.log("Failed to get the storage location of u_NormalMatrix");
      return -1;
   }

  this.u_ModelViewMatrix = gl.getUniformLocation(this.program, 'u_ModelViewMatrix');
   if(!this.u_ModelViewMatrix) {
      console.log("Failed to get the storage location of u_ModelViewMatrix");
      return -1;
   }

  this.u_La = gl.getUniformLocation(this.program, 'u_La');
   if(!this.u_La) {
      console.log("Failed to get the storage location of u_La");
      return -1;
   }

  this.u_Ls = gl.getUniformLocation(this.program, 'u_Ls');
   if(!this.u_Ls) {
      console.log("Failed to get the storage location of u_Ls");
      return -1;
   }

  this.u_Ld = gl.getUniformLocation(this.program, 'u_Ld');
   if(!this.u_Ld) {
      console.log("Failed to get the storage location of u_Ld");
      return -1;
   }

  this.u_LightPosition = gl.getUniformLocation(this.program, 'u_LightPosition');
   if(!this.u_LightPosition) {
      console.log("Failed to get the storage location of u_LightPosition");
      return -1;
   }

  this.u_Ka = gl.getUniformLocation(this.program, 'u_Ka');
   if(!this.u_Ka) {
      console.log("Failed to get the storage location of u_Ka");
      return -1;
   }

  this.u_Ks = gl.getUniformLocation(this.program, 'u_Ks');
   if(!this.u_Ks) {
      console.log("Failed to get the storage location of u_Ks");
      return -1;
   }

  this.u_Kd = gl.getUniformLocation(this.program, 'u_Kd');
   if(!this.u_Kd) {
      console.log("Failed to get the storage location of u_Kd");
      return -1;
   }

  this.u_Shininess = gl.getUniformLocation(this.program, 'u_Shininess');
   if(!this.u_Shininess) {
      console.log("Failed to get the storage location of u_Shininess");
      return -1;
   }

};

LIME.PhongMaterial.prototype.getProgram = function() {
  return this.program;
};

LIME.PhongMaterial.prototype.getType = function() {
  return this.type;
};

LIME.PhongMaterial.prototype.get_Ka = function() {
  return this.Ka;
};

LIME.PhongMaterial.prototype.get_Kd = function() {
  return this.Kd;
};

LIME.PhongMaterial.prototype.get_Ks = function() {
  return this.Ks;
};


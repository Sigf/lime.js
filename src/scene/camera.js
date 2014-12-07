LIME.Camera = function(context) {
  this.gl = context;

  this.position = [0.0, 0.0, 0.0];
  this.lookAt = [0.0, 0.0, 0.0];
  this.up = [0.0, 1.0, 0.0];
  this.angle = 0;

  this.phi = 0;
  this.theta = 0;

  this.viewMatrix = new Matrix4();
  this.projectionMatrix = new Matrix4();
  this.viewMatrix.setLookAt(
    this.position[0],
    this.position[1],
    this.position[2],
    this.lookAt[0],
    this.lookAt[1],
    this.lookAt[2],
    this.up[0],
    this.up[1],
    this.up[2]
  );
};

LIME.Camera.prototype.refresh = function() {
  this.viewMatrix.setLookAt(
    this.position[0],
    this.position[1],
    this.position[2],
    this.lookAt[0],
    this.lookAt[1],
    this.lookAt[2],
    this.up[0],
    this.up[1],
    this.up[2]
  );
};

LIME.Camera.prototype.setLookAt = function(x,y,z) {

  if(x === undefined) x = 0.0;
  if(y === undefined) y = 0.0;
  if(z === undefined) z = 0.0;

  this.lookAt = [x, y, z];
  this.refresh();
};

LIME.Camera.prototype.move = function(x,y,z) {

  if(x === undefined) x = 0.0;
  if(y === undefined) y = 0.0;
  if(z === undefined) z = 0.0;

  this.position = [x, y, z];
  this.refresh();
};

LIME.Camera.prototype.setUp = function(x,y,z) {

  if(x === undefined) x = 0.0;
  if(y === undefined) y = 0.0;
  if(z === undefined) z = 0.0;

  this.up = [x, y, z];
  this.refresh();
};

LIME.Camera.prototype.rotate_x = function(angle) {
  angle = ((Math.PI * 2) / 360) * angle;
  this.angle = angle;

  var x = this.position[0] + (Math.sin(angle) * 3.0);
  var y = this.position[1];
  var z = this.position[2] + (Math.cos(angle) * 3.0);
  this.lookAt = [x, y, z];

  this.refresh();
};

LIME.Camera.prototype.look_at_mouse = function(mouse_pos, speed) {

  var lon = 0;
  var lat = 0;
  var phi = 0;
  var tetha = 0;

  lon = mouse_pos[0] * speed;
  lat = mouse_pos[1] * speed;

  lat = Math.max( - 85, Math.min( 85, lat ) );
  phi = ( 90 - lat ) * Math.PI / 180;
  theta = ( 270 + lon ) * Math.PI / 180;

  this.phi = phi;
  this.theta = theta;

  this.lookAt[0] = this.position[0] + 100 * Math.sin( phi ) * Math.cos( theta );
  this.lookAt[1] = this.position[1] + 100 * Math.cos( phi );
  this.lookAt[2] = this.position[2] + 100 * Math.sin( phi ) * Math.sin( theta );

  this.refresh();
};

LIME.Camera.prototype.moveForward = function(step, angle) {
  angle = ((Math.PI * 2) / 360) * angle;
  var x = this.position[0] + (Math.sin(this.angle + angle) * step);
  var y = this.position[1];
  var z = this.position[2] + (Math.cos(this.angle + angle) * step);
  this.position = [x, y, z];
  this.refresh();
};

LIME.Camera.prototype.move_toward_mouse = function(step, angle) {
  angle = ((Math.PI * 2) / 360) * angle;
  var x = this.position[0] + (Math.sin(-this.theta + angle) * step);
  var y = this.position[1];
  var z = this.position[2] + (Math.cos(-this.theta + angle) * step);
  this.position = [x, y, z];
  this.refresh();
};

LIME.Camera.prototype.setPerspective = function(fov, aspect, near, far) {
  this.projectionMatrix.setPerspective(fov, aspect, near, far);
};

LIME.Camera.prototype.getViewMatrix = function() {
  return this.viewMatrix;
};

LIME.Camera.prototype.getProjectionMatrix = function() {
  return this.projectionMatrix;
};

LIME.Camera.prototype.getLookAt = function() {
  return this.lookAt;
};

LIME.Camera.prototype.getPosition = function() {
  return this.position;
};


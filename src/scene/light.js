// TODO
// - Add default values

LIME.Light = function(type) {
  this.direction = [0.0, -1.0, 0.0];
  this.light_color = [1.0, 1.0, 1.0];
  this.position = [0.0, 0.0, 0.0];
  this.type = type;
};

LIME.Light.prototype.setPosition = function(x, y, z) {
  this.position = [x, y, z];
};

LIME.Light.prototype.setDirection = function(x, y, z) {
  this.direction = [x, y, z];
};

LIME.Light.prototype.setColor = function(r, g, b) {
  this.light_color = [r, g, b];
};

LIME.Light.prototype.getDirection = function(){
  var direction = new Vector3(this.direction);
  direction.normalize();

  return direction;
};

LIME.Light.prototype.getColor = function(){
  return new Vector3(this.light_color);
};

LIME.Light.prototype.getPosition = function(){
  return new Vector3(this.position);
};


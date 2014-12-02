LIME.Light = function(type) {
  this.direction = [];
  this.light_color;
  this.position;
  this.type = type;
};

LIME.Light.prototype.setDirection = function(x, y, z) {
  if(this.type != LIME.directional) {
    console.log("setDircetion can only used for a directional light!");
    return 0;
  }

  this.direction = [];
  this.direction.push(x);
  this.direction.push(y);
  this.direction.push(z);
};

LIME.Light.prototype.setColor = function(r, g, b) {
  this.light_color = [];
  this.light_color.push(r);
  this.light_color.push(g);
  this.light_color.push(b);
};

LIME.Light.prototype.getDirection = function(){
  if(this.type != LIME.directional) {
    console.log("getDircetion can only used for a directional light!");
    return 0;
  }

  var direction = new Vector3(this.direction);
  direction.normalize();

  return direction;
};

LIME.Light.prototype.getColor = function(){
  return this.light_color;
};

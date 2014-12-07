LIME.Scene = function (canvasName) {
  this.canvas = document.getElementById(canvasName);
  this.context = getWebGLContext(this.canvas);
  this.scene_objects = [];
  this.scene_lights = [];
  this.mouse_x = 0.0;
  this.mouse_y = 0.0;

  this.context.clearColor(0.0, 0.0, 0.0, 1.0);
  this.context.enable(this.context.DEPTH_TEST);

  var self = this;

  this.canvas.onmousemove = function(ev ) {
    self.mouse_x = ev.clientX;
    self.mouse_y = ev.clientY;

    var rect = ev.target.getBoundingClientRect() ;

    self.mouse_x = ((self.mouse_x - rect.left) - self.canvas.width/2)/(self.canvas.width/2);
    self.mouse_y = (self.canvas.height/2 - (self.mouse_y - rect.top))/(self.canvas.height/2);
  }
};  

LIME.Scene.prototype.clearCanvas = function() {
  this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
};

LIME.Scene.prototype.setClearColor = function(r, g, b, a) {
  this.context.clearColor(r, g, b, a);
};

LIME.Scene.prototype.addObjectToScene = function(an_object) {
  this.scene_objects.push(an_object);
};

LIME.Scene.prototype.addLightToScene = function(a_light) {
  this.scene_lights.push(a_light);
};

LIME.Scene.prototype.draw = function() {

  for(var j = 0; j < this.scene_objects.length; j++) {
      this.scene_objects[j].draw(this.scene_lights[0]);
    }


  /*
  if(this.scene_lights.length == 0) {
    for(var j = 0; j < this.scene_objects.length; j++) {
      this.scene_objects[j].draw();
    }
  }

  else {
    for(var i = 0; i < this.scene_objects.length; i++) {
      for(var j = 0; j < this.scene_lights.length; j++) {
        this.scene_objects[i].draw(this.scene_lights[j]);
      }
    }
  }
  */
};

LIME.Scene.prototype.getMouseCoordinate = function() {
 return [this.mouse_x, this.mouse_y];
};

LIME.Scene.prototype.getAspectRatio = function() {
  return [this.canvas.width/this.canvas.height];
};

LIME.Scene.prototype.getContext = function() {
  return this.context;
};

LIME.Scene.prototype.getCanvas = function() {
  return this.canvas;
};


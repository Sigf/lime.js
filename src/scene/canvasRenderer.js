LIME.Scene = function (canvasName) {
  this.canvas = document.getElementById(canvasName);
  this.context = getWebGLContext(this.canvas);

  this.context.clearColor(0.0, 0.0, 0.0, 1.0);
  this.context.enable(this.context.DEPTH_TEST);
};
LIME.Scene.prototype.getContext = function() {
  return this.context;
};

LIME.Scene.prototype.getCanvas = function() {
  return this.canvas;
};

LIME.Scene.prototype.clearCanvas = function() {
  this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
};

LIME.Scene.prototype.setClearColor = function(r, g, b, a) {
  this.context.clearColor(r, g, b, a);
};

LIME.Scene.prototype.getMouseCoordinate = function(ev, canvas) {
  var x = ev.clientX;
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect() ;

 x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
 y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

 return [x, y];
};

LIME.Scene.prototype.getAspectRatio = function() {
  return [this.canvas.width/this.canvas.height, this.canvas.height/this.canvas.width];
};

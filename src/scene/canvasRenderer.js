LIME.Scene = function (canvasName) {
  this.canvas = document.getElementById(canvasName);
  this.context = getWebGLContext(this.canvas);

  this.context.clearColor(0.0, 0.0, 0.0, 1.0);
  this.context.enable(this.context.DEPTH_TEST);

  this.getContext = function() {
    return this.context;
  };

  this.getCanvas = function() {
    return this.canvas;
  };


  this.clearCanvas = function() {
    this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
  };

  this.setClearColor = function(r, g, b, a) {
    this.context.clearColor(r, g, b, a);
  };

  this.getMouseCoordinate = function(ev, canvas) {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect() ;

   x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
   y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

   return [x, y];
  };
};

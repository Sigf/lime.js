function main() {
   var myScene = new LIME.Scene('myCanvas');
   var gl = myScene.getContext();

   var wall_texture = "https://lh3.googleusercontent.com/-ijKutCBZEIk/VDSdtVNB2RI/AAAAAAAAATE/oTH8dy0NVew/s64/wall_tex.png";
   var wood_texture = "https://lh5.googleusercontent.com/-VULnf4KrH6c/VDSxtEP0RjI/AAAAAAAAATk/3Pqkr6IyUcs/s64/wood_tex.jpg";

   var wallGeo = new LIME.Geometry(myScene);
   var woodGeo = new LIME.Geometry(myScene);
   wallGeo.createRectangle(0.5, 0.5, 0.0);
   woodGeo.createRectangle(0.5, 0.5, 0.0);

   var woodMat = new LIME.FlatTextureMaterial(gl, wood_texture, 0);
   var wallMat = new LIME.FlatTextureMaterial(gl, wall_texture, 1);

   var wall = new LIME.Shape(wallGeo, wallMat, gl, LIME.drawTriangleFan);
   var wood = new LIME.Shape(woodGeo, woodMat, gl, LIME.drawTriangleFan);

   var wall_texCoord = [
      0.0, 0.0,
      0.0, 2.0,
      2.0, 2.0,
      2.0, 0.0
   ];

   var wood_texCoord = [
      0.0, 0.0,
      0.0, 1.0,
      1.0, 1.0,
      1.0, 0.0
   ];

   var tick = function() {
      requestAnimationFrame(tick);
      wall.rotate(0.1, 0.0, 0.0, 1.0);
      wood.rotate(0.1, 0.0, 0.0, 1.0);
      myScene.clearCanvas();
      wall.draw();
      wood.draw();
   }

   wall.setTexCoord(wall_texCoord);
   wood.setTexCoord(wood_texCoord);

   wall.setPosition(0.5, 0.0, 0.0);
   wood.setPosition(-0.5, 0.0, 0.0);
   myScene.setClearColor(0.9, 0.9, 0.9, 1.0);
   myScene.clearCanvas();
   tick();
}
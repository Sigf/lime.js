function main() {
   // point size is 0.025

   var scale = 1.2;

   var player_points = [
      0.0, 0.0, 0.0,
      0.0, 0.01*scale, 0.0,
      0.0, 0.02*scale, 0.0,
      0.0, 0.03*scale, 0.0,
      0.01*scale, 0.0, 0.0,
      0.01*scale, 0.01*scale, 0.0,
      0.01*scale, 0.02*scale, 0.0,
      0.01*scale, 0.03*scale, 0.0,
      0.01*scale, 0.04*scale, 0.0,
      0.02*scale, 0.0, 0.0,
      0.02*scale, 0.01*scale, 0.0,
      0.02*scale, 0.02*scale, 0.0,
      0.02*scale, 0.03*scale, 0.0,
      0.02*scale, 0.04*scale, 0.0,
      0.03*scale, 0.0, 0.0,
      0.03*scale, 0.01*scale, 0.0,
      0.03*scale, 0.02*scale, 0.0,
      0.03*scale, 0.03*scale, 0.0,
      0.03*scale, 0.04*scale, 0.0,
      0.04*scale, 0.0, 0.0,
      0.04*scale, 0.01*scale, 0.0,
      0.04*scale, 0.02*scale, 0.0,
      0.04*scale, 0.03*scale, 0.0,
      0.04*scale, 0.04*scale, 0.0,
      0.05*scale, 0.0, 0.0,
      0.05*scale, 0.01*scale, 0.0,
      0.05*scale, 0.02*scale, 0.0,
      0.05*scale, 0.03*scale, 0.0,
      0.05*scale, 0.04*scale, 0.0,
      0.05*scale, 0.05*scale, 0.0,
      0.05*scale, 0.06*scale, 0.0,
      0.06*scale, 0.0, 0.0,
      0.06*scale, 0.01*scale, 0.0,
      0.06*scale, 0.02*scale, 0.0,
      0.06*scale, 0.03*scale, 0.0,
      0.06*scale, 0.04*scale, 0.0,
      0.06*scale, 0.05*scale, 0.0,
      0.06*scale, 0.06*scale, 0.0,
      0.06*scale, 0.07*scale, 0.0,
      0.07*scale, 0.0, 0.0,
      0.07*scale, 0.01*scale, 0.0,
      0.07*scale, 0.02*scale, 0.0,
      0.07*scale, 0.03*scale, 0.0,
      0.07*scale, 0.04*scale, 0.0,
      0.07*scale, 0.05*scale, 0.0,
      0.07*scale, 0.06*scale, 0.0,
      0.08*scale, 0.0, 0.0,
      0.08*scale, 0.01*scale, 0.0,
      0.08*scale, 0.02*scale, 0.0,
      0.08*scale, 0.03*scale, 0.0,
      0.08*scale, 0.04*scale, 0.0,
      0.09*scale, 0.0, 0.0,
      0.09*scale, 0.01*scale, 0.0,
      0.09*scale, 0.02*scale, 0.0,
      0.09*scale, 0.03*scale, 0.0,
      0.09*scale, 0.04*scale, 0.0,
      0.1*scale, 0.0, 0.0,
      0.1*scale, 0.01*scale, 0.0,
      0.1*scale, 0.02*scale, 0.0,
      0.1*scale, 0.03*scale, 0.0,
      0.1*scale, 0.04*scale, 0.0,
      0.11*scale, 0.0, 0.0,
      0.11*scale, 0.01*scale, 0.0,
      0.11*scale, 0.02*scale, 0.0,
      0.11*scale, 0.03*scale, 0.0,
      0.11*scale, 0.04*scale, 0.0,
      0.12*scale, 0.0, 0.0,
      0.12*scale, 0.01*scale, 0.0,
      0.12*scale, 0.02*scale, 0.0,
      0.12*scale, 0.03*scale, 0.0

   ];

   var alien1_points = [
      0.0, 0.0, 0.0,
      0.0, 0.02*scale, 0.0,
      0.0, 0.03*scale, 0.0,
      0.01*scale, -0.01*scale, 0.0,
      0.01*scale, 0.01*scale, 0.0,
      0.01*scale, 0.02*scale, 0.0,
      0.01*scale, 0.03*scale, 0.0,
      0.01*scale, 0.04*scale, 0.0,
      0.02*scale, 0.02*scale, 0.0,
      0.02*scale, 0.04*scale, 0.0,
      0.02*scale, 0.05*scale, 0.0,
      0.03*scale, 0.01*scale, 0.0,
      0.03*scale, 0.02*scale, 0.0,
      0.03*scale, 0.03*scale, 0.0,
      0.03*scale, 0.04*scale, 0.0,
      0.03*scale, 0.05*scale, 0.0,
      0.03*scale, 0.06*scale, 0.0,
      0.04*scale, 0.01*scale, 0.0,
      0.04*scale, 0.02*scale, 0.0,
      0.04*scale, 0.03*scale, 0.0,
      0.04*scale, 0.04*scale, 0.0,
      0.04*scale, 0.05*scale, 0.0,
      0.04*scale, 0.06*scale, 0.0,
      0.05*scale, 0.02*scale, 0.0,
      0.05*scale, 0.04*scale, 0.0,
      0.05*scale, 0.05*scale, 0.0,
      0.06*scale, -0.01*scale, 0.0,
      0.06*scale, 0.01*scale, 0.0,
      0.06*scale, 0.02*scale, 0.0,
      0.06*scale, 0.03*scale, 0.0,
      0.06*scale, 0.04*scale, 0.0,
      0.07*scale, 0.0, 0.0,
      0.07*scale, 0.02*scale, 0.0,
      0.07*scale, 0.03*scale, 0.0,
   ];

   var alien1_points2 = [
      0.0, -0.01*scale, 0.0,
      0.0, 0.02*scale, 0.0,
      0.0, 0.03*scale, 0.0,
      0.01*scale, 0.0, 0.0,
      0.01*scale, 0.02*scale, 0.0,
      0.01*scale, 0.03*scale, 0.0,
      0.01*scale, 0.04*scale, 0.0,
      0.02*scale, -0.01*scale, 0.0,
      0.02*scale, 0.01*scale, 0.0,
      0.02*scale, 0.02*scale, 0.0,
      0.02*scale, 0.04*scale, 0.0,
      0.02*scale, 0.05*scale, 0.0,
      0.03*scale, 0.0, 0.0,
      0.03*scale, 0.02*scale, 0.0,
      0.03*scale, 0.03*scale, 0.0,
      0.03*scale, 0.04*scale, 0.0,
      0.03*scale, 0.05*scale, 0.0,
      0.03*scale, 0.06*scale, 0.0,
      0.04*scale, 0.0, 0.0,
      0.04*scale, 0.02*scale, 0.0,
      0.04*scale, 0.03*scale, 0.0,
      0.04*scale, 0.04*scale, 0.0,
      0.04*scale, 0.05*scale, 0.0,
      0.04*scale, 0.06*scale, 0.0,
      0.05*scale, -0.01*scale, 0.0,
      0.05*scale, 0.01*scale, 0.0,
      0.05*scale, 0.02*scale, 0.0,
      0.05*scale, 0.04*scale, 0.0,
      0.05*scale, 0.05*scale, 0.0,
      0.06*scale, 0.0, 0.0,
      0.06*scale, 0.02*scale, 0.0,
      0.06*scale, 0.03*scale, 0.0,
      0.06*scale, 0.04*scale, 0.0,
      0.07*scale, -0.01*scale, 0.0,
      0.07*scale, 0.02*scale, 0.0,
      0.07*scale, 0.03*scale, 0.0,
   ];

   var alien2_points = [
      0.0, 0.0, 0.0,
      0.0, 0.01*scale, 0.0,
      0.0, 0.02*scale, 0.0,
      0.01*scale, 0.02*scale, 0.0,
      0.01*scale, 0.03*scale, 0.0,
      0.02*scale, 0.0, 0.0,
      0.02*scale, 0.01*scale, 0.0,
      0.02*scale, 0.02*scale, 0.0,
      0.02*scale, 0.03*scale, 0.0,
      0.02*scale, 0.04*scale, 0.0,
      0.02*scale, 0.06*scale, 0.0,
      0.03*scale, -0.01*scale, 0.0,
      0.03*scale, 0.01*scale, 0.0,
      0.03*scale, 0.02*scale, 0.0,
      0.03*scale, 0.04*scale, 0.0,
      0.03*scale, 0.05*scale, 0.0,
      0.04*scale, -0.01*scale, 0.0,
      0.04*scale, 0.01*scale, 0.0,
      0.04*scale, 0.02*scale, 0.0,
      0.04*scale, 0.03*scale, 0.0,
      0.04*scale, 0.04*scale, 0.0,
      0.05*scale, 0.01*scale, 0.0,
      0.05*scale, 0.02*scale, 0.0,
      0.05*scale, 0.03*scale, 0.0,
      0.05*scale, 0.04*scale, 0.0,
      0.06*scale, -0.01*scale, 0.0,
      0.06*scale, 0.01*scale, 0.0,
      0.06*scale, 0.02*scale, 0.0,
      0.06*scale, 0.03*scale, 0.0,
      0.06*scale, 0.04*scale, 0.0,
      0.07*scale, -0.01*scale, 0.0,
      0.07*scale, 0.01*scale, 0.0,
      0.07*scale, 0.02*scale, 0.0,
      0.07*scale, 0.04*scale, 0.0,
      0.07*scale, 0.05*scale, 0.0,
      0.08*scale, 0.0, 0.0,
      0.08*scale, 0.01*scale, 0.0,
      0.08*scale, 0.02*scale, 0.0,
      0.08*scale, 0.03*scale, 0.0,
      0.08*scale, 0.04*scale, 0.0,
      0.08*scale, 0.06*scale, 0.0,
      0.09*scale, 0.02*scale, 0.0,
      0.09*scale, 0.03*scale, 0.0,
      0.1*scale, 0.0, 0.0,
      0.1*scale, 0.01*scale, 0.0,
      0.1*scale, 0.02*scale, 0.0
   ];

   var alien2_points2 = [
      0.0, 0.02*scale, 0.0,
      0.0, 0.03*scale, 0.0,
      0.0, 0.04*scale, 0.0,
      0.0, 0.05*scale, 0.0,
      0.01*scale, 0.01*scale, 0.0,
      0.01*scale, -0.01*scale, 0.0,
      0.01*scale, 0.02*scale, 0.0,
      0.01*scale, 0.03*scale, 0.0,
      0.02*scale, 0.0, 0.0,
      0.02*scale, 0.01*scale, 0.0,
      0.02*scale, 0.02*scale, 0.0,
      0.02*scale, 0.03*scale, 0.0,
      0.02*scale, 0.04*scale, 0.0,
      0.02*scale, 0.06*scale, 0.0,
      0.03*scale, 0.01*scale, 0.0,
      0.03*scale, 0.02*scale, 0.0,
      0.03*scale, 0.04*scale, 0.0,
      0.03*scale, 0.05*scale, 0.0,
      0.04*scale, 0.01*scale, 0.0,
      0.04*scale, 0.02*scale, 0.0,
      0.04*scale, 0.03*scale, 0.0,
      0.04*scale, 0.04*scale, 0.0,
      0.05*scale, 0.01*scale, 0.0,
      0.05*scale, 0.02*scale, 0.0,
      0.05*scale, 0.03*scale, 0.0,
      0.05*scale, 0.04*scale, 0.0,
      0.06*scale, 0.01*scale, 0.0,
      0.06*scale, 0.02*scale, 0.0,
      0.06*scale, 0.03*scale, 0.0,
      0.06*scale, 0.04*scale, 0.0,
      0.07*scale, 0.01*scale, 0.0,
      0.07*scale, 0.02*scale, 0.0,
      0.07*scale, 0.04*scale, 0.0,
      0.07*scale, 0.05*scale, 0.0,
      0.08*scale, 0.0, 0.0,
      0.08*scale, 0.01*scale, 0.0,
      0.08*scale, 0.02*scale, 0.0,
      0.08*scale, 0.03*scale, 0.0,
      0.08*scale, 0.04*scale, 0.0,
      0.08*scale, 0.06*scale, 0.0,
      0.09*scale, 0.01*scale, 0.0,
      0.09*scale, -0.01*scale, 0.0,
      0.09*scale, 0.02*scale, 0.0,
      0.09*scale, 0.03*scale, 0.0,
      0.1*scale, 0.02*scale, 0.0,
      0.1*scale, 0.03*scale, 0.0,
      0.1*scale, 0.04*scale, 0.0,
      0.1*scale, 0.05*scale, 0.0,
   ];

   var alien3_points = [
      0.0, 0.01*scale, 0.0,
      0.0, 0.02*scale, 0.0,
      0.0, 0.03*scale, 0.0,
      0.01*scale, -0.01*scale, 0.0,
      0.01*scale, 0.01*scale, 0.0,
      0.01*scale, 0.02*scale, 0.0,
      0.01*scale, 0.03*scale, 0.0,
      0.01*scale, 0.04*scale, 0.0,
      0.02*scale, -0.01*scale, 0.0,
      0.02*scale, -0.02*scale, 0.0,
      0.02*scale, 0.0, 0.0,
      0.02*scale, 0.01*scale, 0.0,
      0.02*scale, 0.02*scale, 0.0,
      0.02*scale, 0.03*scale, 0.0,
      0.02*scale, 0.04*scale, 0.0,
      0.03*scale, 0.0, 0.0,
      0.03*scale, -0.02*scale, 0.0,
      0.03*scale, 0.01*scale, 0.0,
      0.03*scale, 0.03*scale, 0.0,
      0.03*scale, 0.04*scale, 0.0,
      0.04*scale, 0.0, 0.0,
      0.04*scale, 0.01*scale, 0.0,
      0.04*scale, 0.03*scale, 0.0,
      0.04*scale, 0.04*scale, 0.0,
      0.04*scale, 0.05*scale, 0.0,
      0.05*scale, -0.01*scale, 0.0,
      0.05*scale, 0.01*scale, 0.0,
      0.05*scale, 0.02*scale, 0.0,
      0.05*scale, 0.03*scale, 0.0,
      0.05*scale, 0.04*scale, 0.0,
      0.05*scale, 0.05*scale, 0.0,
      0.06*scale, -0.01*scale, 0.0,
      0.06*scale, 0.01*scale, 0.0,
      0.06*scale, 0.02*scale, 0.0,
      0.06*scale, 0.03*scale, 0.0,
      0.06*scale, 0.04*scale, 0.0,
      0.06*scale, 0.05*scale, 0.0,
      0.07*scale, 0.0, 0.0,
      0.07*scale, 0.01*scale, 0.0,
      0.07*scale, 0.03*scale, 0.0,
      0.07*scale, 0.04*scale, 0.0,
      0.07*scale, 0.05*scale, 0.0,
      0.08*scale, 0.0, 0.0,
      0.08*scale, -0.02*scale, 0.0,
      0.08*scale, 0.01*scale, 0.0,
      0.08*scale, 0.03*scale, 0.0,
      0.08*scale, 0.04*scale, 0.0,
      0.09*scale, -0.01*scale, 0.0,
      0.09*scale, -0.02*scale, 0.0,
      0.09*scale, 0.0, 0.0,
      0.09*scale, 0.01*scale, 0.0,
      0.09*scale, 0.02*scale, 0.0,
      0.09*scale, 0.03*scale, 0.0,
      0.09*scale, 0.04*scale, 0.0,
      0.1*scale, -0.01*scale, 0.0,
      0.1*scale, 0.01*scale, 0.0,
      0.1*scale, 0.02*scale, 0.0,
      0.1*scale, 0.03*scale, 0.0,
      0.1*scale, 0.04*scale, 0.0,
      0.11*scale, 0.01*scale, 0.0,
      0.11*scale, 0.02*scale, 0.0,
      0.11*scale, 0.03*scale, 0.0
   ];

   var alien3_points2 = [
      0.0, 0.01*scale, 0.0,
      0.0, 0.02*scale, 0.0,
      0.0, 0.03*scale, 0.0,
      0.0, -0.02*scale, 0.0,
      0.01*scale, -0.02*scale, 0.0,
      0.01*scale, 0.01*scale, 0.0,
      0.01*scale, 0.02*scale, 0.0,
      0.01*scale, 0.03*scale, 0.0,
      0.01*scale, 0.04*scale, 0.0,
      0.02*scale, -0.01*scale, 0.0,
      0.02*scale, 0.01*scale, 0.0,
      0.02*scale, 0.02*scale, 0.0,
      0.02*scale, 0.03*scale, 0.0,
      0.02*scale, 0.04*scale, 0.0,
      0.03*scale, -0.01*scale, 0.0,
      0.03*scale, 0.0, 0.0,
      0.03*scale, 0.01*scale, 0.0,
      0.03*scale, 0.03*scale, 0.0,
      0.03*scale, 0.04*scale, 0.0,
      0.04*scale, 0.0, 0.0,
      0.04*scale, 0.01*scale, 0.0,
      0.04*scale, 0.03*scale, 0.0,
      0.04*scale, 0.04*scale, 0.0,
      0.04*scale, 0.05*scale, 0.0,
      0.05*scale, -0.01*scale, 0.0,
      0.05*scale, 0.01*scale, 0.0,
      0.05*scale, 0.02*scale, 0.0,
      0.05*scale, 0.03*scale, 0.0,
      0.05*scale, 0.04*scale, 0.0,
      0.05*scale, 0.05*scale, 0.0,
      0.06*scale, -0.01*scale, 0.0,
      0.06*scale, 0.01*scale, 0.0,
      0.06*scale, 0.02*scale, 0.0,
      0.06*scale, 0.03*scale, 0.0,
      0.06*scale, 0.04*scale, 0.0,
      0.06*scale, 0.05*scale, 0.0,
      0.07*scale, 0.0, 0.0,
      0.07*scale, 0.01*scale, 0.0,
      0.07*scale, 0.03*scale, 0.0,
      0.07*scale, 0.04*scale, 0.0,
      0.07*scale, 0.05*scale, 0.0,
      0.08*scale, -0.01*scale, 0.0,
      0.08*scale, 0.0, 0.0,
      0.08*scale, 0.01*scale, 0.0,
      0.08*scale, 0.03*scale, 0.0,
      0.08*scale, 0.04*scale, 0.0,
      0.09*scale, -0.01*scale, 0.0,
      0.09*scale, 0.01*scale, 0.0,
      0.09*scale, 0.02*scale, 0.0,
      0.09*scale, 0.03*scale, 0.0,
      0.09*scale, 0.04*scale, 0.0,
      0.1*scale, -0.02*scale, 0.0,
      0.1*scale, 0.01*scale, 0.0,
      0.1*scale, 0.02*scale, 0.0,
      0.1*scale, 0.03*scale, 0.0,
      0.1*scale, 0.04*scale, 0.0,
      0.11*scale, 0.01*scale, 0.0,
      0.11*scale, 0.02*scale, 0.0,
      0.11*scale, 0.03*scale, 0.0,
      0.11*scale, -0.02*scale, 0.0
   ];

   var playerBullet_points = [
      0.0, 0.0, 0.1,
      0.0, 0.01*scale, 0.1,
      0.0, 0.02*scale, 0.1
   ];

   var alienBullet_points = [
      0.0, 0.0, 0.0,
      -0.01*scale, 0.01*scale, 0.0,
      0.0, 0.02*scale, 0.0,
      0.01*scale, 0.03*scale, 0.0,
      0.0, 0.04*scale, 0.0,
      -0.01*scale, 0.05*scale, 0.0,
      0.0, 0.06*scale, 0.0,
   ]

   var blockFull_points = [
      0.0, 0.0, 0.0,
      0.0, 0.01*scale, 0.0,
      0.0, 0.02*scale, 0.0,
      0.0, 0.03*scale, 0.0,
      0.01*scale, 0.0, 0.0,
      0.01*scale, 0.01*scale, 0.0,
      0.01*scale, 0.02*scale, 0.0,
      0.01*scale, 0.03*scale, 0.0,
      0.02*scale, 0.0, 0.0,
      0.02*scale, 0.01*scale, 0.0,
      0.02*scale, 0.02*scale, 0.0,
      0.02*scale, 0.03*scale, 0.0,
      0.03*scale, 0.0, 0.0,
      0.03*scale, 0.01*scale, 0.0,
      0.03*scale, 0.02*scale, 0.0,
      0.03*scale, 0.03*scale, 0.0
   ]

   var myScene = new LIME.Scene('myCanvas');
   var gl = myScene.getContext();
   myScene.setClearColor(0.0, 0.0, 0.0, 1.0);
   myScene.clearCanvas();

   var alien1_points_total = alien1_points.concat(alien1_points2);
   var alien2_points_total = alien2_points.concat(alien2_points2);
   var alien3_points_total = alien3_points.concat(alien3_points2);

   var playerGeo = new LIME.Geometry(myScene);
   playerGeo.addPoints(player_points, true);
   var alien1Geo = new LIME.Geometry(myScene);
   alien1Geo.addPoints(alien1_points_total, true);
   var alien2Geo = new LIME.Geometry(myScene);
   alien2Geo.addPoints(alien2_points_total, true);
   var alien3Geo = new LIME.Geometry(myScene);
   alien3Geo.addPoints(alien3_points_total, true);
   var playerBulletGeo = new LIME.Geometry(myScene);
   playerBulletGeo.addPoints(playerBullet_points, true);
   var alienBulletGeo = new LIME.Geometry(myScene);
   alienBulletGeo.addPoints(alienBullet_points, true);
   var blockFullGeo = new LIME.Geometry(myScene);
   blockFullGeo.addPoints(blockFull_points, true);

   var playerMat = new LIME.FlatMaterial(gl, 0.0, 1.0, 0.0, 1.0);
   var alien1Mat = new LIME.FlatMaterial(gl, 1.0, 1.0, 1.0, 1.0);
   var alien2Mat = new LIME.FlatMaterial(gl, 1.0, 1.0, 1.0, 1.0);
   var alien3Mat = new LIME.FlatMaterial(gl, 1.0, 1.0, 1.0, 1.0);
   var playerBulletMat = new LIME.FlatMaterial(gl, 0.0, 1.0, 0.0, 1.0);
   var alienBulletMat = new LIME.FlatMaterial(gl, 1.0, 1.0, 1.0, 1.0);
   var blockFullMat = new LIME.FlatMaterial(gl, 0.0, 1.0, 0.0, 1.0);

   var player = new LIME.Shape(playerGeo, playerMat, gl, LIME.drawPoints);
   player.setPosition(0.0, -0.9, 0.0)

   /*var block = new LIME.Shape(blockFullGeo, blockFullMat, gl, LIME.drawPoints);
   block.setPosition(0.0, -0.5, 0.0);*/

   var SWARM_WIDTH = 8;
   var PLAYER_SPEED = 1.6;
   var BULLET_SPEED = 1.5;
   var ALIEN_SPEED = 1000;

   var alien1_frame1 = 34;
   var alien1_frame2 = 36;
   var alien1_current_offset = 0;
   var alien1_current_frameSize = alien1_frame1;

   var alien2_frame1 = 46;
   var alien2_frame2 = 48;
   var alien2_current_offset = 0;
   var alien2_current_frameSize = alien2_frame1;

   var alien3_frame1 = 62;
   var alien3_frame2 = 60;
   var alien3_current_offset = 0;
   var alien3_current_frameSize = alien3_frame1;

   var player_bullets = [];
   var alien_bullets = [];
   var aliens = [];
   var bunker1 = [];
   var bunker2 = [];
   var bunker3 = [];

   var alien_state = "going_left";
   var player_state = "idle"
   var alien_switch_direction = false;
   var swarm_current_width = SWARM_WIDTH;

   var time = Date.now();

   var createCollumn = function(xPos, yPos, spacing) {
      var column = [];

      var alien1 = new Alien(1, alien1Geo, alien1Mat, gl, LIME.drawPoints);
      alien1.mesh.setPosition(xPos+0.02, yPos + (spacing*2), 0.0);
      alien1.mesh.generateHitbox();

      var alien2 = new Alien(2, alien2Geo, alien2Mat, gl, LIME.drawPoints);
      alien2.mesh.setPosition(xPos, yPos + spacing, 0.0);
      alien2.mesh.generateHitbox();

      var alien3 = new Alien(3, alien3Geo, alien3Mat, gl, LIME.drawPoints);
      alien3.mesh.setPosition(xPos, yPos , 0.0);
      alien3.mesh.generateHitbox();

      column.push(alien1);
      column.push(alien2);
      column.push(alien3);

      aliens.push(column);
   }

   var createBunker = function(xPos, yPos) {
   }

   for(var i = 0; i < SWARM_WIDTH; i++) {
      createCollumn(-0.75 + (0.2 * i), 0.5, 0.15);
   }

   var moveSwarm = function(x, y, z) {
      for (var i = 0; i < aliens.length; i++) {
         for (var j = 0; j < aliens[i].length; j++) {
            aliens[i][j].mesh.translate(x, y, z);
            aliens[i][j].mesh.generateHitbox();
            var alien_pos = aliens[i][j].mesh.getHitbox();
            if(alien_pos[0] <= -0.9 || alien_pos[0] >= 0.8) alien_switch_direction = true;
         }
      }
   }

   var aliens_move = function(speed) {
      ALIEN_SPEED = 100 * (aliens.length + 1);
      setTimeout(aliens_move, ALIEN_SPEED);

      if(alien1_current_offset == 0) alien1_current_offset = alien1_frame1;
      else alien1_current_offset = 0;
      if(alien1_current_frameSize == alien1_frame1) alien1_current_frameSize = alien1_frame2;
      else alien1_current_frameSize = alien1_frame1;

      if(alien2_current_offset == 0) alien2_current_offset = alien2_frame1;
      else alien2_current_offset = 0;
      if(alien2_current_frameSize == alien2_frame1) alien2_current_frameSize = alien2_frame2;
      else alien2_current_frameSize = alien2_frame1;

      if(alien3_current_offset == 0) alien3_current_offset = alien3_frame1;
      else alien3_current_offset = 0;
      if(alien3_current_frameSize == alien3_frame1) alien3_current_frameSize = alien3_frame2;
      else alien3_current_frameSize = alien3_frame1;


      if(alien_switch_direction) {
         if (alien_state == "going_left") alien_state = "going_right";
         else alien_state = "going_left";

         moveSwarm(0.0, -0.1, 0.0);

         alien_switch_direction = false;
      }

      else if (alien_state == "going_left") {
         moveSwarm(-0.1, 0.0, 0.0);
      }
      else if (alien_state == "going_right") {
         moveSwarm(0.1, 0.0, 0.0);
      }
   }

   var aliens_shoot = function() {
      var index = Math.floor(Math.random() * swarm_current_width);
      var front = aliens[index].length;
      var alien_pos = aliens[index][front-1].mesh.getLocation();

      var bullet = new LIME.Shape(alienBulletGeo, alienBulletMat, gl, LIME.drawPoints);
      bullet.setPosition(alien_pos[0]+0.08, alien_pos[1], 0.0);
      alien_bullets.push(bullet);
      setTimeout(aliens_shoot, Math.random()*5000);
   }

   document.onkeydown = function(ev) {
      if(event.keyCode == 68) {
         player_state = "going_right";
      }
      else if (event.keyCode == 65) {
         player_state = "going_left";
      } 

      if (event.keyCode == 32) {
         var player_pos = player.getLocation();
         var bullet = new LIME.Shape(playerBulletGeo, playerBulletMat, gl, LIME.drawPoints);
         bullet.setPosition(player_pos[0]+0.07, player_pos[1]+0.06, 0.0);
         player_bullets.push(bullet);
      }
   }

   document.onkeyup = function(ev) {
      if(event.keyCode == 68) {
         player_state = "idle";
      }
      else if (event.keyCode == 65) {
         player_state = "idle";
      } 
   }

   var tick = function () {
      myScene.clearCanvas();
      var now = Date.now();
      var elapsed = now - time;

      if (player_state == "going_left") {
         player.translate(-(elapsed)/(1000/PLAYER_SPEED), 0.0, 0.0);
      }

      if (player_state == "going_right") {
         player.translate((elapsed)/(1000/PLAYER_SPEED), 0.0, 0.0);
      }

      for(var i = 0; i < player_bullets.length; i++) {
         var bulletPos = player_bullets[i].getLocation();
         player_bullets[i].translate(0.0, (elapsed)/(1000/BULLET_SPEED), 0.0);
         player_bullets[i].draw();
         if (bulletPos[1] >= 1.0) {
            player_bullets.splice(i, 1);
            i--;
         }
         for(var j = 0; j < aliens.length; j++) {
            var front = aliens[j].length;
            var hitBox = aliens[j][front-1].mesh.getHitbox();
            if(bulletPos[0] <= hitBox[2] && bulletPos[0] >= hitBox[0] && bulletPos[1]+0.05 <= hitBox[3] && bulletPos[1]+0.05 >= hitBox[1]) {
               aliens[j].splice(front, 1);
               player_bullets.splice(i, 1);
               i--;
               aliens[j].splice(front-1, 1);
               if(aliens[j].length == 0) {
                  aliens.splice(j, 1);
                  swarm_current_width--;
                  j--;
               }
            }
         }
      }

      for(var i = 0; i < alien_bullets.length; i++) {
         var bulletPos = alien_bullets[i].getLocation();
         alien_bullets[i].translate(0.0, -(elapsed)/(1000/BULLET_SPEED), 0.0);
         alien_bullets[i].draw();
         if (bulletPos[1] <= -1.0) {
            alien_bullets.splice(i, 1);
            i--;
         }
      }

      for(var i = 0; i < aliens.length; i++) {
         for(var j = 0; j < aliens[i].length; j++) {
            if (aliens[i][j].getType() == 1)
               aliens[i][j].mesh.draw(alien1_current_offset, alien1_current_frameSize);
            else if (aliens[i][j].getType() == 2)
               aliens[i][j].mesh.draw(alien2_current_offset, alien2_current_frameSize);
            else if (aliens[i][j].getType() == 3)
               aliens[i][j].mesh.draw(alien3_current_offset, alien3_current_frameSize);
         }
      }

      player.draw();
      //block.draw();
      time = now;

      requestAnimationFrame(tick);
   }
   tick();

   setTimeout(aliens_move, ALIEN_SPEED);
   setTimeout(aliens_shoot, Math.random()*5000);
}

Alien = function(type, geo, mat, gl, draw) {
   this.type = type;
   this.geometry = geo;
   this.material = mat;
   this.context = gl;
   this.drawType = draw;
   this.mesh = new LIME.Shape(this.geometry, this.material, this.context, this.drawType);

   this.getType = function() {
      return this.type;
   }
}

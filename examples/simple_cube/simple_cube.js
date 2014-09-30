function main() {
	var myScene = new LIME.Scene('myCanvas');
	var gl = myScene.getContext();

	var cubeGeometry = new LIME.Geometry(myScene);
	//cubeGeometry.createCube(0.5,0.5,5.0);
	//cubeGeometry.createRectangle(0.5, 0.5, 0.0);
	cubeGeometry.createCircle(0.2, 6);

	var cubeMaterial = new LIME.FlatShader(cubeGeometry, gl, 1.0, 0.0, 0.0, 1.0);

	var cube = new LIME.Shape(cubeGeometry, cubeMaterial, gl, LIME.drwaPoints);
	cube.setPosition(0.0, 0.0, 0.0);

	var ratio = myScene.getAspectRatio();
	console.log(ratio[0]);
	console.log(ratio[1]);

	myScene.setClearColor(0.9, 0.9, 0.9, 1.0);
	myScene.clearCanvas();
	cube.draw();
}
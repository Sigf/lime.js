function main() {
	var myScene = new LIME.Scene('myCanvas');
	var gl = myScene.getContext();

	var cubeGeometry = new LIME.Geometry();
	cubeGeometry.createRectangle(0.5,0.5,0.0);

	var cubeMaterial = new LIME.FlatShader(cubeGeometry, gl, 1.0, 0.0, 0.0, 1.0);

	var cube = new LIME.Shape(cubeGeometry, cubeMaterial, gl, LIME.drawTriangleFan);
	cube.setPosition(0.0, 0.0, 0.0);

	myScene.setClearColor(0.9, 0.9, 0.9, 1.0);
	myScene.clearCanvas();
	cube.draw();
}
createAttribLocation = function(gl, program, name) {
	attrib_pointer = gl.getAttribLocation(program, name);
	   if (attrib_pointer < 0) {
	      console.log('Failed to get the storage location of ' + name + ');');
	      return 0;
	   }
	return attrib_pointer;
}

createUniformLocation = function(gl, program, name) {
	attrib_pointer = gl.getUniformLocation(program, name);
	   if (!attrib_pointer) {
	      console.log('Failed to get the storage location of ' + name + ');');
	      return 0;
	   }
	return attrib_pointer;
}

hexToColorArray = function(str) {
	var r = str.substring(1,4);
	var g = str.substring(3,5);
	var b = str.substring(5,7);

	r = parseInt(r, 16);
	g = parseInt(g, 16);
	b = parseInt(b, 16);

	r /= 255;
	g /= 255;
	b /= 255;

	var arr = [r, g, b];
	return arr;
}

hexToColorVector = function(str) {
	var r = str.substring(1,3);
	var g = str.substring(3,5);
	var b = str.substring(5,7);

	r = parseInt(r, 16);
	g = parseInt(g, 16);
	b = parseInt(b, 16);

	r /= 255;
	g /= 255;
	b /= 255;

	var arr = [r, g, b];
	return new Vector3(arr);
}


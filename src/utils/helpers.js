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


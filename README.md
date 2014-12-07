lime.js
=======

WebGL rendering framework that I am making to learn about WebGL and good project organization.

Credits:
-----
* I used some utilities libraries taken from the book "WebGL Programming Guide" by Kouichi Matsuda and Rodger Lea

* I am trying to emulate and learn from the coding style of the three.js library made by mrdoob.

Reference:
----
I hosted the compiled file here: http://www.ecst.csuchico.edu/~shutt/lime1_1.js
It can easily be referenced on a webpage using that link.

Features so far:
-----
1.0
===
* Can draw simple shapes
* Color can be changed
* Shapes can be scaled, rotated and translated
* Shapes transformation can be animated

1.1
===
* Shapes center can be moved
* Flat color material doesn't need geometry input
* Everything is prototyped

1.2
===
* Adds texture materials

1.3
===
* Adds Cameras! Can be set to perspective and edit the up vector, lookat and position
* Cameras can be set to look at cursor and move toward it, aka first person controls
* The draw calls for shapes are more efficient by moving some function calls to init stage
* Adds more example
* Adds lights

1.4
===
* Major Changes on how the different classes work. This update is mostly cleanup.
* Adds Phong material

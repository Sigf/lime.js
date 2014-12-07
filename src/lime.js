// @author Sebastien Hutt

var LIME = { REVISION: '04' };

// draw type constants
LIME.drawPoints = 0;
LIME.drawLines = 1;
LIME.drawLineStrip = 2;
LIME.drawLineLoop = 3;
LIME.drawTriangles = 4;
LIME.drawTriangleStrip = 5;
LIME.drawTriangleFan = 6;

// material type constants
LIME.flatMaterial = 0;
LIME.perPixelColorMaterial = 1;
LIME.flatTextureMaterial = 2;
LIME.PhongShader = 3;

LIME.currentTextureUnit = 0;

// light types
LIME.ambiant = 0;
LIME.directional = 1;
LIME.point = 2;

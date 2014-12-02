// @author Sebastien Hutt

var LIME = { REVISION: '03' };

// draw type constants
LIME.drawPoints = 0;
LIME.drawLines = 1;
LIME.drawLineStrip = 2;
LIME.drawLineLoop = 3;
LIME.drawTriangles = 4;
LIME.drawTriangleStrip = 5;
LIME.drawTriangleFan = 6;

// geometry type constants
LIME.faltMaterial = 0;
LIME.perPixelColorMaterial = 1;
LIME.flatTextureMaterial = 2;
LIME.currentTextureUnit = 0;

// light types
LIME.ambiant = 0;
LIME.directional = 1;
LIME.point = 2;
precision mediump float;

uniform sampler2D u_imageTarget;
uniform sampler2D u_imageMask;
uniform vec2 u_resolution;

varying vec2 v_texCoord;
float PI = 3.14159265358979323846264;
float E = 2.71828182845904523536028;

float threshold = 0.5;
float w = 0.2;

void main() {
  vec2 iUV = vec2(1.0 - v_texCoord.x, v_texCoord.y);
  float d = texture2D(u_imageMask, iUV).a;
  // Gausian peak filter.
  float dd = pow(E, - pow((d - threshold) / w, 2.0));
  vec4 c = texture2D(u_imageTarget, v_texCoord);
  gl_FragColor = vec4(c.r, c.g * (1. + dd * 2.0), c.b, 1.0);
}
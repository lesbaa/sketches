#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#define noiseScale 150.0 
#define RADIUS 150.0 

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uTime;
uniform float uTransitionProgress;
uniform vec2 uMouse;


void main() {
  float sinT = sin(uTransitionProgress) / 1.5;
  // TODO this could maybe optimised to not call the noise function if not needed
  // float dist = distance(gl_FragCoord.xy, uMouse) / 75.0;
  float offset = (snoise3(vec3(gl_FragCoord.xy / noiseScale, uTime / 20.0)) / 100.0) * 10.0;
  vec4 color = vTextureCoord.y < sinT + offset
    ? texture2D(uSampler, vec2(vTextureCoord.x, sinT + offset))
    : texture2D(uSampler, vTextureCoord);


  float r = color.r;
  float g = color.g;
  float b = color.b;
  float a = color.a;
  
  gl_FragColor = vec4(
    r,
    g,
    b,
    a
  );
}
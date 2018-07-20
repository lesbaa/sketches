#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#define noiseScale 50.0 
#define RADIUS 150.0 

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uSamplerTwo;
uniform float uTime;
uniform float uTransitionProgress;
uniform vec2 uMouse;


void main() {
  // TODO this could maybe optimised to not call the noise function if not needed
  float normalisedTime = uTime / 5.0;

  vec4 maskColor = texture2D(uSamplerTwo, vTextureCoord.xy);

  float r = snoise3(vec3((gl_FragCoord.xy * maskColor.r) / 100.0, normalisedTime)) > 0.3 ? 1.0 : 0.5;
  float g = snoise3(vec3((gl_FragCoord.xy * maskColor.g) / 100.0, normalisedTime + 100.0)) > 0.3 ? 1.0 : 0.5;
  float b = snoise3(vec3((gl_FragCoord.xy * maskColor.b) / 100.0, normalisedTime + 200.0)) > 0.3 ? 1.0 : 0.5;
  float a = maskColor.a;
  
  gl_FragColor = vec4(
    r,
    g,
    b,
    a
  );

}
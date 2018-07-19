#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#define noiseScale 50.0 
#define RADIUS 150.0 

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uTime;
uniform float uTransitionProgress;
uniform vec2 uMouse;


void main() {
  // TODO this could maybe optimised to not call the noise function if not needed
  float normalisedTime = uTime / 5.0;
  float noiseR = snoise3(vec3(gl_FragCoord.xy / 200.0, normalisedTime));
  float noiseG = snoise3(vec3(gl_FragCoord.xy / 200.0, normalisedTime + 100.0));
  float noiseB = snoise3(vec3(gl_FragCoord.xy / 200.0, normalisedTime + 200.0));

  vec4 color = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));

  float r = noiseR > 0.5 ? 1.0 : 0.5;
  float g = noiseG > 0.5 ? 1.0 : 0.5;
  float b = noiseB > 0.5 ? 1.0 : 0.5;
  float a = color.a;
  
  gl_FragColor = vec4(
    r,
    g,
    b,
    a
  );

}
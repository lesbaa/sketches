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
  // float dist = distance(gl_FragCoord.xy, uMouse) / 75.0;
  float noise = (snoise3(vec3(gl_FragCoord.xy / noiseScale, uTime / 20.0)) / 100.0) * 10.0;
  float offset = mix(noise, 0.0, uTransitionProgress);
  float offsetOver2 = offset / 2.0;
  bool mask = uTransitionProgress < noise * 4.0;

  vec4 color = texture2D(uSampler, vec2(vTextureCoord.x - offset, vTextureCoord.y + offset));

  float r = mask ? 0.0 : color.r;
  float g = mask ? 0.0 : color.g;
  float b = mask ? 0.0 : color.b;
  float a = mask ? 0.0 : color.a;
  
  gl_FragColor = vec4(
    r,
    g,
    b,
    a
  );
}
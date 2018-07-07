#define noiseScale 150.0 
#define RADIUS 50.0 

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uTime;
uniform vec2 uMouse;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 

void main() {

  // TODO this could maybe optimised to not call the noise function if not needed
  float dist = distance(gl_FragCoord.xy, uMouse) / 200.0;
  float noiseValue = snoise3(vec3(gl_FragCoord.xy / noiseScale, uTime / 10.0));
  float offset = pow(mix(0.0, noiseValue, dist), 3.0);

  vec4 color = texture2D(uSampler, vTextureCoord + offset - offset / 2.0);

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
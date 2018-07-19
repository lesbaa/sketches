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
  float normalisedTime = uTime;
  float noise = (snoise3(vec3(gl_FragCoord.xy / 200.0, normalisedTime)) - .5) / 25.0;

  vec4 video = texture2D(uSamplerTwo, vec2(vTextureCoord.x + noise + 0.175, vTextureCoord.y / 1.5 + 0.175));
  vec4 color = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));

  float r = video.r;
  float g = video.g;
  float b = video.b;
  float a = color.a;
  
  gl_FragColor = vec4(
    r,
    g,
    b,
    a
  );

}
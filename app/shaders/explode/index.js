import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'

export default {
  uniforms: {
    'uTime': { value: 0.0 },
    'uExplodeAmount': { value: 0.0 },
  },
  vertex: vertexShader,
  fragment: fragmentShader,
}
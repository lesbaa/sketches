import fragment from './frag.glsl'
import vertex from './vert.glsl'

export default {
  fragment,
  vertex,
  uniforms: {
    uTime: {
      type: 'f',
      value: 0,
    },
    uMouse: {
      type: 'v2',
      value: [0, 0],
    },
    uTransitionProgress: {
      type: 'v2',
      value: 0,
    },
  },
}
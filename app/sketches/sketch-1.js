import * as PIXI from 'pixi.js'
import {
  geom,
} from 'toxiclibsjs'
import customShader from '../shaders/one'
import Particle from '../classes/Particle.class'

const { Vec2D } = geom

class sketch1 {
  constructor(selector) {
    this.c = document.querySelector(selector)
    this.c.width = window.innerWidth
    this.c.height = window.innerHeight
    this.vMouse = new Vec2D(1,0)
  }

  init = () => {
    console.log('sketch-1 running')

    this.app = new PIXI.Application({
      view: this.c,
      width: this.c.width,
      height: this.c.height,
      transparent: true,
    })

    // this.app.stage.filters = [
    //   new PIXI.Filter('', customShader.fragment, customShader.uniforms),
    // ]

    this.sprites = []

    for (let i = 0; i < 50; i++) {
      const x = 100
      const y = 100
      const z = Math.random() * 30
      const dx = Math.random()
      const dy = Math.random()

      this.sprites.push(
        new Particle({
          x,
          y,
          z,
          dx,
          dy,
          container: this.app.stage,
          bounds: {
            xMax: window.innerWidth + 100,
            xMin: -100,
            yMax: window.innerHeight + 100,
            yMin: -100,
          },
        })
      )
      
    }

    this.app.renderer.autoResize = true
    this.app.renderer.resize(window.innerWidth, window.innerHeight)

    this.animate()
    document.addEventListener('mousemove', ({ clientX, clientY }) => {
      this.mouse
    })
  }

  animate = (t) => {
    requestAnimationFrame(this.animate)
    for (let i = 0; i < this.sprites.length; i++) {
      const sprite = this.sprites[i]
      sprite.update()
      if (sprite.isDead) sprite.rebirth
    }
  }

}

export default new sketch1('#sketch-1')
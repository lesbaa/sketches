import {
  Application,
  Sprite,
  Filter,
  Texture,
  Point,
  mesh,
} from 'pixi.js'

import customShader from '../shaders/one'

class sketch1 {
  constructor(selector) {
    this.c = document.querySelector(selector)
    this.c.width = window.innerWidth
    this.c.height = window.innerHeight
    this.t = 0
  }

  init = () => {
    console.log('sketch-1 running')

    this.app = new Application({
      view: this.c,
      width: this.c.width,
      height: this.c.height,
      transparent: true,
      antialias: true,
    })

    this.app.renderer.autoResize = true
    this.app.renderer.resize(window.innerWidth, window.innerHeight)
    
    this.initBg()
    this.initSprite()
    this.initFilter()
    this.app.ticker.add(this.animate)
  }

  initFilter = () => {
    this.filter = new Filter('', customShader.fragment, customShader.uniforms)
    this.app.stage.filters = [
      this.filter,
    ]

    window.addEventListener('mousemove', ({ clientX, clientY }) => {
      this.filter.uniforms.uMouse[0] = clientX
      this.filter.uniforms.uMouse[1] = this.app.screen.height - clientY
    })
  }

  initBg = () => {
    const background = Sprite.fromImage('static/img/bg.1.png')
    background.width = this.app.screen.width
    background.height = this.app.screen.height
    this.app.stage.addChild(background)
  }
  
  initSprite = () => {
    
  }

  animate = () => {
    this.t += 0.1
    const t = this.t

    this.filter.uniforms.uTime += 0.01
  }

}

export default new sketch1('#sketch-1')
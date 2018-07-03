import {
  Application,
  Sprite,
  Filter,
} from 'pixi.js'

import customShader from '../shaders/one'

class sketch1 {
  constructor(selector) {
    this.c = document.querySelector(selector)
    this.c.width = window.innerWidth
    this.c.height = window.innerHeight
  }

  init = () => {
    console.log('sketch-1 running')

    this.app = new Application({
      view: this.c,
      width: this.c.width,
      height: this.c.height,
      transparent: true,
    })

    this.app.renderer.autoResize = true
    this.app.renderer.resize(window.innerWidth, window.innerHeight)
    
    this.initFilter()
    this.initSprite()
    this.animate()
  }

  initFilter = () => {
    this.filter = new Filter('', customShader.fragment, customShader.uniforms)
    this.app.stage.filters = [
      this.filter,
    ]
  }

  initSprite = () => {
    const sprite = new Sprite.fromImage('static/img/hello.png')
    
    sprite.anchor.set(0.5)

    sprite.x = this.app.screen.width / 2
    sprite.y = this.app.screen.height / 2

    this.app.stage.addChild(sprite)

    this.sprite = sprite
  }

  animate = (t) => {
    requestAnimationFrame(this.animate) 
    this.filter.uniforms.uTime += 0.005
  }

}

export default new sketch1('#sketch-1')
import {
  Application,
  Sprite,
  Filter,
  Text,
  Texture,
  Container,
  TextStyle,
  Graphics,
} from 'pixi.js'

import gloopFilter from '../shaders/gloop'

class sketch1 {

  filters = []
  sprites = []
  activeFilter = 0
  k = 0

  constructor(selector) {
    this.c = document.querySelector(selector)
    this.c.width = window.innerWidth
    this.c.height = window.innerHeight
    this.t = 0
  }

  init = async () => {
    console.log('sketch-1 running')

    this.app = new Application({
      view: this.c,
      width: this.c.width,
      height: this.c.height,
      transparent: true,
      backgroundColor: 0xeeeeee,
    })

    this.app.renderer.autoResize = true
    this.app.renderer.resize(window.innerWidth, window.innerHeight)
    
    await this.initFilter()

    const textStyle = new TextStyle({
      fontFamily: 'Arial Black',
      fontSize: 200,
      fontWeight: 'bold',
      fill: '#000000',
      padding: 100,
    })

    const sprite = new Sprite.fromImage('/static/img/profile.svg')
    sprite.anchor.set(0.5)
    this.sprites.push(sprite)
    const container = new Container()
    container.addChild(sprite)

    container.x = this.app.screen.width / 2
    container.y = this.app.screen.height / 2
    this.app.stage.addChild(container)
    this.app.ticker.add(this.animate)
  }
  
  
  initFilter = () => {
    this.app.stage.filters = []
    const uSampler = Texture.fromVideo('/static/2.mp4')
    this.filters = [new Filter('', gloopFilter.fragment, { ...gloopFilter.uniforms })]
    this.app.stage.filters = this.filters


    window.addEventListener('mousemove', ({ clientX, clientY }) => {
      this.k = (-clientY / window.innerHeight) + 1.0
    })
  }

  createSprite = () => {
    const sprite = Sprite.fromImage('static/img/bg.1.png')
    sprite.width = this.app.screen.width
    sprite.height = this.app.screen.height
    return sprite
  }

  animate = () => {
    this.t += 0.1
    
    for (let i = 0; i < this.filters.length; i++) {
      this.filters[i].uniforms.uTime += 0.01
    }
    
    // this.filter.uniforms.uTransitionProgress = this.k
  }

}

export default new sketch1('#sketch-1')

function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')

    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', reject)
    img.src = src
  })

}

import {
  Application,
  Sprite,
  Filter,
  Text,
  Container,
  TextStyle,
} from 'pixi.js'

import customShader from '../shaders/sliced'

class sketch1 {

  sprites = []
  
  k = 0

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
      backgroundColor: 0xeeeeee,
    })

    this.app.renderer.autoResize = true
    this.app.renderer.resize(window.innerWidth, window.innerHeight)
    
    this.initFilter()

    const textStyle = new TextStyle({
      fontFamily: 'Arial Black',
      fontSize: 150,
      fontWeight: 'bold',
      fill: '#000',
      padding: 100,
    })

    const text = new Text('hiya', textStyle)
    text.shader = this.shader
    text.anchor.set(0.5)
    this.sprites.push(text)
    const container = new Container()
    container.addChild(text)

    container.x = this.app.screen.width / 2
    container.y = this.app.screen.height / 2
    this.app.stage.addChild(container)
    this.app.ticker.add(this.animate)
  }

  initFilter = () => {
    this.filter = new Filter('', customShader.fragment, customShader.uniforms)
    this.app.stage.filters = [
      this.filter,
    ]

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

  createTransitions = () => {
    return [
      createSquaresTransition(),
    ]
  }

  animate = () => {
    this.t += 0.1
    this.filter.uniforms.uTime += 0.01
    this.filter.uniforms.uTransitionProgress = this.k
  }

}

export default new sketch1('#sketch-1')

function createSquaresTransition() {
  // const 
} 
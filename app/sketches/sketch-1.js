import {
  Application,
  Sprite,
  Filter,
  Text,
  Container,
  TextStyle,
  Shader,
} from 'pixi.js'

import customShader from '../shaders/pixelate'
import lesShader from '../shaders/one'

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
      fill: '#eee',
      stroke: '#000000',
      strokeThickness: 10,
      padding: 100,
    })

    const text = new Text('hiya', textStyle)
    text.anchor.set(0.5)
    this.sprites.push(text)
    const container = new Container()
    container.addChild(text)
    
    const shader = new Shader(
      this.app.renderer.gl,
      lesShader.vertex,
      lesShader.fragment
    )
    console.log(shader)
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
      this.k = (-clientY / window.innerHeight) + 0.5
      // this.k = window.innerHeight / clientY
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
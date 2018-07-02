import {
  Graphics,
} from 'pixi.js'
import {
  geom,
} from 'toxiclibsjs'

const {
  Vec2D,
} = geom

class Particle {
  v = new Vec2D(0, 0)
  pos = new Vec2D(0, 0)
  isDead = false
  bounds = {
    xMax: window.innerWidth,
    xMin: 0,
    yMax: window.innerHeight,
    yMin: 0,
  }

  constructor({
    x,
    y,
    z,
    dx,
    dy,
    container,
    spriteURL,
    bounds,
  }) {
    this.pos.set(x,y)
    this.pos.z = z

    this.initPos = {
      x,
      y,
    }

    this.v.set(dx,dy)

    this.sprite = this.createSprite(spriteURL)
    container.addChild(this.sprite)

    if (bounds) this.bounds = bounds
  }

  createSprite = () => {
    const sprite = new Graphics()
    sprite.beginFill(0x000000, 0.25)
    sprite.drawCircle(
      this.pos.x,
      this.pos.y,
      this.pos.z,
    )
    sprite.endFill()
    return sprite
  }

  isWithinBounds = () => (
    this.pos.x > this.bounds.xMin &&
    this.pos.y > this.bounds.yMin && 
    this.pos.x < this.bounds.xMax &&
    this.pos.y < this.bounds.yMax
  )

  die = () => {
    this.isDead = true
  }

  rebirth = () => {
    this.pos.x = this.initPos.x
    this.pos.y = this.initPos.y
  }

  update = () => {
    if (!this.isWithinBounds()) {
      this.rebirth()
      return
    }
    this.pos = this.pos.add(this.v)
    this.sprite.position.x = this.pos.x
    this.sprite.position.y = this.pos.y
  }

}

export default Particle
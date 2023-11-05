import * as Three from 'three'
import { EventEmitter } from 'events'
import Camera from './camera'
import Renderer from './renderer'
import Preloader from './preloader'
import World from './world/world'

import Resources from './resourcess'
import { Sizes, Time, assets, Theme } from './utils/index'

export default class Experience extends EventEmitter {
  static instance
  constructor(canvas) {
    super()
    if (Experience.instance) return Experience.instance
    Experience.instance = this
    this.canvas = canvas
    this.scene = new Three.Scene()
    this.sizes = new Sizes()
    this.theme = new Theme()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.time = new Time()
    this.resources = new Resources(assets)
    this.world = new World()
    this.preloader = new Preloader()

    // 发布preloader实列完成
    this.emit('preloader loaded')
    // 订阅更新事件
    this.time.on('update', () => this.update())
    // 订阅窗口尺寸改变事件
    this.sizes.on('resize', () => this.resize())
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
    this.world.resize()
  }

  update() {
    this.camera.update()
    this.renderer.update()
    this.world.update(this.time.delta * 0.0005)
    this.preloader.update()
  }
}

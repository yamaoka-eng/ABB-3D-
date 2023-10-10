import * as THREE from 'three'
import Room from './room'
import Environment from './environment'
import Controls from './controls'
import Experience from '../experience'
import Floor from './Floor'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resources = this.experience.resources
    this.theme = this.experience.theme
    this.allowUpdates = false

    this.resources.on('all loaded', () => {
      this.environment = new Environment()
      this.room = new Room()
      this.floor = new Floor()
      this.controls = new Controls()
      this.allowUpdates = true
    })

    // 创建一个坐标系辅助对象
    const axesHelper = new THREE.AxesHelper(2) // 参数是坐标系的长度
    this.scene.add(axesHelper)

    this.theme.on('switch', theme => this.switchTheme(theme))
  }

  switchTheme(theme) {
    if (this.environment) {
      this.environment.switchTheme(theme)
    }
  }

  // 窗口尺寸改变触发事件
  resize() {}

  update(delta) {
    if (this.allowUpdates) {
      this.room.update(delta)
      this.environment.update(delta)
      this.controls.update(delta)
    }
  }
}

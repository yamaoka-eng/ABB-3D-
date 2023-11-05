import * as THREE from 'three'
import gsap from 'gsap'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import Experience from '../experience'

export default class Room {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resources = this.experience.resources
    this.world = this.experience.world
    this.environment = this.world.environment

    this.room = this.resources.items.room
    this.actualRoom = this.room.scene
    this.roomChildren = {}

    this.rectLight = {}

    this.setModel()
    this.setAnimation()
  }

  setModel() {
    this.actualRoom.children.forEach(child => {
      child.scale.set(0, 0, 0)
      child.castShadow = true // 投射阴影
      child.receiveShadow = true // 接受阴影
      if (child instanceof THREE.Group) {
        child.children.forEach(child => {
          child.castShadow = true // 投射阴影
          child.receiveShadow = true // 接受阴影
        })
      }
      if (child.name === '显示器') {
        child.children.forEach(child => {
          if (child.material.name === '电脑屏幕') {
            child.material = new THREE.MeshBasicMaterial({
              map: this.resources.items.screen,
              name: '电脑屏幕'
            })
          }
        })
      }
      if (child.name === '鱼缸') {
        child.children.forEach(child => {
          if (child.material.name === '鱼缸') {
            child.material = new THREE.MeshPhysicalMaterial()
            child.material.roughness = 0
            child.material.color.set(0x549dd2)
            child.material.ior = 1.45
            child.material.transmission = 1
            child.material.opacity = 1
          }
        })
      }
      if (child.name === '迷你地板') {
        const { x, y, z } = child.position
        this.miniFloor = { x, y, z }
        child.position.set(
          this.miniFloor.x,
          this.miniFloor.y,
          this.miniFloor.z - z * 0.5
        )
      }
      if (child.name === '遮挡立方体') {
        child.scale.set(1, 1, 1)
        child.position.set(0, 0, 0)
      }

      this.roomChildren[child.name.toLowerCase()] = child
    })
    // 创建一个 THREE.Group 对象用于包裹模型
    this.modelGroup = new THREE.Group()

    // 添加模型到该组
    this.actualRoom.position.set(0, 0, 0)
    this.actualRoom.rotation.y = -Math.PI / 4
    this.actualRoom.scale.set(0.11, 0.11, 0.11)
    this.modelGroup.add(this.actualRoom) // 用你实际的模型替换 yourModel
    this.modelGroup.scale.set(0, 0, 0)
    this.scene.add(this.modelGroup)

    // 把矩形灯光加入到鱼缸
    this.rectLight.width = 0.5
    this.rectLight.height = 0.8
    const intensity = 2
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      this.rectLight.width,
      this.rectLight.height
    )
    rectLight.position.set(0.9, 1.05, -0.2)
    rectLight.rotation.x = -Math.PI / 2
    rectLight.rotation.z = Math.PI / 4
    this.modelGroup.add(rectLight)
    this.roomChildren['rectLight'] = rectLight

    // 灯光辅助
    // const rectLightHelper = new RectAreaLightHelper(rectLight)
    // rectLight.add(rectLightHelper)
  }

  // 播放动画
  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom)
    this.room.animations.forEach(item => this.mixer.clipAction(item).play())
  }

  // 窗口尺寸改变触发事件
  resize() {}

  update(delta) {
    // 播放动画
    this.mixer.update(delta)
  }
}

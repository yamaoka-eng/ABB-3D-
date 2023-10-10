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

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1
    }

    this.setModel()
    this.setAnimation()
    this.onMouseMove()
  }

  setModel() {
    this.actualRoom.children.forEach(child => {
      child.castShadow = true // 投射阴影
      child.receiveShadow = true // 接受阴影
      if (child instanceof THREE.Group) {
        child.children.forEach(child => {
          child.castShadow = true // 投射阴影
          child.receiveShadow = true // 接受阴影
        })
      }
      if (child.name === '显示器屏幕') {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen
        })
      }
      if (child.name === '鱼缸玻璃') {
        child.material = new THREE.MeshPhysicalMaterial()
        child.material.roughness = 0
        child.material.color.set(0x549dd2)
        child.material.ior = 1.45
        child.material.transmission = 1
        child.material.opacity = 1
      }
    })
    // 创建一个 THREE.Group 对象用于包裹模型
    this.modelGroup = new THREE.Group()

    // 添加模型到该组
    this.modelGroup.add(this.actualRoom) // 用你实际的模型替换 yourModel
    this.scene.add(this.modelGroup)
    this.actualRoom.rotation.y = -Math.PI / 4
    this.actualRoom.position.set(0, 0, -1.6)
    this.actualRoom.scale.set(0.11, 0.11, 0.11)

    const width = 0.5
    const height = 0.8
    const intensity = 2
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    )
    rectLight.position.set(0.9, 1.05, -0.2)
    rectLight.rotation.x = -Math.PI / 2
    rectLight.rotation.z = Math.PI / 4
    this.modelGroup.add(rectLight)

    // const rectLightHelper = new RectAreaLightHelper(rectLight)
    // rectLight.add(rectLightHelper)
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom)
    this.room.animations.forEach(item => this.mixer.clipAction(item).play())
  }

  onMouseMove() {
    window.addEventListener('mousemove', event => {
      // 让旋转值维持在 -1 ~ 1 之间
      this.rotation =
        ((event.clientX - window.innerWidth / 2) * 2) / window.innerWidth
      this.lerp.target = this.rotation * 0.1
    })
  }

  // 窗口尺寸改变触发事件
  resize() {}

  update(delta) {
    // 播放动画
    this.mixer.update(delta)

    // 使用gsap进行插值
    this.lerp.current = gsap.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    )
    this.modelGroup.rotation.y = this.lerp.current
  }
}

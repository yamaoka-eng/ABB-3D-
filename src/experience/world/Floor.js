import * as THREE from 'three'
import Experience from '../experience'

export default class Floor {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resources = this.experience.resources
    this.modelGroup = this.experience.world.room.modelGroup

    this.setCircles()
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry(5, 64)
    const material1 = new THREE.MeshStandardMaterial({ color: 0xe5a1aa })
    const material2 = new THREE.MeshStandardMaterial({ color: 0x8395cd })
    const material3 = new THREE.MeshStandardMaterial({ color: 0x7ad0ac })
    this.circleFirst = new THREE.Mesh(geometry, material1)
    this.circleSecond = new THREE.Mesh(geometry, material2)
    this.circleThird = new THREE.Mesh(geometry, material3)
    this.circleFirst.position.set(0, -0.19, 0)
    this.circleSecond.position.set(0, -0.18, 0)
    this.circleThird.position.set(0, -0.17, 0)
    this.circleFirst.scale.set(0, 0, 0)
    this.circleSecond.scale.set(0, 0, 0)
    this.circleThird.scale.set(0, 0, 0)
    this.circleFirst.rotation.x =
      this.circleSecond.rotation.x =
      this.circleThird.rotation.x =
        -Math.PI / 2

    this.circleFirst.receiveShadow =
      this.circleSecond.receiveShadow =
      this.circleThird.receiveShadow =
        true

    this.scene.add(this.circleFirst)
    this.scene.add(this.circleSecond)
    this.scene.add(this.circleThird)
  }

  // 窗口尺寸改变触发事件
  resize() {}

  update() {}
}

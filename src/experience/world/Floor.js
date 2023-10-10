import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../experience'

export default class Floor {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resources = this.experience.resources

    this.setFloor()
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100)
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    })
    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.plane.rotation.x = Math.PI / 2
    this.plane.receiveShadow = true
    this.plane.position.y = -0.2
    this.scene.add(this.plane)
  }

  // 窗口尺寸改变触发事件
  resize() {}

  update() {}
}

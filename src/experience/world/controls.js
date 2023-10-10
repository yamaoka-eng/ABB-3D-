import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Experience from '../experience'

export default class Controls {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resources = this.experience.resources
    this.modelGroup = this.experience.world.room.modelGroup
    this.pointLight = this.experience.world.environment.pointLight
    gsap.registerPlugin(ScrollTrigger)

    this.setPath()
  }

  setPath() {
    gsap.timeline().to(this.modelGroup.position, {
      x: () => this.sizes.width * 0.00118,
      scrollTrigger: {
        trigger: '.frist-move',
        // markers: true,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true
      }
    })
  }

  // 窗口尺寸改变触发事件
  resize() {}

  update() {}
}

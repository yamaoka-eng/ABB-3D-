import * as THREE from 'three'
import gsap from 'gsap'
import GUI from 'lil-gui'
import Experience from '../experience'

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resources = this.experience.resources
    // this.gui = new GUI({ container: document.querySelector('.hero-main') })
    this.obj = {
      colorObj: { r: 0, g: 0, b: 0 },
      intensity: 1.5
    }

    this.setSunLight()
    // this.setGUI()
  }

  setGUI() {
    this.gui.addColor(this.obj, 'colorObj').onChange(() => {
      this.sunLight.color.copy(this.obj.colorObj)
      this.environmentLight.color.copy(this.obj.colorObj)
      console.log(this.obj.colorObj)
    })
    this.gui.add(this.obj, 'intensity', 0, 10).onChange(() => {
      this.sunLight.intensity = this.obj.intensity
      this.environmentLight.intensity = this.obj.intensity
    })
  }

  setSunLight() {
    // 加入平行光
    this.sunLight = new THREE.DirectionalLight(0xffffff, 3)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 20
    this.sunLight.shadow.mapSize.set(2048, 2048)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(-0.5, 3, 0.7)
    this.sunLight.shadow.radius = 3
    this.sunLight.shadow.bias = -0.01
    this.sunLight.intensity = this.obj.intensity
    this.scene.add(this.sunLight)

    // 加入环境光
    this.environmentLight = new THREE.AmbientLight(0xffffff, 1)
    this.scene.add(this.environmentLight)

    // 加入灯光辅助
    // this.scene.add(new THREE.CameraHelper(this.sunLight.shadow.camera))
  }

  switchTheme(theme) {
    if (theme === 'dark') {
      gsap.to([this.sunLight.color, this.environmentLight.color], {
        r: 0.172,
        g: 0.2313,
        b: 0.68627
      })
      gsap.to([this.sunLight, this.environmentLight], {
        intensity: 0.7
      })
    } else {
      gsap.to([this.sunLight.color, this.environmentLight.color], {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255
      })
      gsap.to([this.sunLight, this.environmentLight], {
        intensity: this.obj.intensity
      })
    }
  }

  // 窗口尺寸改变触发事件
  resize() {}

  update() {}
}

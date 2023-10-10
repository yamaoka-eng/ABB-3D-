import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from './experience'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.createPerspectiveCamera()
    this.createOrthographicCamera()
    this.setOrbitControls()
  }

  // 创建透视相机
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      75,
      this.sizes.aspectRatio,
      0.1,
      1000
    )
    this.scene.add(this.perspectiveCamera)
    this.perspectiveCamera.position.set(29, 14, 12)
  }

  // 创建正交相机
  createOrthographicCamera() {
    this.frustrum = 4
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspectRatio * this.frustrum) / 2,
      (this.sizes.aspectRatio * this.frustrum) / 2,
      this.frustrum / 2,
      -this.frustrum / 2,
      -50,
      50
    )
    this.orthographicCamera.position.set(0, 3.5, 5)
    this.orthographicCamera.rotation.set(-Math.PI / 6, 0, 0)
    this.scene.add(this.orthographicCamera)

    // 添加辅助
    // this.scene.add(new THREE.GridHelper(20, 20))
    // this.scene.add(new THREE.AxesHelper(10))

    // this.helper = new THREE.CameraHelper(this.orthographicCamera)
    // this.scene.add(this.helper)
  }

  // 轨道
  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
    // 添加惯性
    this.controls.enableDamping = true
    // 添加缩放
    this.controls.enableZoom = true
  }

  // 窗口尺寸改变触发事件
  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspectRatio
    this.perspectiveCamera.updateProjectionMatrix()

    this.orthographicCamera.left = (-this.sizes.aspectRatio * this.frustrum) / 2
    this.orthographicCamera.right = (this.sizes.aspectRatio * this.frustrum) / 2
    this.orthographicCamera.top = this.frustrum / 2
    this.orthographicCamera.bottom = -this.frustrum / 2
    this.orthographicCamera.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
    // this.helper.matrixWorldNeedsUpdate = true
    // this.helper.update()
    // this.helper.position.copy(this.orthographicCamera.position)
  }
}

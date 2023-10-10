import { EventEmitter } from 'events'

// 尺寸
export class Sizes extends EventEmitter {
  constructor() {
    super()
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.aspectRatio = this.width / this.height
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    this.timeoutId = null // 用于存储定时器的 ID

    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.aspectRatio = this.width / this.height
      this.pixelRatio = Math.min(window.devicePixelRatio, 2)
      this.emit('resize')
    })
  }
}

// 事件
export class Time extends EventEmitter {
  constructor() {
    super()
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 0

    this.update()
  }

  update() {
    const currentTime = Date.now()
    // 帧数
    this.delta = currentTime - this.current
    this.current = currentTime
    // 记录时间节点
    this.elapsed = this.current - this.start
    // 发布事件
    this.emit('update')
    window.requestAnimationFrame(() => this.update())
  }
}

// 黑白模式切换
export class Theme extends EventEmitter {
  constructor() {
    super()
    this.theme = 'light'

    this.toggleButton = document.querySelector('.toggle-button')
    this.toggleCircle = document.querySelector('.toggle-circle')

    this.setEventListeners()
  }

  setEventListeners() {
    this.toggleButton.addEventListener('click', () => {
      this.toggleCircle.classList.toggle('slide')
      document.body.classList.toggle('dark-theme')
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.emit('switch', this.theme)
    })
  }
}

export const assets = [
  {
    name: 'room',
    type: 'glbModel',
    path: '/models/room.glb'
  },
  {
    name: 'screen',
    type: 'videoTexture',
    path: '/textures/screen.mp4'
  }
]

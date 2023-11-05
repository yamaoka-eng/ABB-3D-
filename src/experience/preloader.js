import { EventEmitter } from 'events'
import gsap from 'gsap'
import Experience from './experience'
import { covertDivs } from './utils'

// 预加载
export default class Preloader extends EventEmitter {
  constructor() {
    super()
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resources = this.experience.resources
    this.world = this.experience.world
    this.device = this.sizes.device
    this.arrowDown = document.querySelector('.arrow-svg-warpper')
    this.preloaderCircle = document.querySelector('.preloader')
    this.page = document.querySelector('.page')

    this.sizes.on('switchdevice', device => (this.device = device))

    this.world.on('world ready', () => {
      this.setAssets()
      this.playIntro()
    })
  }
  setAssets() {
    covertDivs(document.querySelector('.intro-text'))
    covertDivs(document.querySelector('.hero-main-title'))
    covertDivs(document.querySelector('.hero-main-description'))
    covertDivs(document.querySelector('.hero-second-subheading'))
    covertDivs(document.querySelector('.second-sub'))
    this.modelGroup = this.world.room.modelGroup
    this.roomChildren = this.world.room.roomChildren
    this.roomChildren['rectLight'].intensity = 0
  }

  randomAnimationInter = () =>
    `<${Math.floor(Math.random() * 100) > 50 ? 30 : 15}%`

  firstIntro() {
    this.timeline = new gsap.timeline()

    this.preloaderCircle.classList.toggle('opacity-0')
    this.page.classList.toggle('opacity-0')

    return new Promise(resolve => {
      if (this.device === 'desktop') {
        this.timeline
          .to(this.modelGroup.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.8
          })
          .to(this.modelGroup.scale, {
            x: 1,
            y: 1,
            z: 1
          })
          .to(this.roomChildren['遮挡立方体'].scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.5)',
            duration: 0.7
          })
          .to(this.modelGroup.position, {
            x: -0.7,
            ease: 'power1.out',
            duration: 1
          })
      } else {
        this.timeline
          .to(this.modelGroup.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.8
          })
          .to(this.modelGroup.scale, {
            x: 0.7,
            y: 0.7,
            z: 0.7
          })
          .to(this.roomChildren['遮挡立方体'].scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.5)',
            duration: 0.7
          })
          .to(this.modelGroup.position, {
            y: 0.4,
            ease: 'power1.out',
            duration: 0.7
          })
      }
      this.timeline.to('.intro-text .animatedis', {
        y: 0,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        onComplete: () => {
          this.arrowDown.classList.toggle('opacity-0')
          resolve()
        }
      })
    })
  }

  secondIntro() {
    return new Promise(resolve => {
      this.arrowDown.classList.toggle('opacity-0')
      this.timeline
        .to('.intro-text .animatedis', {
          yPercent: 100,
          stagger: 0.05,
          ease: 'back.in(1.7)'
        })
        .to(
          this.modelGroup.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: 'power1.out'
          },
          'same'
        )
        .to(this.camera.orthographicCamera.position, { y: 3.5, z: 6.5 }, 'same')
        .to(
          this.roomChildren['遮挡立方体'].rotation,
          { y: 2 * Math.PI, ease: 'power2.out' },
          'same'
        )
        .to(
          this.roomChildren['遮挡立方体'].position,
          {
            y: 10,
            z: 10,
            x: 10,
            ease: 'power1.out'
          },
          'same'
        )
        .to(
          this.roomChildren['遮挡立方体'].scale,
          {
            x: 10,
            y: 10,
            z: 10,
            duration: 1,
            ease: 'power1.out'
          },
          'same'
        )
        .to(this.roomChildren['遮挡墙体'].scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.05
        })
        .to(
          this.roomChildren['墙体'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.05
          },
          '<+=100%'
        )
        .to(
          this.roomChildren['迷你地板'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.05
          },
          '<+=100%'
        )
        .to(this.roomChildren['遮挡立方体'].scale, {
          x: 0,
          y: 0,
          z: 0,
          ease: 'power1.out'
        })
        .to(this.roomChildren['遮挡墙体'].scale, {
          x: 0,
          y: 0,
          z: 0,
          ease: 'power1.out'
        })
        .to(this.roomChildren['时钟'].scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: 'back.out(1.7)',
          duration: 0.5
        })
        .to(
          this.roomChildren['置物架'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1.7)',
            duration: 0.5
          },
          this.randomAnimationInter()
        )
        .to(
          this.roomChildren['置物架2'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1.7)',
            duration: 0.5
          },
          this.randomAnimationInter()
        )
        .to(
          this.roomChildren['地上物品2'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1.7)',
            duration: 0.5
          },
          this.randomAnimationInter()
        )
        .to(
          this.roomChildren['鱼缸'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1.7)',
            duration: 0.5
          },
          this.randomAnimationInter()
        )
        .to(
          this.roomChildren['rectLight'],
          {
            intensity: 2,
            duration: 0.5
          },
          '<=10%'
        )
        .to(
          this.roomChildren['鱼'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1.7)',
            duration: 0.5
          },
          this.randomAnimationInter()
        )
        .to(
          this.roomChildren['桌子'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1.7)',
            duration: 0.5
          },
          this.randomAnimationInter()
        )
        .to(
          this.roomChildren['地上物品'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1.7)',
            duration: 0.5
          },
          this.randomAnimationInter()
        )
        .to(
          this.roomChildren['座椅'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1.7)',
            duration: 0.5
          },
          this.randomAnimationInter()
        )
        .to(
          this.roomChildren['座椅'].rotation,
          {
            y: 4 * Math.PI + Math.PI / 4,
            ease: 'power2.out',
            duration: 2
          },
          'myLabel+=1%'
        )
        .to(
          this.roomChildren['桌面饰物'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1.7)',
            duration: 0.5
          },
          '<10%'
        )
        .to(
          this.roomChildren['桌面饰物2'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1.7)',
            duration: 0.5
          },
          this.randomAnimationInter()
        )
        .to(
          this.roomChildren['显示器'].scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(1.7)',
            duration: 0.5
          },
          this.randomAnimationInter()
        )
        .to(
          '.hero-main-title .animatedis',
          {
            y: 0,
            stagger: 0.05,
            ease: 'back.out(1.7)'
          },
          this.randomAnimationInter()
        )
        .to(
          '.hero-main-description .animatedis',
          {
            y: 0,
            stagger: 0.05,
            ease: 'back.out(1.7)'
          },
          this.randomAnimationInter()
        )
        .to(
          '.hero-second-subheading .animatedis',
          {
            y: 0,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            onComplete: resolve
          },
          this.randomAnimationInter()
        )
    })
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeAllListeners()
      this.playSecondIntro()
    }
  }

  onTouch(e) {
    this.initalY = e.touches[0].clientY
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY
    let difference = this.initalY - currentY
    if (difference > 0) {
      this.removeAllListeners()
      this.playSecondIntro()
    }
    this.initalY = null
  }

  removeAllListeners() {
    window.removeEventListener('wheel', this.scrollEvent)
    window.removeEventListener('touchstart', this.touchStart)
    window.removeEventListener('touchmove', this.touchMove)
  }

  async playIntro() {
    await this.firstIntro()
    this.moveFlag = true
    this.scrollEvent = this.onScroll.bind(this)
    this.touchStart = this.onTouch.bind(this)
    this.touchMove = this.onTouchMove.bind(this)
    window.addEventListener('wheel', this.scrollEvent)
    window.addEventListener('touchstart', this.touchStart)
    window.addEventListener('touchmove', this.touchMove)
  }

  async playSecondIntro() {
    this.moveFlag = false
    await this.secondIntro()
    this.emit('enablecontrols')
  }

  move() {
    if (this.device === 'desktop') {
      this.modelGroup.position.set(-0.7, 0, 0)
      this.modelGroup.scale.set(1, 1, 1)
    } else {
      this.modelGroup.position.set(0, 0.4, 0)
      this.modelGroup.scale.set(0.7, 0.7, 0.7)
    }
  }

  update() {
    if (this.moveFlag) {
      this.move()
    }
  }
}

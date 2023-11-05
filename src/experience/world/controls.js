import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ASScroll from '@ashthornton/asscroll'
import Experience from '../experience'

export default class Controls {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resources = this.experience.resources
    this.room = this.experience.world.room
    this.modelGroup = this.experience.world.room.modelGroup
    this.roomModel = this.experience.world.room.modelGroup.children[0]
    this.rectLight = this.room.roomChildren['rectLight']
    this.rectLightSet = this.experience.world.room.rectLight
    this.circleFirst = this.experience.world.floor.circleFirst
    this.circleSecond = this.experience.world.floor.circleSecond
    this.circleThird = this.experience.world.floor.circleThird

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1
    }

    gsap.registerPlugin(ScrollTrigger)
    this.matchMedia = gsap.matchMedia()

    // 设置动画滚动条
    this.setSmoothScroll()
    // 设置滑动触发动画
    this.onMouseMove()
    // 设置滚动条触发动画
    this.setScroollChangeFuc()
  }

  setupASScroll() {
    const asscroll = new ASScroll({
      disableRaf: true,
      ease: 0.3
    })

    gsap.ticker.add(asscroll.update)

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement
    })

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value
          return
        }
        return asscroll.currentPos
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      fixedMarkers: true
    })

    asscroll.on('update', ScrollTrigger.update)
    ScrollTrigger.addEventListener('refresh', asscroll.resize)

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          '.gsap-marker-start, .gsap-marker-end, [asscroll]'
        )
      })
    })
    return asscroll
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll()
  }

  setScroollChangeFuc() {
    // 设置正常尺寸
    this.matchMedia.add('(min-width: 768px)', () => {
      console.log('正常设备尺寸')
      document.body.style.overflow = 'hidden'
      //初始化模型
      gsap
        .timeline()
        .to(
          this.modelGroup.scale,
          {
            x: 1,
            y: 1,
            z: 1
          },
          'same'
        )
        .to(
          this.rectLight,
          {
            width: this.rectLightSet.width * 1,
            height: this.rectLightSet.height * 1
          },
          'same'
        )
        .to(this.modelGroup.position, { x: 0, y: 0, z: 0 }, 'same')

      // 第一个section运动
      this.firstMove = new gsap.timeline({
        scrollTrigger: {
          trigger: '.first-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true
        }
      }).to(this.modelGroup.position, {
        x: () => this.sizes.width * 0.00118
      })

      // 第二个section运动
      this.secondMove = new gsap.timeline({
        scrollTrigger: {
          trigger: '.second-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true
        }
      })
        .to(
          this.modelGroup.position,
          {
            x: () => 1,
            z: () => this.sizes.height * 0.0032
          },
          'same'
        )
        .to(
          this.modelGroup.scale,
          {
            x: 4,
            y: 4,
            z: 4
          },
          'same'
        )
        .to(
          this.rectLight,
          {
            width: this.rectLightSet.width * 4,
            height: this.rectLightSet.height * 4
          },
          'same'
        )

      // 第三个section运动
      this.thirdMove = new gsap.timeline({
        scrollTrigger: {
          trigger: '.third-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true
        }
      }).to(this.camera.orthographicCamera.position, {
        x: -3,
        y: -1.5
      })
    })

    // 设置移动设备尺寸
    this.matchMedia.add('(max-width: 767px)', () => {
      console.log('移动设备尺寸')
      document.body.style.overflow = 'visible'
      // 初始化
      gsap
        .timeline()
        .to(
          this.modelGroup.scale,
          {
            x: 0.7,
            y: 0.7,
            z: 0.7
          },
          'same'
        )
        .to(
          this.rectLight,
          {
            width: this.rectLightSet.width * 0.7,
            height: this.rectLightSet.height * 0.7
          },
          'same'
        )
        .to(this.modelGroup.position, { x: 0, y: 0, z: 0 }, 'same')

      // 第一个section运动
      this.firstMove = new gsap.timeline({
        scrollTrigger: {
          trigger: '.first-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true
        }
      })
        .to(
          this.modelGroup.position,
          {
            x: 1.5
          },
          'same'
        )
        .to(this.modelGroup.scale, { x: 2, y: 2, z: 2 }, 'same')
        .to(
          this.rectLight,
          {
            width: this.rectLightSet.width * 2,
            height: this.rectLightSet.height * 2
          },
          'same'
        )

      // 第二个section运动
      this.secondMove = new gsap.timeline({
        scrollTrigger: {
          trigger: '.second-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true
        }
      })
        .to(
          this.modelGroup.position,
          {
            x: () => 1,
            z: () => this.sizes.height * 0.0032
          },
          'same'
        )
        .to(
          this.modelGroup.scale,
          {
            x: 4,
            y: 4,
            z: 4
          },
          'same'
        )
        .to(
          this.rectLight,
          {
            width: this.rectLightSet.width * 4,
            height: this.rectLightSet.height * 4
          },
          'same'
        )

      // 第三个section运动
      this.thirdMove = new gsap.timeline({
        scrollTrigger: {
          trigger: '.third-move',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true
        }
      }).to(this.camera.orthographicCamera.position, {
        x: -3,
        y: -1.5
      })
    })

    // 所有尺寸窗口触发
    this.matchMedia.add('(max-width: 99999px)', () => {
      // 迷你地板动画
      this.thirdMoveTimeLine = new gsap.timeline({
        scrollTrigger: {
          trigger: '.third-move',
          start: 'center center',
          invalidateOnRefresh: true
          // toggleActions: 'restart reverse none none'
        }
      })
      this.roomModel.children.forEach(child => {
        if (child.name === '迷你地板') {
          this.thirdMoveTimeLine.add(
            gsap.to(child.position, {
              x: this.room.miniFloor.x,
              z: this.room.miniFloor.z,
              duration: 0.3
            })
          )
          this.roomModel.children.forEach(child => {
            if (
              child.name === '邮箱' ||
              child.name === '欢迎地板1' ||
              child.name === '欢迎地板2' ||
              child.name === '欢迎地板3' ||
              child.name === '鲜花1' ||
              child.name === '鲜花2' ||
              child.name === '土地' ||
              child.name === '地灯'
            ) {
              this.thirdMoveTimeLine.add(
                gsap.to(child.scale, {
                  x: 1,
                  y: 1,
                  z: 1,
                  duration: 0.3,
                  ease: 'back.out(2)'
                }),
                `-=${Math.floor(Math.random() * 0.3 * 100) / 100}`
              )
            }
          })
          return
        }
      })
      this.setSectionAnimation()
      this.setFloorUnfoldAnimation()
    })
  }

  // section卡片动画
  setSectionAnimation() {
    const leftElements = document.querySelectorAll('.left-section')
    const rightElements = document.querySelectorAll('.right-section')
    leftElements.forEach(element => {
      gsap.timeline().to(element, {
        borderTopRightRadius: `50px`,
        scrollTrigger: {
          trigger: element,
          start: '10% bottom',
          end: 'top top',
          scrub: 1
        }
      })
      gsap.timeline().to(element, {
        borderBottomRightRadius: `500px`,
        scrollTrigger: {
          trigger: element,
          start: '105% bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    })
    rightElements.forEach(element => {
      gsap.timeline().to(element, {
        borderTopLeftRadius: `50px`,
        scrollTrigger: {
          trigger: element,
          start: '5% bottom',
          end: 'top top',
          scrub: 1
        }
      })
      gsap.timeline().to(element, {
        borderBottomLeftRadius: `500px`,
        scrollTrigger: {
          trigger: element,
          start: '105% bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    })

    // 进度条动画
    const progress = document.querySelectorAll('.progress-bar-wrapper')
    progress.forEach(element => {
      gsap.from(element.children[0], {
        scaleY: 0,
        scrollTrigger: {
          trigger: element,
          start: '0% 0%',
          end: '100% 100%',
          scrub: 3,
          pin: element,
          pinSpacing: false
        }
      })
    })
  }

  setFloorUnfoldAnimation() {
    // 第一个section运动
    this.firstMove = new gsap.timeline({
      scrollTrigger: {
        trigger: '.first-move',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true
      }
    }).to(this.circleFirst.scale, {
      x: 3,
      y: 3,
      z: 3
    })

    // 第二个section运动
    this.secondMove = new gsap.timeline({
      scrollTrigger: {
        trigger: '.second-move',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true
      }
    })
      .to(
        this.circleSecond.scale,
        {
          x: 3,
          y: 3,
          z: 3
        },
        'same'
      )
      .to(this.modelGroup.position, { y: 0.6 }, 'same')

    // 第三个section运动
    this.thirdMove = new gsap.timeline({
      scrollTrigger: {
        trigger: '.third-move',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true
      }
    }).to(this.circleThird.scale, {
      x: 3,
      y: 3,
      z: 3
    })
  }

  // 模型的左右旋转
  onMouseMove() {
    window.addEventListener('mousemove', event => {
      // 让旋转值维持在 -0.2 ~ 0.2 之间
      this.rotation =
        ((event.clientX - window.innerWidth / 2) * 2) / window.innerWidth
      this.lerp.target = this.rotation * 0.02
    })
  }

  // 窗口尺寸改变触发事件
  resize() {}

  update() {
    // 使用gsap进行插值
    this.lerp.current = gsap.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    )
    this.modelGroup.rotation.y = this.lerp.current
  }
}

import { useRef, useEffect, useLayoutEffect } from 'react'
import { LuSunMedium, LuMoon } from 'react-icons/lu'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Experience from './experience/experience'

import './App.scss'

function App() {
  const canvasRef = useRef(null)
  gsap.registerPlugin(ScrollTrigger)

  // 实列控制模块
  useEffect(() => {
    new Experience(canvasRef.current)
  }, [])

  // section圆角动画效果
  useLayoutEffect(() => {
    const leftElements = document.querySelectorAll('.left')
    const rightElements = document.querySelectorAll('.right')
    leftElements.forEach(element => {
      gsap.timeline().to(element, {
        borderTopRightRadius: `50px`,
        scrollTrigger: {
          trigger: element,
          // markers: true,
          start: '10% bottom',
          end: 'top top',
          scrub: 0.1
        }
      })
      gsap.timeline().to(element, {
        borderBottomRightRadius: `500px`,
        scrollTrigger: {
          trigger: element,
          // markers: true,
          start: '105% bottom',
          end: 'bottom top',
          scrub: 0.1
        }
      })
    })
    rightElements.forEach(element => {
      gsap.timeline().to(element, {
        borderTopLeftRadius: `50px`,
        scrollTrigger: {
          trigger: element,
          // markers: true,
          start: '5% bottom',
          end: 'top top',
          scrub: 0.1
        }
      })
      gsap.timeline().to(element, {
        borderBottomLeftRadius: `500px`,
        scrollTrigger: {
          trigger: element,
          // markers: true,
          start: '105% bottom',
          end: 'bottom top',
          scrub: 0.1
        }
      })
    })
  }, [])

  // section进度条动画效果
  useLayoutEffect(() => {
    const progress = document.querySelectorAll('.progress-bar-wrapper')
    console.log(progress)
    progress.forEach(element => {
      console.log(element)
      gsap.timeline().to(element.children[0], {
        height: `100%`,
        scrollTrigger: {
          trigger: element,
          markers: true,
          start: '20% bottom',
          end: '105% top',
          scrub: 0.1
        }
      })
    })
  }, [])

  return (
    <>
      {/* 背景 */}
      <div className="experience">
        <canvas className="experience-canvas" ref={canvasRef}></canvas>
      </div>

      {/* 内容 */}
      <div className="page">
        <div className="toggle-bar">
          <div className="sun-wrapper">
            <LuSunMedium className="w-[80%] h-[80%]"></LuSunMedium>
          </div>
          <button className="toggle-button">
            <div className="toggle-circle"></div>
          </button>
          <div className="moon-wrapper">
            <LuMoon className="w-[80%] h-[80%]"></LuMoon>
          </div>
        </div>

        <div className="page-wrapper">
          <div className="hero">
            <div className="hero-wrapper">
              <div className="hero-main">
                <h1 className="hero-main-title">Abigail Bloom</h1>
                <p className="hero-main-description">
                  Digital Media student | 3D Artist
                </p>
              </div>
              <div className="hero-second">
                <p className="hero-second-subheading">AbigailBloom</p>
                <p className="hero-second-subheading">Portfolio</p>
              </div>
            </div>
          </div>
          <div className="frist-move section-margin"></div>
          <section className="first-section section left">
            <div className="progress-bar-wrapper left-bar">
              <div className="progress pink-background"></div>
            </div>
            <div className="section-intro-wrapper">
              <h1 className="section-title">
                <div className="section-title-text">About me</div>
                <div className="section-title-decoration styleOne"></div>
                <div className="section-title-decoration styleTwo"></div>
                <div className="section-title-decoration styleThree"></div>
              </h1>
              <span className="section-number">01</span>
            </div>
            <div className="section-detail-warpper">
              <h3 className="section-heading">Lorem Ipsum</h3>
              <p className="section-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                quo consequatur maiores omnis quos animi, quia nihil tempora
                quibusdam repellendus non ab tempore aut recusandae repudiandae
                temporibus dolorem quasi officiis?
              </p>
              <h3 className="section-heading">Lorem Ipsum</h3>
              <p className="section-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                quo consequatur maiores omnis quos animi, quia nihil tempora
                quibusdam repellendus non ab tempore aut recusandae repudiandae
                temporibus dolorem quasi officiis?
              </p>
              <h3 className="section-heading">Lorem Ipsum</h3>
              <p className="section-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                quo consequatur maiores omnis quos animi, quia nihil tempora
                quibusdam repellendus non ab tempore aut recusandae repudiandae
                temporibus dolorem quasi officiis?
              </p>
            </div>
          </section>

          <div className="second-move section-margin"></div>

          <section className="second-section section right">
            <div className="progress-bar-wrapper right-bar">
              <div className="progress blue-background"></div>
            </div>
            <div className="section-intro-wrapper blue-text blue-border">
              <h1 className="section-title">
                <div className="section-title-text">my work</div>
                <div className="section-title-decoration styleOne blue-border"></div>
                <div className="section-title-decoration styleTwo blue-border"></div>
                <div className="section-title-decoration styleThree blue-border blue-background"></div>
              </h1>
              <span className="section-number">02</span>
            </div>
            <div className="section-detail-warpper">
              <h3 className="section-heading">Lorem Ipsum</h3>
              <p className="section-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                quo consequatur maiores omnis quos animi, quia nihil tempora
                quibusdam repellendus non ab tempore aut recusandae repudiandae
                temporibus dolorem quasi officiis?
              </p>
              <h3 className="section-heading">Lorem Ipsum</h3>
              <p className="section-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                quo consequatur maiores omnis quos animi, quia nihil tempora
                quibusdam repellendus non ab tempore aut recusandae repudiandae
                temporibus dolorem quasi officiis?
              </p>
              <h3 className="section-heading">Lorem Ipsum</h3>
              <p className="section-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                quo consequatur maiores omnis quos animi, quia nihil tempora
                quibusdam repellendus non ab tempore aut recusandae repudiandae
                temporibus dolorem quasi officiis?
              </p>
            </div>
          </section>
          <div className="third-move section-margin"></div>
          <section className="third-section section left">
            <div className="progress-bar-wrapper left-bar">
              <div className="progress green-background"></div>
            </div>
            <div className="section-intro-wrapper green-text green-border">
              <h1 className="section-title">
                <div className="section-title-text">contact me</div>
                <div className="section-title-decoration styleOne green-border"></div>
                <div className="section-title-decoration styleTwo green-border"></div>
                <div className="section-title-decoration styleThree green-background"></div>
              </h1>
              <span className="section-number">03</span>
            </div>
            <div className="section-detail-warpper">
              <h3 className="section-heading">Lorem Ipsum</h3>
              <p className="section-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                quo consequatur maiores omnis quos animi, quia nihil tempora
                quibusdam repellendus non ab tempore aut recusandae repudiandae
                temporibus dolorem quasi officiis?
              </p>
              <h3 className="section-heading">Lorem Ipsum</h3>
              <p className="section-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                quo consequatur maiores omnis quos animi, quia nihil tempora
                quibusdam repellendus non ab tempore aut recusandae repudiandae
                temporibus dolorem quasi officiis?
              </p>
              <h3 className="section-heading">Lorem Ipsum</h3>
              <p className="section-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                quo consequatur maiores omnis quos animi, quia nihil tempora
                quibusdam repellendus non ab tempore aut recusandae repudiandae
                temporibus dolorem quasi officiis?
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default App

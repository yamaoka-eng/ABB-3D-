import { useRef, useEffect } from 'react'
import { LuSunMedium, LuMoon, LuChevronDown } from 'react-icons/lu'
import Spline from '@splinetool/react-spline'
import Experience from './experience/experience'
import './App.scss'

function App() {
  const canvasRef = useRef(null)

  // 实列控制模块
  useEffect(() => {
    new Experience(canvasRef.current)
  }, [])

  return (
    <>
      {/* 3D背景 */}
      <div className="experience">
        <canvas className="experience-canvas" ref={canvasRef}></canvas>
      </div>

      {/* 加载动画 */}
      <div className="preloader">
        <div className="preloader-wrapper">
          <div className="loading">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      </div>

      {/* 内容 */}
      <div className="page opacity-0" asscroll-container="true">
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

        <div className="page-wrapper" asscroll="true">
          <div className="hero">
            <div className="hero-wrapper">
              <div className="intro-text">Welcome to my portfolio!</div>
              <div className="arrow-svg-warpper animate-bounce opacity-0">
                <LuChevronDown></LuChevronDown>
              </div>
              <div className="hero-main">
                <div className="hero-second">
                  <p className="hero-second-subheading">AbigailBloom</p>
                  <p className="hero-second-subheading second-sub">Portfolio</p>
                </div>
                <div>
                  <h1 className="hero-main-title">Abigail Bloom</h1>
                  <p className="hero-main-description">
                    Digital Media student | 3D Artist
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="first-move section-margin"></div>
          <section className="first-section section left-section">
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

          <section className="second-section section right-section">
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
          <section className="third-section section left-section">
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
          <Spline scene="https://prod.spline.design/SkYcRqLnWOAIzI6o/scene.splinecode" />
        </div>
      </div>
    </>
  )
}

export default App

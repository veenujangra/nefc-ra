import './style.scss'
import Nav from './src/nav'
import Hero from './src/Hero'
import Challenge from './src/challenge'
import Fraud from './src/fraud'
import Mission from './src/mission'
import Leadership from './src/leadership'
import Contact from './src/contact'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

class App {
  constructor(options) {
    this.elements = document.querySelectorAll(options.elements)

    this.init()
    /**
     * Scroll based updated removed
     */
    // this.handleNav(document.querySelectorAll('.navlink_wrapper'))
    this.setMobileScrollSpeed()
  }

  init() {
    this.initLenis()

    this.createNav()

    this.createContact()

    this.createSection()
  }

  initLenis() {
    this.lenis = new Lenis({
      lerp: 0.075,
      autoResize: true,
    })

    document.body.addEventListener('click', (e) => {
      this.lenis.resize()
      setTimeout(() => {
        this.lenis.resize()
      }, 200)
    })

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin and adding direction classes to the body
    this.lenis.on('scroll', () => {
      ScrollTrigger.update()
      document.body.classList.toggle('is--scrolling-up', this.lenis.direction === -1)
      document.body.classList.toggle('is--scrolling-down', this.lenis.direction === 1)
    })

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000) // Convert time from seconds to milliseconds
    })

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0)
  }

  createNav() {
    // Initialize the navigation
    this.nav = new Nav({
      lenis: this.lenis,
    })
  }

  createContact() {
    this.contact = new Contact({
      elements: document.querySelectorAll('[data-modal-open = "contact"]'),
      lenis: this.lenis,
    })
  }

  createSection() {
    this.sections = []

    // Initialize each section
    this.elements.forEach((section, i) => {
      switch (i) {
        case 0:
          this.hero = new Hero({
            section: section,
            lenis: this.lenis,
          })
          this.sections.push(this.hero)
          break
        case 1:
          this.fraud = new Fraud({
            section: section,
            lenis: this.lenis,
          })
          this.sections.push(this.fraud)
          break
        case 2:
          this.challenge = new Challenge({
            section: section,
            lenis: this.lenis,
          })
          this.sections.push(this.challenge)
          break

        case 3:
          this.mission = new Mission({
            section: section,
            lenis: this.lenis,
          })
          this.sections.push(this.mission)
          break
        case 4:
          this.leadership = new Leadership({
            section: section,
            lenis: this.lenis,
          })
          this.sections.push(this.leadership)
          break
      }
    })
  }

  /**
   * Scroll based updated removed
   */
  // toggleBlocking() {
  //   this.sections.forEach((section) => {
  //     section.preventBlocking = !section.preventBlocking
  //   })
  // }

  // handleNav(links) {
  //   links.forEach((link) => {
  //     const id = link.getAttribute('link')
  //     link.addEventListener('click', (e) => {
  //       this.toggleBlocking()
  //       e.preventDefault()
  //       setTimeout(this.toggleBlocking.bind(this), 1500)
  //       // this.lenis.scrollTo(document.querySelector(`#${id}`), {
  //       //   onStart: () => {
  //       //     console.log('start')
  //       //     this.toggleBlocking()
  //       //   },
  //       //   onComplete: () => {
  //       //     console.log('complete')
  //       //     this.toggleBlocking()
  //       //   },
  //       // })
  //     })
  //   })
  // }

  setMobileScrollSpeed() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      this.lenis.lerp = 0.1
    }
  }
}

history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

new App({
  elements: '[data-fullpage-section]',
})

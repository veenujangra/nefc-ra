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
    this.handleNav(document.querySelectorAll('.navlink_wrapper'))
  }

  init() {
    this.lenis = new Lenis({
      lerp: 0.075,
      smoothTouch: true,
      syncTouch: 0.075,
      autoResize: true,
    })
    document.body.addEventListener('click', (e) => {
      this.lenis.resize()
    })

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    this.lenis.on('scroll', ScrollTrigger.update)

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000) // Convert time from seconds to milliseconds
    })

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0)

    // Initialize the navigation
    this.nav = new Nav({
      lenis: this.lenis,
    })

    this.contact = new Contact({
      elements: document.querySelectorAll('[data-modal-open = "contact"]'),
      lenis: this.lenis,
    })

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
          this.challenge = new Challenge({
            section: section,
            lenis: this.lenis,
          })
          this.sections.push(this.challenge)
          break
        case 2:
          this.fraud = new Fraud({
            section: section,
            lenis: this.lenis,
          })
          this.sections.push(this.fraud)
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

  toggleBlocking() {
    this.sections.forEach((section) => {
      section.preventBlocking = !section.preventBlocking
    })
  }

  handleNav(links) {
    links.forEach((link) => {
      const id = link.getAttribute('link')
      link.addEventListener('click', (e) => {
        this.toggleBlocking()
        e.preventDefault()
        this.lenis.scrollTo(document.querySelector(`#${id}`), {
          onComplete: () => {
            this.toggleBlocking()
          },
        })
      })
    })
  }
}

history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

new App({
  elements: '[data-fullpage-section]',
})

import gsap from 'gsap'
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all'

export default class Snap {
  constructor(options) {
    this.section = options.section
    this.lenis = options.lenis
    this.body = document.body

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    this.scrolling = {
      enabled: true,
      events: 'scroll,wheel,touchmove,pointermove'.split(','),
      prevent: (e) => e.preventDefault(),
      disable() {
        if (this.scrolling.enabled) {
          this.scrolling.enabled = false
          window.addEventListener('scroll', gsap.ticker.tick, { passive: true }) // passive: true allows the event listener to run without blocking the main thread, improving performance.
          this.scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, this.scrolling.prevent, { passive: false })) // passive: false ensures that preventDefault() works.
        }
      },
      enable() {
        if (!this.scrolling.enabled) {
          this.scrolling.enabled = true
          window.removeEventListener('scroll', gsap.ticker.tick)
          this.scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, this.scrolling.prevent))
        }
      },
    }
    this.init()
  }

  init() {
    ScrollTrigger.create({
      trigger: this.section,
      start: 'top bottom-=1',
      end: 'bottom top+=1',
      onEnter: () => {
        this.goToSection(this.intro.bind(this))
        if (this.section.getAttribute('data-fullpage-section') === '4') {
          document.body.classList.add('lightmode--on')
        }
      },
      onEnterBack: () => {
        this.goToSection()
      },
      onLeave: () => {
        this.outro()
      },
      onLeaveBack: () => {
        if (this.section.getAttribute('data-fullpage-section') === '4') {
          document.body.classList.remove('lightmode--on')
        }
      },
    })
  }

  goToSection(animation) {
    if (this.scrolling.enabled) {
      this.scrolling.disable.bind(this)()

      this.lenis.scrollTo(this.section, {
        lerp: 0.075, // Optional lerp value for smooth scrolling
        duration: 1.87, // Optional duration value for smooth scrolling
        lock: true, // lock scroll when scrollTo is active
        onComplete: () => {
          this.scrolling.enable.bind(this)()
        },
      })

      animation && animation()
    }
  }

  intro() {}
  outro() {}
}

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

export default class Snap {
  constructor(options) {
    this.section = options.section
    this.lenis = options.lenis
    this.body = document.body

    this.playedOnce = false
    // this.preventBlocking = false

    gsap.registerPlugin(ScrollTrigger)

    // this.scrolling = {
    //   enabled: true,
    //   events: 'scroll,wheel,touchmove,pointermove'.split(','),
    //   prevent: (e) => e.preventDefault(),
    //   disable() {
    //     if (this.scrolling.enabled && !this.preventBlocking) {
    //       this.scrolling.enabled = false
    //       window.addEventListener('scroll', gsap.ticker.tick, { passive: true }) // passive: true allows the event listener to run without blocking the main thread, improving performance.
    //       this.scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, this.scrolling.prevent, { passive: false })) // passive: false ensures that preventDefault() works.
    //     }
    //   },
    //   enable() {
    //     if (!this.scrolling.enabled && !this.preventBlocking) {
    //       this.scrolling.enabled = true
    //       window.removeEventListener('scroll', gsap.ticker.tick)
    //       this.scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, this.scrolling.prevent))
    //     }
    //   },
    // }
  }

  init() {
    ScrollTrigger.create({
      trigger: this.section,
      start: 'top center',
      end: 'bottom top',
      onEnter: () => {
        // console.log(this.section, 'Enter')
        if (this.section.getAttribute('data-fullpage-section') === '4') {
          document.body.classList.add('lightmode--on')
        }
        if (this.playedOnce) return
        this.intro.bind(this)()
        this.playedOnce = true

        // if (this.preventBlocking) {
        //   this.intro.bind(this)()
        //   return
        // }
        // this.goToSection(this.intro.bind(this))
      },
      onEnterBack: () => {
        // console.log('Enter back')
        // if (this.preventBlocking) {
        //   return
        // }
        // this.intro.bind(this)()
        // this.goToSection(this.intro.bind(this))
      },
      onLeave: () => {
        // console.log('Leave')
        // this.outro()
      },
      onLeaveBack: () => {
        // console.log('Leave back')
        if (this.section.getAttribute('data-fullpage-section') === '4') {
          document.body.classList.remove('lightmode--on')
        }
        // this.intro.bind(this)()
        // if (this.preventBlocking) {
        //   return
        // }
      },
    })
  }

  // goToSection(animation) {
  //   if (this.scrolling.enabled) {
  //     // console.error(this.preventBlocking, this)
  //     this.scrolling.disable.bind(this)()

  //     this.lenis.scrollTo(this.section, {
  //       lerp: 0.075, // Optional lerp value for smooth scrolling
  //       duration: 1.87, // Optional duration value for smooth scrolling
  //       lock: true, // lock scroll when scrollTo is active
  //       onComplete: () => {
  //         this.scrolling.enable.bind(this)()
  //       },
  //     })
  //     animation && animation()
  //   }
  // }

  // handleNav(links) {
  //   links.forEach((link) => {
  //     const id = link.getAttribute('link')
  //     link.addEventListener('click', (e) => {
  //       this.preventBlocking = true
  //       console.log(this.preventBlocking, id, this)
  //       e.preventDefault()
  //       this.lenis.scrollTo(document.querySelector(`#${id}`), {
  //         onComplete: () => {
  //           // this.preventBlocking = false
  //         },
  //       })
  //     })
  //   })
  // }

  intro() {}
  outro() {}
}

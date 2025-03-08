import Snap from '../Snap'
import gsap from 'gsap'

export default class Fraud extends Snap {
  constructor(options) {
    super(options)
    super.init()
    this.section = options.section
    this.lenis = options.lenis
    this.circle = this.section.querySelector('[data-fraud-circle]')
    this.circleChildren = this.circle.querySelectorAll('ellipse')
    this.content = [...this.section.querySelectorAll('[data-fraud-content]')]
    this.incrementVar = this.section.querySelector('[data-fraud-increment]')

    this.loopComplete = false
    this.init()
  }

  init() {
    this.loopTl = gsap.timeline({
      onComplete: () => {
        this.circleChildren.forEach((element) => {
          element.style.fill = '#EF3529'
        })
        window.removeEventListener('wheel', (e) => {
          e.preventDefault()
        })
        this.scrolling.enable.bind(this)()
        this.lenis.start()
      },
    })
  }

  intro() {
    this.tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        this.incrementLoop()
      },
    })

    this.tl
      .fromTo(
        this.circle,
        {
          scale: 0.5,
          autoAlpha: 0,
          ease: 'power3.out',
        },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.733,
        }
      )
      .fromTo(
        this.content,
        {
          y: '2rem',
          autoAlpha: 0,
          ease: 'power3.out',
        },
        {
          y: '0',
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.1,
        }
      )
  }

  incrementCounter(duration) {
    const innerText = parseInt(this.incrementVar.innerText)
    gsap.to(this.incrementVar, {
      innerText: innerText + 1950,
      duration: duration,
      snap: {
        innerText: 1,
      },
    })
  }

  incrementLoop() {
    if (this.loopComplete) return
    this.loopComplete = true
    this.circleChildren.forEach((element) => {
      this.loopTl.to(element, {
        fill: '#EF3529',
        fillOpacity: 1,
        duration: 1,
        onStart: () => {
          this.incrementCounter(0)
          this.lenis.stop()
          this.scrolling.disable.bind(this)()
          window.addEventListener('wheel', (e) => {
            if (e.wheelDelta < 0) {
              this.loopTl.progress(this.loopTl.progress() + 0.005)
            }
          })
        },
        onComplete: () => {
          element.style.fill = '#C3DAFF'
        },
      })
    })
  }

  seekAnimation() {}
}

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
        this.loopEnd()
        window.removeEventListener('wheel', (e) => {
          e.preventDefault()
        })
        this.scrolling.enable.bind(this)()
        this.lenis.start()
      },
    })
  }

  loopEnd() {
    if (this.loopComplete) {
      this.incrementVar.style.color = '#EF3529'
      // get previous sibling of this.incrementVar
      this.incrementVar.previousElementSibling.style.color = '#EF3529'
      this.circleChildren.forEach((element) => {
        element.style.fill = '#EF3529'
      })
    }
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

  handleWheel(e) {
    if (e.wheelDelta < 0) {
      this.loopTl.progress(this.loopTl.progress() + 0.05)
    }
  }

  incrementLoop() {
    if (this.loopComplete) {
      return
    }
    this.loopComplete = true

    window.addEventListener('wheel', this.handleWheel.bind(this))

    this.circleChildren.forEach((element) => {
      this.loopTl.to(element, {
        fill: '#EF3529',
        fillOpacity: 1,
        duration: 1,
        onStart: () => {
          this.incrementCounter(0)
          this.lenis.stop()
          this.scrolling.disable.bind(this)()
        },
        onComplete: () => {
          element.style.fill = '#C3DAFF'
        },
      })
    })
  }

  seekAnimation() {}
}

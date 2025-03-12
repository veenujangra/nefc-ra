import Snap from '../Snap'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

export default class Fraud extends Snap {
  constructor(options) {
    super(options)
    super.init()
    this.section = options.section
    this.lenis = options.lenis
    this.circle = this.section.querySelector('[data-fraud-circle]')
    this.duration = this.circle.getAttribute('data-fraud-duration') || 0.2
    this.circleChildren = this.circle.querySelectorAll('ellipse')
    this.content = [...this.section.querySelectorAll('[data-fraud-content]')]
    this.incrementVar = this.section.querySelector('[data-fraud-increment]')

    this.preventBlocking = false

    this.loopComplete = false
    this.init()
  }

  init() {
    gsap.set(this.section, { autoAlpha: 0 })

    ScrollTrigger.create({
      trigger: this.section,
      start: 'top top',
      onEnter: () => {
        if (this.preventBlocking) return
        window.addEventListener('wheel', this.handleWheel.bind(this))
        // wheel event for mobile?
        window.addEventListener('touchmove', this.handleWheel.bind(this))

        if (this.loopComplete) return
        this.lenis.stop()
      },
      onEnterBack: () => {},
      onLeave: () => {},
      onLeaveBack: () => {},
    })

    this.loopTl = gsap.timeline({
      // scrollTrigger: {
      //   start: 'top center',
      //   end: 'bottom top',
      //   trigger: this.section,
      //   scrub: 0.5,
      // },
      // onComplete: () => {
      //   console.log('Loop complete', this.loopTl.progress())
      //   this.loopEnd()
      //   // window.removeEventListener('wheel', (e) => {
      //   //   e.preventDefault()
      //   // })
      //   // this.scrolling.enable.bind(this)()
      //   // this.lenis.start()
      // },
    })
  }

  loopEnd() {
    if (this.loopComplete) {
      // this.section.classList.add('loop--complete')

      this.incrementVar.style.color = '#EF3529'
      // get previous sibling of this.incrementVar
      this.incrementVar.previousElementSibling.style.color = '#EF3529'
      this.incrementVar.nextElementSibling.style.opacity = '1'

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
    this.tl.to(this.section, {
      autoAlpha: 1,
      duration: 0.5,
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
        },
        '-=0.4'
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
    // remove commas from innerText
    const innerText = parseInt(this.incrementVar.innerText.split(',').join('').split(' ').join('')) + 1950
    const formatter = new Intl.NumberFormat('en-US')
    const formattedInnerText = formatter.format(innerText)
    gsap.to(this.incrementVar, {
      innerText: formattedInnerText,
      duration: duration,
      // snap: {
      //   innerText: 1,
      // },
    })
  }

  handleWheel(e) {
    // Detect scroll direction with touch event
    if (e.type === 'touchmove') {
      e.preventDefault()
      this.scrollDirection = e.touches[0].clientY < this.touchStart ? 'up' : 'down'
      this.touchStart = e.touches[0].clientY
    } else if (e.type === 'wheel') {
      // Scroll direction
      this.scrollDirection = e.wheelDelta < 0 ? 'down' : 'up'
    }

    if (this.scrollDirection === 'up') {
      this.lenis.start()
    } else if (this.scrollDirection === 'down' && ScrollTrigger.isInViewport(this.section, 0.9) && !this.loopComplete && !this.preventBlocking) {
      this.lenis.stop()
      this.loopTl.progress(this.loopTl.progress() + 0.03)
    } else if (this.loopComplete) {
      this.lenis.start()
    }

    // if (this.loopTl.progress() === 1 || this.loopTl.progress() === 0) {
    //   this.lenis.start()
    // } else {
    //   this.lenis.stop()
    //   if (e.wheelDelta < 0) {
    //     this.loopTl.progress(this.loopTl.progress() + 0.03)
    //   }
    //   // else {
    //   //   this.loopTl.progress(this.loopTl.progress() - 0.03)
    //   // }
    // }
  }

  incrementLoop() {
    if (this.loopComplete) {
      return
    }

    // On Lenis Scroll
    // this.lenis.on('scroll', () => {
    //   this.loopTl.progress(this.loopTl.progress() + 0.03)
    // })

    this.circleChildren.forEach((element) => {
      this.loopTl.to(element, {
        fill: '#EF3529',
        fillOpacity: 1,
        duration: this.duration,
        onStart: () => {
          this.incrementCounter(0)
          // if (!this.preventBlocking) {
          //   this.lenis.stop()
          //   console.log('Lenis stopped')
          //   this.scrolling.disable.bind(this)()
          // }
        },
        onComplete: () => {
          element.style.fill = '#C3DAFF'
        },
      })
    })

    this.loopTl.eventCallback('onComplete', () => {
      this.loopComplete = true
      this.loopEnd()
      window.removeEventListener('wheel', (e) => {
        e.preventDefault()
      })
    })
  }

  isSectionAtTop(sectionSelector) {
    let section = sectionSelector
    if (!section) return false

    let rect = section.getBoundingClientRect()
    return Math.abs(rect.top) < 1 // Checks if top is at or very close to 0
  }
}

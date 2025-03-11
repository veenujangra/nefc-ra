import Snap from '../Snap'
import gsap from 'gsap'

export default class Challenge extends Snap {
  constructor(options) {
    super(options)
    super.init()
    this.section = options.section
    this.circle = this.section.querySelector('[data-challenge-circle]')
    this.content = {
      right: this.section.querySelector('[data-challenge-content="right"]'),
      left: this.section.querySelector('[data-challenge-content="left"]'),
    }
    this.sideContent = this.section.querySelector('[data-challenge-side-content]')

    this.init()
  }

  init() {
    gsap.set(this.section, { autoAlpha: 0 })
  }

  intro() {
    this.tl = gsap.timeline({
      delay: 0.2,
    })
    gsap.to(this.section, {
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
        this.content.right,
        {
          x: '-100%',
          autoAlpha: 0,
        },
        {
          x: '0',
          autoAlpha: 1,
          duration: 0.5,
        },
        '-=0.733'
      )
      .fromTo(
        this.content.left,
        {
          x: '100%',
          autoAlpha: 0,
        },
        {
          x: '0',
          autoAlpha: 1,
          duration: 0.5,
        },
        '-=0.733'
      )
      .fromTo(
        this.sideContent,
        {
          y: '50%',
          autoAlpha: 0,
          ease: 'power3.out',
        },
        {
          y: '0',
          autoAlpha: 1,
          duration: 0.66,
        }
      )
  }

  outro() {}
}

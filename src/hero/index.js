import gsap from 'gsap'
import Snap from '../Snap'

export default class Hero extends Snap {
  constructor(options) {
    super(options)
    super.init()

    this.section = options.section

    this.media = this.section.querySelector('[data-media]')
    this.title = this.section.querySelector('[data-title]')
    this.marquee = this.section.querySelector('[data-marquee]')

    this.init()

    this.outro()
  }

  init() {
    // ScrollTrigger.create({
    //   trigger: this.section,
    //   start: 'top bottom-=1',
    //   end: 'bottom top+=1',
    //   onEnter: () => this.goToSection(),
    //   onEnterBack: () => this.goToSection(),
    // })
    // this.lines = new SplitType(this.title, { type: 'lines' }).lines
    this.tlOut = gsap.timeline({
      scrollTrigger: {
        trigger: this.section,
        start: 'center center',
        end: 'bottom top',
        scrub: 1,
        // markers: true,
      },
    })
  }

  // goToSection() {
  //   console.log(this.section)
  //   // if (this.scrolling.enabled) {
  //   //   this.scrolling.disable()
  //   //   gsap.to(window, {
  //   //     scrollTo: { y: this.section, autoKill: false },
  //   //     onComplete: this.scrolling.enable,
  //   //     duration: 1,
  //   //   })
  //   // }
  // }

  intro() {
    this.tl = gsap.timeline()

    this.tl.fromTo(
      this.media,
      {
        y: '8rem',
        filter: 'blur(4px)',
        autoAlpha: 0,
      },
      {
        y: '0',
        filter: 'blur(0px)',
        delay: 1,
        autoAlpha: 1,
        duration: 1.7,
        ease: 'power3.out',
      }
    )
  }

  outro() {
    // this.tl.to(this.lines, this.marquee, this.media, {
    //   y: '-100%',
    //   autoAlpha: 0,
    //   duration: 0.733,
    //   ease: 'power3.in',
    //   stagger: 0.1,
    // })

    this.tlOut.to(
      this.media,
      {
        y: '-12rem',
      },
      0
    )
  }
}

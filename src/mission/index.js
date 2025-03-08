import Snap from '../Snap'
import gsap from 'gsap'
import { Flip } from 'gsap/all'

export default class Mission extends Snap {
  constructor(options) {
    super(options)
    super.init()
    this.section = options.section
    this.content = this.section.querySelectorAll('[data-mission-content]')
    this.media = this.section.querySelectorAll('[data-mission-media]')
    this.mediaWrapper = this.section.querySelector('[data-mission-media-wrapper]')

    this.body = document.body

    this.elements = [...this.content, ...this.media, this.mediaWrapper]

    this.flipOptions = {
      duration: 1,
    }

    this.init()

    gsap.registerPlugin(Flip)
  }

  init() {
    // gsap.set(this.elements, { display: 'none' })
    // gsap.set(this.mediaWrapper, { height: '0%', autoAlpha: 0 })
  }

  updateAllStates() {
    this.allStates = this.elements.map((element) => Flip.getState(element))
  }

  intro() {
    this.tl = gsap.timeline({
      delay: 0.33,
    })

    this.tl.fromTo(
      [this.media[1]],
      {
        autoAlpha: 0,
        y: '50%',
        // display: 'none',

        // onComplete: () => {
        //   this.media0State = Flip.getState(this.media[0])
        //   this.media1State = Flip.getState(this.media[1])
        // },
      },
      {
        // display: 'block',
        y: '0%',
        duration: 0.733,
        autoAlpha: 0.2,
        onComplete: () => {
          this.media1State = Flip.getState(this.media[1], { props: 'opacity, filter' })
          // Flip.from(this.media0State, this.flipOptions)
          // Flip.from(this.media1State, this.flipOptions)
        },
      }
    )
    // Blur the media
    this.tl.to(this.media[1], {
      filter: 'blur(3px)',
      duration: 0.5,
    })
    // Paragraph 1 and 2
    this.tl.fromTo(
      [this.content[0], this.content[1]],
      {
        autoAlpha: 0,
        y: '50%',
        // height: '0%',
        // display: 'none',
        // onComplete: () => {
        //   this.content0State = Flip.getState(this.content[0])
        //   this.content1State = Flip.getState(this.content[1])
        // },
      },
      {
        // display: 'block',
        y: '0%',
        // height: 'auto',
        duration: 1.125,
        autoAlpha: 1,
        // onComplete: () => {
        //   Flip.from(this.content0State, this.flipOptions)
        //   Flip.from(this.content1State, this.flipOptions)
        // },
        onComplete: () => {},
      },
      '-=0.33'
    )

    // Media 2
    this.tl.fromTo(
      [this.mediaWrapper],
      {
        autoAlpha: 0,
        // height: '0%',
        // display: 'none',
        // onComplete: () => {
        //   this.media2State = Flip.getState(this.media[2])
        //   this.mediaWrapperState = Flip.getState(this.mediaWrapper)
        // },
      },
      {
        // display: 'block',
        duration: 1.125,
        // height: '35rem',
        autoAlpha: 1,
        // onComplete: () => {
        //   Flip.from(this.media2State, this.flipOptions)
        //   Flip.from(this.mediaWrapperState, this.flipOptions)
        // },
      }
    )
    // Animate Globe into small globe
    this.tl.to(
      this.media[1],
      {
        duration: 0.5,
        // filter: 'blur(0px)',
        // ease: 'power3.out',
        // autoAlpha: 1,
        onComplete: () => {
          this.media[1].style.filter = 'blur(0px)'
          this.media[1].style.opacity = 1
          this.mediaWrapper.appendChild(this.media[1])

          Flip.from(this.media1State, {
            duration: 1,
            absolute: true,
          })
        },
      },
      '-=0.5'
    )

    // Paragraph 3
    this.tl.fromTo(
      [this.content[2], this.content[3]],
      {
        autoAlpha: 0,
        y: '50%',
        // height: '0%',
        // display: 'none',
        // onComplete: () => {
        //   this.content2State = Flip.getState(this.content[2])
        //   this.content3State = Flip.getState(this.content[3])
        // },
      },
      {
        // display: 'block',
        y: '0%',
        // height: 'auto',
        duration: 1.125,
        autoAlpha: 1,
        // onComplete: () => {
        //   Flip.from(this.content2State, this.flipOptions)
        //   Flip.from(this.content3State, this.flipOptions)
        // },
      },
      '-=1.125'
    )
  }

  outro() {
    // this.media[0].appendChild(this.media[1])
  }
}

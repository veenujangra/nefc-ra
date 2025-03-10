import Snap from '../Snap'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

export default class Leadership extends Snap {
  constructor(options) {
    super(options)
    super.init()

    gsap.registerPlugin(ScrollTrigger)

    this.section = options.section
    this.cards = this.section.querySelectorAll('.team_card')

    this.modal = {
      element: document.querySelector('.modal_wrapper'),
      team: document.querySelector('.modal_team'),

      containers: [...document.querySelectorAll('.container')],
      shrinkContainerSizes: () => {
        this.modal.containers.forEach((container) => {
          container.style.width = '75%'
        })
      },
      revertContainerSizes: () => {
        this.modal.containers.forEach((container) => {
          container.style.width = '90%'
        })
      },
      modalClose: () => {
        if (!this.modal.element.classList.contains('is--open')) {
          return
        }
        console.log('close team')
        this.section.removeAttribute('data-lenis-prevent')
        setTimeout(() => {
          this.modal.team.style.display = 'none'
        }, 800)
        this.modal.element.classList.remove('is--open')
        document.body.style.overflow = 'auto'
        this.section.style.removeProperty('height')
        this.section.style.removeProperty('overflow')
        this.resetActiveState()
        this.modal.revertContainerSizes()
      },
    }
    this.modal.modalCloseElement = this.modal.team.querySelectorAll('.modal_close')
    this.modal.containers.shift()
    this.addEventListeners()
  }

  init() {
    // window.addEventListener('wheel', this.handleWheel.bind(this))
  }

  handleWheel(e) {
    if (this.modal.element.classList.contains('is--open') && (this.isSectionAtTop(this.section) || this.isSectionBottomAligned(this.section))) {
      this.lenis.scrollTo(this.section)
    }
  }

  isSectionAtTop(sectionSelector) {
    let section = sectionSelector
    if (!section) return false

    let rect = section.getBoundingClientRect()
    return Math.abs(rect.top) < 1 // Checks if top is at or very close to 0
  }

  isSectionBottomAligned(sectionSelector) {
    let section = sectionSelector
    if (!section) return false

    let rect = section.getBoundingClientRect()
    return Math.abs(rect.bottom - window.innerHeight) < 1 // Close to zero for precision
  }

  handleClick(card, index) {
    // Change modal content
    this.sliderDots = document.querySelectorAll('#sliderNav .w-slider-dot')

    // Set section top to top of window
    this.lenis.scrollTo(this.section)
    // this.section.scrollIntoView({ behavior: 'smooth', block: 'start' })

    this.section.setAttribute('data-lenis-prevent', 'true')

    // Blocking scroll on body
    document.body.style.overflow = 'hidden'
    this.section.style.setProperty('height', '100vh', 'important')
    this.section.style.overflow = 'auto'

    // Open modal
    this.modal.team.style.display = 'block'
    this.modal.element.classList.add('is--open')
    // Shrink container sizes
    this.modal.shrinkContainerSizes()
    // Set active state
    this.resetActiveState()
    this.setActiveState(card, index)
  }

  setActiveState(card, index) {
    card.classList.add('is--active')
    this.sliderDots[index].click()
  }

  resetActiveState() {
    this.cards.forEach((card) => {
      card.classList.remove('is--active')
    })
  }

  addEventListeners() {
    this.cards.forEach((card, index) => {
      card.addEventListener('click', this.handleClick.bind(this, card, index))
    })

    this.modal.modalCloseElement.forEach((element) => {
      element.addEventListener('click', this.modal.modalClose)
    })
  }

  scrollOnModalOpen() {}

  intro() {
    console.log()
    // this.lenis.stop()
  }
  outro() {}
}

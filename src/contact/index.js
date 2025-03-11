export default class Contact {
  constructor(options) {
    this.triggers = options.elements
    this.lenis = options.lenis

    this.init()
    this.addEventListeners()
  }
  init() {
    this.modal = {
      element: document.querySelector('.modal_wrapper'),
      team: document.querySelector('.modal_team'),
      contact: document.querySelector('.modal_contact'),

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
        // setTimeout(() => {
        //   this.modal.contact.style.display = 'none'
        // }, 800)
        this.lenis.start()
        this.modal.element.classList.remove('is--open')
        // document.body.style.overflow = 'auto'
        this.modal.revertContainerSizes()
      },
    }
    this.modal.modalCloseElement = this.modal.contact.querySelectorAll('.modal_close')
    this.modal.containers.shift()
  }

  handleClick() {
    this.modal.contact.style.display = 'block'
    this.modal.team.style.display = 'none'

    this.modal.element.classList.add('is--open')
    this.lenis.stop()
    this.modal.shrinkContainerSizes()
  }

  addEventListeners() {
    this.triggers.forEach((trigger) => {
      trigger.addEventListener('click', this.handleClick.bind(this))
    })

    this.modal.modalCloseElement.forEach((closeElement) => {
      closeElement.addEventListener('click', this.modal.modalClose.bind(this))
    })
  }
}

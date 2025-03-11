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
      team: document.querySelector('.modal_team').closest('.modal_container'),
      contact: document.querySelector('.modal_contact').closest('.modal_container'),

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
        document.body.classList.remove('is--modal-open')

        this.lenis.start()
        this.modal.element.classList.remove('is--open')
        // document.body.style.overflow = 'auto'
        this.modal.revertContainerSizes()
      },
    }
    this.modal.modalCloseElement = this.modal.contact.querySelectorAll('.modal_close')
    this.modalContainer = this.modal.contact.closest('.modal_container')
    this.modal.containers.shift()
  }

  handleClick() {
    document.body.classList.add('is--modal-open')
    // If mobile, don't scroll to top
    if (window.innerWidth < 768) {
      this.modal.contact.style.display = 'block'
      this.modal.team.style.display = 'none'

      this.modal.element.classList.add('is--open')
      // Shrink container sizes
      // this.modal.shrinkContainerSizes()
      return
    }

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

export default class Nav {
  constructor(options) {
    // super({
    //   section: document.querySelector('.navbar'),
    // })

    this.lenis = options.lenis
    this.links = document.querySelectorAll('.navlink_wrapper')
    this.menuButton = document.querySelector('.menu_button')

    // this.handleNav = super.handleNav(this.links)
    this.init()
    // this.addEventListeners()
    this.addMutationObserver()
  }

  // add mutation observer to this.menuButton for class w--open
  addMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const attributeValue = mutation.target.getAttribute(mutation.attributeName)
          if (attributeValue.includes('w--open')) {
            this.lenis.stop()
            document.body.classList.add('menu-open')
          } else {
            this.lenis.start()
            document.body.classList.remove('menu-open')
          }
        }
      })
    })

    observer.observe(this.menuButton, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }

  init() {
    this.lenis.on('scroll', (e) => {
      if (e.animatedScroll > 200) {
        document.body.classList.add('scrolled')
      } else {
        document.body.classList.remove('scrolled')
      }
    })
  }

  addEventListeners() {
    this.links.forEach((link) => {
      const id = link.getAttribute('link')
      link.addEventListener('click', (e) => {
        e.preventDefault()
        this.lenis.scrollTo(document.querySelector(`#${link.getAttribute('link')}`))
      })
    })
  }

  intro() {}
  outro() {}
}

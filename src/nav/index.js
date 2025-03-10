import Snap from '../Snap'

export default class Nav {
  constructor(options) {
    // super({
    //   section: document.querySelector('.navbar'),
    // })

    this.lenis = options.lenis
    this.links = document.querySelectorAll('.navlink_wrapper')
    // this.handleNav = super.handleNav(this.links)
    this.init()
    // this.addEventListeners()
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

export default class Nav {
  constructor(options) {
    this.lenis = options.lenis
    this.links = document.querySelectorAll('.navlink')
    this.init()
    this.addEventListeners()
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
      link.addEventListener('click', (e) => {
        e.preventDefault()
        // this.lenis.scrollTo(document.querySelector(link.getAttribute('href')))
      })
    })
  }
}

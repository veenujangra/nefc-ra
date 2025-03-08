export default class Nav {
  constructor(options) {
    this.lenis = options.lenis
    this.init()
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
}

/**
 * Custom JavaScript for FixIt documentation site.
 * @author @sravivarman https://sravivarman.com
 */
class FixItDocs {
  constructor() {
    this.author = {
      name: 'sravivarman',
      github: 'https://github.com/sravivarman',
      website: 'https://sravivarman.com',
    }
    this.site = 'SRavivarman'
    this.url = location.origin
  }

  /**
   * print theme info with pretty style
   * @returns {FixItDocs} FixItDocs instance
   */
  themeInfo() {
    // Commented out version display in header subtitle
    // let subtitle = window.fixit.config?.version || 'unknown'

    // if (subtitle.split('-').length > 2) {
    //   subtitle = subtitle.replace(/-.*$/, '*')
    // }
    // // set header subtitle with theme version (desktop and mobile)
    // const headerSubtitles = document.querySelectorAll('.header-subtitle')
    // headerSubtitles.forEach((el) => {
    //   el.textContent = subtitle
    // })
    return this
  }

  /**
   * initialize
   * @returns {FixItDocs} FixItDocs instance
   */
  init() {
    this.themeInfo()
    return this
  }
}

/**
 * immediate execution
 */
(() => {
  window.fixitDocs = new FixItDocs()
  // it will be executed when the DOM tree is built
  document.addEventListener('DOMContentLoaded', () => {
    window.fixitDocs.init()
  })
})()

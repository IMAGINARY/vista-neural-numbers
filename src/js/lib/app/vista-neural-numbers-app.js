import formatText from '../helpers-web/format-text';
import initContent from '../init/init-content';
import SlideShow from './slide-show';
import hashSlideshowRouter from './hash-slideshow-router';

export default class VistaNeuralNumbersApp {
  /**
   * Configuration object for the application.
   * @type {Object}
   */
  config;
  /**
   * Width of the application display.
   * @type {number}
   */
  width;
  /**
   * Height of the application display.
   * @type {number}
   */
  height;
  /**
   * Root jQuery element of the application.
   * @type {JQuery|null}
   */
  $element = null;
  /**
   * Current language code for the application.
   * @type {string}
   * @private
   */
  #lang = 'en';
  #slideShow = null;

  constructor(config) {
    this.config = config;
    this.width = config.app.display.width ?? 1920;
    this.height = config.app.display.height ?? 1080;

    this.$element = $('<div></div>')
      .addClass(['vista-neural-numbers-app', 'app'])
      .css({
        width: this.width,
        height: this.height,
      });

    this.#slideShow = new SlideShow();
    this.$element.append(this.#slideShow.$element);
  }

  /**
   * Initializes the application.
   *
   * @return {Promise<void>}
   */
  async init() {
    this.setLang(this.config.i18n.defaultLanguage);
    initContent(this, this.#slideShow);
    hashSlideshowRouter(this.#slideShow);
  }

  /**
   * Sets the language for the application.
   *
   * @param {string} code
   *  Language code to set.
   */
  setLang(code) {
    if (!this.config.i18n.languages[code]) {
      throw new Error(`Trying to swtich language to '${code}', which is not included in config.i18n.languages`);
    }
    this.#lang = code;
    this.updateTexts();
  }

  /**
   * Gets the current language of the application.
   *
   * @return {string}
   */
  getLang() {
    return this.#lang;
  }

  /**
   * Toggles the language of the application.
   */
  toggleLang() {
    const langCodes = Object.keys(this.config.i18n.languages);
    const currentLangIndex = langCodes.indexOf(this.#lang);
    const nextLangIndex = (currentLangIndex + 1) % langCodes.length;
    this.setLang(langCodes[nextLangIndex]);
  }

  /**
   * Updates the text elements in the application based on the current language.
   *
   * @private
   */
  updateTexts() {
    const strings = this.config.i18n.strings[this.#lang];
    this.$element.find('[data-i18n-text]').each((_, el) => {
      const $el = $(el);
      const textKey = $el.data('i18n-text');
      if (strings[textKey]) {
        $el.html(formatText(strings[textKey]));
      }
    });
  }
}

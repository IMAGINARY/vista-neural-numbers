import formatText from '../helpers-web/format-text';
import SlideShow from '../slide-show/slide-show';
import SlideShowPager from '../slide-show/slide-show-pager';
import slideShowHashRouter from '../slide-show/slide-show-hash-router';
import initContent from '../init/init-content';
import LanguageSwitchButton from './language-switch-button';

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
  #pager = null;
  #utilityControls = null;
  #langSwitchButton = null;
  #resetButton = null;

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
    this.setLang(this.config.i18n.defaultLanguage);
  }

  /**
   * Initializes the application.
   *
   * @return {Promise<void>}
   */
  async init() {
    // Slide show
    this.#slideShow = new SlideShow();
    this.$element.append(this.#slideShow.$element);
    await initContent(this, this.#slideShow);
    slideShowHashRouter(this.#slideShow);
    // Slide show pager
    this.#pager = new SlideShowPager(this.#slideShow);
    this.$element.append(this.#pager.$element);
    // Utility controls
    this.#utilityControls = $('<div></div>')
      .addClass('utility-controls');
    this.$element.append(this.#utilityControls);
    // Utility: Reset button
    this.#resetButton = $('<button></button>')
      .addClass('reset-button')
      .attr('title', 'Reset')
      .on('click', () => {
        this.#slideShow.goToSlide(0);
      })
      .appendTo(this.#utilityControls);
    // Utility: Language switcher
    this.#langSwitchButton = new LanguageSwitchButton(this);
    this.#langSwitchButton.$element.appendTo(this.#utilityControls);
    this.updateTexts();
    this.hookInternalNavigation();
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

  hookInternalNavigation() {
    this.$element.find('a').on('click', (event) => {
      const href = event.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        event.preventDefault();
        const targetId = href.substring(1);
        this.#slideShow.goToSlideById(targetId);
      }
    });
  }
}

export default class LanguageSwitchButton {
  constructor(app) {
    this.app = app;
    this.languages = app.config.i18n.languages;
    this.currentLang = app.getLang();

    this.$element = $('<button></button>')
      .addClass('language-switch-button')
      .on('click', () => this.switchLanguage());
    this.updateButtonLabel();
  }

  updateButtonLabel() {
    const nextLang = this.getNextLanguage();
    this.$element.text(this.languages[nextLang]);
  }

  getNextLanguage() {
    const langCodes = Object.keys(this.languages);
    const currentIndex = langCodes.indexOf(this.currentLang);
    const nextIndex = (currentIndex + 1) % langCodes.length;
    return langCodes[nextIndex];
  }

  switchLanguage() {
    const nextLang = this.getNextLanguage();
    this.app.setLang(nextLang);
    this.currentLang = nextLang;
    this.updateButtonLabel();
  }
}

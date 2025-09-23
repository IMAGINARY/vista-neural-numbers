const EventEmitter = require('events');

export default class SlideShow {
  slides = [];
  slidesById = {};
  currentSlideIndex = -1;
  $element = null;

  constructor() {
    this.events = new EventEmitter();
    this.$element = $('<div>')
      .addClass('slide-show');
  }

  addSlide(slide) {
    this.slides.push(slide);
    if (this.slidesById[slide.id]) {
      throw new Error(`A slide with id ${slide.id} already exists.`);
    }
    this.slidesById[slide.id] = slide;
    this.$element.append(slide.$element);
  }

  getSlideIndexById(id) {
    const slide = this.slidesById[id];
    if (!slide) {
      throw new Error(`No slide found with id ${id}`);
    }
    return this.slides.indexOf(slide);
  }

  goToSlideById(id) {
    const index = this.getSlideIndexById(id);
    if (index === -1) {
      throw new Error(`No slide found with id ${id}`);
    }
    this.goToSlide(index);
  }

  goToSlide(index) {
    if (index < 0 || index >= this.slides.length) {
      throw new Error(`Slide index ${index} is out of bounds.`);
    }
    if (this.currentSlideIndex === index) {
      return;
    }
    if (this.currentSlideIndex >= 0) {
      this.slides[this.currentSlideIndex].onExit();
    }
    this.currentSlideIndex = index;
    this.slides[this.currentSlideIndex].onEnter();
    this.events.emit('slideChanged', this.currentSlideIndex);
  }

  nextSlide() {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.goToSlide(this.currentSlideIndex + 1);
    }
  }

  previousSlide() {
    if (this.currentSlideIndex > 0) {
      this.goToSlide(this.currentSlideIndex - 1);
    }
  }
}

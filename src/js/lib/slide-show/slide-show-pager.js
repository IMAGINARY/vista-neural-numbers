export default class SlideShowPager {
  constructor(slideshow) {
    this.slideshow = slideshow;
    this.$element = $('<div></div>')
      .addClass('slide-show-pager');
    this.buttons = [];
    this.initButtons();
  }

  initButtons() {
    this.slideshow.slides.forEach((slide, index) => {
      const $button = $('<a></a>')
        .addClass('pager-button')
        .attr('href', `#${slide.id}`)
        .text(index + 1)
        .on('click', (e) => {
          e.preventDefault();
          this.slideshow.goToSlide(index);
        });
      this.$element.append($button);
      this.buttons.push($button);
    });

    this.slideshow.events.on('slideChanged', (index) => {
      this.updateActiveButton(index);
    });

    // Initialize the active button
    this.updateActiveButton(this.slideshow.currentSlideIndex);
  }

  updateActiveButton(activeIndex) {
    this.buttons.forEach(($button, index) => {
      if (index === activeIndex) {
        $button.addClass('active');
      } else {
        $button.removeClass('active');
      }
    });
  }
}

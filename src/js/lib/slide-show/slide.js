export default class Slide {
  constructor(id, content, props = {}) {
    this.id = id;
    this.props = props;
    this.$element = $('<div>')
      .attr('id', id)
      .addClass('slide')
      .html(content);
  }

  onEnter() {
    if (this.props.onEnter) {
      this.props.onEnter(this);
    }
    this.$element.addClass('active');
  }

  onExit() {
    this.$element.removeClass('active');
    if (this.props.onExit) {
      this.props.onExit(this);
    }
  }
}

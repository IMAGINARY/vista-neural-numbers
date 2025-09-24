export default class Slide {
  constructor(id, content, props = {}) {
    this.id = id;
    this.props = props;
    this.$element = $('<div>')
      .attr('id', id)
      .addClass('slide')
      .html(content);
  }

  async onInit() {
    if (this.props.onInit) {
      await this.props.onInit(this);
    }
  }

  async onEnter() {
    if (this.props.onEnter) {
      await this.props.onEnter(this);
    }
    this.$element.addClass('active');
  }

  async onExit() {
    this.$element.removeClass('active');
    if (this.props.onExit) {
      await this.props.onExit(this);
    }
  }
}

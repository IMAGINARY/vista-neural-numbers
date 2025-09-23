import Slide from '../slide-show/slide';
import slide1 from '../../../../content/slide-1-start.html';
import slide2 from '../../../../content/slide-2-train.html';
import slide3 from '../../../../content/slide-3-what-is-nn.html';
import slide4 from '../../../../content/slide-4-what-is-training-data.html';
import slide5 from '../../../../content/slide-5-how-nn-learns.html';

export default function initContent(app, slideShow) {
  const slides = [
    new Slide('start', slide1),
    new Slide('train-the-neural-network', slide2),
    new Slide('what-is-a-neural-network', slide3),
    new Slide('what-is-training-data', slide4),
    new Slide('how-neural-networks-learn', slide5),
  ];

  slides.forEach((slide) => slideShow.addSlide(slide));
  slideShow.goToSlide(0);
}

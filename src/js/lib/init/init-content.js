import Slide from '../slide-show/slide';
import slide1 from '../../../../content/slide-1-start.html';
import slide2 from '../../../../content/slide-2-train.html';
import slide3 from '../../../../content/slide-3-what-is-nn.html';
import slide4 from '../../../../content/slide-4-what-is-training-data.html';
import slide5 from '../../../../content/slide-5-how-nn-learns.html';
import {
  createBasicRecognizer, createNormalizerDemo,
  createTrainingUI,
} from '../neural-numbers/create-nn-components';

export default async function initContent(app, slideShow) {
  const slides = [
    new Slide('start', slide1, {
      onInit: async (slide) => {
        const $container = slide.$element.find('[data-component="neural-numbers"]');
        const placeholderId = $container.attr('data-placeholder-id');
        slide.recognizer = await createBasicRecognizer(
          $container,
          app.config.ai.modelPath,
          placeholderId
        );
      },
      onExit: async (slide) => {
        slide.recognizer.clearInput();
      },
    }),
    new Slide('train-the-neural-network', slide2, {
      onInit: async (slide) => {
        const $container = slide.$element.find('[data-component="neural-numbers"]');
        const $trainginUIContainer = slide.$element.find('[data-component="neural-numbers-training-ui"]');
        const placeholderId = $container.attr('data-placeholder-id');
        slide.recognizer = await createBasicRecognizer(
          $container,
          app.config.ai.modelPath,
          placeholderId
        );
        slide.trainingUI = await createTrainingUI(
          $trainginUIContainer,
          slide.recognizer,
          app.config.ai.trainingImagePath,
          app.config.ai.trainingLabelPath,
          'training-label-images-used',
          'training-label-predicted-accuracy'
        );
      },
      onEnter: async (slide) => {
        const { trainingController } = slide.trainingUI;
        trainingController.useTrainableModel();
      },
      onExit: async (slide) => {
        const { trainingController } = slide.trainingUI;
        if (trainingController.isTraining()) {
          await trainingController.pause();
        }
        trainingController.useDefaultModel();
        slide.recognizer.clearInput();
      },
    }),
    new Slide('what-is-a-neural-network', slide3),
    new Slide('what-is-training-data', slide4, {
      onInit: async (slide) => {
        const $container = slide.$element.find('[data-component="neural-numbers-normalizer"]');
        const placeholderId = $container.attr('data-placeholder-id');
        slide.normalizer = await createNormalizerDemo(
          $container,
          app.config.ai.modelPath,
          placeholderId
        );
      },
      onExit: async (slide) => {
        slide.normalizer.clearInput();
      },
    }),
    new Slide('how-neural-networks-learn', slide5),
  ];

  slides.forEach((slide) => slideShow.addSlide(slide));
  // eslint-disable-next-line no-restricted-syntax
  for (const slide of slides) {
    // eslint-disable-next-line no-await-in-loop
    await slide.onInit();
  }
  slideShow.goToSlide(0);
}

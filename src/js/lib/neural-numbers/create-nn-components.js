/* global IMAGINARY */
export async function createBasicRecognizer($container, model, placeholderId) {
  const component = new IMAGINARY.NeuralNumbers(
    $container,
    {
      modelPath: model,
      inputPlaceholder: `<span data-i18n-text="${placeholderId}"></span>`,
      showBars: true,
      verticalBars: false,
      showNormalizer: false,
      showOutput: true,
      showInput: true,
    }
  );
  await component.init();
  return component;
}

export async function createTrainingUI(
  $trainingContainer,
  recognizerComponent,
  trainingImagePath,
  trainingLabelPath,
  imageCountCaptionId,
  predictedAccuracyCaptionId,
) {
  const trainer = new IMAGINARY.NeuralNumbersTraining(
    recognizerComponent,
    $trainingContainer,
    {
      trainingImagePath,
      trainingLabelPath,
      imageCountLabelText: `<div class='image-count-label' data-i18n-text="${imageCountCaptionId}"></div>`,
      predictedAccuracyLabelText: `<div class='predicted-accuracy-label' data-i18n-text="${predictedAccuracyCaptionId}"></div>`,
    }
  );
  await trainer.init();
  return trainer;
}

export async function createNormalizerDemo($container, model, placeholderId) {
  const component = new IMAGINARY.NeuralNumbers(
    $container,
    {
      modelPath: model,
      inputPlaceholder: `<span data-i18n-text="${placeholderId}"></span>`,
      showBars: false,
      showNormalizer: true,
      showOutput: false,
      showInput: true,
    }
  );
  await component.init();
  return component;
}

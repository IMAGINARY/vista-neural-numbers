/* eslint-disable no-console */
import '../sass/default.scss';
import yaml from 'js-yaml';
import initSentry from './lib/helpers/sentry';
import showFatalError from './lib/helpers-web/show-fatal-error';
import CfgLoader from './lib/loader/cfg-loader';
import CfgReaderFetch from './lib/loader/cfg-reader-fetch';
import AppScaler from './lib/helpers-web/app-scaler';
import VistaNeuralNumbersApp from './lib/app/vista-neural-numbers-app';

(async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);

    const sentryDSN = urlParams.get('sentry-dsn');
    let sentryInitialized = false;
    if (sentryDSN) {
      sentryInitialized = !!initSentry(sentryDSN);
    }

    // Accept a settings url param but only if it's made of alphanumeric characters, _ or -, and
    // has a .yml extension.
    let settingsFilename = 'settings.yml';
    const settingsFileUnsafe = urlParams.get('settings');
    if (urlParams.get('settings')) {
      if (!urlParams.get('settings').match(/^[a-zA-Z0-9_-]+\.yml$/)) {
        console.warn(
          'Invalid settings file name. Ignoring. Use only alphanumeric characters, _ or -. and .yml extension.');
      } else {
        settingsFilename = settingsFileUnsafe;
      }
    }

    // Load the configuration
    const cfgLoader = new CfgLoader(CfgReaderFetch, yaml.load);
    const config = await cfgLoader.load([
      'config/app.yml',
      'config/ai.yml',
      'config/i18n.yml',
      settingsFilename,
    ]).catch((err) => {
      throw new Error(`Error loading configuration: ${err.message}`);
    });

    if (!sentryInitialized && config?.app?.sentry?.dsn) {
      sentryInitialized = !!initSentry(config.app.sentry.dsn);
    }

    // Load the translations
    const trLangCodes = Object.keys(config.i18n.languages);
    config.i18n.strings = await cfgLoader.load(
      trLangCodes.map((code) => `tr/${code}.yml`),
      (cfg, fileName) => {
        // Get the lang code from the file name
        const langCode = fileName.split('/').pop().split('.')[0];
        return {
          [langCode]: cfg,
        };
      }
    ).catch((err) => {
      throw new Error(`Error loading translations: ${err.message}`);
    });

    // Initialize the app
    const app = new VistaNeuralNumbersApp(config);
    const scaler = new AppScaler(app.$element[0], app.width, app.height);
    $('[data-component=VistaNeuralNumbersApp]').replaceWith(scaler.element);
    await app.init();
    setTimeout(() => {
      $('body').addClass('loaded');
    }, 500);
  } catch (err) {
    showFatalError('Fatal error', err);
    console.error(err);
  }
})();

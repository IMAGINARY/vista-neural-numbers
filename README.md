# vista-neural-numbers
VISTA version of the Neural Numbers (neural-numbers) exhibit

## Installation

Run

```bash
npm install
npm run build
```

to build the project. The built files are in the `dist` directory.

## Configuration

The configuration files are in the `config` directory.

You can override any of the configuration keys through a `settings.yml` file in the root directory.

## Development

Run

```bash
npm run watch
```

to watch for changes and rebuild the project.

## Sentry

The app supports Sentry.

The `index.html` page can take the DSN from the `sentry-dsn` query string parameter.

It can also get the DSN from the `app.sentry.dsn` configuration key in the  `settings.yml` file.

## Credits

Developed by Imaginary gGmbH with the support of VISTA Science Experience Center.

Based on functionality from the [Neural Numbers](https://github.com/IMAGINARY/neural-numbers)
exhibit created by Aaron Montag and adapted by Eric Londaits for Imaginary gGmbH.

## License

This project is licensed under the MIT License.
Copyright 2025 IMAGINARY gGmbH.

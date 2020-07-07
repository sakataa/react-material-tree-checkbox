import webpack from 'webpack';
import config from '../webpack.config.dev';
import {
  chalkError,
  chalkSuccess,
  chalkWarning,
  chalkProcessing,
} from './chalkConfig';

console.log(
  chalkProcessing('Generating bundle in watch mode. This will take a moment...')
);

webpack(config).watch({}, (error, stats) => {
  if (error) {
    // so a fatal error occurred. Stop here.
    console.log(chalkError(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (stats.hasErrors && jsonStats.errors.length > 0) {
    return jsonStats.errors.map((error) => console.log(chalkError(error)));
  }

  if (stats.hasWarnings && jsonStats.warnings.length > 0) {
    console.log(chalkWarning('Webpack generated the following warnings: '));
    jsonStats.warnings.map((warning) => console.log(chalkWarning(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log(chalkSuccess('Done'));

  return 0;
});

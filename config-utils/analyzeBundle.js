import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import config from '../webpack.config.component';

config.plugins.splice(0, 1); // Remove clean webpack plugin
config.plugins.push(new BundleAnalyzerPlugin());

process.env.NODE_ENV = 'production';

const compiler = webpack(config);

compiler.run((error, stats) => {
  if (error) {
    throw new Error(error);
  }
  return 0;
});

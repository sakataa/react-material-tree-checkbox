import webpack from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.config.common';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
};

const config = {
  mode: 'production',
  plugins: [
    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};

const webpackConfig = merge(common, config);

export default webpackConfig;

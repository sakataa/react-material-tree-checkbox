import webpack from 'webpack';

import { merge } from 'webpack-merge';
import common from './webpack.config.common';

const config = {
  devtool: 'cheap-module-eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
  mode: 'development',
  watch: true,
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
};

const webpackConfig = merge(common, config);

export default webpackConfig;

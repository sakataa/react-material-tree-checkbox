import webpack from 'webpack';
import path from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.config.common';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
};

const config = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'umd',
    library: 'ReactMaterialTreeViewCheckBox',
  },
  plugins: [
    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types',
      },
    },
    /@material-ui\/(core|icons|lab)\/.*/,
  ],
};

const webpackConfig = merge(common, config);

export default webpackConfig;

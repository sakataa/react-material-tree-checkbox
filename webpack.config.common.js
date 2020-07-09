import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const cleanOptions = {
  verbose: true,
  dry: false,
  cleanOnceBeforeBuildPatterns: ['*.js', '**/*.js', '**/*.map'],
};

module.exports = {
  context: __dirname,
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, './src')],
  },
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    chunkFilename: '[name].bundle.js',
  },
  target: 'web',
  // plugins: [new CleanWebpackPlugin(cleanOptions)],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

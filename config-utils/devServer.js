import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config.dev';
import { chalkError, chalkSuccess, chalkProcessing } from './chalkConfig';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const devServerOptions = {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9000,
  open: false,
  hot: true,
};

const devServerConfig = merge(config, {
  plugins: [
    new HtmlWebpackPlugin({
      // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.ejs',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
  ],
  resolve: {
    alias: {
        'react-material-tree-checkbox': path.resolve(__dirname, '../src/components'),
    },
}
});

const compiler = webpack(devServerConfig);

console.log(chalkProcessing('Staring webpack dev server...'));

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(9000, '127.0.0.1', (error) => {
  if (error) {
    // so a fatal error occurred. Stop here.
    console.log(chalkError(error));
    return 1;
  }

  console.log(chalkSuccess('Starting server on http://localhost:9000'));
});

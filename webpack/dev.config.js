const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const src = resolve(__dirname, '..', 'src');

module.exports = {
  mode: 'development',
  name: 'app',
  context: resolve(src, 'app'),
  entry: './index.js',
  output: {
    path: resolve(src, 'server', 'static'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@babel/preset-react' ]
          }
        },
        include: resolve(src, 'app')
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: ExtractTextPlugin.extract({
          use: [ 'css-loader', 'sass-loader' ]
        })
      }
    ]
  },
  resolve: {
    extensions: [ '.jsx', '.js' ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3001,
      proxy: 'http://localhost'
    })
  ]
};

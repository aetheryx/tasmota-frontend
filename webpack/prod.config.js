const { resolve } = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const src = resolve(__dirname, '..', 'src');

module.exports = {
  mode: 'production',
  name: 'app',
  context: resolve(src, 'app'),
  entry: './index.js',
  output: {
    path: resolve(src, 'server', 'static'),
    filename: 'bundle.js'
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJSPlugin({
        cache: true,
        parallel: true
      })
    ]
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
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.jsx', '.js' ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'style.css'
    })
  ]
};

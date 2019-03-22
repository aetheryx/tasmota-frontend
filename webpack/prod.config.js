const { resolve } = require('path');

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
      }
    ]
  },
  resolve: {
    extensions: [ '.jsx', '.js' ]
  }
};

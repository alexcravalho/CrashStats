const path = require('path');

const src = path.join(__dirname, '/client/src');
const public = path.join(__dirname, '/client/src/dist');

module.exports = {
  mode: 'development',
  entry: {
    app: `${src}/index.jsx`,
  },
  output: {
    filename: 'bundle.js',
    path: public,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  }
};

const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';
process.env.NODE_ENV = env;

const productionPlugins = [
  new UglifyJsPlugin({
    sourceMap: true,
  }),
];

module.exports = {
  entry: {
    main: './src/grow.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',

  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          'image-webpack-loader',
        ],
      },
      {
        test: /\.grw$/i,
        use: path.resolve('./loaders/world-loader.js'),
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Falling Sand Game - Dustin Toff',
      template: 'index.html',
    }),
    new EnvironmentPlugin(['NODE_ENV']),
    ...(isProduction ? productionPlugins : []),
  ],
};

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { resolve, entry, nodePolyfill, parseVideo, fileLoader, devServer } = require('./webpack.shared');

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[fullhash].js',
    publicPath: '/',
    chunkFilename: '[name].bundle.js',
  },
  devtool: false,
  devServer,
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]'
            }
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, "../src/styles")]
              },
            },
          },
        ]
      },
      {
        test: /\.css$/,
        use: ['raw-loader'],
      },
      parseVideo,
      fileLoader,
    ]
  },
  resolve,
  plugins: [
    new webpack.ProgressPlugin(),

    new ESLintPlugin({
      overrideConfigFile: path.resolve(__dirname, "../.eslintrc.js"),
      extensions: [`js`, `jsx`],
    }),

    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map[query]',
      exclude: 'vendors',
    }),

    nodePolyfill,

    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: 'style.[fullhash].css'
    }),

    new HtmlWebpackPlugin({
      hash: true,
      inject: false,
      favicon: path.resolve('favicon.png'),
      template: './src/index.html',
      filename: 'index.html'
    }),
  ]
};

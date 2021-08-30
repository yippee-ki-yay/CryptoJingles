const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { appManifest, entry, resolve, nodePolyfill, parseVideo, fileLoader, devServer } = require('./webpack.shared');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
// const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[fullhash].js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    publicPath: '/',
  },
  devtool: false,
  devServer,
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
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
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

    nodePolyfill,

    new CleanWebpackPlugin({}),

    new webpack.SourceMapDevToolPlugin({
      test: /\.(js|jsx)$/,
      filename: 'sourcemaps/[file].map[query]',
      exclude: 'vendors',
    }),

    new MiniCssExtractPlugin({ filename: 'style.[chunkhash].css' }),

    new HtmlWebpackPlugin({
      hash: true,
      inject: false,
      favicon: path.resolve('favicon.png'),
      template: './src/index.html',
      filename: 'index.html'
    }),

    appManifest,

    new ESLintPlugin({
      overrideConfigFile: path.resolve(__dirname, "../.eslintrc.js"),
      extensions: [`js`, `jsx`],
    }),

    // new CopyPlugin({
    //   patterns: [
    //     { from: path.resolve(__dirname, './static') },
    //   ],
    // }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    removeAvailableModules: false,
    removeEmptyChunks: false,
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: false,
          },
        },
      }),
    ],
  },
};

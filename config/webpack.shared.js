const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

const nodePolyfill = new NodePolyfillPlugin();

const appManifest = new WebpackPwaManifest({
  name: 'CryptoJingles',
  short_name: 'CrpytoJingles',
  description: 'Compose the best jingles on the blockchain, you can share them, sell them and love them.',
  background_color: '#fff',
  theme_color: '#fff',
  icons: {
    src: path.resolve('favicon.png'),
    sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
  },
});

const resolve = {
  extensions: ['.js', '.jsx'],
  alias: {
    translate: path.resolve(__dirname, '../src/services/translate/translate.jsx'),
  },
  modules: [path.join(__dirname, '../src'), 'node_modules']
};

const entry = './src/index.jsx';

const parseVideo = {
  test: /\.(mov|mp4)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }
  ]
};

const fileLoader = {
  test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "fonts/"
      }
    }
  ]
};

const createDevServer = (prod = true) => {
  const base = {
    stats: 'minimal',
    contentBase: './dist',
    open: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  };

  if (prod) base.public = 'cryptojingles.app';

  return base;
};

module.exports = { appManifest, resolve, entry, parseVideo, nodePolyfill, fileLoader, createDevServer }

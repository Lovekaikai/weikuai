'use strict'
const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const utils = require('./utils');
const vueLoaderConfig = require('./vue-loader.conf')

const projectRoot = path.resolve(__dirname, '../');
const vuxLoader = require('vux-loader');

const env = process.env.NODE_ENV;
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
const cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
const cssSourceMapProd = (env === 'production' && config.build.productionSourceMap);
const useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

const DEV_HOST = JSON.stringify(config.dev.HOST)

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'config': path.resolve(__dirname, '../src/config'),
      'components': path.resolve(__dirname, '../src/components'),
      'mixins': path.resolve(__dirname, '../src/assets/mixins'),
      'request': path.resolve(__dirname, '../src/request'),
      'common': path.resolve(__dirname, '../src/components/common'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('node_modules/webpack-dev-server/client')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      API_HOST: process.env.NODE_ENV === 'production' ? JSON.stringify(process.env.SUPER_MODEL_SUPER_WEB_API) : DEV_HOST
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    'vux-ui',
    {
      name: 'less-theme',
      path: path.join(projectRoot, 'src/assets/less/honray-theme.less')
    }
  ]
});

import * as webpackMerge from 'webpack-merge';
import * as webpack from 'webpack';

import { hasProcessFlag, hasNpmFlag, root } from './helpers';
import commonConfig from './webpack.common';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const ENV = (process.env.ENV = process.env.NODE_ENV = 'production');
const HMR = false;
const AOT = process.env.BUILD_AOT || hasNpmFlag('aot');
const APP_ENV = process.env.APP_ENV || ENV;

const options = { AOT, ENV, HMR, APP_ENV };

export default webpackMerge(commonConfig(options), {
  devtool: 'source-map',

  entry: {
    offline: root('src', 'service-worker.ts')
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
              configFile: 'tsconfig.prod.json'
            }
          }
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      }
    ]
  },

  plugins: [
    new Uglify({
      sourceMap: true
    }),
    new OfflinePlugin({
      autoUpdate: 5 * 60 * 1000,
      AppCache: false,
      ServiceWorker: {
        events: true
      }
    })
  ]
});

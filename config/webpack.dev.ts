import * as webpackMerge from 'webpack-merge';
import * as webpack from 'webpack';
import { hasProcessFlag, root } from './helpers';
import commonConfig from './webpack.common';

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const ENV = (process.env.ENV = process.env.NODE_ENV = 'development');
const HMR = hasProcessFlag('hot');
const AOT = false;

let options = { AOT, ENV, HMR };

export default webpackMerge(commonConfig(options), {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    polyfills: ['zone.js/dist/long-stack-trace-zone']
  },

  output: {
    path: root('build', 'development'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name]-[id].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: '@angularclass/hmr-loader', options: { pretty: true, prod: false } },
          { loader: 'ts-loader', options: { transpileOnly: true, configFileName: 'tsconfig.dev.json' } },
          { loader: 'angular2-template-loader' },
          { loader: 'ng-router-loader', options: { aot: options.AOT } }
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      }
    ]
  },

  plugins: [new ForkTsCheckerWebpackPlugin()],

  devServer: {
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
    watchOptions: {
      // if you're using Docker you may need this
      // aggregateTimeout: 300,
      // poll: 1000,
      ignored: /node_modules/
    }
  }
});

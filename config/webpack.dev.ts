import * as webpackMerge from 'webpack-merge';
import { hasProcessFlag, root } from './helpers';
import commonConfig from './webpack.common';

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const ENV = (process.env.ENV = process.env.NODE_ENV = 'development');
const HMR = hasProcessFlag('hot');
const AOT = false;
const APP_ENV = process.env.APP_ENV || ENV;

const options = { AOT, ENV, HMR, APP_ENV };

export default webpackMerge(commonConfig(options), {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    polyfills: ['zone.js/dist/long-stack-trace-zone']
  },

  output: {
    chunkFilename: '[name]-[id].chunk.js',
    filename: '[name].bundle.js',
    path: root('build', 'development'),
    sourceMapFilename: '[file].map'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: '@angularclass/hmr-loader',
            options: { pretty: true, prod: false }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: 'tsconfig.dev.json'
            }
          },
          { loader: 'angular2-template-loader' }
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      }
    ]
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: root('tsconfig.dev.json')
    })
  ],

  devServer: {
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
    quiet: true,
    watchOptions: {
      // if you're using Docker you may need this
      // aggregateTimeout: 300,
      // poll: 1000,
      ignored: /node_modules/
    }
  }
});

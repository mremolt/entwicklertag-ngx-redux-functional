import * as webpackMerge from 'webpack-merge';
import * as webpack from 'webpack';

import { hasProcessFlag, hasNpmFlag, root } from './helpers';
import commonConfig from './webpack.common';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = (process.env.ENV = process.env.NODE_ENV = 'development');
const HMR = hasProcessFlag('hot');
const AOT = process.env.BUILD_AOT || hasNpmFlag('aot');

let options = { AOT, ENV, HMR };

export default webpackMerge(commonConfig(options), {
  devtool: 'source-map',

  output: {
    path: root('build', 'production'),
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name]-[id].[chunkhash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'ng-router-loader', options: { aot: !!options.AOT, genDir: root('compiled') } },
          { loader: 'ts-loader', options: { transpileOnly: false, configFileName: 'tsconfig.prod.json' } }
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      }
    ]
  },

  plugins: [new webpack.optimize.UglifyJsPlugin([options])]
});

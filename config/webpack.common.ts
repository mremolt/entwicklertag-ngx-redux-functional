import * as webpack from 'webpack';
import { root } from './helpers';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TS_VERSION = require('typescript').version;

function orderByList(list: string[]) {
  return function(chunk1: any, chunk2: any) {
    const index1 = list.indexOf(chunk1.names[0]);
    const index2 = list.indexOf(chunk2.names[0]);
    if (index2 === -1 || index1 < index2) {
      return -1;
    }
    if (index1 === -1 || index1 > index2) {
      return 1;
    }
    return 0;
  };
}

const extractSASS = new ExtractTextPlugin('[name]-sass.css');
const extractLESS = new ExtractTextPlugin('[name]-less.css');

export default function(options: any): any {
  const isProd: boolean = options.ENV === 'production';

  console.log(options);

  return {
    entry: {
      polyfills: [
        'core-js/es6/symbol',
        'core-js/es6/object',
        'core-js/es6/function',
        'core-js/es6/parse-int',
        'core-js/es6/parse-float',
        'core-js/es6/number',
        'core-js/es6/math',
        'core-js/es6/string',
        'core-js/es6/date',
        'core-js/es6/array',
        'core-js/es6/regexp',
        'core-js/es6/map',
        'core-js/es6/set',
        'core-js/es6/weak-map',
        'core-js/es6/weak-set',
        'core-js/es6/typed',
        'core-js/es6/reflect',
        'core-js/es7/reflect',
        'zone.js/dist/zone'
      ],
      main: root('src', options.AOT ? 'main.aot.ts' : 'main.ts'),
      css: root('src', 'styles', 'application.scss')
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [root('src'), root('node_modules')]
    },
    module: {
      exprContextCritical: false,
      rules: [
        { test: /\.json$/, use: 'json-loader' },
        { test: /\.html$/, use: 'raw-loader' },
        { test: /\.(jpg|png|gif)$/, use: 'file-loader' },
        { test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/, use: 'file-loader' },
        { test: /\.css$/, use: 'raw-loader' },
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre',
          exclude: [root('node_modules/@angular/compiler')]
        },
        {
          test: /\.less$/,
          use: ['raw-loader', 'postcss-loader', 'sass-loader'],
          include: root('src', 'app')
        },
        {
          test: /\.less$/,
          use: extractLESS.extract({
            fallback: 'raw-loader',
            use: [
              'css-loader',
              { loader: 'postcss-loader', options: { sourceMap: true } },
              'less-loader'
            ]
          }),
          include: root('src', 'styles')
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'raw-loader' },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ],
          include: root('src', 'app')
        },
        {
          test: /\.scss$/,
          use: extractSASS.extract({
            fallback: 'raw-loader',
            use: [
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'postcss-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } }
            ]
          }),
          include: root('src', 'styles')
        }
      ]
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        title: 'DCS Angular Starter',
        chunksSortMode: orderByList([
          'common',
          'polyfills',
          'vendor',
          'main',
          'css'
        ]),
        inject: 'body'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: module => /node_modules/.test(module.resource)
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      }),
      new ngcWebpack.NgcWebpackPlugin({
        disabled: !options.AOT,
        tsConfig: root('tsconfig.prod.json'),
        resourceOverride: root('config/resource-override.js')
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(options.ENV),
        IE: '11',
        TS_VERSION: JSON.stringify(TS_VERSION)
      }),
      extractSASS,
      extractLESS
    ]
  };
}

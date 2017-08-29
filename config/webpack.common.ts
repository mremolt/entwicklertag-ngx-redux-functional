import * as webpack from 'webpack';
import * as path from 'path';
import { root } from './helpers';
import * as polyfills from './polyfills';

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
  const Environment = require(root('src', 'environments', options.APP_ENV))
    .default;
  const environment = new Environment();

  return {
    entry: {
      polyfills: polyfills.IE11,
      main: root('src', options.AOT ? 'main.aot.ts' : 'main.ts'),
      css: root('src', 'styles', 'application.scss')
    },
    output: {
      path: root('build', options.APP_ENV),
      publicPath: 'http://localhost:8080/',
      filename: '[name].[hash].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[name]-[id].[chunkhash].chunk.js'
    },

    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [root('src'), root('node_modules')],
      alias: {
        './environment': root('src', 'environments', options.APP_ENV + '.ts')
      }
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
        page: environment.settings.page,
        chunksSortMode: orderByList([
          'common',
          'polyfills',
          'vendor',
          'main',
          'offline',
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
        'process.env.NODE_ENV': JSON.stringify(options.ENV),
        // tslint:disable-next-line:object-literal-key-quotes
        ENV: JSON.stringify(options.ENV),
        // tslint:disable-next-line:object-literal-key-quotes
        TS_VERSION: JSON.stringify(TS_VERSION)
      }),
      extractSASS,
      extractLESS
    ]
  };
}

function buildProductionConfig() {
  const merge = require('webpack-merge');
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  const OfflinePlugin = require('offline-plugin');
  const CompressionPlugin = require('compression-webpack-plugin');

  const { PurifyPlugin } = require('@angular-devkit/build-optimizer');
  const { EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack');
  // const { ModuleConcatenationPlugin } = require('webpack').optimize;
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

  const commonConfig = require('./webpack.config.common');

  return merge.smart(commonConfig, {
    entry: {
      offline: './src/service-worker.ts'
    },
    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: '@angular-devkit/build-optimizer/webpack-loader',
          options: {
            sourceMap: false
          }
        }
      ]
    },

    plugins: [
      // deactivated until webpack v4, see https://github.com/webpack/webpack/issues/5663
      // new ModuleConcatenationPlugin(),
      new HashedModuleIdsPlugin(),

      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          ecma: 6
        }
      }),

      new PurifyPlugin(),

      new EnvironmentPlugin({
        NODE_ENV: 'production',
        DEBUG: false
      }),

      new OfflinePlugin({
        autoUpdate: 5 * 60 * 1000,
        AppCache: false,
        externals: ['/'],
        excludes: ['_redirects'], // for netlify if used
        ServiceWorker: {
          events: true
        }
      }),

      new CompressionPlugin({
        regExp: /\.css$|\.html$|\.js$|\.map$/,
        threshold: 2 * 1024
      }),

      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'report/bundle.html',
        openAnalyzer: false
      })
    ]
  });
}

module.exports = buildProductionConfig();

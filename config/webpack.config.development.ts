function buildDevelopmentConfig() {
  const path = require('path');
  const merge = require('webpack-merge');
  const { EnvironmentPlugin, HotModuleReplacementPlugin, NamedModulesPlugin } = require('webpack');

  const commonConfig = require('./webpack.config.common');
  const root = process.cwd();

  return merge.smart(commonConfig, {
    resolve: {
      mainFields: ['es2015', 'module', 'main'],
    },

    devtool: 'cheap-module-eval-source-map',

    module: {
      rules: [
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          use: [
            {
              loader: '@ngtools/webpack',
              options: {
                tsConfigPath: path.resolve(root, 'tsconfig.json'),
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new EnvironmentPlugin({
        NODE_ENV: 'development',
        DEBUG: true,
      }),
      new NamedModulesPlugin({}),
      new HotModuleReplacementPlugin(),
    ],

    devServer: {
      historyApiFallback: true,
      hot: true,
      overlay: {
        warnings: true,
        errors: true,
      },
      port: 3000,
      watchOptions: {
        ignored: /node_modules/,
      },
    },
  });
}

module.exports = buildDevelopmentConfig();

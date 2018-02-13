function buildDevelopmentConfig() {
  const merge = require('webpack-merge');
  const {
    EnvironmentPlugin,
    HotModuleReplacementPlugin,
    NamedModulesPlugin,
  } = require('webpack');

  const commonConfig = require('./webpack.config.common');

  return merge.smart(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

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

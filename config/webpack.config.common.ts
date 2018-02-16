const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { NoEmitOnErrorsPlugin, EnvironmentPlugin, NormalModuleReplacementPlugin } = require('webpack');

const root = process.cwd();
const TS_VERSION = require('typescript').version;
const APP_ENV = process.env.APP_ENV || 'development';

const Environment = require(path.resolve(root, 'src', 'environments', APP_ENV)).default;
const environment = new Environment();

const cssLoader = [
  {
    loader: 'css-loader',
    options: {
      minimize: APP_ENV !== 'development',
      sourceMap: true,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => {
        return [require('autoprefixer')];
      },
    },
  },
  {
    loader: 'sass-loader',
  },
];

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    mainFields: ['es2015', 'module', 'main'],
    alias: {
      'transit-immutable-js': path.resolve(root, 'config', 'resource-override.js'),
      'date-fns': path.resolve(root, 'config', 'resource-override.js'),
      // tslint:disable-next-line:object-literal-key-quotes
      ajv: path.resolve(root, 'config', 'resource-override.js'),
      // tslint:disable-next-line:object-literal-key-quotes
      validator: path.resolve(root, 'config', 'resource-override.js'),
    },
  },
  entry: {
    polyfills: './src/polyfills.ts',
    main: './src/main.ts',
  },

  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[id].chunk.js',
    path: path.resolve(root, 'dist'),
  },

  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          {
            loader: '@ngtools/webpack',
            options: { tsConfigPath: path.resolve(root, 'tsconfig.json') },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        include: [path.resolve(root, 'src', 'app')],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'cache-loader',
          },
          {
            loader: 'thread-loader',
          },
          ...cssLoader,
        ],
        include: [path.resolve(root, 'src', 'styles')],
      },

      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'to-string-loader',
          },
          ...cssLoader,
        ],
        include: [path.resolve(root, 'src', 'app')],
      },
    ],
  },

  devtool: 'source-map',

  plugins: [
    new CleanWebpackPlugin(['dist'], { root: path.resolve(root) }),
    new ProgressPlugin(),
    new NoEmitOnErrorsPlugin(),

    new CopyWebpackPlugin([
      {
        from: '**/*',
        to: 'assets',
        context: 'src/assets',
      },
      {
        from: 'src/manifest.json',
        to: '',
      },
      { from: 'src/_redirects', to: '' },
    ]),

    new EnvironmentPlugin({
      TS_VERSION,
      APP_ENV,
    }),

    // load the configuration for the current environment (development, staging, production ...)
    new NormalModuleReplacementPlugin(
      /src[/\\]environment.ts/,
      path.resolve(root, 'src', 'environments', APP_ENV + '.ts')
    ),

    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      chunks: ['polyfills', 'vendor', 'main', 'offline'],
      chunksSortMode: 'manual',
      environment,
    }),

    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['offline', 'main'],
      minChunks: (module: any) => /node_modules/.test(module.resource),
    }),

    new AngularCompilerPlugin({
      mainPath: 'src/main.ts',
      tsConfigPath: 'tsconfig.json',
      sourceMap: true,
    }),
  ],
};

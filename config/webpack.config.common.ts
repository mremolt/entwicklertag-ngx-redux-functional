const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { NoEmitOnErrorsPlugin, EnvironmentPlugin, NormalModuleReplacementPlugin } = require('webpack');
const rxPaths = require('rxjs/_esm5/path-mapping');

const root = process.cwd();
const TS_VERSION = require('typescript').version;
const APP_ENV = process.env.APP_ENV || 'development';
const extractSASS = new ExtractTextPlugin('[name]-sass.css');

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
      sourceMap: true,
      plugins: () => {
        return [require('autoprefixer')];
      },
    },
  },
  { loader: 'sass-loader', options: { sourceMap: true } },
];

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: rxPaths(),
  },
  entry: {
    polyfills: './src/polyfills.ts',
    main: './src/main.ts',
    styles: './src/styles/application.scss',
  },

  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[id].chunk.js',
    path: path.resolve(root, 'dist'),
  },

  module: {
    rules: [
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.(jpg|png|gif)$/, use: 'file-loader' },
      { test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/, use: 'file-loader' },
      { test: /\.css$/, use: 'raw-loader' },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        include: [path.resolve(root, 'src', 'app')],
      },
      {
        test: /\.(scss)$/,
        use: extractSASS.extract({
          fallback: 'style-loader',
          use: cssLoader,
        }),
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
      chunks: ['polyfills', 'vendor', 'styles', 'main', 'offline'],
      chunksSortMode: 'manual',
      environment,
    }),

    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['offline', 'main', 'styles'],
      minChunks: (module: any) => /node_modules/.test(module.resource),
    }),

    new AngularCompilerPlugin({
      mainPath: 'src/main.ts',
      tsConfigPath: 'tsconfig.json',
      sourceMap: true,
    }),

    extractSASS,
  ],
};

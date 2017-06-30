import * as webpack from 'webpack';
import { root } from './helpers';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');

export default function(options: any) {
  const isProd: boolean = options.ENV === 'production';

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
      main: root('src', options.AOT ? 'main.aot.ts' : 'main.ts')
    },
    resolve: { extensions: ['.ts', '.js', '.json'], modules: [root('src'), root('node_modules')] },
    module: {
      exprContextCritical: false,
      rules: [
        { test: /\.json$/, use: 'json-loader' },
        { test: /\.html$/, use: 'raw-loader' },
        { test: /\.(jpg|png|gif)$/, use: 'file-loader' },
        { test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/, use: 'file-loader' },
        { test: /\.css$/, loader: 'raw-loader' },
        { test: /\.less$/, loaders: ['raw-loader', 'less-loader', 'postcss-loader'] },
        { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader', 'postcss-loader'] }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        title: 'FOO',
        chunksSortMode: 'dependency',
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
        /**
         * If false the plugin is a ghost, it will not perform any action.
         * This property can be used to trigger AOT on/off depending on your build target (prod, staging etc...)
         *
         * The state can not change after initializing the plugin.
         * @default true
         */
        disabled: !options.AOT,
        tsConfig: root('tsconfig.prod.json'),
        /**
         * A path to a file (resource) that will replace all resource referenced in @Components.
         * For each `@Component` the AOT compiler compiles it creates new representation for the templates (html, styles)
         * of that `@Components`. It means that there is no need for the source templates, they take a lot of
         * space and they will be replaced by the content of this resource.
         *
         * To leave the template as is set to a falsy value (the default).
         *
         * TIP: Use an empty file as an overriding resource. It is recommended to use a ".js" file which
         * usually has small amount of loaders hence less performance impact.
         *
         * > This feature is doing NormalModuleReplacementPlugin for AOT compiled resources.
         *
         * ### resourceOverride and assets
         * If you reference assets in your styles/html that are not inlined and you expect a loader (e.g. url-loader)
         * to copy them, don't use the `resourceOverride` feature as it does not support this feature at the moment.
         * With `resourceOverride` the end result is that webpack will replace the asset with an href to the public
         * assets folder but it will not copy the files. This happens because the replacement is done in the AOT compilation
         * phase but in the bundling it won't happen (it's being replaced with and empty file...)
         *
         * @default undefined
         */
        resourceOverride: root('config/resource-override.js')
      })
    ]
  };
}

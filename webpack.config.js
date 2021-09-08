const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const { extendDefaultPlugins } = require('svgo')

const config = {
  entry: {
    main: path.resolve(__dirname, './src/entry.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[id].js',
    // publicPath: '/expert-octo-doodle/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'webpack test',
      template: path.resolve(__dirname, './src/index.html')
      // filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new StylelintPlugin({
      fix: true,
      failOnError: false
    }),
    new ESLintPlugin({
      fix: true
    }),
    new MiniCssExtractPlugin({
      filename: '/css/[name].[hash].css'
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: extendDefaultPlugins([
                {
                  name: 'removeViewBox',
                  active: false,
                },
                {
                  name: 'addAttributesToSVGElement',
                  params: {
                    attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                  },
                },
              ]),
            },
          ],
        ],
      },
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },

      // CSS, PostCSS, Sass
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      // Images
      {
        test: /\.(png|jpe?g|webp|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[ext]'
        }
      },
      // Fonts
      {
        test: /\.(ttf|woff|woff2|eot|)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[ext]'
        }
      }
    ]
  },
  devServer: {
    liveReload: true,
    hot: false
  }
}

module.exports = (env, options) => {
  const isProd = options.mode === 'production'

  config.devtool = isProd ? false : 'eval-cheap-module-source-map'

  return config
}

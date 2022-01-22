const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')

const { ModuleConcatenationPlugin } = require('webpack').optimize
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new ModuleConcatenationPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CspHtmlWebpackPlugin(
      {
        'base-uri': ["'self'"],
        'object-src': ["'none'"],
        'script-src': ["'self'"],
        'style-src': ["'self'"],
        'frame-src': ["'none'"],
        'worker-src': ["'none'"],
      },
      {
        hashEnabled: {
          'style-src': false,
        },
      }
    ),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      '...', // This adds default minimizers to webpack. For JS, Terser is used. // https://webpack.js.org/configuration/optimization/#optimizationminimizer
      new CssMinimizerPlugin(),
    ],
    usedExports: true,
    splitChunks: {
      minSize: 0,
    },
    concatenateModules: true,
  },
})

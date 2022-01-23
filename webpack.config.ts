import * as path from 'path'
import { Configuration as WebpackConfig } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CspHtmlWebpackPlugin from 'csp-html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const isDevMode = process.env.NODE_ENV !== 'production'
const config: WebpackConfig = {
  target: 'web',
  context: __dirname,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: isDevMode,
            },
          },
        ],
      },
      {
        test: /\.(sa|s?c)ss$/i,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gifv?)$/i,
        type: 'asset', // replaces {file,raw,url}-loader in webpack 5.
        generator: {
          filename: 'static/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'src/index.html'),
      hash: true,
      minify: isDevMode
        ? null
        : {
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
        'script-src': ["'self'"],
        'style-src': ["'self'"],
      },
      {
        hashEnabled: {
          'style-src': isDevMode,
        },
      }
    ),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
      typescript: {
        memoryLimit: 4096,
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references', // write-references for babel-loader, write-tsbuildinfo for ts-loader, write-dts for ts-loader with transpile-only flag.
      },
    }),
  ],
}

export default config

import path from 'path'
import { Configuration as WebpackConfig, WebpackPluginInstance } from 'webpack'
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
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    symlinks: false,
    fallback: {
      // constants: require.resolve('constants-browserify'),
      // crypto: require.resolve('crypto-browserify'),
      // path: require.resolve('path-browserify'),
      // stream: require.resolve('stream-browserify'),
    },
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|woff2?|ttf|svg|png|jpe?g|gifv?|webp)$/i,
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
        ? undefined
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    new CspHtmlWebpackPlugin(
      {
        'script-src': ["'self'"],
        'style-src': ["'self'"],
      },
      {
        hashingMethod: 'sha512',
        hashEnabled: {
          'style-src': isDevMode,
        },
      }
    ),
    new MiniCssExtractPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: 'write-references', // write-references for babel-loader, write-tsbuildinfo for ts-loader, write-dts for ts-loader with transpile-only flag.
        diagnosticOptions: {
          semantic: isDevMode,
          syntactic: true,
        },
        // memoryLimit: 4096,
      },
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
        // memoryLimit: 4096,
      },
      issue: {
        include: {
          file: './src/**/*',
        },
        exclude: [
          {
            origin: 'eslint',
            severity: 'warning', // don't report eslint warnings.
          },
          {
            origin: 'eslint',
            file: '**/__tests__/**/*', // exclude eslint issues from jest test files.
          },
          {
            file: './*.ts', // exclude config files.
          },
        ],
      },
    }),
  ] as WebpackPluginInstance[],
}

export default config

import * as path from 'path'
import { Configuration as WebpackConfig } from 'webpack'
import 'webpack-dev-server'
import { merge } from 'webpack-merge'
import baseConfig from './webpack.config'

import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin'

const config: WebpackConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 8080,
    hot: true,
    open: false,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),
  ],
})

export default config

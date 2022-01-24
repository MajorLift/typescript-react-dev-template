import { Configuration as WebpackConfig, optimize as WebpackOptimize } from 'webpack'
import { merge } from 'webpack-merge'
import baseConfig from './webpack.config'

const { ModuleConcatenationPlugin } = WebpackOptimize
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const config: WebpackConfig = merge(baseConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [new ModuleConcatenationPlugin()],
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

export default config

const path = require('path')

module.exports = {
  context: __dirname,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    symlinks: false,
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(s?c|sa)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif|)$/i,
        use: 'url-loader',
      },
    ],
  },
}

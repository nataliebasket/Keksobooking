const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devServer: {
    port: 3001
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/img/'),
          to: path.resolve(__dirname, 'build/img/')
        },
        {
          from: path.resolve(__dirname, 'src/data/data.json'),
          to: path.resolve(__dirname, 'build/data/')
        },
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'build/')
        },
        {
          from: path.resolve(__dirname, 'src/leaflet/'),
          to: path.resolve(__dirname, 'build/leaflet/')
        },
        {
          from: path.resolve(__dirname, 'src/nouislider/'),
          to: path.resolve(__dirname, 'build/nouislider/')
        },
        {
          from: path.resolve(__dirname, 'src/pristine/'),
          to: path.resolve(__dirname, 'build/pristine/')
        },
      ]
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
}

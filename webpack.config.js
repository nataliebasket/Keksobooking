const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'img/[name][ext]',
    // clean: true,
  },
  devServer: {
    // contentBase: path.join(__dirname, 'build'),
    port: 3001,
    open: true
  },
  // доп. функционал к базовой комплектации
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/data/data.json'),
          to: path.resolve(__dirname, 'build/data/')
        },
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'build/')
        },
        {
          from: path.resolve(__dirname, 'src/libs/'),
          to: path.resolve(__dirname, 'build/libs/')
        },
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(?:png|jpg|jpeg|svg)$/,
        type: 'asset/resource',
        use: [
              {
                loader: ImageMinimizerPlugin.loader,
                options: {
                  minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                      plugins: [
                        "imagemin-gifsicle",
                        "imagemin-jpegtran",
                        "imagemin-pngquant",
                        "imagemin-svgo"
                      ],
                    },
                  },
                },
              }
            ],
      },
      //["imagemin-pngquant", {quality: [0.3, 0.3]}],
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          // Implementation
          implementation: ImageMinimizerPlugin.imageminMinify,
          // Options
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-jpegtran",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
          },
        },
      }),
    ],
  }
}

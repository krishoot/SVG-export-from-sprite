const paths = require('../paths')
const { merge } = require('webpack-merge')
const common = require('./common')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = merge(common, {
  mode: 'production',
  entry: {
    index: {
      import: `${paths.src}/index.js`
    }
  },
  devtool: false,
  output: {
    filename: 'js/[name].[contenthash].bundle.js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          'style-loader',
          // minify all css output
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Path fix resolver for scss
          "resolve-url-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),

    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i
    })
  ],
  optimization: {
    runtimeChunk: 'single'
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})

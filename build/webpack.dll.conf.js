const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rootPath = path.join(__dirname, '../');
const config = require("../config");
const utils = require("./utils");

module.exports = {
  entry: {
    common: ["vue", 'vue-router', 'vuex', 'axios', 'babel-polyfill'],
  },

  output: {
    path: path.resolve(rootPath, "static/js/dll"),
    filename: "[name].js?[chunkhash]",
    library: '[name]_library',
    publicPath: path.posix.join(config.build.assetsPublicPath, utils.assetsPath("static/js/dll"))
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(rootPath, "common.manifest.json"),
      name: '[name]_library',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: utils.srcPath("index_build.ejs"),
      template: utils.srcPath("index.ejs"),
      inject: true,
      title: "<%= htmlWebpackPlugin.options.title %>",
    })
  ]
}
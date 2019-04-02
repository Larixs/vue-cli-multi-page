const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rootPath = path.join(__dirname, '../');
const config = require("../config");
const utils = require("./utils");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    common: ["vue", "vue-router", "vuex", "axios", "babel-polyfill", "whatwg-fetch", "lodash", "better-scroll", "moment"],
  },

  output: {
    path: path.resolve(rootPath, "static/js/dll"),
    filename: "[name].js?[chunkhash]",
    library: '[name]_library',
    publicPath: config.build.assetsPublicPath + utils.assetsPath("static/js/dll")
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
    }),
    //The simplest solution how to convince webpack not to look for locales already included in the moment-with-locales.js is to force him to load something else instead(https://github.com/moment/moment/issues/2979)
    new webpack.ContextReplacementPlugin(
      /\.\/locale$/,
      "empty-module",
      false,
      /js$/
    ),
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /en|zh-cn/
    ),
    // new BundleAnalyzerPlugin
  ]
}
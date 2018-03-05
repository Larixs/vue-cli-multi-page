const path = require('path');
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const FileChanger = require('webpack-file-changer')
const pageConfig = require("./page.conf");
const srcPath = path.join(__dirname, '../src');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const rootPath = path.join(__dirname, '../');
const time = (new Date()).getTime()


const env = process.env.NODE_ENV === "testing"
  ? require("../config/test.env")
  : config.build.env;

let webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? "#source-map" : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("vue_components/[name]/[name].js?[chunkhash]&t=" + time),
    chunkFilename: utils.assetsPath("vue_components/[id]/[id].js?[chunkhash]&t=" + time),
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(path.resolve(rootPath, "common.manifest.json")),
    }),
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false //压缩成一行后的代码如果出错了，可以用map定位到出错点。不过相应的会增加map文件。
    }),
    //移动静态文件夹static
    new FileChanger({
      move: [{
        from: path.resolve(config.build.src, "../static"),
        to: path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory, "static")
      }]
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8889
    // })
  ]
});


webpackConfig = utils.generateHtmlFile(webpackConfig, {
  filename: function (name){
    return utils.assetsPath(`vue_components/${name}/index_comp.html`)
  },
  template: path.resolve(srcPath, 'index_comp.ejs'),
  app: function (name){
    return pageConfig.app[name] || pageConfig.defaultApp
  },
  minify: {
    removeComments: true,
  }
})



module.exports = webpackConfig;



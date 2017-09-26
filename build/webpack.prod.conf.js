const path = require('path');
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const FileChanger = require('webpack-file-changer')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const rootPath = path.join(__dirname, '../');


let webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? "#source-map" : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("[name]/[name].js?[chunkhash]"),
    chunkFilename: utils.assetsPath("[id]/[id].js?[chunkhash]"),
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(path.resolve(rootPath, "common.manifest.json")),
    }),
    new webpack.DefinePlugin({
      "process.env": config.build.env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false //当值为true时，会产生一个map，map的作用在于：压缩成一行后的代码如果出错了，可以用map定位到出错点。map的文件不会太小。
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath("[name]/[name].css?[contenthash]")
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // Why optimize-css-assets-webpack-plugin instead of extract-text-webpack-plugin:
    // Since extract-text-webpack-plugin only bundles (merges) text chunks, if its used to bundle CSS, the bundle might have duplicate entries (chunks can be duplicate free but when merged, duplicate CSS can be created).
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    //移动静态资源
    new FileChanger({
      move: [{
        from: path.resolve(config.build.src, "../static"),
        to: path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory, "static")
      }]
    }),
  ]
});

webpackConfig = utils.generateHtmlFile(webpackConfig, {
  filename: function (name){
    return utils.assetsPath(`${name}/index.html`)
  },
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
  },
});

if ( config.build.bundleAnalyzerReport ) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = webpackConfig;



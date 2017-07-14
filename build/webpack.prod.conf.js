const path = require('path');
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const FileChanger = require('webpack-file-changer')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const indexPageConfig = require("./indexPageConfig");
const srcPath = path.join(__dirname, '../src');
const rootPath = path.join(__dirname, '../');


const env = process.env.NODE_ENV === "testing"
    ? require("../config/test.env")
    : config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
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
            "process.env": env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false //压缩成一行后的代码如果出错了，可以用map定位到出错点。不过相应的会增加map文件。
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

        //没有提取公共代码的部分，正在犹豫是用commonschunkplugin还是dllplugin
        //移动静态文件夹static
        new FileChanger({
            move: [{
                from: path.resolve(srcPath, "../static"),
                to: path.resolve(config.build.assetsRoot, "static")
            }]
        }),
    ]
});

const entries = webpackConfig.entry;
Object.keys(entries).forEach(function (name){
    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename: path.resolve(config.build.assetsRoot, name, name + ".html"),
            template: path.resolve(srcPath, 'index_build.ejs'),
            inject: true,
            chunks: [name], //让各自文件的html引用各自的js，不会把所有的js文件都用上
            title: indexPageConfig.title[[name]] || indexPageConfig.defaultTitle,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            // chunksSortMode: 'dependency'
        })
    );
});


module.exports = webpackConfig;



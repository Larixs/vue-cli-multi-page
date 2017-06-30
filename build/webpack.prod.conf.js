const path = require('path');
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

const distPath = path.resolve(__dirname, '../dist');
const srcPath =  path.join(__dirname, '../src');


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
    output: {//
        path: config.build.assetsRoot,
        filename: utils.assetsPath("[name]/[name].[chunkhash].js"),
        chunkFilename: utils.assetsPath("[id]/[id].[chunkhash].js"),
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false //压缩成一行后的代码如果出错了，可以用map定位到出错点。不过相应的会增加map文件。在cli里面，vendor.js自身的大小为100k，而它的map达到了800k。感觉开销过于大了，故而删掉。嗯~ o(*￣▽￣*)o
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath("[name]/[name].[contenthash]/css")
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        })
    ]
});

const entries = webpackConfig.entry;
Object.keys(entries).forEach(function (name){
    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename: path.resolve(distPath, name, "index.html"),
            template: path.resolve(srcPath, 'index.html'),
            inject: true,
            chunks:[name], //让各自文件的html引用各自的js，不会把所有的js文件都用上
            minify:{
                removeComments: true,
                collapseWhitespace:true,
                removeAttributeQuotes: true
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            // chunksSortMode: 'dependency'
        })
    );
    // add hot-reload related code to entry chunks
    entries[name] = ["./build/dev-client"].concat(entries[name]);
});



const path = require('path');
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const FileChanger = require('webpack-file-changer')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const indexPageConfig = require("./indexPageConfig");
const srcPath = path.join(__dirname, '../src');


const env = process.env.NODE_ENV === "testing"
    ? require("../config/test.env")
    : config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
    devtool: config.build.productionSourceMap ? "#source-map" : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath("js/licai_h5/vue_components/[name]/[name].js?[chunkhash]"),
        chunkFilename: utils.assetsPath("js/licai_h5/vue_components/[id]/[id].js?[chunkhash]"),
    },
    plugins: [
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
            filename: path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory, "vue_components/" + name, name + ".html"),
            template: path.resolve(srcPath, 'index_comp.ejs'),
            inject: true,
            chunks: [name], //让各自文件的html引用各自的js，不会把所有的js文件都用上
            app: indexPageConfig.app[[name]] || indexPageConfig.defaultApp,
            minify: {
                removeComments: true,
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            // chunksSortMode: 'dependency'
        })
    );
});


module.exports = webpackConfig;



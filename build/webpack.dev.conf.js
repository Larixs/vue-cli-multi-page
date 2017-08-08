const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require("./utils");
const indexPageConfig = require("./indexPageConfig");
const distPath = path.resolve(__dirname, '../dist');
const srcPath =  path.join(__dirname, '../src');
const rootPath = path.join(__dirname, '../');

const devconfig = merge(baseWebpackConfig, {
    output:{
      path: path.resolve(distPath, process.argv[2]),//从命令行读取项目名称
    },
    plugins:[
        new webpack.DllReferencePlugin({
            manifest: require(path.resolve(rootPath, "common.manifest.json")),
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
        new ExtractTextPlugin({
            filename: utils.assetsPath("[name]/[name].css")
        }),
    ]
});

const entries = devconfig.entry;
Object.keys(entries).forEach(function (name){
    devconfig.plugins.push(
        new HtmlWebpackPlugin({
            filename: path.resolve(distPath, name, "index.html"),
            template: path.resolve(srcPath, 'index_build.ejs'),
            inject: true,
            title: indexPageConfig.title[[name]] || indexPageConfig.defaultTitle, //不止可以配置title
            chunks:[name], //让各自文件的html引用各自的js，不会把所有的js文件都用上
        })
    );
    // add hot-reload related code to entry chunks
    entries[name] = ["./build/dev-client"].concat(entries[name]);
});



module.exports = devconfig;


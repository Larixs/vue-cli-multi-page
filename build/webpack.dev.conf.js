const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require("./utils");
const config = require("../config");

let devconfig = merge(baseWebpackConfig, {
    output:{
      path: path.resolve(config.build.assetsRoot, process.argv[2]),//从命令行读取项目名称
    },
    plugins:[
        new webpack.DllReferencePlugin({
            manifest: require(path.resolve(config.build.assetsProjectRoot, "common.manifest.json")),
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

devconfig = utils.generateHtmlFile(devconfig);

module.exports = devconfig;


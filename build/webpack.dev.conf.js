const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");

const distPath = path.resolve(__dirname, '../dist');
const srcPath =  path.join(__dirname, '../src');

const devconfig = merge(baseWebpackConfig, {
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
    ]
});

const entries = devconfig.entry;
Object.keys(entries).forEach(function (name){
    devconfig.plugins.push(
        new HtmlWebpackPlugin({
            filename: path.resolve(distPath, name, "index.html"),
            template: path.resolve(srcPath, 'index.html'),
            inject: true,
            chunks:[name], //让各自文件的html引用各自的js，不会把所有的js文件都用上
        })
    );
    // add hot-reload related code to entry chunks
    entries[name] = ["./build/dev-client"].concat(entries[name]);
});



module.exports = devconfig;


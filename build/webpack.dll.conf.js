const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rootPath = path.join(__dirname, '../');
const srcPath =  path.join(__dirname, '../src');

module.exports = {
    entry: {
        common: ["vue", 'vue-router', 'vuex', 'axios'],
    },
    output: {
        path: path.resolve(rootPath,"static/js/dll"),
        filename: "[name].js?[chunkhash]",
        library: '[name]_library',
        publicPath: "/static/js/dll"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(rootPath,"common.manifest.json"),
            name: '[name]_library',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(srcPath, "index_build.ejs"),
            template: path.resolve(srcPath, 'index.ejs'),
            inject: true,
            title:"<%= htmlWebpackPlugin.options.title %>",
        })
    ]
}
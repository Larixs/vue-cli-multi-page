const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rootPath = path.join(__dirname, '../');
const srcPath =  path.join(__dirname, '../src');

module.exports = {
    entry: {
        common: ["vue", 'vue-router', 'vuex'],
    },
    output: {
        path: path.resolve(rootPath,"static/js/dll"),
        filename: "[name].[chunkhash].js",
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
            filename: path.resolve(srcPath, "index_build.html"),
            template: path.resolve(srcPath, 'index.html'),
            inject: true,
        })
    ]
}
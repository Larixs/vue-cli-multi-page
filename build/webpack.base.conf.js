const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const config = require('../config');
const configEntries = require('./entry');
const isProduction = process.env.NODE_ENV === 'production';
const distPath = path.join(__dirname, '../dist');

module.exports = {
    devtool: 'inline-source-map',

    entry: configEntries,

    output: {
        path: distPath,
        filename: '[name]/[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                use:["babel-loader"],
                exclude:/node_modules/
            },
            {
                test: /\.vue$/,
                use:[
                    {
                        loader: 'vue-loader',
                        options:{
                            loaders:utils.cssLoaders({
                                sourceMap: isProduction
                                    ? config.build.productionSourceMap
                                    : config.dev.cssSourceMap,
                                extract: isProduction
                            })
                        }
                    }
                ],
            },
            {
                //当引用的文件是字体文件时，将该字体文件移动到name的指定位置，并且更改引用路径。
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[ext]?[hash:7]')
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[ext]?[hash:7]')
                }
            },
        ]
    },
    plugins: [
    ]

};
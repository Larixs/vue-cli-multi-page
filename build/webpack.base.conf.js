const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const config = require('../config');
const configEntries = require('./entry');
const externalFile = require("./external_link");
const isProduction = process.env.NODE_ENV === 'production';
const distPath = path.join(__dirname, '../dist');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const webpackConfig= {
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
                test:/\.js(x)?$/,
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
                    name: utils.assetsPath('[path][name].[ext]?[hash:7]')
                }
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader',
                include:/node_modules/,
            },

        ]
    },
    plugins: [
    ],
    resolve:{
        alias:{
            'components': path.join(process.cwd(), './src/components'),
            'static': path.join(process.cwd(), './static')
        }
    }
};


class putExternalFileInHtml {
    apply(compiler){
        compiler.plugin("compilation", compilation =>{
            compilation.plugin(
                "html-webpack-plugin-before-html-generation",
                (htmlPluginData, callback) =>{
                    Object.keys(externalFile.jsLink).forEach(function (name){
                        if ( htmlPluginData.assets.js[0].includes(name) ) {
                            htmlPluginData.assets.js = Array.prototype.concat(
                                externalFile.jsLink[name],
                                htmlPluginData.assets.js
                            );
                        }
                    });
                    callback();
                }
            )
        })
    }
}
webpackConfig.plugins.push(new putExternalFileInHtml());

module.exports = webpackConfig;

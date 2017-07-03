const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const config = require('../config');

const isProduction = process.env.NODE_ENV === 'production';

console.log('isProduction',isProduction);
const distPath = path.join(__dirname, '../dist');
const srcPath =  path.join(__dirname, '../src');

module.exports = {
    devtool: 'inline-source-map',

    entry: fs.readdirSync(srcPath).reduce((entries, dir) => {
        //读取src下的文件夹
        const fullDir = path.join(srcPath, dir);
        const entry = path.resolve(fullDir, 'app.js');
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry))
        {
            entries[dir] = entry;
        }
        return entries
    }, {}),

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
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
    ]

};
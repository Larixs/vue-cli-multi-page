//必须要放在webpack安装的根目录下

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FileChanger = require('webpack-file-changer')

module.exports = {
    devtool: 'inline-source-map',

    entry: fs.readdirSync(path.resolve(__dirname, "src")).reduce((entries, dir) => {
        //读取src下的文件夹
        const fullDir = path.join(__dirname+ "/src", dir);
        const entry = path.join(fullDir, 'app.js');
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry))
        {
            entries[dir] = entry;
        }
        return entries
    }, {}),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude:/node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options:{
                    loaders:{
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        //ExtractTextPlugin帮助提取css为一个文件
                        css: ExtractTextPlugin.extract({
                            loader: 'css-loader',
                            fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        }),
                        sass: ExtractTextPlugin.extract(
                            {
                                loader: 'css-loader!sass-loader',
                                fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                            }
                        )
                    },
                    //补全css前缀,添加最近10个版本的前缀
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 10 versions']
                        })
                    ]
                }
            }
        ]
    },

    // devServer: {
    //     historyApiFallback: true,
    //     hot: true,
    //     inline: true,
    //     clientLogLevel:"error"
    // },
    //用express

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        //new TransferWebpackPlugin(patterns: array, [basePath: string])
        // patterns – array of patterns { from: 'path', to: 'path' },
        // from – relative to basePath or to context of your config (if basePath is not exists),
        // to – relative to the build directory
        // basePath (optional) – directory to be resolved to from parameter
        // new TransferWebpackPlugin([
        //     {from: "style",to:"static/style"}
        //     //还可以继续添加
        // ], path.resolve(__dirname,"example-nor/static")),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name:['shared'],
        //     minChunks:2//提取所有entry的公共模块
        // }),

        //提取组件中的css到[name].css里
        new ExtractTextPlugin("[name]/[name].css"),

        //压缩css
        new OptimizeCssAssetsPlugin(),

        //压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),

        new FileChanger({
            move:(function(){
                const moveParams = [];
                moveParams.push({
                    from:path.resolve(__dirname, './src/static'),
                    to:path.resolve(__dirname, './dist/static')
                });
                fs.readdirSync(__dirname + "/src").forEach(function (dir){
                    if( dir === "static" ){
                        return;
                    }
                    const fullDir = path.resolve(__dirname, "./src", dir);
                    const indexHtml = path.join(fullDir, "index.html");
                    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(indexHtml))
                    {
                        moveParams.push({
                            from: indexHtml,
                            to:path.resolve(__dirname,"./dist", dir, "index.html")
                        })
                    }

                });

                return moveParams;
            }()),

        })
    ]

};
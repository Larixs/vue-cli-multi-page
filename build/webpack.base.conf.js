const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const utils = require("./utils");
const config = require("../config");
const entries = require("./entries");
const isProduction = process.env.NODE_ENV === "production";
const merge = require("webpack-merge");
const plugins = require("./plugins");
const autoprefixer = require("autoprefixer")

let webpackConfig = {
  devtool: "inline-source-map",

  entry: entries,

  output: {
    path: config.build.assetsRoot,
    filename: "[name]/[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              postcss: [autoprefixer({browsers: ['last 20 versions']})],
              loaders: utils.cssLoaders({
                sourceMap: false,
                // extract: isProduction
                extract: false,
              })
            },
          }
        ]
      },
      {
        //当引用的文件是字体文件时，将该字体文件移动到name的指定位置，并且更改引用路径。
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[ext]?[hash:7]")
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 3000,
          name: utils.assetsPath("[path][name].[ext]?[hash:4]")
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        include: /node_modules/
      },
      ...utils.styleModuleLoader({ extract: isProduction })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      imgPath: '"/././././static/img/"'
    }),
    new plugins.PutExternalFileInHtml()
  ],
  resolve: {
    alias: {
      components: path.join(process.cwd(), "./components"),
      base_components: path.join(process.cwd(), "./components/base_components"),
      view_components: path.join(process.cwd(), "./components/view_components"),
      layout: path.join(process.cwd(), "./components/layout"),
      directive: path.join(process.cwd(), "./components/directive"),
      plugins: path.join(process.cwd(), "./components/plugins"),
      static: path.join(process.cwd(), "./static"),
      src: path.join(process.cwd(), "./src"),
    }
  }
};
module.exports = webpackConfig;

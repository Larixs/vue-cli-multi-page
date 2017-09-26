const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rm = require('rimraf');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const entries = require('./entries');
const pageConfig = require("./page.conf");
const chalk = require('chalk');

exports.assetsPath = function assetsPath(_path){
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

exports.srcPath = function srcPath(_path){
  return path.posix.join(config.build.src, _path);
};

exports.cssLoaders = function cssLoaders(options){
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions){
    const loaders = [cssLoader]
    if ( loader ) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if ( options.extract ) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
      })
    } else {
      return ['vue-style-loader'].concat(loaders) // 返回的每一个loader都有vue-style-loader。在这个里面autoprefixer?
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  //这些都是可以使用的css扩展语言。只要安装即可使用。
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}


const cssModuleLoaders = function (options){
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: true
    }
  };
  const postcssLoader = "postcss-loader";

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions){
    const loaders = [cssLoader, postcssLoader]
    if ( loader ) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions)
      })
    }
    if ( options.extract ) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      })
    } else {
      return ['style-loader'].concat(loaders) // 返回的每一个loader都有vue-style-loader。在这个里面autoprefixer?
    }
  }

  return {
    css: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
exports.styleModuleLoader = function styleModuleLoader(options){
  //stylesModuleLoader based on css-modules, which means treating style as an object. (Because of babel-plugin-transform-vue-jsx, styles should be an object to operate.) styleLoader can compile style files outside of .vue, but it can't import style correctly. So I wrote stylesModuleLoader by myself. I think it can not be perfect. So If there is any question, please contact Larixs(lairuixin@gstianfu.com).
  const output = [];
  const loaders = cssModuleLoaders(options)
  for ( const extension in loaders ) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader,
      exclude: /node_modules/,
    })
  }
  return output;
};

exports.rmProject = function rmProject(projectNames){
  //清空对应的文件夹
  projectNames.forEach(function (name){
    rm(path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory, name), err =>{
      if ( err ) throw err;
    });
  });
};

exports.rmComponent = function rmComponent(projectNames){
  //清空对应的html、js、css
  projectNames.forEach(function (name){
    rm(path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory, "vue_components", name), err =>{
      if ( err ) throw err;
    });
  });
};

exports.generateHtmlFile = function (webpackConfig, options = {}){
  //为每一个入口添加一个html文件

  if ( webpackConfig ) {
    const keys = Object.keys(entries);
    if ( !Array.isArray(keys) ) {
      console.log("wrong entries in generateHtmlFile")
      return;
    }
    keys.forEach(function (name){
      const distPath = path.resolve(__dirname, '../dist');
      const defaultOptions = {
        filename: path.resolve(distPath, name, "index.html"),
        template: path.posix.join(config.build.src, "index_build.ejs"),
        inject: true,
        title: pageConfig.title[[name]] || pageConfig.defaultTitle, //不止可以配置title
        chunks: [name], //让各自文件的html引用各自的js
      };
      let finalOptions = {}
      Object.keys(options).forEach((optionsKey)=>{
        if(typeof(options[optionsKey])==="function"){
          finalOptions[optionsKey] = options[optionsKey](name);
        }else {
          finalOptions[optionsKey] = options[optionsKey];
        }
      })
      webpackConfig.plugins.push(
        new HtmlWebpackPlugin(Object.assign({}, defaultOptions, finalOptions))
      );
    });
  }
  return webpackConfig;
};

exports.printCompileInfo = function (stats){
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunksModules: false
    }) + '\n\n');
  console.log(chalk.cyan('  Build complete.\n'));
}
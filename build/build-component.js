//需要在webpackConfig引入之前设置。webpackConfig里涉及到了环境的判断。
process.env.NODE_ENV = 'production:comp';
const ora = require('ora');
const chalk = require('chalk');
const rm = require('rimraf');
const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require("./webpack.prod.comp.conf");
const utils = require("./utils");
const configEntries = require('./entries');

const spinner = ora('building for production of component...');


spinner.start();

//先清空子项目的文件，在最后的rm的回调函数里build
const createPromise = function (){
  return new Promise(function (resolve, reject){
    resolve();
  });
};
let p = createPromise();
p.then(function (){
  //清空static
  rm(path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory, "static/js"), err =>{
    if ( err ) throw err;
  });
  rm(path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory, "static/css"), err =>{
    if ( err ) throw err;
  });
  //清空项目对应的文件夹
  utils.rmComponent(Object.keys(configEntries));
}).then(function (){
  webpack(webpackConfig, function (err, stats){
    spinner.stop();
    if ( err ) throw err;
    utils.printCompileInfo(stats);
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
});

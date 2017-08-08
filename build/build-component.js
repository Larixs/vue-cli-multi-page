//需要在webpackConfig引入之前设置。webpackConfig里涉及到了环境的判断。
const ora = require('ora');
const chalk = require('chalk');
const rm = require('rimraf');
const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require("./webpack.prod.comp.conf");
const utils = require("./utils");
const configEntries = require('./entry');

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
    rm(path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory, "static"), err =>{
        if ( err ) throw err;
    });
    //清空对应的html、js、css
    utils.rmComponent(Object.keys(configEntries));
}).then(function (){
    webpack(webpackConfig, function (err, stats){
        spinner.stop();
        if ( err ) throw err;
        process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunksModules: false
            }) + '\n\n');

        console.log(chalk.cyan('  Build complete.\n'));
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
});

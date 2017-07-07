const webpackConfig = require("./webpack.dll.conf");
const path = require('path');
const dllPath = path.resolve(__dirname, '../static/js/dll');
const webpack = require('webpack');
const rm = require('rimraf');
const ora = require('ora');
const chalk = require('chalk');

const spinner = ora('building for dllPlugin...');
spinner.start();

rm(dllPath, err =>{
    if ( err ) throw err;
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
    })
});
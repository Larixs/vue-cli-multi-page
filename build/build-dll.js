const webpackConfig = require("./webpack.dll.conf");
const path = require('path');
const dllPath = path.resolve(__dirname, '../static/js/dll');
const webpack = require('webpack');
const rm = require('rimraf');

rm(dllPath, err =>{
    if ( err ) throw err;
    webpack(webpackConfig, function (err){
        if ( err ) throw err;
    })
});
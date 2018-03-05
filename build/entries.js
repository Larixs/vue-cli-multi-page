const defaultEntries = require('./entries_default.json');
const path = require('path');
const fs = require('fs');
const srcPath = path.join(__dirname, '../src');
//自定义编译项目。没有对错误的目录名称进行处理，webpack自己会停止（还不是因为我不会中断编译┑(￣Д ￣)┍）。
let configEntries = [];
const isProduction = process.env.NODE_ENV.includes('production')
const isBuildComp = process.argv[1].includes("comp")
configEntries = isProduction ? process.argv.slice(2) || configEntries : process.argv.slice(2, 3);

//如果node命令中没有加任何子项目名称，则以所有子项目作为入口
configEntries = configEntries.length ? configEntries : (isBuildComp ? defaultEntries["build:comp"] : defaultEntries["build"] ) ;

module.exports = configEntries.reduce((entries, dir) =>{
  //读取src下的所有文件夹
  const fullDir = path.join(srcPath, dir);
  const entry = path.resolve(fullDir, 'app.js');
  if ( fs.statSync(fullDir).isDirectory() && fs.existsSync(entry) ) {
    entries[dir] = isProduction ? ["babel-polyfill", entry] : ["babel-polyfill", entry, 'webpack-hot-middleware/client?reload=false'];
  }
  return entries
}, {});


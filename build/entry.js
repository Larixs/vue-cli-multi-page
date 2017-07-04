const path = require('path');
const fs = require('fs');
const srcPath = path.join(__dirname, '../src');
//自定义编译项目。没有对错误的目录名称进行处理，webpack自己会停止（还不是因为我不会中断编译┑(￣Д ￣)┍）。
let configEntries = [];
//如果configEntries为空，默认编译所有子项目
const allEntries = fs.readdirSync(srcPath);

configEntries = configEntries.length ? configEntries : allEntries;
module.exports = configEntries.reduce((entries, dir) =>{
    //读取src下的所有文件夹
    const fullDir = path.join(srcPath, dir);
    const entry = path.resolve(fullDir, 'app.js');
    if ( fs.statSync(fullDir).isDirectory() && fs.existsSync(entry) ) {
        entries[dir] = entry;
    }
    return entries
}, {});
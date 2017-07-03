const path = require('path');
const fs = require('fs');
const srcPath = path.join(__dirname, '../src');
//commandEntries为自己设定的编译项目名称，从node命令中读取
const commandEntries = process.argv.slice(2);
//如果configEntries为空，默认编译所有子项目
const allEntries = fs.readdirSync(srcPath);

const configEntries = commandEntries.length ? commandEntries : allEntries;
module.exports = configEntries.reduce((entries, dir) =>{
    //读取src下的所有文件夹
    const fullDir = path.join(srcPath, dir);
    const entry = path.resolve(fullDir, 'app.js');
    if ( fs.statSync(fullDir).isDirectory() && fs.existsSync(entry) ) {
        entries[dir] = entry;
    }
    return entries
}, {});
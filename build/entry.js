const path = require('path');
const fs = require('fs');
const srcPath =  path.join(__dirname, '../src');
//configEntries为自己设定的编译项目名称
let configEntries = [];
const allEntries = fs.readdirSync(srcPath);
//如果configEntries为空，默认编译所有子项目
configEntries = configEntries.length ? configEntries : allEntries;
console.log("configEntry", configEntries);
module.exports = configEntries.reduce((entries, dir) => {
        //读取src下的所有文件夹
        const fullDir = path.join(srcPath, dir);
        const entry = path.resolve(fullDir, 'app.js');
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry))
        {
            entries[dir] = entry;
        }
        return entries
    }, {});
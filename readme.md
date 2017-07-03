1. npm install
2. npm run dev / npm run build

src里除了fonts和img文件夹，其余文件夹均为子项目。每个子项目可以单独打包编译。只需npm run build + 项目名称 即可。如果需要一次编译多个子项目，那么继续输入项目名称即可。如npm run build project1 project2，就会一次编译project1和project2。如果不赋初值，那么默认打包所有子项目文件。

npm run build:dll用于提取第三方库，当需要提取的第三方库有改变时，在webpack.dll.conf.js里配置，并且对所有子项目重新构建一遍(npm run build)。
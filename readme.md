# Vue-cli + webpack的多页面应用

## 使用
 \# 安装 
 
 npm install
 
 \# 更新需要提取的第三方库
 
 1. 在build/webpack.dll.conf.js里修改所要提取的第三方库
 2. 执行 npm run build:dll 命令，生成common.js文件
 3. 执行 npm run build 命令，更新所有的html文件，使其引用新的common.js文件。
 
 \# 开启dev环境进行调试
 
 npm run dev 或者 npm start。
 
 \# build
 
 npm run build 
 
 \# 当index.html有变化时，需要进行一遍完整流程，即 npm run build:dll ->  npm run build。
 
## 背景
 公司有个项目A，里面的页面是通过引入vue的js文件来写每个页面的。和原来用jquery写的项目很像，没有工程化打包和管理，不能用.vue和ES2015来写。这个项目不能抛弃和重构，还要不断地往里面加新的页面。为了能够工程化管理，并且用上.vue文件、css扩展语言、ES2015等，搭建了这个项目A+。这个项目build出来的文件直接放在gezi里面。这样既不破坏原项目，又可以用较新的技术。

## 项目结构
 src里除了fonts和img文件夹，其余文件夹均为子项目。每个子项目可以单独打包编译，只需在./build/entry.js里配置。如果需要一次编译多个子项目，那么继续输入多个项目名称。如果不赋初值，那么默认打包所有子项目文件。

npm run build:dll用于提取第三方库，当需要提取的第三方库有改变时，在webpack.dll.conf.js里配置，并且对所有子项目重新构建一遍(npm run build)。

文件的输出路径是按照之前项目A的结构输出的，因此结构不够好看。也可以在webpack.prod.conf.js里自行修改输出路径。

    
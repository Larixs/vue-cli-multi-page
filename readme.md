# Vue-cli + webpack的多页面应用

## 使用
 \# 安装 
 
 npm install
 
 \# 更新需要提取的第三方库
 
 命令：npm run build:dll
 
 1. 在build/webpack.dll.conf.js里修改所要提取的第三方库
 2. 执行 npm run build:dll 命令，生成common.js文件
 3. 执行 npm run build 命令，更新所有的html文件，使其引用新的common.js文件。
 
 \# 开启dev环境进行调试
 
 调试命令： npm run dev 或者 npm start
 
 参数： 项目名称name(必需) 调试端口port(可选，默认是8181)
 
 示例： npm run dev login 7171 （在7171端口调试login项目）
 
 \# build
 
 构建命令： npm run build 
 
 参数： 项目名称（可选，默认编译所有子项目）
 
 示例： npm run build login register (构建login、register项目)
 
 \# 当index.html有变化或者需要分离的第三方库有变化时，需要进行一遍完整流程，即 npm run build:dll ->  npm run build。
 
 
 \# 需要在某个项目的index.html引入外部js
 
 在build\external_link.js文件里进行配置
 
 \# 需要更改某个项目的index.html的title
 

## 背景
 公司有个项目gezi，里面的页面是通过引入vue的js文件来写每个页面的。和原来用jquery写的项目很像，没有工程化打包和管理，不能用.vue和ES2015来写。这个项目不能抛弃和重构，还要不断地往里面加新的页面。为了能够工程化管理，并且用上.vue文件、css扩展语言、ES2015等，搭建了这个项目A+。这个项目build出来的文件直接放在gezi里面。这样既不破坏原项目，又可以用较新的技术。

## 有问题找橙子 (●'◡'●)
    
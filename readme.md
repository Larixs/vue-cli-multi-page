# Vue-cli + webpack的多页面应用 —— Link
![](./img/link.jpg)
## 简介
zelda（公司用的项目）是以vue-cli为基础、webpack管理的多个SPA集合应用。src下的每个子文件夹都是一个SPA项目（称为一个子项目）。

zelda所有的项目配置起源于link。现在主要维护zelda，新功能也直接在zelda上添加，但是会不定时地将zelda的配置复制到link。可能有些地方会和具体场景强耦合。

支持vue的jsx写法。

每个子项目的入口名称为app.js。

## 使用
 _____
 \# 安装 
 
 npm install
  _____
 \# 更新需要提取的第三方库

 命令：npm run build:dll
 
 1. 在build/webpack.dll.conf.js里修改所要提取的第三方库
 2. 执行 npm run build:dll 命令，生成common.js文件
 3. 执行 npm run build 命令，更新所有的html文件，使其引用新的common.js文件。
  _____
 \# 开启dev环境进行调试
 
 调试命令： npm run dev 或者 npm start
 
 参数： 项目名称name(必需) 调试端口port(可选，默认是8181)
 
 示例： npm run dev login 7171 （在7171端口调试login项目）
  _____
 \# 打包
 
 构建命令： npm run build 
 
 参数： 项目名称（可选，默认编译所有子项目）
 
 示例： npm run build login register (构建login、register项目)
 
 \# 当index.html有变化或者需要分离的第三方库有变化时，需要进行一遍完整流程，即 npm run build:dll ->  npm run build。
 
  _____
 \# 需要在某个项目的index.html引入外部js
 
 在build/external_link.js文件里进行配置
  _____
 \# 需要更改某个项目的index.html的title
 
 在build/indexPageConfig.js里配置
  _____
 \# 将子项目作为一个组件进行编译
 
 npm run build:comp。挂载点的id在build/indexPageConfig.js里进行配置。编译出的html文件只包含一个挂载点和一个js文件。这个js文件包含所有逻辑代码和样式。
  _____
 \# 清除某一个子项目(组件)打包出来的文件（不包括static文件夹下面的文件）
 
 npm run rm
 
 必需参数： 
 - "c" / "p"  c 代表此次清除的项目的打包方式为组件打包，p 代表此次清除的项目的打包方式为普通打包。\* \* 可放置于项目名称之前、之后、之间。但是只能出现一次。
 - 项目名称。可同时清除多个子项目，但是要求这些项目的打包方式是一致的。
 
 示例： 
 
    npm run rm c login //清除以组件方式打包的login项目
    npm run rm login register p  //清除以普通方式打包的login、register项目    

  _____
 
## 常见问题

1、 图片路径不对
    
在非js代码中，如css和.vue的css部分，请在引用图片时使用'~static/img/../...png'的格式引用。

在js代码中，有两种引用方式，一种是写完整的绝对路径'/pf/mobile/static/img/../...png',另一种是写相对路径，不过相对路径的结构要根据最终目录结构（即dist目录下的结构）来引用。

个人推荐写完整的绝对路径，这样逻辑不会混乱。

## 背景
 公司有个项目gezi，里面的页面是通过引入vue的js文件来写每个页面的。和原来用jquery写的项目很像，没有工程化打包和管理，不能用.vue和ES2015来写。这个项目不能抛弃和重构，还要不断地往里面加新的页面。为了能够工程化管理，并且用上.vue文件、css扩展语言、ES2015等，搭建了这个项目A+。这个项目build出来的文件直接放在gezi里面。这样既不破坏原项目，又可以用较新的技术。

## 项目功能

基本：（相应的指令见上方）

- 各子项目可分开调试，分开打包，减少等待时间
- 利用DllPlugin提取公共库到common.js里
- 在文件后缀增加hash值，而不是在文件名里使用hash值，解决缓存问题的同时减少git log的大小。
- 支持将某个子项目看作组件进行打包，打包出来的html只有一个挂载点和一个js文件。挂载点用于加载组件，js则包含所有js代码及css样式。这样就可以方便的把子项目插入到格子某些页面当中（多数格子页面不是用vue写的）。需要注意的是，唯一的js文件中包含了vue和其他公共库。假如一个格子页面用到了俩个这样的子项目，那么势必会重复加载公共代码部分。因此此编译方式慎用。
- 所有项目打包时都会只更新自己所在的文件夹的文件
- 可删除某一个项目打包出来的文件（不包括static里的文件）

css：
- 支持常见的几种扩展语言，如sass,less,stylus,只需安装对应的npm库和loader即可使用。
- 分离js中的css部分
- css模块化处理

html：
- 外部js可通过配置（./build/external_link）动态插入，有需要的话可以支持css动态插入
- 引入ejs模板，可以通过"./build/indexPageConfig.js"动态设置title或者其他元素

vue：
- 支持.vue文件
- 支持vue的jsx写法

按需加载:
- 普通库在.babelrc里进行配置，按照[babel-import-plugin](https://github.com/ant-design/babel-plugin-import)进行配置
- src/components里的复用组件需要按照特定的文件夹命令方式和导出方式。具体可模仿已写好的组件。

## 有问题提issue (●'◡'●)
    
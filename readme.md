# Vue-cli + webpack的多页面应用 —— Zelda
![](./logo/zelda.jpg)

## 简单介绍

该项目由vue-cli魔改，为多spa集合的项目，所有的spa子项目均放在src目录下。子项目需要包含app.js才能正常启动使用。所有子项目均可单独调试及打包。

项目中已有示例test_base_comp。

## npm相关命令
### 安装

 npm install
  
### 开发，调试及打包

1. **启动dev环境**
    
    命令： npm run dev + 项目名 + (端口号, 默认8181)
    
    示例： npm run dev test_base_comp 9191
    
    附注： 项目名为src文件目录下的子文件夹名称
 
2. **打包** 

   - 单独子项目打包
        
        命令： npm run build + 项目名
        
   - 所有子项目打包(完整带html)
   
        首先把需要打包的子项目的名称加到build/entries_default.json里（放在"build"的数组里），然后执行打包所有的命令。
        
        命令： npm run build

3. **文件结构**

    子项目放在src下，相应的store、私有组件等可以放在子项目下。
    
    公共组件至于components里。目前已对components下的base_components、view_components、layout做了按需加载的处理，所以不用考虑公共组件过多导致无用代码过多。（配置在.babelrc里）

  公共组件示例： import { AuthProxy } from "base_components"



### 更细致的使用

**更新需要提取的第三方库**

 命令：npm run build:dll

 1. 在build/webpack.dll.conf.js里修改所要提取的第三方库
 2. 执行 npm run build:dll 命令，生成common.js文件
 3. 执行 npm run build 命令，更新`所有的`html文件，使其引用新的common.js文件。

**更快启动调试和打包**

在没有更新第三方库以及没有更新index.ejs时，可以使用npm run dev:sim + 项目名 命令启动调试。了解dll的作用之后，可以更灵活的修改打包命令。但是打包环境不建议通过去除dll更新来降低打包时间，这样增加了客户浏览器端缓存原因导致的dll和业务代码不匹配的风险。

**需要在某个项目的index.html引入外部js、css，改变页面title**

 如轮播图、滑动验证等需要引入外部js时，在build/page.conf.js文件里进行配置。

**将所有css、js打包到1个js文件里**

命令：npm run build:comp

详细：挂载点的id在build/page.conf.js里的app进行配置。编译出的html文件只包含一个Vue需要使用的挂载点和一个js文件。这个js文件包含所有js代码和css样式。
  
**清除某一个子项目(组件)打包出来的文件（不包括static文件夹下面的文件）**

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

在非js代码中，请在引用图片时使用'~static/img/../...png'的格式引用。

    <template>
        <img src="~static/img/test/test.png">
        <div class="test"></div>
    </template>

    <style lang="scss">
        .test{
            background-image: url("~static/img/test/test.png")
        }
    </style>

原理：[webpack](./build/webpack.base.conf.js)别名。

在js相关代码中，使用imgPath进行路径拼接。在template里用$imgPath时，需要在项目里使用imgPath的plugin

app.js
```javascript

    import imgPath from "plugins/imgPath"
    import Vue from "vue"
    //如果要引入所有plugins，可以使用 import "components/injectAllPlugins"
    Vue.use(imgPath)
```

如果存在injectImgPath的情况下，可以这么引入

app.js
```javascript
    import "plugins/injectImgPath"

```

test.vue
```html
    <template>
        <img :src="$imgPath + 'test/test.png'">
        <img :src="testImgPath">
    </template>

    <script>
        export default{
            data: function(){
                return {
                    testImgPath: imgPath + 'test/test.png'
                }
            }
        }
    </script>
```

原理：imgPath: [webpack](./build/webpack.base.conf.js)的全局变量。 $imgPath: [Vue](./components/plugins/imgPath.js)的注册变量。

## 背景
 公司有个项目gezi，里面的页面是通过引入vue的js文件来写每个页面的。和原来用jquery写的项目很像，没有工程化打包和管理，不能用.vue和ES2015来写。这个项目不能抛弃和重构，还要不断地往里面加新的页面。为了能够工程化管理，并且用上.vue文件、css扩展语言、ES2015等，搭建了这个项目zelda
 。这个项目build出来的文件直接放在gezi里面。这样既不破坏原项目，又可以用较新的技术。

## 项目功能

基本：（相应的指令见上方）

- 各子项目可分开调试，分开打包，减少等待时间
- 利用DllPlugin提取公共库到common.js里
- 在文件后缀增加hash值，而不是在文件名里使用hash值，解决缓存问题的同时减少git log的大小。
- 支持将某项目的js和css统一打包到一个js文件里，打包出来的最终结果只有1个html文件和1个js文件。
- 每个项目打包时都会只更新自己所在的文件夹的文件
- 可删除某一个项目打包出来的文件（不包括static里的文件）

css：
- 支持常见的几种扩展语言，如sass,less,stylus,只需安装对应的npm库和loader即可使用。
- 分离js中的css部分
- css模块化处理

html：
- 外部js、css通过配置（build/page.conf.js）动态插入
- 引入ejs模板，可以通过（build/page.conf.js）动态设置title或者其他元素

vue：
- 支持.vue文件
- 支持vue的jsx写法
- 将常用的第三方库、js文件或者变量作为插件在vue上注册。目前已注册的有"lodash","imgPath","utils","request"。代码在components/plugins里。
  lodash -> $lodash, imgPath -> $imgPath, utils -> $$utils, request -> $$request
  使用方式:

  - 注册所有插件：import "components/injectAllPlugins"




按需加载:
- 普通库在.babelrc里进行配置，按照[babel-import-plugin](https://github.com/ant-design/babel-plugin-import)进行配置
- src/components里的复用组件需要按照特定的文件夹命令方式和导出方式。具体可模仿已写好的组件。



## 有问题提issue (●'◡'●)
    
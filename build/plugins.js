const pageConfig = require("./page.conf");

class PutExternalFileInHtml {
  apply(compiler){
    compiler.plugin("compilation", compilation =>{
      compilation.plugin(
        "html-webpack-plugin-before-html-generation",
        (htmlPluginData, callback) =>{
          Object.keys(pageConfig.cssLink).forEach(function (name){
            if ( htmlPluginData.assets.js[0].includes(name) ) { //通过第一个js的文件名来判断当前是什么项目
              htmlPluginData.assets.css = Array.prototype.concat(
                pageConfig.cssLink[name],
                htmlPluginData.assets.css
              )
            }
          });

          Object.keys(pageConfig.jsLink).forEach(function (name){
            if ( htmlPluginData.assets.js[0].includes(name) ) {
              htmlPluginData.assets.js = Array.prototype.concat(
                pageConfig.jsLink[name],
                htmlPluginData.assets.js
              );
            }
          });
          callback();
        }
      )
    })
  }
}

exports.PutExternalFileInHtml = PutExternalFileInHtml
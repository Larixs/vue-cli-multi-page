const pageConfig = require("./page.conf");

class PutExternalFileInHtml {
  apply(compiler){
    compiler.plugin("compilation", compilation =>{
      compilation.plugin(
        "html-webpack-plugin-before-html-generation",
        (htmlPluginData, callback) =>{
          Object.keys(pageConfig.cssLink).some(function (name){
            if ( htmlPluginData.assets.js[0].includes(`/${name}.js`) ) { //通过第一个js的文件名来判断当前是什么项目
              htmlPluginData.assets.css = Array.prototype.concat(
                pageConfig.cssLink[name],
                htmlPluginData.assets.css
              )
              return true
            }
            return false
          });

          Object.keys(pageConfig.jsLink).some(function (name){
            if ( htmlPluginData.assets.js[0].includes(`/${name}.js`) ) {
              htmlPluginData.assets.js = Array.prototype.concat(
                pageConfig.jsLink[name],
                htmlPluginData.assets.js
              );
              return true
            }
            return false
          });
          callback();
        }
      )
    })
  }
}

exports.PutExternalFileInHtml = PutExternalFileInHtml
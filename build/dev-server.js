const config = require('../config');
const express = require("express");
const webpack = require("webpack");
const opn = require('opn')
const webpackConfig = require("./webpack.dev.conf");
const port = process.argv[3] || config.dev.port;
const autoOpenBrowser = config.dev.autoOpenBrowser;
const path = require('path');
const proxyMiddleware = require('http-proxy-middleware');
const chalk = require('chalk');
const utils = require("./utils");

const app = express();
const compiler = webpack(webpackConfig);
const devMiddleware = require("webpack-dev-middleware")(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});
const hotMiddleware = require("webpack-hot-middleware")(compiler, {
  log: () =>{
  }
});

const proxyTable = config.dev.proxyTable;

// proxy api requests
Object.keys(proxyTable).forEach(function (context){
  let options = proxyTable[context]
  if ( typeof options === 'string' ) {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);

app.use(hotMiddleware);

// var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// app.use(staticPath, express.static('./static'))
// dev启动时，在内存的虚拟文件夹/pf/mobile/static里挂载真实的static静态资源。
app.use('/pf/mobile/static', express.static('./static'));

const uri = "http://localhost:" + port;

let _resolve;
const readyPromise = new Promise(resolve =>{
  _resolve = resolve;
});

console.log('> Starting dev server...');
devMiddleware.waitUntilValid((stats) =>{
  utils.printCompileInfo(stats);
  console.log("> Listening at " + uri + '\n');
  if ( autoOpenBrowser && process.env.NODE_ENV !== 'testing' ) {
    // opn(uri)
  }
  _resolve();
});

const server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () =>{
    server.close();
  }
};




'use strict';

const proxyPath = '/wsm/tka';

const target = 'http://tkairport-dvlp-master.axises.pri/';

module.exports = function (app) {
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  // for servers with ssl
  let proxy = require('http-proxy').createProxyServer({
    ws: true,
    changeOrigin: true,
    secure: false,
  });

  proxy.on('error', function (err, req) {
    console.error(err, req.url);
  });

  app.use(proxyPath, function (req, res, next) {
    // include root path in proxied request
    console.log(proxyPath, req.url);
    req.url = proxyPath + '/' + req.url;
    console.log('redirect:' + req.url + ' to: ' + target);
    proxy.web(req, res, { target: target });
  });
};

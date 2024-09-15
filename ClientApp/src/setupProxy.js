const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const httpsTarget = env.ASPNETCORE_HTTPS_PORT ?? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`;
const urlTarget = env.ASPNETCORE_URLS ?? env.ASPNETCORE_URLS.split(';')[0];
const target = httpsTarget ?? urlTarget ?? 'http://localhost:34239';

const context = [];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    onError: (err) => console.error(err.message),
    secure: false,
    headers: {
      Connection: 'Keep-Alive',
    },
  });

  app.use(appProxy);
};

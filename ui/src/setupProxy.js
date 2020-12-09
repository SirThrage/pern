const { createProxyMiddleware } = require('http-proxy-middleware');

const {
  REACT_APP_API = 'http://localhost:8080',
} = process.env;

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: REACT_APP_API,
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    })
  );
};

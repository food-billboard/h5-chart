export const API_DOMAIN = 'http://47.97.27.23';
// export const API_DOMAIN = 'http://localhost:4000';
const API_IMPROVE_URL = process.env.API_IMPROVE_URL;

export default {
  dev: {
    // '/api/': {
    //   target: API_DOMAIN,
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
    '/api/user/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/customer/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/screen/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/manage/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/files/': {
      target: API_IMPROVE_URL,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/collections/': {
      target: API_IMPROVE_URL,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/static/image/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/static/video/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  prod: {
    // '/api/': {
    //   target: API_DOMAIN,
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
    '/api/user/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/customer/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/screen/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/manage/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/collections/': {
      target: API_IMPROVE_URL,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/files/': {
      target: API_IMPROVE_URL,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/static/video/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/static/image/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};

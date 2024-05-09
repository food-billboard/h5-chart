export const API_DOMAIN = 'http://47.97.27.23';
// export const API_DOMAIN = 'http://localhost:4000';
const API_IMPROVE_URL = process.env.API_IMPROVE_URL;

const API_URL =
  process.env.REACT_APP === 'improve' ? API_IMPROVE_URL : API_DOMAIN;

export default {
  dev: {
    '/api/': {
      target: API_URL,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  prod: {
    '/api/': {
      target: API_URL,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};

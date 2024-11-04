export const API_DOMAIN = `http://${process.env.RASPBERRY_IP}`;
// export const API_DOMAIN = 'http://localhost:4000';

const API_URL = API_DOMAIN;

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

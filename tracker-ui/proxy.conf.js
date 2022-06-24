const targetedServer = process.env.SERVER_URL || 'http://localhost:3000';

const PROXY_CONFIG = {
    '/api': {
        target: targetedServer,
        pathRewrite: {},
        credentials: 'include',
        changeOrigin: true,
        ws: true,
        secure: false
    }
};

module.exports = PROXY_CONFIG;

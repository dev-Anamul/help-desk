import { Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authenticate } from './middlewares/authenticate';

export const useProxyService = (app: Application) => {
  // change password route
  app.use(
    '/api/v1/auth/change-password',
    authenticate,
    createProxyMiddleware({
      target: 'http://auth:5008',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/auth': '/api/v1/' },
      onProxyReq: (proxyReq, req: any) => {
        proxyReq.setHeader('x-user-id', req.user?.id);
        proxyReq.setHeader('x-user-email', req.user?.email);
      },
    })
  );

  // auth service
  app.use(
    '/api/v1/auth/update-profile',
    authenticate,
    createProxyMiddleware({
      target: 'http://auth:5008',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/auth': '/api/v1/' },
      onProxyReq: (proxyReq, req: any) => {
        proxyReq.setHeader('x-user-id', req.user?.id);
        proxyReq.setHeader('x-user-email', req.user?.email);
      },
    })
  );

  // auth service
  app.use(
    '/api/v1/auth/me',
    authenticate,
    createProxyMiddleware({
      target: 'http://auth:5008',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/auth': '/api/v1/' },
      onProxyReq: (proxyReq, req: any) => {
        proxyReq.setHeader('x-user-id', req.user?.id);
        proxyReq.setHeader('x-user-email', req.user?.email);
      },
    })
  );

  // auth service
  app.use(
    '/api/v1/auth/delete-account',
    authenticate,
    createProxyMiddleware({
      target: 'http://auth:5008',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/auth': '/api/v1/' },
      onProxyReq: (proxyReq, req: any) => {
        proxyReq.setHeader('x-user-id', req.user?.id);
        proxyReq.setHeader('x-user-email', req.user?.email);
      },
    })
  );

  // auth service
  app.use(
    '/api/v1/auth',
    createProxyMiddleware({
      target: 'http://auth:5008',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/auth': '/api/v1/' },
    })
  );

  // user service
  app.use(
    '/api/v1/users',
    authenticate,
    createProxyMiddleware({
      target: 'http://user:5001',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/users': '/api/v1' },
      onProxyReq: (proxyReq, req: any) => {
        proxyReq.setHeader('x-user-id', req.user?.id);
        proxyReq.setHeader('x-user-email', req.user?.email);
      },
    })
  );

  //  ticket service
  app.use(
    '/api/v1/tickets',
    authenticate,
    createProxyMiddleware({
      target: 'http://ticket:5002',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/tickets': '/api/v1' },
      onProxyReq: (proxyReq, req: any) => {
        proxyReq.setHeader('x-user-id', req.user?.id);
        proxyReq.setHeader('x-user-email', req.user?.email);
      },
    })
  );

  // team service
  app.use(
    '/api/v1/teams',
    authenticate,
    createProxyMiddleware({
      target: 'http://team:5003',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/teams': '/api/v1' },
      onProxyReq: (proxyReq, req: any) => {
        proxyReq.setHeader('x-user-id', req.user?.id);
        proxyReq.setHeader('x-user-email', req.user?.email);
      },
    })
  );

  // system service
  app.use(
    '/api/v1/systems',
    authenticate,
    createProxyMiddleware({
      target: 'http://system:5004',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/systems': '/api/v1' },
      onProxyReq: (proxyReq, req: any) => {
        proxyReq.setHeader('x-user-id', req.user?.id);
        proxyReq.setHeader('x-user-email', req.user?.email);
      },
    })
  );

  // categories service
  app.use(
    '/api/v1/categories',
    authenticate,
    createProxyMiddleware({
      target: 'http://category:5006',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/categories': '/api/v1' },
      onProxyReq: (proxyReq, req: any) => {
        proxyReq.setHeader('x-user-id', req.user?.id);
        proxyReq.setHeader('x-user-email', req.user?.email);
      },
    })
  );
};

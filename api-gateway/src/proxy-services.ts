import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const useProxyService = (app: Application) => {
  // user service
  app.use(
    "/api/v1/users",
    createProxyMiddleware({
      target: "http://user:5001",
      changeOrigin: true,
      pathRewrite: { "^/api/v1/users": "/api/v1" },
      onProxyReq: (proxyReq, _req) => {
        proxyReq.setHeader("x-user-id", "1234");
      },
    })
  );

  // auth service
  app.use(
    "/api/v1/auth",
    createProxyMiddleware({
      target: "http://auth:5008",
      changeOrigin: true,
      pathRewrite: { "^/api/v1/auth": "/api/v1" },
    })
  );

  //  ticket service
  app.use(
    "/api/v1/tickets",
    createProxyMiddleware({
      target: "http://ticket:5002",
      changeOrigin: true,
      pathRewrite: {
        "^/api/v1/tickets": "/api/v1",
      },
    })
  );

  // team service
  app.use(
    "/api/v1/teams",
    createProxyMiddleware({
      target: "http://team:5003",
      changeOrigin: true,
      pathRewrite: { "^/api/v1/teams": "/api/v1" },
    })
  );

  // system service
  app.use(
    "/api/v1/systems",
    createProxyMiddleware({
      target: "http://system:5004",
      changeOrigin: true,
      pathRewrite: { "^/api/v1/systems": "/api/v1" },
    })
  );

  // logger service
  app.use(
    "/api/v1/categories",
    createProxyMiddleware({
      target: "http://category:5006",
      changeOrigin: true,
      pathRewrite: { "^/api/v1/categories": "/api/v1" },
    })
  );
};

import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const useProxyService = (app: Application) => {
  // user service
  app.use(
    "/api/v1/users",
    createProxyMiddleware({
      target: "http://user:5001",
      changeOrigin: true,
      pathRewrite: { "^/api/v1/users": "" },
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
      pathRewrite: { "^/api/v1/auth": "" },
    })
  );

  //  ticket service
  app.use(
    "/api/v1/tickets",
    createProxyMiddleware({
      target: "http://ticket:5002",
      changeOrigin: true,
      pathRewrite: { "^/api/v1/tickets": "" },
    })
  );

  // team service
  app.use(
    "/api/v1/teams",
    createProxyMiddleware({
      target: "http://team:5003",
      changeOrigin: true,
      pathRewrite: { "^/api/v1/teams": "" },
    })
  );

  // system service
  app.use(
    "/api/v1/systems",
    createProxyMiddleware({
      target: "http://system:5004",
      changeOrigin: true,
      pathRewrite: { "^/api/v1/systems": "" },
    })
  );

  // logger service
  app.use(
    "/api/v1/categories",
    createProxyMiddleware({
      target: "http://category:5006",
      changeOrigin: true,
      pathRewrite: { "^/api/v1/categories": "" },
    })
  );
};

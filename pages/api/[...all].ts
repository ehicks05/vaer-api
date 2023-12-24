import { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

const API_PROXY_URL = "https://api.openweathermap.org";

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
    bodyParser: false,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  new Promise((resolve, reject) => {
    const proxy: httpProxy = httpProxy.createProxy({
      target: API_PROXY_URL,
      changeOrigin: true,
    });

    proxy.once("proxyReq", function (proxyReq, req, res, options) {
      proxyReq.path = proxyReq.path.replace("/api", "");
      proxyReq.path = proxyReq.path.replace(
        "appid=",
        `appid=${process.env.OWM_API_KEY}`
      );
      proxyReq.setHeader('x-forwarded-port', '443');
      proxyReq.setHeader('x-forwarded-proto', 'https');
      console.log(proxyReq.path);
    });
    proxy.once("proxyRes", resolve);
    proxy.once("error", reject);
    proxy.web(req, res);
  });
};

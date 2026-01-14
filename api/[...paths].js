import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import path from "path";

const envFile =
	process.env.NODE_ENV === "production"
		? ".env.production"
		: ".env.development";

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

module.exports = (req, res) => {
	const target = process.env.VITE_APP_HOST;

	const proxy = createProxyMiddleware({
		target: target,
		changeOrigin: true,
		on: {
			proxyReq: (proxyReq) => {
				proxyReq.setHeader("API_KEY", process.env.VITE_APP_API_KEY);
			},
		},
	});

	return proxy(req, res);
};

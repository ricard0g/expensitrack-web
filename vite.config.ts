import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
    
	return {
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src/"), // Map @ to .src/ folder
			},
		},
		server: {
			proxy: {
				"/api": {
					target: env.VITE_APP_HOST,
					changeOrigin: true,
                    secure: false, // During dev we work with HTTP only
					configure: (proxy, _options) => {
						proxy.on("proxyReq", (proxyReq, _req, _res) => {
							proxyReq.setHeader("API_KEY", env.VITE_APP_API_KEY);
						});
					},
				},
			},
		},
	};
});

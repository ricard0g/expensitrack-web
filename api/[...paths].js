export const config = {
	runtime: "edge",
};

export default async function handler(request) {
	console.log("\n" + "=".repeat(60));
	console.log("🚪 PROXY REQUEST STARTED");
	console.log("=".repeat(60));

	const url = new URL(request.url);

	// Log request details
	console.log("\n📥 INCOMING REQUEST:");
	console.log("  Method:", request.method);
	console.log("  Full URL:", url.toString());
	console.log("  Pathname:", url.pathname);
	console.log("  Query Params:", url.search || "(none)");

	const path = url.pathname.replace(/^\/api/, ""); // Remove 'api' from the path
	const targetUrl = process.env.VITE_APP_HOST + path;

	console.log("\n🎯 TARGET:");
	console.log("  Backend Host:", process.env.VITE_APP_HOST);
	console.log("  Path:", path);
	console.log("  Full Target URL:", targetUrl);

	// Clone the request to read the body for logging
	const clonedRequest = request.clone();
	
	const headers = new Headers(request.headers);
	headers.set("API_KEY", process.env.VITE_APP_API_KEY);
	headers.delete("host");
	headers.delete("connection");

	console.log("\n📋 HEADERS SENT TO BACKEND:");
	const headersObj = {};
	headers.forEach((value, key) => {
		// Mask sensitive data
		const displayValue = key.toLowerCase() === 'api_key' ? '***MASKED***' : value;
		headersObj[key] = displayValue;
		console.log(`  ${key}: ${displayValue}`);
	});

	try {
		// Log request body if present
		if (request.method !== 'GET' && request.method !== 'HEAD') {
			try {
				const bodyText = await clonedRequest.text();
				console.log("\n📦 REQUEST BODY:");
				if (bodyText) {
					try {
						const bodyJson = JSON.parse(bodyText);
						console.log(JSON.stringify(bodyJson, null, 2));
					} catch {
						console.log(bodyText);
					}
				} else {
					console.log("  (empty)");
				}
			} catch (e) {
				console.log("  (unable to read body)");
			}
		}

		console.log("\n⏳ Forwarding request to backend...");

		const backendResponse = await fetch(targetUrl, {
			method: request.method,
			headers: headers,
			body: request.body,
			duplex: "half",
		});

		console.log("\n✅ BACKEND RESPONSE:");
		console.log("  Status:", backendResponse.status, backendResponse.statusText);
		console.log("  Headers:");
		backendResponse.headers.forEach((value, key) => {
			console.log(`    ${key}: ${value}`);
		});

		// Try to log response body (clone to avoid consuming it)
		const clonedResponse = backendResponse.clone();
		try {
			const responseText = await clonedResponse.text();
			console.log("\n📦 RESPONSE BODY:");
			if (responseText) {
				try {
					const responseJson = JSON.parse(responseText);
					console.log(JSON.stringify(responseJson, null, 2));
				} catch {
					console.log(responseText.substring(0, 500) + (responseText.length > 500 ? '...' : ''));
				}
			} else {
				console.log("  (empty)");
			}
		} catch (e) {
			console.log("  (unable to read response body)");
		}

		const responseHeaders = new Headers(backendResponse.headers);
		responseHeaders.delete("content-encoding");
		responseHeaders.delete("transfer-encoding");

		console.log("\n" + "=".repeat(60));
		console.log("✅ PROXY REQUEST COMPLETED SUCCESSFULLY");
		console.log("=".repeat(60) + "\n");

		return new Response(backendResponse.body, {
			status: backendResponse.status,
			statusText: backendResponse.statusText,
			headers: responseHeaders,
		});
	} catch (e) {
		console.log("\n" + "=".repeat(60));
		console.log("❌ PROXY ERROR:");
		console.log("=".repeat(60));
		console.log("  Error Type:", e.name);
		console.log("  Error Message:", e.message);
		console.log("  Stack Trace:");
		console.log(e.stack);
		console.log("=".repeat(60) + "\n");
		
		return new Response(
			JSON.stringify({ error: "Proxy Failed", details: e.message }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}

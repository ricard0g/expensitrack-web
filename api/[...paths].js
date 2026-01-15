export const config = {
	runtime: "edge",
};

export default async function handler(request) {
	console.log("🚪 Inside the Proxy now!");

	const url = new URL(request.url);

	console.log("This is the request URL --> " + url);

	const path = url.pathname.replace(/^\/api/, ""); // Remove 'api' from the path

	console.log("Requesting to this path --> " + path);

	// The endpoint we'll request
	const targetUrl = process.env.VITE_APP_HOST + path;

	console.log("Here the Target URL --> " + targetUrl);

	const headers = new Headers(request.headers);

	headers.set("API_KEY", process.env.VITE_APP_API_KEY);

	headers.delete("host");
	headers.delete("connection");

	try {
		const backendResponse = await fetch(targetUrl, {
			method: request.method,
			headers: headers,
			body: request.body,
			duplex: "half",
		});

		console.log("👉 Response From Backend:");
		console.log(backendResponse);

		const responseHeaders = new Headers(backendResponse.headers);
		responseHeaders.delete("content-encoding");
		responseHeaders.delete("transfer-encoding");

		return new Response(backendResponse.body, {
			status: backendResponse.status,
			statusText: backendResponse.statusText,
			headers: responseHeaders,
		});
	} catch (e) {
		console.log("❌ SOMETHING WENT WRONG:");
		console.log(e);
		return new Response(
			JSON.stringify({ error: "Proxy Failed", details: e.message }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}

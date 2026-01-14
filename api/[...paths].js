export default async function handler(request) {
	const url = new URL(request.url);
	const path = url.pathname.replace(/^\/api/, ""); // Remove 'api' from the path

	// The endpoint we'll request
	const targetUrl = process.env.VITE_APP_HOST + path;

	const headers = new Headers(request.headers);

	headers.set("API_KEY", process.env.VITE_APP_API_KEY);

	headers.delete("host");
	headers.delete("connection");

	try {
		const backendResponse = await fetch(targetUrl, {
			method: request.method,
			headers: headers,
			body: request.body,
		});

		return new Response(backendResponse.body, {
			status: backendResponse.status,
			statusText: backendResponse.statusText,
			headers: backendResponse.headers,
		});
	} catch (e) {
		return new Response(
			JSON.stringify({ error: "Proxy Failed", details: error.message }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}

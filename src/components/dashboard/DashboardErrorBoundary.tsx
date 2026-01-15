import { isRouteErrorResponse, useRouteError } from "react-router";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";

export function DashboardErrorBoundary() {
	const error = useRouteError();

	const handleRefresh = () => {
		window.location.reload();
	};

	if (isRouteErrorResponse(error)) {
		return (
			<div className="flex items-center justify-center min-h-[400px] p-4">
				<Alert variant="destructive" className="max-w-md">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>
						{error.status} | {error.statusText}
					</AlertTitle>
					<AlertDescription>{error.data}</AlertDescription>
				</Alert>
			</div>
		);
	} else if (error instanceof Error) {
		return (
			<div className="flex items-center justify-center min-h-[400px] p-4">
				<Alert variant="destructive" className="max-w-xl">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Application Error</AlertTitle>
					<AlertDescription className="mt-2">
						<p className="font-medium">{error.message}</p>
						<div className="mt-4 text-xs font-mono bg-muted p-2 rounded overflow-auto max-h-40">
							{error.stack}
						</div>
					</AlertDescription>
				</Alert>
			</div>
		);
	} else {
		return (
			<div className="flex items-center justify-center h-full w-full p-6">
				<div className="max-w-[450px] w-full space-y-6 text-center">
					<div className="space-y-2">
						<h2 className="text-2xl font-bold tracking-tight">Backend is Waking Up</h2>
						<p className="text-muted-foreground">
							It looks like the server is taking a moment to start. This is common if the app hasn't been used recently.
						</p>
					</div>

					<Alert className="text-left border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900">
						<RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-400" />
						<AlertTitle className="text-blue-800 dark:text-blue-300">Action Required</AlertTitle>
						<AlertDescription className="text-blue-700 dark:text-blue-400">
							Please <strong>refresh the page</strong> in a few seconds. Once the backend spins up, your data will appear automatically.
						</AlertDescription>
					</Alert>

					<div className="flex flex-col gap-3">
						<Button onClick={handleRefresh} className="w-full shadow-cool-medium" size="lg">
							<RefreshCw className="mr-2 h-4 w-4" />
							Refresh Page
						</Button>
						<p className="text-xs text-muted-foreground">
							Seeing this again? It might take 2-3 refreshes for a full cold start.
						</p>
					</div>
				</div>
			</div>
		);
	}
}

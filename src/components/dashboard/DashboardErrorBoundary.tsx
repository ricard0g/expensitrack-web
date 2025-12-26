import { isRouteErrorResponse, useRouteError } from "react-router";

export function DashboardErrorBoundary() {
    let error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <>
                <h1>
                    {error.status} | {error.statusText}
                </h1>
                <p>{error.data}</p>
            </>
        )
    } else if (error instanceof Error) {
        return (
            <>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <p>{error.stack}</p>
            </>
        )
    } else {
        return <h1>Unknown Error</h1>
    }
}

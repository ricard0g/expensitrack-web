import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import type { User } from "./types/user.ts";
import type { Expense, ExpenseByCategory } from "./types/expense.ts";
import { DashboardErrorBoundary } from "./components/dashboard/DashboardErrorBoundary.tsx";
import type { ExpenseCategory } from "./types/category.ts";
import type { DeletionError } from "./types/deletionError.ts";

// APP_HOST is empty string to target Proxy
const APP_HOST = "";

const headers = {
    "Content-Type": "application/json",
};

const getCategories = async (): Promise<ExpenseCategory[]> => {
    const response = await fetch(`${APP_HOST}/api/categories`, {
        headers: headers,
    });

    if (!response.ok) throw response;

    return await response.json();
};

const getExpensesByCategory = async (): Promise<ExpenseByCategory[]> => {
    const response = await fetch(`${APP_HOST}/api/expenses/category-totals`, {
        headers: headers,
    });

    if (!response.ok) throw response;

    return await response.json();
};

const getAllExpenses = async (): Promise<Expense[]> => {
    const response = await fetch(`${APP_HOST}/api/expenses`, {
        headers: headers,
    });

    if (!response.ok) throw response;

    return await response.json();
};

const getUserData = async (): Promise<User> => {
    const response = await fetch(`${APP_HOST}/api/user/demo`, {
        headers: headers,
    });

    if (!response.ok) throw response;

    return await response.json();
};

const getTotalSpent = async (): Promise<number> => {
    const response = await fetch(`${APP_HOST}/api/expenses/total`, {
        headers: headers,
    });

    if (!response.ok) throw response;

    return await response.json();
};

const apiRequest = async (url: string, method: string, body?: any) => {
    const response = await fetch(`${APP_HOST}/api/${url}`, {
        method: method.toUpperCase(),
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) throw response;

    return method === "DELETE" ? true : await response.json();
};

// Master action that based on intent we execute
const dashboardAction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const intent = formData.get("intent");

    try {
        switch (intent) {
            case "createExpense": {
                const expenseData = {
                    userFirstName: "John",
                    categoryName: formData.get("category-name"),
                    expenseName: formData.get("expense-name"),
                    expenseDescription: formData.get("expense-description"),
                    expenseAmount: Number(formData.get("expense-amount")),
                    date: formData.get("date"),
                };

                await apiRequest("expenses", "POST", expenseData);
                return {
                    success: true,
                    message: "Expense Created Successfully",
                };
            }

            case "deleteExpense": {
                console.log(formData);

                const expenseId = formData.get("expense-id");

                await apiRequest(`expenses/${expenseId}`, "DELETE");

                return {
                    success: true,
                    message: "Expense Deleted Successfully",
                };
            }

            default:
                throw new Error("Uknown Intent");
        }
    } catch (e) {
        console.error(e);
        let errorMessage = "Operation Failed";

        if (e instanceof Response) {
            try {
                const errorBody: DeletionError = await e.json(); // to get the actual Error Body from our Backend we have to read the body of Response, consume the ReadableStream of bytes sent from the backend, to do this we have to use json()

                if (errorBody && errorBody.message) {
                    errorMessage = errorBody.message;
                }
            } catch (parsingError) {
                console.error("Failed to Parse Backend Error: ", parsingError);
            }
        } else if (e instanceof Error) {
            errorMessage = e.message;
        }

        return { error: errorMessage };
    }
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        ErrorBoundary: DashboardErrorBoundary,
        loader: async () => {
            // await to load navbar as fast as possible
            const userDataPromise = getUserData();

            // asynchronously handle these
            const allExpenses = getAllExpenses();
            const expensesByCategory = getExpensesByCategory();
            const totalSpent = getTotalSpent();
            const categories = getCategories();


            return {
                userDataPromise,
                allExpensesPromise: allExpenses,
                expensesByCategoryPromise: expensesByCategory,
                totalSpentPromise: totalSpent,
                categoriesPromise: categories,
            };
        },
        action: dashboardAction,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

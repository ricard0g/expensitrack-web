import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import type { User } from "./types/user.ts"
import type { Expense, ExpenseByCategory } from './types/expense.ts'
import { DashboardErrorBoundary } from './components/dashboard/DashboardErrorBoundary.tsx'

const APP_HOST = import.meta.env.VITE_APP_HOST;

const headers = {
    "Content-Type": "application/json",
    "API_KEY": import.meta.env.VITE_APP_API_KEY
}

const getExpensesByCategory = async (): Promise<ExpenseByCategory[]> => {
    const response = await fetch(`${APP_HOST}/api/expenses/category-totals`, {
        headers: headers
    });

    if (!response.ok) throw response;

    return await response.json();
}

const getAllExpenses = async (): Promise<Expense[]> => {
    const response = await fetch(`${APP_HOST}/api/expenses/`, {
        headers: headers
    });

    if (!response.ok) throw response;

    return await response.json();
}

const getUserData = async (): Promise<User> => {
    const response = await fetch(`${APP_HOST}/api/user/demo`, {
        headers: headers
    })

    if (!response.ok) throw response;

    return await response.json();
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        ErrorBoundary: DashboardErrorBoundary,
        loader: async () => {
            const [userData, allExpenses, expensesByCategory] = await Promise.all([
                getUserData(),
                getAllExpenses(),
                getExpensesByCategory()
            ])

            return {userData, allExpenses, expensesByCategory};
        }
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)

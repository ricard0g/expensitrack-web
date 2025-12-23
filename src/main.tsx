import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import type { User } from "./types/user.ts"
import type { Expense } from './types/expense.ts'

const headers = {
    "Content-Type": "application/json",
    "API_KEY": import.meta.env.VITE_APP_API_KEY
}

const getAllExpenses = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/expenses/", {
            headers: headers
        });

        if (!response) throw new Error("❌ Response from Fetching All expenses failed!");

        const allExpenses: Expense[] = await response.json();

        return allExpenses
    } catch (e) {
        return new Error("All expenses fetching failed. Here the error" + e);
    }
}

const getUserData = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/user/demo", {
            method: "GET",
            headers: headers
        });

        console.log(response);

        if (!response) throw new Error("❌ Response from User fetching failed!");

        const userData: User = await response.json();

        console.log(userData)

        return userData;
    } catch (e) {
        return new Error("User Fetch failed! Error: " + e);
    }
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: async () => {

            return { userData: await getUserData(), allExpenses: await getAllExpenses() };
        }
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)

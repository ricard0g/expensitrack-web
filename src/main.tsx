import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import type { User } from "./types/user.ts"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: async () => {
            const response = await fetch("http://localhost:8080/api/user/a91ad579-deb4-4c3e-aa0a-16b7db5ea16f", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "API_KEY": import.meta.env.VITE_APP_API_KEY
                }
            });

            if (!response) throw new Error("❌ Failed to fetch the user!");

            const userData: User = await response.json();

            return userData;
        }
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)

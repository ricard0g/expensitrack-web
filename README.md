# Expensitrack Web 🌐

--> [Expensitrack Backend Repo](https://github.com/ricard0g/expensitrack-api)

A polished, high-performance frontend for the **Expensitrack** portfolio project. This dashboard visualizes personal finances using **React 19** and advanced **React Router v7** patterns, secured by a custom proxy architecture.

![React](https://img.shields.io/badge/React-v19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue)

## 🚀 Key Features & Architecture

* **⚡ React Router v7 Data Strategy**: Uses `loaders` for parallel "render-as-you-fetch" data loading and `actions` for handling form submissions and mutations.
* **🔐 Secure BFF Proxy**: Implements a Vercel Edge Function (`api/[...paths].js`) to inject the sensitive backend `API_KEY` server-side, ensuring it never leaks to the browser.js].
* **📊 Visualization**: Interactive charts (Bar & Radar) powered by **Recharts** and data grids using **TanStack Table**.
* **🎨 Modern Styling**: Built with **Tailwind CSS v4** and **Shadcn UI** components.

## 🛠️ Tech Stack

* **Core**: React 19 (RC), TypeScript, Vite
* **Routing**: React Router v7 (Data APIs)
* **Styling**: Tailwind CSS v4, Shadcn
* **Data**: Recharts, TanStack Table
* **Deployment**: Vercel (Edge Functions)

## 💻 Quick Start

1.  **Clone and Install**
    ```bash
    git clone [https://github.com/yourusername/expensitrack-web.git](https://github.com/yourusername/expensitrack-web.git)
    cd expensitrack-web
    npm install
    ```

2.  **Configure Environment**
    Create a `.env` file in the root:
    ```env
    # The URL of your Spring Boot Backend (e.g., on Render)
    VITE_APP_HOST=[https://your-backend.onrender.com](https://your-backend.onrender.com)
    # Your backend security key
    VITE_APP_API_KEY=your_secret_key
    ```

3.  **Run Locally**
    ```bash
    npm run dev
    ```
    The app will proxy requests from `/api/*` to your backend, injecting the key automatically.

## 📦 Deployment

Deploy to **Vercel** for best results.
1.  Import project to Vercel.
2.  Add `VITE_APP_HOST` and `VITE_APP_API_KEY` in Vercel Project Settings.
3.  Deploy. The `vercel.json` configuration handles the proxy rewrites automatically.
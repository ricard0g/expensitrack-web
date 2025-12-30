import './App.css'
import { Navbar } from './components/shared/Navbar'
import { Dashboard } from './components/dashboard/Dashboard'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./components/ui/dialog"
import { Spinner } from "./components/ui/spinner"
import { Suspense, use, useState } from 'react'
import { useLoaderData } from 'react-router'
import type { User } from './types/user'

function StartupDialog() {
    return (
        <Dialog open={true}>
            <DialogContent className="sm:max-w-[425px] border-0 shadow-cool-medium [&>button]:hidden">
                <DialogHeader>
                    <DialogTitle>Waking up the server...</DialogTitle>
                    <DialogDescription>
                        This is a demo app hosted on a free tier. The backend sleeps after inactivity.
                        Please wait about 60 seconds for it to spin up.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center py-4">
                    <Spinner className="size-10 text-accent-color" />
                </div>
            </DialogContent>
        </Dialog>
    )
}

function WaitForBackend({ children }: { children: React.ReactNode }) {
    const { userDataPromise } = useLoaderData() as { userDataPromise: Promise<User> };
    const [shouldBlock] = useState(() => !sessionStorage.getItem("backend_woken_up"));

    if (shouldBlock) {
        use(userDataPromise);
        sessionStorage.setItem("backend_woken_up", "true");
    }

    return <>{children}</>;
}

function App() {
    return (
        <section className='max-w-full h-auto'>
            <Suspense fallback={<StartupDialog />}>
                <WaitForBackend>
                    <Navbar />
                    <main>
                        <Dashboard />
                    </main>
                </WaitForBackend>
            </Suspense>
        </section>
    )
}

export default App

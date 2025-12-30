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
import { Suspense } from 'react'

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

function App() {
    return (
        <section className='max-w-full h-auto'>
            <Suspense fallback={<StartupDialog />}>
                <Navbar />
                <main>
                    <Dashboard />
                </main>
            </Suspense>
        </section>
    )
}

export default App

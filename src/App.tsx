import './App.css'
import { Navbar } from './components/shared/Navbar'
import { Dashboard } from './components/dashboard/Dashboard'

function App() {
    return (
        <section className='max-w-full h-auto'>
            <Navbar />
            <main>
                <Dashboard />
            </main>
        </section>
    )
}

export default App

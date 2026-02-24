import { ThemeProvider } from './components/Themeprovider'
import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

function App() {
    return (
        <ThemeProvider defaultTheme="dark">
            <div className="min-h-screen bg-zinc-950 text-zinc-100">
                <Navbar />
                <main>
                    <Hero />
                    <Skills />
                    <Projects />
                    <Contact />
                    <Footer />
                </main>
            </div>
        </ThemeProvider>
    )
}

export default App
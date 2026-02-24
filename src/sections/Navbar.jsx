import { useState, useEffect } from 'react'
import { ThemeToggle } from '../components/Themetoggle'
import { Menu, X, Download } from 'lucide-react'

const navItems = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
]

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    // Track scroll progress
    useEffect(() => {
        const handleScroll = () => {
            // For navbar background
            setScrolled(window.scrollY > 50)
            
            // For progress bar
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = (window.scrollY / totalHeight) * 100
            setScrollProgress(Math.min(progress, 100))
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Handle resume download
    const handleDownloadResume = () => {
        // Replace with your actual resume file path
        const resumeUrl = '/resume.pdf'
        const link = document.createElement('a')
        link.href = resumeUrl
        link.download = 'YourName_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <>
            {/* Scroll Progress Bar - Fixed at very top */}
            <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-zinc-900">
                <div 
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-150 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Main Navbar */}
            <nav
                className={`fixed top-1 w-full z-50 transition-all duration-300 ${
                    scrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <a
                            href="#"
                            className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                        >
                            FLEXY DEV
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                                </a>
                            ))}
                            
                            {/* Resume Button - Desktop */}
                            <button
                                onClick={handleDownloadResume}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105"
                            >
                                <Download size={16} />
                                Resume
                            </button>
                            
                            <ThemeToggle />
                        </div>

                        {/* Mobile Controls - Resume + Hamburger */}
                        <div className="flex items-center gap-3 md:hidden">
                            {/* Resume Button - Mobile (Outside hamburger) */}
                            <button
                                onClick={handleDownloadResume}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-medium rounded-full"
                            >
                                <Download size={14} />
                                <span>Resume</span>
                            </button>

                            <button
                                className="p-2 text-zinc-400 hover:text-white transition-colors"
                                onClick={() => setMobileOpen(!mobileOpen)}
                            >
                                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
                        <div className="px-4 py-4 space-y-3">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block py-2 text-zinc-400 hover:text-white transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                            {/* Theme toggle in mobile menu */}
                            <div className="pt-2 border-t border-zinc-800">
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-zinc-400">Theme</span>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}
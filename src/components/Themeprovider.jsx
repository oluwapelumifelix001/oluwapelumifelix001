import { createContext, useContext, useEffect, useState } from 'react'

// Create the context
const ThemeContext = createContext({
    theme: 'dark',
    setTheme: () => null,
})

// Custom hook to use the theme
export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

// Provider component
export function ThemeProvider({ children, defaultTheme = 'dark' }) {
    const [theme, setTheme] = useState(defaultTheme)
    const [mounted, setMounted] = useState(false)

    // Initialize theme from localStorage or default
    useEffect(() => {
        setMounted(true)
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            setTheme(savedTheme)
        }
    }, [])

    // Apply theme to document
    useEffect(() => {
        if (!mounted) return
        
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
        
        // Save to localStorage
        localStorage.setItem('theme', theme)
    }, [theme, mounted])

    // Prevent flash of wrong theme
    if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{children}</div>
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
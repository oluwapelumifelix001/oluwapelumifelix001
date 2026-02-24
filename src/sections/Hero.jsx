import { useEffect, useState, useRef } from 'react'
import { ArrowDown, Github, Linkedin, Twitter, Cpu } from 'lucide-react'

const socials = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
]

// 3D Tilt effect hook
function useTilt() {
    const ref = useRef(null)
    const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)')

    const handleMouseMove = (e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`)
    }

    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)')
    }

    return { ref, transform, handleMouseMove, handleMouseLeave }
}

function AnimatedText({ text, className, delay = 0 }) {
    const [displayText, setDisplayText] = useState('')
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => {
            let index = 0
            const interval = setInterval(() => {
                if (index <= text.length) {
                    setDisplayText(text.slice(0, index))
                    index++
                } else {
                    clearInterval(interval)
                    setTimeout(() => setShowCursor(false), 1000)
                }
            }, 100)
            return () => clearInterval(interval)
        }, delay)
        return () => clearTimeout(timeout)
    }, [text, delay])

    return (
        <span className={className}>
            {displayText}
            <span 
                className={`inline-block w-0.5 h-[1em] bg-current ml-1 align-middle transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                style={{ animation: showCursor ? 'blink 1s infinite' : 'none' }}
            />
        </span>
    )
}

export function Hero() {
    const [isVisible, setIsVisible] = useState(false)
    const { ref: tiltRef, transform, handleMouseMove, handleMouseLeave } = useTilt()

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 isolate pt-16 transition-colors duration-300">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.1),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.15),transparent_70%)]" />
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

            <style>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                @keyframes border-rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
                .animate-border-rotate { animation: border-rotate 4s linear infinite; }
            `}</style>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col items-center justify-center text-center">
                    
                    {/* Profile Image */}
                    <div className={`mb-6 lg:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="relative inline-block">
                            {/* Outer rotating ring */}
                            <div className="absolute -inset-4 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 animate-border-rotate opacity-50" />
                            
                            {/* Middle glowing ring */}
                            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-20 dark:opacity-30 blur-md animate-pulse" />
                            
                            {/* Inner rotating border */}
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-border-rotate" style={{ animationDirection: 'reverse', animationDuration: '3s' }}>
                                <div className="absolute inset-0.5 rounded-full bg-white dark:bg-zinc-950" />
                            </div>

                            {/* 3D Tilt Container */}
                            <div 
                                ref={tiltRef}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 ease-out"
                                style={{ transform }}
                            >
                                <div className="relative w-full h-full">
                                    <img 
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
                                        alt="Felix Oluwapelumi"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-2 animate-[scanline_3s_linear_infinite]" />
                                </div>

                                {/* Corner accents */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />
                            </div>

                            {/* Status indicator */}
                            <div className="absolute -bottom-1 -right-1 md:bottom-0 md:right-0">
                                <div className="relative">
                                    <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rotate-45 border-2 border-white dark:border-zinc-950 flex items-center justify-center animate-pulse">
                                        <div className="w-2 h-2 md:w-3 md:h-3 bg-white -rotate-45 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Badge */}
                    <div className={`mb-3 lg:mb-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900/80 border border-cyan-500/30 text-xs md:text-sm text-cyan-600 dark:text-cyan-400 backdrop-blur-sm transition-colors duration-300">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            Available for freelance work
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 lg:mb-4 text-zinc-900 dark:text-zinc-100 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <span className=" mb-1">
                            <AnimatedText text="Building" delay={800} />
                        </span>
                        <span className=" mb-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                            digital
                        </span>
                        <span className="block">
                            <AnimatedText text="experiences" delay={1500} />
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className={`text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xs sm:max-w-md md:max-w-2xl mx-auto mb-6 lg:mb-8 leading-relaxed px-4 sm:px-0 transition-all duration-700 delay-[2000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        I'm Felix Oluwapelumi, a Full Stack Developer specializing in crafting high-performance web applications.
                        I build secure, scalable solutions using <span className="text-cyan-600 dark:text-cyan-400 font-semibold">React</span>,{' '} <span className="text-blue-600 dark:text-blue-400 font-semibold">Node.js</span> and{' '} <span className="text-purple-600 dark:text-purple-400 font-semibold">Modern Web</span> technologies.
                    </p>

                    {/* CTA Buttons */}
                    <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 lg:mb-8 w-full max-w-md sm:max-w-none px-4 sm:px-0 transition-all duration-700 delay-[2500ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <a
                            href="#projects"
                            className="group relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold text-sm overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 text-center"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                View My Work
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </a>
                        
                        <a
                            href="#contact"
                            className="group w-full sm:w-auto px-6 py-3 bg-zinc-200 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-900 dark:text-white rounded-full font-semibold text-sm border border-zinc-300 dark:border-zinc-700 hover:border-cyan-500/50 hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-all hover:scale-105 text-center"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Get In Touch
                                <Cpu size={14} className="text-cyan-600 dark:text-cyan-400" />
                            </span>
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className={`flex items-center justify-center gap-3 transition-all duration-700 delay-[3000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-0'}`}>
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
                            >
                                <social.icon size={18} className="group-hover:rotate-12 transition-transform" />
                            </a>
                        ))}
                    </div>

                    {/* Tech pills */}
                    <div className={`mt-6 lg:mt-8 flex flex-wrap justify-center gap-2 transition-all duration-700 delay-[3500ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        {['React', 'Node.js', 'TypeScript', 'Tailwind'].map((tech) => (
                            <span 
                                key={tech}
                                className="px-3 py-1 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-800 rounded-full hover:border-cyan-500/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
                <a href="#projects" className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-900/80 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                    <ArrowDown size={16} />
                </a>
            </div>
        </section>
    )
}
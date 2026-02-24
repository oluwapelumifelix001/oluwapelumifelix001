import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

// SVG Icons for tech stack
const techIcons = {
  React: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-cyan-500 dark:text-cyan-400">
      <path d="M12 0c-1.1 0-2.1.2-3 .5-1.6.5-3 1.4-4 2.5-1 1.1-1.7 2.5-2 4-.3 1.4-.2 3 .2 4.5.4 1.5 1.2 2.9 2.2 4 .5.6 1.1 1.1 1.8 1.5-.7.4-1.3.9-1.8 1.5-1 1.1-1.8 2.5-2.2 4-.4 1.5-.5 3.1-.2 4.5.3 1.5 1 2.9 2 4 1 1.1 2.4 2 4 2.5.9.3 1.9.5 3 .5s2.1-.2 3-.5c1.6-.5 3-1.4 4-2.5 1-1.1 1.7-2.5 2-4 .3-1.4.2-3-.2-4.5-.4-1.5-1.2-2.9-2.2-4-.5-.6-1.1-1.1-1.8-1.5.7-.4 1.3.9 1.8 1.5 1 1.1 1.8 2.5 2.2 4 .4 1.5.5 3.1.2 4.5-.3 1.5-1 2.9-2 4-1 1.1-2.4 2-4 2.5-.9.3-1.9.5-3 .5zm0 2.2c.9 0 1.7.2 2.5.4 1.2.4 2.3 1.1 3 1.9.7.8 1.2 1.8 1.4 2.9.2 1.1.1 2.3-.2 3.4-.2.7-.5 1.4-.9 2-.4.6-.9 1.2-1.5 1.7-.3.3-.7.5-1.1.7-.4-.2-.8-.4-1.1-.7-.6-.5-1.1-1.1-1.5-1.7-.4-.6-.7-1.3-.9-2-.3-1.1-.4-2.3-.2-3.4.2-1.1.7-2.1 1.4-2.9.7-.8 1.8-1.5 3-1.9.8-.2 1.6-.4 2.5-.4zm-4.6 4.6c-.5.7-.9 1.5-1.1 2.4-.2.9-.2 1.8 0 2.7.1.5.3 1 .6 1.4-.6.2-1.1.4-1.6.7-1 .5-1.9 1.2-2.6 2-.7.8-1.2 1.8-1.4 2.9-.2 1.1-.1 2.3.2 3.4.3 1.1.9 2.1 1.8 2.9.9.8 2 1.4 3.2 1.8.8.2 1.6.4 2.5.4s1.7-.2 2.5-.4c1.2-.4 2.3-1 3.2-1.8.9-.8 1.5-1.8 1.8-2.9.3-1.1.4-2.3.2-3.4-.2-1.1-.7-2.1-1.4-2.9-.7-.8-1.6-1.5-2.6-2-.5-.3-1-.5-1.6-.7.3-.4.5-.9.6-1.4.2-.9.2-1.8 0-2.7-.2-.9-.6-1.7-1.1-2.4 1.3.4 2.4 1 3.3 1.9.9.9 1.5 2 1.8 3.2.3 1.2.2 2.5-.2 3.7-.4 1.2-1.1 2.3-2 3.2-.9.9-2 1.6-3.3 2-1.2.4-2.5.5-3.8.3-1.3-.2-2.5-.7-3.6-1.4-1.1-.7-2-1.7-2.7-2.8-.7-1.1-1.1-2.4-1.3-3.7-.2-1.3 0-2.6.4-3.8.4-1.2 1.1-2.3 2-3.2.9-.9 2-1.5 3.3-1.9zm0 7.6c.2.6.5 1.1.9 1.6.4.5.9.9 1.5 1.2-.6.3-1.1.7-1.5 1.2-.4.5-.7 1-.9 1.6-.2.6-.3 1.2-.3 1.8 0 .6.1 1.2.3 1.8.2.6.5 1.1.9 1.6.4.5.9.9 1.5 1.2.6.3 1.2.5 1.8.6.6.1 1.2 0 1.8-.2.6-.2 1.1-.5 1.6-.9.5-.4.9-.9 1.2-1.5.3-.6.5-1.2.6-1.8.1-.6 0-1.2-.2-1.8-.2-.6-.5-1.1-.9-1.6-.4-.5-.9-.9-1.5-1.2.6-.3 1.1-.7 1.5-1.2.4-.5.7-1 .9-1.6.2-.6.3-1.2.3-1.8 0-.6-.1-1.2-.3-1.8-.2-.6-.5-1.1-.9-1.6-.4-.5-.9-.9-1.5-1.2-.6-.3-1.2-.5-1.8-.6-.6-.1-1.2 0-1.8.2-.6.2-1.1.5-1.6.9-.5.4-.9.9-1.2 1.5-.3.6-.5-1.2-.6-1.8-.1-.6 0-1.2.2-1.8z"/>
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600 dark:text-green-500">
      <path d="M12 0L1.606 6v12L12 24l10.394-6V6L12 0zm6.14 16.794l-1.66.954-.059.033-.059.018-.065.018-.065.012-.07.012-.07.006-.077.006H14.2l-.07-.006-.07-.012-.065-.012-.065-.018-.059-.018-.059-.033-1.66-.954v-1.906l1.66.954.059.033.059.018.065.018.065.012.07.012.07.006h1.714l.07-.006.07-.012.065-.012.065-.018.059-.018.059-.033 1.66-.954v1.906zm0-4.788l-1.66.954-.059.033-.059.018-.065.018-.065.012-.07.012-.07.006H14.2l-.07-.006-.07-.012-.065-.012-.065-.018-.059-.018-.059-.033-1.66-.954V9.142l1.66.954.059.033.059.018.065.018.065.012.07.012.07.006h1.714l.07-.006.07-.012.065-.012.065-.018.059-.018.059-.033 1.66-.954v1.87zm0-4.752L12 7.512l-6.14-3.534v7.068L12 14.58l6.14-3.534V3.534zM5.86 16.794l-1.66-.954v-1.906l1.66.954v1.906zm0-4.788l-1.66-.954V9.142l1.66.954v1.91zm1.714-6.606L12 2.466l4.426 2.544L12 7.554 7.574 5.094v1.306z"/>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500 dark:text-yellow-400">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  ),
  HTML5: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-600 dark:text-orange-500">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
    </svg>
  ),
  CSS3: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-500">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
    </svg>
  ),
  'Tailwind CSS': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-cyan-500 dark:text-cyan-400">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-700 dark:text-green-600">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
    </svg>
  ),
  Express: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-zinc-600 dark:text-zinc-400">
      <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.378-7.172-4.973-6.393a1.49 1.49 0 011.831-.717l4.536 6.016 4.545-6.025a1.463 1.463 0 011.844.718l-4.994 6.418 5.266 7.041zM.002 11.576l.42-1.075L3.083 16.7l2.48-6.417 2.545 6.418 2.418-6.418 2.582 6.418 2.334-6.418 2.582 6.418.42 1.075H.002z"/>
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-700 dark:text-orange-600">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.659 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.678-1.342-.396-2.009L7.611 3.527 4.647 6.491c-.603.605-.603 1.585 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l6.232-6.227c.605-.603.605-1.582 0-2.187z"/>
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-zinc-800 dark:text-white">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  'VS Code': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-500">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.261A1 1 0 00.326 8.74L3.899 12 .326 15.26a1 1 0 00.001 1.479L1.65 17.94a.999.999 0 001.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 001.704.29l4.942-2.377A1.5 1.5 0 0024 20.06V3.939a1.5 1.5 0 00-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-purple-600 dark:text-purple-500">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 00-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/>
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-zinc-800 dark:text-white">
      <path d="M24 22.525H0l12-21.05 12 21.05z"/>
    </svg>
  ),
  'REST APIs': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-green-600 dark:text-green-400" strokeWidth="2">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  ),
}

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML/CSS', level: 92 },
      { name: 'Tailwind CSS', level: 88 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 82 },
      { name: 'MongoDB', level: 80 },
      { name: 'REST APIs', level: 85 },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', level: 88 },
      { name: 'VS Code', level: 90 },
      { name: 'Figma', level: 75 },
      { name: 'Vercel', level: 85 },
    ],
  },
]

const technologies = [
  'React', 'Node.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS',
  'MongoDB', 'Express', 'Git', 'GitHub', 'VS Code', 'Figma', 'Vercel', 'REST APIs'
]

// Animated counter hook
function useCountUp(end, duration = 2000, startOnView = false) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if ((startOnView && isInView && !hasStarted) || (!startOnView && !hasStarted)) {
      setHasStarted(true)
      let startTime = null
      const startValue = 0

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(easeOutQuart * (end - startValue) + startValue)
        
        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [end, duration, isInView, hasStarted, startOnView])

  return { count, ref }
}

// Animated progress bar component
function AnimatedProgressBar({ level, delay = 0 }) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setWidth(level)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, level, delay])

  return (
    <div ref={ref} className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out relative"
        style={{ width: `${width}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" 
          style={{ animationDelay: `${delay}ms` }}
        />
      </div>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}

// Stat card with counting animation
function StatCard({ value, suffix, label, color }) {
  const { count, ref } = useCountUp(value, 2000, true)
  
  const colorClasses = {
    blue: 'text-cyan-600 dark:text-cyan-400',
    purple: 'text-purple-600 dark:text-purple-400',
    pink: 'text-pink-600 dark:text-pink-400',
    green: 'text-green-600 dark:text-green-400',
  }

  return (
    <div ref={ref} className="p-6 bg-white dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/30 dark:hover:border-zinc-700 transition-all hover:scale-105 group">
      <div className={`text-3xl md:text-4xl font-bold ${colorClasses[color]} mb-1 group-hover:scale-110 transition-transform`}>
        {count}{suffix}
      </div>
      <div className="text-sm text-zinc-500 dark:text-zinc-500">{label}</div>
    </div>
  )
}

export function Skills() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-20 md:py-32 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden transition-colors duration-300" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`mb-12 md:mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600 dark:from-cyan-400 dark:to-purple-500">Expertise</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Skill Bars */}
          <div className="space-y-10">
            {skillCategories.map((category, catIndex) => (
              <div 
                key={category.title} 
                className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${catIndex * 200}ms` }}
              >
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-zinc-800 dark:text-zinc-300 flex items-center gap-2">
                  <span className="w-8 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, index) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-700 dark:text-zinc-300 font-medium group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{skill.name}</span>
                        <span className="text-zinc-500 dark:text-zinc-500 font-mono">{skill.level}%</span>
                      </div>
                      <AnimatedProgressBar level={skill.level} delay={catIndex * 200 + index * 100} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack & Stats */}
          <div className="lg:pl-8 space-y-10">
            {/* Tech Stack with Icons */}
            <div className={`transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-zinc-800 dark:text-zinc-300 flex items-center gap-2">
                <span className="w-8 h-px bg-gradient-to-r from-purple-500 to-transparent" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <div
                    key={tech}
                    className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all cursor-default group hover:scale-105 hover:-translate-y-0.5 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                    style={{ transitionDelay: `${400 + index * 50}ms` }}
                  >
                    <span className="group-hover:scale-110 transition-transform">
                      {techIcons[tech] || <span className="w-5 h-5" />}
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid with Counting Animation */}
            <div className={`transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-zinc-800 dark:text-zinc-300 flex items-center gap-2">
                <span className="w-8 h-px bg-gradient-to-r from-pink-500 to-transparent" />
                By The Numbers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <StatCard value={3} suffix="+" label="Years Experience" color="blue" />
                <StatCard value={25} suffix="+" label="Projects Completed" color="purple" />
                <StatCard value={15} suffix="+" label="Happy Clients" color="pink" />
                <StatCard value={100} suffix="%" label="Commitment" color="green" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
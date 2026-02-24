import { Github, Linkedin, Twitter, Instagram, ArrowUp, Heart } from 'lucide-react'

const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/yourusername', label: 'Instagram' },
]

const footerLinks = [
    {
        title: 'Navigation',
        links: [
            { name: 'Home', href: '#' },
            { name: 'Projects', href: '#projects' },
            { name: 'Skills', href: '#skills' },
            { name: 'Contact', href: '#contact' },
        ],
    },
    {
        title: 'Services',
        links: [
            { name: 'Web Development', href: '#' },
            { name: 'UI/UX Design', href: '#' },
            { name: 'Consulting', href: '#' },
        ],
    },
]

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-white dark:bg-zinc-950  border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                    <div className="col-span-2">
                        <a
                            href="#"
                            className="inline-block text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4"
                        >
                            FLEXY DEV
                        </a>
                        <p className="text-zinc-900 text-sm leading-relaxed mb-6 max-w-xs  white:bg-zinc-950">
                            Building digital experiences that make a difference.
                            Let's create something amazing together.
                        </p>

                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-zinc-900 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerLinks.map((group) => (
                        <div key={group.title}>
                            <h4 className="font-semibold text-white mb-4">{group.title}</h4>
                            <ul className="space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-zinc-400 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="py-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-zinc-500 flex items-center gap-1">
                        © {new Date().getFullYear()} FlexyDev.

                    </p>

                    <div className="flex items-center gap-6">
                        <span className="text-sm text-zinc-500">
                            Available for freelance work
                        </span>

                        <button
                            onClick={scrollToTop}
                            className="p-2 bg-zinc-900 rounded-lg text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all"
                        >
                            <ArrowUp size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
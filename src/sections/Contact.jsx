import { useState } from 'react'
import { MessageCircle, Mail, MapPin, ArrowUpRight, Send } from 'lucide-react'

export function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const text = `*New Portfolio Contact*%0A%0A*Name:* ${formState.name}%0A*Email:* ${formState.email}%0A%0A*Message:*%0A${formState.message}`
        const phoneNumber = '2348012345678'

        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank')

        setIsSubmitting(false)
        setFormState({ name: '', email: '', message: '' })
    }

    return (
        <section id="contact" className="py-20 md:py-32 bg-white dark:bg-zinc-950 relative overflow-hidden transition-colors duration-300">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-400/10 dark:bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side */}
                    <div>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-500/10 border border-green-300 dark:border-green-500/20 text-green-700 dark:text-green-400 text-sm font-medium mb-6">
                            Quick Response
                        </span>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-zinc-900 dark:text-white">
                            Let's start a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-600">
                                conversation
                            </span>
                        </h2>

                        <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 max-w-md leading-relaxed">
                            Have a project in mind? Send me a message directly on WhatsApp.
                            I typically respond within minutes during business hours.
                        </p>

                        <div className="space-y-4 mb-8">
                            <a
                                href="https://wa.me/2348012345678"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300 hover:text-green-600 dark:hover:text-green-400 transition-colors group p-4 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-green-400/50 dark:hover:border-green-500/30"
                            >
                                <div className="p-3 bg-green-100 dark:bg-green-500/10 rounded-lg border border-green-300 dark:border-green-500/20 group-hover:bg-green-200 dark:group-hover:bg-green-500/20 transition-colors">
                                    <MessageCircle size={24} className="text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <div className="font-medium">WhatsApp</div>
                                    <div className="text-sm text-zinc-500 dark:text-zinc-500">+234 801 234 5678</div>
                                </div>
                                <ArrowUpRight size={20} className="ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </a>

                            <a
                                href="mailto:your.email@example.com"
                                className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors group p-4 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700"
                            >
                                <div className="p-3 bg-zinc-200 dark:bg-zinc-800 rounded-lg border border-zinc-300 dark:border-zinc-700">
                                    <Mail size={24} className="text-zinc-600 dark:text-zinc-400" />
                                </div>
                                <div>
                                    <div className="font-medium">Email</div>
                                    <div className="text-sm text-zinc-500 dark:text-zinc-500">your.email@example.com</div>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400 p-4 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <div className="p-3 bg-zinc-200 dark:bg-zinc-800 rounded-lg border border-zinc-300 dark:border-zinc-700">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <div className="font-medium">Location</div>
                                    <div className="text-sm text-zinc-500 dark:text-zinc-500">Lagos, Nigeria</div>
                                </div>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-3 px-5 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">Usually replies in 10 minutes</span>
                        </div>
                    </div>

                    {/* WhatsApp Form */}
                    <div className="bg-zinc-100 dark:bg-zinc-900/50 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                <MessageCircle size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">Send to WhatsApp</h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-500">Direct message, no backend needed</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3.5 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-600 transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-3.5 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-600 transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-400 mb-2">
                                    Project Details
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    required
                                    className="w-full px-4 py-3.5 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-600 transition-all resize-none"
                                    placeholder="Tell me about your project, timeline, and budget..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-500/25"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <MessageCircle size={20} />
                                        Open WhatsApp
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center">
                                Clicking will open WhatsApp with your pre-filled message
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default function Header() {
  return (
    <header className="text-center animate-fade-in">
      {/* Logo / Icon */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center shadow-glow-accent animate-float">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          {/* Decorative ring */}
          <div className="absolute -inset-2 rounded-2xl border border-accent/20 animate-pulse-slow" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        <span className="gradient-text">DocAI</span>
        <span className="text-dark-100"> Analyzer</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-dark-300 text-lg max-w-xl mx-auto leading-relaxed">
        Upload any <span className="text-accent-light font-medium">PDF</span>,{' '}
        <span className="text-cyan-400 font-medium">DOCX</span>, or{' '}
        <span className="text-emerald-400 font-medium">Image</span> and let AI extract insights, entities, and sentiment instantly.
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        {['Gemini 1.5 Flash', 'OCR.space', 'FastAPI', 'React'].map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full text-xs font-medium bg-dark-700/60 text-dark-200 border border-dark-500/40 backdrop-blur-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </header>
  )
}

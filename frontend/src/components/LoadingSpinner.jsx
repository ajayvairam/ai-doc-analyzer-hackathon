export default function LoadingSpinner({ fileName }) {
  return (
    <div className="glass-card p-10 text-center" id="loading-spinner">
      {/* Orbital spinner */}
      <div className="flex justify-center mb-8">
        <div className="relative w-16 h-16">
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-accent animate-pulse" />

          {/* Orbiting dots */}
          <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 -mt-1.25 -ml-1.25 rounded-full bg-cyan-400 orbit-dot" />
          <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 -mt-1.25 -ml-1.25 rounded-full bg-accent-light orbit-dot-delayed" />
          <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 -mt-1.25 -ml-1.25 rounded-full bg-emerald-400 orbit-dot-delayed-2" />

          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-dark-500/30 animate-pulse-slow" />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-xl font-semibold text-dark-100 mb-2">Processing with AI...</h3>
      <p className="text-dark-400 text-sm mb-6 max-w-sm mx-auto">
        Extracting text and analyzing <span className="text-accent-light font-medium">{fileName || 'your document'}</span> with Gemini 1.5 Flash
      </p>

      {/* Progress shimmer bar */}
      <div className="max-w-xs mx-auto h-1.5 rounded-full bg-dark-700 overflow-hidden">
        <div className="h-full w-full shimmer rounded-full" />
      </div>

      {/* Steps */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 text-sm">
        {[
          { step: '1', label: 'Reading file', icon: '📁' },
          { step: '2', label: 'Extracting text', icon: '🔍' },
          { step: '3', label: 'AI analysis', icon: '🧠' },
        ].map(({ step, label, icon }) => (
          <div key={step} className="flex items-center gap-2 text-dark-300">
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

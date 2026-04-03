const ENTITY_CONFIG = {
  names: {
    title: 'People & Names',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: 'text-violet-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/10',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]',
    chipBorder: 'border-violet-500/25',
    chipBg: 'bg-violet-500/8',
  },
  dates: {
    title: 'Dates',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/10',
    glow: 'shadow-[0_0_15px_rgba(34,211,238,0.15)]',
    chipBorder: 'border-cyan-500/25',
    chipBg: 'bg-cyan-500/8',
  },
  organizations: {
    title: 'Organizations',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/10',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    chipBorder: 'border-amber-500/25',
    chipBg: 'bg-amber-500/8',
  },
  amounts: {
    title: 'Amounts & Currency',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-emerald-400',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/10',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    chipBorder: 'border-emerald-500/25',
    chipBg: 'bg-emerald-500/8',
  },
}

function SentimentBadge({ sentiment }) {
  const val = (sentiment || 'Neutral').toLowerCase()
  let cls = 'pill-neutral'
  let icon = '⚖️'

  if (val === 'positive') {
    cls = 'pill-positive'
    icon = '😊'
  } else if (val === 'negative') {
    cls = 'pill-negative'
    icon = '😟'
  }

  return (
    <span className={cls} id="sentiment-badge">
      <span>{icon}</span>
      {sentiment || 'Neutral'}
    </span>
  )
}

function EntityCard({ entityKey, items }) {
  const config = ENTITY_CONFIG[entityKey]
  if (!config) return null

  return (
    <div className={`glass-card p-5 ${config.glow} transition-all duration-300 hover:scale-[1.02]`} id={`entity-${entityKey}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-lg ${config.bg} border ${config.border} flex items-center justify-center ${config.color}`}>
          {config.icon}
        </div>
        <div>
          <h4 className={`font-semibold text-sm ${config.color}`}>{config.title}</h4>
          <p className="text-dark-400 text-xs">{items.length} found</p>
        </div>
      </div>

      {/* Chips */}
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span
              key={i}
              className={`px-2.5 py-1 rounded-lg text-sm font-medium border ${config.chipBorder} ${config.chipBg} text-dark-100 transition-all duration-200 hover:scale-105`}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-dark-500 text-sm italic">None detected</p>
      )}
    </div>
  )
}

export default function ResultsPanel({ result, fileName, onReset }) {
  if (!result) return null

  const entities = result.entities || {}

  return (
    <div className="space-y-6" id="results-panel">
      {/* Success header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-dark-100">Analysis Complete</h2>
            <p className="text-dark-400 text-sm">{fileName}</p>
          </div>
        </div>
        <button onClick={onReset} className="btn-primary text-sm" id="analyze-new-btn">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Analysis
          </span>
        </button>
      </div>

      {/* Summary + Sentiment */}
      <div className="glass-card p-6" id="summary-card">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-dark-100 text-lg">Summary</h3>
          </div>
          <SentimentBadge sentiment={result.sentiment} />
        </div>
        <p className="text-dark-200 leading-relaxed text-[15px]">{result.summary || 'No summary available.'}</p>
      </div>

      {/* Entities Grid */}
      <div>
        <h3 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Extracted Entities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.keys(ENTITY_CONFIG).map((key) => (
            <EntityCard key={key} entityKey={key} items={entities[key] || []} />
          ))}
        </div>
      </div>
    </div>
  )
}

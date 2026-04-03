export default function FileInfo({ file }) {
  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  const getTypeIcon = (name) => {
    const ext = name.split('.').pop().toLowerCase()
    if (ext === 'pdf') return { icon: '📄', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' }
    if (ext === 'docx') return { icon: '📝', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' }
    return { icon: '🖼️', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' }
  }

  const { icon, color, bg } = getTypeIcon(file.name)

  return (
    <div className="glass-card p-4" id="file-info">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl ${bg}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-dark-100 font-medium truncate">{file.name}</p>
          <p className="text-dark-400 text-sm mt-0.5">{formatSize(file.size)}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border ${bg} ${color}`}>
          .{file.name.split('.').pop().toLowerCase()}
        </span>
      </div>
    </div>
  )
}

import { useState, useRef } from 'react'

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/bmp',
  'image/tiff',
  'image/webp',
]

const ACCEPTED_EXTENSIONS = '.pdf,.docx,.png,.jpg,.jpeg,.bmp,.tiff,.webp'

export default function DropZone({ onFileSelected }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const isValidFile = (file) => {
    if (ACCEPTED_TYPES.includes(file.type)) return true
    // Fallback: check extension
    const ext = file.name.split('.').pop().toLowerCase()
    return ['pdf', 'docx', 'png', 'jpg', 'jpeg', 'bmp', 'tiff', 'webp'].includes(ext)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile && isValidFile(droppedFile)) {
      onFileSelected(droppedFile)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onFileSelected(selectedFile)
    }
  }

  return (
    <div
      id="drop-zone"
      className={`drop-zone cursor-pointer p-12 sm:p-16 text-center transition-all duration-300 ${
        isDragOver ? 'drag-over scale-[1.02]' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        onChange={handleInputChange}
        className="hidden"
        id="file-input"
      />

      {/* Upload icon */}
      <div className="flex justify-center mb-6">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isDragOver
            ? 'bg-accent/20 border-2 border-accent/50 shadow-glow-accent scale-110'
            : 'bg-dark-700/50 border-2 border-dark-500/30'
        }`}>
          <svg
            className={`w-10 h-10 transition-colors duration-300 ${
              isDragOver ? 'text-accent-light' : 'text-dark-300'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
      </div>

      {/* Text */}
      <h3 className="text-xl font-semibold text-dark-100 mb-2">
        {isDragOver ? 'Drop your file here' : 'Drag & drop your document'}
      </h3>
      <p className="text-dark-400 text-sm mb-4">
        or <span className="text-accent-light font-medium underline underline-offset-2">browse files</span>
      </p>

      {/* Supported formats */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { label: 'PDF', color: 'text-rose-400 border-rose-500/20 bg-rose-500/10' },
          { label: 'DOCX', color: 'text-blue-400 border-blue-500/20 bg-blue-500/10' },
          { label: 'PNG', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' },
          { label: 'JPG', color: 'text-amber-400 border-amber-500/20 bg-amber-500/10' },
        ].map(({ label, color }) => (
          <span key={label} className={`px-2 py-0.5 rounded-md text-xs font-mono font-medium border ${color}`}>
            .{label.toLowerCase()}
          </span>
        ))}
      </div>
    </div>
  )
}

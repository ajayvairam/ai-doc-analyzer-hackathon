import { useState } from 'react'
import Header from './components/Header'
import DropZone from './components/DropZone'
import FileInfo from './components/FileInfo'
import LoadingSpinner from './components/LoadingSpinner'
import ResultsPanel from './components/ResultsPanel'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_KEY = import.meta.env.VITE_API_KEY || 'docai-hackathon-2026'

function App() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const getFileType = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase()
    if (ext === 'docx') return 'docx'
    if (ext === 'pdf') return 'pdf'
    if (['png', 'jpg', 'jpeg', 'bmp', 'tiff', 'webp'].includes(ext)) return 'image'
    return null
  }

  const handleFileSelected = async (selectedFile) => {
    setError(null)
    setResult(null)

    const fileType = getFileType(selectedFile.name)
    if (!fileType) {
      setError('Unsupported file type. Please upload a PDF, DOCX, or image file.')
      return
    }

    setFile(selectedFile)
    setLoading(true)

    try {
      // Convert file to Base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          // Send the FULL data URL (with prefix) so OCR.space gets the exact correct MIME type
          resolve(reader.result)
        }
        reader.onerror = reject
        reader.readAsDataURL(selectedFile)
      })

      // Send to backend
      const response = await fetch(`${API_URL}/api/document-analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileType: fileType,
          fileBase64: base64,
        }),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.detail || `Server error: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setResult(null)
    setError(null)
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen grid-pattern">
      {/* Ambient background orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />

        <main className="mt-10 space-y-8">
          {/* Upload section */}
          {!result && !loading && (
            <div className="animate-fade-in">
              <DropZone onFileSelected={handleFileSelected} />
            </div>
          )}

          {/* File info */}
          {file && !result && (
            <div className="animate-slide-up">
              <FileInfo file={file} />
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="animate-fade-in">
              <LoadingSpinner fileName={file?.name} />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="animate-scale-in glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-rose-300 font-semibold text-lg">Analysis Failed</h3>
                  <p className="text-dark-200 mt-1 text-sm">{error}</p>
                </div>
              </div>
              <button onClick={handleReset} className="mt-5 btn-primary text-sm">
                Try Again
              </button>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="animate-slide-up">
              <ResultsPanel result={result} fileName={file?.name} onReset={handleReset} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 pb-8 text-center">
          <p className="text-dark-400 text-sm">
            Built with <span className="text-accent-light">Gemini 1.5 Flash</span> · <span className="text-cyan-400">OCR.space</span> · <span className="text-emerald-400">FastAPI</span>
          </p>
          <p className="text-dark-500 text-xs mt-1">100% Free Tier — Zero Cost Stack</p>
        </footer>
      </div>
    </div>
  )
}

export default App

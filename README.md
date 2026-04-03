# 🧠 AI-Powered Document Analysis & Extraction

> **Hackathon Project** — A zero-cost, production-quality system that extracts text from documents (PDF, DOCX, Images) using a hybrid strategy and analyzes them with Google's Gemini 1.5 Flash AI to produce structured summaries, entity extraction, and sentiment analysis.

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwindcss&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_1.5_Flash-AI-4285F4?logo=google&logoColor=white)
![Cost](https://img.shields.io/badge/Cost-$0_Free_Tier-00C853)

---

## 📋 Table of Contents

- [Approach](#-approach-hybrid-extraction-strategy)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Features](#-features)
- [Setup & Installation](#-setup--installation)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Constraint Checklist](#-constraint-checklist)

---

## 🌐 Live Project Links

- **Live Hosted URL:** [https://ai-doc-analyzer-hackathon.vercel.app](https://ai-doc-analyzer-hackathon.vercel.app) *(Replace with your actual Vercel/Netlify link once deployed)*
- **API Endpoint:** [https://ai-doc-analyzer-hackathon.onrender.com/api/document-analyze](https://ai-doc-analyzer-hackathon.onrender.com/api/document-analyze)
- **GitHub Repository:** [https://github.com/ajayvairam/ai-doc-analyzer-hackathon](https://github.com/ajayvairam/ai-doc-analyzer-hackathon)

---

## 🔑 The Credentials & Testing

The backend is secured using an `x-api-key` header. 
- **API Key:** `docai-hackathon-2026`

**Test the API Instantly via cURL:**
```bash
curl -X POST "https://ai-doc-analyzer-hackathon.onrender.com/api/document-analyze" \
     -H "Content-Type: application/json" \
     -H "x-api-key: docai-hackathon-2026" \
     -d '{
       "fileName": "test.txt",
       "fileType": "docx",
       "fileBase64": "UEB... (Add your base64 string here)"
     }'
```

---

## 🤖 AI Tools Used (Disclosure)

- **Gemini 2.0 Flash (via Google AI Studio):** Powers the core intelligence, generating structured layouts, extracting entities (names, dates, amounts), and determining sentiment. Handled entirely via the `google-genai` Python SDK. Selected for its exceptionally fast response times, high context window, and generous free tier.
- **OCR.space Free API:** Used for robust server-side OCR on PDFs and Images using their advanced Engine 2/1.

---

## 🔬 Approach: PDFs vs. DOCX & Why Gemini?

We implemented a **Hybrid Extraction Strategy** to handle various document types efficiently without heavy dependencies (like Tesseract):
1. **DOCX (Word):** We use the lightweight `python-docx` library locally. It directly parses the XML structure (including tables) for immediate, 100% accurate text extraction without making any external API calls.
2. **PDF & Images:** Since PDFs can contain complex layouts or scanned elements, we offload extraction to the **OCR.space Free API**, passing the Base64 sequence directly. This guarantees clean text from complex documents without requiring users to install Poppler or Tesseract.

Once the raw text is extracted, we pass it directly to **Gemini 2.0 Flash**. We chose Gemini specifically because of its massive context window (allowing us to analyze huge documents at once) and its strict adherence to JSON system instructions. By enforcing a strict JSON output shape at the prompt level, we guarantee the React frontend always receives pristine data for the Summary, Entities grid, and Sentiment badge.

---

## 🛠️ Tech Stack

| Layer | Technology | Free Tier Limit |
|---|---|---|
| **Frontend** | React 18 + Vite + Tailwind CSS 3 | Deployed on Vercel (100GB bandwidth/mo) |
| **Backend** | FastAPI (Python 3.11+) | Deployed on Render (750 hrs/mo free) |
| **AI Brain** | Gemini 1.5 Flash (Google AI Studio) | 1,500 requests/day free |
| **OCR Engine** | OCR.space Free API | 25,000 requests/month free |
| **DOCX Parser** | python-docx | Open source — no limits |

**Total Cost: $0**

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (React)                  │
│  ┌────────────┐  ┌──────────┐  ┌────────────────┐  │
│  │  DropZone   │→│ Base64    │→│  POST /api/     │  │
│  │  Upload     │  │ Convert  │  │  document-      │  │
│  │  Component  │  │ (Browser)│  │  analyze        │  │
│  └────────────┘  └──────────┘  └───────┬────────┘  │
└────────────────────────────────────────┼────────────┘
                                         │ x-api-key
                                         ▼
┌─────────────────────────────────────────────────────┐
│                  BACKEND (FastAPI)                   │
│  ┌──────────────────────────────────────────────┐   │
│  │  main.py — Auth + Routing                     │   │
│  └──────────────────────┬───────────────────────┘   │
│                         ▼                            │
│  ┌──────────────────────────────────────────────┐   │
│  │  processor.py — Extraction + AI Logic         │   │
│  │                                               │   │
│  │  ┌─────────┐   ┌───────────┐   ┌──────────┐  │   │
│  │  │ DOCX    │   │ PDF/Image │   │ Gemini   │  │   │
│  │  │ python- │   │ OCR.space │   │ 1.5 Flash│  │   │
│  │  │ docx    │   │ API       │ → │ Analysis │  │   │
│  │  └─────────┘   └───────────┘   └──────────┘  │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## ✨ Features

- 🎯 **Drag & Drop Upload** — Intuitive file upload with visual drag-over effects
- 📄 **Multi-Format Support** — PDF, DOCX, PNG, JPG, JPEG, BMP, TIFF, WebP
- 🤖 **AI-Powered Analysis** — Gemini 1.5 Flash generates structured insights
- 🏷️ **Entity Extraction** — Names, Dates, Organizations, and **Amounts/Currency**
- 😊 **Sentiment Analysis** — Color-coded Positive/Neutral/Negative badges
- 🌙 **Dark Mode UI** — Premium glassmorphism design with ambient animations
- 🔐 **API Key Auth** — x-api-key header authentication
- ⚡ **Zero-Cost Deployment** — Runs entirely on free-tier services

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** 18+ and **npm**
- **Python** 3.11+
- Free API keys (see below)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd "AI-Powered Document Analysis & Extraction"
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
copy .env.example .env       # Windows
# cp .env.example .env       # macOS/Linux
```

Edit `backend/.env` with your API keys:

```env
API_KEY=your-custom-api-key          # Any string you choose
GEMINI_API_KEY=your-google-ai-key    # From https://aistudio.google.com
OCR_SPACE_API_KEY=your-ocr-key       # From https://ocr.space/ocrapi/freekey
```

Start the backend:

```bash
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
VITE_API_KEY=your-custom-api-key     # Must match backend API_KEY
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Get Free API Keys

| API | Link | Free Tier |
|---|---|---|
| Google AI Studio (Gemini) | [aistudio.google.com](https://aistudio.google.com) | 1,500 req/day |
| OCR.space | [ocr.space/ocrapi/freekey](https://ocr.space/ocrapi/freekey) | 25,000 req/month |

---

## 📡 API Reference

### `GET /`

Health check endpoint.

**Response:**
```json
{
  "status": "online",
  "service": "AI Document Analyzer",
  "version": "1.0.0"
}
```

### `POST /api/document-analyze`

Analyze an uploaded document.

**Headers:**
| Header | Required | Description |
|---|---|---|
| `x-api-key` | ✅ | API key for authentication |
| `Content-Type` | ✅ | `application/json` |

**Request Body:**
```json
{
  "fileName": "invoice.pdf",
  "fileType": "pdf",
  "fileBase64": "JVBERi0xLjQg..."
}
```

| Field | Type | Values |
|---|---|---|
| `fileName` | string | Original filename |
| `fileType` | string | `pdf`, `docx`, or `image` |
| `fileBase64` | string | Base64-encoded file content |

**Success Response (200):**
```json
{
  "status": "success",
  "summary": "This invoice from Acme Corp details a purchase of office supplies totaling $5,250. The document is dated March 15, 2026 and is addressed to John Smith at TechStart Inc.",
  "entities": {
    "names": ["John Smith"],
    "dates": ["March 15, 2026"],
    "organizations": ["Acme Corp", "TechStart Inc"],
    "amounts": ["$5,250"]
  },
  "sentiment": "Neutral"
}
```

**Error Responses:**
| Status | Description |
|---|---|
| `401` | Missing or invalid `x-api-key` |
| `400` | Unsupported `fileType` |
| `422` | Text extraction failed or no text found |
| `500` | AI analysis error |

---

## 📁 Project Structure

```
AI-Powered Document Analysis & Extraction/
├── backend/
│   ├── main.py              # FastAPI app — routing, auth, endpoint
│   ├── processor.py         # Text extraction + Gemini AI logic
│   ├── requirements.txt     # Python dependencies
│   ├── .env                 # Environment variables (git-ignored)
│   └── .env.example         # Template for env vars
├── frontend/
│   ├── index.html           # Entry HTML with SEO meta tags
│   ├── package.json         # Node dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── postcss.config.js    # PostCSS configuration
│   ├── .env                 # Frontend env vars (git-ignored)
│   ├── public/
│   │   └── favicon.svg      # Custom gradient favicon
│   └── src/
│       ├── main.jsx          # React entry point
│       ├── App.jsx           # Main app — state management
│       ├── index.css         # Tailwind + custom dark theme
│       └── components/
│           ├── Header.jsx        # Branded header with tech badges
│           ├── DropZone.jsx      # Drag-and-drop file upload
│           ├── FileInfo.jsx      # Uploaded file metadata display
│           ├── LoadingSpinner.jsx # Animated "Processing" state
│           └── ResultsPanel.jsx  # Summary, Entities grid, Sentiment
└── README.md                # This file
```

---

## ✅ Constraint Checklist

| # | Constraint | Status |
|---|---|---|
| 1 | No hardcoded responses — all analysis is live from Gemini AI | ✅ |
| 2 | No paid services — 100% free-tier APIs (Gemini, OCR.space) | ✅ |
| 3 | Handles monetary amounts/currency extraction specifically | ✅ |
| 4 | Modular code: `main.py` (API) + `processor.py` (AI logic) | ✅ |
| 5 | x-api-key authentication with 401 rejection | ✅ |
| 6 | Base64 file encoding in browser (no server upload) | ✅ |
| 7 | Hybrid extraction: python-docx + OCR.space | ✅ |
| 8 | Dark mode, responsive UI with loading states | ✅ |
| 9 | Entity grid: Names, Dates, Organizations, Amounts | ✅ |
| 10 | Sentiment badge: color-coded Positive/Neutral/Negative | ✅ |

---

## 📄 License

MIT License — Built for hackathon demonstration purposes.

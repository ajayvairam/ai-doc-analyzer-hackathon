"""
AI-Powered Document Analysis & Extraction — FastAPI Backend
Main application entry point with API routing and authentication.
"""

import os
from fastapi import FastAPI, HTTPException, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from processor import extract_text, analyze_with_gemini

# Load environment variables
load_dotenv()

API_KEY = os.getenv("API_KEY", "docai-hackathon-2026")

# --- FastAPI App ---
app = FastAPI(
    title="AI Document Analyzer",
    description="AI-Powered Document Analysis & Extraction API using Gemini 1.5 Flash",
    version="1.0.0",
)

# CORS — allow all origins for hackathon
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Request / Response Models ---
class DocumentRequest(BaseModel):
    fileName: str = Field(..., description="Name of the uploaded file")
    fileType: str = Field(..., description="Type: pdf, docx, or image")
    fileBase64: str = Field(..., description="Base64-encoded file content")


class AnalysisResponse(BaseModel):
    status: str
    summary: str
    entities: dict
    sentiment: str


# --- Routes ---
@app.get("/", tags=["Health"])
async def health_check():
    """Health check endpoint."""
    return {
        "status": "online",
        "service": "AI Document Analyzer",
        "version": "1.0.0",
    }


@app.post("/api/document-analyze", tags=["Analysis"])
async def analyze_document(
    payload: DocumentRequest,
    x_api_key: str = Header(None, alias="x-api-key"),
):
    """
    Analyze an uploaded document using hybrid extraction + Gemini AI.

    Requires `x-api-key` header for authentication.
    Accepts PDF, DOCX, or image files as Base64.
    """

    # --- Authentication ---
    if not x_api_key or x_api_key != API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized — valid x-api-key header is required.",
        )

    # --- Validate file type ---
    allowed_types = ["pdf", "docx", "image"]
    if payload.fileType not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported fileType '{payload.fileType}'. Must be one of: {allowed_types}",
        )

    # --- Extract text ---
    try:
        extracted_text = extract_text(payload.fileBase64, payload.fileType)
    except Exception as e:
        raise HTTPException(
            status_code=422,
            detail=f"Text extraction failed: {str(e)}",
        )

    if not extracted_text or extracted_text.strip() == "":
        raise HTTPException(
            status_code=422,
            detail="No text could be extracted from the document.",
        )

    # --- AI Analysis ---
    try:
        result = analyze_with_gemini(extracted_text, payload.fileName)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI analysis failed: {str(e)}",
        )

    return result


# --- Entry point ---
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

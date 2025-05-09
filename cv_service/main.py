import logging
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import embed, match, emotion

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("cv_service.log")
    ]
)
logger = logging.getLogger("cv_service")

# Create FastAPI app
app = FastAPI(
    title="Facial Recognition and Emotion Detection API",
    description="API for facial embedding, matching, and emotion detection",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Modify in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(embed.router)
app.include_router(match.router)
app.include_router(emotion.router)

@app.get("/")
async def root():
    return {"message": "Facial Recognition and Emotion Detection API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
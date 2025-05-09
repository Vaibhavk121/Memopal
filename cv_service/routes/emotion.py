from fastapi import APIRouter, UploadFile, File, HTTPException
import logging
from utils.emotion_utils import detect_emotion

router = APIRouter(prefix="/emotion", tags=["Emotion"])
logger = logging.getLogger("cv_service.routes.emotion")

@router.post("/")
async def detect_face_emotion(
    image: UploadFile = File(...)
):
    """
    Detect emotion in a face from an image.
    
    Args:
        image: Uploaded image file
        
    Returns:
        JSON response with detected emotion and confidence
    """
    try:
        # Read image data
        image_data = await image.read()
        
        # Detect emotion
        emotion, confidence = detect_emotion(image_data)
        
        if emotion is None:
            raise HTTPException(status_code=400, detail="No face detected in the image")
        
        logger.info(f"Detected emotion: {emotion}, confidence: {confidence:.4f}")
        return {
            "status": "success",
            "emotion": emotion,
            "confidence": float(confidence)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing emotion detection request: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
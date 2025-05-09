from fastapi import APIRouter, UploadFile, File, HTTPException, Form
import logging
from utils.face_utils import extract_face_embedding
from models.storage import EmbeddingStorage

router = APIRouter(prefix="/embed", tags=["Embedding"])
logger = logging.getLogger("cv_service.routes.embed")
storage = EmbeddingStorage()

@router.post("/")
async def create_embedding(
    image: UploadFile = File(...),
    user_id: str = Form(...)
):
    """
    Extract facial embedding from an image and store it with the user_id.
    
    Args:
        image: Uploaded image file
        user_id: Unique identifier for the user
        
    Returns:
        JSON response with status and user_id
    """
    try:
        # Read image data
        image_data = await image.read()
        
        # Extract facial embedding
        embedding = extract_face_embedding(image_data)
        
        if embedding is None:
            raise HTTPException(status_code=400, detail="No face detected in the image")
        
        # Store embedding
        storage.store_embedding(user_id, embedding)
        
        logger.info(f"Stored embedding for user_id: {user_id}")
        return {
            "status": "success",
            "user_id": user_id,
            "message": "Facial embedding stored successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing embedding request: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
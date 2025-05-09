from fastapi import APIRouter, UploadFile, File, HTTPException
import logging
import numpy as np
from utils.face_utils import extract_face_embedding, find_best_match
from models.storage import EmbeddingStorage

router = APIRouter(prefix="/match", tags=["Matching"])
logger = logging.getLogger("cv_service.routes.match")
storage = EmbeddingStorage()

@router.post("/")
async def match_face(
    image: UploadFile = File(...)
):
    """
    Match a face in an image against stored embeddings.
    
    Args:
        image: Uploaded image file
        
    Returns:
        JSON response with matched user_id and similarity score
    """
    try:
        # Read image data
        image_data = await image.read()
        
        # Extract facial embedding
        query_embedding = extract_face_embedding(image_data)
        
        if query_embedding is None:
            raise HTTPException(status_code=400, detail="No face detected in the image")
        
        # Get all stored embeddings
        stored_embeddings = storage.get_all_embeddings()
        
        if not stored_embeddings:
            return {
                "status": "no_matches",
                "message": "No embeddings stored for matching",
                "user_id": None,
                "similarity": 0.0
            }
        
        # Find best match
        best_match_id, similarity = find_best_match(query_embedding, stored_embeddings)
        
        # Threshold for considering a match (adjust as needed)
        threshold = 0.6
        
        if similarity >= threshold:
            logger.info(f"Face matched with user_id: {best_match_id}, similarity: {similarity:.4f}")
            return {
                "status": "match_found",
                "user_id": best_match_id,
                "similarity": float(similarity)
            }
        else:
            logger.info(f"No match found. Best similarity: {similarity:.4f}")
            return {
                "status": "no_match",
                "user_id": None,
                "similarity": float(similarity)
            }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing match request: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
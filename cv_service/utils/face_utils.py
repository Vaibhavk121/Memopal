import face_recognition
import numpy as np
import logging
from typing import Optional, List, Tuple
import cv2

logger = logging.getLogger("cv_service.face_utils")

def extract_face_embedding(image_data: bytes) -> Optional[np.ndarray]:
    """
    Extract facial embedding from image data.
    
    Args:
        image_data: Raw image bytes
        
    Returns:
        Facial embedding as numpy array or None if no face detected
    """
    try:
        # Convert bytes to numpy array
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Convert BGR to RGB (face_recognition uses RGB)
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Find face locations
        face_locations = face_recognition.face_locations(rgb_img)
        
        if not face_locations:
            logger.warning("No face detected in the image")
            return None
        
        # Get face encodings
        face_encodings = face_recognition.face_encodings(rgb_img, face_locations)
        
        if not face_encodings:
            logger.warning("Could not encode face")
            return None
            
        # Return the first face encoding
        return face_encodings[0]
        
    except Exception as e:
        logger.error(f"Error extracting face embedding: {str(e)}")
        return None

def calculate_similarity(embedding1: np.ndarray, embedding2: np.ndarray) -> float:
    """
    Calculate cosine similarity between two facial embeddings.
    
    Args:
        embedding1: First facial embedding
        embedding2: Second facial embedding
        
    Returns:
        Similarity score between 0 and 1
    """
    if embedding1 is None or embedding2 is None:
        return 0.0
        
    # Calculate cosine similarity
    similarity = np.dot(embedding1, embedding2) / (np.linalg.norm(embedding1) * np.linalg.norm(embedding2))
    return float(similarity)

def find_best_match(query_embedding: np.ndarray, stored_embeddings: dict) -> Tuple[Optional[str], float]:
    """
    Find the best matching user_id for a query embedding.
    
    Args:
        query_embedding: Query facial embedding
        stored_embeddings: Dictionary of user_id -> embedding
        
    Returns:
        Tuple of (best_matching_user_id, similarity_score)
    """
    if not stored_embeddings:
        return None, 0.0
        
    best_match = None
    best_score = -1.0
    
    for user_id, embedding in stored_embeddings.items():
        similarity = calculate_similarity(query_embedding, embedding)
        if similarity > best_score:
            best_score = similarity
            best_match = user_id
    
    return best_match, best_score
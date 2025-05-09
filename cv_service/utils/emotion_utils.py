import cv2
import numpy as np
import logging
from typing import Optional, Tuple

logger = logging.getLogger("cv_service.emotion_utils")

# Define emotion labels
EMOTIONS = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"]

# Haar cascade for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def detect_emotion(image_data: bytes) -> Tuple[Optional[str], float]:
    """
    Detect emotion in an image using a simple approach.
    
    In a production environment, you would use a pre-trained CNN model.
    This is a simplified version using facial landmarks and basic heuristics.
    
    Args:
        image_data: Raw image bytes
        
    Returns:
        Tuple of (emotion_label, confidence_score) or (None, 0.0) if no face detected
    """
    try:
        # Convert bytes to numpy array
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        
        if len(faces) == 0:
            logger.warning("No face detected for emotion analysis")
            return None, 0.0
        
        # Get the largest face
        largest_face = max(faces, key=lambda rect: rect[2] * rect[3])
        x, y, w, h = largest_face
        
        # Extract face ROI
        face_roi = gray[y:y+h, x:x+w]
        
        # In a real implementation, you would feed this ROI to a pre-trained emotion CNN
        # For this example, we'll use a simplified approach
        
        # Simulate emotion detection with a random choice (replace with actual model)
        # In production, use a proper pre-trained model
        
        # For demonstration, we'll use a simple brightness-based heuristic
        brightness = np.mean(face_roi)
        
        # Simple heuristic (not accurate, just for demonstration)
        if brightness > 120:
            emotion = "happy"
            confidence = 0.7
        elif brightness < 80:
            emotion = "sad"
            confidence = 0.6
        else:
            emotion = "neutral"
            confidence = 0.8
            
        logger.info(f"Detected emotion: {emotion} with confidence: {confidence}")
        return emotion, confidence
        
    except Exception as e:
        logger.error(f"Error detecting emotion: {str(e)}")
        return None, 0.0
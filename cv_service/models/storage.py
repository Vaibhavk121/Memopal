import numpy as np
from typing import Dict, List, Tuple

class EmbeddingStorage:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(EmbeddingStorage, cls).__new__(cls)
            cls._instance.embeddings = {}  # user_id -> embedding
        return cls._instance
    
    def store_embedding(self, user_id: str, embedding: np.ndarray) -> None:
        """Store a facial embedding for a user."""
        self.embeddings[user_id] = embedding
    
    def get_embedding(self, user_id: str) -> np.ndarray:
        """Get a stored embedding by user_id."""
        return self.embeddings.get(user_id)
    
    def get_all_embeddings(self) -> Dict[str, np.ndarray]:
        """Get all stored embeddings."""
        return self.embeddings
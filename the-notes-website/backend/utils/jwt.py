import jwt
import time
from fastapi import Request,HTTPException

JWT_SECRET = "f41c5013c3f1d5afe3ad89b75b5e48a7cdebb5e76f8e1cf95ff7cd44660dc8c4"
JWT_ALGORITHM = 'HS256'

def sign_jwt(user_data):
    data= {
        "id": str(user_data["id"]),
        "email": str(user_data["email"]),
        "username": str(user_data["username"]),
        "exp": time.time() + 60 * 60 * 24 * 30
    }
    return jwt.encode(data, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_jwt(data):
    try:
        return jwt.decode(data,JWT_SECRET,algorithms=JWT_ALGORITHM)
    except:
        return {}

# Function to authenticate user based on the auth token.
def authenticate_user(req:Request):
    if "Authorization" not in req.headers:
        raise HTTPException(status_code=401, detail="unauthorized")

    token = req.headers["authorization"].split(" ")[1]

    payload = decode_jwt(token)
    if payload == {}:  
        raise HTTPException(status_code=401, detail="unauthorized")
    else:
        return True


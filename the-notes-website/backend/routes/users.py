import uuid

from fastapi import APIRouter, Depends, HTTPException

from controllers.users import *
from models.user_model import *
from utils.hash import Bcrypt
from utils.jwt import authenticate_user, sign_jwt



router = APIRouter()

users_db = connect("users")


@router.post("/login")
async def user_login(user_details: UserLogin):
    user = find_user_by_email(user_details.email)

    if user is None:
        raise HTTPException(status_code=404, detail="Email is not registered")
    else:
        if not Bcrypt.verify(user_details.password,user["password"]):
            raise HTTPException(status_code=403, detail="Wrong password")
        else:
            jwt = sign_jwt(user)
            return {"token": jwt,
                    "id": user["id"]}


@router.post("/signup",response_model=str)
async def user_signup(user_details: UserSignUp):

    user = find_user_by_email(user_details.email)

    if user:
        raise HTTPException(status_code=400, detail="email already exists")
    else:
        user_created = User(
            id= uuid.uuid4().hex,
            email= user_details.email,
            username= user_details.username,
            password= Bcrypt.hash(user_details.password)
        )
        
        user_created = users_db.insert_one(user_created.model_dump())
        return "User is sucessfully created"


@router.get("/user/{user_id}")
async def find_user(user_id: str, auth: bool= Depends(authenticate_user)):
    if auth:
        user = find_user_by_id(user_id)
        return {"username": user["username"]}
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")



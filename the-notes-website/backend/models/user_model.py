from pydantic import BaseModel

class UserLogin(BaseModel):
    email: str
    password: str

class UserSignUp(UserLogin):
    username: str    

class User(UserSignUp):
    id: str
  

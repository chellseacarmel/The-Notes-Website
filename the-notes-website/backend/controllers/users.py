from database import *


users_db = connect("users")

def find_user_by_email(email: str):
    return users_db.find_one({"email": email})

def find_user_by_id(id: str):
    return users_db.find_one({"id": id})

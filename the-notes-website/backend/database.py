from pymongo import MongoClient


MONGODB_URI = "mongodb://localhost:27017/"

def connect(collection_name):
    try:
        client = MongoClient(MONGODB_URI,uuidRepresentation='standard')
        db = client['notes-website']
        collection = db[collection_name]
        return collection
    except Exception as ex:
        return ex,500

def create_index():
    notes_db = connect("notes")
    notes_db.create_index([("title", "text")])
    
create_index()

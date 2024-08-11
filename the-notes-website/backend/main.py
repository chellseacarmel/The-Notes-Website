from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.users import router as Auth
from routes.notes import router as Notes

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"detail": "Hello World"}


app.include_router(Auth,tags=["authentication"])
app.include_router(Notes,tags=["notes_crud"])

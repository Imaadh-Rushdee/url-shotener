from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controller import url_controller

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

app.include_router(url_controller.router, prefix="/url", tags=["URL Operations"])


@app.get("/")
def root():
    return {"message": "Welcome to the URL Shortener API"}
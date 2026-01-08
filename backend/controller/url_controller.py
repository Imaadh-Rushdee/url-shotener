from service.url_service import get_all_urls, url_shotener, delete_url, open_url
from fastapi import APIRouter, Body, Query
from pydantic import BaseModel

class URLRequest(BaseModel):
    url: str = None
    name: str = None
    short_url: str = None

router = APIRouter()

@router.get('/')
def get_all_url_controller():
    return get_all_urls()

@router.post('/shorten')
def shorten_url(data: URLRequest):
    print(data.url)
    return url_shotener(data.url, data.name)

@router.delete('/delete/{id}')
def delete_url_controller(id):
    return delete_url(id)

@router.get('/open')
def open_url_controller(short_url: str = Query(...)):
    print(short_url)
    return open_url(short_url)
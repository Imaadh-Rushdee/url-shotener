from modal.url_modal import get_all_modal, shorten_url_modal, delete_url_modal, open_url_modal
from nanoid import generate

#get all URL
def get_all_urls():
    return get_all_modal()  
#Shorten URL
def url_shotener(url):
    nanoid = generate(size=5)
    short_url = "http://shorturl/" + nanoid
    print(short_url)
    return shorten_url_modal(url, short_url)

#Delete URL
def delete_url(id):
    return delete_url_modal(id)

def open_url(short_url):
    print(short_url)
    return open_url_modal(short_url)
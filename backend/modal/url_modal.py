import sqlite3
import json
import uuid

keys = ['id', 'url_id', 'original_url', 'shorten_url']

def get_all_modal():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM urls")
    rows = cursor.fetchall()
    result_data = dict(zip(keys, rows))
    json_data = json.dumps(result_data)
    return json_data

#Shorten URL
def shorten_url_modal(url, short_url):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    unqiue_id = str(uuid.uuid4())[:8]
    print(url)
    print(short_url)
    print(unqiue_id)
    cursor.execute("INSERT INTO urls (url_id, original_url, shorten_url) VALUES (?, ?, ?)", (unqiue_id, url, short_url))
    conn.commit()
    cursor.execute("SELECT * FROM urls WHERE url_id = ?", (unqiue_id,))
    row = cursor.fetchone()
    result_data = dict(zip(keys, row))
    json_data = json.dumps(result_data)
    return json_data

#Delete URL
def delete_url_modal(id):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM urls WHERE url_id = ?", (id,))
    conn.commit()
    return "Deleted URL with Id : " + id

def open_url_modal(short_url):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    print(short_url)
    cursor.execute("SELECT original_url FROM urls WHERE shorten_url = ?", (short_url,))
    row = cursor.fetchone()
    if row:
        result = {"original_url": row[0]}  # row[0] is the original_url string
        return json.dumps(result)
    else:
        return None


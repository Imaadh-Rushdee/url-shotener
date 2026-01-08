import sqlite3

# Connect to a database file (it will create the file if it doesn't exist)
conn = sqlite3.connect("database.db")

# Create a cursor to execute SQL commands
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url_id TEXT NOT NULL UNIQUE,
    original_url TEXT NOT NULL,
    shorten_url TEXT NOT NULL UNIQUE
)
""")

# Commit changes to save them
conn.commit()

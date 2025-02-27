from flask import Flask
import psycopg2
import os

app = Flask(__name__)

DATABASE_URL = os.getenv("DATABASE_URL")

try:
    conn = psycopg2.connect(DATABASE_URL)
    print("Connected to PostgreSQL ✅")
except Exception as e:
    print("PostgreSQL Connection Error ❌", e)

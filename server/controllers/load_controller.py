from flask import jsonify
from app import mysql


def get_all_zones():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM Zone')
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

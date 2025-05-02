from app import mysql

def BASEQUERY(query: str):
    cur = mysql.connection.cursor()
    cur.execute(query)
    data = cur.fetchall()
    cur.close()
    
    return data
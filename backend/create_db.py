import pymysql

try:
    connection = pymysql.connect(host='localhost', user='root', password='Alex3112')
    cursor = connection.cursor()
    cursor.execute("DROP DATABASE IF EXISTS clinica_vida_db;")
    cursor.execute("CREATE DATABASE clinica_vida_db;")
    connection.commit()
    print("Base de datos recreada limpia.")
except Exception as e:
    print(f"Error: {e}")
finally:
    if 'connection' in locals() and connection.open:
        connection.close()

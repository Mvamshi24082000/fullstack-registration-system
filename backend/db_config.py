
import mysql.connector

# This function creates and returns a connection to the MySQL database
def get_connection():
    connection = mysql.connector.connect(
        host="localhost",        
        user="root",            
        password="Mvamshi$24",  
        database="registration_db"  
    )
    return connection

import mysql.connector

# Obtaining connection to database
dbconnect = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="password")

# Test whether connection is successful
if (dbconnect):
    print("MySQL database connection successful")
else:
    print("MySQL database connection failed")

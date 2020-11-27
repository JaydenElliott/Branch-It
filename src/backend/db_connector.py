import mysql.connector

# Obtaining connection to database
dbconnect = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="password")

# Test whether connection is successful
if (dbconnect):
    print("Backend connection successful")
else:
    print("Backend connection failed")

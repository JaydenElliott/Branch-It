import mysql.connector

# Defines connection details
connection_details = {
    # Database connection (FIX: currently local)
    "host": "localhost",    # 18.221.221.228
    "user": "root",         # far
    "passwd": "password",   # Mysql_password2020

    # Databases
    "user_database":"users",
    "to_do_database":"treevy"
}

# Obtaining connection to database
dbconnect = mysql.connector.connect(
    host = connection_details["host"],
    user = connection_details["user"],
    passwd = connection_details["passwd"]
)

# Test whether connection is successful
if (dbconnect):
    print("MySQL database connection successful")
else:
    print("MySQL database connection failed")


# Get cursor to interact with database
dbcurser = dbconnect.cursor()
dbcurser.execute("SHOW DATABASES")

for db in dbcurser:
    print(db)
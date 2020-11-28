from logging import exception
import mysql.connector
import util

# Defines connection details


# Class sets up MySQL database connection and allows for MySQL interaction
class MySQLHandler:
    def __init__(self):
        # Obtaining connection to MySQL
        self.dbconnect = mysql.connector.connect(
            host = util.mysql_details["host"],
            user = util.mysql_details["user"],
            passwd = util.mysql_details["passwd"]
        )

        # Test whether connection is successful
        if (self.dbconnect):
            print("MySQL connection successful")
            self.dbcursor = self.dbconnect.cursor()
        else:
            print("MySQL connection failed")

    # Conducts necessary database setup
    def setup(self):
        self.do(util.setup_databases)   # Creates the relevant databases if they do not already exist
        self.do(util.select_database.format(db=util.mysql_details["users_database"]))
        self.do(util.setup_users_table) # Creates the relevant table if it does not already exist

    # Sets the database in use
    def setDatabase(self, db):
        self.do(util.select_database.format(db=db))

    # Attempts to conduct query, informs if failed.
    def do(self, query):
        # FIX: "Commands out of sync; you can't run this command now"
        try:
            self.dbcursor.execute(query)
            self.dbconnect.commit()
            # result = self.dbcursor.fetchall()
        except Exception as e:
            print("Method 'do' failed with query: " + query)
            print(e)
    
    # Closes database connection
    def close(self):
        self.dbcursor.close()
        self.dbconnect.close()
        print("MySQL database connection closed")


# TESTING: Trying to fix error "Commands out of sync; you can't run this command now"
sql = MySQLHandler()
sql.do("SHOW DATABASES")
# sql.setup()
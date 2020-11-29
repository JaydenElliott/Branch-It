from logging import exception
import mysql.connector
import util

class MySQLHandler:
    """
        Class sets up MySQL database connection and allows for MySQL interaction
    """
    def __init__(self, db: str = None):
        """
            Establishes MySQL connection and sets up database.
        """
        # Obtaining connection to MySQL
        self.open(
            host = util.mysql_details["host"],
            user = util.mysql_details["user"],
            passwd = util.mysql_details["passwd"],
            db=db
        )

        # Setup databases and tables
        self.setup()
    
    def open(self, host: str, user: str, passwd: str, db: str = None):
        """
            Opens a connection to a MySQL server with the given parameters.
        """
        # Establishing connection. If database is not provided, will establish connection directly to the server without a database in mind
        self.dbconnect = mysql.connector.connect(
            host=host,
            user=user,
            passwd=passwd,
            db=db
        )
        
        # Test whether connection is successful
        if (self.dbconnect.is_connected):
            print("MySQL connection successful")
            self.dbcursor = self.dbconnect.cursor(buffered=True)
        else:
            print("MySQL connection failed")
        
    def close(self):
        """
            Closes MySQL connection
        """
        self.dbcursor.close()
        self.dbconnect.close()
        print("MySQL database connection closed")

    def setup(self):
        """
            Conducts necessary database setup.
        """
        self.do(util.setup_databases)   # Creates the relevant databases if they do not already exist
        # Creates the relevant tables if they does not already exist
        self.do(util.select_database.format(db=util.mysql_details["treevy_database"]))   # Selects the users database
        self.do(util.setup_users_table)
        self.do(util.setup_treevys_table)

    def setDatabase(self, db: str):
        """
            Sets the database in use
        """
        self.do(util.select_database.format(db=db))

    def do(self, query: str):
        """
            Attempts to conduct a 'do' query.
        """
        #Determine if query is is a multi query.
        multiline : bool = len(query.split(";")) > 2
        try:
            if multiline:
                # If a query is multiple lines long, it must be delt with in this fashion to execute all queries.
                for result in self.dbcursor.execute(query, multi=True):
                    result.fetchone() # Fetching results to free buffer
                self.dbconnect.commit()
            else:
                self.dbcursor.execute(query)
                self.dbconnect.commit()
        except Exception as e:
            print("Method 'do' failed with query: " + query)
            print("Error: {}".format(e))

    def fetch(self, query: str) -> list:
        """
            Attempts to conduct a 'fetch' query.
            Fetch queries have an expected return from MySQL.
        """
        #Determine if query is is a multi query.
        multiline : bool = len(query.split(";")) > 2
        try:
            # If a query has multiple lines, the fetches from each line are returned in a list
            if multiline:
                return [result.fetchall() for result in self.dbcursor.execute(query, multi=multiline)]
            else:
                self.dbcursor.execute(query)
                return self.dbcursor.fetchall()
        except Exception as e:
            print("Method 'fetch' failed with error: {}".format(e))

# TESTING: Trying to fix error "Commands out of sync; you can't run this command now"
sql = MySQLHandler()
# sql.do(util.drop_database)
# print(sql.fetch("SHOW DATABASES;"))
# Contains utilities used by the python backend

# Database details
mysql_details = {
    # Database connection (FIX: currently local)
    "host": "localhost",    # 18.221.221.228
    "user": "root",         # far
    "passwd": "password",   # Mysql_password2020

    # Databases
    "users_database":"Users",
    "treevys_database":"Treevys"
}

# Setup commands
# Creates a database for users and treevys if they do not already exist
setup_databases = '''
    CREATE DATABASE IF NOT EXISTS {users};
    CREATE DATABASE IF NOT EXISTS {treevys}
    '''.format(users=mysql_details["users_database"], treevys=mysql_details["treevys_database"])

# Creates a users table to hold user information if the table does not already exist
setup_users_table = '''CREATE TABLE IF NOT EXISTS `{}` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` string,
  `password_hash` string,
  `created_at` timestamp
);'''.format(mysql_details["users_database"])

# General commands
delete_database = "DROP DATABASE {db}"                          # Delete database
select_database = "USE {db}"                                    # Selects a database
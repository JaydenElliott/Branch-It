# Contains utilities used by the python backend

# Database details
mysql_details = {
    # Database connection (FIX: currently local)
    "host": "localhost",    # 18.221.221.228
    "user": "root",         # far
    "passwd": "password",   # Mysql_password2020

    # Databases
    "users_database":"Users",
    "treevys_database":"Treevys",

    # Tables
    "users_table":"users"
}

# Setup commands
# Creates a database for users and treevys if they do not already exist
setup_databases = '''
    CREATE DATABASE IF NOT EXISTS {users};
    CREATE DATABASE IF NOT EXISTS {treevys};
'''.format(users=mysql_details["users_database"], treevys=mysql_details["treevys_database"])

# Creates a users table to hold user information if the table does not already exist
setup_users_table = '''CREATE TABLE IF NOT EXISTS {} (
  primary key (id),
  id INT unsigned AUTO_INCREMENT NOT NULL,
  name VARCHAR(16),
  email VARCHAR(50),
  access VARCHAR(16),
  use_case VARCHAR(16),
  phone VARCHAR(12),
  password VARCHAR(64)
);'''.format(mysql_details["users_table"])

# Insert user command
insert_user = '''INSERT INTO ''' + mysql_details["users_table"] + '''
  (name, email, access, use_case, phone, password)
  VALUES
  ({name}, {email}, {access}, {use_case}, {phone}, {password});
'''

# General commands
delete_database = "DROP DATABASE {db}"                          # Delete database
select_database = "USE {db}"                                    # Selects a database
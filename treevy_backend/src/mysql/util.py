# Contains utilities used by the python backend

# Database details
mysql_details = {
    # Database connection (FIX: currently local)
    "host": "localhost",    # 18.221.221.228
    "user": "root",         # far
    "passwd": "password",   # Mysql_password2020

    # Databases
    "treevy_database":"Treevy",

    # Tables
    "users_table":"users",
    "treevys_table":"treevys"
}

### Database configuration
# Setup commands
# Creates a database for users and treevys if they do not already exist
setup_databases = '''
    CREATE DATABASE IF NOT EXISTS {};
'''.format(mysql_details["treevy_database"])

# Creates a users table to hold user information if the table does not already exist
setup_users_table = '''CREATE TABLE IF NOT EXISTS {} (
  user_id INT unsigned AUTO_INCREMENT NOT NULL,
  username VARCHAR(16),
  email VARCHAR(50) UNIQUE,
  access VARCHAR(16),
  use_case VARCHAR(16),
  phone VARCHAR(12),
  password VARCHAR(64),

  PRIMARY KEY (user_id)
);'''.format(mysql_details["users_table"])

setup_treevys_table = '''CREATE TABLE IF NOT EXISTS {} (
  treevy_id INT unsigned AUTO_INCREMENT NOT NULL,
  user_id INT unsigned NOT NULL,
  treevy JSON,

  PRIMARY KEY (treevy_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
)'''.format(mysql_details["treevys_table"])

# Drop commands
drop_database = '''
  DROP DATABASE {}
'''.format(mysql_details["treevy_database"])

drop_users_table = '''
  DROP TABLE {};
'''.format(mysql_details["users_table"])

drop_treevys_table = '''
  DROP TABLE {};
'''.format(mysql_details["treevys_table"])

### Database item configuration
# Insert user command
insert_user = 'INSERT INTO ' + mysql_details["users_table"] + '''
  (username, email, access, use_case, phone, password)
  VALUES
  ('{username}', '{email}', '{access}', '{use_case}', '{phone}', '{password}');
'''

# Insert treevy command
# Note that the JSON object treevy is passed as a string. This is how JSONs are inserted into MySQL.
insert_treevy = 'INSERT INTO ' + mysql_details["treevys_table"] + '''
  (treevy_id, users_id, treevy)
  VALUES
  ({treevy_id}, {users_id}, '{treevy}');
'''

# Delete user command
delete_user = 'DELETE FROM ' + mysql_details["users_table"] + '''
  WHERE user_id = {user_id};
'''

# Delete treevy command
delete_treevy = 'Delete FROM ' + mysql_details["treevys_table"] + '''
  WHERE treevy_id = {treevy_id};
'''

# Replace user command
update_user = 'UPDATE ' + mysql_details["users_table"] + '''
  SET
    username = REPLACE(username, username, '{username}'),
    email = REPLACE(email, email, '{email}'),
    access = REPLACE(access, access, '{access}'),
    use_case = REPLACE(use_case, use_case, '{use_case}'),
    phone = REPLACE(phone, phone, '{phone}'),
    password = REPLACE(password, password, '{password}')
  WHERE user_id = {user_id};
'''

# General commands
delete_database = 'DROP DATABASE {db}'                          # Delete database
select_database = 'USE {db}'                                    # Selects a database
get_user_id = "SELECT user_id FROM " + mysql_details["users_table"] + " WHERE email = '{email}';"  # Gets user_id from a email
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
  time_of_deletion TIMESTAMP DEFAULT NULL,

  PRIMARY KEY (user_id)
);'''.format(mysql_details["users_table"])

setup_treevys_table = '''CREATE TABLE IF NOT EXISTS {} (
  treevy_id INT unsigned AUTO_INCREMENT NOT NULL,
  user_id INT unsigned NOT NULL,
  treevy JSON,
  time_of_deletion TIMESTAMP DEFAULT NULL,

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
  (user_id, treevy)
  VALUES
  ({user_id}, '{treevy}');
'''

# Set user delete timestamp command
set_user_delete_timestamp = 'UPDATE ' + mysql_details["users_table"] + '''
  SET time_of_deletion = CURRENT_TIMESTAMP WHERE user_id = '{user_id}';
'''

set_treevy_delete_timestamp = 'UPDATE ' + mysql_details["treevys_table"] + '''
  SET time_of_deletion = CURRENT_TIMESTAMP WHERE treevy_id = '{treevy_id}';
'''

# Set treevy delete timestamp command

# Delete user command
delete_user = 'DELETE FROM ' + mysql_details["users_table"] + '''
  WHERE user_id = {user_id};
'''

# Delete treevy command
delete_treevy = 'Delete FROM ' + mysql_details["treevys_table"] + '''
  WHERE treevy_id = {treevy_id};
'''

# Replace user command, note that if the user is updated, they are no longer deleted.
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

update_treevy = 'UPDATE ' + mysql_details["treevys_table"] + '''
  SET 
    treevy = REPLACE(treevy, treevy, '{treevy}')
  WHERE treevy_id = '{treevy_id}';
'''

# General commands
select_database = 'USE {db}'  # Selects a database
get_user_id = "SELECT user_id FROM " + mysql_details["users_table"] + " WHERE email = '{email}';" # Gets user_id from a email. Note it might have the timeset set to deleted.
get_user_details_from_id = "SELECT * FROM " + mysql_details["users_table"] + " WHERE user_id = '{user_id}'" # Gets the user details of the provided user_id. Note that it might have the timestamp set to deleted.
get_user_details_from_email = "SELECT * FROM " + mysql_details["users_table"] + " WHERE email = '{email}'" # Gets the user details of the provided email. Note that it might have the timestamp set to deleted.
get_treevy_ids = "SELECT treevy_id FROM " + mysql_details["treevys_table"] + " WHERE user_id = '{user_id}' AND time_of_deletion IS NULL;"  # Gets treevy_ids from a user_id which are not deleted.
get_treevy_details = "SELECT * FROM " + mysql_details["treevys_table"] + " WHERE treevy_id = '{treevy_id}'" # Gets the treevy details from a treevy_id. Note that it might have the timestamp set to deleted.
get_treevy = "SELECT treevy FROM " + mysql_details["treevys_table"] + " WHERE treevy_id = '{treevy_id}'"  # Gets treevy JSON from treevy_id. Note that it might have the timestamp set to deleted.
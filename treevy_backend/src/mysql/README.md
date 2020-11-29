# Python MySQL Backend
This backend written in python for treevy is designed to communicate with a MySQL database. It is self contained and aims to allow the API to easily conduct MySQL commands necessary for the treevy web application.

The current layer structure is as follows:

<strong>Frontend <--> API <--> <u>Backend</u> <--> MySQL</strong>

<br />

# Treevy Database Design
## users table
| Field            | Type         | Null | Key | Default | Extra          |
|------------------|--------------|------|-----|---------|----------------|
| user_id          | int unsigned | NO   | PRI | NULL    | auto_increment |
| username         | varchar(16)  | YES  |     | NULL    |                |
| email            | varchar(50)  | YES  | UNI | NULL    |                |
| access           | varchar(16)  | YES  |     | NULL    |                |
| use_case         | varchar(16)  | YES  |     | NULL    |                |
| phone            | varchar(12)  | YES  |     | NULL    |                |
| password         | varchar(64)  | YES  |     | NULL    |                |
| time_of_deletion | timestamp    | YES  |     | NULL    |                |

<br />

## treevys table
| Field            | Type         | Null | Key | Default | Extra          |
|------------------|--------------|------|-----|---------|----------------|
| treevy_id        | int unsigned | NO   | PRI | NULL    | auto_increment |
| user_id          | int unsigned | NO   | MUL | NULL    |                |
| treevy           | json         | YES  |     | NULL    |                |
| time_of_deletion | timestamp    | YES  |     | NULL    |                |

<br />

# Files and Directories

## mysql_handler
- Contains MySQLHandler class which:
    - Establishes connection to mysql using the utilities provided in util.
    - Sets up the mysql relevant databases and tables.
    - Contains methods to execute mysql commands.

## mysql_communcator
- Used by API to conduct MySQL operations relevant to the backend such as:
    - Inserting, deleting and updating user details
    - Inserting, deleting and updating treevys
- Using this, the program should not crash and will always get a return. Failures are indicated by either 'none' or 'False'.

## util
- Contains utility values used by the backend to connect and execute commands to mysql.
- Contains commands for setup.
- Contains general command templates.

<br />

# Setup Local MySQL
## To install local MySQL server
- Install sql to run a local server form [here](https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing).
- Go to the `bin` folder in your mysql installation. Default location for macOS: `/usr/local/mysql/bin`.
- To go into the mysql datavase, run the command `./mysql -u root -p` within the `bin` folder of the mysql installation.

<br />

## To start, stop and restart MySQL server
Go to the `support-files` folder of your mysql installation. Default location for macOS: `/usr/local/mysql/support-folder`
- <b>To start:</b> `sudo ./mysql.server start`
- <b>To stop:</b> `sudo ./mysql.server stop`
- <b>To restart:</b> `sudo ./mysql.server restart`
- <b>To force stop (If given process id (PID) is unable to be found error):</b> find process IDs using `ps aux | grep mysql` then terminate all mysql processes using `sudo kill <pid> <pid> ... <pid>`. Replacing \<pid> with the process id, without the <>.

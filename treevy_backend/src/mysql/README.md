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

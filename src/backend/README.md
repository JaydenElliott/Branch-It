# To install local mysql server
- Install sql to run a local server form [here](https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing).
- Go to the `bin` folder in your mysql installation. Default location for macOS: `/usr/local/mysql/bin`.
- To go into the mysql datavase, run the command `./mysql -u root -p` within the `bin` folder of the mysql installation.

<br />

# To start, stop and restart mysql
Go to the `support-files` folder of your mysql installation. Default location for macOS: `/usr/local/mysql/support-folder`
- To start: `sudo ./mysql.server start`
- To stop: `sudo ./mysql.server stop`
- To restart `sudo ./mysql.server restart`
- To force stop (kill if process id (PID) is unable to be found): find process IDs using `ps aux | grep mysql` then terminate all mysql processes using `kill <pid> <pid> ... <pid>`. Replacing \<pid> with the process id, without the <>.

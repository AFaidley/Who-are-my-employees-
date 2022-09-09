const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

// Connects to db and shows console log to confirm
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'employee_db'
    },
    console.log(`You're connected to the employee_db database! :)`)
);


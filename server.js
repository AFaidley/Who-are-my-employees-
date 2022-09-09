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

// Options for user to choose from- may add more
const userChoices = {
  type: 'list',
  name: 'choices',
  message: 'What would you like to do?',
  choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee',
      'Quit'
  ]
};

function questions ()  {
  let chosen = inquirer.prompt(userChoices);

  switch (chosen.userChoices) {
      case 'View All Departments':
          viewAllDepartments();
          break;
      case 'View All Roles':
           viewAllRoles();
          break;
      case 'View All Employees':
           viewAllEmployees();
          break;
      case 'Add a Department':
           addADepartment();
          break;
      case 'Add a Role':
           addARole();
          break;
      case 'Add an Employee':
           addAnEmployee();
          break;
      case 'Update an Employee':
           updateAnEmployee();
          break;
      case 'Quit':
          process.exit();
      default:
          break;
  }
};

// View department func
function viewAllDepartments() {
  const query = `SELECT * FROM department`;
  db.query(query, (err, res) => {
      if (err) throw err;
      console.log('\n');
      console.log('VIEW ALL DEPARTMENTS');
      console.log('\n');
      console.table(res);
      questions();
  });
};

// View roles func
function viewAllRoles() {
  const query = `SELECT * FROM role`;
  db.query(query, (err, res) => {
      if (err) throw err;
      console.log('\n');
      console.log('VIEW ALL ROLES');
      console.log('\n');
      console.table(res);
      questions();
  });
};

// View all employees func
function viewAllEmployees() {
  const query = `SELECT * FROM employee`;
  db.query(query, (err, res) => {
      if (err) throw err;
      console.log('\n');
      console.log('VIEW ALL EMPLOYEES');
      console.log('\n');
      console.table(res);
      questions();
  });
};

async function addADepartment() {
  console.log('\n');
  console.log('ADDING DEPARTMENT');

  // Asynchronous operation to prompt and wait for user input
  const addingDepartment = await inquirer.prompt(askDepartment());
  const addResName =addingDepartment.name;
      
  const query = `INSERT INTO department (name) VALUES (${addResName})`;

  // Insert dept name info into dept table
  db.query(
      'INSERT INTO department SET ?',
      {
          name: addResName
      },
      (err, res) => {
          if (err) throw err;
          init();
      }
  );
  
  console.log('\n');
  console.log('DEPARTMENT ADDED');
  console.log('\n');
};

// Func to ask user for dept name- prompt from above
function askDepartment() {
  return ([
      {
          name: "department name",
          type: "input",
          message: "Enter the department name you wish to add: "
      }
  ]);
}
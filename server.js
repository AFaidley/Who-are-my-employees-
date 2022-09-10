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
function questions() {
  inquirer
    .prompt({
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
        'Quit',
      ],
    })
    .then((userChoice) => {
      switch (userChoice.choices) {
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
    });
}

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
}

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
}

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
}

async function addADepartment() {
  console.log('\n');
  console.log('ADDING DEPARTMENT');
  console.log('\n');

  // Asynchronous operation to prompt and wait for user input
  const addingDepartment = await inquirer.prompt(askDepartment());

  db.query(`SELECT * FROM department;`, async (err, res) => {
    if (err) throw err;
    console.log(addingDepartment.department_name);

    // Insert dept name info into dept table
    db.query(
      `INSERT INTO department SET ?`,
      {
        name: addingDepartment.department_name,
      },
      (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('DEPARTMENT ADDED');
        console.log('\n');
        questions();
      }
    );
  });
}

// Func to ask user for dept name- prompt from above
function askDepartment() {
  return [
    {
      name: 'department_name',
      type: 'input',
      message: 'Enter the department name you wish to add: ',
    },
  ];
}

async function addARole() {
  console.log('\n');
  console.log('ADDING ROLE');
  console.log('\n');
  // Asynchronous operation to prompt and wait for user input about role and salary
  const addingRole = await inquirer.prompt(askRole());
  const addingSalary = await inquirer.prompt(askSalary());

  db.query(`SELECT * FROM department;`, async (err, res) => {
    if (err) throw err;
    const { department } = await inquirer.prompt([
      {
        name: 'department',
        type: 'list',
        choices: () => res.map((res) => res.name),
        message: 'What department is this role located in: ',
      },
    ]);

    // Set role dept, using user input
    let deptId;
    for (const row of res) {
      if (row.name === department) {
        deptId = row.id;
        continue;
      }
    }
    console.log(deptId);
    console.log(addingRole.role);
    console.log(addingSalary.salary);

    // Add input for new role into the role table and console log once done
    db.query(
      'INSERT INTO role SET ?',
      {
        job_title: addingRole.role,
        salary: addingSalary.salary,
        department_id: deptId,
      },
      (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('EMPLOYEE ADDED');
        console.log('\n');
        questions();
      }
    );
  });
}

// Func to ask for role
function askRole() {
  return [
    {
      name: 'role',
      type: 'input',
      message: 'Enter the job title for the new role: ',
    },
  ];
}

// Func to ask for salary
function askSalary() {
  return [
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary for the new role:',
    },
  ];
}

async function addAnEmployee() {
  console.log('\n');
  console.log('ADDING EMPLOYEE');
  console.log('\n');
  // Asynchronous operation to prompt and wait for user input about role and salary
  const addingEmpName = await inquirer.prompt(askEmpName());
  const addingManName = await inquirer.prompt(askManName());
  const addingRole = await inquirer.prompt(askRole());
  const addingSalary = await inquirer.prompt(askSalary());

  db.query(`SELECT * FROM employee;`, async (err, res) => {
    if (err) throw err;

    console.log(addingEmpName.firstN);
    console.log(addingEmpName.lastN);
    console.log(addingRole.role);
    console.log(addingSalary.salary);
    console.log(addingManName.managers_name);

    // Inserting user input into employee table
    db.query(
      'INSERT INTO employee SET ?',
      {
        first_name: addingEmpName.firstN,
        last_name: addingEmpName.lastN,
        job_title: addingRole.role,
        salary: addingSalary.salary,
        manager_name: addingManName.managers_name,
      },
      (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('EMPLOYEE ADDED');
        console.log('\n');
        questions();
      }
    );
  });
}

// Ask user for new employee name- prompt
function askEmpName() {
  return [
    {
      name: 'firstN',
      type: 'input',
      message: 'Enter the first name of the new employee: ',
    },
    {
      name: 'lastN',
      type: 'input',
      message: 'Enter the last name of the new employee: ',
    },
  ];
}

// Ask for manager name- prompt 
function askManName() {
  return [
    {
      name: 'managers_name',
      type: 'input',
      message: 'Enter full name for the manager of the new employee: ',
    },
  ];
}

// Calling func to start app
questions();
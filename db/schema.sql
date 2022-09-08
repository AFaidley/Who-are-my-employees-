DROP DATABASE IF EXISTS employee_db;
DROP TABLES IF EXISTS  employee;
DROP TABLES IF EXISTS  role;
DROP TABLES IF EXISTS  department;

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary DECIMAL(15) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
); 

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_title VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    salary DECIMAL(15) NOT NULL,
    role_id INT NOT NULL,
    manager_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    FOREIGN KEY (salary) REFERENCES role(salary) ON DELETE SET NULL,
    FOREIGN KEY (department_name) REFERENCES department(name) ON DELETE SET NULL,
    FOREIGN KEY (job_title) REFERENCES role(job_title) ON DELETE SET NULL
);
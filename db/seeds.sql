INSERT INTO department (id, name)
VALUES  
        (001, 'Administrative'),
        (002, 'Engineering'),
        (003, 'Marketing'),
        (004, 'Human Resources');

SELECT * FROM department;

INSERT INTO role (id, job_title, salary, department_id)
VALUES 
    (001, 'Software Developer', 130000.00, 1),
    (002, 'Cyber Security Analyst', 90000.00, 2),
    (003, 'System Administrator', 85000.00, 2),
    (004, 'Consultant', 92000.00, 3),
    (005, 'Accountant', 110000.00, 4);

SELECT * FROM role;

INSERT INTO employee (id, first_name, last_name, job_title, department_name, salary, role_id, manager_name)
VALUES  
    (001, 'Nova', 'Wova', 'Software Developer', 'Engineering', 130000.00, 001, 'Adora Littles'),
    (002, 'Jan', 'Dane', 'System Administrator', 'Administrative', 120000.00, 003, 'Georgie Porgie'),
    (003, 'Shenan', 'Doa', 'Accountant', 'Marketing', 140000.00, 005, 'Jaspreet Singh'),
    (004, 'Rue', 'Zue', 'Software Developer', 'Engineering', 132000.00, 001, 'Adora Littles'),
    (005, 'Heather', 'Dale', 'Cyber Security Analyst', 'Engineering', 134000.00, 002, 'Adora Littles'),
    (006, 'Dave', 'Matthews', 'Consultant', 'Human Resources', 130000.00, 004, 'Avi Kumari'),
    (007, 'John', 'Wiles', 'Accountant', 'Marketing', 141000.00, 005, 'Jaspreet Singh');

    SELECT * FROM employee;
const inquirer = require('inquirer');
const pool = require('pg');
const queries = require('./queries');

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'employee_tracker',
    password: 'your_password',
    port: 5432,
});

async function mainMenu() {
    const { choice } = await inquirer.prompt([
        {
            type: `list`,
            name: `choice`,
            message: `What would you like to do?`,
            choices: [
                `View all departments`,
                `View all roles`,
                `View all employees`,
                `Add a department`,
                `Add a role`,
                `Add an employee`,
                `Update an employee role`,
                `Exit`
            ]
        }
    ]);

    switch (choice) {
        case `View all departments`:
            return viewDepartments();
            break;
        case `View all roles`:
            return viewRoles();
            break;
        case `View all employees`:
            return viewEmployees();
            break;
        case `Add a department`:
            return addDepartment();
            break;
        case `Add a role`:
            return addRole();
            break;
        case `Add an employee`:
            return addEmployee();
            break;
        case `Update an employee role`:
            return updateEmployeeRole();
            break;
        case `Exit`:
            console.log(`Goodbye!`);
            process.exit(0);
    }
    mainMenu();
}

async function viewDepartments() {
    const results = await pool.query(queries.viewDepartments);
    console.table(results.rows);
}

async function viewRoles() {
    const results = await pool.query(queries.viewRoles);
    console.table(results.rows);
}

async function viewEmployees() {
    const results = await pool.query(queries.viewEmployees);
    console.table(results.rows);
}

async function addDepartment() {
    const {departmentName} = await inquirer.prompt([
        {
            type: `input`,
            name: `departmentName`,
            message: `Enter the name of the department:`
        }
    ]);

    await pool.query(queries.addDepartment, [departmentName]);
    console.log(`${departmentName} has been added.`);
}

async function addRole() {
    const departments = await pool.query(queries.viewDepartments);
    const {title, salary, departmentId} = await inquirer.prompt([
        {
            type: `input`,
            name: `title`,
            message: `Enter the title of the role:`
        },
        {
            type: `input`,
            name: `salary`,
            message: `Enter the salary of the role:`
        },
        {
            type: `list`,
            name: `departmentId`,
            message: `Select the department for the role:`,
            choices: departments.rows.map(department => ({
                name: department.name,
                value: department.id
            }))
        }
    ]);
}

await pool.query(queries.addRole, [title, salary, departmentId]);
console.log(`${title} has been added.`);

async function addEmployee() {
    const roles = await pool.query(queries.viewRoles);
    const employees = await pool.query(queries.viewEmployees);
    const {firstName, lastName, roleId, managerId} = await inquirer.prompt([
        {
            type: `input`,
            name: `firstName`,
            message: `Enter the employee's first name:`
        },
        {
            type: `input`,
            name: `lastName`,
            message: `Enter the employee's last name:`
        },
        {
            type: `list`,
            name: `roleId`,
            message: `Select the employee's role:`,
            choices: roles.rows.map(role => ({
                name: role.title,
                value: role.id
            }))
        },
        {
            type: `list`,
            name: `managerId`,
            message: `Select the employee's manager:`,
            choices: [
                {
                    name: `None`,
                    value: null
                },
                ...employees.rows.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }))
            ]
        }
    ]);

    await pool.query(queries.addEmployee, [firstName, lastName, roleId, managerId]);
    console.log(`${firstName} ${lastName} has been added.`);
}
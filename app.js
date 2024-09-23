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
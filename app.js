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
    ])
}
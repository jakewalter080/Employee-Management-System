const inquirer = require('inquirer');
const pool = require('pg');
const queries = require('./queries');

// PostgreSQL connection configuration
const pool = new Pool({
    user: '',
    host: 'localhost',
    database: 'employee_tracker',
    password: 'Walte1234',
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
    const results = await pool.query(queries.VIEW_ALL_DEPARTMENTS);
    console.table(results.rows);
}

async function viewRoles() {
    const results = await pool.query(queries.VIEW_ALL_ROLES);
    console.table(results.rows);
}

async function viewEmployees() {
    const results = await pool.query(queries.VIEW_ALL_EMPLOYEES);
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

    await pool.query(queries.ADD_DEPARTMENT, [departmentName]);
    console.log(`${departmentName} has been added.`);
}

async function addRole() {
    const departments = await pool.query(queries.GET_ALL_DEPARTMENTS);
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

await pool.query(queries.ADD_ROLE, [title, salary, departmentId]);
console.log(`${title} has been added.`);

async function addEmployee() {
    const roles = await pool.query(queries.GET_ALL_ROLES);
    const employees = await pool.query(queries.GET_ALL_EMPLOYEES);
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

    await pool.query(queries.ADD_EMPLOYEE, [firstName, lastName, roleId, managerId]);
    console.log(`${firstName} ${lastName} has been added.`);
}

async function updateEmployeeRole() {
    const employees = await pool.query(queries.GET_ALL_EMPLOYEES);
    const roles = await pool.query(queries.GET_ALL_ROLES);
    const {employeeId, roleId} = await inquirer.prompt([
        {
            type: `list`,
            name: `employeeId`,
            message: `Select the employee to update:`,
            choices: employees.rows.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }))
        },
        {
            type: `list`,
            name: `roleId`,
            message: `Select the employee's new role:`,
            choices: roles.rows.map(role => ({
                name: role.title,
                value: role.id
            }))
        }
    ]);
// need to add newRoleId to the queries.js file
    await pool.query(queries.UPDATE_EMPLOYEE_ROLE, [newRoleId, employeeId]);
    console.log(`Employee role has been updated.`);
}

async function main() {
    try{
        await pool.connect();
        console.log(`Connected to the database.`);
        await mainMenu();
    } catch (error) {
        console.error(`Error`, error);
    } finally {
        await pool.end();
    }
}

main();
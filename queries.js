module.exports = {
    VIEW_ALL_DEPARTMENTS: `
        SELECT id, name
        FROM department
        ORDER BY id;
    `,

    VIEW_ALL_ROLES: `
    SELECT r.id, r.title, r.salary, d.name AS department
    FROM role r
    JOIN department d ON r.department_id = d.id
    ORDER BY r.id;
`,

VIEW_ALL_EMPLOYEES: `
    SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name AS department, 
    role.salary, 
    CONCAT(mmanager.first_name, ' ', mmanager.last_name) AS manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
    ORDER BY e.id;
`,

    ADD_DEPARTMENT: `
        INSERT INTO department (name)
        VALUES ($1)
        RETURNING id;
    `,

    ADD_ROLE: `
        INSERT INTO role (title, salary, department_id)
        VALUES ($1, $2, $3)
        RETURNING id;
    `,

    ADD_EMPLOYEE: `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
    `,

    UPDATE_EMPLOYEE_ROLE: `
        UPDATE employee
        SET role_id = $1
        WHERE id = $2;
    `,

    GET_ALL_DEPARTMENTS: `
        SELECT id, name
        FROM department;
        ORDER BY name;
    `,

    GET_ALL_ROLES: `
        SELECT id, title
        FROM role;
        ORDER BY title;
    `,
    
    GET_ALL_EMPLOYEES: `
        SELECT id, CONCAT(first_name, ' ', last_name) AS name
        FROM employee
        ORDER BY last_name, first_name;
    `,
};

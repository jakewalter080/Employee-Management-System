module.exports = {
    VIEW_ALL_DEPARTMENTS; `
        SELECT id, name
        FROM department
        ORDER BY id;
    `,

    VIEW_ALL_ROLES; `
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role r
        JOIN department d ON r.department_id = d.id
        ORDER BY role.id;
    `,

    VIEW_ALL_EMPLOYEES; `
    SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name AS department, 
    role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
    ORDER BY employee.id;
    `,

    ADD_DEPARTMENT; `
    INSERT INTO department (name)
    VALUES ($1)
    RETURNING id;
    `,
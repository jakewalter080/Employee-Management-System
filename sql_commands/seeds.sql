BEGIN;

-- SEED DATA FOR TABLES CREATED USING CHATGPT

-- Insert departments
INSERT INTO department (name) VALUES 
('IT'),
('HR'),
('Sales'),
('Marketing'),
('Finance'),
('Operations'),
('Customer Service'),
('Research and Development'),
('Legal'),
('Quality Assurance'),
('Procurement');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 100000.00, 1),
('IT Support Specialist', 65000.00, 1),
('HR Manager', 90000.00, 2),
('HR Assistant', 55000.00, 2),
('Sales Executive', 85000.00, 3),
('Sales Representative', 75000.00, 3),
('Marketing Lead', 95000.00, 4),
('Marketing Specialist', 80000.00, 4),
('Financial Analyst', 90000.00, 5),
('Operations Manager', 100000.00, 6),
('Customer Service Rep', 60000.00, 7),
('R&D Engineer', 110000.00, 8),
('Legal Counsel', 120000.00, 9),
('QA Tester', 75000.00, 10),
('Procurement Officer', 80000.00, 11);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 3, NULL),
('Peter', 'Williams', 5, NULL),
('Alice', 'Johnson', 7, NULL),
('Robert', 'Brown', 2, 1),
('Emily', 'Davis', 4, 2),
('David', 'Wilson', 6, 3),
('Sarah', 'Miller', 8, 4),
('Michael', 'Taylor', 9, NULL),
('Laura', 'Clark', 12, NULL);

COMMIT;
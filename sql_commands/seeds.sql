BEGIN 

DO $$
    BEGIN
-- SEED DATA FOR TABLES CREATED USING ChatGPT
    INSERT INTO department (name)
    VALUES 
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

    INSERT INTO role (title, salary, department_id)
    ('Software Engineer', 70000.00, 100000.00, 1),
    ('IT Support Specialist', 45000.00, 65000.00, 1),
    ('HR Manager', 60000.00, 90000.00, 2),
    ('HR Assistant', 40000.00, 55000.00, 2),
    ('Sales Executive', 60000.00, 85000.00, 3),
    ('Sales Representative', 50000.00, 75000.00, 3),
    ('Marketing Lead', 70000.00, 95000.00, 4),
    ('Marketing Specialist', 50000.00, 80000.00, 4),
    ('Financial Analyst', 60000.00, 90000.00, 5),
    ('Operations Manager', 70000.00, 100000.00, 6),
    ('Customer Service Rep', 40000.00, 60000.00, 7),
    ('R&D Engineer', 75000.00, 110000.00, 8),
    ('Legal Counsel', 90000.00, 120000.00, 9),
    ('QA Tester', 50000.00, 75000.00, 10),
    ('Procurement Officer', 55000.00, 80000.00, 11);

    INSERT INTO Employee (first_name, last_name, role_id, manager_id)
    VALUES
    ('John', 'Doe', 1, NULL),        -- John is the manager for IT
    ('Jane', 'Smith', 3, NULL),      -- Jane is the manager for HR
    ('Peter', 'Williams', 5, NULL),  -- Peter is the manager for Sales
    ('Alice', 'Johnson', 7, NULL),   -- Alice is the manager for Marketing
    ('Robert', 'Brown', 2, 1),       -- Robert reports to John (IT Support Specialist)
    ('Emily', 'Davis', 4, 2),        -- Emily reports to Jane (HR Assistant)
    ('David', 'Wilson', 6, 3),       -- David reports to Peter (Sales Representative)
    ('Sarah', 'Miller', 8, 4),       -- Sarah reports to Alice (Marketing Specialist)
    ('Michael', 'Taylor', 9, NULL),  -- Michael is the manager for Finance (Financial Analyst)
    ('Laura', 'Clark', 12, NULL);    -- Laura is the manager for R&D (R&D Engineer)

    END;
$$;
COMMIT;
INSERT INTO department (name)
VALUES 
	("Sales"),
    ("Engineering"), 
    ("Finance"), 
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
	("Sales Lead", 100000.00, 1),
    ("Salesperson", 80000.00, 1),
    ("Lead Engineer", 150000.00, 2),
    ("Software Engineer", 120000.00, 2),
    ("Accountant", 125000.00, 3),
    ("Legal Team Lead", 250000.00, 4),
    ("Lawyer", 190000.00, 4);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
	("John", "Doe", 1, null),
    ("Bryan", "Courtney", 4, null),
    ("Andy", "Mininini", 2, null),
    ("Aiden", "McDonald", 3, null),
    ("Johnny", "Apple", 5, null),
    ("Samantha", "Cheeks", 6, null),
    ("Kyle", "Kyle", 7, null);
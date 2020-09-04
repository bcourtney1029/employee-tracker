var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

// Connecting to our SQL db
var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    //3306 was taken from a failed sql setup
    user: "root",
    password: "password",
    database: "employeeDB"
});

connection.connect(function(err) {
    if (err) throw err;
    initialPrompt();
});

function initialPrompt() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee's role",
          "Exit"
        ]
      })
    .then(function(answer) {
        switch (answer.action) {
            case "View all departments":
                viewDpts();
                break;
            
            case "View all roles":
                viewRoles();
                break;

            case "View all employees":
                viewEmps();
                break;

            case "Add a department":
                addDpt();
                break;

            case "Add a role":
                addRole();
                break;

            case "Add an employee":
                addEmp();
                break;

            case "Update an employee's role":
                updateEmpRole();
                break;

            case "Exit":
                leaveDB();
                break;
        }
    });
}

function viewDpts() {
    // grab all columns from our department table
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        // Prints the department table to the screen for the user
        console.table(res);
        // Re-prompts the user so that they can continue exploring the db
        initialPrompt();
    })
}

function viewRoles() {
    // grab all columns from our role table
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        if (err) throw err;
        // Prints the role table to the screen for the user
        console.table(res);
        // Re-prompts the user so that they can continue exploring the db
        initialPrompt();
    })
}

function viewEmps() {
    // grab all columns from our employee table
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        // Prints the employee table to the screen for the user
        console.table(res);
        // Re-prompts the user so that they can continue exploring the db
        initialPrompt();
    })
}

function addDpt() {
    inquirer
    .prompt({       
        name: "dpt",
        type: "input",
        message: "Enter the department name"  
    })
    .then(function(answer) {
        // Setting up our query to put the user input into the department table
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query, answer.department, function(err, res) {
            if (err) throw err;
            console.log("The new department has been added!");
        })
        initialPrompt();
    })
}

function addRole() {
    inquirer
    .prompt([
        {
            name: "title",
            type: "input",
            message: "Enter the title of the role"
        },
        {
            name: "salary",
            type: "input",
            message: "What is their salary?"
        },
        {
            name: "dptID",
            type: "input",
            message: "What is the department id for the new role?"
        }
    ])
    .then(function(answer) {
        // Setting up our query to put the user input into the role table's 3 different columns
        var query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
        connection.query(query, [answer.title, answer.salary, answer.dptID], function(err, res) {
            if (err) throw err;
            console.log("The new role has been added!");
        })
        initialPrompt();
    })
}

function addEmp() {
    inquirer
    .prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "roleID",
            type: "input",
            message: "What is the employee's role ID number?"
        }
    ])
    .then(function(answer) {
        // Setting up our query to put the user input into the employee table
        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
        connection.query(query, [answer.first_name, answer.last_name, answer.roleID, "NULL"], function(err, res) {
            if (err) throw err;
            console.log("The new employee has been added!");
        })
        initialPrompt();
    })
}

function updateEmpRole() {
    inquirer
    .prompt([
        {
            name: "empUpdate",
            type: "input",
            // will cause an error if multiple last names, need to figure out how to work around this
            message: "Please enter the last name of the employee you would like to update(Case sensitive)"
        },
        {
            name: "newRoleID",
            type: "input",
            message: "What is that employee's new role ID?"
        }
    ])
    .then(function(answer) {
        var query = "UPDATE employee SET role_id = ? WHERE last_name = ?";
        connection.query(query, [answer.newRoleID, answer.empUpdate], function(err, res) {
            if (err) throw err;
            console.log("The employee's role has been updated!")
        })
        initialPrompt();
    })
}

function leaveDB() {
    connection.end();
}

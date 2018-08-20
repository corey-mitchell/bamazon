const mysql = require("mysql");
const inquirer = require("inquirer");

// Creates connection info for database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: "password",
    database: "bamazon"
});

// Connects to database
connection.connect((err) => {
    if (err) throw err;
    start();
});

// Start function
const start = () => {
    // Logs out available products
    connection.query("SELECT * FROM products", (err, res)=>{
        if (err) throw err;
        console.log(res)
    });
    connection.end()

    inquirer.prompt({
            
    })
}
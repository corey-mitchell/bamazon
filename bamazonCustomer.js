const mysql = require("mysql");
const inquirer = require("inquirer");
// Finally found a simple functioning table logger. The documentation requested that it be initalized up here,
// but I use 'console.table()' to envoke it instead of calling on the variable. Weird, but it works.
const table = require("console.table");

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
    console.log(`connected as ID ${connection.threadId}`);
    availItems();
    // Because of the load time of the availItems function, I had to put the buySomething function in a setTimeout
    setTimeout(buySomething, 500);
});

// Logs out available products in a table
const availItems = () => {
    connection.query("SELECT id, product, price FROM products", (err, res)=>{
        if (err) throw err;
        console.table(res);
    });
};

// Start function
const buySomething = () => {
    inquirer
        .prompt([{
            name: "itemID",
            type: "input",
            message: "Please type the ID number of the product you would like to buy."
        }
        ,
        {
            name: "quantity",
            type: "input",
            message: "How many units would you like to buy?"
        }])
        .then((answer)=>{
            console.log(`User would like to purchase ${answer.quantity} copies of item ID ${answer.itemID}`);
            connection.query(
                `UPDATE products SET stock=stock-${answer.quantity} WHERE id='${answer.itemID}'`,
                (err, res) => {
                    if (err) throw err;
                    if(res.stock < answer.quantity) {
                        console.log("Not enough in stock.")
                    } else {
                        console.log(`${res.affectedRows} products updated!`)
                        connection.end();
                    };
                }
            );
        });
}
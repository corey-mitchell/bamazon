// Dependencies
require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");

// Finally found a simple functioning table logger. The documentation requested that it be initalized up here,
// but I use 'console.table()' to envoke it instead of calling on the variable. Weird, but it works.
require("console.table");


// Creates connection info for database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: process.env.PW,
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

// Makes sure that the user is supplying only positive integers for their inputs
const validateInput = (value) => {
	const integer = Number.isInteger(parseFloat(value));
	const sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	};
};

// Logs out available products in a table
const availItems = () => {
    connection.query("SELECT id, product, price FROM products", (err, res)=>{
        if (err) throw err;
        console.table(res);
    });
};

// Main function for prompt and handling input
const buySomething = () => {
    inquirer
        .prompt([{
            name: "itemID",
            type: "input",
            message: "Please type the ID number of the product you would like to buy.",
            validate: validateInput,
            filter: Number
        }
        ,
        {
            name: "quantity",
            type: "input",
            message: "How many do you need?",
            validate: validateInput,
            filter: Number
        }])
        .then((answer)=>{
            const item = answer.itemID;
            const quantity = answer.quantity;
            const queryStr = 'SELECT * FROM products WHERE ?';

            // Opens connection to DB
            connection.query(
                queryStr, {id: item},
                (err, res) => {
                    if (err) throw err;
                    
                    // Checks that the user input is a valid item in stock
                    if (res.length === 0) {
                        console.log("ERROR: Please enter valid ID number!\n");
                        buySomething();
                    } else {
                        // Checks stock to so if there is enough. If there isn't then it prompt user for new input
                        const productData = res[0];
                        if(quantity > productData.stock) {
                            console.log("Sorry, we don't have enough in stock.\n");
                            buySomething();
                        } else {
                            // If there is enough stock, this will output the total price of order
                            console.log(`Your order has been placed. Your total is ${(productData.price * quantity).toFixed(2)}`);

                            // Updates DB to reflect changes.
                            connection.query(
                                `UPDATE products SET stock = ${productData.stock - quantity} WHERE id = ${item}`,
                                (err, res) => {
                                    if (err) throw err;
                                }
                            );
                            // Closes connection
                            connection.end();
                        };
                    };
                }
            );
        });
}
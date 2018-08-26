// Setting up dependencies
require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

// Creates connection to mysql
const connection = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: process.env.PW,
    database: "bamazon"
});

// Makes sure that the user is supplying only positive integers for their inputs.
// added this here because node does not support the import method yet.
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
const products = () => {
    connection.query("SELECT * FROM products", (err, res)=>{
        if (err) throw err;
        console.table(res);
    });
};

// Logs out all items with a stock that is lower than five
const lowInventory = () => {
    connection.query(
        `SELECT * FROM products WHERE stock < 5`,
        (err, res) => {
            if (err) throw err;
            console.table(res);
        }
    );
};

// Lets manager add inventory
const addInventory = () => {
    inquirer
        .prompt({
            name: 'addInv',
            type: 'input',
            message: 'Which item would you like to add inventory to?',
            validate: validateInput,
            filter: Number
        }).then((input)=>{
            const manInput = input.addInv
            connection.query(
                'SELECT * FROM products WHERE ?',
                {id: manInput},
                (err, res) => {
                    if (err) throw err;
                    console.log(res);
                }
            );
        });
};

// Lets manager add products
const addProduct = () => {
    console.log("add new product ran");
};

// Creates prompt for manager and handles choices
const runManager = () => {
    inquirer
        .prompt({
            name: 'manager',
            type: 'rawlist',
            choices: ['View available product', 'View products with low inventory', 'Add inventory to product', 'Add a product']
            
        }).then((input) => {
            const command = input.manager;

            // Switch case for handling the commands
            switch (command) {
                case 'View available product':
                    products();
                    connection.end();
                    break;

                case 'View products with low inventory':
                    lowInventory();
                    connection.end();
                    break;

                case 'Add inventory to product':
                    products();
                    setTimeout(addInventory, 500);
                    break;

                case 'Add a product':
                    addProduct();
                    // connection.end();
                    break;
            };
        });
};

runManager();
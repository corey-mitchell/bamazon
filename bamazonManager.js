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
// node does not support the import method yet so I added this code block on both files.
const validateInput = (value) => {
	const integer = Number.isInteger(parseFloat(value));
	const sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	};
};

const moreActions = () => {
    // Prompts manager for additional tasks
    inquirer
    .prompt({
        name: "runAddInv",
        type: "rawlist",
        message: "Would you like do something else?",
        choices: ['Yes', 'No']
    }).then((input)=>{
        const answer = input.runAddInv
        switch (answer) {
            case 'Yes':
                runManager();
                break;
            case 'No':
                connection.end();
                break;
        };
    });
}

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
            if(res.length === 0) {
                console.log('All products are well stocked!');
            } else {
                // Logs low inventory results
                console.table(res);
                moreActions();
            };
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
                    if (res.length === 0) {
                        console.log("ERROR: Please enter valid ID number!\n");
                        addInventory();
                    } else{
                        inquirer
                            .prompt({
                                name: 'addStock',
                                type: 'input',
                                message: 'How much stock would you like to add?',
                                validate: validateInput,
                                filter: Number
                            }).then((input)=>{
                                const oldStock = res[0].stock;
                                const newStock = input.addStock
                                connection.query(
                                    `UPDATE products SET stock = ${oldStock + newStock} WHERE id = ${manInput}`,
                                    (err, data) => {
                                        if (err) throw err;
                                    },
                                );
                                console.log('Stock has been updated!\n');
                                moreActions();
                            });
                    };
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
                    setTimeout(moreActions, 200);
                    break;

                case 'View products with low inventory':
                    lowInventory();
                    break;

                case 'Add inventory to product':
                    products();
                    setTimeout(addInventory, 200);
                    break;

                case 'Add a product':
                    addProduct();
                    break;
            };
        });
};

runManager();
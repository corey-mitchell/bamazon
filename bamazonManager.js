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

// validateNumeric makes sure that the user is supplying only positive numbers for their inputs
// this is a different function so that the input will allow decimals
function validateNumeric(value) {
	// Value must be a positive number
	var number = (typeof parseFloat(value)) === 'number';
	var positive = parseFloat(value) > 0;

	if (number && positive) {
		return true;
	} else {
		return 'Please enter a positive number for the unit price.'
	}
}

// Prompts manager for addition actions in case the user wanted to do more before closing connection.
const moreActions = () => {
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
        // Checks for products with a stock below 5 units
        `SELECT * FROM products WHERE stock < 5`,
        (err, res) => {
            if (err) throw err;
            if(res.length === 0) {
                console.log('All products are well stocked!');
            } else {
                // Logs low inventory results
                console.table(res);
                //Launches addition actions in case the user wanted to do more before closing connection.
                moreActions();
            };
        }
    );
};

// Lets manager add inventory
const addInventory = () => {
    inquirer
        // Picks which item to add stock to
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
                    // Checks that the ID inputed is a valid ID
                    if (res.length === 0) {
                        console.log("ERROR: Please enter valid ID number!\n");
                        addInventory();
                    } else{
                        inquirer
                            // Uses user input to determine how much stock to add
                            .prompt({
                                name: 'addStock',
                                type: 'input',
                                message: 'How much stock would you like to add?',
                                validate: validateInput,
                                filter: Number
                            }).then((input)=>{
                                const oldStock = res[0].stock;
                                const newStock = input.addStock
                                // Updates DB
                                connection.query(
                                    `UPDATE products SET stock = ${oldStock + newStock} WHERE id = ${manInput}`,
                                    (err, data) => {
                                        if (err) throw err;
                                    },
                                );
                                console.log('Stock has been updated!\n');
                                //Launches addition actions in case the user wanted to do more before closing connection.
                                moreActions();
                            });
                    };
                }
            );
        });
};

// Lets manager add products
const addProduct = () => {
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "What is the name of the product you would like to add?"
            },
            {
                name: "department",
                type: "input",
                message: "What department does this product belong in?"
            },
            {
                name: "price",
                type: "input",
                message: "How much does this product cost?",
                validate: validateNumeric
            },
            {
                name: "stock",
                type: "input",
                message: "How many do you currently have in stock?",
                validate: validateInput
            }
        ]).then((input)=>{
            console.table(input)
            inquirer
                .prompt({
                    name: "itemCheck",
                    type: "rawlist",
                    message: "Is everything correct?",
                    choices: ["Yes", "No"]
                }).then((answer)=>{
                    const inputCheck = answer.itemCheck
                    if(inputCheck === "Yes") {
                        // Create the insertion query string
		                const queryStr = 'INSERT INTO products SET ?';

                        // Add new product to the db
                        connection.query(queryStr, input, (err) => {
                            if (err) throw err;
                        });

                        console.log(`${input.product} has been added to products.\n`)
                        //Launches addition actions in case the user wanted to do more before closing connection.
                        moreActions();
                    } else {
                        addProduct();
                    };
                });
        });
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

// Starts the application
runManager();
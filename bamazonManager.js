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

const addInventory = () => {
    console.log("add inventory");
};

const addProduct = () => {
    console.log("add new product");
};

// Combines everything typed after file name into a string. making it all equivelent to process.argv[3]
const splice = process.argv.splice(2, process.argv.length);
const command = splice.join(' ');

// Switch case for handling the commands
switch (command) {
    case 'view products for sale':
        products();
        connection.end();
        break;

    case 'view low inventory':
        lowInventory();
        connection.end();
        break;

    case 'add to inventory':
        addInventory();
        // connection.end();
        break;

    case 'add new product':
        addProduct();
        // connection.end();
        break;
    
    default:
        console.log("Missing or invalid command.");
        break;
};
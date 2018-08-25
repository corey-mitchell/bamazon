// Setting up dependencies
require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const command = process.argv.join('');


console.log(command);
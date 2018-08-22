# bamazon
Amazon type application for further node and mySQL knowledge. Currently has a set list of items and monitors available stock. Stock will deplete based upon user input of desired quantity.

## Getting Started

Run 'node bamazonCustomer' in terminal to begin. User will be prompted to input ID number of desired product. Afterwards, the user will be asked the quantity they desire to purchase. Once these questions are answered, the stock data column will be updated to reflect new available stock. If there is not enough stock to supply desired demand, the user will be updated in the console.

### Prerequisites

Dependencies:
  mysql
  inquirer
  console.table

Terminal command for downloading dependencies
```
npm i mysql
npm i inquirer
npm i console.table
```

Initialize Dependencies
```
const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");
```

**Note console.table is used just like console.log, e.g. *console.table('table to be logged in console');* **

## Authors

* **Corey Mitchell** - *Initial work* - (https://github.com/corey-mitchell)

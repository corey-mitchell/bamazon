# bamazon
Amazon type application for further node and mySQL knowledge. Currently has a set list of items and monitors available stock. Stock will deplete based upon user input of desired quantity.

## Getting Started

Run 'node bamazonCustomer' in terminal to begin. Available product will be displayed in a table for the user. User will then be prompted to input ID number of desired product:
![starting application](https://user-images.githubusercontent.com/37916145/44622373-c176ce80-a87c-11e8-84b3-86e4b8fa9809.PNG);

After the user enters desired ID, the user will be asked the quantity they desire to purchase:
![Prompt](https://user-images.githubusercontent.com/37916145/44622372-c0de3800-a87c-11e8-861b-4ad6773a0ccd.PNG)

If the user does not supply an input that is a non-zero integer then they will be asked to enter a non-zero number:
![Not a number](https://user-images.githubusercontent.com/37916145/44622371-c0de3800-a87c-11e8-98b2-8236ff99ac60.PNG)

Once these questions are successfully answered, the stock data column will be updated to reflect new available stock.
Original mySQL data:
![mySQL data](https://user-images.githubusercontent.com/37916145/44622369-bc198400-a87c-11e8-8cbf-ea93d3ffb6d4.PNG)
Updated Data Row:
![Updated mySQL data row](https://user-images.githubusercontent.com/37916145/44622370-be7bde00-a87c-11e8-89a9-46b95447bcfe.PNG)

The user is then prompted that their order was successfully placed and given the total of their order:
![Successful order](https://user-images.githubusercontent.com/37916145/44622366-b02dc200-a87c-11e8-93a9-39759aeab176.PNG)

If there is not enough stock to supply desired demand, the user will be updated in the console:
![Low stock](https://user-images.githubusercontent.com/37916145/44622367-b4f27600-a87c-11e8-9b3a-31f37da1cb85.PNG)

### Prerequisites

Dependencies:
  mysql,
  inquirer,
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
require("console.table");
```

**Note:** console.table is used just like console.log, e.g. *console.table('table to be logged in console');*

## Authors

* **Corey Mitchell** - *Initial work* - (https://github.com/corey-mitchell)

# bamazon
Amazon type application for further node and mySQL knowledge. Customer file has a set list of items and monitors available stock. Stock will deplete based upon user input of desired quantity. Manager file allows the user to audit product information.

## Getting Started as a Customer

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

## Getting Started as a Manager

Run 'node bamazonManager' in the terminal to begin. User will be prompted with a list of things to do with product:
![Application Start](https://user-images.githubusercontent.com/37916145/44632711-0cf4af80-a945-11e8-93c6-c93d7c7c2c2b.PNG)

After each task the user will be prompted with a question asking if they would like to do anything else:
![Additional tasks](https://user-images.githubusercontent.com/37916145/44632734-82608000-a945-11e8-848a-679295868090.PNG)

If the user answers yes then they will be shown the starting list. If the user answers no then the connection will end.

Manager's options:

**Option 1:** *View available products*. If the user chooses this option then a table will display all of the information about all available products.
![Available Products](https://user-images.githubusercontent.com/37916145/44632754-e4b98080-a945-11e8-80d9-08bee232e276.PNG)

**Option 2:** *View products with low inventory*. If the user chooses this option, a table will display all the items that have a stock quantity lower than 5.
![Low stock products](https://user-images.githubusercontent.com/37916145/44632781-5d204180-a946-11e8-8e13-6d06192702c7.PNG)

**Option 3:** *Add inventory to product*. This options allows the user to add inventory to an exsisting product. It will first display the products available and ask the user to input a product ID (the user will be limited to only integars that are equal to a valid product ID).
![Add inventory start](https://user-images.githubusercontent.com/37916145/44632815-f18aa400-a946-11e8-8258-51f09742d992.PNG)

After choosing a valid ID number, the user will be asked how much stock they would like to add.
![Add inventory second question](https://user-images.githubusercontent.com/37916145/44632826-3ca4b700-a947-11e8-972f-f10f4a48b23b.PNG)

Once the stock is added, the user is prompted that the stock has been added and shown the updated items table.
![Updated inventory](https://user-images.githubusercontent.com/37916145/44632878-3400b080-a948-11e8-84d8-6829d5053277.PNG)

**Option 4:** *Add a product*. As stated in the title of this option, the function here allows the user to add a new product to the table of available products. Once this option is selected, the user will be prompted to provide details for this new item. Details such as; product name, product department, product price and how much product is in stock.
![Add a product](https://user-images.githubusercontent.com/37916145/44632917-dfaa0080-a948-11e8-9308-c8febe676180.PNG)

Once these questions are answered, the terminal will display a table with the users input and ask them to double check that the information is correct.

![Product checker](https://user-images.githubusercontent.com/37916145/44632939-2bf54080-a949-11e8-829d-99e0fc46bfc9.PNG)

If the user answers no then they will be asked the questions again. Else they will be alerted that the product has been added to the database.

![Product added](https://user-images.githubusercontent.com/37916145/44632951-6fe84580-a949-11e8-8a70-62993cd866cc.PNG)


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

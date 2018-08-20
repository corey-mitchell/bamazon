DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product VARCHAR(45) NOT NULL,
    department VARCHAR(45) NOT NULL,
    price DECIMAL(30,2) NOT NULL,
    stock INT(30) NOT NULL
);

INSERT INTO products (product, department, price, stock)
VALUES ("Play Station 4 Dual Shock Controller", "Movies, Music and Games", 45.89, 45),
("Novation MIDI Keyboard", "Electronics and Computers" 149.99, 4),
("Picture Frame", "Home and Office", 14.99, 68),
("Wifi Router", "Electronics and Computers", 77.85, 14),
("XBOX One", "Movies, Music and Games", 245.99, 36),
("Vizio 38in Television", "Electronics and Computers", 188.65, 6),
("Ottoman", "Home and Office", 99.89, 43),
("Door Mat", "Home and Office", 17.89, 24),
("Queen: Sheer Heart Attack Vinyl", "Movies, Music and Games", 17.99, 88),
("Amazon Tap - Alexa Enabled Speaker", "Electronics and Computers", 59.99, 202);

SELECT * FROM products;
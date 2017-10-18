DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR (50) NOT NULL,
department_name VARCHAR (30),
price DECIMAL (10,2) NULL,
stock_quantity INTEGER NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_productsquantity)
VALUES ("slippers", "footwear", 15.27, 85), 
("clown mask", "costumes", 18.99, 32), 
("Serial Mom", "movies", 8.99, 14), 
("Mars Attacks", "movies", 4.99, 17), 
("watch", "jewelry", 89.99, 15), 
("earrings", "jewelry", 22.55, 43), 
("devil horns", "costumes", 5.99, 56),
("nail polish", "beauty", 8.99, 78), 
("blu-ray player", "electronics", 65.99, 109), 
("tootsie rolls", "food", 4.99, 500)


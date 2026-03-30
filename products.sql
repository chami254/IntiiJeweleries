CREATE DATABASE jewelry_store;

USE jewelry_store;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10,2),
    category VARCHAR(100),
    stock INT,
    discount INT,
    image TEXT,
    rating INT DEFAULT 4
);
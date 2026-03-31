CREATE DATABASE IF NOT EXISTS jewelry_store;
USE jewelry_store;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10,2),
    category VARCHAR(100),
    stock INT,
    discount INT,
    image TEXT,
    rating INT DEFAULT 4,
    featured BOOLEAN DEFAULT 0
);

CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

-- Insert default admin user (password: admin123)
INSERT INTO admins (username, password) VALUES ('intii', 'admin1234');
<?php
include "db.php";

$name = $_POST["name"];
$price = $_POST["price"];
$category = $_POST["category"];
$stock = $_POST["stock"];
$discount = $_POST["discount"];

$imageName = $_FILES["image"]["name"];
$tempName = $_FILES["image"]["tmp_name"];

$folder = "uploads/" . $imageName;

move_uploaded_file($tempName, $folder);

$featured = $_POST["featured"];

$stmt = $conn->prepare("INSERT INTO products (name, price, category, stock, discount, image, featured) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sdsiiss", $name, $price, $category, $stock, $discount, $folder, $featured);

if ($stmt->execute()) {
    echo "Product added";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
?>
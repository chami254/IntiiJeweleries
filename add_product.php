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

$sql = "INSERT INTO products (name, price, category, stock, discount, image)
VALUES ('$name', '$price', '$category', '$stock', '$discount', '$folder')";

if ($conn->query($sql) === TRUE) {
    echo "Product added";
} else {
    echo "Error: " . $conn->error;
}
?>
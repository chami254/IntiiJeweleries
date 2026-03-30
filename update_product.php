<?php
include "db.php";

$id = $_POST["id"];
$name = $_POST["name"];
$price = $_POST["price"];
$category = $_POST["category"];
$stock = $_POST["stock"];
$discount = $_POST["discount"];

$imagePath = "";

// CHECK IF IMAGE UPLOADED
if(isset($_FILES["image"]) && $_FILES["image"]["name"] != ""){

    $imageName = $_FILES["image"]["name"];
    $tempName = $_FILES["image"]["tmp_name"];

    $folder = "uploads/" . $imageName;

    move_uploaded_file($tempName, $folder);

    $imagePath = ", image='$folder'";
}

$sql = "UPDATE products 
SET name='$name',
price='$price',
category='$category',
stock='$stock',
discount='$discount'
$imagePath
WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "Updated";
} else {
    echo "Error";
}
?>
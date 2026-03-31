<?php
include "db.php";

$id = $_POST["id"];
$name = $_POST["name"];
$price = $_POST["price"];
$category = $_POST["category"];
$stock = $_POST["stock"];
$discount = $_POST["discount"];

$imagePath = "";
$imageParam = "";

// CHECK IF IMAGE UPLOADED
if(isset($_FILES["image"]) && $_FILES["image"]["name"] != ""){

    $imageName = $_FILES["image"]["name"];
    $tempName = $_FILES["image"]["tmp_name"];

    $folder = "uploads/" . $imageName;

    move_uploaded_file($tempName, $folder);

    $imagePath = ", image=?";
    $imageParam = $folder;
}

if($imagePath != ""){
    $stmt = $conn->prepare("UPDATE products SET name=?, price=?, category=?, stock=?, discount=? $imagePath WHERE id=?");
    $stmt->bind_param("sdsiissi", $name, $price, $category, $stock, $discount, $imageParam, $id);
} else {
    $stmt = $conn->prepare("UPDATE products SET name=?, price=?, category=?, stock=?, discount=? WHERE id=?");
    $stmt->bind_param("sdsiisi", $name, $price, $category, $stock, $discount, $id);
}

if ($stmt->execute()) {
    echo "Updated";
} else {
    echo "Error";
}

$stmt->close();
?>
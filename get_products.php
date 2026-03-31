<?php
include "db.php";

if(isset($_GET['featured'])){
    $sql = "SELECT * FROM products WHERE featured = 1";
} else {
    $sql = "SELECT * FROM products ORDER BY id DESC";
}

$result = $conn->query($sql);

$products = [];

while($row = $result->fetch_assoc()){
    $products[] = $row;
}

echo json_encode($products);
?>
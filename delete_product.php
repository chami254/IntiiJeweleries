<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = $data["id"];

$stmt = $conn->prepare("DELETE FROM products WHERE id=?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo "Deleted";
} else {
    echo "Error";
}

$stmt->close();
?>
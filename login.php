<?php
session_start();
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"];
$password = $data["password"];

$stmt = $conn->prepare("SELECT * FROM admins WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows > 0){
    $row = $result->fetch_assoc();
    if(password_verify($password, $row["password"])){
        $_SESSION["admin"] = $username;
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "error";
}

$stmt->close();
?>
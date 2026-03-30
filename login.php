<?php
session_start();
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"];
$password = $data["password"];

$sql = "SELECT * FROM admins WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

if($result->num_rows > 0){
    $_SESSION["admin"] = $username;
    echo "success";
} else {
    echo "error";
}
?>
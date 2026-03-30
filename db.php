<?php

$conn = new mysqli("localhost", "root", "39325229", "jewelry_store");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
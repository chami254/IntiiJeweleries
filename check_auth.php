<?php
session_start();

if(!isset($_SESSION["admin"])){
    echo "unauthorized";
} else {
    echo "authorized";
}
?>
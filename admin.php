<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Intii Jeweleries | Admin Dashboard</title>

<link rel="stylesheet" href="admin.css">

</head>

<body>

<!-- LOGIN POPUP -->
<div class="login-modal" id="loginModal">

<div class="login-box">

<h2>Admin Login</h2>

<input type="text" id="username" placeholder="Username">
<input type="password" id="password" placeholder="Password">

<button onclick="login()">Login</button>

<p id="login-error"></p>

</div>

</div>

<h1>Admin Dashboard</h1>
<button onclick="logout()" style="position: fixed;">Logout</button>

<!-- ADD PRODUCT FORM -->

<div class="form-container">

<h2>Add Product</h2>

<input type="text" id="name" placeholder="Product Name">
<input type="number" id="price" placeholder="Price">
<input type="text" id="category" placeholder="Category (rings, necklaces...)">
<input type="number" id="stock" placeholder="Stock Quantity">
<input type="number" id="discount" placeholder="Discount %">
<input type="file" id="image">

<input type="hidden" id="editIdField">

<button onclick="addProduct()">Add Product</button>

</div>

<!-- PRODUCT LIST -->

<div class="product-list">

<h2>All Products</h2>

<div id="admin-products"></div>

</div>

<script src="admin.js"></script>

</body>
</html>
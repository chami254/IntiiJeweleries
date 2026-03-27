let products = [];

// ADD PRODUCT
function addProduct(){

let name = document.getElementById("name").value;
let price = parseFloat(document.getElementById("price").value);
let category = document.getElementById("category").value;
let stock = parseInt(document.getElementById("stock").value);
let discount = parseInt(document.getElementById("discount").value);
let image = document.getElementById("image").value;

let product = {
name,
price,
category,
stock,
discount,
image,
rating:4
};

products.push(product);

displayProducts();

clearForm();

}

// DISPLAY PRODUCTS
function displayProducts(){

let container = document.getElementById("admin-products");

container.innerHTML = "";

products.forEach((p, index) => {

container.innerHTML += `
<div class="admin-item">
<div>
<strong>${p.name}</strong> - $${p.price}
<br>
<small>${p.category} | Stock: ${p.stock} | Discount: ${p.discount}%</small>
</div>

<button onclick="deleteProduct(${index})">Delete</button>
</div>
`;

});

}

// DELETE PRODUCT
function deleteProduct(index){
products.splice(index,1);
displayProducts();
}

// CLEAR FORM
function clearForm(){
document.getElementById("name").value = "";
document.getElementById("price").value = "";
document.getElementById("category").value = "";
document.getElementById("stock").value = "";
document.getElementById("discount").value = "";
document.getElementById("image").value = "";
}
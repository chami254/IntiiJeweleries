loadProducts();

let products = [];

fetch("get_products.php")
.then(res => res.json())
.then(data => {
products = data;
filteredProducts = [...products];
displayProducts();
});

// ADD PRODUCT
let editId = null;

function addProduct(){

let formData = new FormData();

formData.append("name", document.getElementById("name").value);
formData.append("price", document.getElementById("price").value);
formData.append("category", document.getElementById("category").value);
formData.append("stock", document.getElementById("stock").value);
formData.append("discount", document.getElementById("discount").value);

let imageFile = document.getElementById("image").files[0];
if(imageFile){
formData.append("image", imageFile);
}

let url = editId ? "update_product.php" : "add_product.php";

if(editId){
formData.append("id", editId);
}

fetch(url, {
method:"POST",
body: formData
})
.then(res => res.text())
.then(data => {
alert(data);
loadProducts();
clearForm();
editId = null;
});

}

// LOAD PRODUCTS
container.innerHTML += `
<div class="admin-item">

<div>
<strong>${p.name}</strong> - $${p.price}
<br>
<small>${p.category} | Stock: ${p.stock} | Discount: ${p.discount}%</small>
</div>

<div>
<button onclick='editProduct(${JSON.stringify(p)})'>Edit</button>
<button onclick="deleteProduct(${p.id})">Delete</button>
</div>

</div>
`;

//EDIT PRODUCTS
function editProduct(product){

  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("category").value = product.category;
  document.getElementById("stock").value = product.stock;
  document.getElementById("discount").value = product.discount;
  
  editId = product.id;
  
  window.scrollTo({top:0, behavior:"smooth"});
  
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
function deleteProduct(id){

  fetch("delete_product.php", {
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body: JSON.stringify({id})
  })
  .then(res => res.text())
  .then(() => loadProducts());
  
  }

// CLEAR FORM
function clearForm(){

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("category").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("discount").value = "";
  document.getElementById("image").value = "";
  
  editId = null;
  
  }
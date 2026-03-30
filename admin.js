let editId = null;

// LOAD PRODUCTS
function loadProducts(){

  fetch("get_products.php")
  .then(res => res.json())
  .then(data => {
  
  let container = document.getElementById("admin-products");
  container.innerHTML = "";
  
  data.forEach(p => {
  container.innerHTML += `
  <div>
  ${p.name} - ${p.price}
  </div>
  `;
  });
  
  });
  loadProducts();

let products = [];

fetch("get_products.php")
.then(res => res.json())
.then(data => {
products = data;
filteredProducts = [...products];
displayProducts();
});
  }

// CHECK AUTH ON LOAD
window.onload = function(){

  fetch("check_auth.php")
  .then(res => res.text())
  .then(data => {
  
  if(data === "authorized"){
  document.getElementById("loginModal").style.display = "none";
  loadProducts();
  }
  
  });
  
  };
  
  // LOGIN FUNCTION
  function login(){
  
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  
  fetch("login.php", {
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body: JSON.stringify({username, password})
  })
  .then(res => res.text())
  .then(data => {
  
  if(data === "success"){
  document.getElementById("loginModal").style.display = "none";
  loadProducts();
  } else {
  document.getElementById("login-error").innerText = "Invalid login";
  }
  
  });
  
  }

  //LOG OUT 

  function logout(){

    fetch("logout.php")
    .then(() => {
    location.reload();
    });
    
    }




//ADD PRODUCT
function addProduct(){

  let localEditId = document.getElementById("editIdField")?.value || null;
  
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
  
  let url = localEditId ? "update_product.php" : "add_product.php";
  
  if(localEditId){
  formData.append("id", localEditId);
  }
  
  fetch(url, {
  method: "POST",
  body: formData
  })
  .then(res => res.text())
  .then(data => {
  
  alert(data);
  
  // reset form
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("category").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("discount").value = "";
  
  loadProducts(); 
  
  });
  
  }
  
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

  window.onload = function(){
    loadProducts();
    };
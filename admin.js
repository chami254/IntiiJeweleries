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

  formData.append("featured",
    document.getElementById("featured").checked ? 1 : 0);
  
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


  setTimeout(() => {
    loadProducts();
    }, 300); 
  
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

fetch("get_products.php")
.then(res => res.json())
.then(data => {

data.forEach((p, index) => {

let finalPrice = p.discount > 0
? p.price - (p.price * p.discount / 100)
: p.price;

container.innerHTML += `
<div class="admin-item">
<div class="admin-item-image">
<img src="${p.image}" alt="${p.name}">
</div>
<div class="admin-item-details">
<h3>${p.name}</h3>
<p class="admin-item-category">${p.category}</p>
<div class="admin-item-price">
${p.discount > 0
? `<span class="old-price">${p.price}</span> <span class="final-price">${finalPrice}</span>`
: `<span class="final-price">${p.price}</span>`}
</div>
<div class="admin-item-stock ${p.stock === 0 ? 'out' : ''}">
${p.stock > 0 ? `In Stock: ${p.stock}` : 'Out of Stock'}
</div>
${p.discount > 0 ? `<div class="admin-item-discount">Discount: ${p.discount}%</div>` : ''}
${p.featured == 1 ? `<div class="admin-item-featured">⭐ Featured</div>` : ''}
</div>
<div class="admin-item-actions">
<button class="edit-btn" onclick='editProduct(${JSON.stringify(p).replace(/'/g, "\'")})'>Edit</button>
<button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
</div>
</div>
`;

});

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


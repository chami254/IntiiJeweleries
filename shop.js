let products = [];
  let filteredProducts = [];
  
  // DISPLAY PRODUCTS
  function displayProducts(){

    let grid = document.getElementById("product-grid");
    grid.innerHTML = "";
    
    filteredProducts.forEach(product => {
    
    let stars = "";
    for(let i=0; i<5; i++){
    stars += i < product.rating
    ? `<i class="fas fa-star"></i>`
    : `<i class="far fa-star"></i>`;
    }
    
    // DISCOUNT CALCULATION
    let finalPrice = product.discount > 0
    ? product.price - (product.price * product.discount / 100)
    : product.price;
    
    grid.innerHTML += `
    <div class="product-card">
    
    <div class="product-image">
    
    <img src="${product.image}">
    
    ${product.discount > 0 ? `<div class="badge">-${product.discount}%</div>` : ""}
    
    <div class="wishlist">
    <i class="fas fa-heart"></i>
    </div>
    
    </div>
    
    <div class="product-info">
    
    <h3>${product.name}</h3>
    
    <div class="rating">${stars}</div>
    
    <p class="price">
    ${product.discount > 0
    ? `<span class="old-price">${product.price}</span> ${finalPrice}`
    : `${product.price}`}
    </p>
    
    <p class="stock ${product.stock === 0 ? "out" : ""}">
    ${product.stock > 0 ? "In Stock" : "Out of Stock"}
    </p>
    
    <button class="add-cart"
    ${product.stock === 0 ? "disabled" : ""}
    onclick="addToCart('${product.name}', ${finalPrice})">
    
    <i class="fas fa-shopping-cart"></i>
    ${product.stock === 0 ? "Out of Stock" : "Add to Cart"}
    
    </button>
    
    </div>
    
    </div>
    `;
    
    });
    
    }
    
    // LOAD PRODUCTS FROM DATABASE
    function loadProducts(){
    fetch("get_products.php")
    .then(res => res.json())
    .then(data => {
    products = data;
    filteredProducts = [...products];
    displayProducts();
    });
    }
  
  // SEARCH
  document.getElementById("search").addEventListener("input", (e)=>{
  let value = e.target.value.toLowerCase();
  
  filteredProducts = products.filter(p =>
  p.name.toLowerCase().includes(value)
  );
  
  displayProducts();
  });
  
  // CATEGORY FILTER
  document.getElementById("category").addEventListener("change", (e)=>{
  let value = e.target.value;
  
  if(value === "all"){
  filteredProducts = [...products];
  } else {
  filteredProducts = products.filter(p => p.category === value);
  }
  
  displayProducts();
  });
  
  // SORT
  document.getElementById("sort").addEventListener("change", (e)=>{
  
  let value = e.target.value;
  
  if(value === "low"){
  filteredProducts.sort((a,b)=>a.price - b.price);
  }
  
  if(value === "high"){
  filteredProducts.sort((a,b)=>b.price - a.price);
  }
  
  displayProducts();
  
  });
  
  // INITIAL LOAD
  displayProducts();

  // CART FUNCTIONALITY
  let cart = [];
  
  // TOGGLE CART
  function toggleCart(){
  document.getElementById("cartDrawer").classList.toggle("open");
  document.getElementById("cartOverlay").classList.toggle("active");
  }
  
  // ADD TO CART
  function addToCart(name, price){
  
  let existing = cart.find(item => item.name === name);
  
  if(existing){
  existing.quantity += 1;
  } else {
  cart.push({name, price, quantity:1});
  }
  
  updateCart();
  
  }
  
  // UPDATE CART UI
  function updateCart(){
  
  let cartItems = document.getElementById("cart-items");
  let cartCount = document.getElementById("cart-count");
  let cartTotal = document.getElementById("cart-total");
  
  cartItems.innerHTML = "";
  
  let total = 0;
  
  cart.forEach((item, index) => {
  
  total += item.price * item.quantity;
  
  cartItems.innerHTML += `
  <div class="cart-item">
  
  <div>
  <strong>${item.name}</strong>
  <br>
  <small>${item.price}</small>
  </div>
  
  <div class="cart-controls">
  
  <button onclick="changeQty(${index}, -1)">-</button>
  <span>${item.quantity}</span>
  <button onclick="changeQty(${index}, 1)">+</button>
  
  <button class="remove" onclick="removeItem(${index})">✕</button>
  
  </div>
  
  </div>
  `;
  });
  
  cartCount.innerText = cart.length;
  cartTotal.innerText = total;
  
  }
  
  // CHANGE QUANTITY
  function changeQty(index, amount){
  
  cart[index].quantity += amount;
  
  if(cart[index].quantity <= 0){
  cart.splice(index,1);
  }
  
  updateCart();
  
  }
  
  // REMOVE ITEM
  function removeItem(index){
  cart.splice(index,1);
  updateCart();
  }
  
  // CHECKOUT
  function checkout(){
  if(cart.length === 0){
  alert("Your cart is empty!");
  return;
  }
  
  let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  alert(`Checkout total: ${total}\n\nThank you for your order!`);
  cart = [];
  updateCart();
  }
  
  // INITIAL LOAD
  loadProducts();
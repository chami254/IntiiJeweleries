let slideIndex = 0;

function showSlides(){

let slides = document.getElementsByClassName("slides");

for(let i = 0; i < slides.length; i++){
slides[i].style.display = "none";
}

slideIndex++;

if(slideIndex > slides.length){
slideIndex = 1;
}

slides[slideIndex-1].style.display = "block";

setTimeout(showSlides, 4000);
}

showSlides();



function toggleMenu(){

  let nav = document.getElementById("navLinks");
  
  nav.classList.toggle("active");
  
  }


  let cart = [];

  // TOGGLE CART
  function toggleCart(){
  document.getElementById("cartDrawer").classList.toggle("open");
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
  <small>$${item.price}</small>
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
let products = [
  {
  name:"Gold Ring",
  price:120,
  category:"rings",
  image:"images/ring.jpg",
  rating:4,
  stock:5,
  discount:20
  },
  {
  name:"Silver Necklace",
  price:90,
  category:"necklaces",
  image:"images/necklace.jpg",
  rating:5,
  stock:0,
  discount:0
  },
  {
  name:"Bracelet",
  price:60,
  category:"bracelets",
  image:"images/bracelet.jpg",
  rating:3,
  stock:8,
  discount:10
  }
  ];
  
  let filteredProducts = [...products];
  
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
    ? `<span class="old-price">$${product.price}</span> $${finalPrice}`
    : `$${product.price}`}
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
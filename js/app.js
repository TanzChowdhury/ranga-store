// Load Data
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");

    // Dynamic Product Card
    div.innerHTML = `
      <div class="col shadow">
        <div class="single-product">
          <div class="product-image border-0">
            <img src="${image}" alt="${product.title}">
          </div>
          <div class="product-details text-center">
          <h6 class="product-name">${product.title}</h6>
            <p>Category: ${product.category}</p>
            <p>Category: ${product.rating.rate} (${product.rating.count})</p>
            <h4>Price: $${product.price}</h4>
            <div class="pt-2 d-flex">
              <div>
                <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-outline-warning px-4"><i class="fas fa-cart-plus mr-2"></i> Add Cart</button>
              </div>
              <div class="ms-auto">
                <button onclick="singleProductDetails(${product.id})" id="details-btn" class="btn btn-success px-4">Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

const singleProductDetails = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(data => showDetails(data))
}

//Dynamic Product Details
const productDetails = document.getElementById('product-info');
const showDetails = (product) => {
  productDetails.textContent = '';
  const image = product.image;
  const description = (product.description).slice(0, 100);
  const div = document.createElement('div');
  div.innerHTML = `
  <div class=" text-center py-3 d-flex justify-content-center">
          <div class="product-image col-3 border-0">
            <img src="${image}">
          </div>
          <div class="product-details text-success bg-light col-9">
          <h5 class="product-name fw-bold">${product.title}</h5>
            <p class="pt-3 text-dark">${description}</p>
            <h4 class="pt-5 fw-bold">Price: $${product.price}</h4>
          </div>
        </div>
  `;
  productDetails.appendChild(div);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Cart Count
let count = 0;
const addToCart = (id, price) => {
  document.getElementById('buy-now-btn').removeAttribute('disabled');
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
  return grandTotal;
};

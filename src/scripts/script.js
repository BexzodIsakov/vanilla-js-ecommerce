const productsContainer = document.getElementById("products");
const spinner = document.getElementById("spinner");
const cartQuantity = document.getElementById("cartQuantity");

const cartItems = [];
let products = [];
let productCategories = [];
let filters = [];

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const fetchedProducts = await response.json();
    productCategories = [...new Set(fetchedProducts.map((p) => p.category))];

    return fetchedProducts;
  } catch (error) {
    console.error(error);
  }
}

function showLoading(isShowing) {
  if (isShowing) {
    spinner.style.display = "auto";
  } else {
    spinner.style.display = "none";
  }
}

async function renderProducts() {
  try {
    showLoading(true);
    products = await fetchProducts();
    if (!products.length) return;

    updateProductsView();
    renderProductCategories();
  } catch (error) {
    console.error(error);
  } finally {
    showLoading(false);
  }
}

function updateCartQuantity() {
  if (!cartItems.length) cartQuantity.style.visibility = "hidden";
  else {
    cartQuantity.style.visibility = "visible";
    cartQuantity.textContent = cartItems.length;
  }
}

function updateProductsView() {
  let productsView = "";

  products.forEach((p) => {
    const inTheCart = cartItems.some((i) => i.id === p.id);

    if (filters.length && !filters.includes(p.category)) return;

    productsView += `<li data-product-id="${p.id}">
        <div class="card bg-base-100 shadow-sm h-full">
          <figure class="bg-neutral-100 p-4">
            <img
              src="${p.image}"
              alt="${p.title}"
              class="block w-full object-contain aspect-square"
            />
          </figure>
          <div class="card-body p-3">
            <h2 class="card-title line-clamp-2 grow">
              <a href="#" class="hover:text-blue-300 transition-colors block">${
                p.title
              }</a>
            </h2>
            <p class="line-clamp-3 capitalize grow-0 text-neutral-400 mt-2 mb-4">${
              p.description
            }</p>
            <strong class="text-right">$${p.price}</strong>
            <div class="card-actions justify-end">
              <button class="btn btn-secondary btn-sm">Buy Now</button>
              <button id="cart-btn" class="btn btn-sm" ${
                inTheCart ? "disabled" : ""
              } onclick="handleAddToCart(${p.id})">Add to cart</button>
            </div>
          </div>
        </div>
      </li>`;
  });

  productsContainer.innerHTML = productsView;
}

function handleAddToCart(itemId) {
  const inTheCart = cartItems.some((i) => i.id === itemId);
  if (inTheCart) return;

  const item = products.find((p) => p.id === itemId);
  cartItems.push(item);

  updateCartQuantity();
  disableCartBtn(itemId, true);
}

function disableCartBtn(id, disabled) {
  const product = document.querySelector(`[data-product-id="${id}"]`);
  const button = product.querySelector("#cart-btn");

  button.disabled = disabled;
  console.log(product);
}

function renderProductCategories() {
  let categories = "";

  productCategories.forEach((c) => {
    categories += `<li class="flex gap-2 mb-3">
      <input type="checkbox" value="${c}" class="checkbox" id="${c}" onchange="handleCategoryCheck(&quot;${c}&quot;, this.checked)" />
      <label for="${c}">${c}</label>
    </li>`;
  });

  document.getElementById("categories").innerHTML = categories;
}

function handleCategoryCheck(category, checked) {
  console.log(category, checked);

  if (checked && !filters.includes(category)) filters.push(category);
  else filters = filters.filter((c) => c !== category);

  console.log(filters);

  updateProductsView();
}

renderProducts();

import Product from "../model/Product.js";
import Cart from "../model/Cart.js";
import ProductService from "../services/ProductService.js";

const productService = new ProductService();
const cart = new Cart();

let productList = [];

const productListElement = document.getElementById("productList");
const selectProductType = document.getElementById("selectProductType");
const cartListElement = document.getElementById("cartList");
const totalPriceElement = document.getElementById("totalPrice");
const cartCountElement = document.getElementById("cartCount");
const btnCheckout = document.getElementById("btnCheckout");

function formatCurrency(value) {
  return Number(value).toLocaleString("vi-VN") + " ₫";
}

function normalizeProduct(item) {
  return new Product(
    item.id,
    item.name,
    item.price,
    item.type,
    item.img ?? item.image ?? item.imageUrl ?? "",
    item.screen,
    item.backCamera,
    item.frontCamera,
    item.desc ?? item.description ?? ""
  );
}

function renderProductList(list = productList) {
  if (!list.length) {
    productListElement.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning text-center">
          Không tìm thấy sản phẩm phù hợp.
        </div>
      </div>
    `;
    return;
  }

  productListElement.innerHTML = list
    .map(
      (product) => `
      <div class="col">
        <div class="product-card">
          <div class="product-image-wrap">
            <span class="product-badge">${String(product.type).toLowerCase()==="iphone" ? "iPhone" : "Samsung"}</span>
            <img
              src="${product.img || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=90"}"
              alt="${product.name}"
              class="product-image"
              onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=90'"
            />
          </div>
          <div class="product-content">
            <span class="product-type">${product.type || "Phone"}</span>
            <h5>${product.name}</h5>
            <p class="product-desc">${product.desc || "Điện thoại chính hãng, thiết kế hiện đại."}</p>
            <div class="product-meta">
              <span class="rating"><i class="fa-solid fa-star"></i> ${product.rating || "4.8"}</span>
              <span>Đã bán ${product.sold || "100"}+</span>
            </div>
            <div class="d-flex justify-content-between align-items-center gap-2">
              <span class="product-price">${formatCurrency(product.price)}</span>
              <button class="btn btn-product btnAddToCart" data-id="${product.id}">
                <i class="fa-solid fa-bag-shopping me-1"></i> Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

function renderCart() {
  cartCountElement.textContent = cart.tongSoLuong();
  totalPriceElement.textContent = formatCurrency(cart.tongTien());

  if (!cart.cartItems.length) {
    cartListElement.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-cart-shopping fa-3x mb-3"></i>
        <p class="mb-0">Giỏ hàng đang trống.</p>
      </div>
    `;
    return;
  }

  cartListElement.innerHTML = cart.cartItems
    .map(
      (cartItem) => `
      <div class="cart-item">
        <div class="d-flex gap-3">
          <img
            src="${cartItem.product.img || "https://placehold.co/100x100?text=Phone"}"
            alt="${cartItem.product.name}"
            class="cart-image"
          />

          <div class="flex-grow-1">
            <div class="d-flex justify-content-between gap-2">
              <h6 class="mb-1">${cartItem.product.name}</h6>
              <button
                class="btn btn-sm text-danger btnRemoveCart"
                data-id="${cartItem.product.id}"
                title="Xóa"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>

            <div class="small text-secondary mb-2">
              ${formatCurrency(cartItem.product.price)}
            </div>

            <div class="d-flex justify-content-between align-items-center">
              <div class="quantity-control">
                <button class="btnDecrease" data-id="${cartItem.product.id}">
                  −
                </button>
                <strong>${cartItem.quantity}</strong>
                <button class="btnIncrease" data-id="${cartItem.product.id}">
                  +
                </button>
              </div>

              <strong class="text-danger">
                ${formatCurrency(cartItem.thanhTien())}
              </strong>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

function showToast(message, type = "success") {
  const toastElement = document.getElementById("appToast");
  const toastBody = document.getElementById("toastBody");

  toastBody.textContent = message;
  toastElement.classList.remove("text-bg-success", "text-bg-danger");
  toastElement.classList.add(
    type === "danger" ? "text-bg-danger" : "text-bg-success"
  );

  bootstrap.Toast.getOrCreateInstance(toastElement).show();
}

async function fetchProductList() {
  productListElement.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary"></div>
      <p class="mt-3 text-secondary">Đang tải sản phẩm...</p>
    </div>
  `;

  try {
    const data = await productService.layDanhSachSanPham();
    productList = data.map(normalizeProduct);
    renderProductList();
  } catch (error) {
    console.error(error);

    productListElement.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger">
          Không thể tải sản phẩm từ API.
          <br />
          Hãy kiểm tra <strong>PRODUCT_API_URL</strong> trong
          <code>assets/js/config.js</code>.
        </div>
      </div>
    `;
  }
}

selectProductType.addEventListener("change", (event) => {
  const selectedType = event.target.value;

  if (selectedType === "all") {
    renderProductList(productList);
    return;
  }

  const filteredList = productList.filter(
    (product) =>
      String(product.type).toLowerCase() === selectedType.toLowerCase()
  );

  renderProductList(filteredList);
});

productListElement.addEventListener("click", (event) => {
  const addButton = event.target.closest(".btnAddToCart");

  if (!addButton) return;

  const productId = addButton.dataset.id;
  const product = productList.find(
    (item) => String(item.id) === String(productId)
  );

  if (!product) return;

  cart.themGH(product);
  renderCart();
  showToast(`Đã thêm "${product.name}" vào giỏ hàng.`);
});

cartListElement.addEventListener("click", (event) => {
  const increaseButton = event.target.closest(".btnIncrease");
  const decreaseButton = event.target.closest(".btnDecrease");
  const removeButton = event.target.closest(".btnRemoveCart");

  if (increaseButton) {
    cart.tangSoLuong(increaseButton.dataset.id);
  }

  if (decreaseButton) {
    cart.giamSoLuong(decreaseButton.dataset.id);
  }

  if (removeButton) {
    cart.xoaSanPham(removeButton.dataset.id);
    showToast("Đã xóa sản phẩm khỏi giỏ hàng.", "danger");
  }

  renderCart();
});

btnCheckout.addEventListener("click", () => {
  if (!cart.cartItems.length) {
    showToast("Giỏ hàng đang trống.", "danger");
    return;
  }

  const total = cart.tongTien();
  cart.thanhToan();
  renderCart();

  showToast(`Thanh toán thành công ${formatCurrency(total)}.`);
});

fetchProductList();
renderCart();

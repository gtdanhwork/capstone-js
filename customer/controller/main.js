import Cart from '../model/Cart.js';
import ProductService from '../services/ProductService.js';

const productList = document.getElementById('productList');
const selectProductType = document.getElementById('selectProductType');
const cartList = document.getElementById('cartList');
const totalPrice = document.getElementById('totalPrice');
const cartCount = document.getElementById('cartCount');
const btnCheckout = document.getElementById('btnCheckout');

const productService = new ProductService();
const cart = new Cart();

const data = [];

function formatCurrency(value) {
	return Number(value).toLocaleString('vi-VN') + ' ₫';
}

const fetchProductList = async () => {
	productList.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary"></div>
      <p class="mt-3 text-secondary">Đang tải sản phẩm...</p>
    </div>
  `;

	try {
		const res = await productService.getAll();

		if (!res.data) {
			productList.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-warning text-center">
                        Kho hàng trống
                    </div>
                </div>
            `;
			return;
		}

		res.data.forEach((product) => {
			data.push(product);
		});

		productList.innerHTML = res.data
			.map(
				(product) => `
                    <div class="col">
                        <div class="product-card">
                            <div class="product-image-wrap">
                                <span class="product-badge">${String(product.type).toLowerCase() === 'iphone' ? 'iPhone' : 'Samsung'}</span>
                                <img
                                src="${product.img || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=90'}"
                                alt="${product.name}"
                                class="product-image"
                                onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=90'"
                                />
                            </div>
                            <div class="product-content">
                                <span class="product-type">${product.type || 'Phone'}</span>
                                <h5>${product.name}</h5>
                                <p class="product-desc overflow-hidden">${product.description || 'Điện thoại chính hãng, thiết kế hiện đại.'}</p>
                                <div class="product-meta">
                                    <div class="w-100 d-flex justify-content-between align-items-center gap-2">
                                        <span class="product-price">${formatCurrency(product.price)}</span>
                                        <button class="btn btn-product btnAddToCart" data-id="${product.id}">
                                            <i class="fa-solid fa-bag-shopping me-1"></i> Thêm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `,
			)
			.join('');
	} catch (error) {
		console.log(error);
	}
};

const fetchCart = () => {
	cartCount.textContent = cart.tongSoLuong();
	totalPrice.textContent = formatCurrency(cart.tongTien());

	if (!cart.cartItems.length) {
		cartList.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping fa-3x mb-3"></i>
                <p class="mb-0">Giỏ hàng đang trống.</p>
            </div>
        `;
		return;
	}

	cartList.innerHTML = cart.cartItems
		.map(
			(cartItem) => `
                <div class="cart-item">
                    <div class="d-flex gap-3">
                    <img
                        src="${cartItem.product.img || 'https://placehold.co/100x100?text=Phone'}"
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
                `,
		)
		.join('');
};

function showToast(message, type = 'success') {
	const toastElement = document.getElementById('appToast');
	const toastBody = document.getElementById('toastBody');

	toastBody.textContent = message;
	toastElement.classList.remove('text-bg-success', 'text-bg-danger');
	toastElement.classList.add(
		type === 'danger' ? 'text-bg-danger' : 'text-bg-success',
	);

	bootstrap.Toast.getOrCreateInstance(toastElement).show();
}

selectProductType.addEventListener('change', (event) => {
	const selectedType = event.target.value;

	if (selectedType === 'all') {
		renderProductList(productList);
		return;
	}

	const filteredList = productList.filter(
		(product) =>
			String(product.type).toLowerCase() === selectedType.toLowerCase(),
	);

	renderProductList(filteredList);
});

productList.addEventListener('click', (event) => {
	const addButton = event.target.closest('.btnAddToCart');

	if (!addButton) return;

	const productId = addButton.dataset.id;
	const product = data.find((item) => String(item.id) === String(productId));

	if (!product) return;

	cart.themGH(product);
	fetchCart();
	showToast(`Đã thêm "${product.name}" vào giỏ hàng.`);
});

cartList.addEventListener('click', (event) => {
	const increaseButton = event.target.closest('.btnIncrease');
	const decreaseButton = event.target.closest('.btnDecrease');
	const removeButton = event.target.closest('.btnRemoveCart');

	if (increaseButton) {
		cart.tangSoLuong(increaseButton.dataset.id);
	}

	if (decreaseButton) {
		cart.giamSoLuong(decreaseButton.dataset.id);
	}

	if (removeButton) {
		cart.xoaSanPham(removeButton.dataset.id);
		showToast('Đã xóa sản phẩm khỏi giỏ hàng.', 'danger');
	}

	fetchCart();
});

btnCheckout.addEventListener('click', () => {
	if (!cart.cartItems.length) {
		showToast('Giỏ hàng đang trống.', 'danger');
		return;
	}

	const total = cart.tongTien();
	cart.thanhToan();
	fetchCart();

	showToast(`Thanh toán thành công ${formatCurrency(total)}.`);
});

fetchProductList();
fetchCart();

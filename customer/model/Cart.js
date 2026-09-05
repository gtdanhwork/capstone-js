import CartItem from "./CartItem.js";
import { CART_STORAGE_KEY } from "../../assets/js/config.js";

export default class Cart {
  constructor() {
    this.cartItems = this.loadCart();
  }

  loadCart() {
    try {
      const data = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
      return data.map(
        (item) => new CartItem(item.product, Number(item.quantity) || 1)
      );
    } catch (error) {
      console.error("Không thể đọc giỏ hàng:", error);
      return [];
    }
  }

  saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cartItems));
  }

  themGH(product) {
    const existingItem = this.cartItems.find(
      (item) => String(item.product.id) === String(product.id)
    );

    if (existingItem) {
      existingItem.tangSoLuong();
    } else {
      this.cartItems.push(new CartItem(product, 1));
    }

    this.saveCart();
  }

  xoaSanPham(productId) {
    this.cartItems = this.cartItems.filter(
      (item) => String(item.product.id) !== String(productId)
    );
    this.saveCart();
  }

  tangSoLuong(productId) {
    const item = this.cartItems.find(
      (cartItem) => String(cartItem.product.id) === String(productId)
    );
    if (item) item.tangSoLuong();
    this.saveCart();
  }

  giamSoLuong(productId) {
    const item = this.cartItems.find(
      (cartItem) => String(cartItem.product.id) === String(productId)
    );

    if (item) {
      item.giamSoLuong();

      if (item.quantity <= 0) {
        this.xoaSanPham(productId);
        return;
      }
    }

    this.saveCart();
  }

  tongSoLuong() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  tongTien() {
    return this.cartItems.reduce(
      (total, item) => total + item.thanhTien(),
      0
    );
  }

  thanhToan() {
    this.cartItems = [];
    this.saveCart();
  }
}

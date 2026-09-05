export default class CartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = Number(quantity) > 0 ? Number(quantity) : 1;
  }

  tangSoLuong() {
    this.quantity += 1;
  }

  giamSoLuong() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  thanhTien() {
    return this.product.price * this.quantity;
  }
}

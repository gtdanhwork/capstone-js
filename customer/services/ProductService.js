import ProductAPI from "./productAPI.js";

/**
 * Service tương thích với controller Customer.
 * Toàn bộ dữ liệu sản phẩm được lấy qua ProductAPI.
 */
export default class ProductService {
  constructor() {
    this.api = new ProductAPI();
  }

  async layDanhSachSanPham() {
    return this.api.getAll();
  }
}

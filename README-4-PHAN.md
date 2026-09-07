# 4 PHẦN CUSTOMER - CAPSTONE JS

Bộ code này hoàn thiện đúng 4 phần Customer được giao:

1. **Setup System**: Bootstrap 5 + SASS/SCSS cấu trúc 7-1 + biến dùng chung.
2. **UI Customer**: Navbar, Hero, danh sách sản phẩm, dropdown filter, Cart Offcanvas, Toast.
3. **Model & API Customer**: `Product.js`, `CartItem.js`, `Cart.js`, `ProductService.js` dùng Axios GET.
4. **Logic Filter & Giỏ hàng**: filter Samsung/iPhone, thêm giỏ, tăng/giảm số lượng, xóa, tổng tiền, localStorage, checkout.

## 1. Cấu hình MockAPI

Mở:

`assets/js/config.js`

Đổi `API_BASE_URL` thành endpoint `/products` của MockAPI nhóm.

Ví dụ:

```js
export const API_BASE_URL =
  "https://YOUR_PROJECT_ID.mockapi.io/api/v1/products";
```

Không để nguyên `YOUR_PROJECT_ID` khi chạy thật.

## 2. Chạy

Dùng VS Code + Live Server. Không mở trực tiếp bằng `file://` vì project sử dụng ES Modules và Axios CDN.

Mở:

`customer/view/index.html`

Sau đó chọn **Open with Live Server**.

## 3. Git

```bash
git checkout tuyetphuong
git pull origin tuyetphuong
```

Sau khi hoàn thành:

```bash
git status
git add .
git commit -m "feat: complete customer 4 parts"
git push origin tuyetphuong
```

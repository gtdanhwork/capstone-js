# 📱 Dự Án Capstone JS - Phone Shop Website

Dự án Capstone môn Lập trình JavaScript (Vanilla JS, HTML5, SASS/SCSS & Bootstrap 5) xây dựng trang web bán điện thoại hoàn chỉnh gồm phân hệ Khách hàng (Customer) và Quản trị viên (Admin).

---

## 📌 1. Giới thiệu dự án
- **Mô tả:** Website thương mại điện tử chuyên cung cấp các dòng sản phẩm điện thoại (iPhone, Samsung,...). Cho phép người dùng xem danh sách, lọc sản phẩm, quản lý giỏ hàng, và phía Admin quản lý toàn bộ dữ liệu sản phẩm (CRUD).
- **Công nghệ sử dụng:**
  - **Core:** HTML5, Vanilla JavaScript (ES6+), Axios (Call API).
  - **Styling:** SASS/SCSS (Cấu trúc 7-1), Bootstrap 5 (UI Framework & Responsive Layout).
  - **Kiến trúc:** Model-View-Controller (MVC) mô-đun hóa.

---

## 🛠️ 2. Quy chuẩn đặt tên (Naming Conventions)
Để đảm bảo code sạch, nhất quán và tránh xung đột với các Class có sẵn của Bootstrap 5:
- **HTML Element ID:** Sử dụng **`camelCase`** (Ví dụ: `#productList`, `#cartModal`, `#btnSaveProduct`, `#productPrice`).
- **Custom CSS/SASS Class:** Sử dụng **`camelCase`** (Ví dụ: `.productItemCard`, `.cartQuantityBtn`, `.adminTableHeader`).
- **JavaScript Variable / Function / Method:** Sử dụng **`camelCase`** (Ví dụ: `fetchProductList()`, `renderCart()`, `capNhatSoLuong()`).
- **ES6 Classes (Models):** Sử dụng **`PascalCase`** (Ví dụ: `Product.js`, `CartItem.js`, `Cart.js`, `Validation.js`).

---

## 📁 3. Cấu trúc thư mục dự án

```text
Phone-Shop/
├── .vscode/
├── asset/
│   ├── css/
│   │   ├── main.css               # CSS biên dịch từ SASS
│   │   └── main.css.map
│   ├── img/                       # Hình ảnh tĩnh của dự án
│   └── sass/                      # Kiến trúc SASS Pattern 7-1
│       ├── abstract/              # _variables.scss, _mixins.scss
│       ├── base/                  # _reset.scss, _typography.scss
│       ├── components/            # _button.scss, _card.scss, _modal.scss
│       ├── layout/                # _header.scss, _footer.scss
│       ├── pages/                 # _customer.scss, _admin.scss
│       ├── vendors/               # _bootstrap.scss
│       └── main.scss              # Entry file SASS
├── admin/
│   ├── controller/
│   │   └── main.js                # Xử lý DOM, Modal Bootstrap, CRUD Admin
│   ├── model/
│   │   ├── Product.js             # Class Product
│   │   └── Validation.js          # Class Validation Form
│   ├── services/
│   │   └── productAPI.js          # Service Axios (GET, POST, PUT, DELETE)
│   └── view/
│       └── index.html             # Giao diện Admin (Table, Modal CRUD)
├── customer/
│   ├── controller/
│   │   └── main.js                # Xử lý Render sản phẩm, Filter, Giỏ hàng
│   ├── model/
│   │   ├── Product.js             # Class Product
│   │   ├── CartItem.js            # Class CartItem
│   │   └── Cart.js                # Class Cart (Quản lý mảng giỏ hàng)
│   ├── services/
│   │   └── productAPI.js          # Service Axios (GET)
│   └── view/
│       └── index.html             # Giao diện Customer (Grid, Cards, Cart Modal)
├── data-backup.json               # Dữ liệu dự phòng
├── index.html                     # Trang chọn điều hướng (Customer / Admin)
└── README.md                      # Tài liệu hướng dẫn dự án
```

---

## 👥 4. Phân công công việc (Task Assignment)

| Hạng mục task | Chi tiết công việc | Người thực hiện | Sản phẩm đầu ra & Quy chuẩn áp dụng |
| :--- | :--- | :--- | :--- |
| **Setup System** | Setup Bootstrap 5 + SASS 7-1, dựng trang landing `index.html`. Cấu hình biến SASS dùng chung. | Thành viên 1 | • Thư mục `asset/`<br>• File SASS partials đặt tên chuẩn. |
| **UI Customer** | Dựng Navbar, Grid danh sách sản phẩm, Modal/Offcanvas giỏ hàng bằng Bootstrap 5. | Thành viên 1 | • `customer/view/index.html`<br>• Element ID & Custom Class dùng `camelCase` (vd: `#cartList`, `.productCardItem`). |
| **UI Admin** | Dựng Dashboard, Bảng quản lý sản phẩm (Bootstrap Table), Modal Form CRUD, Toast thông báo. | Thành viên 2 | • `admin/view/index.html`<br>• ID Form và Input dùng `camelCase` (vd: `#productName`, `#btnSaveProduct`). |
| **Model & API Customer** | Code `Product.js`, `CartItem.js`, `Cart.js`, Service Gọi API `GET`, hàm Render Card. | Thành viên 1 | • `customer/model/*`, `customer/services/*`<br>• Property/Method dùng `camelCase` (vd: `themGH()`, `capNhatSoLuong()`). |
| **Logic Filter & Giỏ hàng** | Code tính năng Filter theo `type`, xử lý giỏ hàng (`localStorage`, tính tổng tiền, thanh toán). | Thành viên 1 | • `customer/controller/main.js`<br>• Gắn sự kiện qua ID `camelCase` (vd: `#selectProductType`, `#btnCheckout`). |
| **API & Validation Admin** | Viết Service API Axios (GET, POST, PUT, DELETE), Class `Validation.js` hiển thị lỗi Form. | Thành viên 2 | • `admin/services/*`, `admin/model/Validation.js`<br>• Method kiểm tra dùng `camelCase` (vd: `kiemTraRong()`, `kiemTraSo()`). |
| **Logic Admin CRUD** | Thêm, Xóa, Sửa sản phẩm (tương tác với Bootstrap Modal), Tìm kiếm tên & Sắp xếp giá. | Thành viên 2 | • `admin/controller/main.js`<br>• Lấy giá trị input qua ID `camelCase` (vd: `productName`). |
| **Testing & Deploy** | Kiểm thử giao diện & logic, kiểm tra chuẩn đặt tên, Push GitHub & Deploy Vercel/Netlify. | Cả 2 thành viên | • Repository GitHub & Link Web Live. |

---

## 🚀 5. Hướng dẫn cài đặt & Chạy dự án
1. **Clone dự án về máy:**
   ```bash
   git clone <URL_REPOSITORY_GITHUB>
   cd Phone-Shop
   ```
2. **Biên dịch SASS (Nếu có chỉnh sửa SASS):**
   ```bash
   # Sử dụng sass CLI
   sass asset/sass/main.scss asset/css/main.css --watch
   ```
3. **Mở dự án:**
   - Mở bằng extension **Live Server** trên VS Code thông qua file `index.html` hoặc `customer/view/index.html`.

---

## 🔗 6. Liên kết dự án
- **Link Github:** [Đường dẫn GitHub Repository]
- **Link Demo Online:** [Đường dẫn Vercel / Netlify]
- **Video Demo Youtube:** [Đường dẫn Video Youtube]
- **Google Sheet:** https://docs.google.com/spreadsheets/d/1PkdoF_fyMtaDp1yX3AXYNx0lREAzpOJwf3aOF-bB6Y4/edit?usp=sharing
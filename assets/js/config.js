export const PRODUCT_API_URL = "https://YOUR_PROJECT_ID.mockapi.io/api/v1/products";
export const CART_STORAGE_KEY = "phoneShopCart";
export const USE_DEMO_DATA = PRODUCT_API_URL.includes("YOUR_PROJECT_ID");

// Ảnh sản phẩm demo lấy từ Unsplash CDN để giao diện có hình thật ngay khi chạy.
export const DEMO_PRODUCTS = [
  {
    id: "demo-1",
    name: "iPhone 15 Pro",
    price: 27990000,
    type: "iphone",
    img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=90",
    screen: "6.1 inch Super Retina XDR",
    backCamera: "48MP + 12MP + 12MP",
    frontCamera: "12MP",
    desc: "Titan cao cấp, chip A17 Pro, camera chuyên nghiệp.",
    rating: 4.9,
    sold: 328
  },
  {
    id: "demo-2",
    name: "iPhone 14",
    price: 18990000,
    type: "iphone",
    img: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=900&q=90",
    screen: "6.1 inch Super Retina XDR",
    backCamera: "12MP + 12MP",
    frontCamera: "12MP",
    desc: "Thiết kế sang trọng, camera kép, hiệu năng ổn định.",
    rating: 4.8,
    sold: 512
  },
  {
    id: "demo-3",
    name: "Samsung Galaxy S24",
    price: 21990000,
    type: "samsung",
    img: "https://images.unsplash.com/photo-1707232650945-9b2a6a2d1b8f?auto=format&fit=crop&w=900&q=90",
    screen: "6.2 inch Dynamic AMOLED 2X",
    backCamera: "50MP + 12MP + 10MP",
    frontCamera: "12MP",
    desc: "Galaxy AI, màn hình 120Hz, camera đa năng.",
    rating: 4.9,
    sold: 406
  },
  {
    id: "demo-4",
    name: "Samsung Galaxy A55 5G",
    price: 10490000,
    type: "samsung",
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=90",
    screen: "6.6 inch Super AMOLED",
    backCamera: "50MP + 12MP + 5MP",
    frontCamera: "32MP",
    desc: "Thiết kế kim loại, pin bền, camera OIS.",
    rating: 4.7,
    sold: 271
  }
];

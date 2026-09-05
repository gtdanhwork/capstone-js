export default class Validation {
 isRequired(v){return String(v??"").trim()!==""}
 isPositiveNumber(v){return Number(v)>0}
 isValidType(v){return ["samsung","iphone"].includes(String(v).toLowerCase())}
 validateProduct(p){const e={};if(!this.isRequired(p.name))e.name="Vui lòng nhập tên sản phẩm.";if(!this.isPositiveNumber(p.price))e.price="Giá phải lớn hơn 0.";if(!this.isValidType(p.type))e.type="Chọn Samsung hoặc iPhone.";if(!this.isRequired(p.img))e.img="Vui lòng nhập link hình ảnh.";return e}
}

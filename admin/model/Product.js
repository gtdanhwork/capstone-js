export default class Product {
	constructor({ id, name, price, type, img, desc = '', deleted }) {
		this.id = id;
		this.name = name;
		this.price = Number(price) || 0;
		this.type = String(type || '').toLowerCase();
		this.img = img || '';
		this.desc = desc || '';
		this.deleted = deleted;
	}
}

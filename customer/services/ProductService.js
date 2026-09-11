import axios from 'https://cdn.jsdelivr.net/npm/axios@1.20.0/+esm';

const BASE_URL = 'https://svcy.myclass.vn/api/ProductApi';

export default class ProductService {
	getAll() {
		return axios({ url: `${BASE_URL}/getall`, method: 'GET' });
	}
}

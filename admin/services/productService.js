import axios from 'https://cdn.jsdelivr.net/npm/axios@1.20.0/+esm';

const BASE_URL = 'https://svcy.myclass.vn/api/ProductApi';

export default class ProductService {
	async getAll() {
		return (await axios.get(`${BASE_URL}/getall`)).data;
	}
	async create(data) {
		data.id = data.id.toUpperCase();
		console.log(data);
		return (await axios.post(`${BASE_URL}/create`, data)).data;
	}
	async update(id, data) {
		return (await axios.put(`${BASE_URL}/update/${id}`, data)).data;
	}
	async delete(id) {
		return axios.delete(`${BASE_URL}/delete/${id}`);
	}
}

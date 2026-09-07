import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm";
import { PRODUCT_API_URL, USE_DEMO_DATA, DEMO_PRODUCTS } from "../../assets/js/config.js";
export default class ProductAPI {
 async getAll(){ if(USE_DEMO_DATA) return DEMO_PRODUCTS; return (await axios.get(PRODUCT_API_URL)).data; }
 async create(data){ return (await axios.post(PRODUCT_API_URL,data)).data; }
 async update(id,data){ return (await axios.put(`${PRODUCT_API_URL}/${id}`,data)).data; }
 async delete(id){ return axios.delete(`${PRODUCT_API_URL}/${id}`); }
}

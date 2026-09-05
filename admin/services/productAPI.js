import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm";
import {PRODUCT_API_URL,USE_DEMO_DATA,DEMO_PRODUCTS} from "../../assets/js/config.js";
export default class ProductAPI{
 async getAll(){if(USE_DEMO_DATA)return JSON.parse(localStorage.getItem("adminDemoProducts")||JSON.stringify(DEMO_PRODUCTS));return (await axios.get(PRODUCT_API_URL)).data}
 async create(data){if(USE_DEMO_DATA){const a=await this.getAll();const x={...data,id:"demo-"+Date.now()};a.push(x);localStorage.setItem("adminDemoProducts",JSON.stringify(a));return x}return (await axios.post(PRODUCT_API_URL,data)).data}
 async update(id,data){if(USE_DEMO_DATA){const a=await this.getAll(),i=a.findIndex(x=>String(x.id)===String(id));if(i>=0)a[i]={...a[i],...data};localStorage.setItem("adminDemoProducts",JSON.stringify(a));return a[i]}return (await axios.put(`${PRODUCT_API_URL}/${id}`,data)).data}
 async delete(id){if(USE_DEMO_DATA){const a=(await this.getAll()).filter(x=>String(x.id)!==String(id));localStorage.setItem("adminDemoProducts",JSON.stringify(a));return}return axios.delete(`${PRODUCT_API_URL}/${id}`)}
}

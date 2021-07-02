import { baseUrl } from "./baseUrl";

const api = {
    getProducts: (page = 1, limit = 5) => `${baseUrl}/products?page=${page}&limit=${limit}`,
};

export default api;

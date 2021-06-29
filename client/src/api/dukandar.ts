import { baseUrl } from "./baseUrl";

const url = baseUrl + "/dukandar";

export { url as dukandarAPI };
const api = {
    register: url + "/signup",
    login: url + "/login",
    products: (limit = 5, page = 1) => url + `/products?limit=${limit}&page=${page}`,
    addProduct: url + "/addProduct",
};

export default api;

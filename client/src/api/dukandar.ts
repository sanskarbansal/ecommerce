import { baseUrl } from "./baseUrl";

const url = baseUrl + "/dukandar";

export { url as dukandarAPI };
const api = {
    register: url + "/signup",
    login: url + "/login",
};

export default api;
